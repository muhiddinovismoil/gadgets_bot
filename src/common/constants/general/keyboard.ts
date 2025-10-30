import { Lang } from '@/common/types';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const selectLangKeys: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback("🇺🇿 O'zbekcha", 'uz')],
    [Markup.button.callback('🇷🇺 Русский', 'ru')],
    [Markup.button.callback('🇺🇸 English', 'en')],
  ],
};
export const phoneNumberKeys = {
  uz: {
    keyboard: [[Markup.button.contactRequest('📞 Telefon raqamni yuborish')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
  ru: {
    keyboard: [[Markup.button.contactRequest('📞 Отправить номер телефона')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
  en: {
    keyboard: [[Markup.button.contactRequest('📞 Send phone number')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
export const settingsKeys = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback("🔄 Tilni o'zgartirish", 'selectLang')],
      [
        Markup.button.callback(
          "📞 Telefon raqamni o'zgartirish",
          'changeNumberOfUser',
        ),
      ],
      [Markup.button.callback('⬅️ Orqaga', 'backMenu')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔄 Change language', 'selectLang')],
      [Markup.button.callback('📞 Change phone number', 'changeNumberOfUser')],
      [Markup.button.callback('⬅️ Back', 'backMenu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔄 Изменить язык', 'selectLang')],
      [
        Markup.button.callback(
          '📞 Изменить номер телефона',
          'changeNumberOfUser',
        ),
      ],
      [Markup.button.callback('⬅️ Назад', 'backMenu')],
    ],
  },
};

export function buildConditionKeyboard({
  isPhoneAndroid,
}: {
  isPhoneAndroid: boolean;
}) {
  const prefix = isPhoneAndroid ? 'android' : 'iphone';

  const uz = [
    [
      { text: '🌟 Ideal', callback_data: `${prefix}_ideal` },
      { text: '👍 Yaxshi', callback_data: `${prefix}_yaxshi` },
    ],
    [
      { text: '⚖️ O‘rta', callback_data: `${prefix}_orta` },
      { text: '⚙️ Faqat qismlar uchun', callback_data: `${prefix}_parts` },
    ],
  ];

  const ru = [
    [
      { text: '🌟 Идеальное', callback_data: `${prefix}_ideal` },
      { text: '👍 Хорошее', callback_data: `${prefix}_yaxshi` },
    ],
    [
      { text: '⚖️ Среднее', callback_data: `${prefix}_orta` },
      { text: '⚙️ Только на запчасти', callback_data: `${prefix}_parts` },
    ],
  ];

  const en = [
    [
      { text: '🌟 Ideal', callback_data: `${prefix}_ideal` },
      { text: '👍 Good', callback_data: `${prefix}_yaxshi` },
    ],
    [
      { text: '⚖️ Average', callback_data: `${prefix}_orta` },
      { text: '⚙️ For parts only', callback_data: `${prefix}_parts` },
    ],
  ];

  return { uz, ru, en };
}
