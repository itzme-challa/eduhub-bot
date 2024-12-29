import { Telegraf, Context } from 'telegraf';
import { about } from './commands/about';  // Existing imports
import { help } from './commands/help';
import { study } from './commands/study';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { keywordReply } from './Allen'; // Import the keywordReply function

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.on('message', greeting());

// Use the keyword reply function from Allen.ts to detect keywords in messages
bot.on('message', keywordReply()); // Here is where the new function is used

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);

bot.launch();
