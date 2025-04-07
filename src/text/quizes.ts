import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();

  // Ignore question-style requests
  if (/q\d*|question|questions/.test(text)) return;

  // Help message for generic commands
  if (
    ['quiz', '/quiz', 'quizes', '/quizes', 'random', '/random'].includes(text)
  ) {
    await ctx.reply(
      `Hey! To get questions, type one of the following:\n\n` +
        `→ For Biology: "bio 1", "/b1", or "biology"\n` +
        `→ For Physics: "phy 2", "/p2", or "physics"\n` +
        `→ For Chemistry: "chem 3", "/c3", or "chemistry"\n\n` +
        `To get multiple random questions:\n` +
        `→ "playbio 5" → 5 random bio questions\n` +
        `→ "playphy 4" → 4 random physics questions\n` +
        `→ "playchem 6" → 6 random chemistry questions`
    );
    return;
  }

  // Match commands like: playbio 5, bio 1, physics 2, etc.
  const match = text.match(
    /^\/?(biology|bio|b|playbio|physics|phy|p|playphy|chemistry|chem|c|playchem)\s*([0-9]+)?$/i
  );
  if (!match) return;

  const subjectRaw = match[1];
  const count = match[2] ? parseInt(match[2], 10) : 1;

  const subjectMap: Record<string, string> = {
    biology: 'biology',
    bio: 'biology',
    b: 'biology',
    playbio: 'biology',
    physics: 'physics',
    phy: 'physics',
    p: 'physics',
    playphy: 'physics',
    chemistry: 'chemistry',
    chem: 'chemistry',
    c: 'chemistry',
    playchem: 'chemistry',
  };

  const subject = subjectMap[subjectRaw];
  if (!subject) return;

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json'
    );
    const allQuestions = await response.json();

    const subjectQuestions = allQuestions.filter(
      (q: any) => q.subject?.toLowerCase() === subject
    );

    if (!subjectQuestions.length) {
      await ctx.reply(`No ${subject} questions available yet.`);
      return;
    }

    const questionsToSend = [];

    if (count === 1) {
      const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
      questionsToSend.push(subjectQuestions[randomIndex]);
    } else {
      const shuffled = subjectQuestions.sort(() => 0.5 - Math.random());
      questionsToSend.push(...shuffled.slice(0, Math.min(count, subjectQuestions.length)));
    }

    for (const question of questionsToSend) {
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
    }
  } catch (err) {
    debug('Error fetching questions:', err);
    await ctx.reply('Oops! Failed to load questions.');
  }
};

export { quizes };
