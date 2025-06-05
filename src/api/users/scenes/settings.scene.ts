import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';

@Scene('EditLanguageScene')
export class EditLanguageScene {
  constructor() {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: common.ContextType) {
    const lang = ctx.session.lang;
    ctx.editMessageText(
      common.askResetLanguageMessage[lang],
      common.selectLangKeys[lang],
    );
  }

  @Action('uz')
  async onUzbekLang(@Ctx() ctx: common.ContextType) {
    ctx.session.lang = 'uz';
  }

  @Action('ru')
  async onRussianLang(@Ctx() ctx: common.ContextType) {
    ctx.session.lang = 'uz';
  }

  @Action('en')
  async onEnglishLang(@Ctx() ctx: common.ContextType) {
    ctx.session.lang = 'uz';
  }
}

@Scene('EditPhoneNumber')
export class EditPhoneNumber {
  @SceneEnter()
  async onEnter(@Ctx() ctx: common.ContextType) {}

  @On('text')
  async onTextHandler() {}
}
