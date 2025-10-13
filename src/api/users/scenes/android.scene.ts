import { Action, Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { CallbackQuery, InputMediaPhoto } from 'telegraf/types';
import * as common from '@/common';
import { Telegraf } from 'telegraf';
import { androidTemplate } from '@/common/constants/users/android/template';
import { PrismaService } from '@/prisma';

@Scene('AndroidDevice')
export class AndroidPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.WhichAndroidPhoneBrandMsg[lang], {
      ...common.getPhoneBrandKeyboard(lang),
    });
  }
  @Action(/^brand_.+/)
  async onBrandSelected(ctx: common.ContextType) {
    const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
    const callbackData = callbackQuery.data;
    const brandKey = callbackData.split('_')[1];
    ctx.session.androidInfo = common.defaultPhoneInfo;
    await ctx.answerCbQuery();
    switch (brandKey) {
      case 'redmi':
        await ctx.scene.enter('RedmiScene');
        break;
      case 'samsung':
        await ctx.scene.enter('SamsungScene');
        break;
      case 'oppo':
        await ctx.scene.enter('OppoScene');
        break;
      case 'mi':
        await ctx.scene.enter('MiScene');
        break;
      case 'realme':
        await ctx.scene.enter('RealmeScene');
        break;
      case 'infinix':
        await ctx.scene.enter('InfinixScene');
        break;
      case 'poco':
        await ctx.scene.enter('PocoScene');
        break;
      case 'tecno':
        await ctx.scene.enter('TecnoScene');
        break;
    }
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Samsung Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('SamsungScene')
export class SamsungScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(
      common.AndroidDeviceModelAskMsg('samsung')![lang],
    );
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Samsung ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Oppo Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('OppoScene')
export class OppoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('oppo')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Oppo ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Redmi Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('RedmiScene')
export class RedmiScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('redmi')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Xiaomi Redmi ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Mi Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('MiScene')
export class MiScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('mi')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Xiaomi MI ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Realme Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('RealmeScene')
export class RealmeScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('realme')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Realme ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Infinix Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('InfinixScene')
export class InfinixScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(
      common.AndroidDeviceModelAskMsg('infinix')![lang],
    );
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Infinix ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Poco Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('PocoScene')
export class PocoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('poco')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Xiaomi Poco ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

//********************************************************************************************************************************************************************************************/
//**--------------------------------Tecno Scene------------------------------**/
//********************************************************************************************************************************************************************************************/

@Scene('TecnoScene')
export class TecnoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(common.AndroidDeviceModelAskMsg('tecno')![lang]);
  }
  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    ctx.session.androidInfo.model = `Tecno ${model}`;
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

