import type { Metadata } from "next";
import Link from "next/link";
import { ArticleExplorer } from "../article-explorer";
import { Footer, Header, PageIntro } from "../components";


export const metadata: Metadata = {
  title: "Biology Articles",
  description:
    "In-depth MDCAT and Cambridge O Level Biology explanations, diagrams, concept checks and exam strategy by Hamza Ramzan.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "In-depth Biology Articles | Biology with Hamza",
    description: "Search MDCAT and Cambridge O Level Biology guides with diagrams, recaps and exam-style checks.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function ArticlesPage() {


  return (
    <>
      <Header />
      <main id="main-content">
        <PageIntro
          eyebrow="Biology learning library"
          title="Biology articles & study guides"
          copy="Find an explanation, work through a concept or get help with your study routine."
        />

        <section className="inner-content article-page-content">
          <ArticleExplorer />

          <nav className="student-resource-row" aria-label="Related learning"><Link href="/learn">Browse chapters →</Link><Link href="/cambridge-o-level">Cambridge 5090 syllabus →</Link><Link href="/progress">My saved guides →</Link></nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
