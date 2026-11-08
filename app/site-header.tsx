"use client";
import { ThemeSwitch } from "./appearance";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiologyMark } from "./brand";
import { Icon, type IconName } from "./ui-icons";
import { useLearningTrack } from "./learning-preferences";
export type SearchEntry = { title: string; href: string; type: string; keywords: string };
export function SiteHeader({ entries }: { entries: SearchEntry[] }) {
  const path = usePathname(), track = useLearningTrack();
  const [query, setQuery] = useState(""), [menuOpen, setMenuOpen] = useState(false);
  const search = useRef<HTMLDialogElement>(null), menu = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null), menuButton = useRef<HTMLButtonElement>(null), searchButton = useRef<HTMLButtonElement>(null);
  const navigation: {href:string;label:string;icon:IconName;active:boolean}[] = [
    {href:`/learn?track=${track}`,label:"Learn",icon:"book",active:/^\/(learn|videos|resources|offline-packs|cambridge-o-level)(\/|$)/.test(path)},
    {href:track === "cambridge" ? "/cambridge-practice" : "/practice",label:"Practice",icon:"target",active:/^\/(practice|mocks|cambridge-practice)(\/|$)/.test(path)},
    {href:"/explore",label:"Lab & Atlas",icon:"lab",active:/^\/(explore|lab|atlas|practical-studio)(\/|$)/.test(path)},
    {href:"/articles",label:"Articles",icon:"book",active:path.startsWith("/articles")},
    {href:"/progress",label:"My Progress",icon:"bookmark",active:/^\/(progress|revision|study-today|account)(\/|$)/.test(path)},
  ];
  const results = useMemo(() => { const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean); return entries.filter(e => terms.every(t => `${e.title} ${e.type} ${e.keywords}`.toLowerCase().includes(t))).slice(0, 12); }, [entries, query]);
  function openSearch() { menu.current?.close(); search.current?.showModal(); input.current?.focus(); }
  function closeSearch() { search.current?.close(); searchButton.current?.focus(); }
  function closeMenu() { menu.current?.close(); setMenuOpen(false); menuButton.current?.focus(); }
  useEffect(() => {
    function shortcut(event: KeyboardEvent) { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); menu.current?.close(); search.current?.showModal(); input.current?.focus(); } }
    window.addEventListener("keydown", shortcut); return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return <>
    <header className="site-header student-header"><div className="header-inner">
      <Link className="brand" href="/" aria-label="Biology with Hamza home"><BiologyMark/><span className="brand-copy"><strong>Biology<span> with Hamza</span></strong><small>LEARN. PRACTISE. UNDERSTAND.</small></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(n => <Link href={n.href} key={n.label} aria-current={n.active ? "page" : undefined}>{n.label}</Link>)}</nav>
      <div className="header-tools"><button ref={searchButton} className="search-trigger" type="button" onClick={openSearch} aria-label="Search the website"><Icon name="search"/><span>Search</span></button><ThemeSwitch/><button ref={menuButton} type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}><Icon name="menu"/></button></div>
    </div></header>
    <nav className="student-bottom-nav" aria-label="Quick navigation">{navigation.filter(n => n.label !== "Articles").map(n => <Link key={n.label} href={n.href} aria-current={n.active ? "page" : undefined}><Icon name={n.icon}/><span>{n.label === "My Progress" ? "Progress" : n.label}</span></Link>)}</nav>
    <dialog ref={menu} id="mobile-navigation" className="student-menu" aria-labelledby="student-menu-title" onClose={() => setMenuOpen(false)} onClick={e => { if (e.target === e.currentTarget) closeMenu(); }}><div className="student-menu-inner">
      <div className="dialog-heading"><h2 id="student-menu-title">Where would you like to go?</h2><button type="button" onClick={closeMenu} aria-label="Close menu"><Icon name="close"/></button></div>
      <nav aria-label="All navigation"><Link href="/" onClick={closeMenu}>Home<Icon name="arrow"/></Link>{navigation.map(n => <Link href={n.href} key={n.label} aria-current={n.active ? "page" : undefined} onClick={closeMenu}>{n.label}<Icon name="arrow"/></Link>)}</nav>
      <div className="student-menu-extra">{[["/resources","Notes & downloads"],["/videos","Video lessons"],["/cambridge-o-level","Cambridge 5090 syllabus"],["/account","Back up saved progress"],["/about","About Hamza"]].map(([href,label]) => <Link href={href} key={href} onClick={closeMenu}>{label}</Link>)}</div>
    </div></dialog>
    <dialog className="search-dialog" ref={search} aria-labelledby="search-dialog-title" onClick={e => { if (e.target === e.currentTarget) closeSearch(); }}><div className="search-dialog-inner">
      <div className="search-dialog-head"><p id="search-dialog-title">Find a chapter, lesson or activity</p><button type="button" onClick={closeSearch} aria-label="Close search"><Icon name="close"/></button></div>
      <label className="global-search-field"><Icon name="search"/><input ref={input} type="search" placeholder="Try enzymes, heart or study plan" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search all learning resources"/></label>
      <p className="search-status" aria-live="polite">{query ? `${results.length}${results.length === 12 ? "+" : ""} matching results` : "Useful starting points"}</p>
      <div className="search-results">{results.length ? results.map(e => <Link href={e.href} key={e.href} onClick={() => { closeSearch(); setQuery(""); }}><span><small>{e.type}</small><strong>{e.title}</strong></span><Icon name="arrow"/></Link>) : <p className="search-empty">No matches. Try a shorter topic name such as “cells” or “enzymes”.</p>}</div>
      <div className="search-help">Search across both courses.<span>Ctrl / ⌘ K to open · Esc to close</span></div>
    </div></dialog>
  </>;
}
