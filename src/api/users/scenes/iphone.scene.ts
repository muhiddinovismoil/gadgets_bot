import { On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  askModelPhoneMsg,
  askPhoneNumber,
  askPricePhoneMsg,
  askStoragePhoneMsg,
  incorrectFormatPhoneMemory,
  incorrectFormatPhoneModel,
  incorrectPhoneNumber,
  incorrectPricePhoneMsg,
} from 'src/common/constants/users/phone/message';
import {
  iPhoneMemoryRegex,
  iPhoneModelRegex,
  iPhonePriceRegex,
} from 'src/common/constants/users/phone/regex/regex';
import { uzbPhoneRegex } from 'src/common/constants/general/regex';

@Scene('iPhoneDevice')
export class iPhonePostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(askModelPhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const model = (ctx.update as any).message.text;
    if (!iPhoneModelRegex.test(model)) {
      await ctx.reply(incorrectFormatPhoneModel[ctx.session.lang]);
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
    await ctx.reply(askStoragePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    if (!iPhoneMemoryRegex.test(text)) {
      await ctx.reply(incorrectFormatPhoneMemory[ctx.session.lang]);
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
    ctx.reply(askPhoneNumber[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    if (!uzbPhoneRegex.test(text)) {
      ctx.reply(incorrectPhoneNumber[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhonePrice');
    }
  }
}
@Scene('AskiPhonePrice')
export class AskiPhonePrice {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    ctx.reply(askPricePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: ContextType) {
    const message = (ctx.update as any).message.text;
    if (!iPhonePriceRegex.test(message)) {
      ctx.reply(incorrectPricePhoneMsg[ctx.session.lang]);
    } else {
      // ctx.scene.enter('')
    }
  }
}
