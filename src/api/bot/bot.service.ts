import { Update, Ctx, Action, Hears, Command } from 'nestjs-telegraf';
import * as common from '@/common';
import { PrismaService } from '@/prisma';

@Update()
export class BotService {
  constructor(private readonly prisma: PrismaService) {}

  @Command('/start')
  async start(@Ctx() ctx: common.ContextType) {
    const data = await this.prisma.user.findFirst({
      where: { telegramId: ctx.from?.id.toString() },
    });
    if (data?.language) {
      ctx.session.lang = data?.language;
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
    const data = await this.prisma.user.findFirst({
      where: { telegramId: `${ctx.from?.id}` },
    });
    if (!data) {
      await this.prisma.user.create({
        data: {
          telegramId: ctx.from?.id.toString(),
          language: 'uz',
        },
      });
    }
    ctx.session.lang = 'uz';
    ctx.scene.enter('Register');
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: common.ContextType) {
    const data = await this.prisma.user.findFirst({
      where: { telegramId: `${ctx.from?.id}` },
    });
    if (!data) {
      await this.prisma.user.create({
        data: {
          telegramId: ctx.from?.id?.toString(),
          language: 'ru',
        },
      });
    }
    ctx.session.lang = 'ru';
    ctx.scene.enter('Register');
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: common.ContextType) {
    const data = await this.prisma.user.findFirst({
      where: { telegramId: `${ctx.from?.id}` },
    });
    if (!data) {
      await this.prisma.user.create({
        data: {
          telegramId: ctx.from?.id?.toString(),
          language: 'en',
        },
      });
    }
    ctx.session.lang = 'en';
    ctx.scene.enter('Register');
  }
}
