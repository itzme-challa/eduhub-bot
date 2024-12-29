import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Function to reply to a specific message
const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
  });

// Function to get a random greeting
const getRandomGreeting = (): string => {
  const greetings = [
    "Hello dear, {userName}!",
    "Hi {userName}, nice to see you!",
    "Greetings {userName}, how can I assist you today?",
    "Hey {userName}, hope you're doing well!",
    "Welcome {userName}, ready to get started?",
    "Good day {userName}, how may I help?"
  ];
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  // Get the message text or handle non-text messages
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Process text messages only
      if (userMessage === '/start') {
        const greetingMessage = getRandomGreeting().replace('{userName}', userName);
        const commandListMessage = `
        To interact with me, you can use the following commands:
        /list - View all available commands
        /help - Get help and instructions
        /start - Start a new session
        /about - Get information about me 
        `;
        await replyToMessage(ctx, messageId, `${greetingMessage}\n\n${commandListMessage}`);
      } else if (userMessage.includes('waheed') || userMessage.includes('challa') || userMessage.includes('pw')) {
        await replyToMessage(ctx, messageId, "Hello, this side effects Namaste!");
      } else if (userMessage.includes('neet') || userMessage.includes('jee') || userMessage.includes('exam') || userMessage.includes('study')) {
        await replyToMessage(ctx, messageId, "You're preparing for NEET or JEE? Keep it up, success is closer than you think!");
      } else if (userMessage.includes('help') || userMessage.includes('assist') || userMessage.includes('question')) {
        await replyToMessage(ctx, messageId, "Sure! How can I assist you today? Feel free to ask any questions.");
      } else if (userMessage.includes('quran') || userMessage.includes('islam') || userMessage.includes('hadith')) {
        await replyToMessage(ctx, messageId, "Looking for Quranic verses or Hadith? I can help you with that too!");
      } else if (userMessage.includes('study material') || userMessage.includes('books') || userMessage.includes('notes')) {
        await replyToMessage(ctx, messageId, "You can find study material for NEET, JEE, and more in my resources. Let me know what you're looking for!");
      } else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        await replyToMessage(ctx, messageId, `Hello ${userName}, how can I help you today?`);
      } else {
        await replyToMessage(ctx, messageId, "I don't understand. Please check the command /list");
      }
    } else {
      // Handle non-text messages (e.g., media)
      await replyToMessage(ctx, messageId, "I can only respond to text messages. Please send a text command.");
    }
  }
};

export { greeting };
