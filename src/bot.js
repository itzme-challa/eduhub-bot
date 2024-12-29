import { Telegraf } from 'telegraf';
import cron from 'node-cron';
import { about } from './commands';
import { help } from './commands';
import { greeting } from './text';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const bot = new Telegraf(BOT_TOKEN);

// Command handlers
bot.command('about', about());
bot.command('help', help());
// Other command handlers

// Function to send a scheduled message at 5:05 PM
const sendDailyMessage = () => {
  bot.telegram.sendMessage('@your_channel_or_user', "This is your scheduled message at 5:05 PM!");
};

// Schedule the daily message at 5:05 PM every day
cron.schedule('5 17 * * *', sendDailyMessage);

// Greeting function (or any other function)
bot.on('message', greeting());

// Start the bot
bot.launch();
