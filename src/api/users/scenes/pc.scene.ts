import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply('Noutbuk turini kiriting');
  }

  @On('text')
  async textHandler(ctx: ContextType) {
    let text = (ctx.update as any).message.text;

    await ctx.reply(text);
    text = (ctx.update as any).message.text;

    await ctx.reply(text);
  }
}
