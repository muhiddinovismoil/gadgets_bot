import { ContextType } from '@/common';
import { Scene, SceneEnter } from 'nestjs-telegraf';

@Scene('PCDevice')
export class PcPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply('');
  }
}
