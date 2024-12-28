import { Context } from 'telegraf';

// The message that should be sent when the specific words are detected
const studyMaterialsMessage = `
1. **Akash Test Series 2024**: https://1024terabox.com/s/1p2-kKH5huVDr54pZbnK9TQ

2. **Allen Modules**: https://1024terabox.com/s/10fXMK_5BU6zs9UHRtZ-aSg

3. **Allen Test 2024**: https://1024terabox.com/s/1U9dQIxWSHIpc2dVdsQVIDg

4. **Biohack 4th Edition by Parth Goyal**: https://1024terabox.com/s/1vUMRiXXaV_sHbfUbYTf_pA

5. **Botany - Know Your NCERT**: https://1024terabox.com/s/1EJRNpPf3gXyosbuCjrimjg

6. **Botany Med Easy**: https://1024terabox.com/s/1_PX621zvPR48crHuauf3YQ

7. **Chemistry - Know Your NCERT**: https://1024terabox.com/s/1MLVkRyZuiuJiIxp8dYaoOA

8. **JEE Advanced PYQ**: https://1024terabox.com/s/1Wu6TEAiimGiurjhi4Um55g

9. **NCERT Diagrams All-in-One**: https://1024terabox.com/s/1AzrlX4CgNN47SFkHmXw6zA

10. **NEET 11 Years Chapterwise PYQ**: https://1024terabox.com/s/18gI4b16ItXo7D9ZkwQ2MaA

11. **NTA NEET Speed Test**: https://1024terabox.com/s/1JIw7MuQDC-3UtVg_Wt91KQ

12. **Physics - Know Your NCERT**: https://1024terabox.com/s/1VTkburtz8JN9In7Jn8gf-w

13. **PYQ JEE with Solutions**: https://1024terabox.com/s/1UXzgF2-0420a7WDFDkj-pg

14. **Zoology - Know Your NCERT**: https://1024terabox.com/s/1Xzgvz5oMFVxlLM6MWe2j1g

15. **Med Easy Physics Original**: https://1024terabox.com/s/1Aenhi_ofQSZ5Nk0Np_f7YA

16. **Akash Modules**: https://1024terabox.com/s/1nATVmTd1fcXoTTlwfu-0CA

17. **Biology Punch**: https://1024terabox.com/s/1P1kqX3-FUHH6-NVxewzUGQ

18. **Chemistry punch**: https://1024terabox.com/s/15bfJcON-qFZsaW8CAOv1Lg

19. **Physics punch**: https://1024terabox.com/s/1Bi0ZitCvfIxGeojb5K1KwQ

20. **Biology Punch**: https://1024terabox.com/s/1P1kqX3-FUHH6-NVxewzUGQ

21. **Chemistry Punch**: https://1024terabox.com/s/15bfJcON-qFZsaW8CAOv1Lg

22. **Physics Punch**: https://1024terabox.com/s/1Bi0ZitCvfIxGeojb5K1KwQ

23. **101 Tests full syllabus**: https://1024terabox.com/s/1JIw7MuQDC-3UtVg_Wt91KQ

24. **Akash Test 2024 (FT,FTS,AIATS,NBTS,CT,Intensive)**: https://1024terabox.com/s/14Imzih0HP4ibjcNxnb6x4w
`;

const triggerKeywords = ['Akash', 'Allen', 'Test', 'pw', 'Physics Wallah', 'pdf', 'study material'];

const respondWithStudyMaterials = () => async (ctx: Context) => {
  const userMessage = ctx.message.text || '';
  const lowerCaseMessage = userMessage.toLowerCase();

  // Check if the user's message contains any of the keywords
  if (triggerKeywords.some(keyword => lowerCaseMessage.includes(keyword.toLowerCase()))) {
    await ctx.reply(studyMaterialsMessage, { parse_mode: 'Markdown' });
  }
};

export { study };
