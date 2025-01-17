import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Helper function to format the current date as dd/mm/yyyy
const getCurrentDate = (): string => {
  const currentDate = new Date();
  return `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
};

// Helper function to calculate the number of days remaining until the NEET exam (May 4th)
const getDaysUntilNeetExam = (): string => {
  const today = new Date();
  const neetExamDate = new Date(today.getFullYear(), 4, 4); // May 4th of the current year
  
  // If today is past May 4th, use the next year's date
  if (today > neetExamDate) {
    neetExamDate.setFullYear(today.getFullYear() + 1);
  }

  const timeDifference = neetExamDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
  return `There are ${daysLeft} days left until the NEET exam on May 4th.`;
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

// Function to start the countdown
const startCountdown = (minutes: number, ctx: Context) => {
  let remainingTime = minutes * 60; // Convert minutes to seconds
  const interval = setInterval(() => {
    if (remainingTime > 0) {
      const minutesLeft = Math.floor(remainingTime / 60);
      const secondsLeft = remainingTime % 60;
      ctx.reply(`Time left: ${minutesLeft} minute(s) and ${secondsLeft} second(s).`);
      remainingTime--;
    } else {
      clearInterval(interval);
      ctx.reply('Countdown finished!');
    }
  }, 1000); // Send an update every second (1000 ms) for a precise countdown
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
      } else if (userMessage.includes('neetexam')) {
        const daysUntilNeetExam = getDaysUntilNeetExam();
        await ctx.reply(daysUntilNeetExam);
      } else if (userMessage.includes('quiz') || userMessage.includes('quizes') || userMessage.includes('question')) {
        await ctx.reply(`/quizes`);
      } else if (/\/countdown\s+\d+/i.test(userMessage)) {
        // Extract the number of minutes from the message
        const minutes = parseInt(userMessage.split(' ')[1], 10);
        if (minutes > 0) {
          await ctx.reply(`Starting countdown for ${minutes} minute(s)...`);
          startCountdown(minutes, ctx);
        } else {
          await ctx.reply("Please specify a valid number of minutes.");
        }
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
