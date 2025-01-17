import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Global variable to track the countdown state
let isCountdownActive = false;
let countdownInterval: NodeJS.Timeout | null = null;

// Function to start the countdown automatically
const startAutoCountdown = (minutes: number, ctx: Context) => {
  if (isCountdownActive) return; // Prevent starting a new countdown if one is already running
  
  isCountdownActive = true; // Mark countdown as active
  let remainingTime = minutes * 60; // Convert minutes to seconds

  // Start the countdown and send updates every second
  countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      const minutesLeft = Math.floor(remainingTime / 60);
      const secondsLeft = remainingTime % 60;
      ctx.reply(`Time left: ${minutesLeft} minute(s) and ${secondsLeft} second(s).`);
      remainingTime--;
    } else {
      clearInterval(countdownInterval!);
      isCountdownActive = false; // Reset countdown state
      ctx.reply('Countdown finished!');
    }
  }, 1000); // Update every second
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
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
      await ctx.reply("Bot started! Please send /countdown <minutes> to start a countdown.");
    }
    else {
      await ctx.reply(`I don't understand. Please send a valid command like '/countdown <minutes>' or '/start'.`);
    }
  }
};

export { greeting };
