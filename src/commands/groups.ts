import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:groups_command');

const groups = () => async (ctx: Context) => {
  const message = `*${name} Study Groups*:
  \n\n
  1. NEET Study Group
  [Link](https://example.com/neet-study-group)

  2. JEE Preparation Group
  [Link](https://example.com/jee-preparation-group)

  3. Medical Entrance Exam Group
  [Link](https://example.com/med-entrance-group)

  4. Physics Enthusiasts Group
  [Link](https://example.com/physics-enthusiasts-group)

  5. Biology Discussion Group
  [Link](https://example.com/biology-discussion-group)`;

  debug(`Triggered "groups" command with message \n${message}`);

  const inlineMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'NEET Group', callback_data: 'group_neet' }],
        [{ text: 'JEE Group', callback_data: 'group_jee' }],
        [{ text: 'Physics Group', callback_data: 'group_physics' }],
      ],
    },
  };

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown', ...inlineMenu });
};

export { groups };
