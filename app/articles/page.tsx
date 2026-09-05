import type { Metadata } from "next";
import Link from "next/link";
import { ArticleExplorer } from "../article-explorer";
import { Arrow, ArticleCard, Footer, Header, PageIntro } from "../components";
import { articles } from "../content";

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
  const cambridgeArticles = articles.filter((article) => article.category === "Cambridge O Level");

  return (
    <>
      <Header />
      <main id="main-content">
        <PageIntro
          eyebrow="Biology learning library"
          title="Depth where it matters. Clarity all the way through."
          copy="Complete explanations built around mechanisms, diagrams, comparisons and exam application—for MDCAT and Cambridge O Level learners."
        />

        <section className="inner-content article-page-content">
          <ArticleExplorer />

          <section className="cambridge-feature" id="cambridge-o-level">
            <div className="cambridge-feature-copy">
              <div>
                <p className="eyebrow">Cambridge O Level Biology</p>
                <h2>Learn the concept. Then learn how Cambridge asks it.</h2>
              </div>
              <div>
                <p>
                  A 5090-focused track for precise definitions, practical work,
                  data handling and structured biological explanations.
                </p>
                <Link className="cambridge-feature-link" href="/cambridge-o-level">Open the complete 5090 route <Arrow /></Link>
              </div>
            </div>
            <div className="cambridge-feature-grid">
              {cambridgeArticles.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
