import { Context } from 'telegraf'; import createDebug from 'debug';

const debug = createDebug('bot:quizes');

const quizes = () => async (ctx: Context) => { debug('Triggered "quizes" handler');

if (!ctx.message || !('text' in ctx.message)) return;

const text = ctx.message.text.trim(); const questionIndex = parseInt(text, 10);

if (!isNaN(questionIndex) && questionIndex > 0) { try { const response = await fetch('https://raw.githubusercontent.com/itzfew/Quizes/refs/heads/main/pyq/ff8a8025-27c9-5db0-b544-41165d6dbb98.json'); const data = await response.json(); const questions = data.questions;

if (questionIndex > questions.length) {
    await ctx.reply(`Only ${questions.length} questions available.`);
    return;
  }

  const question = questions[questionIndex - 1];
  const options = question.options.map((opt: any) => opt.content);
  const correctOptionIndex = question.options.findIndex((opt: any) => opt.identifier === question.correct_options[0]);

  await ctx.sendPoll(stripHtmlTags(question.content), options, {
    type: 'quiz',
    correct_option_id: correctOptionIndex,
    is_anonymous: false,
    explanation: stripHtmlTags(question.explanation || 'No explanation provided.'),
  } as any);
} catch (err) {
  debug('Error fetching question:', err);
  await ctx.reply('Failed to load question.');
}

} // ignore non-numeric inputs silently };

function stripHtmlTags(html: string): string { return html .replace(/<[^>]+>/g, '') .replace(/$$([^$]+)$$/g, (, math) => math) // for mathjax-like blocks .replace(/$(.*?)$/g, (, math) => math); // for inline math }

export { quizes };

