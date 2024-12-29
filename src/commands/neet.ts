import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:generic_command');

const createInlineMenu = (buttons: { text: string; callback_data: string }[]) => {
  return {
    reply_markup: {
      inline_keyboard: buttons.map(button => [{ text: button.text, callback_data: button.callback_data }]),
    },
  };
};

const genericResponse = async (ctx: Context, message: string, buttons: { text: string; callback_data: string }[]) => {
  const inlineMenu = createInlineMenu(buttons);
  await ctx.reply(message, { ...inlineMenu });
};

const neet = () => async (ctx: Context) => {
  const message = `*NEET Resources*:
  \n\n
  1. NEET 2024 Mock Tests
  [Link](https://example.com/neet-mock-tests)

  2. NEET Physics Preparation
  [Link](https://example.com/neet-physics)

  3. NEET Chemistry Notes
  [Link](https://example.com/neet-chemistry)

  4. NEET Biology Revision
  [Link](https://example.com/neet-biology)

  5. NEET Previous Year Questions
  [Link](https://example.com/neet-pyqs)`;

  const buttons = [
    { text: 'Physics', callback_data: 'neet_physics' },
    { text: 'Chemistry', callback_data: 'neet_chemistry' },
    { text: 'Biology', callback_data: 'neet_biology' },
    { text: 'Get Mock Tests', callback_data: 'neet_mock_tests' },
  ];

  debug(`Triggered "neet" command with message \n${message}`);

  await genericResponse(ctx, message, buttons);
};

const handleCallbackQuery = (ctx: Context) => {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  switch (callbackData) {
    case 'neet_physics':
      ctx.reply('You selected NEET Physics! Here are the resources.');
      break;
    case 'neet_chemistry':
      ctx.reply('You selected NEET Chemistry! Here are the resources.');
      break;
    case 'neet_biology':
      ctx.reply('You selected NEET Biology! Here are the resources.');
      break;
    case 'neet_mock_tests':
      ctx.reply('Here are the NEET Mock Tests resources.');
      break;
    default:
      ctx.reply('Invalid selection.');
      break;
  }
};

export { neet, handleCallbackQuery };
