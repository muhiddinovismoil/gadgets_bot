import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';
import { PrismaService } from '@/prisma';

@Scene('EditLanguageScene')
export class EditLanguageScene {
  constructor(private readonly prisma: PrismaService) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: common.ContextType) {
    const lang = ctx.session.lang;
    ctx.editMessageText(common.askResetLanguageMessage[lang], {
      reply_markup: common.selectLangKeys,
    });
  }

  @Action('uz')
  async onUzbekLang(@Ctx() ctx: common.ContextType) {
    const oldLang = ctx.session.lang;
    ctx.session.lang = 'uz';
    const newLang = ctx.session.lang;
    await this.prisma.user.update({
      where: { telegramId: `${ctx.from?.id}` },
      data: { language: 'uz' },
    });
    await ctx.editMessageText(common.settingsMessage[newLang], {
      reply_markup: common.settingsKeys[newLang],
    });
    await ctx.answerCbQuery(common.successMessageResetLanguage[oldLang]);
  }

  @Action('ru')
  async onRussianLang(@Ctx() ctx: common.ContextType) {
    const oldLang = ctx.session.lang;
    ctx.session.lang = 'ru';
    const newLang = ctx.session.lang;
    await this.prisma.user.update({
      where: { telegramId: `${ctx.from?.id}` },
      data: { language: 'ru' },
    });
    await ctx.editMessageText(common.settingsMessage[newLang], {
      reply_markup: common.settingsKeys[newLang],
    });
    await ctx.answerCbQuery(common.successMessageResetLanguage[oldLang]);
  }

  @Action('en')
  async onEnglishLang(@Ctx() ctx: common.ContextType) {
    const oldLang = ctx.session.lang;
    ctx.session.lang = 'en';
    const newLang = ctx.session.lang;
    await this.prisma.user.update({
      where: { telegramId: `${ctx.from?.id}` },
      data: { language: 'en' },
    });
    await ctx.editMessageText(common.settingsMessage[newLang], {
      reply_markup: common.settingsKeys[newLang],
    });
    await ctx.answerCbQuery(common.successMessageResetLanguage[oldLang]);
  }
}

@Scene('EditPhoneNumber')
export class EditPhoneNumber {
  constructor(private readonly prisma: PrismaService) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: common.ContextType) {
    const lang = ctx.session.lang;
    await ctx.editMessageText(common.askResetPhoneNumber[lang]);
  }

  @On('text')
  async onTextHandler(ctx: common.ContextType) {
    const lang = ctx.session.lang;
    const message = (ctx.update as any).message.text;
    if (!common.uzbPhoneRegex.test(message) && message == '+998121234567') {
      ctx.reply(common.incorrectPhoneNumber[lang]);
    } else {
      await this.prisma.user.update({
        where: { telegramId: `${ctx.from?.id}` },
        data: { phoneNumber: message },
      });
      await ctx.reply(common.successMessageResetPhoneNumber[lang]);
      await ctx.reply(common.settingsMessage[lang], {
        reply_markup: common.settingsKeys[lang],
      });
      await ctx.scene.leave();
    }
  }
}
