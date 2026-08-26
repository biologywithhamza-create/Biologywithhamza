import type { Metadata } from "next";
import { ArticleExplorer } from "../article-explorer";
import { ArticleCard, Footer, Header, PageIntro } from "../components";
import { articles } from "../content";

export const metadata: Metadata = {
  title: "Biology Articles",
  description:
    "In-depth MDCAT and Cambridge O Level Biology explanations, diagrams, concept checks and exam strategy by Hamza Ramzan.",
};

export default function ArticlesPage() {
  const cambridgeArticles = articles.filter((article) => article.category === "Cambridge O Level");

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Biology learning library"
          title="Depth where it matters. Clarity all the way through."
          copy="Complete explanations built around mechanisms, diagrams, comparisons and exam application—for MDCAT and Cambridge O Level learners."
        />

        <section className="inner-content article-page-content">
          <section className="cambridge-feature" id="cambridge-o-level">
            <div className="cambridge-feature-copy">
              <p className="eyebrow">Cambridge O Level Biology</p>
              <h2>Learn the concept. Then learn how Cambridge asks it.</h2>
              <p>
                A growing 5090-focused track for precise definitions, practical work,
                data handling and structured biological explanations.
              </p>
            </div>
            <div className="cambridge-feature-grid">
              {cambridgeArticles.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          </section>

          <ArticleExplorer />
        </section>
      </main>
      <Footer />
    </>
  );
}
