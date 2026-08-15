// Technology Lead / Architect (healthcare platform) prep track.
// Q&A stored in QandaQuestion with track='techlead'; resources in ArchitectResource with role='techlead'.
// Categories mirror the JD's responsibility areas.

const T = 'techlead';

export const techleadQuestions = [
  // ── End-to-End System Design & Ownership ──────────────────────────────────
  { key: 'tl-1', track: T, order: 1, category: 'End-to-End System Design & Ownership', kind: 'scenario',
    question: 'Design the high-level architecture for a healthcare platform (EMR, patient intake, admin, analytics). Where are the service boundaries?',
    answer: `Start from the domains and their different rates of change and compliance needs, then carve bounded contexts: Identity & Access (auth, roles, consent), Patient Intake (multi-step workflows), EMR/Clinical records (the system of record for PHI), Scheduling/Admin, Billing/Payments (Stripe), and Analytics/Eventing. A gateway/BFF fronts them; PHI lives in one strongly-consistent store (PostgreSQL via Prisma) with strict access controls and audit logging, while analytics events flow async to a separate pipeline so reporting never touches the clinical DB.

Boundaries follow ownership and compliance: PHI-handling services are isolated and audited; payments are isolated so PCI/Stripe concerns don't leak. I'd keep it a modular monolith (NestJS modules) initially and extract services only where scaling or team autonomy demands — a compliance-sensitive product is usually better served by a well-structured monolith than premature microservices.

Close by naming the top trade-offs: strong consistency on clinical writes vs eventual consistency where it's acceptable (analytics, notifications), and where the design breaks first as volume grows.` },
  { key: 'tl-2', track: T, order: 2, category: 'End-to-End System Design & Ownership', kind: 'behavioral',
    question: 'You own this platform end-to-end. What does ownership look like day-to-day beyond writing code?',
    answer: `Ownership is the whole loop. I set the architecture and standards, but I also carry the pager, run the incident when a SEV happens, and close it with a blameless postmortem that produces a systemic fix (a guardrail, alert, or test) so the class of failure can't recur.

Day-to-day: unblock the team at design and PR checkpoints, keep the roadmap coherent with the architecture, watch the reliability and delivery metrics (error rate, p99, deploy frequency, MTTR), and stay hands-on on the riskiest pieces — a new workflow engine, a tricky integration — rather than competing for feature work.

The signal is accountability for production outcomes and business impact, not just merged PRs.` },
  { key: 'tl-3', track: T, order: 3, category: 'End-to-End System Design & Ownership', kind: 'scenario',
    question: "Translate a fuzzy business requirement — 'make patient intake faster' — into a technical plan.",
    answer: `First turn it into a measurable problem: which step is slow, for whom, and what "faster" means (drop-off rate, time-to-complete, completion rate). Instrument the funnel before optimizing — you can't improve what you can't see.

Then the plan: reduce steps (progressive disclosure, prefill from prior data), make it resilient (persist partial state so a dropped connection doesn't lose progress), and remove blocking calls (verify insurance async instead of making the patient wait).

I'd frame 2-3 options with trade-offs and a success metric, ship the highest-leverage slice first, and validate against the funnel metric — not vibes.` },

  // ── Workflow & Product Architecture ───────────────────────────────────────
  { key: 'tl-4', track: T, order: 4, category: 'Workflow & Product Architecture', kind: 'scenario',
    question: 'Design a multi-step patient intake flow with dynamic, conditional, state-driven logic. How do you model it?',
    answer: `Model it as an explicit state machine, not a pile of if-statements. Each intake is a persisted workflow instance with a current state, collected data, and allowed transitions; conditional branches ("pregnant → add module X", "insurer Y → different consent") are edges driven by the collected state.

Persisting state after every step is the key decision: the patient can leave and resume, and a crash doesn't lose progress (durable execution). Keep the flow definition data-driven (a config/schema) so product can change steps without a deploy, validate each step server-side (never trust the client), and make step submission idempotent so a double-tap or retry doesn't duplicate.

For orchestration of async side effects (send to EMR, notify provider), emit events rather than doing them inline, so the user-facing step stays fast and resilient.` },
  { key: 'tl-5', track: T, order: 5, category: 'Workflow & Product Architecture', kind: 'scenario',
    question: 'How do you keep the user experience seamless during a partial outage — say the EMR or insurance API is down?',
    answer: `Design for graceful degradation: the patient's path must bend, not break. If a downstream (EMR write, insurance verification) is unavailable, accept and persist the intake locally, queue the downstream action for retry, and tell the user it's "submitted, we're finalizing" rather than throwing an error.

The mechanics: timeouts on every external call, circuit breakers so a slow dependency doesn't stall the whole request, and a durable job (Trigger.dev / a queue) that completes the side effect when the dependency recovers — with idempotency so replays are safe.

The principle: decouple the user-facing commit from the downstream side effects, so the experience depends only on our own store.` },
  { key: 'tl-6', track: T, order: 6, category: 'Workflow & Product Architecture', kind: 'concept',
    question: 'Where do you keep workflow state, and why not just in the client or in memory?',
    answer: `In a durable store keyed by the workflow instance — not the client or process memory. Client-only state is lost on refresh/device-switch and can't be trusted (validation must be server-side); in-memory state dies with the process and can't scale horizontally.

Persisting each transition gives resume-after-abandon, auditability (who did what, when — critical in healthcare), and durable execution across restarts. It's the same reason durable workflow engines and agent frameworks use a checkpointer.` },

  // ── Data & Insights Enablement ────────────────────────────────────────────
  { key: 'tl-7', track: T, order: 7, category: 'Data & Insights Enablement', kind: 'scenario',
    question: 'Design event tracking so analytics and business teams get accurate, traceable data across the platform.',
    answer: `Start with a tracking plan — a governed schema of events and properties — before any instrumentation; analytics fails when every team invents its own event names. Use a customer-data platform (Segment) as the single collection point that fans out to destinations (Mixpanel for product, GA4/GTM for marketing, BigQuery for the warehouse), so instrumentation is written once.

Emit events server-side for anything business-critical (payment succeeded, intake completed) — client-side events are lossy (ad blockers, dropped beacons); use client events for UI interactions. Every event carries stable identifiers (anonymous → known-user stitching) and a consistent schema so journeys are traceable end to end.

Guard PHI: analytics events must never carry protected health information — send IDs and non-sensitive attributes, keep the mapping in the secure store.` },
  { key: 'tl-8', track: T, order: 8, category: 'Data & Insights Enablement', kind: 'scenario',
    question: 'Analytics and product disagree on the numbers in a dashboard. How do you ensure data consistency and traceability?',
    answer: `Make the pipeline auditable and single-sourced. The disagreement is usually definition drift (two teams counting "active" differently) or double-counting (client and server both firing). I'd trace one event from emission → Segment → destination → dashboard, confirm the tracking-plan definition, and enforce one source of truth per metric — ideally computed in the warehouse, not re-derived per tool.

Add schema validation at ingestion so malformed events are caught, version event definitions, and run a reconciliation check between server-side truth (the DB) and the analytics count. The fix is governance — a jointly-owned tracking plan — not another dashboard.` },
  { key: 'tl-9', track: T, order: 9, category: 'Data & Insights Enablement', kind: 'concept',
    question: 'How do you track a user journey accurately across the platform?',
    answer: `A stable identity spine plus consistent events. Assign an anonymous ID on first touch, stitch it to the known user ID on login/registration, and carry that identity through every event so pre- and post-signup activity connect.

Standardize event names and properties via the tracking plan, timestamp everything, and prefer server-side emission for critical steps so the journey isn't full of holes. In the warehouse (BigQuery), sessionize and build the funnel from the raw event stream so definitions are transparent and reproducible.` },

  // ── Reliability & Production Readiness ─────────────────────────────────────
  { key: 'tl-10', track: T, order: 10, category: 'Reliability & Production Readiness', kind: 'scenario',
    question: 'Define your strategy for system stability, fault tolerance, and graceful degradation.',
    answer: `Assume every dependency will fail and design so it doesn't cascade. Timeouts on every remote call, retries with exponential backoff and jitter, circuit breakers to fail fast, and bulkheads so one slow dependency can't exhaust all resources.

Graceful degradation: serve a reduced experience (cached data, "we'll finalize shortly") instead of a hard error; make writes idempotent so retries are safe. Health checks and readiness probes gate traffic.

And prove it — load and failure-injection testing, because resilience you haven't tested is only a hypothesis.` },
  { key: 'tl-11', track: T, order: 11, category: 'Reliability & Production Readiness', kind: 'scenario',
    question: 'How do you make the platform production-ready: deployment, rollback, environments?',
    answer: `Build-once-promote-many: one immutable artifact flows dev → staging → prod, configured per environment (12-factor). Progressive delivery — preview deploys (Vercel) plus canary/blue-green — with automated health checks and automatic rollback on SLO breach, so a bad deploy hits 1% before 100%. Feature flags decouple deploy from release.

CI/CD (GitHub Actions) runs tests, type-checks, and security scans as gates; env config and secrets are managed, never committed. The goal is frequent, small, low-risk deploys with fast rollback — the DORA definition of safe delivery.` },
  { key: 'tl-12', track: T, order: 12, category: 'Reliability & Production Readiness', kind: 'scenario',
    question: 'How do you drive improvements in monitoring, alerting, and debugging?',
    answer: `Instrument the three pillars and alert on symptoms, not causes. Errors and traces via Sentry (frontend + backend), infra/APM and dashboards via Datadog, with a shared correlation/trace ID threading request → logs → error so I can pivot from a spike to the exact failing request.

Define SLIs/SLOs per critical journey (intake completion, payment success) and alert on SLO burn rate and user-facing errors — not raw CPU — so an alert means customers are affected. Bake instrumentation into the golden-path template so every service is observable by default, and turn each incident into a new alert or test so the next one is caught automatically.` },

  // ── Integration & External Systems ────────────────────────────────────────
  { key: 'tl-13', track: T, order: 13, category: 'Integration & External Systems', kind: 'scenario',
    question: "Architect a reliable integration with an external provider/EMR/insurer API that's flaky.",
    answer: `Decouple with async and make everything idempotent. The user-facing action commits to our store and emits an event; a durable worker (Trigger.dev / a queue) performs the external call with timeout, retry + backoff + jitter, and a dead-letter queue for permanent failures.

Reconciliation polling backs up webhooks so missed events are recovered. Every external write carries an idempotency key so retries don't double-submit; every inbound webhook is deduped by event ID. A circuit breaker stops hammering a dead endpoint, and on recovery we drain the backlog rate-limited to avoid a thundering herd. Monitor queue depth and DLQ, not just error rate.` },
  { key: 'tl-14', track: T, order: 14, category: 'Integration & External Systems', kind: 'concept',
    question: 'Explain idempotency and how you guarantee it for payments (Stripe) and webhooks.',
    answer: `Idempotent means applying the same request twice has the same effect as once. For outbound payments, pass Stripe an idempotency key (derived from the order) so a retry after a timeout doesn't double-charge.

For inbound webhooks, verify the signature, then dedupe on the event ID (store processed IDs) — Stripe delivers at-least-once and will retry, so processing twice must be a no-op. Persist the event before acting (inbox/outbox pattern), make the handler safe to replay, and return 2xx quickly so Stripe doesn't retry unnecessarily.

The rule: at-least-once delivery + idempotent handlers; never assume exactly-once.` },
  { key: 'tl-15', track: T, order: 15, category: 'Integration & External Systems', kind: 'scenario',
    question: 'Design retry and failure recovery for async workflows.',
    answer: `Distinguish transient vs permanent failures: transient (timeout, 429, 5xx) gets bounded retries with exponential backoff + jitter; permanent (validation, 4xx) goes straight to a dead-letter queue for human inspection — retrying it just burns quota.

Cap retries, make each step idempotent so replays are safe, and persist progress so recovery resumes rather than restarts. For multi-step external workflows, use a saga with compensating actions when a later step fails. Expose a replay mechanism and alert on DLQ depth so nothing fails silently.` },

  // ── Performance & Scalability ─────────────────────────────────────────────
  { key: 'tl-16', track: T, order: 16, category: 'Performance & Scalability', kind: 'scenario',
    question: 'A key page/API is slow under load. How do you find and fix the bottleneck?',
    answer: `Measure before guessing — go to traces and p95/p99 (not averages) and find which span dominates. Most "sudden" slowness is a specific cause: an N+1 query (common with an ORM like Prisma — check for missing includes/batching), a missing index, a synchronous external call that should be async, or a cold cache.

Match the fix to the cause: add the index, batch/eager-load the query, cache the hot read in Redis, or move the slow side effect off the request path. Then add the SLO alert so it's caught before users feel it next time. The JD names the toolkit exactly: caching, load handling, and efficient data access.` },
  { key: 'tl-17', track: T, order: 17, category: 'Performance & Scalability', kind: 'concept',
    question: 'How and where do you use Redis caching, and what are the failure modes?',
    answer: `Cache read-heavy, staleness-tolerant data close to the request — reference data, computed views, session/rate-limit state. Cache-aside is the default (check cache, fall back to DB, set with TTL); choose TTL and invalidation deliberately, because stale data is the classic bug.

Failure modes to name: cache stampede on expiry (fix with jittered TTLs and request coalescing), hot keys, and the dangerous one — a cache outage causing a load spike that topples the DB (mitigate with throttling and graceful degradation). Never treat the cache as the source of truth, and never cache PHI without the same access controls as the primary store.` },
  { key: 'tl-18', track: T, order: 18, category: 'Performance & Scalability', kind: 'scenario',
    question: 'How do you design for scale as traffic and data grow?',
    answer: `Keep services stateless so they scale horizontally behind a load balancer (externalize session/state to Redis/DB). The data tier is usually the real ceiling: read replicas for read-heavy load, then partitioning for write scale. Offload spiky or slow work to async jobs so bursts buffer instead of toppling the API, cache to cut repeat work, and paginate everything.

But first question whether the load is pathological — a bad query, retry storm, or hot key — because fixing the cause is cheaper than scaling the symptom. Add capacity alerts so the next ceiling is visible before it's hit.` },

  // ── Security & Healthcare Compliance ──────────────────────────────────────
  { key: 'tl-19', track: T, order: 19, category: 'Security & Healthcare Compliance', kind: 'concept',
    question: 'How do you design the platform to protect PHI and align with healthcare data-privacy standards (HIPAA)?',
    answer: `Treat PHI as a first-class constraint. Encrypt in transit (TLS) and at rest; minimize where PHI lives (one audited store, not scattered across services, logs, or analytics); and enforce least-privilege access with role-based access control and per-record authorization — not just authentication.

Audit-log every PHI access (who, what, when) — a HIPAA expectation and invaluable for incident response. Keep PHI out of analytics/event pipelines and out of logs and error trackers (scrub before sending to Sentry). Sign Business Associate Agreements with any vendor that touches PHI, and design for the right to erasure.

The signal: compliance is architectural, not a checkbox — it shapes data flow, access, and logging.` },
  { key: 'tl-20', track: T, order: 20, category: 'Security & Healthcare Compliance', kind: 'concept',
    question: 'What are secure access patterns for a healthcare API?',
    answer: `Authentication proves identity; authorization decides access — and the second is where breaches happen. Enforce authorization at the API layer on every request (IDOR is the classic bug: a user requesting another patient's record by ID). Check per-resource ownership, not just "is logged in".

Use short-lived tokens with refresh rotation, scope tokens to least privilege, validate and sanitize all input, rate-limit, and put PHI-serving endpoints behind stricter controls and audit logging. Secrets in a manager, never in code. Defense in depth across network, app, and data layers.` },
  { key: 'tl-21', track: T, order: 21, category: 'Security & Healthcare Compliance', kind: 'concept',
    question: 'How do you handle sensitive data responsibly across the stack (logs, analytics, third parties)?',
    answer: `The rule: sensitive data flows only where it must, and is scrubbed everywhere else. PHI/PII must not land in application logs, error trackers (Sentry), or analytics events — scrub or tokenize before those boundaries.

Third parties that must process it require a BAA and the same encryption/access guarantees. Use field-level encryption or tokenization for the most sensitive fields, and design cryptographic erasure so a deletion request is provable. Data minimization throughout — collect and retain only what's needed.` },

  // ── Modern Stack Deep-Dive ────────────────────────────────────────────────
  { key: 'tl-22', track: T, order: 22, category: 'Modern Stack Deep-Dive', kind: 'concept',
    question: 'Next.js: when do you use SSR, SSG, ISR, or client rendering — and why does it matter here?',
    answer: `Pick per route by data freshness and SEO needs. SSG/ISR for mostly-static marketing/content (fast, edge-cacheable); SSR for personalized, always-fresh, auth-gated pages (a patient dashboard must reflect current data and never be publicly cached); client rendering for highly interactive post-auth app shells.

In the App Router, Server Components fetch on the server — keeping secrets and PHI off the client — with Client Components only where interactivity is needed. For a healthcare app, most authenticated PHI pages are SSR / Server-Component rendered so sensitive data is never statically cached and secrets stay server-side.` },
  { key: 'tl-23', track: T, order: 23, category: 'Modern Stack Deep-Dive', kind: 'concept',
    question: 'tRPC vs REST vs GraphQL — how would you choose for this platform?',
    answer: `tRPC when the frontend and backend share one TypeScript codebase and you want end-to-end type safety with no schema/codegen overhead — the contract is the TypeScript types, so a breaking change is a compile error. REST for public/third-party or webhook-facing APIs where broad compatibility and HTTP caching matter. GraphQL when many diverse clients need to shape their own queries over a rich graph and over/under-fetching is a real problem.

For an internal healthcare product on a TS monorepo, tRPC (or NestJS with typed clients) gives the best DX and safety; I'd still expose REST/webhooks at the edges for external integrations and Stripe.` },
  { key: 'tl-24', track: T, order: 24, category: 'Modern Stack Deep-Dive', kind: 'concept',
    question: 'How do you use Prisma + PostgreSQL well, and what pitfalls do you watch for?',
    answer: `Prisma gives type-safe queries and migrations, pairing well with a strongly-consistent PostgreSQL store for clinical/transactional data. Pitfalls: N+1 queries (use include/select and batching; watch the query logs), unbounded findMany (always paginate), and connection exhaustion in serverless (use a pooler like PgBouncer / Prisma Accelerate because each function instance opens connections).

Use transactions for multi-write invariants (create intake + audit row atomically), run migrations in CI, and choose indexes from real query patterns. Keep the schema the source of truth and review migrations like code.` },
  { key: 'tl-25', track: T, order: 25, category: 'Modern Stack Deep-Dive', kind: 'concept',
    question: 'NestJS: what does it give you for a backend of this size?',
    answer: `Structure and testability at scale. The module system enforces clear boundaries (Intake, Billing, EMR modules), dependency injection makes everything mockable/testable, and guards/interceptors/pipes apply cross-cutting concerns consistently — auth guards, validation pipes, logging/observability interceptors — instead of copy-paste.

That consistency is exactly what a compliance-sensitive platform needs: every PHI endpoint gets the same auth guard and audit interceptor. It also supports a modular-monolith-to-services path — modules can later become services along the seams NestJS already enforces.` },

  // ── Engineering Excellence & Leadership ───────────────────────────────────
  { key: 'tl-26', track: T, order: 26, category: 'Engineering Excellence & Leadership', kind: 'behavioral',
    question: 'How do you define and enforce engineering standards without slowing teams down?',
    answer: `Make the right way the easy way — encode standards in tooling, not documents. Golden-path templates, shared libraries, linters, type-checking, and CI gates mean teams get the standard for free by using the default.

Keep the mandated set small and high-value (auth, PHI handling, observability, API contracts) and leave the rest as guidance. Standards are co-created with senior engineers via an RFC/guild process, not decreed, and I measure whether a standard is actually reducing incidents or review friction — if it isn't paying for itself, I kill it.` },
  { key: 'tl-27', track: T, order: 27, category: 'Engineering Excellence & Leadership', kind: 'behavioral',
    question: 'How do you balance hands-on coding with leading, in a role that explicitly wants both?',
    answer: `I stay hands-on deliberately but selectively — this JD wants a coding architect, and one who stops touching code loses credibility and situational awareness. I code the highest-leverage, riskiest parts (the intake workflow engine, a tricky integration, the golden-path template teams copy) rather than competing for feature tickets, and I pair and review at design and PR checkpoints to multiply the team.

The check: if my hands-on work becomes the critical path/bottleneck, I've mis-prioritized. My job is to make the team faster — measured by their throughput and the system's quality, not lines I personally wrote.` },
  { key: 'tl-28', track: T, order: 28, category: 'Engineering Excellence & Leadership', kind: 'behavioral',
    question: 'Tell me about driving a decision that balanced technical depth with business impact.',
    answer: `Pick a story where you translated a technical trade-off into business terms and drove alignment. Structure: the business stakes in one sentence, the technical fork (build vs buy a workflow engine; strong vs eventual consistency on a flow), how you framed the trade-off for product/business (cost, time-to-market, risk), the decision and why, and the measured outcome.

The signal this role wants: you own outcomes end-to-end, you make ambiguity smaller and shared, and you move fluidly between the whiteboard and the code — with decisions anchored in both technical depth and business impact.` },
  { key: 'tl-29', track: T, order: 29, category: 'Engineering Excellence & Leadership', kind: 'behavioral',
    question: 'A production incident hits the patient-facing platform. Walk me through owning it.',
    answer: `Restore service first — mitigate, roll back, or fail over — with clear incident roles and honest, frequent status to stakeholders. In a healthcare product, patient impact and any PHI exposure are the priorities, and hiding the ball is the unforgivable move.

Then a blameless postmortem that finds the systemic cause and produces action items with owners, plus at least one change that makes the whole class of failure impossible or auto-detected (a guard, alert, test, or circuit breaker). I track those to done and watch the reliability trend — ownership is the full loop, not just the hotfix. If PHI was exposed, I involve compliance immediately with the decision trace.` },
];

