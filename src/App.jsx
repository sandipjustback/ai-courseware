import { useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import ModuleView from './components/ModuleView.jsx';
import QandaView from './components/QandaView.jsx';
import ArchitectView from './components/ArchitectView.jsx';
import CourseCatalog from './components/CourseCatalog.jsx';
import CourseDetail from './components/CourseDetail.jsx';

const PRIORITY_LABELS = {
  1: 'Track 1 — Agentic AI Core',
  2: 'Track 2 — Production & Integration',
  3: 'Track 3 — Applied Architecture',
};

const CATALOG = [
  { id: 'ai', kind: 'modules', title: 'AI Courseware', subtitle: 'Agentic Systems & Enterprise Architecture',
    blurb: 'LangGraph, GraphRAG, agent memory, evals, RAG, MCP, iPaaS, and a capstone — 9 modules across three tracks.',
    accent: 'p1', emoji: '🤖', pill: '9 modules' },
  { id: 'system-design', kind: 'modules', title: 'System Design', subtitle: 'High-Level Design (HLD)',
    blurb: 'Scalability, databases, caching, messaging, CAP, and design case studies.',
    accent: 'p3', emoji: '🏗️', pill: '7 modules' },
  { id: 'low-level-design', kind: 'modules', title: 'Low-Level Design', subtitle: 'OOD & Design Patterns (LLD)',
    blurb: 'OOP, SOLID, UML, and the design-pattern families, with LLD case studies.',
    accent: 'p2', emoji: '🧩', pill: '7 modules' },
  { id: 'dsa', kind: 'modules', title: 'Data Structures & Algorithms', subtitle: 'DSA',
    blurb: 'Complexity, arrays, hashing, linked lists, trees, graphs, and dynamic programming.',
    accent: 'p1', emoji: '🧮', pill: '7 modules' },
  { id: 'databases', kind: 'modules', title: 'Databases', subtitle: 'SQL, NoSQL & MongoDB',
    blurb: 'Relational fundamentals, SQL, normalization, indexing, transactions, and MongoDB.',
    accent: 'p2', emoji: '🗄️', pill: '6 modules' },
  { id: 'devops', kind: 'modules', title: 'DevOps & Cloud', subtitle: 'CI/CD, Docker & Kubernetes',
    blurb: 'CI/CD, containers, Kubernetes, Infrastructure as Code, observability, and AWS.',
    accent: 'accent', emoji: '⚙️', pill: '6 modules' },
  { id: 'nodejs', kind: 'modules', title: 'Node.js & Backend', subtitle: 'Backend Engineering',
    blurb: 'Async JavaScript, Node internals, Express APIs, auth, data, and production.',
    accent: 'green', emoji: '🟢', pill: '6 modules' },
  { id: 'architect', kind: 'architect', title: 'Software Architect', subtitle: 'Interview prep track',
    blurb: 'Study resources and Q&A across the dimensions a senior architect is assessed on.',
    accent: 'p2', emoji: '🧭', pill: 'Prep' },
  { id: 'qanda', kind: 'qanda', title: 'Q&A Bank', subtitle: 'Agentic AI',
    blurb: '50 concept, scenario, and behavioral questions with model answers.',
    accent: 'accent', emoji: '💬', pill: '50 Q&A' },
];

const MODULE_COURSE_IDS = CATALOG.filter((c) => c.kind === 'modules').map((c) => c.id);

export default function App() {
  const [courseModules, setCourseModules] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [architectCount, setArchitectCount] = useState(0);
  const [doneKeys, setDoneKeys] = useState(new Set());
  const [route, setRoute] = useState({ view: 'home' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.getProgress(), api.getQanda(), api.getQanda('architect'),
      ...MODULE_COURSE_IDS.map((id) => api.listModules(id)),
    ])
      .then(([prog, questions, architectQs, ...moduleLists]) => {
        const cm = {};
        MODULE_COURSE_IDS.forEach((id, i) => { cm[id] = moduleLists[i]; });
        setCourseModules(cm);
        setQuestionCount(questions.length);
        setArchitectCount(architectQs.length);
        setDoneKeys(new Set(prog.map((p) => p.key)));
        setLoading(false);
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

  const donePrefix = (prefix) => [...doneKeys].filter((k) => k.startsWith(prefix)).length;
  const modsForCourse = (id) => courseModules[id] || [];
  const sumTotal = (mods) => mods.reduce((s, m) => s + m.resourceCount + m.problemCount, 0);
  const sumDone = (mods) => mods.reduce((s, m) => s + donePrefix(`${m.slug}:`), 0);

  const progressFor = (id) => {
    if (id === 'qanda') return { done: donePrefix('qanda:'), total: questionCount, label: 'Reviewed' };
    if (id === 'architect') return { done: donePrefix('architect:'), total: architectCount, label: 'Reviewed' };
    const mods = modsForCourse(id);
    return { done: sumDone(mods), total: sumTotal(mods), label: 'Lessons' };
  };

  const overall = useMemo(() => {
    const modTotal = MODULE_COURSE_IDS.reduce((s, id) => s + sumTotal(courseModules[id] || []), 0);
    return { done: doneKeys.size, total: modTotal + questionCount + architectCount };
  }, [courseModules, questionCount, architectCount, doneKeys]);

  const catalogById = (id) => CATALOG.find((c) => c.id === id);
  const moduleTitle = (slug) =>
    Object.values(courseModules).flat().find((m) => m.slug === slug)?.title || 'Lesson';

  const sectionsFor = (id) => {
    if (id === 'ai') {
      return [1, 2, 3].map((p) => ({
        label: PRIORITY_LABELS[p],
        modules: modsForCourse('ai').filter((m) => m.priority === p),
      }));
    }
    return [{ label: null, modules: modsForCourse(id) }];
  };

  const openTile = (c) => {
    if (c.kind === 'qanda') setRoute({ view: 'qanda' });
    else if (c.kind === 'architect') setRoute({ view: 'architect' });
    else setRoute({ view: 'course', id: c.id });
  };

  const goHome = () => setRoute({ view: 'home' });

  if (error) {
    return <div className="error-screen"><h2>Something went wrong</h2><p>{error}</p></div>;
  }

  const crumb = () => {
    if (route.view === 'home') return null;
    const simple = { qanda: 'Q&A Bank', architect: 'Software Architect' }[route.view];
    if (simple) return <span className="crumb"><span className="sep">/</span><span className="current">{simple}</span></span>;
    if (route.view === 'course') return <span className="crumb"><span className="sep">/</span><span className="current">{catalogById(route.id).title}</span></span>;
    if (route.view === 'lesson') {
      const c = catalogById(route.backId);
      return (
        <span className="crumb">
          <span className="sep">/</span>
          <button onClick={() => setRoute({ view: 'course', id: route.backId })}>{c.title}</button>
          <span className="sep">/</span>
          <span className="current">{moduleTitle(route.slug)}</span>
        </span>
      );
    }
    return null;
  };

  const body = () => {
    if (loading) return <p className="loading">Loading…</p>;
    if (route.view === 'home') {
      return <CourseCatalog catalog={CATALOG} progressFor={progressFor} overall={overall} onOpen={openTile} />;
    }
    if (route.view === 'course') {
      return (
        <CourseDetail
          course={catalogById(route.id)}
          sections={sectionsFor(route.id)}
          doneKeys={doneKeys}
          onOpenLesson={(slug) => setRoute({ view: 'lesson', slug, backId: route.id })}
        />
      );
    }
    if (route.view === 'lesson') {
      return (
        <div className="reading">
          <button className="back-link" onClick={() => setRoute({ view: 'course', id: route.backId })}>
            ← {catalogById(route.backId).title}
          </button>
          <ModuleView slug={route.slug} doneKeys={doneKeys} onToggle={toggleItem} />
        </div>
      );
    }
    const wrap = (node) => (
      <div className="reading">
        <button className="back-link" onClick={goHome}>← All courses</button>
        {node}
      </div>
    );
    if (route.view === 'qanda') return wrap(<QandaView doneKeys={doneKeys} onToggle={toggleItem} />);
    if (route.view === 'architect') return wrap(<ArchitectView doneKeys={doneKeys} onToggle={toggleItem} />);
    return null;
  };

  return (
    <div className="app">
      <header className="app-topbar">
        <button className="brand" onClick={goHome}>AI Courseware</button>
        {crumb()}
        <div className="topbar-spacer" />
        <button className="topbar-reset" onClick={resetAll}>Reset progress</button>
      </header>
      <div className="app-body">{body()}</div>
    </div>
  );
}
