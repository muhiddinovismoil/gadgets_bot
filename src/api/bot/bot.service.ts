import { Update, Ctx, Action, Hears, Command } from 'nestjs-telegraf';
import * as common from '@/common';
import { PrismaService } from '@/prisma';
import { InputMediaPhoto } from 'telegraf/types';

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

  @Action(/^ap_([a-f0-9]{8})_(\d+)_(\d+)$/)
  async onApprovePost(@Ctx() ctx: common.ContextType) {
    try {
      const query = ctx.callbackQuery;
      if (!query || !('data' in query)) return;

      const data = query.data;
      const parts = data.split('_');
      const shortId = parts[1];
      const adminChannelMessageId = parseInt(parts[2]);
      const adminConfirmationMessageId = parseInt(parts[3]);

      const postData = await this.prisma.phones.findFirst({
        where: { id: { startsWith: shortId } },
      });

      if (!postData) {
        await ctx.answerCbQuery('Post topilmadi!');
        return;
      }

      const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID!;
      const PUBLIC_CHANNEL_ID = process.env.PUBLIC_CHANNEL_ID!;

      const phoneInfo = common.androidTemplate(postData as any);
      const images = (postData.images || []) as string[];

      const media: InputMediaPhoto[] = images.map((file_id, index) => ({
        type: 'photo' as const,
        media: file_id,
        caption: index === 0 ? phoneInfo : undefined,
        parse_mode: 'HTML',
      }));

      await ctx.telegram.sendMediaGroup(PUBLIC_CHANNEL_ID, media);

      const deletePromises = [
        ctx.telegram
          .deleteMessage(ADMIN_CHANNEL_ID, adminChannelMessageId)
          .catch((err) => console.warn("Media o'chirishda xatolik:", err)),
        ctx.telegram
          .deleteMessage(ADMIN_CHANNEL_ID, adminConfirmationMessageId)
          .catch((err) =>
            console.warn("Confirmation o'chirishda xatolik:", err),
          ),
      ];

      await Promise.all(deletePromises);

      await ctx.answerCbQuery('✅ Tasdiqlandi va kanalga yuklandi!');
    } catch (error) {
      console.error('Approve error:', error.message);
      await ctx.answerCbQuery('Xatolik yuz berdi!');
    }
  }

  @Action(/^rj_([a-f0-9]{8})_(\d+)_(\d+)$/)
  async onRejectPost(@Ctx() ctx: common.ContextType) {
    try {
      const query = ctx.callbackQuery;
      if (!query || !('data' in query)) return;

      const data = query.data;
      const parts = data.split('_');
      const shortId = parts[1];
      const adminChannelMessageId = parseInt(parts[2]);
      const adminConfirmationMessageId = parseInt(parts[3]);

      const postData = await this.prisma.phones.findFirst({
        where: { id: { startsWith: shortId } },
      });

      if (!postData) {
        await ctx.answerCbQuery('Post topilmadi!');
        return;
      }

      const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID!;

      const deletePromises = [
        ctx.telegram
          .deleteMessage(ADMIN_CHANNEL_ID, adminChannelMessageId)
          .catch((err) => console.warn("Media o'chirishda xatolik:", err)),
        ctx.telegram
          .deleteMessage(ADMIN_CHANNEL_ID, adminConfirmationMessageId)
          .catch((err) =>
            console.warn("Confirmation o'chirishda xatolik:", err),
          ),
      ];

      await Promise.all(deletePromises);

      await this.prisma.phones.delete({ where: { id: postData.id } });

      await ctx.answerCbQuery("❌ Rad etildi va o'chirildi!");
    } catch (error) {
      console.error('Reject error:', error.message);
      await ctx.answerCbQuery('Xatolik yuz berdi!');
    }
  }
}
