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

// Function to forward message to user @itzfew
const forwardMessageToItzFew = async (ctx: Context, message: string, userName: string) => {
  // Send the message to @itzfew
  const messageToSend = `${message} from ${userName}`;
  await ctx.telegram.sendMessage('@itzfew', messageToSend);
};

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  // Get the message text or handle non-text messages
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  const commandListMessage = `
    Available commands:
    /about - Get information about me
    /neet - NEET preparation resources
    /jee - JEE preparation resources
    /groups - Join study groups
    /list - View all available commands
  `;

  if (messageId) {
    if (userMessage) {
      // Process text messages only
      if (userMessage === '/start') {
        const greetingMessage = getRandomGreeting().replace('{userName}', userName);
        await replyToMessage(ctx, messageId, `${greetingMessage}\n\n${commandListMessage}`);
      } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await replyToMessage(ctx, messageId, `Hey ${userName}, how may I help you? ${commandListMessage}`);
      } else if (userMessage.includes('help') || userMessage.includes('#help')) {
        // Send the link to the channel and forward the message to @itzfew
        await replyToMessage(ctx, messageId, `Here is the link to our channel: https://t.me/NEETJEECHANNEL\n\n${commandListMessage}`);
        
        // Forward the message to @itzfew with user's name
        await forwardMessageToItzFew(ctx, userMessage, userName);
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await replyToMessage(ctx, messageId, `Goodbye ${userName}, take care! If you need anything, just ask. ${commandListMessage}`);
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await replyToMessage(ctx, messageId, `You're welcome, ${userName}! Let me know if you need further assistance. ${commandListMessage}`);
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await replyToMessage(ctx, messageId, `I'm doing great, ${userName}! How can I assist you today? ${commandListMessage}`);
      } else {
        await replyToMessage(ctx, messageId, `I don't understand. Please check the command /list for available options. ${commandListMessage}`);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await replyToMessage(ctx, messageId, `I can only respond to text messages. Please send a text command. ${commandListMessage}`);
    }
  }
};

export { greeting };