// Verified research (docs + videos), grouped by area. role='techlead'.
const R = 'techlead';
export const techleadResources = [
  // Frontend & Core Stack
  { key: 'tlr1', role: R, order: 1, area: 'Frontend & Core Stack', title: 'Next.js — Routing (App Router)', url: 'https://nextjs.org/docs/app/building-your-application/routing', kind: 'docs' },
  { key: 'tlr2', role: R, order: 2, area: 'Frontend & Core Stack', title: 'Next.js — Rendering (Server & Client Components)', url: 'https://nextjs.org/docs/app/building-your-application/rendering', kind: 'docs' },
  { key: 'tlr3', role: R, order: 3, area: 'Frontend & Core Stack', title: 'React — Learn React', url: 'https://react.dev/learn', kind: 'docs' },
  { key: 'tlr4', role: R, order: 4, area: 'Frontend & Core Stack', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', kind: 'docs' },
  { key: 'tlr5', role: R, order: 5, area: 'Frontend & Core Stack', title: 'Next.js App Router — Full Walkthrough (video)', url: 'https://www.youtube.com/watch?v=PiDLixGol-A', kind: 'video' },

  // Backend APIs
  { key: 'tlr6', role: R, order: 6, area: 'Backend APIs', title: 'Introduction to Node.js', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs', kind: 'docs' },
  { key: 'tlr7', role: R, order: 7, area: 'Backend APIs', title: 'NestJS — Official Documentation', url: 'https://docs.nestjs.com/', kind: 'docs' },
  { key: 'tlr8', role: R, order: 8, area: 'Backend APIs', title: 'tRPC — Documentation', url: 'https://trpc.io/docs', kind: 'docs' },
  { key: 'tlr9', role: R, order: 9, area: 'Backend APIs', title: 'GraphQL — Best Practices (vs REST)', url: 'https://graphql.org/learn/best-practices/', kind: 'docs' },
  { key: 'tlr10', role: R, order: 10, area: 'Backend APIs', title: 'NestJS Crash Course (video)', url: 'https://www.youtube.com/watch?v=2n3xS89TJMI', kind: 'video' },

  // Data Layer
  { key: 'tlr11', role: R, order: 11, area: 'Data Layer', title: 'PostgreSQL — Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', kind: 'docs' },
  { key: 'tlr12', role: R, order: 12, area: 'Data Layer', title: 'Prisma ORM — Documentation', url: 'https://www.prisma.io/docs/orm', kind: 'docs' },
  { key: 'tlr13', role: R, order: 13, area: 'Data Layer', title: 'Prisma Client — CRUD Queries', url: 'https://www.prisma.io/docs/orm/prisma-client/queries/crud', kind: 'docs' },
  { key: 'tlr14', role: R, order: 14, area: 'Data Layer', title: 'Redis — Client-side Caching', url: 'https://redis.io/docs/latest/develop/use/client-side-caching/', kind: 'docs' },
  { key: 'tlr15', role: R, order: 15, area: 'Data Layer', title: 'Learn PostgreSQL — Full Course (freeCodeCamp, video)', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', kind: 'video' },

  // Async, Workflows & Background Jobs
  { key: 'tlr16', role: R, order: 16, area: 'Async, Workflows & Background Jobs', title: 'Event-Driven Architecture Pattern (microservices.io)', url: 'https://microservices.io/patterns/data/event-driven-architecture.html', kind: 'docs' },
  { key: 'tlr17', role: R, order: 17, area: 'Async, Workflows & Background Jobs', title: 'Trigger.dev — Introduction', url: 'https://trigger.dev/docs/introduction', kind: 'docs' },
  { key: 'tlr18', role: R, order: 18, area: 'Async, Workflows & Background Jobs', title: 'AWS Step Functions — Durable Workflows & State Machines', url: 'https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html', kind: 'docs' },
  { key: 'tlr19', role: R, order: 19, area: 'Async, Workflows & Background Jobs', title: 'Idempotent Receiver (Martin Fowler)', url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/idempotent-receiver.html', kind: 'article' },
  { key: 'tlr20', role: R, order: 20, area: 'Async, Workflows & Background Jobs', title: 'Event-Driven Architecture Explained (video)', url: 'https://www.youtube.com/watch?v=4VoqQdMYvKs', kind: 'video' },

  // Integrations & Payments
  { key: 'tlr21', role: R, order: 21, area: 'Integrations & Payments', title: 'Stripe — Payments', url: 'https://docs.stripe.com/payments', kind: 'docs' },
  { key: 'tlr22', role: R, order: 22, area: 'Integrations & Payments', title: 'Stripe — Webhooks (reliable handling)', url: 'https://docs.stripe.com/webhooks', kind: 'docs' },
  { key: 'tlr23', role: R, order: 23, area: 'Integrations & Payments', title: 'Stripe — Idempotent Requests', url: 'https://docs.stripe.com/api/idempotent_requests', kind: 'docs' },
  { key: 'tlr24', role: R, order: 24, area: 'Integrations & Payments', title: 'Stripe — Checkout Integration', url: 'https://docs.stripe.com/payments/checkout', kind: 'docs' },
  { key: 'tlr25', role: R, order: 25, area: 'Integrations & Payments', title: 'Stripe Tutorial — Accept Payments Online (video)', url: 'https://www.youtube.com/watch?v=tr1ZUkAqpdM', kind: 'video' },

  // Analytics & Event Tracking
  { key: 'tlr26', role: R, order: 26, area: 'Analytics & Event Tracking', title: 'Segment — Tracking Plan Best Practices', url: 'https://segment.com/docs/protocols/tracking-plan/best-practices/', kind: 'docs' },
  { key: 'tlr27', role: R, order: 27, area: 'Analytics & Event Tracking', title: 'Mixpanel — Choosing the Right Tracking Method', url: 'https://docs.mixpanel.com/docs/tracking-methods/choosing-the-right-method', kind: 'docs' },
  { key: 'tlr28', role: R, order: 28, area: 'Analytics & Event Tracking', title: 'Google Analytics 4 — Get Started', url: 'https://support.google.com/analytics/answer/9304153', kind: 'docs' },
  { key: 'tlr29', role: R, order: 29, area: 'Analytics & Event Tracking', title: 'BigQuery — Introduction', url: 'https://cloud.google.com/bigquery/docs/introduction', kind: 'docs' },
  { key: 'tlr30', role: R, order: 30, area: 'Analytics & Event Tracking', title: 'Google Analytics 4 (GA4) Tutorial for Beginners (video)', url: 'https://www.youtube.com/watch?v=TgRZUa62CdA', kind: 'video' },

  // Reliability & Observability
  { key: 'tlr31', role: R, order: 31, area: 'Reliability & Observability', title: 'Sentry — Next.js Guide', url: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/', kind: 'docs' },
  { key: 'tlr32', role: R, order: 32, area: 'Reliability & Observability', title: 'Datadog — APM & Distributed Tracing', url: 'https://docs.datadoghq.com/tracing/', kind: 'docs' },
  { key: 'tlr33', role: R, order: 33, area: 'Reliability & Observability', title: 'Vercel — Deployments', url: 'https://vercel.com/docs/deployments', kind: 'docs' },
  { key: 'tlr34', role: R, order: 34, area: 'Reliability & Observability', title: 'GitHub Actions — Quickstart (CI/CD)', url: 'https://docs.github.com/en/actions/writing-workflows/quickstart', kind: 'docs' },
  { key: 'tlr35', role: R, order: 35, area: 'Reliability & Observability', title: 'Graceful Degradation / Self-Preservation (Azure Well-Architected)', url: 'https://learn.microsoft.com/en-us/azure/well-architected/reliability/self-preservation', kind: 'docs' },
  { key: 'tlr36', role: R, order: 36, area: 'Reliability & Observability', title: 'Sentry 101 — Error Monitoring for Backend Apps (video)', url: 'https://www.youtube.com/watch?v=DzhVEK65eYg', kind: 'video' },

  // Security & Healthcare Compliance
  { key: 'tlr37', role: R, order: 37, area: 'Security & Healthcare Compliance', title: 'HHS — Summary of the HIPAA Privacy Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html', kind: 'docs' },
  { key: 'tlr38', role: R, order: 38, area: 'Security & Healthcare Compliance', title: 'HHS — Summary of the HIPAA Security Rule (ePHI)', url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html', kind: 'docs' },
  { key: 'tlr39', role: R, order: 39, area: 'Security & Healthcare Compliance', title: 'HHS — HIPAA FAQs for Professionals', url: 'https://www.hhs.gov/hipaa/for-professionals/faq/index.html', kind: 'docs' },
  { key: 'tlr40', role: R, order: 40, area: 'Security & Healthcare Compliance', title: 'OWASP — Access Control Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html', kind: 'docs' },
  { key: 'tlr41', role: R, order: 41, area: 'Security & Healthcare Compliance', title: 'HIPAA Training 101 — The Four Rules (video)', url: 'https://www.youtube.com/watch?v=QjKxanDtre0', kind: 'video' },
];
