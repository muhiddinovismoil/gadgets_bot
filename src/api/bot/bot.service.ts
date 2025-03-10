import { ContextType } from 'src/common';
import { Update, Ctx, Command, Action, On } from 'nestjs-telegraf';
import { selectLangKeys } from 'src/common/constants/general/keyboard';
import { askName, startMessage } from 'src/common/constants/general/message';

@Update()
export class BotService {
  constructor() {}
  @Command('start')
  async start(@Ctx() ctx: ContextType) {
    ctx.reply(startMessage, {
      reply_markup: {
        ...selectLangKeys,
      },
    });
  }
  @Action('uz')
  async setLangUz(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
    ctx.editMessageText(askName[ctx.session.lang]);
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'ru';
    ctx.editMessageText(askName[ctx.session.lang]);
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'en';
    ctx.editMessageText(askName[ctx.session.lang]);
  }
}
