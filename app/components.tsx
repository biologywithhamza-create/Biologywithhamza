import type { ReactNode } from "react";
import { articles, links } from "./content";

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

export function PyroMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`pyro-mark${inverse ? " pyro-mark-inverse" : ""}`} aria-hidden="true">
      P<span />
    </span>
  );
}

export function Header() {
  return (
    <>
      <div className="bulletin">
        <span>New</span>
        <a href={links.youtube} target="_blank" rel="noreferrer">
          MDCAT Biology lessons now on YouTube <Arrow />
        </a>
      </div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="PYRO home">
          <PyroMark />
          <span className="brand-word">PYRO</span>
          <span className="brand-descriptor">Biology, MDCAT &amp; Discovery</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/videos">MDCAT</a>
          <a href="/articles">Learn Biology</a>
          <a href="/articles#discoveries">Discoveries</a>
          <a href="/#resources">Resources</a>
          <a href="/about">About</a>
        </nav>

        <a className="header-action" href={links.whatsapp} target="_blank" rel="noreferrer">
          Join the channel <Arrow />
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="/videos">MDCAT &amp; Videos</a>
            <a href="/articles">Articles</a>
            <a href="/#resources">Resources</a>
            <a href="/about">About Hamza</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">Join WhatsApp channel</a>
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
          <a className="footer-brand" href="/">
            <PyroMark inverse />
            <span>PYRO</span>
          </a>
          <p>Biology made clear.<br />Discovery made relevant.</p>
        </div>
        <div className="footer-links">
          <div>
            <p>Explore</p>
            <a href="/articles">Articles</a>
            <a href="/videos">Video lessons</a>
            <a href="/about">About</a>
          </div>
          <div>
            <p>Follow</p>
            <a href={links.youtube} target="_blank" rel="noreferrer">YouTube</a>
            <a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div>
            <p>Learn</p>
            <a href={links.playlist} target="_blank" rel="noreferrer">Free MDCAT playlist</a>
            <a href={links.nearpeerCourse} target="_blank" rel="noreferrer">Nearpeer course</a>
            <a href="/#resources">Student resources</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PYRO · Founded by Hamza Ramzan</span>
        <span>HamzaRamzan.online</span>
      </div>
    </footer>
  );
}

export function ArticleCard({ index }: { index: number }) {
  const article = articles[index];
  return (
    <article className={`article-card article-${article.accent}`}>
      <div className="article-card-top">
        <span>{article.category}</span>
        <span>{article.readTime}</span>
      </div>
      <div className="article-card-number">{article.number}</div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={`/articles/${article.slug}`}>
        Read field note <Arrow />
      </a>
    </article>
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
