import { useState } from 'react';

const DIFF_LABELS = { warmup: 'Warm-up', core: 'Core', advanced: 'Advanced' };

export default function ProblemCard({ problem, done, onToggle }) {
  const [open, setOpen] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  return (
    <div className={`problem-card ${done ? 'done' : ''}`}>
      <div className="problem-head">
        <input type="checkbox" checked={done} onChange={onToggle} title="Mark solved" />
        <button className="problem-title" onClick={() => setOpen(!open)}>
          <span>{problem.title}</span>
          <span className={`diff diff-${problem.difficulty}`}>{DIFF_LABELS[problem.difficulty]}</span>
          <span className="chevron">{open ? '▾' : '▸'}</span>
        </button>
      </div>
      {open && (
        <div className="problem-body">
          <p className="statement">{problem.statement}</p>
          {problem.deliverable && (
            <p className="deliverable"><strong>Deliverable:</strong> {problem.deliverable}</p>
          )}
          {problem.hints?.length > 0 && (
            <div className="hints">
              {problem.hints.slice(0, hintsShown).map((h, i) => (
                <p key={i} className="hint"><strong>Hint {i + 1}:</strong> {h}</p>
              ))}
              {hintsShown < problem.hints.length && (
                <button className="hint-btn" onClick={() => setHintsShown(hintsShown + 1)}>
                  Reveal hint {hintsShown + 1} of {problem.hints.length}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
