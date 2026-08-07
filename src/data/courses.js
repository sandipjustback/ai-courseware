// Two standalone courses seeded into the Module collection (course field).
// All resource URLs are verified-resolving (GeeksforGeeks + reputable sources).

const SDP = { key: 'sdp', title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', kind: 'docs', note: 'Breadth-first reference — skim the whole README once, then revisit per topic.' };
const BBG = { key: 'bbg', title: 'ByteByteGo', url: 'https://bytebytego.com/', kind: 'course', note: 'Visual explanations of core building blocks.' };
const DDIA = { key: 'ddia', title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', kind: 'docs', note: 'The definitive book on data systems, consistency, and scalability.' };
const WELLARCH = { key: 'aws-wa', title: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/', kind: 'docs', note: 'Five pillars to justify trade-offs.' };
const RG = { key: 'rg', title: 'Refactoring.Guru — Design Patterns', url: 'https://refactoring.guru/design-patterns', kind: 'course', note: 'The clearest patterns catalog anywhere.' };

// ── COURSE 1: System Design (HLD) ───────────────────────────────────────────
export const systemDesignModules = [
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-getting-started', order: 1, priority: 3,
    title: 'Getting Started with System Design',
    tagline: 'What system design is, HLD vs LLD, and a repeatable way to approach any design problem.',
    whyItMatters: 'Design interviews and real architecture both reward a structured approach over memorized trivia. A framework — requirements, estimates, high-level design, deep dive, trade-offs — lets you handle any prompt calmly.',
    objectives: [
      'Distinguish High-Level Design (HLD) from Low-Level Design (LLD)',
      'Apply a repeatable framework: requirements → estimates → high-level design → deep dive → trade-offs',
      'State assumptions and non-functional requirements (scale, latency, availability) up front',
    ],
    resources: [
      { key: 'gs', title: 'Getting Started with System Design (GfG)', url: 'https://www.geeksforgeeks.org/system-design/getting-started-with-system-design/', kind: 'article', note: 'Start here.' },
      { key: 'tut', title: 'System Design Tutorial (GfG roadmap)', url: 'https://www.geeksforgeeks.org/system-design/system-design-tutorial/', kind: 'course', note: 'The full GfG roadmap — your table of contents for this course.' },
      { key: 'hld', title: 'What is High-Level Design? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-high-level-design-learn-system-design/', kind: 'article' },
      { key: 'lld', title: 'What is Low-Level Design? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-low-level-design-or-lld-learn-system-design/', kind: 'article' },
      SDP, BBG,
    ],
    problems: [
      { key: 'p1', title: 'HLD vs LLD on one feature', difficulty: 'warmup',
        statement: 'Pick a small feature (e.g. a URL shortener). Write 3 bullets of HLD (components, data flow) and 3 bullets of LLD (classes, methods). Notice the altitude difference.',
        deliverable: 'Two 3-bullet lists.', hints: ['HLD names boxes and arrows; LLD names classes and methods.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-scalability', order: 2, priority: 3,
    title: 'Scalability & Load Balancing',
    tagline: 'Scale out statelessly and spread load — the first levers for handling growth.',
    whyItMatters: 'Almost every design question becomes "now make it handle 10x". Knowing vertical vs horizontal scaling, statelessness, and load balancing is the baseline.',
    objectives: [
      'Compare vertical vs horizontal scaling and when each applies',
      'Make services stateless so they can scale horizontally behind a load balancer',
      'Choose load-balancing strategies; reason about latency vs throughput',
    ],
    resources: [
      { key: 'scal', title: 'What is Scalability? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-scalability/', kind: 'article' },
      { key: 'lb', title: 'What is a Load Balancer? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-load-balancer-system-design/', kind: 'article' },
      SDP, WELLARCH,
    ],
    problems: [
      { key: 'p1', title: 'Scale a read-heavy API 10x', difficulty: 'core',
        statement: 'A read-heavy API is saturating one server. Walk through making it stateless, adding a load balancer and replicas, and where the next bottleneck appears.',
        hints: ['Externalize session/state first.', 'The DB is usually the next ceiling.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-databases', order: 3, priority: 3,
    title: 'Databases & Storage',
    tagline: 'SQL vs NoSQL, replication, sharding, and indexing — the data tier is where designs live or die.',
    whyItMatters: 'The data layer is the hardest to change later and the most common scaling ceiling. Getting the model, partitioning, and replication right is decisive.',
    objectives: [
      'Choose SQL vs NoSQL from access patterns, not hype',
      'Explain replication (read scaling, HA) and sharding/partitioning (write scaling)',
      'Use indexing to make queries fast; know its write cost',
    ],
    resources: [
      { key: 'sqlnosql', title: 'SQL vs NoSQL — which to use (GfG)', url: 'https://www.geeksforgeeks.org/system-design/sql-vs-nosql-which-one-is-better-to-use/', kind: 'article' },
      { key: 'shard', title: 'Database Sharding (GfG)', url: 'https://www.geeksforgeeks.org/dbms/database-sharding-a-system-design-concept/', kind: 'article' },
      DDIA,
    ],
    problems: [
      { key: 'p1', title: 'Pick a datastore and a shard key', difficulty: 'core',
        statement: 'For a social feed with heavy writes and range reads by user, choose SQL vs NoSQL and a sharding key. Justify against hot-partition risk.',
        hints: ['Shard by a key with even distribution and query locality.', 'Beware celebrity/hot keys.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-caching', order: 4, priority: 3,
    title: 'Caching & CDNs',
    tagline: 'Cache read-heavy, staleness-tolerant data close to the user — and handle the failure modes.',
    whyItMatters: 'Caching is the cheapest big win and the most common source of subtle bugs (stale data, stampedes). Knowing the patterns and pitfalls is essential.',
    objectives: [
      'Apply cache-aside, read-through, and write strategies',
      'Reason about TTLs, eviction, and invalidation (the hard problem)',
      'Use CDNs for edge caching; avoid cache stampede and origin overload',
    ],
    resources: [
      { key: 'cache', title: 'Caching — System Design concept (GfG)', url: 'https://www.geeksforgeeks.org/system-design/caching-system-design-concept-for-beginners/', kind: 'article' },
      SDP,
    ],
    problems: [
      { key: 'p1', title: 'Add caching without stale reads', difficulty: 'core',
        statement: 'Add a cache to cut DB load on a hot endpoint. Specify the pattern, TTL, invalidation, and how you prevent a stampede when the key expires.',
        hints: ['Jittered TTLs + request coalescing beat a naive TTL.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-communication', order: 5, priority: 3,
    title: 'APIs, Messaging & Microservices',
    tagline: 'Synchronous APIs vs asynchronous events, gateways, and service boundaries.',
    whyItMatters: 'How services talk determines coupling, resilience, and how the system scales. Async messaging is the backbone of decoupled, spike-tolerant designs.',
    objectives: [
      'Choose synchronous REST/gRPC vs asynchronous messaging',
      'Use queues and pub/sub for decoupling and buffering spikes',
      'Place an API gateway; draw sensible microservice boundaries',
    ],
    resources: [
      { key: 'mq', title: 'Message Queues (GfG)', url: 'https://www.geeksforgeeks.org/system-design/message-queues-system-design/', kind: 'article' },
      { key: 'apigw', title: 'What is an API Gateway? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-api-gateway-system-design/', kind: 'article' },
      { key: 'micro', title: 'Microservices (GfG)', url: 'https://www.geeksforgeeks.org/system-design/microservices/', kind: 'article' },
    ],
    problems: [
      { key: 'p1', title: 'Sync vs async for an order flow', difficulty: 'core',
        statement: 'For "place order → charge → notify → ship", decide which steps are synchronous and which become events. Explain the resilience gain.',
        hints: ['User waits on the charge; shipping/notify can be async and retried.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-consistency', order: 6, priority: 3,
    title: 'Consistency, Availability & Reliability',
    tagline: 'CAP/PACELC, consistency models, and designing for failure.',
    whyItMatters: 'At scale, partitions and failures are certain. Deciding which data is strongly vs eventually consistent — and building for graceful failure — is senior-level judgment.',
    objectives: [
      'Explain CAP and PACELC and apply them per data flow',
      'Match workloads to strong vs eventual consistency',
      'Design for reliability: redundancy, timeouts, retries, graceful degradation',
    ],
    resources: [
      { key: 'cap', title: 'CAP Theorem (GfG)', url: 'https://www.geeksforgeeks.org/system-design/cap-theorem-in-system-design/', kind: 'article' },
      DDIA,
    ],
    problems: [
      { key: 'p1', title: 'Strong vs eventual, per field', difficulty: 'core',
        statement: 'For an e-commerce app, classify which data needs strong consistency (payments, inventory) vs eventual (reviews, recommendations) and why.',
        hints: ['Money and inventory decrement want strong; feeds tolerate eventual.'] },
    ],
  },
  {
    course: 'system-design', badge: 'System Design', slug: 'sd-case-studies', order: 7, priority: 3,
    title: 'Design Case Studies',
    tagline: 'Run the full framework end-to-end on classic problems.',
    whyItMatters: 'Concepts only stick when applied. These canonical problems recur in interviews and mirror real systems.',
    objectives: [
      'Drive a design end-to-end: requirements → estimates → HLD → deep dive → trade-offs',
      'Reuse the building blocks (scaling, DB, cache, messaging) fluently',
      'Always close by naming the top trade-offs and where the design breaks first',
    ],
    resources: [
      { key: 'tinyurl', title: 'Design a URL Shortener (GfG)', url: 'https://www.geeksforgeeks.org/system-design/system-design-url-shortening-service/', kind: 'article' },
      { key: 'twitter', title: 'Design Twitter (GfG)', url: 'https://www.geeksforgeeks.org/system-design/design-twitter-a-system-design-interview-question/', kind: 'article' },
      { key: 'dropbox', title: 'Design Dropbox (GfG)', url: 'https://www.geeksforgeeks.org/system-design/design-dropbox-a-system-design-interview-question/', kind: 'article' },
    ],
    problems: [
      { key: 'p1', title: 'Design a rate limiter', difficulty: 'core',
        statement: 'Design a distributed API rate limiter. Choose an algorithm (token bucket vs sliding window), where state lives, and fail-open vs fail-closed behavior.',
        hints: ['Token bucket allows bursts; state in Redis with atomic ops.'] },
      { key: 'p2', title: 'Design a notification system', difficulty: 'advanced',
        statement: 'Design a near-real-time push/email/SMS notification service: fan-out, provider adapters, retries/DLQ, idempotency, and rate limits.',
        hints: ['Durable queue + per-channel workers + at-least-once with idempotency keys.'] },
    ],
  },
];

// ── COURSE 2: Low-Level Design (LLD) ────────────────────────────────────────
export const lowLevelDesignModules = [
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-getting-started', order: 1, priority: 2,
    title: 'Getting Started with LLD',
    tagline: 'What LLD delivers — classes, interfaces, and interactions — and how to approach an LLD problem.',
    whyItMatters: 'LLD turns a feature into clean, extensible, testable code. It is what a coding-architect is judged on and where most real maintainability is won or lost.',
    objectives: [
      'Know what LLD produces: classes, responsibilities, interfaces, interactions',
      'Follow the LLD flow: clarify → identify entities → define relationships → refine with patterns',
      'See how LLD complements HLD (boxes become classes)',
    ],
    resources: [
      { key: 'lld', title: 'What is Low-Level Design? (GfG)', url: 'https://www.geeksforgeeks.org/system-design/what-is-low-level-design-or-lld-learn-system-design/', kind: 'article', note: 'Start here.' },
      { key: 'hld', title: 'What is High-Level Design? (GfG, for contrast)', url: 'https://www.geeksforgeeks.org/system-design/what-is-high-level-design-learn-system-design/', kind: 'article' },
      SDP,
    ],
    problems: [
      { key: 'p1', title: 'Requirement → classes', difficulty: 'warmup',
        statement: 'For "a user can borrow and return books", list the nouns (entities) and verbs (methods), then sketch 3-4 classes with responsibilities.',
        hints: ['Nouns hint at classes; verbs hint at methods.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-oop', order: 2, priority: 2,
    title: 'OOP Fundamentals',
    tagline: 'Encapsulation, abstraction, inheritance, polymorphism — and composition over inheritance.',
    whyItMatters: 'Every design pattern and SOLID principle builds on solid OOP. Misusing inheritance is the root of most rigid designs.',
    objectives: [
      'Explain the four pillars with concrete examples',
      'Model with interfaces/abstractions to enable substitution',
      'Prefer composition over inheritance where it reduces coupling',
    ],
    resources: [
      { key: 'oop', title: 'Introduction to Object-Oriented Programming (GfG)', url: 'https://www.geeksforgeeks.org/system-design/introduction-of-object-oriented-programming/', kind: 'article' },
    ],
    problems: [
      { key: 'p1', title: 'Inheritance vs composition', difficulty: 'core',
        statement: 'You have a Bird class and need a Penguin that cannot fly. Show why inheritance breaks (Liskov) and how composition/interfaces fix it.',
        hints: ['Model capabilities (Flyable) as interfaces, not base-class assumptions.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-solid', order: 3, priority: 2,
    title: 'Design Principles & SOLID',
    tagline: 'Five principles that keep code easy to change and test.',
    whyItMatters: 'SOLID is the vocabulary of code review and the backbone of good LLD. Each principle names a specific smell it removes.',
    objectives: [
      'Apply each SOLID principle and the smell it fixes',
      'Use DRY, KISS, and YAGNI without over-abstracting',
      'Recognize where SRP and DIP make code testable',
    ],
    resources: [
      { key: 'solid', title: 'SOLID Principles with real examples (GfG)', url: 'https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/', kind: 'article' },
      RG,
    ],
    problems: [
      { key: 'p1', title: 'Refactor a fat class', difficulty: 'core',
        statement: 'A ReportService reads a DB, formats HTML, and emails it. Refactor using SRP (split responsibilities) and DIP (inject the DB and mailer).',
        hints: ['Three responsibilities → three collaborators behind interfaces.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-uml', order: 4, priority: 2,
    title: 'UML & Modeling',
    tagline: 'Communicate a design with class and sequence diagrams.',
    whyItMatters: 'A quick class or sequence diagram aligns a team faster than paragraphs and is expected in LLD interviews.',
    objectives: [
      'Read/draw class diagrams: association, aggregation, composition, inheritance',
      'Use sequence diagrams to show object interactions over time',
      'Choose the right diagram for the question being answered',
    ],
    resources: [
      { key: 'uml', title: 'UML — Introduction (GfG)', url: 'https://www.geeksforgeeks.org/system-design/unified-modeling-language-uml-introduction/', kind: 'article' },
    ],
    problems: [
      { key: 'p1', title: 'Model a library', difficulty: 'warmup',
        statement: 'Draw a class diagram for a library (Book, Member, Loan, Catalog). Mark composition vs association correctly.',
        hints: ['A Loan composes a Book+Member for a period; the Catalog aggregates Books.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-creational', order: 5, priority: 2,
    title: 'Design Patterns — Overview & Creational',
    tagline: 'What patterns are, plus Singleton, Factory, Builder, and Prototype.',
    whyItMatters: 'Patterns are named, proven solutions to recurring design problems — a shared vocabulary that makes designs faster to build and communicate.',
    objectives: [
      'Explain what design patterns are and when NOT to use one',
      'Apply Factory / Abstract Factory to decouple object creation',
      'Use Builder for complex construction; know Singleton pitfalls',
    ],
    resources: [
      { key: 'sdp', title: 'Software Design Patterns (GfG)', url: 'https://www.geeksforgeeks.org/system-design/software-design-patterns/', kind: 'article' },
      { key: 'catalog', title: 'Design Patterns Catalog (Refactoring.Guru)', url: 'https://refactoring.guru/design-patterns/catalog', kind: 'course' },
      { key: 'creat-gfg', title: 'Creational Design Patterns (GfG)', url: 'https://www.geeksforgeeks.org/system-design/creational-design-pattern/', kind: 'article' },
      { key: 'creat-rg', title: 'Creational Patterns (Refactoring.Guru)', url: 'https://refactoring.guru/design-patterns/creational-patterns', kind: 'course' },
    ],
    problems: [
      { key: 'p1', title: 'Factory for a notifier', difficulty: 'core',
        statement: 'Design a factory that returns an EmailSender, SmsSender, or PushSender behind a common Notifier interface, chosen by channel.',
        hints: ['Callers depend on Notifier, never on the concrete sender.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-structural-behavioral', order: 6, priority: 2,
    title: 'Design Patterns — Structural & Behavioral',
    tagline: 'Compose objects (Adapter, Decorator, Facade, Proxy) and manage behavior (Strategy, Observer, Command, State).',
    whyItMatters: 'These two families cover most real refactors: adapting/​wrapping objects, and swapping or reacting to behavior at runtime.',
    objectives: [
      'Use Adapter, Decorator, Facade, and Proxy to compose objects',
      'Use Strategy to swap algorithms and Observer for event notification',
      'Recognize a growing if/switch on type as a call for polymorphism/State',
    ],
    resources: [
      { key: 'struct-gfg', title: 'Structural Design Patterns (GfG)', url: 'https://www.geeksforgeeks.org/system-design/structural-design-patterns/', kind: 'article' },
      { key: 'struct-rg', title: 'Structural Patterns (Refactoring.Guru)', url: 'https://refactoring.guru/design-patterns/structural-patterns', kind: 'course' },
      { key: 'behav-gfg', title: 'Behavioral Design Patterns (GfG)', url: 'https://www.geeksforgeeks.org/system-design/behavioral-design-patterns/', kind: 'article' },
      { key: 'behav-rg', title: 'Behavioral Patterns (Refactoring.Guru)', url: 'https://refactoring.guru/design-patterns/behavioral-patterns', kind: 'course' },
    ],
    problems: [
      { key: 'p1', title: 'Strategy + Observer', difficulty: 'core',
        statement: 'A pricing engine needs swappable discount algorithms (Strategy) and must notify a cart UI when the total changes (Observer). Sketch both.',
        hints: ['Strategy = one interface, many algorithms; Observer = subject notifies subscribers.'] },
    ],
  },
  {
    course: 'low-level-design', badge: 'Low-Level Design', slug: 'lld-case-studies', order: 7, priority: 2,
    title: 'LLD Case Studies',
    tagline: 'Apply OOP + SOLID + patterns to full problems.',
    whyItMatters: 'Classic LLD problems combine everything: entities, principles, and patterns under interview time pressure.',
    objectives: [
      'Clarify requirements before designing classes',
      'Choose patterns deliberately (and justify skipping them)',
      'Produce a clean, extensible, testable class design',
    ],
    resources: [
      { key: 'parking', title: 'Design a Parking Lot (GfG)', url: 'https://www.geeksforgeeks.org/system-design/designing-parking-lot-garage-system-system-design/', kind: 'article' },
      RG,
    ],
    problems: [
      { key: 'p1', title: 'Design a parking lot', difficulty: 'core',
        statement: 'Design a parking lot: vehicle types, spot sizes, ticketing, pricing, and finding a spot. Name the entities, interfaces, and one pattern you would use.',
        hints: ['Strategy for pricing; Factory for spot/vehicle; keep allocation behind an interface.'] },
      { key: 'p2', title: 'Design an elevator system', difficulty: 'advanced',
        statement: 'Design an elevator control system for a building: request handling, scheduling strategy, and elevator/door state. Use State and Strategy.',
        hints: ['State for door/elevator; Strategy for the scheduling algorithm.'] },
    ],
  },
];
