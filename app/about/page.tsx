import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Footer, Header, PageIntro } from "../components";
import { links } from "../content";

export const metadata: Metadata = {
  title: "About Hamza Ramzan",
  description: "Meet Hamza Ramzan—senior Biology lecturer, Academic Lead and award-winning public speaker.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hamza Ramzan | Biology with Hamza",
    description: "Senior Biology lecturer, Academic Lead and award-winning public speaker.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Biology educator"
          title="Clarity is not simplification. It is good teaching."
          copy="Hamza Ramzan brings scientific training, more than nine years of teaching experience and an award-winning speaking background to Biology education."
        />

        <section className="inner-content about-profile">
          <div className="about-portrait">
            <Image src="/hamza-ramzan.webp" alt="Hamza Ramzan" width={1136} height={1476} sizes="(max-width: 1080px) 88vw, 34vw" />
          </div>
          <div className="about-profile-copy">
            <h2>A Biology teacher who starts with the reason.</h2>
            <p>
              Hamza specialises in concept-driven MDCAT Biology and is building a
              dedicated Cambridge O Level teaching track. His lessons move from
              concept to application to exam mastery using diagrams, analogies,
              past-paper awareness and active student participation.
            </p>
            <p>
              Hundreds of thousands of students have studied through his online
              lectures, courses and academic communities. His classroom experience
              includes Nearpeer, Punjab College, Noon Academy, Government Graduate
              College Township and The Punjab School.
            </p>

            <div className="bio-block">
              <span>Academic training</span>
              <h3>Science behind the classroom</h3>
              <ul>
                <li>MS Biotechnology, University of Management and Technology — 2022.</li>
                <li>Research on clinical parameters among COVID-19 patients with and without comorbidities.</li>
                <li>BS Zoology, University of the Punjab — 2018.</li>
              </ul>
            </div>

            <div className="bio-block">
              <span>Teaching approach</span>
              <h3>Concept → Application → Exam mastery</h3>
              <ul>
                <li>Stories and analogies that make difficult mechanisms memorable.</li>
                <li>Diagram-based explanations that reveal relationships, not just labels.</li>
                <li>Questions, polls and quick checks that keep students mentally active.</li>
                <li>Exam-language training for MDCAT MCQs and Cambridge structured responses.</li>
              </ul>
            </div>

            <div className="bio-block">
              <span>Teaching focus</span>
              <h3>MDCAT expertise. Cambridge direction.</h3>
              <ul>
                <li>Deep MDCAT concept teaching, revision systems and MCQ judgment.</li>
                <li>Cambridge O Level Biology resources beginning with 5090-aligned concepts and skills.</li>
                <li>Practical-work guidance, data interpretation and structured-answer development.</li>
              </ul>
            </div>

            <div className="bio-block">
              <span>Public speaking</span>
              <h3>Communication recognised across Punjab</h3>
              <ul>
                <li>Five-time Best Speaker of Punjab in debates and speeches.</li>
                <li>Gold Medal in speech and two Certificates of Merit.</li>
                <li>Two Roll of Honour distinctions—one in Debate and one in Speech.</li>
              </ul>
            </div>

            <div className="library-actions">
              <a className="button button-ember" href={links.nearpeerProfile} target="_blank" rel="noreferrer">View teaching profile <Arrow /></a>
              <a className="button button-ghost" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        <section className="about-impact" aria-label="Teaching impact">
          <div><strong>9+</strong><span>years teaching Biology</span></div>
          <div><strong>100K+</strong><span>students reached through classrooms and digital learning</span></div>
          <div><strong>5×</strong><span>Best Speaker of Punjab</span></div>
        </section>

        <section className="about-journey">
          <div className="about-journey-head">
            <p className="eyebrow">Teaching journey</p>
            <h2>From classroom foundations to academic leadership.</h2>
            <p>Each stage added a different strength: classroom discipline, large-scale digital teaching, academic planning and now Cambridge-focused resource development.</p>
          </div>
          <div className="about-timeline">
            <article><span>01</span><div><h3>Classroom foundations</h3><p>Teaching experience at The Punjab School and Government Graduate College Township established a strong base in lesson design, student questioning and board-level Biology.</p></div></article>
            <article><span>02</span><div><h3>Wider academic reach</h3><p>Work with Punjab College and Noon Academy expanded that teaching into larger, mixed-ability student communities and online formats.</p></div></article>
            <article><span>03</span><div><h3>MDCAT scale and leadership</h3><p>At Nearpeer, Hamza combines senior Biology teaching with academic leadership, revision planning, assessment design and student support.</p></div></article>
            <article><span>04</span><div><h3>Cambridge O Level direction</h3><p>The current expansion translates concept-first teaching into 5090 syllabus maps, practical judgment, structured-answer guidance and exam-aware Biology articles.</p></div></article>
          </div>
        </section>

        <section className="about-next">
          <div>
            <p className="eyebrow">Choose a learning route</p>
            <h2>Strong concepts. Clear next steps.</h2>
          </div>
          <div className="about-next-links">
            <Link href="/videos"><span>MDCAT Biology</span><strong>Watch the lesson library</strong><Arrow /></Link>
            <Link href="/cambridge-o-level"><span>Cambridge O Level 5090</span><strong>Open the syllabus-led route</strong><Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
