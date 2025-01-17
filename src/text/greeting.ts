import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Helper function to calculate the remaining time
const calculateTimeLeft = (examDate: Date) => {
  const currentDate = new Date();
  const timeDiff = examDate.getTime() - currentDate.getTime();

  if (timeDiff <= 0) {
    return "Your exam has already passed.";
  }

  const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hoursLeft = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutesLeft = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

  return `Your exam is in ${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes.`;
};

// Helper function to evaluate math expressions
const evaluateMathExpression = (expression: string): string => {
  try {
    // Replace various synonyms and symbols with standard operators
    const sanitizedExpression = expression
      .replace(/plus|add|addition|\+/gi, '+')
      .replace(/minus|subtract|subtracted by|-/gi, '-')
      .replace(/times|multiply|multiplication|×|\*/gi, '*')
      .replace(/divide by|divide|÷|\/|divided by/gi, '/');

    // Remove any invalid characters to prevent injection
    const cleanExpression = sanitizedExpression.replace(/[^0-9+\-*/().]/g, '');

    // Evaluate the sanitized expression
    const result = eval(cleanExpression); // Safe for simple math expressions due to sanitization
    return `The result of "${expression.trim()}" is ${result}.`;
  } catch {
    return "I couldn't calculate that. Please provide a valid mathematical expression.";
  }
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  // Get the message text or handle non-text messages
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
      } else if (userMessage.includes('exam time left') || userMessage.includes('when is my exam')) {
        await ctx.reply(`Please send me your exam date in dd/mm/yyyy format (e.g., 25/12/2025).`);
      } else if (userMessage.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = userMessage.split('/');
        const examDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const timeLeftMessage = calculateTimeLeft(examDate);
        await ctx.reply(timeLeftMessage);
      } else if (/\d+(\s*plus\s*|\s*\+\s*|\s*add\s*|\s*addition\s*|\s*minus\s*|\s*\-\s*|\s*subtract\s*|\s*subtracted by\s*|\s*times\s*|\s*multiply\s*|\s*\*\s*|\s*×\s*|\s*divide\s*|\s*÷\s*|\s*\/\s*|\s*divided by\s*)\d+/i.test(userMessage)) {
        const result = evaluateMathExpression(userMessage);
        await ctx.reply(result);
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { greeting };
