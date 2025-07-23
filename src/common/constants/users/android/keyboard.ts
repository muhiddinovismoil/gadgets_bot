import { Markup } from 'telegraf';
import { InlineKeyboardMarkup, InlineKeyboardButton } from 'telegraf/types';

export const TypeOfAndroidPhone: Record<string, Record<string, string>> = {
  redmi: {
    uz: '📱 Redmi',
    ru: '📱 Редми',
    en: '📱 Redmi',
  },
  poco: {
    uz: '⚡ Poco',
    ru: '⚡ Поко',
    en: '⚡ Poco',
  },
  mi: {
    uz: '🔥 Mi',
    ru: '🔥 Ми',
    en: '🔥 Mi',
  },
  samsung: {
    uz: '📶 Samsung',
    ru: '📶 Самсунг',
    en: '📶 Samsung',
  },
  oppo: {
    uz: '💎 Oppo',
    ru: '💎 Оппо',
    en: '💎 Oppo',
  },
  realme: {
    uz: '🎯 Realme',
    ru: '🎯 Реалми',
    en: '🎯 Realme',
  },
  infinix: {
    uz: '🟡 Infinix',
    ru: '🟡 Инфинекс',
    en: '🟡 Infinix',
  },
  tecno: {
    uz: '🔵 Tecno',
    ru: '🔵 Текно',
    en: '🔵 Tecno',
  },
};

export function getPhoneBrandKeyboard(lang: string): {
  reply_markup: InlineKeyboardMarkup;
} {
  const entries = Object.entries(TypeOfAndroidPhone);

  const inline_keyboard: InlineKeyboardButton[][] = [];

  for (let i = 0; i < entries.length; i += 2) {
    const row: InlineKeyboardButton[] = [];

    const [key1, label1] = entries[i];
    row.push({ text: label1[lang], callback_data: `brand_${key1}` });

    const pair = entries[i + 1];
    if (pair) {
      const [key2, label2] = pair;
      row.push({ text: label2[lang], callback_data: `brand_${key2}` });
    }

    inline_keyboard.push(row);
  }

  return {
    reply_markup: {
      inline_keyboard,
    },
  };
}
export const deliveryKeyboardAndroid: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesDeliveryAndroid'),
        Markup.button.callback("Yo'q", 'noDeliveryAndroid'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesDeliveryAndroid'),
        Markup.button.callback('No', 'noDeliveryAndroid'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesDeliveryAndroid'),
        Markup.button.callback('Нет', 'noDeliveryAndroid'),
      ],
    ],
  },
};

export const exchangeKeyboardAndroid: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesExchangeAndroid'),
        Markup.button.callback("Yo'q", 'noExchangeAndroid'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesExchangeAndroid'),
        Markup.button.callback('No', 'noExchangeAndroid'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesExchangeAndroid'),
        Markup.button.callback('Нет', 'noExchangeAndroid'),
      ],
    ],
  },
};
export const documentKeyboardAndroid: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Ha', 'yesDocumentAndroid'),
        Markup.button.callback("Yo'q", 'noDocumentAndroid'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Yes', 'yesDocumentAndroid'),
        Markup.button.callback('No', 'noDocumentAndroid'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Да', 'yesDocumentAndroid'),
        Markup.button.callback('Нет', 'noDocumentAndroid'),
      ],
    ],
  },
};

export const batteryConditionAndroid: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('🟢 Yaxshi', 'batteryGood'),
        Markup.button.callback("🟡 O'rtacha", 'batteryAverage'),
      ],
      [Markup.button.callback('🔴 Yomon', 'batteryBad')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('🟢 Good', 'batteryGood'),
        Markup.button.callback('🟡 Average', 'batteryAverage'),
      ],
      [Markup.button.callback('🔴 Bad', 'batteryBad')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('🟢 Хорошее', 'batteryGood'),
        Markup.button.callback('🟡 Среднее', 'batteryAverage'),
      ],
      [Markup.button.callback('🔴 Плохое', 'batteryBad')],
    ],
  },
};
