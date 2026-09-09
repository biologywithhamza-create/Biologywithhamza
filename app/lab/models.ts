/** Illustrative steady-state Michaelis–Menten model, with Km = 20 relative units. */
export function enzymeRate(substrate: number, enzymePercent = 100) {
  return enzymePercent * substrate / (20 + substrate);
}
export type Genotype = "AA" | "Aa" | "aa";
export function geneticCross(parentA: Genotype, parentB: Genotype) {
  const offspring = [...parentA].flatMap(a => [...parentB].map(b => (a + b).split("").sort().join("") as Genotype));
  const probabilities = { AA: 0, Aa: 0, aa: 0 };
  offspring.forEach(g => { probabilities[g] += 25; });
  return { offspring, probabilities, dominant: probabilities.AA + probabilities.Aa, recessive: probabilities.aa };
}
export function osmosisDirection(outside: number, inside: number): "in" | "out" | "balanced" {
  return outside === inside ? "balanced" : outside < inside ? "in" : "out";
}
export const twoLocusGenotypes = ['AABB','AABb','AAbb','AaBB','AaBb','Aabb','aaBB','aaBb','aabb'];
export function gametes(g: string) {
  if (!twoLocusGenotypes.includes(g)) throw new Error('Invalid two-locus genotype');
  return [...new Set([...g.slice(0,2)].flatMap(a => [...g.slice(2)].map(b => a+b)))];
}
export function combineGametes(a: string,b: string) { return [a[0],b[0]].sort().join('')+[a[1],b[1]].sort().join(''); }
export function phenotype(g:string) { return (g.slice(0,2).includes('A')?'A_':'aa')+(g.slice(2).includes('B')?'B_':'bb'); }
export function twoLocusCross(a:string,b:string) {
  const ga=gametes(a),gb=gametes(b),cells=gb.map(y=>ga.map(x=>combineGametes(x,y)));
  const probability=1/(ga.length*gb.length),genotypes:Record<string,number>={},phenotypes:Record<string,number>={A_B_:0,A_bb:0,aaB_:0,aabb:0};
  cells.flat().forEach(g=>{genotypes[g]=(genotypes[g]??0)+probability;phenotypes[phenotype(g)]+=probability;});
  return {ga,gb,cells,probability,genotypes,phenotypes};
}
export function inhibitionRate(s:number,i:number,kind:string) { return kind==='competitive'?100*s/(20*(1+i)+s):100/(1+i)*s/(20+s); }
export function selectionTrajectory(initial:number,fitness:number,generations=20) {
  const result=[initial]; for(let i=0;i<generations;i++){const p=result[i];result.push(p*fitness/(p*fitness+1-p));} return result;
}
