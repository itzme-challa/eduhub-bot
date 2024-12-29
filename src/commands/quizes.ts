import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:quizes_command');

const quizes = () => async (ctx: Context) => {
  const message = `*${name} Quizes*:
  \n\n
  Play quizes for various exams and tests here: [Play Quizes](https://itzfew.github.io/Quizes/)

  Available Exams:
  - JEE Main Misc
  - JEE Main
  - NEET
  - BITSAT`;

  debug(`Triggered "quizes" command with message \n${message}`);

  // Corrected to use only 'replyWithMarkdownV2'
  await ctx.replyWithMarkdownV2(message);
};

export { quizes };
