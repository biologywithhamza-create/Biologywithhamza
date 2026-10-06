import {quizQuestions,quizChapters,type QuizQuestion} from '../practice/questions';
import {createRandomizedAttempt,shuffle,randomizeOptions} from '../practice/quiz-randomization';
import {chapterStats,questionVersion,reviewPool,type RevisionData} from '../revision/model';
export type Session={version:1;id:string;profileId:string;kind:'mock'|'daily';started:number;deadline:number;questions:QuizQuestion[];answers:Record<string,number>;index:number;finished:boolean};
export function mockQuestions(recent:string[]=[]){
 const extra=shuffle(quizChapters)[0];
 return shuffle(quizChapters.flatMap(chapter=>createRandomizedAttempt(quizQuestions.filter(q=>q.chapter===chapter),chapter===extra?6:5,recent)));
}
export function dailyQuestions(data:RevisionData,now=Date.now(),count=15){
 const selected:QuizQuestion[]=[],used=new Set<string>();
 const add=(pool:QuizQuestion[],limit:number)=>{let n=0;for(const q of pool){if(used.has(q.id))continue;selected.push(q);used.add(q.id);if(++n>=limit||selected.length>=count)break;}};
 const due=reviewPool(data,quizQuestions,'due',now).sort((a,b)=>data.review[a.id].nextDue-data.review[b.id].nextDue);
 if(due.length)add(due,Math.min(5,count));
 const weak=chapterStats(data,quizChapters).filter(s=>s.seen>=5&&(s.accuracy??100)<80).sort((a,b)=>(a.accuracy??100)-(b.accuracy??100));
 const recent=data.attempts.flatMap(a=>a.results.map(r=>r.id));
 if(weak.length&&selected.length<count)add(createRandomizedAttempt(quizQuestions.filter(q=>weak.slice(0,3).some(s=>s.chapter===q.chapter)),count,recent),Math.min(5,count-selected.length));
 if(selected.length<count)add(createRandomizedAttempt(quizQuestions,count*2,[...recent,...used]),count-selected.length);
 return shuffle(selected).map(randomizeOptions);
}
export function remainingSeconds(s:Session,now=Date.now()){return Math.max(0,Math.ceil((s.deadline-now)/1000));}
export function lockAnswer(s:Session,answer:number|null,now=Date.now()):Session{
 if(s.finished)return s;
 if(now>=s.deadline)return {...s,finished:true};
 if(answer!==null&&(!Number.isInteger(answer)||answer<0||answer>3))return s;
 const q=s.questions[s.index];if(!q)return {...s,finished:true};
 return {...s,answers:answer===null?s.answers:{...s.answers,[q.id]:answer},index:s.index+1,finished:s.index+1>=s.questions.length};
}
const bank=new Map(quizQuestions.map(q=>[q.id,q]));
export function validSession(value:unknown):value is Session{
 if(!value||typeof value!=='object')return false;const s=value as Session;
 if(s.version!==1||typeof s.id!=='string'||s.id.length>100||!/^BWH-[A-Z0-9]{8}$/.test(s.profileId)||!['mock','daily'].includes(s.kind)||!Number.isFinite(s.started)||!Number.isFinite(s.deadline)||s.started<0||s.deadline<=s.started||s.deadline-s.started>180*60000||!Array.isArray(s.questions)||s.questions.length!==(s.kind==='mock'?81:15)||!Number.isInteger(s.index)||s.index<0||s.index>s.questions.length||typeof s.finished!=='boolean'||!s.answers||typeof s.answers!=='object'||Array.isArray(s.answers))return false;
 const ids=new Set<string>();
 for(const q of s.questions){const original=bank.get(q?.id);if(!original||ids.has(q.id)||!Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>typeof o!=='string')||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||q.chapter!==original.chapter||questionVersion(q)!==questionVersion(original))return false;ids.add(q.id);}
 return Object.entries(s.answers).every(([id,a])=>s.questions.slice(0,s.index).some(q=>q.id===id)&&Number.isInteger(a)&&a>=0&&a<=3);
}
export function chapterBreakdown(s:Session){return quizChapters.map(chapter=>{const qs=s.questions.filter(q=>q.chapter===chapter);return {chapter,total:qs.length,correct:qs.filter(q=>s.answers[q.id]===q.answer).length,unanswered:qs.filter(q=>s.answers[q.id]===undefined).length};}).filter(r=>r.total);}
export function daysUntil(date:string,now=Date.now()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return null;
 const day=Date.parse(date+'T00:00:00+05:00');if(!Number.isFinite(day))return null;
 const today=new Date(now+5*3600000).toISOString().slice(0,10);
 return Math.round((day-Date.parse(today+'T00:00:00+05:00'))/86400000);
}
