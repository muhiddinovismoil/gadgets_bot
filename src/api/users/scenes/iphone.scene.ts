import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';

@Scene('iPhoneDevice')
export class iPhonePostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askModelPhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    if (!common.iPhoneModelRegex.test(model)) {
      await ctx.reply(common.incorrectFormatPhoneModel[ctx.session.lang]);
    } else {
      await ctx.scene.enter('askMemoryOfiPhone');
    }
  }
}
@Scene('askMemoryOfiPhone')
export class AskiPhoneMemoryScene {
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
      await ctx.scene.enter('AskisDeliveryValidForIphone');
    }
  }
}
@Scene('AskisDeliveryValidForIphone')
export class AskisDeliveryValidForIphone {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.reply(common.askIsDeliveryValid[ctx.session.lang], {
      reply_markup: common.deliveryKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDelivery')
  async onYesDelivery(ctx: common.ContextType) {
    ctx.scene.enter('AskiPhonePrice');
  }
  @Action('noDelivery')
  async onNoDelivery(ctx: common.ContextType) {
    ctx.scene.enter('AskiPhonePrice');
  }
}
@Scene('AskiPhonePrice')
export class AskiPhonePrice {
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
      ctx.scene.enter('AskIsExchangeValid');
    }
  }
}
@Scene('AskIsExchangeValid')
export class AskIsExchangeValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askExchange[ctx.session.lang], {
      reply_markup: common.exchangeKeyboard[ctx.session.lang],
    });
  }
  @Action('yesExchange')
  async onYesExchange(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
  @Action('noExchange')
  async onNoExchange(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
}
@Scene('AskiPhoneCondition')
export class AskiPhoneCondition {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(
      common.buildConditionKeyboard({ isPhoneAndroid: false })[
        ctx.session.lang
      ],
    );
  }
}

@Scene('AskiPhoneDocumentsValid')
export class AskiPhoneDocumentsValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askIsDocumentsValid[ctx.session.lang], {
      reply_markup: common.documentKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDocument')
  async onYesDocument(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
  @Action('noDocument')
  async onNoDocument(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
}
@Scene('AskiPhoneBattaryCondition')
export class AskiPhoneBattaryCondition {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askConditionOfBattary[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.iPhoneBattaryRegex.test(message)) {
      await ctx.reply(common.incorrectBattaryPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneRegion');
    }
  }
}
@Scene('AskiPhoneRegion')
export class AskiPhoneRegion {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askRegionOfPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.iPhoneRegionRegex.test(message)) {
      await ctx.reply(common.incorrectRegionPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneOtherInfo');
    }
  }
}

@Scene('AskiPhoneOtherInfo')
export class AskiPhoneOtherInfo {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askOtherInfoAboutPhone[ctx.session.lang]);
  }

  @On('text')
  async onText(ctx: common.ContextType) {
    ctx.scene.enter('AskiPhoneImages');
  }
}

@Scene('AskiPhoneImages')
export class AskiPhoneImages {}
