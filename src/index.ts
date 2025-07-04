import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllChatIds, saveChatId } from './utils/chatStore';
import { saveToSheet } from './utils/saveToSheet';
import { handlePollAnswer } from './commands/quizes'; // updated path
import { about } from './commands/about';
import { help } from './commands/help';
import { study } from './commands/study';
import { neet } from './commands/neet';
import { jee } from './commands/jee';
import { groups } from './commands/groups';
import { quizes } from './commands/quizes'; // updated path
import { greeting } from './text/greeting'; // more specific path for greeting
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const ADMIN_ID = 6930703214;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN not provided!');

const bot = new Telegraf(BOT_TOKEN);

// Register commands
bot.command('about', about());
bot.command('help', help());
bot.command('study', study());
bot.command('neet', neet());
bot.command('jee', jee());
bot.command('groups', groups());

bot.command('broadcast', async (ctx) => {
  if (ctx.from?.id !== ADMIN_ID) return ctx.reply('You are not authorized to use this command.');
  const msg = ctx.message.text?.split(' ').slice(1).join(' ');
  if (!msg) return ctx.reply('Usage:\n/broadcast Your message here');

  const chatIds = getAllChatIds();
  let success = 0;

  for (const id of chatIds) {
    try {
      await ctx.telegram.sendMessage(id, msg);
      success++;
    } catch {
      console.log(`Failed to send to ${id}`);
    }
  }

  await ctx.reply(`Broadcast sent to ${success} users.`);
});

const notifiedUsers = new Set<number>();

// Handle all messages
bot.on('message', async (ctx) => {
  const chat = ctx.chat;
  const msg = ctx.message;

  if (chat?.id) {
    saveChatId(chat.id);
    await saveToSheet(chat);

    if (chat.id !== ADMIN_ID && !notifiedUsers.has(chat.id)) {
      notifiedUsers.add(chat.id);
      await ctx.telegram.sendMessage(
        ADMIN_ID,
        `*New user started the bot!*\n\n*Name:* ${chat.first_name || ''}\n*Username:* @${chat.username || 'N/A'}\nChat ID: \`${chat.id}\``,
        { parse_mode: 'Markdown' }
      );
    }

    if (msg.text?.startsWith('/contact')) {
      const userMessage = msg.text.replace('/contact', '').trim() || msg.reply_to_message?.text;
      if (userMessage) {
        await ctx.telegram.sendMessage(
          ADMIN_ID,
          `*Contact Message from ${chat.first_name} (@${chat.username || 'N/A'})*\nChat ID: \`${chat.id}\`\n\n*Message:*\n${userMessage}`,
          { parse_mode: 'Markdown' }
        );
        await ctx.reply('Your message has been sent to the admin!');
      } else {
        await ctx.reply('Please provide a message or reply to a message using /contact.');
      }
    } else {
      await Promise.all([quizes()(ctx), greeting()(ctx)]);
    }
  }

  if (ctx.chat.id === ADMIN_ID && ctx.message?.reply_to_message) {
    const match = ctx.message.reply_to_message.text?.match(/Chat ID: `(\d+)`/);
    if (match) {
      const targetId = parseInt(match[1], 10);
      await ctx.telegram.sendMessage(
        targetId,
        `*Admin's Reply:*\n${ctx.message.text}`,
        { parse_mode: 'Markdown' }
      );
    }
  }
});

// Handle quiz poll responses
bot.on('poll_answer', handlePollAnswer());

// Webhook for Vercel
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// Local development
if (ENVIRONMENT !== 'production') {
  development(bot);
}
