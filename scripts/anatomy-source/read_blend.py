import struct,re
class Blend:
 def __init__(self,path):
  self.data=open(path,'rb').read();self.blocks=[];p=12
  assert self.data[:7]==b'BLENDER' and self.data[7:9]==b'-v'
  while p+24<=len(self.data):
   code,size,addr,sdna,count=struct.unpack_from('<4sIQII',self.data,p);p+=24
   self.blocks.append(dict(code=code,size=size,addr=addr,sdna=sdna,count=count,pos=p));p+=size
   if code==b'ENDB':break
  dna=next(b for b in self.blocks if b['code']==b'DNA1');d=self.data[dna['pos']:dna['pos']+dna['size']];p=8
  n=struct.unpack_from('<I',d,p)[0];p+=4;self.names=[]
  for _ in range(n):e=d.index(0,p);self.names.append(d[p:e].decode());p=e+1
  p=(p+3)&~3;assert d[p:p+4]==b'TYPE';p+=4;n=struct.unpack_from('<I',d,p)[0];p+=4;self.types=[]
  for _ in range(n):e=d.index(0,p);self.types.append(d[p:e].decode());p=e+1
  p=(p+3)&~3;assert d[p:p+4]==b'TLEN';p+=4;self.lengths=struct.unpack_from('<'+'H'*n,d,p);p+=2*n;p=(p+3)&~3;assert d[p:p+4]==b'STRC';p+=4;n=struct.unpack_from('<I',d,p)[0];p+=4;self.structs=[];self.bytype={}
  for _ in range(n):
   t,nf=struct.unpack_from('<HH',d,p);p+=4;fields={};off=0
   for _ in range(nf):
    ft,fn=struct.unpack_from('<HH',d,p);p+=4;name=self.names[fn];num=1
    for dim in re.findall(r'\[(\d+)\]',name):num*=int(dim)
    ptr='*' in name;size=(8 if ptr else self.lengths[ft])*num;key=re.sub(r'\[.*','',name).replace('*','').strip('()');fields[key]=(off,self.types[ft],num,ptr);off+=size
   self.structs.append((self.types[t],fields));self.bytype[self.types[t]]=fields
  self.globalmap={b['addr']:b for b in self.blocks if b['code']!=b'DATA'}
  owner=None
  for b in self.blocks:
   if b['code']!=b'DATA':owner=b;owner['scope']={}
   elif owner:owner['scope'][b['addr']]=b
 def field(self,b,name,typ=None,index=0):
  typ=typ or self.structs[b['sdna']][0];pos=b['pos']+index*self.lengths[self.types.index(typ)]
  for k in name.split('.'):
   off,ft,num,ptr=self.bytype[typ][k];pos+=off;typ=ft
  if ptr:return struct.unpack_from('<Q',self.data,pos)[0]
  if ft=='char':return self.data[pos:pos+num].split(b'\0')[0].decode(errors='replace')
  fmt={'float':'f','int':'i','short':'h','double':'d','ushort':'H','uint':'I'}.get(ft)
  if fmt:
   v=struct.unpack_from('<'+fmt*num,self.data,pos);return v[0] if num==1 else v
  return dict(pos=pos,sdna=next(i for i,s in enumerate(self.structs) if s[0]==ft))
 def resolve(self,owner,addr):return owner.get('scope',{}).get(addr) or self.globalmap.get(addr)
 def objects(self):return [b for b in self.blocks if b['code']==b'OB\0\0']
if __name__=='__main__':
 b=Blend('source/Z-Anatomy/Startup.blend');print(len(b.objects()));print(b.bytype['Mesh']);print(b.bytype['Curve']);print(b.bytype['Nurb']);print(b.bytype['BezTriple'])
