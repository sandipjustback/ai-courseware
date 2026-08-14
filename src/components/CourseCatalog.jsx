import ProgressBar from './ProgressBar.jsx';

// Home page: a grid of course tiles. `catalog` is an array of tile configs;
// `progressFor(id)` returns {done,total} or null (for non-tracked tiles).
export default function CourseCatalog({ catalog, progressFor, overall, onOpen }) {
  return (
    <div className="catalog">
      <div className="catalog-intro">
        <h1>AI Courseware</h1>
        <p>Pick a course to start learning — progress saves in your browser.</p>
        {overall && overall.total > 0 && (
          <ProgressBar done={overall.done} total={overall.total} label="Overall" />
        )}
      </div>

      <div className="catalog-section-title">Courses</div>
      <div className="tiles">
        {catalog.map((c) => {
          const p = progressFor(c.id);
          return (
            <button key={c.id} className={`tile a-${c.accent}`} onClick={() => onOpen(c)}>
              <div className="tile-top">
                <span className="tile-emoji">{c.emoji}</span>
                <span className="tile-pill">{c.pill}</span>
              </div>
              <h3 className="tile-title">{c.title}</h3>
              <div className="tile-sub">{c.subtitle}</div>
              <p className="tile-blurb">{c.blurb}</p>
              <div className="tile-foot">
                {p && p.total > 0
                  ? <ProgressBar done={p.done} total={p.total} label={p.label || 'Progress'} />
                  : <span className="tile-meta">{c.meta}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
