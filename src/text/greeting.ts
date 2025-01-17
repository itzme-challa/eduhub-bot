import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

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
      } else if (userMessage === '/quote') {
        // Daily Quotes feature
        const quotes = [
          "The only way to do great work is to love what you do. – Steve Jobs",
          "The journey of a thousand miles begins with one step. – Lao Tzu",
          "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await ctx.reply(`Here's your quote for the day: "${randomQuote}"`);
      } else if (userMessage === '/poll') {
        // Polls/Surveys Feature
        const pollQuestion = "What is your favorite programming language?";
        const options = ["JavaScript", "Python", "C++", "Java"];

        await ctx.reply(pollQuestion, {
          reply_markup: {
            inline_keyboard: options.map((option) => [{ text: option, callback_data: option }]),
          },
        });
      } else if (userMessage === '/trivia') {
        // Trivia Feature
        const triviaQuestions = [
          { question: "What is the capital of France?", answer: "paris" },
          { question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
        ];

        const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        await ctx.reply(`${randomQuestion.question} (Type your answer)`);

        // Check answer when received
        ctx.on('text', async (messageCtx: Context) => {
          const userAnswer = messageCtx.message?.text.toLowerCase();
          if (userAnswer === randomQuestion.answer) {
            await messageCtx.reply("Correct! Well done!");
          } else {
            await messageCtx.reply("Oops! That's not correct. Try again!");
          }
        });
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
