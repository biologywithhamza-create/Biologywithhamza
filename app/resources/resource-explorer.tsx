"use client";

import { useMemo, useState } from "react";
import { Arrow } from "../components";
import { links } from "../content";
import { resourceGroups, studentResources } from "./resources";

export function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof resourceGroups)[number]>("All resources");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return studentResources.filter((resource) => {
      const matchesGroup = group === "All resources" || resource.group === group;
      const searchable = `${resource.title} ${resource.description} ${resource.keywords.join(" ")}`.toLowerCase();
      return matchesGroup && (!normalized || searchable.includes(normalized));
    });
  }, [group, query]);

  return (
    <section className="resource-explorer" aria-labelledby="resource-library-title">
      <div className="resource-toolbar">
        <div>
          <p className="eyebrow">MDCAT Biology lecture notes</p>
          <h2 id="resource-library-title">Find the chapter before opening the Drive.</h2>
        </div>
        <label>
          <span>Search resources</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try immunity, respiration or graphs" />
        </label>
      </div>
      <div className="resource-filter" aria-label="Filter resources">
        {resourceGroups.map((item) => (
          <button type="button" className={group === item ? "is-active" : ""} onClick={() => setGroup(item)} aria-pressed={group === item} key={item}>{item}</button>
        ))}
      </div>
      <div className="resource-result-row">
        <p aria-live="polite">{results.length} {results.length === 1 ? "resource" : "resources"}</p>
        <a href={links.studentDrive} target="_blank" rel="noreferrer">Open complete Google Drive <Arrow /></a>
      </div>
      {results.length ? (
        <div className="resource-library-grid">
          {results.map((resource, index) => (
            <a href={links.studentDrive} target="_blank" rel="noreferrer" key={resource.title}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><small>{resource.format}</small></div>
              <p>{resource.group}</p>
              <h3>{resource.title}</h3>
              <strong>{resource.description}</strong>
              <em>Find in Student Drive <Arrow /></em>
            </a>
          ))}
        </div>
      ) : (
        <div className="resource-empty"><h3>No matching resource.</h3><p>Try a broader chapter name or clear the current filter.</p></div>
      )}
    </section>
  );
}
