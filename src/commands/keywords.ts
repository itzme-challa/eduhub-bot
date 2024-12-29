import { Context, Middleware } from 'telegraf';

const keywords: Middleware<Context> = async (ctx) => {
  // Check if the message is a text message
  if (ctx.message && 'text' in ctx.message) {
    const text = ctx.message.text.toLowerCase();

    // Define responses for specific keywords
    if (text.includes('quiz')) {
      await ctx.reply('You can access quizzes here: [Quizzes Link](https://itzfew.github.io/Quizes/)', { parse_mode: 'Markdown' });
    } else if (text.includes('jee')) {
      await ctx.reply('Find JEE resources here: [JEE Resources](https://example.com/jee)', { parse_mode: 'Markdown' });
    } else if (text.includes('neet')) {
      await ctx.reply('Find NEET resources here: [NEET Resources](https://example.com/neet)', { parse_mode: 'Markdown' });
    } else if (text.includes('help')) {
      await ctx.reply('Type /help for a list of available commands or let me know how I can assist you!');
    } else {
      await ctx.reply('Sorry, I didn\'t understand that. Try typing a relevant keyword or /help.');
    }
  } else {
    await ctx.reply('Please send text messages for assistance.');
  }
};

export { keywords };
