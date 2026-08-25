import type { Metadata } from "next";
import { Arrow, Footer, Header, PageIntro } from "../components";
import { links } from "../content";

export const metadata: Metadata = {
  title: "About Hamza Ramzan",
  description: "Meet Hamza Ramzan—Biology lecturer, Academic Lead, public speaker and founder of PYRO.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Founder & educator"
          title="Clarity is not simplification. It is good teaching."
          copy="Hamza Ramzan brings scientific training, eight years of teaching experience and an award-winning speaking background to Biology education."
        />

        <section className="inner-content about-profile">
          <div className="about-portrait">
            <img src="/hamza-ramzan.png" alt="Hamza Ramzan" width="1136" height="1476" />
          </div>
          <div className="about-profile-copy">
            <h2>A Biology teacher who starts with the reason.</h2>
            <p>
              Hamza specialises in FSc and MDCAT Biology. His teaching moves from
              concept to application to MCQ judgment, using diagrams, analogies,
              past-paper awareness and active student participation.
            </p>
            <p>
              Across online and on-campus classrooms, he has taught at Nearpeer,
              Punjab College, Noon Academy, Government Graduate College Township
              and The Punjab School.
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
              <h3>Concept → Application → MCQ</h3>
              <ul>
                <li>Stories and analogies that make difficult mechanisms memorable.</li>
                <li>Diagram-based explanations that reveal relationships, not just labels.</li>
                <li>Questions, polls and quick checks that keep students mentally active.</li>
                <li>Board concepts connected directly to MDCAT-level reasoning.</li>
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
      </main>
      <Footer />
    </>
  );
}
