import { Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from '@/common';

@Scene('AndroidDevice')
export class AndroidPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply('');
  }
}
