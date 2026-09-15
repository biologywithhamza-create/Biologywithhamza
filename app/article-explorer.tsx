"use client";

import Link from "next/link";
import {useStudy} from "./study-store";
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
const study=useStudy();const [page,setPage]=useState(1),[sort,setSort]=useState("Featured"),[savedOnly,setSavedOnly]=useState(false);
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
      return matchesCategory && matchesTopic && matchesLength && matchesQuery && (!savedOnly||study.saved.includes("/articles/"+article.slug));
    }).sort((a,b)=>sort==="Title"?a.title.localeCompare(b.title):sort==="Shortest first"?getArticleReadMinutes(a)-getArticleReadMinutes(b):sort==="Newest"?b.dateISO.localeCompare(a.dateISO):0);
  }, [category, query, readingLength, topicGroup,sort,savedOnly,study.saved]);
const pages=Math.max(1,Math.ceil(filteredArticles.length/9)),activePage=Math.min(page,pages);

  const hasActiveFilters =
    category !== "All" ||
    query.trim().length > 0 ||
    topicGroup !== "All topics" ||
    readingLength !== "Any length";

  function clearFilters() {
    setPage(1);setSavedOnly(false);
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
            onChange={(event) => {setQuery(event.target.value);setPage(1);}}
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
            onClick={() => {setCategory(item);setPage(1);}}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="article-sort-controls"><label>Sort by<select value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}}>{["Featured","Newest","Title","Shortest first"].map(s=><option key={s}>{s}</option>)}</select></label><button aria-pressed={savedOnly} onClick={()=>{setSavedOnly(!savedOnly);setPage(1);}}>Saved articles only</button><Link href="/learn">Your learning workspace →</Link></div><div className="article-results-row">
        <p className="article-result-count" aria-live="polite">
          {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
        </p>
        {hasActiveFilters && <button type="button" onClick={clearFilters}>Clear all filters</button>}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="article-list-grid article-list-grid-complete">
          {filteredArticles.slice((activePage-1)*9,activePage*9).map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      ) : (
        <div className="article-empty">
          <h3>No article matches that search.</h3>
          <p>Try a chapter name, process or broader category.</p>
        </div>
      )}
      {pages>1&&<nav className="article-pagination" aria-label="Article pages"><button disabled={activePage===1} onClick={()=>setPage(activePage-1)}>← Previous</button><span role="status">Page {activePage} of {pages}</span><button disabled={activePage===pages} onClick={()=>setPage(activePage+1)}>Next →</button></nav>}
    </section>
  );
}
