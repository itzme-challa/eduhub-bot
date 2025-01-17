import { Context } from 'telegraf';
import createDebug from 'debug';

// Declare debug instance just once
const debug = createDebug('bot:greeting_text');

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  // Rest of your code

// Sample question object based on the provided JSON
const questionData = [
  {
    "question_id": "xi4scO6KKTg8uNxX",
    "marks": 3,
    "negMarks": 0.75,
    "subjectGroup": null,
    "subject": "chemistry",
    "chapterGroup": "physical-chemistry",
    "chapter": "electrochemistry",
    "difficulty": null,
    "topicName": null,
    "type": "mcq",
    "examDate": null,
    "topic": null,
    "isOutOfSyllabus": false,
    "isBonus": false,
    "content": "For the following cell,\n<br><br>$$Zn\\left( s \\right)\\left| {ZnS{O_4}\\left( {aq} \\right)} \\right|\\left| {CuS{O_4}\\left( {aq} \\right)} \\right|Cu\\left( s \\right)$$\n<br><br>when the concentration of $$Z{n^{2 + }}$$ is $$10$$ times the concentration of $$C{u^{2 + }},$$ the expression for $$\\Delta G$$ (in $$J\\,mo{l^{ - 1}}$$) is [$$F$$ is Faraday constant; $$R$$ is gas constant; $$T$$ is temperature; $${E^0}$$ (cell)$$=1.1$$ $$V$$]",
    "options": [
      { "identifier": "A", "content": "$$1.1F$$" },
      { "identifier": "B", "content": "$$2.303RT-2.2F$$" },
      { "identifier": "C", "content": "$$2.303RT+1.1F$$" },
      { "identifier": "D", "content": "$$-2.2F$$" }
    ],
    "correct_options": ["B"],
    "answer": null,
    "explanation": "<p>The reaction involved is</p>\n<p>$$Zn(s) + C{u^{2 + }}(aq)$$ $$\\rightleftharpoons$$ $$Z{n^{2 + }}(aq) + Cu(s)$$</p>\n<p>$$\\Delta G = \\Delta G^\\circ  + 2.303RT\\log {{[Z{n^{2 + }}]} \\over {[C{u^{2 + }}]}}$$</p>\n<p>$$\\Delta G =  - nFE^\\circ  + 2.303RT\\log {{[Z{n^{2 + }}]} \\over {[C{u^{2 + }}]}}$$ ........ (1)</p>\n<p>Substituting n = 2, E$$^\\circ$$ = 1.1 and $$[Z{n^{2 + }}] = 10$$ and $$[C{u^{2 + }}] = 1$$ in Eq. (1), we get</p>\n<p>$$\\Delta G = ( - 2 \\times F \\times 1.1) + 2.303RT\\log {{10} \\over 1}$$</p>\n<p>= 2.303 RT $$-$$ 2.2 F</p>"
  }
];

const debug = createDebug('bot:greeting_text');

// Main greeting function
const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  // Get the message text or handle non-text messages
  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (messageId) {
    if (userMessage) {
      // Process text messages only
      if (userMessage === '/start') {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hlo')) {
        await ctx.reply(`Hey ${userName}, how may I help you?`);
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('exit')) {
        await ctx.reply(`Goodbye ${userName}, take care!`);
      } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        await ctx.reply(`You're welcome, ${userName}! Let me know if you need further assistance.`);
      } else if (userMessage.includes('how are you') || userMessage.includes('how are you doing')) {
        await ctx.reply(`I'm doing great, ${userName}! How can I assist you today?`);
      } else if (userMessage === '1') {
        // Send the question from the JSON
        const question = questionData[0];
        const questionText = `
          Question: ${question.content}
          
          Options:
          A: ${question.options[0].content}
          B: ${question.options[1].content}
          C: ${question.options[2].content}
          D: ${question.options[3].content}

          Explanation: ${question.explanation}
        `;
        await ctx.reply(questionText);
      } else {
        await ctx.reply(`I don't understand. Please check the command /list for available options.`);
      }
    } else {
      // Handle non-text messages (e.g., media)
      await ctx.reply(`I can only respond to text messages. Please send a text command.`);
    }
  }
};

export { greeting };
