import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

// Default posts styled and organized after Radixweb's enterprise technology archive
const DEFAULT_POSTS = [
  {
    id: "python-engineering-ai",
    slug: "python-engineering-ai",
    title: "Why Python Engineering Matters for Production-Ready AI Products",
    desc: "Why architectural discipline, concurrency models, and memory optimization in Python are critical when scaling enterprise AI agents from prototype to 10M+ inferences.",
    date: "Oct 6, 2026",
    category: "Product Engineering",
    service: "AI & Automation",
    industry: "SaaS & Enterprise",
    readTime: "6 Min Read",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=650&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "While building AI prototypes in Jupyter notebooks is accessible, hardening those models for 24/7 mission-critical enterprise production introduces entirely new architectural hurdles. Most teams realize too late that pure Python interpreter locks, non-deterministic latency, and heavy memory footprints create severe operational bottlenecks.",
      "At HariKrushn DigiVerse, we engineer Python micro-architectures that decouple raw LLM token streaming from backpressure management. By pairing asynchronous asyncio workers with UVLoop and compiled Rust extensions via PyO3, we reduce endpoint serialization overhead by upwards of 40%.",
      "Furthermore, caching frequent vector query representations at the edge prevents repetitive embedding requests. We build semantic routing caches using Redis and pgvector, slashing inference compute fees by over 65% while keeping response latency sub-20 milliseconds for cached context sets.",
      "Building production-ready AI isn't simply choosing an API key—it demands disciplined concurrency handling, strict schema validation via Pydantic v2, and resilient retry queues capable of absorbing third-party provider outages gracefully."
    ],
    highlights: [
      "UVLoop and asynchronous concurrency yielding 40% lower response latency",
      "Semantic caching layers reducing inference cost by 65%",
      "Decoupled streaming workers with distributed backpressure control"
    ]
  },
  {
    id: "microservices-scale",
    slug: "microservices-scale",
    title: "Re-architecting Enterprise Microservices for High-Concurrency Scale",
    desc: "How we decomposed a legacy monolithic transactional system into an elastic, high-availability microservices mesh handling millions of daily records.",
    date: "Oct 12, 2026",
    category: "Product Engineering",
    service: "Custom Software",
    industry: "FinTech & Banking",
    readTime: "5 Min Read",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=650&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Enterprise systems that grow organically often hit a threshold where monolithic database locks paralyze peak business hours. When transaction volumes spike past critical boundaries, traditional relational write bottlenecks threaten system uptime.",
      "In this architecture refactoring, we transitioned a multi-tier transactional ledger into autonomous microservices bounded strictly by domain-driven design (DDD). Each domain maintains isolated state storage, eliminating shared table locks and enabling continuous independent deployments.",
      "To preserve consistency across distributed transactions without blocking two-phase commits, we implemented an asynchronous Saga design pattern utilizing distributed message logs. When transient network faults occur, idempotent compensation events trigger automatically to guarantee financial integrity.",
      "The transformed system now easily scales during sudden traffic bursts, achieving zero downtime across zero-trust Kubernetes clusters with sub-15ms p99 latencies."
    ],
    highlights: [
      "Replaced blocking two-phase commits with resilient Saga patterns",
      "Domain-driven state boundaries isolating database compute pressure",
      "Autonomous zero-trust Kubernetes orchestration with instant auto-scaling"
    ]
  },
  {
    id: "ai-agents-enterprise",
    slug: "ai-agents-enterprise",
    title: "Building AI Agents with Python for Enterprise Workflows: Architecture & Best Practices",
    desc: "A hands-on engineering guide to building secure, multi-agent orchestrators with verifiable tool execution, vector memory, and human-in-the-loop governance.",
    date: "Oct 18, 2026",
    category: "Artificial Intelligence",
    service: "AI & Automation",
    industry: "SaaS & Enterprise",
    readTime: "7 Min Read",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=650&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Single-turn LLM chatbots are rapidly giving way to autonomous multi-agent systems capable of multi-step planning, database auditing, and cross-platform actions. However, deploying autonomous agents into enterprise IT systems requires strict guardrails.",
      "We design multi-agent workflows using deterministic state graphs. Rather than allowing unbounded recursive loops, each agent role—such as researcher, validator, and executor—is constrained by explicit transition schemas and strict timeout quotas.",
      "Sensitive database queries execute within sandboxed read-only replicas with PII masking applied prior to external model transit. For destructive mutations, human-in-the-loop confirmation gates are enforced through signed webhook callbacks.",
      "Enterprises deploying our multi-agent architecture observe an average 85% drop in manual routine operations while maintaining 100% compliance auditability."
    ],
    highlights: [
      "State-graph constrained multi-agent collaboration topologies",
      "Zero-PII leakage with in-transit token redaction layers",
      "Guaranteed human approval gates for write and mutation actions"
    ]
  },
  {
    id: "machine-learning-cost-2027",
    slug: "machine-learning-cost-2027",
    title: "Machine Learning Development Cost in 2027: What Businesses Need to Budget For",
    desc: "A transparent breakdown of infrastructure, data engineering, fine-tuning, and inference hosting expenses for mid-market and enterprise firms.",
    date: "Oct 22, 2026",
    category: "Artificial Intelligence",
    service: "AI & Automation",
    industry: "FinTech & Banking",
    readTime: "6 Min Read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Budgeting for commercial AI initiatives frequently goes astray when decision-makers account only for initial model development and ignore continuous inference and data cleansing costs.",
      "In this financial roadmap, we analyze the real total cost of ownership (TCO) across 4 key tiers: exploratory discovery, data preparation and vectorization, fine-tuning and safety alignment, and recurring token inference hosting.",
      "By adopting open-weights small language models (SLMs) tailored for specific narrow domains, mid-market organizations can cut recurring compute bills by 70% compared to monolithic frontier APIs."
    ],
    highlights: [
      "Real-world compute TCO analysis across 4 lifecycle phases",
      "SLM adoption strategies yielding 70% recurring token savings",
      "Data labeling and pipeline automation cost optimization"
    ]
  },
  {
    id: "automation-to-ai-python",
    slug: "automation-to-ai-python",
    title: "From Automation to AI: Python's Role in Enterprise Transformation",
    desc: "How conventional RPA scripts are evolving into cognitive intelligence engines powered by Python's rich ecosystem of open libraries.",
    date: "Oct 19, 2026",
    category: "Artificial Intelligence",
    service: "AI & Automation",
    industry: "Manufacturing",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Legacy robotic process automation (RPA) tools relied on fragile UI selectors that shattered upon minor software updates. Modern enterprise automation requires contextual resilience.",
      "By combining vision-language models with Python execution runners, our workflows parse invoices, contracts, and unstructured logistics manifests with human-grade comprehension.",
      "The result is an intelligent digital worker ecosystem that adapts dynamically to layout variations without breaking downstream ERP data synchronization."
    ],
    highlights: [
      "Replacement of brittle screen scrapers with multi-modal reasoning",
      "Seamless integration with SAP, Salesforce, and custom ERP systems",
      "99.8% extraction accuracy on unstructured invoices and contracts"
    ]
  },
  {
    id: "custom-software-cost-2027",
    slug: "custom-software-cost-2027",
    title: "How Much Does Custom Software Development Cost in 2027?",
    desc: "A realistic budget guide analyzing architecture scope, team composition, technology choices, and modern acceleration frameworks.",
    date: "Oct 15, 2026",
    category: "Product Engineering",
    service: "Custom Software",
    industry: "SaaS & Enterprise",
    readTime: "8 Min Read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Commissioning bespoke software requires understanding the trade-offs between speed-to-market, long-term technical debt, and cloud architecture efficiency.",
      "This guide breaks down typical investment brackets for early-stage MVPs, mid-tier enterprise platforms, and hyper-scale microservice ecosystems.",
      "We also outline how modern component libraries, automated CI/CD harnesses, and AI-accelerated pair-programming reduce initial delivery timelines by up to 50% without sacrificing code quality."
    ],
    highlights: [
      "Detailed financial benchmarks across MVP, Growth, and Enterprise tiers",
      "Mitigating technical debt through modular system contracts",
      "Accelerated delivery cycles with automated continuous testing"
    ]
  },
  {
    id: "python-glue-ai-data",
    slug: "python-glue-ai-data",
    title: "Why Python Became the Glue Between AI, Data, and Enterprise Systems",
    desc: "An architectural review of how Python unites data ingestion, vector indexing, neural inference, and backend microservice orchestration.",
    date: "Sep 28, 2026",
    category: "Data Engineering",
    service: "AI & Automation",
    industry: "Manufacturing",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "No single programming language bridges the chasm between raw scientific computing and web service delivery like Python.",
      "With NumPy and PyTorch handling tensor calculus, DuckDB and Polars revolutionizing tabular ingestion, and FastAPI exposing high-speed endpoints, Python forms the unified fabric of modern data intelligence.",
      "We examine how forward-looking engineering teams leverage this unified stack to eliminate language translation boundaries between data science and production engineering."
    ],
    highlights: [
      "Unified pipeline from raw telemetry ingestion to live inference",
      "Zero-copy serialization with Arrow and Polars dataframes",
      "Simplified developer handover from data team to backend engineers"
    ]
  },
  {
    id: "ai-timeline-guide",
    slug: "ai-timeline-guide",
    title: "How Long Does AI Development Take: Complete AI Project Timeline",
    desc: "From initial feasibility sprints and data pipeline audits to model fine-tuning and shadow deployments: what to expect week by week.",
    date: "Sep 15, 2026",
    category: "Artificial Intelligence",
    service: "AI & Automation",
    industry: "Healthcare & Life Sciences",
    readTime: "7 Min Read",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Uncertainty around AI delivery schedules often stems from poorly defined data readiness criteria.",
      "In this breakdown, we map out a proven 12-week enterprise AI delivery roadmap: Weeks 1-2 for data audit and prompt topology, Weeks 3-6 for pipeline vectorization and baseline evaluation, Weeks 7-9 for model fine-tuning and safety alignment, and Weeks 10-12 for canary production rollout.",
      "Following this staged framework guarantees that executive stakeholders have verifiable milestones and testable demos at every phase."
    ],
    highlights: [
      "Proven 12-week sprint breakdown for enterprise AI rollouts",
      "Data sanitation and vector audit milestones",
      "Canary and shadow deployment validation frameworks"
    ]
  },
  {
    id: "event-driven-ai-scale",
    slug: "event-driven-ai-scale",
    title: "AI at Scale Demands Event-Driven, Data-Centric Architecture",
    desc: "Why synchronous request-response REST APIs buckle under AI load and how event streaming architectures with Kafka ensure bulletproof resilience.",
    date: "Sep 02, 2026",
    category: "Architecture & Systems",
    service: "Cloud & DevOps",
    industry: "Logistics & Supply Chain",
    readTime: "6 Min Read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "When enterprise workflows trigger hundreds of AI queries simultaneously, synchronous HTTP connections exhaust connection pools and risk cascading timeouts.",
      "By transitioning to an event-driven architecture powered by Kafka or RabbitMQ, AI generation tasks become durable event streams. Workers consume tasks according to GPU cluster capacity, smoothing peak traffic surges into manageable queues.",
      "This architecture enables graceful degradation, automatic retries with exponential backoff, and transparent real-time progress updates streamed back to users via WebSockets."
    ],
    highlights: [
      "Eliminating socket starvation during heavy inference surges",
      "Durable event persistence and idempotent job execution",
      "Real-time WebSocket streaming for conversational and status updates"
    ]
  },
  {
    id: "enterprise-ai-failure-mlops",
    slug: "enterprise-ai-failure-mlops",
    title: "The Enterprise AI Failure Crisis: Why MLOps Is the Answer",
    desc: "Over 80% of enterprise AI models never deliver measurable ROI. Here is how modern MLOps pipelines prevent drift and ensure continuous value.",
    date: "Aug 20, 2026",
    category: "DevOps & Cloud",
    service: "Cloud & DevOps",
    industry: "Retail & E-Commerce",
    readTime: "6 Min Read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "The most dangerous trap in AI adoption is assuming that a high-performing benchmark test translates to sustained production value.",
      "Without automated telemetry monitoring embedding drift, accuracy degradation, and prompt injection attempts, models rapidly lose their edge as real-world user data evolves.",
      "We detail our MLOps observability harness: integrating automated hallucination detectors, continuous regression evaluations, and one-click model rollback capabilities."
    ],
    highlights: [
      "Automated detection of embedding drift and schema shifts",
      "Continuous CI/CD validation before new model weights deploy",
      "Zero-downtime rollback pipelines for enterprise stability"
    ]
  },
  {
    id: "clean-data-readiness",
    slug: "clean-data-readiness",
    title: "What Clean Data Actually Means for an AI Project and How to Get AI-Ready Data",
    desc: "Moving beyond superficial null-checks: structuring unstructured PDFs, handling temporal bias, and preparing contextual chunking matrices.",
    date: "Jul 30, 2026",
    category: "Data Engineering",
    service: "AI & Automation",
    industry: "Healthcare & Life Sciences",
    readTime: "7 Min Read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Radhe Patel",
      role: "CEO & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Enterprise executives frequently state: 'We have petabytes of data ready for AI.' Yet upon inspection, that data is locked inside scanned PDFs, contradictory spreadsheet columns, and disconnected silos.",
      "Real AI data readiness requires semantic normalization, deduplication, metadata attribution, and deterministic chunking that respects document hierarchy.",
      "We share our proprietary ingestion pipeline that converts messy organizational documents into clean, dense knowledge graphs primed for high-accuracy RAG query retrieval."
    ],
    highlights: [
      "Hierarchical document chunking preserving contextual tables",
      "Deduplication and conflict resolution across multi-year archives",
      "Knowledge graph vectorization boosting retrieval accuracy by 45%"
    ]
  },
  {
    id: "predictive-maintenance-ai",
    slug: "predictive-maintenance-ai",
    title: "Predictive Maintenance AI: What It Takes to Actually Reduce Unplanned Downtime",
    desc: "How real-time IoT sensor telemetry and edge ML models forecast equipment failures weeks before catastrophic mechanical breakdown.",
    date: "Jul 15, 2026",
    category: "Trending",
    service: "Custom Software",
    industry: "Manufacturing",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Prince Patel",
      role: "Co-Founder & Head of Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    longContent: [
      "Unplanned machine downtime costs industrial enterprises millions every year. Traditional schedule-based maintenance often replaces perfectly sound parts while missing latent thermal anomalies.",
      "By deploying lightweight anomaly detection models directly to edge gateways, plant supervisors receive predictive warnings with estimated remaining useful life (RUL) metrics.",
      "We walk through our industrial deployment methodology connecting Modbus and MQTT sensors to cloud dashboards, reducing plant downtime by over 38%."
    ],
    highlights: [
      "Edge gateway inference with sub-second anomaly alert latency",
      "Remaining useful life (RUL) probabilistic forecasting",
      "Direct integration with computerized maintenance management systems"
    ]
  }
];

