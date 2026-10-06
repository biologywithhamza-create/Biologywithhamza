export const target=[[0,0],[2,6],[4,15],[6,24]];
export function checkGraph(points:string[][],xLabel:string,yLabel:string){return points.length===4&&points.every((p,i)=>p.length===2&&p.every(v=>v.trim()!==''&&Number.isFinite(Number(v)))&&Math.abs(Number(p[0])-target[i][0])<=.15&&Math.abs(Number(p[1])-target[i][1])<=.6)&&xLabel==='Time / days'&&yLabel==='Mean height / mm';}
