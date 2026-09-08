// Creates a reduced-detail, non-WebGL fallback from the locally bundled BodyParts3D data.
// BodyParts3D, © DBCLS, CC BY 4.0. See public/atlas/ATTRIBUTION.md.
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync, gunzipSync } from 'node:zlib';
import { MeshoptSimplifier } from 'meshoptimizer';
await MeshoptSimplifier.ready;
const root=path.resolve('public/atlas/models');
const atlas=JSON.parse(fs.readFileSync(path.join(root,'atlas.json'),'utf8'));
const chunks=atlas.chunks.map(c=>gunzipSync(fs.readFileSync(path.join(root,path.basename(c.gzip)))));
const result={version:1,parts:[]};let faces=0;
for(const p of atlas.parts){
 const b=chunks[p.chunk];const positions=new Float32Array(b.buffer,b.byteOffset+p.positions,p.vertexCount*3),indices=new Uint32Array(b.buffer,b.byteOffset+p.indices,p.indexCount);
 const target=Math.min(indices.length,Math.max(36,Math.min(240,Math.floor(indices.length*.035/3)*3)));
 const [simple]=MeshoptSimplifier.simplify(indices,positions,3,target,.025);
 const [remap,count]=MeshoptSimplifier.compactMesh(simple);const coords=new Float32Array(count*3);
 for(let old=0;old<remap.length;old++)if(remap[old]!==0xffffffff)coords.set(positions.subarray(old*3,old*3+3),remap[old]*3);
 result.parts.push({id:p.id,p:Array.from(coords,n=>Number(n.toFixed(5))),i:Array.from(simple)});faces+=simple.length/3;
}
const output=gzipSync(JSON.stringify(result),{level:9});fs.writeFileSync(path.join(root,'compatibility.json.gz'),output);
console.log(JSON.stringify({parts:result.parts.length,faces,bytes:output.length}));
