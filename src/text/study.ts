import { Context, Message } from 'telegraf';

// The message that should be sent when specific words are detected
const studyMaterialsMessage = `
1. **Akash Test Series 2024**: https://1024terabox.com/s/1p2-kKH5huVDr54pZbnK9TQ
2. **Allen Modules**: https://1024terabox.com/s/10fXMK_5BU6zs9UHRtZ-aSg
// ... rest of the links
`;

const triggerKeywords = ['Akash', 'Allen', 'Test', 'pw', 'Physics Wallah', 'pdf', 'study material'];

const isTextMessage = (message: Message): message is Message.TextMessage => {
  return 'text' in message;
};

const study = {
  respond: () => async (ctx: Context) => {
    if (ctx.message?.text) {
      const userMessage = ctx.message.text.toLowerCase();
      if (triggerKeywords.some(keyword => userMessage.includes(keyword.toLowerCase()))) {
        await ctx.reply(studyMaterialsMessage, { parse_mode: 'Markdown' });
      }
    }
  },
};
export { study };
