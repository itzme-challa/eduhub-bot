import { Context } from 'telegraf';
import createDebug from 'debug';
import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

// Escape MarkdownV2 characters
const escapeMarkdownV2 = (text: string) =>
  text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');

const about = () => async (ctx: Context) => {
  const message = `*${escapeMarkdownV2(name)} ${escapeMarkdownV2(version)}*\n\n` +
    `Author: ${escapeMarkdownV2(author)}\n\n` +
    `This bot is designed to provide helpful resources and tools for students preparing for NEET, JEE, and other competitive exams\\. ` +
    `It includes a variety of study materials, practice tests, study groups, and more\\.\n\n` +
    `Features include:\n` +
    `- Access to curated NEET and JEE study resources\n` +
    `- Chapter\\-wise and random practice tests with detailed explanations\n` +
    `- NCERT\\-based notes and PYQs\n` +
    `- Community interaction through study groups and doubt discussion\n\n` +
    `About the developer: A passionate NEET aspirant and self\\-taught developer, dedicated to making exam preparation simpler and more accessible for all students\\. This bot is built with the goal of combining quality education with the power of open\\-source tools\\.`

  debug(`Triggered "about" command with message \n${message}`);

  await ctx.replyWithMarkdownV2(message);
};

export { about };
