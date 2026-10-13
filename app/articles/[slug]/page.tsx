import {StudyControls} from "../../study-controls";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleActions, ReadingProgress } from "../../article-actions";
import { Arrow, ArticleCard, ConceptDiagram, Footer, Header } from "../../components";
import { articles, links } from "../../content";
import { beyondMbbsArticle, beyondMbbsCover } from "../../beyond-mbbs-article";
import {
  getArticleUpdatedISO,
  getArticleReadTime,
  getArticleReferences,
  getArticleSyllabusAlignment,
  getArticleWordCount,
} from "../../article-data";

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
  const isWellbeing = article.slug === "mdcat-preparation-pressure-mental-health";
  const isCareer = article.slug === beyondMbbsArticle.slug;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.dateISO,
      modifiedTime: getArticleUpdatedISO(article),
      authors: ["Hamza Ramzan"],
      images: isCareer ? [{ url: beyondMbbsCover.social, width: 1600, height: 900, alt: beyondMbbsCover.alt }] : isWellbeing ? [{ url: "/articles/mdcat-pressure-social.jpg", width: 1200, height: 632, alt: "Illustration of a student pausing at a desk during MDCAT preparation" }] : [],
    },
    twitter: {
      card: isWellbeing || isCareer ? "summary_large_image" : "summary",
      title: article.title,
      description: article.description,
      images: isCareer ? [beyondMbbsCover.social] : isWellbeing ? ["/articles/mdcat-pressure-social.jpg"] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const isCareer = article.slug === beyondMbbsArticle.slug;

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
    dateModified: getArticleUpdatedISO(article),
    mainEntityOfPage: `https://hamzaramzan.online/articles/${article.slug}`,
    author: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
    publisher: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online" },
    educationalLevel: isCareer ? "Post-secondary education planning" : article.category === "Cambridge O Level" ? "Cambridge O Level" : "MDCAT and upper-secondary Biology",
    about: article.topic,
    ...(article.slug === "mdcat-preparation-pressure-mental-health" ? { image: "https://hamzaramzan.online/articles/mdcat-pressure-social.jpg" } : {}),
    ...(isCareer ? { image: `https://hamzaramzan.online${beyondMbbsCover.social}` } : {}),
  };
  const references = getArticleReferences(article);
  const isWellbeing = article.slug === "mdcat-preparation-pressure-mental-health";
  const isGuidance = isWellbeing || isCareer;

  function articleText(text: string) {
    if (!isCareer) return text;
    return text.split(/(\[\d+(?:,\d+)*\])/g).map((part, index) => {
      if (!/^\[\d+(?:,\d+)*\]$/.test(part)) return part;
      const numbers = part.slice(1, -1).split(',').map(Number);
      return <span key={index}>[{numbers.map((number, position) => (
        <span key={number}>{position > 0 ? ', ' : ''}<a href={`#article-source-${number}`} aria-label={`Source ${number}`}>{number}</a></span>
      ))}]</span>;
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ReadingProgress />
      <Header />
      <main className="article-shell" id="main-content">
        <Link className="article-breadcrumb" href="/articles"><Arrow /> All articles</Link>
        <header className="article-header">
          <div className="article-header-meta">
            <span>{article.category}</span><i /><span>{article.topic}</span><i /><span>{getArticleReadTime(article)}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-author">
            <Image src="/hamza-ramzan.webp" alt="" width={1136} height={1476} sizes="46px" />
            <div>
              <strong>Hamza Ramzan</strong>
              <span>Senior Biology lecturer · Academic Lead</span>
            </div>
          </div>
          {isCareer && <p style={{ fontSize: "0.875rem", margin: "16px 0" }}>Updated {new Date(`${getArticleUpdatedISO(article)}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</p>}
          <ArticleActions/><StudyControls id={"/articles/"+article.slug} title={article.title} notes/>
        </header>

        {isWellbeing && (
          <figure style={{ margin: "0 0 36px" }}>
            <Image src="/articles/mdcat-pressure-cover.webp" alt="Illustration of a student pausing over Biology notes and practice questions beside a sunlit window." width={1600} height={843} sizes="(max-width: 900px) 100vw, 1100px" priority style={{ display: "block", width: "100%", height: "auto", borderRadius: "16px" }} />
            <figcaption style={{ marginTop: "10px", fontSize: "0.875rem", lineHeight: 1.6 }}>The person behind the preparation matters as much as the result.</figcaption>
          </figure>
        )}

        {isCareer && (
          <figure style={{ margin: "0 0 36px" }}>
            <Image src={beyondMbbsCover.src} alt={beyondMbbsCover.alt} width={beyondMbbsCover.width} height={beyondMbbsCover.height} sizes="(max-width: 900px) 100vw, 1100px" priority style={{ display: "block", width: "100%", height: "auto", borderRadius: "8px" }} />
            <figcaption style={{ marginTop: "10px", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {beyondMbbsCover.caption} Photo: <a href={beyondMbbsCover.source} target="_blank" rel="noreferrer">{beyondMbbsCover.photographer} / Wikimedia Commons</a> · <a href={beyondMbbsCover.license} target="_blank" rel="noreferrer">CC BY-SA 4.0</a>.
            </figcaption>
          </figure>
        )}

        {!isCareer && <section className="article-objectives" aria-labelledby="objectives-title">
          <div>
            <span>Learning map</span>
            <h2 id="objectives-title">By the end, you should be able to…</h2>
          </div>
          <ul>{article.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
        </section>}

        {!isCareer && <section className="article-evidence" aria-label="Article review and syllabus information">
          <div>
            <span>Content updated</span><strong>{getArticleUpdatedISO(article)}</strong>
          </div>
          <div>
            <span>{isGuidance ? "Article scope" : "Syllabus alignment"}</span>
            <strong>{getArticleSyllabusAlignment(article)}</strong>
          </div>
          <div>
            <span>Article depth</span>
            <strong>{getArticleWordCount(article).toLocaleString()} words · {getArticleReadTime(article)}</strong>
          </div>
          {!isCareer && <div className="article-evidence-sources">
            <span>Recommended sources</span>
            <ul>
              {references.map((reference) => (
                <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer">{reference.label} <Arrow /></a></li>
              ))}
            </ul>
          </div>}
        </section>}

        <div className="article-reading-layout">
          <aside className="article-toc" aria-label="Article contents">
            <span>In this article</span>
            <nav>
              {article.sections.map((section, index) => (
                <a href={`#${sectionId(section.heading)}`} key={section.heading}>
                  <i>{String(index + 1).padStart(2, "0")}</i>{section.heading}
                </a>
              ))}
              {!isCareer && <a href="#quick-recap"><i>✓</i>Quick recap</a>}
              <a href="#check-understanding"><i>?</i>{isGuidance ? "Common questions" : "Check understanding"}</a>
              {isCareer && <a href="#article-sources"><i>↗</i>Sources</a>}
            </nav>
          </aside>

          <article className="article-body">
            {article.sections.map((section) => (
              <section className="article-section" id={sectionId(section.heading)} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{articleText(paragraph)}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{articleText(point)}</li>)}</ul>}
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
                              ? <th scope="row" key={cell}>{articleText(cell)}</th>
                              : <td key={`${cell}-${cellIndex}`}>{articleText(cell)}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.callout && <aside className="article-callout">{articleText(section.callout)}</aside>}
              </section>
            ))}

            {isWellbeing && <p><Link href="/study-today">Build a manageable study plan</Link> · <Link href="/about">About Hamza Ramzan</Link></p>}
            {isCareer && <p>Related reading: <Link href="/articles/mdcat-preparation-pressure-mental-health">The Pressure Behind MDCAT: Preparation, Expectations and Mental Health</Link>.</p>}
            {!isCareer && <section className="article-recap" id="quick-recap">
              <span>Quick recap</span>
              <h2>The ideas to carry forward</h2>
              <ul>{article.recap.map((point) => <li key={point}>{point}</li>)}</ul>
            </section>}

            <section className="article-checks" id="check-understanding">
              {!isCareer && <span>{isGuidance ? "Common questions" : "Exam-style concept checks"}</span>}
              <h2>{isCareer ? "A few questions you may still have" : isGuidance ? "Questions students and parents ask" : "Answer first. Then reveal the marking logic."}</h2>
              {article.checks.map((check, index) => (
                <details key={check.question}>
                  <summary><i>{String(index + 1).padStart(2, "0")}</i><span>{check.question}{!isGuidance && <small>2 marks · show the biological link</small>}</span></summary>
                  <p><strong>Answer:</strong> {articleText(check.answer)}</p>
                </details>
              ))}
            </section>

            {isCareer && <section className="article-section" id="article-sources">
              <h2>Sources</h2>
              <p>Use these official pages to check programme details. Confirm the requirements for your own admission year before applying.</p>
              <ul>{references.map((reference, index) => <li id={`article-source-${index + 1}`} key={reference.href} style={{ scrollMarginTop: "120px", overflowWrap: "anywhere" }}><a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a></li>)}</ul>
              <p style={{ fontSize: "0.875rem" }}>The photograph above has been resized and compressed for this website.</p>
            </section>}

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
