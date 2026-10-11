const fs = require('fs');
const path = require('path');

const pagesDir = path.join('d:', 'HK WEBSITE', 'frontend', 'src', 'pages');

const SERVICES_DATA = [
  {
    categoryTitle: 'Software Development',
    categoryUrl: '/services/software-development',
    categoryColor: 'blue-500',
    categoryIcon: 'code',
    categoryTag: 'SOFTWARE ENGINEERING DIVISION',
    services: [
      { name: 'Web Development', url: '/services/web-development' },
      { name: 'Web Application Development', url: '/services/web-application-development' },
      { name: 'Mobile App Development', url: '/services/mobile-app-development' },
      { name: 'Custom Software Development', url: '/services/custom-software-development' },
      { name: 'SaaS Development', url: '/services/saas-development' },
      { name: 'ERP Development', url: '/services/erp-development' },
      { name: 'CRM Development', url: '/services/crm-development' },
      { name: 'API Development', url: '/services/api-development' },
      { name: 'Ecommerce Web Development Service', url: '/services/ecommerce-web-development' },
    ]
  },
  {
    categoryTitle: 'Digital Marketing',
    categoryUrl: '/services/digital-marketing',
    categoryColor: 'pink-500',
    categoryIcon: 'trending-up',
    categoryTag: 'GROWTH & PERFORMANCE DIVISION',
    services: [
      { name: 'SEO', url: '/services/seo' },
      { name: 'Local SEO', url: '/services/local-seo' },
      { name: 'Technical SEO', url: '/services/technical-seo' },
      { name: 'AI SEO', url: '/services/ai-seo' },
      { name: 'Generative Engine Optimization (GEO)', url: '/services/generative-engine-optimization' },
      { name: 'Google Ads / PPC', url: '/services/google-ads-ppc' },
      { name: 'Meta Ads', url: '/services/meta-ads' },
      { name: 'Social Media Marketing', url: '/services/social-media-marketing' },
      { name: 'Content Marketing', url: '/services/content-marketing' },
      { name: 'Lead Generation', url: '/services/lead-generation' },
      { name: 'Marketing Automation', url: '/services/marketing-automation' },
    ]
  },
  {
    categoryTitle: 'AI & Automation',
    categoryUrl: '/services/ai-automation',
    categoryColor: 'purple-500',
    categoryIcon: 'cpu',
    categoryTag: 'NEXT-GEN AI & AUTOMATION',
    services: [
      { name: 'AI Consulting', url: '/services/ai-consulting' },
      { name: 'AI Strategy', url: '/services/ai-strategy' },
      { name: 'Generative AI Solutions', url: '/services/generative-ai-solutions' },
      { name: 'AI Integration', url: '/services/ai-integration' },
      { name: 'AI Agent Development', url: '/services/ai-agent-development' },
      { name: 'LLM Development', url: '/services/llm-development' },
      { name: 'AI Chatbot Development', url: '/services/ai-chatbot-development' },
      { name: 'Business Automation', url: '/services/business-automation' },
    ]
  },
  {
    categoryTitle: 'Design & Branding',
    categoryUrl: '/services/designing',
    categoryColor: 'rose-500',
    categoryIcon: 'palette',
    categoryTag: 'CREATIVE LABS & UI/UX STUDIO',
    services: [
      { name: 'Branding', url: '/services/branding' },
      { name: 'Logo Design', url: '/services/logo-design' },
      { name: 'Graphic Design', url: '/services/graphic-design' },
      { name: 'UI/UX Design', url: '/services/ui-ux-design' },
      { name: 'Product Design', url: '/services/product-design' },
      { name: 'Website Design', url: '/services/website-design' },
    ]
  },
  {
    categoryTitle: 'Consulting',
    categoryUrl: '/services/consulting',
    categoryColor: 'emerald-500',
    categoryIcon: 'briefcase',
    categoryTag: 'ENTERPRISE STRATEGIC ADVISORY',
    services: [
      { name: 'IT Consulting', url: '/services/it-consulting' },
      { name: 'Software Consulting', url: '/services/software-consulting' },
      { name: 'Technology Consulting', url: '/services/technology-consulting' },
      { name: 'Digital Transformation Consulting', url: '/services/digital-transformation-consulting' },
    ]
  },
  {
    categoryTitle: 'Startup Solutions',
    categoryUrl: '/services/startup-solutions',
    categoryColor: 'amber-500',
    categoryIcon: 'rocket',
    categoryTag: 'VENTURE STUDIO & ACCELERATOR',
    services: [
      { name: 'Startup Consulting', url: '/services/startup-consulting' },
      { name: 'MVP Development', url: '/services/mvp-development' },
      { name: 'Startup Branding', url: '/services/startup-branding' },
      { name: 'Product Strategy', url: '/services/product-strategy' },
      { name: 'Startup Technology Solutions', url: '/services/startup-technology-solutions' },
      { name: 'Startup Digital Growth', url: '/services/startup-digital-growth' },
    ]
  }
];

