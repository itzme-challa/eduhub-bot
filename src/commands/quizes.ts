import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json'; // Assuming 'name' is already imported from package.json

const debug = createDebug('bot:quizes_command');

const quizes = () => async (ctx: Context) => {
  const message = `*${name} Quizzes*:
  
  \n\n
  **Available Quizzes**: Access them at [Quizzes Link](https://itzfew.github.io/Quizes/)
  
  **Available Exams**:
  - JEE Main Misc
  - JEE Main
  - NEET
  - BITSAT
  
  **Join Test Series** from the following links:
  1. Akash Test Series - [Link](https://test-series.pages.dev)
  2. Allen Test Series - [Link](https://test-series.pages.dev)
  3. PW Test Series - [Link](https://test-series.pages.dev)
  4. Modules and More - [Link](https://test-series.pages.dev)

  **NEET Study Groups**: Use the command: \`/groups\`
  
  **To list all available commands**, use: \`/list\`
  `;

  debug(`Triggered "quizes" command with message \n${message}`);
  
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { quizes };
