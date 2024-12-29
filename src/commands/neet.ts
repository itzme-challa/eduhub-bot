import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:neet_command');

const neet = () => async (ctx: Context) => {
  const message = `*${name} NEET Resources*:
  \n\n
  1. NEET 2024 Mock Tests
  [Link](https://example.com/neet-mock-tests)

  2. NEET Physics Preparation
  [Link](https://example.com/neet-physics)

  3. NEET Chemistry Notes
  [Link](https://example.com/neet-chemistry)

  4. NEET Biology Revision
  [Link](https://example.com/neet-biology)

  5. NEET Previous Year Questions
  [Link](https://example.com/neet-pyqs)`;

  debug(`Triggered "neet" command with message \n${message}`);

  const inlineMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Physics', callback_data: 'neet_physics' }],
        [{ text: 'Chemistry', callback_data: 'neet_chemistry' }],
        [{ text: 'Biology', callback_data: 'neet_biology' }],
      ],
    },
  };

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown', ...inlineMenu });
};

export { neet };
