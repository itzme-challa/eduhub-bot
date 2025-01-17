import { Context } from 'telegraf';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

// Sample JSON structure with questions and options
const questions = [
  { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], correctAnswer: 'Paris' },
  { id: 2, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
  { id: 3, question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Jupiter' },
  // Add more questions as needed
];

// Handle answer selection
const handleAnswer = () => async (ctx: Context) => {
  // Explicitly cast the callback query to the correct type
  const callbackData = (ctx.callbackQuery?.data as string) || '';
  
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

export { handleAnswer };
