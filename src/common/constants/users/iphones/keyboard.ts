import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const deliveryKeyboard: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesDelivery'),
        Markup.button.callback("Yo'q", 'noDelivery'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesDelivery'),
        Markup.button.callback('No', 'noDelivery'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesDelivery'),
        Markup.button.callback('Нет', 'noDelivery'),
      ],
    ],
  },
};
export const exchangeKeyboard: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesExchange'),
        Markup.button.callback("Yo'q", 'noExchange'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesExchange'),
        Markup.button.callback('No', 'noExchange'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesExchange'),
        Markup.button.callback('Нет', 'noExchange'),
      ],
    ],
  },
};
export const documentKeyboard: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesDocument'),
        Markup.button.callback("Yo'q", 'noDocument'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesDocument'),
        Markup.button.callback('No', 'noDocument'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesDocument'),
        Markup.button.callback('Нет', 'noDocument'),
      ],
    ],
  },
};
