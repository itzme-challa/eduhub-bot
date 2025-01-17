const ITEMS_PER_PAGE = 10;  // Items per page

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userMessage = ctx.message && 'text' in ctx.message ? ctx.message.text.toLowerCase() : null;

  if (userMessage) {
    const userName = ctx.from?.first_name || 'Dear User';  // Retrieve user's first name

    // If the user sends /start, prompt them to select an exam group
    if (userMessage === '/start') {
      const examGroups = Array.from(new Set(quizData.map(quiz => quiz.papers[0].examGroup)));  // Extract unique exam groups
      let examGroupList = 'Please select an exam group:\n\n';

      examGroups.forEach((group, index) => {
        examGroupList += `${index + 1}. ${group}\n`;  // Display available exam groups
      });

      examGroupList += '\nPlease reply with the number of the exam group you want to choose (e.g., 1, 2, etc.).';

      // Send the exam group list
      await ctx.reply(examGroupList);
    }

    // If the user selects an exam group
    else if (/^\d+$/.test(userMessage)) {
      const examGroupNumber = parseInt(userMessage, 10);
      const examGroups = Array.from(new Set(quizData.map(quiz => quiz.papers[0].examGroup)));

      if (examGroupNumber > 0 && examGroupNumber <= examGroups.length) {
        const selectedGroup = examGroups[examGroupNumber - 1];  // Get selected exam group

        // Find quizzes related to the selected exam group
        const quizzesInGroup = quizData.filter(quiz => quiz.papers[0].examGroup === selectedGroup);

        // Pagination
        const sendQuizzesPage = async (page: number) => {
          let quizList = `You selected the ${selectedGroup} exam group. Here are the available quizzes (Page ${page}):\n\n`;

          const start = (page - 1) * ITEMS_PER_PAGE;
          const end = Math.min(start + ITEMS_PER_PAGE, quizzesInGroup.length);

          quizzesInGroup.slice(start, end).forEach((quiz, index) => {
            quizList += `${start + index + 1}. ${quiz.title.replace('-', ' ').toUpperCase()}\n`;  // Display quiz titles
            quiz.papers.forEach((paper, paperIndex) => {
              quizList += `  ${start + index + 1}.${paperIndex + 1}. ${paper.title} (${paper.year})\n`; // Display papers under each quiz
            });
          });

          quizList += '\nPlease reply with the number of the quiz you want to play (e.g., 1, 1.1, etc.).\n';
          
          const buttons = [];
          if (start > 0) {
            buttons.push({
              text: 'Previous Page',
              callback_data: `page_${page - 1}`,
            });
          }
          if (end < quizzesInGroup.length) {
            buttons.push({
              text: 'Next Page',
              callback_data: `page_${page + 1}`,
            });
          }

          // Send the quiz list and the navigation buttons
          await ctx.reply(quizList, {
            reply_markup: {
              inline_keyboard: buttons.length ? [buttons] : [],
            },
          });
        };

        // Send the first page of quizzes
        await sendQuizzesPage(1);
      } else {
        // If the exam group number is not valid
        await ctx.reply('Invalid option. Please choose a valid exam group number (e.g., 1, 2, etc.).');
      }
    }

    // Handle pagination callback queries (Next/Previous)
    else if (userMessage.startsWith('page_')) {
      const pageNumber = parseInt(userMessage.split('_')[1], 10);
      const examGroups = Array.from(new Set(quizData.map(quiz => quiz.papers[0].examGroup)));
      const selectedGroup = examGroups[0];  // assuming the group is already selected
      const quizzesInGroup = quizData.filter(quiz => quiz.papers[0].examGroup === selectedGroup);

      await sendQuizzesPage(pageNumber);
    }

    // Handle other user input (quiz selection)
    else if (/^\d+(\.\d+)?$/.test(userMessage)) {
      const parts = userMessage.split('.');
      const quizNumber = parseInt(parts[0], 10);
      const paperNumber = parts[1] ? parseInt(parts[1], 10) - 1 : null; // If there's a sub-quiz, get it

      // Check if the input number is valid and within the range of available quizzes
      if (quizNumber > 0 && quizNumber <= quizData.length) {
        const quiz = quizData[quizNumber - 1]; // Get the quiz data based on the user's input

        if (paperNumber !== null && paperNumber >= 0 && paperNumber < quiz.papers.length) {
          const paper = quiz.papers[paperNumber];
          const quizLink = `${baseUrl}${encodeURIComponent(paper.title)}&metaId=${paper.metaId}`;

          // Send a clickable message with the quiz link
          await ctx.reply(`Hey ${userName}, play the following quiz: [${paper.title} - ${paper.year}](${quizLink})`);

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
          // If the paper input number is not valid
          await ctx.reply('Invalid option. Please choose a valid paper number (e.g., 1, 1.1, etc.).');
        }
      } else {
        // If the input number is not valid
        await ctx.reply('Invalid option. Please choose a valid quiz number (e.g., 1, 1.1, etc.).');
      }
    } else {
      // Handle case when the user input is not a valid number
      await ctx.reply('Please enter a valid number (e.g., 1, 1.1, etc.) to get the quiz link.');
    }
  }
};

export { greeting };
