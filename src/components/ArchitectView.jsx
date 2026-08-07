import { useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';
import ProgressBar from './ProgressBar.jsx';

export const ARCHITECT_SLUG = 'architect';

const KIND_ICONS = { docs: '📄', course: '🎓', article: '✍️', video: '🎬', paper: '📑', book: '📘', tool: '🔧' };
const KIND_LABELS = { concept: 'Concept', scenario: 'Scenario', behavioral: 'Behavioral' };
const KIND_DIFF = { concept: 'warmup', scenario: 'core', behavioral: 'advanced' };

// The five dimensions this role is explicitly evaluated on (from the JD).
const DIMENSIONS = [
  ['Problem Solving', 'Framing ambiguity, diagnosing issues, choosing pragmatic solutions.'],
  ['AI Leverage', 'Using AI across the SDLC with judgment and guardrails.'],
  ['System Design', 'HLD/LLD for scalable, distributed, resilient systems.'],
  ['Ownership', 'End-to-end accountability, incidents, tech debt, follow-through.'],
  ['Execution Ability', 'Leading a multi-quarter vision to delivery across teams.'],
];

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
          {q.source && <p className="note">{q.source}</p>}
        </div>
      )}
    </div>
  );
}

export default function ArchitectView({ doneKeys, onToggle }) {
  const [questions, setQuestions] = useState(null);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getQanda('architect'), api.getArchitectResources()])
      .then(([qs, res]) => { setQuestions(qs); setResources(res); })
      .catch((e) => setError(e.message));
  }, []);

  const groupedQuestions = useMemo(() => {
    if (!questions) return [];
    const byCat = new Map();
    questions.forEach((q) => {
      if (!byCat.has(q.category)) byCat.set(q.category, []);
      byCat.get(q.category).push(q);
    });
    return [...byCat.entries()];
  }, [questions]);

  const groupedResources = useMemo(() => {
    if (!resources) return [];
    const byArea = new Map();
    resources.forEach((r) => {
      if (!byArea.has(r.area)) byArea.set(r.area, []);
      byArea.get(r.area).push(r);
    });
    return [...byArea.entries()];
  }, [resources]);

  if (error) return <p className="error">{error}</p>;
  if (!questions || !resources) return <p className="loading">Loading…</p>;

  const isDone = (key) => doneKeys.has(`${ARCHITECT_SLUG}:question:${key}`);
  const done = questions.filter((q) => isDone(q.key)).length;

  return (
    <article className="module">
      <header className="module-header">
        <span className="priority-badge priority-2">Software Architect</span>
        <h2>Software Architect</h2>
        <p className="tagline">
          Prep track for a 13+ yr Software Architect role: HLD/LLD, AWS &amp; Kubernetes, React &amp; Node.js,
          REST/microservices/event-driven, DevOps &amp; CI/CD, and design principles — organized around the
          five dimensions this role is evaluated on.
        </p>
        <ProgressBar done={done} total={questions.length} label="Reviewed" />
      </header>

      <section className="why">
        <h3>What this role is evaluated on</h3>
        <ul className="objectives">
          {DIMENSIONS.map(([name, blurb]) => (
            <li key={name}><strong>{name}.</strong> {blurb}</li>
          ))}
        </ul>
        <p style={{ marginBottom: 0 }}>
          Format to expect: recruiter screen → tech screen (DSA + React + Node) → a multi-hour onsite
          with whiteboarding, pair-programming, and system design, often ending with senior-leadership
          (VP Engineering / CEO) rounds. Trade-off analysis is weighted heavily — always state what you gave up.
          Companies modernizing past a legacy monolith make migration and DevOps-maturity questions likely.
        </p>
      </section>

      <h3 style={{ fontSize: '1.15rem', marginTop: '2rem' }}>Study track — curated resources</h3>
      {groupedResources.map(([area, items]) => (
        <section key={area}>
          <h3>{area}</h3>
          <ul className="resources">
            {items.map((r) => (
              <li key={r.key}>
                <label>
                  <span className="kind">{KIND_ICONS[r.kind] || '📄'}</span>
                  <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                </label>
                {r.note && <span className="note">{r.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h3 style={{ fontSize: '1.15rem', marginTop: '2rem' }}>Q&amp;A bank</h3>
      {groupedQuestions.map(([category, qs]) => (
        <section key={category}>
          <h3>{category}</h3>
          {qs.map((q) => (
            <QuestionCard
              key={q.key}
              q={q}
              done={isDone(q.key)}
              onToggle={() => onToggle(ARCHITECT_SLUG, 'question', q.key)}
            />
          ))}
        </section>
      ))}
    </article>
  );
}
