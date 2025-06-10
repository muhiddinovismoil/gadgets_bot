import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.MainPcMessage[lang], {
      reply_markup: common.PcKeyboard[lang],
    });
  }

  @Action('elonYarat')
  async OnAction(ctx: common.ContextType) {
    await ctx.scene.enter('AskTypePc');
  }
}

@Scene('AskTypePc')
export class AskTypePcScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.GreetingMessages.type[lang]);
  }

  @On('text')
  async Ontext(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;

    if (!text) {
      await ctx.reply(common.GreetingMessages.type[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPricePc');
    }
  }
}

@Scene('AskPricePc')
export class AskPricePcScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.GreetingMessages.price[lang]);
  }

  @On('text')
  async Ontext(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    console.log(typeof text);
    if (!isNaN(Number(text))) {
      ctx.reply(common.GreetingMessages.price[lang]);
    } else {
      await ctx.scene.enter('AskStoreName');
    }
  }
}

@Scene('AskStoreName')
export class AskStoreNamePc {
  constructor() {}

  @SceneEnter()
  async OnEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.GreetingMessages.store_name[lang]);
  }

  @On('text')
  async Ontext(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;
    if (!text) {
      await ctx.reply(common.GreetingMessages.store_name[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPhoneNumberPC');
    }
  }
}

@Scene('AskPhoneNumberPC')
export class AskPhoneNumberPC {
  constructor() {}
  @SceneEnter()
  async OnEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.GreetingMessages.phone_number[lang]);
  }

  @On('text')
  async Ontext(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    if (!common.uzbPhoneRegex.test(text)) {
      ctx.reply(common.GreetingMessages.phone_number[lang]);
    } else {
      await ctx.scene.enter('AskProcessorPC');
    }
  }
}

@Scene('AskProcessorPC')
export class AskProcessorPc {
  constructor() {}
  @SceneEnter()
  async OnEnter(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(common.GreetingMessages.processor[lang]);
  }

  @On('text')
  async Ontext(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    if (!text) {
      ctx.reply(common.GreetingMessages.processor[lang]);
    } else {
      await ctx.reply(common.LastPcMessage[lang], {
        reply_markup: common.PCTasdiqKeyboard[lang],
      });
    }
  }

  @Action('elonTasdiq')
  async OnAction(ctx: common.ContextType) {
    await ctx.reply('Salomat');
  }
}
