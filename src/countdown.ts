import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:countdown');

// Helper function to calculate the remaining days until May 4, 2025
const calculateDaysRemaining = (targetDate: string): string => {
  const target = new Date(targetDate);
  const current = new Date();
  const timeDifference = target.getTime() - current.getTime();

  if (timeDifference <= 0) {
    return `The target date has already passed!`;
  }

  const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24)); // Calculate days remaining
  return daysLeft;
};

// Main countdown function
const countdown = () => async (ctx: Context) => {
  debug('Triggered "countdown" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Handling the case for /start
      if (userMessage === '/start') {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } 
      
      // Checking if the message contains "examneet"
      else if (userMessage.includes('examneet')) {
        const targetDate = '2025-05-04'; // Set the fixed target date for the exam (May 4, 2025)
        const daysRemaining = calculateDaysRemaining(targetDate);

        // Send a well-designed response
        const response = `
        🌟 **Days Left for NEET Exam** 🌟

        🗓️ **Target Date**: May 4, 2025
        ⏳ **Days Remaining**: ${daysRemaining} days

        Keep going strong, you got this! 💪
        `;
        await ctx.reply(response, { parse_mode: 'Markdown' });  // Using Markdown for better formatting

      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { countdown };
