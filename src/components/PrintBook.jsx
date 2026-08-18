// Renders a course / role / Q&A bank as a printable "book" with clickable links.
// Hidden on screen (CSS), shown only when printing (window.print → Save as PDF).

function renderBlocks(text) {
  return String(text).split('\n\n').map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length && lines.every((l) => l.startsWith('- '))) {
      return <ul key={i}>{lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>;
    }
    return <p key={i}>{block}</p>;
  });
}

function Resources({ items }) {
  return (
    <>
      <h3>Resources &amp; links</h3>
      <ul className="pb-res">
        {items.map((r) => (
          <li key={r.key || r.url}>
            <a href={r.url}>{r.title}</a>
            <br /><span className="pb-url">{r.url}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function PrintBook({ book }) {
  if (!book) return null;
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="print-book">
      <div className="pb-cover">
        <div className="pb-brand">AI Courseware</div>
        <h1>{book.title}</h1>
        {book.subtitle && <p className="pb-sub">{book.subtitle}</p>}
        <p className="pb-meta">{book.chapters.length} sections · generated {dateStr}</p>
      </div>

      {book.chapters.map((ch, i) => (
        <section className="pb-chapter" key={i}>
          {ch.label && <div className="pb-label">{ch.label}</div>}
          <h2>{ch.title}</h2>
          {ch.tagline && <p className="pb-tagline">{ch.tagline}</p>}
          {ch.why && <p className="pb-why"><strong>Why it matters:</strong> {ch.why}</p>}
          {ch.content && renderBlocks(ch.content)}
          {ch.objectives && ch.objectives.length > 0 && (
            <>
              <h3>Learning objectives</h3>
              <ul>{ch.objectives.map((o, j) => <li key={j}>{o}</li>)}</ul>
            </>
          )}
          {ch.resources && ch.resources.length > 0 && <Resources items={ch.resources} />}
          {ch.problems && ch.problems.length > 0 && (
            <>
              <h3>Practice problems</h3>
              {ch.problems.map((p, j) => (
                <div key={j} className="pb-qa">
                  <p className="pb-q">{p.title}</p>
                  <p>{p.statement}</p>
                  {p.hints && p.hints.map((h, k) => <p key={k} className="pb-hint">Hint: {h}</p>)}
                </div>
              ))}
            </>
          )}
          {ch.qa && ch.qa.length > 0 && ch.qa.map((q, j) => (
            <div key={j} className="pb-qa">
              <p className="pb-q">{q.question}</p>
              {renderBlocks(q.answer)}
              {q.source && <p className="pb-hint">{q.source}</p>}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
