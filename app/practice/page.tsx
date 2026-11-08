import Link from "next/link";
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
          title="Start a chapter quiz."
          copy="Choose your chapter and question count. Get explanations and a mistake review after your attempt."
        />
        <div className="practice-shell"><QuizExperience /></div>
        <nav className="practice-shell student-resource-row" aria-label="Other practice"><Link href="/mocks">Biology mock tests →</Link><Link href="/cambridge-practice">Cambridge answer practice →</Link><Link href="/progress">My Progress →</Link></nav><div className="practice-shell practice-daily-shell"><DailyQuestion /></div>
      </main>
      <Footer />
    </>
  );
}
