"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useStudy } from "./study-store";

const KEY = "bwh-recent-learning-v1";
type Visit = { path: string; title: string; at: number };
export function validLearningPath(path: unknown): path is string {
  return typeof path === "string" && /^\/(?:articles|lab|learn|cambridge-o-level)\/[a-z0-9-]+\/?$|^\/(?:atlas|videos)\/?$/.test(path);
}
function raw() { try { return localStorage.getItem(KEY) || "[]"; } catch { return "[]"; } }
function visits(value: string): Visit[] {
  try { const list = JSON.parse(value); return Array.isArray(list) ? list.filter(v => v && validLearningPath(v.path) && typeof v.title === "string" && v.title.length < 250 && Number.isFinite(v.at)).slice(0,6) : []; } catch { return []; }
}
function subscribe(fn: () => void) { window.addEventListener("storage", fn); window.addEventListener("bwh-recent", fn); return () => { window.removeEventListener("storage", fn); window.removeEventListener("bwh-recent", fn); }; }
export function LearningHistory() {
  const path = usePathname();
  useEffect(() => {
    if (!validLearningPath(path)) return;
    const timer = setTimeout(() => {
      const title = document.title.replace(/\s*\|\s*Biology with Hamza.*$/, "");
      try { localStorage.setItem(KEY, JSON.stringify([{ path, title, at: Date.now() }, ...visits(raw()).filter(v => v.path !== path)].slice(0,6))); window.dispatchEvent(new Event("bwh-recent")); } catch { /* Browsing never depends on storage. */ }
    }, 300);
    return () => clearTimeout(timer);
  }, [path]);
  return null;
}
export function ContinueLearning() {
  const recent = visits(useSyncExternalStore(subscribe, raw, () => "[]"));
  const study = useStudy();
  if (!recent.length) return <section className="returning-learner newcomer"><div><p className="eyebrow">SMALL STEPS. REAL UNDERSTANDING.</p><h2>Build your own learning rhythm.</h2><p>Save a guide, try a model, then test the idea. Your recently opened lessons will appear here.</p></div><Link className="button button-dark" href="/learn">Open your workspace ↗</Link></section>;
  return <section className="returning-learner" aria-labelledby="continue-title"><div className="returning-heading"><div><p className="eyebrow">WELCOME BACK</p><h2 id="continue-title">Keep your curiosity going.</h2></div><button type="button" onClick={() => { try { localStorage.removeItem(KEY); window.dispatchEvent(new Event("bwh-recent")); } catch {} }}>Clear recent history</button></div><div className="recent-grid">{recent.slice(0,3).map(v => <Link href={v.path} key={v.path}><small>{study.completed.includes(v.path) ? "✓ Completed · revisit" : "Recently opened"}</small><h3>{v.title}</h3><span>Continue learning ↗</span></Link>)}</div><p className="local-history-note">Recent pages stay in this browser. Clearing history keeps your saved guides and notes.</p></section>;
}
