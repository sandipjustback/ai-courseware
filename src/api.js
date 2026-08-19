// Static data layer — no backend. All content is bundled at build time and
// progress is persisted in the browser (localStorage). This keeps the same
// method signatures the components already use, so views are unchanged.

import { modules as aiModules } from './data/modules.js';
import { qandaQuestions } from './data/qanda.js';
import { architectResources, architectQuestions } from './data/architect.js';
import { techleadResources, techleadQuestions } from './data/techlead.js';
import { systemDesignModules, lowLevelDesignModules, dsaModules, databasesModules, devopsModules, nodejsModules } from './data/courses.js';
import { algorithmsModules } from './data/algorithms.js';
import { prep1Modules } from './data/prep1.js';

const allModules = [
  ...aiModules, ...systemDesignModules, ...lowLevelDesignModules,
  ...dsaModules, ...databasesModules, ...devopsModules, ...nodejsModules,
  ...prep1Modules,
  ...algorithmsModules,
];
const allQanda = [...qandaQuestions, ...architectQuestions, ...techleadQuestions];
const allRoleResources = [...architectResources, ...techleadResources];

const PROGRESS_KEY = 'ai-courseware:progress';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveProgress(keys) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(keys));
}

// Light payload for the sidebar, mirroring the old /api/modules response.
const light = (m) => ({
  slug: m.slug,
  order: m.order,
  priority: m.priority,
  title: m.title,
  tagline: m.tagline,
  badge: m.badge,
  section: m.section,
  resourceCount: (m.resources || []).length,
  problemCount: (m.problems || []).length,
});

const byOrder = (a, b) => a.order - b.order;

export const api = {
  listModules: (course = 'ai') =>
    Promise.resolve(
      allModules.filter((m) => (m.course || 'ai') === course).sort(byOrder).map(light)
    ),

  getModule: (slug) => {
    const m = allModules.find((x) => x.slug === slug);
    return m ? Promise.resolve(m) : Promise.reject(new Error('Module not found'));
  },

  getCourseModulesFull: (course = 'ai') =>
    Promise.resolve(allModules.filter((m) => (m.course || 'ai') === course).sort(byOrder)),

  getQanda: (track = 'ai') =>
    Promise.resolve(allQanda.filter((q) => (q.track || 'ai') === track).sort(byOrder)),

  getRoleResources: (role = 'architect') =>
    Promise.resolve(allRoleResources.filter((r) => (r.role || 'architect') === role).sort(byOrder)),

  getProgress: () => Promise.resolve(loadProgress().map((key) => ({ key }))),

  setProgress: ({ key, done }) => {
    let keys = loadProgress();
    if (done) {
      if (!keys.includes(key)) keys.push(key);
    } else {
      keys = keys.filter((k) => k !== key);
    }
    saveProgress(keys);
    return Promise.resolve({ key, done });
  },

  resetProgress: () => {
    saveProgress([]);
    return Promise.resolve({ ok: true });
  },
};
