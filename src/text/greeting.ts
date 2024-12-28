import { Context, Telegraf } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Helper function to reply to a message with a specific message ID
const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
  });

// Command: /greeting
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');
  
  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;
  
  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello dear, ${userName}!`);
  }
};

// Command: /about
const about = () => async (ctx: Context) => {
  debug('Triggered "about" text command');
  
  const messageId = ctx.message?.message_id;
  
  if (messageId) {
    await replyToMessage(ctx, messageId, "I am a helpful bot created to assist you with various tasks. Type /help to see available commands.");
  }
};

// Command: /help
const help = () => async (ctx: Context) => {
  debug('Triggered "help" text command');
  
  const messageId = ctx.message?.message_id;
  
  if (messageId) {
    await replyToMessage(ctx, messageId, "Here are the available commands:\n" +
                                         "/greeting - Get a personalized greeting\n" +
                                         "/about - Learn more about me\n" +
                                         "/time - Get the current server time");
  }
};

// Command: /time
const time = () => async (ctx: Context) => {
  debug('Triggered "time" text command');
  
  const messageId = ctx.message?.message_id;
  const currentTime = new Date().toLocaleString();
  
  if (messageId) {
    await replyToMessage(ctx, messageId, `The current time is: ${currentTime}`);
  }
};

// Main bot setup
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Register commands
bot.command('greeting', greeting());
bot.command('about', about());
bot.command('help', help());
bot.command('time', time());

// Start the bot
bot.launch()
  .then(() => {
    debug('Bot started successfully');
  })
  .catch((error) => {
    debug('Bot failed to start:', error);
  });

export { greeting, about, help, time };
