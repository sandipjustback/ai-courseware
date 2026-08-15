// Role prep-track configs. Each id is also the Q&A `track`, the resource `role`,
// and the progress-key prefix. Add a new JD by adding an entry here + seeding its
// resources (role=<id>) and Q&A (track=<id>).

export const ROLES = {
  architect: {
    id: 'architect',
    title: 'Software Architect',
    subtitle: 'Interview prep track',
    badge: 'Software Architect',
    badgeColor: 2,
    accent: 'p2',
    emoji: '🧭',
    blurb: 'Study resources and Q&A across the dimensions a senior architect is assessed on.',
    tagline: 'Prep track for a 13+ yr Software Architect role: HLD/LLD, AWS & Kubernetes, React & Node.js, REST/microservices/event-driven, DevOps & CI/CD, and design principles — organized around the five dimensions this role is evaluated on.',
    dimensions: [
      ['Problem Solving', 'Framing ambiguity, diagnosing issues, choosing pragmatic solutions.'],
      ['AI Leverage', 'Using AI across the SDLC with judgment and guardrails.'],
      ['System Design', 'HLD/LLD for scalable, distributed, resilient systems.'],
      ['Ownership', 'End-to-end accountability, incidents, tech debt, follow-through.'],
      ['Execution Ability', 'Leading a multi-quarter vision to delivery across teams.'],
    ],
    intro: 'Format to expect: recruiter screen → tech screen (DSA + React + Node) → a multi-hour onsite with whiteboarding, pair-programming, and system design, often ending with senior-leadership (VP Engineering / CEO) rounds. Trade-off analysis is weighted heavily — always state what you gave up. Companies modernizing past a legacy monolith make migration and DevOps-maturity questions likely.',
  },
  techlead: {
    id: 'techlead',
    title: 'Technology Lead / Architect',
    subtitle: 'Healthcare Platform',
    badge: 'Tech Lead / Architect',
    badgeColor: 1,
    accent: 'p1',
    emoji: '🩺',
    blurb: 'Hands-on Tech Lead / Architect on a modern healthcare platform: system ownership, workflows, analytics, reliability, and compliance.',
    tagline: 'Prep for a hands-on Technology Lead / Architect building a next-gen healthcare platform (EMR, patient intake, analytics) on Next.js, NestJS/tRPC, Prisma/PostgreSQL/Redis, Stripe, and an analytics stack — organized around the areas this role owns.',
    dimensions: [
      ['End-to-End System Design & Ownership', 'Own scalable, reliable systems from design through production.'],
      ['Workflow & Product Architecture', 'Dynamic, state-driven multi-step journeys (patient intake) resilient to partial outages.'],
      ['Data & Insights Enablement', 'Accurate event tracking and analytics-ready, traceable data across the platform.'],
      ['Reliability & Production Readiness', 'Fault tolerance, graceful degradation, deploys, rollback, and monitoring.'],
      ['Integration & External Systems', 'Event-driven, async, webhooks, retries, idempotency, and failure recovery.'],
      ['Performance & Scalability', 'Find bottlenecks; caching, load handling, and efficient data access.'],
      ['Security & Healthcare Compliance', 'Protect PHI/PII and align with healthcare data-privacy standards.'],
    ],
    intro: 'What we expect (from the JD): take full ownership from design to production outcomes, be hands-on in critical situations, simplify complex problems into scalable solutions, and drive decisions balancing technical depth with business impact. Expect deep dives on the stack (Next.js, NestJS, tRPC, Prisma), workflow/state design, event-driven integrations, analytics/event tracking, and healthcare data handling.',
  },
};

export const ROLE_IDS = Object.keys(ROLES);
