import { Context, Telegraf } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:extended_features');

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
    await replyToMessage(ctx, messageId, `Hello dear, *${userName}*!\nWelcome to the bot! 🤖`);
  }
};

// Command: /about
const about = () => async (ctx: Context) => {
  debug('Triggered "about" text command');

  const messageId = ctx.message?.message_id;

  if (messageId) {
    await replyToMessage(
      ctx,
      messageId,
      "I am a **friendly bot** created to assist you with various tasks.\n\n" +
      "*Here are some things I can do for you:*\n" +
      "- Provide personalized greetings\n" +
      "- Help you get current time 🕰\n" +
      "- Show weather updates 🌤\n" +
      "Use /help for a list of all commands!"
    );
  }
};

// Command: /help
const help = () => async (ctx: Context) => {
  debug('Triggered "help" text command');

  const messageId = ctx.message?.message_id;

  if (messageId) {
    await replyToMessage(
      ctx,
      messageId,
      "Here are the available commands:\n" +
      "/greeting - Get a personalized greeting\n" +
      "/about - Learn more about me\n" +
      "/time - Get the current server time\n" +
      "/joke - Hear a funny joke\n" +
      "/menu - Show custom keyboard menu"
    );
  }
};

// Command: /time
const time = () => async (ctx: Context) => {
  debug('Triggered "time" text command');

  const messageId = ctx.message?.message_id;
  const currentTime = new Date().toLocaleString();

  if (messageId) {
    await replyToMessage(ctx, messageId, `The current time is: *${currentTime}* 🕰`);
  }
};

// Command: /joke
const joke = () => async (ctx: Context) => {
  debug('Triggered "joke" text command');

  const jokes = [
    "Why don't skeletons fight each other? Because they don't have the guts! 😄",
    "What do you call fake spaghetti? An impasta! 🍝",
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾"
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  const messageId = ctx.message?.message_id;
  
  if (messageId) {
    await replyToMessage(ctx, messageId, randomJoke);
  }
};

// Command: /menu (Custom Keyboard)
const menu = () => async (ctx: Context) => {
  debug('Triggered "menu" command');

  const messageId = ctx.message?.message_id;

  const keyboard = [
    [{ text: "Get a Greeting", callback_data: 'greeting' }],
    [{ text: "Get Current Time", callback_data: 'time' }],
    [{ text: "Tell me a Joke", callback_data: 'joke' }],
  ];

  if (messageId) {
    await ctx.reply(
      "Choose an option from the menu below:",
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  }
};

// Handle inline button presses
const handleInlineButtonPress = () => async (ctx: Context) => {
  const action = ctx.callbackQuery?.data;

  if (action === 'greeting') {
    await ctx.answerCbQuery('Sending a greeting...');
    await greeting()(ctx);
  } else if (action === 'time') {
    await ctx.answerCbQuery('Getting the time...');
    await time()(ctx);
  } else if (action === 'joke') {
    await ctx.answerCbQuery('Here’s a joke for you...');
    await joke()(ctx);
  }
};

// Main bot setup
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Register commands
bot.command('greeting', greeting());
bot.command('about', about());
bot.command('help', help());
bot.command('time', time());
bot.command('joke', joke());
bot.command('menu', menu());

// Handle inline button presses
bot.on('callback_query', handleInlineButtonPress());

// Start the bot
bot.launch().then(() => {
  debug('Bot started successfully');
}).catch((error) => {
  debug('Bot failed to start:', error);
});

export { greeting, about, help, time, joke, menu };
