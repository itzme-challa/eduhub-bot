import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:countdown');

// Helper function to parse the countdown duration
const parseDuration = (input: string): number | null => {
  const durationMatch = input.match(/(\d+)\s*(seconds?|minutes?|hours?|days?)/i);
  if (!durationMatch) return null;

  const value = parseInt(durationMatch[1], 10);
  const unit = durationMatch[2].toLowerCase();

  switch (unit) {
    case 'second':
    case 'seconds':
      return value * 1000; // Convert seconds to milliseconds
    case 'minute':
    case 'minutes':
      return value * 60 * 1000; // Convert minutes to milliseconds
    case 'hour':
    case 'hours':
      return value * 60 * 60 * 1000; // Convert hours to milliseconds
    case 'day':
    case 'days':
      return value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    default:
      return null; // Return null if the unit is unrecognized
  }
};

// Main countdown function
const countdown = () => async (ctx: Context) => {
  debug('Triggered "countdown" command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Check if the message contains a countdown command
      if (userMessage.startsWith('/countdown')) {
        const durationString = userMessage.replace('/countdown', '').trim();
        const duration = parseDuration(durationString);

        if (duration && duration > 0) {
          await ctx.reply(`Starting a countdown for ${durationString}, ${userName}. I'll notify you when it's over!`);
          setTimeout(async () => {
            await ctx.reply(`Time's up, ${userName}! Your countdown of ${durationString} is complete.`);
          }, duration);
        } else {
          await ctx.reply(`Please provide a valid duration. Example: /countdown 5 minutes`);
        }
      } else {
        await ctx.reply(`I don't understand this command. Use /countdown followed by the duration (e.g., "5 minutes").`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  } else {
    await ctx.reply(`I couldn't process your message. Please try again.`);
  }
};

export { countdown };
