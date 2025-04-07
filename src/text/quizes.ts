import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim();
  const questionIndex = parseInt(text, 10);

  // Only handle numeric inputs
  if (!isNaN(questionIndex) && questionIndex > 0) {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
      const questions = await response.json();

      if (questionIndex > questions.length) {
        await ctx.reply(`Only ${questions.length} questions available.`);
        return;
      }

      const question = questions[questionIndex - 1];
      const options = [
        question.options.A,
        question.options.B,
        question.options.C,
        question.options.D,
      ];
      const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(question.correct_option);

      await ctx.sendPoll(question.question, options, {
        type: 'quiz',
        correct_option_id: correctOptionIndex,
        is_anonymous: false,
        explanation: question.explanation || 'No explanation provided.',
      } as any);

    } catch (err) {
      debug('Error fetching question:', err);
      await ctx.reply('Failed to load question.');
    }
  }
  // ignore non-numeric inputs silently
};

export { quizes };
