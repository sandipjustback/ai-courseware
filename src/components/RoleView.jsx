import { useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';
import ProgressBar from './ProgressBar.jsx';

const KIND_ICONS = { docs: '📄', course: '🎓', article: '✍️', video: '🎬', paper: '📑', book: '📘', tool: '🔧' };
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
          {q.source && <p className="note">{q.source}</p>}
        </div>
      )}
    </div>
  );
}

// Generic role prep view. `role` is the id (also the progress-key prefix and the
// track/role filter); `config` supplies the display copy and evaluation dimensions.
export default function RoleView({ role, config, doneKeys, onToggle }) {
  const [questions, setQuestions] = useState(null);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuestions(null); setResources(null); setError(null);
    Promise.all([api.getQanda(role), api.getRoleResources(role)])
      .then(([qs, res]) => { setQuestions(qs); setResources(res); })
      .catch((e) => setError(e.message));
  }, [role]);

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

  const isDone = (key) => doneKeys.has(`${role}:question:${key}`);
  const done = questions.filter((q) => isDone(q.key)).length;

  return (
    <article className="module">
      <header className="module-header">
        <span className={`priority-badge priority-${config.badgeColor || 2}`}>{config.badge}</span>
        <h2>{config.title}</h2>
        <p className="tagline">{config.tagline}</p>
        <ProgressBar done={done} total={questions.length} label="Reviewed" />
      </header>

      <section className="why">
        <h3>{config.dimensionsTitle || 'What this role is evaluated on'}</h3>
        <ul className="objectives">
          {config.dimensions.map(([name, blurb]) => (
            <li key={name}><strong>{name}.</strong> {blurb}</li>
          ))}
        </ul>
        {config.intro && <p style={{ marginBottom: 0 }}>{config.intro}</p>}
      </section>

      {groupedResources.length > 0 && (
        <>
          <h3 style={{ fontSize: '1.15rem', marginTop: '2rem' }}>Study track — curated resources</h3>
          {groupedResources.map(([area, items]) => (
            <section key={area}>
              <h3>{area}</h3>
              <ul className="resources">
                {items.map((r) => (
                  <li key={r.key}>
                    <label>
                      <span className="kind">{KIND_ICONS[r.kind] || '📄'}</span>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                    </label>
                    {r.note && <span className="note">{r.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}

      <h3 style={{ fontSize: '1.15rem', marginTop: '2rem' }}>Q&amp;A bank</h3>
      {groupedQuestions.map(([category, qs]) => (
        <section key={category}>
          <h3>{category}</h3>
          {qs.map((q) => (
            <QuestionCard
              key={q.key}
              q={q}
              done={isDone(q.key)}
              onToggle={() => onToggle(role, 'question', q.key)}
            />
          ))}
        </section>
      ))}
    </article>
  );
}
