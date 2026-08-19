// Architecture Algorithms & Patterns — must-know algorithms/patterns for an architect.
// Deep-dive written lessons (mechanics, variants, pros/cons, when-to-use) + verified links.

const AL = { course: 'algorithms', badge: 'Architecture', priority: 3 };

export const algorithmsModules = [
  { ...AL, slug: 'algo-noisy-neighbor', order: 1,
    title: 'The Noisy Neighbor Problem',
    tagline: 'One tenant degrading everyone else on shared infrastructure.',
    content: `In any multi-tenant or shared-resource system, the "noisy neighbor" is a tenant (or job) whose heavy usage degrades others because they share something finite: CPU, memory, disk I/O, network bandwidth, a database connection pool, a message queue, or a hot partition. It shows up in SaaS platforms, containers on one host, shared databases, and shared caches — and it's fundamentally a fairness + isolation problem.

Root causes: shared resources with no per-tenant limits, a runaway query or batch job, an unbounded connection pool, or a skewed/hot partition key that concentrates one tenant's load.

Mitigations, from cheapest to strongest:

- Resource quotas & limits: cgroups / Kubernetes requests+limits, per-tenant rate limits, capped connection pools, query timeouts. Stops any one tenant from monopolizing a resource.
- Fair scheduling: per-tenant queues with weighted fair queuing, or a token bucket per tenant, so backlog builds on the noisy tenant's queue — not the shared one.
- Bulkheads: separate thread/connection pools per tenant or dependency, so one tenant's exhaustion can't starve the rest.
- Isolation tiers: shared-everything → shared DB with separate schema → pooled → silo (dedicated infra per tenant). More isolation = more cost; pick the tier per customer segment.
- Shuffle sharding / cell-based architecture: split the fleet into cells, and give each tenant a random small subset of workers (shuffle sharding). Overlap between any two tenants is tiny, so a noisy tenant's blast radius is bounded to a handful of others — a powerful AWS technique.
- Detect & isolate: per-tenant metrics (the only way to even see it), then throttle or move the offender.

Trade-offs: full silo isolation is the safest but most expensive and operationally heavy; pooled multi-tenancy is cheap but risky without limits. The architect's job is to choose isolation per tier and bound blast radius.

Senior framing: instrument per-tenant, cap per-tenant, and use shuffle sharding or cells to limit blast radius. It ties directly into rate limiting (per-tenant quotas) and load balancing (spreading load) — treat it as a first-class design concern in any multi-tenant platform, not an afterthought.`,
    resources: [
      { key: 'r1', title: 'Noisy Neighbor antipattern (Microsoft Azure Architecture)', url: 'https://learn.microsoft.com/en-us/azure/architecture/antipatterns/noisy-neighbor/noisy-neighbor', kind: 'docs' },
      { key: 'r2', title: 'Shuffle sharding: massive fault isolation (AWS Builders Library)', url: 'https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/', kind: 'article' },
      { key: 'r3', title: 'SaaS tenant isolation strategies (AWS whitepaper)', url: 'https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html', kind: 'docs' },
    ] },

  { ...AL, slug: 'algo-rate-limiting', order: 2,
    title: 'Rate Limiting Algorithms',
    tagline: 'Token bucket, leaky bucket, fixed & sliding windows.',
    content: `Rate limiting caps how many requests a client can make in a time window — to protect against overload and abuse, enforce fairness and quotas, control cost, and blunt DDoS. Know the five core algorithms and their trade-offs cold, because this is one of the most common architecture questions.

- Fixed Window Counter: count requests per fixed window (e.g. per minute) with a simple counter. Tiny memory, dead simple. Flaw: bursts at window boundaries — a client can send 2x the limit across the seam of two windows.
- Sliding Window Log: store a timestamp per request and count those within the trailing window. Perfectly accurate. Cost: memory grows with request volume (O(requests)).
- Sliding Window Counter: approximate the trailing window by weighting the current and previous fixed-window counts. Near-accurate with O(1) memory — the usual production sweet spot.
- Token Bucket: tokens refill at rate r into a bucket of capacity b; each request consumes a token, and requests are rejected when empty. Allows controlled bursts up to b while enforcing an average rate. The most popular choice (used across API gateways and AWS) because it's flexible and burst-friendly.
- Leaky Bucket: requests enter a queue that drains at a fixed rate; overflow is dropped. Smooths bursty input into a steady output — ideal for traffic shaping toward a downstream that needs a constant rate. Cost: added latency and drops under sustained overload.

Distributed rate limiting is the hard part: with many app instances, the counter must be shared. Keep it in Redis with atomic operations (INCR or a Lua script) so all instances see one count; accept a small over-limit for availability (a CAP trade-off), or use per-instance limits that sum to the global budget.

Practicalities: enforce at the edge (API gateway / CDN), key by user / IP / API-key, offer tiered limits, and respond with HTTP 429 + a Retry-After header. Pair rate limiting with backpressure and load shedding.

Senior framing: token bucket for bursty APIs, leaky bucket for smoothing to a steady downstream, sliding-window-counter when accuracy matters at low memory; implement it in Redis for a distributed fleet; and always return 429 with Retry-After so clients back off gracefully.`,
    resources: [
      { key: 'r1', title: 'Rate Limiting Algorithms — System Design (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/rate-limiting-algorithms-system-design/', kind: 'article' },
      { key: 'r2', title: 'Scaling your API with rate limiters (Stripe Engineering)', url: 'https://stripe.com/blog/rate-limiters', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-load-balancing', order: 3,
    title: 'Load Balancing Algorithms',
    tagline: 'Round robin, least connections, hashing, power-of-two-choices.',
    content: `A load balancer spreads traffic across servers for scale and availability. First distinguish L4 (TCP/UDP — fast, no application awareness) from L7 (HTTP-aware — path/host routing, TLS termination, header inspection). Then the algorithm decides which server gets each request.

- Round Robin: rotate through servers evenly. Simple and fair when servers are identical; ignores actual load and capacity.
- Weighted Round Robin: assign weights by server capacity — good for heterogeneous fleets (bigger boxes get more).
- Least Connections: send to the server with the fewest active connections. Adapts to real load; great for long-lived connections (websockets, DB proxies).
- Weighted Least Connections: least-connections biased by capacity.
- Least Response Time: combine fewest connections with lowest measured latency — routes away from slow/degraded nodes.
- IP Hash / key hash: hash the client IP or a key to pick a server, giving session affinity (stickiness). Simple stickiness, but uneven under skew and it reshuffles when servers change.
- Consistent Hashing: minimal remapping when servers are added/removed — the right choice for sharded backends and caches (see the Consistent Hashing lesson).
- Power of Two Choices (P2C): pick two servers at random and send to the less loaded. With almost no global state it gets near-optimal balancing and avoids the herd effect of "always pick the least loaded" (where everyone piles onto the same node). Often EWMA-latency-based; used by Envoy, Finagle, and modern meshes.
- Random / Weighted Random: cheap baseline, surprisingly decent at scale.

Around the algorithm you need health checks (eject unhealthy nodes), connection draining (graceful removal), and a stickiness decision: prefer stateless (JWT + externalized session) over sticky sessions, which undermine even balancing and complicate failover.

Senior framing: round robin or least-connections handle most cases; Power of Two Choices is the modern default for load-aware balancing without global coordination; consistent hashing for sharded/cache backends; and design stateless so any node can serve any request.`,
    resources: [
      { key: 'r1', title: 'Load Balancing Algorithms (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/load-balancing-algorithms/', kind: 'article' },
      { key: 'r3', title: 'Load balancing overview (Microsoft Azure Architecture)', url: 'https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/load-balancing-overview', kind: 'docs' },
    ] },

  { ...AL, slug: 'algo-consistent-hashing', order: 4,
    title: 'Consistent Hashing',
    tagline: 'Add or remove a node and remap only K/N keys, not everything.',
    content: `The problem: if you place keys on servers with hash(key) mod N, then adding or removing a server changes N and remaps almost every key — catastrophic for a cache (mass misses) or a shard (mass data movement). Consistent hashing fixes this.

How it works: map both servers and keys onto a hash ring (0 to 2^32). A key is owned by the first server encountered going clockwise. Add or remove a server and only the keys between it and its predecessor move — about K/N keys — instead of nearly all of them.

Virtual nodes: a single physical server is placed at many points on the ring (dozens to hundreds of virtual nodes). This evens out distribution (no server gets an unlucky huge arc) and smooths rebalancing when a server joins or leaves, because its load is spread across many small arcs.

Where it's used: Cassandra, DynamoDB, Riak, memcached client libraries, CDNs, sharded caches, and hash-based load balancers.

Alternatives worth knowing:

- Rendezvous (Highest Random Weight) hashing: for each key, compute hash(node, key) for every node and pick the max. No ring to maintain, naturally even, and minimal remapping — simpler than consistent hashing for smaller node counts.
- Jump consistent hash (Google): O(1) time, no memory, excellent distribution — but nodes must be numbered 0..N-1, so it only supports adding/removing at the tail, not arbitrary node removal.
- Plain mod-N: only acceptable when the node set never changes.

Pros/cons: consistent hashing gives minimal reshuffling and even load (with vnodes) at the cost of some implementation complexity and a ring to maintain; rendezvous trades a bit of per-lookup CPU for simplicity.

Senior framing: any time you shard keys across a set of nodes that can change — caches, sharded databases, hashing load balancers — reach for consistent hashing (with virtual nodes) or rendezvous hashing; the naive mod-N alternative causes a mass-remap storm on every membership change.`,
    resources: [
      { key: 'r1', title: 'Consistent Hashing (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/system-design/consistent-hashing/', kind: 'article' },
      { key: 'r2', title: 'A guide to consistent hashing (Toptal)', url: 'https://www.toptal.com/big-data/consistent-hashing', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-caching-eviction', order: 5,
    title: 'Caching & Eviction Algorithms',
    tagline: 'LRU, LFU, ARC, W-TinyLFU — and write policies.',
    content: `A cache is bounded, so when it fills you must evict something. The eviction policy decides what, and it directly sets your hit rate.

- LRU (Least Recently Used): evict the entry unused for the longest time. Excellent for temporal locality; implementable in O(1) with a hash map + doubly linked list. Weakness: a large scan (a one-time sweep) pollutes it and flushes hot data.
- LFU (Least Frequently Used): evict the least-frequently accessed. Great for skewed popularity (a few very hot keys), but slow to adapt to changing patterns and needs frequency aging so old hot keys eventually leave.
- FIFO: evict the oldest inserted. Simple, but ignores usage — usually worse than LRU.
- ARC (Adaptive Replacement Cache): dynamically balances recency and frequency by tracking recently-evicted keys; higher hit rates than LRU and scan-resistant, at the cost of complexity (and historically patent concerns).
- W-TinyLFU (Caffeine, modern default): a tiny frequency sketch admits only entries likely to be reused; excellent hit rates with low overhead. LIRS is another high-hit-rate policy.
- Random / CLOCK: CLOCK is an O(1) approximation of LRU used in OS page caches.

Separate from eviction is the write policy: write-through (write cache + store together — consistent, slower writes), write-back (write cache, flush later — fast, risk of loss), write-around (write store, skip cache — avoids polluting on write-once data), and cache-aside/lazy (app checks cache, loads on miss, sets with TTL — the most common). TTL-based expiry bounds staleness.

In practice: Redis exposes these directly via maxmemory-policy (allkeys-lru, allkeys-lfu, volatile-ttl, etc.), so choosing the policy is a config decision backed by understanding your access pattern.

Senior framing: LRU is the safe default; reach for LFU or W-TinyLFU when access is skewed and scan-resistance matters; pick the write policy from your consistency vs latency needs; and never forget the real hard problem alongside eviction is invalidation.`,
    resources: [
      { key: 'r1', title: 'Key eviction policies (Redis docs)', url: 'https://redis.io/docs/latest/develop/reference/eviction/', kind: 'docs' },
      { key: 'r2', title: 'LRU Cache — design & implementation (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dsa/lru-cache-implementation/', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-probabilistic', order: 6,
    title: 'Probabilistic Data Structures',
    tagline: 'Bloom filters, HyperLogLog, Count-Min Sketch.',
    content: `When exact answers are too expensive in memory at scale, probabilistic (approximate) data structures trade a small, bounded error for enormous savings in space and time. Architects use them for gates, analytics, and dedup on huge streams.

- Bloom Filter: tests set membership with no false negatives and a tunable false-positive rate, using a bit array + k hash functions — O(1) and tiny. Classic use: "might this key exist?" to avoid an expensive disk/DB lookup (Cassandra SSTables, CDNs, web caches, dedup). Limitation: you can't delete from a standard bloom filter (use a Counting Bloom or a Cuckoo Filter, which supports deletes).
- Count-Min Sketch: approximate frequency counts / heavy hitters over a stream in sublinear memory; it can overestimate but never underestimate. Used for trending, per-key rate stats, and hot-key detection.
- HyperLogLog: approximate cardinality — count of distinct elements — with about 1.5KB for billions of items at roughly 2% error. Redis exposes it as PFADD/PFCOUNT; perfect for "unique visitors" without storing every id.
- Cuckoo Filter: bloom-like membership with deletion support and often better space at low false-positive rates.
- Skip lists / t-digest: skip lists back Redis sorted sets; t-digest approximates percentiles.

Pros/cons: massive memory and speed wins at the cost of a bounded, well-understood error — perfectly acceptable for a cache-miss gate, a uniques dashboard, or dedup, and unacceptable where exactness is required (billing, auth).

Senior framing: reach for these when exact membership/counting won't fit in memory at your scale; know each structure's guarantee (bloom: no false negatives; HyperLogLog: ~2% cardinality error; Count-Min: overestimates) and pick the one whose error mode is safe for your use case.`,
    resources: [
      { key: 'r1', title: 'Probabilistic data types: Bloom, Cuckoo, HLL, CMS (Redis docs)', url: 'https://redis.io/docs/latest/develop/data-types/probabilistic/', kind: 'docs' },
      { key: 'r2', title: 'Bloom Filters — introduction & implementation (GeeksforGeeks)', url: 'https://www.geeksforgeeks.org/dsa/bloom-filters-introduction-and-python-implementation/', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-consensus', order: 7,
    title: 'Consensus & Leader Election',
    tagline: 'Paxos, Raft, quorums, and avoiding split-brain.',
    content: `Distributed systems must agree — on a single leader, an ordered log, or a config value — even as nodes fail and messages are delayed. The FLP result says asynchronous consensus can't be guaranteed with even one faulty node, so real systems use timeouts plus majority quorums to make progress with high probability.

- Paxos: the foundational, provably-correct consensus protocol — and famously hard to understand and implement correctly.
- Raft: consensus designed for understandability. It has three moving parts: leader election (randomized election timeouts pick one leader per term), log replication (the leader appends entries and replicates to followers), and safety via a majority quorum (an entry commits once a majority has it). Powers etcd, Consul, CockroachDB, and TiKV.
- ZAB (ZooKeeper) and Viewstamped Replication are close relatives.
- Quorums: with N replicas, require a majority (N/2 + 1). In Dynamo-style tunable consistency, choosing read + write quorums so R + W > N guarantees a read sees the latest write.
- Leader election in practice: use Raft, or ZooKeeper/etcd ephemeral nodes + watches; and use fencing tokens (monotonic numbers) so a paused old leader can't corrupt state after a new one is elected — the classic split-brain defense.

Contrast with Two-Phase Commit (2PC): 2PC coordinates a distributed transaction but blocks if the coordinator dies and isn't partition-tolerant — which is why consensus protocols (Raft) are preferred for durable coordination, and sagas for cross-service transactions.

Senior framing: never roll your own consensus — stand on etcd/Consul/ZooKeeper. Understand quorums (R + W > N), leader election, split-brain, and fencing tokens; and know that 2PC is fragile while Raft-based replication is the robust foundation for coordination and metadata.`,
    resources: [
      { key: 'r1', title: 'Raft — understandable distributed consensus (raft.github.io)', url: 'https://raft.github.io/', kind: 'docs' },
      { key: 'r2', title: 'The Secret Lives of Data — Raft (visual walkthrough)', url: 'https://thesecretlivesofdata.com/raft/', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-resilience', order: 8,
    title: 'Resilience Patterns',
    tagline: 'Circuit breaker, retry+backoff+jitter, bulkhead, backpressure.',
    content: `Every dependency will eventually be slow or down; resilience patterns keep one failure from cascading into an outage. Layer them together.

- Timeout: bound every remote call. A call with no timeout is a latent outage — one slow dependency can consume all your threads.
- Retry with exponential backoff + jitter: retry transient failures (timeouts, 5xx, 429) with increasing, randomized delays. Backoff avoids hammering a struggling dependency; jitter prevents synchronized retry storms; cap the attempts; and only retry idempotent operations.
- Circuit Breaker: track failures; after a threshold, open the circuit and fail fast (don't even try) for a cooldown, then go half-open to probe with a few requests, and close again on success. It stops you from pounding a dead dependency and gives it room to recover.
- Bulkhead: isolate resources — separate thread/connection pools per dependency — so a failure in one can't exhaust the shared pool and sink everything (named after ship compartments).
- Backpressure & load shedding: when overwhelmed, signal upstream to slow down (bounded queues) or shed load (return 429/503, drop low-priority work) instead of collapsing. Better to serve some traffic well than all traffic badly.
- Fallback / graceful degradation: return a cached or default response, or a reduced feature, rather than an error.
- Idempotency + dead-letter queues: make retried operations safe, and park poison messages for inspection.

Pros/cons: these add complexity and must be tuned (a too-sensitive breaker or aggressive retry can hurt), so validate them with load and fault-injection testing — resilience you haven't tested is only a hypothesis.

Senior framing: compose timeout → retry(with backoff+jitter) → circuit breaker → bulkhead → backpressure, make writes idempotent, and prove it with chaos/fault-injection. This is the core of the Amazon Builders' Library reliability playbook.`,
    resources: [
      { key: 'r1', title: 'Circuit Breaker pattern (Microsoft Azure Architecture)', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker', kind: 'docs' },
      { key: 'r2', title: 'Timeouts, retries, and backoff with jitter (AWS Builders Library)', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/', kind: 'article' },
      { key: 'r3', title: 'CircuitBreaker (Martin Fowler)', url: 'https://martinfowler.com/bliki/CircuitBreaker.html', kind: 'article' },
    ] },

  { ...AL, slug: 'algo-distributed-data', order: 9,
    title: 'Distributed Data Patterns',
    tagline: 'Saga, outbox/CDC, vector clocks, CRDTs, Merkle trees.',
    content: `Once data spans multiple services or replicas, you lose distributed ACID transactions, so you manage consistency with patterns instead.

- Saga: model a cross-service business transaction as a sequence of local transactions, each publishing an event, with a compensating action to undo prior steps if a later one fails (refund if provisioning fails). Choreography (services react to events) for simple flows; orchestration (a coordinator drives steps) when the flow is complex and needs a clear owner.
- Transactional Outbox + CDC: to atomically "update the DB and publish an event," write the event into an outbox table in the same local transaction as the business change, then a relay or Change Data Capture (Debezium) publishes it. This solves the dual-write problem (DB commits but the event is lost, or vice versa); delivery is at-least-once, so consumers must be idempotent.
- Quorum reads/writes: R + W > N for strong consistency; plus read repair and hinted handoff to heal replicas (Dynamo/Cassandra).
- Vector clocks / version vectors: track causality so you can detect concurrent (conflicting) updates rather than silently overwriting — the basis for conflict detection in Dynamo-style stores.
- CRDTs (Conflict-free Replicated Data Types): data types (counters, sets, maps) whose concurrent updates merge deterministically without coordination — ideal for multi-master, offline-first, and collaborative editing.
- Merkle trees: hash trees that let two replicas find exactly which ranges differ with minimal data exchange — used for anti-entropy repair (Cassandra/Dynamo) and by Git and blockchains.
- Event sourcing + CQRS: store the log of events as the source of truth and build read models from it.

Pros/cons: these buy scalability and availability at the price of eventual consistency and more moving parts (idempotency, conflict resolution, reconciliation) — so apply them only where a single-node transaction genuinely can't reach.

Senior framing: with no distributed ACID, use saga + outbox + idempotency for cross-service transactions, and vector clocks / CRDTs / Merkle trees for replication and conflict resolution — and always know which of these your datastore already provides so you don't reinvent them.`,
    resources: [
      { key: 'r1', title: 'Saga pattern (microservices.io)', url: 'https://microservices.io/patterns/data/saga.html', kind: 'article' },
      { key: 'r2', title: 'Transactional Outbox pattern (microservices.io)', url: 'https://microservices.io/patterns/data/transactional-outbox.html', kind: 'article' },
      { key: 'r3', title: 'Conflict-free Replicated Data Types (crdt.tech)', url: 'https://crdt.tech/', kind: 'docs' },
    ] },
];
