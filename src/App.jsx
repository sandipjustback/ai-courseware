import { useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import ModuleView from './components/ModuleView.jsx';
import QandaView from './components/QandaView.jsx';
import RoleView from './components/RoleView.jsx';
import CourseCatalog from './components/CourseCatalog.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import PrintBook from './components/PrintBook.jsx';
import { ROLES, ROLE_IDS } from './roles.js';

const PRIORITY_LABELS = {
  1: 'Track 1 — Agentic AI Core',
  2: 'Track 2 — Production & Integration',
  3: 'Track 3 — Applied Architecture',
};

const COURSE_TILES = [
  { id: 'prep1', kind: 'modules', title: 'Prep 1', subtitle: 'Backend / Eng Lead — JD + deep dives',
    blurb: 'A targeted interview-prep course: JD focus areas (Java/Spring, microservices, Kafka, AWS, K8s, CI/CD, leadership) plus deep-dive answers to the specific questions.',
    accent: 'p1', emoji: '🎯', pill: 'Prep course' },
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
  { id: 'algorithms', kind: 'modules', title: 'Architecture Algorithms', subtitle: 'Must-know patterns & algorithms',
    blurb: 'Noisy neighbor, rate limiting, load balancing, consistent hashing, caching/eviction, probabilistic structures, consensus, resilience, and distributed-data patterns.',
    accent: 'p3', emoji: '📐', pill: '9 topics' },
  { id: 'ai-certs', kind: 'modules', title: 'AI Certifications', subtitle: 'ML / GenAI credentials for this level',
    blurb: 'Cloud AI/ML engineering, Generative AI & LLM certs, and respected applied ML certificates — with official exam links.',
    accent: 'p1', emoji: '🎓', pill: 'Certs' },
  { id: 'cloud-certs', kind: 'modules', title: 'Cloud & Platform Certifications', subtitle: 'AWS, MongoDB, Kubernetes & more',
    blurb: 'AWS, MongoDB, CNCF Kubernetes, Terraform, Kafka, and Azure/GCP architect certs — the credentials that back an architect resume.',
    accent: 'accent', emoji: '📜', pill: 'Certs' },
];

const ROLE_TILES = ROLE_IDS.map((id) => ({
  id, kind: 'role', roleId: id, title: ROLES[id].title, subtitle: ROLES[id].subtitle,
  blurb: ROLES[id].blurb, accent: ROLES[id].accent, emoji: ROLES[id].emoji, pill: 'Prep',
}));

const CATALOG = [
  ...COURSE_TILES,
  ...ROLE_TILES,
  { id: 'qanda', kind: 'qanda', title: 'Q&A Bank', subtitle: 'Agentic AI',
    blurb: '50 concept, scenario, and behavioral questions with model answers.',
    accent: 'accent', emoji: '💬', pill: '50 Q&A' },
];

const MODULE_COURSE_IDS = CATALOG.filter((c) => c.kind === 'modules').map((c) => c.id);

export default function App() {
  const [courseModules, setCourseModules] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [roleCounts, setRoleCounts] = useState({});
  const [doneKeys, setDoneKeys] = useState(new Set());
  const [route, setRoute] = useState({ view: 'home' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [printBook, setPrintBook] = useState(null);

  useEffect(() => {
    const roleQandas = ROLE_IDS.map((id) => api.getQanda(id));
    const moduleLists = MODULE_COURSE_IDS.map((id) => api.listModules(id));
    Promise.all([api.getProgress(), api.getQanda(), ...roleQandas, ...moduleLists])
      .then(([prog, aiQ, ...rest]) => {
        const roleArr = rest.slice(0, ROLE_IDS.length);
        const modArr = rest.slice(ROLE_IDS.length);
        const rc = {}; ROLE_IDS.forEach((id, i) => { rc[id] = roleArr[i].length; });
        const cm = {}; MODULE_COURSE_IDS.forEach((id, i) => { cm[id] = modArr[i]; });
        setRoleCounts(rc);
        setCourseModules(cm);
        setQuestionCount(aiQ.length);
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

  const groupBy = (arr, key) => {
    const m = new Map();
    arr.forEach((x) => { const k = x[key]; if (!m.has(k)) m.set(k, []); m.get(k).push(x); });
    return [...m.entries()];
  };

  const buildCourseBook = async (id) => {
    const mods = await api.getCourseModulesFull(id);
    const cat = catalogById(id);
    return {
      title: cat ? cat.title : 'Course',
      subtitle: cat ? cat.subtitle : '',
      chapters: mods.map((m) => ({
        label: m.section || null,
        title: m.order + '. ' + m.title,
        tagline: m.tagline, why: m.whyItMatters, content: m.content,
        objectives: m.objectives, resources: m.resources, problems: m.problems,
      })),
    };
  };

  const buildRoleBook = async (roleId) => {
    const [qs, res] = await Promise.all([api.getQanda(roleId), api.getRoleResources(roleId)]);
    const cfg = ROLES[roleId];
    const chapters = [{ title: 'What this role is evaluated on', content: cfg.intro, objectives: cfg.dimensions.map(([n, b]) => n + ' — ' + b) }];
    groupBy(res, 'area').forEach(([area, items]) => chapters.push({ label: 'Study track', title: area, resources: items }));
    groupBy(qs, 'category').forEach(([c, items]) => chapters.push({ label: 'Q&A', title: c, qa: items }));
    return { title: cfg.title, subtitle: cfg.subtitle, chapters };
  };

  const buildQandaBook = async () => {
    const qs = await api.getQanda('ai');
    return { title: 'Q&A Bank', subtitle: 'Agentic AI', chapters: groupBy(qs, 'category').map(([c, items]) => ({ title: c, qa: items })) };
  };

  const downloadPdf = async () => {
    try {
      let book = null;
      if (route.view === 'course' || route.view === 'lesson') book = await buildCourseBook(route.view === 'course' ? route.id : route.backId);
      else if (route.view === 'role') book = await buildRoleBook(route.roleId);
      else if (route.view === 'qanda') book = await buildQandaBook();
      if (book) setPrintBook(book);
    } catch (e) { window.alert('Could not build PDF: ' + e.message); }
  };

  useEffect(() => {
    if (!printBook) return;
    const done = () => setPrintBook(null);
    window.addEventListener('afterprint', done, { once: true });
    const t = setTimeout(() => window.print(), 120);
    return () => { clearTimeout(t); window.removeEventListener('afterprint', done); };
  }, [printBook]);

  const canPdf = ['course', 'lesson', 'role', 'qanda'].includes(route.view);

  const donePrefix = (prefix) => [...doneKeys].filter((k) => k.startsWith(prefix)).length;
  const modsForCourse = (id) => courseModules[id] || [];
  const sumTotal = (mods) => mods.reduce((s, m) => s + m.resourceCount + m.problemCount, 0);
  const sumDone = (mods) => mods.reduce((s, m) => s + donePrefix(`${m.slug}:`), 0);

  const progressFor = (c) => {
    if (c.kind === 'qanda') return { done: donePrefix('qanda:'), total: questionCount, label: 'Reviewed' };
    if (c.kind === 'role') return { done: donePrefix(`${c.roleId}:`), total: roleCounts[c.roleId] || 0, label: 'Reviewed' };
    const mods = modsForCourse(c.id);
    return { done: sumDone(mods), total: sumTotal(mods), label: 'Lessons' };
  };

  const overall = useMemo(() => {
    const modTotal = MODULE_COURSE_IDS.reduce((s, id) => s + sumTotal(courseModules[id] || []), 0);
    const roleTotal = ROLE_IDS.reduce((s, id) => s + (roleCounts[id] || 0), 0);
    return { done: doneKeys.size, total: modTotal + questionCount + roleTotal };
  }, [courseModules, questionCount, roleCounts, doneKeys]);

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
    const mods = modsForCourse(id);
    if (mods.some((m) => m.section)) {
      const map = new Map();
      mods.forEach((m) => {
        const s = m.section || 'Lessons';
        if (!map.has(s)) map.set(s, []);
        map.get(s).push(m);
      });
      return [...map.entries()].map(([label, modules]) => ({ label, modules }));
    }
    return [{ label: null, modules: mods }];
  };

  const openTile = (c) => {
    if (c.kind === 'qanda') setRoute({ view: 'qanda' });
    else if (c.kind === 'role') setRoute({ view: 'role', roleId: c.roleId });
    else setRoute({ view: 'course', id: c.id });
  };

  const goHome = () => setRoute({ view: 'home' });

  if (error) {
    return <div className="error-screen"><h2>Something went wrong</h2><p>{error}</p></div>;
  }

  const crumb = () => {
    if (route.view === 'home') return null;
    if (route.view === 'qanda') return <span className="crumb"><span className="sep">/</span><span className="current">Q&A Bank</span></span>;
    if (route.view === 'role') return <span className="crumb"><span className="sep">/</span><span className="current">{ROLES[route.roleId].title}</span></span>;
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
    if (route.view === 'role') return wrap(<RoleView role={route.roleId} config={ROLES[route.roleId]} doneKeys={doneKeys} onToggle={toggleItem} />);
    return null;
  };

  return (
    <>
    <div className="app">
      <header className="app-topbar">
        <button className="brand" onClick={goHome}>AI Courseware</button>
        {crumb()}
        <div className="topbar-spacer" />
        {canPdf && <button className="topbar-pdf" onClick={downloadPdf} title="Download as PDF (book with links)">⬇ PDF</button>}
        <button className="topbar-reset" onClick={resetAll}>Reset progress</button>
      </header>
      <div className="app-body">{body()}</div>
    </div>
    <PrintBook book={printBook} />
    </>
  );
}
