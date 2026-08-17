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
    content: `Problem: given a list of intervals [start, end], merge all overlapping ones. Example: [[1,3],[2,6],[8,10]] → [[1,6],[8,10]].

Approach: sort the intervals by start time — this is the key insight, because once sorted, any overlap is only with the previous merged interval. Walk the list keeping a "current" interval; if the next interval's start <= current end, they overlap, so extend current.end = max(current.end, next.end); otherwise push current and start a new one.

Complexity: O(n log n) time (dominated by the sort) and O(n) output space (O(1) extra if you merge in place). The pattern generalizes to "insert interval", "meeting rooms" (min rooms = max concurrent intervals, solved with a sweep line or a min-heap of end times), and "interval intersection".`,
    resources: [
      { key: 'r1', title: 'Merge Intervals — LeetCode #56', url: 'https://leetcode.com/problems/merge-intervals/', kind: 'docs' },
      { key: 'r2', title: 'Merge Overlapping Intervals (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dsa/merging-intervals/', kind: 'article' },
      { key: 'r3', title: 'Merge Intervals — LeetCode 56 (NeetCode, video)', url: 'https://www.youtube.com/watch?v=44H3cEC2fFM', kind: 'video' },
    ] },
  { ...DD, slug: 'prep1-scale-node', order: 11,
    title: 'Scaling a Node.js Application',
    tagline: 'Beat the single thread: cluster, worker threads, and horizontal scale.',
    content: `Node runs your JavaScript on a single thread with an event loop, so it scales beautifully for I/O-bound work but a single CPU-bound task blocks every request. Scaling has three levers.

Use all cores on one box: the cluster module (or PM2 in cluster mode) forks one worker process per CPU core behind a shared port, so N cores serve N processes. For CPU-heavy work inside a process (crypto, image/PDF processing, big JSON), offload to worker_threads or a separate service/queue — never block the event loop inline.

Scale horizontally: Node processes are stateless and single-threaded, so run many instances (containers/pods) behind a load balancer and externalize all state — sessions, cache, rate-limit counters — to Redis or the DB. This is the 12-factor stateless-process model and what makes Kubernetes autoscaling work.

Then the usual multipliers: cache hot reads (Redis), push slow/spiky work to a queue so bursts buffer instead of toppling the API, use connection pooling, stream large payloads, and keep the event loop unblocked. Measure with p95/p99 and the event-loop lag metric before scaling.`,
    resources: [
      { key: 'r1', title: 'Node.js Cluster API (docs)', url: 'https://nodejs.org/api/cluster.html', kind: 'docs' },
      { key: 'r2', title: 'Node.js Worker Threads API (docs)', url: 'https://nodejs.org/api/worker_threads.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-dynamodb', order: 12,
    title: 'DynamoDB',
    tagline: 'Key-value/document store: keys, partitions, indexes, and access-pattern-first design.',
    content: `DynamoDB is a fully-managed NoSQL key-value/document database with single-digit-millisecond latency at any scale. Data lives in tables of items; each item has a primary key that is either a partition key alone, or a partition key + sort key (composite). The partition key is hashed to place the item on a physical partition; the sort key orders items within a partition and enables range queries.

The golden rule: model for your access patterns, not your entities. Because there are no joins, you often use single-table design — storing multiple entity types in one table with carefully designed keys — and Global Secondary Indexes (GSIs) to support additional query patterns (a GSI is another partition/sort key over the same data). Local Secondary Indexes (LSIs) share the partition key but add an alternate sort key.

Know the trade-offs: reads are eventually consistent by default (strongly consistent reads cost more and aren't available on GSIs); capacity is provisioned or on-demand; and the classic failure is a hot partition — a partition key with skewed access (e.g., "status = ACTIVE") that concentrates traffic. Fix with a higher-cardinality key or write-sharding a suffix.`,
    resources: [
      { key: 'r1', title: 'DynamoDB Core Components (tables, keys, partitions)', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html', kind: 'docs' },
      { key: 'r2', title: 'Best Practices for Designing & Architecting with DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sql-scaling', order: 13,
    title: 'SQL Scaling',
    tagline: 'From a single node to replicas, partitioning, and sharding.',
    content: `Scale a relational database in a deliberate ladder. Start vertical (bigger box) — cheap runway but a hard ceiling. Then attack the two dimensions separately.

Scale reads with read replicas: the primary handles writes and replicates asynchronously to replicas that serve reads. This offloads read-heavy load (reporting, feeds) but introduces replication lag, so route read-after-write to the primary when freshness matters.

Reduce work with caching (Redis in front of hot reads) and connection pooling (databases have limited connections; a pooler like PgBouncer is essential in serverless). Partition large tables (by range or hash) so queries and maintenance touch smaller chunks.

Scale writes with sharding — horizontally split the data across independent database nodes by a shard key. This is the big, expensive step: it breaks cross-shard joins and transactions and makes resharding painful, so it's a last resort after replicas, caching, and partitioning. For read/write separation at the app layer, CQRS splits the read and write models.`,
    resources: [
      { key: 'r1', title: 'Read replicas — Amazon RDS (docs)', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html', kind: 'docs' },
      { key: 'r2', title: "Sharding vs. partitioning — what's the difference? (PlanetScale)", url: 'https://planetscale.com/blog/sharding-vs-partitioning-whats-the-difference', kind: 'article' },
      { key: 'r3', title: 'Database Sharding vs Replication (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/difference-between-database-sharding-and-replication/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-partition-key', order: 14,
    title: 'Partition Key',
    tagline: 'The field that decides where data lives — and whether you get hot partitions.',
    content: `A partition key is the attribute a distributed store hashes to decide which partition/node an item lives on (DynamoDB partition key, Kafka partition key, Cassandra partition key, a shard key in general). It determines data distribution and, therefore, whether load is even or lopsided.

A good partition key has three properties: high cardinality (many distinct values), even access distribution (no single value gets a disproportionate share of traffic), and query locality (items you read together share a key so you avoid scatter-gather). userId or orderId are usually good; a low-cardinality flag like "region" or "status" is bad because it concentrates traffic.

The failure mode is the hot partition (or hot key): a value that receives far more reads/writes than others, throttling one partition while others sit idle. Fixes: choose a higher-cardinality key, use a composite key (partition + sort), or write-shard by appending a suffix (e.g., userId#00..09) and fanning reads across the suffixes. In Kafka the same idea controls ordering — messages with the same key go to the same partition and keep their order.`,
    resources: [
      { key: 'r1', title: 'Designing Partition Keys (avoid hot partitions) — DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html', kind: 'docs' },
      { key: 'r2', title: 'Partitions and Data Distribution — DynamoDB', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sharding', order: 15,
    title: 'Sharding',
    tagline: 'Horizontal partitioning across nodes to scale writes and data size.',
    content: `Sharding splits one logical dataset across multiple independent database nodes (shards), each holding a subset of the rows, so you scale write throughput and total data size beyond one machine.

Strategies: range-based (shard by key ranges — simple, but risks hotspots and uneven growth); hash-based (hash the shard key for even distribution — the default, but range queries scatter across shards); directory/lookup (a lookup table maps keys to shards — flexible, but the lookup is a dependency); and geo/entity-based (shard by region or tenant).

The costs are real and worth naming in an interview: cross-shard joins and transactions become hard or impossible; queries without the shard key must scatter-gather; rebalancing/resharding as you add nodes is operationally painful (consistent hashing helps); and a poorly chosen shard key produces hot shards. So the guidance is: exhaust read replicas, caching, and partitioning first, and only shard when a single primary genuinely can't hold the write volume — then pick a high-cardinality shard key aligned to your dominant query.`,
    resources: [
      { key: 'r1', title: 'Database Sharding — A System Design Concept (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/database-sharding-a-system-design-concept/', kind: 'article' },
      { key: 'r2', title: 'Sharding — MongoDB Manual (docs)', url: 'https://www.mongodb.com/docs/manual/sharding/', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-auto-scaling', order: 16,
    title: 'Auto Scaling (AWS)',
    tagline: 'Match capacity to demand automatically — out and in.',
    content: `AWS EC2 Auto Scaling keeps the right number of instances running to meet demand. An Auto Scaling Group (ASG) has a launch template (what to launch), a min / max / desired capacity, and spans multiple Availability Zones for resilience. It replaces unhealthy instances automatically using EC2 or ELB health checks.

Scaling policies decide when to change capacity: target tracking (keep a metric like average CPU or requests-per-target at a target value — the simplest and usually best), step scaling (add/remove N instances at metric thresholds), and scheduled scaling (predictable peaks, e.g., business hours). Cooldowns/warmup prevent thrashing while new instances boot.

In an interview, connect it to the bigger picture: put the ASG behind an Application Load Balancer so new instances get traffic and unhealthy ones are drained; keep instances stateless (state in RDS/DynamoDB/Redis) so any instance can be added or killed; and remember auto scaling handles compute — the database tier scales separately (replicas/sharding). Beyond EC2, the same idea appears as the Kubernetes Horizontal Pod Autoscaler and Application Auto Scaling for other services.`,
    resources: [
      { key: 'r1', title: 'What is Amazon EC2 Auto Scaling? (docs)', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-sqs-queue-types', order: 17,
    title: 'SQS Queue Types (Standard vs FIFO)',
    tagline: 'Throughput-and-at-least-once vs strict-order-and-exactly-once.',
    content: `Amazon SQS offers two queue types. Standard queues give nearly unlimited throughput, at-least-once delivery, and best-effort ordering — a message can occasionally be delivered more than once and out of order. So consumers must be idempotent (dedupe by a business key), which is good practice anyway.

FIFO queues give exactly-once processing and strict ordering, at the cost of limited throughput (300 messages/sec, or up to 3,000 with batching; higher with high-throughput mode). Ordering and dedup are scoped by MessageGroupId (messages in the same group are ordered; different groups process in parallel), and a MessageDeduplicationId (or content-based dedup) suppresses duplicates within a 5-minute window.

Choose Standard when scale and throughput matter and you can tolerate/handle duplicates and reordering (most work queues). Choose FIFO when order and no-duplicates are correctness requirements (financial transactions, sequential state changes). For both, know the operational knobs: visibility timeout (how long a picked message is hidden so it isn't double-processed), long polling (reduce empty receives), and a dead-letter queue for messages that fail repeatedly.`,
    resources: [
      { key: 'r1', title: 'Amazon SQS queue types — Standard vs FIFO (docs)', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-types.html', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-cdn', order: 18,
    title: 'CDN',
    tagline: 'Serve content from the edge — lower latency, less origin load.',
    content: `A CDN (Content Delivery Network) is a geographically distributed network of edge/PoP servers that cache content close to users, so a request is served from a nearby edge instead of the distant origin. That cuts latency, absorbs load off the origin, and adds resilience and DDoS protection.

It's ideal for static assets (images, CSS/JS, video) and cacheable API/HTML responses. Caching is controlled by TTL and cache headers (Cache-Control, ETag), with cache invalidation/purge when content changes — the classic hard problem. Techniques worth naming: origin shield (a mid-tier cache that protects the origin from many edges missing at once), cache-key design (what makes two requests "the same"), and stale-while-revalidate for smooth updates.

In a system design, put a CDN in front of static content and the load balancer, cache what you safely can at the edge, and be explicit about what must NOT be cached (personalized/authenticated responses) and how you invalidate on deploy.`,
    resources: [
      { key: 'r1', title: 'What is a CDN (Content Delivery Network)? — AWS', url: 'https://aws.amazon.com/what-is/cdn/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-optimistic-locking', order: 19,
    title: 'Optimistic Locking',
    tagline: 'Concurrency control that assumes conflicts are rare.',
    content: `Optimistic locking lets concurrent transactions proceed without holding a lock, and detects conflicts at write time. The standard mechanism is a version column (or timestamp): you read the row and its version, and on update you write WHERE id = ? AND version = <the value you read>, incrementing version. If another transaction updated the row in between, the version no longer matches, zero rows are affected, and you know there was a conflict — so you fail and retry (re-read, re-apply, re-write).

Pessimistic locking is the opposite: you lock the row up front (SELECT ... FOR UPDATE), blocking others until you commit. It prevents conflicts but reduces concurrency and risks deadlocks and lock contention.

Choose optimistic when conflicts are rare (most web workloads) — it scales better because nothing is held. Choose pessimistic when contention is high or a conflict is very expensive to redo (e.g., decrementing scarce inventory), where retrying repeatedly would be worse than waiting. ORMs (JPA/Hibernate @Version, Prisma, etc.) implement optimistic locking with a version field out of the box.`,
    resources: [
      { key: 'r1', title: 'Optimistic Offline Lock — Martin Fowler (P of EAA)', url: 'https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html', kind: 'article' },
      { key: 'r2', title: 'Pessimistic vs Optimistic Approach in DBMS (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dbms/difference-between-pessimistic-approach-and-optimistic-approach-in-dbms/', kind: 'article' },
    ] },
  { ...DD, slug: 'prep1-docker-commands', order: 20,
    title: 'Docker Commands',
    tagline: 'The everyday Docker CLI you should recall cold.',
    content: `Images: docker build -t app:tag .  ·  docker images  ·  docker pull <img>  ·  docker push <img>  ·  docker rmi <img>  ·  docker tag <src> <dst>.

Containers: docker run -d -p 8080:80 --name web --env-file .env app:tag  (flags: -d detach, -p publish port, -e/--env-file env, -v mount volume, --rm auto-remove)  ·  docker ps [-a]  ·  docker stop/start/restart <c>  ·  docker rm <c>  ·  docker exec -it <c> sh  (open a shell in a running container)  ·  docker logs -f <c>  ·  docker inspect <c>.

Housekeeping: docker system prune -a (reclaim space)  ·  docker volume ls / prune  ·  docker network ls.

Compose (multi-container): docker compose up -d  ·  docker compose down  ·  docker compose logs -f  ·  docker compose ps.

Interview framing: an image is an immutable, layered template built from a Dockerfile; a container is a running instance of an image. Layer ordering matters for build-cache efficiency (copy package manifests and install deps before copying source), and multi-stage builds keep the final image small by dropping build-time tooling.`,
    resources: [
      { key: 'r1', title: 'Docker CLI reference (docs)', url: 'https://docs.docker.com/reference/cli/docker/', kind: 'docs' },
      { key: 'r2', title: 'Docker CLI Cheat Sheet (official PDF)', url: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-cicd', order: 21,
    title: 'CI/CD Pipelines',
    tagline: 'Automate build → test → deploy for fast, safe delivery.',
    content: `Continuous Integration (CI): every commit triggers an automated pipeline that builds the code and runs tests (unit, integration, contract) plus quality gates (lint, type-check, SAST, dependency/image scanning). The point is to catch breakage in minutes and keep main always releasable.

Continuous Delivery/Deployment (CD): the same validated, immutable artifact is promoted through environments (build-once-promote-many, 12-factor) — dev → staging → prod — configured per environment, never rebuilt per stage. Delivery keeps a manual approval before prod; Deployment ships automatically once gates pass.

Safe deploys are the architect's concern: progressive delivery (canary or blue-green) with automated health checks and automatic rollback on SLO breach, so a bad release affects 1% before 100%; feature flags decouple deploy from release. Typical stages: checkout → build → test → scan → package (container image) → push to registry → deploy (via GitOps/IaC) → smoke test.

Measure the pipeline with DORA metrics — deploy frequency, lead time, change-fail rate, MTTR — because the goal is frequent, small, low-risk changes with fast recovery. Tools: GitHub Actions / GitLab CI / Jenkins for orchestration; Argo/Flux for GitOps deploys.`,
    resources: [
      { key: 'r1', title: 'What is CI/CD? (GitLab)', url: 'https://about.gitlab.com/topics/ci-cd/', kind: 'article' },
      { key: 'r2', title: 'Continuous Integration (Martin Fowler)', url: 'https://martinfowler.com/articles/continuousIntegration.html', kind: 'article' },
      { key: 'r3', title: 'Understanding GitHub Actions (docs)', url: 'https://docs.github.com/en/actions/about-github-actions/understanding-github-actions', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-projects', order: 22,
    title: 'Presenting Your Projects',
    tagline: 'Turn "tell me about a project" into a structured, high-signal story.',
    content: `Have two or three projects ready, each rehearsed as a tight narrative — not a feature tour. A reliable structure: context (the business goal and constraints in one sentence) → problem (the hard technical challenge and why the naive approach failed) → your role (say "I", precisely — what you designed/decided vs the team) → architecture (the key components and data flow, whiteboard-able) → the load-bearing trade-offs (what you chose and, crucially, what you gave up) → impact (a number: latency cut, cost saved, scale reached, incidents down).

Anticipate the deep-dive. Interviewers pull one thread — "why that database?", "how did it scale?", "what broke in production?" — so know your project's bottleneck, its failure modes, and what you'd do differently now. Owning a decision's downsides signals seniority far more than a flawless story; a project with no trade-offs reads as shallow.

For a lead/EM role, also prepare the people/process angle: how you drove alignment, mentored, handled an incident, or cut scope under a deadline — balancing technical depth with delivery and business impact.`,
    resources: [] },
  { ...DD, slug: 'prep1-dns', order: 23,
    title: 'DNS',
    tagline: 'How a hostname becomes an IP address.',
    content: `DNS (Domain Name System) is the internet's phone book: it resolves a human-readable hostname (google.com) into an IP address. Resolution walks a cache hierarchy first: browser cache → OS stub resolver / hosts file → the configured recursive resolver (often your ISP or 1.1.1.1 / 8.8.8.8).

On a cache miss, the recursive resolver queries the hierarchy: a root nameserver returns the TLD server for .com; the TLD server returns the authoritative nameserver for google.com; the authoritative server returns the actual record. That's a recursive resolver doing iterative queries on your behalf. Results are cached at each layer for the record's TTL, so most lookups never reach the authoritative servers.

Know the common record types: A (IPv4), AAAA (IPv6), CNAME (alias to another name), MX (mail), NS (delegation), TXT (verification/SPF). And know that DNS is also a scaling/availability tool — round-robin and geo/latency-based routing (e.g., Route 53) distribute traffic, and low TTLs enable faster failover at the cost of more lookups.`,
    resources: [
      { key: 'r1', title: 'DNS (Domain Name System) — MDN Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/DNS', kind: 'docs' },
    ] },
  { ...DD, slug: 'prep1-tcp', order: 24,
    title: 'TCP Protocol',
    tagline: 'Reliable, ordered, connection-oriented transport.',
    content: `TCP (Transmission Control Protocol) provides a reliable, ordered, connection-oriented byte stream over unreliable IP. It guarantees that bytes arrive, in order, without duplication — the foundation HTTP, TLS, and most application protocols sit on.

A connection starts with the three-way handshake: client sends SYN (with an initial sequence number), server replies SYN-ACK, client sends ACK — now both sides agree on sequence numbers and the connection is established. Every byte is numbered with sequence numbers and acknowledged with ACKs; unacknowledged data is retransmitted, giving reliability. Flow control (the receive window) stops a fast sender from overwhelming a slow receiver, and congestion control (slow start, congestion avoidance) backs off when the network is congested. Closing uses a four-way handshake (FIN/ACK each way).

Contrast with UDP, which is connectionless and unreliable but low-overhead — better for real-time media, DNS, and gaming where a dropped packet beats a delayed one. Interview hooks: the handshake adds a round trip of latency (why connection reuse / keep-alive and HTTP/2 multiplexing matter), and head-of-line blocking in TCP is part of why HTTP/3 moved to QUIC over UDP.`,
    resources: [
      { key: 'r1', title: 'TCP (Transmission Control Protocol) — MDN Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/TCP', kind: 'docs' },
      { key: 'r2', title: 'How TCP really works — three-way handshake (video)', url: 'https://www.youtube.com/watch?v=rmFX1V49K8U', kind: 'video' },
    ] },
  { ...DD, slug: 'prep1-google-works', order: 25,
    title: 'How google.com Works (End-to-End)',
    tagline: 'What happens when you type a URL and press enter.',
    content: `This is the classic "tie it all together" question. The flow:

1. URL parse: the browser splits scheme/host/path and checks HSTS (force HTTPS).
2. DNS resolution: browser/OS/resolver caches, then root → TLD → authoritative servers turn google.com into an IP (often the nearest edge/anycast address).
3. TCP + TLS: a TCP three-way handshake opens a connection to that IP (usually to a CDN edge or load balancer), then a TLS handshake negotiates encryption and validates the certificate.
4. HTTP request: the browser sends GET / with headers (cookies, accept, etc.). A load balancer routes it to a healthy server; a CDN may serve cached static assets from the edge.
5. Server processing: the backend authenticates, runs business logic, hits caches/databases, and returns an HTTP response (HTML), plus cache headers.
6. Browser rendering: parse HTML → build the DOM; parse CSS → CSSOM; run JS (which can modify both); combine into the render tree; layout (compute positions) then paint and composite. Meanwhile it fetches sub-resources (CSS, JS, images, fonts) over the same/new connections (HTTP/2 multiplexing).

The value of the answer is showing the layers — DNS, transport (TCP/TLS), application (HTTP), infrastructure (LB/CDN/cache/DB), and rendering — and being able to go deep on any one when the interviewer pulls the thread.`,
    resources: [
      { key: 'r1', title: 'what-happens-when — the canonical explainer (GitHub)', url: 'https://github.com/alex/what-happens-when', kind: 'article' },
      { key: 'r2', title: 'How browsers work — Populating the page (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work', kind: 'docs' },
      { key: 'r3', title: 'What happens when you type google.com and press enter (video)', url: 'https://www.youtube.com/watch?v=dh406O2v_1c', kind: 'video' },
    ] },
];

export const prep1Modules = [...jdFocusModules, ...deepDiveModules];
