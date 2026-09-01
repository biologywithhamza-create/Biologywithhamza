"use client";

import { useState } from "react";

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
