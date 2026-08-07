// Software Architect track: study resources + Q&A bank.
// Q&A is stored in the shared QandaQuestion collection with track='architect'.
// Categories: the 5 evaluation dimensions first, then technical deep-dives.

export const architectResources = [
  // ── System Design & Scalability ──────────────────────────────────────────
  { key: 'ddia', order: 1, area: 'System Design & Scalability', kind: 'book',
    title: 'Designing Data-Intensive Applications (Kleppmann)', url: 'https://dataintensive.net/',
    note: 'The single best book for the reliability/scalability/consistency vocabulary an architect is expected to have.' },
  { key: 'sdprimer', order: 2, area: 'System Design & Scalability', kind: 'docs',
    title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer',
    note: 'Breadth-first refresher on caching, sharding, load balancing, CAP, queues.' },
  { key: 'aws-builders', order: 3, area: 'System Design & Scalability', kind: 'article',
    title: "Amazon Builders' Library", url: 'https://aws.amazon.com/builders-library/',
    note: 'How Amazon actually builds resilient systems: timeouts, retries with jitter, backpressure.' },
  { key: 'well-arch', order: 4, area: 'System Design & Scalability', kind: 'docs',
    title: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/',
    note: 'The five pillars — speak in these when justifying trade-offs.' },

  // ── AWS, Kubernetes & DevOps ─────────────────────────────────────────────
  { key: '12factor', order: 5, area: 'AWS, Kubernetes & DevOps', kind: 'docs',
    title: 'The Twelve-Factor App', url: 'https://12factor.net/',
    note: 'The baseline contract for cloud-native services; expect to defend or critique each factor.' },
  { key: 'k8s-docs', order: 6, area: 'AWS, Kubernetes & DevOps', kind: 'docs',
    title: 'Kubernetes documentation', url: 'https://kubernetes.io/docs/home/',
    note: 'Focus on deployments, services, HPA, probes, resource requests/limits.' },
  { key: 'terraform', order: 7, area: 'AWS, Kubernetes & DevOps', kind: 'docs',
    title: 'Terraform documentation (Infrastructure as Code)', url: 'https://developer.hashicorp.com/terraform/docs',
    note: 'IaC concepts: state, modules, plan/apply, drift.' },
  { key: 'dora', order: 8, area: 'AWS, Kubernetes & DevOps', kind: 'article',
    title: 'DORA metrics (Accelerate)', url: 'https://dora.dev/',
    note: 'Deploy frequency, lead time, MTTR, change-fail rate — how to measure delivery, not vibes.' },

  // ── React & Node.js Architecture ─────────────────────────────────────────
  { key: 'react-docs', order: 9, area: 'React & Node.js Architecture', kind: 'docs',
    title: 'React documentation', url: 'https://react.dev/',
    note: 'Rendering model, state, and the "you might not need an effect" guidance.' },
  { key: 'node-best', order: 10, area: 'React & Node.js Architecture', kind: 'docs',
    title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices',
    note: 'Project structure, error handling, and production hardening for Node services.' },
  { key: 'patterns-dev', order: 11, area: 'React & Node.js Architecture', kind: 'article',
    title: 'patterns.dev', url: 'https://www.patterns.dev/',
    note: 'Rendering patterns (SSR/CSR/ISR) and React design patterns with trade-offs.' },

  // ── REST, Microservices & Events ─────────────────────────────────────────
  { key: 'google-api', order: 12, area: 'REST, Microservices & Events', kind: 'docs',
    title: 'Google API Design Guide', url: 'https://cloud.google.com/apis/design',
    note: 'Resource-oriented REST design, naming, versioning, pagination, errors.' },
  { key: 'ms-api', order: 13, area: 'REST, Microservices & Events', kind: 'docs',
    title: 'Microsoft REST API Guidelines', url: 'https://github.com/microsoft/api-guidelines',
    note: 'A concrete, opinionated standard you can adopt org-wide.' },
  { key: 'microservices-io', order: 14, area: 'REST, Microservices & Events', kind: 'docs',
    title: 'Microservices.io pattern catalog', url: 'https://microservices.io/patterns/',
    note: 'Saga, CQRS, API composition, outbox, CDC, strangler fig.' },
  { key: 'eip', order: 15, area: 'REST, Microservices & Events', kind: 'docs',
    title: 'Enterprise Integration Patterns', url: 'https://www.enterpriseintegrationpatterns.com/',
    note: 'The shared vocabulary for async/event-based integration.' },

  // ── Design Principles & Low-Level Design ─────────────────────────────────
  { key: 'refactoring-guru', order: 16, area: 'Design Principles & Low-Level Design', kind: 'article',
    title: 'Refactoring.Guru (SOLID, patterns)', url: 'https://refactoring.guru/',
    note: 'SOLID and GoF patterns with clear examples — the LLD backbone.' },
  { key: 'fowler', order: 17, area: 'Design Principles & Low-Level Design', kind: 'article',
    title: "Martin Fowler's site", url: 'https://martinfowler.com/',
    note: 'Refactoring, microservices, event-driven, and the tradeoffs essays.' },
  { key: 'clean-arch', order: 18, area: 'Design Principles & Low-Level Design', kind: 'article',
    title: 'The Clean Architecture (Uncle Bob)', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html',
    note: 'Dependency rule and boundaries — how to keep business logic framework-independent.' },

  // ── Architecture Leadership & Communication ──────────────────────────────
  { key: 'staffeng', order: 19, area: 'Architecture Leadership & Communication', kind: 'article',
    title: 'StaffEng (Will Larson)', url: 'https://staffeng.com/',
    note: 'The non-code half of the job: influence, alignment, technical strategy.' },
  { key: 'adr', order: 20, area: 'Architecture Leadership & Communication', kind: 'docs',
    title: 'Architecture Decision Records', url: 'https://adr.github.io/',
    note: 'Lightweight, durable records of why a decision was made.' },
  { key: 'c4', order: 21, area: 'Architecture Leadership & Communication', kind: 'docs',
    title: 'C4 model for visualising architecture', url: 'https://c4model.com/',
    note: 'Context/Container/Component/Code — the right diagram for each audience.' }
];

