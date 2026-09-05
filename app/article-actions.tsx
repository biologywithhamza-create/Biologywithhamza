"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}

export function ArticleActions() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="article-actions" aria-label="Article tools">
      <button type="button" onClick={() => window.print()}>
        Print / save revision sheet
      </button>
      <button type="button" onClick={copyLink} aria-live="polite">
        {copied ? "Link copied" : "Copy article link"}
      </button>
    </div>
  );
}
