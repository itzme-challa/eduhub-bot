import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:countdown');

// Helper function to calculate the remaining time for a countdown
const calculateCountdown = (targetDate: string): string => {
  const target = new Date(targetDate);
  const current = new Date();
  const timeDifference = target.getTime() - current.getTime();
  
  if (timeDifference <= 0) {
    return `The target date has already passed!`;
  }

  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `Time remaining: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
};

// Main countdown function
const countdown = () => async (ctx: Context) => {
  debug('Triggered "countdown" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      if (userMessage === '/start') {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('countdown') || userMessage.includes('timer')) {
        const targetDate = userMessage.split(' ')[1]; // Assuming the target date is given after the command, e.g., /countdown 2025-01-01
        if (targetDate) {
          const countdownResult = calculateCountdown(targetDate);
          await ctx.reply(countdownResult);
        } else {
          await ctx.reply(`Please provide a target date in the format YYYY-MM-DD.`);
        }
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { countdown };
