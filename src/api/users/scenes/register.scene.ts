import { On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { phoneNumberKeys } from 'src/common/constants/general/keyboard';
import {
  askName,
  askPhoneMessage,
  mainMessage,
} from 'src/common/constants/general/message';
import { usersMenuKeys } from 'src/common/constants/users/keyboard';

@Scene('Register')
export class RegisterScene {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(askName[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    const name = (ctx.update as any).message.text;
    ctx.scene.enter('AskPhoneNumber');
  }
}
@Scene('AskPhoneNumber')
export class AskPhoneNumber {
  constructor() {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(askPhoneMessage[ctx.session.lang], {
      reply_markup: phoneNumberKeys[ctx.session.lang],
      parse_mode: `HTML`,
    });
  }
  @On('contact')
  async textHandler(ctx: ContextType) {
    const phone_number = (ctx.update as any).message.contact.phone_number;
    const sentMessage = await ctx.reply('⌛️', {
      reply_markup: { remove_keyboard: true },
    });
    await ctx.deleteMessage(sentMessage.message_id);
    ctx.reply(mainMessage[ctx.session.lang], {
      reply_markup: usersMenuKeys[ctx.session.lang],
    });
  }
}
