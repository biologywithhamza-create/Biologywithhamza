'use client';
import {useMemo,useSyncExternalStore} from 'react';
export const CAMBRIDGE_KEY='bwh-cambridge-writing-v1';
export type WrittenRecord={answer:string;revealed:boolean;checked:number[];updatedAt:number};
export type WrittenData={version:1;records:Record<string,WrittenRecord>};
export const emptyWritten:WrittenData={version:1,records:{}};
export function validWritten(v:unknown):v is WrittenData{if(!v||typeof v!=='object')return false;const d=v as WrittenData;return d.version===1&&!!d.records&&typeof d.records==='object'&&!Array.isArray(d.records)&&Object.keys(d.records).length<=100&&Object.entries(d.records).every(([id,r])=>/^5090-[a-z0-9-]+$/.test(id)&&r&&typeof r.answer==='string'&&r.answer.length<=4000&&typeof r.revealed==='boolean'&&Array.isArray(r.checked)&&r.checked.length<=8&&new Set(r.checked).size===r.checked.length&&(!r.revealed||r.answer.trim().length>0)&&r.checked.every(n=>Number.isInteger(n)&&n>=0&&n<8)&&typeof r.updatedAt==='number'&&Number.isFinite(r.updatedAt)&&r.updatedAt>=0);}
const empty=JSON.stringify(emptyWritten);
function snapshot(){try{return localStorage.getItem(CAMBRIDGE_KEY)||empty;}catch{return empty;}}
function subscribe(fn:()=>void){window.addEventListener('storage',fn);window.addEventListener('bwh-writing',fn);return()=>{window.removeEventListener('storage',fn);window.removeEventListener('bwh-writing',fn);};}
export function readWritten():WrittenData{try{const d=JSON.parse(snapshot());if(validWritten(d))return d;}catch{}return {version:1,records:{}};}
export function useWritten(){const raw=useSyncExternalStore(subscribe,snapshot,()=>empty);return useMemo(()=>{try{const d=JSON.parse(raw);if(validWritten(d))return d;}catch{}return emptyWritten;},[raw]);}
export function saveWritten(id:string,record:WrittenRecord){try{const raw=localStorage.getItem(CAMBRIDGE_KEY);if(raw&&!validWritten(JSON.parse(raw)))throw Error();const d=readWritten();d.records[id]=record;localStorage.setItem(CAMBRIDGE_KEY,JSON.stringify(d));window.dispatchEvent(new Event('bwh-writing'));return true;}catch{return false;}}
