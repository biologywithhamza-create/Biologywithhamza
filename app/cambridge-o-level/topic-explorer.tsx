"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrow } from "../components";
import { cambridgeTopicGroups, cambridgeTopics } from "./topics";

export function CambridgeTopicExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof cambridgeTopicGroups)[number]>("All topics");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return cambridgeTopics.filter((topic) =>
      (group === "All topics" || topic.group === group) &&
      (!normalized || `${topic.title} ${topic.summary} ${topic.focus.join(" ")}`.toLowerCase().includes(normalized)),
    );
  }, [group, query]);

  return (
    <section className="cambridge-topic-explorer" aria-labelledby="cambridge-topic-title">
      <div className="cambridge-topic-toolbar">
        <div><p className="eyebrow">Nineteen topic routes</p><h2 id="cambridge-topic-title">Open the syllabus one topic at a time.</h2></div>
        <label><span>Search the 5090 route</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try cells, respiration or inheritance" /></label>
      </div>
      <div className="cambridge-topic-filter">
        {cambridgeTopicGroups.map((item) => <button type="button" className={group === item ? "is-active" : ""} onClick={() => setGroup(item)} aria-pressed={group === item} key={item}>{item}</button>)}
      </div>
      <p className="cambridge-topic-count" aria-live="polite">{results.length} {results.length === 1 ? "topic" : "topics"}</p>
      {results.length === 0 && <div className="resource-empty"><h3>No matching topics yet.</h3><p>Try a different search, or clear your filters.</p><button className="text-button" onClick={() => { setQuery(""); setGroup("All topics"); }}>Clear filters</button></div>}
      <div className="cambridge-topic-grid">
        {results.map((topic) => (
          <Link href={`/cambridge-o-level/${topic.slug}`} key={topic.slug}>
            <div><span>{String(cambridgeTopics.indexOf(topic) + 1).padStart(2, "0")}</span><small>{topic.group}</small></div>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
            <strong>Open topic route <Arrow /></strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
