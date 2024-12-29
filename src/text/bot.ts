import { Telegraf, Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:keyword_reply');

// Initialize the bot with your token (replace '<your-bot-token>' with the actual bot token)
const bot = new Telegraf('<your-bot-token>');

// Listen for text messages and reply based on keywords
bot.on('text', async (ctx: Context) => {
  const text = ctx.message.text.toLowerCase(); // Convert to lowercase for case-insensitive comparison

  // Respond to 'jee' keyword
  if (text.includes('jee')) {
    const message = `You asked about JEE. Here's a helpful resource: [JEE Resources](https://jee-resources.pages.dev)`;
    debug(`Triggered "jee" keyword with message: \n${message}`);
    await ctx.reply(message);
  }

  // Respond to 'neet' keyword
  if (text.includes('neet')) {
    const message = `You asked about NEET. Here's a helpful resource: [NEET Resources](https://neet-resources.pages.dev)`;
    debug(`Triggered "neet" keyword with message: \n${message}`);
    await ctx.reply(message);
  }

  // Respond to 'quizzes' keyword
  if (text.includes('quizzes')) {
    const message = `You asked about quizzes. Here's a link to the quizzes: [Play Quizzes](https://itzfew.github.io/Quizes/)`;
    debug(`Triggered "quizzes" keyword with message: \n${message}`);
    await ctx.reply(message);
  }

  // Add more conditions for additional keywords if needed
});

// Start the bot
bot.launch();
