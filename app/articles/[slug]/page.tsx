import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow, ArticleCard, ConceptDiagram, Footer, Header } from "../../components";
import { articles, links } from "../../content";

type ArticleRouteProps = { params: Promise<{ slug: string }> };

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.dateISO,
      authors: ["Hamza Ramzan"],
      images: [],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
      images: [],
    },
  };
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const related = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    mainEntityOfPage: `https://hamzaramzan.online/articles/${article.slug}`,
    author: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
    publisher: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online" },
    educationalLevel: article.category === "Cambridge O Level" ? "Cambridge O Level" : "MDCAT and upper-secondary Biology",
    about: article.topic,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="article-shell">
        <a className="article-breadcrumb" href="/articles"><Arrow /> All Biology articles</a>
        <header className="article-header">
          <div className="article-header-meta">
            <span>{article.category}</span><i /><span>{article.topic}</span><i /><span>{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-author">
            <img src="/hamza-ramzan.png" alt="" width="1136" height="1476" />
            <div>
              <strong>Hamza Ramzan</strong>
              <span>Senior Biology lecturer · Academic Lead</span>
            </div>
          </div>
        </header>

        <section className="article-objectives" aria-labelledby="objectives-title">
          <div>
            <span>Learning map</span>
            <h2 id="objectives-title">By the end, you should be able to…</h2>
          </div>
          <ul>{article.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
        </section>

        <div className="article-reading-layout">
          <aside className="article-toc" aria-label="Article contents">
            <span>In this article</span>
            <nav>
              {article.sections.map((section, index) => (
                <a href={`#${sectionId(section.heading)}`} key={section.heading}>
                  <i>{String(index + 1).padStart(2, "0")}</i>{section.heading}
                </a>
              ))}
              <a href="#quick-recap"><i>✓</i>Quick recap</a>
              <a href="#check-understanding"><i>?</i>Check understanding</a>
            </nav>
          </aside>

          <article className="article-body">
            {article.sections.map((section) => (
              <section className="article-section" id={sectionId(section.heading)} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                {section.diagram && <ConceptDiagram diagram={section.diagram} />}
                {section.table && (
                  <div className="article-table-wrap">
                    <table>
                      <caption>{section.table.caption}</caption>
                      <thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={`${section.heading}-${rowIndex}`}>
                            {row.map((cell, cellIndex) => cellIndex === 0
                              ? <th scope="row" key={cell}>{cell}</th>
                              : <td key={`${cell}-${cellIndex}`}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.callout && <aside className="article-callout">{section.callout}</aside>}
              </section>
            ))}

            <section className="article-recap" id="quick-recap">
              <span>Quick recap</span>
              <h2>The ideas to carry forward</h2>
              <ul>{article.recap.map((point) => <li key={point}>{point}</li>)}</ul>
            </section>

            <section className="article-checks" id="check-understanding">
              <span>Check your understanding</span>
              <h2>Can you explain it without looking back?</h2>
              {article.checks.map((check, index) => (
                <details key={check.question}>
                  <summary><i>{String(index + 1).padStart(2, "0")}</i>{check.question}</summary>
                  <p>{check.answer}</p>
                </details>
              ))}
            </section>

            <div className="article-share">
              <p>Want the next explanation when it is published?</p>
              <a href={links.whatsapp} target="_blank" rel="noreferrer">Join the Biology channel <Arrow /></a>
            </div>
          </article>
        </div>

        <section className="related-articles">
          <p className="eyebrow">Continue learning</p>
          <h2>Related explanations</h2>
          <div className="article-list-grid">
            {related.map((item) => <ArticleCard article={item} key={item.slug} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
