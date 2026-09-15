import type { QuizQuestion } from "./questions";

export function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

export function randomizeOptions(question: QuizQuestion): QuizQuestion {
  const shuffled = shuffle(
    question.options.map((option, index) => ({ option, isCorrect: index === question.answer })),
  );
  return {
    ...question,
    options: shuffled.map(({ option }) => option) as QuizQuestion["options"],
    answer: shuffled.findIndex(({ isCorrect }) => isCorrect),
  };
}

export function createRandomizedAttempt(
  available: QuizQuestion[],
  requestedCount: number,
  recentQuestionIds: Iterable<string>,
) {
const count=Math.max(0,Math.min(Math.floor(requestedCount),available.length)),recentIds=new Set(recentQuestionIds),recentFamilies=new Set([...recentIds].map(questionFamily));
const pool=[...shuffle(available.filter(q=>!recentFamilies.has(questionFamily(q.id)))),...shuffle(available.filter(q=>recentFamilies.has(questionFamily(q.id))&&!recentIds.has(q.id))),...shuffle(available.filter(q=>recentIds.has(q.id)))];const selected:QuizQuestion[]=[],used=new Set<string>();
while(selected.length<count){const families=new Set<string>();let added=0;for(const q of pool){const family=questionFamily(q.id);if(used.has(q.id)||families.has(family))continue;selected.push(q);used.add(q.id);families.add(family);added++;if(selected.length===count)break;}if(!added)break;}
return shuffle(selected).map(randomizeOptions);}
export function questionFamily(id:string){return id.replace(/-(outcome|cause|mechanism|integrated)$/, "");}
