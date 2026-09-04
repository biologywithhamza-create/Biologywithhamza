import type { Metadata } from "next";
import { Arrow, Footer, Header, PageIntro } from "../components";
import { links, videos } from "../content";
import { LessonExplorer } from "./lesson-explorer";

export const metadata: Metadata = {
  title: "Biology Video Lessons",
  description: "Search free Biology lessons, MDCAT revision sessions and a 16-chapter playlist roadmap with Hamza Ramzan.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Biology Video Lessons | Biology with Hamza",
    description: "Watch free Biology lessons and MDCAT revision sessions with Hamza Ramzan.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function VideosPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Biology video lessons by Hamza Ramzan",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.title,
        description: `${video.format} for ${video.chapter}.`,
        thumbnailUrl: `https://hamzaramzan.online${video.image}`,
        contentUrl: video.href,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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

        <section className="inner-content video-page-content" id="mdcat">
          <LessonExplorer />
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
