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
    if (!common.iPhoneMemoryRegex.test(text)) {
      await ctx.reply(common.incorrectFormatPhoneMemory[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPhoneNumberForPost');
    }
  }
}
@Scene('AskPhoneNumberForPost')
export class AskPhoneNumberForPost {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.reply(common.askPhoneNumber[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;
    if (!common.uzbPhoneRegex.test(text)) {
      ctx.reply(common.incorrectPhoneNumber[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskisDeliveryValid');
    }
  }
}
@Scene('AskisDeliveryValid')
export class AskisDeliveryValid {
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
    if (!common.iPhonePriceRegex.test(message)) {
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
      await ctx.scene.enter('AskiPhoneImages');
    }
  }
}
@Scene('AskiPhoneImages')
export class AskiPhoneImages {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askPhoneImages[ctx.session.lang]);
  }
  @On('photo')
  async onPhoto(ctx: common.ContextType) {
    const message = (ctx.update as any).message;

    if (!message.photo) {
      await ctx.reply('⚠️ Iltimos, rasm yuboring.');
      return;
    }

    const fileIds = message.photo.map((photo) => photo.file_id);

    if (fileIds.length > 6) {
      await ctx.reply('❌ Siz maksimum 6 ta rasm yuborishingiz mumkin.');
      return;
    }

    await ctx.reply(`✅ ${fileIds.length}/6 rasm qabul qilindi.`);

    for (const fileId of fileIds) {
      await ctx.replyWithPhoto(fileId);
    }

    await ctx.scene.leave();
  }
}
