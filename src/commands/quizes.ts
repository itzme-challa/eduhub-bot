import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" command');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim();

  if (text === '1') {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
      const questions = await response.json();

      const firstQuestion = questions[0];
      const options = [
        firstQuestion.options.A,
        firstQuestion.options.B,
        firstQuestion.options.C,
        firstQuestion.options.D,
      ];
      const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(firstQuestion.correct_option);

      await ctx.sendPoll(firstQuestion.question, options, {
        type: 'quiz',
        correct_option_id: correctOptionIndex,
        is_anonymous: false,
        explanation: firstQuestion.explanation || 'No explanation provided.',
      } as any); // avoids TS2353 typing error

    } catch (err) {
      debug('Error fetching question:', err);
      await ctx.reply('Failed to load question.');
    }
  }

  // All other messages are ignored silently
};

export { quizes };
