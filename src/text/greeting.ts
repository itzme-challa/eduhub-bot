import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

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
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await ctx.reply(`Goodbye ${userName}, take care!`);
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await ctx.reply(`You're welcome, ${userName}! Let me know if you need further assistance.`);
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await ctx.reply(`I'm doing great, ${userName}! How can I assist you today?`);
      } else if (userMessage.includes('what is your name') || userMessage.includes('who are you')) {
        await ctx.reply(`I am your assistant, ${userName}! How can I assist you today?`);
      } else if (userMessage.includes('good morning') || userMessage.includes('morning')) {
        await ctx.reply(`Good morning, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good afternoon') || userMessage.includes('afternoon')) {
        await ctx.reply(`Good afternoon, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good evening') || userMessage.includes('evening')) {
        await ctx.reply(`Good evening, ${userName}! How can I help you today?`);
      } else if (userMessage.includes('good night') || userMessage.includes('night')) {
        await ctx.reply(`Good night, ${userName}! Sleep well and reach out whenever you need help.`);
      } else if (userMessage.includes('what\'s up') || userMessage.includes('wassup') || userMessage.includes('sup')) {
        await ctx.reply(`Hey ${userName}, what's up? How can I assist you?`);
      } else if (userMessage.includes('help') || userMessage.includes('assistance')) {
        await ctx.reply(`Sure, ${userName}! What can I help you with today? You can check /list for options.`);
      } else if (userMessage.includes('how to') || userMessage.includes('can you teach')) {
        await ctx.reply(`I'd be happy to help you learn, ${userName}! What would you like to learn about?`);
      } else if (userMessage.includes('date')) {
        // Format date as dd/mm/yyyy
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        await ctx.reply(`Today's date is ${formattedDate}, ${userName}!`);
      } else if (userMessage.includes('weather')) {
        // Weather request (fake API or mock data)
        const location = 'New York'; // Replace with dynamic location handling
        const weatherMessage = `The weather in ${location} is sunny with a high of 25°C and a low of 18°C.`;
        await ctx.reply(weatherMessage);
      } else if (userMessage.includes('joke') || userMessage.includes('tell me a joke')) {
        const jokes = [
          "Why don't skeletons fight each other? They don't have the guts.",
          "What do you call fake spaghetti? An impasta!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await ctx.reply(randomJoke);
      } else if (userMessage.includes('good vibes')) {
        await ctx.reply(`Sending you positive vibes, ${userName}! Stay awesome! ✨`);
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { greeting };
