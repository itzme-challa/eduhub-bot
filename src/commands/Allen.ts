import { Context } from 'telegraf';

// Function to check for keywords in the message text
export const keywordReply = () => async (ctx: Context) => {
  // Check if the message contains text
  const messageText = ctx.message?.text;

  // If the message contains text and matches any of the keywords, send a reply
  if (messageText && /(Akash|Allen|pw|pdf|study)/i.test(messageText)) {
    await ctx.reply("Hello dear, I am here to try");
  }
};
