import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const usersMenuKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback(`📢 E'lon berish`, 'postAd')],
      [Markup.button.callback(`📜 E'lonlarni ko‘rish`, 'viewAds')],
      [Markup.button.callback(`📞 Admin bilan bog‘lanish`, 'contactAdmin')],
      [Markup.button.callback('⚙️ Sozlamalar', 'settings')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('📢 Post an Ad', 'postAd')],
      [Markup.button.callback('📜 View Ads', 'viewAds')],
      [Markup.button.callback('📞 Contact Admin', 'contactAdmin')],
      [Markup.button.callback('⚙️ Settings', 'settings')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('📢 Разместить объявление', 'postAd')],
      [Markup.button.callback('📜 Просмотр объявлений', 'viewAds')],
      [Markup.button.callback('📞 Связаться с админом', 'contactAdmin')],
      [Markup.button.callback('⚙️ Настройки', 'settings')],
    ],
  },
};
