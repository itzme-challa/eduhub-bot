import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data with the specified format
const quizData = [
  {
    title: 'jee-main-misc',
    examGroup: 'jee',
    papers: [
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait1',
        title: 'JEE Main 2024 Misc Paper 1',
        year: 2024
      },
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait2',
        title: 'JEE Main 2024 Misc Paper 2',
        year: 2024
      },
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait3',
        title: 'JEE Main 2024 Misc Paper 3',
        year: 2024
      },
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait4',
        title: 'JEE Main 2024 Misc Paper 4',
        year: 2024
      },
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait5',
        title: 'JEE Main 2024 Misc Paper 5',
        year: 2024
      },
      {
        exam: 'jee-main',
        examGroup: 'jee',
        metaId: 'emb-ait6',
        title: 'JEE Main 2024 Misc Paper 6',
        year: 2024
      }
    ]
  },
  {
    title: 'neet-misc',
    examGroup: 'medical',
    papers: [
      {
        exam: 'neet',
        examGroup: 'medical',
        metaId: 'emb-nat1',
        title: 'NEET 2024 Misc Paper 1',
        year: 2024
      },
      {
        exam: 'neet',
        examGroup: 'medical',
        metaId: 'emb-nat2',
        title: 'NEET 2024 Misc Paper 2',
        year: 2024
      }
    ]
  }
  // Add more quiz objects following this format
];

const ITEMS_PER_PAGE = 5;  // Number of items per page

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name
    const session = ctx.session || {};

    // Step 1: If the user sends /start, show available exam groups
    if (userMessage === '/start') {
      session.page = 1;  // Reset pagination to the first page
      session.selectionType = 'group'; // We're showing exam groups first
      session.selectionIndex = 0; // Starting with the first quiz group

      let examGroupList = 'Please select the exam group you want to explore:\n\n';
      quizData.slice(session.page - 1, session.page * ITEMS_PER_PAGE).forEach((quiz, index) => {
        examGroupList += `${index + 1}. ${quiz.examGroup.toUpperCase()}\n`;
      });

      examGroupList += '\nPlease reply with the number of the exam group you want to explore (e.g., 1, 2, etc.).';

      // Include pagination controls
      if (quizData.length > ITEMS_PER_PAGE) {
        examGroupList += '\n\nType "Next" to see more exam groups.';
      }

      await ctx.reply(examGroupList);
    }

    // Step 2: If user selects an exam group, show list of exams for that group
    else if (/^\d+$/.test(userMessage) && session.selectionType === 'group') {
      const groupIndex = parseInt(userMessage, 10) - 1;
      if (groupIndex >= 0 && groupIndex < quizData.length) {
        const selectedExamGroup = quizData[groupIndex];
        session.selectedExamGroup = selectedExamGroup;

        session.selectionType = 'exam'; // Now we're showing exams under the selected group
        session.selectionIndex = groupIndex; // Track the selected group

        let examList = `You have selected the ${selectedExamGroup.examGroup.toUpperCase()} exam group. Please choose an exam:\n\n`;

        selectedExamGroup.papers.slice(0, ITEMS_PER_PAGE).forEach((paper, paperIndex) => {
          examList += `${groupIndex + 1}.${paperIndex + 1}. ${paper.title} (${paper.year})\n`;
        });

        examList += '\nPlease reply with the number of the exam you want to explore (e.g., 1, 1.1, etc.).';

        // Include pagination controls for exam
        if (selectedExamGroup.papers.length > ITEMS_PER_PAGE) {
          examList += '\n\nType "Next" to see more exams.';
        }

        await ctx.reply(examList);
      } else {
        await ctx.reply('Invalid option. Please choose a valid exam group number (e.g., 1, 2, etc.).');
      }
    }

    // Step 3: If user selects an exam, show list of exam papers
    else if (/^\d+(\.\d+)?$/.test(userMessage) && session.selectionType === 'exam') {
      const parts = userMessage.split('.');
      const groupIndex = parseInt(parts[0], 10) - 1;
      const paperIndex = parts[1] ? parseInt(parts[1], 10) - 1 : null;

      if (groupIndex >= 0 && groupIndex < quizData.length) {
        const selectedExamGroup = quizData[groupIndex];

        if (paperIndex !== null && paperIndex >= 0 && paperIndex < selectedExamGroup.papers.length) {
          const selectedPaper = selectedExamGroup.papers[paperIndex];
          const quizLink = `${baseUrl}${encodeURIComponent(selectedPaper.title)}&metaId=${selectedPaper.metaId}`;

          await ctx.reply(`Hey ${userName}, play the following quiz: [${selectedPaper.title} - ${selectedPaper.year}](${quizLink})`);

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
          await ctx.reply('Invalid option. Please choose a valid paper number (e.g., 1, 1.1, etc.).');
        }
      } else {
        await ctx.reply('Invalid option. Please choose a valid exam group number (e.g., 1, 2, etc.).');
      }
    }

    // Handle "Next" pagination command for both groups and exams
    else if (userMessage === 'next') {
      if (session.selectionType === 'group') {
        session.page += 1;
        const startIndex = (session.page - 1) * ITEMS_PER_PAGE;
        const endIndex = session.page * ITEMS_PER_PAGE;
        let examGroupList = 'Please select the exam group you want to explore:\n\n';

        quizData.slice(startIndex, endIndex).forEach((quiz, index) => {
          examGroupList += `${startIndex + index + 1}. ${quiz.examGroup.toUpperCase()}\n`;
        });

        if (endIndex < quizData.length) {
          examGroupList += '\n\nType "Next" to see more exam groups.';
        }

        await ctx.reply(examGroupList);
      } else if (session.selectionType === 'exam' && session.selectedExamGroup) {
        const selectedExamGroup = session.selectedExamGroup;
        const startIndex = (session.page - 1) * ITEMS_PER_PAGE;
        const endIndex = session.page * ITEMS_PER_PAGE;
        let examList = `You have selected the ${selectedExamGroup.examGroup.toUpperCase()} exam group. Please choose an exam:\n\n`;

        selectedExamGroup.papers.slice(startIndex, endIndex).forEach((paper, paperIndex) => {
          examList += `${startIndex + paperIndex + 1}. ${paper.title} (${paper.year})\n`;
        });

        if (endIndex < selectedExamGroup.papers.length) {
          examList += '\n\nType "Next" to see more exams.';
        }

        await ctx.reply(examList);
      }
    }

    else {
      await ctx.reply('Please enter a valid number (e.g., 1, 1.1, etc.) to get the quiz link or type "Next" to continue.');
    }
  }
};

export { greeting };