// Rich Category Specific Data Dictionaries
const CATEGORY_DETAILS = {
  'Software Development': {
    subtitle: 'High-Performance Custom Software & Web Engineering for Ambitious Enterprises',
    description: 'We architect scalable, enterprise-grade software systems, robust microservices, and bespoke web platforms. Combining modern frameworks with clean architecture, our engineering squads build resilient products that handle millions of requests without breaking a sweat.',
    capabilities: [
      {
        title: 'High-Velocity Frontends',
        desc: 'Sub-second rendering, dynamic SSR/ISR architectures, and WCAG AA compliant interfaces built on Next.js 15 & React 19.',
        deliverables: ['Core Web Vitals < 200ms', 'Zero Cumulative Layout Shift', 'Responsive Multi-Device Layouts'],
        tag: 'Modern UI'
      },
      {
        title: 'Scalable Microservices & APIs',
        desc: 'Decoupled, event-driven backend microservices with automatic rate-limiting, schema validation, and gRPC / REST protocols.',
        deliverables: ['FastAPI & Node.js Microservices', 'GraphQL & REST Endpoints', 'High Concurrency Throughput'],
        tag: 'Backend Core'
      },
      {
        title: 'Enterprise Database Mesh',
        desc: 'Relational ACID-compliant databases and distributed caching meshes designed for zero downtime and transactional integrity.',
        deliverables: ['PostgreSQL & MySQL Clustering', 'Redis In-Memory Caching', 'Automated Sharding & Replication'],
        tag: 'Data Architecture'
      },
      {
        title: 'Automated CI/CD & DevOps',
        desc: 'Zero-downtime rolling deployments, containerized Kubernetes pods, and automated regression testing pipelines.',
        deliverables: ['Docker & Kubernetes Orchestration', 'AWS / Google Cloud CI/CD', 'Automated Unit & E2E Testing'],
        tag: 'Cloud & Infrastructure'
      },
      {
        title: 'Enterprise Security & IAM',
        desc: 'Military-grade encryption, OAuth2 / JWT authentication, role-based access control, and OWASP Top 10 security compliance.',
        deliverables: ['256-Bit SSL/TLS Encryption', 'Role-Based Access Control (RBAC)', 'Continuous Vulnerability Scans'],
        tag: 'Security & Auth'
      },
      {
        title: 'Legacy Modernization & Cloud Migration',
        desc: 'Refactor obsolete monolithic systems into nimble, cloud-native architectures with zero operational business disruption.',
        deliverables: ['Monolith-to-Microservices Migration', 'Cloud Infrastructure Optimization', 'Zero Data Loss Migration'],
        tag: 'Modernization'
      }
    ],
    techStack: [
      { name: 'React 19', role: 'Interactive Component Architecture' },
      { name: 'Next.js 15', role: 'Full-Stack SSR & Edge Runtime' },
      { name: 'TypeScript', role: 'Type-Safe Robust Engineering' },
      { name: 'Python / FastAPI', role: 'High-Speed Async API Gateway' },
      { name: 'Node.js', role: 'High-Concurrency Event Loop' },
      { name: 'PostgreSQL', role: 'Relational ACID Data Storage' },
      { name: 'Redis', role: 'Sub-Millisecond In-Memory Caching' },
      { name: 'Docker & K8s', role: 'Container Orchestration & Scaling' },
      { name: 'AWS & GCP', role: 'Multi-Region High-Availability Cloud' },
      { name: 'GraphQL', role: 'Predictable Declarative Data Fetching' }
    ],
    faqs: [
      {
        q: 'How long does a complete software development cycle take?',
        a: 'A focused MVP or core feature set is typically engineered in 4 to 6 weeks. Comprehensive enterprise ecosystems take between 8 to 14 weeks, delivered iteratively through bi-weekly agile sprint milestones with transparent demo reviews.'
      },
      {
        q: 'Who retains the intellectual property (IP) and source code?',
        a: 'You retain 100% intellectual property ownership, complete Git repository access, documentation, and database schemas from day one. We enforce a zero vendor lock-in guarantee.'
      },
      {
        q: 'How do you guarantee code quality and security standards?',
        a: 'Every line of code goes through automated static analysis (SonarQube/Linter), peer code reviews, continuous integration unit tests, and OWASP Top 10 vulnerability checks before staging deployment.'
      },
      {
        q: 'Can your engineering squad collaborate with our existing in-house team?',
        a: 'Absolutely. We seamlessly integrate into your current Slack/Discord channels, Jira/Linear sprint boards, GitHub pull request workflows, and daily stand-ups as dedicated squads or staff augmentation.'
      },
      {
        q: 'What post-launch SLA and maintenance support do you provide?',
        a: 'We offer dedicated 24/7 SLA contracts that guarantee 15-minute emergency response times, automated uptime monitoring, server security patching, database optimization, and continuous feature enhancement.'
      }
    ]
  },

  'Digital Marketing': {
    subtitle: 'Data-Driven Search Engine Dominance, Performance Ads & Full-Funnel Growth',
    description: 'We engineer high-ROI growth loops that capture commercial intent. From top-tier organic search engine optimization (SEO) and Generative Engine Optimization (GEO) to laser-focused paid ad funnels, we turn visitors into loyal revenue streams.',
    capabilities: [
      {
        title: 'Technical & Algorithmic SEO',
        desc: 'Deep crawl budget optimization, JavaScript rendering fixes, Core Web Vitals acceleration, and schema markup injection.',
        deliverables: ['Lighthouse 95+ Performance', 'JSON-LD Rich Snippet Coverage', 'Indexation & Crawl Health Audits'],
        tag: 'Technical Foundation'
      },
      {
        title: 'Generative Engine Optimization (GEO)',
        desc: 'Proprietary strategies ensuring your brand is cited and recommended as the primary authority in ChatGPT, Perplexity, and Gemini search.',
        deliverables: ['AI Search Citations Strategy', 'Entity & Knowledge Graph Alignment', 'Conversational Search Visibility'],
        tag: 'Next-Gen Search'
      },
      {
        title: 'High-Intent Google Ads & PPC',
        desc: 'Laser-targeted Google Search, Shopping, and Performance Max campaigns with aggressive negative keyword filtering to maximize ROI.',
        deliverables: ['Sub-15% Cost Per Acquisition', 'High Quality Score (>8/10)', 'Automated Bid & Conversion Tracking'],
        tag: 'Paid Performance'
      },
      {
        title: 'Meta & Paid Social Scaling',
        desc: 'Full-funnel creative testing frameworks across Meta, LinkedIn, and Instagram backed by server-side Conversions API (CAPI).',
        deliverables: ['High-Converting Video & Static Creatives', 'First-Party CAPI Tracking', 'Dynamic Retargeting Loops'],
        tag: 'Social Growth'
      },
      {
        title: 'Topical Authority Content Strategy',
        desc: 'E-E-A-T aligned keyword clustering that builds semantic authority, capturing high-intent long-tail transactional queries.',
        deliverables: ['Comprehensive Keyword Mapping', 'Thought-Leadership Articles', 'Zero Keyword Cannibalization'],
        tag: 'Organic Content'
      },
      {
        title: 'Marketing Automation & Lead Nurturing',
        desc: 'Automated multi-channel email workflows, webhook routing, and lead qualification scoring that converts warm leads into sales.',
        deliverables: ['HubSpot / Zapier Workflows', 'Automated Drip Sequences', 'Real-Time CRM Sync'],
        tag: 'Conversion Funnels'
      }
    ],
    techStack: [
      { name: 'Google Search Console', role: 'Indexation & Core Ranking Analytics' },
      { name: 'Ahrefs & SEMrush', role: 'Competitive Intelligence & Keyword Audits' },
      { name: 'Google Analytics 4', role: 'Full-Funnel Event & Attribution Tracking' },
      { name: 'Meta Business Suite', role: 'High-Performance Social Ad Scaling' },
      { name: 'Google Ads (PMax)', role: 'Intent-Driven Search & Display Reach' },
      { name: 'Screaming Frog', role: 'Deep Architecture & Technical Crawling' },
      { name: 'Looker Studio', role: 'Live Transparent Client KPI Dashboards' },
      { name: 'HubSpot CRM', role: 'Lead Pipeline & Marketing Automation' },
      { name: 'Zapier / Make', role: 'Zero-Latency Workflow Webhooks' },
      { name: 'Hotjar', role: 'Behavioral Heatmaps & Conversion Optimization' }
    ],
    faqs: [
      {
        q: 'How fast can our business expect tangible organic SEO results?',
        a: 'Technical SEO fixes and indexation improvements show initial traffic shifts within 3 to 5 weeks. Competitive keyword rankings and high-intent commercial positions compound over 3 to 6 months into sustained organic lead generation.'
      },
      {
        q: 'What is Generative Engine Optimization (GEO) and why is it crucial today?',
        a: 'As users migrate from classic search engines to AI assistants (ChatGPT, Gemini, Perplexity), GEO optimizes your digital footprint, entity structure, and brand citations so AI models surface your company as the definitive solution.'
      },
      {
        q: 'How do you monitor and report return on investment (ROI)?',
        a: 'We provide real-time Looker Studio dashboards linked to Google Analytics 4 and your CRM. You will track exact Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and organic pipeline revenue with weekly transparent syncs.'
      },
      {
        q: 'Do you create the ad creatives and copywriting in-house?',
        a: 'Yes. Our dedicated creative studio produces high-converting ad copy, visual assets, video hooks, and custom landing pages specifically engineered for maximum conversion rates.'
      },
      {
        q: 'How do you eliminate wasted ad spend on Google and Meta Ads?',
        a: 'Through extensive daily negative keyword audits, conversion API deduplication, strict demographic exclusions, and iterative A/B creative testing to continuously lower Cost Per Acquisition (CPA).'
      }
    ]
  },

  'AI & Automation': {
    subtitle: 'Autonomous AI Agents, Custom LLM Architectures & Intelligent Process Automation',
    description: 'We unlock exponential productivity for forward-thinking organizations. By implementing autonomous multi-agent pipelines, enterprise RAG architectures, and custom fine-tuned LLMs, we transform manual operational bottlenecks into autonomous competitive moats.',
    capabilities: [
      {
        title: 'Autonomous Multi-Agent Workflows',
        desc: 'Specialized agent swarms equipped with tool execution, dynamic planning, reasoning loops, and self-correcting validation.',
        deliverables: ['Custom LangGraph & CrewAI Squads', 'Autonomous Decision Pipelines', 'Automated Tool & API Invocation'],
        tag: 'Agentic AI'
      },
      {
        title: 'Enterprise RAG & Custom LLMs',
        desc: 'Private vector search pipelines integrating your proprietary knowledge bases with zero risk of public data leakage.',
        deliverables: ['Hybrid Semantic Vector Search', 'Milvus & Pinecone Databases', 'Zero-Retention Private Endpoints'],
        tag: 'Knowledge Retrieval'
      },
      {
        title: 'Context-Aware AI Assistants & Bots',
        desc: 'Human-parity conversational agents deployed across WhatsApp, web portals, and internal enterprise support channels.',
        deliverables: ['Natural Language Understanding', 'Multilingual 24/7 Intelligence', 'Seamless Human-in-the-Loop Handover'],
        tag: 'Conversational AI'
      },
      {
        title: 'End-to-End Business Automation',
        desc: 'Automating high-friction back-office operations, document extraction, invoice audits, and regulatory compliance checks.',
        deliverables: ['Intelligent Document Processing (OCR)', 'Automated ERP / CRM Data Bridges', '80% Reduction in Manual Tasks'],
        tag: 'Workflow Automation'
      },
      {
        title: 'AI Middleware & API Integration',
        desc: 'Scalable gRPC and REST middleware connecting legacy infrastructure with state-of-the-art AI inference engines.',
        deliverables: ['High-Throughput Streaming Responses', 'Custom Python & FastAPI Adapters', 'Sub-500ms TTFT (Time-To-First-Token)'],
        tag: 'API Architecture'
      },
      {
        title: 'AI Safety, Guardrails & Governance',
        desc: 'Defensive architecture incorporating automated hallucination filters, strict PII redaction, and enterprise compliance boundaries.',
        deliverables: ['NeMo & Llama Guard Integration', 'Automated PII Scrubbing', 'Deterministic Fallback Protocols'],
        tag: 'Security & Ethics'
      }
    ],
    techStack: [
      { name: 'OpenAI API', role: 'Advanced Multi-Modal Reasoning' },
      { name: 'Anthropic Claude', role: 'Extended Context & Complex Coding' },
      { name: 'LangChain & LangGraph', role: 'Agent State Orchestration' },
      { name: 'LlamaIndex', role: 'Enterprise Data Ingestion & Retrieval' },
      { name: 'Pinecone / ChromaDB', role: 'High-Performance Vector Storage' },
      { name: 'Python & PyTorch', role: 'Model Fine-Tuning & Pipeline Execution' },
      { name: 'FastAPI', role: 'Async High-Concurrency Inference Gateway' },
      { name: 'Docker & Ollama', role: 'Local & Private On-Premise LLM Hosting' },
      { name: 'Hugging Face', role: 'Open-Weight Model Evaluation' },
      { name: 'Celery & Redis', role: 'Distributed Asynchronous Task Queues' }
    ],
    faqs: [
      {
        q: 'Is our proprietary enterprise data kept completely private and confidential?',
        a: 'Yes, absolutely. We utilize zero-data-retention enterprise API contracts, private VPC cloud deployments, or self-hosted open-source models (Llama 3, Mistral) where your private data is never used to train external public models.'
      },
      {
        q: 'What is the real difference between traditional automation and an Autonomous AI Agent?',
        a: 'Traditional automation follows brittle if-then scripts that break on edge cases. An Autonomous AI Agent reads context, decomposes ambiguous goals into sub-tasks, queries external tools, self-checks its output, and adapts dynamically.'
      },
      {
        q: 'How do you prevent model hallucinations in mission-critical applications?',
        a: 'We implement hybrid Retrieval-Augmented Generation (RAG) with strict semantic relevance thresholds, source citation enforcement, and deterministic guardrail layers that prevent the model from answering beyond verified source documents.'
      },
      {
        q: 'What kind of operational ROI do clients achieve with your AI solutions?',
        a: 'Our enterprise clients typically record a 65% to 80% reduction in manual processing hours, instant 24/7 client response times, and an average 3.5x operational cost savings within 90 days of deployment.'
      },
      {
        q: 'Can AI be retrofitted into our existing legacy CRM or software system?',
        a: 'Yes. We architect lightweight, secure microservices that sit between your existing databases and AI endpoints, requiring zero architectural overhaul of your core legacy systems.'
      }
    ]
  },

  'Design & Branding': {
    subtitle: 'Bespoke Brand Identity Systems, World-Class UI/UX & Interactive Product Design',
    description: 'We craft iconic brand narratives and high-conversion digital interfaces that captivate attention and establish unquestionable market leadership. From comprehensive design systems to fluid micro-interactions, we turn visual identity into an unfair competitive advantage.',
    capabilities: [
      {
        title: 'Strategic Brand Identity Systems',
        desc: 'Comprehensive visual design architecture including logomarks, color psychology guidelines, typography pairings, and brand books.',
        deliverables: ['Vector Master Logomarks', 'Typography & Palette Specifications', 'Comprehensive 60+ Page Brand Guidelines'],
        tag: 'Brand Foundation'
      },
      {
        title: 'High-Conversion UI/UX Architecture',
        desc: 'Wireframing, cognitive walkthroughs, thumb-zone mobile UX, and frictionless conversion checkout funnels built for maximum engagement.',
        deliverables: ['Interactive Clickable Prototypes', 'User Journey Mapping', 'Frictionless Conversion Funnels'],
        tag: 'User Experience'
      },
      {
        title: 'Design Systems & Tokenized Libraries',
        desc: 'Scalable atomic design systems in Figma with auto-layout, design tokens, and synchronized CSS component specifications.',
        deliverables: ['Figma Atomic Component Systems', 'WCAG 2.1 AA Accessibility Standards', 'Developer-Ready Token Handover'],
        tag: 'Design Systems'
      },
      {
        title: 'Interactive 3D & Micro-Animations',
        desc: 'Breathtaking Spline 3D integrations, physics-based gesture feedback, and smooth page transitions that create unforgettable impressions.',
        deliverables: ['Spline 3D Assets', 'Framer Motion Specifications', 'Custom Interactive Vector SVGs'],
        tag: 'Motion & 3D'
      },
      {
        title: 'Product Design & SaaS Dashboards',
        desc: 'Complex data density simplified into intuitive, beautiful analytics dashboards and user-centric software interfaces.',
        deliverables: ['Data-Dense Analytics Dashboards', 'Multi-Role User Interfaces', 'Information Architecture Blueprints'],
        tag: 'Product UX'
      },
      {
        title: 'Mobile-First Responsive Layouts',
        desc: 'Pixel-perfect rendering across mobile, foldable, tablet, and 4K ultra-wide screens ensuring consistent prestige across devices.',
        deliverables: ['Fluid Breakpoint Specifications', 'Touch-Optimized Interaction Models', 'Retina-Ready Vector Assets'],
        tag: 'Responsive Design'
      }
    ],
    techStack: [
      { name: 'Figma', role: 'Collaborative UI/UX & Component Architecture' },
      { name: 'Adobe Illustrator', role: 'Vector Brand Identity & Logomark Precision' },
      { name: 'Spline 3D', role: 'Real-Time WebGL 3D Interactive Assets' },
      { name: 'Framer', role: 'High-Fidelity Production Prototyping' },
      { name: 'Adobe Photoshop', role: 'Editorial Visual Retouching & Compositing' },
      { name: 'Tailwind CSS', role: 'Design Token to Utility-First Translation' },
      { name: 'Storybook', role: 'Isolated Component Testing & Documentation' },
      { name: 'Principle', role: 'High-End Micro-Interaction Physics Design' }
    ],
    faqs: [
      {
        q: 'What assets are included in the final design handover?',
        a: 'You receive complete organized Figma master files, exported vector SVG and WebP assets, design token documentation, interactive prototypes, full font licensing guidance, and a comprehensive brand guidelines manual.'
      },
      {
        q: 'How do you ensure the designs convert visitors into paying clients?',
        a: 'Our UI/UX methodology is grounded in conversion-rate optimization (CRO). We utilize visual hierarchy, F-pattern eye tracking, clear value framing, and frictionless user flows that maximize action triggers.'
      },
      {
        q: 'Can you work with our existing brand guidelines or do we start from scratch?',
        a: 'We can either strictly respect and scale your existing brand identity or perform a modern brand evolution that elevates your aesthetic to international Silicon Valley standards.'
      },
      {
        q: 'How many design revision rounds are included?',
        a: 'We run weekly collaborative design sprints. You participate in prototype reviews and provide iterative feedback until every screen meets 100% satisfaction before developer handoff.'
      },
      {
        q: 'Are your designs compliant with accessibility standards?',
        a: 'Yes. All typography contrast ratios, interactive target sizes, and structural hierarchies comply strictly with WCAG 2.1 AA accessibility standards.'
      }
    ]
  },

  'Consulting': {
    subtitle: 'Strategic Technology Advisory, Cloud Architecture & Digital Transformation Roadmaps',
    description: 'We empower C-suite leaders and enterprise directors to make high-conviction technology investments. From comprehensive architectural audits and cloud cost rationalization to cybersecurity postures and digital transformation roadmaps, we turn tech into pure enterprise value.',
    capabilities: [
      {
        title: 'Enterprise Architecture & Code Audits',
        desc: 'Rigorous deep-dive inspections of your tech stack, database bottlenecks, security flaws, and technical debt accumulation.',
        deliverables: ['360° Technical Debt Assessment', 'Performance Bottleneck Diagnostics', 'Actionable Architectural Roadmap'],
        tag: 'Technical Auditing'
      },
      {
        title: 'Cloud Cost & Infrastructure Rationalization',
        desc: 'Comprehensive cloud audits that identify over-provisioned resources, cut AWS/GCP waste by 30-50%, and boost fault tolerance.',
        deliverables: ['Cloud Spend Reduction Roadmap', 'Multi-Region Failover Architecture', 'Terraform Infrastructure As Code'],
        tag: 'Cloud Optimization'
      },
      {
        title: 'Digital Transformation Roadmaps',
        desc: 'Strategic blueprints migrating legacy business processes into automated, cloud-native digital ecosystems with zero downtime.',
        deliverables: ['Phased Implementation Strategy', 'Change Management Frameworks', 'Measurable Milestone Deliverables'],
        tag: 'Transformation'
      },
      {
        title: 'Fractional CTO & Strategic Advisory',
        desc: 'Executive technical leadership for scaling enterprises—guiding technology roadmaps, vendor evaluations, and hiring strategies.',
        deliverables: ['Board-Level Technology Briefs', 'Engineering Team Structuring', 'Vendor Selection Due Diligence'],
        tag: 'Executive Advisory'
      },
      {
        title: 'Cybersecurity & Compliance Roadmaps',
        desc: 'Vulnerability assessments, penetration testing oversight, and preparation for ISO 27001, SOC2, and GDPR certifications.',
        deliverables: ['Risk Mitigation Matrices', 'Compliance Gap Analysis', 'Zero-Trust Security Policies'],
        tag: 'Security & Governance'
      },
      {
        title: 'Technology Due Diligence for M&A',
        desc: 'In-depth code quality, security vulnerability, and scalability evaluations for private equity and venture capital acquisitions.',
        deliverables: ['Confidential Diligence Reports', 'IP & License Risk Verification', 'Post-Acquisition Integration Roadmaps'],
        tag: 'Due Diligence'
      }
    ],
    techStack: [
      { name: 'AWS Well-Architected', role: 'High-Availability Infrastructure Governance' },
      { name: 'Google Cloud Platform', role: 'Enterprise Data Mesh & AI Scaling' },
      { name: 'Terraform', role: 'Declarative Infrastructure as Code (IaC)' },
      { name: 'Kubernetes', role: 'Resilient Microservices Orchestration' },
      { name: 'SOC2 & ISO 27001', role: 'Compliance Framework Guidelines' },
      { name: 'Datadog & New Relic', role: 'Observability & Telemetry Profiling' },
      { name: 'Jira Enterprise', role: 'Agile Strategy & Sprint Roadmapping' },
      { name: 'PostgreSQL Profiler', role: 'Query Optimization & Index Diagnostics' }
    ],
    faqs: [
      {
        q: 'What is the structure of an initial technical consulting engagement?',
        a: 'We begin with a focused 1 to 2 week deep dive audit. Our senior architects examine your code repositories, cloud infrastructure, database queries, and security configurations, delivering a prioritized executive report with clear ROI projections.'
      },
      {
        q: 'Can you help us cut down our escalating AWS or GCP cloud bills?',
        a: 'Yes. Our infrastructure audits systematically identify over-provisioned nodes, unindexed queries, idle instances, and inefficient bandwidth routing, typically reducing monthly cloud spend by 30% to 50% without sacrificing speed.'
      },
      {
        q: 'Do you only provide strategy documents or do you also write code?',
        a: 'Unlike traditional consulting firms that stop at slide decks, our elite engineering squad can directly implement every architectural recommendation, database migration, and security fix.'
      },
      {
        q: 'How do you protect our trade secrets and proprietary source code during an audit?',
        a: 'We execute comprehensive mutual enterprise non-disclosure agreements (NDAs) prior to accessing any repos or servers, ensuring strict legal protection and confidentiality.'
      },
      {
        q: 'What size organizations do you typically consult for?',
        a: 'We partner with Series A+ startups experiencing hyper-growth scaling bottlenecks up to established mid-market enterprises modernizing legacy software.'
      }
    ]
  },

  'Startup Solutions': {
    subtitle: 'Rapid MVP Engineering, Product-Market Fit Acceleration & Venture Growth',
    description: 'We turn visionary ideas into venture-scale market leaders. As your 360° technology co-founder, we engineer high-impact MVPs in 4 to 6 weeks, build investor-ready clickable prototypes, and deploy resilient architectures that scale smoothly from seed to Series A.',
    capabilities: [
      {
        title: 'Rapid 4-to-6 Week MVP Launch',
        desc: 'Ruthlessly focused core feature engineering that gets your product into the hands of real paying users in record time.',
        deliverables: ['Production-Grade Launch Build', 'Clean Modular Codebase', 'Zero-Waste Feature Scoping'],
        tag: 'Speed To Market'
      },
      {
        title: 'Investor Pitch Decks & Clickable Demos',
        desc: 'Interactive, high-fidelity prototypes and technical one-pagers that convince angel investors and VC partners to write checks.',
        deliverables: ['Figma Clickable Prototypes', 'Technical Architecture Summaries', 'Founder Pitch Deck Support'],
        tag: 'Fundraising'
      },
      {
        title: 'Product-Market Fit & Feature Scoping',
        desc: 'Customer discovery validation, unit economics modeling, and competitive moat analysis that prevent building unwanted features.',
        deliverables: ['User Feedback Loops', 'Core Moat Identification', 'Iterative Feature Roadmaps'],
        tag: 'PMF Strategy'
      },
      {
        title: 'Startup Identity & Launch Kit',
        desc: 'Modern logo, brand typography, viral social media launch graphics, and conversion-optimized landing pages ready for Product Hunt.',
        deliverables: ['High-Conversion Landing Page', 'Social Launch Media Kit', 'Product Hunt Launch Assets'],
        tag: 'Launch Kit'
      },
      {
        title: 'Serverless Auto-Scaling on Day One',
        desc: 'Modern serverless architecture that costs near $0 when idle but effortlessly handles 100,000 viral users with zero crashes.',
        deliverables: ['Next.js & Supabase / Firebase', 'Stripe Billing & Subscriptions', 'Auto-Scaling Cloud Setup'],
        tag: 'Cost-Effective Tech'
      },
      {
        title: 'Growth Telemetry & Analytics Loops',
        desc: 'Complete event tracking, onboarding drop-off funnels, and retention cohort telemetry integrated from the first release.',
        deliverables: ['Mixpanel / PostHog Event Tracking', 'Automated User Onboarding Flows', 'Retention Telemetry Dashboards'],
        tag: 'Growth Telemetry'
      }
    ],
    techStack: [
      { name: 'Next.js 15', role: 'Full-Stack Rapid Production Framework' },
      { name: 'Supabase / PostgreSQL', role: 'Instant Relational DB with Auth & Storage' },
      { name: 'Stripe API', role: 'Global Multi-Currency Billing & Subscriptions' },
      { name: 'Tailwind CSS', role: 'Ultra-Fast Responsive UI Styling' },
      { name: 'PostHog & Mixpanel', role: 'Product Analytics & User Retention Funnels' },
      { name: 'Vercel & Cloudflare', role: 'Global Edge Network Instant Deployments' },
      { name: 'Figma', role: 'Rapid UI/UX Wireframing & Clickable Prototypes' },
      { name: 'OpenAI API', role: 'Native AI Capability Integration' }
    ],
    faqs: [
      {
        q: 'Can you genuinely launch a high-quality MVP in just 4 to 6 weeks?',
        a: 'Yes. By applying the 80/20 rule to focus strictly on your core value proposition and leveraging pre-built, battle-tested architectural boilerplates, we ship production-ready MVPs without cut corners.'
      },
      {
        q: 'How much does developing a startup MVP typically cost?',
        a: 'We provide predictable fixed-price milestone sprints structured specifically for early-stage founder budgets. No hidden hourly billing surprises.'
      },
      {
        q: 'Will the MVP code need to be completely rewritten after our seed funding round?',
        a: 'Never. We build with clean, modular TypeScript, Next.js, and PostgreSQL code adhering to strict enterprise standards so your architecture scales smoothly from 10 to 1,000,000+ users.'
      },
      {
        q: 'Do you take equity in exchange for development work?',
        a: 'We primarily operate on cash milestone sprints, but for select high-conviction ventures, we evaluate hybrid cash-plus-equity models through our HK DigiVerse Ventures studio.'
      },
      {
        q: 'What ongoing support do you provide after product launch?',
        a: 'We support you with continuous bi-weekly iteration sprints, user feedback analysis, database scaling, and smooth technical onboarding when you hire your in-house engineering team.'
      }
    ]
  }
};

