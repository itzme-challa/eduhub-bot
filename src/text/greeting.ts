import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Function to start the countdown automatically
const startAutoCountdown = (minutes: number, ctx: Context) => {
  let remainingTime = minutes * 60; // Convert minutes to seconds
  const interval = setInterval(() => {
    if (remainingTime > 0) {
      const minutesLeft = Math.floor(remainingTime / 60);
      const secondsLeft = remainingTime % 60;
      // Update the user every second with the time remaining
      ctx.reply(`Time left: ${minutesLeft} minute(s) and ${secondsLeft} second(s).`);
      remainingTime--;
    } else {
      clearInterval(interval);
      ctx.reply('Countdown finished!');
    }
  }, 1000); // Send an update every second (1000 ms)
};

// Main function that will trigger the countdown
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
    // Automatically start countdown if user sends '/countdown'
    if (/\/countdown\s+\d+/i.test(userMessage)) {
      const minutes = parseInt(userMessage.split(' ')[1], 10);
      if (minutes > 0) {
        await ctx.reply(`Starting countdown for ${minutes} minute(s)...`);
        startAutoCountdown(minutes, ctx);
      } else {
        await ctx.reply("Please specify a valid number of minutes.");
      }
    }
    else if (userMessage === '/start') {
      // You can initiate an auto countdown when the bot is first activated
      await ctx.reply("Bot started! Starting a 5-minute countdown.");
      startAutoCountdown(5, ctx);  // Start 5-minute countdown automatically
    }
    else {
      await ctx.reply(`I don't understand. Please send a valid command like '/countdown <minutes>' or '/start'.`);
    }
  }
};

export { greeting };
