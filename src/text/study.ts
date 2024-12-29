import { Context, Message } from 'telegraf';

/**
 * Handles messages containing trigger words and sends a specific reply.
 */
export const study = () => async (ctx: Context) => {
  // List of trigger words
  const triggerWords = ['pw', 'Akash', 'Allen', 'pdf', 'study material'];

  // Reply message to send when a trigger word is detected
  const replyMessage = 'Here is itzfew from Kashmir';

  // Check if the message contains text (TextMessage type)
  if (ctx.message && 'text' in ctx.message) {
    // Extract the message text and convert to lowercase for case-insensitive comparison
    const messageText = ctx.message.text?.toLowerCase() || '';

    // Check if the message contains any trigger word
    if (triggerWords.some((word) => messageText.includes(word.toLowerCase()))) {
      await ctx.reply(replyMessage);
    }
  }
};
