"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Icon } from "./ui-icons";

export const APPEARANCE_KEY = "bwh-appearance-v1";
export type Theme = "system" | "light" | "dark";
export type TextSize = "standard" | "large" | "larger";
const defaults = '{"theme":"system","textSize":"standard"}';
function read() { try { return localStorage.getItem(APPEARANCE_KEY) || defaults; } catch { return defaults; } }
export function parseAppearance(raw: string) {
  try {
    const value = JSON.parse(raw);
    return { theme: (["system", "light", "dark"].includes(value?.theme) ? value.theme : "system") as Theme,
      textSize: (["standard", "large", "larger"].includes(value?.textSize) ? value.textSize : "standard") as TextSize };
  } catch { return { theme: "system" as Theme, textSize: "standard" as TextSize }; }
}
let temporary: string | null = null;
function snapshot() { return temporary ?? read(); }
function subscribe(fn: () => void) {
  const sync = () => { temporary = null; fn(); };
  window.addEventListener("storage", sync); window.addEventListener("bwh-appearance", fn);
  return () => { window.removeEventListener("storage", sync); window.removeEventListener("bwh-appearance", fn); };
}
function apply(raw: string) {
  const prefs = parseAppearance(raw);
  document.documentElement.dataset.theme = prefs.theme === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : prefs.theme;
  document.documentElement.dataset.readingSize = prefs.textSize;
}
export function useAppearance() {
  return parseAppearance(useSyncExternalStore(subscribe, snapshot, () => defaults));
}
export function setAppearance(patch: Partial<ReturnType<typeof parseAppearance>>) {
  const raw = JSON.stringify({ ...parseAppearance(snapshot()), ...patch });
  temporary = raw;
  try { localStorage.setItem(APPEARANCE_KEY, raw); } catch { /* Remains usable for this session. */ }
  apply(raw); window.dispatchEvent(new Event("bwh-appearance"));
}
export function AppearanceSync() {
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => apply(snapshot());
    const external = () => { temporary = null; sync(); };
    sync(); media.addEventListener("change", sync); window.addEventListener("storage", external);
    return () => { media.removeEventListener("change", sync); window.removeEventListener("storage", external); };
  }, []);
  return null;
}
export function ThemeSwitch() {
  const { theme } = useAppearance();
  const panel = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !panel.current?.contains(event.target) && panel.current) panel.current.open = false; };
    window.addEventListener("pointerdown", outside);
    return () => window.removeEventListener("pointerdown", outside);
  }, []);
  return <details ref={panel} className="theme-switch" onKeyDown={e => { if (e.key === "Escape" && panel.current?.open) { panel.current.open = false; panel.current.querySelector("summary")?.focus(); e.stopPropagation(); } }}>
    <summary aria-label="Choose colour theme"><Icon name="sun" /><span>Theme</span></summary>
    <div className="theme-menu"><p>Make yourself comfortable</p><div role="group" aria-label="Colour theme">
      {(["light", "dark", "system"] as Theme[]).map(t => <button key={t} type="button" aria-pressed={theme === t} onClick={() => { setAppearance({ theme: t }); if(panel.current) { panel.current.open = false; panel.current.querySelector("summary")?.focus(); } }}><span aria-hidden="true">{t === "light" ? "☀" : t === "dark" ? "☾" : "◐"}</span>{t[0].toUpperCase()+t.slice(1)}<span aria-hidden="true">{theme === t ? "✓" : ""}</span></button>)}
    </div><small>System follows your device. Your choice is saved in this browser when storage is available.</small></div>
  </details>;
}
