import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProblemCard from './ProblemCard.jsx';
import ProgressBar from './ProgressBar.jsx';

const KIND_ICONS = { docs: '📄', course: '🎓', article: '✍️', video: '🎬', paper: '📑', tool: '🔧' };

export default function ModuleView({ slug, doneKeys, onToggle }) {
  const [mod, setMod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMod(null);
    api.getModule(slug).then(setMod).catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <p className="error">{error}</p>;
  if (!mod) return <p className="loading">Loading module…</p>;

  const isDone = (type, key) => doneKeys.has(`${slug}:${type}:${key}`);
  const resources = mod.resources || [];
  const problems = mod.problems || [];
  const objectives = mod.objectives || [];
  const total = resources.length + problems.length;
  const done = resources.filter((r) => isDone('resource', r.key)).length
    + problems.filter((p) => isDone('problem', p.key)).length;

  return (
    <article className="module">
      <header className="module-header">
        <span className={`priority-badge priority-${mod.priority}`}>{mod.badge || `Priority ${mod.priority}`}</span>
        <h2>{mod.title}</h2>
        {mod.tagline && <p className="tagline">{mod.tagline}</p>}
        {total > 0 && <ProgressBar done={done} total={total} label="Module" />}
      </header>

      {mod.whyItMatters && (
        <section className="why">
          <h3>Why it matters</h3>
          <p>{mod.whyItMatters}</p>
        </section>
      )}

      {mod.content && (
        <section>
          <h3>Answer</h3>
          {mod.content.split('\n\n').map((para, i) => (
            <p key={i} className="statement">{para}</p>
          ))}
        </section>
      )}

      {objectives.length > 0 && (
        <section>
          <h3>Learning objectives</h3>
          <ul className="objectives">
            {objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </section>
      )}

      {resources.length > 0 && (
        <section>
          <h3>Learn — curated resources</h3>
          <ul className="resources">
            {resources.map((r) => (
              <li key={r.key} className={isDone('resource', r.key) ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={isDone('resource', r.key)}
                    onChange={() => onToggle(slug, 'resource', r.key)}
                  />
                  <span className="kind">{KIND_ICONS[r.kind] || '📄'}</span>
                  <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                </label>
                {r.note && <span className="note">{r.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {problems.length > 0 && (
        <section>
          <h3>Practice problems</h3>
          {problems.map((p) => (
            <ProblemCard
              key={p.key}
              problem={p}
              done={isDone('problem', p.key)}
              onToggle={() => onToggle(slug, 'problem', p.key)}
            />
          ))}
        </section>
      )}
    </article>
  );
}
