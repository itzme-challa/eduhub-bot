import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:quizzes_command');

const quizzes = () => async (ctx: Context) => {
  const message = `*${name} Quizzes*:
  \n\n
  1. General Knowledge Quiz
  [Link](https://example.com/gk-quiz)

  2. Science Quiz
  [Link](https://example.com/science-quiz)

  3. Math Quiz
  [Link](https://example.com/math-quiz)

  4. History Quiz
  [Link](https://example.com/history-quiz)

  5. Geography Quiz
  [Link](https://example.com/geography-quiz)`;

  debug(`Triggered "quizzes" command with message \n${message}`);

  const inlineMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'General Knowledge', callback_data: 'quiz_gk' }],
        [{ text: 'Science', callback_data: 'quiz_science' }],
        [{ text: 'Math', callback_data: 'quiz_math' }],
      ],
    },
  };

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown', ...inlineMenu });
};

export { quizzes };
