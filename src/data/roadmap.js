// AI Architect Roadmap — a phased plan to a lead AI-Architect role at a top MNC, with completion times.
// Content-driven "lessons" that tie the other courses/certs in this app into an execution plan.

const RM = { course: 'roadmap', badge: 'Roadmap', priority: 1 };

export const roadmapModules = [
  { ...RM, slug: 'roadmap-overview', order: 1, section: 'Overview',
    title: 'The Goal & Timeline',
    tagline: 'Target role, what "impact" means, and the ~9-month plan at a glance.',
    content: `The goal: land a lead AI-Architect role — titles like AI/ML Architect, Principal or Staff Engineer (AI), or Head of AI Engineering — at a top MNC (FAANG-tier, leading product & AI companies, or the global capability centers of Fortune-500 firms), owning the AI/GenAI architecture across products rather than shipping a single feature.

What "meaningful impact" means at this level:

- You own the AI architecture and technical strategy for a platform or product line, not one service.
- Your decisions move business metrics — cost, latency, conversion, new capabilities — and are visible to senior leadership.
- You set standards and mentor: you multiply other engineers, not just your own output.

Your starting advantage: an experienced senior engineer/architect (10–15+ yrs) already has the hardest part — distributed-systems and architecture depth. The move to AI-Architect is mostly (1) sharpening GenAI/agentic depth, (2) earning credible AI + cloud certifications, (3) producing visible AI impact and a portfolio, (4) building a leadership / thought-leadership signal, and (5) running a targeted search. The other tiles in this app are the study material for each phase.

Timeline at a glance — about 9 months of focused effort (realistically 6–12, depending on where you start):

- Phase 1 — GenAI & Agentic Depth: Months 1–3
- Phase 2 — Architecture & System-Design Mastery: Months 1–4 (parallel)
- Phase 3 — Certifications: Months 2–6 (parallel)
- Phase 4 — Visible Impact & Portfolio: Months 2–7 (ongoing)
- Phase 5 — Thought Leadership & Network: Months 4–8
- Phase 6 — Target, Apply & Interview: Months 6–9

Run the phases in parallel, not strictly in sequence: depth-building (1–2), credentials (3), and impact (4) overlap, and the search (6) begins the moment you have signal worth showing.`,
    resources: [
      { key: 'r1', title: 'Levels.fyi — target roles & compensation benchmarks', url: 'https://www.levels.fyi/', kind: 'tool', note: 'Calibrate target level and comp for AI-Architect / Staff / Principal.' },
      { key: 'r2', title: 'StaffEng — what senior technical-leadership roles really are', url: 'https://staffeng.com/guides/', kind: 'article' },
    ] },

  { ...RM, slug: 'roadmap-phase1-genai', order: 2, section: 'Execution plan',
    title: 'Phase 1 — GenAI & Agentic Depth',
    tagline: 'Months 1–3 · become fluent in the modern GenAI/agentic stack.',
    content: `Completion time: about 3 months at 8–10 hrs/week.

Objective: move from "I've used LLMs" to "I can architect production GenAI and agentic systems."

- Master the stack: RAG (hybrid retrieval, chunking, reranking), agents & orchestration (LangGraph / agent SDKs, tool use, memory), evaluation & observability, prompt engineering, guardrails, cost/latency control, and MCP.
- Build two non-trivial things and ship them: (a) a RAG system over real data with an eval harness; (b) an agentic workflow with human-in-the-loop and tracing. Measure both.
- In this app: work the AI Courseware track end-to-end, and the "AI Leverage" questions in the Software Architect / Technology Lead role tiles.

Success criteria: you can whiteboard a production GenAI architecture, name its failure modes, and defend the trade-offs — the way an interviewer for an AI-Architect role expects.`,
    resources: [
      { key: 'r1', title: 'Generative AI with LLMs (DeepLearning.AI)', url: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/', kind: 'course' },
      { key: 'r2', title: 'Building Effective Agents (Anthropic)', url: 'https://www.anthropic.com/research/building-effective-agents', kind: 'article' },
    ] },

  { ...RM, slug: 'roadmap-phase2-architecture', order: 3, section: 'Execution plan',
    title: 'Phase 2 — Architecture & System-Design Mastery',
    tagline: 'Months 1–4 (parallel) · interview-grade system + AI-platform design.',
    content: `Completion time: about 3–4 months, in parallel with Phase 1.

Objective: design large-scale systems AND AI platforms under interview conditions.

- Drill HLD + LLD: scalability, data, caching, messaging, consistency — plus the architect algorithms (rate limiting, load balancing, consistent hashing, resilience patterns).
- Add the AI-platform overlay: vector/feature stores, model serving, inference scaling and cost, data pipelines, MLOps/LLMOps, and safety/governance.
- Practice 15–20 design prompts out loud, always closing on trade-offs and "where it breaks first."
- In this app: the System Design, Low-Level Design, and Architecture Algorithms courses, plus the Prep 1 deep dives.

Success criteria: you can lead a system-design interview and pivot smoothly into the AI-specific design questions.`,
    resources: [
      { key: 'r1', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', kind: 'docs' },
      { key: 'r2', title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', kind: 'docs' },
    ] },

  { ...RM, slug: 'roadmap-phase3-certs', order: 4, section: 'Execution plan',
    title: 'Phase 3 — Certifications',
    tagline: 'Months 2–6 (parallel) · credible AI + cloud credentials.',
    content: `Completion time: about 4 months for 2–3 certifications, in parallel with the rest.

Objective: add resume-credible, ATS-friendly proof — especially valuable for AI-Architect roles, where an AI credential is still a differentiator.

- Core pair: one AI/GenAI cert (e.g., AWS ML Specialty or Google Professional ML Engineer, or a GenAI-specific cert) + one cloud-architect cert (AWS Solutions Architect – Professional, or your cloud's equivalent).
- Quick early signal: a foundational AI cert (AWS AI Practitioner or Azure AI-900) in the first few weeks.
- In this app: the AI Certifications and Cloud & Platform Certifications tiles list the exact exams, official links, and a recommended order.

Success criteria: 2–3 relevant certifications on your profile within six months, at least one AI-specific.`,
    resources: [
      { key: 'r1', title: 'AWS Certification catalog (all exams)', url: 'https://aws.amazon.com/certification/', kind: 'docs' },
    ] },

  { ...RM, slug: 'roadmap-phase4-impact', order: 5, section: 'Execution plan',
    title: 'Phase 4 — Visible Impact & Portfolio',
    tagline: 'Months 2–7 (ongoing) · proof you ship AI with business impact.',
    content: `Completion time: ongoing — but have 2–3 flagship items ready by month 7.

Objective: senior and architect hiring is won on IMPACT, not knowledge. Manufacture visible, quantified AI impact.

- At work: lead or co-lead a real GenAI initiative — an internal copilot, RAG over company data, an agentic workflow, or an AI cost/latency optimization — and quantify it (time saved, cost cut, adoption, revenue enabled).
- Outside work: 2–3 portfolio projects on GitHub with clean READMEs and architecture diagrams (this courseware app is itself one such example), each with a short case-study write-up.
- Frame every story with the STAR + explicit-trade-offs structure (see Prep 1 → "Presenting Your Projects").

Success criteria: 2–3 quantified AI-impact stories you can deliver in two minutes each, with technical depth on tap when the interviewer pulls a thread.`,
    resources: [] },

  { ...RM, slug: 'roadmap-phase5-leadership', order: 6, section: 'Execution plan',
    title: 'Phase 5 — Thought Leadership & Network',
    tagline: 'Months 4–8 · become findable and referable.',
    content: `Completion time: about 4 months of steady, light-touch effort.

Objective: lead AI-Architect roles at top MNCs are frequently filled via referral and inbound interest — make yourself discoverable and credible.

- Publish: 4–6 technical posts or threads on your AI-architecture work (LinkedIn, a blog, dev.to). Depth over frequency.
- Speak: one internal talk and one meetup/community talk on GenAI architecture.
- Network deliberately: reconnect with former colleagues now at target companies, engage in AI-engineering communities, and reposition your LinkedIn headline and About around "AI Architect."
- Recruiter-ready resume: lead with AI/GenAI impact and architecture ownership, and mirror the language of target JDs (the role-prep tiles here show exactly what they screen for).

Success criteria: an AI-Architect-positioned profile, a few published pieces, and 5–10 warm contacts inside target companies.`,
    resources: [
      { key: 'r1', title: 'StaffEng — guides to staff-plus roles', url: 'https://staffeng.com/guides/', kind: 'article' },
      { key: 'r2', title: 'The Pragmatic Engineer', url: 'https://newsletter.pragmaticengineer.com/', kind: 'article' },
    ] },

  { ...RM, slug: 'roadmap-phase6-search', order: 7, section: 'Execution plan',
    title: 'Phase 6 — Target, Apply & Interview',
    tagline: 'Months 6–9 · run the search and convert to an offer.',
    content: `Completion time: about 3 months from first applications to offer (varies with market and luck).

Objective: convert the preparation into a lead AI-Architect offer at a top MNC.

- Build a target list of 15–25 companies (FAANG-tier, leading AI/product firms, and strong global capability centers) with active AI-Architect / Principal / Staff (AI) roles; calibrate level and compensation on Levels.fyi.
- Prefer warm intros over cold applications, and apply in batches so interviews — and therefore offers — cluster (clustered offers give you leverage).
- Prepare the full loop: system design (+ AI-platform design), the coding/DSA screen, an AI/GenAI deep dive, and leadership/behavioral rounds (ownership, influence, impact) — all covered by the Prep 1, Software Architect, Technology Lead, and Q&A tiles here.
- Negotiate from multiple offers, and for a lead role negotiate scope — what you will own and decide — as hard as you negotiate compensation.

Success criteria: onsite loops at several targets, then an offer for a role with genuine AI-architecture ownership and leadership scope.`,
    resources: [
      { key: 'r1', title: 'Levels.fyi — companies, levels & compensation', url: 'https://www.levels.fyi/', kind: 'tool' },
    ] },
];
