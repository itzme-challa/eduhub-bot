import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:neet_command');

// Function to send a generic response with a message
const genericResponse = async (ctx: Context, message: string) => {
  await ctx.reply(message);
};

// The NEET command to send resources and available commands
const neet = () => async (ctx: Context) => {
  const message = `*${name} NEET Resources*:
  \n\n
  1. For NEET quizzes, use the command: /quizzes
  2. Join Test Series from the following providers:
     - [Akash Test Series](https://test-series.pages.dev/)
     - [Allen Test Series](https://test-series.pages.dev/)
     - [PW Test Series](https://test-series.pages.dev/)
     - [Modules and More](https://test-series.pages.dev/)
  3. Join NEET study groups: /groups
  4. To list all available commands, use: /list`;

  debug(`Triggered "neet" command with message \n${message}`);

  // Send the message with available options
  await genericResponse(ctx, message);
};

// Handle callback queries for user interaction
const handleCallbackQuery = (ctx: Context) => {
  // Type-cast ctx.callbackQuery to ensure 'data' exists
  const callbackData = (ctx.callbackQuery as { data: string }).data;

  if (!callbackData) return;

  switch (callbackData) {
    case 'neet_physics':
      ctx.reply('You selected NEET Physics! Here are the resources.');
      break;
    case 'neet_chemistry':
      ctx.reply('You selected NEET Chemistry! Here are the resources.');
      break;
    case 'neet_biology':
      ctx.reply('You selected NEET Biology! Here are the resources.');
      break;
    case 'neet_mock_tests':
      ctx.reply('Here are the NEET Mock Tests resources.');
      break;
    default:
      ctx.reply('Invalid selection.');
      break;
  }
};

export { neet, handleCallbackQuery };
