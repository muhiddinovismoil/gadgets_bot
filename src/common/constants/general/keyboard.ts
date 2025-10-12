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

  const buttons = [
    [
      { text: 'A+ (Deyarli yangi)', callback_data: `${prefix}_Aplus` },
      { text: 'A (Yaxshi holat)', callback_data: `${prefix}_A` },
    ],
    [
      { text: 'B (O‘rta holat)', callback_data: `${prefix}_B` },
      { text: 'C (Qoniqarli)', callback_data: `${prefix}_C` },
    ],
    [{ text: '⚙️ Faqat qismlar uchun', callback_data: `${prefix}_parts` }],
  ];

  const langs: Record<Lang, any> = {
    uz: { inline_keyboard: buttons },
    ru: { inline_keyboard: buttons },
    en: { inline_keyboard: buttons },
  };

  return langs;
}
