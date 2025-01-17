import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data (title and metaId)
const quizData = [
  {
    title: 'NEET 2023 Manipur',
    metaId: '3c48616f-298a-5f69-91d2-bcd59444c455',
  },
  {
    title: 'NEET 2023',
    metaId: 'cbfbed57-d7d8-5a07-9957-478e4cb62f17',
  },
  // Add more quiz objects here with title and metaId
];

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

    // If the user sends /start, show available quizzes
    if (userMessage === '/start') {
      let quizList = 'Please select the quiz you want to play:\n\n';
      quizData.forEach((quiz, index) => {
        quizList += `${index + 1}. ${quiz.title}\n`;  // Display quizzes as 1, 2, 3, etc.
      });

      quizList += '\nPlease reply with the number of the quiz you want to play (e.g., 1, 2, etc.).';

      // Send the list of available quizzes
      await ctx.reply(quizList);
    }

    // If the user inputs a valid number, generate the quiz link and send it
    else if (/^\d+$/.test(userMessage)) {
      const quizNumber = parseInt(userMessage, 10);

      // Check if the input number is valid and within the range of available quizzes
      if (quizNumber > 0 && quizNumber <= quizData.length) {
        const quiz = quizData[quizNumber - 1]; // Get the quiz data based on the user's input
        const quizLink = `${baseUrl}${encodeURIComponent(quiz.title)}&metaId=${quiz.metaId}`;

        // Send a clickable message with the quiz link
        await ctx.reply(`Hey ${userName}, play the following quiz: [${quiz.title}](${quizLink})`);

        // Send the bot share button using reply with inline keyboard
        await ctx.reply('Share the bot with your friends:', {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Share with friends',
                  url: 'https://t.me/IndianChatgpt_bot',
                },
              ],
            ],
          },
        });
      } else {
        // If the input number is not valid
        await ctx.reply('Invalid option. Please choose a valid quiz number (e.g., 1, 2, etc.).');
      }
    } else {
      // Handle case when the user input is not a valid number
      await ctx.reply('Please enter a valid number (e.g., 1, 2, etc.) to get the quiz link.');
    }
  }
};

export { greeting };
