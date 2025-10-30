import { Action, Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';
import { Telegraf } from 'telegraf';
import { PrismaService } from '@/prisma';
import { InputMediaPhoto } from 'telegraf/types';

@Scene('iPhoneDevice')
export class iPhonePostScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askModelPhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const model = (ctx.update as any).message.text;
    if (!common.iPhoneModelRegex.test(model)) {
      await ctx.reply(common.incorrectFormatPhoneModel[ctx.session.lang]);
    } else {
      ctx.session.iphoneInfo.model = model;
      await ctx.scene.enter('askMemoryOfiPhone');
    }
  }
}
@Scene('askMemoryOfiPhone')
export class AskiPhoneMemoryScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askStoragePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const text = (ctx.update as any).message.text;
    if (!common.PhoneMemoryRegex.test(text)) {
      await ctx.reply(common.incorrectFormatPhoneMemory[ctx.session.lang]);
    } else {
      ctx.session.iphoneInfo.memory = text;
      await ctx.scene.enter('AskisDeliveryValidForIphone');
    }
  }
}
@Scene('AskisDeliveryValidForIphone')
export class AskisDeliveryValidForIphone {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askIsDeliveryValid[ctx.session.lang], {
      reply_markup: common.deliveryKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDelivery')
  async onYesDelivery(ctx: common.ContextType) {
    ctx.session.iphoneInfo.delivery = true;
    await ctx.scene.enter('AskiPhonePrice');
  }
  @Action('noDelivery')
  async onNoDelivery(ctx: common.ContextType) {
    ctx.session.iphoneInfo.delivery = false;
    await ctx.scene.enter('AskiPhonePrice');
  }
}
@Scene('AskiPhonePrice')
export class AskiPhonePrice {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    ctx.editMessageText(common.askPricePhoneMsg[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.PhonePriceRegex.test(message)) {
      ctx.reply(common.incorrectPricePhoneMsg[ctx.session.lang]);
    } else {
      ctx.session.iphoneInfo.price = message;
      await ctx.scene.enter('AskIsExchangeValid');
    }
  }
}
@Scene('AskIsExchangeValid')
export class AskIsExchangeValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askExchange[ctx.session.lang], {
      reply_markup: common.exchangeKeyboard[ctx.session.lang],
    });
  }
  @Action('yesExchange')
  async onYesExchange(ctx: common.ContextType) {
    ctx.session.iphoneInfo.exchange = true;
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
  @Action('noExchange')
  async onNoExchange(ctx: common.ContextType) {
    ctx.session.iphoneInfo.exchange = false;
    await ctx.scene.enter('AskiPhoneDocumentsValid');
  }
}
@Scene('AskiPhoneCondition')
export class AskiPhoneCondition {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    const s = ctx.session;
    s.isSceneChanging = false;
    s.currentMediaGroupId = undefined;
    s.tempGroupImages = [];
    clearTimeout(s.groupTimeout);
    clearTimeout(s.singleTimeout);
    await ctx.reply(common.askConditionOfPhone[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: common.buildConditionKeyboard({
          isPhoneAndroid: false,
        })[ctx.session.lang],
      },
    });
  }
  @Action('iphone_ideal')
  async onIdealAction(@Ctx() ctx: common.ContextType) {
    ctx.session.iphoneInfo.condition = 'Ideal';
    ctx.scene.enter('AskiPhoneDocumentsValid');
  }

  @Action('iphone_yaxshi')
  async onGoodAction(@Ctx() ctx: common.ContextType) {
    ctx.session.iphoneInfo.condition = 'Yaxshi';
    ctx.scene.enter('AskiPhoneDocumentsValid');
  }

  @Action('iphone_orta')
  async onAverageAction(@Ctx() ctx: common.ContextType) {
    ctx.session.iphoneInfo.condition = "O'rta";
    ctx.scene.enter('AskiPhoneDocumentsValid');
  }

  @Action('iphone_parts')
  async onPartsAction(@Ctx() ctx: common.ContextType) {
    ctx.session.iphoneInfo.condition = 'Extiyot qism';
    ctx.scene.enter('AskiPhoneDocumentsValid');
  }
}

