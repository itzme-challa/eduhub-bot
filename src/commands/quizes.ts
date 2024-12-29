import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:quizzes_command');

const quizzes = () => async (ctx: Context) => {
  const message = `*${name} Quizzes*:
  \n\n
  Play quizzes for various exams and tests here: [Play Quizzes](https://itzfew.github.io/Quizes/)

  Available Exams:
  - JEE Main Misc
  - JEE Main
  - NEET
  - BITSAT`;

  debug(`Triggered "quizzes" command with message \n${message}`);

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { quizzes };
