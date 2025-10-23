import { Markup } from 'telegraf';

export const approvalKeyboard = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('✅ Qabul qilish', 'approve')],
      [Markup.button.callback('❌ Rad etish', 'reject')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('✅ Approve', 'approve')],
      [Markup.button.callback('❌ Reject', 'reject')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('✅ Одобрить', 'approve')],
      [Markup.button.callback('❌ Отклонить', 'reject')],
    ],
  },
};
