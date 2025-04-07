import { saveChatId, getAllChatIds } from './utils/chatStore';
import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { handlePollAnswer } from './text/quizes';
import { about } from './commands';
import { help } from './commands';
import { study } from './commands/study';
import { neet } from './commands/neet';
import { jee } from './commands/jee';
import { groups } from './commands/groups';
import { quizes } from './text';
import { greeting } from './text';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const ADMIN_ID = 6930703214; // Replace with your Telegram ID

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN not provided!');
}

const bot = new Telegraf(BOT_TOKEN);

// Commands
bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.command('neet', neet());
bot.command('jee', jee());
bot.command('groups', groups());

// Broadcast Command
bot.command('broadcast', async (ctx) => {
  if (ctx.from?.id !== ADMIN_ID) {
    await ctx.reply('You are not authorized to use this command.');
    return;
  }

  const msg = ctx.message.text?.split(' ').slice(1).join(' ');
  if (!msg) {
    return ctx.reply('Usage:\n/broadcast Your message here');
  }

  const chatIds = getAllChatIds();
  let success = 0;

  for (const id of chatIds) {
    try {
      await ctx.telegram.sendMessage(id, msg);
      success++;
    } catch (e) {
      console.log(`Failed to send to ${id}`);
    }
  }

  await ctx.reply(`Broadcast sent to ${success} users.`);
});

// Save & notify new users
bot.start(async (ctx) => {
  const isNew = saveChatId(ctx.chat.id);
  if (isNew) {
    await ctx.telegram.sendMessage(ADMIN_ID, `New user started: ${ctx.chat.id}`);
  }
  await ctx.reply('Welcome to the NEET Bot!');
});

bot.on('poll_answer', handlePollAnswer());

// Save chat ID on any message
bot.on('message', async (ctx) => {
  try {
    const isNew = saveChatId(ctx.chat.id);
    if (isNew) {
      await ctx.telegram.sendMessage(ADMIN_ID, `New user messaged: ${ctx.chat.id}`);
    }

    await Promise.all([
      quizes()(ctx),
      greeting()(ctx),
    ]);
  } catch (err) {
    console.error('Error handling message:', err);
  }
});

// For Vercel
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// For Local Dev
if (ENVIRONMENT !== 'production') {
  development(bot);
}
