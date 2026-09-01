"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "./components";
import { articles } from "./content";
import type { ArticleCategory } from "./content";
import {
  getArticleReadMinutes,
  getArticleTopicGroup,
  type ArticleTopicGroup,
} from "./article-data";

const categories: Array<"All" | ArticleCategory> = [
  "All",
  "MDCAT",
  "Cambridge O Level",
  "Learn Biology",
  "Study Strategy",
];

const topicGroups: Array<"All topics" | ArticleTopicGroup> = [
  "All topics",
  "Cells & molecules",
  "Human physiology",
  "Genetics & evolution",
  "Disease & biotechnology",
  "Practical & exam skills",
];

type ReadingLength = "Any length" | "Under 5 minutes" | "5+ minutes";

export function ArticleExplorer() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [topicGroup, setTopicGroup] = useState<(typeof topicGroups)[number]>("All topics");
  const [readingLength, setReadingLength] = useState<ReadingLength>("Any length");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesTopic = topicGroup === "All topics" || getArticleTopicGroup(article) === topicGroup;
      const minutes = getArticleReadMinutes(article);
      const matchesLength =
        readingLength === "Any length" ||
        (readingLength === "Under 5 minutes" && minutes < 5) ||
        (readingLength === "5+ minutes" && minutes >= 5);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${article.title} ${article.description} ${article.topic} ${article.category} ${article.sections.map((section) => section.heading).join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesTopic && matchesLength && matchesQuery;
    });
  }, [category, query, readingLength, topicGroup]);

  const hasActiveFilters =
    category !== "All" ||
    query.trim().length > 0 ||
    topicGroup !== "All topics" ||
    readingLength !== "Any length";

  function clearFilters() {
    setCategory("All");
    setQuery("");
    setTopicGroup("All topics");
    setReadingLength("Any length");
  }

  return (
    <section className="article-explorer" aria-labelledby="article-library-title">
      <div className="article-explorer-heading">
        <div>
          <p className="eyebrow">Complete learning library</p>
          <h2 id="article-library-title">Find the explanation you need.</h2>
        </div>
        <label className="article-search">
          <span>Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try enzymes, immunity or osmosis"
          />
        </label>
      </div>

      <div className="article-select-filters">
        <label>
          <span>Topic group</span>
          <select value={topicGroup} onChange={(event) => setTopicGroup(event.target.value as (typeof topicGroups)[number])}>
            {topicGroups.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Reading length</span>
          <select value={readingLength} onChange={(event) => setReadingLength(event.target.value as ReadingLength)}>
            <option value="Any length">Any length</option>
            <option value="Under 5 minutes">Under 5 minutes</option>
            <option value="5+ minutes">5 minutes or longer</option>
          </select>
        </label>
      </div>

      <div className="article-filter" aria-label="Filter articles by category">
        {categories.map((item) => (
          <button
            type="button"
            className={category === item ? "is-active" : ""}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="article-results-row">
        <p className="article-result-count" aria-live="polite">
          {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
        </p>
        {hasActiveFilters && <button type="button" onClick={clearFilters}>Clear all filters</button>}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="article-list-grid article-list-grid-complete">
          {filteredArticles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      ) : (
        <div className="article-empty">
          <h3>No article matches that search.</h3>
          <p>Try a chapter name, process or broader category.</p>
        </div>
      )}
    </section>
  );
}
