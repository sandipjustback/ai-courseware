// AI Courseware content: agentic systems & enterprise architecture.
// Track 1 = agentic AI core, Track 2 = production & integration, Track 3 = applied architecture.

export const modules = [
  {
    slug: 'langgraph-agent-frameworks',
    order: 1,
    priority: 1,
    title: 'LangGraph & Agent Frameworks',
    tagline: 'Persisted state, human-in-the-loop, and orchestration for reliable agents.',
    whyItMatters: 'Graph-based agent frameworks make agent behavior explicit and controllable: state machines instead of implicit chains, checkpointing for durability, and interrupts for human oversight. These are the foundations of production-grade agents.',
    objectives: [
      'Build a StateGraph with nodes, conditional edges, and a reducer-managed state schema',
      'Persist agent state with a checkpointer (SQLite/Postgres/MongoDB) and resume across sessions',
      'Implement human-in-the-loop: interrupt(), approval gates, state edits, resume',
      'Compare LangGraph, Claude Agent SDK, and plain workflow engines, and know when to use each'
    ],
    resources: [
      { key: 'lg-docs', title: 'LangGraph documentation (concepts + how-tos)', url: 'https://langchain-ai.github.io/langgraph/', kind: 'docs', note: 'Start with Concepts → Low-level then Persistence' },
      { key: 'lg-persist', title: 'LangGraph persistence & checkpointers', url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/', kind: 'docs' },
      { key: 'lg-hitl', title: 'LangGraph human-in-the-loop patterns', url: 'https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/', kind: 'docs' },
      { key: 'lg-academy', title: 'LangChain Academy: Introduction to LangGraph (free course)', url: 'https://academy.langchain.com/courses/intro-to-langgraph', kind: 'course' },
      { key: 'lg-dlai', title: 'DeepLearning.AI: AI Agents in LangGraph', url: 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/', kind: 'course' },
      { key: 'claude-sdk', title: 'Claude Agent SDK overview', url: 'https://docs.claude.com/en/api/agent-sdk/overview', kind: 'docs' },
      { key: 'anthropic-agents', title: 'Anthropic: Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents', kind: 'article', note: 'The workflows-vs-agents framing every architect should know' }
    ],
    problems: [
      {
        key: 'p1', title: 'Ticket-triage agent with checkpointing', difficulty: 'core',
        statement: 'Build a LangGraph agent that receives a support ticket (JSON), classifies severity, looks up the customer tier via a mock tool, and drafts a response. Persist state with a checkpointer so the process survives a restart mid-run. Kill the process after classification and resume from the checkpoint.',
        deliverable: 'Python repo: graph definition, checkpointer config, a run log showing resume-after-kill with the same thread_id.',
        hints: [
          'Use MemorySaver first, then swap to SqliteSaver — the API surface is identical.',
          'thread_id in the config dict is what keys the checkpoint; resuming = invoking with the same thread_id.',
          'Keep state as a TypedDict with an add_messages reducer for the message list.'
        ]
      },
      {
        key: 'p2', title: 'Approval gate (human-in-the-loop)', difficulty: 'core',
        statement: 'Extend the triage agent: if severity == SEV-1 or the drafted response includes a refund, pause with interrupt() and wait for human approval. The human can approve, reject, or edit the draft before the agent proceeds to "send".',
        deliverable: 'Working HITL flow + a one-paragraph explanation of how you would expose this approval queue in a real product UI.',
        hints: [
          'interrupt() raises and surfaces a payload; resume by invoking with Command(resume=...).',
          'Editing the draft = updating graph state before resume (graph.update_state).',
          'This is the implementation half of policy-governed escalation routing (see the autonomy module).'
        ]
      },
      {
        key: 'p3', title: 'Framework comparison brief', difficulty: 'warmup',
        statement: 'Write a one-page brief a CIO could read: when to use LangGraph vs Claude Agent SDK vs a plain workflow engine (like an iPaaS recipe) for an enterprise agent use case. Include a decision table with 5 criteria.',
        deliverable: 'One-page markdown brief with decision table.',
        hints: [
          'Anchor on: determinism needs, audit requirements, state complexity, team skillset, time-to-production.',
          'Anthropic\'s "workflows vs agents" distinction is the cleanest framing to borrow.'
        ]
      }
    ]
  },
  {
    slug: 'knowledge-graphs-graphrag',
    order: 2,
    priority: 1,
    title: 'Knowledge Graphs & GraphRAG',
    tagline: 'Modeling entities, relationships, and decisions as a queryable semantic network.',
    whyItMatters: 'Agents that operate on enterprise data need more than similarity search: they need structured context — who relates to what, which policy was in force, what was decided before. Property graphs and GraphRAG provide that queryable substrate.',
    objectives: [
      'Model entities/relationships/properties in a property graph; write intermediate Cypher',
      'Build an LLM-driven entity & relationship extraction pipeline from unstructured text',
      'Explain GraphRAG vs vector RAG: when graph traversal beats similarity search',
      'Design temporal/versioned graphs so decisions and policy states are auditable over time'
    ],
    resources: [
      { key: 'ga', title: 'Neo4j GraphAcademy (free courses)', url: 'https://graphacademy.neo4j.com/', kind: 'course', note: 'Do "Neo4j Fundamentals" then "Cypher Fundamentals"' },
      { key: 'ga-llm', title: 'GraphAcademy: Neo4j & LLM Fundamentals', url: 'https://graphacademy.neo4j.com/courses/llm-fundamentals/', kind: 'course' },
      { key: 'cypher', title: 'Cypher Manual', url: 'https://neo4j.com/docs/cypher-manual/current/', kind: 'docs' },
      { key: 'msgraphrag', title: 'Microsoft GraphRAG', url: 'https://microsoft.github.io/graphrag/', kind: 'docs', note: 'Community detection + hierarchical summarization approach' },
      { key: 'kgbuilder', title: 'Neo4j LLM Knowledge Graph Builder', url: 'https://neo4j.com/labs/genai-ecosystem/llm-graph-builder/', kind: 'tool', note: 'See extraction pipelines in action quickly' }
    ],
    problems: [
      {
        key: 'p1', title: 'Design a Customer Knowledge Graph', difficulty: 'advanced',
        statement: 'Design the graph schema for an autonomous customer-operations platform: Customers, Users, Contracts, Policies, Tickets, Decisions (made by the agent), Escalations, and Product Modules. Requirements: (a) answer "what did we decide for similar customers in similar situations?" (precedent matching); (b) every agent Decision must trace to the Policy version in force at the time; (c) support "customers at risk" traversal queries.',
        deliverable: 'Schema diagram (nodes, relationships, key properties) + 5 Cypher queries answering the three requirements.',
        hints: [
          'Model Decision as a first-class node, not an edge property — it needs edges to Policy, Precedent, and Outcome.',
          'Temporal correctness: either version Policy nodes (Policy)-[:SUPERSEDED_BY]->(Policy) or put validFrom/validTo on relationships.',
          'Precedent matching = similarity over (situation context) + graph traversal over (customer segment, module, issue type).'
        ]
      },
      {
        key: 'p2', title: 'Entity extraction pipeline', difficulty: 'core',
        statement: 'Take 10 synthetic support-ticket transcripts (generate them with an LLM). Build a pipeline that extracts entities (people, products, issues, commitments) and relationships into a graph. Measure extraction quality against a hand-labeled gold set.',
        deliverable: 'Pipeline script + precision/recall numbers + 3 failure cases with analysis.',
        hints: [
          'Use structured output (JSON schema / function calling) for extraction — free-text parsing will burn you.',
          'A two-pass approach (extract entities, then relationships given entities) is more reliable than one-shot.',
          'This doubles as an evals exercise — reuse the gold-set methodology in the evals module.'
        ]
      },
      {
        key: 'p3', title: 'GraphRAG vs vector RAG argument', difficulty: 'warmup',
        statement: 'A stakeholder asks: "We already have a vector DB — why do we need a knowledge graph?" Write your 2-minute spoken answer, with one concrete query that vector RAG fundamentally cannot answer well.',
        deliverable: 'A 200-word spoken-style answer you can deliver from memory.',
        hints: [
          'Multi-hop questions ("which at-risk customers are affected by the policy we changed last quarter?") require traversal, not similarity.',
          'The honest answer is hybrid — vector + structured + graph together.'
        ]
      }
    ]
  },
  {
    slug: 'agent-memory',
    order: 3,
    priority: 1,
    title: 'Agent Memory Architectures',
    tagline: 'Capturing complete context so an agent compounds intelligence over time.',
    whyItMatters: 'The difference between a chatbot and an agent that gets better every month is memory: what to store, how to consolidate it, and how to retrieve it at the right moment. The episodic/semantic/procedural taxonomy gives you the design vocabulary.',
    objectives: [
      'Explain short-term vs long-term memory and the episodic/semantic/procedural taxonomy (CoALA)',
      'Design memory write policies: what to store, summarize, decay, or discard',
      'Combine vector memory + graph memory + structured store in one architecture',
      'Show how memory makes an agent measurably better month over month'
    ],
    resources: [
      { key: 'coala', title: 'CoALA: Cognitive Architectures for Language Agents (paper)', url: 'https://arxiv.org/abs/2309.02427', kind: 'paper', note: 'The standard memory taxonomy' },
      { key: 'lg-memory', title: 'LangGraph memory concepts', url: 'https://langchain-ai.github.io/langgraph/concepts/memory/', kind: 'docs' },
      { key: 'memgpt', title: 'MemGPT paper (LLM as OS / paged memory)', url: 'https://arxiv.org/abs/2310.08560', kind: 'paper' },
      { key: 'mem0', title: 'Mem0 — open-source memory layer', url: 'https://github.com/mem0ai/mem0', kind: 'tool' },
      { key: 'graphiti', title: 'Graphiti (Zep) — temporal knowledge graph memory', url: 'https://github.com/getzep/graphiti', kind: 'tool', note: 'Temporal KG memory purpose-built for agents' }
    ],
    problems: [
      {
        key: 'p1', title: 'Memory layer design doc', difficulty: 'advanced',
        statement: 'Write the memory architecture for an autonomous customer-operations agent: (a) working memory per conversation; (b) episodic memory of past interactions and decisions; (c) semantic memory of durable customer facts; (d) procedural memory of playbooks that worked. Specify a storage choice for each (e.g., Redis, MongoDB, Elasticsearch, a graph DB), write/read paths, consolidation jobs, and TTL/decay rules.',
        deliverable: '2-page design doc with an architecture diagram and one worked example: a renewal-risk conversation and exactly what gets written to each layer.',
        hints: [
          'Consolidation = a background job that summarizes episodic → semantic (like sleep). Decide trigger: N interactions or time-based.',
          'Procedural memory is the sleeper: successful resolution paths become retrievable playbooks — that is what "compounding intelligence" means in practice.',
          'Document-store depth pays off here: schema design, TTL indexes, and change streams cover the write path cleanly.'
        ]
      },
      {
        key: 'p2', title: 'Build a remembering chatbot', difficulty: 'core',
        statement: 'Build a small agent that, across separate sessions, remembers customer facts ("we run SAP", "renewal is in March") and retrieves them when relevant. Demonstrate a session-3 answer that uses facts from sessions 1 and 2.',
        deliverable: 'Repo + transcript of 3 sessions proving cross-session recall.',
        hints: [
          'Simplest viable: after each session, LLM extracts salient facts → upsert into a store keyed by customer; retrieve top-k by relevance at session start.',
          'Handle contradiction: new fact conflicts with stored fact → update + keep history (temporal validity again).'
        ]
      }
    ]
  },
  {
    slug: 'autonomy-confidence',
    order: 4,
    priority: 1,
    title: 'Confidence-Based Autonomy & Decision Traces',
    tagline: 'Precedent matching, confidence scoring, and policy-governed escalation.',
    whyItMatters: 'Enterprises will not let agents act autonomously without governance: calibrated confidence, graduated autonomy tiers, and an auditable trace of every decision. This is the subsystem that separates demos from production.',
    objectives: [
      'Design a confidence score from concrete signals: precedent match, pattern recognition, data completeness, policy clarity',
      'Define autonomy tiers (suggest → act-with-approval → act autonomously) and graduation criteria',
      'Design decision trace architecture: auditable, replayable reasoning logs',
      'Discuss calibration: making confidence numbers actually mean something'
    ],
    resources: [
      { key: 'calib', title: 'Language Models (Mostly) Know What They Know (paper)', url: 'https://arxiv.org/abs/2207.05221', kind: 'paper', note: 'Foundational on LLM calibration' },
      { key: 'openai-gov', title: 'OpenAI: Practices for Governing Agentic AI Systems', url: 'https://openai.com/index/practices-for-governing-agentic-ai-systems/', kind: 'article' },
      { key: 'nist', title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', kind: 'docs', note: 'Governance vocabulary enterprise leaders recognize' },
      { key: 'lg-hitl2', title: 'LangGraph HITL (escalation implementation)', url: 'https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/', kind: 'docs' }
    ],
    problems: [
      {
        key: 'p1', title: 'Design an autonomy framework', difficulty: 'advanced',
        statement: 'Design a confidence-based autonomy framework for a customer-operations agent. Define: (a) four confidence signals and how each is computed; (b) how they combine into a decision score; (c) autonomy thresholds per action class (send email vs issue credit vs modify contract); (d) escalation routing when below threshold; (e) how thresholds increase month over month based on eval results (learning velocity).',
        deliverable: 'Design doc + a worked example: same action at confidence 0.55, 0.75, 0.92 and what happens in each case.',
        hints: [
          'Precedent match = retrieval over past Decisions in the knowledge graph + outcome quality of those precedents.',
          'Do NOT use raw LLM logprobs as confidence — argue for calibrated, signal-based scoring validated against outcomes.',
          'Threshold graduation: when audited autonomous decisions for an action class hit X% quality over N decisions, lower the escalation bar. That is the learning loop.'
        ]
      },
      {
        key: 'p2', title: 'Decision trace schema', difficulty: 'core',
        statement: 'Design the decision trace record for one agent decision: everything an auditor would need 6 months later to understand why the agent did what it did. Then implement it as a MongoDB collection with 3 example documents.',
        deliverable: 'JSON schema + 3 example docs + the 3 queries an auditor would run.',
        hints: [
          'Minimum: inputs snapshot, retrieved context (with versions), policy version, confidence breakdown, model+prompt version, action taken, human touchpoints, outcome.',
          'Immutability matters — append-only, no updates. Discuss how you would enforce that.'
        ]
      },
      {
        key: 'p3', title: 'Autonomy in an existing system', difficulty: 'warmup',
        statement: 'Pick any automated system you know well (a deploy pipeline, an auto-remediation script, a database tuning tool). Retell its design in the vocabulary of confidence-based autonomy: what are its guardrails, its staged rollout, its rollback, its escalation path?',
        deliverable: 'A 90-second spoken explanation, rehearsed.',
        hints: [
          'Deterministic validation gates = policy clarity signals. Staged rollout = graduated autonomy. Rollback = reversibility class.',
          'Being able to map old-school automation onto agentic vocabulary is a powerful communication tool.'
        ]
      }
    ]
  },
  {
    slug: 'evals-observability',
    order: 5,
    priority: 1,
    title: 'Evals, Testing & LLM Observability',
    tagline: 'Golden datasets, LLM-as-judge, regression harnesses, tracing, and cost profiling.',
    whyItMatters: 'Non-deterministic systems still need engineering discipline: eval suites catch regressions, calibration makes confidence trustworthy, and tracing shows where tokens, money, and milliseconds go.',
    objectives: [
      'Build an eval suite: golden dataset, graders (exact/rubric/LLM-as-judge), CI integration',
      'Explain regression testing for non-deterministic outputs',
      'Instrument an agent with tracing, token/cost and latency profiling in Langfuse',
      'Define operational metrics: decision quality, context accuracy, learning velocity'
    ],
    resources: [
      { key: 'hamel', title: 'Hamel Husain: Your AI Product Needs Evals', url: 'https://hamel.dev/blog/posts/evals/', kind: 'article', note: 'The best practical intro — read first' },
      { key: 'langfuse', title: 'Langfuse documentation', url: 'https://langfuse.com/docs', kind: 'docs', note: 'Open source — self-host or free cloud tier; get hands-on' },
      { key: 'langsmith', title: 'LangSmith evaluation docs', url: 'https://docs.smith.langchain.com/evaluation', kind: 'docs' },
      { key: 'phoenix', title: 'Arize Phoenix', url: 'https://docs.arize.com/phoenix', kind: 'docs' },
      { key: 'eyan', title: 'Eugene Yan: Patterns for LLM Systems (evals section)', url: 'https://eugeneyan.com/writing/llm-patterns/', kind: 'article' }
    ],
    problems: [
      {
        key: 'p1', title: 'Eval suite for the triage agent', difficulty: 'core',
        statement: 'For the module-1 triage agent, build: 25 golden test cases, a deterministic grader for severity classification, an LLM-as-judge rubric (1–5) for response drafts, and a regression harness that runs on every prompt change. Change the prompt and show the harness catching a regression.',
        deliverable: 'Eval repo + a before/after report showing a caught regression.',
        hints: [
          'Run each case 3–5 times and score the distribution — that is the honest answer to non-determinism.',
          'LLM-as-judge needs its own eval: spot-check judge scores against your own on 10 cases first.',
          'Pin model versions in CI; a model upgrade is also a regression event.'
        ]
      },
      {
        key: 'p2', title: 'Instrument with Langfuse', difficulty: 'core',
        statement: 'Add Langfuse tracing to the triage agent: spans per node, token counts, cost per run, latency breakdown. Find the slowest and most expensive step and optimize one of them.',
        deliverable: 'Screenshot of a trace + one-paragraph optimization result.',
        hints: [
          'Langfuse has a LangGraph/LangChain callback integration — minutes to wire up.',
          'Same discipline as classic APM work — the new signal types are tokens, cost, and judge scores.'
        ]
      },
      {
        key: 'p3', title: 'Define three agent-quality metrics', difficulty: 'warmup',
        statement: 'Write operational definitions (formula, data source, cadence, owner) for: decision quality, context accuracy, and learning velocity (autonomous threshold increases month over month).',
        deliverable: 'One-page metric spec.',
        hints: [
          'Decision quality needs a denominator: audited sample of autonomous decisions, scored against a rubric.',
          'Context accuracy = did retrieval surface the facts a human expert says were needed? Requires labeled retrieval evals.'
        ]
      }
    ]
  },
  {
    slug: 'rag-hybrid-retrieval',
    order: 6,
    priority: 1,
    title: 'RAG & Hybrid Retrieval',
    tagline: 'Vector + structured + graph: retrieval that actually answers enterprise questions.',
    whyItMatters: 'Pure vector search fails on exact identifiers, filters, and multi-hop questions. Production retrieval fuses BM25, vectors, structured filters, and graph expansion — and is measured, not assumed.',
    objectives: [
      'Compare vector DB options (pgvector, Pinecone, Qdrant, Atlas Vector Search, OpenSearch k-NN)',
      'Choose chunking and embedding strategies; know when they fail',
      'Implement hybrid retrieval: BM25 + vector with score fusion (RRF), plus rerankers',
      'Evaluate retrieval with precision/recall/MRR on a labeled set'
    ],
    resources: [
      { key: 'pinecone-learn', title: 'Pinecone Learning Center (RAG series)', url: 'https://www.pinecone.io/learn/', kind: 'course' },
      { key: 'anthropic-ctx', title: 'Anthropic: Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval', kind: 'article', note: 'Modern chunk-enrichment technique worth knowing' },
      { key: 'weaviate-hybrid', title: 'Weaviate: Hybrid Search Explained', url: 'https://weaviate.io/blog/hybrid-search-explained', kind: 'article' },
      { key: 'os-hybrid', title: 'OpenSearch hybrid search docs', url: 'https://opensearch.org/docs/latest/search-plugins/hybrid-search/', kind: 'docs' },
      { key: 'atlas-vector', title: 'MongoDB Atlas Vector Search', url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/', kind: 'docs' }
    ],
    problems: [
      {
        key: 'p1', title: 'Hybrid retrieval over support artifacts', difficulty: 'core',
        statement: 'Index 50 synthetic documents (tickets, meeting notes, contract clauses) three ways: BM25 only, vector only, hybrid with RRF fusion. Build 15 labeled queries and compare recall@5 and MRR across the three.',
        deliverable: 'Comparison table + 2 queries where hybrid wins and why.',
        hints: [
          'Exact identifiers (error codes, SKU names) is where BM25 beats vectors — make sure your query set includes them.',
          'Reciprocal Rank Fusion is trivially simple — implement it yourself rather than using a black box, so you can whiteboard it.'
        ]
      },
      {
        key: 'p2', title: 'Retrieval for precedent matching', difficulty: 'advanced',
        statement: 'Design the retrieval pipeline behind "find precedents for this customer situation": what gets embedded, what is structured filtering (segment, module, action class), and where graph traversal fits. This joins modules 2, 3, and 6.',
        deliverable: 'Pipeline diagram + pseudo-code for the three-stage retrieval.',
        hints: [
          'Filter-first (structured) → similarity (vector) → expand (graph neighbors of matched precedents) is a defensible default order.',
          'Be ready to argue why order matters for latency and quality — retrieval is an infrastructure design problem too.'
        ]
      }
    ]
  },
  {
    slug: 'prompting-mcp',
    order: 7,
    priority: 2,
    title: 'Production Prompting & MCP',
    tagline: 'Structured output, retry/fallback, prompt versioning, and LLM-to-system integration.',
    whyItMatters: 'Prompts in production are versioned, validated, and wrapped in reliability machinery. MCP standardizes how LLMs reach into external systems — the integration layer of the agent stack.',
    objectives: [
      'Production patterns: structured output, chain-of-thought, retry/fallback chains, prompt versioning & rollout',
      'MCP architecture: servers/clients, tools vs resources vs prompts, transports, auth',
      'Articulate when to use MCP vs a direct API integration vs an iPaaS connector'
    ],
    resources: [
      { key: 'anthropic-pe', title: 'Anthropic prompt engineering guide', url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', kind: 'docs' },
      { key: 'mcp', title: 'Model Context Protocol — official docs', url: 'https://modelcontextprotocol.io/', kind: 'docs' },
      { key: 'pg', title: 'Prompting Guide (promptingguide.ai)', url: 'https://www.promptingguide.ai/', kind: 'course' },
      { key: 'openai-pe', title: 'OpenAI prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', kind: 'docs' }
    ],
    problems: [
      {
        key: 'p1', title: 'Build an MCP server for a CRM-like system', difficulty: 'core',
        statement: 'Build a small MCP server exposing 3 tools over a mock customer-success store: get_account_health, list_open_risks, log_touchpoint. Connect it to an MCP client (Claude Desktop or a script) and run an end-to-end query.',
        deliverable: 'MCP server repo + transcript of a client session using all 3 tools.',
        hints: [
          'Python or TypeScript SDK both fine; stdio transport is the fastest path.',
          'Write good tool descriptions — tool docs are prompt engineering.'
        ]
      },
      {
        key: 'p2', title: 'Reliability wrapper', difficulty: 'core',
        statement: 'Write a production-grade LLM call wrapper: JSON-schema-validated output, retry with error feedback on parse failure, fallback to a cheaper model on timeout, and version-tagged prompts logged per call. Unit-test the failure paths with a mocked flaky model.',
        deliverable: 'Library module + tests demonstrating each failure path.',
        hints: [
          'Feed the validation error back into the retry prompt — self-healing beats blind retry.',
          'This wrapper is the concrete meaning of "prompt guardrails" in production systems.'
        ]
      }
    ]
  },
  {
    slug: 'ipaas-enterprise-integration',
    order: 8,
    priority: 2,
    title: 'iPaaS & Enterprise Integration Patterns',
    tagline: 'Event-driven architecture, sagas, CDC, and how enterprise apps join agentic workflows.',
    whyItMatters: 'Agents act through integrations. The classic patterns — pub/sub, idempotency, DLQs, outbox/CDC — remain the plumbing under every agentic workflow that touches Salesforce, ServiceNow, SAP, or Workday.',
    objectives: [
      'Refresh core EIP: pub/sub, saga, idempotency, DLQs, CDC, exactly-once semantics',
      'Understand iPaaS platform anatomy: connectors, recipes/flows, execution sandboxes, on-prem agents, governance',
      'Explain how enterprise applications (Salesforce, ServiceNow, SAP, Workday) participate in agentic workflows',
      'Compare iPaaS platforms on connector model, extensibility, and AI-agent readiness'
    ],
    resources: [
      { key: 'eip', title: 'Enterprise Integration Patterns (Hohpe)', url: 'https://www.enterpriseintegrationpatterns.com/', kind: 'docs', note: 'The shared vocabulary of integration architecture' },
      { key: 'msio', title: 'Microservices.io pattern catalog (saga, CDC, outbox)', url: 'https://microservices.io/patterns/', kind: 'docs' },
      { key: 'fowler-eda', title: 'Martin Fowler: What do you mean by "Event-Driven"?', url: 'https://martinfowler.com/articles/201701-event-driven.html', kind: 'article' },
      { key: 'boomi-docs', title: 'Boomi documentation (example iPaaS)', url: 'https://help.boomi.com/', kind: 'docs', note: 'Skim processes, connectors, on-prem runtimes as a reference iPaaS design' },
      { key: 'mulesoft-docs', title: 'MuleSoft documentation (example iPaaS)', url: 'https://docs.mulesoft.com/', kind: 'docs', note: 'Contrast its integration model with Boomi\'s' }
    ],
    problems: [
      {
        key: 'p1', title: 'Classic integration scenario', difficulty: 'core',
        statement: 'Design bi-directional sync between Salesforce and ServiceNow (accounts + cases): conflict resolution, idempotency, ordering, failure handling with DLQ + replay, and rate-limit handling. Then answer: where does an AI agent change this design?',
        deliverable: 'Whiteboard-style diagram + failure-mode table. Practice presenting it in 10 minutes.',
        hints: [
          'Outbox pattern + CDC for reliable capture; idempotency keys on the consumer side.',
          'The agent twist: an agent deciding *whether/what* to sync is a policy layer on top of the same plumbing — connect to the autonomy module.'
        ]
      },
      {
        key: 'p2', title: 'iPaaS platform teardown', difficulty: 'core',
        statement: 'Pick two iPaaS platforms (e.g., MuleSoft and Boomi, or one you have built/used). Write a comparison across: connector model, execution sandbox, error handling/retries, governance, and extensibility for AI agents. Be candid about each side\'s weaknesses.',
        deliverable: 'Two-page teardown you could discuss fluently.',
        hints: [
          'Candor about trade-offs signals architect maturity — every platform has them.',
          'End with: what you would build first to make the weaker platform agent-ready.'
        ]
      }
    ]
  },
  {
    slug: 'architecture-communication-capstone',
    order: 9,
    priority: 3,
    title: 'Architecture Communication & Capstone',
    tagline: 'Explain complex systems to any audience — then design the full platform end to end.',
    whyItMatters: 'Architecture that cannot be communicated does not ship. Practicing audience-switching and timed whole-system design turns knowledge from the other modules into something you can deliver in a workshop, a design review, or an executive briefing.',
    objectives: [
      'Practice audience-switching: the same architecture explained to executives vs an engineering team',
      'Produce crisp written artifacts: design docs, decision records, briefs',
      'Complete a timed 30-minute whole-system design of an autonomous enterprise agent platform',
      'Build a reusable set of worked examples and reference stories from your own experience'
    ],
    resources: [
      { key: 'anthropic-agents2', title: 'Anthropic: Building Effective Agents (framing for stakeholder conversations)', url: 'https://www.anthropic.com/research/building-effective-agents', kind: 'article' },
      { key: 'adr', title: 'Architecture Decision Records (adr.github.io)', url: 'https://adr.github.io/', kind: 'docs', note: 'Lightweight written-communication format worth adopting' },
      { key: 'gainsight', title: 'Gainsight platform overview (example CS domain)', url: 'https://www.gainsight.com/', kind: 'docs', note: 'A concrete domain to ground the capstone in' },
      { key: 'c4', title: 'C4 model for visualizing architecture', url: 'https://c4model.com/', kind: 'docs', note: 'A clean convention for diagrams at different zoom levels' }
    ],
    problems: [
      {
        key: 'p1', title: 'CAPSTONE: Design an autonomous customer-operations agent platform', difficulty: 'advanced',
        statement: 'Full 30-minute timed design: memory layers + orchestration + decision traces → Customer Knowledge Graph → hybrid retrieval for precedent matching → confidence scoring + escalation routing → eval/learning loop → infrastructure for latency and scale. Do it on a whiteboard, timed, out loud. Twice.',
        deliverable: 'Photo of the whiteboard + a self-critique of run 1 vs run 2.',
        hints: [
          'Structure: clarify requirements (5 min) → high-level boxes (5) → deep-dive two subsystems (15) → trade-offs, risks, metrics (5).',
          'Deep-dive the knowledge-graph and autonomy subsystems — they are the most distinctive parts.',
          'Name concrete tech and justify it: LangGraph + Postgres checkpoints, Neo4j or Atlas graph, Langfuse — your call, but own it.'
        ]
      },
      {
        key: 'p2', title: 'Two-audience pitch', difficulty: 'core',
        statement: 'Pick a system you built or know deeply (e.g., an encryption/key-management framework). Deliver it twice: 3 minutes to an executive audience (risk, compliance, business impact) and 3 minutes to engineers (mechanics, trade-offs, operations). Record both and listen back.',
        deliverable: 'Two recordings; note where vocabulary and depth shifted.',
        hints: [
          'Executive version: no tool names in the first minute — lead with the business outcome.',
          'The skill being trained is adapting depth and vocabulary to the room.'
        ]
      },
      {
        key: 'p3', title: 'Reference story bank', difficulty: 'warmup',
        statement: 'Write 6–8 short reference stories from your own work (systems you designed, incidents you led, savings you delivered), each with situation, action, and a quantified outcome. These become your worked examples for workshops, design reviews, and briefings.',
        deliverable: 'One-page story index with 2-line summaries each, rehearsed.',
        hints: [
          'Every story ends with a quantified outcome — find the number.',
          'Tag each story with the module it best illustrates (autonomy, memory, integration, …) so you can pull the right one on demand.'
        ]
      }
    ]
  }
];