const toPascalCase = (str) => {
  return str.replace(/[()]/g, '').split(/[\s-/]+/).filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('').replace(/&/g, 'And');
};

const generateUltraPremiumTemplate = (serviceTitle, categoryTitle, categoryColor, categoryTag, categoryUrl, siblingList) => {
  const catData = CATEGORY_DETAILS[categoryTitle] || CATEGORY_DETAILS['Software Development'];
  const isCategory = serviceTitle === categoryTitle;
  
  const displayTitle = serviceTitle;
  const pageSubtitle = isCategory ? catData.subtitle : `Enterprise-Grade ${serviceTitle} Solutions`;
  const pageDescription = isCategory 
    ? catData.description 
    : `Empower your business with our specialized ${serviceTitle} services. Architected for unmatched speed, military-grade security, and measurable ROI, we build digital solutions that dominate search rankings and drive sustainable growth.`;

  const safeJsonData = JSON.stringify({
    title: displayTitle,
    category: categoryTitle,
    categoryUrl: categoryUrl,
    color: categoryColor,
    tag: categoryTag,
    description: pageDescription,
    capabilities: catData.capabilities,
    techStack: catData.techStack,
    faqs: catData.faqs,
    siblings: siblingList
  }, null, 2);

  return `import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function ${toPascalCase(serviceTitle)}Page() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTechCategory, setActiveTechCategory] = useState('All');

  const pageData = ${safeJsonData};

  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  };

  // Structured Data (JSON-LD) for Rich Google Snippets
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "${displayTitle}",
        "provider": {
          "@type": "Organization",
          "name": "HK DigiVerse LLP",
          "url": "https://hkdigiverse.com"
        },
        "description": "${pageDescription.replace(/"/g, '\\"')}",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "${displayTitle} Deliverables"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hkdigiverse.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${categoryTitle}",
            "item": "https://hkdigiverse.com${categoryUrl}"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${displayTitle}",
            "item": "https://hkdigiverse.com" + window.location.pathname
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": pageData.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-amber-400 selection:text-black">
      
      {/* Invisible SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-1/4 w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-${categoryColor}/20 via-indigo-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2"
      />
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -25, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[35%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-cyan-900/15 via-purple-900/15 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3"
      />

      {/* ────────────────────────────────────────────────────────
          1. BREADCRUMBS NAVIGATION (CRITICAL FOR SEO HIERARCHY)
          ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="pt-32 pb-4 px-6 max-w-7xl mx-auto relative z-20">
        <motion.ol
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center flex-wrap gap-2 text-xs font-mono text-neutral-500"
        >
          <li>
            <button onClick={() => navigateTo('/')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>Home</span>
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li>
            <button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors cursor-pointer">
              Services
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li>
            <button onClick={() => navigateTo(pageData.categoryUrl)} className="hover:text-white transition-colors text-neutral-400 cursor-pointer">
              {pageData.category}
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li className="text-${categoryColor} font-semibold">
            {pageData.title}
          </li>
        </motion.ol>
      </nav>

      {/* ────────────────────────────────────────────────────────
          2. CINEMATIC HERO SECTION
          ──────────────────────────────────────────────────────── */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category Pill Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-${categoryColor} animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
                  {pageData.tag}
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-[11px] font-mono text-emerald-400">⚡ Sprints &amp; SLA Ready</span>
              </motion.div>

              {/* Main SEO H1 with Staggered Fade */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
                {pageData.title}
              </h1>

              {/* High-Intent Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-medium text-lg sm:text-xl text-neutral-300 mb-6 leading-snug"
              >
                ${pageSubtitle}
              </motion.p>

              {/* Value Proposition Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-light text-neutral-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
              >
                {pageData.description}
              </motion.p>

              {/* Dual Action CTAs with Magnetic Physics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigateTo('/contact')}
                  className="px-8 py-4 bg-${categoryColor} text-white font-bold rounded-full transition-all shadow-xl shadow-${categoryColor}/25 flex items-center gap-3 text-sm cursor-pointer"
                >
                  <span>Launch Your Project</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigateTo('/contact')}
                  className="px-8 py-4 bg-white/5 text-neutral-200 border border-white/10 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Book 15-Min Strategy Call 📞
                </motion.button>
              </motion.div>

              {/* Live Project Availability Status */}
              <div className="mt-8 flex items-center gap-3 text-xs font-mono text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                <span>Currently accepting new engineering &amp; growth partnerships for this quarter.</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Mockup with Smooth Tilt */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group"
            >
              <img
                src="/media/images/gallery/digiverse_workspace.png"
                alt={pageData.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-${categoryColor}/40 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-${categoryColor} uppercase tracking-wider">Quality Verified</span>
                  <span className="text-xs text-emerald-400 font-mono">100% Production Ready</span>
                </div>
                <div className="text-sm font-semibold text-white">Full IP Rights &amp; Code Ownership Transfer</div>
                <div className="text-xs text-neutral-400 mt-1">Backed by enterprise-grade SLAs and transparent sprint logs.</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          3. ENTERPRISE COMPLIANCE & TRUST RIBBON
          ──────────────────────────────────────────────────────── */}
      <section className="relative z-20 py-8 border-y border-white/5 bg-[#07070b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: "🛡️", title: "ISO 27001 Aligned", sub: "Information Security" },
              { icon: "🔒", title: "Strict NDA Guarantee", sub: "100% IP Protected" },
              { icon: "⚡", title: "99.9% Uptime SLA", sub: "Continuous Availability" },
              { icon: "🚀", title: "2-Week Sprint Delivery", sub: "Rapid Iterative Cycles" },
              { icon: "👥", title: "Senior Dedicated Squad", sub: "Zero Junior Outsourcing", extra: "col-span-2 md:col-span-1" }
            ].map((ribbon, rIdx) => (
              <motion.div
                key={rIdx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rIdx * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={\`flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/[0.02] transition-all \${ribbon.extra || ''}\`}
              >
                <span className="text-lg mb-1">{ribbon.icon}</span>
                <span className="font-mono text-xs text-white font-bold tracking-wider">{ribbon.title}</span>
                <span className="text-[10px] text-neutral-500 font-mono">{ribbon.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          4. IMPACT NUMBERS (STATS SHOWCASE)
          ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "150+", label: "Launches Delivered", sub: "Enterprise & Scale-Ups" },
            { value: "99%", label: "Client Retention", sub: "Multi-Year Engagements" },
            { value: "4.9 / 5.0", label: "Clutch & G2 Rating", sub: "Independently Verified" },
            { value: "< 200ms", label: "Core Web Vitals", sub: "Sub-Second Response" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: "rgba(168, 206, 56, 0.5)", boxShadow: "0 15px 35px -10px rgba(168, 206, 56, 0.15)" }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#a8ce38]/50 text-center transition-all cursor-default"
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">{item.value}</div>
              <div className="font-mono text-xs uppercase tracking-wider text-${categoryColor} font-bold mb-1">{item.label}</div>
              <div className="text-[11px] text-neutral-500 font-mono">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          5. DETAILED CORE CAPABILITIES & DELIVERABLES (IN-DEPTH 6-CARD GRID)
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3"
          >
            // Production Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Engineered Deliverables &amp; Technical Capabilities
          </motion.h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-2xl mx-auto">
            We reject vague promises. Here is the exact technical execution and deliverable scope provided under our {pageData.title} division.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageData.capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.018,
                borderColor: "rgba(168, 206, 56, 0.55)",
                boxShadow: "0 25px 50px -12px rgba(168, 206, 56, 0.22)"
              }}
              className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/5 hover:border-[#a8ce38]/50 hover:bg-[#121612]/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-default"
            >
              {/* Ambient Hover Spotlight */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#a8ce38]/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-${categoryColor}/10 border border-${categoryColor}/20 text-${categoryColor} group-hover:bg-[#a8ce38]/15 group-hover:border-[#a8ce38]/40 group-hover:text-[#a8ce38] transition-colors">
                    {cap.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-600 group-hover:text-[#a8ce38] transition-colors">0{idx + 1}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#a8ce38] transition-colors">
                  {cap.title}
                </h3>

                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-2 relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-2">Key Deliverables:</span>
                {cap.deliverables.map((del, dIdx) => (
                  <motion.div
                    key={dIdx}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + (dIdx * 0.05) }}
                    className="flex items-center gap-2 text-xs text-neutral-300"
                  >
                    <svg className="w-3.5 h-3.5 text-[#a8ce38] shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{del}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. INTERACTIVE TECHNOLOGY STACK ECOSYSTEM
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5 bg-[#030306]">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">// Architecture Suite</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Production-Tested Technology Stack
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-2xl mx-auto">
            We work with the world's most performant frameworks, languages, and cloud providers to guarantee security, speed, and continuous scalability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {pageData.techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{
                y: -6,
                scale: 1.05,
                borderColor: "rgba(168, 206, 56, 0.55)",
                backgroundColor: "rgba(168, 206, 56, 0.05)",
                boxShadow: "0 15px 35px -10px rgba(168, 206, 56, 0.2)"
              }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#a8ce38]/50 transition-all text-left flex flex-col justify-between cursor-default group"
            >
              <div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#a8ce38] mb-4 group-hover:scale-125 transition-transform" />
                <h4 className="font-display font-bold text-base text-white mb-1 group-hover:text-[#a8ce38] transition-colors">{tech.name}</h4>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono mt-3 leading-snug">{tech.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          7. STEP-BY-STEP DELIVERY ROADMAP (5-PHASE AGILE WORKFLOW)
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">// Execution Blueprint</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            5-Stage Delivery Methodology
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Structured, transparent, and battle-tested milestones with bi-weekly sprint reviews and zero surprise bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              step: "01",
              title: "Strategic Discovery",
              desc: "Deep requirements mapping, technical audit, KPI alignment, and architectural specification definition."
            },
            {
              step: "02",
              title: "High-Fidelity Architecture",
              desc: "Database schema modeling, UI/UX prototyping, and component wireframing before code execution."
            },
            {
              step: "03",
              title: "Agile Sprint Build",
              desc: "Rapid 2-week continuous development sprints with Git commits, automated tests, and live staging demos."
            },
            {
              step: "04",
              title: "Rigorous QA & Security",
              desc: "Automated regression testing, load benchmarking, OWASP vulnerability scans, and Core Web Vitals checks."
            },
            {
              step: "05",
              title: "Cloud Launch & SLA",
              desc: "Zero-downtime rolling cloud deployment, production monitoring, full IP handover, and 24/7 SLA maintenance."
            }
          ].map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(168, 206, 56, 0.5)", boxShadow: "0 20px 40px -10px rgba(168, 206, 56, 0.18)" }}
              className="p-8 rounded-3xl bg-[#09090e] border border-white/5 hover:border-[#a8ce38]/50 transition-all flex flex-col justify-between relative overflow-hidden group cursor-default"
            >
              <div className="font-mono text-3xl font-black text-neutral-800 mb-6 group-hover:text-[#a8ce38] group-hover:scale-105 transition-all">
                {phase.step}
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white mb-3">{phase.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{phase.desc}</p>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                <div className="w-full h-full bg-${categoryColor}/40 group-hover:bg-${categoryColor} transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          8. INDUSTRY SOLUTIONS MATRIX ("WHO IS THIS FOR?")
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5 bg-[#030306]">
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">// Sector Expertise</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Engineered for High-Stakes Industries
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Our specialized engineering frameworks adapt seamlessly to the compliance and scaling hurdles of diverse verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "💳",
              title: "FinTech & Banking",
              desc: "Sub-millisecond ledger synchronization, PCI-DSS payment compliance, and military-grade encryption."
            },
            {
              icon: "🏥",
              title: "Healthcare & Life Sciences",
              desc: "HIPAA-compliant telemetry, encrypted patient portals, and automated diagnostic workflows."
            },
            {
              icon: "🛍️",
              title: "E-Commerce & Omnichannel",
              desc: "High-concurrency flash sale architectures, headless checkouts, and AI recommendation engines."
            },
            {
              icon: "⚡",
              title: "SaaS & High-Growth Startups",
              desc: "Multi-tenant isolation, automated Stripe subscription billing, and sub-second analytics dashboards."
            },
            {
              icon: "🏢",
              title: "Real Estate & PropTech",
              desc: "MLS feed automated synchronization, virtual tour streaming, and automated CRM lead capture."
            },
            {
              icon: "🚚",
              title: "Logistics & Supply Chain",
              desc: "Real-time GPS fleet telemetry, warehouse inventory websockets, and automated dispatch routing."
            }
          ].map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(255, 255, 255, 0.2)" }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 transition-all cursor-default group"
            >
              <div className="text-3xl mb-4 group-hover:scale-125 transition-transform inline-block">{sec.icon}</div>
              <h4 className="font-display font-bold text-xl text-white mb-3 group-hover:text-${categoryColor} transition-colors">{sec.title}</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">{sec.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          9. "WHY HK DIGIVERSE" ENTERPRISE COMPARISON TABLE
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">// Competitive Advantage</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            The HK DigiVerse Advantage
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-2xl mx-auto">
            See how our dedicated agile engineering squads compare directly with traditional slow agencies and unpredictable freelancers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-3xl overflow-hidden bg-white/[0.01] border border-white/10">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-6 font-mono text-xs uppercase tracking-wider text-neutral-400">Evaluation Factor</th>
                <th className="p-6 font-mono text-xs uppercase tracking-wider text-neutral-500">Freelancers</th>
                <th className="p-6 font-mono text-xs uppercase tracking-wider text-neutral-500">Traditional Agencies</th>
                <th className="p-6 font-mono text-xs uppercase tracking-wider text-${categoryColor} font-bold">HK DigiVerse Squads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <tr>
                <td className="p-6 font-bold text-white">Delivery Velocity</td>
                <td className="p-6 text-neutral-500">Erratic &amp; unpredictable</td>
                <td className="p-6 text-neutral-500">3–6 months bloated cycles</td>
                <td className="p-6 text-emerald-400 font-semibold">⚡ Bi-weekly sprint deployments</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Intellectual Property (IP)</td>
                <td className="p-6 text-neutral-500">Fragmented &amp; vague</td>
                <td className="p-6 text-neutral-500">Vendor lock-in contracts</td>
                <td className="p-6 text-emerald-400 font-semibold">🔒 100% full IP transfer on day 1</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Architectural Quality</td>
                <td className="p-6 text-neutral-500">Spaghetti code shortcuts</td>
                <td className="p-6 text-neutral-500">Rigid outdated templates</td>
                <td className="p-6 text-emerald-400 font-semibold">✨ Zero-debt clean modular code</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Direct Communication</td>
                <td className="p-6 text-neutral-500">Unreliable ghosting risks</td>
                <td className="p-6 text-neutral-500">Slow account manager tickets</td>
                <td className="p-6 text-emerald-400 font-semibold">💬 Direct Slack / Discord squad channel</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Post-Launch Support &amp; SLA</td>
                <td className="p-6 text-neutral-500">Zero availability after launch</td>
                <td className="p-6 text-neutral-500">Expensive retainers</td>
                <td className="p-6 text-emerald-400 font-semibold">🛡️ 24/7 dedicated SLA coverage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          10. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION WITH RICH SCHEMA)
          ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">// Transparency First</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to know about partnering with HK DigiVerse for {pageData.title}.
          </p>
        </div>

        <div className="space-y-4">
          {pageData.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <span className={\`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 \${isOpen ? 'rotate-180 bg-white/10 text-white' : 'text-neutral-500'}\`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-neutral-400 text-sm sm:text-base font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          11. SUBSERVICES (FOR CATEGORY PAGES) OR RELATED SERVICES
          ──────────────────────────────────────────────────────── */}
      {pageData.siblings && pageData.siblings.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5 bg-[#030306]">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} block mb-3">
              ${isCategory ? "// Specialized Domain Portfolio" : "// Ecosystem Exploration"}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              ${isCategory ? `Explore All ${categoryTitle} Sub-Services &amp; Offerings` : "Related Services &amp; Synergies"}
            </h2>
            <p className="text-neutral-400 font-light text-sm sm:text-base max-w-2xl mx-auto">
              ${isCategory 
                ? `Explore our full suite of dedicated ${categoryTitle} solutions. Each sub-service is engineered with specialized squads, modern tooling, and guaranteed production deliverables.`
                : "Explore interconnected services designed to amplify your digital capabilities."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.siblings.map((sub, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(168, 206, 56, 0.6)", boxShadow: "0 25px 50px -12px rgba(168, 206, 56, 0.22)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo(sub.url)}
                className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 hover:border-[#a8ce38]/60 hover:bg-[#121612]/40 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a8ce38]/15 rounded-full blur-2xl group-hover:bg-[#a8ce38]/25 transition-all pointer-events-none" />
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-${categoryColor} uppercase tracking-widest px-2.5 py-1 rounded-full bg-${categoryColor}/10 border border-${categoryColor}/20 group-hover:text-[#a8ce38] group-hover:border-[#a8ce38]/40 group-hover:bg-[#a8ce38]/10 transition-colors">
                      0{idx + 1} // ${isCategory ? "Specialized Offering" : "Ecosystem"}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a8ce38] animate-pulse shadow-[0_0_8px_rgba(168,206,56,0.8)]" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-white group-hover:text-[#a8ce38] transition-colors mb-2">
                    {sub.name}
                  </h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Production-grade SLAs, dedicated engineering squad, and enterprise architecture tailored for {sub.name}.
                  </p>
                </div>
                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-[#a8ce38] transition-colors">
                    Explore Solution
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#a8ce38] group-hover:text-black group-hover:border-[#a8ce38] transition-all duration-300">
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────
          12. HIGH-CONVERSION BOTTOM CTA SECTION
          ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10 bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-3xl border border-white/15 rounded-[3rem] p-12 lg:p-20 shadow-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-${categoryColor} font-bold mb-4 block">
            // Start Today
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Ready to Architect Your Next Breakthrough?
          </h2>
          <p className="text-neutral-300 font-light text-base sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with HK DigiVerse to turn your boldest technical and commercial vision into an unfair competitive moat. Let's build something extraordinary together.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigateTo('/contact')}
              className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all text-base shadow-2xl shadow-white/20 cursor-pointer"
            >
              Start The Conversation →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06, borderColor: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigateTo('/case-study')}
              className="px-10 py-5 bg-transparent text-white border border-white/20 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              View Featured Case Studies
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
`;
};

