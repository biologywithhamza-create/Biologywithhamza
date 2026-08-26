"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "./components";
import { articles } from "./content";
import type { ArticleCategory } from "./content";

const categories: Array<"All" | ArticleCategory> = [
  "All",
  "MDCAT",
  "Cambridge O Level",
  "Learn Biology",
  "Study Strategy",
];

export function ArticleExplorer() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${article.title} ${article.description} ${article.topic} ${article.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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

      <p className="article-result-count" aria-live="polite">
        {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
      </p>

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
