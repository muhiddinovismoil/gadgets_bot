import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { uzbPhoneRegex } from 'src/common/constants/general/regex';
import {
  PCTasdiqKeyboard,
  PcKeyboard,
} from 'src/common/constants/users/pc/keyboard';
import {
  GreetingMessages,
  LastPcMessage,
  MainPcMessage,
} from 'src/common/constants/users/pc/message';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(MainPcMessage[lang], {
      reply_markup: PcKeyboard[lang],
    });
  }

  @Action('elonYarat')
  async OnAction(ctx: ContextType) {
    await ctx.scene.enter('AskTypePc');
  }
}

@Scene('AskTypePc')
export class AskTypePcScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(GreetingMessages.type[lang]);
  }

  @On('text')
  async Ontext(ctx: ContextType) {
    const text = (ctx.update as any).message.text;

    if (!text) {
      await ctx.reply(GreetingMessages.type[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPricePc');
    }
  }
}

@Scene('AskPricePc')
export class AskPricePcScene {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(GreetingMessages.price[lang]);
  }

  @On('text')
  async Ontext(ctx: ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    console.log(typeof text);
    if (!isNaN(Number(text))) {
      ctx.reply(GreetingMessages.price[lang]);
    } else {
      await ctx.scene.enter('AskStoreName');
    }
  }
}

@Scene('AskStoreName')
export class AskStoreNamePc {
  constructor() {}

  @SceneEnter()
  async OnEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(GreetingMessages.store_name[lang]);
  }

  @On('text')
  async Ontext(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    if (!text) {
      await ctx.reply(GreetingMessages.store_name[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskPhoneNumberPC');
    }
  }
}

@Scene('AskPhoneNumberPC')
export class AskPhoneNumberPC {
  constructor() {}
  @SceneEnter()
  async OnEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(GreetingMessages.phone_number[lang]);
  }

  @On('text')
  async Ontext(ctx: ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    if (!uzbPhoneRegex.test(text)) {
      ctx.reply(GreetingMessages.phone_number[lang]);
    } else {
      await ctx.scene.enter('AskProcessorPC');
    }
  }
}

@Scene('AskProcessorPC')
export class AskProcessorPc {
  constructor() {}
  @SceneEnter()
  async OnEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    await ctx.reply(GreetingMessages.processor[lang]);
  }

  @On('text')
  async Ontext(ctx: ContextType) {
    const lang = ctx.session.lang;
    const text = (ctx.update as any).message.text;
    if (!text) {
      ctx.reply(GreetingMessages.processor[lang]);
    } else {
      await ctx.reply(LastPcMessage[lang], {
        reply_markup: PCTasdiqKeyboard[lang],
      });
    }
  }

  @Action('elonTasdiq')
  async OnAction(ctx: ContextType) {
    await ctx.reply('Salomat');
  }
}
