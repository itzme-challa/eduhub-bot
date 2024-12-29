import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:quizzes_command');

const quizzes = () => async (ctx: Context) => {
  const message = `*${name} Quizzes*:
  \n\n
  Play quizzes for various exams and tests here: [Play Quizzes](https://itzfew.github.io/Quizes/)

  Available Exams:
  - JEE Main 2024 Misc Papers
  - JEE Main 2024 (Online)
  - JEE Main 2023 (Online)
  - JEE Main 2022 (Online)
  - JEE Main 2021 (Online)
  - JEE Main 2020 (Online)
  - JEE Main 2019 (Online)
  - JEE Main 2018 (Online)
  - JEE Main 2017 (Online)
  - JEE Main 2016 (Online)
  - JEE Main 2015 (Offline)
  - AIEEE 2012 - 2003
  - JEE Advanced (2023, 2022, 2021, 2020, 2019)
  - AIEEE 2011 - 2004`;

  debug(`Triggered "quizzes" command with message \n${message}`);

  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { quizzes };
