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

// Function to check if two messages share common words
const hasCommonWords = (userMessage: string, channelMessage: string): boolean => {
  const userWords = userMessage.toLowerCase().split(/\s+/);
  const channelWords = channelMessage.toLowerCase().split(/\s+/);
  return userWords.some(word => channelWords.includes(word));
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
      } else {
        // Simulate retrieving recent messages from a channel (this part needs to be handled with custom API calls)
        const channelId = '@NEETJEECHANNEL';

        try {
          // Use a raw Telegram API call to get chat details (not messages directly)
          const chatDetails = await ctx.telegram.getChat(channelId);

          // Example: Just checking if it's a valid channel
          if (chatDetails) {
            debug('Fetched channel details:', chatDetails);

            // Simulate a channel message for the sake of checking the message
            const channelMessage = "This is a message from the channel"; // Replace this with actual logic

            // Check for common words
            if (hasCommonWords(userMessage, channelMessage)) {
              // Forward the message from the channel to the user
              await ctx.telegram.forwardMessage(ctx.chat?.id || '', channelId, 123); // Example message_id
            }
          }

        } catch (err) {
          debug('Error fetching channel messages:', err);
          await replyToMessage(ctx, messageId, "I couldn't fetch channel messages. Please try again later.");
        }

        await replyToMessage(ctx, messageId, "I don't understand. Please check the command /list");
      }
    } else {
      // Handle non-text messages (e.g., media)
      await replyToMessage(ctx, messageId, "I can only respond to text messages. Please send a text command.");
    }
  }
};

export { greeting };
