/**
 * BIOLOGY WITH HAMZA — CONTENT CONTROL CENTRE
 *
 * Routine manual edits belong here:
 * - social, community, course and resource links
 * - featured YouTube lessons and thumbnails
 *
 * Full article text lives in app/article-data.ts.
 */

export { articles } from "./article-data";
export type {
  Article,
  ArticleCategory,
  ArticleDiagram,
  ArticleSection,
  ArticleTable,
} from "./article-data";

export const links = {
  youtube: "https://www.youtube.com/@m.hamzaramzan1283",
  instagram: "https://www.instagram.com/myn_hamza/",
  whatsapp: "https://whatsapp.com/channel/0029VbAg97M1SWt5n2tay62T",
  playlist:
    "https://www.youtube.com/playlist?list=PLJLQEJg76nB294C325iL0RnFRDZWk5f-z",
  studentDrive:
    "https://drive.google.com/drive/folders/1EAxaYkqS2Ud3uDQhsgF_9Cz-3koChQKg?usp=sharing",
  nearpeerProfile: "https://nearpeer.org/html/hamza-ramzan-profile",
  nearpeerCourse:
    "https://nearpeer.org/entry-test-preparation/self-study-courses/mdcat-biology-sir-hamza-ramzan",
  linkedin: "https://pk.linkedin.com/in/hamza-ramzan-1314a0111",
};

export const videos = [
  {
    title: "MDCAT 2026 — Lec 1: Acellular Life",
    label: "Acellular life · Lecture 01",
    href: "https://www.youtube.com/watch?v=ICuzNJw6U48&list=PLJLQEJg76nB294C325iL0RnFRDZWk5f-z&index=45",
    image: "/video-acellular-life.svg",
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
