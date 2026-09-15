"use client";
import {useMemo,useSyncExternalStore} from 'react';
export type StudyData={version:1;completed:string[];saved:string[];notes:Record<string,string>};
const key='bwh-learning-v1',empty='{"version":1,"completed":[],"saved":[],"notes":{}}';
function valid(v:unknown):v is StudyData{if(!v||typeof v!=='object')return false;const d=v as StudyData;return d.version===1&&Array.isArray(d.completed)&&Array.isArray(d.saved)&&d.completed.every(x=>typeof x==='string'&&x.length<250)&&d.saved.every(x=>typeof x==='string'&&x.length<250)&&typeof d.notes==='object'&&d.notes!==null&&!Array.isArray(d.notes)&&Object.values(d.notes).every(x=>typeof x==='string'&&x.length<=5000);}
function snapshot(){try{return localStorage.getItem(key)||empty;}catch{return empty;}}
function subscribe(fn:()=>void){window.addEventListener('storage',fn);window.addEventListener('bwh-study',fn);return()=>{window.removeEventListener('storage',fn);window.removeEventListener('bwh-study',fn);};}
export function readStudy():StudyData{try{const d=JSON.parse(snapshot());if(valid(d))return d;}catch{}return JSON.parse(empty);}
export function writeStudy(data:StudyData){try{localStorage.setItem(key,JSON.stringify(data));window.dispatchEvent(new Event('bwh-study'));return true;}catch{return false;}}
export function useStudy(){const raw=useSyncExternalStore(subscribe,snapshot,()=>empty);return useMemo(()=>{try{const d=JSON.parse(raw);if(valid(d))return d;}catch{}return JSON.parse(empty) as StudyData;},[raw]);}
export function toggleStudy(field:'completed'|'saved',id:string){const d=readStudy();d[field]=d[field].includes(id)?d[field].filter(x=>x!==id):[...d[field],id];return writeStudy(d);}
export function importStudy(text:string){const d=JSON.parse(text);if(!valid(d))throw Error('Choose a valid Biology with Hamza backup.');const old=readStudy();return writeStudy({version:1,completed:[...new Set([...old.completed,...d.completed])],saved:[...new Set([...old.saved,...d.saved])],notes:{...old.notes,...d.notes}});}
