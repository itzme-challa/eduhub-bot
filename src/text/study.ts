import { Telegraf } from 'telegraf';

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from Telegram
const bot = new Telegraf('BOT_TOKEN');

// List of trigger words
const triggerWords = ['pw', 'Akash', 'Allen', 'pdf', 'study material'];

// Message to send when a trigger word is detected
const replyMessage = 'Here is itzfew from Kashmir';

// Listen to messages
bot.on('text', (ctx) => {
  const messageText = ctx.message.text.toLowerCase();

  // Check if the message contains any trigger words
  if (triggerWords.some(word => messageText.includes(word.toLowerCase()))) {
    ctx.reply(replyMessage);
  }
});

// Start the bot
bot.launch()
  .then(() => console.log('Bot is running'))
  .catch((error) => console.error('Error launching bot:', error));

// Graceful stop handling
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
