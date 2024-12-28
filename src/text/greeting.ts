import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Correcting the reply parameters key
const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId, // Fix here: Use `reply_to_message_id` instead of `reply_parameters`
  });

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;

  if (messageId) {
    // Sending a reply to the original message
    await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { greeting };
