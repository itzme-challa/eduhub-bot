import { Telegraf } from 'telegraf';

// Importing commands from the 'commands' directory
import { about } from './commands/about';
import { help } from './commands/help';
import { study } from './commands/study';
import { neet } from './commands/neet';
import { jee } from './commands/jee';
import { quizes } from './commands/quizes';
import { groups } from './commands/groups';
import { list } from './commands/list';

// Importing text responses (like greetings)
import { greeting } from './text/greeting';

// Importing environment setup
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

// Reading the bot token from environment variables
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

// Initialize the bot with the token
const bot = new Telegraf(BOT_TOKEN);

// Define the commands for the bot
bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.command('neet', neet());
bot.command('jee', jee());
bot.command('quizes', quizes());
bot.command('groups', groups());
bot.command('list', list());

// Greeting for all incoming messages
bot.on('message', greeting());

// If a specific text message comes in, we can define a callback to handle it
const callback = async (ctx: any) => {
  const message = ctx.message.text;
  // You can add any specific message handling logic here
  console.log(message);
};

// Environment-specific handling (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot); // production mode
};

// Dev mode logic
if (ENVIRONMENT !== 'production') {
  development(bot); // development mode
}

