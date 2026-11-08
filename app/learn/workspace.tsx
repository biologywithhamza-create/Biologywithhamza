"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { learningChapters } from "./catalogue";
import { cambridgeTopics } from "../cambridge-o-level/topics";
import { useStudy } from "../study-store";
import { TrackPicker, useLearningTrack } from "../learning-preferences";
import { Icon } from "../ui-icons";
export function LearningDashboard() {
  const study=useStudy(), track=useLearningTrack();
  const [query,Q]=useState(""),[filter,F]=useState("All");
  useEffect(()=>{Q(new URLSearchParams(window.location.search).get("q")??"");},[]);
  const all=[...learningChapters.map(c=>({index:c.index,title:c.title,description:c.article?.description??"",path:"/learn/"+c.slug,track:"mdcat",label:`${c.activities.length} activities · 100 questions`})),...cambridgeTopics.map((t,i)=>({index:i+1,title:t.title,description:t.summary,path:"/cambridge-o-level/"+t.slug,track:"cambridge",label:"Cambridge 5090 topic"}))];
  const rows=all.filter(r=>r.track===track&&`${r.title} ${r.description}`.toLowerCase().includes(query.trim().toLowerCase())&&(filter==="All"||(filter==="Completed")===study.completed.includes(r.path)));
  return <><header className="student-page-heading"><p className="eyebrow">LEARN BIOLOGY</p><h1>Find your chapter.</h1><p>Everything for a topic, together: lessons, notes, activities and practice.</p></header><TrackPicker/><div className="student-chapter-toolbar"><label>Search chapters<input type="search" placeholder={track==='mdcat'?'Try enzymes, cells or inheritance':'Try transport, ecology or coordination'} value={query} onChange={e=>Q(e.target.value)}/></label><label>Show<select value={filter} onChange={e=>F(e.target.value)}><option>All</option><option>To do</option><option>Completed</option></select></label></div><div className="student-list-heading"><p role="status">{rows.length} {track==='cambridge'?'Cambridge O Level':'MDCAT'} {rows.length === 1 ? 'chapter' : 'chapters'}</p>{(query||filter!=='All')&&<button className="student-text-button" onClick={()=>{Q('');F('All');}}>Clear filters</button>}</div><div className="chapter-grid">{rows.map(r=><Link className="chapter-card" href={r.path} key={r.path}><small>CHAPTER {String(r.index).padStart(2,'0')}{study.completed.includes(r.path)?' · Completed':''}</small><h2>{r.title}</h2><p>{r.description}</p><span className="chapter-card-meta">{r.label}</span><strong>Open chapter <Icon name="arrow"/></strong></Link>)}</div>{!rows.length&&<div className="student-empty"><h2>No matching chapters.</h2><p>Try a shorter topic name or choose the other course.</p><button onClick={()=>{Q('');F('All');}}>Show all chapters</button></div>}<nav className="student-resource-row" aria-label="More learning resources"><Link href="/resources">Notes & downloads <Icon name="download"/></Link><Link href="/videos">Video lessons <Icon name="play"/></Link><Link href="/offline-packs">Offline chapter packs <Icon name="book"/></Link><Link href="/progress">Saved guides & study plan <Icon name="bookmark"/></Link>{track==='cambridge'&&<Link href="/cambridge-o-level">5090 syllabus map <Icon name="arrow"/></Link>}</nav></>;
}
