import type { ReactNode } from "react";
import Link from "next/link";
import { articles, links } from "./content";
import type { Article, ArticleDiagram } from "./content";
import { getArticleReadTime, getArticleTopicGroup } from "./article-data";
import { BiologyMark } from "./brand";
import { SiteHeader } from "./site-header";
import { cambridgeTopics } from "./cambridge-o-level/topics";
import { Icon } from "./ui-icons";
import { activities, chapters } from "./lab/activity-data";
export { BiologyMark } from "./brand";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const entries = [
    { title: "3D Human Atlas", href: "/atlas", type: "Explore", keywords: "human anatomy organs systems layers skeleton muscles heart brain" },
    { title: "MDCAT Practice Centre", href: "/practice", type: "Practice", keywords: "MCQs quiz test chapters" },
    { title: "Interactive Biology Lab", href: "/lab", type: "Explore", keywords: "osmosis enzymes genetics simulation" },
    { title: "Video lessons", href: "/videos", type: "Watch", keywords: "YouTube lectures" },
    { title: "Student resource library", href: "/resources", type: "Resources", keywords: "Google Drive notes revision" },
    ...articles.map(a => ({ title: a.title, href: `/articles/${a.slug}`, type: a.category, keywords: a.topic })),
    ...activities.map(a=>({title:a.title,href:`/lab/${a.slug}`,type:"Lab activity",keywords:chapters[a.chapter]+" "+a.summary})),
    ...cambridgeTopics.map(t => ({ title: t.title, href: `/cambridge-o-level/${t.slug}`, type: "Cambridge 5090", keywords: t.summary })),
  ];
  return <SiteHeader entries={entries} />;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            <BiologyMark inverse />
            <span>Biology with Hamza</span>
          </Link>
          <p>A place for curious minds.<br />A clearer path through Biology.</p>
        </div>
        <div className="footer-links">
          <div>
            <p>Explore</p>
            <Link href="/atlas">3D Human Atlas</Link>
            <Link href="/lab">Interactive Biology Lab</Link>
            <Link href="/practice">MDCAT practice centre</Link>
            <Link href="/articles">Biology articles</Link>
            <Link href="/videos">Video lessons</Link>
            <Link href="/about">About Hamza</Link>
          </div>
          <div>
            <p>Follow</p>
            <a href={links.youtube} target="_blank" rel="noreferrer">YouTube</a>
            <a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div>
            <p>Learn</p>
            <Link href="/cambridge-o-level">Cambridge O Level 5090</Link>
            <Link href="/resources">Student resource library</Link>
            <a href={links.playlist} target="_blank" rel="noreferrer">Free MDCAT playlist</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Biology with Hamza · Hamza Ramzan</span>
        <span>HamzaRamzan.online</span>
      </div>
    </footer>
  );
}

export function ArticleCard({ index, article }: { index?: number; article?: Article }) {
  const selected = article ?? articles[index ?? 0];
  
  return (
    <Link
      className={`article-card article-${selected.accent}`}
      href={`/articles/${selected.slug}`}
      aria-label={`Read: ${selected.title}`}
    >
      <div className="article-card-top">
        <span>{selected.category}</span>
        <span>{getArticleReadTime(selected)}</span>
      </div>
      <div className="article-card-symbol"><Icon name={selected.category === "Study Strategy" ? "target" : "book"} /></div>
      <div className="article-card-topic">{getArticleTopicGroup(selected)} · {selected.topic}</div>
      <h3>{selected.title}</h3>
      <p>{selected.description}</p>
      <span className="article-card-cta">
        Read the guide <Icon name="arrow" />
      </span>
    </Link>
  );
}

export function ConceptDiagram({ diagram }: { diagram: ArticleDiagram }) {
  return (
    <figure className={`concept-diagram concept-diagram-${diagram.kind ?? "flow"}`}>
      <div className="concept-diagram-title">{diagram.title}</div>
      <div className="concept-diagram-track">
        {diagram.items.map((item, index) => (
          <div className="concept-diagram-node" key={`${item.label}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}

export function PageIntro({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children?: ReactNode }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro-copy">{copy}</p>
      {children}
    </section>
  );
}
