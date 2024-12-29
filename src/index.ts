import { Telegraf } from 'telegraf';
import { about } from './commands';
import { help } from './commands';
import { greeting } from './text';
import { study } from './text/study';

import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN || ''; // Ensure BOT_TOKEN is defined in the environment
const ENVIRONMENT = process.env.NODE_ENV || ''; // Defaults to an empty string if NODE_ENV is undefined

// Create the bot instance
const bot = new Telegraf(BOT_TOKEN);

// Register bot commands
bot.command('about', about());
bot.command('help', help());

// Register middlewares for message handling
bot.on('message', greeting()); // Handles generic messages
bot.on('text', study.respond()); // Handles text messages with the study material responder

// Production mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot); // Uses the production lifecycle handler
};

// Development mode
if (ENVIRONMENT !== 'production') {
  development(bot); // Starts bot in development mode
}
