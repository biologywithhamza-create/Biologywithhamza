export type ArticleCategory =
  | "MDCAT"
  | "Cambridge O Level"
  | "Learn Biology"
  | "Study Strategy";

export type ArticleDiagram = {
  title: string;
  kind?: "flow" | "cycle" | "compare";
  items: Array<{ label: string; detail: string }>;
  caption: string;
};

export type ArticleTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  callout?: string;
  diagram?: ArticleDiagram;
  table?: ArticleTable;
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  topic: string;
  date: string;
  dateISO: string;
  readTime: string;
  title: string;
  description: string;
  accent: "ember" | "green" | "sage";
  objectives: string[];
  sections: ArticleSection[];
  recap: string[];
  checks: Array<{ question: string; answer: string }>;
};

export type ArticleTopicGroup =
  | "Cells & molecules"
  | "Human physiology"
  | "Genetics & evolution"
  | "Disease & biotechnology"
  | "Practical & exam skills";

export type ArticleReference = {
  label: string;
  href: string;
};

export const ARTICLE_REVIEW_DATE = "August 31, 2026";
export const ARTICLE_REVIEW_DATE_ISO = "2026-08-31";

function countWords(value: string) {
  return value.trim().match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
}

export function getArticleWordCount(article: Article) {
  const strings = [
    article.title,
    article.description,
    article.topic,
    ...article.objectives,
    ...article.recap,
    ...article.checks.flatMap((check) => [check.question, check.answer]),
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []),
      section.callout ?? "",
      ...(section.diagram
        ? [
            section.diagram.title,
            section.diagram.caption,
            ...section.diagram.items.flatMap((item) => [item.label, item.detail]),
          ]
        : []),
      ...(section.table
        ? [
            section.table.caption,
            ...section.table.headers,
            ...section.table.rows.flat(),
          ]
        : []),
    ]),
  ];

  return strings.reduce((total, value) => total + countWords(value), 0);
}

export function getArticleReadMinutes(article: Article) {
  const visualCount = article.sections.filter((section) => section.diagram || section.table).length;
  return Math.max(4, Math.ceil((getArticleWordCount(article) + visualCount * 45) / 190));
}

export function getArticleReadTime(article: Article) {
  return `${getArticleReadMinutes(article)} min read`;
}

export function getArticleTopicGroup(article: Article): ArticleTopicGroup {
  const haystack = `${article.slug} ${article.topic} ${article.title}`.toLowerCase();

  if (/exam|study|practical|graph|structured|memor|food-test/.test(haystack)) {
    return "Practical & exam skills";
  }
  if (/inherit|genetic|evolution|darwin|lamarck|reproduction/.test(haystack)) {
    return "Genetics & evolution";
  }
  if (/virus|hiv|immun|disease|biotech|vaccine|gene-therapy/.test(haystack)) {
    return "Disease & biotechnology";
  }
  if (/cell|enzyme|molecule|respiration|atp|diffusion|osmosis|transport/.test(haystack)) {
    return "Cells & molecules";
  }
  return "Human physiology";
}

export function getArticleSyllabusAlignment(article: Article) {
  if (article.category === "Cambridge O Level") {
    return `Cambridge O Level Biology 5090 (2026–2028) · ${article.topic}`;
  }
  if (article.category === "MDCAT") {
    return `MDCAT Biology concept and reasoning practice · ${article.topic}`;
  }
  if (article.category === "Study Strategy") {
    return "Biology learning, retrieval and exam-decision skills";
  }
  return `Upper-secondary Biology foundation · ${article.topic}`;
}

export function getArticleReferences(article: Article): ArticleReference[] {
  const topicGroup = getArticleTopicGroup(article);
  const references: ArticleReference[] = [];

  if (article.category === "Cambridge O Level") {
    references.push({
      label: "Cambridge O Level Biology 5090 syllabus (2026–2028)",
      href: "https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf",
    });
  }

  if (article.category === "Study Strategy") {
    references.push({
      label: "Improving Students’ Learning With Effective Learning Techniques",
      href: "https://doi.org/10.1177/1529100612453266",
    });
  } else if (topicGroup === "Human physiology") {
    references.push({
      label: "OpenStax Anatomy and Physiology 2e",
      href: "https://openstax.org/details/books/anatomy-and-physiology-2e",
    });
  } else if (topicGroup === "Disease & biotechnology") {
    references.push({
      label: "OpenStax Microbiology",
      href: "https://openstax.org/details/books/microbiology",
    });
  } else {
    references.push({
      label: "OpenStax Biology 2e",
      href: "https://openstax.org/details/books/biology-2e",
    });
  }

  if (article.slug.includes("hiv")) {
    references.push({
      label: "World Health Organization · HIV and AIDS fact sheet",
      href: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids",
    });
  }

  return references.slice(0, 3);
}

