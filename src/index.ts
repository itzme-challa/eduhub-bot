import { getAllChatIds } from './utils/chatStore';
import { saveToSheet } from './utils/saveToSheet';
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

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN not provided!');
}

const bot = new Telegraf(BOT_TOKEN);

const ADMIN_ID = 6930703214; // Your Telegram numeric ID

// Command-based handlers
bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.command('neet', neet());
bot.command('jee', jee());
bot.command('groups', groups());

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

// Notify and save new user
bot.on('message', async (ctx) => {
  try {
    if (ctx.chat?.id) {
      await saveToSheet(ctx.chat);

      if (ctx.chat.id !== ADMIN_ID) {
        await ctx.telegram.sendMessage(
          ADMIN_ID,
          `New user started the bot!\n\nName: ${ctx.chat.first_name || ''}\nUsername: @${ctx.chat.username || 'N/A'}\nChat ID: ${ctx.chat.id}`
        );
      }
    }

    await Promise.all([
      quizes()(ctx),
      greeting()(ctx),
    ]);
  } catch (err) {
    console.error('Error handling message:', err);
  }
});

bot.on('poll_answer', handlePollAnswer());

// Vercel setup
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// Local development
if (ENVIRONMENT !== 'production') {
  development(bot);
}
