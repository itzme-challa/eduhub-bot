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

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  // Get the message text or handle non-text messages
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Process text messages only
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
      } else if (userMessage.includes('what is your name') || userMessage.includes('who are you')) {
        await ctx.reply(`I am your assistant, ${userName}! How can I assist you today?`);
      } else if (userMessage.includes('good morning') || userMessage.includes('morning')) {
        await ctx.reply(`Good morning, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good afternoon') || userMessage.includes('afternoon')) {
        await ctx.reply(`Good afternoon, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good evening') || userMessage.includes('evening')) {
        await ctx.reply(`Good evening, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good night') || userMessage.includes('night')) {
        await ctx.reply(`Good night, ${userName}! Sleep well and reach out whenever you need help.`);
      } else if (userMessage.includes('what\'s up') || userMessage.includes('wassup') || userMessage.includes('sup')) {
        await ctx.reply(`Hey ${userName}, what's up? How can I assist you?`);
      } else if (userMessage.includes('help') || userMessage.includes('assistance')) {
        await ctx.reply(`Sure, ${userName}! What can I help you with today? You can check /list for options.`);
      } else if (userMessage.includes('how to') || userMessage.includes('can you teach')) {
        await ctx.reply(`I'd be happy to help you learn, ${userName}! What would you like to learn about?`);
      } else if (userMessage.includes('date')) {
        // Format date as dd/mm/yyyy
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        await ctx.reply(`Today's date is ${formattedDate}, ${userName}!`);
      } else if (userMessage.includes('exam time left') || userMessage.includes('when is my exam')) {
        // Prompt the user for the exam date
        await ctx.reply(`Please send me your exam date in dd/mm/yyyy format (e.g., 25/12/2025).`);
      } else if (userMessage.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        // Check if the user sent an exam date in dd/mm/yyyy format
        const [day, month, year] = userMessage.split('/');
        const examDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
        const timeLeftMessage = calculateTimeLeft(examDate);
        await ctx.reply(timeLeftMessage);
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { greeting };
