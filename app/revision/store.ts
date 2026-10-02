'use client';
import {useMemo,useSyncExternalStore} from 'react';
import {EMPTY,recordAttempt,validRevision,type Attempt,type RevisionData} from './model';
export type StudentProfile={id:string;name:string;track:'MDCAT'|'Cambridge O Level'|'Both';createdAt:string};
export const PROFILE_KEY='biology-with-hamza-student-profile';
const empty=JSON.stringify(EMPTY);
export function validProfile(v:unknown):v is StudentProfile{if(!v||typeof v!=='object')return false;const p=v as StudentProfile;return /^BWH-[A-Z0-9]{8}$/.test(p.id)&&typeof p.name==='string'&&p.name.trim().length>=2&&p.name.length<=48&&['MDCAT','Cambridge O Level','Both'].includes(p.track)&&typeof p.createdAt==='string'&&Number.isFinite(Date.parse(p.createdAt));}
function get(key:string,fallback:string){try{return localStorage.getItem(key)||fallback;}catch{return fallback;}}
export const revisionKey=(id:string)=>'bwh-revision-v1:'+id;
function subscribe(fn:()=>void){window.addEventListener('storage',fn);window.addEventListener('bwh-revision',fn);return()=>{window.removeEventListener('storage',fn);window.removeEventListener('bwh-revision',fn);};}
export function notifyRevision(){window.dispatchEvent(new Event('bwh-revision'));}
export function readRevision(id:string):RevisionData{try{const v=JSON.parse(get(revisionKey(id),empty));return validRevision(v)?v:EMPTY;}catch{return EMPTY;}}
export function useRevision(id:string|null){const raw=useSyncExternalStore(subscribe,()=>id?get(revisionKey(id),empty):empty,()=>empty);return useMemo(()=>{try{const v=JSON.parse(raw);return validRevision(v)?v:EMPTY;}catch{return EMPTY;}},[raw]);}
export function useProfile(){const raw=useSyncExternalStore(subscribe,()=>get(PROFILE_KEY,'null'),()=>'null');return useMemo(()=>{try{const p=JSON.parse(raw);return validProfile(p)?p:null;}catch{return null;}},[raw]);}
export function saveAttempt(id:string,attempt:Attempt){try{const key=revisionKey(id),raw=localStorage.getItem(key);if(raw){let parsed;try{parsed=JSON.parse(raw);}catch{throw Error('Saved revision data is unreadable. Export or restore a backup before resetting it.');}if(!validRevision(parsed))throw Error('Saved revision data is incompatible. Restore a backup or reset it in Revision.');}localStorage.setItem(key,JSON.stringify(recordAttempt(readRevision(id),attempt)));notifyRevision();return '';}catch(err){return err instanceof Error?err.message:'Revision storage is unavailable.';}}
export function revisionBackup(profile:StudentProfile,data:RevisionData){return JSON.stringify({format:'bwh-revision-backup',version:1,profile,data},null,2);}
export function parseBackup(raw:string):{profile:StudentProfile;data:RevisionData}{if(raw.length>4_000_000)throw Error('Use a revision backup smaller than 4 MB.');const v=JSON.parse(raw);if(v?.format!=='bwh-revision-backup'||v.version!==1||!validProfile(v.profile)||!validRevision(v.data))throw Error('Choose a valid Biology with Hamza revision backup.');return v;}
export function restoreBackup(v:{profile:StudentProfile;data:RevisionData}){
 const key=revisionKey(v.profile.id),old=localStorage.getItem(key);
 try{localStorage.setItem(key,JSON.stringify(v.data));localStorage.setItem(PROFILE_KEY,JSON.stringify(v.profile));}catch(err){try{if(old===null)localStorage.removeItem(key);else localStorage.setItem(key,old);}catch{}throw err;}notifyRevision();
}
export function clearRevision(id:string){localStorage.removeItem(revisionKey(id));notifyRevision();}
