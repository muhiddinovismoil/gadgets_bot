import { Markup } from 'telegraf';

export const approvalKeyboard = (
  postId: string,
  adminChannelMessageId: number,
  adminConfirmationMessageId: number,
) => {
  const shortId = postId.substring(0, 8);

  return {
    uz: {
      inline_keyboard: [
        [
          Markup.button.callback(
            '✅ Qabul qilish',
            `ap_${shortId}_${adminChannelMessageId}_${adminConfirmationMessageId}`,
          ),
        ],
        [
          Markup.button.callback(
            '❌ Rad etish',
            `rj_${shortId}_${adminChannelMessageId}_${adminConfirmationMessageId}`,
          ),
        ],
      ],
    },
  };
};
