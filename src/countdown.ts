const countdown = () => async (ctx: Context) => {
  debug('Triggered "countdown" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      if (userMessage === '/start') {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('countdown') || userMessage.includes('timer')) {
        const commandParts = userMessage.split(' ');
        const targetDate = commandParts[1]; // Assuming the target date is given after the command, e.g., /countdown 2025-01-01

        if (targetDate) {
          const countdownResult = calculateCountdown(targetDate);
          await ctx.reply(countdownResult);
        } else {
          await ctx.reply(`Please provide a target date in the format YYYY-MM-DD. Example: /countdown 2025-01-01`);
        }
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};
