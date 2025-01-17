import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Helper function to format the current date as dd/mm/yyyy
const getCurrentDate = (): string => {
  const currentDate = new Date();
  return `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
};

// Helper function to calculate remaining days to a target date
const calculateRemainingDays = (targetDate: string): number => {
  const target = new Date(targetDate);
  const current = new Date();
  const timeDifference = target.getTime() - current.getTime();

  if (timeDifference <= 0) {
    return 0; // Target date has already passed
  }

  const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
  return remainingDays;
};

// Countdown function to return the remaining days for NEET or any target
const countdown = (targetDate: string) => {
  const remainingDays = calculateRemainingDays(targetDate);

  if (remainingDays > 0) {
    return `⏳ **Days Remaining**: ${remainingDays} days`;
  } else {
    return 'The exam date has already passed.';
  }
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      if (userMessage === '/start') {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await ctx.reply(`Goodbye ${userName}, take care!`);
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await ctx.reply(`You're welcome, ${userName}! Let me know if you need further assistance.`);
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await ctx.reply(`I'm doing great, ${userName}! How can I assist you today?`);
      } else if (userMessage.includes('date')) {
        const currentDate = getCurrentDate();
        await ctx.reply(`Today's date is ${currentDate}, ${userName}!`);
      } else if (userMessage.includes('quiz') || userMessage.includes('quizes') || userMessage.includes('question')) {
        await ctx.reply(`/quizes`);
      } else if (userMessage.includes('examneet')) {
        // Use the countdown function to calculate days remaining for the NEET exam
        const targetDate = '2025-05-04'; // Target date for NEET exam
        const countdownMessage = countdown(targetDate);

        await ctx.reply(`🌟 **Days Left for NEET Exam** 🌟

🗓️ **Target Date**: May 4, 2025
${countdownMessage}

Keep going strong, you got this! 💪`);
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { greeting, countdown }; // Export both greeting and countdown functions
