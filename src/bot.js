import { Telegraf } from 'telegraf';
import { Context } from 'telegraf';
import createDebug from 'debug';

// Initialize debug for logging
const debug = createDebug('bot');

// Your bot token from BotFather on Telegram
const bot = new Telegraf('<YOUR_BOT_TOKEN>');

// Define your channel username
const CHANNEL_USERNAME = '@your_channel_username';

// This function checks if the user message contains a keyword
const containsKeyword = (message: string, keyword: string): boolean => {
  return message.toLowerCase().includes(keyword.toLowerCase());
};

// Main handler
bot.on('text', async (ctx: Context) => {
  try {
    const userMessage = ctx.message?.text;
    
    if (!userMessage) {
      return;
    }

    debug(`Received user message: ${userMessage}`);

    // Retrieve messages from the channel
    const channelMessages = await bot.telegram.getChatHistory(CHANNEL_USERNAME, 0, 10); // Get last 10 messages

    for (const message of channelMessages) {
      // Check if the channel message contains the same keyword as the user message
      if (containsKeyword(message.text || '', userMessage)) {
        // Forward the matching message to the user
        await ctx.forwardMessage(CHANNEL_USERNAME, message.message_id);
        debug(`Forwarded message to user: ${message.text}`);
        break; // Forward only the first matching message
      }
    }
  } catch (error) {
    debug('Error handling message:', error);
  }
});

// Start the bot
bot.launch().then(() => {
  debug('Bot is running');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