// Topic filter categories identical to Radixweb
const CATEGORIES = [
  "All",
  "Artificial Intelligence",
  "Data Engineering",
  "Product Engineering",
  "DevOps & Cloud",
  "Architecture & Systems",
  "Trending"
];

const SERVICES_OPTIONS = [
  "All Services",
  "AI & Automation",
  "Custom Software",
  "Cloud & DevOps"
];

const INDUSTRIES_OPTIONS = [
  "All Industries",
  "SaaS & Enterprise",
  "FinTech & Banking",
  "Manufacturing",
  "Healthcare & Life Sciences",
  "Logistics & Supply Chain",
  "Retail & E-Commerce"
];

export default function Blogs({ initialSlug = null }) {
  const { content } = useContent();
  const sv = content?.site_settings?.section_visibility || {};
  if (sv.blogs_list === false) return null;

  // Selected article state
  const [selectedPost, setSelectedPost] = useState(initialSlug);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Carousel state for top featured hero slider
  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  // Pagination: visible items
  const [visibleCount, setVisibleCount] = useState(6);

  // Email newsletter state
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Sync initialSlug prop if route changes
  useEffect(() => {
    if (initialSlug) {
      setSelectedPost(initialSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialSlug]);

  // Combine user content blogs with default Radixweb-style blogs
  const allPosts = useMemo(() => {
    const customBlogs = (content?.blogs || []).map(b => ({
      ...b,
      id: b.slug || b.id,
      category: b.category || "Product Engineering",
      service: b.service || "Custom Software",
      industry: b.industry || "SaaS & Enterprise",
      readTime: b.readTime || "5 Min Read",
      author: typeof b.author === 'string' ? {
        name: b.author,
        role: "Contributing Author",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
      } : (b.author || {
        name: "HariKrushn Specialist",
        role: "Senior Engineer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
      })
    }));

    const seenIds = new Set();
    const list = [];
    for (const p of [...customBlogs, ...DEFAULT_POSTS]) {
      const key = p.slug || p.id;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        list.push({ ...p, id: key });
      }
    }
    return list;
  }, [content?.blogs]);

  // Featured articles for top slider
  const featuredPosts = useMemo(() => {
    const feat = allPosts.filter(p => p.isFeatured);
    return feat.length > 0 ? feat : allPosts.slice(0, 3);
  }, [allPosts]);

  // Active featured post
  const currentFeatured = featuredPosts[featuredIndex % featuredPosts.length] || featuredPosts[0];

  const handlePrevFeatured = (e) => {
    e.stopPropagation();
    setFeaturedIndex((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1));
  };

  const handleNextFeatured = (e) => {
    e.stopPropagation();
    setFeaturedIndex((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
  };

  // Filtered post list
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      // Category match
      if (selectedCategory !== "All") {
        const matchesCategory = (post.category || "").toLowerCase() === selectedCategory.toLowerCase();
        if (!matchesCategory) return false;
      }
      // Service dropdown match
      if (selectedService !== "All Services") {
        if ((post.service || "").toLowerCase() !== selectedService.toLowerCase()) return false;
      }
      // Industry dropdown match
      if (selectedIndustry !== "All Industries") {
        if ((post.industry || "").toLowerCase() !== selectedIndustry.toLowerCase()) return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (post.title || "").toLowerCase().includes(q);
        const inDesc = (post.desc || "").toLowerCase().includes(q);
        const inCat = (post.category || "").toLowerCase().includes(q);
        const inAuthor = (post.author?.name || "").toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCat && !inAuthor) return false;
      }
      return true;
    });
  }, [allPosts, selectedCategory, selectedService, selectedIndustry, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const activePost = allPosts.find(p => p.id === selectedPost || p.slug === selectedPost);

  // Open blog post detail view
  const handleOpenPost = (post) => {
    setSelectedPost(post.id || post.slug);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/blog/${post.id || post.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Return to list view
  const handleBackToList = () => {
    setSelectedPost(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmailInput("");
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#000000] text-neutral-200 font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* Background Cinematic Atmosphere Glows (matching HK Web theme) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[75%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      {/* Top Notification / Recognition Ribbon (Dark Glassmorphism) */}
      <div className="w-full bg-[#050508]/80 backdrop-blur-md border-b border-white/5 py-2.5 px-4 text-xs font-mono text-neutral-400 text-center flex items-center justify-center gap-2 relative z-20">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>RECOGNIZED FOR AI & ENTERPRISE ENGINEERING // HK DIGIVERSE INSIGHTS 2026</span>
        <button 
          onClick={() => { setSelectedCategory("Artificial Intelligence"); window.scrollTo({ top: 520, behavior: 'smooth' }); }}
          className="text-cyan-400 hover:text-cyan-300 underline font-semibold ml-2 cursor-pointer transition-colors"
        >
          Explore AI Insights →
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          /* =========================================================
             RADIXWEB-STRUCTURE BLOG HUB (CINEMATIC DARK THEME)
             ========================================================= */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full relative z-10"
          >
            {/* HERO SECTION: Radixweb layout, Dark Cinematic palette */}
            <section className="relative w-full pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
              <div className="max-w-6xl mx-auto text-center">
                
                {/* Eyebrow Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Blogs & Insights</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-[1.18]">
                  Expert Insights on Emerging Tech and Biz Transformation
                </h1>

                <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                  Discover production-tested architectures, enterprise AI breakdowns, and digital transformation playbooks engineered by HariKrushn specialists.
                </p>

                {/* FEATURED BLOG CAROUSEL CARD (Radixweb 2-Column Structure in Dark Theme) */}
                {currentFeatured && (
                  <div className="mt-10 max-w-5xl mx-auto">
                    <div 
                      onClick={() => handleOpenPost(currentFeatured)}
                      className="group bg-[#050508]/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 p-5 sm:p-7 lg:p-8 flex flex-col lg:flex-row items-center gap-8 cursor-pointer text-left overflow-hidden relative"
                    >
                      {/* Left: Graphic Thumbnail with subtle zoom */}
                      <div className="w-full lg:w-1/2 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden relative bg-[#09090d] border border-white/10 flex-shrink-0">
                        <img 
                          src={currentFeatured.image} 
                          alt={currentFeatured.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                        
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                          <span className="px-2.5 py-1 bg-cyan-500/20 backdrop-blur-md rounded-md border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
                            ★ FEATURED
                          </span>
                          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-neutral-300">
                            {currentFeatured.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Right: Content Information */}
                      <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Category Badge Line (Radixweb style) */}
                          <div className="flex items-center gap-2 mb-2 text-xs">
                            <span className="text-cyan-400 font-black uppercase tracking-wider text-xs font-mono">
                              ARTICLE
                            </span>
                            <span className="text-neutral-500 font-medium text-xs">
                              | in {currentFeatured.category}
                            </span>
                          </div>

                          {/* Featured Title */}
                          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {currentFeatured.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mt-3 font-light">
                            {currentFeatured.desc}
                          </p>
                        </div>

                        {/* Author Metadata Footer */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img 
                              src={currentFeatured.author?.avatar} 
                              alt={currentFeatured.author?.name} 
                              className="w-10 h-10 rounded-full object-cover border border-white/10" 
                            />
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                                {currentFeatured.author?.name}
                              </h4>
                              <p className="text-[11px] text-neutral-500 font-mono">
                                {currentFeatured.author?.role || "Tech Specialist"}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-neutral-500 font-mono block">
                              {currentFeatured.date}
                            </span>
                            <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform font-mono">
                              Read Article →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <button 
                        onClick={handlePrevFeatured} 
                        aria-label="Previous featured article"
                        className="w-9 h-9 rounded-full bg-[#0c0c14] border border-white/10 hover:border-cyan-500 hover:text-cyan-400 text-neutral-300 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                      >
                        ‹
                      </button>

                      <div className="flex items-center gap-2">
                        {featuredPosts.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setFeaturedIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-1.5 transition-all duration-300 rounded-full ${
                              idx === featuredIndex ? 'w-6 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                            }`}
                          />
                        ))}
                      </div>

                      <button 
                        onClick={handleNextFeatured} 
                        aria-label="Next featured article"
                        className="w-9 h-9 rounded-full bg-[#0c0c14] border border-white/10 hover:border-cyan-500 hover:text-cyan-400 text-neutral-300 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* CONTROLS & FILTER SECTION (Identical Radixweb pill tabs & dropdown selectors in Dark Theme) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
              
              {/* Category Pills Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/5">
                {CATEGORIES.map(cat => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                          : 'bg-[#09090d]/80 text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Dropdown Filters Row */}
              <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#050508]/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                
                {/* Selectors Group */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                    Please Select:
                  </span>

                  {/* Services Dropdown */}
                  <select
                    value={selectedService}
                    onChange={(e) => { setSelectedService(e.target.value); setVisibleCount(6); }}
                    className="bg-[#0c0c14] border border-white/10 text-neutral-200 text-xs sm:text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {SERVICES_OPTIONS.map(opt => (
                      <option key={opt} value={opt} className="bg-[#0c0c14] text-neutral-200">{opt}</option>
                    ))}
                  </select>

                  {/* Industries Dropdown */}
                  <select
                    value={selectedIndustry}
                    onChange={(e) => { setSelectedIndustry(e.target.value); setVisibleCount(6); }}
                    className="bg-[#0c0c14] border border-white/10 text-neutral-200 text-xs sm:text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {INDUSTRIES_OPTIONS.map(opt => (
                      <option key={opt} value={opt} className="bg-[#0c0c14] text-neutral-200">{opt}</option>
                    ))}
                  </select>

                  {/* Clear All Filters button if active */}
                  {(selectedCategory !== "All" || selectedService !== "All Services" || selectedIndustry !== "All Industries" || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedService("All Services");
                        setSelectedIndustry("All Industries");
                        setSearchQuery("");
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                    >
                      Reset Filters ✕
                    </button>
                  )}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[240px] sm:min-w-[280px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                    placeholder="Search insights by topic or keyword..."
                    className="w-full bg-[#0c0c14] border border-white/10 text-neutral-200 text-xs sm:text-sm rounded-lg pl-9 pr-8 py-2 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">
                    🔍
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Status Counter */}
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 font-mono px-1">
                <span>// Showing {displayedPosts.length} of {filteredPosts.length} insights</span>
                {selectedCategory !== "All" && (
                  <span className="text-cyan-400 font-semibold">Category: {selectedCategory}</span>
                )}
              </div>
            </section>

            {/* 3-COLUMN BLOG CARDS GRID (Radixweb Card Architecture in Dark Theme) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
              {displayedPosts.length === 0 ? (
                <div className="text-center py-20 bg-[#050508]/60 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                  <span className="text-4xl block mb-3">📑</span>
                  <h3 className="text-lg font-bold text-white mb-2">No matching insights found</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-6 font-light">
                    Try adjusting your category, industry, or search query to explore other technical briefs.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedService("All Services");
                      setSelectedIndustry("All Industries");
                      setSearchQuery("");
                    }}
                    className="px-5 py-2.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
                  >
                    View All Articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {displayedPosts.map((post) => (
                    <article
                      key={post.id || post.title}
                      onClick={() => handleOpenPost(post)}
                      className="group bg-[#050508]/70 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/40 shadow-xl hover:shadow-[0_16px_36px_rgba(6,182,212,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      <div>
                        {/* Card Image Area */}
                        <div className="w-full aspect-[16/10] overflow-hidden relative bg-[#09090d]">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/10">
                            {post.readTime}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-3">
                          {/* Category Tag (Radixweb Blue replaced with Glowing Cyan in Dark Theme) */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-cyan-400 font-black uppercase tracking-wider text-xs font-mono">
                              ARTICLE
                            </span>
                            <span className="text-neutral-500 font-medium text-xs">
                              | in {post.category}
                            </span>
                          </div>

                          {/* Post Title */}
                          <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                            {post.desc}
                          </p>
                        </div>
                      </div>

                      {/* Card Author Footer */}
                      <div className="p-6 pt-3 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author?.avatar}
                            alt={post.author?.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <span className="text-xs font-bold text-neutral-200 block leading-tight">
                              {post.author?.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 block font-mono">
                              {post.industry || "Enterprise"}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs text-neutral-500 font-mono">
                          {post.date}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Load More Button (Radixweb layout in Dark theme) */}
              {displayedPosts.length < filteredPosts.length && (
                <div className="mt-14 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="px-8 py-3.5 rounded-xl bg-[#09090d] hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2 font-mono uppercase tracking-wider"
                  >
                    <span>Load More Insights</span>
                    <span>↓</span>
                  </button>
                  <p className="text-xs text-neutral-500 mt-2 font-mono">
                    Showing {displayedPosts.length} of {filteredPosts.length} total articles
                  </p>
                </div>
              )}
            </section>

            {/* NEWSLETTER & CTA SECTION (Dark Futuristic Gradient) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="rounded-3xl bg-gradient-to-r from-[#050508] via-[#090c15] to-[#04101e] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl text-left">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono font-bold uppercase tracking-wider inline-block mb-3">
                    // Weekly Engineering Dispatch
                  </span>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                    Stay Ahead of the Emerging Tech Curve
                  </h3>

                  <p className="mt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                    Subscribe to receive enterprise AI blueprints, microservices scalability benchmarks, and high-performance system design strategies directly in your inbox.
                  </p>

                  <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your enterprise email address..."
                      required
                      className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer whitespace-nowrap font-mono uppercase tracking-wider"
                    >
                      Subscribe Now →
                    </button>
                  </form>

                  {subscribed && (
                    <p className="mt-3 text-xs text-emerald-400 font-semibold font-mono">
                      ✓ Thank you! You've successfully subscribed to HariKrushn Insights.
                    </p>
                  )}

                  <p className="mt-3 text-[11px] text-neutral-500 font-mono">
                    Zero spam. Unsubscribe at any time with one click.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* =========================================================
             RADIXWEB-STRUCTURE SINGLE BLOG READING / DETAIL VIEW (DARK THEME)
             ========================================================= */
          <motion.article
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full text-neutral-200 pt-8 pb-24 relative z-10"
          >
            {activePost && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Top Navigation Bar: Breadcrumbs & Back Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                  <button
                    onClick={handleBackToList}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Back to all insights</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <span onClick={handleBackToList} className="hover:text-white cursor-pointer">Blogs</span>
                    <span>/</span>
                    <span className="text-neutral-300">{activePost.category}</span>
                    <span>/</span>
                    <span className="text-neutral-500 truncate max-w-[200px]">{activePost.title}</span>
                  </div>
                </div>

                {/* ARTICLE HEADER CONTAINER */}
                <header className="mb-10 text-left">
                  {/* Category Pill */}
                  <div className="flex items-center gap-2 mb-4 text-xs">
                    <span className="text-cyan-400 font-black uppercase tracking-wider text-xs font-mono">
                      ARTICLE
                    </span>
                    <span className="text-neutral-400 font-medium text-xs">
                      | in {activePost.category}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-400 font-mono text-xs">
                      {activePost.readTime}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                    {activePost.title}
                  </h1>

                  {/* Subtitle / Excerpt */}
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-light">
                    {activePost.desc}
                  </p>

                  {/* Author & Action Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-6 p-4 sm:p-5 rounded-2xl bg-[#050508]/80 backdrop-blur-md border border-white/10 shadow-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={activePost.author?.avatar}
                        alt={activePost.author?.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {activePost.author?.name}
                        </h4>
                        <p className="text-xs text-neutral-500 font-mono">
                          {activePost.author?.role || "Engineering Lead"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
                      <span>Published: {activePost.date}</span>

                      {/* Social Share Button */}
                      <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        <button
                          onClick={handleCopyLink}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-cyan-500 hover:text-black text-neutral-300 text-xs font-mono font-semibold transition-colors cursor-pointer border border-white/5"
                          title="Copy Link"
                        >
                          {copyFeedback ? "✓ Copied!" : "🔗 Share"}
                        </button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* FEATURED HERO BANNER IMAGE */}
                <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10 bg-[#09090d]">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2-COLUMN ARTICLE CONTENT GRID (Content Left, Sticky Sidebar Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left items-start">
                  
                  {/* MAIN COLUMN (2/3) */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Key Takeaways Box (Radixweb signature feature in Dark Theme) */}
                    {activePost.highlights && activePost.highlights.length > 0 && (
                      <div className="p-6 sm:p-7 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 shadow-sm backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base text-cyan-400">⚡</span>
                          <h3 className="text-sm sm:text-base font-extrabold text-cyan-400 uppercase tracking-wider font-mono">
                            Key Architectural Highlights
                          </h3>
                        </div>
                        <ul className="space-y-2.5">
                          {activePost.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-normal">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Article Narrative Body */}
                    <div className="space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                      {(activePost.longContent || [activePost.desc]).map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Consultation Callout */}
                    <div className="p-7 rounded-2xl bg-[#09090d] border border-white/10 text-white mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1 font-display">
                          Planning a high-concurrency software or AI rollout?
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-light">
                          Consult with HariKrushn DigiVerse's system architects for end-to-end blueprinting and delivery.
                        </p>
                      </div>
                      <a
                        href="/contact"
                        className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all font-mono uppercase tracking-wider"
                      >
                        Schedule Discovery Call →
                      </a>
                    </div>
                  </div>

                  {/* SIDEBAR COLUMN (1/3) */}
                  <aside className="space-y-8 sticky top-28">
                    
                    {/* Author Profile Card */}
                    <div className="p-6 rounded-2xl bg-[#050508]/80 backdrop-blur-md border border-white/10 shadow-sm text-left">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-3">
                        // WRITTEN BY
                      </span>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={activePost.author?.avatar}
                          alt={activePost.author?.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {activePost.author?.name}
                          </h4>
                          <p className="text-xs text-neutral-400 font-mono">
                            {activePost.author?.role || "Engineering Lead"}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        Leads full-cycle distributed architectures, high-throughput microservices, and autonomous enterprise AI deployment at HariKrushn DigiVerse.
                      </p>
                    </div>

                    {/* Trending Tech Topics Tags */}
                    <div className="p-6 rounded-2xl bg-[#050508]/80 backdrop-blur-md border border-white/10 shadow-sm text-left">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-300 mb-3">
                        // Trending Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.filter(c => c !== "All").map(topic => (
                          <button
                            key={topic}
                            onClick={() => {
                              setSelectedCategory(topic);
                              setSelectedPost(null);
                            }}
                            className="px-3 py-1 rounded-md bg-white/[0.04] hover:bg-cyan-500 hover:text-black text-neutral-300 text-xs font-mono transition-colors cursor-pointer border border-white/5"
                          >
                            #{topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Related Articles Mini-List */}
                    <div className="p-6 rounded-2xl bg-[#050508]/80 backdrop-blur-md border border-white/10 shadow-sm text-left">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-300 mb-4">
                        // Related Insights
                      </h4>
                      <div className="space-y-4">
                        {allPosts
                          .filter(p => p.id !== activePost.id)
                          .slice(0, 3)
                          .map(rel => (
                            <div
                              key={rel.id}
                              onClick={() => handleOpenPost(rel)}
                              className="group cursor-pointer flex gap-3 items-start"
                            >
                              <img
                                src={rel.image}
                                alt={rel.title}
                                className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-[#09090d] border border-white/5 opacity-80 group-hover:opacity-100"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-neutral-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                                  {rel.title}
                                </h5>
                                <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                                  {rel.readTime}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                  </aside>
                </div>

                {/* BOTTOM RELATED ARTICLES 3-CARD GRID */}
                <div className="mt-20 pt-12 border-t border-white/5 text-left">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-8">
                    More Technology & Transformation Insights
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allPosts
                      .filter(p => p.id !== activePost.id)
                      .slice(0, 3)
                      .map(post => (
                        <article
                          key={post.id}
                          onClick={() => handleOpenPost(post)}
                          className="group bg-[#050508]/70 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg hover:border-cyan-500/40 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <div className="aspect-[16/10] overflow-hidden bg-[#09090d]">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                              />
                            </div>
                            <div className="p-5 space-y-2">
                              <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-wider block">
                                ARTICLE | in {post.category}
                              </span>
                              <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h4>
                            </div>
                          </div>
                          <div className="p-5 pt-0 text-[11px] text-neutral-500 font-mono">
                            {post.date} • {post.readTime}
                          </div>
                        </article>
                      ))}
                  </div>
                </div>

              </div>
            )}
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