@Scene('AskMemoryOfAndroid')
export class AskAndroidMemoryScene {
  constructor(private readonly prisma: PrismaService) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: common.ContextType) {
    await ctx.reply(common.askStoragePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;
    const data = await this.prisma.user.findFirst({
      where: { telegramId: ctx.from?.id.toString() },
    });
    if (!common.PhoneMemoryRegex.test(text)) {
      await ctx.reply(common.incorrectFormatPhoneMemory[ctx.session.lang]);
    } else {
      ctx.session.androidInfo.memory = text;
      ctx.session.androidInfo.phone_number = data?.phoneNumber as string;
      await ctx.scene.enter('AskisDeliveryValidForAndroid');
    }
  }
}
@Scene('AskisDeliveryValidForAndroid')
export class AskisDeliveryValidForAndroid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.reply(common.askIsDeliveryValid[ctx.session.lang], {
      reply_markup: common.deliveryKeyboardAndroid[ctx.session.lang],
    });
  }
  @Action('yesDeliveryAndroid')
  async onYesDelivery(ctx: common.ContextType) {
    ctx.session.androidInfo.delivery = true;
    ctx.scene.enter('AskAndroidPrice');
  }
  @Action('noDeliveryAndroid')
  async onNoDelivery(ctx: common.ContextType) {
    ctx.session.androidInfo.delivery = false;
    ctx.scene.enter('AskAndroidPrice');
  }
}
@Scene('AskAndroidPrice')
export class AskAndroidPrice {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.editMessageText(common.askPricePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.PhonePriceRegex.test(message)) {
      ctx.reply(common.incorrectPricePhoneMsg[ctx.session.lang]);
    } else {
      ctx.session.androidInfo.price = message;
      ctx.scene.enter('AskIsExchangeValidOnAndroid');
    }
  }
}
@Scene('AskIsExchangeValidOnAndroid')
export class AskIsExchangeValidOnAndroid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.reply(common.askExchange[ctx.session.lang], {
      reply_markup: common.exchangeKeyboardAndroid[ctx.session.lang],
    });
  }
  @Action('yesExchangeAndroid')
  async onYesExchangeHandler(ctx: common.ContextType) {
    ctx.session.androidInfo.exchange = true;
    await ctx.scene.enter('AskAndroidDocumentsValid');
  }

  @Action('noExchangeAndroid')
  async onNoExchangeHandler(ctx: common.ContextType) {
    ctx.session.androidInfo.exchange = false;
    await ctx.scene.enter('AskAndroidDocumentsValid');
  }
}
@Scene('AskAndroidDocumentsValid')
export class AskAndroidDocumentsValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askIsDocumentsValid[ctx.session.lang], {
      reply_markup: common.documentKeyboardAndroid[ctx.session.lang],
    });
  }

  @Action('yesDocumentAndroid')
  async onYesDocument(ctx: common.ContextType) {
    ctx.session.androidInfo.document = true;
    ctx.scene.enter('AskAndroidBattaryCondition');
  }

  @Action('noDocumentAndroid')
  async onNoDocument(ctx: common.ContextType) {
    ctx.session.androidInfo.document = false;
    ctx.scene.enter('AskAndroidBattaryCondition');
  }
}
@Scene('AskAndroidBattaryCondition')
export class AskAndroidBattaryCondition {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askConditionOfBattary[ctx.session.lang], {
      reply_markup: common.batteryConditionAndroid[ctx.session.lang],
    });
  }
  @Action('batteryGood')
  async onBattaryGood(ctx: common.ContextType) {
    ctx.session.androidInfo.batteryHealth = 'Yaxshi';
    await ctx.scene.enter('AskAndroidRegion');
  }

  @Action('batteryAverage')
  async onBatteryAverage(ctx: common.ContextType) {
    ctx.session.androidInfo.batteryHealth = `O'rtacha`;
    await ctx.scene.enter('AskAndroidRegion');
  }

  @Action('batteryBad')
  async onBatteryBad(ctx: common.ContextType) {
    ctx.session.androidInfo.batteryHealth = 'Yomon';
    await ctx.scene.enter('AskAndroidRegion');
  }
}
@Scene('AskAndroidRegion')
export class AskAndroidRegion {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askRegionOfPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    ctx.session.androidInfo.region = message;
    await ctx.scene.enter('AskAndroidOtherInfos');
  }
}

@Scene('AskAndroidOtherInfos')
export class AskAndroidOtherInfos {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askOtherInfoAboutPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    ctx.session.androidInfo.otherInfo = message;
    await ctx.scene.enter('AskAndroidImages');
  }
}

@Scene('AskAndroidImages')
export class AskAndroidImages {
  constructor(@InjectBot() private readonly telegram: Telegraf) {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askPhoneImages[ctx.session.lang]);
    ctx.session.androidInfo.images = [];
    ctx.session.sendToAdmin = false; // yangi flag
  }

  @On('message')
  async onMessage(ctx: common.ContextType) {
    const images = ctx.session.androidInfo.images || [];

    if (ctx.message && 'photo' in ctx.message) {
      images.push(ctx.message.photo[ctx.message.photo.length - 1].file_id);

      if (images.length > 6) {
        images.pop();
        await ctx.reply('❗️ Siz faqat 6 tagacha rasm yuborishingiz mumkin.');
      } else {
        ctx.session.androidInfo.images = images;
        await ctx.reply(`📸 Rasm qabul qilindi. Jami: ${images.length}/6`);
      }

      // ⚡ faqat bir marta post yuborish
      if (!ctx.session.sendToAdmin) {
        ctx.session.sendToAdmin = true;
        // buni Finish tugmasi bilan ham chaqirsa bo‘ladi
        await this.sendPostToAdmin(ctx);
      }

      return;
    }

    await ctx.reply('Iltimos, rasm yuboring.');
  }

  async sendPostToAdmin(ctx: common.ContextType) {
    const images = ctx.session.androidInfo.images || [];
    const phoneInfo = androidTemplate(
      ctx.session.androidInfo as common.PhoneInfoI,
    );

    if (!images.length)
      return await ctx.reply('Iltimos, kamida bitta rasm yuboring.');
    if (!phoneInfo)
      return await ctx.reply('Telefon haqida ma’lumot kiritilmagan.');

    const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID!;

    const media: InputMediaPhoto[] = images.map((file_id, index) => ({
      type: 'photo' as const,
      media: file_id,
      caption: index === 0 ? phoneInfo : undefined,
      parse_mode: 'HTML',
    }));

    await this.telegram.telegram.sendMediaGroup(ADMIN_CHANNEL_ID, media);

    await ctx.reply(
      '✅ Rasm va telefon ma’lumotlari admin kanaliga yuborildi.',
    );

    ctx.session.androidInfo.images = [];
    ctx.session.sendToAdmin = false;
    ctx.scene.leave();
  }
}
