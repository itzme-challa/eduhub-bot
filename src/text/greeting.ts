import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
  });

const getRandomGreeting = (): string => {
  const greetings = [
    "Hello dear, {userName}!",
    "Hi {userName}, nice to see you!",
    "Greetings {userName}, how can I assist you today?",
    "Hey {userName}, hope you're doing well!",
    "Welcome {userName}, ready to get started?",
    "Good day {userName}, how may I help?"
  ];
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  if (messageId) {
    const greetingMessage = getRandomGreeting().replace('{userName}', userName);
    const commandListMessage = `
    To interact with me, you can use the following commands:
    /list - View all available commands
    /help - Get help and instructions
    /start - Start a new session
    /about - Get information about me 
    `;

    await replyToMessage(ctx, messageId, `${greetingMessage}\n\n${commandListMessage}`);
  }
};

export { greeting };
