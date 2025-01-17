import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Quiz data (titles and corresponding metaIds)
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

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.trim().toLowerCase() : null;

  // Ensure the user message is a number (1, 2, etc.)
  if (userMessage && /^\d+$/.test(userMessage)) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name
    const quizNumber = parseInt(userMessage, 10);

    // Check if the quizNumber exists in the quizData array
    if (quizNumber > 0 && quizNumber <= quizData.length) {
      const quiz = quizData[quizNumber - 1]; // Get the quiz data based on the user's input
      const quizLink = `${baseUrl}${encodeURIComponent(quiz.title)}&metaId=${quiz.metaId}`;
      
      // Send a visually structured and designed message
      const message = `
🌟 **Hello ${userName},** 🌟

Here’s a quiz specially for you! 🎓

🔹 **Quiz:** [${quiz.title}](${quizLink})

🔹 **Ready to play?** Click the link above and test your knowledge!

📢 **Don't forget to share the bot with your friends and invite them to join the fun!** 

👇 Tap the button below to share the bot! 👇
`;

      await ctx.reply(message, {
        parse_mode: 'MarkdownV2',
      });

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
      await ctx.reply('Invalid option. Please choose a valid quiz number.');
    }
  } else {
    // Handle the case when user input is invalid
    await ctx.reply('Please enter a valid number (e.g., 1, 2, etc.) to get the quiz link.');
  }
};

export { greeting };
