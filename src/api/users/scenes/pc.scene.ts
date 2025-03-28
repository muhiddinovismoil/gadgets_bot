import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { PcKeyboard } from 'src/common/constants/users/pc/keyboard';
import {
  GreetingMessages,
  MainMessage,
} from 'src/common/constants/users/pc/message';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx.session.lang;
    const message = MainMessage[lang];
    await ctx.reply(message, {
      reply_markup: PcKeyboard[ctx.session.lang],
    });
  }


  @On('text')
  async textHandler(ctx: ContextType) {
    const text = (ctx.update as any).message.text;
    ctx.scene.enter(text);
    
  }

  @Action('elonYarat')
  async fn(ctx: ContextType) {
    const lang = ctx.session.lang;

    await ctx.reply(GreetingMessages.type[lang]);

    const type = (ctx.update as any).message.text;

    await ctx.reply(GreetingMessages.price[lang]);

    const price = (ctx.update as any).message.text;

    await ctx.reply(GreetingMessages.store_name[lang]);

    const storename = (ctx.update as any).message.text;

    await ctx.reply(GreetingMessages.phone_number[lang]);

    const phoneNumber = (ctx.update as any).message.text;

    await ctx.reply(GreetingMessages.processor[lang]);

    const processor = (ctx.update as any).message.text;

    const text = `
    Type:${type}
    Price:${price}
    Storename:${storename}
    Phone Number:${phoneNumber}
    Processor:${processor}
    `;
    await ctx.reply(text);
  }
}
