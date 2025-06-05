import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { settingsKeys } from 'src/common/constants/general/keyboard';
import * as generalMessages from 'src/common/constants/general/message';
import * as usersKeys from 'src/common/constants/users/keyboard';
import * as usersMessage from 'src/common/constants/users/message';

@Update()
export class ActionsService {
  constructor() {}
  @Action('viewAds')
  async viewAds(@Ctx() ctx: ContextType) {
    ctx.reply('');
  }
  @Action('postAd')
  async onPostAd(@Ctx() ctx: ContextType) {
    ctx.editMessageText(usersMessage.adsCategoryMsg[ctx.session.lang], {
      reply_markup: usersKeys.adsCategoryKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('phones')
  async phonePosts(@Ctx() ctx: ContextType) {
    ctx.editMessageText(usersMessage.phonesTypeMsg[ctx.session.lang], {
      reply_markup: usersKeys.telephoneTypeKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('backMenu')
  async backMainMenu(@Ctx() ctx: ContextType) {
    ctx.editMessageText(generalMessages.mainMessage[ctx.session.lang], {
      reply_markup: usersKeys.usersMenuKeys[ctx.session.lang],
    });
  }
  @Action('backAdsCategory')
  async backToAdsMenu(@Ctx() ctx: ContextType) {
    ctx.editMessageText(usersMessage.adsCategoryMsg[ctx.session.lang], {
      reply_markup: usersKeys.adsCategoryKeys[ctx.session.lang],
    });
  }
  @Action('iPhone')
  async oniPhone(@Ctx() ctx: ContextType) {
    ctx.scene.enter('iPhoneDevice');
  }
  @Action('Android')
  async onAndroid(@Ctx() ctx: ContextType) {
    // ctx.scene.enter();
  }
  @Action('pc')
  async onPc(@Ctx() ctx: ContextType) {
    ctx.scene.enter('PCDevice');
  }
  @Action('settings')
  async onSettings(@Ctx() ctx: ContextType) {
    ctx.editMessageText(generalMessages.settingsMessage[ctx.session.lang], {
      reply_markup: settingsKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('selectLang')
  async onResetLanguage(@Ctx() ctx: ContextType) {
    ctx.scene.enter('EditLanguageScene');
  }
}
