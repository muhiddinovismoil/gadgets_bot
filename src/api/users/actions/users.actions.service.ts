import { Action, Ctx, Update } from 'nestjs-telegraf';
import * as common from '@/common';

@Update()
export class ActionsService {
  constructor() {}
  @Action('viewAds')
  async viewAds(@Ctx() ctx: common.ContextType) {
    ctx.reply('');
  }
  @Action('postAd')
  async onPostAd(@Ctx() ctx: common.ContextType) {
    ctx.editMessageText(common.adsCategoryMsg[ctx.session.lang], {
      reply_markup: common.adsCategoryKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('phones')
  async phonePosts(@Ctx() ctx: common.ContextType) {
    ctx.editMessageText(common.phonesTypeMsg[ctx.session.lang], {
      reply_markup: common.telephoneTypeKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('backMenu')
  async backMainMenu(@Ctx() ctx: common.ContextType) {
    ctx.editMessageText(common.mainMessage[ctx.session.lang], {
      reply_markup: common.usersMenuKeys[ctx.session.lang],
    });
  }
  @Action('backAdsCategory')
  async backToAdsMenu(@Ctx() ctx: common.ContextType) {
    ctx.editMessageText(common.adsCategoryMsg[ctx.session.lang], {
      reply_markup: common.adsCategoryKeys[ctx.session.lang],
    });
  }
  @Action('iPhone')
  async oniPhone(@Ctx() ctx: common.ContextType) {
    ctx.scene.enter('iPhoneDevice');
  }
  @Action('Android')
  async onAndroid(@Ctx() ctx: common.ContextType) {
    // ctx.scene.enter();
  }
  @Action('pc')
  async onPc(@Ctx() ctx: common.ContextType) {
    ctx.scene.enter('PCDevice');
  }
  @Action('settings')
  async onSettings(@Ctx() ctx: common.ContextType) {
    ctx.editMessageText(common.settingsMessage[ctx.session.lang], {
      reply_markup: common.settingsKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('selectLang')
  async onResetLanguage(@Ctx() ctx: common.ContextType) {
    ctx.scene.enter('EditLanguageScene');
  }

  @Action('changeNumberOfUser')
  async onResetPhoneNumber(@Ctx() ctx: common.ContextType) {
    ctx.scene.enter('EditPhoneNumber');
  }

  @Action('contactAdmin')
  async onContactWithAdmin(@Ctx() ctx: common.ContextType) {
    await ctx.editMessageText(
      `Bu funksiya xali qo'shilmadi qayta boshlash uchun /start ni bosing`,
    );
  }
}
