import { Context } from 'telegraf';
import createDebug from 'debug';
import { escapeMarkdownV2 } from '@grammyjs/parse-mode'; // For safe Telegram message formatting

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const about = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n\n` +
    `Author: ${author}\n\n` +
    `This bot is built to support students preparing for competitive exams like NEET and JEE. It offers a centralized platform for accessing high-quality study resources, practice tools, and community interaction.\n\n` +
    `Key features:\n` +
    `• Curated study materials based on NCERT and trusted sources (PW, Allen, Akash, NEETPrep)\n` +
    `• Random practice questions and chapter-wise tests with explanations\n` +
    `• Study groups to connect with peers and discuss doubts\n` +
    `• NCERT-based notes, summaries, and PYQs\n` +
    `• Quick access to important updates and notifications from NTA\n\n` +
    `Our goal is to make exam prep smarter, more organized, and more accessible—right from your Telegram chat.`;

  const safeMessage = escapeMarkdownV2(message);

  debug(`Triggered "about" command with message \n${safeMessage}`);

  await ctx.reply(safeMessage, { parse_mode: 'MarkdownV2' });
};

export { about };
