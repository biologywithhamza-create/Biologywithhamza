import {validRevision,type RevisionData,EMPTY} from '../revision/model';
import {validProfile,PROFILE_KEY,revisionKey,type StudentProfile} from '../revision/store';
import {validWritten,CAMBRIDGE_KEY,emptyWritten,type WrittenData} from '../cambridge-practice/store';
import type {StudyData} from '../study-store';
export const STUDY_KEY='bwh-learning-v1';
export type LearningSnapshot={format:'bwh-learning-snapshot';version:1;capturedAt:string;profile:StudentProfile|null;revision:RevisionData;study:StudyData;writing:WrittenData};
const emptyStudy:StudyData={version:1,completed:[],saved:[],notes:{}};
const safePath=(v:unknown)=>typeof v==='string'&&/^\/[a-z0-9/#?=&%._-]*$/i.test(v)&&!v.startsWith('//')&&v.length<250;
export function validStudy(v:unknown):v is StudyData{if(!v||typeof v!=='object')return false;const d=v as StudyData;return d.version===1&&Array.isArray(d.completed)&&d.completed.length<=3000&&d.completed.every(safePath)&&Array.isArray(d.saved)&&d.saved.length<=3000&&d.saved.every(safePath)&&!!d.notes&&typeof d.notes==='object'&&!Array.isArray(d.notes)&&Object.keys(d.notes).length<=1000&&Object.entries(d.notes).every(([k,v])=>safePath(k)&&typeof v==='string'&&v.length<=5000);}
export function validSnapshot(v:unknown):v is LearningSnapshot{if(!v||typeof v!=='object')return false;const s=v as LearningSnapshot;return s.format==='bwh-learning-snapshot'&&s.version===1&&typeof s.capturedAt==='string'&&Number.isFinite(Date.parse(s.capturedAt))&&(s.profile===null||validProfile(s.profile))&&validRevision(s.revision)&&(s.profile!==null||(s.revision.attempts.length===0&&Object.keys(s.revision.review).length===0))&&validStudy(s.study)&&validWritten(s.writing);}
export function parseSnapshot(text:string):LearningSnapshot{if(new TextEncoder().encode(text).length>3_000_000)throw Error('Use a learning backup smaller than 3 MB.');const d=JSON.parse(text);if(!validSnapshot(d))throw Error('This is not a compatible complete-learning backup. Revision-only backups can be restored on the Revision page.');return d;}
function read<T>(key:string,fallback:T,valid:(v:unknown)=>v is T):T{const raw=localStorage.getItem(key);if(!raw)return structuredClone(fallback);const d=JSON.parse(raw);if(!valid(d))throw Error('Some browser progress is unreadable. Restore a valid backup before syncing.');return d;}
export function captureSnapshot():LearningSnapshot{
 const raw=localStorage.getItem(PROFILE_KEY);const profile=raw?JSON.parse(raw):null;if(profile!==null&&!validProfile(profile))throw Error('The local practice ID is invalid. Restore it on the Revision page.');
 const s:LearningSnapshot={format:'bwh-learning-snapshot',version:1,capturedAt:new Date().toISOString(),profile,revision:profile?read(revisionKey(profile.id),EMPTY,validRevision):structuredClone(EMPTY),study:read(STUDY_KEY,emptyStudy,validStudy),writing:read(CAMBRIDGE_KEY,emptyWritten,validWritten)};
 return parseSnapshot(JSON.stringify(s));
}
export function applySnapshot(s:LearningSnapshot){
 if(!validSnapshot(s))throw Error('Invalid progress snapshot.');
 const pairs:[string,string|null][]=[[STUDY_KEY,JSON.stringify(s.study)],[CAMBRIDGE_KEY,JSON.stringify(s.writing)]];
 if(s.profile)pairs.push([revisionKey(s.profile.id),JSON.stringify(s.revision)]);
 pairs.push([PROFILE_KEY,s.profile?JSON.stringify(s.profile):null]);
 const prior=pairs.map(([key])=>[key,localStorage.getItem(key)] as const);
 try{for(const[key,value]of pairs){if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}}
 catch{for(const[key,value]of prior){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}catch{}}throw Error('Not enough browser storage to restore safely. Download your current backup and free storage before trying again.');}
 for(const name of ['bwh-study','bwh-writing','bwh-revision'])window.dispatchEvent(new Event(name));
}
export function snapshotSummary(s:LearningSnapshot){return `${s.profile?.name??'No local practice ID'} · ${s.revision.attempts.length} quiz attempts · ${Object.values(s.writing.records).filter(r=>r.revealed).length} written answers · ${s.study.completed.length} completion marks · ${Object.keys(s.study.notes).length} notes`;}
export function downloadSnapshot(s:LearningSnapshot){const u=URL.createObjectURL(new Blob([JSON.stringify(s,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download='biology-complete-learning-backup.json';a.click();URL.revokeObjectURL(u);}
