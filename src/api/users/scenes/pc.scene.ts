import { Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply('');
  }
}
