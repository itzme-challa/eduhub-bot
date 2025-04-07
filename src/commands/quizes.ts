import { Context } from 'telegraf';
import createDebug from 'debug';
import { InlineKeyboardMarkup, InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

const debug = createDebug('bot:quizes_text');

// Store question index per user (simple in-memory for demo)
const userProgress: Record<number, number> = {};

const fetchQuestions = async () => {
  const res = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/master/quiz.json');
  const data = await res.json();
  return data;
};

const sendQuestion = async (ctx: Context, index: number) => {
  const questions = await fetchQuestions();
  const question = questions[index];

  if (!question) {
    await ctx.reply('No more questions available.');
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
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Previous', callback_data: 'prev' },
          { text: 'Next', callback_data: 'next' }
        ]
      ]
    } as InlineKeyboardMarkup
  } as any);
};

const quizes = () => async (ctx: Context) => {
  debug('Triggered "quizes" text command');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim();
  const userId = ctx.message.from.id;

  if (text === '1') {
    userProgress[userId] = 0;
    await sendQuestion(ctx, 0);
  }
};

// Handle poll answer
const handlePollAnswer = async (ctx: Context) => {
  const userId = ctx.pollAnswer.user.id;
  const answer = ctx.pollAnswer.option_ids[0];
  const questions = await fetchQuestions();
  const index = userProgress[userId] ?? 0;
  const question = questions[index];
  const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(question.correct_option);

  const message = answer === correctOptionIndex
    ? 'Congratulations! You answered correctly.'
    : 'Incorrect. Try the next one!';

  await ctx.telegram.sendMessage(userId, message);
  if (answer !== correctOptionIndex) userProgress[userId] = index + 1;
};

// Handle callback for next/prev
const handleCallbackQuery = async (ctx: Context) => {
  const userId = ctx.callbackQuery.from.id;
  const action = ctx.callbackQuery.data;
  const currentIndex = userProgress[userId] ?? 0;

  if (action === 'next') userProgress[userId] = currentIndex + 1;
  else if (action === 'prev') userProgress[userId] = Math.max(0, currentIndex - 1);

  await sendQuestion(ctx, userProgress[userId]);
  await ctx.answerCbQuery();
};

export { quizes, handlePollAnswer, handleCallbackQuery };
