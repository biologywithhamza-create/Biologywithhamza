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