export const articles: Article[] = [
  {
    slug: "memorizing-pathways-fails",
    category: "Study Strategy",
    topic: "Learning systems",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "10 min read",
    title: "Why memorizing pathways fails—and what to do instead",
    description:
      "A practical system for learning cycles, sequences and mechanisms without losing the biological story behind them.",
    accent: "ember",
    objectives: [
      "Turn a long pathway into a cause-and-effect story.",
      "Use retrieval and prediction instead of repeated rereading.",
      "Diagnose exactly where your understanding breaks down.",
    ],
    sections: [
      {
        heading: "A pathway is a solution, not a list",
        paragraphs: [
          "Students often meet a biological pathway as a row of labels: molecule A becomes B, B becomes C, and C becomes D. That sequence can be repeated for a few hours, but it is fragile because the brain has not been given a reason for the order. Under exam pressure, one forgotten label breaks the whole chain.",
          "A pathway becomes durable when it is treated as the cell's solution to a problem. Glycolysis extracts usable energy from glucose. A reflex arc produces a rapid protective response. Negative feedback reduces a deviation. Begin with the problem and the steps stop looking arbitrary.",
        ],
        callout: "Before learning any sequence, finish this sentence: The purpose of this pathway is to…",
      },
      {
        heading: "Build the four-part biological story",
        paragraphs: [
          "Every mechanism can be organised around four questions. What starts it? What changes next? Why is that change useful? What controls or ends it? These questions give each arrow a job and make the sequence reconstructable even when a term temporarily slips your mind.",
          "For cellular respiration, glucose availability is the starting condition, enzyme-controlled oxidation transfers energy, ATP captures a useful portion of that energy, and oxygen availability helps determine whether the pathway can continue aerobically. The same framework works for hormones, immunity, nerve impulses and inheritance.",
        ],
        diagram: {
          title: "The pathway-learning loop",
          kind: "cycle",
          items: [
            { label: "Problem", detail: "Name the biological need." },
            { label: "Trigger", detail: "Identify the starting change." },
            { label: "Mechanism", detail: "Explain every important arrow." },
            { label: "Outcome", detail: "State the useful result and control." },
          ],
          caption: "Return to the problem after the outcome: a pathway is coherent only when the result answers the original need.",
        },
      },
      {
        heading: "Use three passes instead of ten rereads",
        paragraphs: [
          "On the first pass, explain the process in ordinary language without worrying about every technical label. On the second, redraw it with correct biological terms and locations. On the third, change one condition—remove oxygen, block an enzyme, damage a receptor—and predict the consequence.",
          "The third pass is where real examination ability develops. A question rarely asks you to recite a pathway exactly as printed. It changes a variable and asks what follows. Prediction therefore deserves as much practice as recall.",
        ],
        points: [
          "Plain-language pass: tell the story without notes.",
          "Precision pass: add names, compartments, enzymes and direction.",
          "Prediction pass: alter one condition and follow the consequences.",
        ],
      },
      {
        heading: "Test the links, not only the labels",
        paragraphs: [
          "Cover the pathway and redraw it from a blank page. Then point to each arrow and say why it occurs. If you can name two boxes but cannot explain the arrow between them, that connection—not the whole chapter—is the part that needs repair.",
          "Spaced retrieval should revisit the pathway after a short delay, the next day and several days later. Each attempt should begin from memory. Looking at the answer first creates familiarity, but familiarity is not the same as recall.",
        ],
        table: {
          caption: "A quick diagnosis of common study failures",
          headers: ["What happens", "What it usually means", "Best repair"],
          rows: [
            ["You remember terms but not order", "The causal links are missing", "Explain every arrow aloud"],
            ["You can redraw but not answer MCQs", "The pathway was never varied", "Practise changed-condition questions"],
            ["You forget after two days", "Retrieval was too concentrated", "Space blank-page recall"],
          ],
        },
      },
      {
        heading: "The standard for mastery",
        paragraphs: [
          "A pathway is not mastered because it looks familiar. It is mastered when you can draw it, explain why the order matters, locate it in the organism or cell, and predict what happens if one part changes.",
          "That standard sounds demanding, but it reduces total study time. Once the mechanism is organised as a biological story, each future revision strengthens an existing structure instead of rebuilding a disconnected list.",
        ],
      },
    ],
    recap: [
      "Start with the problem a pathway solves.",
      "Attach a reason to every arrow.",
      "Practise recall, precision and prediction as separate passes.",
      "Repair the weak connection instead of rereading the whole page.",
    ],
    checks: [
      {
        question: "Why is changing one condition such an effective revision method?",
        answer: "It forces you to use causal understanding. You must follow how the changed condition affects later steps rather than merely repeat the original sequence.",
      },
      {
        question: "What is the clearest sign that a pathway has only been memorized?",
        answer: "You can reproduce its labels but cannot explain the arrows or predict the effect of blocking a step.",
      },
    ],
  },
  {
    slug: "negative-feedback-made-simple",
    category: "Learn Biology",
    topic: "Homeostasis",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "11 min read",
    title: "Negative feedback made simple: deviation, detection, correction",
    description:
      "A complete mental model for receptors, control centres, effectors and the return toward a normal range.",
    accent: "green",
    objectives: [
      "Distinguish a set point from the normal range around it.",
      "Assign the correct role to receptors, control centres and effectors.",
      "Apply the model to temperature and blood-glucose regulation.",
    ],
    sections: [
      {
        heading: "Homeostasis is dynamic stability",
        paragraphs: [
          "The internal environment is never perfectly motionless. Body temperature, blood glucose, water potential and carbon dioxide concentration fluctuate continuously. Homeostasis keeps those variables within limits compatible with normal cell function rather than freezing them at a single number.",
          "A set point is the reference value used by a control system, while the normal range is the small interval in which the variable may move without causing serious disruption. Negative feedback is the main mechanism that reduces departures from that range.",
        ],
        callout: "Negative describes the direction of the response: it opposes the original deviation. It does not mean harmful.",
      },
      {
        heading: "The four jobs in every control loop",
        paragraphs: [
          "First identify the regulated variable. Then locate the deviation, the receptor that detects it, the coordinating centre that interprets information, and the effector that changes the variable. Many difficult questions simply exchange the jobs of these components.",
          "A receptor does not necessarily correct the condition, and an effector does not decide what the target should be. The receptor supplies information; the control centre compares and coordinates; the effector performs the response.",
        ],
        diagram: {
          title: "A negative-feedback control loop",
          kind: "cycle",
          items: [
            { label: "Deviation", detail: "A variable leaves its normal range." },
            { label: "Detection", detail: "A receptor senses the change." },
            { label: "Coordination", detail: "A control centre selects a response." },
            { label: "Correction", detail: "An effector reduces the deviation." },
          ],
          caption: "As correction succeeds, the original stimulus becomes weaker and the response is reduced.",
        },
      },
      {
        heading: "Thermoregulation: one variable, opposite responses",
        paragraphs: [
          "When body temperature rises, thermoreceptors in the skin and hypothalamus detect the change. The hypothalamus coordinates vasodilation of skin arterioles and increased sweating. More warm blood approaches the surface and evaporation removes heat, so temperature falls toward its normal range.",
          "When temperature falls, the coordinated response reverses: vasoconstriction reduces heat loss, skeletal muscles may shiver to release heat through respiration, and metabolic heat production can increase. The regulated variable is the same, but the effectors are chosen according to the direction of deviation.",
        ],
        table: {
          caption: "Opposing responses in thermoregulation",
          headers: ["Condition", "Main effectors", "Net effect"],
          rows: [
            ["Temperature too high", "Sweat glands; skin arterioles dilate", "Heat loss increases"],
            ["Temperature too low", "Skeletal muscles; skin arterioles constrict", "Heat production rises and loss falls"],
          ],
        },
      },
      {
        heading: "Blood glucose: hormones as coordinating signals",
        paragraphs: [
          "After a carbohydrate-rich meal, rising blood glucose stimulates pancreatic beta cells to release insulin. Insulin increases glucose uptake in responsive tissues and promotes glycogen formation, reducing blood glucose. When blood glucose falls, alpha cells release glucagon, promoting glycogen breakdown and glucose release by the liver.",
          "Insulin and glucagon are often called antagonistic because their overall effects oppose each other. Do not reduce the system to 'insulin down, glucagon up' without identifying the condition that triggers each hormone and the tissues that produce the correction.",
        ],
      },
      {
        heading: "How examiners hide the concept",
        paragraphs: [
          "A question may describe the response without naming negative feedback. Look for a variable moving away from a reference and a response that reduces that movement. Another common distractor is a response that continues to amplify the original change; that is positive feedback, as in oxytocin-driven uterine contractions.",
          "Finish by checking the final arrow. If the response weakens the stimulus that caused it, the loop is negative. If it strengthens that stimulus and drives the process toward a defined endpoint, the loop is positive.",
        ],
      },
    ],
    recap: [
      "Homeostasis maintains variables within limits, not at perfect constancy.",
      "Receptors detect, control centres coordinate and effectors correct.",
      "The response must oppose the original deviation.",
      "Always identify the regulated variable before naming the components.",
    ],
    checks: [
      {
        question: "Why does sweating decrease once body temperature returns toward normal?",
        answer: "The temperature deviation becomes smaller, so thermoreceptor input and the coordinating signal to sweat glands are reduced.",
      },
      {
        question: "What separates positive feedback from negative feedback?",
        answer: "Negative feedback reduces the initiating change; positive feedback amplifies it until a particular endpoint is reached.",
      },
    ],
  },
  {
    slug: "thinking-through-difficult-mcqs",
    category: "MDCAT",
    topic: "Exam reasoning",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "10 min read",
    title: "How to think through difficult Biology MCQs",
    description:
      "A repeatable decision process for identifying the tested concept, exposing distractors and answering under pressure.",
    accent: "sage",
    objectives: [
      "Reduce a long stem to the decision it actually tests.",
      "Recognise the most common biology distractor patterns.",
      "Use evidence and elimination without overthinking.",
    ],
    sections: [
      {
        heading: "Find the decision before reading the options",
        paragraphs: [
          "A difficult MCQ often contains more information than you need. Before looking at the options, reduce the stem to one decision: which process increases, which structure performs the function, which sequence is correct, or which statement must follow from the data.",
          "This protects your reasoning from option-driven thinking. Instead of waiting for an answer to feel familiar, you approach the choices with a prediction and a clear biological rule.",
        ],
        callout: "Rewrite the stem mentally as a five-to-ten-word question. That sentence is the real task.",
      },
      {
        heading: "Separate given information from recalled knowledge",
        paragraphs: [
          "Underline the conditions supplied by the stem: the tissue, direction of movement, genotype, environmental change or experimental treatment. Then retrieve only the knowledge relevant to those conditions. Bringing the whole chapter into one MCQ creates noise.",
          "Data-based questions should be answered from the data first. Prior knowledge helps interpret a pattern, but it should not override an observation clearly shown in a graph or table.",
        ],
        diagram: {
          title: "The four-pass MCQ method",
          kind: "flow",
          items: [
            { label: "Decode", detail: "State the single decision." },
            { label: "Predict", detail: "Recall the governing rule." },
            { label: "Eliminate", detail: "Name why each wrong option fails." },
            { label: "Verify", detail: "Check every word in the final choice." },
          ],
          caption: "Move forward only when you can state the reason for the choice—not because one option merely looks familiar.",
        },
      },
      {
        heading: "Recognise how distractors are built",
        paragraphs: [
          "Strong distractors usually contain a true biological fact placed in the wrong context. A structure may be related to the organ but perform a different function; a sequence may contain correct events in reverse order; a consequence may be presented as the cause.",
          "Absolute words such as always, only and never deserve inspection, but they are not automatically false. Judge them against the biological rule rather than following a test-taking myth.",
        ],
        points: [
          "Correct fact, wrong tissue or stage.",
          "Correct events, wrong order or direction.",
          "Related structure, wrong function.",
          "True consequence presented as the initiating cause.",
          "General rule stretched beyond its conditions.",
        ],
      },
      {
        heading: "When two options remain",
        paragraphs: [
          "State the exact difference between the final two options. If one says active transport and the other facilitated diffusion, the real question is whether energy is required and whether movement is against a gradient. If one says receptor and the other control centre, the real question is whether the component detects or coordinates.",
          "Do not add assumptions that the stem does not support. The best answer is the option justified by the stated conditions and the tested principle, not the option that could become true in a different scenario.",
        ],
      },
      {
        heading: "Control time without rushing",
        paragraphs: [
          "Use a first pass to answer questions with a clear route. Mark questions that require calculation, multi-step inheritance or detailed comparison, then return with the remaining time. Re-reading a confusing stem five times without changing your method is not productive persistence.",
          "During review, change an answer only when you can name the biological reason the original choice was wrong. Anxiety alone is not evidence.",
        ],
        table: {
          caption: "A practical decision rule under pressure",
          headers: ["Situation", "Action"],
          rows: [
            ["Rule is clear and one option fits", "Answer and continue"],
            ["Two options remain", "State their exact biological difference"],
            ["No route after a focused attempt", "Mark, move, and return"],
            ["Reviewing a chosen answer", "Change only with a specific reason"],
          ],
        },
      },
    ],
    recap: [
      "Reduce the stem to one decision.",
      "Predict from a biological rule before comparing options.",
      "Eliminate by naming the flaw in each distractor.",
      "Change answers during review only when evidence changes.",
    ],
    checks: [
      {
        question: "What should you do when two options both appear scientifically true?",
        answer: "Compare the exact difference between them and ask which one is supported by the conditions in the stem. One is often true in general but wrong in the stated context.",
      },
      {
        question: "Why is option length an unreliable clue?",
        answer: "Correctness depends on biological evidence, not wording length. Examiners can make either a correct answer or a distractor detailed.",
      },
    ],
  },
  {
    slug: "viruses-structure-classification-replication",
    category: "MDCAT",
    topic: "Acellular life",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "Viruses explained: structure, genome and replication strategy",
    description:
      "From capsids and envelopes to genome classes—a connected explanation of how viruses reproduce without being cells.",
    accent: "ember",
    objectives: [
      "Explain why viruses are obligate intracellular parasites.",
      "Relate genome type to the route used to make viral mRNA.",
      "Distinguish virions, viroids, prions and proviruses.",
    ],
    sections: [
      {
        heading: "What makes a virus acellular?",
        paragraphs: [
          "A virus is not a miniature cell. It has genetic material enclosed by a protein capsid and, in some viruses, a lipid envelope acquired from a host membrane. It lacks cytoplasm, ribosomes and the independent metabolic machinery needed to synthesize proteins or generate ATP.",
          "Because replication depends on host enzymes, ribosomes, nucleotides and energy, viruses are obligate intracellular parasites. Outside a suitable host cell, a complete infectious particle—the virion—can be transported and remain infective, but it does not grow or reproduce independently.",
        ],
        table: {
          caption: "Acellular agents that are often confused",
          headers: ["Agent", "Main material", "Defining idea"],
          rows: [
            ["Virus", "Nucleic acid plus protein; sometimes envelope", "Replicates only in host cells"],
            ["Viroid", "Small circular RNA", "Plant pathogen without a capsid"],
            ["Prion", "Misfolded protein", "Propagates abnormal protein folding"],
            ["Provirus", "Viral DNA integrated in host DNA", "A genome stage, not a free particle"],
          ],
        },
      },
      {
        heading: "The architecture of a virion",
        paragraphs: [
          "The viral genome may be DNA or RNA, single- or double-stranded, linear, circular or segmented. The capsid protects that genome and is built from protein subunits called capsomeres. Together, genome and capsid form the nucleocapsid.",
          "Enveloped viruses carry a host-derived lipid membrane containing viral glycoprotein spikes. Those spikes bind specific receptors and help determine host and tissue specificity. Because lipid envelopes are disrupted by detergents and drying, many enveloped viruses are less stable outside the body than non-enveloped viruses.",
        ],
        diagram: {
          title: "A functional map of a virus",
          kind: "compare",
          items: [
            { label: "Genome", detail: "Stores viral genetic information." },
            { label: "Capsid", detail: "Protects the genome and helps delivery." },
            { label: "Envelope", detail: "Host-derived lipid layer in some viruses." },
            { label: "Spikes", detail: "Recognise and attach to host receptors." },
          ],
          caption: "Not every virus has an envelope, but every complete virion has a genome protected by viral protein.",
        },
      },
      {
        heading: "The central challenge: making mRNA",
        paragraphs: [
          "Host ribosomes translate mRNA, so every virus must provide or produce readable positive-sense mRNA. A positive-sense RNA genome can function directly as mRNA. A negative-sense RNA genome must first be copied into a complementary positive strand by an RNA-dependent RNA polymerase.",
          "DNA viruses usually transcribe mRNA from DNA. Retroviruses reverse-transcribe RNA into DNA, integrate that DNA into the host genome, and then use host transcription to produce viral RNA. Hepatitis B is a DNA virus with a reverse-transcription stage, which is why genome type and replication route must be considered together.",
        ],
        points: [
          "Positive-sense RNA: genome can be translated directly.",
          "Negative-sense RNA: viral polymerase must first make positive mRNA.",
          "Double-stranded DNA: mRNA is transcribed from the DNA template.",
          "Retroviral RNA: reverse transcription creates an integrated DNA intermediate.",
        ],
      },
      {
        heading: "A general replication sequence",
        paragraphs: [
          "Despite enormous diversity, viral replication can be organised into attachment, entry, uncoating, biosynthesis, assembly and release. Attachment requires a match between viral proteins and host receptors. Entry may involve membrane fusion, endocytosis or genome injection, depending on the virus.",
          "After uncoating, genome replication and viral protein synthesis use a mixture of host and viral enzymes. Newly produced components self-assemble. Viruses leave through cell lysis, budding or exocytosis; budding allows an enveloped virus to acquire membrane as it exits.",
        ],
        diagram: {
          title: "The viral replication sequence",
          kind: "flow",
          items: [
            { label: "Attach", detail: "Viral protein binds a host receptor." },
            { label: "Enter", detail: "Virion or genome crosses the membrane." },
            { label: "Synthesize", detail: "Genome and proteins are produced." },
            { label: "Assemble", detail: "Components form new virions." },
            { label: "Release", detail: "Virions leave by lysis or budding." },
          ],
          caption: "The exact enzymes differ, but every productive infection must deliver a genome, make components and release new infectious particles.",
        },
      },
      {
        heading: "How to reason through virus questions",
        paragraphs: [
          "First identify what material is present. Protein only suggests a prion; naked infectious RNA in plants suggests a viroid; nucleic acid inside a capsid describes a virus. Then ask whether the question concerns the free virion or a genome stage inside the host.",
          "For replication questions, work backward from mRNA. Ask how this genome can produce a positive-sense message for ribosomes. That single question resolves many apparently difficult classification problems.",
        ],
      },
    ],
    recap: [
      "Viruses lack cellular metabolism and protein-synthesis machinery.",
      "Capsids are protein; envelopes are host-derived lipids containing viral proteins.",
      "Every virus must produce positive-sense mRNA for translation.",
      "Genome type determines the enzymes and intermediates required.",
    ],
    checks: [
      {
        question: "Why must a negative-sense RNA virus carry or rapidly produce an RNA-dependent RNA polymerase?",
        answer: "Its genome cannot be translated directly. The enzyme is needed to make complementary positive-sense mRNA that host ribosomes can read.",
      },
      {
        question: "What is the difference between a virion and a provirus?",
        answer: "A virion is a complete extracellular infectious particle; a provirus is viral DNA integrated into the host genome.",
      },
    ],
  },
  {
    slug: "lytic-vs-lysogenic-cycle",
    category: "MDCAT",
    topic: "Acellular life",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "10 min read",
    title: "Lytic vs lysogenic cycles: two outcomes of phage infection",
    description:
      "Follow a bacteriophage from attachment to either immediate cell destruction or silent integration in the bacterial genome.",
    accent: "green",
    objectives: [
      "Trace the major steps of the lytic cycle.",
      "Explain prophage formation and induction.",
      "Distinguish transduction from ordinary phage replication.",
    ],
    sections: [
      {
        heading: "A bacteriophage is a virus of bacteria",
        paragraphs: [
          "Bacteriophages attach to specific molecules on a bacterial surface. In many tailed phages, the protein head remains outside while the nucleic acid is injected through the tail. Host specificity therefore depends partly on whether the bacterial cell displays the receptor recognised by the phage.",
          "Once the genome enters, infection can move toward rapid production of new phages or toward a dormant relationship with the host chromosome. These alternatives are the lytic and lysogenic cycles.",
        ],
      },
      {
        heading: "The lytic cycle: reproduce and rupture",
        paragraphs: [
          "During lytic infection, phage genes redirect bacterial metabolism. The viral genome is copied, capsid and tail proteins are synthesized, and components assemble into complete particles. Phage-coded enzymes eventually weaken the bacterial wall, water enters, and the cell lyses.",
          "Lysis releases many virions at once and kills the host cell. A virulent phage follows this productive route rather than establishing a stable integrated state.",
        ],
        diagram: {
          title: "The lytic pathway",
          kind: "flow",
          items: [
            { label: "Adsorption", detail: "Tail fibres bind a bacterial receptor." },
            { label: "Penetration", detail: "Phage nucleic acid enters the cell." },
            { label: "Biosynthesis", detail: "Genome and viral proteins are made." },
            { label: "Assembly", detail: "New phage particles form." },
            { label: "Lysis", detail: "The bacterium ruptures and releases phages." },
          ],
          caption: "In a productive lytic infection, the bacterial cell becomes a temporary factory and is destroyed at release.",
        },
      },
      {
        heading: "The lysogenic cycle: integration before production",
        paragraphs: [
          "A temperate phage can integrate its DNA into the bacterial chromosome. The integrated viral DNA is called a prophage. It is copied whenever the bacterium replicates, so daughter cells inherit the phage genome without producing virions immediately.",
          "Stress such as ultraviolet radiation or DNA damage can trigger induction. The prophage leaves the chromosome and enters the lytic programme. Lysogeny is therefore a reversible dormant strategy, not permanent inactivity.",
        ],
        diagram: {
          title: "The branch after genome entry",
          kind: "compare",
          items: [
            { label: "Lytic route", detail: "Immediate synthesis, assembly and host lysis." },
            { label: "Lysogenic route", detail: "Integration as a prophage and replication with the host." },
            { label: "Induction", detail: "Stress shifts a prophage into the lytic route." },
          ],
          caption: "Both routes begin with infection; the difference is whether virion production is immediate or delayed by integration.",
        },
      },
      {
        heading: "Why lysogeny can change a bacterium",
        paragraphs: [
          "A prophage may carry genes that alter bacterial phenotype, a process called lysogenic conversion. Some bacterial toxins are encoded by phage genes, so the bacterium becomes more pathogenic after acquiring the prophage.",
          "Phages can also transfer bacterial DNA between cells. In generalized transduction, random bacterial fragments may be packaged during a lytic infection. In specialized transduction, genes close to a prophage insertion site may be removed with incorrectly excised phage DNA.",
        ],
        table: {
          caption: "Generalized and specialized transduction",
          headers: ["Feature", "Generalized", "Specialized"],
          rows: [
            ["Typical stage", "Lytic packaging error", "Faulty prophage excision"],
            ["Bacterial genes moved", "Potentially any fragment", "Genes near the insertion site"],
            ["Key idea", "Random host DNA is packaged", "Adjacent host DNA leaves with phage DNA"],
          ],
        },
      },
      {
        heading: "Common examination traps",
        paragraphs: [
          "A prophage is viral DNA inside the bacterial chromosome, not a complete bacteriophage. Lysogenic infection does not immediately lyse the host, but the prophage can later be induced. Lysozyme-related phage enzymes are associated with breaking bacterial wall material during entry or release, not with genome replication.",
          "When comparing cycles, follow three questions: Is viral DNA integrated? Are new virions being assembled now? Does the host survive this stage? Those answers usually identify the route.",
        ],
      },
    ],
    recap: [
      "The lytic cycle produces virions and destroys the bacterium.",
      "The lysogenic cycle stores phage DNA as a prophage.",
      "Induction can move a prophage into the lytic cycle.",
      "Transduction transfers bacterial genes through phage particles.",
    ],
    checks: [
      {
        question: "Why can a bacterial population carry a prophage for many generations?",
        answer: "The prophage is copied as part of the host chromosome and passed to daughter cells during bacterial division.",
      },
      {
        question: "Which transduction route is limited to genes near the prophage site?",
        answer: "Specialized transduction, because it results from inaccurate excision of an integrated prophage.",
      },
    ],
  },
  {
    slug: "hiv-replication-and-aids",
    category: "MDCAT",
    topic: "Acellular life and immunity",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "13 min read",
    title: "HIV replication: from reverse transcription to immune failure",
    description:
      "Understand how a retrovirus enters CD4 cells, forms a provirus and gradually weakens adaptive immunity.",
    accent: "sage",
    objectives: [
      "Trace HIV entry, reverse transcription, integration and release.",
      "Explain the roles of reverse transcriptase, integrase and protease.",
      "Connect falling CD4 cell numbers with opportunistic disease.",
    ],
    sections: [
      {
        heading: "HIV is an enveloped retrovirus",
        paragraphs: [
          "Human immunodeficiency virus carries two copies of positive-sense single-stranded RNA inside a conical capsid. Its envelope contains glycoproteins that bind CD4 and a co-receptor on susceptible cells, especially helper T lymphocytes. The virion also carries enzymes required early in infection.",
          "Although the genome is RNA, HIV does not simply translate and replicate like an ordinary positive-sense RNA virus. Its defining strategy is reverse transcription: RNA is copied into DNA, which is integrated into host DNA.",
        ],
        table: {
          caption: "Three essential retroviral enzymes",
          headers: ["Enzyme", "Job"],
          rows: [
            ["Reverse transcriptase", "Builds viral DNA using RNA, then DNA, as templates"],
            ["Integrase", "Inserts viral DNA into the host chromosome"],
            ["Protease", "Cuts viral polyproteins so new virions mature"],
          ],
        },
      },
      {
        heading: "Entry and reverse transcription",
        paragraphs: [
          "Envelope glycoprotein first binds CD4, then a co-receptor. Membrane fusion releases the capsid contents into the cytoplasm. Reverse transcriptase produces a DNA copy of the viral RNA and then a complementary strand, creating double-stranded viral DNA.",
          "Reverse transcriptase lacks the high proofreading accuracy of many cellular DNA polymerases. Frequent errors create genetic variation, which contributes to drug resistance and makes immune control difficult.",
        ],
        diagram: {
          title: "The HIV replication pathway",
          kind: "flow",
          items: [
            { label: "Bind and fuse", detail: "Envelope proteins recognise CD4 and a co-receptor." },
            { label: "Reverse-transcribe", detail: "Viral RNA becomes double-stranded DNA." },
            { label: "Integrate", detail: "Viral DNA becomes a provirus." },
            { label: "Express", detail: "Host machinery makes viral RNA and proteins." },
            { label: "Bud and mature", detail: "Protease processes a newly released particle." },
          ],
          caption: "Integration creates a persistent genetic reservoir; budding gives new particles a host-derived envelope.",
        },
      },
      {
        heading: "The provirus makes infection persistent",
        paragraphs: [
          "Integrase inserts viral DNA into a host chromosome. This integrated form is the provirus. It can remain transcriptionally quiet or use host RNA polymerase to produce viral RNA. Some RNA becomes genome for new virions; other RNA is translated into viral proteins.",
          "Because proviral DNA is part of the infected cell's genome, eliminating every infected cell is extremely difficult. Latent reservoirs can persist even when treatment reduces circulating virus to very low levels.",
        ],
        callout: "The HIV provirus is double-stranded DNA integrated into host DNA—not the original RNA genome inside a virion.",
      },
      {
        heading: "Why CD4 loss weakens the whole immune response",
        paragraphs: [
          "Helper T cells coordinate adaptive immunity by activating and supporting other immune cells. Progressive damage to this population reduces effective antibody responses, cytotoxic T-cell activity and immune memory. The problem is therefore larger than the loss of one cell type.",
          "AIDS is the advanced stage of untreated HIV infection in which immune function is severely compromised. Opportunistic infections and certain cancers become more likely because organisms normally controlled by immunity can now cause disease.",
        ],
      },
      {
        heading: "Transmission, prevention and treatment logic",
        paragraphs: [
          "HIV is transmitted through infected blood, sexual fluids and from mother to child during pregnancy, birth or breastfeeding. It is not spread by ordinary social contact, shared utensils or insect bites. Prevention focuses on interrupting exposure to infectious fluids.",
          "Combination antiretroviral therapy targets different stages of replication, making it harder for resistant variants to dominate. Treatment suppresses viral replication, preserves immune function and dramatically reduces transmission risk, but it does not remove every provirus from latent reservoirs.",
        ],
      },
    ],
    recap: [
      "HIV is an enveloped RNA retrovirus that targets CD4-bearing cells.",
      "Reverse transcriptase makes DNA; integrase forms the provirus; protease enables maturation.",
      "Loss of helper T-cell coordination weakens multiple immune pathways.",
      "Combination therapy suppresses replication at several stages.",
    ],
    checks: [
      {
        question: "Why is HIV classified as a retrovirus even though its genome is positive-sense RNA?",
        answer: "Its defining replication route passes through a DNA intermediate produced by reverse transcriptase and integrated into host DNA.",
      },
      {
        question: "Why does a protease inhibitor affect virion maturation rather than DNA integration?",
        answer: "Viral protease cleaves polyproteins in newly formed particles; integration is performed by integrase earlier in the cycle.",
      },
    ],
  },
  {
    slug: "cell-organelles-and-membrane-transport",
    category: "Learn Biology",
    topic: "Cell structure and function",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "The cell as a working system: organelles and membrane transport",
    description:
      "Connect organelle structure with function, then follow how substances cross a selectively permeable membrane.",
    accent: "ember",
    objectives: [
      "Relate major organelles to their roles in cell metabolism.",
      "Distinguish diffusion, osmosis, facilitated diffusion and active transport.",
      "Predict water movement using water-potential reasoning.",
    ],
    sections: [
      {
        heading: "Compartmentalisation makes cells efficient",
        paragraphs: [
          "A eukaryotic cell is organised into compartments whose membranes create different chemical conditions. This separation prevents incompatible reactions from interfering with one another and concentrates enzymes and substrates where they are needed.",
          "The nucleus stores most genetic information; ribosomes translate mRNA; rough endoplasmic reticulum handles many proteins for secretion or membranes; smooth endoplasmic reticulum participates in lipid synthesis and detoxification; the Golgi apparatus modifies, sorts and packages products; lysosomes contain hydrolytic enzymes; and mitochondria support aerobic ATP production.",
        ],
        table: {
          caption: "Structure gives each organelle its job",
          headers: ["Organelle", "Structural clue", "Functional consequence"],
          rows: [
            ["Nucleus", "Double envelope with pores", "Controls exchange of RNA and proteins"],
            ["Rough ER", "Membranes bearing ribosomes", "Synthesizes and begins processing exported proteins"],
            ["Golgi apparatus", "Stacked cisternae with vesicles", "Modifies, sorts and dispatches cell products"],
            ["Mitochondrion", "Folded inner membrane", "Large surface for electron transport and ATP synthesis"],
            ["Lysosome", "Acidic enzyme-containing vesicle", "Digests worn components and engulfed material"],
          ],
        },
      },
      {
        heading: "The plasma membrane is a dynamic boundary",
        paragraphs: [
          "The fluid-mosaic model describes a phospholipid bilayer containing proteins, cholesterol and carbohydrate-bearing molecules. Hydrophilic heads face watery environments, while hydrophobic tails form an interior barrier to ions and most polar molecules.",
          "Transport proteins give the membrane selective permeability. Channel proteins form hydrophilic routes; carrier proteins bind specific solutes and change shape. Receptors receive signals, enzymes catalyse reactions, and glycoproteins contribute to cell recognition.",
        ],
        diagram: {
          title: "A membrane viewed by function",
          kind: "compare",
          items: [
            { label: "Bilayer", detail: "Blocks most ions and large polar solutes." },
            { label: "Channel", detail: "Provides a selective hydrophilic pore." },
            { label: "Carrier", detail: "Binds a solute and changes conformation." },
            { label: "Pump", detail: "Uses energy to move solutes against a gradient." },
          ],
          caption: "Selectivity depends on both the lipid barrier and the proteins embedded within it.",
        },
      },
      {
        heading: "Passive transport follows gradients",
        paragraphs: [
          "Simple diffusion is the net movement of particles from higher to lower concentration because random molecular motion produces more movement away from the crowded region than toward it. Small non-polar molecules such as oxygen and carbon dioxide can diffuse through the bilayer.",
          "Facilitated diffusion also moves substances down an electrochemical gradient, but it requires channels or carriers. No metabolic energy is used to drive the movement. Because the number of transport proteins is limited, carrier-mediated transport can reach a maximum rate.",
        ],
        points: [
          "A steeper gradient generally increases net diffusion rate.",
          "A larger surface area increases the number of particles that can cross per unit time.",
          "A shorter diffusion distance increases exchange efficiency.",
          "Higher temperature increases molecular kinetic energy.",
        ],
      },
      {
        heading: "Osmosis is the movement of water",
        paragraphs: [
          "Osmosis is the net movement of water through a selectively permeable membrane from higher water potential to lower water potential. Adding a non-penetrating solute lowers water potential because fewer water molecules are free to move and because water associates with solute particles.",
          "An animal cell in a strongly hypotonic solution may swell and lyse because it lacks a cell wall. A plant cell becomes turgid as the wall resists further expansion. In a hypertonic solution, an animal cell shrinks while a plant cell may plasmolyse as the protoplast pulls away from the wall.",
        ],
        callout: "For osmosis questions, follow water—not solute—and state the relative water potentials on both sides.",
      },
      {
        heading: "Active and bulk transport require cellular energy",
        paragraphs: [
          "Active transport moves a solute against its concentration or electrochemical gradient using energy. Primary active transport uses ATP directly, while secondary active transport uses the energy stored in an ion gradient created by another pump.",
          "Endocytosis brings large material into the cell by vesicle formation; exocytosis releases material when a vesicle fuses with the plasma membrane. These bulk processes alter membrane shape and are distinct from movement through a channel or carrier.",
        ],
        diagram: {
          title: "Choosing the correct transport mechanism",
          kind: "flow",
          items: [
            { label: "Through lipid", detail: "Small non-polar solute: simple diffusion." },
            { label: "Down gradient", detail: "Polar solute through protein: facilitated diffusion." },
            { label: "Water only", detail: "Across a selective membrane: osmosis." },
            { label: "Against gradient", detail: "Pump or coupled carrier: active transport." },
            { label: "Large cargo", detail: "Vesicle movement: endocytosis or exocytosis." },
          ],
          caption: "Direction relative to the gradient, energy requirement and cargo size identify the mechanism.",
        },
      },
    ],
    recap: [
      "Organelles create specialised reaction environments.",
      "Membrane proteins produce selectivity beyond the phospholipid bilayer.",
      "Passive transport moves down a gradient; active transport can move against it.",
      "Osmosis describes water movement according to water potential.",
    ],
    checks: [
      {
        question: "Why can facilitated diffusion become saturated while simple diffusion through the bilayer does not saturate in the same way?",
        answer: "Facilitated diffusion depends on a finite number of channels or carriers, whereas simple diffusion is not limited by transport-protein binding sites.",
      },
      {
        question: "What prevents a plant cell in dilute solution from continuing to expand indefinitely?",
        answer: "The rigid cell wall develops an opposing pressure as the cell becomes turgid, reducing further net water entry.",
      },
    ],
  },
  {
    slug: "enzymes-activation-energy-and-inhibition",
    category: "MDCAT",
    topic: "Enzymes",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "13 min read",
    title: "Enzymes: activation energy, specificity and inhibition",
    description:
      "Understand what an active site really does, why rates change, and how competitive and non-competitive inhibitors differ.",
    accent: "green",
    objectives: [
      "Explain how enzymes lower activation energy without changing equilibrium.",
      "Interpret effects of temperature, pH and substrate concentration.",
      "Compare competitive and non-competitive inhibition.",
    ],
    sections: [
      {
        heading: "Enzymes change the route, not the destination",
        paragraphs: [
          "A chemical reaction requires reactants to reach a high-energy transition state. The activation energy is the energy barrier between reactants and that state. Enzymes provide an alternative reaction pathway with a lower activation energy, so a larger fraction of collisions can produce products at a given temperature.",
          "An enzyme does not make an energetically impossible reaction favourable, supply energy to the products or change the position of equilibrium. It accelerates forward and reverse reactions and helps the system reach equilibrium sooner.",
        ],
        callout: "Lower activation energy means faster reaction—not more total energy released and not a different final equilibrium.",
      },
      {
        heading: "The active site is chemically precise",
        paragraphs: [
          "An active site is a three-dimensional region formed by amino acid side chains that may be far apart in the primary sequence. Shape, charge, polarity and temporary interactions determine which substrates bind and how they are oriented.",
          "The induced-fit model recognises that an enzyme is flexible. Substrate binding can shift the active site's shape, placing catalytic groups in better positions and stressing particular substrate bonds. Specificity is therefore chemical and dynamic, not simply a rigid lock-and-key outline.",
        ],
        diagram: {
          title: "The catalytic cycle",
          kind: "cycle",
          items: [
            { label: "Encounter", detail: "Substrate collides with the active site." },
            { label: "Bind", detail: "Specific interactions form an enzyme–substrate complex." },
            { label: "Catalyse", detail: "The transition state is stabilised." },
            { label: "Release", detail: "Products leave; the enzyme is reusable." },
          ],
          caption: "The enzyme participates temporarily but is regenerated at the end of the catalytic cycle.",
        },
      },
      {
        heading: "Why rate rises and then levels off",
        paragraphs: [
          "At low substrate concentration, adding substrate increases the frequency of successful active-site encounters. As concentration rises, more active sites are occupied. Eventually almost every enzyme molecule is working whenever possible, and the reaction approaches its maximum rate.",
          "Adding more substrate beyond saturation has little effect. Adding more enzyme can raise the maximum rate if sufficient substrate is available. This distinction is central to graph-based questions.",
        ],
        table: {
          caption: "Factors affecting enzyme activity",
          headers: ["Factor", "Initial effect", "Limit or decline"],
          rows: [
            ["Substrate concentration", "More enzyme–substrate collisions", "Active sites become saturated"],
            ["Enzyme concentration", "More active sites available", "Substrate becomes limiting"],
            ["Temperature", "Faster molecular motion", "Excess heat disrupts structure"],
            ["pH", "Changes ionisation and interactions", "Extreme pH alters active-site structure"],
          ],
        },
      },
      {
        heading: "Temperature and pH act through structure",
        paragraphs: [
          "Increasing temperature initially raises kinetic energy and collision frequency. Beyond an optimum range, thermal motion disrupts weak interactions that maintain the enzyme's tertiary structure. The active site loses the arrangement required for catalysis: the enzyme is denatured.",
          "pH changes the ionisation of amino acid side chains. That can alter substrate binding, catalytic chemistry or the ionic interactions stabilising protein structure. Different enzymes have different pH optima because their environments and active-site chemistry differ.",
        ],
      },
      {
        heading: "Competitive and non-competitive inhibition",
        paragraphs: [
          "A competitive inhibitor binds at the active site and competes with substrate. Increasing substrate concentration can reduce its effect because substrate molecules occupy a greater fraction of active sites. The same maximum rate may be reached, but more substrate is required.",
          "A pure non-competitive inhibitor binds elsewhere and reduces the proportion of functional enzyme molecules. Adding more substrate cannot fully restore the original maximum rate. Real enzymes can show mixed or irreversible inhibition, but MDCAT comparisons usually focus on these core patterns.",
        ],
        diagram: {
          title: "Two inhibition patterns",
          kind: "compare",
          items: [
            { label: "Competitive", detail: "Active-site binding; overcome by sufficiently high substrate." },
            { label: "Non-competitive", detail: "Binding elsewhere; maximum rate is reduced." },
          ],
          caption: "Ask where the inhibitor binds and whether increasing substrate can recover the original maximum rate.",
        },
      },
    ],
    recap: [
      "Enzymes lower activation energy through an alternative pathway.",
      "Active sites depend on three-dimensional chemistry and induced fit.",
      "Saturation limits rate at high substrate concentration.",
      "Competitive inhibition differs from non-competitive inhibition in site and kinetic effect.",
    ],
    checks: [
      {
        question: "Why does an enzyme not change the equilibrium position of a reversible reaction?",
        answer: "It lowers the activation barrier for both forward and reverse directions, so equilibrium is reached faster without changing the relative energies of reactants and products.",
      },
      {
        question: "Which observation supports competitive inhibition?",
        answer: "The inhibited reaction can approach the original maximum rate when substrate concentration becomes sufficiently high.",
      },
    ],
  },
  {
    slug: "cellular-respiration-atp-production",
    category: "MDCAT",
    topic: "Bioenergetics",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "16 min read",
    title: "Cellular respiration: how glucose becomes usable ATP",
    description:
      "Trace carbon, electrons and energy through glycolysis, the link reaction, the Krebs cycle and oxidative phosphorylation.",
    accent: "sage",
    objectives: [
      "Locate each stage of aerobic respiration in a eukaryotic cell.",
      "Track the different roles of ATP, NADH, FADH₂ and oxygen.",
      "Explain chemiosmosis and the reduced yield of anaerobic pathways.",
    ],
    sections: [
      {
        heading: "Respiration transfers energy in controlled steps",
        paragraphs: [
          "Glucose contains chemical potential energy, but releasing all of it in one uncontrolled event would waste much as heat. Cellular respiration uses enzyme-controlled reactions to transfer energy in smaller steps. Some is captured directly in ATP, while much is first transferred to reduced electron carriers.",
          "ATP is the immediate energy currency for many cellular processes. It is useful because hydrolysis of its terminal phosphate is coupled to energy-requiring reactions, transport and movement. ATP is continually regenerated rather than stored in very large quantities.",
        ],
      },
      {
        heading: "Glycolysis splits glucose in the cytosol",
        paragraphs: [
          "Glycolysis occurs in the cytosol and does not require oxygen directly. Energy is first invested to phosphorylate and destabilise glucose. The six-carbon intermediate is split into two three-carbon molecules, which are oxidised to pyruvate.",
          "Per glucose molecule, glycolysis produces a net gain of two ATP by substrate-level phosphorylation and reduces NAD to NADH. The two pyruvate molecules still contain much of the original energy and may enter mitochondria when aerobic conditions permit.",
        ],
        diagram: {
          title: "The energy logic of glycolysis",
          kind: "flow",
          items: [
            { label: "Invest", detail: "ATP activates a six-carbon sugar." },
            { label: "Split", detail: "One six-carbon molecule becomes two three-carbon units." },
            { label: "Oxidise", detail: "Electrons reduce NAD to NADH." },
            { label: "Pay off", detail: "ATP forms and two pyruvate remain." },
          ],
          caption: "The net ATP gain is smaller than the total ATP produced because ATP is consumed in the investment phase.",
        },
      },
      {
        heading: "The link reaction and Krebs cycle remove carbon",
        paragraphs: [
          "In the mitochondrial matrix, each pyruvate is decarboxylated and oxidised. Carbon dioxide is released, NAD is reduced, and the remaining two-carbon acetyl group joins coenzyme A. Acetyl-CoA then enters the Krebs cycle.",
          "Acetyl combines with a four-carbon acceptor to form a six-carbon compound. A series of reactions releases two carbon dioxide molecules, regenerates the four-carbon acceptor, reduces NAD and FAD, and produces a small amount of ATP by substrate-level phosphorylation. The cycle's major energy output is reduced carriers, not ATP itself.",
        ],
        table: {
          caption: "What each stage contributes",
          headers: ["Stage", "Location", "Main contribution"],
          rows: [
            ["Glycolysis", "Cytosol", "Pyruvate, net ATP and NADH"],
            ["Link reaction", "Mitochondrial matrix", "Acetyl-CoA, CO₂ and NADH"],
            ["Krebs cycle", "Mitochondrial matrix", "CO₂, NADH, FADH₂ and a little ATP"],
            ["Oxidative phosphorylation", "Inner mitochondrial membrane", "Most aerobic ATP"],
          ],
        },
      },
      {
        heading: "Electron transport creates a proton gradient",
        paragraphs: [
          "NADH and FADH₂ donate high-energy electrons to protein complexes in the inner mitochondrial membrane. As electrons pass along the chain, released energy pumps protons from the matrix into the intermembrane space. The membrane stores potential energy as an electrochemical proton gradient.",
          "Protons flow back through ATP synthase, whose activity couples that flow to ATP formation. This chemiosmotic mechanism is oxidative phosphorylation. Oxygen is the final electron acceptor; it combines with electrons and protons to form water. Without oxygen, electron flow stops and reduced carriers cannot be efficiently reoxidised.",
        ],
        diagram: {
          title: "Chemiosmosis across the inner membrane",
          kind: "flow",
          items: [
            { label: "Donate electrons", detail: "NADH and FADH₂ feed the transport chain." },
            { label: "Pump protons", detail: "Electron energy builds a gradient." },
            { label: "Return through ATP synthase", detail: "Proton flow drives phosphorylation." },
            { label: "Reduce oxygen", detail: "Oxygen accepts electrons and forms water." },
          ],
          caption: "The electron chain builds the gradient; ATP synthase uses it. These are linked but distinct events.",
        },
      },
      {
        heading: "Fermentation keeps glycolysis possible",
        paragraphs: [
          "When oxygen is unavailable, oxidative phosphorylation stops. Glycolysis can continue only if NADH transfers electrons to another acceptor and regenerates NAD. In animal cells, pyruvate is reduced to lactate; in yeast, pyruvate is converted to ethanol and carbon dioxide.",
          "Fermentation adds no large ATP yield beyond glycolysis. Its crucial function is NAD regeneration. Because glucose is only partially oxidised, much chemical energy remains in lactate or ethanol.",
        ],
        callout: "Oxygen is not used in glycolysis, but aerobic cells need oxygen to keep electron transport—and therefore large-scale NAD regeneration—running.",
      },
    ],
    recap: [
      "Glycolysis supplies pyruvate, a little ATP and reduced NAD.",
      "The Krebs cycle mainly loads electron carriers.",
      "Electron transport builds the proton gradient used by ATP synthase.",
      "Fermentation regenerates NAD so glycolysis can continue without oxygen.",
    ],
    checks: [
      {
        question: "Why does blocking the electron-transport chain eventually slow the Krebs cycle?",
        answer: "NADH and FADH₂ cannot be efficiently oxidised, so oxidised NAD and FAD become limiting for Krebs-cycle dehydrogenation reactions.",
      },
      {
        question: "What is the immediate purpose of fermentation?",
        answer: "To regenerate oxidised NAD, allowing glycolysis and its small ATP yield to continue.",
      },
    ],
  },
  {
    slug: "cardiac-cycle-and-circulation",
    category: "MDCAT",
    topic: "Circulation",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "The cardiac cycle: pressure, valves and one-way blood flow",
    description:
      "Understand the heartbeat as a pressure-driven sequence and connect heart structure with pulmonary and systemic circulation.",
    accent: "ember",
    objectives: [
      "Trace blood through the four chambers and two circuits.",
      "Explain valve opening and closure using pressure differences.",
      "Relate electrical conduction to atrial and ventricular contraction.",
    ],
    sections: [
      {
        heading: "Double circulation separates two destinations",
        paragraphs: [
          "The right side of the heart pumps deoxygenated blood through the pulmonary circuit to the lungs. The left side pumps oxygenated blood through the systemic circuit to the body. Blood passes through the heart twice during one complete trip around both circuits, hence double circulation.",
          "The left ventricle has a thicker wall because systemic circulation requires a larger pressure to overcome greater total resistance. The right ventricle pumps only to the nearby lungs, where excessive pressure could damage delicate pulmonary capillaries.",
        ],
        diagram: {
          title: "One complete route through the circulation",
          kind: "cycle",
          items: [
            { label: "Body", detail: "Venae cavae return deoxygenated blood." },
            { label: "Right heart", detail: "Pumps blood through the pulmonary artery." },
            { label: "Lungs", detail: "Gas exchange oxygenates the blood." },
            { label: "Left heart", detail: "Pumps blood through the aorta to the body." },
          ],
          caption: "Arteries carry blood away from the heart and veins return it; oxygen content does not define the vessel type.",
        },
      },
      {
        heading: "Valves respond to pressure gradients",
        paragraphs: [
          "A valve does not actively pull itself open. It opens when pressure behind it exceeds pressure ahead and closes when the gradient reverses. Atrioventricular valves lie between atria and ventricles; semilunar valves lie at the exits to the pulmonary artery and aorta.",
          "Chordae tendineae and papillary muscles prevent atrioventricular valves from inverting during ventricular contraction. They do not close the valve; the pressure difference does that.",
        ],
        table: {
          caption: "Valve state during the cardiac cycle",
          headers: ["Phase", "AV valves", "Semilunar valves", "Main movement"],
          rows: [
            ["Ventricular filling", "Open", "Closed", "Atria to ventricles"],
            ["Ventricular systole", "Closed", "Open after pressure rises", "Ventricles to arteries"],
            ["Early diastole", "Closed briefly", "Closed", "Pressure falls before filling"],
          ],
        },
      },
      {
        heading: "The heartbeat begins in specialised muscle",
        paragraphs: [
          "The sinoatrial node in the right atrium acts as the normal pacemaker. Its wave of depolarisation spreads across atrial muscle and causes atrial systole. Non-conducting tissue between atria and ventricles prevents immediate spread to the ventricles.",
          "The atrioventricular node introduces a brief delay, allowing ventricular filling. The impulse then travels through the bundle of His and Purkyne fibres toward the apex, producing coordinated ventricular contraction from the lower regions upward.",
        ],
        diagram: {
          title: "Electrical coordination of one heartbeat",
          kind: "flow",
          items: [
            { label: "SA node", detail: "Initiates atrial depolarisation." },
            { label: "AV node", detail: "Delays the signal briefly." },
            { label: "Bundle pathway", detail: "Carries excitation through the septum." },
            { label: "Purkyne fibres", detail: "Spread excitation through ventricular walls." },
          ],
          caption: "The sequence allows the atria to contract before the ventricles and helps the ventricles eject blood efficiently.",
        },
      },
      {
        heading: "Systole, diastole and heart sounds",
        paragraphs: [
          "Systole means contraction of a chamber; diastole means relaxation. During ventricular systole, rising ventricular pressure closes the atrioventricular valves, producing the first heart sound. When ventricular pressure falls below arterial pressure, semilunar valves close and contribute to the second sound.",
          "A complete cardiac cycle includes overlapping atrial and ventricular events rather than one global contraction followed by one global relaxation. Pressure curves explain the valve sequence more reliably than memorising isolated phases.",
        ],
      },
      {
        heading: "Flow, pressure and exchange vessels",
        paragraphs: [
          "Arteries have thick elastic and muscular walls to withstand and smooth high-pressure pulsatile flow. Veins operate at lower pressure, possess a larger lumen and often contain valves. Capillaries have very thin walls and an enormous combined cross-sectional area, slowing blood and shortening diffusion distance.",
          "Tissue fluid forms as hydrostatic pressure drives plasma components out of capillaries; most returns as hydrostatic pressure falls and osmotic forces favour re-entry. Excess tissue fluid enters lymphatic vessels and eventually returns to the blood.",
        ],
      },
    ],
    recap: [
      "The right and left sides power pulmonary and systemic circuits.",
      "Pressure differences, not active valve movement, control one-way flow.",
      "The conduction system coordinates atrial then ventricular systole.",
      "Vessel structure reflects pressure, direction and exchange function.",
    ],
    checks: [
      {
        question: "Why do semilunar valves close at the beginning of ventricular diastole?",
        answer: "Ventricular pressure falls below pressure in the aorta and pulmonary artery, reversing the pressure gradient and filling the valve pockets.",
      },
      {
        question: "Why is blood velocity low in capillaries despite their narrow individual diameter?",
        answer: "The capillary network has an enormous total cross-sectional area, so flow is distributed across many parallel vessels.",
      },
    ],
  },
  {
    slug: "nerve-impulse-and-synapse",
    category: "MDCAT",
    topic: "Nervous coordination",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "15 min read",
    title: "The nerve impulse: resting potential, action potential and synapse",
    description:
      "Follow ions and channels across an axon membrane, then see how an electrical signal becomes chemical at a synapse.",
    accent: "green",
    objectives: [
      "Explain how ion gradients create the resting membrane potential.",
      "Trace depolarisation, repolarisation and the refractory period.",
      "Describe chemical synaptic transmission and one-way signalling.",
    ],
    sections: [
      {
        heading: "Resting does not mean inactive",
        paragraphs: [
          "A resting neuron maintains an electrical potential difference across its membrane, with the inside negative relative to the outside. Unequal ion distributions, selective membrane permeability and trapped intracellular anions all contribute to this state.",
          "The sodium–potassium pump uses ATP to move three sodium ions out for every two potassium ions moved in, maintaining the gradients over time. At rest, potassium leak channels allow more positive charge to leave than sodium leak permits to enter, helping make the interior negative.",
        ],
        table: {
          caption: "Roles of major membrane components",
          headers: ["Component", "Main role"],
          rows: [
            ["Na⁺/K⁺ pump", "Maintains sodium and potassium gradients using ATP"],
            ["K⁺ leak channels", "Permit resting potassium movement outward"],
            ["Voltage-gated Na⁺ channels", "Produce rapid depolarisation when opened"],
            ["Voltage-gated K⁺ channels", "Drive repolarisation and after-hyperpolarisation"],
          ],
        },
      },
      {
        heading: "Threshold triggers an all-or-none event",
        paragraphs: [
          "A stimulus that depolarises the membrane to threshold opens many voltage-gated sodium channels. Sodium enters down its electrochemical gradient, causing further depolarisation and opening still more channels. This positive-feedback phase produces the rising action potential.",
          "An action potential is all-or-none: once threshold is reached, its basic size is not graded according to stimulus strength. Stronger stimuli are represented mainly by a higher frequency of action potentials or recruitment of more sensory neurons.",
        ],
        callout: "Below threshold, no full action potential occurs. Above threshold, intensity is encoded by frequency—not by making each action potential taller.",
      },
      {
        heading: "Repolarisation resets electrical conditions",
        paragraphs: [
          "Voltage-gated sodium channels inactivate while voltage-gated potassium channels open more fully. Potassium leaves the cell and the membrane potential becomes negative again. Because potassium channels close slowly, the potential may briefly become more negative than the resting level.",
          "During the absolute refractory period, inactivated sodium channels cannot reopen, preventing another action potential. During the relative refractory period, a stronger-than-usual stimulus may be required. These periods help enforce one-way propagation and limit firing frequency.",
        ],
        diagram: {
          title: "One action potential",
          kind: "flow",
          items: [
            { label: "Rest", detail: "Ion gradients and leak permeability maintain negativity." },
            { label: "Threshold", detail: "Sufficient depolarisation opens Na⁺ channels." },
            { label: "Depolarise", detail: "Rapid Na⁺ entry makes the inside positive." },
            { label: "Repolarise", detail: "Na⁺ channels inactivate and K⁺ leaves." },
            { label: "Refractory", detail: "Channels reset before normal excitability returns." },
          ],
          caption: "The pump maintains long-term gradients, but rapid channel opening creates each action potential.",
        },
      },
      {
        heading: "Myelin makes propagation faster",
        paragraphs: [
          "Myelin electrically insulates sections of the axon. Voltage-gated channels are concentrated at gaps called nodes of Ranvier, so local current spreads rapidly beneath the myelin and action potentials are regenerated mainly at the nodes.",
          "This saltatory conduction is faster and more energy-efficient than continuous regeneration along an unmyelinated membrane. Larger axon diameter also reduces internal resistance and can increase conduction speed.",
        ],
      },
      {
        heading: "A chemical synapse converts the signal twice",
        paragraphs: [
          "When an action potential reaches the presynaptic terminal, voltage-gated calcium channels open. Calcium entry triggers synaptic vesicles to fuse with the membrane and release neurotransmitter by exocytosis. The transmitter diffuses across the cleft and binds postsynaptic receptors.",
          "Receptor activation changes ion permeability, producing an excitatory or inhibitory postsynaptic potential. The neurotransmitter is then removed by enzymatic breakdown, diffusion or reuptake. Transmission is one-way because vesicle-release machinery is presynaptic while receptors are concentrated postsynaptically.",
        ],
        diagram: {
          title: "Signal transfer at a chemical synapse",
          kind: "flow",
          items: [
            { label: "Impulse arrives", detail: "The terminal membrane depolarises." },
            { label: "Ca²⁺ enters", detail: "Voltage-gated calcium channels open." },
            { label: "Transmitter released", detail: "Vesicles fuse by exocytosis." },
            { label: "Receptors bind", detail: "Postsynaptic permeability changes." },
            { label: "Signal ends", detail: "Transmitter is removed from the cleft." },
          ],
          caption: "The signal is electrical in the axon, chemical across the cleft, then electrical again in the postsynaptic cell.",
        },
      },
    ],
    recap: [
      "Resting potential depends on ion gradients and selective permeability.",
      "Voltage-gated sodium entry causes depolarisation; potassium exit restores negativity.",
      "Refractory periods support one-way propagation.",
      "Calcium entry links an arriving impulse with neurotransmitter release.",
    ],
    checks: [
      {
        question: "Why does the sodium–potassium pump not directly create the rapid rising phase of an action potential?",
        answer: "The rising phase is produced by rapid sodium flow through voltage-gated channels. The pump works more slowly to maintain the gradients that make that flow possible.",
      },
      {
        question: "Why is transmission across a typical chemical synapse one-way?",
        answer: "Transmitter vesicles and release machinery are presynaptic, while the relevant receptors are on the postsynaptic membrane.",
      },
    ],
  },
  {
    slug: "sliding-filament-muscle-contraction",
    category: "Learn Biology",
    topic: "Support and movement",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "12 min read",
    title: "Sliding-filament theory: how skeletal muscle contracts",
    description:
      "Connect sarcomere structure, calcium signalling and ATP-powered cross-bridge cycling in one continuous mechanism.",
    accent: "sage",
    objectives: [
      "Identify the structural bands and filaments of a sarcomere.",
      "Explain how calcium exposes actin-binding sites.",
      "Describe the roles of ATP in attachment, movement and relaxation.",
    ],
    sections: [
      {
        heading: "Muscle shortens because sarcomeres shorten",
        paragraphs: [
          "A skeletal muscle fibre contains parallel myofibrils built from repeating sarcomeres. Each sarcomere lies between two Z lines. Thin actin filaments extend inward from the Z lines, while thick myosin filaments occupy the centre.",
          "During contraction, the filaments do not become shorter. Actin slides past myosin, increasing overlap and pulling Z lines closer together. The I band and H zone become narrower, while the A band—the length of the thick filament—remains constant.",
        ],
        table: {
          caption: "What changes during sarcomere shortening",
          headers: ["Feature", "During contraction"],
          rows: [
            ["Sarcomere length", "Decreases"],
            ["I band", "Decreases"],
            ["H zone", "Decreases and may disappear"],
            ["A band", "Remains constant"],
            ["Actin and myosin filament length", "Remain constant"],
          ],
        },
      },
      {
        heading: "Calcium removes the molecular blockade",
        paragraphs: [
          "At rest, tropomyosin lies over myosin-binding sites on actin. When an action potential travels along the sarcolemma and down T-tubules, the sarcoplasmic reticulum releases calcium ions into the cytosol.",
          "Calcium binds troponin, changing the troponin–tropomyosin complex and exposing actin sites. Myosin heads can then form cross-bridges. Calcium does not supply the mechanical energy; it permits the interaction to occur.",
        ],
        diagram: {
          title: "From nerve signal to exposed actin",
          kind: "flow",
          items: [
            { label: "Motor impulse", detail: "A muscle-fibre action potential begins." },
            { label: "T-tubules", detail: "Depolarisation enters the fibre." },
            { label: "Ca²⁺ release", detail: "The sarcoplasmic reticulum releases calcium." },
            { label: "Troponin binds", detail: "Tropomyosin shifts away from actin sites." },
          ],
          caption: "Excitation–contraction coupling links an electrical event to cross-bridge access.",
        },
      },
      {
        heading: "The cross-bridge cycle uses ATP repeatedly",
        paragraphs: [
          "An energised myosin head carrying ADP and phosphate binds exposed actin. Phosphate release strengthens binding and initiates the power stroke; the head pivots and pulls the thin filament. ADP leaves near the end of the stroke.",
          "A new ATP binds myosin and causes detachment from actin. ATP hydrolysis then re-cocks and energises the head. The cycle repeats while calcium remains elevated and ATP is available.",
        ],
        diagram: {
          title: "The cross-bridge cycle",
          kind: "cycle",
          items: [
            { label: "Attach", detail: "Energised myosin binds exposed actin." },
            { label: "Power stroke", detail: "Phosphate release drives filament movement." },
            { label: "Detach", detail: "A new ATP binds myosin." },
            { label: "Re-cock", detail: "ATP hydrolysis energises the head again." },
          ],
          caption: "ATP is required to detach myosin as well as to re-energise it; without ATP, cross-bridges remain fixed.",
        },
      },
      {
        heading: "Relaxation also requires energy",
        paragraphs: [
          "When stimulation ends, calcium is actively pumped back into the sarcoplasmic reticulum. Cytosolic calcium falls, troponin returns toward its resting shape, and tropomyosin covers the actin-binding sites again.",
          "ATP is therefore needed both for cross-bridge cycling and for calcium reuptake. Rigor mortis develops after death because ATP production stops, myosin cannot detach normally, and calcium gradients cannot be maintained.",
        ],
      },
      {
        heading: "From fibres to whole-muscle force",
        paragraphs: [
          "A motor unit consists of one motor neuron and the fibres it controls. Force increases when more motor units are recruited and when impulses arrive at a higher frequency, allowing temporal summation. Small motor units provide fine control, while large units generate greater force.",
          "Muscle fatigue can reflect multiple factors, including metabolite accumulation, altered ion gradients, reduced substrate availability and central nervous-system effects. It should not be reduced to a single idea such as 'lactic acid stops contraction.'",
        ],
      },
    ],
    recap: [
      "Actin and myosin slide; the filaments themselves do not shorten.",
      "Calcium exposes actin sites through troponin and tropomyosin.",
      "ATP enables detachment, re-cocking and calcium reuptake.",
      "Recruitment and firing frequency determine whole-muscle force.",
    ],
    checks: [
      {
        question: "Which sarcomere band remains unchanged during contraction, and why?",
        answer: "The A band remains constant because it represents the length of thick myosin filaments, which do not shorten.",
      },
      {
        question: "Why does loss of ATP produce stiffness rather than immediate relaxation?",
        answer: "ATP is required for myosin to detach from actin and for calcium to be pumped back into storage.",
      },
    ],
  },
  {
    slug: "innate-vs-adaptive-immunity",
    category: "MDCAT",
    topic: "Immunity",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "15 min read",
    title: "Innate and adaptive immunity: one defence system, different jobs",
    description:
      "See how barriers, inflammation, phagocytes, antibodies and T cells cooperate—and where immune memory comes from.",
    accent: "ember",
    objectives: [
      "Compare innate and adaptive immune responses.",
      "Explain clonal selection of B and T lymphocytes.",
      "Distinguish active from passive immunity and primary from secondary responses.",
    ],
    sections: [
      {
        heading: "Innate defence acts first",
        paragraphs: [
          "Innate immunity includes physical and chemical barriers as well as rapid internal responses. Skin, mucus, cilia, stomach acid, lysozyme and normal microbiota reduce pathogen entry. If a barrier is crossed, phagocytes, complement proteins, inflammatory mediators and natural killer cells respond.",
          "Innate receptors recognise broad molecular patterns shared by groups of microbes. The response is rapid and does not improve through antigen-specific memory in the way adaptive immunity does.",
        ],
        table: {
          caption: "Innate and adaptive immunity compared",
          headers: ["Feature", "Innate", "Adaptive"],
          rows: [
            ["Speed", "Minutes to hours", "Slower during first exposure"],
            ["Recognition", "Shared microbial or damage patterns", "Highly specific antigens"],
            ["Main cells", "Phagocytes, NK cells and others", "B and T lymphocytes"],
            ["Memory", "No classical antigen-specific memory", "Strong memory after activation"],
          ],
        },
      },
      {
        heading: "Inflammation recruits and contains",
        paragraphs: [
          "Tissue damage and microbial signals cause local release of mediators such as histamine. Blood vessels dilate and become more permeable, increasing delivery of plasma proteins and immune cells. Redness, heat, swelling and pain are consequences of these vascular and chemical changes.",
          "Neutrophils and macrophages engulf material by phagocytosis. Vesicles containing a microbe fuse with lysosomes, exposing it to enzymes and reactive chemicals. Macrophages and dendritic cells can also present antigen fragments to T lymphocytes, linking innate detection with adaptive activation.",
        ],
        diagram: {
          title: "From entry to adaptive activation",
          kind: "flow",
          items: [
            { label: "Barrier breached", detail: "Pathogen or damage signals are detected." },
            { label: "Inflammation", detail: "Blood flow and permeability increase." },
            { label: "Phagocytosis", detail: "Innate cells engulf and process material." },
            { label: "Antigen presentation", detail: "Specific T cells are activated." },
            { label: "Clonal response", detail: "Effector and memory cells expand." },
          ],
          caption: "Innate and adaptive immunity are interconnected phases, not isolated armies.",
        },
      },
      {
        heading: "Clonal selection creates specificity",
        paragraphs: [
          "Each lymphocyte carries receptors with one main antigen specificity. An antigen selects the rare lymphocytes whose receptors fit. With the required co-stimulation, those cells proliferate to form a clone.",
          "Some descendants become short-lived effector cells; others become long-lived memory cells. Helper T cells coordinate responses through direct contact and cytokines. Cytotoxic T cells kill infected body cells displaying relevant antigen, while activated B cells can differentiate into antibody-secreting plasma cells.",
        ],
      },
      {
        heading: "Antibodies label with precision",
        paragraphs: [
          "An antibody has variable regions that form antigen-binding sites and a constant region that interacts with other immune components. Antibody binding can neutralise toxins or viruses, agglutinate particles, mark targets for phagocytosis and activate complement.",
          "Antibodies act mainly against extracellular targets and free viral particles. They do not enter every infected cell to remove intracellular pathogens; cytotoxic T cells are especially important for that problem.",
        ],
        diagram: {
          title: "Two coordinated adaptive arms",
          kind: "compare",
          items: [
            { label: "Humoral response", detail: "B cells and antibodies target extracellular material." },
            { label: "Cell-mediated response", detail: "T cells coordinate or kill infected cells." },
            { label: "Memory", detail: "Both arms generate faster future responses." },
          ],
          caption: "Helper T-cell support connects and strengthens both humoral and cell-mediated responses.",
        },
      },
      {
        heading: "Memory explains vaccination",
        paragraphs: [
          "The primary response to a new antigen takes time because rare specific cells must be activated and multiplied. A second exposure activates memory cells more rapidly and usually produces a faster, larger and more sustained response.",
          "Vaccination produces active immunity by exposing the immune system to a safe form or component of an antigen. Passive immunity transfers ready-made antibodies, giving immediate but temporary protection without the same memory-cell development.",
        ],
        callout: "Active immunity is slower to develop but can create memory; passive immunity is immediate but fades as transferred antibodies are removed.",
      },
    ],
    recap: [
      "Innate defences are rapid and pattern-based.",
      "Adaptive responses depend on antigen-specific clonal selection.",
      "B cells support antibody-mediated defence; T cells coordinate and kill infected cells.",
      "Memory cells make later responses faster and stronger.",
    ],
    checks: [
      {
        question: "Why does passive immunity not usually produce long-term immune memory?",
        answer: "The recipient receives antibodies rather than activating and cloning their own antigen-specific lymphocytes.",
      },
      {
        question: "How can a phagocyte help start an adaptive response?",
        answer: "It processes engulfed material and presents antigen fragments that contribute to activation of specific T lymphocytes.",
      },
    ],
  },
  {
    slug: "mendelian-inheritance-and-crosses",
    category: "MDCAT",
    topic: "Inheritance",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "16 min read",
    title: "Mendelian inheritance: from meiosis to reliable genetic crosses",
    description:
      "Build genetic ratios from chromosome behaviour instead of memorising 3:1 and 9:3:3:1 as isolated formulas.",
    accent: "green",
    objectives: [
      "Connect segregation and independent assortment with meiosis.",
      "Construct mono- and dihybrid crosses systematically.",
      "Recognise when linkage, codominance or sex linkage changes simple expectations.",
    ],
    sections: [
      {
        heading: "An allele is a version of a gene",
        paragraphs: [
          "Diploid organisms usually carry two alleles of a gene, one on each homologous chromosome. A homozygote carries identical alleles; a heterozygote carries different alleles. Genotype describes the allele combination, while phenotype is the observable outcome produced by genotype in an environment.",
          "Dominant does not mean common, stronger or better. It means that one copy produces the defined phenotype in a heterozygote. A recessive phenotype appears when no dominant allele is present under the conditions being considered.",
        ],
      },
      {
        heading: "Segregation is chromosome behaviour",
        paragraphs: [
          "During meiosis I, homologous chromosomes separate. Because alleles of one gene occupy corresponding loci on a homologous pair, the two alleles segregate into different gametes. A heterozygote Aa therefore produces A and a gametes in approximately equal proportions when segregation is normal.",
          "Fertilisation randomly combines gametes. A Punnett square does not cause a ratio; it displays the probabilities created by meiosis and random fertilisation.",
        ],
        diagram: {
          title: "From genotype to offspring probability",
          kind: "flow",
          items: [
            { label: "Parental genotype", detail: "Identify alleles carried by each parent." },
            { label: "Meiosis", detail: "Separate alleles into valid gametes." },
            { label: "Fertilisation", detail: "Combine one gamete from each parent." },
            { label: "Classify offspring", detail: "Count genotype or phenotype outcomes." },
          ],
          caption: "Always list gametes before drawing a square; most errors begin with an impossible gamete.",
        },
      },
      {
        heading: "Monohybrid ratios depend on the question",
        paragraphs: [
          "For Aa × Aa with complete dominance, genotypes occur in a 1 AA : 2 Aa : 1 aa ratio, while phenotypes occur in a 3 dominant : 1 recessive ratio. The two ratios answer different questions and should never be interchanged.",
          "A test cross pairs an individual showing a dominant phenotype with a homozygous recessive partner. If recessive offspring appear, the unknown parent must carry the recessive allele.",
        ],
        table: {
          caption: "Common single-gene crosses",
          headers: ["Cross", "Genotype outcome", "Phenotype outcome"],
          rows: [
            ["AA × aa", "All Aa", "All dominant"],
            ["Aa × Aa", "1 AA : 2 Aa : 1 aa", "3 dominant : 1 recessive"],
            ["Aa × aa", "1 Aa : 1 aa", "1 dominant : 1 recessive"],
          ],
        },
      },
      {
        heading: "Dihybrid crosses are two probability problems",
        paragraphs: [
          "If two genes assort independently, a double heterozygote AaBb forms AB, Ab, aB and ab gametes in equal proportions. The classic AaBb × AaBb phenotypic ratio is 9:3:3:1 only when both genes show complete dominance, assort independently and offspring classes have equal survival.",
          "The product rule is often faster than a sixteen-box square. For example, the probability of aa and B_ can be calculated as P(aa) × P(B_), provided the genes assort independently.",
        ],
        callout: "Never use 9:3:3:1 automatically. First verify dominance, independent assortment and the parental cross.",
      },
      {
        heading: "When simple Mendelian ratios change",
        paragraphs: [
          "Incomplete dominance produces an intermediate heterozygous phenotype, so the phenotypic ratio of a heterozygote cross may match the 1:2:1 genotype ratio. In codominance, both alleles are detectably expressed, as in the AB blood group.",
          "Linked genes occupy the same chromosome and may not assort independently. Crossing over can create recombinant gametes, but parental combinations are often more frequent when loci are close. Sex-linked genes also require attention to which sex carries one or two copies of the relevant chromosome.",
        ],
        diagram: {
          title: "Before choosing a genetic ratio",
          kind: "compare",
          items: [
            { label: "Complete dominance", detail: "Heterozygote resembles one homozygote." },
            { label: "Incomplete dominance", detail: "Heterozygote is intermediate." },
            { label: "Codominance", detail: "Both allele products are expressed." },
            { label: "Linkage", detail: "Genes may not assort independently." },
          ],
          caption: "Ratios emerge from inheritance conditions; they are not universal laws attached to every two-letter cross.",
        },
      },
    ],
    recap: [
      "Segregation reflects separation of homologous chromosomes.",
      "Genotype and phenotype ratios answer different questions.",
      "Dihybrid probabilities can be multiplied only when events are independent.",
      "Dominance pattern, linkage and sex linkage can change expected ratios.",
    ],
    checks: [
      {
        question: "Why does Aa × Aa produce a 1:2:1 genotype ratio but a 3:1 phenotype ratio under complete dominance?",
        answer: "AA and Aa are different genotypes but share the dominant phenotype, so their probabilities combine into the phenotypic class.",
      },
      {
        question: "What evidence in offspring suggests that two genes are linked?",
        answer: "Parental allele combinations occur more often than recombinant combinations, deviating from independent-assortment expectations.",
      },
    ],
  },
  {
    slug: "biotechnology-vaccines-diagnosis-gene-therapy",
    category: "MDCAT",
    topic: "Biotechnology",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "17 min read",
    title: "Biotechnology in medicine: vaccines, diagnostics and gene therapy",
    description:
      "A connected guide to recombinant products, monoclonal antibodies, nucleic-acid probes and therapeutic gene delivery.",
    accent: "sage",
    objectives: [
      "Explain how cloned genes produce antigens and therapeutic proteins.",
      "Compare monoclonal-antibody and nucleic-acid-probe diagnostics.",
      "Distinguish ex vivo from in vivo gene therapy and their vector challenges.",
    ],
    sections: [
      {
        heading: "Biotechnology uses living systems deliberately",
        paragraphs: [
          "Biotechnology applies organisms, cells, enzymes or genetic material to create useful products and processes. Modern medical biotechnology can isolate a single antigen, detect a particular molecule or DNA sequence, mass-produce a human protein, or deliver a functional gene to selected cells.",
          "The common logic is specificity. A chosen gene, antibody or probe is matched to a defined biological target, allowing safer vaccines, precise tests and therapies aimed at a molecular cause.",
        ],
      },
      {
        heading: "Recombinant DNA turns cells into protein factories",
        paragraphs: [
          "A gene encoding a desired protein is isolated or synthesized, inserted into a vector such as a plasmid, and introduced into a host cell. Selectable markers help identify transformed cells, which are cloned and grown. Gene expression produces the protein, which must then be purified and tested.",
          "Bacteria can produce proteins such as human insulin, but complex human proteins may require eukaryotic cells for correct folding and post-translational modification. Yeast, cultured mammalian cells or transgenic animals may therefore be used for particular products.",
        ],
        diagram: {
          title: "A recombinant-protein workflow",
          kind: "flow",
          items: [
            { label: "Select gene", detail: "Choose the coding sequence for the product." },
            { label: "Build vector", detail: "Join the gene to regulatory DNA in a carrier." },
            { label: "Transform host", detail: "Introduce recombinant DNA into suitable cells." },
            { label: "Select and grow", detail: "Clone productive cells in controlled culture." },
            { label: "Purify product", detail: "Separate and verify the therapeutic protein." },
          ],
          caption: "Producing the protein is only part of the process; purity, activity and safety must also be established.",
        },
      },
      {
        heading: "Vaccines can use selected antigens",
        paragraphs: [
          "Traditional vaccines may use weakened or inactivated organisms, while biotechnology can focus on selected antigenic components. A gene encoding an antigen can be expressed in yeast or another host, producing a recombinant subunit vaccine without growing the complete pathogen in the final product.",
          "Peptide vaccines use selected antigen fragments, while newer platforms can deliver genetic instructions that cause host cells to make an antigen temporarily. Every platform must balance safety, stability, the strength and duration of immunity, and practical manufacturing.",
        ],
        callout: "An antigen is the immune target; an antibody is one product of the immune response. They are not interchangeable terms.",
      },
      {
        heading: "Monoclonal antibodies are identical targeting tools",
        paragraphs: [
          "A monoclonal antibody preparation contains antibodies with the same specificity. Classical hybridoma production fuses an antibody-producing B lymphocyte with an immortal myeloma cell, creating a hybrid cell that can divide repeatedly while producing the desired antibody.",
          "Monoclonal antibodies can detect hormones, microbial antigens or tumour markers. A pregnancy test, for example, uses antibodies that bind hCG. The signal depends on highly specific antigen–antibody interaction rather than on the antibody directly changing the patient's condition.",
        ],
        table: {
          caption: "Two molecular diagnostic strategies",
          headers: ["Tool", "Detects", "Recognition principle"],
          rows: [
            ["Monoclonal antibody", "A specific antigen or other molecule", "Three-dimensional epitope binding"],
            ["DNA/RNA probe", "A complementary nucleic-acid sequence", "Base-pair hybridisation"],
          ],
        },
      },
      {
        heading: "Nucleic-acid probes find complementary sequences",
        paragraphs: [
          "A probe is a labelled single-stranded nucleic-acid sequence designed to pair with a target. Sample nucleic acid is made accessible and single-stranded, the probe is allowed to hybridise, unbound probe is washed away, and the retained label indicates that a complementary sequence was present.",
          "Probe specificity depends on sequence complementarity and hybridisation conditions. Modern amplification and sequencing methods extend this principle, but the central idea remains selective base pairing.",
        ],
      },
      {
        heading: "Gene therapy changes information inside cells",
        paragraphs: [
          "Gene therapy can add a functional gene, alter gene regulation or directly edit a sequence. In ex vivo therapy, cells are removed, genetically modified and tested before being returned. In vivo therapy delivers the vector directly to tissue inside the patient.",
          "Viral vectors are efficient because viruses naturally enter cells, but they must be redesigned for safety and can trigger immune responses. Non-viral systems such as lipid particles may be safer or easier to manufacture but can deliver less efficiently. Lasting benefit also depends on reaching enough appropriate cells and controlling gene expression.",
        ],
        diagram: {
          title: "Two delivery routes for gene therapy",
          kind: "compare",
          items: [
            { label: "Ex vivo", detail: "Remove cells → modify and test → return cells." },
            { label: "In vivo", detail: "Deliver the vector directly into the patient." },
            { label: "Shared challenge", detail: "Reach the right cells with safe, controlled expression." },
          ],
          caption: "The route changes the level of control, complexity and tissues that can be targeted.",
        },
      },
    ],
    recap: [
      "Recombinant hosts express selected genes to make useful proteins.",
      "Vaccines present antigens; antibodies recognise antigens.",
      "Monoclonal antibodies recognise molecules, while probes recognise complementary sequences.",
      "Gene therapy must solve delivery, specificity, expression and safety together.",
    ],
    checks: [
      {
        question: "Why might a therapeutic human protein be produced in a eukaryotic host rather than bacteria?",
        answer: "Some proteins require complex folding or post-translational modification that bacterial cells cannot perform correctly.",
      },
      {
        question: "What is the central difference between an antibody diagnostic and a DNA probe?",
        answer: "The antibody recognises a molecular epitope by shape and chemistry; the probe recognises a complementary nucleic-acid sequence by base pairing.",
      },
    ],
  },
  {
    slug: "digestion-and-absorption",
    category: "Learn Biology",
    topic: "Nutrition",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "Digestion and absorption: turning food into usable molecules",
    description:
      "Follow mechanical and chemical digestion through the alimentary canal, then connect villus structure with nutrient absorption.",
    accent: "ember",
    objectives: [
      "Distinguish ingestion, digestion, absorption, assimilation and egestion.",
      "Match digestive enzymes with substrates, products and locations.",
      "Explain how villi absorb sugars, amino acids, fatty acids and glycerol.",
    ],
    sections: [
      {
        heading: "Digestion solves a size and solubility problem",
        paragraphs: [
          "Food contains large biological molecules that cannot cross cell membranes or the gut epithelium efficiently. Mechanical digestion breaks food into smaller pieces and increases surface area, while chemical digestion hydrolyses polymers into small soluble units.",
          "Ingestion brings food into the body; digestion breaks it down; absorption moves products across the intestinal epithelium; assimilation incorporates absorbed molecules into cells and tissues; egestion removes undigested material. Keeping these processes separate prevents many definition errors.",
        ],
      },
      {
        heading: "The alimentary canal provides changing conditions",
        paragraphs: [
          "In the mouth, chewing mixes food with saliva. Salivary amylase begins starch hydrolysis under near-neutral conditions. The bolus moves by peristalsis through the oesophagus to the stomach.",
          "The stomach churns food and secretes hydrochloric acid, producing an acidic environment that helps denature proteins and supports pepsin activity. Mucus protects the stomach lining, and proteases begin substantial protein digestion.",
        ],
        diagram: {
          title: "The digestive route",
          kind: "flow",
          items: [
            { label: "Mouth", detail: "Chewing and the start of starch digestion." },
            { label: "Stomach", detail: "Acid, mixing and protein digestion." },
            { label: "Small intestine", detail: "Most chemical digestion and absorption." },
            { label: "Large intestine", detail: "Water and ion recovery; faeces formation." },
          ],
          caption: "Different regions specialise through structure, secretions, enzymes and transit time.",
        },
      },
      {
        heading: "Pancreatic enzymes and bile act in the small intestine",
        paragraphs: [
          "Pancreatic amylase continues starch digestion, proteases digest polypeptides, and pancreatic lipase hydrolyses triglycerides. Bicarbonate helps neutralise acidic chyme arriving from the stomach, creating conditions suitable for intestinal and pancreatic enzymes.",
          "Bile contains bile salts that emulsify fat into small droplets, increasing surface area for lipase. Bile is not an enzyme: it does not hydrolyse lipid bonds. It is produced by the liver and stored and concentrated in the gall bladder.",
        ],
        table: {
          caption: "Major digestive conversions",
          headers: ["Substrate", "Enzyme group", "Absorbable product"],
          rows: [
            ["Starch", "Amylases then disaccharidases", "Monosaccharides"],
            ["Proteins", "Proteases and peptidases", "Amino acids"],
            ["Triglycerides", "Lipases", "Fatty acids and monoglycerides/glycerol"],
            ["Nucleic acids", "Nucleases and related enzymes", "Nucleotides/components"],
          ],
        },
      },
      {
        heading: "Villi are built for rapid absorption",
        paragraphs: [
          "The small intestine has folds, villi and microvilli that create a very large surface area. Each villus has a thin epithelium, a capillary network and a central lacteal. Rich blood flow maintains concentration gradients for many absorbed nutrients.",
          "Glucose and amino acids enter epithelial cells through transport proteins, including sodium-linked co-transport, and then pass into capillaries. Products of lipid digestion enter epithelial cells, are rebuilt into triglycerides and packaged into particles that move into lacteals before joining the bloodstream through lymph.",
        ],
        diagram: {
          title: "Two routes out of an intestinal villus",
          kind: "compare",
          items: [
            { label: "Blood capillaries", detail: "Monosaccharides, amino acids, water-soluble products." },
            { label: "Lacteal", detail: "Most packaged lipid products enter lymph first." },
            { label: "Thin epithelium", detail: "Short diffusion and transport distance." },
            { label: "Large surface", detail: "Folds, villi and microvilli increase uptake." },
          ],
          caption: "Villus structure supports both rapid exchange and different transport routes for water-soluble and lipid products.",
        },
      },
      {
        heading: "Absorption is not the end of the story",
        paragraphs: [
          "Absorbed nutrients reach tissues and are assimilated. Amino acids may build proteins, glucose may be respired or stored as glycogen, and lipids may form membranes, hormones or energy stores. The liver helps regulate and process many absorbed substances carried in hepatic portal blood.",
          "The large intestine absorbs much of the remaining water and ions. Gut microbes metabolise some undigested material and produce compounds that can be absorbed. Egestion removes material that never entered the body's internal tissues.",
        ],
      },
    ],
    recap: [
      "Mechanical digestion increases surface area; chemical digestion hydrolyses molecules.",
      "Bile emulsifies fats but does not enzymatically digest them.",
      "Villi combine large area, thin barriers and good transport routes.",
      "Absorption enters the body; assimilation uses the absorbed material.",
    ],
    checks: [
      {
        question: "Why does emulsification increase lipid-digestion rate without breaking triglyceride bonds?",
        answer: "It divides fat into smaller droplets, increasing the surface area available for lipase action.",
      },
      {
        question: "Why do most lipid products enter lacteals rather than blood capillaries directly?",
        answer: "They are reassembled and packaged into particles that are too large for ordinary capillary entry and therefore move through lymphatic lacteals.",
      },
    ],
  },
  {
    slug: "biological-molecules-structure-and-function",
    category: "Learn Biology",
    topic: "Biological molecules",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "16 min read",
    title: "Biological molecules: how structure determines function",
    description:
      "Connect water, carbohydrates, lipids and proteins to the chemical features that make their biological roles possible.",
    accent: "green",
    objectives: [
      "Explain why water's polarity and hydrogen bonding matter to life.",
      "Compare carbohydrate and lipid structures with their storage roles.",
      "Relate levels of protein structure to biological function and denaturation.",
    ],
    sections: [
      {
        heading: "Water is chemically simple but biologically exceptional",
        paragraphs: [
          "Oxygen attracts shared electrons more strongly than hydrogen, making water polar. The partially negative oxygen of one molecule attracts the partially positive hydrogen of another, forming hydrogen bonds. Each bond is weak, but large networks produce important collective properties.",
          "Water is an effective solvent for ions and polar molecules, supports transport and reaction chemistry, and has a high specific heat capacity that resists rapid temperature change. Cohesion contributes to continuous water columns in plants, while the high latent heat of vaporisation makes sweating and transpiration effective cooling processes.",
        ],
        diagram: {
          title: "From molecular property to biological role",
          kind: "flow",
          items: [
            { label: "Polarity", detail: "Unequal charge distribution." },
            { label: "Hydrogen bonds", detail: "Water molecules attract one another." },
            { label: "Emergent properties", detail: "Cohesion, heat capacity and solvent action." },
            { label: "Biological roles", detail: "Transport, temperature stability and metabolism." },
          ],
          caption: "Macroscopic properties of water emerge from interactions among many polar molecules.",
        },
      },
      {
        heading: "Carbohydrates combine energy and architecture",
        paragraphs: [
          "Monosaccharides such as glucose are small units that can be joined by glycosidic bonds through condensation reactions. Hydrolysis breaks those bonds by adding water. Disaccharides contain two monosaccharides, while polysaccharides contain long chains.",
          "Starch and glycogen are compact energy stores built from alpha-glucose. Branching creates many ends for rapid enzyme action, especially in glycogen. Cellulose is built from beta-glucose in straight chains that hydrogen-bond into strong microfibrils, making it suitable for plant cell walls rather than energy storage in humans.",
        ],
        table: {
          caption: "Polysaccharides compared",
          headers: ["Molecule", "Building unit and shape", "Main role"],
          rows: [
            ["Starch", "Alpha-glucose; amylose and branched amylopectin", "Plant energy storage"],
            ["Glycogen", "Highly branched alpha-glucose polymer", "Animal and fungal energy storage"],
            ["Cellulose", "Straight beta-glucose chains in microfibrils", "Plant cell-wall strength"],
          ],
        },
      },
      {
        heading: "Lipids store energy without attracting much water",
        paragraphs: [
          "A triglyceride forms when glycerol joins three fatty acids by ester bonds. Long hydrocarbon regions make the molecule largely hydrophobic. Lipids therefore store energy compactly without binding large amounts of water and yield substantial energy when oxidised.",
          "Saturated fatty acids lack carbon–carbon double bonds; unsaturated fatty acids contain one or more. Cis double bonds introduce bends that reduce packing and often lower melting point. Phospholipids replace one fatty acid with a phosphate-containing polar head, creating the amphipathic molecules that self-assemble into membranes.",
        ],
      },
      {
        heading: "Protein function depends on three-dimensional shape",
        paragraphs: [
          "Amino acids join through peptide bonds to form polypeptides. The primary structure is the amino-acid sequence. Local hydrogen bonding creates alpha helices and beta sheets; interactions among side chains create tertiary structure; and some proteins assemble multiple polypeptide subunits into quaternary structure.",
          "A change in primary sequence can alter folding, stability or an active site. Heat, extreme pH or chemicals can disrupt weak interactions and denature a protein. Denaturation changes higher-level structure and function but does not usually hydrolyse every peptide bond.",
        ],
        diagram: {
          title: "Levels of protein organisation",
          kind: "flow",
          items: [
            { label: "Primary", detail: "Amino-acid sequence." },
            { label: "Secondary", detail: "Local helices and sheets." },
            { label: "Tertiary", detail: "Overall three-dimensional folding." },
            { label: "Quaternary", detail: "Assembly of multiple polypeptide subunits." },
          ],
          caption: "Information flows from sequence to folding to function; disruption at one level can affect everything above it.",
        },
      },
      {
        heading: "Food tests reveal chemical groups",
        paragraphs: [
          "Benedict's reagent tests for reducing sugars after heating, iodine solution tests for starch, the Biuret test detects peptide bonds, and the ethanol-emulsion test reveals lipids through a cloudy suspension. Each test requires a control and a clear statement of the positive result.",
          "A colour change is evidence for a chemical feature, not proof that every molecule in a broad category is present. For example, a positive Biuret test detects peptide bonds but does not identify a particular protein.",
        ],
      },
    ],
    recap: [
      "Water's polarity and hydrogen bonding produce its life-supporting properties.",
      "Small differences in glucose bonding distinguish storage polysaccharides from cellulose.",
      "Hydrophobicity makes triglycerides compact stores and phospholipids membrane-formers.",
      "Protein sequence guides folding, and folding enables function.",
    ],
    checks: [
      {
        question: "Why is glycogen well suited to rapid glucose release?",
        answer: "Its extensive branching creates many terminal points where enzymes can add or remove glucose units simultaneously.",
      },
      {
        question: "Why does denaturation not necessarily destroy the primary structure?",
        answer: "It usually disrupts weak interactions responsible for secondary, tertiary or quaternary folding without hydrolysing the covalent peptide backbone.",
      },
    ],
  },
  {
    slug: "human-reproduction-and-hormonal-control",
    category: "MDCAT",
    topic: "Reproduction",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "15 min read",
    title: "Human reproduction: gametes, cycles and hormonal control",
    description:
      "Connect reproductive anatomy with gamete production, menstrual-cycle feedback, fertilisation and early development.",
    accent: "sage",
    objectives: [
      "Compare spermatogenesis and oogenesis.",
      "Explain FSH, LH, oestrogen and progesterone across the ovarian cycle.",
      "Trace fertilisation, implantation and early hormonal support.",
    ],
    sections: [
      {
        heading: "Reproductive systems produce and deliver gametes",
        paragraphs: [
          "Testes contain seminiferous tubules where sperm develop, supported by Sertoli cells. Leydig cells between tubules produce testosterone. Sperm mature and are stored in the epididymis, travel through the vas deferens and join glandular secretions that form semen.",
          "Ovaries contain follicles with developing oocytes. Oviducts transport the ovulated secondary oocyte and are the usual site of fertilisation. The uterus supports implantation and development; its endometrium changes cyclically under ovarian hormones.",
        ],
        table: {
          caption: "Spermatogenesis and oogenesis compared",
          headers: ["Feature", "Spermatogenesis", "Oogenesis"],
          rows: [
            ["Location", "Seminiferous tubules", "Ovarian follicles"],
            ["Cytokinesis", "Roughly equal", "Unequal; polar bodies form"],
            ["Products per primary cell", "Four functional sperm", "One large ovum lineage"],
            ["Pattern after puberty", "Continuous production", "Cyclic maturation of a limited pool"],
          ],
        },
      },
      {
        heading: "The ovarian and uterine cycles are coordinated",
        paragraphs: [
          "Early in the cycle, FSH supports follicle growth. Developing follicles release oestrogen, which promotes repair and thickening of the endometrium. At moderate levels, oestrogen contributes to feedback that limits FSH and helps favour one dominant follicle.",
          "Sustained high oestrogen near mid-cycle produces positive feedback and an LH surge. LH triggers ovulation and transformation of the ruptured follicle into the corpus luteum.",
        ],
        diagram: {
          title: "Hormonal sequence across the ovarian cycle",
          kind: "flow",
          items: [
            { label: "FSH rises", detail: "Follicles grow and release oestrogen." },
            { label: "Oestrogen rises", detail: "Endometrium proliferates." },
            { label: "LH surge", detail: "High oestrogen triggers ovulation." },
            { label: "Corpus luteum", detail: "Progesterone supports the endometrium." },
            { label: "Hormones fall", detail: "Without pregnancy, menstruation begins." },
          ],
          caption: "Feedback changes with hormone concentration and cycle stage; oestrogen is not always simply inhibitory.",
        },
      },
      {
        heading: "Progesterone stabilises the post-ovulation uterus",
        paragraphs: [
          "The corpus luteum secretes progesterone and some oestrogen. Progesterone maintains a thick, secretory endometrium and suppresses additional FSH and LH release, reducing the chance of another ovulation during the same cycle.",
          "If implantation does not occur, the corpus luteum degenerates, ovarian hormone levels fall, spiral arteries constrict and the functional endometrial layer is shed. Falling inhibition also allows FSH to begin rising for the next cycle.",
        ],
      },
      {
        heading: "Fertilisation combines genomes and activates development",
        paragraphs: [
          "Capacitated sperm reach the oocyte in the oviduct. Enzymes released during the acrosome reaction help sperm penetrate surrounding layers. Fusion triggers changes that reduce polyspermy, and the secondary oocyte completes meiosis II.",
          "Male and female pronuclei contribute haploid chromosome sets to the diploid zygote. Cleavage divisions produce a morula and then a blastocyst, which reaches the uterus and implants in the endometrium.",
        ],
        diagram: {
          title: "From fertilisation to implantation",
          kind: "flow",
          items: [
            { label: "Fertilisation", detail: "Gamete membranes and genomes unite." },
            { label: "Cleavage", detail: "Rapid mitoses increase cell number." },
            { label: "Morula", detail: "A compact cell ball forms." },
            { label: "Blastocyst", detail: "Inner cell mass and outer layer appear." },
            { label: "Implantation", detail: "The blastocyst embeds in endometrium." },
          ],
          caption: "Early cleavage increases cell number without a corresponding large increase in total embryo size.",
        },
      },
      {
        heading: "Early pregnancy preserves hormonal support",
        paragraphs: [
          "Cells associated with the early embryo secrete hCG, which maintains the corpus luteum. Progesterone therefore remains high and menstruation is prevented. Later, the placenta becomes a major source of hormones supporting pregnancy.",
          "The placenta allows exchange between maternal and fetal circulations without normally mixing the two blood supplies directly. Its large surface area, thin exchange barrier and blood flow support diffusion and transport of gases, nutrients and wastes.",
        ],
      },
    ],
    recap: [
      "Gamete production differs in timing, cytokinesis and number of functional products.",
      "FSH supports follicles; the LH surge triggers ovulation.",
      "Progesterone maintains the post-ovulation endometrium.",
      "hCG preserves the corpus luteum during early pregnancy.",
    ],
    checks: [
      {
        question: "Why can high oestrogen trigger an LH surge even though ovarian hormones often inhibit pituitary activity?",
        answer: "Near mid-cycle, sustained high oestrogen changes to positive feedback, strongly stimulating the pathway that produces the LH surge.",
      },
      {
        question: "What is the immediate hormonal consequence if no implantation occurs?",
        answer: "The corpus luteum degenerates, progesterone and oestrogen fall, and the supported endometrial state breaks down.",
      },
    ],
  },
  {
    slug: "o-level-diffusion-osmosis-active-transport",
    category: "Cambridge O Level",
    topic: "Movement in and out of cells",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "12 min read",
    title: "Diffusion, osmosis and active transport for Cambridge O Level",
    description:
      "A syllabus-focused guide to gradients, water movement and energy-dependent transport—with the comparisons exam answers need.",
    accent: "ember",
    objectives: [
      "Write precise definitions using net movement and gradients.",
      "Predict effects of solutions on plant and animal cells.",
      "Choose the correct transport mechanism from experimental evidence.",
    ],
    sections: [
      {
        heading: "Start every definition with net movement",
        paragraphs: [
          "Particles move randomly in all directions, even at equilibrium. Diffusion describes the net movement from a region of higher concentration to lower concentration. Net means that more particles move one way than the other; it does not mean movement occurs in only one direction.",
          "Osmosis is the net movement of water molecules from higher water potential to lower water potential through a partially permeable membrane. The membrane requirement and the fact that the moving substance is water must appear in a complete definition.",
        ],
        table: {
          caption: "The three mechanisms in exam language",
          headers: ["Mechanism", "What moves", "Direction", "Energy from respiration"],
          rows: [
            ["Diffusion", "Particles", "Down a concentration gradient", "Not required"],
            ["Osmosis", "Water", "Down a water-potential gradient through a selective membrane", "Not required"],
            ["Active transport", "Specific solutes", "Against a concentration gradient", "Required"],
          ],
        },
      },
      {
        heading: "Use evidence to predict osmosis",
        paragraphs: [
          "Compare the solution inside and outside the cell, then follow water from higher to lower water potential. In dilute external solution, an animal cell gains water and may burst; a plant cell becomes turgid because its wall resists expansion.",
          "In concentrated external solution, an animal cell loses water and shrivels. A plant cell becomes flaccid and may plasmolyse when the cell membrane pulls away from the wall. The cell wall itself does not prevent water loss.",
        ],
        diagram: {
          title: "Predicting the effect of an external solution",
          kind: "flow",
          items: [
            { label: "Compare", detail: "Which side has higher water potential?" },
            { label: "Follow water", detail: "State the direction of net movement." },
            { label: "Name the cell", detail: "Plant wall present or animal cell only?" },
            { label: "Predict", detail: "Turgid, flaccid, plasmolysed, swollen or shrivelled." },
          ],
          caption: "A complete answer links gradient, direction and observable consequence.",
        },
      },
      {
        heading: "Rate depends on gradient and exchange design",
        paragraphs: [
          "Diffusion becomes faster with a steeper concentration gradient, larger surface area, shorter distance and higher temperature. These principles explain the thin walls and large surfaces of alveoli, villi, root hairs and capillary networks.",
          "In experiments, rate must be measured rather than inferred vaguely. Suitable measures include change in mass per unit time, distance moved by a coloured boundary or volume exchanged over a fixed interval.",
        ],
      },
      {
        heading: "Active transport solves the uphill problem",
        paragraphs: [
          "Active transport uses energy released by respiration to move substances against their concentration gradient through membrane proteins. Root-hair cells can absorb mineral ions from dilute soil, and cells in the small intestine can maintain uptake mechanisms even when simple diffusion would not be sufficient.",
          "A common weak answer says active transport 'uses energy' but never states why. The full explanation connects energy to carrier activity and movement from lower to higher concentration.",
        ],
        callout: "Cambridge answers score through linked statements: against the gradient + carrier proteins + energy from respiration.",
      },
      {
        heading: "How to write the extended response",
        paragraphs: [
          "Begin with the observed change, state the gradient, name the movement and finish with the cellular consequence. For a potato cylinder that gains mass, for example: the external solution has a higher water potential, so water enters cells by osmosis through partially permeable membranes, increasing cell mass and turgor.",
          "Avoid saying that water moves because it 'wants to dilute the solution.' Molecules have no intention, and the phrase does not identify the gradient or membrane.",
        ],
      },
    ],
    recap: [
      "Diffusion and osmosis are net movements down gradients.",
      "Osmosis requires water and a partially permeable membrane.",
      "Active transport moves solutes against a gradient using energy from respiration.",
      "Strong answers connect evidence, direction, mechanism and consequence.",
    ],
    checks: [
      {
        question: "Why is 'water moves from dilute to concentrated solution' an incomplete osmosis definition?",
        answer: "It omits net movement, water potential and the requirement for a partially permeable membrane.",
      },
      {
        question: "What would happen to mineral-ion uptake if root-hair respiration were strongly inhibited?",
        answer: "Active transport would fall because less ATP would be available to power membrane transport proteins.",
      },
    ],
  },
  {
    slug: "o-level-practical-skills-food-tests",
    category: "Cambridge O Level",
    topic: "Practical skills",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "Cambridge practical Biology: food tests, variables and fair experiments",
    description:
      "Plan investigations, identify variables, use controls and report biological food tests with the precision practical papers reward.",
    accent: "green",
    objectives: [
      "Describe the procedure and positive result for four food tests.",
      "Identify independent, dependent and controlled variables.",
      "Improve reliability, accuracy and validity in an investigation.",
    ],
    sections: [
      {
        heading: "A practical answer is a chain of decisions",
        paragraphs: [
          "A strong experimental plan states what will be changed, what will be measured, what will be kept constant, how measurements will be repeated and how results will be processed. A list of apparatus without this logic does not demonstrate experimental control.",
          "The independent variable is deliberately changed. The dependent variable is measured as the outcome. Controlled variables are conditions kept consistent so that changes in the dependent variable can reasonably be attributed to the independent variable.",
        ],
        diagram: {
          title: "The anatomy of a fair investigation",
          kind: "flow",
          items: [
            { label: "Change one factor", detail: "Select the independent variable and range." },
            { label: "Measure a response", detail: "Define the dependent variable and units." },
            { label: "Control conditions", detail: "Keep other influential factors constant." },
            { label: "Repeat", detail: "Identify anomalies and calculate a mean." },
            { label: "Conclude", detail: "Describe the pattern supported by results." },
          ],
          caption: "Validity comes from isolating the variable; reliability improves through repeatable measurement.",
        },
      },
      {
        heading: "Know the complete food-test procedure",
        paragraphs: [
          "For reducing sugars, add Benedict's reagent and heat the mixture in a hot-water bath. A positive result changes from blue through green, yellow or orange to brick-red depending on concentration. For starch, add iodine solution; a positive result is blue-black.",
          "For protein, add Biuret reagent or the required alkaline copper reagents; a lilac or purple result indicates peptide bonds. For lipids, mix the sample with ethanol, shake, then add water; a milky-white emulsion is positive.",
        ],
        table: {
          caption: "Food tests at a glance",
          headers: ["Food group", "Reagent and treatment", "Positive result"],
          rows: [
            ["Reducing sugar", "Benedict's reagent; heat in water bath", "Green to brick-red precipitate"],
            ["Starch", "Iodine solution", "Blue-black"],
            ["Protein", "Biuret test", "Lilac/purple"],
            ["Lipid", "Ethanol then water", "Milky-white emulsion"],
          ],
        },
      },
      {
        heading: "Controls make interpretations meaningful",
        paragraphs: [
          "A negative control is treated in the same way but lacks the factor expected to produce the result. It shows whether the procedure itself creates a false positive. A positive control contains a known target and shows that the test system is capable of producing the expected result.",
          "Control variables are different from control setups. Keeping temperature constant is a controlled variable; running a tube without enzyme may be a negative control. Use the correct term for the role being described.",
        ],
        callout: "A control is useful only when you explain what comparison it makes possible.",
      },
      {
        heading: "Improve the measurement, not just the wording",
        paragraphs: [
          "Reliability improves through repeats, identification of anomalies and calculation of a mean. Accuracy improves with suitable calibrated equipment, finer scale divisions and procedures that reduce systematic error. Precision concerns how closely repeated measurements agree and the resolution used to record them.",
          "Vague suggestions such as 'be more careful' rarely earn credit. Name the instrument or procedural change: use a colorimeter instead of judging colour by eye, control temperature with a thermostatic water bath, or use identical tissue cylinders cut with the same cork borer.",
        ],
      },
      {
        heading: "Write conclusions at the strength of the evidence",
        paragraphs: [
          "Describe the pattern before explaining it. Include direction and, when available, data: as temperature increased from one value to another, rate increased to a maximum and then decreased. Then connect the pattern to biological reasoning.",
          "Do not claim that one experiment 'proves' a universal law. Results support or do not support a prediction under the tested conditions. Mention anomalies and limitations when they materially affect confidence.",
        ],
      },
    ],
    recap: [
      "A fair test changes one factor and controls other influential conditions.",
      "Food-test answers need reagent, treatment and positive observation.",
      "Repeats improve reliability; better instruments and procedures improve measurement quality.",
      "Conclusions should match the range and quality of the evidence.",
    ],
    checks: [
      {
        question: "Why is a water bath preferable to direct flame when heating Benedict's test?",
        answer: "It provides safer, more controlled heating and avoids exposing flammable or fragile apparatus directly to flame.",
      },
      {
        question: "How does a colorimeter improve an enzyme investigation?",
        answer: "It replaces subjective colour judgement with quantitative absorbance or transmission measurements.",
      },
    ],
  },
  {
    slug: "o-level-data-graphs-and-structured-answers",
    category: "Cambridge O Level",
    topic: "Exam technique",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "13 min read",
    title: "Cambridge Biology data questions: graphs, calculations and structured answers",
    description:
      "Turn tables and unfamiliar experiments into precise observations, calculations and biological explanations.",
    accent: "sage",
    objectives: [
      "Describe graph patterns without drifting into explanation.",
      "Calculate percentage change, rate and magnification reliably.",
      "Build linked explanation chains for structured questions.",
    ],
    sections: [
      {
        heading: "Observation and explanation are different jobs",
        paragraphs: [
          "When a question says describe, report what the data show: direction, shape, maximum or minimum, plateau, anomaly and relevant values. Do not explain why the pattern occurs unless asked. When it says explain, connect the pattern to a biological mechanism.",
          "A useful description often follows overview, detail, evidence: state the overall relationship, identify a change in pattern, then quote paired values with units. This is stronger than listing every point or writing only 'it increases.'",
        ],
        table: {
          caption: "Command words change the required response",
          headers: ["Command", "What to do"],
          rows: [
            ["State", "Give a concise answer without working or explanation"],
            ["Describe", "Report patterns or features visible in data"],
            ["Explain", "Give linked biological reasons"],
            ["Compare", "Use paired similarities and differences"],
            ["Suggest", "Apply biology to an unfamiliar situation"],
          ],
        },
      },
      {
        heading: "Read the axes before reading the story",
        paragraphs: [
          "Identify the independent variable on the x-axis, the dependent variable on the y-axis, units and scale intervals. Check whether the axis begins at zero and whether points represent discrete categories or continuous measurements.",
          "For a line graph, plot small accurate points, use the required best-fit line or smooth curve, and avoid forcing a curve through an anomalous value. For a bar chart, keep bars separate when categories are discontinuous.",
        ],
        diagram: {
          title: "The data-question workflow",
          kind: "flow",
          items: [
            { label: "Read", detail: "Variables, units, scale and legend." },
            { label: "Describe", detail: "Overall pattern, changes and anomaly." },
            { label: "Support", detail: "Quote paired values with units." },
            { label: "Explain", detail: "Link the pattern to a mechanism." },
            { label: "Evaluate", detail: "Consider repeats, range and limitations." },
          ],
          caption: "Separating these passes prevents mechanisms from replacing the observations the question asked for.",
        },
      },
      {
        heading: "Make calculations visible and unit-safe",
        paragraphs: [
          "Write the formula, substitute values, show working and give the final unit. Percentage change is (new − original) ÷ original × 100. Rate is change divided by time. Magnification is image size divided by actual size after converting both to the same units.",
          "Check whether a negative percentage is meaningful and whether the question asks for decrease as a positive percentage. Keep enough working figures to avoid rounding error, then round only the final answer to a sensible precision.",
        ],
        callout: "Unit conversion should happen before division. A correct formula with mismatched units still gives a wrong result.",
      },
      {
        heading: "Build explanations as linked steps",
        paragraphs: [
          "A high-quality explanation makes each consequence cause the next. For exercise and breathing rate: muscle contraction increases ATP demand; respiration rate rises; more carbon dioxide is produced; blood carbon dioxide and acidity change; receptors and the breathing centre increase ventilation.",
          "Avoid jumping from stimulus directly to final response. Middle links are often where marks sit. Use biological nouns and verbs: enzyme–substrate collisions increase, stomata close, diffusion gradient becomes steeper, or water potential decreases.",
        ],
      },
      {
        heading: "Evaluate without writing generic criticism",
        paragraphs: [
          "Identify a specific limitation, explain how it could affect results, and propose a matching improvement. If temperature varied, enzyme activity may have changed; use a thermostatically controlled water bath. If colour was judged by eye, readings may be subjective; use a colorimeter.",
          "A larger sample improves confidence only when sampling is representative and the method is consistent. More repeats cannot repair a systematic bias, so improvement must address the actual weakness.",
        ],
      },
    ],
    recap: [
      "Describe data first; explain mechanisms only when requested.",
      "Use variables, units and paired values to support patterns.",
      "Show formulas and convert units before calculating.",
      "Match every evaluation point with a relevant improvement.",
    ],
    checks: [
      {
        question: "What is missing from the description 'the rate increased'?",
        answer: "It lacks the range, shape, any change or plateau, and numerical evidence with units.",
      },
      {
        question: "Why do repeated measurements not remove a systematic error?",
        answer: "A systematic error shifts measurements consistently in the same direction, so repeating the same biased method reproduces the bias.",
      },
    ],
  },
  {
    slug: "evolution-lamarck-darwin-natural-selection",
    category: "MDCAT",
    topic: "Evolution",
    date: "August 26, 2026",
    dateISO: "2026-08-26",
    readTime: "14 min read",
    title: "Evolution explained: Lamarck, Darwin and natural selection",
    description:
      "Separate historical explanations from modern evolutionary reasoning and follow how heritable variation changes populations.",
    accent: "ember",
    objectives: [
      "Distinguish Lamarck's mechanism from Darwin's natural selection.",
      "Explain variation, selection pressure and differential reproduction.",
      "Connect evidence from fossils, homology, biogeography and molecular data.",
    ],
    sections: [
      {
        heading: "Evolution describes population change across generations",
        paragraphs: [
          "Biological evolution is change in the inherited characteristics of populations over generations. Individuals develop and respond during their lifetimes, but populations evolve because the frequencies of heritable variants change.",
          "Natural selection is one mechanism of evolution. Mutation, genetic drift and gene flow also change allele frequencies, so evolution should not be reduced to the statement that organisms simply become 'better.' Fitness is relative to an environment and measured through reproductive contribution.",
        ],
      },
      {
        heading: "Lamarck proposed use, disuse and acquired inheritance",
        paragraphs: [
          "Lamarck argued that structures used frequently became stronger, structures not used deteriorated, and characteristics acquired during life could be inherited. His explanation was historically important because it treated species as changeable rather than fixed.",
          "The central inheritance mechanism is not supported as a general explanation of adaptation. Changes such as enlarged muscles acquired through exercise do not rewrite germ-line alleles in a way that offspring inherit as the same developed trait.",
        ],
        table: {
          caption: "Lamarck and Darwin compared",
          headers: ["Question", "Lamarckian explanation", "Darwinian explanation"],
          rows: [
            ["Source of useful trait", "Need and use alter the individual", "Heritable variation already exists or arises"],
            ["What is inherited", "Acquired characteristics", "Inherited variants affecting phenotype"],
            ["Where change is observed", "Individual during life", "Population across generations"],
          ],
        },
      },
      {
        heading: "Natural selection requires four connected conditions",
        paragraphs: [
          "Individuals vary, and at least some variation is heritable. More offspring are produced than can all survive and reproduce, creating competition under environmental limits. Individuals with variants that improve reproductive success in those conditions contribute more alleles to the next generation.",
          "Over many generations, advantageous heritable variants become more common. The environment does not create the needed mutation on demand; it filters existing and newly arising variation.",
        ],
        diagram: {
          title: "The logic of natural selection",
          kind: "cycle",
          items: [
            { label: "Variation", detail: "Individuals differ in heritable traits." },
            { label: "Selection pressure", detail: "The environment affects survival and reproduction." },
            { label: "Differential reproduction", detail: "Some variants leave more offspring." },
            { label: "Frequency change", detail: "Associated alleles become more common." },
          ],
          caption: "Natural selection acts on phenotypes, while evolution is measured as inherited change in populations.",
        },
      },
      {
        heading: "Adaptation is environment-specific",
        paragraphs: [
          "A trait is adaptive when it increases reproductive success in a particular environment. The same trait may be neutral or harmful elsewhere. Antibiotic resistance, for example, can be strongly favoured when an antibiotic is present but may carry a cost when it is absent.",
          "Resistance does not appear because bacteria consciously need it. Resistant variants may already exist through mutation or acquire resistance genes. Antibiotic exposure removes susceptible competitors, allowing resistant cells to contribute disproportionately to later generations.",
        ],
        callout: "Selection changes the frequency of variants; it does not give an individual the trait it needs.",
      },
      {
        heading: "Multiple evidence lines support common descent",
        paragraphs: [
          "Fossils document organisms from different times and transitional combinations of features. Homologous structures share an underlying plan because of common ancestry even when their current functions differ. Vestigial features are reduced remnants inherited from ancestors.",
          "Biogeography explains why related species cluster geographically, while molecular comparisons reveal nested similarities in DNA and proteins. No single observation stands alone; independent evidence lines converge on branching descent with modification.",
        ],
        diagram: {
          title: "Evidence for evolutionary relationships",
          kind: "compare",
          items: [
            { label: "Fossils", detail: "Time-ordered records and transitional combinations." },
            { label: "Anatomy", detail: "Homology and vestigial structures." },
            { label: "Biogeography", detail: "Geographic patterns of related organisms." },
            { label: "Molecules", detail: "Shared DNA and protein sequences." },
          ],
          caption: "Converging evidence is stronger than any one line considered in isolation.",
        },
      },
    ],
    recap: [
      "Populations evolve; individuals are selected within a generation.",
      "Lamarck proposed acquired inheritance, while Darwin emphasised selection of heritable variation.",
      "Natural selection changes variant frequencies through differential reproduction.",
      "Fossil, anatomical, geographic and molecular evidence support common descent.",
    ],
    checks: [
      {
        question: "Why is antibiotic resistance not evidence that bacteria mutate because they need to survive?",
        answer: "Variation arises independently of need; antibiotic exposure selects resistant variants that already exist or were acquired.",
      },
      {
        question: "What is the difference between homologous and analogous structures?",
        answer: "Homologous structures share underlying ancestry even if functions differ; analogous structures perform similar functions but evolved independently.",
      },
    ],
  },
];
