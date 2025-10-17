import { Markup } from 'telegraf';

export const acceptationKeyboard = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('✅ Qabul qilish', 'accept')],
      [Markup.button.callback('✏️ Tahrirlash', 'edit')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('✅ Accept', 'accept')],
      [Markup.button.callback('✏️ Edit', 'edit')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('✅ Принять', 'accept')],
      [Markup.button.callback('✏️ Редактировать', 'edit')],
    ],
  },
};
