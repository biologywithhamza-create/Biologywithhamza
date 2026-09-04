import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "../components";
import { DailyQuestion, QuizExperience } from "./quiz";

export const metadata: Metadata = {
  title: "MDCAT Biology Practice Centre",
  description: "Attempt 64 timed MDCAT Biology MCQs across 16 chapters and review every answer with clear biological explanations.",
  alternates: { canonical: "/practice" },
  openGraph: {
    title: "MDCAT Biology Practice Centre | Biology with Hamza",
    description: "64 conceptual MCQs across 16 chapters, with timed attempts, instant scoring and complete biological explanations.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function PracticePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "MDCAT Biology Practice Centre",
    description: "64 chapter-filtered MDCAT Biology questions with answer explanations.",
    educationalLevel: "MDCAT",
    learningResourceType: "Practice quiz",
    provider: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="practice-page">
        <PageIntro
          eyebrow="MDCAT Biology practice"
          title="Test the link between facts—not just the facts."
          copy="Build a timed attempt by chapter and difficulty. Submit once, then review the biological reasoning behind every answer."
        />
        <div className="practice-shell"><QuizExperience /></div>
        <div className="practice-shell practice-daily-shell"><DailyQuestion /></div>
      </main>
      <Footer />
    </>
  );
}
