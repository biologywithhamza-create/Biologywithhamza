"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrackPicker, useLearningTrack } from "./learning-preferences";
import { Icon } from "./ui-icons";
export function HomeLauncher() {
  const track = useLearningTrack(), router = useRouter();
  const [query, setQuery] = useState("");
  function find(event: FormEvent) { event.preventDefault(); router.push(`/learn?track=${track}&q=${encodeURIComponent(query.trim())}`); }
  return <div className="home-study-start"><TrackPicker/><form className="chapter-search-form" onSubmit={find}><label htmlFor="home-topic-search">What would you like to study?</label><div><Icon name="search"/><input id="home-topic-search" type="search" placeholder="Search a chapter, e.g. enzymes" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit">Find chapter <Icon name="arrow"/></button></div></form><div className="home-task-links"><Link className="student-primary" href={`/learn?track=${track}`}><Icon name="book"/>Browse chapters</Link><Link href={track==='cambridge'?'/cambridge-practice':'/practice'}><Icon name="target"/>Start practice</Link><Link href="/progress#review"><Icon name="bookmark"/>Review mistakes</Link></div></div>;
}
