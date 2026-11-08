"use client";

import Link from "next/link";
import {AnswerFeedback} from "./answer-feedback";
import { QuestionVisual, QuestionReport } from "./question-tools";
import { makeAttempt, reviewPool, type PracticeMode } from "../revision/model";
import { useRevision, saveAttempt, notifyRevision, validProfile } from "../revision/store";
import {learningChapters} from "../learn/catalogue";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
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
function saveLocal(key: string, value: string) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } }
function removeLocal(key: string) { try { window.localStorage.removeItem(key); } catch { /* In-memory progress still works. */ } }

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
  const [wrongOnly,setWrongOnly]=useState(false);
  const [mode,setMode]=useState<"fresh"|"mistakes"|"due">("fresh");
  const [attemptMode,setAttemptMode]=useState<PracticeMode>("fresh");
  const [saveError,setSaveError]=useState("");
  const [saving,setSaving]=useState(false);
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
  const attemptDeadline = useRef(0);
  const questionHeading = useRef<HTMLHeadingElement>(null);

  const revision = useRevision(profile?.id ?? null);
  const available = useMemo(
    () => (mode === "fresh" ? quizQuestions : reviewPool(revision,quizQuestions,mode)).filter((question) =>
      (chapter === "All chapters" || question.chapter === chapter) &&
      (difficulty === "All levels" || question.difficulty === difficulty)),
    [chapter, difficulty, mode, revision],
  );

  useEffect(() => {
    if (screen !== "active") return;
    const updateTime = () => {
      const remaining = Math.max(0, Math.ceil((attemptDeadline.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) setScreen("results");
    };
    const timer = window.setInterval(updateTime, 1000);
    document.addEventListener("visibilitychange", updateTime);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", updateTime); };
  }, [screen]);

  useEffect(() => {
    answerLockInProgress.current = false;
    if (screen === "active") questionHeading.current?.focus({ preventScroll: true });
  }, [currentIndex, screen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestedChapter = new URLSearchParams(window.location.search).get("chapter");
      if (requestedChapter && quizChapters.includes(requestedChapter)) setChapter(requestedChapter);
      const requestedMode = new URLSearchParams(window.location.search).get("mode");
      if (requestedMode === "mistakes" || requestedMode === "due") setMode(requestedMode);
      try {
        const stored = window.localStorage.getItem(profileKey);
        if (stored) {
          const value = JSON.parse(stored) as StudentProfile;
          if (validProfile(value)) setProfile(value);
        }
      } catch { /* Storage may be unavailable; a profile can still be used for this visit. */ }
      setProfileLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!profile) { setHistory([]); return; }
      try {
        const stored = window.localStorage.getItem(profileHistoryKey(profile.id));
        const parsed = stored ? JSON.parse(stored) : [];
        setHistory(Array.isArray(parsed) ? parsed.filter(item => item && typeof item.score === "number" && typeof item.total === "number" && typeof item.completedAt === "string" && Number.isFinite(Date.parse(item.completedAt))).slice(0,6) : []);
      } catch { setHistory([]); }
    }, 0);
    return () => window.clearTimeout(timer);
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
    const problem = saveAttempt(profile.id, makeAttempt(attemptId,attemptMode,attempt,answers));
    queueMicrotask(() => { setSaveError(problem); setSaving(false); });
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
      saveLocal(profileHistoryKey(profile.id), JSON.stringify(next));
      return next;
    });
  }, [attempt, answers, attemptMode, attemptId, chapter, difficulty, profile, score, screen]);

  function createProfile(): StudentProfile | null {
    const normalizedName = studentName.trim().replace(/\s+/g, " ");
    if (normalizedName.length < 2) {
      setProfileError("Enter at least two characters for your name or initials.");
      return null;
    }
    const nextProfile: StudentProfile = {
      id: createStudentId(),
      name: normalizedName.slice(0, 48),
      track: studentTrack,
      createdAt: new Date().toISOString(),
    };
    const stored = saveLocal(profileKey, JSON.stringify(nextProfile));
    setProfile(nextProfile);
    notifyRevision();
    setProfileError(stored ? "" : "Progress can only be kept for this visit because browser storage is unavailable.");
    return nextProfile;
  }

  function useDifferentProfile() {
    removeLocal(profileKey);
    notifyRevision();
    setProfile(null);
    setStudentName("");
    setStudentTrack("MDCAT");
    setProfileError("");
  }

  function beginAttempt(activeProfile: StudentProfile | null = profile) {
    if (!activeProfile || !available.length) return;
    setAttemptMode(mode);
    setSaveError("");
    setSaving(true);
    const selectionKey = `${activeProfile.id}::${chapter}::${difficulty}`;
    let recentSets: Record<string, string[]> = {};
    try {
      recentSets = JSON.parse(window.localStorage.getItem(recentQuestionKey) ?? "{}") as Record<string, string[]>;
    } catch {
      removeLocal(recentQuestionKey);
    }
    if (!recentSets || typeof recentSets !== "object" || Array.isArray(recentSets)) recentSets = {};
    const previousIds = Array.isArray(recentSets[selectionKey]) ? recentSets[selectionKey] : [];
    const selected = createRandomizedAttempt(available, requestedCount, previousIds);
    recentSets[selectionKey] = [
      ...selected.map((question) => question.id),
      ...previousIds,
    ].filter((id, index, items) => items.indexOf(id) === index)
      .slice(0, Math.min(available.length, Math.max(requestedCount * 3, 30)));
    saveLocal(recentQuestionKey, JSON.stringify(recentSets));
    answerLockInProgress.current = false;
    setWrongOnly(false);
    setAttempt(selected);
    setAnswers({});
    setDraftAnswer(null);
    setCurrentIndex(0);
    attemptDeadline.current = Date.now() + selected.length * 60_000;
    setTimeLeft(selected.length * 60);
    setAttemptId(crypto.randomUUID());
    setScreen("active");
  }

