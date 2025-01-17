import { Context } from 'telegraf';
import createDebug from 'debug';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

// Sample JSON structure with questions and options
const questions = [
  { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], correctAnswer: 'Paris' },
  { id: 2, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
  { id: 3, question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Jupiter' },
  // Add more questions as needed
];

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
      } else if (userMessage.includes('1..')) {
        // Get the first question from the JSON and send it along with inline options
        const question = questions.find(q => q.id === 1);
        if (question) {
          const keyboard: InlineKeyboardMarkup = {
            inline_keyboard: question.options.map(option => [
              {
                text: option,
                callback_data: `answer_${question.id}_${option}`, // Unique callback data for each option
              }
            ])
          };
          await ctx.reply(question.question, { reply_markup: keyboard });
        } else {
          await ctx.reply('Sorry, I could not find the question.');
        }
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

// Function to handle the user's answer selection
const handleAnswer = () => async (ctx: Context) => {
  const callbackData = ctx.callbackQuery?.data;
  if (callbackData) {
    const [_, questionId, selectedAnswer] = callbackData.split('_');
    const question = questions.find(q => q.id.toString() === questionId);

    if (question) {
      const correctAnswer = question.correctAnswer;
      const isCorrect = selectedAnswer === correctAnswer;
      
      if (isCorrect) {
        await ctx.answerCbQuery(`Correct! The answer is: ${correctAnswer}`);
      } else {
        await ctx.answerCbQuery(`Incorrect. The correct answer is: ${correctAnswer}`);
      }
    }
  }
};

export { greeting, handleAnswer };
