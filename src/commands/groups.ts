import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:groups_command');

// Function to send a message with group links directly
const groups = () => async (ctx: Context) => {
  const message = `*${name} Study Groups*:
  \n\n
  Following is a list of study groups:

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

  // Send the message without inline menu
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { groups };
