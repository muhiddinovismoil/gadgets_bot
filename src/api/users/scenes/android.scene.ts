import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { CallbackQuery } from 'telegraf/types';
import * as common from '@/common';

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
    await ctx.scene.enter('AskMemoryOfAndroid');
  }
}

@Scene('AskMemoryOfAndroid')
export class AskAndroidMemoryScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askStoragePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;
    if (!common.PhoneMemoryRegex.test(text)) {
      await ctx.reply(common.incorrectFormatPhoneMemory[ctx.session.lang]);
    } else {
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
    ctx.scene.enter('AskAndroidPrice');
  }
  @Action('noDeliveryAndroid')
  async onNoDelivery(ctx: common.ContextType) {
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
    await ctx.scene.enter('AskAndroidDocumentsValid');
  }

  @Action('noExchangeAndroid')
  async onNoExchangeHandler(ctx: common.ContextType) {
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
    ctx.scene.enter('AskAndroidBattaryCondition');
  }

  @Action('noDocumentAndroid')
  async onNoDocument(ctx: common.ContextType) {
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
    await ctx.scene.enter('AskAndroidRegion');
  }

  @Action('batteryAverage')
  async onBatteryAverage(ctx: common.ContextType) {
    await ctx.scene.enter('AskAndroidRegion');
  }

  @Action('batteryBad')
  async onBatteryBad(ctx: common.ContextType) {
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
    await ctx.scene.enter('AskAndroidOtherInfos');
  }
}

@Scene('AskAndroidOtherInfos')
export class AskAndroidOtherInfos {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText('');
  }
  @On('text')
  async onText(ctx: common.ContextType) {}
}

@Scene('AskAndroidImages')
export class AskAndroidImages {
  constructor() {}
}
