import { Action, Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { CallbackQuery, InputMediaPhoto } from 'telegraf/types';
import * as common from '@/common';
import { Telegraf } from 'telegraf';
import { androidTemplate } from '@/common/constants/users/android/template';
import { PrismaService } from '@/prisma';

@Scene('AndroidDevice')
export class AndroidPostScene {
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx.session?.lang || 'uz';

    try {
      if (ctx.session.isEditing) {
        await ctx.editMessageText(common.askPleaseFillCorrectly[lang]);
        await ctx.reply(common.WhichAndroidPhoneBrandMsg[lang], {
          ...common.getPhoneBrandKeyboard(lang),
        });
        return;
      } else {
        await ctx.editMessageText(common.WhichAndroidPhoneBrandMsg[lang], {
          ...common.getPhoneBrandKeyboard(lang),
        });
      }
    } catch (err) {
      console.warn('Nimadur xato', err);
    }
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
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askRegionOfPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    ctx.session.androidInfo.region = message;
    await ctx.scene.enter('AskAndroidPhoneCondition');
  }
}
@Scene('AskAndroidPhoneCondition')
export class AskAndroidPhoneCondition {
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const s = ctx.session;
    s.isSceneChanging = false;
    s.currentMediaGroupId = undefined;
    s.tempGroupImages = [];
    clearTimeout(s.groupTimeout);
    clearTimeout(s.singleTimeout);
    await ctx.reply(common.askConditionOfPhone[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: common.buildConditionKeyboard({
          isPhoneAndroid: true,
        })[ctx.session.lang],
      },
    });
  }
  @Action('android_ideal')
  async onIdealAction(@Ctx() ctx: common.ContextType) {
    ctx.session.androidInfo.condition = 'Ideal';
    ctx.scene.enter('AskAndroidOtherInfos');
  }

  @Action('android_yaxshi')
  async onGoodAction(@Ctx() ctx: common.ContextType) {
    ctx.session.androidInfo.condition = 'Yaxshi';
    ctx.scene.enter('AskAndroidOtherInfos');
  }

  @Action('android_orta')
  async onAverageAction(@Ctx() ctx: common.ContextType) {
    ctx.session.androidInfo.condition = "O'rta";
    ctx.scene.enter('AskAndroidOtherInfos');
  }

  @Action('android_parts')
  async onPartsAction(@Ctx() ctx: common.ContextType) {
    ctx.session.androidInfo.condition = 'Extiyot qism';
    ctx.scene.enter('AskAndroidOtherInfos');
  }
}

@Scene('AskAndroidOtherInfos')
export class AskAndroidOtherInfos {
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askOtherInfoAboutPhone[ctx.session.lang]);
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
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askPhoneImages[ctx.session.lang]);
    ctx.session.androidInfo.images = [];
    ctx.session.sendToAdmin = false;
  }

  @On('message')
  async onMessage(ctx: common.ContextType) {
    const session = ctx.session;

    const androidInfo =
      session.androidInfo ||
      (session.androidInfo = { ...common.defaultPhoneInfo });
    const images = androidInfo.images;

    if (
      !ctx.message ||
      !('photo' in ctx.message) ||
      !Array.isArray(ctx.message.photo) ||
      ctx.message.photo.length === 0
    ) {
      await ctx.reply(common.requestImageMessage[session.lang]);
      return;
    }

    const photos = ctx.message.photo;
    const lastPhoto = photos[photos.length - 1];
    if (!lastPhoto?.file_id) {
      await ctx.reply(common.requestImageMessage[session.lang]);
      return;
    }

    const mediaGroupId = (ctx.message as any).media_group_id;

    if (session.isSceneChanging) return;

    if (mediaGroupId) {
      if (session.currentMediaGroupId !== mediaGroupId) {
        session.currentMediaGroupId = mediaGroupId;
        session.tempGroupImages = [];
      }

      (session.tempGroupImages ??= []).push(lastPhoto.file_id);

      clearTimeout(session.groupTimeout);
      session.groupTimeout = setTimeout(async () => {
        images.push(...(session.tempGroupImages ?? []));
        delete session.tempGroupImages;
        delete session.currentMediaGroupId;

        if (images.length > 6) {
          images.splice(6);
          await ctx.reply(common.alertSendingImageLimitMsg[session.lang]);
        }

        androidInfo.images = images;

        session.isSceneChanging = true;
        await ctx.scene.enter('AskAndroidPhonePostAcceptation');
      }, 1000);

      return;
    }

    images.push(lastPhoto.file_id);

    if (images.length > 6) {
      images.splice(6);
      await ctx.reply(common.alertSendingImageLimitMsg[session.lang]);
    }

    androidInfo.images = images;

    clearTimeout(session.singleTimeout);
    session.singleTimeout = setTimeout(async () => {
      session.isSceneChanging = true;
      await ctx.scene.enter('AskAndroidPhonePostAcceptation');
    }, 1000);
  }
}

