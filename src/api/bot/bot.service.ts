import { Update, Ctx, Command, Action } from 'nestjs-telegraf';
import * as common from '@/common';

@Update()
export class BotService {
  constructor() {}
  @Command('start')
  async start(@Ctx() ctx: common.ContextType) {
    const data = await this.userRepo.findOne({
      where: { telegram_id: ctx.from?.id.toString() },
    });
    if (data?.lang) {
      ctx.session.lang = data?.lang;
    }
    if (data) {
      await ctx.reply(common.mainMessage[ctx.session.lang], {
        reply_markup: common.usersMenuKeys[ctx.session.lang],
      });
    } else {
      await ctx.reply(common.startMessage, {
        reply_markup: {
          ...common.selectLangKeys,
        },
      });
    }
  }
  @Action('uz')
  async setLangUz(@Ctx() ctx: common.ContextType) {
    const data = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from?.id}` },
    });
    if (!data) {
      const newUser = this.userRepo.create({
        telegram_id: ctx.from?.id?.toString(),
        lang: 'uz',
      });
      await this.userRepo.save(newUser);
    }
    ctx.session.lang = 'uz';
    ctx.scene.enter('Register');
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: common.ContextType) {
    const data = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from?.id}` },
    });
    if (!data) {
      const newUser = this.userRepo.create({
        telegram_id: ctx.from?.id?.toString(),
        lang: 'ru',
      });
      await this.userRepo.save(newUser);
    }
    ctx.session.lang = 'ru';
    ctx.scene.enter('Register');
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: common.ContextType) {
    const data = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from?.id}` },
    });
    if (!data) {
      const newUser = this.userRepo.create({
        telegram_id: ctx.from?.id?.toString(),
        lang: 'en',
      });
      await this.userRepo.save(newUser);
    }
    ctx.session.lang = 'en';
    ctx.scene.enter('Register');
  }
}
