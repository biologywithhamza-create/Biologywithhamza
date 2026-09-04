"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { quizChapters, quizQuestions, type QuestionDifficulty, type QuizQuestion } from "./questions";

type Screen = "setup" | "active" | "results";

type AttemptHistory = {
  id: string;
  completedAt: string;
  chapter: string;
  difficulty: string;
  score: number;
  total: number;
};

const historyKey = "biology-with-hamza-practice-history";

function dailyQuestionIndex() {
  const pakistanOffset = 5 * 60 * 60 * 1000;
  return Math.floor((Date.now() + pakistanOffset) / 86_400_000) % quizQuestions.length;
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function QuizExperience() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [chapter, setChapter] = useState("All chapters");
  const [difficulty, setDifficulty] = useState<"All levels" | QuestionDifficulty>("All levels");
  const [requestedCount, setRequestedCount] = useState(10);
  const [attempt, setAttempt] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptId, setAttemptId] = useState("");
  const [history, setHistory] = useState<AttemptHistory[]>([]);
  const savedAttempts = useRef(new Set<string>());

  const available = useMemo(
    () => quizQuestions.filter((question) =>
      (chapter === "All chapters" || question.chapter === chapter) &&
      (difficulty === "All levels" || question.difficulty === difficulty)),
    [chapter, difficulty],
  );

  useEffect(() => {
    if (screen !== "active") return;
    const timer = window.setInterval(() => setTimeLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen === "active" && timeLeft === 0 && attempt.length > 0) setScreen("results");
  }, [attempt.length, screen, timeLeft]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(historyKey);
      if (stored) setHistory(JSON.parse(stored) as AttemptHistory[]);
    } catch {
      window.localStorage.removeItem(historyKey);
    }
  }, []);

  const score = useMemo(
    () => attempt.reduce((total, question) => total + Number(answers[question.id] === question.answer), 0),
    [answers, attempt],
  );

  useEffect(() => {
    if (screen !== "results" || !attemptId || savedAttempts.current.has(attemptId)) return;
    savedAttempts.current.add(attemptId);
    const entry: AttemptHistory = {
      id: attemptId,
      completedAt: new Date().toISOString(),
      chapter,
      difficulty,
      score,
      total: attempt.length,
    };
    setHistory((current) => {
      const next = [entry, ...current].slice(0, 6);
      window.localStorage.setItem(historyKey, JSON.stringify(next));
      return next;
    });
  }, [attempt.length, attemptId, chapter, difficulty, score, screen]);

  function beginAttempt() {
    const selected = shuffle(available).slice(0, Math.min(requestedCount, available.length));
    setAttempt(selected);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(selected.length * 60);
    setAttemptId(`${Date.now()}-${selected.map((question) => question.id).join("-")}`);
    setScreen("active");
  }

  function resetAttempt() {
    setAttempt([]);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(0);
    setAttemptId("");
    setScreen("setup");
  }

  function clearHistory() {
    window.localStorage.removeItem(historyKey);
    setHistory([]);
  }

  if (screen === "setup") {
    return (
      <section className="quiz-workspace" aria-labelledby="quiz-setup-title">
        <div className="quiz-setup-copy">
          <p className="eyebrow">Build an attempt</p>
          <h2 id="quiz-setup-title">Choose what you want to test.</h2>
          <p>Every question has one best answer and a biological explanation. You receive one minute per question.</p>
          <dl>
            <div><dt>{quizQuestions.length}</dt><dd>concept questions</dd></div>
            <div><dt>{quizChapters.length}</dt><dd>high-yield chapters</dd></div>
            <div><dt>3</dt><dd>difficulty levels</dd></div>
          </dl>
        </div>
        <div className="quiz-builder">
          <label>
            <span>Chapter</span>
            <select value={chapter} onChange={(event) => setChapter(event.target.value)}>
              <option>All chapters</option>
              {quizChapters.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Difficulty</span>
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as typeof difficulty)}>
              <option>All levels</option>
              <option>Foundation</option>
              <option>Standard</option>
              <option>Challenge</option>
            </select>
          </label>
          <fieldset>
            <legend>Number of questions</legend>
            <div className="quiz-count-options">
              {[10, 25, 50, 100].map((count) => (
                <label key={count}>
                  <input type="radio" name="question-count" value={count} checked={requestedCount === count} onChange={() => setRequestedCount(count)} />
                  <span>{count}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="quiz-availability">
            <strong>{available.length}</strong>
            <span>questions match your filters. The attempt will use {Math.min(requestedCount, available.length)}.</span>
          </div>
          <button className="quiz-primary" type="button" onClick={beginAttempt} disabled={available.length === 0}>Start timed attempt</button>
          {history.length > 0 && (
            <div className="quiz-history">
              <div><strong>Recent attempts</strong><button type="button" onClick={clearHistory}>Clear</button></div>
              <ol>
                {history.map((item) => (
                  <li key={item.id}>
                    <span>{item.chapter === "All chapters" ? "Mixed chapters" : item.chapter}</span>
                    <strong>{item.score}/{item.total}</strong>
                    <small>{new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short" }).format(new Date(item.completedAt))}</small>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (screen === "results") {
    const percentage = attempt.length ? Math.round((score / attempt.length) * 100) : 0;
    return (
      <section className="quiz-results" aria-labelledby="quiz-results-title">
        <div className="quiz-score-card">
          <p className="eyebrow">Attempt complete</p>
          <strong>{percentage}%</strong>
          <h2 id="quiz-results-title">{score} of {attempt.length} correct</h2>
          <p>{percentage >= 80 ? "Strong biological judgment. Review the remaining explanations before moving on." : percentage >= 60 ? "A useful attempt. Repair the weak links below, then try a fresh set." : "Use the explanations as a revision map, then attempt the chapter again."}</p>
          <button className="quiz-primary" type="button" onClick={resetAttempt}>Build another attempt</button>
        </div>
        <div className="quiz-review">
          <div className="quiz-review-head">
            <p className="eyebrow">Review every decision</p>
            <h2>Answer logic</h2>
          </div>
          {attempt.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.answer;
            return (
              <article className={isCorrect ? "is-correct" : "is-incorrect"} key={question.id}>
                <div className="quiz-review-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{isCorrect ? "Correct" : selected === undefined ? "Unanswered" : "Needs review"}</strong></div>
                <h3>{question.stem}</h3>
                <p><b>Correct answer:</b> {question.options[question.answer]}</p>
                {!isCorrect && selected !== undefined && <p><b>Your answer:</b> {question.options[selected]}</p>}
                <div>{question.explanation}</div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  const question = attempt[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <section className="quiz-active" aria-labelledby="active-question-title">
      <header className="quiz-active-bar">
        <div><span>Progress</span><strong>{currentIndex + 1} / {attempt.length}</strong></div>
        <div><span>Answered</span><strong>{answeredCount} / {attempt.length}</strong></div>
        <div className={timeLeft < 60 ? "is-urgent" : ""}><span>Time remaining</span><strong>{formatTime(timeLeft)}</strong></div>
      </header>
      <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${((currentIndex + 1) / attempt.length) * 100}%` }} /></div>
      <article className="quiz-question">
        <div className="quiz-question-meta"><span>{question.chapter}</span><span>{question.difficulty}</span></div>
        <h2 id="active-question-title">{question.stem}</h2>
        <fieldset>
          <legend className="sr-only">Choose one answer</legend>
          {question.options.map((option, index) => (
            <label className={answers[question.id] === index ? "is-selected" : ""} key={option}>
              <input
                type="radio"
                name={question.id}
                checked={answers[question.id] === index}
                onChange={() => setAnswers((current) => ({ ...current, [question.id]: index }))}
              />
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option}</strong>
            </label>
          ))}
        </fieldset>
      </article>
      <footer className="quiz-controls">
        <button type="button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>Previous</button>
        <div className="quiz-dots" aria-label="Question navigation">
          {attempt.map((item, index) => (
            <button
              type="button"
              className={`${index === currentIndex ? "is-current" : ""} ${answers[item.id] !== undefined ? "is-answered" : ""}`}
              aria-label={`Question ${index + 1}${answers[item.id] !== undefined ? ", answered" : ""}`}
              onClick={() => setCurrentIndex(index)}
              key={item.id}
            >{index + 1}</button>
          ))}
        </div>
        {currentIndex < attempt.length - 1
          ? <button className="quiz-primary" type="button" onClick={() => setCurrentIndex((index) => index + 1)}>Next question</button>
          : <button className="quiz-primary" type="button" onClick={() => setScreen("results")}>Submit attempt</button>}
      </footer>
    </section>
  );
}

export function DailyQuestion() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [question] = useState(() => quizQuestions[dailyQuestionIndex()]);
  const isCorrect = selected === question.answer;

  return (
    <section className="daily-question" aria-labelledby="daily-question-title">
      <div className="daily-question-intro">
        <p className="eyebrow">Question of the day</p>
        <h2 id="daily-question-title">One careful decision. Every day.</h2>
        <p>A new conceptual question appears each day in Pakistan time. Choose first, then reveal the biological logic.</p>
        <div><span>{question.chapter}</span><span>{question.difficulty}</span></div>
      </div>
      <div className="daily-question-card">
        <h3>{question.stem}</h3>
        <div className="daily-question-options" role="group" aria-label="Choose one answer">
          {question.options.map((option, index) => {
            const optionState = revealed
              ? index === question.answer
                ? "is-correct"
                : selected === index
                  ? "is-incorrect"
                  : ""
              : selected === index
                ? "is-selected"
                : "";
            return (
              <button
                type="button"
                className={optionState}
                aria-pressed={selected === index}
                disabled={revealed}
                onClick={() => setSelected(index)}
                key={option}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <strong>{option}</strong>
              </button>
            );
          })}
        </div>
        {!revealed ? (
          <button className="quiz-primary" type="button" disabled={selected === null} onClick={() => setRevealed(true)}>Check answer</button>
        ) : (
          <div className={`daily-question-explanation ${isCorrect ? "is-correct" : "is-incorrect"}`} aria-live="polite">
            <strong>{isCorrect ? "Correct." : `Correct answer: ${String.fromCharCode(65 + question.answer)}.`}</strong>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
}
