import {build} from 'esbuild';
import {writeFile,mkdir,rm} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const temp=resolve('.question-export.mjs');await build({entryPoints:['app/practice/questions.ts'],bundle:true,platform:'node',format:'esm',outfile:temp});
const {quizQuestions}=await import(pathToFileURL(temp));
const slugs=['acellular-life','bioenergetics','biological-molecules','cells','coordination','enzymes','evolution','reproduction','support-movement','inheritance','circulation','immunity','respiration','digestion','homeostasis','biotechnology'];
const titles=['Acellular Life','Bioenergetics','Biological Molecules','Cell Structure & Function','Coordination & Control','Enzymes','Evolution','Reproduction','Support & Movement','Inheritance','Circulation','Immunity','Respiration','Digestion','Homeostasis','Biotechnology'];
await mkdir('public/question-banks',{recursive:true});const index=[];
for(let i=0;i<16;i++){const questions=quizQuestions.filter(q=>q.chapter===titles[i]);if(questions.length!==100)throw Error('Incorrect bank count: '+titles[i]);const file=slugs[i]+'.json';await writeFile('public/question-banks/'+file,JSON.stringify({chapter:titles[i],count:100,answerIndex:'zero-based',notice:'Original practice items including related concept variants; not official examination questions.',questions},null,2));index.push({chapter:titles[i],file,count:100});}
await writeFile('public/question-banks/index.json',JSON.stringify(index,null,2));await rm(temp);console.log('Exported 16 files, 100 MCQs per chapter.');
