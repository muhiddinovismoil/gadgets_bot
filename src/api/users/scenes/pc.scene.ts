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
    await ctx.reply(MainMessage[lang], {
      reply_markup: PcKeyboard[lang],
    });
  }

  @On('text')
  async textHandler(ctx: ContextType) {
    if (!( ctx.update as any).session.step ) return;

    const text = ( ctx.update as any).message.text ;

    switch (( ctx.update as any).session.step ) {
      case 'type':
        ( ctx.update as any).session.step  = text;
        ( ctx.update as any).session.step  = 'price';
        await ctx.reply(GreetingMessages.price[ctx.session.lang]);
        break;

      case 'price':
        ( ctx.update as any).session.step  = text;
        ( ctx.update as any).session.step = 'store_name';
        await ctx.reply(GreetingMessages.store_name[ctx.session.lang]);
        break;

      case 'store_name':
        ( ctx.update as any).session.step  = text;
        ( ctx.update as any).session.step = 'phone_number';
        await ctx.reply(GreetingMessages.phone_number[ctx.session.lang]);
        break;

      case 'phone_number':
        ( ctx.update as any).session.step  = text;
        ( ctx.update as any).session.step = 'processor';
        await ctx.reply(GreetingMessages.processor[ctx.session.lang]);
        break;

      case 'processor':
        ( ctx.update as any).session.step  = text;
        ( ctx.update as any).session.step  = null; // Reset step

        const result = `
        Type: ${( ctx.update as any).session.type }
        Price: ${( ctx.update as any).session.price }
        Store Name: ${( ctx.update as any).session.store_name }
        Phone Number: ${( ctx.update as any).session.phone_number }
        Processor: ${( ctx.update as any).session.processor }
        `;

        await ctx.reply(result);
        break;
    }
  }

  @Action('elonYarat')
  async fn(ctx: ContextType) {
    ( ctx.update as any).session.step = 'type';
    await ctx.reply(GreetingMessages.type[ctx.session.lang]);
  }
}
