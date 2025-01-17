import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Function to handle user input and send respective quiz links
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.trim().toLowerCase() : null;

  // Ensure the user message is a number (1, 2, etc.)
  if (userMessage && /^\d+$/.test(userMessage)) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name
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

    // Send a visually structured and designed message
    const message = `
🌟 **Hello ${userName},** 🌟

Here’s a quiz specially for you! 🎓

🔹 **Quiz:** [${quizTitle}](${quizLink})

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
    // Handle the case when user input is invalid
    await ctx.reply('Please enter a valid number (e.g., 1, 2, etc.) to get the quiz link.');
  }
};

export { greeting };
