import type { ReactNode } from "react";
import Link from "next/link";
import { articles, links } from "./content";
import type { Article, ArticleDiagram } from "./content";
import { getArticleReadTime, getArticleTopicGroup } from "./article-data";

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

export function BiologyMark({
  inverse = false,
  className = "",
}: {
  inverse?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`biology-mark${inverse ? " biology-mark-inverse" : ""} ${className}`.trim()}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="31" stroke="currentColor" strokeWidth="2.4" />
      <path d="M31 12c11 8 11 16 0 24s-11 16 0 24M41 12c-11 8-11 16 0 24s11 16 0 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M30 20h12M29 31h14M29 42h14M30 53h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 46c11-13 20-10 23 7-12 5-20 1-23-7Z" fill="var(--mark-leaf, #35b86b)" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m16 47 17 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="54" cy="23" r="5" fill="var(--ember)" />
    </svg>
  );
}

export function Header() {
  return (
    <>
      <div className="bulletin">
        <span>Watch</span>
        <a href={links.youtube} target="_blank" rel="noreferrer">
          New Biology lessons on YouTube <Arrow />
        </a>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Biology with Hamza home">
          <BiologyMark />
          <span className="brand-copy">
            <strong>Biology with Hamza</strong>
            <small>MDCAT · Cambridge O Level</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/videos">MDCAT</Link>
          <Link href="/cambridge-o-level">Cambridge O Level</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/#resources">Resources</Link>
          <Link href="/about">About</Link>
        </nav>

        <a className="header-action" href={links.youtube} target="_blank" rel="noreferrer">
          YouTube channel <Arrow />
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/videos">MDCAT &amp; Videos</Link>
            <Link href="/cambridge-o-level">Cambridge O Level</Link>
            <Link href="/articles">Biology articles</Link>
            <Link href="/#resources">Student resources</Link>
            <Link href="/about">About Hamza</Link>
            <a href={links.youtube} target="_blank" rel="noreferrer">Open YouTube channel</a>
          </nav>
        </details>
      </header>
    </>
  );
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
          <p>Biology made clear.<br />Learning made relevant.</p>
        </div>
        <div className="footer-links">
          <div>
            <p>Explore</p>
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
            <a href={links.playlist} target="_blank" rel="noreferrer">Free MDCAT playlist</a>
            <a href={links.studentDrive} target="_blank" rel="noreferrer">Student resource drive</a>
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
  const articleNumber = articles.findIndex((item) => item.slug === selected.slug) + 1;
  return (
    <article className={`article-card article-${selected.accent}`}>
      <div className="article-card-top">
        <span>{selected.category}</span>
        <span>{getArticleReadTime(selected)}</span>
      </div>
      <div className="article-card-number">{String(articleNumber).padStart(2, "0")}</div>
      <div className="article-card-topic">{getArticleTopicGroup(selected)} · {selected.topic}</div>
      <h3>{selected.title}</h3>
      <p>{selected.description}</p>
      <Link href={`/articles/${selected.slug}`}>
        Read article <Arrow />
      </Link>
    </article>
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
