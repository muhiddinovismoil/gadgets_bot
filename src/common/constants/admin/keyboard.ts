import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const usersMenuKeyboard: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [[Markup.button.callback(`Kitob o'qish`, 'read_books')]],
  },
};
