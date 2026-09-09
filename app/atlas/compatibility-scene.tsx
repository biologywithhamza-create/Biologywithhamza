"use client";
import { useEffect, useRef } from "react";
import { SYSTEMS, type Atlas, type SceneState } from "./anatomy";
import { PointerTap } from "./pointer-tap";

type LitePart = { id: string; p: number[]; i: number[] };
type Face = { x1:number;y1:number;x2:number;y2:number;x3:number;y3:number;z:number;fill:string;id:string;alpha:number };
type Props = { atlas:Atlas;state:SceneState;onSelect:(id:string)=>void;onProgress:(n:number)=>void;onError:(s:string)=>void };
/** Software rasterizer for browsers without WebGL. Uses reduced BodyParts3D meshes, not schematic replacement shapes. */
export default function CompatibilityScene({atlas,state,onSelect,onProgress,onError}:Props) {
  const host=useRef<HTMLDivElement>(null), latest=useRef(state), selection=useRef(onSelect), redraw=useRef<(()=>void)|null>(null);
  useEffect(()=>{ latest.current=state;selection.current=onSelect;redraw.current?.(); },[state,onSelect]);
  useEffect(()=>{
    const el=host.current!;const canvas=document.createElement("canvas");
    canvas.setAttribute("role","img");canvas.setAttribute("aria-label","Reduced-detail human anatomy compatibility view. Choose Rotate or Move, drag to navigate, and scroll or pinch to zoom. Tap to select a structure.");
    const ctx=canvas.getContext("2d");if(!ctx){onError("This browser cannot display the anatomy canvas. The searchable structure catalogue is still available.");return;}
    el.appendChild(canvas);let disposed=false,frame=0,parts:LitePart[]=[],faces:Face[]=[],width=0,height=0,angle=0,tilt=0,viewKey="",panX=0,panY=0,wheelZoom=1,lastFocus=0,lastPan={x:0,y:0},focusIds:string[]=[];const pointers=new Map<number,{x:number;y:number}>();
    const tap=new PointerTap(), controller=new AbortController(), partMap=new Map(atlas.parts.map(p=>[p.id,p]));
    const systemColors=new Map(SYSTEMS.map(s=>[s.id,[parseInt(s.color.slice(1,3),16),parseInt(s.color.slice(3,5),16),parseInt(s.color.slice(5,7),16)]]));
    function draw(){
      if(disposed||!ctx||!parts.length||!width||!height)return;
      const s=latest.current,visible=new Set(s.visible),selected=new Set(s.selected),region=s.regionParts?new Set(s.regionParts):null;
      const key=s.view+":"+s.reset;
      if(viewKey!==key){angle=s.view==="back"?Math.PI:s.view==="side"?Math.PI/2:s.view==="three-quarter"?.38:0;tilt=0;panX=0;panY=0;wheelZoom=1;focusIds=[];viewKey=key;}
      if((s.focus??0)!==lastFocus){lastFocus=s.focus??0;focusIds=[...s.selected];panX=0;panY=0;wheelZoom=1;}
      const pan=s.pan??{x:0,y:0};panX+=(pan.x-lastPan.x)*width*.09;panY+=(pan.y-lastPan.y)*height*.09;lastPan={...pan};
      const showing=parts.filter(p=>{const source=partMap.get(p.id)!;return s.isolate?selected.has(p.id):(visible.has(source.system)&&(!region||region.has(p.id)))||selected.has(p.id);});
      const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt);
      let left=Infinity,right=-Infinity,top=-Infinity,bottom=Infinity;
      const projected=showing.map(part=>{const out=new Float32Array(part.p.length);for(let i=0;i<part.p.length;i+=3){const x=part.p[i]*ca-part.p[i+2]*sa,z=part.p[i]*sa+part.p[i+2]*ca,y=part.p[i+1]*ct-z*st;out[i]=x;out[i+1]=y;out[i+2]=part.p[i+1]*st+z*ct;left=Math.min(left,x);right=Math.max(right,x);top=Math.max(top,y);bottom=Math.min(bottom,y);}return{part,out};});
      if(focusIds.length){const focused=projected.filter(p=>focusIds.includes(p.part.id));if(focused.length){left=Infinity;right=-Infinity;top=-Infinity;bottom=Infinity;for(const {out} of focused)for(let i=0;i<out.length;i+=3){left=Math.min(left,out[i]);right=Math.max(right,out[i]);top=Math.max(top,out[i+1]);bottom=Math.min(bottom,out[i+1]);}}}
      ctx.fillStyle=s.background==="light"?"#e7eaef":"#202a35";ctx.fillRect(0,0,width,height);faces=[];if(!showing.length)return;
      const scale=Math.min((width-65)/Math.max(.025,right-left),(height-70)/Math.max(.025,top-bottom))*.92*Math.pow(1.2,s.zoom??0)*wheelZoom,cx=(left+right)/2-panX/scale,cy=(top+bottom)/2+panY/scale;
      for(const {part,out} of projected){const source=partMap.get(part.id)!,base=selected.has(part.id)?[104,177,120]:systemColors.get(source.system)!;
        for(let n=0;n<part.i.length;n+=3){const a=part.i[n]*3,b=part.i[n+1]*3,c=part.i[n+2]*3;
          const x1=(out[a]-cx)*scale+width/2,y1=height/2-(out[a+1]-cy)*scale,x2=(out[b]-cx)*scale+width/2,y2=height/2-(out[b+1]-cy)*scale,x3=(out[c]-cx)*scale+width/2,y3=height/2-(out[c+1]-cy)*scale;
          if(Math.max(x1,x2,x3)<0||Math.min(x1,x2,x3)>width||Math.max(y1,y2,y3)<0||Math.min(y1,y2,y3)>height)continue;
          const ux=out[b]-out[a],uy=out[b+1]-out[a+1],uz=out[b+2]-out[a+2],vx=out[c]-out[a],vy=out[c+1]-out[a+1],vz=out[c+2]-out[a+2];
          const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx,len=Math.hypot(nx,ny,nz)||1;
          const light=.48+.52*Math.abs((nx*-.35+ny*.5+nz*.79)/len),fill=`rgb(${base.map(v=>Math.min(255,Math.round(v*light+14))).join(",")})`;
          faces.push({x1,y1,x2,y2,x3,y3,z:(out[a+2]+out[b+2]+out[c+2])/3,fill,id:part.id,alpha:source.system==="integumentary"?(s.surfaceOpacity??.12):1});
        }
      }
      faces.sort((a,b)=>a.z-b.z);
      for(const f of faces){ctx.globalAlpha=f.alpha;ctx.fillStyle=f.fill;ctx.beginPath();ctx.moveTo(f.x1,f.y1);ctx.lineTo(f.x2,f.y2);ctx.lineTo(f.x3,f.y3);ctx.closePath();ctx.fill();}
      ctx.globalAlpha=1;
    }
    function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}redraw.current=schedule;
    const resize=()=>{width=el.clientWidth;height=el.clientHeight;const pixelRatio=Math.min(window.devicePixelRatio||1,1.5);canvas.width=width*pixelRatio;canvas.height=height*pixelRatio;canvas.style.width=width+"px";canvas.style.height=height+"px";ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);schedule();};
    const observer=new ResizeObserver(resize);observer.observe(el);
    const down=(e:PointerEvent)=>{tap.down(e.pointerId,e.clientX,e.clientY,7);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);};
    const move=(e:PointerEvent)=>{tap.move(e.pointerId,e.clientX,e.clientY);const old=pointers.get(e.pointerId);if(!old)return;const before=[...pointers.values()];pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const dx=e.clientX-old.x,dy=e.clientY-old.y;
      if(pointers.size>1){const after=[...pointers.values()],distance=(p:{x:number;y:number}[])=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);wheelZoom=Math.max(.2,Math.min(15,wheelZoom*distance(after)/Math.max(1,distance(before))));panX+=dx/2;panY+=dy/2;}
      else if(latest.current.mode==="move"||e.shiftKey||e.buttons===2){panX+=dx;panY+=dy;}else{angle+=dx*.012;tilt=Math.max(-1,Math.min(1,tilt+dy*.008));}schedule();};
    const up=(e:PointerEvent)=>{pointers.delete(e.pointerId);const valid=tap.up(e.pointerId,e.clientX,e.clientY);if(!valid)return;const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;for(let i=faces.length-1;i>=0;i--){const f=faces[i];if(f.alpha<.4)continue;const d=(f.y2-f.y3)*(f.x1-f.x3)+(f.x3-f.x2)*(f.y1-f.y3);if(Math.abs(d)<.01)continue;const a=((f.y2-f.y3)*(x-f.x3)+(f.x3-f.x2)*(y-f.y3))/d,b=((f.y3-f.y1)*(x-f.x3)+(f.x1-f.x3)*(y-f.y3))/d;if(a>=0&&b>=0&&a+b<=1){selection.current(f.id);break;}}};
    const cancel=(e:PointerEvent)=>{pointers.delete(e.pointerId);tap.cancel(e.pointerId);};
    canvas.addEventListener("wheel",e=>{e.preventDefault();wheelZoom=Math.max(.2,Math.min(15,wheelZoom*Math.exp(-e.deltaY*.0015)));schedule();},{passive:false});canvas.addEventListener("contextmenu",e=>e.preventDefault());
    canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",cancel);
    (async()=>{try{onProgress(10);const response=await fetch("/atlas/models/compatibility.json.gz",{signal:controller.signal});if(!response.ok)throw new Error("Could not load the compatibility anatomy. Please try again.");const payload=new Uint8Array(await response.arrayBuffer());if(disposed)return;onProgress(65);let data:Uint8Array=payload;if(payload[0]===0x1f&&payload[1]===0x8b){const {gunzipSync}=await import("fflate");data=gunzipSync(payload);}parts=(JSON.parse(new TextDecoder().decode(data)) as {parts:LitePart[]}).parts;if(disposed)return;draw();onProgress(100);}catch(e){if(!disposed)onError(e instanceof Error?e.message:"The compatibility view could not load.");}})();
    return()=>{disposed=true;controller.abort();cancelAnimationFrame(frame);observer.disconnect();redraw.current=null;canvas.remove();};
  },[atlas,onProgress,onError]);
  return <div className="scene compatibility-scene" ref={host}/>;
}