// Map each category and its subservices
const siblingMap = {};
SERVICES_DATA.forEach(cat => {
  cat.services.forEach(sub => {
    const siblings = cat.services.filter(s => s.name !== sub.name).slice(0, 6);
    siblingMap[sub.name] = siblings;
  });
});

let updatedCount = 0;

SERVICES_DATA.forEach(cat => {
  // 1. Process category page itself
  const catComponentName = toPascalCase(cat.categoryTitle) + 'Page';
  const catFilename = catComponentName + '.jsx';
  const catFilepath = path.join(pagesDir, catFilename);

  const catCode = generateUltraPremiumTemplate(
    cat.categoryTitle,
    cat.categoryTitle,
    cat.categoryColor,
    cat.categoryTag,
    cat.categoryUrl,
    cat.services
  );

  fs.writeFileSync(catFilepath, catCode, 'utf8');
  console.log('Successfully generated Ultra-SEO page:', catFilename);
  updatedCount++;

  // 2. Process each subservice page
  cat.services.forEach(sub => {
    let subComponentName = toPascalCase(sub.name) + 'Page';
    if (subComponentName === 'GenerativeEngineOptimization(geo)Page') {
      subComponentName = 'GenerativeEngineOptimizationGeoPage';
    }

    const subFilename = subComponentName + '.jsx';
    const subFilepath = path.join(pagesDir, subFilename);

    const subCode = generateUltraPremiumTemplate(
      sub.name,
      cat.categoryTitle,
      cat.categoryColor,
      cat.categoryTag,
      cat.categoryUrl,
      siblingMap[sub.name] || []
    );

    fs.writeFileSync(subFilepath, subCode, 'utf8');
    console.log('Successfully generated Ultra-SEO page:', subFilename);
    updatedCount++;
  });
});

console.log(`\n🎉 Total pages upgraded with Ultra-SEO Sections: ${updatedCount}`);
