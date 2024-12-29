import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:list_command');

const list = () => async (ctx: Context) => {
  const message = `*${name} Available Resources List*:
  \n\n
  1. Study Materials for NEET
  [Link](https://example.com/neet-materials)

  2. Study Materials for JEE
  [Link](https://example.com/jee-materials)

  3. Practice Tests for NEET
  [Link](https://example.com/neet-practice-tests)

  4. Practice Tests for JEE
  [Link](https://example.com/jee-practice-tests)

  5. NCERT Solutions for NEET and JEE
  [Link](https://example.com/ncert-solutions)`;

  debug(`Triggered "list" command with message \n${message}`);

  const inlineMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'NEET Resources', callback_data: 'list_neet' }],
        [{ text: 'JEE Resources', callback_data: 'list_jee' }],
        [{ text: 'NCERT Solutions', callback_data: 'list_ncert' }],
      ],
    },
  };

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown', ...inlineMenu });
};

export { list };
