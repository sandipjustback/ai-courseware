// Q&A bank. Categories group questions in the UI; order controls display.
// kind: 'concept' (module theory), 'scenario' (problem-solving / design), 'behavioral' (presales & consulting).

export const qandaQuestions = [
  // ── Module 1 — LangGraph & Agent Frameworks ──────────────────────────────
  {
    key: 'q1', order: 1, category: 'LangGraph & Agent Frameworks', kind: 'concept',
    question: 'What is the difference between a workflow and an agent, and when would you choose each?',
    answer: `A workflow has a predefined control flow — the LLM fills in steps, but the path is fixed by code. An agent lets the LLM decide the control flow dynamically: which tool to call, whether to loop, when to stop.

Choose workflows when the task is well-understood and predictable — they are cheaper, more reliable, and easier to test. Choose agents only when the path genuinely cannot be known in advance. Anthropic's "Building Effective Agents" framing: start with the simplest pattern (prompt chaining, routing, parallelization) and escalate to autonomous agents only when needed.`
  },
  {
    key: 'q2', order: 2, category: 'LangGraph & Agent Frameworks', kind: 'concept',
    question: "Explain LangGraph's core abstractions: StateGraph, nodes, edges, and reducers.",
    answer: `A StateGraph is a state machine where the state is a typed schema shared across nodes. Nodes are functions that receive state and return partial updates. Edges define transitions — conditional edges route based on the state (e.g. "if a tool call was requested, go to the tool node, else end").

Reducers define HOW updates merge into state — e.g. add_messages appends to a message list instead of overwriting it. This makes agent behavior explicit and inspectable, unlike implicit prompt chains.`
  },
  {
    key: 'q3', order: 3, category: 'LangGraph & Agent Frameworks', kind: 'concept',
    question: 'What is a checkpointer and why does it matter in production?',
    answer: `A checkpointer persists the graph's state after every step (to SQLite, Postgres, MongoDB, etc.), keyed by a thread ID.

Three production wins: (1) durability — a crash mid-run resumes from the last step instead of restarting; (2) multi-session continuity — a conversation can pause for days and resume; (3) human-in-the-loop — you can interrupt, let a human inspect or edit state, and resume. Without persistence, an agent is a stateless request/response toy.`
  },
  {
    key: 'q4', order: 4, category: 'LangGraph & Agent Frameworks', kind: 'concept',
    question: 'How would you implement an approval gate (human-in-the-loop) in an agent?',
    answer: `Use interrupt() inside a node before the risky action. The graph pauses and the state is checkpointed. The application surfaces the pending action to a human, who can approve, reject, or edit the state (e.g. correct a draft email). Then resume the graph with the human's input via Command(resume=...).

Key design point: the interrupt is durable — the approval can come hours later from a different process, because state lives in the checkpointer, not in memory.`
  },
  {
    key: 'q5', order: 5, category: 'LangGraph & Agent Frameworks', kind: 'concept',
    question: 'Compare LangGraph vs. the Claude Agent SDK.',
    answer: `LangGraph gives explicit, low-level control — you define the state machine, so it suits complex custom orchestration with fine-grained HITL and multi-agent topologies. The Claude Agent SDK gives a production-hardened agent loop out of the box (tool execution, context management, subagents, permissioning) — you configure rather than construct.

Rule of thumb: Agent SDK when the standard tool-loop pattern fits and you want speed to production; LangGraph when you need custom graph topology, custom persistence, or model-agnostic control.`
  },

  // ── Module 2 — Knowledge Graphs & GraphRAG ───────────────────────────────
  {
    key: 'q6', order: 6, category: 'Knowledge Graphs & GraphRAG', kind: 'concept',
    question: 'When does GraphRAG beat plain vector RAG?',
    answer: `When the answer requires multi-hop reasoning or aggregation across entities, not just finding a similar passage. Vector RAG answers "find me text about X". GraphRAG answers "which customers were affected by tickets caused by the module that team Y owns" — that is a traversal, and no single chunk contains the answer.

It is also better for global questions ("what are the main themes across all tickets?"), which Microsoft GraphRAG handles via community detection and hierarchical summarization. The cost: an expensive extraction pipeline and schema maintenance — so use it only when relationships matter.`
  },
  {
    key: 'q7', order: 7, category: 'Knowledge Graphs & GraphRAG', kind: 'concept',
    question: 'How would you build an entity extraction pipeline to populate a knowledge graph?',
    answer: `LLM-based extraction with a fixed schema: define entity types and relation types up front (do not let the LLM invent the ontology). For each document, prompt the model to emit structured (subject, relation, object) triples with source references.

Then the hard part — entity resolution: dedupe "Acme Corp" vs "ACME Inc." via normalization plus embedding-similarity blocking. Write to the graph idempotently (MERGE in Cypher, not CREATE), keep provenance on every edge, and re-run incrementally as documents change.`
  },
  {
    key: 'q8', order: 8, category: 'Knowledge Graphs & GraphRAG', kind: 'concept',
    question: 'What is Cypher? Give an example query shape.',
    answer: `Cypher is Neo4j's declarative graph query language — pattern matching over nodes and relationships. Example shape:

MATCH (c:Customer)-[:RAISED]->(t:Ticket)-[:ABOUT]->(m:Module {name: 'Payroll'}) RETURN c.name, count(t)

The point to make: relational JOINs enumerate tables; Cypher expresses the PATH, and traversals of variable depth ([:REPORTS_TO*1..5]) are natural where SQL recursion is painful.`
  },

  // ── Module 3 — Agent Memory Architectures ────────────────────────────────
  {
    key: 'q9', order: 9, category: 'Agent Memory Architectures', kind: 'concept',
    question: 'What memory types does an agent need? (CoALA framing)',
    answer: `Four: working memory (the current context window — what is in the prompt now), episodic memory (past interactions — "what happened in previous sessions"), semantic memory (facts about the world/user — "the customer's plan is Enterprise"), and procedural memory (learned rules of behavior — "this user prefers short answers", often encoded in prompts or retrieved instructions).

Most production systems implement episodic + semantic as stores outside the context window with retrieval into working memory.`
  },
  {
    key: 'q10', order: 10, category: 'Agent Memory Architectures', kind: 'concept',
    question: 'The context window is limited. How does MemGPT / paged memory address this?',
    answer: `Treat the LLM like an OS: the context window is RAM, external storage is disk, and the agent itself manages paging between them via tools. The model gets functions like archival_memory_insert / search, and decides what to evict from context and what to page back in.

The insight that survived into products (Letta, Mem0): memory management should be an explicit, tool-driven process, not naive truncation of old messages.`
  },
  {
    key: 'q11', order: 11, category: 'Agent Memory Architectures', kind: 'concept',
    question: 'Design the memory layer for a customer-support agent.',
    answer: `Split by type: (1) short-term — conversation state in the checkpointer, per thread; (2) semantic — a profile store of durable facts per customer, extracted asynchronously after conversations, stored as structured records with provenance and timestamps; (3) episodic — past ticket summaries, embedded for retrieval.

Key decisions to call out: the write path (extract facts with an LLM pass after each session, not inline), conflict handling (new fact supersedes old — temporal versioning, which is what Graphiti/Zep does with a temporal knowledge graph), and forgetting (TTL or decay on stale facts, hard-delete for privacy requests).`
  },

  // ── Module 4 — Confidence-Based Autonomy & Decision Traces ───────────────
  {
    key: 'q12', order: 12, category: 'Confidence-Based Autonomy & Decision Traces', kind: 'concept',
    question: 'What is confidence-based autonomy?',
    answer: `The agent's permission to act scales with its confidence and the action's blast radius. High confidence + low risk: act autonomously. Low confidence or high risk: escalate to a human.

Concretely: define action tiers (read-only / reversible-write / irreversible / external-facing), have the agent emit a confidence signal per decision, and route through a policy: if risk_tier >= X or confidence <= Y, escalate. This is the practical middle ground between "chatbot that cannot do anything" and "autonomous agent nobody trusts".`
  },
  {
    key: 'q13', order: 13, category: 'Confidence-Based Autonomy & Decision Traces', kind: 'concept',
    question: 'Can LLMs actually estimate their own confidence?',
    answer: `Partially. Anthropic's "LMs (Mostly) Know What They Know" showed models are reasonably calibrated on self-evaluation — asking "is this answer correct?" (P(True)) gives usable signal, better than raw token probabilities for long-form output.

But calibration degrades out-of-distribution, so in production you never rely on self-report alone: combine it with retrieval-grounding checks (is the claim supported by a source?), consistency sampling (does the model give the same answer twice?), and validators on structured output.`
  },
  {
    key: 'q14', order: 14, category: 'Confidence-Based Autonomy & Decision Traces', kind: 'concept',
    question: 'What goes into a decision trace, and why keep one?',
    answer: `Every autonomous decision logs: input context and its sources, options considered, the chosen action, the model's stated rationale, confidence score, risk tier, policy result (auto vs escalate), model/prompt versions, and outcome.

Three consumers: debugging (why did it do that?), audit/compliance (NIST AI RMF expects documented accountability for automated decisions), and improvement (traces become eval datasets — escalations that humans approved unchanged are candidates for raising the autonomy threshold).`
  },

  // ── Module 5 — Evals, Testing & LLM Observability ────────────────────────
  {
    key: 'q15', order: 15, category: 'Evals, Testing & LLM Observability', kind: 'concept',
    question: 'How do you test a non-deterministic LLM system?',
    answer: `Shift from "assert exact output" to graded evaluation over a dataset. Three levels (Hamel Husain's framing): (1) unit-style assertions — cheap deterministic checks (valid JSON, no PII, required fields, tool called with sane args); (2) human review — regularly look at real traces, label failures, and turn each failure mode into a test case; (3) LLM-as-judge — a model grades outputs against a rubric, but you must first align the judge with human labels and measure that agreement, otherwise you are testing noise with noise.

Evals run in CI on every prompt/model change, like a regression suite.`
  },
  {
    key: 'q16', order: 16, category: 'Evals, Testing & LLM Observability', kind: 'concept',
    question: 'Evals vs observability — and what do tools like Langfuse give you?',
    answer: `Evals are offline, pre-deployment: fixed dataset, scored, pass/fail — "is this change better?". Observability is online, in production: tracing every request — "what is it actually doing?".

Langfuse/LangSmith/Phoenix capture nested traces (each LLM call, tool call, retrieval, with latency/cost/tokens), let you attach user feedback and scores to traces, and — the key loop — let you convert bad production traces into eval dataset items. That trace-to-eval flywheel is the main thing to articulate.`
  },
  {
    key: 'q17', order: 17, category: 'Evals, Testing & LLM Observability', kind: 'concept',
    question: 'Define three quality metrics for a ticket-triage agent.',
    answer: `Pick metrics tied to decisions, each with a measurement method: (1) routing accuracy — % of tickets routed to the team that ultimately resolved them (ground truth from resolution data — lagging but objective); (2) escalation precision/recall — of tickets flagged for humans, how many actually needed it (precision), and how many needing humans did it catch (recall) — this guards the autonomy boundary, and recall failures are the dangerous ones; (3) grounded-response rate — % of replies where every factual claim traces to a retrieved source, scored by an aligned LLM judge on a sample.`
  },

  // ── Module 6 — RAG & Hybrid Retrieval ────────────────────────────────────
  {
    key: 'q18', order: 18, category: 'RAG & Hybrid Retrieval', kind: 'concept',
    question: 'Why hybrid retrieval instead of pure vector search?',
    answer: `They fail differently. Vector search captures semantics but is weak on exact identifiers — SKUs, error codes, names, "DB-4412" — which is precisely what enterprise queries are full of. BM25/keyword search nails exact terms but misses paraphrase.

Hybrid runs both and merges, typically with Reciprocal Rank Fusion: score each doc by the sum of 1/(k + rank_i) across result lists — rank-based, so you do not have to normalize incomparable scores. Then optionally a reranker (cross-encoder) reorders the top ~50 for precision.`
  },
  {
    key: 'q19', order: 19, category: 'RAG & Hybrid Retrieval', kind: 'concept',
    question: "Explain Anthropic's Contextual Retrieval.",
    answer: `Chunking destroys context — a chunk saying "the error occurs when the limit is exceeded" does not say WHICH system. Contextual Retrieval fixes this at index time: for each chunk, an LLM generates a short context blurb ("This chunk is from the payroll module's rate-limiting doc...") that gets prepended before embedding and BM25 indexing.

Anthropic reported ~49% reduction in retrieval failures combined with hybrid search, ~67% with reranking on top. It is cheap because context generation is a one-time indexing cost, and prompt caching makes the per-chunk LLM call inexpensive.`
  },
  {
    key: 'q20', order: 20, category: 'RAG & Hybrid Retrieval', kind: 'concept',
    question: 'How do you evaluate a retrieval pipeline separately from generation?',
    answer: `Build a query-to-relevant-docs golden set, then measure retrieval alone: recall@k (are the right docs in the top k? — the ceiling on answer quality) and MRR/NDCG (are they ranked high?). Only after retrieval is good do you evaluate generation: faithfulness (is the answer supported by retrieved context?) and answer relevance.

The failure-mode point reviewers like: if end-to-end quality is bad, first check whether it is a retrieval miss or a generation miss — they have completely different fixes.`
  },

  // ── Module 7 — Production Prompting & MCP ────────────────────────────────
  {
    key: 'q21', order: 21, category: 'Production Prompting & MCP', kind: 'concept',
    question: 'What is MCP and what problem does it solve?',
    answer: `Model Context Protocol is an open standard for connecting AI applications to tools and data — "USB-C for AI integrations". Without it, every (app x tool) pair needs custom glue: N x M integrations.

MCP standardizes the interface: a server exposes tools, resources, and prompts over a defined protocol (stdio or HTTP); any MCP-compatible client (Claude, IDEs, custom agents) can use them. Write the Jira integration once as an MCP server and every AI surface in the company can consume it — the integration matrix collapses from N x M to N + M.`
  },
  {
    key: 'q22', order: 22, category: 'Production Prompting & MCP', kind: 'concept',
    question: 'What makes a prompt "production-grade" versus a good ad-hoc prompt?',
    answer: `Treat it as a versioned software artifact: (1) structured — clear sections for role, instructions, context, output schema, with examples for hard cases; (2) versioned and evaled — every change runs the eval suite before deploy, prompts live in source control; (3) defensive — instructions and untrusted data clearly separated (injection resistance), explicit handling for "I don't know" cases; (4) schema-enforced output — structured output validated with retry-on-parse-failure; (5) cache-aware — stable prefix (system prompt, tools) first, variable content last, to exploit prompt caching for cost and latency.`
  },
  {
    key: 'q23', order: 23, category: 'Production Prompting & MCP', kind: 'concept',
    question: 'How would you design an MCP server for a CRM system?',
    answer: `Design tools around INTENT, not raw REST endpoints: find_customer, get_account_health, log_interaction — coarse-grained, described in language a model understands, with tight input schemas.

Key decisions: (1) read/write separation — writes require confirmation or elevated permission; (2) response shaping — return only fields the model needs, paginated, so you do not blow the context window; (3) auth — the server holds credentials, scoped per user (OAuth), never the model; (4) descriptions as prompt engineering — tool descriptions are what the model reasons over, so they need examples and disambiguation ("use find_customer before get_account_health, which requires a customer ID").`
  },

  // ── Module 8 — iPaaS & Enterprise Integration Patterns ───────────────────
  {
    key: 'q24', order: 24, category: 'iPaaS & Enterprise Integration Patterns', kind: 'concept',
    question: 'Message queue vs. event stream — when do you use which?',
    answer: `A queue (RabbitMQ, SQS) is for commands / work distribution: each message consumed once by one worker, then gone — use for task processing. A stream/log (Kafka) is for events / facts: an append-only log, multiple independent consumers each with their own offset, replayable — use when many systems must react to the same fact ("ticket created") or when you need to reprocess history.

Fowler's distinction worth citing: event notification vs event-carried state transfer — the latter puts the data in the event so consumers do not call back to the source.`
  },
  {
    key: 'q25', order: 25, category: 'iPaaS & Enterprise Integration Patterns', kind: 'concept',
    question: 'Explain the saga and outbox patterns.',
    answer: `Saga: a distributed transaction as a sequence of local transactions, where each step has a compensating action — if provisioning fails after billing charged, you refund rather than rely on a two-phase commit you cannot have across services. Choreography (each service reacts to events) vs orchestration (a coordinator drives steps — which is what a durable agent graph is, incidentally).

Outbox: to atomically "update DB and publish event", write the event to an outbox table in the same local transaction as the business change; a relay (or CDC via Debezium) publishes it afterward. Guarantees at-least-once publication — so consumers must be idempotent.`
  },
  {
    key: 'q26', order: 26, category: 'iPaaS & Enterprise Integration Patterns', kind: 'concept',
    question: 'Where does an iPaaS fit vs custom integration code — and where do AI agents change this?',
    answer: `iPaaS platforms (e.g. MuleSoft, Boomi) buys prebuilt connectors, retry/error handling, monitoring, and citizen-developer accessibility — right for standard SaaS-to-SaaS flows where speed matters. Custom code wins for high-volume, latency-sensitive, or deeply domain-specific logic.

The agent angle: agents are a new CONSUMER of the same integration layer — an MCP server in front of the iPaaS (or the systems it connects) lets an agent trigger governed recipes rather than hitting raw APIs, inheriting the iPaaS's auth, audit, and rate-limit machinery instead of reinventing it.`
  },

  // ── Module 9 — Architecture Communication & Capstone ─────────────────────
  {
    key: 'q27', order: 27, category: 'Architecture Communication & Capstone', kind: 'concept',
    question: 'Walk me through designing an autonomous customer-operations agent platform.',
    answer: `Structure the answer in layers: (1) Integration layer — MCP servers / iPaaS over CRM, ticketing, telemetry; events flow in via a stream. (2) Knowledge layer — hybrid RAG over docs and tickets, plus a customer knowledge graph for relationship queries; agent memory (semantic profile + episodic history) per account. (3) Agent layer — LangGraph-style orchestration with checkpointing; specialized subagents (triage, research, drafting) under a supervisor. (4) Autonomy layer — risk-tiered actions, confidence thresholds, HITL approval gates, decision traces on every action. (5) Quality layer — Langfuse-style tracing, eval suite in CI, trace-to-eval flywheel.

Then name the rollout: start read-only / suggest-mode, measure escalation precision, ratchet autonomy up per action tier as evidence accumulates.`
  },
  {
    key: 'q28', order: 28, category: 'Architecture Communication & Capstone', kind: 'concept',
    question: 'What is an ADR and why use them?',
    answer: `An Architecture Decision Record is a short document per significant decision: context, decision, alternatives considered, consequences. Value: decisions outlive the people and chat threads that made them; new engineers read WHY, not just WHAT; and revisiting a decision starts from its recorded constraints instead of relitigating from scratch.

For AI systems specifically, ADRs are where you record model choice, autonomy thresholds, and eval criteria — the things auditors and future maintainers will ask about.`
  },
  {
    key: 'q29', order: 29, category: 'Architecture Communication & Capstone', kind: 'concept',
    question: 'How do you explain the same agent architecture to executives vs engineers?',
    answer: `Same structure, different currency. Executives: outcomes and risk — what the agent does autonomously, what stays human-approved, cost per resolved ticket vs baseline, and the containment story ("every action is logged, reversible, and escalates when uncertain"). Anchor on one concrete workflow, not the platform.

Engineers: the C4 walk — context diagram, containers (agent runtime, checkpointer, retrieval, MCP servers), the state machine, failure modes, idempotency. The skill being tested: you choose the abstraction level deliberately and can move between them without changing the underlying facts.`
  },
  {
    key: 'q30', order: 30, category: 'Architecture Communication & Capstone', kind: 'concept',
    question: 'Your agent gave a wrong answer to a customer in production. Walk me through your response.',
    answer: `Immediate: pull the decision trace — find the exact turn, see what was retrieved, what the model reasoned, what confidence it reported. Classify the failure: retrieval miss (wrong/missing context), reasoning failure (right context, wrong conclusion), stale memory, or prompt regression.

Contain: if systemic, lower the autonomy threshold for that action class (flip to suggest-mode) rather than turning everything off. Fix and prevent: the failing trace becomes a permanent eval case, the fix must make that eval pass, and the eval suite gates the next deploy. Close the loop with the metric: did escalation recall or grounded-response rate flag this class — and if not, add a metric that would have.`
  },

  // ── Problem Solving — Integration & iPaaS Scenarios ──────────────────────
  // Sourced from reported iPaaS and AI-platform assessment formats.
  {
    key: 'ps1', order: 31, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported in integration-architect rounds at iPaaS companies',
    question: 'Design a bidirectional sync between Salesforce and a ticketing system. What are the hard parts?',
    answer: `Frame the decisions first: direction of truth (which system owns which fields — never let both own the same field), sync trigger (webhooks/CDC for near-real-time, scheduled polling as fallback), and payload mapping with a canonical intermediate model so you are not doing N x M field mappings.

The hard parts to name unprompted: (1) loop prevention — a write from the sync must not re-trigger the sync; tag synced changes (integration user, sync-source field) and filter them out; (2) conflict resolution — same record edited on both sides between syncs; pick a policy per field (last-write-wins with timestamps, or source-of-truth-wins) and log conflicts; (3) idempotency — retries must not create duplicate tickets; use external IDs and upserts; (4) failure handling — dead-letter queue with alerting and replay, not silent drops; (5) rate limits on both APIs — batch, backoff, and respect Salesforce daily API quotas.`
  },
  {
    key: 'ps2', order: 32, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported iPaaS scenario (recipe debugging)',
    question: 'A recipe/workflow that has been running for months suddenly stops firing. Walk through your debugging.',
    answer: `Work outside-in: (1) Is the recipe active and is the trigger polling? Check the jobs report — no jobs at all means trigger-side; jobs with errors means action-side. (2) Auth: expired OAuth token or rotated API key on the connection is the most common cause — reauthorize and check the connection health. (3) Trigger condition: did the source schema or the trigger filter change — a renamed field or a new required filter silently excludes all records. (4) Upstream change: did the source app change API version, deprecate the webhook, or start rate-limiting (429s)? Check webhook delivery logs on the source side. (5) Volume/queue: are events arriving but backed up behind a stuck job or a throttled step?

Close with prevention: alerting on zero-job windows (absence of activity, not just errors), connection-expiry monitoring, and a synthetic heartbeat record pushed through the pipeline daily.`
  },
  {
    key: 'ps3', order: 33, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported platform-engineering scenario (retries, idempotency, DLQ)',
    question: 'A long-running integration job fails at step 7 of 10 after writing to three systems. How do you recover safely?',
    answer: `First distinguish transient vs permanent failure: a timeout or 429 gets retried with exponential backoff and jitter; a validation error (400) will fail forever and must go to a dead-letter queue for human inspection — retrying it just burns quota.

Safe recovery requires the job to have been designed for it: (1) idempotent steps — every write uses an external ID / upsert so re-running steps 1-6 is harmless, OR (2) checkpointed progress — persist completed-step state so recovery resumes at step 7, OR (3) compensating actions (saga) — if the partial writes are unacceptable, roll back steps 1-6 with explicit compensations (void the invoice, delete the provisioned record).

The strongest answer: you pick idempotency + resume for data syncs, saga/compensation when the steps have business side effects that cannot be left half-done, and you always cap retries with a DLQ + alert so nothing loops forever or disappears silently.`
  },
  {
    key: 'ps4', order: 34, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported iPaaS system-design round',
    question: 'Design a multi-tenant workflow execution engine (the core of an iPaaS). How do you prevent one customer from starving others?',
    answer: `Core shape: triggers enqueue jobs; a scheduler dispatches to worker pools; each step's result is persisted (checkpoint) so a crashed worker resumes rather than restarts; all state transitions are durable and observable.

Multi-tenant fairness is the heart of the question: (1) per-tenant queues with weighted fair scheduling, or a shared queue with per-tenant concurrency caps and token-bucket rate limits; (2) isolate the noisy neighbor at the queue, not just the worker — a tenant spike should back up THEIR queue, not the shared one; (3) tiered pools (dedicated capacity for premium tiers); (4) per-step timeouts and memory limits so one pathological recipe cannot hold a worker hostage.

Also name: at-least-once execution + idempotent steps (exactly-once is a lie across third-party APIs), a DLQ per tenant, and per-tenant observability (jobs, latency, error rate) because support will ask "why is MY recipe slow".`
  },
  {
    key: 'ps5', order: 35, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported iPaaS system-design round',
    question: 'Design a connector framework — one abstraction over hundreds of SaaS APIs.',
    answer: `Define what every connector must express declaratively: auth (OAuth2, API key, basic, JWT — handled by the framework, never by connector code), operations (trigger/action schemas with typed inputs/outputs), pagination strategy (cursor, offset, link-header — a fixed enum the framework drives), rate-limit policy, and error mapping (each API's errors normalized to a shared taxonomy: retryable, auth, validation, not-found).

Framework responsibilities: token refresh, retry/backoff, circuit breaking, request signing, schema introspection (fetch custom fields dynamically — enterprise SaaS is full of them), and sandboxed execution of connector code.

The senior-level point: versioning — a connector update must not break thousands of live recipes, so operations are versioned, old versions stay runnable, and breaking changes require explicit migration. Plus a certification test-suite each connector must pass (auth flows, pagination edge cases, error mapping) before it ships.`
  },
  {
    key: 'ps6', order: 36, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported FDE/Boomi-style scenario',
    question: 'A customer has a 15-year-old on-prem ERP with no API layer. How do you integrate it with your cloud platform?',
    answer: `Enumerate the access options in order of preference: (1) database-level — read via CDC on the underlying DB (Debezium-style) or scheduled extracts to a staging table; writes via the ERP's import interfaces, never raw DB writes into an ERP you do not own; (2) file-based — most old ERPs speak batch files (CSV/fixed-width over SFTP); ugly but reliable and vendor-supported; (3) message middleware the ERP may already emit to (MQ Series is common in that era); (4) last resort: screen/RPA automation — fragile, use only for low-volume writes.

Then the connectivity story: an on-prem agent (exactly what iPaaS on-prem agents and gateways exist for) that makes outbound-only connections so the customer opens no inbound firewall holes.

Wrap with expectations management: this will be batch or near-real-time, not real-time; data quality from a 15-year-old system will surprise you, so build a validation/quarantine layer from day one.`
  },
  {
    key: 'ps7', order: 37, category: 'Problem Solving — Integration & iPaaS Scenarios', kind: 'scenario',
    source: 'Reported FDE scenario',
    question: 'Design a reliable webhook integration with a client system that frequently goes offline.',
    answer: `Reliability is the sender's AND receiver's problem — design both sides. Receiving from them: assume delivery gaps; back webhooks with periodic reconciliation polling (fetch changes since last sync watermark) so missed events are recovered; make ingestion idempotent (event ID dedupe) since their retries will duplicate.

Sending to them: queue outbound events durably; retry with exponential backoff + jitter, capped, then park in a DLQ; when they come back online, drain in order (or by priority) with rate limiting so you do not knock them over on recovery — the thundering-herd-on-reconnect is the classic trap. Add a circuit breaker so you stop hammering a dead endpoint, and expose a replay API so their team can request re-delivery of a time window.

Monitoring: alert on delivery lag and DLQ depth, not just errors — and give the client a dashboard of what is pending for them, which turns a support fight into a shared fact.`
  },

  // ── Problem Solving — AI Agent Scenarios ─────────────────────────────────
  {
    key: 'ps8', order: 38, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'Common AI-engineer question banks (2025-26)',
    question: 'Your deployed AI agent returns inconsistent results in production but worked in staging. Debug it.',
    answer: `Enumerate what differs between the environments, most likely first: (1) data — production queries and documents differ from the staging set; pull failing production traces and check what was actually retrieved; (2) configuration drift — model version, temperature, prompt version, context-window truncation thresholds; diff the full request payloads, not the configs you think you deployed; (3) state — production has real memory/history contaminating context, staging was clean-slate; (4) load-related — timeouts causing partial context, rate-limit fallbacks silently switching to a smaller model, caching serving stale retrievals; (5) concurrency — shared state or non-deterministic tool ordering under parallel load.

Method: capture full traces (exact prompt, retrieved chunks, tool calls, raw response) for failing cases, replay them in staging — if they reproduce, it is inputs; if not, it is infrastructure. The takeaway line: "inconsistent in production" is almost never the model being moody — it is different inputs or silent fallbacks, and tracing makes it findable.`
  },
  {
    key: 'ps9', order: 39, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'Common live debugging exercise',
    question: 'A RAG system answers a question confidently but wrong. Diagnose it live.',
    answer: `Split the pipeline and test each half. Step 1: look at what was retrieved for that query. If the right document is NOT in the retrieved set, it is a retrieval failure — check chunking (was the answer split across chunks?), embedding match (paraphrase gap — try the query verbatim vs reworded), filters (metadata filter silently excluding the doc), and index freshness (is the doc even indexed?). If the right document IS there, it is a generation failure — check whether it was ranked too low to make the context cut, whether the prompt lets the model prefer its parametric knowledge over the context, and whether conflicting chunks were both included.

Fixes map to cause: retrieval miss = hybrid search + contextual chunk headers + reranking; generation miss = stricter grounding instructions ("answer only from the context; say I don't know otherwise") + citation requirements + smaller, cleaner context.

The differentiator: say you would add this exact case to the eval set before shipping the fix, so it can never silently regress.`
  },
  {
    key: 'ps10', order: 40, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'Reported differentiator question at AI platform companies',
    question: '"How do you know your AI system is actually working?" — answer without hand-waving.',
    answer: `Give a layered, numeric answer: (1) offline evals — a versioned dataset of real cases with graded scores (routing accuracy, faithfulness, escalation recall), run in CI, blocking deploys on regression; (2) online telemetry — full traces on every request with cost/latency, plus sampled human review of production outputs on a schedule, not just when something breaks; (3) outcome metrics tied to the business process — tickets resolved without reopen, human-override rate, time-to-resolution vs the pre-agent baseline; (4) the feedback loop — every human override and every user thumbs-down becomes a labeled eval case, so the test set grows where the system is weakest.

The trap this question sets: answering with "we look at the outputs and they seem good" or quoting only a demo. The strong close: name the ONE number you watch weekly (e.g. escalation recall) and why it is the one that would catch the dangerous failure mode first.`
  },
  {
    key: 'ps11', order: 41, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'FDE-style design exercise',
    question: 'A logistics client wants an AI agent that reroutes shipments using SAP, weather APIs, and 400 warehouse managers. Design it.',
    answer: `Start with the decision loop, not the tech: detect (weather/delay event arrives via stream) → assess (agent pulls affected shipments from SAP, scores impact) → propose (generate reroute options with cost/ETA trade-offs) → approve (the 400 warehouse managers are the HITL layer — the agent proposes, a human approves in one click) → execute (write back to SAP via governed integration) → learn (approved/rejected proposals become training signal for autonomy thresholds).

Architecture: event-driven ingestion (weather webhooks, SAP CDC), an orchestrated agent with checkpointing (reroutes are long-running, must survive restarts), MCP-style tool layer over SAP so writes are auditable and permissioned, and decision traces on every proposal for the inevitable "why did it reroute my truck" conversation.

Rollout: suggest-only for a quarter, measure proposal acceptance rate per route type, then auto-execute only the classes where acceptance is >95% and the action is reversible. Scale note: 400 users means the approval UX (mobile, batched, defaults) matters more than the model.`
  },
  {
    key: 'ps12', order: 42, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'FDE-style crisis scenario',
    question: 'Two weeks after go-live, the client says the AI performs worse than their old manual process. Respond.',
    answer: `First move: agree to measure, not to argue. Ask for the specific cases behind the impression — then pull the traces for exactly those cases. Three findings are possible and each has a different fix: (1) they are right systematically — a data/config gap between pilot and production (missing integration, unindexed doc source, wrong autonomy tier); fix it and show before/after on their cases; (2) they are right on a slice — the system underperforms on a case type the eval set under-represented; scope it, put that slice back to manual while you fix it (partial rollback beats total rollback); (3) the numbers say otherwise but perception lags — the failures are more MEMORABLE than the old process's failures; publish a weekly side-by-side scorecard (agent vs historical baseline on the same metrics) and review it with them.

The meta-point: you committed to baseline metrics BEFORE go-live precisely so this conversation is about data, and you treat trust as a deliverable with its own plan, not an assumption.`
  },
  {
    key: 'ps13', order: 43, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'FDE-style scenario (governance)',
    question: "A bank deployment: the agent produces outputs that violate compliance policies the client never shared with you. What now?",
    answer: `Immediate containment: drop the affected action class to human-review mode (suggest-only) — do not wait for the root-cause meeting. Notify the client's compliance owner proactively with the decision traces of the violating outputs; in a bank, hiding the ball is the career-ending move, and the traces show exactly what the system knew when it acted.

Then fix the process gap, not just the outputs: the real failure is that policy discovery was not part of onboarding. Establish a policy intake: compliance rules become (a) hard guardrails where mechanically checkable (blocklists, format validators, approval tiers for regulated actions), (b) prompt-level constraints where judgment-based, and (c) eval cases — every named violation becomes a permanent regression test.

Close the loop institutionally: a sign-off step where the client's compliance team reviews sample outputs against their policies before each autonomy-tier increase. The lesson to state: in regulated industries, "the client didn't tell us" is not a defense — eliciting constraints is the vendor's job.`
  },
  {
    key: 'ps14', order: 44, category: 'Problem Solving — AI Agent Scenarios', kind: 'scenario',
    source: 'Common cost/scale question',
    question: 'Your agent works but costs too much and is too slow at scale. Where do you cut?',
    answer: `Profile before cutting — per-trace token accounting tells you where the spend actually is (it is usually context bloat, not call count). Then, in order of ROI: (1) prompt caching — stable system prompt and tool definitions first, variable content last; on cache-friendly workloads this is the single biggest cost lever; (2) model routing — a cheap model for classification/extraction/routing steps, the expensive model only for final reasoning; most agent steps do not need the frontier model; (3) context trimming — retrieval top-k discipline, summarize old turns instead of replaying them, strip tool results to needed fields; (4) kill needless agency — steps that are always the same sequence should be code, not LLM decisions; every hop you convert from agent-choice to workflow removes tokens AND variance; (5) parallelize independent tool calls and stream responses to cut perceived latency.

Guard the quality side: every optimization runs against the eval suite — a 40% cost cut that drops grounded-response rate is a regression, not a win.`
  },

  // ── Behavioral & Presales ────────────────────────────────
  {
    key: 'b1', order: 45, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'Reported Solutions Consultant rounds at iPaaS companies',
    question: 'What parts of the presales cycle are you involved in? Walk through a recent deal you helped win.',
    answer: `Structure: discovery → solution design → demo/PoC → technical validation → handoff. For each stage, have ONE concrete story. Strong shape for the deal story: the customer and their pain in one sentence; the technical objection or gap that was blocking the deal; what YOU specifically did (built the PoC integration, ran the workshop, designed the architecture that satisfied security); and the outcome with a number (deal size, time-to-close, displaced competitor).

What they are screening for: can you translate business pain into a technical solution and back, do you claim credit precisely (your contribution, not the team's), and do you understand that presales success = the deal, not the demo. If your background is delivery rather than presales (e.g. implementation/solutions at a product company), map it honestly: discovery workshops, solution design docs, and executive demos are the same muscles — say that explicitly rather than pretending quota experience.`
  },
  {
    key: 'b2', order: 46, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'FDE client-simulation bank',
    question: 'Your live demo breaks in front of executives. What do you do in the moment?',
    answer: `Stay in command of the room: acknowledge in one sentence without over-apologizing ("that's not doing what it does every other day — let me show you the result another way"), and switch to the fallback you prepared — recorded run, screenshots, or the staging environment. Never debug live in front of executives, and never blame the wifi/product/colleague.

Then convert it: walk the architecture or outcomes on the whiteboard — executives care about what it does for them, not the click path; some of the best meetings happen after the demo dies because the conversation moves up a level. Afterward: root-cause it, send a short note with the fix and a working recording — the recovery note often builds more trust than a clean demo would have.

The meta-answer: you ALWAYS have a fallback prepared, which means the real answer starts before the meeting.`
  },
  {
    key: 'b3', order: 47, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'FDE client-simulation bank',
    question: 'A client insists a feature you estimate at 6 weeks should take 3 days. Handle the conversation.',
    answer: `Do not defend the number — decompose it. Walk them through what the 6 weeks contains (integration edge cases, security review, testing against their data, rollout), because "3 days" usually means they are picturing only the happy-path demo version. Then find the real need behind the deadline: usually there is a board meeting or a go-live behind it — and often a 3-day SLICE that genuinely serves it: a scoped version, one workflow, suggest-only mode. Offer that trade explicitly: "I can give you X in 3 days and the full thing in 6 weeks; here is exactly what X leaves out and the risk it carries."

If they still insist on impossible scope, state the risk in writing, calmly, once — then let them choose. What is being tested: whether you cave (and blow up delivery later), whether you get defensive, or whether you negotiate scope like a partner. The one unforgivable answer is quietly agreeing to 3 days.`
  },
  {
    key: 'b4', order: 48, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'FDE client-simulation bank',
    question: 'Explain why the AI gives different answers to the same question — to a non-technical CFO who sees it as a defect.',
    answer: `Use an analogy from their world, not yours: "Ask two of your best analysts the same question and you will get two well-reasoned answers with different words — the AI works the same way; it composes each answer fresh rather than reading from a fixed table." Then split what varies from what must not: wording can vary; facts, numbers, and decisions must not — and describe the controls in their language: "for anything that touches your books, we pin it down — the AI pulls numbers from your systems, we test it against hundreds of known cases before every change, and anything it is unsure about goes to a human."

Then the pivot that lands with CFOs: determinism is available where it matters — structured outputs, low temperature, validators — and the variability is what buys the flexibility they are paying for. Close by asking which outputs worry them; their answer usually reveals whether the real concern is auditability — which decision traces answer better than determinism ever could.`
  },
  {
    key: 'b5', order: 49, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'Reported MuleSoft / FDE behavioral',
    question: 'Tell me about a deployment or project that failed. What did you do?',
    answer: `Pick a real failure with YOUR fingerprints on it — people immediately discount stories where the failure belongs entirely to circumstances or other people. Strong structure: the stakes and your role in one sentence; the decision or assumption of YOURS that turned out wrong; the moment you realized it and what you did in the first 48 hours (containment, honest client communication, the recovery plan); the outcome, including what was permanently lost — a fully-recovered story is a weak failure story; and the specific practice you changed afterward, with evidence you actually apply it now.

What is being screened: do you take real ownership without self-flagellation, did you tell the client the truth early, and did the lesson become a durable behavior rather than a slide. One sharp lesson beats three vague ones.`
  },
  {
    key: 'b6', order: 50, category: 'Behavioral & Presales', kind: 'behavioral',
    source: 'Reported culture-fit rounds',
    question: 'Why integration/automation, and why this company?',
    answer: `Avoid the generic "I'm passionate about automation". Anchor in something you have actually lived: the specific pain of systems that do not talk to each other, a workflow you automated and what it freed people to do, or — for the current moment — the observation that AI agents are only as useful as the systems they can act on, which makes the integration layer the strategic ground of enterprise AI. That thesis (agents need governed access to enterprise systems; iPaaS companies already own that access layer) is genuinely why iPaaS companies are positioned well, and saying it shows you understand THEIR strategy, not just your resume.

Then one concrete, recent proof point about the company — a product launch, their agentic direction, a customer story — and one honest sentence about the role fit: what you would be doing in year one and why that is the work you want. Specificity is the entire game in this answer.`
  }
];
