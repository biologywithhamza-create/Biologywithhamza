"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Arrow, PlayIcon } from "../components";
import { links, videos } from "../content";

const chapterRoadmap = [
  "Acellular Life",
  "Biological Molecules",
  "Cell Structure & Function",
  "Enzymes",
  "Bioenergetics",
  "Digestion",
  "Circulation",
  "Respiration",
  "Homeostasis",
  "Coordination & Control",
  "Support & Movement",
  "Immunity",
  "Reproduction",
  "Inheritance",
  "Evolution",
  "Biotechnology",
];

export function LessonExplorer() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"All" | "Direct lessons" | "Chapter roadmap">("All");
  const [chapter, setChapter] = useState("All chapters");
  const normalized = query.trim().toLowerCase();
  const lessons = useMemo(
    () => videos.filter((video) =>
      (chapter === "All chapters" || video.chapter === chapter) &&
      `${video.title} ${video.label} ${video.chapter} ${video.format}`.toLowerCase().includes(normalized),
    ),
    [chapter, normalized],
  );
  const roadmap = useMemo(
    () => chapterRoadmap.filter((item) =>
      (chapter === "All chapters" || item === chapter) && item.toLowerCase().includes(normalized),
    ),
    [chapter, normalized],
  );
  const showLessons = view !== "Chapter roadmap";
  const showRoadmap = view !== "Direct lessons";

  return (
    <>
      <section className="lesson-explorer" aria-labelledby="lesson-library-title">
        <div className="lesson-toolbar">
          <div>
            <p className="eyebrow">Featured complete lessons</p>
            <h2 id="lesson-library-title">Search the classroom.</h2>
          </div>
          <label>
            <span>Search lessons and chapters</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try acellular life or inheritance" />
          </label>
        </div>
        <div className="lesson-filters">
          <div aria-label="Choose lesson view">
            {(["All", "Direct lessons", "Chapter roadmap"] as const).map((item) => (
              <button type="button" className={view === item ? "is-active" : ""} aria-pressed={view === item} onClick={() => setView(item)} key={item}>{item}</button>
            ))}
          </div>
          <label>
            <span>Chapter</span>
            <select value={chapter} onChange={(event) => setChapter(event.target.value)}>
              <option>All chapters</option>
              <option>Foundation</option>
              {chapterRoadmap.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="lesson-result-row"><p aria-live="polite">{lessons.length} direct {lessons.length === 1 ? "lesson" : "lessons"} · {roadmap.length} chapter {roadmap.length === 1 ? "route" : "routes"}</p><a href={links.youtube} target="_blank" rel="noreferrer">See every upload on YouTube <Arrow /></a></div>
        {showLessons && lessons.length ? (
          <div className="video-library lesson-library-grid">
            {lessons.map((video) => (
              <a className="library-card" href={video.href} target="_blank" rel="noreferrer" key={video.href}>
                <div className="library-card-image">
                  <Image src={video.image} alt="" width={1280} height={720} sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                  <span className="video-play"><PlayIcon /></span>
                </div>
                <div className="library-card-copy">
                  <span>{video.format} · {video.label}</span>
                  <h2>{video.title}</h2>
                  <p>Watch the complete lesson on YouTube.</p>
                </div>
              </a>
            ))}
          </div>
        ) : showLessons ? <div className="resource-empty"><h3>No direct lesson matches.</h3><p>Use the chapter roadmap or open the complete YouTube playlist.</p></div> : null}
      </section>

      {showRoadmap && (
        <section className="lesson-roadmap" aria-labelledby="lesson-roadmap-title">
          <div>
            <p className="eyebrow">MDCAT playlist roadmap</p>
            <h2 id="lesson-roadmap-title">Open the full playlist by chapter.</h2>
            <p>The verified playlist contains the broader lecture sequence. Chapter routes open that collection so students can choose the relevant lesson without relying on guessed video links.</p>
          </div>
          <div className="lesson-roadmap-list">
            {roadmap.length ? roadmap.map((item, index) => (
              <a href={links.playlist} target="_blank" rel="noreferrer" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><Arrow /></a>
            )) : <div className="resource-empty"><h3>No chapter route matches.</h3><p>Clear the search or choose all chapters.</p></div>}
          </div>
        </section>
      )}
    </>
  );
}
