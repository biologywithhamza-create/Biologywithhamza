import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow, Footer, Header } from "../../components";
import { articles, links } from "../../content";

type ArticleRouteProps = { params: Promise<{ slug: string }> };

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    mainEntityOfPage: `https://hamzaramzan.online/articles/${article.slug}`,
    author: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
    publisher: { "@type": "Organization", name: "PYRO", url: "https://hamzaramzan.online" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="article-shell">
        <a className="article-breadcrumb" href="/articles"><Arrow /> All field notes</a>
        <header className="article-header">
          <div className="article-header-meta">
            <span>{article.category}</span><i /><span>{article.readTime}</span><i /><time dateTime={article.dateISO}>{article.date}</time>
          </div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-author">
            <img src="/hamza-ramzan.png" alt="" width="1136" height="1476" />
            <div><strong>Hamza Ramzan</strong><span>Biology lecturer · Founder, PYRO</span></div>
          </div>
        </header>

        <article className="article-body">
          {article.sections.map((section) => (
            <section className="article-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              {section.callout && <aside className="article-callout">{section.callout}</aside>}
            </section>
          ))}
          <div className="article-share">
            <p>Clear enough to help someone else? Share the idea.</p>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">Join the Biology channel <Arrow /></a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
