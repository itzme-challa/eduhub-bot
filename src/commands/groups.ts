import { Context } from 'telegraf';
import createDebug from 'debug';

import { name } from '../../package.json';

const debug = createDebug('bot:groups_command');

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

// The Groups command to send resources with inline menu
const groups = () => async (ctx: Context) => {
  const message = `*${name} Study Groups*:
  \n\n
  Following is a list of study groups:

  1. NEET Study Group
  [Link](https://example.com/neet-study-group)

  2. JEE Preparation Group
  [Link](https://example.com/jee-preparation-group)

  3. Medical Entrance Exam Group
  [Link](https://example.com/med-entrance-group)

  4. Physics Enthusiasts Group
  [Link](https://example.com/physics-enthusiasts-group)

  5. Biology Discussion Group
  [Link](https://example.com/biology-discussion-group)`;

  // Define the inline menu buttons
  const buttons = [
    { text: 'NEET Group', callback_data: 'group_neet' },
    { text: 'JEE Group', callback_data: 'group_jee' },
    { text: 'Physics Group', callback_data: 'group_physics' },
    { text: 'Biology Group', callback_data: 'group_biology' },
  ];

  debug(`Triggered "groups" command with message \n${message}`);

  // Send the message with inline menu
  await genericResponse(ctx, message, buttons);
};

// Handle callback queries when a user clicks on an inline button
const handleCallbackQuery = async (ctx: Context) => {
  const callbackData = (ctx.callbackQuery as { data: string }).data;

  if (!callbackData) return;

  let groupLink = '';
  let responseMessage = '';

  // Determine the link and message based on the callback data
  switch (callbackData) {
    case 'group_neet':
      groupLink = 'https://example.com/neet-study-group';
      responseMessage = 'You selected the NEET Study Group! Here is the link:';
      break;
    case 'group_jee':
      groupLink = 'https://example.com/jee-preparation-group';
      responseMessage = 'You selected the JEE Preparation Group! Here is the link:';
      break;
    case 'group_physics':
      groupLink = 'https://example.com/physics-enthusiasts-group';
      responseMessage = 'You selected the Physics Enthusiasts Group! Here is the link:';
      break;
    case 'group_biology':
      groupLink = 'https://example.com/biology-discussion-group';
      responseMessage = 'You selected the Biology Discussion Group! Here is the link:';
      break;
    default:
      responseMessage = 'Invalid selection.';
      break;
  }

  // If a group link is selected, send it to the user
  if (groupLink) {
    await ctx.reply(`${responseMessage} ${groupLink}`);
  }
};

export { groups, handleCallbackQuery };
