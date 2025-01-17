import { Context } from 'telegraf';
import createDebug from 'debug';
import axios from 'axios'; // Import axios to fetch data

const debug = createDebug('bot:greeting_text');

// Fetch random quote function
const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/itzfew/Quizes/refs/heads/main/quotes.json');
    const quotes = response.data; // Get the quotes array from the response
    const randomIndex = Math.floor(Math.random() * quotes.length); // Generate a random index
    const randomQuote = quotes[randomIndex];

    return `${randomQuote.quoteText} — ${randomQuote.quoteAuthor}`;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return 'Sorry, I couldn\'t fetch a quote at the moment.';
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
      } else if (userMessage.includes('quote')) {
        // Fetch and send a random quote
        const randomQuote = await getRandomQuote();
        await ctx.reply(randomQuote);
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
