import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Load the quiz JSON file
  let questions: any[] = [];
  try {
    const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
    questions = await response.json();
  } catch (err) {
    debug('Error fetching question:', err);
    await ctx.reply('Failed to load questions.');
    return;
  }

  const subjectMap: Record<string, string> = {
    p: 'physics',
    b: 'biology',
    c: 'chemistry',
    q: 'any',
  };

  // Parse input: e.g., p1, b5, cr, etc.
  const match = text.match(/^([a-z]+)(\d+)?$/i);
  if (!match) return;

  const prefix = match[1];
  const number = match[2] ? parseInt(match[2], 10) : null;

  let subject = subjectMap[prefix[0]];
  if (!subject) return;

  // Filter questions by subject
  const filtered = subject === 'any' ? questions : questions.filter(q => q.subject.toLowerCase() === subject);

  // Determine which question to send
  let question;
  if (number) {
    if (number > filtered.length) {
      await ctx.reply(`Only ${filtered.length} ${subject} questions available.`);
      return;
    }
    question = filtered[number - 1];
  } else {
    // Random question
    question = filtered[Math.floor(Math.random() * filtered.length)];
  }

  if (!question) {
    await ctx.reply('Question not found.');
    return;
  }

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
