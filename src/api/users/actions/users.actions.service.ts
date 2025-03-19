import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  adsCategoryKeys,
  telephoneTypeKeys,
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
  @Action('iPhone')
  async oniPhone(@Ctx() ctx: ContextType) {
    // ctx.scene.enter();
  }
}
