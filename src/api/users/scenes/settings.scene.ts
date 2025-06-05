import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { selectLangKeys } from 'src/common/constants/general/keyboard';
import { askResetLanguageMessage } from 'src/common/constants/general/message';
import { UserEntity, UserRepository } from 'src/core';

@Scene('EditLanguageScene')
export class EditLanguageScene {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    const lang = ctx.session.lang;
    ctx.editMessageText(askResetLanguageMessage[lang], selectLangKeys[lang]);
  }

  @Action('uz')
  async onUzbekLang(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
  }

  @Action('ru')
  async onRussianLang(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
  }

  @Action('en')
  async onEnglishLang(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
  }
}

@Scene('EditPhoneNumber')
export class EditPhoneNumber {
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {}

  @On('text')
  async onTextHandler() {}
}
