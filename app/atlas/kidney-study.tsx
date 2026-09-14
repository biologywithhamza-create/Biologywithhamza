"use client";
import {useState} from 'react';
const structures=[
 {id:'capsule',name:'Fibrous capsule',color:'#914240',text:'A thin, tough connective-tissue covering encloses the kidney. This is distinct from the glomerular (Bowman’s) capsule around each renal corpuscle.'},
 {id:'cortex',name:'Cortex & renal columns',color:'#d88983',text:'The outer cortex contains renal corpuscles and convoluted tubules. Extensions of cortical tissue between the pyramids form renal columns.'},
 {id:'medulla',name:'Medullary pyramids',color:'#a04a59',text:'The inner medulla contains loops of Henle and collecting ducts. Each pyramid tapers towards a papilla, where urine drains into a minor calyx.'},
 {id:'calyces',name:'Calyces',color:'#d3a44b',text:'Minor calyces receive urine at the papillae. They merge into major calyces and then the renal pelvis.'},
 {id:'pelvis',name:'Renal pelvis & ureter',color:'#e6bc69',text:'The funnel-shaped pelvis collects urine and continues as the ureter, which carries urine to the bladder by muscular contractions.'},
 {id:'vessels',name:'Renal artery & vein',color:'#ba4b48',text:'The renal artery brings blood for filtration; the renal vein carries blood away. Blood and urine travel through different pathways.'},
];
const steps=[
 ['Renal corpuscle','Pressure filters water and small solutes from glomerular capillaries into Bowman’s space. Blood cells and most plasma proteins remain in the circulation.'],
 ['Proximal convoluted tubule','Most filtered water and sodium are reabsorbed here. Under normal conditions, essentially all filtered glucose and amino acids return to the blood.'],
 ['Loop of Henle','The descending limb is permeable to water. The ascending limb reabsorbs salts but is relatively impermeable to water, helping establish the medullary osmotic gradient.'],
 ['Distal convoluted tubule','Further ion transport and hormonal regulation fine-tune the composition of tubular fluid.'],
 ['Collecting duct','ADH regulates water permeability, changing how much water is reabsorbed. Fluid continues towards the papilla and calyces; the collecting duct receives fluid from multiple nephrons.'],
];
export function KidneyStudy({onClose}:{onClose:()=>void}){
 const [tab,setTab]=useState('organ'),[selected,setSelected]=useState('cortex'),[hidden,setHidden]=useState<string[]>([]),[open,setOpen]=useState(true),[step,setStep]=useState(0);
 const current=structures.find(s=>s.id===selected)!;
 const show=(id:string)=>!hidden.includes(id),opacity=(id:string)=>selected===id?1:.65;
 const pick=(id:string)=>{setSelected(id);setHidden(h=>h.filter(s=>s!==id));};
 return <section className="kidney-study" aria-label="Kidney learning explorer">
  <div className="atlas-study-heading"><div><p className="eyebrow">KIDNEY EXPLORER</p><h2>Look beneath the surface.</h2></div><button onClick={onClose}>Back to 3D anatomy</button></div>
  <p className="atlas-study-note">Original teaching illustration. A simplified cutaway for learning, separate from the surface-only 3D kidney model.</p>
  <div className="atlas-study-tabs" aria-label="Kidney study views"><button aria-pressed={tab==='organ'} onClick={()=>setTab('organ')}>Organ cutaway</button><button aria-pressed={tab==='nephron'} onClick={()=>setTab('nephron')}>Follow a nephron</button></div>
  {tab==='organ'?<>
   <div className="atlas-study-actions"><button onClick={()=>setOpen(!open)}>{open?'Close cutaway':'Reveal interior'}</button><button onClick={()=>{setHidden([]);setOpen(true);}}>Restore all layers</button></div>
   <div className="kidney-grid"><div className="kidney-figure"><svg viewBox="0 0 600 580" role="img" aria-label="Schematic kidney section showing cortex, medullary pyramids, collecting calyces, renal pelvis, ureter and blood vessels">
    <path d="M340 52C180 2 70 106 67 278C61 448 173 559 316 524C414 499 419 413 364 359C317 312 315 277 367 224C434 158 417 85 340 52Z" fill={open?'#f2dfd8':'#9b5554'} stroke="#663a39" strokeWidth="5"/>
    {open&&<>
     {show('cortex')&&<path d="M340 52C180 2 70 106 67 278C61 448 173 559 316 524C414 499 419 413 364 359C317 312 315 277 367 224C434 158 417 85 340 52Z" fill="#d88983" opacity={opacity('cortex')}/>}
     {show('medulla')&&<g fill="#a04a59" stroke="#793746" strokeWidth="2" opacity={opacity('medulla')}>
      <path d="M159 127Q199 77 253 86L278 226Z"/><path d="M107 219Q111 173 140 142L271 249Z"/><path d="M106 321Q94 276 104 242L269 282Z"/><path d="M137 416Q108 376 109 343L278 319Z"/><path d="M225 482Q172 471 148 437L298 354Z"/><path d="M307 476Q269 494 244 485L320 363Z"/><path d="M285 86Q340 79 369 130L304 221Z"/>
     </g>}
     {show('calyces')&&<g fill="none" stroke="#eac26f" strokeWidth="15" strokeLinecap="round" opacity={opacity('calyces')}><path d="M277 226L299 250L328 271M270 250L303 270L328 285M269 282L304 289L330 299M278 319L310 310L334 309M298 354L315 334L339 322M320 363L330 340L340 328M304 221L319 245L330 269"/></g>}
     {show('pelvis')&&<g fill="#e6bc69" stroke="#997431" strokeWidth="2" opacity={opacity('pelvis')}><path d="M325 259Q353 268 387 284L373 322Q352 340 338 337L326 309Z"/><path d="M374 307C415 350 400 449 418 554L440 551C421 455 439 344 391 299Z"/></g>}
     {show('vessels')&&<g fill="none" strokeWidth="17" strokeLinecap="round" opacity={opacity('vessels')}><path d="M508 231L393 262L355 250M393 262L361 289" stroke="#bb4845"/><path d="M511 271L402 289L369 308" stroke="#487ba1"/></g>}
    </>}
    {show('capsule')&&<path d="M340 52C180 2 70 106 67 278C61 448 173 559 316 524C414 499 419 413 364 359C317 312 315 277 367 224C434 158 417 85 340 52Z" fill="none" stroke="#914240" strokeWidth={selected==='capsule'?10:4}/>}
    <text x="472" y="211" fontSize="17" fill="#713431">Artery</text><text x="476" y="311" fontSize="17" fill="#285778">Vein</text><text x="452" y="533" fontSize="17" fill="#725420">Ureter</text>
   </svg><p>Diagram is not to scale. Pyramids are simplified; blood vessels are shown schematically.</p></div>
   <div><h3>Choose a structure</h3><div className="kidney-labels">{structures.map(s=><button key={s.id} aria-pressed={selected===s.id} onClick={()=>pick(s.id)}><i style={{background:s.color}}/>{s.name}</button>)}</div><div className="kidney-explanation" aria-live="polite"><h3>{current.name}</h3><p>{current.text}</p></div><details open><summary>Show or hide layers</summary><div className="kidney-layers">{structures.map(s=><label key={s.id}><input type="checkbox" checked={show(s.id)} onChange={()=>setHidden(h=>h.includes(s.id)?h.filter(id=>id!==s.id):[...h,s.id])}/>{s.name}</label>)}</div></details></div></div>
  </>:<div className="kidney-grid"><div className="kidney-figure"><svg viewBox="0 0 600 520" role="img" aria-label="Simplified nephron pathway, from a renal corpuscle through the proximal tubule, loop of Henle, distal tubule and collecting duct"><rect x="20" y="20" width="560" height="220" rx="20" fill="#f0d8d4"/><rect x="20" y="240" width="560" height="260" rx="20" fill="#e5c1be"/><text x="34" y="54" fill="#653c3b" fontSize="19">Cortex</text><text x="34" y="278" fill="#653c3b" fontSize="19">Medulla</text><circle cx="105" cy="130" r="44" fill="#fff5ed" stroke="#a25158" strokeWidth="7"/><path d="M72 134q13-55 27-5t24-5t16-5" fill="none" stroke="#b6454d" strokeWidth="8"/><path d="M148 132C193 91 155 200 215 161S220 96 250 140L250 400Q250 456 298 400L298 152C319 105 340 202 362 151S401 130 430 147L430 470" fill="none" stroke="#b78535" strokeWidth="16" strokeLinecap="round"/>{[[105,130],[208,160],[274,394],[358,151],[430,324]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={step===i?24:17} fill={step===i?'#204d43':'#ffffff'} stroke="#204d43" strokeWidth="2"/><text x={x} y={y+6} textAnchor="middle" fontSize="17" fontWeight="700" fill={step===i?'white':'#204d43'}>{i+1}</text></g>)}<text x="450" y="469" fill="#653c3b" fontSize="16">To papilla</text></svg><p>A pathway map, not a to-scale microscopic reconstruction.</p></div><div><ol className="nephron-steps">{steps.map(([name],i)=><li key={name}><button aria-current={step===i?'step':undefined} onClick={()=>setStep(i)}>{i+1}. {name}</button></li>)}</ol><div className="kidney-explanation" aria-live="polite"><h3>{steps[step][0]}</h3><p>{steps[step][1]}</p></div><button onClick={()=>setStep((step+1)%steps.length)}>{step===4?'Start again':'Next step →'}</button></div></div>}
  <details className="kidney-check"><summary>Check your understanding</summary><p>Trace the route of urine from a papilla to the bladder.</p><details><summary>Reveal answer</summary><p>Papilla → minor calyx → major calyx → renal pelvis → ureter → bladder.</p></details><p>Does removing the fibrous capsule expose a single nephron?</p><details><summary>Reveal answer</summary><p>No. The capsule surrounds the entire organ; nephrons are microscopic units within its cortex and medulla.</p></details></details>
  <p className="atlas-study-note">Further reading: <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/25-3-gross-anatomy-of-the-kidney" target="_blank" rel="noreferrer">OpenStax: kidney anatomy</a> · <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/25-4-microscopic-anatomy-of-the-kidney" target="_blank" rel="noreferrer">Nephron anatomy</a>.</p>
 </section>;
}
