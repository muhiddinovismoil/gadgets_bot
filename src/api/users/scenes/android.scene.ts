import { Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ContextType,
  getPhoneBrandKeyboard,
  WhichAndroidPhoneBrandMsg,
} from '@/common';

@Scene('AndroidDevice')
export class AndroidPostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(WhichAndroidPhoneBrandMsg[lang], {
      ...getPhoneBrandKeyboard(lang),
    });
  }
}
