export type ResourceGroup = "Foundations" | "Human physiology" | "Genetics & continuity" | "Disease & biotechnology";

export type StudentResource = {
  title: string;
  group: ResourceGroup;
  format: string;
  description: string;
  keywords: string[];
};

export const studentResources: StudentResource[] = [
  { title: "Acellular Life", group: "Disease & biotechnology", format: "Lecture notes", description: "Viruses, replication strategies, bacteriophages and medically important acellular agents.", keywords: ["virus", "HIV", "phage"] },
  { title: "Biological Molecules", group: "Foundations", format: "Lecture notes", description: "Water, carbohydrates, lipids, proteins and the structure–function logic behind them.", keywords: ["protein", "lipid", "carbohydrate"] },
  { title: "Cell Structure & Function", group: "Foundations", format: "Lecture notes", description: "Organelles, membranes, transport and how a cell operates as one coordinated system.", keywords: ["cell", "organelle", "membrane"] },
  { title: "Enzymes", group: "Foundations", format: "Lecture notes", description: "Activation energy, specificity, rate factors and reversible enzyme inhibition.", keywords: ["enzyme", "inhibition", "active site"] },
  { title: "Bioenergetics & Respiration", group: "Foundations", format: "Lecture notes", description: "Glycolysis, aerobic respiration, electron transport and ATP generation.", keywords: ["ATP", "respiration", "glycolysis"] },
  { title: "Digestion & Absorption", group: "Human physiology", format: "Lecture notes", description: "The alimentary canal, digestive enzymes, absorption and assimilation of nutrients.", keywords: ["digestion", "villus", "nutrition"] },
  { title: "Circulation", group: "Human physiology", format: "Lecture notes", description: "Heart structure, cardiac cycle, blood vessels, blood and tissue exchange.", keywords: ["heart", "blood", "cardiac"] },
  { title: "Respiratory System", group: "Human physiology", format: "Lecture notes", description: "Ventilation, gaseous exchange, oxygen transport and control of breathing.", keywords: ["lungs", "gas exchange", "haemoglobin"] },
  { title: "Homeostasis", group: "Human physiology", format: "Lecture notes", description: "Negative feedback, osmoregulation, thermoregulation and excretion.", keywords: ["kidney", "feedback", "osmoregulation"] },
  { title: "Coordination & Control", group: "Human physiology", format: "Lecture notes", description: "Nerve impulses, synapses, receptors, the brain and hormonal coordination.", keywords: ["neuron", "synapse", "hormone"] },
  { title: "Support & Movement", group: "Human physiology", format: "Lecture notes", description: "Skeleton, joints, muscle structure and the sliding-filament mechanism.", keywords: ["muscle", "bone", "sarcomere"] },
  { title: "Immunity", group: "Disease & biotechnology", format: "Lecture notes", description: "Innate defence, adaptive responses, antibodies, vaccination and immune memory.", keywords: ["antibody", "vaccine", "lymphocyte"] },
  { title: "Reproduction", group: "Genetics & continuity", format: "Lecture notes", description: "Human reproductive systems, gametogenesis, cycles, fertilisation and development.", keywords: ["gamete", "fertilisation", "menstrual cycle"] },
  { title: "Inheritance", group: "Genetics & continuity", format: "Lecture notes", description: "Meiosis, Mendelian crosses, linkage, variation and genetic reasoning.", keywords: ["genetics", "meiosis", "cross"] },
  { title: "Evolution", group: "Genetics & continuity", format: "Lecture notes", description: "Lamarck, Darwin, natural selection, evidence and population change.", keywords: ["Darwin", "selection", "variation"] },
  { title: "Biotechnology", group: "Disease & biotechnology", format: "Lecture notes", description: "Recombinant DNA, diagnostics, monoclonal antibodies and gene therapy.", keywords: ["DNA", "PCR", "gene therapy"] },
  { title: "Cambridge Practical Skills", group: "Foundations", format: "Exam guide", description: "Variables, controls, food tests, measurements, graphs and evaluation of methods.", keywords: ["practical", "ATP", "variables"] },
  { title: "Cambridge Data Handling", group: "Foundations", format: "Exam guide", description: "Reading tables, plotting graphs, calculating rates and explaining biological patterns.", keywords: ["graph", "calculation", "data"] },
  { title: "MDCAT MCQ Reasoning", group: "Foundations", format: "Exam guide", description: "A practical method for identifying the tested concept and eliminating distractors.", keywords: ["MCQ", "exam", "reasoning"] },
];

export const resourceGroups: Array<"All resources" | ResourceGroup> = [
  "All resources",
  "Foundations",
  "Human physiology",
  "Genetics & continuity",
  "Disease & biotechnology",
];
