import { Context } from 'telegraf';

// List of keywords to look for in the message
const keywords = ['Akash', 'Allen', 'pw', 'pdf', 'study'];

// Function to check if message contains any of the keywords
const containsKeyword = (message: string): boolean => {
  return keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()));
};

// This is the handler function for detecting keywords in messages
export const keywordReply = () => async (ctx: Context) => {
  const messageText = ctx.message.text || '';

  // Check if the message contains any of the keywords
  if (containsKeyword(messageText)) {
    await ctx.reply('Hello dear, I am here to try');
  }
};
