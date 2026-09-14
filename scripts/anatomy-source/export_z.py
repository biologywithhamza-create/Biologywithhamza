from read_blend import Blend
import numpy as np,json,re,struct,sys
b=Blend(sys.argv[1]);base=json.load(open('restored/public/atlas/models/atlas.json'))
def norm(s):
 s=s.lower().replace('oesoph','esoph').replace('-',' ')
 s=re.sub(r'\.l$',' left',s);s=re.sub(r'\.r$',' right',s)
 return ' '.join(sorted(re.findall(r'[a-z0-9]+',s)))
known={norm(p['name']) for p in base['parts']}
def select(n,t):
 if re.search(r'\.(?:g|j|i|s|t|ol|or)$',n) or t not in (1,2):return None
 l=n.lower()
 if re.search(r'^(superior|middle|inferior) lobe of (left|right) lung$',l):return 'respiratory'
 if l in ['nasopharynx','oropharynx','laryngopharynx']:return 'respiratory' if l=='nasopharynx' else 'digestive'
 if norm(n) in known:return None
 if t==2 and (('nerve' in l or 'brachial plexus' in l or 'cauda equina'==l) and 'arter' not in l and 'vein' not in l):return 'nervous'
 if t==1 and 'nodes' in l and l!='median sacral nodes':return 'lymphatic'
 if t==1 and re.search(r'fascia|ligament|meniscus|intervertebral disc',l) and not re.search(r'tensor|suspensory ligament of eyeball',l):return 'connective'
def mesh(o,d):
 nv=b.field(d,'totvert');np_=b.field(d,'totpoly');nl=b.field(d,'totloop')
 if not nv or not np_:return None
 vb=b.resolve(d,b.field(d,'mvert'));lb=b.resolve(d,b.field(d,'mloop'));pb=b.resolve(d,b.field(d,'mpoly'))
 if not all([vb,lb,pb]):return None
 v=np.ndarray((nv,3),dtype='<f4',buffer=b.data,offset=vb['pos'],strides=(20,4)).copy() if b.lengths[b.types.index('MVert')]==20 else np.ndarray((nv,3),dtype='<f4',buffer=b.data,offset=vb['pos'],strides=(b.lengths[b.types.index('MVert')],4)).copy()
 loops=np.ndarray((nl,),dtype='<u4',buffer=b.data,offset=lb['pos'],strides=(8,));faces=[]
 for j in range(np_):
  start,n=struct.unpack_from('<ii',b.data,pb['pos']+j*b.lengths[b.types.index('MPoly')]);p=loops[start:start+n]
  if len(p)!=n or n<3:continue
  for k in range(1,n-1):faces.append([int(p[0]),int(p[k]),int(p[k+1])])
 return v,np.array(faces,dtype=np.uint32)
def tube(points,radii):
 vertices=[];faces=[]
 for j,p in enumerate(points):
  tangent=points[min(j+1,len(points)-1)]-points[max(j-1,0)];tangent/=max(np.linalg.norm(tangent),1e-12)
  axis=np.array([0.,0.,1.]) if abs(tangent[2])<.9 else np.array([1.,0.,0.]);u=np.cross(tangent,axis);u/=max(np.linalg.norm(u),1e-12);w=np.cross(tangent,u)
  for k in range(8):vertices.append(p+radii[j]*(np.cos(k*np.pi/4)*u+np.sin(k*np.pi/4)*w))
  if j:
   for k in range(8):a=(j-1)*8+k;c=j*8+k;d=j*8+(k+1)%8;e=(j-1)*8+(k+1)%8;faces.extend([[a,c,d],[a,d,e]])
 return vertices,faces
def curve(o,d):
 addr=b.field(d,'nurb.first');verts=[];faces=[];seen=set();depth=b.field(d,'ext2')
 while addr and addr not in seen:
  seen.add(addr);nb=b.resolve(d,addr)
  if not nb:break
  bz=b.resolve(d,b.field(nb,'bezt'));n=b.field(nb,'pntsu');points=[];rs=[]
  if bz and n>1:
   vs=[np.array(b.field(bz,'vec','BezTriple',i)).reshape(3,3) for i in range(n)];r=[b.field(bz,'radius','BezTriple',i) for i in range(n)]
   for j in range(n-1):
    for t in np.linspace(0,1,9,endpoint=j==n-2):
     points.append((1-t)**3*vs[j][1]+3*(1-t)**2*t*vs[j][2]+3*(1-t)*t*t*vs[j+1][0]+t**3*vs[j+1][1]);rs.append(max(depth*((1-t)*r[j]+t*r[j+1]),.00015))
   vv,ff=tube(np.array(points),rs);offset=len(verts);verts.extend(vv);faces.extend([[a+offset for a in f] for f in ff])
  addr=b.field(nb,'next')
 return (np.array(verts),np.array(faces,dtype=np.uint32)) if faces else None
result=[]
for o in b.objects():
 n=b.field(o,'id.name')[2:];typ=b.field(o,'type');s=select(n,typ)
 if not s:continue
 d=b.resolve(o,b.field(o,'data'))
 if not d:continue
 geo=mesh(o,d) if typ==1 else curve(o,d)
 if geo is None:continue
 v,f=geo;m=np.array(b.field(o,'obmat')).reshape(4,4);v=np.column_stack([v,np.ones(len(v))])@m;v=v[:,:3];v=v[:,[0,2,1]]*np.array([1,1,-1])+np.array([0,.00333465,-.00185275])
 if n in ['Nasopharynx','Oropharynx','Laryngopharynx','Cauda equina']:
  mirror=v.copy();mirror[:,0]*=-1;f=np.concatenate([f,f[:,::-1]+len(v)]);v=np.concatenate([v,mirror])
 assert np.isfinite(v).all() and abs(v).max()<3,(n,v.min(0),v.max(0))
 assert f.max()<len(v),n
 name=re.sub(r'\.l$',' (left)',n);name=re.sub(r'\.r$',' (right)',name)
 result.append(dict(name=name,system=s,sourceName=n,p=np.round(v,7).flatten().tolist(),i=f.flatten().tolist()))
json.dump(result,open('z-additions.json','w'),separators=(',',':'))
from collections import Counter
print(len(result),Counter(x['system'] for x in result));print('vertices',sum(len(x['p'])//3 for x in result))
