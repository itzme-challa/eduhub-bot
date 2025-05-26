import { Context } from 'telegraf';
import createDebug from 'debug';
import { Update } from 'telegraf/typings/core/types/typegram';

const debug = createDebug('bot:quizes');

const pollTimers = new Map<string, NodeJS.Timeout>();
const pollCountdowns = new Map<string, NodeJS.Timeout>();
const answeredPolls = new Set<string>();
const pollQuestionMap = new Map<string, any>(); // maps pollId → question
const pollMessageMap = new Map<string, { chatId: number, messageId: number }>(); // for countdown edits

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" handler');

  if (!ctx.message || !('text' in ctx.message)) return;
  const text = ctx.message.text.trim().toLowerCase();

  if (
    ['quiz', '/quiz', 'quizes', '/quizes', 'random', '/random', 'question', 'questions', '/question', '/questions'].includes(text)
  ) {
    await ctx.reply(
      `Hey! To get questions, type:\n\n` +
      `→ "bio 1", "/b1" for Biology\n→ "phy 2", "/p2" for Physics\n→ "chem 3", "/c3" for Chemistry\n\n` +
      `→ "playbio 5" → 5 random bio\n→ "playphy 4"\n→ "playchem 6"`
    );
    return;
  }

  const match = text.match(/^\/?(play)?(bio|b|biology|phy|p|physics|chem|c|chemistry)\s*([0-9]+)?$/i);
  if (!match) return;

  const isPlay = !!match[1];
  const rawSubject = match[2];
  const countOrIndex = match[3] ? parseInt(match[3], 10) : 1;

  const subjectMap: Record<string, string> = {
    bio: 'biology', b: 'biology', biology: 'biology',
    phy: 'physics', p: 'physics', physics: 'physics',
    chem: 'chemistry', c: 'chemistry', chemistry: 'chemistry'
  };
  const subject = subjectMap[rawSubject];
  if (!subject) return;

  try {
    const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
    const allQuestions = await response.json();

    const subjectQuestions = allQuestions.filter((q: any) => q.subject?.toLowerCase() === subject);
    if (!subjectQuestions.length) {
      await ctx.reply(`No ${subject} questions available yet.`);
      return;
    }

    const questionsToSend = isPlay
      ? subjectQuestions.sort(() => 0.5 - Math.random()).slice(0, countOrIndex)
      : [subjectQuestions[countOrIndex - 1]];

    for (const question of questionsToSend) {
      const options = [
        question.options.A,
        question.options.B,
        question.options.C,
        question.options.D,
      ];
      const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(question.correct_option);

      const poll = await ctx.sendPoll(question.question, options, {
        type: 'quiz',
        correct_option_id: correctOptionIndex,
        is_anonymous: false,
      } as any); // type cast

      const pollId = poll.poll.id;
      pollQuestionMap.set(pollId, question);
      pollMessageMap.set(pollId, {
        chatId: poll.chat.id,
        messageId: poll.message_id,
      });
// Countdown message
const countdownMsg = await ctx.reply('⏳ 30 seconds remaining...');
let timeLeft = 30;

// Update countdown every second
const countdownInterval = setInterval(async () => {
  timeLeft--;
  if (timeLeft > 0) {
    try {
      await ctx.telegram.editMessageText(
        countdownMsg.chat.id,
        countdownMsg.message_id,
        undefined,
        `⏳ ${timeLeft} seconds remaining...`
      );
    } catch (e) {}
  }
}, 1000);
      pollCountdowns.set(pollId, countdownInterval);

      // Timeout after 30s
      const timeout = setTimeout(async () => {
        clearInterval(countdownInterval);
        if (!answeredPolls.has(pollId)) {
          const question = pollQuestionMap.get(pollId);
          const countdownRef = pollMessageMap.get(pollId);
          if (countdownRef) {
            await ctx.telegram.editMessageText(
              countdownRef.chatId,
              countdownRef.messageId,
              undefined,
              `⏰ Time's up!`
            );
          }

          await ctx.reply(
            `Missed!\nCorrect Answer: ${question.correct_option}) ${question.options[question.correct_option]}\n\n` +
            `Explanation: ${question.explanation || 'No explanation provided.'}`
          );
        }
      }, 30000);

      pollTimers.set(pollId, timeout);
    }
  } catch (err) {
    debug('Error fetching questions:', err);
    await ctx.reply('Oops! Failed to load questions.');
  }
};

// Answer handler
const handlePollAnswer = () => async (ctx: Context) => {
  const pollAnswer = (ctx.update as Update.PollAnswerUpdate).poll_answer;
  if (!pollAnswer) return;

  const pollId = pollAnswer.poll_id;
  if (answeredPolls.has(pollId)) return;

  answeredPolls.add(pollId);

  const timeout = pollTimers.get(pollId);
  const countdown = pollCountdowns.get(pollId);
  if (timeout) clearTimeout(timeout);
  if (countdown) clearInterval(countdown);

  const question = pollQuestionMap.get(pollId);
  if (question) {
    await ctx.reply(
      `You answered!\nCorrect Answer: ${question.correct_option}) ${question.options[question.correct_option]}\n\n` +
      `Explanation: ${question.explanation || 'No explanation provided.'}`
    );
  }
};

export { quizes, handlePollAnswer };
