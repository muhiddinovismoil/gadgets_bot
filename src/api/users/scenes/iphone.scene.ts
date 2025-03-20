import { Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';

@Scene('iPhoneDevice')
export class iPhonePostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply('');
  }
}
