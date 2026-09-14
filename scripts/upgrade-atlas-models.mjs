// Z-Anatomy adaptations: CC BY-SA 4.0. See public/atlas/ATTRIBUTION.md.
import fs from 'node:fs';
import {gzipSync} from 'node:zlib';
import {MeshoptSimplifier} from 'meshoptimizer';
await MeshoptSimplifier.ready;
const dir='public/atlas/models/',atlas=JSON.parse(fs.readFileSync(dir+'atlas.json'));
if(atlas.parts.some(p=>p.id.startsWith('ZA-')))throw Error('Already upgraded');
const additions=JSON.parse(fs.readFileSync(process.argv[2]));
const positions=[],indices=[];
for(const line of fs.readFileSync(process.argv[3],'utf8').split('\n')){
 const a=line.trim().split(/\s+/);
 if(a[0]==='v')positions.push(+a[1]/1000,+a[3]/1000+.0781112,-a[2]/1000-.1);
 if(a[0]==='f')for(let j=2;j<a.length-1;j++)indices.push(parseInt(a[1])-1,parseInt(a[j])-1,parseInt(a[j+1])-1);
}
additions.push({name:'Spinal cord',system:'nervous',p:positions,i:indices,sourceName:'BodyParts3D FJ4426'});
// Original simplified pathways. These represent regional drainage, not segmented reference vessels.
function route(name,points,r=.0018){const p=[],i=[];for(let j=0;j<points.length;j++){const a=points[Math.max(0,j-1)],b=points[Math.min(points.length-1,j+1)],t=b.map((v,k)=>v-a[k]),len=Math.hypot(...t)||1;t.forEach((v,k)=>t[k]=v/len);const axis=Math.abs(t[2])<.9?[0,0,1]:[1,0,0],u=[t[1]*axis[2]-t[2]*axis[1],t[2]*axis[0]-t[0]*axis[2],t[0]*axis[1]-t[1]*axis[0]],ul=Math.hypot(...u)||1;u.forEach((v,k)=>u[k]=v/ul);const v=[t[1]*u[2]-t[2]*u[1],t[2]*u[0]-t[0]*u[2],t[0]*u[1]-t[1]*u[0]];for(let k=0;k<8;k++)for(let d=0;d<3;d++)p.push(points[j][d]+r*(u[d]*Math.cos(k*Math.PI/4)+v[d]*Math.sin(k*Math.PI/4)));if(j)for(let k=0;k<8;k++){const a=(j-1)*8+k,b=j*8+k,c=j*8+(k+1)%8,d=(j-1)*8+(k+1)%8;i.push(a,b,c,a,c,d);}}additions.push({name:name+' — illustrative route',p,i,system:'lymphatic',sourceName:'Original educational drainage pathway',teaching:true});}
route('Thoracic duct',[[-.012,1.07,.025],[-.015,1.16,-.035],[-.012,1.25,-.048],[.005,1.34,-.043],[.026,1.42,.01],[.045,1.425,.018]],.003);
route('Right lymphatic duct',[[-.032,1.421,.014],[-.044,1.425,.018]],.0025);
for(const [side,k] of [['Left',1],['Right',-1]]){
 route(side+' lower-limb drainage',[[k*.065,.09,-.015],[k*.085,.28,-.035],[k*.077,.49,-.052],[k*.068,.66,.01],[k*.03,.845,.054]]);
 route(side+' pelvic and lumbar drainage',[[k*.03,.845,.054],[k*.04,.94,.01],[k*.028,1.04,.015],[-.012,1.07,.025]]);
 route(side+' upper-limb drainage',[[k*.30,.70,.01],[k*.26,.86,.0],[k*.217,1.08,-.007],[k*.18,1.20,-.02],[k*.143,1.316,-.038]]);
 route(side+' axillary and subclavian drainage',[[k*.143,1.316,-.038],[k*.10,1.38,-.008],[k*.044,1.425,.018]]);
 route(side+' head and neck drainage',[[k*.07,1.59,.04],[k*.06,1.52,.025],[k*.032,1.42,.018],[k*.044,1.425,.018]]);
 route(side+' bronchomediastinal drainage',[[k*.055,1.24,.02],[k*.035,1.34,.008],[k*.044,1.425,.018]]);
}
route('Intestinal trunk',[[.04,1.02,.06],[.015,1.06,.04],[-.012,1.07,.025]]);
route('Cisterna chyli',[[-.012,1.04,.025],[-.012,1.075,.025]],.004);
let bytes=0,triangles=0;const buffers=[],chunk=atlas.chunks.length;
function add(x,id){
 let p=new Float32Array(x.p),i=new Uint32Array(x.i);
 if(i.length>3000){[i]=MeshoptSimplifier.simplify(i,p,3,Math.max(3000,Math.floor(i.length*.35/3)*3),.001);const [remap,count]=MeshoptSimplifier.compactMesh(i);const q=new Float32Array(count*3);for(let n=0;n<remap.length;n++)if(remap[n]!==0xffffffff)q.set(p.subarray(n*3,n*3+3),remap[n]*3);p=q;}
 const normals=new Float32Array(p.length),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
 for(let n=0;n<p.length;n++) {lo[n%3]=Math.min(lo[n%3],p[n]);hi[n%3]=Math.max(hi[n%3],p[n]);}
 for(let n=0;n<i.length;n+=3){const a=i[n]*3,b=i[n+1]*3,c=i[n+2]*3,ux=p[b]-p[a],uy=p[b+1]-p[a+1],uz=p[b+2]-p[a+2],vx=p[c]-p[a],vy=p[c+1]-p[a+1],vz=p[c+2]-p[a+2],v=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx];for(const k of [a,b,c])for(let j=0;j<3;j++)normals[k+j]+=v[j];}
 for(let n=0;n<normals.length;n+=3){const len=Math.hypot(...normals.subarray(n,n+3))||1;for(let j=0;j<3;j++)normals[n+j]/=len;}
 const part={id,name:x.name,conceptId:id,system:x.system,source:x.sourceName==='BodyParts3D FJ4426'?'BodyParts3D 4.3, DBCLS':'Z-Anatomy, Gauthier Kervyn and contributors',kind:'reference',chunk,positions:bytes,normals:bytes+p.byteLength,indices:bytes+p.byteLength+normals.byteLength,vertexCount:p.length/3,indexCount:i.length,bounds:[lo,hi]};
 if(x.teaching){part.kind='teaching';part.source=x.sourceName;part.description='Illustrative major drainage route, deliberately simplified. Not a scanned vessel, not the complete lymphatic network, and not to scale.';}
 for(const a of [p,normals,i]){buffers.push(Buffer.from(a.buffer,a.byteOffset,a.byteLength));bytes+=a.byteLength;}
 if(/pharynx/i.test(x.name)&&x.name!=='Nasopharynx')part.systems=['digestive','respiratory'];
 atlas.parts.push(part);atlas.concepts.push({id,name:x.name,elements:[id]});triangles+=i.length/3;
}
additions.forEach((x,i)=>add(x,x.teaching?`TEACH-${i}`:x.sourceName==='BodyParts3D FJ4426'?'BP43-FJ4426':`ZA-${String(i+1).padStart(4,'0')}`));
function group(name,filter,description){const elements=atlas.parts.filter(filter).map(p=>p.id);const old=atlas.concepts.find(c=>c.name.toLowerCase()===name.toLowerCase());if(old){old.elements=elements;old.description=description;}else atlas.concepts.push({id:'GROUP-'+name.replaceAll(' ','-'),name,elements,description});}
for(const p of atlas.parts){
 if(/inferior nasal concha/i.test(p.name)){p.system='skeletal';p.systems=['skeletal','respiratory'];}
 if(/nasal.*cartilage|cartilage.*nose/i.test(p.name))p.systems=['respiratory','connective'];
 if(/pharyngeal.*constrictor|constrictor.*pharynx/i.test(p.name))p.systems=['muscular','digestive','respiratory'];
 if(/^diaphragm$/i.test(p.name))p.systems=['muscular','respiratory'];
 if(/tendon|aponeurosis|iliotibial/i.test(p.name))p.systems=[p.system,'connective'];
 if(/vomer|nasal bone|nasal concha/i.test(p.name))p.description='A normal component of the nasal skeleton. The vomer forms the lower posterior nasal septum; nasal bones form the bridge, and conchae project from the lateral nasal walls. Hide individual structures to inspect their relationships.';
}
group('spinal cord',p=>p.id==='BP43-FJ4426','Neural tissue of the spinal cord; the cauda equina below consists of nerve roots, not an extension of the cord.');
group('peripheral nerves',p=>p.id.startsWith('ZA-')&&p.system==='nervous','Reference nerve pathways and plexuses. This assembly does not include every microscopic nerve branch.');
group('lung lobes',p=>/^(Superior|Middle|Inferior) lobe of (left|right) lung$/.test(p.name),'Three lobes in the right lung and two in the left. Hide a lobe to reveal the airways behind it.');
for(const side of ['left','right'])group(side+' lung',p=>new RegExp('lobe of '+side+' lung$','i').test(p.name));
group('airway tree',p=>/trachea|bronch/i.test(p.name)&&p.system==='respiratory');
group('pharynx',p=>/^(Naso|Oro|Laryngo)pharynx$/.test(p.name),'The pharynx links the nasal and oral regions with the larynx and oesophagus. Food passes through the oropharynx and laryngopharynx.');
group('lymph nodes',p=>p.id.startsWith('ZA-')&&p.system==='lymphatic','Regional lymph-node groups across the head, neck, chest, abdomen, pelvis and limbs. One model object may contain several nodes.');
group('major lymph drainage routes',p=>p.kind==='teaching','Sixteen simplified pathways illustrate major drainage towards the venous angles. The pathways are original teaching illustrations, not a complete reference vessel network.');
group('fascia',p=>p.system==='connective'&&/fascia/i.test(p.name));
group('intervertebral discs',p=>/intervertebral disc/i.test(p.name));
group('knee connective tissues',p=>p.system==='connective'&&/menisc|cruciate|poplite|patell|tibial collateral|fibular collateral|ligament of knee/i.test(p.name));
group('nasal skeleton',p=>p.system==='skeletal'&&/nasal bone|vomer|nasal concha|ethmoid/i.test(p.name));
const packed=gzipSync(Buffer.concat(buffers),{level:9});fs.writeFileSync(dir+'anatomy-upgrade.bin.gz',packed);atlas.chunks.push({url:'/atlas/models/anatomy-upgrade.bin',bytes,gzip:'/atlas/models/anatomy-upgrade.bin.gz',gzipBytes:packed.length});atlas.triangles+=triangles;atlas.version='anatomy-upgrade-2026-09';atlas.scope='Adult male reference assembly. Selected BodyParts3D and Z-Anatomy structures; not every structure or individual variation is represented. Kidney and lymph-flow study diagrams are explicitly labelled teaching illustrations.';fs.writeFileSync(dir+'atlas.json',JSON.stringify(atlas));console.log({parts:atlas.parts.length,added:additions.length,triangles,gzipBytes:packed.length});
