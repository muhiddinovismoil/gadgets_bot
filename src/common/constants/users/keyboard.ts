import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const usersMenuKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback(`📢 E'lon berish`, 'postAd')],
      [
        Markup.button.url(
          `📜 E'lonlarni ko‘rish`,
          'https://t.me/TechBozorOfficial',
        ),
      ],
      [Markup.button.callback(`📞 Admin bilan bog‘lanish`, 'contactAdmin')],
      [Markup.button.callback('⚙️ Sozlamalar', 'settings')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('📢 Post an Ad', 'postAd')],
      [Markup.button.url('📜 View Ads', 'https://t.me/TechBozorOfficial')],
      [Markup.button.callback('📞 Contact Admin', 'contactAdmin')],
      [Markup.button.callback('⚙️ Settings', 'settings')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('📢 Разместить объявление', 'postAd')],
      [
        Markup.button.url(
          '📜 Просмотр объявлений',
          'https://t.me/TechBozorOfficial',
        ),
      ],
      [Markup.button.callback('📞 Связаться с админом', 'contactAdmin')],
      [Markup.button.callback('⚙️ Настройки', 'settings')],
    ],
  },
};
export const adsCategoryKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('📱 Telefonlar', 'phones')],
      [Markup.button.callback('💻 Kompyuterlar', 'pc')],
      [Markup.button.callback('Orqaga 🔙', 'backMenu')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('📱 Telephones', 'phones')],
      [Markup.button.callback('💻 Computers', 'pc')],
      [Markup.button.callback('Back 🔙', 'backMenu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('📱 Телефоны', 'phones')],
      [Markup.button.callback('💻 Компьютеры', 'pc')],
      [Markup.button.callback('Назад 🔙', 'backMenu')],
    ],
  },
};

export const pcTypeKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('Laptop uchun', 'forLaptop')],
      [Markup.button.callback('PC uchun', 'forPC')],
      [Markup.button.callback('Orqaga 🔙', 'backAdsCategory')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('Для ноутбука', 'forLaptop')],
      [Markup.button.callback('Для ПК', 'forPC')],
      [Markup.button.callback('Назад 🔙', 'backAdsCategory')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('For Laptop', 'forLaptop')],
      [Markup.button.callback('For PC', 'forPC')],
      [Markup.button.callback('Back 🔙', 'backAdsCategory')],
    ],
  },
};

export const telephoneTypeKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('iPhone uchun', 'iPhone')],
      [Markup.button.callback('Android uchun', 'Android')],
      [Markup.button.callback('Orqaga 🔙', 'backAdsCategory')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('For iPhone', 'iPhone')],
      [Markup.button.callback('For Android', 'Android')],
      [Markup.button.callback('Back 🔙', 'backAdsCategory')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('Для iPhone', 'iPhone')],
      [Markup.button.callback('Для Android', 'Android')],
      [Markup.button.callback('Назад 🔙', 'backAdsCategory')],
    ],
  },
};
