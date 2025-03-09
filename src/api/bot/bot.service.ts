import { ContextType } from 'src/common';
import { Update, Ctx, Command, Action } from 'nestjs-telegraf';
import { selectLangKeys } from 'src/common/constants/general/keyboard';
import { startMessage } from 'src/common/constants/general/message';

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
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'ru';
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'en';
  }
}
