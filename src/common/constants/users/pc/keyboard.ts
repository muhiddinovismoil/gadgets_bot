import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const PcKeyboard: Record<string, InlineKeyboardMarkup> = {
    uz: {
        inline_keyboard: [
            [Markup.button.callback("📢 E'lon berishni boshlaymizmi?", "elonYarat"),
            Markup.button.callback('Orqaga 🔙', 'backMenu')
            ]
        ]
    },
    ru: {
        inline_keyboard: [
            [Markup.button.callback("📢 Начнем размещение объявления?", "elonYarat")]
        ]
    },
    en: {
        inline_keyboard: [
            [Markup.button.callback("📢 Shall we start posting an ad?", "elonYarat"),
            Markup.button.callback('Back 🔙', 'backMenu')
            ]
        ]
    }
};

// export const PcTasdiqBoard:Re