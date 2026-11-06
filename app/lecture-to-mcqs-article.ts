import type { Article, ArticleReference } from "./article-data";

export const lectureToMcqsCover = {
  src: "/articles/lecture-to-mcqs-cover.webp",
  social: "/articles/lecture-to-mcqs-social.jpg",
  width: 1600,
  height: 1066,
  alt: "A student writing in a notebook beside a laptop and coloured pens.",
  caption: "Make room for your own attempt after the explanation.",
  photographer: "Julio Lopez",
  source: "https://unsplash.com/photos/a-young-woman-studying-and-writing-notes-at-a-desk-Juj-Mi2b0DA",
  license: "https://unsplash.com/license",
};

export const lectureToMcqsReferences: ArticleReference[] = [
  { label: "[1] Roediger & Karpicke (2006) — Test-Enhanced Learning, Psychological Science", href: "https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/" },
  { label: "[2] UC San Diego, Department of Psychology — Retrieval Practice", href: "https://psychology.ucsd.edu/undergraduate-program/undergraduate-resources/academic-writing-resources/effective-studying/retrieval-practice.html" },
  { label: "[3] OpenStax Biology 2e — Enzymes", href: "https://openstax.org/books/biology-2e/pages/6-5-enzymes" },
  { label: "[4] OpenStax Biology 2e — Characteristics and Traits", href: "https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits" },
  { label: "[5] Cornell Learning Strategies Center — What To Do With Practice Exams", href: "https://lsc.cornell.edu/how-to-study/studying-for-and-taking-exams/what-to-do-with-practice-exams/" },
];

