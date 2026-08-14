import ProgressBar from './ProgressBar.jsx';

// Course landing: overview + its lessons as clickable tiles.
// `sections` = [{ label, modules }]; each module is the light payload
// (slug, order, title, tagline, resourceCount, problemCount).
export default function CourseDetail({ course, sections, doneKeys, onOpenLesson }) {
  const doneFor = (slug) => [...doneKeys].filter((k) => k.startsWith(`${slug}:`)).length;

  const allMods = sections.flatMap((s) => s.modules);
  const total = allMods.reduce((s, m) => s + m.resourceCount + m.problemCount, 0);
  const done = allMods.reduce((s, m) => s + doneFor(m.slug), 0);

  return (
    <div className="course-detail" style={{ ['--tile-accent']: `var(--${course.accent})` }}>
      <div className="course-head">
        <div className="course-sub">{course.subtitle}</div>
        <h2>{course.title}</h2>
        <p className="course-blurb">{course.blurb}</p>
        {total > 0 && <ProgressBar done={done} total={total} label="Course progress" />}
      </div>

      {sections.map((section, i) => (
        <div key={i}>
          {section.label && <div className="catalog-section-title">{section.label}</div>}
          <div className="lesson-tiles">
            {section.modules.map((m) => {
              const mTotal = m.resourceCount + m.problemCount;
              const mDone = doneFor(m.slug);
              const complete = mTotal > 0 && mDone === mTotal;
              return (
                <button
                  key={m.slug}
                  className={`lesson-tile ${complete ? 'complete' : ''}`}
                  onClick={() => onOpenLesson(m.slug)}
                >
                  <span className="num">Lesson {m.order}</span>
                  <h4>{m.title}</h4>
                  <span className="lt-tagline">{m.tagline}</span>
                  <div className="lt-foot">
                    <span>{m.resourceCount} readings · {m.problemCount} problems</span>
                    <span className={complete ? 'lt-done' : ''}>{mDone}/{mTotal}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
