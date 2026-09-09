import test from "node:test";
import assert from "node:assert/strict";
import {activities} from "../app/lab/activity-data.ts";
import {twoLocusCross,twoLocusGenotypes,gametes,inhibitionRate,selectionTrajectory} from "../app/lab/models.ts";
test("all 81 parent combinations preserve probability and reciprocal-cross outcomes",()=>{
 for(const a of twoLocusGenotypes)for(const b of twoLocusGenotypes){
  const cross=twoLocusCross(a,b);
  assert.equal(Object.values(cross.genotypes).reduce((s,v)=>s+v,0),1);
  assert.equal(Object.values(cross.phenotypes).reduce((s,v)=>s+v,0),1);
  assert.deepEqual(cross.phenotypes,twoLocusCross(b,a).phenotypes);
  assert(cross.cells.flat().every(g=>twoLocusGenotypes.includes(g)));
 }
});
test("independent crosses reproduce Mendelian benchmark outcomes",()=>{
 assert.deepEqual(Object.values(twoLocusCross("AaBb","AaBb").phenotypes),[9/16,3/16,3/16,1/16]);
 assert.deepEqual(Object.values(twoLocusCross("AaBb","aabb").phenotypes),[.25,.25,.25,.25]);
 assert.deepEqual(twoLocusCross("AABB","aabb").genotypes,{AaBb:1});
 assert.deepEqual(gametes("AABb"),["AB","Ab"]);
 assert.throws(()=>gametes("AB"),/Invalid/);
});
test("inhibition and selection preserve their biological model boundaries",()=>{
 assert.equal(inhibitionRate(0,3,"competitive"),0);
 assert(inhibitionRate(100,2,"competitive")<inhibitionRate(100,0,"competitive"));
 assert(Math.abs(inhibitionRate(1e9,2,"competitive")-100)<.001);
 assert(Math.abs(inhibitionRate(1e9,1,"noncompetitive")-50)<.001);
 assert(selectionTrajectory(.3,1).every(p=>Math.abs(p-.3)<1e-10));
 assert(selectionTrajectory(.3,1.2).at(-1)>.3);
 assert(selectionTrajectory(.3,.8).at(-1)<.3);
});
test("activity catalogue has complete chapter coverage and usable explanations",()=>{
 assert.equal(activities.length,61);
 assert.equal(new Set(activities.map(a=>a.slug)).size,61);
 for(let c=1;c<=16;c++)assert(activities.some(a=>a.chapter===c));
 for(const a of activities){
  assert(a.question&&a.answer&&a.source);
  if(a.steps)assert(a.steps.length>=4&&a.steps.every(s=>s.label&&s.why));
  if(a.items)assert(a.items.length>=4&&a.items.every(i=>i.why&&a.groups.includes(i.group)));
 }
});
