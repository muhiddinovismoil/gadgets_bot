import { Update, InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import * as common from '@/common';
import { PrismaService } from '@/prisma';

@Update()
export class GlobalUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly prisma: PrismaService,
  ) {
    this.bot.use(async (ctx: common.ContextType, next) => {
      const messageText =
        ctx.message && 'text' in ctx.message ? ctx.message.text : null;

      if (messageText === '/start') {
        try {
          await ctx.scene.leave();
        } catch (e) {}

        const data = await this.prisma.user.findFirst({
          where: { telegramId: ctx.from?.id.toString() },
        });

        if (data?.language) {
          ctx.session.lang = data.language;
        }

        if (data) {
          await ctx.reply(common.mainMessage[ctx.session.lang], {
            reply_markup: common.usersMenuKeys[ctx.session.lang],
          });
        } else {
          await ctx.reply(common.startMessage, {
            reply_markup: { ...common.selectLangKeys },
          });
        }

        return;
      }

      await next();
    });
    this.bot.use(async (ctx: common.ContextType, next) => {
      try {
        if (ctx.callbackQuery) {
          const data =
            'data' in ctx.callbackQuery ? ctx.callbackQuery.data : '';
          if (data?.startsWith('approve_') || data?.startsWith('reject_')) {
            return next();
          }

          if (!ctx.session || !ctx.session.lang) {
            await ctx.editMessageText(
              "Iltimos start buyrug'ini yozing: /start\nPlease send start command: /start\nПожалуйста, отправьте команду /start",
              {
                reply_markup: { inline_keyboard: [] },
              },
            );

            await ctx.answerCbQuery('⚠️ Ushbu tugma endi aktiv emas.', {
              show_alert: true,
            });
            return;
          }
        }

        await next();
      } catch (err) {
        console.error('Callback error:', err);
        try {
          await ctx.answerCbQuery(
            '❌ Tugma muddati o‘tgan yoki xatolik yuz berdi.',
            { show_alert: true },
          );
        } catch {}
      }
    });
  }
}