@Scene('AskiPhoneDocumentsValid')
export class AskiPhoneDocumentsValid {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askIsDocumentsValid[ctx.session.lang], {
      reply_markup: common.documentKeyboard[ctx.session.lang],
    });
  }
  @Action('yesDocument')
  async onYesDocument(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
  @Action('noDocument')
  async onNoDocument(ctx: common.ContextType) {
    await ctx.scene.enter('AskiPhoneBattaryCondition');
  }
}
@Scene('AskiPhoneBattaryCondition')
export class AskiPhoneBattaryCondition {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askConditionOfBattary[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.iPhoneBattaryRegex.test(message)) {
      await ctx.reply(common.incorrectBattaryPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneRegion');
    }
  }
}
@Scene('AskiPhoneRegion')
export class AskiPhoneRegion {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askRegionOfPhone[ctx.session.lang]);
  }
  @On('text')
  async onText(ctx: common.ContextType) {
    const message = (ctx.update as any).message.text;
    if (!common.iPhoneRegionRegex.test(message)) {
      await ctx.reply(common.incorrectRegionPhoneMsg[ctx.session.lang]);
    } else {
      await ctx.scene.enter('AskiPhoneOtherInfo');
    }
  }
}

@Scene('AskiPhoneOtherInfo')
export class AskiPhoneOtherInfo {
  constructor() {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askOtherInfoAboutPhone[ctx.session.lang]);
  }

  @On('text')
  async onText(ctx: common.ContextType) {
    ctx.scene.enter('AskiPhoneImages');
  }
}

@Scene('AskiPhoneImages')
export class AskiPhoneImages {
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askPhoneImages[ctx.session.lang]);
    ctx.session.iphoneInfo.images = [];
    ctx.session.sendToAdmin = false;
  }

  @On('message')
  async onMessage(ctx: common.ContextType) {
    const session = ctx.session;

    const iphoneInfo =
      session.iphoneInfo ||
      (session.iphoneInfo = { ...common.defaultPhoneInfo });
    const images = iphoneInfo.images;

    if (
      !ctx.message ||
      !('photo' in ctx.message) ||
      !Array.isArray(ctx.message.photo) ||
      ctx.message.photo.length === 0
    ) {
      await ctx.reply(common.requestImageMessage[session.lang]);
      return;
    }

    const photos = ctx.message.photo;
    const lastPhoto = photos[photos.length - 1];
    if (!lastPhoto?.file_id) {
      await ctx.reply(common.requestImageMessage[session.lang]);
      return;
    }

    const mediaGroupId = (ctx.message as any).media_group_id;

    if (session.isSceneChanging) return;

    if (mediaGroupId) {
      if (session.currentMediaGroupId !== mediaGroupId) {
        session.currentMediaGroupId = mediaGroupId;
        session.tempGroupImages = [];
      }

      (session.tempGroupImages ??= []).push(lastPhoto.file_id);

      clearTimeout(session.groupTimeout);
      session.groupTimeout = setTimeout(async () => {
        images.push(...(session.tempGroupImages ?? []));
        delete session.tempGroupImages;
        delete session.currentMediaGroupId;

        if (images.length > 6) {
          images.splice(6);
          await ctx.reply(common.alertSendingImageLimitMsg[session.lang]);
        }

        iphoneInfo.images = images;

        session.isSceneChanging = true;
        await ctx.scene.enter('AskiPhonePostAcceptation');
      }, 1000);

      return;
    }

    images.push(lastPhoto.file_id);

    if (images.length > 6) {
      images.splice(6);
      await ctx.reply(common.alertSendingImageLimitMsg[session.lang]);
    }

    iphoneInfo.images = images;

    clearTimeout(session.singleTimeout);
    session.singleTimeout = setTimeout(async () => {
      session.isSceneChanging = true;
      await ctx.scene.enter('AskiPhonePostAcceptation');
    }, 1000);
  }
}

