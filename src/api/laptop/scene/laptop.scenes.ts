import { On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { askName } from 'src/common/constants/general/message';

@Scene('Laptop')
export class LaptpScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(askName[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    const name = (ctx.update as any).message.text;
    ctx.reply("salom")
  }
}
