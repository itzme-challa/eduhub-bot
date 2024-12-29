import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:keywords_command');

// A mapping of keywords to their responses
const keywordResponses: { [key: string]: string } = {
  "quiz": "Looking for quizzes? Check out [Play Quizes](https://itzfew.github.io/Quizes/)",
  "jee": "For JEE resources, use the /jee command or visit our [JEE Resources Page](https://test-series.pages.dev).",
  "neet": "For NEET resources, use the /neet command or visit our [NEET Resources Page](https://test-series.pages.dev).",
  "test series": "Explore test series for NEET and JEE:\n- Akash Test Series: [Link](https://test-series.pages.dev)\n- Allen Test Series: [Link](https://test-series.pages.dev)\n- PW Test Series: [Link](https://test-series.pages.dev)",
  "study groups": "Join study groups for NEET and JEE! Use the /groups command to learn more.",
  "commands": "Use /list to view all available commands."
};

const keywords = () => async (ctx: Context) => {
  const userMessage = ctx.message?.text?.toLowerCase(); // Get the user's message and convert to lowercase

  if (!userMessage) return; // Ignore if there's no message

  for (const [keyword, response] of Object.entries(keywordResponses)) {
    if (userMessage.includes(keyword)) {
      debug(`Triggered keyword "${keyword}" with response: \n${response}`);
      await ctx.replyWithMarkdownV2(response);
      return; // Stop checking once a response is sent
    }
  }

  // Default response if no keyword matches
  debug(`No keyword matched for message: "${userMessage}"`);
  await ctx.reply("I'm sorry, I didn't understand that. Try using /list to see available commands.");
};

export { keywords };
