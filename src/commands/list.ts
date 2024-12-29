import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:list_command');

// Function to send a message with a list of available commands
const list = () => async (ctx: Context) => {
  const message = `*${name} Available Commands*:
  \n\n
  1. /help - Get information about bot commands
  2. /about - Learn more about this bot
  3. /groups - Get a list of study groups
  4. /neet - Access resources for NEET
  5. /jee - Access resources for JEE
  6. /study - Get study materials for various subjects`;

  debug(`Triggered "list" command with message \n${message}`);

  // Send the message with the list of available commands
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { list };
