import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json'; // Assuming 'name' is already imported from package.json

const debug = createDebug('bot:quizes_command');

const quizes = () => async (ctx: Context) => {
  const message = `*${name} Quizes*:
  
  Play quizes for various exams and tests here:
  [Play Quizes](https://itzfew.github.io/Quizes/)

  **Available Exams**:
  - JEE Main Misc
  - JEE Main
  - NEET
  - BITSAT`;

  debug(`Triggered "quizes" command with message: \n${message}`);

  await ctx.replyWithMarkdownV2(message);
};

export { quizes };