export const lectureToMcqsArticle: Article = {
  slug: "understand-lectures-but-cannot-solve-mcqs",
  category: "Study Strategy",
  topic: "MCQ preparation",
  date: "November 6, 2026",
  dateISO: "2026-11-06",
  readTime: "13 min read",
  title: "I Understand the Lecture. Why Can’t I Solve the MCQs?",
  description: "The Biology lecture makes sense, but the MCQs leave you stuck between two options. Here’s how to find the missing step and practise it before your next MDCAT test.",
  accent: "green",
  objectives: [],
  sections: [
    {
      heading: "“Sir, lecture samajh aa jata hai…”",
      paragraphs: [
        "The lecture finishes, and you feel reasonably good. You followed the explanation, copied the diagram and understood why the teacher rejected option B. Then you open a chapter test. The first question looks familiar. The second leaves you between two options. By the fifth, you’re wondering whether you understood the lecture at all.",
        "“Sir, lecture samajh aa jata hai, lekin MCQs nahi hotay.” It is a very specific kind of frustration. You did attend the class. You did spend the time. Being told to work harder doesn’t tell you what to do differently tomorrow.",
        "Before you replay the entire lecture, keep one of those difficult questions open. We’re going to look at what happened between recognising the topic and choosing an answer. You may need to relearn a concept. You may know it but struggle to use it. Those problems need different kinds of work."
      ]
    },
    {
      heading: "The teacher has already made several decisions for you",
      paragraphs: [
        "During an explanation, the teacher chooses the starting point. They point to the relevant part of the diagram, remind you of a definition and arrange the steps in a useful order. By the time they reach the answer, each step can feel obvious. In a test, you have to decide where to start before anyone has told you which idea matters.",
        "Think about watching an inheritance cross. Following the teacher’s Punnett square is one task. Reading a new question, identifying the parental genotypes and deciding which gametes to write is another. The first can help you learn the second, but you still need to try that second task yourself.",
        "There is research behind the value of that attempt. In experiments reported by Roediger and Karpicke, students who practised recalling prose passages retained more on delayed tests than students who repeatedly studied them, even though repeated study increased confidence. Those were memory experiments, not MDCAT trials; they support practising retrieval, not a promise of a particular score. [1]",
        "You don’t have to stop watching lectures or reading your book. Add a point at which the explanation ends and your own answer begins. That point is easy to leave out when your target for the evening is simply “finish three videos.”"
      ]
    },
    {
      heading: "Find the first step you couldn’t do",
      paragraphs: [
        "Take a question you answered incorrectly and hide the solution. Read it again, slowly, without timing yourself. What can you say with confidence before looking at the options? Write that down, even if it is only one sentence.",
        "Now find where you stop. If you cannot recall what a competitive inhibitor does, there is a knowledge gap. If you can explain the definition but cannot predict what happens when substrate concentration rises, you need to work on applying it. If you can do both and still selected the option for noncompetitive inhibition, examine what you actually read and why you chose it.",
        "“Silly mistake” is too broad to be useful. Did you overlook “except”? Reverse the direction of an arrow? Answer what happens to the enzyme when the question asked what happens to the reaction rate? A specific description gives you something to check next time."
      ],
      table: {
        caption: "Match the correction to the mistake",
        headers: ["What happened", "What to do next"],
        rows: [
          ["I didn’t know the term or fact.", "Find it in the relevant part of the book, then close the book and explain it."],
          ["I knew the definition but couldn’t use it.", "Work through one example and then attempt a changed version without the solution."],
          ["I answered a different question.", "Identify the exact word, condition or quantity you missed. Practise reading for that distinction."],
          ["I knew it without a timer, but ran out of time.", "Find the slow step. Practise it accurately, then use a short timed set."],
          ["I got the answer right by guessing.", "Keep it on the review list until you can justify it."],
        ],
      },
    },
    {
      heading: "Try one: the definition is only the beginning",
      paragraphs: [
        "Here is an original practice question. Choose an option before opening the explanation. Beside your answer, write the reason you chose it; one line is enough."
      ],
      question: {
        prompt: "An enzyme is affected by a reversible competitive inhibitor. The inhibitor concentration stays constant. Which change can reduce its inhibitory effect?",
        options: ["Lower the substrate concentration", "Raise the inhibitor concentration", "Raise the substrate concentration", "Remove the substrate completely"],
        answerIndex: 2,
        explanation: [
          "Correct answer: C — raise the substrate concentration. The inhibitor and substrate compete for the enzyme’s active site. With more substrate available, substrate binding becomes more likely, reducing the inhibitor’s effect. [3]",
          "A gives the substrate less opportunity to compete. B adds more inhibitor. D leaves no substrate to turn into product. Raising substrate concentration does not destroy the inhibitor or turn it into a substrate.",
          "If you remembered “competitive” but could not choose, draw an active site and imagine the two molecules competing to occupy it. The missing step was connecting the definition to the changed condition."
        ],
      },
    },
    {
      heading: "When you are stuck between two options",
      paragraphs: [
        "Don’t keep reading both options in the hope that one will start to feel right. Say what separates them. Perhaps one describes an increase and the other a decrease. Perhaps both are true statements about Biology, but only one answers the question that was asked.",
        "In the enzyme question, increasing substrate and increasing inhibitor both sound like ways to change the reaction. The deciding detail is that the question asks how to reduce inhibition. More inhibitor goes in the opposite direction. That is the comparison you need to make, rather than choosing the option with the most familiar words.",
        "When possible, predict the answer before studying the options. If a question asks for a named structure, try to name it. If it asks what changes, predict the direction. Some questions require comparing all four statements, so this will not fit every item. It is a way to expose your reasoning, not a rule to obey mechanically.",
        "Be careful with shortcuts such as “the longest option is correct” or “never pick an option containing always.” They replace the Biology with a guess about the paper setter. Use the conditions in the question and the concept you have learned. If neither lets you separate the last two options, mark the item for review and find out what knowledge is missing."
      ]
    },
    {
      heading: "Try another: a familiar ratio can lead you astray",
      paragraphs: [
        "Now try a genetics question. Before looking for a ratio you remember, write the gametes each parent can produce. Assume ordinary Mendelian segregation and complete dominance."
      ],
      question: {
        prompt: "In pea plants, tall (T) is dominant to dwarf (t). A heterozygous tall plant is crossed with a dwarf plant. What proportion of offspring is expected to be dwarf?",
        options: ["1/4", "1/2", "3/4", "All"],
        answerIndex: 1,
        explanation: [
          "Correct answer: B — 1/2. The cross is Tt × tt. The first parent produces T and t gametes; the second produces only t gametes. The expected offspring are Tt and tt in equal proportions. Only tt is dwarf. [4]",
          "The 1/4 answer belongs to the recessive phenotype in Tt × Tt. Choosing it here means applying a remembered ratio to the wrong parents. Write the actual cross before using the ratio.",
          "Check the distinction once more: what proportion is heterozygous in this cross? It is also 1/2. If both parents were Tt, the dwarf proportion would change to 1/4 while the heterozygous proportion would remain 1/2. These are expected probabilities, not guaranteed counts in a small sample."
        ],
      },
    },
    {
      heading: "What to do after the next lecture",
      paragraphs: [
        "Try this after one manageable topic, not after an entire day’s classes. Put the notes aside and answer a small prompt: explain one mechanism, label one diagram from memory, or work out one cross. UC San Diego’s study guidance recommends attempting recall before checking the material, then correcting what was missing or wrong. [2]",
        "For enzymes, a useful prompt could be: “Explain how a competitive inhibitor affects substrate binding.” For circulation, sketch the route of blood through the heart and lungs. If you stop midway, mark that exact point. You now know which part of the explanation to revisit.",
        "Then attempt a short set of relevant MCQs without the notes beside you. Mark uncertain answers as you go. Check the set afterwards, including the correct guesses. If most of the questions are beyond you, make the topic smaller or return to the explanation with a specific question. There is little value in spending an hour guessing through material you have not yet understood.",
        "The timings below are a starting suggestion, not a tested formula. Some topics will need longer. Keep the part where you attempt and correct something yourself, even if you have to reduce the number of questions."
      ],
      table: {
        caption: "A practical 25-minute follow-up to one topic",
        headers: ["Time", "What you do", "What you keep"],
        rows: [
          ["First 3 minutes", "Close the notes. Answer one focused prompt from memory.", "The exact point where you got stuck."],
          ["Next 8 minutes", "Try about 5–8 relevant MCQs; mark unsure answers.", "Your answers and confidence, recorded before the key."],
          ["Next 10 minutes", "Check wrong and uncertain answers. Revisit the relevant passage or example.", "A short correction explaining the error."],
          ["Last 4 minutes", "Attempt one changed question and choose what to revisit later.", "One next task, rather than a whole chapter marked ‘weak’."],
        ],
      },
    },
    {
      heading: "Your mistake notebook should change the next attempt",
      paragraphs: [
        "A notebook filled with copied MCQs can become another book you don’t have time to read. Keep enough to recover the mistake and check it again. The full question is useful when its wording matters; otherwise, a question number and a short note may be enough.",
        "For the inheritance example, a useful entry would be: “Used 3:1 without checking the parents. This was Tt × tt, so the expected tall:dwarf ratio is 1:1. Next time: write both parental genotypes and gametes first.” That tells you more than “revise inheritance.”",
        "For an answer you guessed correctly, write why you were unsure. A score alone hides that uncertainty. If you guessed between C and D, the follow-up is to explain why D fails, not just to copy C in green ink.",
        "Return to a few of these errors in a later session, before reading your corrections. Try the question again or find a variation. If you still need the note to begin, keep it on your review list. If you can solve it and explain the distinction, move on; the notebook should help you decide what deserves attention."
      ],
      callout: "A useful entry has four parts: what I chose, why I chose it, what I missed, and what I will try next."
    },
    {
      heading: "Don’t let a familiar question bank flatter you",
      paragraphs: [
        "Repeating questions has a place in revision, but notice what you are remembering. “I remember this one; it was B” tells you something different from “this parent can produce only recessive gametes.” The first may get you through the repeated item without helping with a new one.",
        "Try explaining your answer before checking the key, or change one condition and work it through again. In the genetics example, changing one parent altered the expected dwarf proportion. In a diagram question, you could cover the labels and describe the route or function yourself. Moving the same four options into a different order is not much of a check if you recognise the wording.",
        "Keep some unseen questions for later. Use reputable material with explanations, and stay within the scope you are preparing. If an answer key seems wrong, compare the question with your textbook or ask your teacher. You do not need to memorise a doubtful answer simply because it appears in print."
      ]
    },
    {
      heading: "Bring in the timer when you know what is slowing you down",
      paragraphs: [
        "Untimed practice helps you see whether you can reason through the question at all. Timed practice shows whether you can do that under the conditions of the exam. You need both, but a countdown alone cannot explain a concept you have not learned.",
        "If you are accurate without a timer and struggle with one, look for the delay. Are you reading the stem several times because you have not identified what it asks? Drawing a full Punnett square when you could confidently list two outcomes? Spending too long on one uncertain item? Work on the particular delay, then try a short timed set again.",
        "For a mock, use the time limit and permitted resources for the exam you are actually preparing. Cornell’s guidance on practice exams recommends matching the real testing conditions and keeping the answer key away during a closed-book attempt. Check the current official instructions for your own exam rather than borrowing another test’s rules. [5]",
        "Keep learning sessions and mock scores separate in your records. A set completed with hints can be useful teaching; it should not be compared directly with an unseen paper completed without help. Record the conditions so the score tells you something you can use."
      ]
    },
    {
      heading: "Give your teacher the question and your thinking",
      paragraphs: [
        "“I don’t understand enzymes” leaves a lot for a teacher to investigate. Try: “I chose A because I thought less substrate would mean less inhibition. I understand that the molecules compete, but I don’t understand why adding substrate helps.” Now the mistaken link is visible.",
        "Bring a few questions that show the pattern. Include your original choice and reasoning, not only the corrected answer. If you can answer while someone is prompting you but cannot begin alone, say that too. You may need a worked example followed by an independent attempt, with fewer hints each time.",
        "The same habit helps in O Level Biology. For a structured question, keep your first written answer and compare it with the marking points. “I knew it” is difficult to check; a missing causal link or an imprecise term on the page gives you and your teacher something concrete to improve."
      ]
    },
    {
      heading: "Before you open another video",
      paragraphs: [
        "Go back to the question you kept open at the beginning. Can you now describe where the difficulty was? Perhaps you need to learn the term. Perhaps you need to draw the cross instead of reaching for a ratio. Perhaps you missed the condition that made one option better than another.",
        "Choose the next action from that diagnosis. Watch the relevant explanation if you need it, then close it and make another attempt. You are looking for a change you can see: yesterday you needed the teacher to choose the first step; today you can choose it yourself.",
        "After your next lecture, leave one question unanswered on the screen and try it before opening the solution. Write down why you chose your answer. That small piece of work will give you a more useful starting point for tomorrow than another tick beside “lecture completed.”"
      ]
    },
  ],
  recap: [],
  checks: [
    { question: "Should I complete the whole chapter before attempting MCQs?", answer: "You can begin with a small set on the part you have learned. Keep questions that combine several parts of the chapter for later. If every question feels unfamiliar, check whether the set matches what you have studied before judging your preparation." },
    { question: "How many MCQs should I solve each day?", answer: "Choose an amount you can also review. Ten questions with careful correction may be a more useful session than fifty rushed guesses, but ten is not a daily prescription. Your time, the topic and the difficulty matter. Keep track of corrected errors and performance on later unseen questions, alongside the number attempted." },
    { question: "Should I change my answer if I become unsure?", answer: "Re-read the question and look for a reason. If you identify a missed condition or an error in your reasoning, use that evidence. Repeatedly switching because another option suddenly feels familiar gives you no better basis for a decision. During a real exam, work within its navigation rules and time limit." },
    { question: "Can I explain the concept in Urdu first?", answer: "Yes. Explaining it in the language you use comfortably can help you notice where your explanation breaks down. Then connect that explanation to the exact English terms in your textbook and questions. Practise reading those terms in context so translating them does not become an extra obstacle during the test." },
    { question: "I understand the answer immediately after seeing it. Does that count?", answer: "It is a useful first step. Check it by putting the solution away, explaining the reasoning yourself and trying a changed question later. If you can only follow the answer while it is visible, you have not yet checked whether you can produce the reasoning independently." },
  ],
};
