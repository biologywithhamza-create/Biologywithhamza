/**
 * PYRO CONTENT CONTROL CENTRE
 * ---------------------------
 * This is the main file to edit when you want to update:
 * - social and course links
 * - video lessons
 * - article titles, descriptions, dates and article text
 *
 * Keep quotation marks and commas in place. Netlify will publish saved changes
 * automatically when this project is connected to GitHub.
 */

export const links = {
  youtube: "https://www.youtube.com/@m.hamzaramzan1283",
  instagram: "https://www.instagram.com/myn_hamza/",
  whatsapp: "https://whatsapp.com/channel/0029VbAg97M1SWt5n2tay62T",
  playlist: "https://www.youtube.com/playlist?list=PL3GWNze6yXzBURN2Ms-ZZcdoYPXExio7_",
  nearpeerProfile: "https://nearpeer.org/html/hamza-ramzan-profile",
  nearpeerCourse:
    "https://nearpeer.org/entry-test-preparation/self-study-courses/mdcat-biology-sir-hamza-ramzan",
  linkedin: "https://pk.linkedin.com/in/hamza-ramzan-1314a0111",
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  callout?: string;
};

export type Article = {
  slug: string;
  category: "MDCAT" | "Learn Biology" | "Study Strategy";
  date: string;
  dateISO: string;
  readTime: string;
  title: string;
  description: string;
  number: string;
  accent: "ember" | "green" | "sage";
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "memorizing-pathways-fails",
    category: "Learn Biology",
    date: "August 25, 2026",
    dateISO: "2026-08-25",
    readTime: "7 min read",
    title: "Why memorizing pathways fails—and what to do instead",
    description:
      "A practical framework for learning cycles, sequences, and mechanisms without losing the biological story behind them.",
    number: "01",
    accent: "ember",
    sections: [
      {
        heading: "A pathway is not a list",
        paragraphs: [
          "Students often approach a pathway as a chain of labels: molecule A becomes molecule B, then C, and finally D. The list may survive for a day, but it disappears under exam pressure because the brain was never given a reason for the order.",
          "A biological pathway is better understood as a response to a problem. Glycolysis captures energy. A reflex arc protects the body. Negative feedback restores a variable toward its normal range. Begin with the problem, and the steps stop feeling arbitrary.",
        ],
        callout: "Before learning the steps, write one sentence: What problem is this pathway solving?",
      },
      {
        heading: "Build a cause-and-effect map",
        paragraphs: [
          "For every arrow, ask what makes the next event possible. This turns recall into reasoning. Even if a label slips your mind, the logic can help you reconstruct it.",
        ],
        points: [
          "Trigger: What change starts the sequence?",
          "Mechanism: What directly causes the next event?",
          "Purpose: What useful outcome does this step produce?",
          "Control: What slows, stops, or redirects the sequence?",
        ],
      },
      {
        heading: "Use three passes, not ten rereads",
        paragraphs: [
          "First, explain the pathway in plain language without terminology. Second, redraw it with the correct biological labels. Third, test it by changing one condition and predicting the consequence. These three passes build understanding, precision, and exam application.",
          "A pathway is truly learned when you can explain why its order matters—not merely repeat the order.",
        ],
      },
    ],
  },
  {
    slug: "negative-feedback-made-simple",
    category: "Learn Biology",
    date: "August 25, 2026",
    dateISO: "2026-08-25",
    readTime: "6 min read",
    title: "Negative feedback made simple: deviation, detection, correction",
    description:
      "A clean mental model for understanding receptors, control centres, effectors, and the meaning of a negative response.",
    number: "02",
    accent: "green",
    sections: [
      {
        heading: "Negative does not mean harmful",
        paragraphs: [
          "In negative feedback, the response opposes the original deviation. If a variable rises above its normal range, the response pushes it downward. If it falls, the response pushes it upward. The word negative describes the direction of the response, not whether the response is good or bad.",
        ],
        callout: "Negative feedback reduces the difference between the current condition and the desired condition.",
      },
      {
        heading: "Read every example through four jobs",
        paragraphs: [
          "Different textbooks use different examples, but the logic is stable. Identify the variable, then assign each component a job.",
        ],
        points: [
          "Deviation: the variable moves away from its normal range.",
          "Receptor: detects the change and sends information.",
          "Control centre: compares information and coordinates a response.",
          "Effector: carries out the correction.",
        ],
      },
      {
        heading: "The exam question hiding inside the diagram",
        paragraphs: [
          "MCQs often swap the receptor and control centre, or describe an effector as if it detected the stimulus. Do not memorize the arrows alone. Name the job performed at each arrow, and distractors become easier to eliminate.",
          "When the correction succeeds, the original stimulus becomes weaker. That final reduction is the signature of negative feedback.",
        ],
      },
    ],
  },
  {
    slug: "thinking-through-difficult-mcqs",
    category: "MDCAT",
    date: "August 25, 2026",
    dateISO: "2026-08-25",
    readTime: "8 min read",
    title: "How to think through difficult Biology MCQs",
    description:
      "A repeatable decision process for identifying the tested concept, exposing distractors, and answering under pressure.",
    number: "03",
    accent: "sage",
    sections: [
      {
        heading: "Find the decision before reading the options",
        paragraphs: [
          "A difficult MCQ often contains more information than you need. Before looking at the options, reduce the stem to a single decision: Which process increases? Which structure is responsible? Which statement must be true?",
          "This prevents the options from controlling your thinking. You approach them with a prediction instead of waiting for one to feel familiar.",
        ],
      },
      {
        heading: "Classify the distractor",
        paragraphs: [
          "Most strong distractors are not random. They are built from a predictable mistake. Naming that mistake makes elimination more reliable.",
        ],
        points: [
          "Correct fact, wrong context.",
          "Correct sequence, reversed direction.",
          "Related structure, wrong function.",
          "Absolute wording applied to a conditional rule.",
          "A true consequence presented as the original cause.",
        ],
      },
      {
        heading: "Use evidence, not option length",
        paragraphs: [
          "Do not choose an option because it is longer, more technical, or more familiar. Connect every important word in the option to evidence from the stem or a biological principle.",
          "If two options remain, state the exact difference between them. The question is usually testing that difference.",
        ],
        callout: "The best answer is not the option that sounds most biological. It is the option the stem can actually support.",
      },
    ],
  },
];

export const videos = [
  {
    title: "MDCAT 2026 Revision: Genetics 01",
    label: "Inheritance · Revision",
    href: "https://www.youtube.com/watch?v=-Adid3vJlHw",
    image: "/video-genetics.jpg",
  },
  {
    title: "Coordination & Control — Free Live Class",
    label: "Nervous coordination · Live",
    href: "https://www.youtube.com/watch?v=fN2LqOYhPdQ",
    image: "/video-coordination.jpg",
  },
  {
    title: "MDCAT Biology Bridge Batch — First Lecture",
    label: "MDCAT foundation · Free",
    href: "https://www.youtube.com/watch?v=-Ntb0327x64",
    image: "/video-bridge.jpg",
  },
];
