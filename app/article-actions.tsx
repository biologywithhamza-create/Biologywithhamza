"use client";
import { useEffect, useState } from "react";
import { useAppearance, setAppearance, type TextSize } from "./appearance";
import { Icon } from "./ui-icons";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    function updateProgress() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const article = document.querySelector(".article-body");
        if (!article) return;
        const bounds = article.getBoundingClientRect();
        const scrollable = Math.max(1, bounds.height - window.innerHeight + 105);
        setProgress(Math.min(100, Math.max(0, (105 - bounds.top) / scrollable * 100)));
      });
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", updateProgress); window.removeEventListener("resize", updateProgress); };
  }, []);
  return <div className="reading-progress" role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ transform: `scaleX(${progress / 100})` }}/></div>;
}
export function ArticleActions() {
  const { textSize } = useAppearance();
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("reading-focus", focus);
    return () => document.body.classList.remove("reading-focus");
  }, [focus]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setMessage("Article link copied. Ready to share."); }
    catch { setMessage("Copy the page address from your browser to share this guide."); }
  }
  function printSheet() {
    const questions = Array.from(document.querySelectorAll<HTMLDetailsElement>(".article-checks details"));
    const previous = questions.map(q => q.open);
    questions.forEach(q => { q.open = true; });
    function restore() { questions.forEach((q,i) => { q.open = previous[i]; }); window.removeEventListener("afterprint", restore); }
    window.addEventListener("afterprint", restore, { once: true });
    window.print();
  }
  return <div className="article-actions" aria-label="Article tools"><label className="reading-size-control">Text size<select aria-label="Article text size" value={textSize} onChange={e => setAppearance({ textSize: e.target.value as TextSize })}><option value="standard">Standard</option><option value="large">Large</option><option value="larger">Extra large</option></select></label><button type="button" onClick={() => setFocus(!focus)} aria-pressed={focus}><Icon name="book"/>{focus ? "Exit reading focus" : "Reading focus"}</button><button type="button" onClick={printSheet}><Icon name="download"/>Print / save revision sheet</button><button type="button" onClick={copyLink}><Icon name="arrow"/>Copy article link</button>{message && <p role="status">{message}</p>}</div>;
}
