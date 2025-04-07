import { Context } from 'telegraf';
import createDebug from 'debug';
// import fetch from 'node-fetch'; // Uncomment if not using Node 18+

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, text: string) =>
  ctx.reply(text, {
    reply_parameters: { message_id: messageId },
  });

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  if (!ctx.message || !('text' in ctx.message)) return;

  const messageId = ctx.message.message_id;
  const text = ctx.message.text.trim();
  const userName = `${ctx.message.from.first_name ?? ''} ${ctx.message.from.last_name ?? ''}`.trim();

  if (text === '1') {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/refs/heads/master/quiz.json');
      const questions = await response.json();

      const firstQuestion = questions[0];
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
