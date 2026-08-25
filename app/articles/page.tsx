import type { Metadata } from "next";
import { ArticleCard, Footer, Header, PageIntro } from "../components";

export const metadata: Metadata = {
  title: "Biology Field Notes",
  description: "Clear Biology explainers, MDCAT thinking and study strategy by Hamza Ramzan.",
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="The PYRO notebook"
          title="Field notes for sharper Biology thinking."
          copy="Explanations built around causes, connections and consequences—so the idea stays useful after the page is closed."
        />
        <section className="inner-content">
          <div className="article-list-grid">
            <ArticleCard index={0} />
            <ArticleCard index={1} />
            <ArticleCard index={2} />
          </div>
          <div className="coming-note" id="discoveries">
            <span>Discovery desk</span>
            <h2>Research translated without losing the science.</h2>
            <p>
              PYRO&apos;s discovery coverage is being built for readers who want the
              meaning behind new biological findings—not just a headline.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
