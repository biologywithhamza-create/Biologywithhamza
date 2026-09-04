import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "../components";
import { DailyQuestion, QuizExperience } from "./quiz";

export const metadata: Metadata = {
  title: "MDCAT Biology Practice Centre",
  description: "Attempt 1,600 timed MDCAT Biology MCQs—100 in every chapter—and review every answer with clear biological explanations.",
  alternates: { canonical: "/practice" },
  openGraph: {
    title: "MDCAT Biology Practice Centre | Biology with Hamza",
    description: "1,600 conceptual MCQs across 16 chapters, with 100 per chapter, timed attempts, instant scoring and complete explanations.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function PracticePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "MDCAT Biology Practice Centre",
    description: "1,600 chapter-filtered MDCAT Biology questions, with 100 per chapter and complete answer explanations.",
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
          copy="Choose from 100 MCQs in every chapter, build a timed attempt by difficulty, then review the biological reasoning behind every answer."
        />
        <div className="practice-shell"><QuizExperience /></div>
        <div className="practice-shell practice-daily-shell"><DailyQuestion /></div>
      </main>
      <Footer />
    </>
  );
}
