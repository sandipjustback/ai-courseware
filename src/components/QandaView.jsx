import { useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';
import ProgressBar from './ProgressBar.jsx';

export const QANDA_SLUG = 'qanda';

const KIND_LABELS = { concept: 'Concept', scenario: 'Scenario', behavioral: 'Behavioral' };
const KIND_DIFF = { concept: 'warmup', scenario: 'core', behavioral: 'advanced' };

function QuestionCard({ q, done, onToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`problem-card ${done ? 'done' : ''}`}>
      <div className="problem-head">
        <input type="checkbox" checked={done} onChange={onToggle} title="Mark reviewed" />
        <button className="problem-title" onClick={() => setOpen(!open)}>
          <span>{q.question}</span>
          <span className={`diff diff-${KIND_DIFF[q.kind]}`}>{KIND_LABELS[q.kind]}</span>
          <span className="chevron">{open ? '▾' : '▸'}</span>
        </button>
      </div>
      {open && (
        <div className="problem-body">
          {q.answer.split('\n\n').map((para, i) => (
            <p key={i} className="statement">{para}</p>
          ))}
          {q.source && <p className="note">Source: {q.source}</p>}
        </div>
      )}
    </div>
  );
}

export default function QandaView({ doneKeys, onToggle }) {
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getQanda().then(setQuestions).catch((e) => setError(e.message));
  }, []);

  const grouped = useMemo(() => {
    if (!questions) return [];
    const byCat = new Map();
    questions.forEach((q) => {
      if (!byCat.has(q.category)) byCat.set(q.category, []);
      byCat.get(q.category).push(q);
    });
    return [...byCat.entries()];
  }, [questions]);

  if (error) return <p className="error">{error}</p>;
  if (!questions) return <p className="loading">Loading questions…</p>;

  const isDone = (key) => doneKeys.has(`${QANDA_SLUG}:question:${key}`);
  const done = questions.filter((q) => isDone(q.key)).length;

  return (
    <article className="module">
      <header className="module-header">
        <span className="priority-badge priority-1">Q&A</span>
        <h2>Q&A Bank</h2>
        <p className="tagline">
          Concept questions per module, problem-solving scenarios, and behavioral rounds.
          Click a question to reveal the answer; tick it once reviewed.
        </p>
        <ProgressBar done={done} total={questions.length} label="Reviewed" />
      </header>

      <section className="why">
        <h3>How to use this section</h3>
        <p>
          Practice answering out loud, not just reading — most assessment formats include a solution presentation
          or a live defense of your reasoning. Lead with the direct claim, then the supporting detail.
        </p>
      </section>

      {grouped.map(([category, qs]) => (
        <section key={category}>
          <h3>{category}</h3>
          {qs.map((q) => (
            <QuestionCard
              key={q.key}
              q={q}
              done={isDone(q.key)}
              onToggle={() => onToggle(QANDA_SLUG, 'question', q.key)}
            />
          ))}
        </section>
      ))}
    </article>
  );
}
