"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "../ui-icons";
import { SYSTEMS, EXPLANATIONS, type Atlas, type Concept, type Part, type SceneState, type SystemId, type View } from "./anatomy";

const AnatomyScene = dynamic(() => import("./scene"), { ssr: false, loading: () => <div className="atlas-canvas-loading">Preparing the 3D canvas…</div> });
const CompatibilityScene = dynamic(() => import("./compatibility-scene"), { ssr: false });
const organSystems: SystemId[] = ["skeletal", "cardiac", "respiratory", "digestive", "urinary", "endocrine", "nervous", "reproductive"];
const commonOrgans = ["heart", "brain", "liver", "right lung", "left lung", "stomach", "kidney", "pancreas", "spleen", "urinary bladder", "diaphragm", "vertebral column"];
const regions = ["Whole body", "Head & neck", "Chest", "Abdomen & pelvis", "Arms & hands", "Legs & feet"];
function inRegion(part: Part, region: string) {
  const lo = part.bounds[0], hi = part.bounds[1], x = Math.abs((lo[0] + hi[0]) / 2), y = (lo[1] + hi[1]) / 2;
  if (region === "Head & neck") return hi[1] >= 1.37;
  if (region === "Chest") return hi[1] >= 1.06 && lo[1] < 1.37 && x < .20;
  if (region === "Abdomen & pelvis") return hi[1] >= .69 && lo[1] < 1.06 && x < .21;
  if (region === "Arms & hands") return x >= .18 && y >= .60;
  if (region === "Legs & feet") return lo[1] < .69;
  return true;
}
export function AtlasExplorer() {
  const [compatibility, setCompatibility] = useState(false);
  const [atlas, setAtlas] = useState<Atlas | null>(null);
  const [requested, setRequested] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(0);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Whole body");
  const [visible, setVisible] = useState<SystemId[]>(organSystems);
  const [selected, setSelected] = useState<Concept | null>(null);
  const [isolate, setIsolate] = useState(false);
  const [view, setView] = useState<View>("front");
  const [reset, setReset] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [rotate, setRotate] = useState(false);
  const [surfaceOpacity, setSurfaceOpacity] = useState(.12);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (!requested) return;
    const controller = new AbortController();
    fetch("/atlas/models/atlas.json", { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("The anatomy catalogue could not be loaded."); return r.json(); }).then(data => setAtlas(data as Atlas)).catch(e => { if (e.name !== "AbortError") setError("The atlas could not load. Check your connection and try again."); });
    return () => controller.abort();
  }, [requested, generation]);
  const handleRendererError = useCallback((message: string) => {
    if (message.includes("WebGL") || message.includes("3D session")) { setCompatibility(true); setProgress(0);setRotate(false); }
    else setError(message);
  }, []);
  const matched = useMemo(() => {
    if (!atlas) return [];
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return terms.length ? atlas.concepts.filter(c => terms.every(t => `${c.name} ${c.id}`.toLowerCase().includes(t))) : commonOrgans.map(name => atlas.concepts.find(c => c.name.toLowerCase() === name)).filter((c): c is Concept => Boolean(c));
  }, [atlas, query]);
  const regionParts = useMemo(() => atlas && region !== "Whole body" ? atlas.parts.filter(p => inRegion(p, region)).map(p => p.id) : undefined, [atlas, region]);
  const sceneState = useMemo<SceneState>(() => ({ visible, selected: selected?.elements ?? [], isolate, view, reset, rotate, zoom, surfaceOpacity, regionParts, explode: 0, inspectorOpen: false }), [visible, selected, isolate, view, reset, rotate, zoom, surfaceOpacity, regionParts]);
  const selectedParts = useMemo(() => atlas && selected ? atlas.parts.filter(p => selected.elements.includes(p.id)) : [], [atlas, selected]);
  const selectedSystems = useMemo(() => SYSTEMS.filter(s => selectedParts.some(p => p.system === s.id)), [selectedParts]);
  const inspect = useCallback((concept: Concept) => { setSelected(concept); setIsolate(true); setRegion("Whole body"); setRotate(false); setZoom(0); setReset(r => r+1); setSidebarOpen(false); }, []);
  const pick = useCallback((id: string) => {
    if (!atlas) return;
    const part = atlas.parts.find(p => p.id === id);
    if (part) { setSelected({ id: part.conceptId, name: part.name, elements: [part.id] }); setRotate(false); }
  }, [atlas]);
  function showPreset(preset: "organs" | "skeleton" | "muscles" | "all") {
    setVisible(preset === "organs" ? organSystems : preset === "skeleton" ? ["skeletal"] : preset === "muscles" ? ["skeletal", "muscular"] : SYSTEMS.filter(s => s.id !== "integumentary").map(s => s.id));
    setSelected(null); setIsolate(false); setZoom(0); setReset(r => r+1);
  }
  function changeRegion(value: string) { setRegion(value); setSelected(null); setIsolate(false); setZoom(0); setReset(r => r+1); }
  function resetView() { setView("front"); setZoom(0); setReset(r => r+1); setRotate(false); }
  const countVisible = atlas?.parts.filter(p => isolate ? selected?.elements.includes(p.id) : (visible.includes(p.system) && (!regionParts || regionParts.includes(p.id))) || selected?.elements.includes(p.id)).length ?? 0;
  const explanation = selected ? EXPLANATIONS[selected.name.toLowerCase()] : undefined;
  return <section className="atlas-workspace" aria-label="Human anatomy atlas">
    <div className="atlas-workspace-top"><div><span className="atlas-live-dot"/><strong>Human Atlas</strong><small>ADULT MALE REFERENCE</small></div><button type="button" className="atlas-browse-toggle" aria-expanded={sidebarOpen} aria-controls="atlas-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}><Icon name="layers"/>{sidebarOpen ? "Close controls" : "Browse anatomy"}</button><span className="atlas-top-count">{atlas ? `${atlas.parts.length.toLocaleString()} structures · 15 systems` : "Explore the body, layer by layer"}</span></div>
    <div className="atlas-layout">
      <aside id="atlas-sidebar" className={`atlas-sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Anatomy navigation">
        <div className="atlas-search"><label htmlFor="atlas-search">Find a structure</label><div><Icon name="search"/><input id="atlas-search" type="search" placeholder="Heart, femur, optic nerve…" value={query} onChange={e => setQuery(e.target.value)} disabled={!atlas}/>{query && <button type="button" aria-label="Clear anatomy search" onClick={() => setQuery("")}><Icon name="close"/></button>}</div></div>
        <label className="atlas-region-label">Body region<select value={region} onChange={e => changeRegion(e.target.value)} disabled={!atlas}>{regions.map(r => <option key={r}>{r}</option>)}</select></label>
        {query.trim() ? <div className="atlas-search-results"><p aria-live="polite">{matched.length} results{matched.length>80 ? " · showing the first 80" : ""}</p>{matched.slice(0,80).map(c => <button key={c.id} onClick={() => inspect(c)} aria-pressed={selected?.id===c.id}><span>{c.name}</span><Icon name="arrow"/></button>)}{matched.length===0&&<p>Try a shorter anatomical name, or search by FMA identifier.</p>}</div> : <>
          <div className="atlas-presets" aria-label="Quick layer presets"><span>QUICK VIEWS</span><div><button onClick={() => showPreset("organs")} disabled={!atlas}>Organs</button><button onClick={() => showPreset("skeleton")} disabled={!atlas}>Skeleton</button><button onClick={() => showPreset("muscles")} disabled={!atlas}>Muscles</button><button onClick={() => showPreset("all")} disabled={!atlas}>All systems</button></div></div>
          <details className="atlas-layer-list" open><summary>Anatomical layers <small>{visible.length} active</small></summary>{SYSTEMS.map(system => <label key={system.id}><input type="checkbox" checked={visible.includes(system.id)} disabled={!atlas} onChange={e => { setVisible(v => e.target.checked ? [...v, system.id] : v.filter(id => id!==system.id)); setIsolate(false); setSelected(null); }}/><i style={{background:system.color}}/><span>{system.name}</span></label>)}{visible.includes("integumentary")&&<label className="atlas-opacity">Body surface opacity<input aria-label="Body surface opacity" type="range" min="5" max="100" value={Math.round(surfaceOpacity*100)} onChange={e => setSurfaceOpacity(Number(e.target.value)/100)}/></label>}</details>
          <details className="atlas-organ-list" open><summary>Jump to an organ</summary>{matched.map(c => <button key={c.id} onClick={() => inspect(c)} aria-pressed={selected?.id===c.id}><span>{c.name}</span><Icon name="arrow"/></button>)}</details>
        </>}
      </aside>
      <div className="atlas-main">
        <div className="atlas-view-toolbar" aria-label="View controls"><div>{([['front','Front'],['back','Back'],['side','Side'],['three-quarter','3D']] as [View,string][]).map(([value,label]) => <button key={value} onClick={() => { setView(value);setReset(r=>r+1);setZoom(0); }} aria-pressed={view===value} disabled={!atlas}>{label}</button>)}</div><div><button aria-label="Zoom in" onClick={() => setZoom(z=>Math.min(12,z+1))} disabled={!atlas}>+</button><button aria-label="Zoom out" onClick={() => setZoom(z=>Math.max(-5,z-1))} disabled={!atlas}>−</button><button onClick={resetView} disabled={!atlas}>Reset</button></div></div>
        <div className="atlas-stage">
          {atlas && !error && (compatibility ? <CompatibilityScene key={generation} atlas={atlas} state={sceneState} onSelect={pick} onProgress={setProgress} onError={setError}/> : <AnatomyScene key={generation} atlas={atlas} state={sceneState} onSelect={pick} onProgress={setProgress} onError={handleRendererError}/>)}
          {!requested && <div className="atlas-start"><span className="atlas-start-icon"><Icon name="layers"/></span><p className="eyebrow">GET A CLOSER LOOK</p><h2>A whole body<br />of connections.</h2><p>Rotate the reference anatomy, peel away systems and explore individual structures in three dimensions.</p><button className="button button-dark" onClick={() => setRequested(true)}>Open the 3D atlas <Icon name="arrow"/></button><small>About 33 MB · loads only when you open it</small></div>}
          {requested && progress<100 && !error && <div className="atlas-loading" role="status"><strong>{atlas ? `Loading anatomy · ${progress}%` : "Opening the anatomy catalogue…"}</strong><progress value={progress} max={100}/><span>The complete body is loading. This can take a moment.</span></div>}
          {error && <div className="atlas-error" role="alert"><h2>Let’s try that again.</h2><p>{error}</p><button className="button button-dark" onClick={() => { setError("");setProgress(0);setAtlas(null);setGeneration(g=>g+1); }}>Reload atlas</button></div>}
          {atlas&&progress===100&&!error&&countVisible===0&&<div className="atlas-empty"><p>No layers are visible in this view.</p><button className="button button-dark" onClick={()=>showPreset("all")}>Show all systems</button></div>}
          {atlas&&progress===100&&!error&&<div className="atlas-canvas-hint">{compatibility ? "Compatibility view · Drag to rotate · Use + / − to zoom" : "Drag to rotate · Scroll or pinch to zoom · Select a structure"}</div>}
        </div>
        <div className="atlas-view-status"><span aria-live="polite">{atlas ? `${countVisible.toLocaleString()} structures ${progress===100&&!error ? "visible" : "selected"}` : "Anatomy that you can explore"}{region!=="Whole body" ? ` · ${region}` : ""}</span><button aria-pressed={rotate} disabled={!atlas||isolate||compatibility} onClick={()=>setRotate(!rotate)}>{rotate ? "Pause rotation" : "Auto-rotate"}</button></div>
        <div className="atlas-detail" aria-live="polite">{selected ? <><div className="atlas-detail-title"><div><span>{selectedSystems.map(s=>s.name).join(" · ")}</span><h2>{selected.name}</h2></div><button aria-label="Clear selected structure" onClick={()=>{setSelected(null);setIsolate(false);setReset(r=>r+1);}}><Icon name="close"/></button></div><p className="atlas-source-id">{selected.id} · {selected.elements.length} {selected.elements.length===1 ? "mesh" : "meshes"} in this selection</p>{explanation?<p>{explanation}</p>:<><strong className="atlas-system-context">System context</strong><p>{selectedSystems[0]?.description}</p></>}<div className="atlas-detail-actions"><button className="button button-dark" onClick={()=>{setIsolate(!isolate);setZoom(0);setReset(r=>r+1);}}>{isolate ? "Show in the body" : "Isolate structure"}<Icon name="target"/></button><button className="text-button" onClick={resetView}>Centre view</button></div></>:<><p className="eyebrow">HOW DOES IT ALL FIT TOGETHER?</p><h2>Select something that makes you curious.</h2><p>Search the sidebar, jump to an organ, or click the model. Use layer checkboxes to see how one system relates to another.</p></>}</div>
      </div>
    </div>
    <div className="atlas-credits">{compatibility&&<p className="atlas-compatibility-note">Your browser is using the reduced-detail compatibility view because WebGL is unavailable. It uses the same reference anatomy with simplified surface geometry; fine anatomical detail is reduced.</p>}<p>BodyParts3D, © The Database Center for Life Science · CC BY 4.0. Viewer adapted from <a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noreferrer">Human Atlas</a> (MIT). <a href="/atlas/ATTRIBUTION.md" target="_blank" rel="noreferrer">Full attribution</a>.</p><p>Adult male reference anatomy; does not include all human structures, female anatomy or individual variations. Regions are approximate spatial filters; long structures may span multiple regions. For anatomical learning.</p></div>
  </section>;
}
