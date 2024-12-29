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
        /neet - NEET preparation resources
        /jee - JEE preparation resources
        /groups - Join study groups
        `;
        await replyToMessage(ctx, messageId, `${greetingMessage}\n\n${commandListMessage}`);
      } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await replyToMessage(ctx, messageId, `Hey ${userName}, how may I help you? You can try commands like /about, /neet, /jee, /groups, or /list.`);
      } else if (userMessage.includes('help') || userMessage.includes('assist') || userMessage.includes('question')) {
        await replyToMessage(ctx, messageId, "Sure! How can I assist you today? Feel free to ask any questions.");
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await replyToMessage(ctx, messageId, `Goodbye ${userName}, take care! If you need anything, just ask.`);
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await replyToMessage(ctx, messageId, `You're welcome, ${userName}! Let me know if you need further assistance.`);
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await replyToMessage(ctx, messageId, `I'm doing great, ${userName}! How can I assist you today?`);
      } else {
        await replyToMessage(ctx, messageId, "I don't understand. Please check the command /list for available options.");
      }
    } else {
      // Handle non-text messages (e.g., media)
      await replyToMessage(ctx, messageId, "I can only respond to text messages. Please send a text command.");
    }
  }
};

export { greeting };
