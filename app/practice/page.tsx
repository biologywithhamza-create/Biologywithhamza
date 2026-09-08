import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "../components";
import { DailyQuestion, QuizExperience } from "./quiz";

export const metadata: Metadata = {
  title: "MDCAT Biology Practice Centre",
  description: "Create a student practice ID, attempt randomized MDCAT Biology MCQs in a forward-only timed format, and review every answer with clear explanations.",
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
    description: "1,600 chapter-filtered MDCAT Biology questions with randomized attempts, locked answers and complete explanations.",
    educationalLevel: "MDCAT",
    learningResourceType: "Practice quiz",
    provider: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="practice-page" id="main-content">
        <PageIntro
          eyebrow="MDCAT Biology practice"
          title="Make your next attempt count."
          copy="Create your student practice ID, choose from 100 MCQs in every chapter, and complete a fresh forward-only timed attempt before reviewing every answer."
        />
        <div className="practice-shell"><QuizExperience /></div>
        <div className="practice-shell practice-daily-shell"><DailyQuestion /></div>
      </main>
      <Footer />
    </>
  );
}
