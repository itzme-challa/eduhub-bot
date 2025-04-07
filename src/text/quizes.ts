import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Strict subject match
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

  // Load questions
  let questions: any[] = [];
  try {
    const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
    questions = await response.json();
  } catch (err) {
    debug('Error fetching questions:', err);
    await ctx.reply('Failed to load questions.');
    return;
  }

  // Filter questions by subject
  const filtered = questions.filter(q => q.subject.toLowerCase() === subject);

  if (!filtered.length) {
    await ctx.reply(`No ${subject} questions available.`);
    return;
  }

  // Pick a random question
  const question = filtered[Math.floor(Math.random() * filtered.length)];
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
};

export { quizes };
