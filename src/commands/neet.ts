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

export { neet };
