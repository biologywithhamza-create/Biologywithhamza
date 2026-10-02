import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {build} from 'esbuild';
const bundle=await build({stdin:{contents:'export {appearanceBootstrap} from "./app/appearance-bootstrap";',resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',write:false});
const {appearanceBootstrap}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
function boot(raw,dark,blocked=false){const document={documentElement:{dataset:{}}};vm.runInNewContext(appearanceBootstrap,{document,localStorage:{getItem(){if(blocked)throw Error('Denied');return raw}},window:{matchMedia:()=>({matches:dark})}});return document.documentElement.dataset;}
test('saved choices override OS preference before rendering',()=>{
 assert.deepEqual({...boot('{"theme":"light","textSize":"large"}',true)},{theme:'light',readingSize:'large'});
 assert.equal(boot('{"theme":"dark"}',false).theme,'dark');
});
test('system preference follows device; malformed and blocked storage remain usable',()=>{
 for(const value of [null,'null','broken','{}','{"theme":"unknown","textSize":"no"}'])assert.equal(boot(value,true).theme,'dark');
 assert.equal(boot(null,false,true).theme,'light');
 assert.equal(boot('{"theme":"system"}',true).theme,'dark');
});
test('core foreground and panel pairs exceed normal text contrast target',()=>{
 function luminance(hex){return hex.match(/[a-f\d]{2}/gi).map(h=>parseInt(h,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0)}
 for(const [fg,bg] of [['edf5eb','0e1916'],['b6c9bd','182923'],['9adbb7','243c30'],['ffffff','a6370c'],['152e26','dfff7a'],['ffffff','193c2d']]){const [a,b]=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);assert((a+.05)/(b+.05)>=4.5,`${fg} on ${bg}`);}
});
test('initialization is in head and legacy output excludes print overrides',()=>{
 const html=fs.readFileSync('out/index.html','utf8');assert(html.indexOf('bwh-appearance-v1')<html.indexOf('</head>'));
 assert(!fs.readFileSync('app/theme-surfaces.css','utf8').includes('var(--var'));
});
