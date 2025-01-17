import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data with the specified format
const quizData = [
  {
    examGroup: 'jee',
    exams: [
      {
        exam: 'jee-main',
        metaId: 'emb-ait1',
        title: 'JEE Main 2024 Misc Paper 1',
        year: 2024
      },
      {
        exam: 'jee-main',
        metaId: 'emb-ait2',
        title: 'JEE Main 2024 Misc Paper 2',
        year: 2024
      }
    ]
  },
  {
    examGroup: 'neet',
    exams: [
      {
        exam: 'neet',
        metaId: 'emb-nat1',
        title: 'NEET 2024 Misc Paper 1',
        year: 2024
      },
      {
        exam: 'neet',
        metaId: 'emb-nat2',
        title: 'NEET 2024 Misc Paper 2',
        year: 2024
      }
    ]
  }
  // Add more quiz objects following this format
];

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;
  const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

  if (userMessage) {
    // Step 1: If the user sends /start, prompt them to select an exam group
    if (userMessage === '/start') {
      const examGroups = quizData.map(quiz => quiz.examGroup);  // Extract exam groups
      let examGroupList = 'Please select an exam group:\n\n';

      examGroups.forEach((group, index) => {
        examGroupList += `${index + 1}. ${group.toUpperCase()}\n`;  // Display available exam groups
      });

      examGroupList += '\nPlease reply with the number of the exam group you want to choose (e.g., 1, 2, etc.).';

      // Send the exam group list
      await ctx.reply(examGroupList);
    }

    // Step 2: User selects an exam group
    else if (/^\d+$/.test(userMessage)) {
      const examGroupNumber = parseInt(userMessage, 10);
      const examGroups = quizData.map(quiz => quiz.examGroup);

      if (examGroupNumber > 0 && examGroupNumber <= examGroups.length) {
        const selectedGroup = examGroups[examGroupNumber - 1];  // Get selected exam group
        const examsInGroup = quizData.find(quiz => quiz.examGroup === selectedGroup)?.exams;

        if (examsInGroup) {
          let examList = `You selected the ${selectedGroup.toUpperCase()} exam group. Here are the available exams:\n\n`;
          examsInGroup.forEach((exam, index) => {
            examList += `${index + 1}. ${exam.exam.toUpperCase()} - ${exam.title} (${exam.year})\n`;  // Display exam names and titles
          });

          examList += '\nPlease reply with the number of the exam you want to choose (e.g., 1, 2, etc.).';

          // Send the list of available exams in the selected group
          await ctx.reply(examList);
        }
      } else {
        await ctx.reply('Invalid option. Please choose a valid exam group number (e.g., 1, 2, etc.).');
      }
    }

    // Step 3: User selects an exam
    else if (/^\d+$/.test(userMessage)) {
      const selectedExamNumber = parseInt(userMessage, 10);
      const selectedExam = quizData[selectedExamNumber - 1];

      if (selectedExam) {
        const quizzesInExam = selectedExam.exams;
        let quizList = `You selected the exam: ${selectedExam.examGroup.toUpperCase()} - Here are the available quizzes:\n\n`;

        quizzesInExam.forEach((quiz, index) => {
          quizList += `${index + 1}. ${quiz.title} (${quiz.year})\n`;  // Display quiz titles
        });

        quizList += '\nPlease reply with the number of the quiz you want to play (e.g., 1, 2, etc.).';

        // Send the list of available quizzes for the selected exam
        await ctx.reply(quizList);
      }
    }

    // Handle invalid input (when user doesn't follow the sequence correctly)
    else {
      await ctx.reply('Please enter a valid option (e.g., 1, 2, etc.).');
    }
  }
};

export { greeting };
