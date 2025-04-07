import { Context } from 'telegraf';
import createDebug from 'debug';
// If using Node 18+, fetch is globally available. Otherwise, install node-fetch and uncomment below:
// import fetch from 'node-fetch';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, text: string) =>
  ctx.reply(text, {
    reply_parameters: { message_id: messageId },
  });

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const text = ctx.message?.text?.trim();
  const userName = `${ctx.message?.from.first_name ?? ''} ${ctx.message?.from.last_name ?? ''}`.trim();

  if (!messageId || !text) return;

  if (text === '1') {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itzfew/telegram-bot-vercel-boilerplate/refs/heads/master/quiz.json');
      const questions = await response.json();

      const firstQuestion = questions[0]; // or random: questions[Math.floor(Math.random() * questions.length)];
      const questionText = `${firstQuestion.question}\nA) ${firstQuestion.options.A}\nB) ${firstQuestion.options.B}\nC) ${firstQuestion.options.C}\nD) ${firstQuestion.options.D}`;

      await replyToMessage(ctx, messageId, questionText);
    } catch (err) {
      debug('Error fetching question:', err);
      await replyToMessage(ctx, messageId, 'Failed to load question.');
    }
  } else {
    await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { greeting };
