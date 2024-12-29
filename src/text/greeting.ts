import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Function to reply with the given message
const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,  // Corrected to use 'reply_to_message_id'
  });

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;

  // Get the user's first and last name, and handle undefined cases
  const firstName = ctx.message?.from.first_name || '';
  const lastName = ctx.message?.from.last_name || '';
  
  // If both names are missing, fall back to 'User'
  const userName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'User';

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello dear, ${userName}!`);
  }
};

export { greeting };
