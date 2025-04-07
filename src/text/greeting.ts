import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  if (!ctx.message || !('text' in ctx.message)) return;

  const text = ctx.message.text.trim().toLowerCase();
  const userName = `${ctx.message.from.first_name ?? ''} ${ctx.message.from.last_name ?? ''}`.trim();

  const greetings = ['hi', 'hello', 'hey', 'hii', 'heyy', 'hola'];
  const quizTriggers = ['quiz', '/quiz'];

  // Skip quiz commands like p1, c2, qr, q3, etc.
  if (/^[pbcq][0-9]+$/i.test(text) || /^[pbcq]r$/i.test(text)) {
    return;
  }

  if (greetings.includes(text)) {
    const replies = [
      `Hey dear ${userName}, how may I help you?`,
      `Hello ${userName}! What can I do for you today?`,
      `Hi ${userName}, how can I assist you?`,
      `Greetings ${userName}! Need any help?`,
      `Hey ${userName}! I’m here to help.`,
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];

    await ctx.reply(reply);
    await ctx.reply(`For practice questions, just type *quiz* or */quiz*`);
  } else if (quizTriggers.includes(text)) {
    await ctx.replyWithMarkdownV2(`Dear *${userName}*,\n\nTo get questions, type:\n\n- *p1, p2, p3...* → for Physics\n- *c1, c2, c3...* → for Chemistry\n- *b1, b2, b3...* → for Biology\n\nTo get a *random* question, type:\n- *pr* → Physics\n- *cr* → Chemistry\n- *br* → Biology\n- *qr* → Any subject`);
  } else {
    await ctx.reply(`Hey ${userName}, how can I help you?`);
  }
};

export { greeting };
