import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Main countdown timer function
const countdownTimer = () => async (ctx: Context) => {
  debug('Triggered "countdownTimer" command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  if (messageId) {
    // Countdown timer logic
    let countdown = 10; // Set countdown time (in seconds)

    const intervalId = setInterval(async () => {
      if (countdown <= 0) {
        clearInterval(intervalId);
        await ctx.reply(`Time's up, ${userName}!`);
      } else {
        await ctx.reply(`${countdown} seconds remaining...`);
        countdown--;
      }
    }, 1000); // Decrease countdown every second
  }
};

export { countdownTimer };
