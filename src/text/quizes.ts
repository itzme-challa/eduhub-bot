import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Match only specific formats: /biology 1, biology 2, etc.
  const match = text.match(/^\/?(biology|physics|chemistry)(?:\s+(\d+))?$/i);
  if (!match) {
    // If text includes any of the subject names but isn't a valid command
    if (text.includes('biology')) {
      await ctx.reply(`Please type only "biology" or "biology 1" for questions!`);
    } else if (text.includes('physics')) {
      await ctx.reply(`Please type only "physics" or "physics 1" for questions!`);
    } else if (text.includes('chemistry')) {
      await ctx.reply(`Please type only "chemistry" or "chemistry 1" for questions!`);
    }
    return;
  }

  const subject = match[1].toLowerCase();
  const index = match[2] ? parseInt(match[2], 10) : null;

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

    let question;
    if (index !== null) {
      if (index < 1 || index > subjectQuestions.length) {
        await ctx.reply(`Only ${subjectQuestions.length} ${subject} questions available.`);
        return;
      }
      question = subjectQuestions[index - 1];
    } else {
      // Random
      const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
      question = subjectQuestions[randomIndex];
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
  } catch (err) {
    debug('Error fetching questions:', err);
    await ctx.reply('Failed to load questions.');
  }
};

export { quizes };