@Scene('AskiPhonePostAcceptation')
export class AskiPhonePostAcceptation {
  constructor(
    @InjectBot() private readonly telegram: Telegraf,
    private readonly prisma: PrismaService,
  ) {}

  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await this.sendPostToUser(ctx);
    const confirmationMessage = await ctx.reply(
      common.askingConfirmation[ctx.session.lang],
      {
        reply_markup: common.acceptEditKeyboard[ctx.session.lang],
      },
    );
    ctx.session.lastConfirmationMessage = confirmationMessage.message_id;
  }

  @Action('accept')
  async onActionAccept(@Ctx() ctx: common.ContextType) {
    if (!ctx.session.sendToAdmin) {
      ctx.session.sendToAdmin = true;
      const { phone_number, price, ...restData } = ctx.session.iphoneInfo;
      const data = await this.prisma.phones.create({
        data: {
          ...restData,
          phoneNumber: ctx.session.iphoneInfo.phone_number,
          price: Number(ctx.session.iphoneInfo.price),
        },
      });
      ctx.session.postId = data.id;
    }

    const lastMessageId = ctx.session.lastMessage?.message_id;
    const chatId = ctx.chat?.id;

    if (chatId && lastMessageId) {
      try {
        await ctx.telegram.deleteMessage(chatId, lastMessageId);
      } catch (err) {
        console.warn("Postni o'chirishda xatolik:", err);
      }
    }

    const confirmationMessageId = ctx.session.lastConfirmationMessage;

    if (chatId && confirmationMessageId) {
      try {
        await ctx.telegram.editMessageText(
          chatId,
          confirmationMessageId,
          undefined,
          common.adPostSubmittedMessage[ctx.session.lang],
          {
            reply_markup: { inline_keyboard: [] },
          },
        );
        await ctx.answerCbQuery();
      } catch (err) {
        console.warn('Confirmation messageni edit qilishda xatolik:', err);
        await ctx.answerCbQuery();
      }
    } else {
      await ctx.answerCbQuery();
    }

    await this.sendPostToAdmin(ctx);
  }

  @Action('edit')
  async onActionEdit(@Ctx() ctx: common.ContextType) {
    const lastMessageId = ctx.session.lastMessage?.message_id;
    const confirmationMessageId = ctx.session.lastConfirmationMessage;
    const chatId = ctx.chat?.id;

    ctx.session.iphoneInfo = common.defaultPhoneInfo;

    if (chatId) {
      if (lastMessageId) {
        try {
          await ctx.telegram.deleteMessage(chatId, lastMessageId);
        } catch (err) {
          console.warn("Postni o'chirishda xatolik:", err);
        }
      }
    }

    ctx.session.lastMessage = undefined;
    ctx.session.lastConfirmationMessage = undefined;
    ctx.session.isEditing = true;
    ctx.session.sendToAdmin = false;

    await ctx.answerCbQuery();
    await ctx.scene.enter('iPhoneDevice');
  }

  async sendPostToUser(ctx: common.ContextType) {
    const iphoneInfo = ctx.session.iphoneInfo;
    if (!iphoneInfo) {
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );
    }

    const images = iphoneInfo.images || [];
    const phoneInfo = common.iphoneTemplate(iphoneInfo);

    if (!images.length) {
      return await ctx.reply(
        common.askSendingAtLeastOneImage[ctx.session.lang],
      );
    }
    if (!phoneInfo) {
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );
    }

    const media: InputMediaPhoto[] = images.map((file_id, index) => ({
      type: 'photo' as const,
      media: file_id,
      caption: index === 0 ? phoneInfo : undefined,
      parse_mode: 'HTML',
    }));

    if (!ctx.chat || !ctx.chat.id) return;
    const sentMessages = await ctx.telegram.sendMediaGroup(ctx.chat.id, media);

    ctx.session.lastMessage = sentMessages[0];

    ctx.session.sendToAdmin = false;
  }

  async sendPostToAdmin(ctx: common.ContextType) {
    const images = ctx.session.iphoneInfo.images || [];
    const phoneInfo = common.iphoneTemplate(
      ctx.session.iphoneInfo as common.PhoneInfoI,
    );

    if (!images.length)
      return await ctx.reply(
        common.askSendingAtLeastOneImage[ctx.session.lang],
      );
    if (!phoneInfo)
      return await ctx.reply(
        common.thereIsNoAnyInfoAboutPhone[ctx.session.lang],
      );

    const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID!;

    const media: InputMediaPhoto[] = images.map((file_id, index) => ({
      type: 'photo' as const,
      media: file_id,
      caption: index === 0 ? phoneInfo : undefined,
      parse_mode: 'HTML',
    }));

    const sentMedia = await ctx.telegram.sendMediaGroup(
      ADMIN_CHANNEL_ID,
      media,
    );
    const firstMediaMessageId = sentMedia[0].message_id;

    const confirmationMsg = await ctx.telegram.sendMessage(
      ADMIN_CHANNEL_ID,
      'Postni tasdiqlaysizmi?',
      {
        reply_markup: common.approvalKeyboard(
          ctx.session.postId as string,
          firstMediaMessageId,
          0,
        ).uz,
      },
    );

    await ctx.telegram.editMessageReplyMarkup(
      ADMIN_CHANNEL_ID,
      confirmationMsg.message_id,
      undefined,
      common.approvalKeyboard(
        ctx.session.postId as string,
        firstMediaMessageId,
        confirmationMsg.message_id,
      ).uz,
    );

    const chatId = ctx.chat?.id;
    if (!chatId) return;

    ctx.session.sendToAdmin = false;
    ctx.scene.leave();
  }
}