function retryMistakes(){setAttemptMode("retry");setSaveError("");setSaving(true);const wrong=attempt.filter(q=>answers[q.id]!==q.answer);if(!wrong.length)return;const selected=createRandomizedAttempt(wrong,wrong.length,[]);setAttempt(selected);setAnswers({});setDraftAnswer(null);setCurrentIndex(0);setWrongOnly(false);answerLockInProgress.current=false;attemptDeadline.current=Date.now()+selected.length*60_000;setTimeLeft(selected.length*60);setAttemptId(crypto.randomUUID());setScreen("active");}
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
    if (profile) removeLocal(profileHistoryKey(profile.id));
    setHistory([]);
  }

  function lockAnswerAndContinue() {
    const question = attempt[currentIndex];
    if (!question || draftAnswer === null || answerLockInProgress.current) return;
    if (Date.now() >= attemptDeadline.current) { setTimeLeft(0); setScreen("results"); return; }
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

  if (screen === "setup") {
    const chapterRoute = learningChapters.find(c=>c.title===chapter);
    function start(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const activeProfile = profile ?? createProfile(); if (activeProfile) beginAttempt(activeProfile); }
    return <section className="quiz-workspace student-quiz-setup" aria-labelledby="quiz-setup-title">
      {chapterRoute && <Link className="student-back" href={'/learn/'+chapterRoute.slug}>← Back to {chapterRoute.title}</Link>}
      <form className="quiz-builder" onSubmit={start}>
        <div className="quiz-builder-heading"><h2 id="quiz-setup-title">Your quiz</h2><span>{quizQuestions.length.toLocaleString()} questions · {quizChapters.length} chapters</span></div>
        <div className="quiz-setup-fields"><label><span>Chapter</span><select value={chapter} onChange={e=>setChapter(e.target.value)}><option>All chapters</option>{quizChapters.map(c=><option key={c}>{c}</option>)}</select></label><fieldset><legend>Number of questions</legend><div className="quiz-count-options">{[10,25,50,100].map(count=><label key={count}><input type="radio" name="question-count" value={count} checked={requestedCount===count} onChange={()=>setRequestedCount(count)}/><span>{count}</span></label>)}</div></fieldset></div>
        {!profile?<div className="quiz-inline-profile"><label><span>Name or initials</span><input autoComplete="name" minLength={2} maxLength={48} placeholder="e.g. Ayesha K." required value={studentName} onChange={e=>setStudentName(e.target.value)}/></label><p>A practice ID will be created with your first quiz. Your progress stays in this browser; no email or password needed. <Link href="/account">Restore an existing backup</Link></p></div>:<div className="quiz-local-profile"><span>Saving results for <strong>{profile.name}</strong> on this device.</span><button type="button" onClick={useDifferentProfile}>Change profile</button></div>}
        {profileError&&<p role="alert" className="quiz-profile-error">{profileError}</p>}
        <details className="quiz-more-options" open={mode!=='fresh'||difficulty!=='All levels'?true:undefined}><summary>More options: difficulty & mistake review</summary><div className="quiz-setup-fields"><label><span>Practice mode</span><select value={mode} onChange={e=>setMode(e.target.value as typeof mode)}><option value="fresh">Fresh practice</option><option value="mistakes" disabled={!profile}>Review my mistakes</option><option value="due" disabled={!profile}>Reviews due now</option></select></label><label><span>Difficulty</span><select value={difficulty} onChange={e=>setDifficulty(e.target.value as typeof difficulty)}><option>All levels</option><option>Foundation</option><option>Standard</option><option>Challenge</option></select></label></div>{mode!=='fresh'&&<p>{mode==='due'?'Questions scheduled for review today.':'Questions from your mistake notebook that still need practice.'}</p>}</details>
        <div className="quiz-ready-summary" aria-live="polite"><strong>{Math.min(requestedCount,available.length)} questions · {Math.min(requestedCount,available.length)} minutes</strong><span>{available.length} questions available for these choices.</span></div>
        <p className="quiz-simple-rules"><strong>Before you start:</strong> Questions and options are shuffled. Lock each answer to move on; locked answers cannot be changed. Explanations appear at the end.</p>
        {!available.length&&<p role="status">{mode==='fresh'?'No questions match. Try All levels.':'No review questions match yet. Choose Fresh practice or open your mistake notebook.'}</p>}
        <button className="quiz-primary" type="submit" disabled={!available.length}>Start {Math.min(requestedCount,available.length)}-question quiz</button>
      </form>
      {history.length>0&&<details className="quiz-history student-recent-attempts"><summary>Recent attempts on this device</summary><ol>{history.map(item=><li key={item.id}><span>{item.chapter==='All chapters'?'Mixed chapters':item.chapter}</span><strong>{item.score}/{item.total}</strong><small>{new Intl.DateTimeFormat('en-PK',{day:'numeric',month:'short'}).format(new Date(item.completedAt))}</small></li>)}</ol><Link href="/revision">Review attempts & mistakes →</Link><button type="button" onClick={clearHistory}>Clear recent score summaries</button></details>}
    </section>;
  }

  if (screen === "results") {
    const percentage = attempt.length ? Math.round((score / attempt.length) * 100) : 0;
    return (
      <section className="quiz-results" aria-labelledby="quiz-results-title">
        <div className="quiz-score-card">
          <p className="eyebrow">Attempt complete · {attemptMode === 'fresh' ? 'Fresh practice' : 'Revision'}</p>
          <p role="status">{saving ? "Saving your revision record…" : saveError ? "This attempt could not be saved: "+saveError : "Attempt recorded. Missed questions are in your notebook."}</p>
          {saveError && <button type="button" className="quiz-retry" onClick={()=>{if(profile)setSaveError(saveAttempt(profile.id,makeAttempt(attemptId,attemptMode,attempt,answers)));}}>Retry saving</button>}
          <Link className="revision-entry" href="/revision">View revision dashboard ↗</Link>
          <strong>{percentage}%</strong>
          <h2 id="quiz-results-title">{score} of {attempt.length} correct</h2>
          {profile && <p className="quiz-result-student">{profile.name} · {profile.id}</p>}
          <p>{percentage >= 80 ? "Strong biological judgment. Review the remaining explanations before moving on." : percentage >= 60 ? "A useful attempt. Repair the weak links below, then try a fresh set." : "Use the explanations as a revision map, then attempt the chapter again."}</p>
          <button className="quiz-primary" type="button" onClick={()=>{setWrongOnly(score<attempt.length);document.getElementById("quiz-answer-review")?.scrollIntoView({block:"start"});}}>{score===attempt.length?"Review all answers":"Review incorrect answers"}</button><button className="quiz-retry" type="button" onClick={resetAttempt}>Start another quiz</button>{score<attempt.length&&<button className="quiz-retry" onClick={retryMistakes}>Retry {attempt.length-score} missed questions</button>}<div className="quiz-chapter-results"><h3>Choose what to revisit</h3>{[...new Set(attempt.map(q=>q.chapter))].map(c=>{const qs=attempt.filter(q=>q.chapter===c),n=qs.filter(q=>answers[q.id]===q.answer).length,r=learningChapters.find(r=>r.title===c);return <Link key={c} href={r?"/learn/"+r.slug:"/learn"}><span>{c} ↗</span><strong>{n}/{qs.length}</strong></Link>;})}</div>
        </div>
        <div className="quiz-review" id="quiz-answer-review">
          <div className="quiz-review-head">
            <p className="eyebrow">Review every decision</p>
            <h2>Answer logic</h2>
          </div>
          <label className="quiz-review-filter"><input type="checkbox" checked={wrongOnly} onChange={e=>setWrongOnly(e.target.checked)}/>Only incorrect or unanswered</label>
          {attempt.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.answer;
            if(wrongOnly&&isCorrect)return null;
            return (
              <article className={isCorrect ? "is-correct" : "is-incorrect"} key={question.id}>
                <div className="quiz-review-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{isCorrect ? "Correct" : selected === undefined ? "Unanswered" : "Needs review"}</strong></div>
                <h3>{question.stem}</h3>
                <QuestionVisual question={question}/>
                <p><b>Correct answer:</b> {question.options[question.answer]}</p>
                {!isCorrect && selected !== undefined && <p><b>Your answer:</b> {question.options[selected]}</p>}
                <div className="quiz-explanation"><AnswerFeedback question={question}/></div>
                <QuestionReport question={question}/>
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
        <h2 id="active-question-title" tabIndex={-1} ref={questionHeading}>{question.stem}</h2>
        <QuestionVisual question={question}/>
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

function subscribeToDay(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  return () => window.clearInterval(timer);
}
export function DailyQuestion() {
  const index = useSyncExternalStore(subscribeToDay, dailyQuestionIndex, () => -1);
  if (index < 0) return <section className="quiz-profile-loading" aria-busy="true">Loading today’s question…</section>;
  return <DailyQuestionCard key={index} index={index}/>;
}
function DailyQuestionCard({ index }: { index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const question = quizQuestions[index];
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
        <QuestionVisual question={question}/>
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
            <QuestionReport question={question}/>
          </div>
        )}
      </div>
    </section>
  );
}
