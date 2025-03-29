import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { mainMessage } from 'src/common/constants/general/message';
import {
  adsCategoryKeys,
  telephoneTypeKeys,
  usersMenuKeys,
} from 'src/common/constants/users/keyboard';
import {
  adsCategoryMsg,
  phonesTypeMsg,
} from 'src/common/constants/users/message';

@Update()
export class ActionsService {
  constructor() {}
  @Action('viewAds')
  async viewAds(@Ctx() ctx: ContextType) {
    ctx.reply('');
  }
  @Action('postAd')
  async onPostAd(@Ctx() ctx: ContextType) {
    ctx.editMessageText(adsCategoryMsg[ctx.session.lang], {
      reply_markup: adsCategoryKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('phones')
  async phonePosts(@Ctx() ctx: ContextType) {
    ctx.editMessageText(phonesTypeMsg[ctx.session.lang], {
      reply_markup: telephoneTypeKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @Action('backMenu')
  async backMainMenu(@Ctx() ctx: ContextType) {
    ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: usersMenuKeys[ctx.session.lang],
    });
  }
  @Action('backAdsCategory')
  async backToAdsMenu(@Ctx() ctx: ContextType) {
    ctx.editMessageText(adsCategoryMsg[ctx.session.lang], {
      reply_markup: adsCategoryKeys[ctx.session.lang],
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
}
