"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiologyMark } from "./brand";
import { Icon } from "./ui-icons";
import { links } from "./content";

export type SearchEntry = { title: string; href: string; type: string; keywords: string };
const navigation = [
  ["/articles", "Learn"], ["/practice", "Practice"], ["/lab", "Lab"], ["/atlas", "Human Atlas"],
  ["/cambridge-o-level", "O Level"], ["/resources", "Resources"], ["/about", "About"],
];

export function SiteHeader({ entries }: { entries: SearchEntry[] }) {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries.filter(e => terms.every(t => `${e.title} ${e.type} ${e.keywords}`.toLowerCase().includes(t))).slice(0, 12);
  }, [entries, query]);
  function openSearch() { setMenuOpen(false); dialog.current?.showModal(); input.current?.focus(); }
  function closeSearch() { dialog.current?.close(); opener.current?.focus(); }
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); dialog.current?.showModal(); input.current?.focus(); }
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return <>
    <a className="announcement" href={links.youtube} target="_blank" rel="noreferrer"><Icon name="play" /><span>A little Biology, every day. <strong>Learn on YouTube</strong></span><Icon name="arrow" /></a>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Biology with Hamza home"><BiologyMark /><span className="brand-copy"><strong>Biology<span> with Hamza</span></strong><small>UNDERSTAND. CONNECT. EXCEL.</small></span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(([href,label]) => <Link href={href} key={href} aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}>{label}{href === "/atlas" && <span className="new-tag">NEW</span>}</Link>)}</nav>
        <div className="header-tools"><button ref={opener} className="search-trigger" type="button" onClick={openSearch} aria-label="Search the website"><Icon name="search" /><kbd>⌘ K</kbd></button><Link className="header-practice" href="/practice">Let’s practice <Icon name="arrow" /></Link><button type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{navigation.map(([href,label]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" /></Link>)}<Link href="/videos" onClick={() => setMenuOpen(false)}>Video lessons<Icon name="play" /></Link></nav>}
    </header>
    <dialog className="search-dialog" ref={dialog} aria-labelledby="search-dialog-title" onClick={e => { if(e.target === e.currentTarget) closeSearch(); }}>
      <div className="search-dialog-inner"><div className="search-dialog-head"><p id="search-dialog-title">What would you like to understand?</p><button type="button" onClick={closeSearch} aria-label="Close search"><Icon name="close" /></button></div>
        <label className="global-search-field"><Icon name="search" /><input ref={input} type="search" placeholder="Search a topic, lesson or resource…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search all learning resources" /></label>
        <p className="search-status" aria-live="polite">{query ? `${results.length}${results.length === 12 ? "+" : ""} matching results` : "Start somewhere interesting"}</p>
        <div className="search-results">{results.length ? results.map(e => <Link href={e.href} key={e.href} onClick={() => { closeSearch(); setQuery(""); }}><span><small>{e.type}</small><strong>{e.title}</strong></span><Icon name="arrow" /></Link>) : <p className="search-empty">Nothing here yet. Try “cells”, “enzymes” or “inheritance”.</p>}</div>
        <div className="search-help">Search articles, Cambridge topics, lessons and the Biology Lab.<span>Esc to close</span></div>
      </div>
    </dialog>
  </>;
}
