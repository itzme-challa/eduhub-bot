import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json'; // Assuming 'name' is already imported from package.json

const debug = createDebug('bot:neet_command');

const neet = () => async (ctx: Context) => {
  const message = `*${name} NEET Resources*:
  
  \n\n
  **For NEET quizzes**, use the command: \`/quizes\`
  
  **Join Test Series** from the following links:
  1. Akash Test Series - [Link](https://test-series.pages.dev)
  2. Allen Test Series - [Link](https://test-series.pages.dev)
  3. PW Test Series - [Link](https://test-series.pages.dev)
  4. Modules and More - [Link](https://test-series.pages.dev)

  **NEET Study Groups**: Use the command: \`/groups\`
  
  **To list all available commands**, use: \`/list\`
  `;

  debug(`Triggered "neet" command with message \n${message}`);
  
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { neet };
