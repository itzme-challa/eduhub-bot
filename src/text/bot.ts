import { Telegraf, Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:keyword_reply');

// Initialize the bot with your token (replace '<your-bot-token>' with the actual bot token)
const bot = new Telegraf('<your-bot-token>');

// Type guard to check if the message is a text message
const isTextMessage = (message: any): message is { text: string } => {
  return message && typeof message.text === 'string';
};

// Listen for text messages and reply based on keywords
bot.on('text', async (ctx: Context) => {
  if (isTextMessage(ctx.message)) {
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
  } else {
    debug('Received a non-text message');
  }
});

// Start the bot
bot.launch();
