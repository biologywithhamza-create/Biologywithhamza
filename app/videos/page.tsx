import type { Metadata } from "next";
import { Arrow, Footer, Header, PageIntro, PlayIcon } from "../components";
import { links, videos } from "../content";

export const metadata: Metadata = {
  title: "Biology Video Lessons",
  description: "Watch free Biology lessons and MDCAT revision sessions with Hamza Ramzan.",
};

export default function VideosPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Watch & learn"
          title="The classroom, without the walls."
          copy="Free Biology lessons that connect strong concepts with exam-level reasoning, taught by Hamza Ramzan."
        >
          <div className="library-actions">
            <a className="button button-ember" href={links.youtube} target="_blank" rel="noreferrer">Open YouTube channel <Arrow /></a>
            <a className="button button-ghost" href={links.playlist} target="_blank" rel="noreferrer">View full playlist</a>
          </div>
        </PageIntro>

        <section className="inner-content" id="mdcat">
          <div className="video-library">
            {videos.map((video) => (
              <a className="library-card" href={video.href} target="_blank" rel="noreferrer" key={video.href}>
                <div className="library-card-image">
                  <img src={video.image} alt="" width="480" height="360" />
                  <span className="video-play"><PlayIcon /></span>
                </div>
                <div className="library-card-copy">
                  <span>{video.label}</span>
                  <h2>{video.title}</h2>
                  <p>Watch the complete lesson on YouTube.</p>
                </div>
              </a>
            ))}
          </div>
          <div className="coming-note">
            <span>Complete preparation</span>
            <h2>Need structure beyond individual lessons?</h2>
            <p>Explore Hamza Ramzan&apos;s complete MDCAT Biology learning route with conceptual teaching and focused exam preparation.</p>
            <a className="button button-ember" href={links.nearpeerCourse} target="_blank" rel="noreferrer">Explore the course <Arrow /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
