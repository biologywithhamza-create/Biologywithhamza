"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./ui-icons";

const routes = {
  mdcat: { label: "MDCAT Biology", title: "Build the concept. Beat the distractor.", copy: "Connect the science, practise your judgment, and find the gaps before exam day.", number: "1,600", stat: "explained practice questions", links: [{ title: "Start a chapter test", text: "100 MCQs in each of 16 chapters", href: "/practice", icon: "target" as const }, { title: "Watch a clear explanation", text: "Learn with Hamza on video", href: "/videos", icon: "play" as const }, { title: "Find your lecture notes", text: "An organised student resource library", href: "/resources", icon: "book" as const }] },
  cambridge: { label: "Cambridge O Level", title: "Understand the science. Make every mark count.", copy: "Follow the 5090 topic route, develop practical thinking, and make your biological explanations precise.", number: "19", stat: "syllabus topics to explore", links: [{ title: "Explore the 5090 topic map", text: "A clear next step for every topic", href: "/cambridge-o-level", icon: "layers" as const }, { title: "Make a concept click", text: "Experiment in the interactive Biology Lab", href: "/lab", icon: "lab" as const }, { title: "Read the learning guides", text: "Concepts, diagrams and answer technique", href: "/articles", icon: "book" as const }] },
};
export function LearningRoutes() {
  const [track, setTrack] = useState<keyof typeof routes>("mdcat");
  const route = routes[track];
  return <section className="learning-routes wrap" id="learning-routes" aria-labelledby="routes-title">
    <div className="section-heading"><div><p className="eyebrow">YOUR GOAL. YOUR ROUTE.</p><h2 id="routes-title">One teacher.<br />Two serious tracks.</h2></div><p>Different exams. The same belief:<br />understanding changes everything.</p></div>
    <div className="route-board">
      <div className="route-story"><div className="route-switch" aria-label="Choose your learning track">{Object.entries(routes).map(([key, value]) => <button key={key} type="button" aria-pressed={track === key} onClick={() => setTrack(key as keyof typeof routes)}>{value.label}</button>)}</div><div className="route-story-content" key={track}><h3>{route.title}</h3><p>{route.copy}</p><div className="route-stat"><strong>{route.number}</strong><span>{route.stat}</span></div></div></div>
      <div className="route-steps" aria-live="polite">{route.links.map((item, i) => <Link href={item.href} key={item.href}><span className="route-step-icon"><Icon name={item.icon}/></span><div><small>0{i + 1}</small><h3>{item.title}</h3><p>{item.text}</p></div><Icon name="arrow" /></Link>)}</div>
    </div>
  </section>;
}
export function EnzymeTeaser() {
  const [substrate, setSubstrate] = useState(30);
  const rate = Math.round(100 * substrate / (20 + substrate));
  const curve = Array.from({ length: 51 }, (_, i) => { const s = i * 2; return `${i === 0 ? "M" : "L"}${36 + s * 2.65},${170 - (100 * s / (20 + s)) * 1.35}`; }).join(" ");
  return <div className="enzyme-teaser"><div className="teaser-heading"><span><i />LIVE EXPERIMENT</span><span>01 / ENZYMES</span></div><h3>More substrate.<br />Always a faster reaction?</h3>
    <svg viewBox="0 0 340 200" role="img" aria-label={`Illustrative enzyme saturation curve. At ${substrate} relative substrate units the rate is ${rate} relative units.`}>{[40,80,120,160].map(y => <line key={y} x1="36" y1={y} x2="307" y2={y} stroke="currentColor" opacity=".1" />)}<path d="M36 25V170H307" fill="none" stroke="currentColor" opacity=".5" /><text x="36" y="16">Reaction rate</text><text x="198" y="191">Substrate concentration</text><path d={curve} fill="none" stroke="currentColor" strokeWidth="3"/><path d={`M${36+substrate*2.65} 170 V${170-rate*1.35}`} stroke="currentColor" strokeDasharray="4 4" opacity=".5"/><circle cx={36+substrate*2.65} cy={170-rate*1.35} r="7" fill="var(--orange)" stroke="var(--ink)" strokeWidth="2"/></svg>
    <label className="teaser-control"><span>Slide to add substrate <strong>{substrate} units</strong></span><input aria-label="Substrate concentration preview" type="range" min="0" max="100" value={substrate} onChange={e => setSubstrate(Number(e.target.value))}/></label><p className="teaser-answer" aria-live="polite">{substrate < 20 ? "At low substrate levels, adding substrate has a large effect." : substrate < 60 ? "The rate rises, but the curve is already beginning to level off." : "The enzyme is approaching saturation. More substrate has less effect."}</p><small className="model-caption">Illustrative model · constant enzyme amount and conditions</small>
  </div>;
}
