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
  const recentIds = new Set(recentQuestionIds);
  const freshQuestions = shuffle(available.filter((question) => !recentIds.has(question.id)));
  const repeatedQuestions = shuffle(available.filter((question) => recentIds.has(question.id)));
  return [...freshQuestions, ...repeatedQuestions]
    .slice(0, Math.min(requestedCount, available.length))
    .map(randomizeOptions);
}
