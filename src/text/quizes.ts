import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Allowed strict commands
  const triggers: Record<string, string> = {
    '/physics': 'physics',
    'physics': 'physics',
    '/chemistry': 'chemistry',
    'chemistry': 'chemistry',
    '/biology': 'biology',
    'biology': 'biology',
  };

  const subject = triggers[text];
  if (!subject) return;

  try {
    const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
    const allQuestions = await response.json();

    const subjectQuestions = allQuestions.filter(
      (q: any) => q.subject?.toLowerCase() === subject
    );

    if (!subjectQuestions.length) {
      await ctx.reply(`No ${subject} questions available.`);
      return;
    }

    const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
    const question = subjectQuestions[randomIndex];

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
