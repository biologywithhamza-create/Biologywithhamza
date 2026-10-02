import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
const b=await build({stdin:{contents:'export * from "./app/revision/model"; export {quizQuestions,quizChapters,replacedQuestionIds} from "./app/practice/questions";',resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',write:false});
const m=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'));
const q=m.quizQuestions[0],start=1000000;
const attempt=(id,correct,at=start,mode='fresh')=>m.makeAttempt(id,mode,[q],{[q.id]:correct?q.answer:(q.answer+1)%4},at);
test('shuffled options keep identity and answer snapshots',()=>{
 const rotated={...q,options:[...q.options.slice(1),q.options[0]],answer:(q.answer+3)%4};
 assert.equal(m.questionVersion(q),m.questionVersion(rotated));
 const a=m.makeAttempt('x','fresh',[rotated],{[q.id]:rotated.answer});
 assert.equal(a.results[0].selected,q.options[q.answer]);assert(a.results[0].correct);
});
test('spaced reviews advance only when due, and misses reset spacing',()=>{
 let d=m.recordAttempt(m.EMPTY,attempt('miss',false));assert.equal(d.review[q.id].nextDue,start+m.DAY);
 d=m.recordAttempt(d,attempt('retry',true,start+1000,'retry'));assert.equal(d.review[q.id].streak,0);assert.equal(d.review[q.id].nextDue,start+m.DAY);
 d=m.recordAttempt(d,attempt('due1',true,start+m.DAY,'due'));assert.equal(d.review[q.id].streak,1);assert.equal(d.review[q.id].nextDue,start+4*m.DAY);
 d=m.recordAttempt(d,attempt('due2',true,start+4*m.DAY,'due'));assert.equal(d.review[q.id].streak,2);assert.equal(d.review[q.id].nextDue,start+11*m.DAY);assert.equal(m.reviewPool(d,[q],'mistakes').length,0);
 assert.equal(m.reviewPool(d,[q],'due',start+11*m.DAY).length,1);
 d=m.recordAttempt(d,attempt('miss2',false,start+11*m.DAY,'due'));assert.equal(d.review[q.id].streak,0);assert.equal(d.review[q.id].wrongCount,2);
 assert.strictEqual(m.recordAttempt(d,attempt('miss2',false)),d);
});
test('fresh feedback excludes retries and uses latest answer per distinct question',()=>{
 let d=m.recordAttempt(m.EMPTY,attempt('first',false));d=m.recordAttempt(d,attempt('retry',true,start+1,'retry'));
 assert.equal(m.chapterStats(d,[q.chapter])[0].accuracy,0);
 d=m.recordAttempt(d,attempt('second',true,start+2));const s=m.chapterStats(d,[q.chapter])[0];assert.equal(s.seen,1);assert.equal(s.accuracy,100);assert.equal(s.attempts,2);
 const unanswered=m.makeAttempt('none','fresh',[q],{},start+3);assert.equal(unanswered.results[0].selected,null);assert.equal(unanswered.results[0].correct,false);
});
test('changed questions are excluded from current review; history remains capped and valid',()=>{
 let d=m.recordAttempt(m.EMPTY,attempt('first',false));assert.equal(m.reviewPool(d,[{...q,stem:q.stem+' revised'}],'mistakes').length,0);
 for(let i=0;i<55;i++)d=m.recordAttempt(d,attempt('a'+i,true,start+i+1,'retry'));
 assert.equal(d.attempts.length,50);assert(d.review[q.id]);assert(m.validRevision(d));
 const broken=structuredClone(d);broken.attempts[0].results[0].correct=false;assert(!m.validRevision(broken));
 const duplicate=structuredClone(d);duplicate.attempts[1].id=duplicate.attempts[0].id;assert(!m.validRevision(duplicate));
 assert(!m.validRevision(JSON.parse('{"version":1,"attempts":[],"review":{"__proto__":{}}}')));
});
test('replacement bank retains 100 valid questions per chapter with 64 independent applied items',()=>{
 assert.equal(m.quizQuestions.length,1600);assert.equal(m.quizChapters.length,16);assert.equal(m.replacedQuestionIds.size,64);
 const applied=m.quizQuestions.filter(q=>q.id.startsWith('applied-'));assert.equal(applied.length,64);
 const ids=new Set(),stems=new Set();for(const q of m.quizQuestions){assert(!ids.has(q.id));ids.add(q.id);assert(!stems.has(q.stem));stems.add(q.stem);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation.length>20);assert(!m.replacedQuestionIds.has(q.id));}
 for(const c of m.quizChapters){assert.equal(m.quizQuestions.filter(q=>q.chapter===c).length,100);assert.equal(applied.filter(q=>q.chapter===c).length,4);}
});
