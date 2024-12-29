import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string, replyMarkup: any) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
    reply_markup: replyMarkup,
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

const createInlineKeyboard = () => {
  return {
    inline_keyboard: [
      [
        {
          text: "View All Commands",
          callback_data: "/list"
        }
      ]
    ]
  };
};

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;

  if (messageId) {
    const greetingMessage = getRandomGreeting().replace('{userName}', userName);
    const inlineKeyboard = createInlineKeyboard();

    await replyToMessage(ctx, messageId, `${greetingMessage}`, inlineKeyboard);
  }
};

export { greeting };
