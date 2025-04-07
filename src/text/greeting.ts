import { Context } from 'telegraf';
import createDebug from 'debug';
// import fetch from 'node-fetch'; // Uncomment for Node < 18

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, text: string) =>
  ctx.replyWithMarkdownV2(text, {
    reply_parameters: { message_id: messageId },
  });

let lastQuestion: any = null; // to keep track of current question

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  if (!ctx.message || !('text' in ctx.message)) return;

  const messageId = ctx.message.message_id;
  const text = ctx.message.text.trim().toUpperCase();
  const userName = `${ctx.message.from.first_name ?? ''} ${ctx.message.from.last_name ?? ''}`.trim();

  if (text === '1') {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itzme-challa/eduhub-bot/refs/heads/master/quiz.json');
      const questions = await response.json();

      const randomIndex = Math.floor(Math.random() * questions.length);
      const q = questions[randomIndex];
      lastQuestion = q; // store for answer checking

      const questionText = `*NEET Practice Quiz*\n\n*Q.* ${escapeMarkdown(q.question)}

*Subject:* ${escapeMarkdown(q.subject)}  
*Chapter:* ${escapeMarkdown(q.chapter)}

A. ${escapeMarkdown(q.options.A)}  
B. ${escapeMarkdown(q.options.B)}  
C. ${escapeMarkdown(q.options.C)}  
D. ${escapeMarkdown(q.options.D)}  

_Reply with A, B, C or D_`;

      await replyToMessage(ctx, messageId, questionText);
    } catch (err) {
      debug('Error fetching question:', err);
      await replyToMessage(ctx, messageId, 'Failed to load question.');
    }

  } else if (['A', 'B', 'C', 'D'].includes(text)) {
    if (!lastQuestion) {
      await replyToMessage(ctx, messageId, 'No question asked yet. Type `1` to get a question.');
      return;
    }

    const correct = lastQuestion.correct_option;
    const response = (text === correct)
      ? `✅ *Correct!* Well done.`
      : `❌ *Wrong!* Correct answer is *${correct}*`;

    await replyToMessage(ctx, messageId, `${response}\n\n_Explanation:_ ${escapeMarkdown(lastQuestion.explanation ?? 'No explanation given.')}`);
    
    lastQuestion = null; // reset
  } else {
    await replyToMessage(ctx, messageId, `Hello, ${userName}! Send \`1\` to start a quiz.`);
  }
};

function escapeMarkdown(text: string): string {
  return text
    .replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&'); // Escape Markdown V2 special chars
}

export { greeting };
