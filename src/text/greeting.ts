 import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Helper function to format the current date as dd/mm/yyyy
const getCurrentDate = (): string => {
  const currentDate = new Date();
  return `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
};

// Helper function to evaluate math expressions
const evaluateMathExpression = (expression: string): string => {
  try {
    const sanitizedExpression = expression
      .replace(/plus|add|addition|\+/gi, '+')
      .replace(/minus|subtract|subtracted by|-/gi, '-')
      .replace(/times|multiply|multiplication|×|\*/gi, '*')
      .replace(/divide by|divide|÷|\/|divided by/gi, '/');
    const cleanExpression = sanitizedExpression.replace(/[^0-9+\-*/().]/g, '');
    const result = eval(cleanExpression);
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
