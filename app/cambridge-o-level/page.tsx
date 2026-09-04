import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ArticleCard, Footer, Header, PageIntro } from "../components";
import { articles, links } from "../content";
import { CambridgeTopicExplorer } from "./topic-explorer";

export const metadata: Metadata = {
  title: "Cambridge O Level Biology 5090",
  description:
    "A syllabus-led Cambridge O Level Biology 5090 study route covering concepts, practical skills, data handling and structured-answer technique.",
  alternates: { canonical: "/cambridge-o-level" },
  openGraph: {
    title: "Cambridge O Level Biology 5090 | Biology with Hamza",
    description: "A syllabus-led 5090 route for concepts, practical skills, data handling and structured-answer technique.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

const syllabusGroups = [
  {
    number: "01",
    title: "Foundations",
    description: "Build the vocabulary and mechanisms that every later topic depends on.",
    topics: ["Cells", "Classification", "Movement into and out of cells", "Biological molecules", "Enzymes"],
  },
  {
    number: "02",
    title: "Plant biology",
    description: "Connect structure to nutrition, transport, coordination and response.",
    topics: ["Plant nutrition", "Transport in flowering plants", "Coordination and response in plants"],
  },
  {
    number: "03",
    title: "Human systems",
    description: "Follow materials, information and regulation across the whole organism.",
    topics: ["Human nutrition", "Human gas exchange", "Respiration", "Transport in humans", "Disease and immunity", "Excretion", "Coordination and control"],
  },
  {
    number: "04",
    title: "Continuity and environment",
    description: "Explain how organisms reproduce, inherit, change and interact.",
    topics: ["Development of organisms and continuity of life", "Inheritance", "Biotechnology and genetic modification", "Relationships of organisms with one another and with the environment"],
  },
];

const cambridgeArticles = articles.filter((article) => article.category === "Cambridge O Level");

export default function CambridgeOLevelPage() {
  return (
    <>
      <Header />
      <main className="cambridge-page">
        <PageIntro
          eyebrow="Cambridge O Level Biology · 5090"
          title="Know the Biology. Show the examiner you know it."
          copy="A syllabus-led learning route for the 2026–2028 Cambridge O Level Biology 5090 course—connecting strong concepts with practical judgment, data interpretation and precise answers."
        >
          <div className="library-actions">
            <Link className="button button-ember" href="#syllabus-map">Explore the syllabus map <Arrow /></Link>
            <a className="button button-ghost" href={links.cambridgeSyllabus} target="_blank" rel="noreferrer">Official Cambridge syllabus</a>
          </div>
        </PageIntro>

        <section className="cambridge-assessment" aria-labelledby="assessment-title">
          <div className="cambridge-assessment-intro">
            <p className="eyebrow">Assessment at a glance</p>
            <h2 id="assessment-title">Three components. Three different kinds of readiness.</h2>
            <p>All candidates take Paper 1 and Paper 2, plus either the Practical Test or Alternative to Practical.</p>
          </div>
          <div className="cambridge-paper-grid">
            <div><span>Paper 1</span><strong>Multiple Choice</strong><p>1 hour · 40 marks · 30%</p></div>
            <div><span>Paper 2</span><strong>Theory</strong><p>1 hour 45 min · 80 marks · 50%</p></div>
            <div><span>Paper 3 or 4</span><strong>Practical skills</strong><p>1 hr 30 min Practical Test or 1 hr Alternative to Practical · 40 marks · 20%</p></div>
          </div>
        </section>

        <section className="cambridge-syllabus" id="syllabus-map">
          <div className="cambridge-syllabus-head">
            <p className="eyebrow">The 5090 syllabus map</p>
            <h2>Learn nineteen topics as four connected systems.</h2>
            <p>This grouping is a study route; the topic names follow the official Cambridge 2026–2028 syllabus.</p>
          </div>
          <div className="cambridge-syllabus-grid">
            {syllabusGroups.map((group) => (
              <article key={group.number}>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>{group.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cambridge-skills">
          <div className="cambridge-skills-head">
            <p className="eyebrow">The skills layer</p>
            <h2>Content knowledge alone does not secure the marks.</h2>
          </div>
          <div className="cambridge-skills-list">
            <article><span>01</span><div><h3>Practical design</h3><p>Identify independent, dependent and controlled variables; write repeatable methods; judge risk, reliability and improvement.</p></div></article>
            <article><span>02</span><div><h3>Observations and data</h3><p>Record suitable precision, choose the correct graph, calculate rates and percentages, and describe patterns without inventing causes.</p></div></article>
            <article><span>03</span><div><h3>Command words</h3><p>Distinguish state, describe, explain, compare, calculate, suggest and predict so the depth of each answer matches the instruction.</p></div></article>
            <article><span>04</span><div><h3>Structured answers</h3><p>Build visible biological chains: change → mechanism → consequence. Each mark-worthy link should be stated, not implied.</p></div></article>
          </div>
        </section>

        <div className="cambridge-topic-directory">
          <CambridgeTopicExplorer />
        </div>

        <section className="cambridge-articles">
          <div className="cambridge-articles-head">
            <div>
              <p className="eyebrow">Start learning</p>
              <h2>Cambridge-focused guides</h2>
            </div>
            <Link href="/articles">Search the full article library <Arrow /></Link>
          </div>
          <div className="cambridge-feature-grid">
            {cambridgeArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
        </section>

        <section className="cambridge-disclaimer">
          <p>This independent teaching resource is aligned to Cambridge O Level Biology 5090 and is not endorsed by Cambridge International Education.</p>
          <a href={links.cambridgeSubject} target="_blank" rel="noreferrer">Check the official subject page <Arrow /></a>
        </section>
      </main>
      <Footer />
    </>
  );
}
