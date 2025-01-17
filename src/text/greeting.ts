import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Global variable to track countdown
let countdownInterval: NodeJS.Timeout | null = null;
let countdownRunning = false;

// Function to start the countdown and continuously update the message
const startAutoCountdown = (minutes: number, ctx: Context) => {
  let remainingTime = minutes * 60; // Convert minutes to seconds
  
  if (countdownRunning) {
    // Prevent starting another countdown if one is already running
    return;
  }

  countdownRunning = true;

  // Send initial message to the user
  ctx.reply(`Starting countdown for ${minutes} minute(s)...`);

  // Start the countdown and send updates every second
  countdownInterval = setInterval(() => {
    const minutesLeft = Math.floor(remainingTime / 60);
    const secondsLeft = remainingTime % 60;
    
    // Edit the message to update the countdown
    ctx.reply(`Time left: ${minutesLeft} minute(s) and ${secondsLeft} second(s).`, { 
      reply_to_message_id: ctx.message?.message_id 
    });

    remainingTime--;

    // If time is up, stop the countdown and notify the user
    if (remainingTime < 0) {
      clearInterval(countdownInterval!);
      countdownRunning = false;
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
        startAutoCountdown(minutes, ctx);  // Start countdown automatically
      } else {
        await ctx.reply("Please specify a valid number of minutes.");
      }
    } else {
      await ctx.reply(`Please use the command /countdown <minutes> to start the countdown.`);
    }
  }
};

export { greeting };
