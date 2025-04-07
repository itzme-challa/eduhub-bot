import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

let lastQuestion: any = null;

const replyToMessage = (ctx: Context, messageId: number, text: string) =>
  ctx.replyWithMarkdownV2(text, {
    reply_parameters: { message_id: messageId },
  });

const greeting = () => async (ctx: Context) => {
  debug('Triggered greeting text command');

  const msg = ctx.message;
  if (!msg || !('text' in msg)) {
    debug('No text message received');
    return;
  }

  const messageId = msg.message_id;
  const text = msg.text.trim().toUpperCase();

  if (text === '1') {
    try {
      debug('Fetching question...');
      const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/refs/heads/master/quiz.json');
      const questions = await response.json();

      if (!Array.isArray(questions) || questions.length === 0) {
        await replyToMessage(ctx, messageId, 'No questions found in quiz.json');
        return;
      }

      const q = questions[Math.floor(Math.random() * questions.length)];
      lastQuestion = q;

      const questionText = `*NEET Quiz*\n\n*Q.* ${escape(q.question)}

*Subject:* ${escape(q.subject || 'N/A')}  
*Chapter:* ${escape(q.chapter || 'N/A')}

A. ${escape(q.options.A)}  
B. ${escape(q.options.B)}  
C. ${escape(q.options.C)}  
D. ${escape(q.options.D)}  

_Reply with A, B, C or D_`;

      await replyToMessage(ctx, messageId, questionText);
    } catch (err) {
      debug('Fetch failed:', err);
      await replyToMessage(ctx, messageId, 'Error loading quiz question.');
    }
  } else if (['A', 'B', 'C', 'D'].includes(text)) {
    if (!lastQuestion) {
      await replyToMessage(ctx, messageId, 'Send `1` first to get a question.');
      return;
    }

    const correct = lastQuestion.correct_option?.toUpperCase();
    const isCorrect = text === correct;

    const feedback = isCorrect
      ? '✅ *Correct!*'
      : `❌ *Wrong!* Correct answer is *${correct}*`;

    await replyToMessage(
      ctx,
      messageId,
      `${feedback}\n\n_Explanation:_ ${escape(lastQuestion.explanation || 'Not available.')}`
    );

    lastQuestion = null;
  } else {
    await replyToMessage(ctx, messageId, 'Hello! Send `1` to get a NEET quiz question.');
  }
};

function escape(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&');
}

export { greeting };
