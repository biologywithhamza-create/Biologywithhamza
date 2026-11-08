"use client";
import Link from "next/link";
import { useStudy } from "../study-store";
import { useProfile, useRevision } from "../revision/store";
import { learningChapters } from "../learn/catalogue";
import { cambridgeTopics } from "../cambridge-o-level/topics";
import { articles, videos } from "../content";
import { activities } from "../lab/activity-data";
import { ContinueLearning } from "../recent-learning";
import { TrackPicker, useLearningTrack } from "../learning-preferences";
import { Icon } from "../ui-icons";
export function ProgressHome(){
  const study=useStudy(), profile=useProfile(), revision=useRevision(profile?.id??null),track=useLearningTrack();
  const catalogue=[...learningChapters.map(c=>({path:'/learn/'+c.slug,title:c.title})),...cambridgeTopics.map(t=>({path:'/cambridge-o-level/'+t.slug,title:t.title})),...articles.map(a=>({path:'/articles/'+a.slug,title:a.title})),...activities.map(a=>({path:'/lab/'+a.slug,title:a.title})),...videos.map(v=>({path:'/videos#'+new URL(v.href).searchParams.get('v'),title:v.title}))];
  const saved=catalogue.filter(r=>study.saved.includes(r.path));
  const noted=catalogue.filter(r=>study.notes[r.path]?.trim());
  return <><header className="student-page-heading"><p className="eyebrow">YOUR LEARNING</p><h1>My Progress</h1><p>{profile?`Welcome back, ${profile.name}. `:''}Find your saved work and choose your next step.</p></header><TrackPicker/><p className="device-note"><Icon name="bookmark"/>Saved in this browser on this device.<Link href="/account">Back up or restore progress</Link></p><ContinueLearning/>
    <section className="progress-actions" id="review" aria-label="Your next study session"><Link className="progress-action progress-action-primary" href={track==='cambridge'?'/cambridge-practice':'/revision'}><Icon name="target"/><h2>{track==='cambridge'?'Review your Cambridge answers':'Review mistakes'}</h2><p>{track==='cambridge'?'Revisit your written responses and compare them with marking points.':revision.attempts.length?`${revision.attempts.length} saved ${revision.attempts.length === 1 ? "attempt" : "attempts"}. Review explanations and find what to practise next.`:'Finish a chapter quiz to start your mistake notebook.'}</p><strong>{track==='cambridge'?'Open answer practice':'Open mistake notebook'} <Icon name="arrow"/></strong></Link><Link className="progress-action" href="/study-today"><Icon name="clock"/><h2>Plan today’s study</h2><p>Choose the time you have and build a manageable revision session.</p><strong>Open study plan <Icon name="arrow"/></strong></Link></section>
    <section className="progress-saved" aria-labelledby="saved-title"><div className="student-section-heading"><h2 id="saved-title">Saved for later <span className="quiet-count">{saved.length}</span></h2><Link href="/learn">Browse chapters <Icon name="arrow"/></Link></div>{saved.length?<ul className="progress-link-list">{saved.map(r=><li key={r.path}><Link href={r.path}>{r.title}<Icon name="arrow"/></Link></li>)}</ul>:<div className="student-empty"><p>Use “Save for later” on a chapter, article or activity to keep it here.</p><Link className="student-primary" href="/learn">Find a chapter <Icon name="arrow"/></Link></div>}</section>
    {noted.length>0&&<section className="progress-saved"><h2>Your study notes</h2><ul className="progress-link-list">{noted.map(r=><li key={r.path}><Link href={r.path}>{r.title}<Icon name="arrow"/></Link></li>)}</ul></section>}
    <nav className="student-resource-row" aria-label="Progress tools"><Link href="/account">Back up & restore <Icon name="download"/></Link><Link href={track==='cambridge'?'/cambridge-practice':'/practice'}>Start a new practice session <Icon name="target"/></Link><Link href="/offline-packs">Study offline <Icon name="book"/></Link></nav>
  </>;
}
