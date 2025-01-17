import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data with the specified format
const quizData = [
  {
    examGroup: 'jee',  // Exam group, such as 'jee', 'neet', etc.
    exams: [
      {
        exam: 'jee-main',  // Specific exam, such as 'jee-main', 'neet', etc.
        metaId: 'emb-ait1',
        title: 'JEE Main 2024 Misc Paper 1',
        year: 2024
      },
      {
        exam: 'jee-main',
        metaId: 'emb-ait2',
        title: 'JEE Main 2024 Misc Paper 2',
        year: 2024
      },
      {
        exam: 'jee-advanced',
        metaId: 'emb-ait3',
        title: 'JEE Advanced 2024 Paper 1',
        year: 2024
      }
    ]
  },
  {
    examGroup: 'neet',  // Exam group, such as 'neet'
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

    // Step 2: User selects an exam group (e.g., 1 for NEET, 2 for JEE)
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

    // Step 3: User selects an exam (e.g., 1 for NEET 2024)
    else if (/^\d+$/.test(userMessage)) {
      const selectedExamNumber = parseInt(userMessage, 10);
      const selectedExamGroup = quizData.find(group => group.exams.some(exam => exam.metaId === userMessage)); // Find selected exam group

      if (selectedExamGroup) {
        const selectedExam = selectedExamGroup.exams[selectedExamNumber - 1];  // Get selected exam
        let quizList = `You selected the exam: ${selectedExamGroup.examGroup.toUpperCase()} - Here are the available quizzes:\n\n`;

        // Display quiz titles for selected exam
        quizList += `${selectedExam.title} (${selectedExam.year})\n`;

        quizList += `\nYou can play the quiz now by clicking on the link below:\n`;
        const quizLink = `${baseUrl}${encodeURIComponent(selectedExam.title)}&metaId=${selectedExam.metaId}`;
        quizList += `[${selectedExam.title}](${quizLink})`;

        // Send the quiz link
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
