import { useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import ModuleView from './components/ModuleView.jsx';
import QandaView, { QANDA_SLUG } from './components/QandaView.jsx';
import ArchitectView, { ARCHITECT_SLUG } from './components/ArchitectView.jsx';
import ProgressBar from './components/ProgressBar.jsx';

const PRIORITY_LABELS = { 1: 'Track 1 — Agentic AI Core', 2: 'Track 2 — Production & Integration', 3: 'Track 3 — Applied Architecture' };

export default function App() {
  const [modules, setModules] = useState([]);
  const [sdModules, setSdModules] = useState([]);
  const [lldModules, setLldModules] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [architectCount, setArchitectCount] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [doneKeys, setDoneKeys] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.listModules(), api.getProgress(), api.getQanda(), api.getQanda('architect'),
      api.listModules('system-design'), api.listModules('low-level-design'),
    ])
      .then(([mods, prog, questions, architectQs, sd, lld]) => {
        setModules(mods);
        setSdModules(sd);
        setLldModules(lld);
        setQuestionCount(questions.length);
        setArchitectCount(architectQs.length);
        setDoneKeys(new Set(prog.map((p) => p.key)));
        if (mods.length) setSelectedSlug(mods[0].slug);
      })
      .catch((e) => setError(e.message));
  }, []);

  const toggleItem = async (moduleSlug, itemType, itemKey) => {
    const key = `${moduleSlug}:${itemType}:${itemKey}`;
    const done = !doneKeys.has(key);
    setDoneKeys((prev) => {
      const next = new Set(prev);
      done ? next.add(key) : next.delete(key);
      return next;
    });
    try {
      await api.setProgress({ key, moduleSlug, itemType, done });
    } catch {
      setDoneKeys((prev) => {
        const next = new Set(prev);
        done ? next.delete(key) : next.add(key);
        return next;
      });
    }
  };

  const resetAll = async () => {
    if (!window.confirm('Reset all progress?')) return;
    await api.resetProgress();
    setDoneKeys(new Set());
  };

  const moduleDone = (m) =>
    [...doneKeys].filter((k) => k.startsWith(`${m.slug}:`)).length;

  const renderModuleBtn = (m) => {
    const total = m.resourceCount + m.problemCount;
    const done = moduleDone(m);
    return (
      <button
        key={m.slug}
        className={`nav-item ${selectedSlug === m.slug ? 'active' : ''}`}
        onClick={() => setSelectedSlug(m.slug)}
      >
        <span className="nav-item-title">{m.order}. {m.title}</span>
        <span className={`nav-item-count ${done === total && total > 0 ? 'complete' : ''}`}>
          {done}/{total}
        </span>
      </button>
    );
  };

  const totals = useMemo(() => {
    const sum = (arr) => arr.reduce((s, m) => s + m.resourceCount + m.problemCount, 0);
    const total = sum(modules) + sum(sdModules) + sum(lldModules) + questionCount + architectCount;
    return { total, done: doneKeys.size };
  }, [modules, sdModules, lldModules, doneKeys, questionCount, architectCount]);

  const grouped = useMemo(() => {
    const g = { 1: [], 2: [], 3: [] };
    modules.forEach((m) => g[m.priority]?.push(m));
    return g;
  }, [modules]);

  if (error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>AI Courseware</h1>
          <p className="subtitle">Agentic Systems & Enterprise Architecture</p>
          <ProgressBar done={totals.done} total={totals.total} label="Overall" />
        </div>
        <nav>
          {[1, 2, 3].map((p) => (
            <div key={p} className="nav-group">
              <div className={`nav-group-title priority-${p}`}>{PRIORITY_LABELS[p]}</div>
              {grouped[p].map(renderModuleBtn)}
            </div>
          ))}
          <div className="nav-group">
            <div className="nav-group-title priority-1">Q&A</div>
            <button
              className={`nav-item ${selectedSlug === QANDA_SLUG ? 'active' : ''}`}
              onClick={() => setSelectedSlug(QANDA_SLUG)}
            >
              <span className="nav-item-title">Q&A Bank</span>
              <span className={`nav-item-count ${questionCount > 0 && moduleDone({ slug: QANDA_SLUG }) === questionCount ? 'complete' : ''}`}>
                {moduleDone({ slug: QANDA_SLUG })}/{questionCount}
              </span>
            </button>
          </div>
          <div className="nav-group">
            <div className="nav-group-title priority-2">Roles</div>
            <button
              className={`nav-item ${selectedSlug === ARCHITECT_SLUG ? 'active' : ''}`}
              onClick={() => setSelectedSlug(ARCHITECT_SLUG)}
            >
              <span className="nav-item-title">Software Architect</span>
              <span className={`nav-item-count ${architectCount > 0 && moduleDone({ slug: ARCHITECT_SLUG }) === architectCount ? 'complete' : ''}`}>
                {moduleDone({ slug: ARCHITECT_SLUG })}/{architectCount}
              </span>
            </button>
          </div>
          {sdModules.length > 0 && (
            <div className="nav-group">
              <div className="nav-group-title priority-3">Course · System Design</div>
              {sdModules.map(renderModuleBtn)}
            </div>
          )}
          {lldModules.length > 0 && (
            <div className="nav-group">
              <div className="nav-group-title priority-2">Course · Low-Level Design</div>
              {lldModules.map(renderModuleBtn)}
            </div>
          )}
        </nav>
        <button className="reset-btn" onClick={resetAll}>Reset progress</button>
      </aside>
      <main className="content">
        {selectedSlug === QANDA_SLUG
          ? <QandaView doneKeys={doneKeys} onToggle={toggleItem} />
          : selectedSlug === ARCHITECT_SLUG
            ? <ArchitectView doneKeys={doneKeys} onToggle={toggleItem} />
            : selectedSlug
              ? <ModuleView slug={selectedSlug} doneKeys={doneKeys} onToggle={toggleItem} />
              : <p className="loading">Loading…</p>}
      </main>
    </div>
  );
}
