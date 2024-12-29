import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json'; // Assuming 'name' is already imported from package.json

const debug = createDebug('bot:quizes_command');

const quizes = () => async (ctx: Context) => {
  const message = `*${name} Quizzes*:
  
  Play quizzes for various exams and tests here:
  [Play Quizzes](https://itzfew.github.io/Quizes/)

  **Available Exams**:
  - JEE Main Misc
  - JEE Main
  - NEET
  - BITSAT`;

  debug(`Triggered "quizes" command with message: \n${message}`);

  // Ensure the message uses proper MarkdownV2 format and send it
  await ctx.replyWithMarkdownV2(message);
};

export { quizes };
