"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
export type LearningTrack = "mdcat" | "cambridge";
const key = "bwh-learning-track-v1";
let fallback: LearningTrack = "mdcat";
function snapshot(): LearningTrack {
  try { const stored = localStorage.getItem(key); return stored === "cambridge" || stored === "mdcat" ? stored : fallback; }
  catch { return fallback; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); window.addEventListener("bwh-track", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("bwh-track", callback); };
}
export function chooseTrack(track: LearningTrack) {
  fallback = track;
  try { localStorage.setItem(key, track); } catch { /* Course choice still works for this visit. */ }
  window.dispatchEvent(new Event("bwh-track"));
}
export function useLearningTrack() { return useSyncExternalStore(subscribe, snapshot, () => "mdcat" as LearningTrack); }
export function LearningTrackSync() {
  const path = usePathname().replace(/\/$/, "") || "/";
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("track");
    if (requested === "mdcat" || requested === "cambridge") chooseTrack(requested);
    else if (path.startsWith("/cambridge-")) chooseTrack("cambridge");
    else if (path.startsWith("/learn/") || path === "/practice" || path === "/mocks") chooseTrack("mdcat");
  }, [path]);
  return null;
}
export function TrackPicker() {
  const track = useLearningTrack();
  return <div className="course-picker" role="group" aria-label="Choose your course"><span>Your course</span><div>{([ ["mdcat", "MDCAT Biology"], ["cambridge", "Cambridge O Level"] ] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={track === value} onClick={() => chooseTrack(value)}>{label}</button>)}</div></div>;
}