const T = 'architect';

export const architectQuestions = [
  // ══════════════ 1. PROBLEM SOLVING ══════════════
  { key: 'a-ps1', track: T, order: 1, category: 'Problem Solving', kind: 'scenario',
    question: 'Walk me through how you approach an ambiguous, open-ended technical problem.',
    answer: `Start by refusing to design before the problem is framed. My first move is to turn a vague ask into a written problem statement: who is affected, what "better" looks like as a measurable outcome, and the hard constraints (SLAs, budget, deadlines, compliance). The JD calls this "bringing clarity to the roadmap" — I do it by writing a one-page problem definition and getting product + engineering to agree on it before any architecture.

Then I decompose: separate what's genuinely unknown (needs a spike) from what's known, and attack the riskiest unknown first with a timeboxed prototype rather than debating it. I explicitly enumerate 2-3 candidate approaches with trade-offs instead of committing to the first idea.

I close with a bias to reversible decisions: for a two-way-door choice I move fast and adjust; for a one-way door (data model, public API contract, vendor lock-in) I slow down and write an ADR. The signal I try to give is that I make ambiguity smaller and shared, not that I have all the answers on day one.`,
    source: 'Maps to JD: "embrace ambiguity and work towards bringing clarity"' },
  { key: 'a-ps2', track: T, order: 2, category: 'Problem Solving', kind: 'scenario',
    question: 'A critical consumer-facing feature is slow in production and customers are complaining. How do you diagnose it?',
    answer: `Stabilize first, diagnose second. If customers are actively hurting, I look for the fastest safe mitigation (scale out, feature-flag off the slow path, add a cache, shed load) while I investigate — reducing blast radius buys time.

Diagnosis is measure-then-fix, never guess. I go to the telemetry: latency percentiles (p95/p99, not averages), traces to find which span dominates, and correlate with a recent change (deploy, traffic spike, data growth). Most "sudden" slowness is a specific cause: an N+1 query, a missing index, a synchronous call that should be async, a cold cache, or a downstream dependency degrading.

Once I've localized it, I match the remedy to the cause — the JD lists the toolkit explicitly: caching, asynchronous processing, parallelization. Then I make the failure un-repeatable: add the missing SLO alert or dashboard so next time it's caught before customers feel it, and capture the root cause in a blameless postmortem. The architect-level habit is turning one incident into a systemic guardrail.`,
    source: 'Maps to JD: performance bottlenecks — caching, async, parallelization' },
  { key: 'a-ps3', track: T, order: 3, category: 'Problem Solving', kind: 'behavioral',
    question: 'Tell me about the hardest technical problem you solved and how you knew your solution was right.',
    answer: `Pick a story where the difficulty was in the ambiguity or the constraints, not just the code. Structure: the business stakes in one sentence, why the naive solution didn't work, the key insight or trade-off you found, and — critically — how you validated it: a load test that hit the target p99, an A/B that moved the metric, error rates that dropped, cost that came down.

The differentiator at architect level is that "right" is defined by evidence and by what you deliberately traded away, not by elegance. I always name the cost of my solution (added complexity, a new operational burden, eventual consistency somewhere) because a senior reviewer distrusts a solution with no downsides.

End with what you'd revisit now — it shows you treat architecture as something you steward over time, not a one-shot decision.` },
  { key: 'a-ps4', track: T, order: 4, category: 'Problem Solving', kind: 'scenario',
    question: 'How do you decide between a quick fix and a proper long-term solution under deadline pressure?',
    answer: `I make the trade-off explicit and reversible rather than pretending there isn't one. I'll ship the quick fix when the deadline is real and the fix is contained, but only if two things are true: it doesn't corrupt data or lock in a public contract (those are one-way doors I won't shortcut), and the debt is logged with an owner and a payback trigger, not left implicit.

I frame it to stakeholders in their terms: "Option A ships Friday but adds X risk and Y cleanup cost; Option B is two weeks and avoids that. Here's my recommendation and why." That turns a silent engineering compromise into an informed business decision.

The architect move is preventing the quick fix from becoming permanent: I attach it to a tracked follow-up and, where possible, structure it so the temporary path is easy to rip out (a flag, an adapter) rather than woven through the system.` },

  // ══════════════ 2. AI LEVERAGE ══════════════
  { key: 'a-ai1', track: T, order: 5, category: 'AI Leverage', kind: 'behavioral',
    question: 'How do you and your teams leverage AI to work more effectively?',
    answer: `I treat AI as a force multiplier across the SDLC, with guardrails. Concretely: AI-assisted coding (Claude Code / Copilot) for boilerplate, test generation, and unfamiliar-API ramp-up; AI for code review triage, PR summaries, and drafting ADRs and design docs; and AI in ops — summarizing incidents, drafting postmortems, and querying logs/metrics in natural language.

The architect's job is not just using it but governing it: I set standards for where AI output must be human-reviewed (anything security-sensitive, anything touching money or PII), guard against prompt-injection and data leakage when tools touch our code and customer data, and measure whether it actually moves DORA metrics rather than assuming it helps.

I'd also push AI into the product where it earns its place — but only behind evals and a human-in-the-loop for high-risk actions. The maturity signal is that I can say where AI should NOT be trusted yet, not just where it helps.`,
    source: 'Maps to JD dimension: AI leverage' },
  { key: 'a-ai2', track: T, order: 6, category: 'AI Leverage', kind: 'scenario',
    question: 'How would you drive adoption of AI engineering practices across multiple teams?',
    answer: `Same way I'd drive any cross-org practice (the JD explicitly asks for this): start with a proven pilot, not a mandate. I'd pick one team with a real pain point, land a measurable win (lead time down, coverage up), and turn that into a reference story and a lightweight playbook — recommended tools, prompt patterns, and the review/guardrail rules.

Then I lower the activation energy: golden-path templates, shared prompt libraries, and office hours, so adoption is the path of least resistance rather than extra work. I make the guardrails part of the platform (secrets scanning, review gates) so teams get safety by default.

I'd track adoption and impact honestly — including where it backfired (AI-generated code that increased churn or review load) — and feed that back. Adoption sticks when it's evidence-led and teams keep autonomy over how, within clear org-level standards on the non-negotiables.`,
    source: 'Maps to JD: "drive innovation around engineering practices... driving adoption across the organization"' },
  { key: 'a-ai3', track: T, order: 7, category: 'AI Leverage', kind: 'scenario',
    question: 'A team wants to ship an AI feature to consumers. What architectural guardrails do you require?',
    answer: `Non-negotiables before it touches a customer: (1) evals — a versioned test set with graded scoring in CI, so we know quality before deploy and catch regressions on every prompt/model change; (2) human-in-the-loop for any high-risk or irreversible action, with confidence-based autonomy — act automatically only when confident and low-risk; (3) observability — trace every request (inputs, retrieved context, output, cost, latency) so we can answer "why did it say that?".

Then the platform concerns: cost and latency budgets (caching, model routing to cheaper models for easy steps), data governance (what customer data goes into prompts, retention, and prompt-injection defenses), and graceful degradation when the model is slow or down.

I'd insist on grounding (retrieval over authoritative sources, not free-form generation) for anything factual, and a clear fallback to a deterministic path. The architshowt principle: the model is a component behind an interface with SLAs and guardrails, not magic sprinkled on the product.` },

  // ══════════════ 3. SYSTEM DESIGN ══════════════
  { key: 'a-sd1', track: T, order: 8, category: 'System Design', kind: 'scenario',
    question: 'Design a globally distributed, highly available platform for a consumer-facing SaaS. Walk me through it.',
    answer: `I'd drive it in a fixed order so nothing important is skipped. (1) Requirements: functional scope, then non-functional numbers — expected RPS, read/write ratio, latency target, availability SLA, data residency/compliance. Architects are judged on pinning these down, not on jumping to boxes. (2) High-level shape: clients -> CDN/edge -> API gateway -> stateless services -> data stores, with an async backbone (queue/event log) for anything that doesn't need a synchronous response.

(3) Scale and availability: multi-AZ by default, multi-region for global latency and DR; stateless services behind autoscaling; data partitioned/sharded with read replicas; CDN + caching layers (edge, application, and DB read cache) to protect the origin. For "globally distributed" I'd address the hard part honestly — data consistency across regions: which data is strongly consistent vs eventually consistent, and how we handle conflicts.

(4) Resilience: timeouts, retries with backoff+jitter, circuit breakers, bulkheads, idempotent writes, and graceful degradation. (5) Observability and ops: SLOs, tracing, and a rollout story (blue/green or canary). I'd end by stating the top 2-3 trade-offs I made and where the design would break first as load grows — that "where it breaks" answer is what separates an architect from a senior engineer.`,
    source: 'Maps to JD: globally distributed, large-scale systems' },
  { key: 'a-sd2', track: T, order: 9, category: 'System Design', kind: 'scenario',
    question: 'How do you decide between a monolith and microservices for a product?',
    answer: `I start from the organization and the problem, not fashion. A well-structured modular monolith is the right default for most products: it is simpler to build, test, deploy, and reason about, and it defers the enormous operational tax of distributed systems. I'd only split into services when there's a concrete driver — independent scaling needs, independent deploy cadence per team, fault isolation, or team autonomy at a size where a shared codebase creates contention.

The key insight I'd share: microservices are primarily an organizational scaling tool (Conway's Law), and they trade in-process simplicity for network failure modes, distributed transactions, and eventual consistency. So I'd extract services along genuine business/domain boundaries (bounded contexts), usually via the strangler-fig pattern, and only when the pain of the monolith is real.

For a unified-platform product vision, the pragmatic answer is often a modular monolith or a small number of well-bounded services with a shared platform layer — not a sprawl of nanoservices. I'd anchor the decision in an ADR with the trade-offs written down.` },
  { key: 'a-sd3', track: T, order: 10, category: 'System Design', kind: 'scenario',
    question: 'A key service is hitting its scaling limits. How do you scale it?',
    answer: `I diagnose the bottleneck before adding hardware — is it CPU, memory, I/O, the database, or a downstream dependency? Throwing instances at a database-bound service just moves the queue. Once I know the constraint, I work through a ladder: (1) scale vertically if it's cheap and buys runway; (2) scale horizontally if the service is stateless (make it stateless first — externalize session/state); (3) attack the data tier, which is usually the real ceiling — read replicas for read-heavy load, caching to cut repeat work, then partitioning/sharding for write scaling.

Beyond raw scaling: offload synchronous work to async processing (queues) so spikes buffer instead of toppling the service, apply backpressure and rate limiting to protect it, and parallelize independent work. The JD names caching, asynchronous processing, and parallelization for exactly this reason.

I'd also question whether we need to scale at all or whether the load is pathological (a bad query, a retry storm, a hot key) — fixing the cause is cheaper than scaling the symptom. And I'd add the SLO alerting so we see the next ceiling coming.` },

  { key: 'a-sd4', track: T, order: 10.5, category: 'System Design', kind: 'scenario',
    question: 'Design a near-instant notification system that delivers push, email, and SMS at scale.',
    answer: `(This is a very commonly asked design prompt, so prep it cold.) I'd drive it in order. Requirements: channels (push/email/SMS), volume and peak RPS, latency target ("near-instant" = seconds, define the SLO), delivery guarantee (at-least-once), and features like user preferences, templating, dedup, and quiet hours.

High-level shape: producers emit a NotificationRequested event to a durable log/queue (Kafka/SQS) — this decouples the sending services from delivery and absorbs spikes. A notification service resolves user preferences and templates, then fans out per channel to dedicated workers, each integrating a provider (APNs/FCM for push, SES/SendGrid for email, Twilio/SNS for SMS) behind an adapter interface so providers are swappable.

The hard parts I'd address unprompted: reliability — at-least-once delivery with idempotency keys so retries don't double-send, a dead-letter queue for provider failures with retry/backoff, and provider failover; scale — partition the queue by user, autoscale workers per channel independently (SMS is slower/rate-limited than push); rate limiting per provider and per user (no notification storms); and delivery tracking — status events (sent/delivered/failed) written back for observability and receipts. For true real-time in-app delivery I'd add a WebSocket/push layer with presence. I'd close with the top trade-offs: at-least-once + idempotency over exactly-once, and eventual consistency on delivery status.`,
    source: 'Common real-time notification-system design prompt' },
  { key: 'a-sd5', track: T, order: 10.6, category: 'System Design', kind: 'scenario',
    question: "You've inherited a monolith that's slowing teams down. Would you break it up, and how would you migrate?",
    answer: `(Highly relevant — legacy-monolith modernization is common, so migration judgment is often tested.) I wouldn't rewrite; big-bang rewrites of revenue systems fail. I'd first confirm the monolith is actually the problem — often the pain is a tangled module or a slow test/deploy pipeline that's cheaper to fix than a rebuild. If decomposition is justified (independent scaling, deploy contention, team autonomy), I'd extract along business/domain boundaries, not technical layers.

The approach is the strangler fig: stand up a routing layer (API gateway) in front of the monolith, carve out one bounded context at a time into a service, redirect that traffic, and shrink the monolith incrementally — every step ships and is reversible. I'd start with a context that has a clean boundary and real pain, to prove the pattern and build confidence. Data is the hardest part: split the shared database gradually (a service owns its data), use the outbox pattern + events to keep the old and new sides consistent during transition, and accept eventual consistency where safe.

Throughout I'd keep the lights on: contract tests, feature flags, parallel-run/shadow traffic to validate the new service before cutover, and clear metrics that the migration is improving delivery (DORA) — not just churning architecture. I'd write the sequence and the rollback plan into an ADR so the org is aligned on why and in what order.`,
    source: 'Common architect prompt: monolith modernization' },

  // ══════════════ 4. OWNERSHIP ══════════════
  { key: 'a-own1', track: T, order: 11, category: 'Ownership', kind: 'behavioral',
    question: 'Tell me about a time you took ownership of something outside your formal responsibility.',
    answer: `Pick a story where you saw a gap nobody owned and closed it — a recurring incident class, a cross-team integration that kept breaking, a security risk everyone walked past. The arc: you noticed it, you didn't wait to be assigned, you brought the right people together, and you drove it to a durable fix, not a band-aid.

The architect flavor of ownership is system-level: not just fixing the instance but changing the mechanism so it can't recur — a guardrail, a standard, a platform capability. I'd quantify the outcome (incidents dropped, on-call load fell) and be honest about the messy parts (stepping on toes, having to build alignment first).

What lands is showing ownership extends past code to the outcome and the people: I stayed accountable through rollout and adoption, not just the merge.`,
    source: 'Maps to JD dimension: ownership' },
  { key: 'a-own2', track: T, order: 12, category: 'Ownership', kind: 'behavioral',
    question: 'A production incident happens in a system your team owns at 2am. Walk me through how you own it end-to-end.',
    answer: `Ownership is the full loop, not just the fix. During: restore service first (mitigate, roll back, failover) with clear incident roles and honest, frequent status comms to stakeholders — customers care about time-to-recovery, not root cause in the moment. I don't hunt for the elegant fix while customers are down; I stop the bleeding.

After: a blameless postmortem that finds the systemic cause, not a person to blame. The output is action items with owners and dates, and — the part that signals real ownership — at least one change that makes this entire class of failure impossible or auto-detected (a guardrail, an alert, a test, a circuit breaker), so we don't relive it.

Long-term ownership means I track those action items to done and watch the reliability metrics trend, rather than declaring victory when the pager goes quiet. As an architect I'd also ask whether other teams have the same latent risk and drive the fix org-wide.` },
  { key: 'a-own3', track: T, order: 13, category: 'Ownership', kind: 'behavioral',
    question: 'How do you handle disagreement with a team that owns a decision you think is wrong?',
    answer: `I separate the decision type from my ego. First I make sure I actually understand their context and constraints — often the "wrong" decision is right given information I didn't have. I bring data and a concrete alternative, not just an opinion, and I frame it around shared goals (reliability, customer impact, long-term cost).

If it's a reversible, low-blast-radius decision, I disagree-and-commit: voice my concern once, clearly, then support their call and let reality decide — teams need autonomy and I'm not the owner. If it's a one-way door with serious risk (security, data integrity, a public contract), I escalate with evidence, because part of an architect's ownership is being the backstop on decisions that are expensive to unwind.

Either way I document the decision and the trade-offs in an ADR so we can revisit it with facts later, not re-argue from memory. Influence without authority is most of this job.` },

  // ══════════════ 5. EXECUTION ABILITY ══════════════
  { key: 'a-ex1', track: T, order: 14, category: 'Execution Ability', kind: 'behavioral',
    question: 'How do you lead a multi-quarter technical vision to actual delivery across several teams?',
    answer: `I make the vision concrete and incremental. A multi-quarter effort dies as a big-bang; it succeeds as a sequenced roadmap of thin, shippable slices that each deliver value and de-risk the next. So I break the vision into milestones with clear success metrics, and I always have something in production early — even a narrow version — so we're learning from reality, not a plan.

Alignment is the hard part across teams: I write the vision down (a one-pager + architecture in C4 + ADRs for the load-bearing decisions), socialize it until leads can explain it back in their own words, and translate it into each team's roadmap so it's their work, not a mandate from an architect. I use guardrails and golden paths so teams move fast without diverging from the target architecture.

Execution means I stay engaged through delivery — unblocking, reviewing at decision points, adjusting the plan as we learn — and I track progress with delivery metrics (DORA) and milestone burn-down, not status theater. The JD asks specifically for a track record of leading senior engineers through a multi-quarter vision; this is how I'd evidence it.`,
    source: 'Maps to JD: "leading teams of senior engineers to execute a multi-quarter technical vision"' },
  { key: 'a-ex2', track: T, order: 15, category: 'Execution Ability', kind: 'behavioral',
    question: 'How do you balance hands-on coding with architecture and leadership responsibilities?',
    answer: `I stay hands-on deliberately but selectively — the JD wants a coding architect, and I agree an architect who stops touching the code loses credibility and situational awareness. My rule: I code on the highest-leverage, riskiest parts — the reference implementation of a new pattern, a tricky proof-of-concept, the golden-path template teams will copy — rather than competing with my teams for feature work.

I protect focus time and I'm intentional that my coding shouldn't become a bottleneck; if a task can't tolerate my interrupt-driven schedule, it belongs to a team, not me. Pairing, reviewing at design and PR checkpoints, and building shared tooling let me stay technical while multiplying others.

The honest trade-off I'd name: my job is to make the team faster, so if hands-on work starts to mean I'm the critical path, I've mis-prioritized. I measure myself on the team's throughput and the quality of the architecture, not lines I personally wrote.`,
    source: 'Maps to JD: "strong hands-on coding experience"' },
  { key: 'a-ex3', track: T, order: 16, category: 'Execution Ability', kind: 'scenario',
    question: 'How do you set and enforce engineering standards across an organization without slowing teams down?',
    answer: `I make the right way the easy way. Standards enforced by documents get ignored; standards baked into tooling stick. So I encode them in golden-path templates, shared libraries, linters, CI gates, and paved-road platforms — teams get the standard for free by using the default, and deviating takes effort rather than the reverse.

I keep the mandated set small and high-value (security, observability, API contracts, data handling) and leave the rest as recommendations, because over-standardizing kills the autonomy and speed the JD cares about. Standards are co-created with senior engineers via an architecture guild / RFC process, not decreed — people enforce what they helped write.

I measure adoption and, more importantly, whether the standard is actually reducing incidents or review friction; if a standard isn't paying for itself, I kill it. Enforcement is mostly automation plus peer review at boundaries, with escalation reserved for the genuinely risky exceptions.`,
    source: 'Maps to JD: "define standard software engineering/architecture practices at an Organisational level"' },

  { key: 'a-ex4', track: T, order: 16.5, category: 'Execution Ability', kind: 'behavioral',
    question: 'A senior-leadership round with the VP of Engineering and the CEO — how do you talk about your work with them, and why this company?',
    answer: `I shift altitude for the audience. With a VP/CEO I lead with business outcomes and risk, not architecture diagrams: what the system lets the company do, the cost and reliability story, and how technical bets map to the product roadmap and revenue. I'd anchor on one or two concrete examples where an architectural decision I owned moved a business metric, and I'd show I can make a trade-off legible to a non-engineer quickly enough to get a decision made — which the JD needs, since architects here drive cross-product alignment.

On the "why this company" question: for a category leader digitizing a large, under-served industry and consolidating toward a unified platform — which is exactly the kind of problem an architect wants, because the value is in coherence across products, not one clever service. I'd reference the company's modernization journey (re-platforming a legacy stack, maturing DevOps/CI-CD) as the meaty, multi-quarter architectural work the role is really about, and connect it to my track record of aligning large orgs on a long-term technical vision.

The signal I'd aim to give leadership: I bring clarity to ambiguity, I own outcomes end-to-end, and I can make senior engineers and product leaders row in the same direction — the leadership half of this job, evidenced with specifics rather than adjectives.`,
    source: 'Senior architect onsites often include VP Eng + CEO rounds' },

  // ══════════════ 6. SYSTEM DESIGN & SCALABILITY (deep-dive) ══════════════
  { key: 'a-sc1', track: T, order: 17, category: 'System Design & Scalability (deep-dive)', kind: 'concept',
    question: 'Where and how would you introduce caching, and what are the failure modes?',
    answer: `Cache in layers, closest to the user first: CDN/edge for static and cacheable responses, an application cache (Redis/Memcached) for expensive computed or DB-read results, and DB-level caches. The rule is cache read-heavy, tolerant-of-staleness data — never treat a cache as a source of truth.

Pick the pattern by access shape: cache-aside (lazy) for general reads, read-through/write-through when you want the cache always warm and consistent, write-behind only when you can tolerate loss risk. Set TTLs and an explicit invalidation strategy — stale data is the most common cache bug.

Name the failure modes because they are commonly probed: cache stampede/thundering herd on expiry (fix with request coalescing, jittered TTLs, or locks), hot keys, and the dangerous one — a cache outage causing a load spike that topples the origin (mitigate with request throttling and graceful degradation). And remember the two hard problems: invalidation and naming. Caching is a correctness/complexity trade, not a free speedup.` },
  { key: 'a-sc2', track: T, order: 18, category: 'System Design & Scalability (deep-dive)', kind: 'concept',
    question: 'Explain CAP and how it shapes real design choices in a distributed system.',
    answer: `CAP says under a network partition you must choose between consistency and availability — you cannot have both while partitioned. Since partitions are inevitable at scale, the real decision is per-workload: CP (reject/lag rather than serve stale/conflicting data) vs AP (stay available and reconcile later).

In practice I apply it at the data-flow level, not the whole system: money movement, inventory decrement, and auth want strong consistency (CP); feeds, recommendations, presence, and analytics can be eventually consistent (AP) for availability and latency. Most real systems are a mix, and PACELC is the more useful lens — even without a partition you trade latency vs consistency.

The architect skill is naming which data needs which guarantee and designing the reconciliation (idempotency, versioning/vector clocks, conflict resolution) for the eventually-consistent parts, rather than defaulting everything to strong consistency and paying the latency/availability cost everywhere.` },
  { key: 'a-sc3', track: T, order: 19, category: 'System Design & Scalability (deep-dive)', kind: 'concept',
    question: 'How do you make a service resilient to downstream failures?',
    answer: `Assume every dependency will be slow or down and design so that doesn't cascade. Core toolkit: timeouts on every remote call (a call with no timeout is a latent outage), retries with exponential backoff AND jitter (naive retries cause retry storms), and circuit breakers so a failing dependency fails fast instead of exhausting your threads.

Isolation: bulkheads (separate connection pools/thread pools per dependency) so one slow downstream can't consume all resources, and load shedding/rate limiting to protect yourself under overload. For correctness under retries, writes must be idempotent (idempotency keys).

Then graceful degradation: serve a cached or default response, or a reduced feature, rather than a hard error — a consumer app should bend, not break. I'd validate all of this with load and chaos/failure-injection testing, because resilience you haven't tested is a hypothesis. This is straight out of the Amazon Builders' Library playbook.` },

  // ══════════════ 7. AWS, KUBERNETES & DEVOPS ══════════════
  { key: 'a-aws1', track: T, order: 20, category: 'AWS, Kubernetes & DevOps', kind: 'concept',
    question: 'Design a CI/CD pipeline for microservices on Kubernetes with safe deploys.',
    answer: `Pipeline stages: on commit -> build once into an immutable, versioned artifact (container image) -> automated tests (unit, integration, contract) -> security/quality gates (SAST, dependency and image scanning, coverage) -> push to registry -> deploy via IaC/GitOps. The principle is build-once-promote-many: the same artifact flows through dev -> staging -> prod, configured by environment, never rebuilt per stage (12-factor).

Safe deploys are the architect's concern: progressive delivery — canary or blue/green — with automated health checks and automatic rollback on SLO breach, so a bad deploy affects 1% before it affects 100%. Kubernetes gives readiness/liveness probes, rolling updates, and HPA; I'd pair that with feature flags to decouple deploy from release.

I'd manage infra as code (Terraform) and prefer GitOps (Argo/Flux) so the cluster state is declarative and auditable — the repo is the source of truth, drift is detectable. And I'd measure the pipeline with DORA metrics: the goal is frequent, small, low-risk deploys with fast MTTR, which is what actually makes delivery safe.` },
  { key: 'a-aws2', track: T, order: 21, category: 'AWS, Kubernetes & DevOps', kind: 'concept',
    question: 'What does Infrastructure as Code buy you, and how do you keep it maintainable at scale?',
    answer: `IaC makes infrastructure versioned, reviewable, and reproducible — environments become deterministic instead of hand-crafted snowflakes, so staging actually matches prod and disaster recovery is a re-apply, not archaeology. It also puts infra changes through the same PR/review/CI discipline as code.

Maintainability at scale: modularize (reusable modules for the repeated patterns — a standard service, a standard queue), manage state carefully (remote, locked state; separate state per environment to limit blast radius), and keep environments DRY via composition rather than copy-paste. I enforce plan-review-before-apply and detect drift so manual console changes don't rot the source of truth.

The pitfalls I'd call out: giant monolithic state files (slow, risky), secrets in state, and letting people bypass IaC with console edits. The goal is that the Git repo is the single source of truth for infrastructure, applied by the pipeline, never by a human at a keyboard.` },
  { key: 'a-aws3', track: T, order: 22, category: 'AWS, Kubernetes & DevOps', kind: 'concept',
    question: 'How do you approach observability for a distributed system?',
    answer: `Three pillars, tied together: metrics (RED/USE — rate, errors, duration per service; utilization/saturation per resource) for "is it healthy?", logs (structured, correlated) for "what happened?", and distributed tracing for "where did the time/error go across services?" — with a shared trace/correlation ID threading all three so I can pivot from a metric spike to the exact trace to the logs.

But observability is only useful against expectations: I define SLIs and SLOs per user-facing journey and alert on symptoms (SLO burn rate, user-facing errors) not causes (CPU), so alerts mean "customers are affected" rather than noise. Error budgets then drive the reliability-vs-features conversation objectively.

At architect level I'd standardize this as a platform capability — instrumentation baked into the golden-path template (OpenTelemetry), dashboards and alerts provisioned by default — so every team gets observability for free rather than reinventing it. You can't operate or scale what you can't see.` },

  // ══════════════ 8. REACT & NODE.JS ARCHITECTURE ══════════════
  { key: 'a-rn1', track: T, order: 23, category: 'React & Node.js Architecture', kind: 'concept',
    question: 'How do you architect a large React application across multiple teams for maintainability and performance?',
    answer: `Structure for team autonomy and change-isolation. I organize by feature/domain (feature folders or a modular monorepo), not by technical layer, so a team owns a vertical slice end-to-end. A shared design-system component library and shared tooling keep consistency without coupling. For truly independent teams at scale, module federation / micro-frontends is an option — but I'd reach for it only when the org actually needs independent deploys, since it adds real complexity.

State management by scope: server/cache state via React Query/RTK Query (most "global state" is really server cache), local UI state kept local, and a minimal global store only for genuine cross-cutting state — over-globalizing state is the most common large-app mistake.

Performance: pick the rendering strategy deliberately (SSR/SSG/ISR vs CSR) based on SEO and TTFB needs; code-split by route and lazy-load; control re-renders (memoization, stable references, virtualization for big lists); and budget bundle size in CI. I'd enforce these as lint rules and templates so performance is a default, not a heroic cleanup later.` },
  { key: 'a-rn2', track: T, order: 24, category: 'React & Node.js Architecture', kind: 'concept',
    question: 'Node.js is single-threaded. How do you build Node services that scale and stay responsive?',
    answer: `The rule: never block the event loop. Node scales beautifully for I/O-bound work (the whole point of its async model) but a single CPU-bound task stalls every request on that instance. So CPU-heavy work (crypto, image/PDF processing, big JSON, compression) goes to worker threads, a separate service, or an offline queue — never inline in the request path.

Horizontal scaling: Node processes are stateless and single-threaded, so I run multiple processes (cluster / one per core, or multiple pods) behind a load balancer and externalize all state (sessions, cache) to Redis/DB. This is exactly the 12-factor stateless-process model, and it's what makes Kubernetes autoscaling work.

Production hardening: streaming for large payloads instead of buffering, connection pooling to databases, backpressure on streams, timeouts on every outbound call, and centralized async error handling (unhandled promise rejections crash the process). I'd offload anything slow or spiky to a queue so the API stays responsive under load — async processing again.` },
  { key: 'a-rn3', track: T, order: 25, category: 'React & Node.js Architecture', kind: 'concept',
    question: 'How should the frontend and backend share contracts and evolve without breaking each other?',
    answer: `Make the contract explicit, typed, and versioned — never an informal agreement in people's heads. I'd define the API contract in a schema (OpenAPI for REST, or GraphQL/gRPC schema) as the single source of truth, and generate typed clients from it so the frontend and backend can't silently drift; a contract change becomes a visible, reviewable diff.

Evolve additively: add fields, don't repurpose or remove them without a version and a deprecation window. Contract tests (consumer-driven, e.g. Pact) in CI catch a breaking change before it ships rather than in production. For shared types in a TS monorepo, a shared package or codegen keeps types in one place.

Decouple deploy from release with feature flags so frontend and backend can ship independently and light up a feature when both sides are ready. The architect principle: the API contract is a product with backward-compatibility guarantees, because multiple teams and clients depend on it.` },

  // ══════════════ 9. REST, MICROSERVICES & EVENT-DRIVEN ══════════════
  { key: 'a-re1', track: T, order: 26, category: 'REST, Microservices & Event-Driven', kind: 'concept',
    question: 'What are the principles of good REST API design, and how do you version and evolve APIs?',
    answer: `Resource-oriented and predictable: nouns not verbs (/orders, /orders/{id}), correct HTTP methods and status codes, statelessness, and proper use of the uniform interface. The details that separate a designed API from an ad-hoc one: consistent naming, pagination (cursor-based for large/changing sets), filtering/sorting conventions, idempotency (PUT/DELETE idempotent; POST guarded with idempotency keys), and a consistent, machine-readable error format.

Versioning: prefer evolving additively so you rarely break — add fields and endpoints, never repurpose existing ones. When a breaking change is unavoidable, version explicitly (URL /v2 or a header), support the old version through a published deprecation window, and communicate it. Never break existing clients silently.

I'd standardize all of this org-wide with an API style guide (Google/Microsoft guidelines as a base) and enforce it with linting (Spectral) in CI, so every team's API feels like one platform — directly serving a unified-platform goal.` },
  { key: 'a-re2', track: T, order: 27, category: 'REST, Microservices & Event-Driven', kind: 'concept',
    question: 'When do you choose synchronous REST vs asynchronous event-driven communication between services?',
    answer: `Synchronous (REST/gRPC) when the caller genuinely needs an immediate answer to proceed — a read, or a command whose result the user is waiting on. It's simpler to reason about but it couples services in space and time: the caller's availability now depends on the callee's, and chains of sync calls multiply latency and failure probability.

Asynchronous (events/messages) when you want temporal decoupling, resilience, and fan-out: the producer emits a fact ("OrderPlaced") and doesn't care who consumes it, so consumers can be down, scale independently, and be added later without touching the producer. It's the backbone for workflows, integrations, and spiky workloads (buffer via a queue). The JD explicitly calls out async/event-based architecture.

The trade-off I'd name: async buys decoupling and resilience at the cost of eventual consistency and harder debugging (you need correlation IDs and tracing across the flow). My default: sync at the edge for request/response the user waits on, async internally for side effects, cross-service workflows, and anything that can happen "soon" rather than "now." Distinguish event notification from event-carried state transfer, and make consumers idempotent.` },
  { key: 'a-re3', track: T, order: 28, category: 'REST, Microservices & Event-Driven', kind: 'scenario',
    question: 'How do you handle data consistency across microservices without distributed transactions?',
    answer: `Accept that two-phase commit across services doesn't scale, and design for eventual consistency with well-known patterns. For a business operation spanning services, use a Saga: a sequence of local transactions each publishing an event, with compensating actions to undo prior steps if a later one fails (refund if provisioning fails). Choreography (services react to events) for simple flows; orchestration (a coordinator drives steps) when the flow is complex and needs a clear owner.

The reliability glue is the Outbox pattern: write the business change and the outgoing event in the same local transaction to an outbox table, then relay it (or via CDC) — this removes the dual-write problem where the DB commits but the event is lost. Consumers must be idempotent (dedupe by event ID) because delivery is at-least-once.

Where a read needs a consistent cross-service view, use CQRS with a read model built from events. The architect's job is choosing which operations truly need strong consistency (keep those inside one service/DB boundary) and letting the rest be eventually consistent with explicit reconciliation — not pretending distributed ACID exists.` },

  // ══════════════ 10. DESIGN PRINCIPLES & LOW-LEVEL DESIGN ══════════════
  { key: 'a-dp1', track: T, order: 29, category: 'Design Principles & Low-Level Design', kind: 'concept',
    question: 'How do SOLID principles show up in real code you review, and which matters most?',
    answer: `I use SOLID as review lenses, not dogma. The two that pay off most in practice: Single Responsibility (a class/module should have one reason to change — most tangled code violates this, and fixing it makes everything else easier) and Dependency Inversion (depend on abstractions, inject dependencies) because it's what makes code testable and lets us swap implementations — a database, a payment provider, an LLM backend — without rewrites.

Open/Closed and Liskov show up when I see a growing if/switch on a type (extend via polymorphism/strategy instead) or a subclass that breaks its parent's contract. Interface Segregation catches fat interfaces that force clients to depend on methods they don't use.

But I'd caution against over-applying them — premature abstraction to satisfy a principle creates its own complexity. The real goal SOLID serves is code that's easy to change and test; I optimize for that outcome and reach for the principle when it's actually buying it. In review I ask "what will be painful to change here in six months?" more than "which letter does this violate?"` },
  { key: 'a-dp2', track: T, order: 30, category: 'Design Principles & Low-Level Design', kind: 'scenario',
    question: 'Walk through your low-level design process for a new module — say a rate limiter or a notification service.',
    answer: `I start from the interface and the requirements, not the classes. For a rate limiter: clarify the requirements (per-user? per-IP? distributed across instances? limit and window? behavior on breach — reject or queue?), then choose the algorithm with its trade-off (fixed window is simple but bursty at boundaries; sliding window log is accurate but memory-heavy; token bucket is the usual sweet spot for allowing bursts up to a cap). If it must be distributed, the state lives in Redis, not in-process — that's the load-bearing decision.

Then the design: a clean interface (allow(key) -> decision) so callers don't know the algorithm, the strategy behind it swappable, and concerns separated (storage, policy, enforcement). I think about concurrency (atomic increments/Lua in Redis to avoid races), failure mode (fail-open vs fail-closed when Redis is down — a security-critical limiter fails closed), and observability (metrics on throttle rate).

I'd sketch it with a quick class/sequence diagram, name the extension points (new algorithms, new key strategies), and write the tricky edge cases as tests first. The signal is a clean, testable, extensible design with the trade-offs made explicit — the LLD half of "high and low level design" in the JD.` },
  { key: 'a-dp3', track: T, order: 31, category: 'Design Principles & Low-Level Design', kind: 'concept',
    question: 'How do you keep a large codebase maintainable and manage technical debt as an architect?',
    answer: `Maintainability comes from boundaries and consistency, enforced by tooling. I keep clear module boundaries (Clean Architecture's dependency rule — business logic doesn't depend on frameworks or I/O), a consistent structure teams recognize across services, and automated enforcement: linting, formatting, type checking, architecture-fitness tests (e.g. dependency-direction rules) in CI, so drift is caught mechanically rather than in review nitpicks.

Technical debt I treat as a managed portfolio, not a moral failing: make it visible (a tracked backlog, not TODOs lost in code), classify it (deliberate/prudent debt is fine if logged with a payback trigger; reckless debt gets fixed), and quantify its cost so prioritizing it against features is a real business conversation. I allocate steady capacity to it rather than waiting for a mythical "cleanup quarter."

The architect's leverage is prevention: golden-path templates and good defaults stop debt at the source, and the strangler-fig pattern lets us pay down big debt incrementally behind a stable interface instead of a risky big-bang rewrite. I'd anchor which debt we pay in data — where do incidents and slow delivery actually cluster.` }
];