@Scene('AskAndroidPhonePostAcceptation')
export class AskAndroidPhonePostAcceptation {
  constructor(
    @InjectBot() private readonly telegram: Telegraf,
    private readonly prisma: PrismaService,
  ) {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await this.sendPostToUser(ctx);
    const confirmationMessage = await ctx.reply(
      common.askingConfirmation[ctx.session.lang],
      {
        reply_markup: common.acceptEditKeyboard[ctx.session.lang],
      },
    );
    ctx.session.lastConfirmationMessage = confirmationMessage.message_id;
  }

  @Action('accept')
  async onActionAccept(@Ctx() ctx: common.ContextType) {
    if (!ctx.session.sendToAdmin) {
      ctx.session.sendToAdmin = true;
      const { phone_number, price, ...restData } = ctx.session.androidInfo;
      const data = await this.prisma.phones.create({
        data: {
          ...restData,
          phoneNumber: ctx.session.androidInfo.phone_number,
          price: Number(ctx.session.androidInfo.price),
        },
      });
      ctx.session.postId = data.id;
    }

    const lastMessageId = ctx.session.lastMessage?.message_id;
    const chatId = ctx.chat?.id;

    if (chatId && lastMessageId) {
      try {
        await ctx.telegram.deleteMessage(chatId, lastMessageId);
      } catch (err) {
        console.warn("Postni o'chirishda xatolik:", err);
      }
    }

    const confirmationMessageId = ctx.session.lastConfirmationMessage;

    if (chatId && confirmationMessageId) {
      try {
        await ctx.telegram.editMessageText(
          chatId,
          confirmationMessageId,
          undefined,
          common.adPostSubmittedMessage[ctx.session.lang],
          {
            reply_markup: { inline_keyboard: [] },
          },
        );
        await ctx.answerCbQuery();
      } catch (err) {
        console.warn('Confirmation messageni edit qilishda xatolik:', err);
        await ctx.answerCbQuery();
      }
    } else {
      await ctx.answerCbQuery();
    }

    await this.sendPostToAdmin(ctx);
  }

  @Action('edit')
  async onActionEdit(@Ctx() ctx: common.ContextType) {
    const lastMessageId = ctx.session.lastMessage?.message_id;
    const confirmationMessageId = ctx.session.lastConfirmationMessage;
    const chatId = ctx.chat?.id;

    ctx.session.androidInfo = common.defaultPhoneInfo;

    if (chatId) {
      if (lastMessageId) {
        try {
          await ctx.telegram.deleteMessage(chatId, lastMessageId);
        } catch (err) {
          console.warn("Postni o'chirishda xatolik:", err);
        }
      }
    }

    ctx.session.lastMessage = undefined;
    ctx.session.lastConfirmationMessage = undefined;
    ctx.session.isEditing = true;
    ctx.session.sendToAdmin = false;

    await ctx.answerCbQuery();
    await ctx.scene.enter('AndroidDevice');
  }
  async sendPostToUser(ctx: common.ContextType) {
    const androidInfo = ctx.session.androidInfo;
    if (!androidInfo) {
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );
    }

    const images = androidInfo.images || [];
    const phoneInfo = androidTemplate(androidInfo);

    if (!images.length) {
      return await ctx.reply(
        common.askSendingAtLeastOneImage[ctx.session.lang],
      );
    }
    if (!phoneInfo) {
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );
    }

    const media: InputMediaPhoto[] = images.map((file_id, index) => ({
      type: 'photo' as const,
      media: file_id,
      caption: index === 0 ? phoneInfo : undefined,
      parse_mode: 'HTML',
    }));

    if (!ctx.chat || !ctx.chat.id) return;
    const sentMessages = await ctx.telegram.sendMediaGroup(ctx.chat.id, media);

    ctx.session.lastMessage = sentMessages[0];

    ctx.session.sendToAdmin = false;
  }

  async sendPostToAdmin(ctx: common.ContextType) {
    const images = ctx.session.androidInfo.images || [];
    const phoneInfo = androidTemplate(
      ctx.session.androidInfo as common.PhoneInfoI,
    );

    if (!images.length)
      return await ctx.reply(
        common.askSendingAtLeastOneImage[ctx.session.lang],
      );
    if (!phoneInfo)
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );

    const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID!;

    const media: InputMediaPhoto[] = images.map((file_id, index) => ({
      type: 'photo' as const,
      media: file_id,
      caption: index === 0 ? phoneInfo : undefined,
      parse_mode: 'HTML',
    }));

    const sentMedia = await ctx.telegram.sendMediaGroup(
      ADMIN_CHANNEL_ID,
      media,
    );
    const firstMediaMessageId = sentMedia[0].message_id;

    const confirmationMsg = await ctx.telegram.sendMessage(
      ADMIN_CHANNEL_ID,
      'Postni tasdiqlaysizmi?',
      {
        reply_markup: common.approvalKeyboard(
          ctx.session.postId as string,
          firstMediaMessageId,
          0,
        ).uz,
      },
    );

    await ctx.telegram.editMessageReplyMarkup(
      ADMIN_CHANNEL_ID,
      confirmationMsg.message_id,
      undefined,
      common.approvalKeyboard(
        ctx.session.postId as string,
        firstMediaMessageId,
        confirmationMsg.message_id,
      ).uz,
    );

    const chatId = ctx.chat?.id;
    if (!chatId) return;

    ctx.session.sendToAdmin = false;
    ctx.scene.leave();
  }
}
