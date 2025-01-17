import { Context } from 'telegraf';
import createDebug from 'debug';
import fs from 'fs';

const debug = createDebug('bot:greeting_text');

// Load greeting messages from the JSON file
const loadMessages = () => {
  const data = fs.readFileSync('greetings.json', 'utf-8');
  return JSON.parse(data);
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;
  const messages = loadMessages(); // Load the messages

  // Get the message text or handle non-text messages
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Process text messages only
      if (userMessage === '/start' || userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await ctx.reply(messages.start.replace('{userName}', userName));
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await ctx.reply(messages.bye.replace('{userName}', userName));
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await ctx.reply(messages.thanks.replace('{userName}', userName));
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await ctx.reply(messages.how_are_you.replace('{userName}', userName));
      } else if (userMessage.includes('what is your name') || userMessage.includes('who are you')) {
        await ctx.reply(messages.what_is_your_name.replace('{userName}', userName));
      } else if (userMessage.includes('good morning') || userMessage.includes('morning')) {
        await ctx.reply(messages.good_morning.replace('{userName}', userName));
      } else if (userMessage.includes('good afternoon') || userMessage.includes('afternoon')) {
        await ctx.reply(messages.good_afternoon.replace('{userName}', userName));
      } else if (userMessage.includes('good evening') || userMessage.includes('evening')) {
        await ctx.reply(messages.good_evening.replace('{userName}', userName));
      } else if (userMessage.includes('good night') || userMessage.includes('night')) {
        await ctx.reply(messages.good_night.replace('{userName}', userName));
      } else if (userMessage.includes('what\'s up') || userMessage.includes('wassup') || userMessage.includes('sup')) {
        await ctx.reply(messages.whats_up.replace('{userName}', userName));
      } else if (userMessage.includes('help') || userMessage.includes('assistance')) {
        await ctx.reply(messages.help.replace('{userName}', userName));
      } else if (userMessage.includes('how to') || userMessage.includes('can you teach')) {
        await ctx.reply(messages.how_to.replace('{userName}', userName));
      } else {
        await ctx.reply(messages.default);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await ctx.reply(messages.non_text);
    }
  }
};

export { greeting };
