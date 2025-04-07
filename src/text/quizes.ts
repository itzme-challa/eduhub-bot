import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Match format like: /biology 2, chemistry 1 (number is required)
  const match = text.match(/^\/?(physics|chemistry|biology)\s+(\d+)$/i);
  if (!match) return;

  const subject = match[1].toLowerCase();
  const index = parseInt(match[2], 10);

  try {
    const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
    const allQuestions = await response.json();

    const subjectQuestions = allQuestions.filter(
      (q: any) => q.subject?.toLowerCase() === subject
    );

    if (index < 1 || index > subjectQuestions.length) {
      await ctx.reply(`Only ${subjectQuestions.length} ${subject} questions available.`);
      return;
    }

    const question = subjectQuestions[index - 1];

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
    debug('Error fetching questions:', err);
    await ctx.reply('Failed to load questions.');
  }
};

export { quizes };
