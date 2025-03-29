import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import * as messages from 'src/common/constants/users/iphones/message';
import * as regex from 'src/common/constants/users/iphones/regex/regex';
import * as globalRegex from 'src/common/constants/general/regex';
import * as keyboard from 'src/common/constants/users/iphones/keyboard';

@Scene('iPhoneDevice')
export class iPhonePostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(messages.askModelPhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const model = (ctx.update as any).message.text;
    if (!regex.iPhoneModelRegex.test(model)) {
      await ctx.reply(messages.incorrectFormatPhoneModel[ctx.session.lang]);
    } else {
      await ctx.scene.enter('askMemoryOfiPhone');
    }
  }
}
@Scene('askMemoryOfiPhone')
export class AskiPhoneMemoryScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(messages.askStoragePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    if (!regex.iPhoneMemoryRegex.test(text)) {
      await ctx.reply(messages.incorrectFormatPhoneMemory[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPhoneNumberForPost');
    }
  }
}
@Scene('AskPhoneNumberForPost')
export class AskPhoneNumberForPost {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    ctx.reply(messages.askPhoneNumber[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    if (!globalRegex.uzbPhoneRegex.test(text)) {
      ctx.reply(messages.incorrectPhoneNumber[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskisDeliveryValid');
    }
  }
}
@Scene('AskisDeliveryValid')
export class AskisDeliveryValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    ctx.reply(messages.askIsDeliveryValid[ctx.session.lang], {
      reply_markup: keyboard.deliveryKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDelivery')
  async onYesDelivery(ctx: ContextType) {
    ctx.scene.enter('AskiPhonePrice');
  }
  @Action('noDelivery')
  async onNoDelivery(ctx: ContextType) {
    ctx.scene.enter('AskiPhonePrice');
  }
}
@Scene('AskiPhonePrice')
export class AskiPhonePrice {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    ctx.editMessageText(messages.askPricePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const message = (ctx.update as any).message.text;
    if (!regex.iPhonePriceRegex.test(message)) {
      ctx.reply(messages.incorrectPricePhoneMsg[ctx.session.lang]);
    } else {
      ctx.scene.enter('AskIsExchangeValid');
    }
  }
}
@Scene('AskIsExchangeValid')
export class AskIsExchangeValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(messages.askExchange[ctx.session.lang], {
      reply_markup: keyboard.exchangeKeyboard[ctx.session.lang],
    });
  }
  @Action('yesExchange')
  async onYesExchange(ctx: ContextType) {
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
  @Action('noExchange')
  async onNoExchange(ctx: ContextType) {
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
}
@Scene('AskiPhoneDocumentsValid')
export class AskiPhoneDocumentsValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(messages.askIsDocumentsValid[ctx.session.lang], {
      reply_markup: keyboard.documentKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDocument')
  async onYesDocument(ctx: ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
  @Action('noDocument')
  async onNoDocument(ctx: ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
}
@Scene('AskiPhoneBattaryCondition')
export class AskiPhoneBattaryCondition {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(messages.askConditionOfBattary[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const message = (ctx.update as any).message.text;
    if (!regex.iPhoneBattaryRegex.test(message)) {
      await ctx.reply(messages.incorrectBattaryPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneRegion');
    }
  }
}
@Scene('AskiPhoneRegion')
export class AskiPhoneRegion {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(messages.askRegionOfPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const message = (ctx.update as any).message.text;
    if (!regex.iPhoneRegionRegex.test(message)) {
      await ctx.reply(messages.incorrectRegionPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneImages');
    }
  }
}
@Scene('AskiPhoneImages')
export class AskiPhoneImages {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(messages.askPhoneImages[ctx.session.lang]);
  }
  @On('photo')
  async onPhoto(ctx: ContextType) {
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

    // ✅ Send back each photo
    for (const fileId of fileIds) {
      await ctx.replyWithPhoto(fileId);
    }

    await ctx.scene.leave();
  }
}
