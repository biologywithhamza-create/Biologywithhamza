"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { quizChapters, quizQuestions, type QuestionDifficulty, type QuizQuestion } from "./questions";
import { createRandomizedAttempt } from "./quiz-randomization";

type Screen = "setup" | "active" | "results";

type StudentTrack = "MDCAT" | "Cambridge O Level" | "Both";

type StudentProfile = {
  id: string;
  name: string;
  track: StudentTrack;
  createdAt: string;
};

type AttemptHistory = {
  id: string;
  completedAt: string;
  chapter: string;
  difficulty: string;
  score: number;
  total: number;
};

const legacyHistoryKey = "biology-with-hamza-practice-history";
const profileKey = "biology-with-hamza-student-profile";
const recentQuestionKey = "biology-with-hamza-recent-question-sets";

function profileHistoryKey(studentId: string) {
  return `${legacyHistoryKey}:${studentId}`;
}

function dailyQuestionIndex() {
  const pakistanOffset = 5 * 60 * 60 * 1000;
  return Math.floor((Date.now() + pakistanOffset) / 86_400_000) % quizQuestions.length;
}

function createStudentId() {
  const random = new Uint32Array(2);
  window.crypto.getRandomValues(random);
  const suffix = Array.from(random, (value) => value.toString(36).toUpperCase())
    .join("")
    .slice(0, 8)
    .padEnd(8, "0");
  return `BWH-${suffix}`;
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
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentTrack, setStudentTrack] = useState<StudentTrack>("MDCAT");
  const [profileError, setProfileError] = useState("");
  const [draftAnswer, setDraftAnswer] = useState<number | null>(null);
  const savedAttempts = useRef(new Set<string>());
  const answerLockInProgress = useRef(false);

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
    answerLockInProgress.current = false;
  }, [currentIndex, screen]);

  useEffect(() => {
    if (screen === "active" && timeLeft === 0 && attempt.length > 0) setScreen("results");
  }, [attempt.length, screen, timeLeft]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(profileKey);
      if (stored) setProfile(JSON.parse(stored) as StudentProfile);
    } catch {
      window.localStorage.removeItem(profileKey);
    } finally {
      setProfileLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!profile) {
      setHistory([]);
      return;
    }
    const key = profileHistoryKey(profile.id);
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setHistory(JSON.parse(stored) as AttemptHistory[]);
        return;
      }
      const legacy = window.localStorage.getItem(legacyHistoryKey);
      if (legacy) {
        window.localStorage.setItem(key, legacy);
        window.localStorage.removeItem(legacyHistoryKey);
        setHistory(JSON.parse(legacy) as AttemptHistory[]);
        return;
      }
      setHistory([]);
    } catch {
      window.localStorage.removeItem(key);
      setHistory([]);
    }
  }, [profile]);

  useEffect(() => {
    if (screen !== "active") return;
    const protectAttempt = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = true;
    };
    window.addEventListener("beforeunload", protectAttempt);
    return () => window.removeEventListener("beforeunload", protectAttempt);
  }, [screen]);

  const score = useMemo(
    () => attempt.reduce((total, question) => total + Number(answers[question.id] === question.answer), 0),
    [answers, attempt],
  );

  useEffect(() => {
    if (screen !== "results" || !attemptId || !profile || savedAttempts.current.has(attemptId)) return;
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
      window.localStorage.setItem(profileHistoryKey(profile.id), JSON.stringify(next));
      return next;
    });
  }, [attempt.length, attemptId, chapter, difficulty, profile, score, screen]);

  function createProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = studentName.trim().replace(/\s+/g, " ");
    if (normalizedName.length < 2) {
      setProfileError("Enter at least two characters for your name or initials.");
      return;
    }
    const nextProfile: StudentProfile = {
      id: createStudentId(),
      name: normalizedName.slice(0, 48),
      track: studentTrack,
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(profileKey, JSON.stringify(nextProfile));
    setProfile(nextProfile);
    setProfileError("");
  }

  function useDifferentProfile() {
    window.localStorage.removeItem(profileKey);
    setProfile(null);
    setStudentName("");
    setStudentTrack("MDCAT");
    setProfileError("");
  }

  function beginAttempt() {
    if (!profile) return;
    const selectionKey = `${profile.id}::${chapter}::${difficulty}`;
    let recentSets: Record<string, string[]> = {};
    try {
      recentSets = JSON.parse(window.localStorage.getItem(recentQuestionKey) ?? "{}") as Record<string, string[]>;
    } catch {
      window.localStorage.removeItem(recentQuestionKey);
    }
    const selected = createRandomizedAttempt(available, requestedCount, recentSets[selectionKey] ?? []);
    recentSets[selectionKey] = [
      ...selected.map((question) => question.id),
      ...(recentSets[selectionKey] ?? []),
    ].filter((id, index, items) => items.indexOf(id) === index)
      .slice(0, Math.min(available.length, Math.max(requestedCount * 3, 30)));
    window.localStorage.setItem(recentQuestionKey, JSON.stringify(recentSets));
    setAttempt(selected);
    setAnswers({});
    setDraftAnswer(null);
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
    setDraftAnswer(null);
    setScreen("setup");
  }

  function clearHistory() {
    if (profile) window.localStorage.removeItem(profileHistoryKey(profile.id));
    setHistory([]);
  }

  function lockAnswerAndContinue() {
    const question = attempt[currentIndex];
    if (!question || draftAnswer === null || answerLockInProgress.current) return;
    answerLockInProgress.current = true;
    setAnswers((current) => ({ ...current, [question.id]: draftAnswer }));
    setDraftAnswer(null);
    if (currentIndex < attempt.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    setScreen("results");
  }

  if (!profileLoaded) {
    return <section className="quiz-profile-loading" aria-busy="true">Loading your practice profile…</section>;
  }

  if (screen === "setup" && !profile) {
    return (
      <section className="quiz-profile-gate" aria-labelledby="student-profile-title">
        <div className="quiz-profile-intro">
          <p className="eyebrow">Your practice identity</p>
          <h2 id="student-profile-title">Create your student ID.</h2>
          <p>Your scores and recent attempts will stay attached to one practice profile on this browser.</p>
          <ul>
            <li>No email or password required</li>
            <li>A private ID is created instantly</li>
            <li>Your data stays on this device</li>
          </ul>
        </div>
        <form className="quiz-profile-form" onSubmit={createProfile}>
          <label>
            <span>Name or initials</span>
            <input
              autoComplete="name"
              maxLength={48}
              placeholder="e.g. Ayesha K."
              required
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>
          <label>
            <span>Learning track</span>
            <select value={studentTrack} onChange={(event) => setStudentTrack(event.target.value as StudentTrack)}>
              <option>MDCAT</option>
              <option>Cambridge O Level</option>
              <option>Both</option>
            </select>
          </label>
          {profileError && <p className="quiz-profile-error" role="alert">{profileError}</p>}
          <button className="quiz-primary" type="submit">Create student ID</button>
          <p className="quiz-profile-note">This is a device-based practice profile, not a password-protected online account. Clearing browser data removes it.</p>
        </form>
      </section>
    );
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
          {profile && (
            <div className="quiz-student-card">
              <div>
                <span>Student ID</span>
                <strong>{profile.id}</strong>
                <p>{profile.name} · {profile.track}</p>
              </div>
              <button type="button" onClick={useDifferentProfile}>Use a different ID</button>
            </div>
          )}
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
            <span>questions match your filters. Your next set will use {Math.min(requestedCount, available.length)} in a fresh random order.</span>
          </div>
          <div className="quiz-attempt-rules" aria-label="Attempt rules">
            <strong>Attempt rules</strong>
            <ul>
              <li>Questions and answer choices are reshuffled for every new attempt.</li>
              <li>One question appears at a time; lock it before continuing.</li>
              <li>Locked answers cannot be changed and there is no backtracking.</li>
            </ul>
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
          {profile && <p className="quiz-result-student">{profile.name} · {profile.id}</p>}
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
        <div><span>Locked</span><strong>{answeredCount} / {attempt.length}</strong></div>
        <div className={timeLeft < 60 ? "is-urgent" : ""}><span>Time remaining</span><strong>{formatTime(timeLeft)}</strong></div>
      </header>
      <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${((currentIndex + 1) / attempt.length) * 100}%` }} /></div>
      <article className="quiz-question">
        <div className="quiz-question-meta"><span>{question.chapter}</span><span>{question.difficulty}</span></div>
        <h2 id="active-question-title">{question.stem}</h2>
        <fieldset>
          <legend className="sr-only">Choose one answer</legend>
          {question.options.map((option, index) => (
            <label className={draftAnswer === index ? "is-selected" : ""} key={`${question.id}-${index}`}>
              <input
                type="radio"
                name={question.id}
                checked={draftAnswer === index}
                onChange={() => setDraftAnswer(index)}
              />
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option}</strong>
            </label>
          ))}
        </fieldset>
      </article>
      <footer className="quiz-controls">
        <p><strong>No backtracking.</strong> Review your choice before locking it.</p>
        <button className="quiz-primary" type="button" disabled={draftAnswer === null} onClick={lockAnswerAndContinue}>
          {currentIndex < attempt.length - 1 ? "Lock answer & continue" : "Lock answer & submit"}
        </button>
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
