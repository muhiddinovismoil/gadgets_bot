import { Action, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ContextType,
  getPhoneBrandKeyboard,
  WhichAndroidPhoneBrandMsg,
} from '@/common';
import { CallbackQuery } from 'telegraf/types';
import { AndroidDeviceModelAskMsg } from '@/common/constants/users/android/func';
import { EditLanguageScene } from './settings.scene';

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
  @Action(/^brand_.+/)
  async onBrandSelected(ctx: ContextType) {
    const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
    const callbackData = callbackQuery.data;
    const brandKey = callbackData.split('_')[1];
    await ctx.answerCbQuery();
    switch (brandKey) {
      case 'redmi':
        await ctx.scene.enter('RedmiScene');
        break;
      case 'samsung':
        await ctx.scene.enter('SamsungScene');
        break;
      case 'oppo':
        await ctx.scene.enter('OppoScene');
        break;
      case 'mi':
        await ctx.scene.enter('MiScene');
        break;
      case 'realme':
        await ctx.scene.enter('RealmeScene');
        break;
      case 'infinix':
        await ctx.scene.enter('InfinixScene');
        break;
      case 'poco':
        await ctx.scene.enter('PocoScene');
        break;
      case 'techno':
        await ctx.scene.enter('TechnoScene');
        break;
    }
  }
}
@Scene('SamsungScene')
export class SamsungScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('samsung')[lang]);
  }
}

@Scene('OppoScene')
export class OppoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('oppo')[lang]);
  }
}

@Scene('RedmiScene')
export class RedmiScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('redmi')[lang]);
  }
}

@Scene('MiScene')
export class MiScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('mi')[lang]);
  }
}

@Scene('RealmeScene')
export class RealmeScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('realme')[lang]);
  }
}

@Scene('InfinixScene')
export class InfinixScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('infinix')[lang]);
  }
}

@Scene('PocoScene')
export class PocoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('poco')[lang]);
  }
}

@Scene('TechnoScene')
export class TechnoScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const lang = ctx?.session?.lang;
    await ctx.editMessageText(AndroidDeviceModelAskMsg('tecno')[lang]);
  }
}
