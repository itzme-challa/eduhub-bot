import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';  // Assuming 'name' is already imported from package.json

const debug = createDebug('bot:help_command');

const help = () => async (ctx: Context) => {
  const message = `*${name} Help*:
  \n\n
  Here are the available commands you can use:
  \n
  /about - Get information about the bot
  \n
  /start - Start interacting with the bot
  \n
  /help - Show this help message`;
  
  debug(`Triggered "help" command with message \n${message}`);
  
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { help };
