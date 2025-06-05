import { On, Scene, SceneEnter } from 'nestjs-telegraf';
import * as common from '@/common';

@Scene('Register')
export class RegisterScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.editMessageText(common.askName[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: common.ContextType) {
    const name = (ctx.update as any).message.text;
    await this.userRepo.update(
      { telegram_id: `${ctx.from?.id}` },
      { full_name: name, username: `${ctx.from?.username}` },
    );
    ctx.scene.enter('AskPhoneNumber');
  }
}
@Scene('AskPhoneNumber')
export class AskPhoneNumber {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: common.ContextType) {
    await ctx.reply(common.askPhoneMessage[ctx.session.lang], {
      reply_markup: common.phoneNumberKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @On('contact')
  async textHandler(ctx: common.ContextType) {
    const phone_number = (ctx.update as any).message.contact.phone_number;
    const sentMessage = await ctx.reply('⌛️', {
      reply_markup: { remove_keyboard: true },
    });
    await this.userRepo.update(
      { telegram_id: `${ctx.from?.id}` },
      { phone_number: phone_number },
    );
    await ctx.deleteMessage(sentMessage.message_id);
    ctx.reply(common.mainMessage[ctx.session.lang], {
      reply_markup: common.usersMenuKeys[ctx.session.lang],
    });
  }
}
