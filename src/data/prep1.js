// Prep 1 — a targeted interview-prep course (course='prep1').
// Two sections: "JD Focus Areas" (curated resources) and "Deep-Dive Questions"
// (each carries a written answer in `content` + verified resources).

const DD = { course: 'prep1', priority: 1, section: 'Deep-Dive Questions', badge: 'Deep Dive' };

const JD = { course: 'prep1', priority: 1, section: 'JD Focus Areas', badge: 'JD Focus' };
export const jdFocusModules = [
  { ...JD, slug: 'prep1-jd-java-spring', order: 1,
    title: 'Java & Spring Boot',
    tagline: "Build production services with Spring Boot — the JD's core backend stack.",
    whyItMatters: 'Spring Boot is the primary backend framework in the JD. Interviewers probe DI, auto-configuration, Spring Data, and how you structure and test a service.',
    objectives: ['Structure a Spring Boot service (controllers, services, repositories, DI)', 'Use Spring Data, validation, configuration and profiles', 'Know auto-configuration, actuator, and testing basics'],
    resources: [
      { key: 'r1', title: 'Spring Boot — Official Project Home', url: 'https://spring.io/projects/spring-boot', kind: 'docs' },
      { key: 'r2', title: 'Spring Boot Reference Documentation', url: 'https://docs.spring.io/spring-boot/index.html', kind: 'docs' },
      { key: 'r3', title: 'Building an Application with Spring Boot (Official Guide)', url: 'https://spring.io/guides/gs/spring-boot', kind: 'article' },
      { key: 'r4', title: 'Spring Boot Tutorial — Full Course (Amigoscode, video)', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-microservices', order: 2,
    title: 'Microservices & Event-Driven Architecture',
    tagline: 'Service boundaries and events — the JD calls out monolith → microservices modernization.',
    whyItMatters: 'A core JD responsibility is driving modernization from monoliths to event-driven microservices. You must reason about boundaries, communication, and distributed data.',
    objectives: ['Draw service boundaries around bounded contexts', 'Choose synchronous (REST) vs asynchronous (event) communication', 'Apply saga, outbox, and idempotency for distributed data consistency'],
    resources: [
      { key: 'r1', title: 'Microservices (Martin Fowler)', url: 'https://martinfowler.com/articles/microservices.html', kind: 'article' },
      { key: 'r2', title: 'Microservice Architecture Pattern (microservices.io)', url: 'https://microservices.io/patterns/microservices.html', kind: 'docs' },
      { key: 'r3', title: 'What do you mean by "Event-Driven"? (Martin Fowler)', url: 'https://martinfowler.com/articles/201701-event-driven.html', kind: 'article' },
      { key: 'r4', title: 'Microservices — Martin Fowler (GOTO 2014, video)', url: 'https://www.youtube.com/watch?v=wgdBVIX9ifA', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-kafka', order: 3,
    title: 'Kafka & Messaging Systems',
    tagline: 'The event backbone: topics, partitions, consumer groups, and ordering.',
    whyItMatters: 'The JD names Kafka/messaging explicitly. Event-driven microservices ride on it, so understand its model and delivery guarantees.',
    objectives: ['Explain topics, partitions, offsets, and consumer groups', 'Reason about ordering (per-partition) and delivery semantics', 'Design for at-least-once delivery with idempotent consumers'],
    resources: [
      { key: 'r1', title: 'Apache Kafka Documentation', url: 'https://kafka.apache.org/documentation/', kind: 'docs' },
      { key: 'r2', title: 'Apache Kafka — Introduction', url: 'https://kafka.apache.org/intro', kind: 'docs' },
      { key: 'r3', title: 'What is Apache Kafka? (Confluent Developer)', url: 'https://developer.confluent.io/what-is-apache-kafka/', kind: 'article' },
      { key: 'r4', title: 'Kafka in 100 Seconds (video)', url: 'https://www.youtube.com/watch?v=uvb00oaa3k8', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-aws', order: 4,
    title: 'AWS Cloud Services',
    tagline: 'Core AWS building blocks for highly available systems.',
    whyItMatters: 'The JD requires building HA, resilient systems on AWS. Know the primitives and the Well-Architected pillars to justify decisions.',
    objectives: ['Use EC2, S3, VPC, IAM and the shared-responsibility model', 'Design for high availability across Availability Zones', 'Apply the Well-Architected pillars to justify trade-offs'],
    resources: [
      { key: 'r1', title: 'AWS Well-Architected Framework', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', kind: 'docs' },
      { key: 'r2', title: 'Amazon EC2 Concepts (User Guide)', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html', kind: 'docs' },
      { key: 'r3', title: 'Amazon S3 — What is S3? (User Guide)', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', kind: 'docs' },
      { key: 'r4', title: 'Top 50+ AWS Services in 10 Minutes (Fireship, video)', url: 'https://www.youtube.com/watch?v=JIbIYCM48to', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-docker-k8s', order: 5,
    title: 'Docker & Kubernetes',
    tagline: 'Containerize and orchestrate for scalable, resilient deploys.',
    whyItMatters: 'The JD lists Docker & Kubernetes. Containers are the unit of deploy; Kubernetes runs them at scale with self-healing and autoscaling.',
    objectives: ['Build lean images and run containers', 'Explain pods, deployments, services, and horizontal autoscaling', 'Use probes and resource requests/limits for reliability'],
    resources: [
      { key: 'r1', title: 'Docker — Get Started Overview', url: 'https://docs.docker.com/get-started/overview/', kind: 'docs' },
      { key: 'r2', title: 'Kubernetes Concepts — Overview', url: 'https://kubernetes.io/docs/concepts/overview/', kind: 'docs' },
      { key: 'r3', title: 'Learn Kubernetes Basics (Official Tutorial)', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', kind: 'docs' },
      { key: 'r4', title: 'Kubernetes Tutorial for Beginners (TechWorld with Nana, video)', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-cicd-devops', order: 6,
    title: 'CI/CD & DevOps',
    tagline: 'Automated build/test/deploy — a JD best-practice to champion.',
    whyItMatters: 'The JD asks you to champion CI/CD, code reviews, and operational excellence. Know how to design safe, fast pipelines and measure them.',
    objectives: ['Design a build-once-promote-many pipeline with quality gates', 'Apply safe-deploy patterns (canary/blue-green, rollback, feature flags)', 'Measure delivery with DORA metrics'],
    resources: [
      { key: 'r1', title: 'Continuous Integration (Martin Fowler)', url: 'https://martinfowler.com/articles/continuousIntegration.html', kind: 'article' },
      { key: 'r2', title: 'Continuous Delivery (Martin Fowler)', url: 'https://martinfowler.com/bliki/ContinuousDelivery.html', kind: 'article' },
      { key: 'r3', title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', kind: 'docs' },
      { key: 'r4', title: 'CI/CD Explained (TechWorld with Nana, video)', url: 'https://www.youtube.com/watch?v=AknbizcLq4w', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-system-design', order: 7,
    title: 'System Design & Scalability',
    tagline: "Scale, availability, and low latency — the JD's headline requirement.",
    whyItMatters: 'The JD demands scalable, resilient systems for high-traffic, low-latency environments. This is the most-weighted interview area for a lead.',
    objectives: ['Drive requirements → HLD → deep-dive → trade-offs', 'Use caching, replication, sharding, and async processing', 'Design for high availability and graceful degradation'],
    resources: [
      { key: 'r1', title: 'The System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', kind: 'docs' },
      { key: 'r2', title: "Amazon Builders' Library", url: 'https://aws.amazon.com/builders-library/', kind: 'docs' },
      { key: 'r3', title: 'Azure Architecture Guide (Microsoft Learn)', url: 'https://learn.microsoft.com/en-us/azure/architecture/guide/', kind: 'docs' },
      { key: 'r4', title: '20 System Design Concepts in 10 Minutes (ByteByteGo, video)', url: 'https://www.youtube.com/watch?v=i53Gi_K3o7I', kind: 'video' },
    ] },
  { ...JD, slug: 'prep1-jd-observability', order: 8,
    title: 'Observability (Datadog / Grafana / ELK)',
    tagline: 'See production: metrics, logs, traces, and SLOs.',
    whyItMatters: 'The JD calls observability a good-to-have and lists Datadog/Grafana/ELK. Reliability and operational excellence depend on it.',
    objectives: ['Instrument the three pillars: metrics, logs, traces', 'Define SLIs/SLOs and alert on symptoms, not causes', 'Use Datadog / Grafana / ELK for dashboards and debugging'],
    resources: [
      { key: 'r1', title: 'Grafana Fundamentals (Docs)', url: 'https://grafana.com/docs/grafana/latest/fundamentals/', kind: 'docs' },
      { key: 'r2', title: 'What is the ELK Stack? (Elastic)', url: 'https://www.elastic.co/what-is/elk-stack', kind: 'docs' },
      { key: 'r3', title: 'Datadog — Getting Started', url: 'https://docs.datadoghq.com/getting_started/', kind: 'docs' },
      { key: 'r4', title: 'OpenTelemetry Observability Primer', url: 'https://opentelemetry.io/docs/concepts/observability-primer/', kind: 'docs' },
    ] },
  { ...JD, slug: 'prep1-jd-leadership', order: 9,
    title: 'Engineering Leadership & People Management',
    tagline: 'The leadership half of the role: mentoring, execution, and culture.',
    whyItMatters: 'The JD is a lead/manager role — hiring, mentoring, sprint/roadmap delivery, and culture matter as much as the tech. Prepare stories and a philosophy.',
    objectives: ['Balance hands-on technical work with people leadership', 'Drive sprint planning, roadmap delivery, and operational excellence', 'Support hiring, career development, and performance management'],
    resources: [
      { key: 'r1', title: 'StaffEng — Staff Engineer Archetypes', url: 'https://staffeng.com/guides/staff-archetypes/', kind: 'article' },
      { key: 'r2', title: 'Irrational Exuberance — Will Larson (lethain.com)', url: 'https://lethain.com/', kind: 'article' },
      { key: 'r3', title: 're:Work — What Makes a Great Manager (Google)', url: 'https://rework.withgoogle.com/en/guides/managers-identify-what-makes-a-great-manager', kind: 'article' },
      { key: 'r4', title: "The Manager's Path — Camille Fournier (LeadDev, video)", url: 'https://www.youtube.com/watch?v=DeinU3-sqdo', kind: 'video' },
    ] },
];

export const deepDiveModules = [
  { ...DD, slug: 'prep1-merge-intervals', order: 10,
    title: 'Merge Intervals (DSA)',
    tagline: 'The canonical interval-merging pattern and its complexity.',
    content: `Problem: given a list of intervals [start, end], merge every overlapping pair — e.g. [[1,3],[2,6],[8,10]] → [[1,6],[8,10]]. It looks trivial but it is the gateway to a whole family of interval problems, so interviewers use it to see whether you reach for the pattern or brute-force it.

The standard solution — sort + sweep: sort by start time, then make one pass keeping a "current" interval. If the next start <= current.end they overlap, so extend current.end = max(current.end, next.end); otherwise the current interval is final — emit it and start a new one. Sorting is the load-bearing insight: once ordered by start, any interval can only overlap the one immediately before it, which collapses an O(n²) all-pairs check into a single linear scan. Cost: O(n log n) time (the sort dominates), O(n) output (O(1) extra if you merge in place).

Alternatives, and when each wins:

- Brute force (compare every pair and union): O(n²). Only for tiny n or as a correctness baseline.
- Sweep line / event counting: if you only need the MAX number of overlaps (the "minimum meeting rooms" question), do not merge at all — emit +1 at each start and −1 at each end, sort the 2n events, and track a running counter; the peak is the answer. O(n log n) but no merged output. The two-pointer variant walks separately-sorted start[] and end[] arrays.
- Bucket / boolean array: if coordinates are small bounded integers (say 0..10⁶), mark covered points directly — O(range) time and space. Beats sorting when the range is small and dense, wasteful when sparse.
- Interval tree / balanced BST (a TreeMap keyed by start): the right tool when intervals arrive dynamically and you must insert/delete and query overlaps online — O(log n) per op instead of re-sorting the whole set. This is what real calendar and reservation systems use.

Variants that reuse the pattern: insert-interval (list already sorted → O(n), no sort), interval intersection of two lists (two pointers), employee free time, and the greedy cousins non-overlapping-intervals and min-arrows-to-burst-balloons (sort by END, keep the earliest end).

Senior gotchas: decide whether endpoints are inclusive or exclusive ([1,2] and [2,3] — touch or overlap?) and stay consistent; guard against integer overflow on max; tie-break on (start, then end) to keep edge cases clean. In production this is exactly how you merge IP/CIDR ranges, compact time-series windows, de-duplicate date ranges, and detect booking conflicts.`,
    resources: [
      { key: 'r1', title: 'Merge Intervals — LeetCode #56', url: 'https://leetcode.com/problems/merge-intervals/', kind: 'docs' },
      { key: 'r2', title: 'Merge Overlapping Intervals (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dsa/merging-intervals/', kind: 'article' },
      { key: 'r3', title: 'Merge Intervals — LeetCode 56 (NeetCode, video)', url: 'https://www.youtube.com/watch?v=44H3cEC2fFM', kind: 'video' },
    ] },
  { ...DD, slug: 'prep1-scale-node', order: 11,
    title: 'Scaling a Node.js Application',
    tagline: 'Beat the single thread: cluster, worker threads, and horizontal scale.',
    content: `Start with the model: Node runs your JavaScript on a single thread driven by an event loop, with libuv's thread pool handling async I/O underneath. That makes it superb for I/O-bound work (APIs, gateways, real-time) but means one CPU-bound task — a big JSON.parse, a synchronous crypto call, a catastrophic regex — blocks every other request on that process. So "scaling Node" is really "never block the loop, then add processes."

Use every core on one box:

- cluster module / PM2 cluster mode: fork one worker process per core behind a shared socket (round-robin). Pros: uses all cores, trivial. Cons: shared-nothing between workers, so state must be external; doesn't help a single slow request.
- worker_threads: offload CPU-bound work (image/PDF processing, hashing, parsing) to a thread with shared memory (transferable ArrayBuffers). Best when the heavy work is inside your process and needs low-latency data sharing.
- child_process / a separate microservice: heavier isolation via IPC; use when the workload is truly separate or in another language.
- Offload to a queue (BullMQ/SQS/Kafka) + workers: the usual production answer for slow or spiky work — the API stays responsive and bursts buffer instead of toppling it.

Scale horizontally (the real lever): keep processes stateless and run many instances (containers/pods) behind a load balancer, autoscaled by K8s HPA or an ASG. Externalize all state — sessions, cache, rate-limit counters — to Redis or the DB. Prefer stateless JWTs over sticky sessions so any instance can serve any request (12-factor). This is what actually takes you from one box to thousands of RPS.

Then the multipliers: cache hot reads (in-process LRU for tiny/hot data, Redis for shared), a CDN for static/edge-cacheable responses, DB connection pooling (PgBouncer), HTTP keep-alive and connection reuse to downstreams, and streaming instead of buffering large payloads.

Node-specific pitfalls to name: blocking the event loop (sync fs, huge JSON, regex backtracking), memory leaks (dangling listeners/closures) and GC pauses, and the hard single-thread CPU ceiling. When the workload is genuinely CPU-bound and latency-critical, that is the honest moment to say "Node may be the wrong tool — Go/Java/Rust" — but for I/O-bound microservices Node scales extremely well.

Senior framing: scaling is bottleneck-hunting, not reflexively adding pods. Measure p95/p99 and event-loop lag first; the ceiling is often the database or a downstream dependency, not Node — so replicas, caching, and async offload usually buy more than more instances.`,
    resources: [
      { key: 'r1', title: 'Node.js Cluster API (docs)', url: 'https://nodejs.org/api/cluster.html', kind: 'docs' },
      { key: 'r2', title: 'Node.js Worker Threads API (docs)', url: 'https://nodejs.org/api/worker_threads.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-dynamodb', order: 12,
    title: 'DynamoDB',
    tagline: 'Key-value/document store: keys, partitions, indexes, and access-pattern-first design.',
    content: `DynamoDB is a fully-managed, serverless NoSQL key-value/document store that gives single-digit-millisecond latency at effectively any scale by hashing the partition key to spread items across physical partitions. Items live in tables (up to 400KB each, schemaless attributes); the primary key is either a partition key alone or a partition key + sort key (composite). The partition key decides placement; the sort key orders items within a partition and enables range queries and item collections.

The golden rule: model for your access patterns, not your entities. There are no joins, so you denormalize and often use single-table design — multiple entity types in one table, related items sharing a partition key with sort-key prefixes (USER#123 / ORDER#456) so one query returns the whole object graph.

Indexes (know the difference cold):

- GSI (Global Secondary Index): a different partition/sort key over the same data, with its own capacity; eventually consistent; can be added anytime. Use for alternate query patterns.
- LSI (Local Secondary Index): same partition key, alternate sort key; supports strong consistency; must be created with the table; shares the 10GB-per-partition limit.

Capacity & consistency: on-demand (pay-per-request, spiky/unknown load) vs provisioned + auto scaling (steady load, cheaper); reads are eventually consistent by default (strong reads cost 2x and aren't available on GSIs); TransactWriteItems gives ACID across up to 100 items at ~2x cost; global tables give multi-region active-active with last-writer-wins; DynamoDB Streams feed Lambda for CDC/event-driven pipelines.

Pros: near-infinite scale, predictable low latency, zero ops, fine-grained IAM. Cons: rigid — you must know access patterns up front; no ad-hoc queries or joins; scans are slow and expensive; 1MB query page; item-size limits; hot-partition risk; and migrations/new access patterns can mean a backfill.

When to reach for something else:

- Relational (Postgres/RDS/Aurora): complex/ad-hoc queries, multi-row transactions, reporting, evolving access patterns — flexibility over extreme scale.
- MongoDB: rich document queries and secondary indexes with less up-front rigidity (you manage scaling, or Atlas does).
- Cassandra/ScyllaDB: same wide-column model, multi-region writes, self-managed/open-source.
- Redis: microsecond in-memory, but ephemeral/cache — not a system of record.

The classic failure: a hot partition — a low-cardinality or skewed key (status = ACTIVE, or a monotonic timestamp) that concentrates traffic on one partition while others idle. Fix with a higher-cardinality key, a composite key, or write-sharding a suffix (adaptive capacity now auto-splits some hot partitions, but design still matters).

Senior framing: the whole schema flips based on the queries, so "it depends on access patterns" is the honest lead — and cost modeling (RCU/WCU, storage, and GSI data duplication) is part of the design, not an afterthought.`,
    resources: [
      { key: 'r1', title: 'DynamoDB Core Components (tables, keys, partitions)', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html', kind: 'docs' },
      { key: 'r2', title: 'Best Practices for Designing & Architecting with DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sql-scaling', order: 13,
    title: 'SQL Scaling',
    tagline: 'From a single node to replicas, partitioning, and sharding.',
    content: `Scale a relational database as a deliberate ladder — cheapest, least disruptive rungs first — and separate the two problems: scaling READS vs scaling WRITES. In practice most "scale the DB" incidents are actually a missing index, an N+1 query, or no cache — so profile before you architect.

- Vertical (bigger box): simplest, buys real runway, but a hard ceiling and a single point of failure. Always the first rung.
- Indexing + query tuning: the highest ROI and most-overlooked step. Right indexes, killing N+1s, avoiding SELECT *, and reading EXPLAIN plans often remove the "scaling" problem entirely.
- Read replicas: the primary takes writes and replicates asynchronously to replicas that serve reads. Great for read-heavy load (feeds, reporting). Cost: replication lag → stale reads, so route read-after-write to the primary (or use semi-sync). Scales reads, not writes.
- Caching: Redis/Memcached in front of hot reads (cache-aside) removes a huge fraction of DB load; materialized views precompute expensive aggregates. The catch is invalidation.
- Connection pooling: connections are a scarce DB resource; a pooler (PgBouncer) is essential, especially in serverless where every function opens its own.
- Partitioning (within one server): split a big table by range/list/hash so queries and maintenance (vacuum, archival) touch smaller chunks and the planner can prune. Still one machine.
- Sharding (across servers): horizontally split data by a shard key across independent nodes — the only thing that truly scales WRITES and dataset size. It is the big, expensive, one-way step: it breaks cross-shard joins/transactions and makes resharding painful, so it is a last resort.
- Offload the workload: push search to Elasticsearch, analytics/OLAP to a warehouse (BigQuery/Redshift/Snowflake) via CDC, and split by feature (functional partitioning — each service owns its DB) so the OLTP primary stays lean. CQRS separates read and write models.

Modern alternative — NewSQL / distributed SQL: CockroachDB, Google Spanner, Vitess (shards MySQL for you), YugabyteDB, and Aurora give horizontal scale while keeping SQL semantics and (mostly) distributed transactions. If you can adopt one, you often skip hand-rolled sharding entirely — at the cost of operational/vendor complexity and some latency for cross-node consistency.

Senior framing: separate read vs write scaling and OLTP vs OLAP; exhaust indexing → replicas → cache → partitioning before sharding. Most systems never need to shard — replicas plus caching plus good schema/index design carry you remarkably far, and "do you actually need to shard?" is often the strongest answer.`,
    resources: [
      { key: 'r1', title: 'Read replicas — Amazon RDS (docs)', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html', kind: 'docs' },
      { key: 'r2', title: "Sharding vs. partitioning — what's the difference? (PlanetScale)", url: 'https://planetscale.com/blog/sharding-vs-partitioning-whats-the-difference', kind: 'article' },
      { key: 'r3', title: 'Database Sharding vs Replication (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/difference-between-database-sharding-and-replication/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-partition-key', order: 14,
    title: 'Partition Key',
    tagline: 'The field that decides where data lives — and whether you get hot partitions.',
    content: `A partition key is the attribute a distributed system hashes (or ranges) to decide which partition/node a record lives on — the DynamoDB partition key, Kafka message key, Cassandra partition key, or a shard key in general. It is the single most consequential schema decision in a distributed store, because it dictates data distribution and therefore whether load is even or lopsided. Get it wrong and no amount of hardware saves you.

A good partition key balances three (sometimes competing) properties:

- High cardinality — many distinct values so data spreads across many partitions (userId, orderId good; a boolean or status flag bad).
- Even access distribution — no single value takes a disproportionate share of traffic (the "celebrity" problem).
- Query locality — records you read together share a key so you avoid scatter-gather across partitions.

The tension is between distribution and locality: a key that spreads writes perfectly may scatter your range queries, and a key great for locality may create hotspots. The usual resolution is a composite key (partition key for distribution + sort key for locality/range).

The failure mode is the hot partition / hot key: one value gets far more reads or writes than others, throttling a single partition while the rest sit idle. Common causes: low-cardinality keys, the celebrity problem, and monotonic keys (a timestamp or auto-increment id sends every new write to the newest partition).

Mitigations:

- Choose a higher-cardinality natural attribute aligned to the dominant query.
- Composite key (partition + sort) to keep locality without sacrificing spread.
- Key salting / write-sharding: append a bounded suffix (userId#0..N), fanning writes across N sub-partitions and scatter-gathering reads — trades read complexity for write spread.
- Hashing for even placement; consistent hashing when you also need minimal reshuffling as nodes change.

Comparison of partitioning schemes: hash (even spread, but no efficient range scans) vs range (great range queries, hotspot/skew risk) vs directory/lookup (flexible, but an extra hop and a dependency) vs geo/tenant. Kafka is a special case — the key controls ORDERING (same key → same partition → ordered), a null key round-robins, and changing partition count breaks the key→partition mapping and thus ordering guarantees.

Senior framing: design the partition key from the dominant read pattern AND the write distribution together, plan for the hottest key you can imagine, and remember it is expensive to change later — so it deserves more design time than almost anything else in the schema.`,
    resources: [
      { key: 'r1', title: 'Designing Partition Keys (avoid hot partitions) — DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html', kind: 'docs' },
      { key: 'r2', title: 'Partitions and Data Distribution — DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sharding', order: 15,
    title: 'Sharding',
    tagline: 'Horizontal partitioning across nodes to scale writes and data size.',
    content: `Sharding is horizontal partitioning across independent nodes: each shard is its own database holding a subset of the rows, so you scale write throughput and total data size beyond one machine. Distinguish it clearly from its neighbors — partitioning splits a table within one server, replication makes copies of the same data (for reads/HA). Sharding alone scales writes.

Strategies and their trade-offs:

- Hash-based: hash the shard key for even distribution — the default. Even load, but range queries scatter across all shards and adding nodes reshuffles data (mitigate with consistent hashing + virtual nodes).
- Range-based: contiguous key ranges per shard. Efficient range scans and simple, but risks hotspots and uneven growth (a busy range overloads one shard).
- Directory / lookup: a lookup service maps keys to shards. Most flexible (rebalance by editing the map) but adds a hop and a dependency that must be HA.
- Geo / entity (tenant): shard by region or customer — natural isolation and data-residency compliance, but tenant-size skew creates hot shards.

Where sharding lives: application-level (you route queries), a sharding proxy/middleware (Vitess for MySQL, Citus for Postgres, ProxySQL), or built into the engine (MongoDB, Cassandra, CockroachDB, Spanner). Prefer built-in/managed when you can — hand-rolled sharding is a large, permanent operational commitment.

The real costs to name in an interview:

- Cross-shard joins and transactions become hard or impossible (you fall back to app-side joins, 2PC, or sagas).
- Any query without the shard key becomes scatter-gather across every shard.
- Global uniqueness and referential integrity no longer come for free.
- Rebalancing/resharding as you grow is operationally painful; a bad shard key produces hot shards; backups, migrations, and failure handling all multiply.

Alternatives to reach for FIRST: vertical scaling, read replicas, caching, in-DB partitioning, functional partitioning (split by feature/service, each with its own smaller DB), archiving/tiering cold data, and NewSQL/distributed SQL (Spanner, CockroachDB, Vitess, Aurora Limitless) that shards for you while preserving SQL.

Senior framing: sharding is the biggest one-way door in data architecture. Only shard when a single primary genuinely cannot hold the write volume or dataset, after exhausting the cheaper rungs; then pick a high-cardinality shard key aligned to the dominant access pattern, keep transactions inside a shard, and strongly prefer a system that shards for you.`,
    resources: [
      { key: 'r1', title: 'Database Sharding — A System Design Concept (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/database-sharding-a-system-design-concept/', kind: 'article' },
      { key: 'r2', title: 'Sharding — MongoDB Manual (docs)', url: 'https://www.mongodb.com/docs/manual/sharding/', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-auto-scaling', order: 16,
    title: 'Auto Scaling (AWS)',
    tagline: 'Match capacity to demand automatically — out and in.',
    content: `Auto scaling keeps capacity matched to demand automatically — scaling OUT (more instances) and back IN (fewer) — so you get elasticity, cost savings, and self-healing. On AWS, an EC2 Auto Scaling Group (ASG) has a launch template, min / max / desired capacity, spans multiple AZs for resilience, and replaces unhealthy instances using EC2 or ELB health checks.

Scaling policies — pick by how predictable the load is:

- Target tracking: hold a metric (CPU, ALB requests-per-target) at a target value. The simplest and usually the best default.
- Step scaling: add/remove N instances at defined metric thresholds — more control for sharp, staged load.
- Scheduled scaling: for known peaks (business hours, a sale) — pre-scale before demand.
- Predictive scaling: ML forecasts demand and pre-provisions — good for regular daily/weekly cycles.

Scale on the RIGHT metric: CPU is the reflex but often wrong — for a web tier scale on ALB request-count-per-target or p95 latency; for a worker fleet scale on SQS queue depth (the backlog is the true signal of user pain). Cooldowns, instance warmup, warm pools, and lifecycle hooks (graceful drain) prevent thrashing while new instances boot.

Scale-out vs scale-up vs scale-in: prefer scaling OUT (horizontal) for elasticity and no single big point of failure; keep instances stateless (state in RDS/DynamoDB/Redis) so any instance can be added or killed. Combine with a load balancer so new instances receive traffic and draining ones stop. Use spot + mixed-instances and right-sizing to cut cost.

Alternatives / the broader family:

- Serverless (Lambda, Fargate): scales to zero and up automatically with no capacity management — least ops, but cold starts and per-request limits.
- Container autoscaling: Kubernetes HPA scales pods; Cluster Autoscaler/Karpenter scale nodes; ECS service auto scaling for ECS.
- Application Auto Scaling: for DynamoDB throughput, Aurora read replicas, etc.
- Manual / over-provisioned: predictable and simple, but you pay for peak all the time and still get caught by unexpected spikes.

Pros/cons: elasticity + cost + resilience, but boot latency (mitigate with warm pools, pre-baked AMIs, or headroom), thrashing risk (cooldowns), a hard statelessness requirement, and — critically — auto scaling handles compute only; the database and downstream dependencies become the new bottleneck once the app tier scales freely.

Senior framing: autoscale on the metric that reflects user pain, design stateless, and plan for what breaks next (the DB, connection pools, a third-party API) — because scaling the easy tier just moves the ceiling.`,
    resources: [
      { key: 'r1', title: 'What is Amazon EC2 Auto Scaling? (docs)', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sqs-queue-types', order: 17,
    title: 'SQS Queue Types (Standard vs FIFO)',
    tagline: 'Throughput-and-at-least-once vs strict-order-and-exactly-once.',
    content: `Amazon SQS is a managed message queue with two types, and the trade-off between them is throughput-and-simplicity vs order-and-no-duplicates.

- Standard: nearly unlimited throughput, at-least-once delivery, best-effort ordering. A message can occasionally arrive more than once or out of order — so consumers MUST be idempotent (dedupe by a business key). Use for the vast majority of work queues.
- FIFO: exactly-once processing and strict ordering, at the cost of limited throughput (300 msg/s, 3,000 with batching, more in high-throughput mode). Ordering and dedup are scoped by MessageGroupId (same group = ordered and processed one at a time; different groups run in parallel), and a MessageDeduplicationId (or content-based dedup) suppresses duplicates within a 5-minute window.

Operational knobs (both): visibility timeout (how long a picked message is hidden so it isn't double-processed — must exceed processing time), long vs short polling (long polling cuts empty receives and cost), message retention (up to 14 days), delay queues, 256KB message size (use the extended client + S3 for bigger), and a dead-letter queue with a maxReceiveCount + redrive for poison messages. Even with FIFO's "exactly-once processing," still design idempotent consumers — belt and suspenders.

How it compares to the rest of the messaging landscape (a very common follow-up):

- SNS: pub/sub fan-out (one message → many subscribers). Pair SNS→SQS for fan-out + durable per-consumer queues.
- EventBridge: event bus with content-based routing, schemas, and SaaS/AWS event sources — good for decoupled, rule-routed events.
- Kafka / Kinesis: a distributed, replayable LOG, not a work queue. Ordered per partition, retains messages for a window, and lets many independent consumer groups read the same stream and replay from an offset. Choose it for event streaming, CDC, high throughput, and when multiple consumers need the same events.
- RabbitMQ: flexible routing (exchanges/bindings), multiple protocols, lower-level control — self-managed.

SQS vs Kafka in one line: SQS is a simple managed work queue where a message is deleted once acked (no replay, one logical consumer of each message); Kafka is a durable ordered log you can replay with many consumers — but you operate it (or MSK). Queue = commands/work distribution; log/stream = events/facts with replay.

Senior framing: default to Standard + idempotent consumers + a DLQ; reach for FIFO only when ordering or no-duplicates is a genuine correctness requirement (payments, sequential state machines); and if you need replay, multiple consumers, or event streaming, that's Kafka/Kinesis, not SQS.`,
    resources: [
      { key: 'r1', title: 'Amazon SQS queue types — Standard vs FIFO (docs)', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-types.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-cdn', order: 18,
    title: 'CDN',
    tagline: 'Serve content from the edge — lower latency, less origin load.',
    content: `A CDN (Content Delivery Network) is a geographically distributed network of edge/PoP servers that cache content close to users, so a request is served from a nearby edge instead of the distant origin. The wins: lower latency (fewer round trips over shorter distances), origin offload (the edge absorbs most traffic), resilience and DDoS/WAF protection, TLS termination at the edge, and modern transport (HTTP/2, HTTP/3).

How it works: anycast routes the user to the nearest PoP; a cache hierarchy (edge → regional / origin shield → origin) reduces origin hits; a cache KEY (usually URL + a few headers via Vary) decides what counts as "the same" request; and freshness is governed by TTL and revalidation (ETag / If-None-Match), with stale-while-revalidate serving slightly-stale content while it refreshes in the background.

What to cache — and what not:

- Great: static assets (images, CSS/JS, video, fonts) — especially with content-hashed filenames (app.3f9a.js) so they are immutable and can use a very long max-age.
- Careful: public, cacheable GET API/HTML responses (short TTLs, surrogate keys for targeted purge).
- Do NOT cache personalized/authenticated responses unless you use edge personalization, ESI, or signed cookies — a leaked private response across users is a real incident.

Control it with Cache-Control (public/private, max-age, s-maxage, no-store, immutable), Vary, and provider surrogate keys. The classic hard problem is invalidation/purge on deploy — solved cleanly by content-hashed URLs (never purge; just reference new filenames) and by tag/surrogate-key purges for dynamic content.

Alternatives and complements: the browser cache (free, closest of all), a reverse-proxy cache (nginx/Varnish) if you're single-region, and an application cache (Redis) for computed data behind the origin. A CDN complements these — it does not replace app-level caching.

Edge compute is the modern extension: Cloudflare Workers, Lambda@Edge, and Vercel Edge run logic at the PoP for auth, A/B tests, redirects, and personalization without a round trip to origin. Providers: CloudFront, Cloudflare, Akamai, Fastly (instant purge), Vercel.

Senior framing: cache as close to the user as you safely can; design the cache key and the invalidation strategy up front (not after an incident); make static assets immutable with content hashing + long TTL; be explicit about what must never be cached; and measure cache hit ratio and origin offload as first-class metrics.`,
    resources: [
      { key: 'r1', title: 'What is a CDN (Content Delivery Network)? — AWS', url: 'https://aws.amazon.com/what-is/cdn/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-optimistic-locking', order: 19,
    title: 'Optimistic Locking',
    tagline: 'Concurrency control that assumes conflicts are rare.',
    content: `The underlying problem is the lost update: two transactions read the same row, both modify it, and the second write silently overwrites the first. Concurrency control is how you prevent that, and optimistic vs pessimistic are two philosophies.

Optimistic locking assumes conflicts are rare and detects them at write time — no lock is held. The standard mechanism is a version column (or timestamp): read the row and its version, then update ... SET ..., version = version + 1 WHERE id = ? AND version = <value you read>. If someone updated it in between, the version no longer matches, zero rows are affected, you know there was a conflict, and you retry (re-read, re-apply, re-write). ORMs implement this for free (JPA/Hibernate @Version, Prisma's optimistic concurrency, DynamoDB ConditionExpression, HTTP ETag + If-Match at the API layer).

Pessimistic locking assumes conflict and prevents it by locking up front: SELECT ... FOR UPDATE takes a row lock so others block until you commit. It guarantees correctness under contention but reduces concurrency and risks deadlocks and lock-wait timeouts.

Pros / cons:

- Optimistic: no locks held → scales well, no deadlocks, great for distributed/stateless services and low-contention writes. But under HIGH contention it degrades into wasted work and retry storms (everyone retries, everyone conflicts again).
- Pessimistic: correct and predictable under high contention and when a redo is expensive, but serializes access, hurts throughput, and can deadlock; holding locks across a user "think time" is an anti-pattern.

Other tools in the same space (know these — they're often the better answer):

- Atomic conditional update: UPDATE accounts SET balance = balance - 10 WHERE id = ? AND balance >= 10. This avoids read-modify-write entirely and is usually the cleanest fix for counters/inventory.
- MVCC (Postgres): readers don't block writers; combined with the right isolation level it prevents many anomalies without explicit locks.
- Isolation levels: read-committed → repeatable-read → serializable trade concurrency for stronger guarantees; sometimes bumping the level is the fix.
- SELECT ... FOR UPDATE SKIP LOCKED: turns a table into a concurrent work queue.
- Distributed locks (Redis Redlock, ZooKeeper/etcd): coordinate across services when the DB can't — but they're a liability (clock skew, fencing tokens) and a last resort.
- Event sourcing / CRDTs: sidestep locking by making writes append-only or conflict-free-mergeable.

Decision guide: prefer an atomic conditional update when the operation allows it; use optimistic locking for typical web read-modify-write with low contention; use pessimistic only when conflicts are frequent AND redo is costly (seat/inventory booking); always bound retries with backoff and keep the operation idempotent.

Senior framing: name the anomaly you're preventing (lost update), then reach for the lightest correct tool — often an atomic DB update or optimistic versioning — and justify pessimistic locking only when contention data warrants it.`,
    resources: [
      { key: 'r1', title: 'Optimistic Offline Lock — Martin Fowler (P of EAA)', url: 'https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html', kind: 'article' },
      { key: 'r2', title: 'Pessimistic vs Optimistic Approach in DBMS (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dbms/difference-between-pessimistic-approach-and-optimistic-approach-in-dbms/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-docker-commands', order: 20,
    title: 'Docker Commands',
    tagline: 'The everyday Docker CLI you should recall cold.',
    content: `First the mental model, because the commands make sense once you have it: an image is an immutable, layered template built from a Dockerfile; a container is a running instance of an image with a thin writable layer on top. Layers are cached and shared, which is why command ordering matters.

The everyday CLI:

- Images: docker build -t app:tag .  ·  docker images  ·  docker pull/push <img>  ·  docker tag <src> <dst>  ·  docker rmi <img>.
- Run: docker run -d -p 8080:80 --name web --env-file .env app:tag  (flags: -d detach, -p publish port, -e/--env-file env, -v mount volume, --rm auto-remove, --restart).
- Inspect/debug: docker ps [-a]  ·  docker logs -f <c>  ·  docker exec -it <c> sh  (shell into a running container)  ·  docker inspect <c>  ·  docker stats  ·  docker cp.
- Lifecycle: docker stop/start/restart <c>  ·  docker rm <c>.
- Housekeeping: docker system prune -a  ·  docker volume ls/prune  ·  docker network ls.
- Compose (multi-container): docker compose up -d  ·  docker compose down  ·  docker compose logs -f  ·  docker compose ps.

Image/Dockerfile best practices (this is where seniority shows, not memorizing flags):

- Multi-stage builds: compile in a fat builder stage, copy only the artifact into a minimal runtime stage — small, secure final images.
- Order layers by change frequency: COPY package.json + install deps BEFORE copying source, so a code change doesn't bust the dependency-install cache.
- Small, pinned base images (alpine/distroless), a .dockerignore, run as a non-root USER, and one concern per container.
- Never bake secrets into ENV or layers (they persist in history); use build secrets / runtime injection.

Storage & networking: volumes come in bind mounts (host path), named volumes (managed, for data), and tmpfs (in-memory); networks are bridge (default, per-host), host, and overlay (multi-host/swarm).

Alternatives worth naming: Podman (daemonless, rootless, drop-in CLI), containerd/CRI-O as the runtimes Kubernetes actually uses, and Dockerfile-free builders (Cloud Native Buildpacks, Jib for Java, ko for Go). For orchestration, Docker Compose is enough for a single host / local dev; Kubernetes is for multi-host scheduling, self-healing, and autoscaling.

Security: scan images (docker scout, Trivy), use least privilege and read-only filesystems, and keep base images patched.

Senior framing: the commands are table stakes — the real signal is image hygiene (small, reproducible, secure, cache-efficient) and knowing where Docker stops and Kubernetes begins.`,
    resources: [
      { key: 'r1', title: 'Docker CLI reference (docs)', url: 'https://docs.docker.com/reference/cli/docker/', kind: 'docs' },
      { key: 'r2', title: 'Docker CLI Cheat Sheet (official PDF)', url: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-cicd', order: 21,
    title: 'CI/CD Pipelines',
    tagline: 'Automate build → test → deploy for fast, safe delivery.',
    content: `CI/CD is the automated path from commit to production, and the goal is frequent, small, low-risk changes with fast recovery.

- Continuous Integration (CI): every commit triggers a pipeline that builds and runs tests (unit, integration, contract) plus quality gates (lint, type-check, SAST/DAST, dependency & image scanning, coverage). The point is to catch breakage in minutes and keep main always releasable.
- Continuous Delivery: the same validated, immutable artifact is promoted through environments — build-once-promote-many, configured per environment (12-factor), never rebuilt per stage — with a manual approval before prod.
- Continuous Deployment: same as Delivery but prod ships automatically once gates pass.

Typical stages: checkout → build (one immutable artifact) → test pyramid → security/quality gates → package (container image) → push to registry → deploy (via IaC/GitOps) → post-deploy smoke/synthetic/canary analysis.

Deployment strategies and their rollback characteristics (a key comparison):

- Rolling: replace instances gradually. Simple, but a bad version is briefly live for some users and rollback is another rollout.
- Blue-green: run two full environments and flip the router. Instant switch and instant rollback, at the cost of double capacity.
- Canary: send 1% → 10% → 100% with automated metric analysis; smallest blast radius, best for risky changes, but needs good telemetry.
- Recreate: stop old, start new — downtime, only for non-critical/dev.
- Feature flags / dark launch: decouple deploy from release — ship code dark, enable per cohort, and "roll back" by flipping a flag without redeploying.

Delivery mechanism: push-based (Jenkins/GitHub Actions runs the deploy) vs GitOps (Argo CD/Flux — the cluster continuously reconciles to a Git-declared desired state; auditable, drift-detecting, easy rollback by reverting a commit). Branching model matters too: trunk-based development keeps CI fast and merges small; heavy GitFlow slows integration.

Tooling comparison: GitHub Actions (tight GitHub integration, marketplace), GitLab CI (all-in-one), Jenkins (ultra-flexible, self-managed, plugin sprawl), CircleCI/Buildkite; Argo/Flux for GitOps deploys.

Supply-chain security (increasingly asked): least-privilege runners, protected environments, signed artifacts (Sigstore/cosign), SBOMs, and SLSA provenance so you can trust what you ship.

Measure with DORA: deploy frequency, lead time for change, change-failure rate, and MTTR. Optimize the pipeline itself with caching, parallelization, and test selection so feedback stays fast.

Senior framing: make changes small, gated, and reversible; automate the quality/security gates; keep artifacts immutable and rollback trivial (blue-green or flags); measure with DORA; and treat the pipeline as production infrastructure — secure it, because it can push to prod.`,
    resources: [
      { key: 'r1', title: 'What is CI/CD? (GitLab)', url: 'https://about.gitlab.com/topics/ci-cd/', kind: 'article' },
      { key: 'r2', title: 'Continuous Integration (Martin Fowler)', url: 'https://martinfowler.com/articles/continuousIntegration.html', kind: 'article' },
      { key: 'r3', title: 'Understanding GitHub Actions (docs)', url: 'https://docs.github.com/en/actions/about-github-actions/understanding-github-actions', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-projects', order: 22,
    title: 'Presenting Your Projects',
    tagline: 'Turn "tell me about a project" into a structured, high-signal story.',
    content: `The "tell me about a project" question tests decision-making under constraints and communication — not your stack. Have two or three projects rehearsed as tight narratives, not feature tours.

A reliable structure (one sentence per beat, then depth on demand):

- Context: the business goal and constraints in one line (scale, deadline, budget, compliance).
- Problem: the hard technical challenge and why the naive approach failed — this is what makes it interesting.
- Your role: say "I", precisely — what you designed and decided vs what the team/others did.
- Architecture: the key components and data flow, whiteboard-able in 60 seconds.
- Trade-offs: what you chose AND what you gave up (the load-bearing decision).
- Impact: a number — latency cut, cost saved, scale reached, incidents down, revenue enabled.

Anticipate the deep-dive. A good interviewer pulls one thread — "why that database?", "how did it scale?", "what broke in production?", "what would you change now?" — so know your project's bottleneck, its failure modes, its cost, and the road not taken. Owning a decision's downsides signals seniority far more than a flawless story; a project with zero trade-offs reads as shallow or unowned.

Pick projects that span dimensions so you can answer any behavioral prompt: one for scale/performance, one for ambiguity/ownership (vague requirements, you brought clarity), one for leadership/conflict, and one for a failure and recovery. If your best project wasn't glamorous, frame the constraint and the judgment — a boring problem solved with sharp trade-offs beats a shiny one you can't defend.

For a lead / EM role, always prepare the people and process angle: how you drove alignment across product/QA/DevOps, mentored engineers, led an incident, cut scope under a deadline, or made a build-vs-buy call — explicitly balancing technical depth with delivery and business impact, because that balance is the job.

Common pitfalls to avoid: the feature tour, "we" with no "I", no numbers, no trade-offs, diving too deep too fast, and not reading whether the interviewer wants breadth or depth. The best answer leaves the interviewer wanting to pull a thread — and you have the depth waiting behind it.`,
    resources: [] },
  { ...DD, slug: 'prep1-dns', order: 23,
    title: 'DNS',
    tagline: 'How a hostname becomes an IP address.',
    content: `DNS (Domain Name System) is the internet's phone book: it resolves a human-readable hostname (google.com) into an IP address. It's a distributed, hierarchical, heavily-cached system — understanding the caching is the key to understanding it.

Resolution walks a cache hierarchy first: browser cache → OS stub resolver / hosts file → the configured recursive resolver (your ISP, or 1.1.1.1 / 8.8.8.8). On a miss, the recursive resolver does iterative queries down the tree: a root server points to the .com TLD server; the TLD server points to the authoritative nameserver for google.com; the authoritative server returns the record. Every layer caches the answer for its TTL (and caches misses too — negative caching), so most lookups never reach the authoritative servers. "Propagation delay" is a myth — what you're really waiting on is old TTLs expiring in caches.

Record types to know: A (IPv4), AAAA (IPv6), CNAME (alias to another name — not allowed at the zone apex, which is why providers offer ALIAS/ANAME), MX (mail), NS (delegation), SOA (zone metadata), TXT (verification/SPF/DKIM), SRV (service location), CAA (which CAs may issue certs), PTR (reverse).

DNS as a traffic-and-availability tool (the part interviewers care about): resolvers can return different answers to steer traffic — round-robin, weighted, latency-based, geolocation/geoproximity routing, and health-checked failover (e.g., Route 53). This makes DNS a global, cheap load balancer. The TTL is the core trade-off: low TTL = fast failover but more queries and less caching; high TTL = efficient but slow to react to changes. Anycast (many servers sharing one IP) and EDNS Client Subnet (helps CDNs pick a nearby edge) round it out.

DNS-based load balancing vs an L4/L7 load balancer: DNS is global and cheap but coarse and client-cached (no per-request control, stale entries linger); an LB is precise and per-request but regional. Real systems use both — DNS/GSLB to pick a region, an LB to pick an instance.

Security & internal use: DNSSEC (integrity/authenticity), DNS-over-HTTPS/TLS (privacy), and defenses against cache poisoning and domain hijacking. Internally, service discovery is "DNS for services" — Kubernetes CoreDNS, Consul, and Eureka resolve service names to healthy instances; split-horizon DNS serves different answers internally vs externally.

Senior framing: DNS is the first hop and a powerful but blunt steering/failover tool — know the TTL trade-off, health-checked failover, and that clients cache aggressively, so DNS changes are never instant.`,
    resources: [
      { key: 'r1', title: 'DNS (Domain Name System) — MDN Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/DNS', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-tcp', order: 24,
    title: 'TCP Protocol',
    tagline: 'Reliable, ordered, connection-oriented transport.',
    content: `TCP provides a reliable, ordered, connection-oriented byte stream over unreliable IP — the foundation HTTP, TLS, and most application protocols sit on. It guarantees bytes arrive, in order, without duplication.

Connection setup — the three-way handshake: client sends SYN (with an initial sequence number), server replies SYN-ACK, client sends ACK. Why three: both sides must agree on each other's initial sequence numbers and confirm the path works in both directions, while rejecting old duplicate SYNs. Teardown is a four-way handshake (FIN/ACK each way), leaving the initiator in TIME_WAIT briefly to absorb stray packets.

How it delivers its guarantees:

- Reliability: every byte has a sequence number; the receiver sends cumulative ACKs; unacknowledged data is retransmitted (on RTO timeout or fast-retransmit after 3 duplicate ACKs). SACK lets the receiver acknowledge non-contiguous ranges.
- Flow control: the receive window (sliding window) stops a fast sender from overwhelming a slow receiver.
- Congestion control: slow start, congestion avoidance (AIMD), and fast recovery back off when the network is congested. The algorithm matters — CUBIC is the default; BBR (models bandwidth/RTT) often does better on long-fat or lossy links.

Latency reality: the handshake costs a round trip, and TLS adds one or two more on top — which is why connection reuse, keep-alive, connection pools, TLS session resumption, and 0-RTT matter so much. Tuning knobs: Nagle's algorithm vs TCP_NODELAY, delayed ACKs, and MSS/MTU with path-MTU discovery.

The big weakness — head-of-line blocking: because TCP delivers bytes strictly in order, one lost segment stalls everything behind it. When you multiplex many logical streams over one TCP connection (HTTP/2), a single packet loss blocks all streams. That's the core reason HTTP/3 moved to QUIC over UDP, which multiplexes independent streams (loss on one doesn't block others), builds in TLS 1.3, does 0-RTT, and supports connection migration across network changes.

TCP vs UDP: UDP is connectionless, unreliable, and unordered but low-overhead — better for real-time media, DNS, gaming, and QUIC, where a dropped packet beats a delayed one. TCP when correctness and order matter; UDP (or QUIC) when latency matters more than perfect delivery.

Senior framing: TCP's guarantees are bought with round trips and in-order delivery (HOL blocking); in high-latency or mobile contexts QUIC/HTTP-3 wins. Know the handshake cost and its mitigations (pooling, keep-alive, HTTP/2/3, TLS resumption), and reach for UDP when you can tolerate loss.`,
    resources: [
      { key: 'r1', title: 'TCP (Transmission Control Protocol) — MDN Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/TCP', kind: 'docs' },
      { key: 'r2', title: 'How TCP really works — three-way handshake (video)', url: 'https://www.youtube.com/watch?v=rmFX1V49K8U', kind: 'video' },
    ] },
  { ...DD, slug: 'prep1-google-works', order: 25,
    title: 'How google.com Works (End-to-End)',
    tagline: 'What happens when you type a URL and press enter.',
    content: `This is the classic "tie it all together" question — its value is showing the whole stack and being able to go deep on any layer the interviewer probes. The end-to-end flow:

- URL parse: the browser parses scheme/host/path and checks its HSTS list (force HTTPS before any request goes out).
- DNS resolution: browser → OS → recursive resolver caches, else root → .com TLD → authoritative servers turn google.com into an IP — usually the nearest edge via anycast + geo routing.
- TCP + TLS: a TCP three-way handshake opens a connection to that IP (typically a CDN edge or load balancer), then a TLS 1.3 handshake negotiates encryption and validates the certificate. With HTTP/3 this is QUIC over UDP with 0-RTT, collapsing several round trips.
- HTTP request: the browser sends GET / with headers (cookies, Accept, etc.). An L7 load balancer routes to a healthy backend; the CDN serves cacheable static assets straight from the edge.
- Server processing: the backend authenticates/authorizes, runs business logic across microservices, hits caches (Redis) and databases, and returns HTML plus cache headers.
- Browser rendering (critical rendering path): parse HTML → DOM; parse CSS → CSSOM; execute JS (which can mutate both and is render-blocking unless async/defer); combine into the render tree; layout (positions) → paint → composite. Meanwhile it discovers and fetches sub-resources (CSS, JS, images, fonts), multiplexed over HTTP/2/3.

Where to go deep when they pull a thread:

- Transport/protocol: HTTP/1.1 (head-of-line blocking, connection-per-request) vs HTTP/2 (multiplexing, but TCP-level HOL blocking) vs HTTP/3 (QUIC, per-stream independence, connection migration).
- Load balancing: L4 vs L7, and DNS/GSLB to pick a region before the LB picks an instance.
- Caching at every layer: browser cache, DNS cache, CDN edge, application cache, and DB query/result cache — each with its own TTL and invalidation.
- Rendering & performance: the critical rendering path, reflow vs repaint, and Core Web Vitals (LCP, CLS, INP); preconnect/preload, code splitting, and SSR vs CSR vs SSG/ISR trade-offs for time-to-content.
- Security touchpoints: TLS/HSTS, CSP, CORS, and SameSite cookies.

Senior framing: this is the "map of the internet plus the browser." Strong answers name each layer, call out the trade-offs (HTTP/2 vs 3, SSR vs CSR, where to cache), and can pivot into any one — tying it back to latency (round trips, the render path) and reliability (failover, caching).`,
    resources: [
      { key: 'r1', title: 'what-happens-when — the canonical explainer (GitHub)', url: 'https://github.com/alex/what-happens-when', kind: 'article' },
      { key: 'r2', title: 'How browsers work — Populating the page (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work', kind: 'docs' },
      { key: 'r3', title: 'What happens when you type google.com and press enter (video)', url: 'https://www.youtube.com/watch?v=dh406O2v_1c', kind: 'video' },
    ] },
];

export const prep1Modules = [...jdFocusModules, ...deepDiveModules];
