import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:neet_command');

// Function to create the inline menu with buttons
const createInlineMenu = (buttons: { text: string; callback_data: string }[]) => {
  return {
    reply_markup: {
      inline_keyboard: buttons.map(button => [{ text: button.text, callback_data: button.callback_data }]),
    },
  };
};

// Function to send a generic response with inline buttons
const genericResponse = async (ctx: Context, message: string, buttons: { text: string; callback_data: string }[]) => {
  const inlineMenu = createInlineMenu(buttons);
  await ctx.reply(message, { ...inlineMenu });
};

// The NEET command to send resources with inline menu
const neet = () => async (ctx: Context) => {
  const message = `*${name} NEET Resources*:
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

  // Define the inline menu buttons
  const buttons = [
    { text: 'Physics', callback_data: 'neet_physics' },
    { text: 'Chemistry', callback_data: 'neet_chemistry' },
    { text: 'Biology', callback_data: 'neet_biology' },
    { text: 'Get Mock Tests', callback_data: 'neet_mock_tests' },
  ];

  debug(`Triggered "neet" command with message \n${message}`);

  // Send the message with inline menu
  await genericResponse(ctx, message, buttons);
};

// Handle callback queries when a user clicks on an inline button
const handleCallbackQuery = (ctx: Context) => {
  // Type-cast ctx.callbackQuery to ensure 'data' exists
  const callbackData = (ctx.callbackQuery as { data: string }).data;

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
