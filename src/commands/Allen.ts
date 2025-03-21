import { Context } from 'telegraf';

// Type Guard to check if the message has a text property
function isTextMessage(message: any): message is { text: string } {
  return message && message.text;
}

export const keywordReply = () => async (ctx: Context) => {
  const message = ctx.message;

  // Check if the message is a text message
  if (isTextMessage(message)) {
    const messageText = message.text.toLowerCase(); // Convert to lowercase for case-insensitive matching
    console.log(`Received message: ${messageText}`); // Log the received message

    // Check for the keywords in the message text
    const keywords = ['akash', 'allen', 'pw', 'pdf', 'study'];
    const matchedKeyword = keywords.find(keyword => messageText.includes(keyword));
    if (matchedKeyword) {
      console.log(`Found keyword: ${matchedKeyword}`); // Log the matched keyword
      await ctx.reply("Hello dear, I am here to try");
    } else {
      console.log("No matching keyword found"); // Log if no match is found
    }
  } else {
    console.log("Received a non-text message");
  }
};
