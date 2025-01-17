import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Function to handle user input and send respective quiz links
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;
  
  if (userMessage) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

    // Checking if the user input matches 1, 2, or other numbers
    if (/^\d+$/.test(userMessage)) {
      const quizNumber = parseInt(userMessage, 10);
      let quizLink = '';
      let quizTitle = '';

      // Determine the quiz link and title based on the input number
      switch (quizNumber) {
        case 1:
          quizLink = 'https://quizes.pages.dev/play?title=NEET%202023%20Manipur&metaId=3c48616f-298a-5f69-91d2-bcd59444c455';
          quizTitle = 'NEET 2023 Manipur';
          break;
        case 2:
          quizLink = 'https://quizes.pages.dev/play?title=NEET%202023&metaId=cbfbed57-d7d8-5a07-9957-478e4cb62f17';
          quizTitle = 'NEET 2023';
          break;
        // Add more cases for other numbers if needed
        default:
          await ctx.reply('Invalid option. Please choose 1, 2, etc.');
          return;
      }

      // Send a clickable message with the quiz link
      await ctx.reply(`Hey ${userName}, play the following quiz: [${quizTitle}](${quizLink})`);

      // Send the bot share button
      await ctx.replyWithInlineKeyboard(
        [[{
          text: 'Share with friends',
          url: 'https://t.me/IndianChatgpt_bot'
        }]],
        { reply_markup: { inline_keyboard: [[{ text: 'Share the bot @IndianChatgpt_bot', url: 'https://t.me/IndianChatgpt_bot' }]] } }
      );
    } else {
      await ctx.reply('Please enter a valid number (e.g., 1, 2, etc.) to get the quiz link.');
    }
  }
};

export { greeting };
