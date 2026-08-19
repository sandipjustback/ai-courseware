// Certification tracks — AI certs and Cloud/Platform certs for senior / architect / tech-lead level.
// Each "lesson" is a category with guidance + official, verified exam links.

const AIC = { course: 'ai-certs', badge: 'Certification', priority: 1 };
const CLC = { course: 'cloud-certs', badge: 'Certification', priority: 3 };

export const aiCertModules = [
  { ...AIC, slug: 'ai-certs-cloud-ml', order: 1,
    title: 'Cloud AI/ML Engineering Certs',
    tagline: 'AWS, Azure, and Google ML/AI credentials — pick your cloud.',
    content: `For a senior engineer, tech lead, or architect moving into AI-heavy roles, a cloud-provider ML/AI certification signals you can design and ship ML/GenAI on real infrastructure — not just prototype in a notebook. Choose the track that matches your primary cloud.

- Engineering depth: AWS Certified Machine Learning – Specialty and Google's Professional ML Engineer are the most respected for hands-on ML system design (data pipelines, training, deployment, monitoring).
- Lead / architect credibility: the foundational tiers (AWS AI Practitioner, Azure AI-900) are fast, high-signal credentials if you architect and lead rather than train models yourself.
- MLOps middle ground: AWS Machine Learning Engineer – Associate focuses on operationalizing models.

A practical order for a lead: a foundational cert first for vocabulary and credibility, then the engineering-depth cert on your main cloud if the role is hands-on ML.`,
    resources: [
      { key: 'r1', title: 'AWS Certified Machine Learning – Specialty', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/', kind: 'course', note: 'Deep ML engineering on AWS — the flagship ML cert.' },
      { key: 'r2', title: 'AWS Certified Machine Learning Engineer – Associate', url: 'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/', kind: 'course', note: 'MLOps / operationalizing models.' },
      { key: 'r3', title: 'AWS Certified AI Practitioner', url: 'https://aws.amazon.com/certification/certified-ai-practitioner/', kind: 'course', note: 'Foundational — fast credibility for leads.' },
      { key: 'r4', title: 'Microsoft Azure AI Engineer Associate (AI-102)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/', kind: 'course', note: 'Building AI solutions on Azure (incl. Azure OpenAI).' },
      { key: 'r5', title: 'Microsoft Azure AI Fundamentals (AI-900)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/', kind: 'course', note: 'Foundational Azure AI.' },
      { key: 'r6', title: 'Google Cloud Professional Machine Learning Engineer', url: 'https://cloud.google.com/learn/certification/machine-learning-engineer', kind: 'course', note: 'ML system design & MLOps on GCP.' },
    ] },
  { ...AIC, slug: 'ai-certs-genai', order: 2,
    title: 'Generative AI & LLM Certs',
    tagline: 'The modern GenAI stack — RAG, LLMs, agents, evaluation.',
    content: `The fastest-growing and most relevant category for agentic / GenAI architect roles. These validate the modern GenAI stack — RAG, prompt engineering, fine-tuning, vector search, evaluation, and LLM application design.

- Leader / architect angle: Google Cloud's Generative AI Leader targets strategy and capability decisions rather than model training — a good fit for tech leads.
- Engineering angle: NVIDIA's Generative AI & LLMs Associate is a solid, vendor-focused engineering credential; Databricks' Generative AI Engineer Associate targets building production LLM/RAG apps on a data platform.

These pair well with the AI Courseware and Software Architect tracks in this app — the cert proves the breadth, the courses give the depth.`,
    resources: [
      { key: 'r1', title: 'Google Cloud Generative AI Leader', url: 'https://cloud.google.com/learn/certification/generative-ai-leader', kind: 'course', note: 'Strategy/capability focus — ideal for leads & architects.' },
      { key: 'r2', title: 'NVIDIA-Certified Associate: Generative AI & LLMs', url: 'https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/', kind: 'course', note: 'Engineering-focused GenAI/LLM credential.' },
      { key: 'r3', title: 'Databricks Generative AI Engineer Associate (Certification catalog)', url: 'https://www.databricks.com/learn/certification', kind: 'course', note: 'Production LLM/RAG apps on a data platform.' },
    ] },
  { ...AIC, slug: 'ai-certs-applied', order: 3,
    title: 'Applied ML Certificates (Coursera / DeepLearning.AI)',
    tagline: 'Respected course certificates for hands-on depth.',
    content: `Course-completion certificates that carry real weight because of content quality — ideal for demonstrating hands-on depth and for leads ramping into AI. They aren't proctored vendor exams, but the DeepLearning.AI / Andrew Ng name is widely recognized and the material is genuinely strong.

- Generative AI with LLMs (DeepLearning.AI × AWS) is the single most relevant short course for GenAI engineers today.
- The Machine Learning and Deep Learning specializations build fundamentals.
- IBM's AI Engineering Professional Certificate is a broader applied path.`,
    resources: [
      { key: 'r1', title: 'Generative AI with LLMs (DeepLearning.AI on Coursera)', url: 'https://www.coursera.org/learn/generative-ai-with-llms', kind: 'course', note: 'The most relevant short GenAI course.' },
      { key: 'r2', title: 'Machine Learning Specialization (Andrew Ng)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', kind: 'course' },
      { key: 'r3', title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', kind: 'course' },
      { key: 'r4', title: 'IBM AI Engineering Professional Certificate', url: 'https://www.coursera.org/professional-certificates/ai-engineer', kind: 'course' },
    ] },
];

export const cloudCertModules = [
  { ...CLC, slug: 'cloud-certs-aws', order: 1,
    title: 'AWS Certifications',
    tagline: 'The default, most-recognized cloud cert path.',
    content: `AWS is the most widely recognized cloud certification path. For an architect:

- Solutions Architect – Professional (SAP-C02) is the flagship — deep, broad system design on AWS.
- Solutions Architect – Associate (SAA-C03) is the entry and the best starting point.
- Developer – Associate and DevOps Engineer – Professional round out build-and-operate depth.

Practical order: SAA → SAP; add DevOps Engineer – Professional if your role is platform/reliability-heavy. Specialty exams (Security, Advanced Networking, Machine Learning) go deeper where your domain demands it.`,
    resources: [
      { key: 'r1', title: 'AWS Certified Solutions Architect – Associate (SAA-C03)', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', kind: 'course', note: 'Start here.' },
      { key: 'r2', title: 'AWS Certified Solutions Architect – Professional (SAP-C02)', url: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/', kind: 'course', note: 'The architect flagship.' },
      { key: 'r3', title: 'AWS Certified Developer – Associate (DVA-C02)', url: 'https://aws.amazon.com/certification/certified-developer-associate/', kind: 'course' },
      { key: 'r4', title: 'AWS Certified DevOps Engineer – Professional (DOP-C02)', url: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/', kind: 'course', note: 'For platform/reliability roles.' },
      { key: 'r5', title: 'AWS Certification catalog (all exams)', url: 'https://aws.amazon.com/certification/', kind: 'docs' },
    ] },
  { ...CLC, slug: 'cloud-certs-mongodb', order: 2,
    title: 'MongoDB Certifications',
    tagline: 'Data-platform depth via MongoDB University.',
    content: `Directly relevant if you own or design on a MongoDB estate. MongoDB University offers two current associate credentials plus the program overview; they validate schema/data modeling, querying, indexing, and operations.

- Associate Developer — application-side (data modeling, aggregation, drivers).
- Associate Database Administrator — operations (deployment, scaling, backup, security).`,
    resources: [
      { key: 'r1', title: 'MongoDB Certification Program (overview)', url: 'https://learn.mongodb.com/pages/certification-program', kind: 'docs' },
      { key: 'r2', title: 'MongoDB Associate Developer', url: 'https://learn.mongodb.com/pages/mongodb-associate-developer-exam', kind: 'course' },
      { key: 'r3', title: 'MongoDB Associate Database Administrator', url: 'https://learn.mongodb.com/pages/mongodb-associate-database-administrator-exam', kind: 'course' },
    ] },
  { ...CLC, slug: 'cloud-certs-k8s', order: 3,
    title: 'Kubernetes & Cloud Native (CNCF)',
    tagline: 'Hands-on, performance-based container credentials.',
    content: `The container/orchestration gold standard — CNCF exams are hands-on and performance-based (you operate a real cluster under time pressure), which is why they carry weight.

- CKA (Administrator) and CKS (Security) are the most valued for architects and platform roles.
- CKAD (Application Developer) for engineers shipping to Kubernetes.
- KCNA is the entry-level, multiple-choice starting point.

CKS requires a current CKA. Budget real hands-on practice — these can't be crammed.`,
    resources: [
      { key: 'r1', title: 'Certified Kubernetes Administrator (CKA)', url: 'https://www.cncf.io/training/certification/cka/', kind: 'course', note: 'Most valued for architects/platform.' },
      { key: 'r2', title: 'Certified Kubernetes Application Developer (CKAD)', url: 'https://www.cncf.io/training/certification/ckad/', kind: 'course' },
      { key: 'r3', title: 'Certified Kubernetes Security Specialist (CKS)', url: 'https://www.cncf.io/training/certification/cks/', kind: 'course', note: 'Requires a current CKA.' },
      { key: 'r4', title: 'Kubernetes and Cloud Native Associate (KCNA)', url: 'https://www.cncf.io/training/certification/kcna/', kind: 'course', note: 'Entry-level, multiple choice.' },
    ] },
  { ...CLC, slug: 'cloud-certs-other', order: 4,
    title: 'Infrastructure, Streaming & Other Clouds',
    tagline: 'Terraform, Kafka, and Azure/GCP architect credentials.',
    content: `Round out the stack based on your platform and domain:

- HashiCorp Terraform Associate — the standard Infrastructure-as-Code credential.
- Confluent (Apache Kafka) — for event-driven and streaming architectures.
- Azure Solutions Architect Expert (AZ-305) or Google Professional Cloud Architect — the architect flagship if your org is Azure or GCP rather than AWS.

Multi-cloud breadth helps at architect level, but depth on your primary cloud matters more than collecting badges.`,
    resources: [
      { key: 'r1', title: 'HashiCorp Certified: Terraform Associate', url: 'https://developer.hashicorp.com/certifications/infrastructure-automation', kind: 'course', note: 'Standard IaC credential.' },
      { key: 'r2', title: 'Confluent Apache Kafka Certifications', url: 'https://www.confluent.io/certification/', kind: 'course', note: 'For event-driven/streaming.' },
      { key: 'r3', title: 'Microsoft Azure Solutions Architect Expert (AZ-305)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/', kind: 'course', note: 'Azure architect flagship.' },
      { key: 'r4', title: 'Google Cloud Professional Cloud Architect', url: 'https://cloud.google.com/learn/certification/cloud-architect', kind: 'course', note: 'GCP architect flagship.' },
    ] },
];
