import type { QuizQuestion } from '../practice/questions';
export type PracticeMode = 'fresh' | 'mistakes' | 'due' | 'retry' | 'mock' | 'daily';
export type Result = { id:string; version:string; chapter:string; stem:string; selected:string|null; answer:string; correct:boolean };
export type Attempt = { id:string; at:number; mode:PracticeMode; results:Result[] };
export type ReviewItem = { id:string; version:string; chapter:string; wrongCount:number; lastSeen:number; nextDue:number; streak:number; lastCorrect:boolean; selected:string|null };
export type RevisionData = { version:1; attempts:Attempt[]; review:Record<string,ReviewItem> };
export const EMPTY:RevisionData = {version:1,attempts:[],review:{}};
export const DAY=86_400_000;
export const MAX_ATTEMPTS=50;
export function questionVersion(q:QuizQuestion) {
  // Independent of option order: answer letters are shuffled on every attempt.
  const text=JSON.stringify([q.stem,[...q.options].sort(),q.options[q.answer],q.visual??null]);
  let hash=2166136261;for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}
  return (hash>>>0).toString(16);
}
export function makeAttempt(id:string,mode:PracticeMode,questions:QuizQuestion[],answers:Record<string,number>,at=Date.now()):Attempt {
  return {id,at,mode,results:questions.map(q=>({id:q.id,version:questionVersion(q),chapter:q.chapter,stem:q.stem,selected:answers[q.id]===undefined?null:q.options[answers[q.id]],answer:q.options[q.answer],correct:answers[q.id]===q.answer}))};
}
export function recordAttempt(data:RevisionData,attempt:Attempt):RevisionData {
  if(data.attempts.some(a=>a.id===attempt.id))return data;
  const review={...data.review};
  for(const r of attempt.results){
    const prior=review[r.id]?.version===r.version?review[r.id]:undefined;
    if(!r.correct){review[r.id]={id:r.id,version:r.version,chapter:r.chapter,wrongCount:(prior?.wrongCount??0)+1,lastSeen:attempt.at,nextDue:attempt.at+DAY,streak:0,lastCorrect:false,selected:r.selected};}
    else if(prior){
      // Immediate retries show learning, but only a correct answer at/after the due time advances spacing.
      const due=attempt.at>=prior.nextDue,streak=due?Math.min(prior.streak+1,5):prior.streak;
      const interval=[1,3,7,14,30,60][streak];
      review[r.id]={...prior,lastSeen:attempt.at,lastCorrect:true,selected:r.selected,streak,nextDue:due?attempt.at+interval*DAY:prior.nextDue};
    }
  }
  return {version:1,attempts:[attempt,...data.attempts].slice(0,MAX_ATTEMPTS),review};
}
export function reviewPool(data:RevisionData,questions:QuizQuestion[],mode:'mistakes'|'due',now=Date.now()) {
  return questions.filter(q=>{const r=data.review[q.id];return r?.version===questionVersion(q)&&(mode==='due'?r.nextDue<=now:r.streak<2);});
}
export function chapterStats(data:RevisionData,chapters:string[]){
  return chapters.map(chapter=>{
    const fresh=data.attempts.filter(a=>(a.mode==='fresh'||a.mode==='mock')).flatMap(a=>a.results).filter(r=>r.chapter===chapter);
    const latest=new Map<string,Result>();for(const r of fresh)if(!latest.has(r.id))latest.set(r.id,r);
    const values=[...latest.values()],correct=values.filter(r=>r.correct).length;
    return {chapter,seen:values.length,correct,accuracy:values.length?Math.round(correct/values.length*100):null,attempts:data.attempts.filter(a=>(a.mode==='fresh'||a.mode==='mock')&&a.results.some(r=>r.chapter===chapter)).length};
  });
}
function str(v:unknown,max=300):v is string{return typeof v==='string'&&v.length<=max;}
function num(v:unknown):v is number{return typeof v==='number'&&Number.isFinite(v)&&v>=0;}
export function validRevision(v:unknown):v is RevisionData {
  if(!v||typeof v!=='object')return false;const d=v as RevisionData;
  if(d.version!==1||!Array.isArray(d.attempts)||d.attempts.length>MAX_ATTEMPTS||!d.review||typeof d.review!=='object'||Array.isArray(d.review)||Object.keys(d.review).length>3000)return false;
  const ids=new Set<string>();
  for(const a of d.attempts){if(!a||!str(a.id,20000)||ids.has(a.id)||!num(a.at)||!['fresh','mistakes','due','retry','mock','daily'].includes(a.mode)||!Array.isArray(a.results)||!a.results.length||a.results.length>100)return false;ids.add(a.id);const qs=new Set<string>();for(const r of a.results){if(!r||!str(r.id)||qs.has(r.id)||!str(r.version)||!str(r.chapter)||!str(r.stem,3000)||!(r.selected===null||str(r.selected,3000))||!str(r.answer,3000)||typeof r.correct!=='boolean'||r.correct!==(r.selected===r.answer))return false;qs.add(r.id);}}
  return Object.entries(d.review).every(([key,r])=>r&&key===r.id&&str(r.id)&&!['__proto__','constructor','prototype'].includes(key)&&str(r.version)&&str(r.chapter)&&num(r.wrongCount)&&Number.isInteger(r.wrongCount)&&r.wrongCount>=1&&num(r.lastSeen)&&num(r.nextDue)&&num(r.streak)&&Number.isInteger(r.streak)&&r.streak<=5&&typeof r.lastCorrect==='boolean'&&(r.selected===null||str(r.selected,3000)));
}
