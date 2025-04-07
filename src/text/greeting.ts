import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

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
      const options = [
        firstQuestion.options.A,
        firstQuestion.options.B,
        firstQuestion.options.C,
        firstQuestion.options.D,
      ];
      const correctOptionIndex = ['A', 'B', 'C', 'D'].indexOf(firstQuestion.correct_option);
await ctx.sendPoll(firstQuestion.question, options, {
  type: 'quiz',
  correct_option_id: correctOptionIndex,
  is_anonymous: false,
  explanation: firstQuestion.explanation || 'No explanation provided.',
} as any); // <--- This avoids the TS2353 error 
    
    } catch (err) {
      debug('Error fetching question:', err);
      await ctx.reply('Failed to load question.');
    }
  } else {
    await ctx.reply(`Hello, ${userName}!`);
  }
};

export { greeting };
