import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

// Base URL for quizzes
const baseUrl = 'https://quizes.pages.dev/play?title=';

// Array of quiz data, structured by exam group and exam type (sub-exam)
const quizData = [
  {
    examGroup: 'jee',  // Exam group
    subExams: [
      {
        type: 'jee-main',
        exams: [
          {
            title: 'JEE Main 2024 Misc Paper 1',
            metaId: 'emb-ait1',
            year: 2024
          },
          {
            title: 'JEE Main 2024 Misc Paper 2',
            metaId: 'emb-ait2',
            year: 2024
          }
        ]
      },
      {
        type: 'jee-advanced',
        exams: [
          {
            title: 'JEE Advanced 2024 Paper 1',
            metaId: 'emb-ait3',
            year: 2024
          }
        ]
      }
    ]
  },
  {
    examGroup: 'neet',  // Exam group
    subExams: [
      {
        type: 'neet',
        exams: [
          {
            title: 'NEET 2024 Misc Paper 1',
            metaId: 'emb-nat1',
            year: 2024
          },
          {
            title: 'NEET 2024 Misc Paper 2',
            metaId: 'emb-nat2',
            year: 2024
          }
        ]
      }
    ]
  }
];

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;
  const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

  // Step 1: Start command
  if (userMessage === '/start') {
    let examGroupList = 'Please select an exam group:\n\n';
    quizData.forEach((quiz, index) => {
      examGroupList += `${index + 1}. ${quiz.examGroup.toUpperCase()}\n`;  // Display available exam groups
    });
    examGroupList += '\nPlease reply with the number of the exam group you want to choose (e.g., 1, 2, etc.).';

    // Send the exam group list
    await ctx.reply(examGroupList);
  }

  // Step 2: User selects an exam group (e.g., "1" for JEE, "2" for NEET)
  else if (/^\d+$/.test(userMessage)) {
    const examGroupNumber = parseInt(userMessage, 10);
    if (examGroupNumber > 0 && examGroupNumber <= quizData.length) {
      const selectedGroup = quizData[examGroupNumber - 1];  // Get selected exam group
      let subExamList = `You selected the ${selectedGroup.examGroup.toUpperCase()} exam group. Here are the available sub-exams:\n\n`;

      // Display the sub-exams (types) available for that group
      selectedGroup.subExams.forEach((subExam, index) => {
        subExamList += `${index + 1}. ${subExam.type.toUpperCase()}\n`;  // Display sub-exams for that group
      });
      subExamList += '\nPlease reply with the number of the sub-exam type you want to choose (e.g., 1, 2, etc.).';

      // Send the list of sub-exams
      await ctx.reply(subExamList);
    } else {
      await ctx.reply('Invalid option. Please choose a valid exam group number (e.g., 1, 2, etc.).');
    }
  }

  // Step 3: User selects a sub-exam (e.g., "1" for jee-main)
  else if (/^\d+$/.test(userMessage)) {
    let selectedSubExam: any = null;
    
    // Find the sub-exam that matches the selected number
    quizData.forEach(group => {
      const foundSubExam = group.subExams.find((subExam, index) => index + 1 === parseInt(userMessage));
      if (foundSubExam) {
        selectedSubExam = foundSubExam;
      }
    });

    if (selectedSubExam) {
      let examList = `You selected the ${selectedSubExam.type.toUpperCase()} sub-exam. Here are the available exams:\n\n`;

      // Display available exams for the selected sub-exam
      selectedSubExam.exams.forEach((exam, index) => {
        examList += `${index + 1}. ${exam.title} (${exam.year})\n`;  // Display exams for that sub-exam
      });
      examList += '\nPlease reply with the number of the exam you want to choose (e.g., 1, 2, etc.).';

      // Send the list of exams for the sub-exam
      await ctx.reply(examList);
    } else {
      await ctx.reply('Invalid option. Please choose a valid sub-exam number (e.g., 1, 2, etc.).');
    }
  }

  // Step 4: User selects an exam (e.g., "1" for JEE Main 2024 Misc Paper 1)
  else if (/^\d+$/.test(userMessage)) {
    let selectedExam: any = null;
    
    // Find the exam that matches the selected exam number
    quizData.forEach(group => {
      group.subExams.forEach(subExam => {
        const foundExam = subExam.exams.find((exam, index) => index + 1 === parseInt(userMessage));
        if (foundExam) {
          selectedExam = foundExam;
        }
      });
    });

    if (selectedExam) {
      const quizLink = `${baseUrl}${encodeURIComponent(selectedExam.title)}&metaId=${selectedExam.metaId}`;
      
      // Send the quiz link
      await ctx.reply(`You selected the exam: ${selectedExam.title}. Here is the available quiz:\n\n`);
      await ctx.reply(`You can play the quiz now by clicking on the link below:\n[${selectedExam.title}](${quizLink})`);
    } else {
      await ctx.reply('Invalid option. Please choose a valid exam number.');
    }
  }

  // Handle invalid input
  else {
    await ctx.reply('Please enter a valid option (e.g., 1, 2, etc.).');
  }
};

export { greeting };
