import { Telegraf } from 'telegraf';

import { about } from './commands';
import { help } from './commands';
import { study } from './commands/study';
import { greeting } from './text';
import { keywordReply } from './commands/Allen';  // Import keywordReply from Allen.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.on('message', greeting());
bot.on('message', keywordReply());  // Add the keyword reply handler

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
