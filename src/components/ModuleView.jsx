import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProblemCard from './ProblemCard.jsx';
import ProgressBar from './ProgressBar.jsx';

const KIND_ICONS = { docs: '📄', course: '🎓', article: '✍️', video: '🎬', paper: '📑', tool: '🔧' };

// Render a written lesson body: blank-line-separated blocks become paragraphs,
// and a block whose lines all start with "- " becomes a bullet list.
function renderContent(content) {
  return content.split('\n\n').map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length && lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="content-list">
          {lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}
        </ul>
      );
    }
    return <p key={i} className="statement">{block}</p>;
  });
}

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
          {renderContent(mod.content)}
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
                  <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
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
