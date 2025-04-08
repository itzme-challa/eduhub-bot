import { getAllChatIds, saveChatId } from './utils/chatStore';
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
const ADMIN_ID = 6930703214;

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

// Contact command
bot.command('contact', async (ctx) => {
  const from = ctx.from;
  const userDetails = `Contact Request from:\nName: ${from.first_name || ''}\nUsername: @${from.username || 'N/A'}\nID: ${from.id}`;

  if (ctx.message.reply_to_message) {
    const replyText = ctx.message.reply_to_message.text || '[non-text message]';
    await ctx.telegram.sendMessage(
      ADMIN_ID,
      `${userDetails}\n\nMessage (reply):\n${replyText}`
    );
    await ctx.reply('Your message has been forwarded to admin.');
  } else {
    const args = ctx.message.text?.split(' ').slice(1).join(' ');
    if (args) {
      await ctx.telegram.sendMessage(
        ADMIN_ID,
        `${userDetails}\n\nMessage:\n${args}`
      );
      await ctx.reply('Your message has been forwarded to admin.');
    } else {
      await ctx.reply('Please send your message like:\n/contact Your message here\nOr reply to a message with /contact');
    }
  }
});

// Broadcast command
bot.command('broadcast', async (ctx) => {
  if (ctx.from?.id !== ADMIN_ID) {
    return ctx.reply('You are not authorized to use this command.');
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

// Handle messages
bot.on('message', async (ctx) => {
  try {
    const chat = ctx.chat;
    if (chat?.id) {
      const allChatIds = getAllChatIds();

      // Save only new users
      if (!allChatIds.includes(chat.id)) {
        saveChatId(chat.id);
        await saveToSheet(chat);

        if (chat.id !== ADMIN_ID) {
          await ctx.telegram.sendMessage(
            ADMIN_ID,
            `New user started the bot!\n\nName: ${chat.first_name || ''}\nUsername: @${chat.username || 'N/A'}\nChat ID: ${chat.id}`
          );
        }
      }
    }

    // Only reply to greeting + quiz if not a command or /contact
    if (!ctx.message.text?.startsWith('/')) {
      await Promise.all([
        quizes()(ctx),
        greeting()(ctx),
      ]);
    }
  } catch (err) {
    console.error('Error handling message:', err);
  }
});

// Handle quiz poll answers
bot.on('poll_answer', handlePollAnswer());

// Vercel webhook
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// Local dev
if (ENVIRONMENT !== 'production') {
  development(bot);
}
