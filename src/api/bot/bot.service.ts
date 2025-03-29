import { ContextType } from 'src/common';
import { Update, Ctx, Command, Action, On } from 'nestjs-telegraf';
import { selectLangKeys } from 'src/common/constants/general/keyboard';
import {
  mainMessage,
  startMessage,
} from 'src/common/constants/general/message';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from 'src/core';
import { usersMenuKeys } from 'src/common/constants/users/keyboard';

@Update()
export class BotService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
  ) {}
  @Command('start')
  async start(@Ctx() ctx: ContextType) {
    const data = await this.userRepo.findOne({
      where: { telegram_id: ctx.from?.id.toString() },
    });
    if (data?.lang) {
      ctx.session.lang = data?.lang;
    }
    if (data) {
      await ctx.reply(mainMessage[ctx.session.lang], {
        reply_markup: usersMenuKeys[ctx.session.lang],
      });
    } else {
      await ctx.reply(startMessage, {
        reply_markup: {
          ...selectLangKeys,
        },
      });
    }
  }
  @Action('uz')
  async setLangUz(@Ctx() ctx: ContextType) {
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
  async setLangRu(@Ctx() ctx: ContextType) {
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
  async setLangEn(@Ctx() ctx: ContextType) {
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
