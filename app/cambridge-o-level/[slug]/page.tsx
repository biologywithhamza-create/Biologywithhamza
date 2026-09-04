import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Footer, Header } from "../../components";
import { articles, links } from "../../content";
import { cambridgeTopics, getCambridgeTopic } from "../topics";

type TopicPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cambridgeTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getCambridgeTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} | Cambridge O Level Biology 5090`,
    description: `${topic.summary} Study priorities, exam skills, common mistakes and practice prompts for Cambridge O Level Biology 5090.`,
    alternates: { canonical: `/cambridge-o-level/${topic.slug}` },
    openGraph: {
      title: `${topic.title} | Cambridge O Level Biology 5090`,
      description: topic.summary,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function CambridgeTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getCambridgeTopic(slug);
  if (!topic) notFound();
  const article = topic.relatedArticleSlug ? articles.find((item) => item.slug === topic.relatedArticleSlug) : undefined;
  const currentIndex = cambridgeTopics.findIndex((item) => item.slug === topic.slug);
  const nextTopic = cambridgeTopics[(currentIndex + 1) % cambridgeTopics.length];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: `${topic.title} — Cambridge O Level Biology 5090`,
        description: topic.summary,
        educationalLevel: "Cambridge O Level",
        teaches: topic.focus,
        url: `https://hamzaramzan.online/cambridge-o-level/${topic.slug}`,
        author: { "@type": "Person", name: "Hamza Ramzan", url: "https://hamzaramzan.online/about" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://hamzaramzan.online" },
          { "@type": "ListItem", position: 2, name: "Cambridge O Level Biology 5090", item: "https://hamzaramzan.online/cambridge-o-level" },
          { "@type": "ListItem", position: 3, name: topic.title, item: `https://hamzaramzan.online/cambridge-o-level/${topic.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="cambridge-topic-page">
        <header className="cambridge-topic-hero">
          <Link href="/cambridge-o-level"><Arrow /> Cambridge O Level Biology 5090</Link>
          <p>{topic.group}</p>
          <h1>{topic.title}</h1>
          <strong>{topic.summary}</strong>
          <div><span>5090 syllabus route</span><span>Concept · skill · exam language</span></div>
        </header>

        <div className="cambridge-topic-content">
          <section className="cambridge-topic-section cambridge-topic-focus">
            <div><p className="eyebrow">What to know</p><h2>Build the topic around four anchors.</h2></div>
            <ol>{topic.focus.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
          </section>

          <section className="cambridge-topic-section cambridge-topic-three">
            <article><p className="eyebrow">Exam skills</p><h2>What the paper asks you to do</h2><ul>{topic.examSkills.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><p className="eyebrow">Common mistakes</p><h2>Where marks disappear</h2><ul>{topic.mistakes.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </section>

          <section className="cambridge-topic-section cambridge-topic-practice">
            <div><p className="eyebrow">Structured practice</p><h2>Answer these without looking back.</h2><p>For each prompt, write the biological chain clearly enough that every mark-worthy link is visible.</p></div>
            <ol>{topic.practice.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
          </section>

          <section className="cambridge-topic-next">
            <div>
              <p className="eyebrow">Continue learning</p>
              <h2>{article ? "Read the connected explanation." : "Use the complete resource route."}</h2>
              <p>{article ? article.description : "Open the student materials, official syllabus or the next topic in sequence."}</p>
              <div className="library-actions">
                {article && <Link className="button button-ember" href={`/articles/${article.slug}`}>Read related guide <Arrow /></Link>}
                <a className="button button-ghost" href={links.cambridgeSyllabus} target="_blank" rel="noreferrer">Official syllabus</a>
              </div>
            </div>
            <Link className="cambridge-next-topic" href={`/cambridge-o-level/${nextTopic.slug}`}><span>Next topic</span><strong>{nextTopic.title}</strong><Arrow /></Link>
          </section>

          <p className="cambridge-topic-disclaimer">This independent teaching resource follows the Cambridge O Level Biology 5090 syllabus direction and is not endorsed by Cambridge International Education.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
