import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioSoftwareDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "140+", label: "Platforms Shipped", sub: "Production Enterprise Grade" },
    { value: "99.99%", label: "System Availability", sub: "Tier-4 Multi-Region SLA" },
    { value: "< 95ms", label: "P99 API Latency", sub: "Edge-Cached High Throughput" },
    { value: "$120M+", label: "Transaction Vol", sub: "Processed Safely via APIs" }
  ];

  const projects = [
    {
      title: "Zenith Multi-Tenant Enterprise ERP",
      client: "Zenith Global Corp",
      clientLogo: "/media/images/logos/zenith_logo.png",
      impact: "99.99% Uptime • 15K QPS",
      image: "/media/images/industries/manufacturing.png",
      tag: "SAAS & ERP PLATFORM",
      desc: "Architected a high-concurrency multi-tenant manufacturing ERP centralizing warehouse tracking, supplier dispatch matrices, and real-time ledger accounting.",
      results: [
        "Eliminated 18 hours/week in manual reconciliation",
        "Sub-second sync across 8 international warehouses",
        "Role-based permission matrix for 3,500 concurrent operators"
      ],
      tech: ["React 19", "FastAPI", "TimescaleDB", "Redis", "Docker", "AWS EKS"]
    },
    {
      title: "Nova Financial Trading Dashboard",
      client: "Nova DeFi Capital",
      clientLogo: "/media/images/logos/nova_logo.png",
      impact: "400% Speed Boost • $18M Daily Vol",
      image: "/media/images/industries/fintech.png",
      tag: "FINTECH & TRADING ENGINE",
      desc: "Constructed low-latency asset management dashboard with real-time WebSocket order book rendering, automated portfolio rebalancing, and hardened KYC flows.",
      results: [
        "Sub-50ms WebSocket telemetry streaming at peak loads",
        "Zero data-loss audit trails backed by immutable ledgers",
        "Zero-trust biometric session authentication"
      ],
      tech: ["Next.js 15", "Go Microservices", "WebSockets", "PostgreSQL", "Kafka", "Vault"]
    },
    {
      title: "OmniCom Headless B2B Suite",
      client: "OmniCom Industrial",
      clientLogo: "/media/images/logos/omnicom_logo.png",
      impact: "2.4x Conversion • 80ms P99",
      image: "/media/images/industries/ecommerce.png",
      tag: "HEADLESS COMMERCE",
      desc: "Engineered headless enterprise purchasing platform handling 45,000 SKUs, tier-based dynamic contract pricing, and instant SAP integration.",
      results: [
        "140% surge in digital repeat enterprise re-orders",
        "Automated PDF quotation and PO pipeline generation",
        "Integrated multi-currency Stripe & wire clearing gates"
      ],
      tech: ["React", "GraphQL", "Node.js", "Redis", "Stripe API", "Elasticsearch"]
    },
    {
      title: "Saphira Mobile Field Operations App",
      client: "Saphira Systems",
      clientLogo: "/media/images/logos/saphira_logo.png",
      impact: "70% Offline Time Covered",
      image: "/media/images/industries/electronics_mobile.png",
      tag: "CROSS-PLATFORM MOBILE",
      desc: "Delivered native iOS and Android application with complete offline database sync, barcode telemetry scanning, and automated field dispatch routing.",
      results: [
        "100% offline-first functionality in zero-connectivity zones",
        "Instant background reconciliation when re-connected",
        "4.9 star internal app rating across 1,200 technicians"
      ],
      tech: ["React Native", "SQLite", "Node.js", "MQTT", "Docker"]
    }
  ];

  const benchmarks = [
    { metric: "Cold Start Load Time", before: "4.8s", after: "0.6s", change: "87% Faster" },
    { metric: "Server Cost per 100K Users", before: "$4,200/mo", after: "$850/mo", change: "79% Saved" },
    { metric: "Max Concurrent Users", before: "1,200 users", after: "45,000 users", change: "37x Scale" },
    { metric: "CI/CD Deployment Cycle", before: "3 Days Manual", after: "8 Min Automated", change: "Zero Downtime" }
  ];

  const techStack = [
    { name: "React 19 & Next.js", role: "High-Performance Fluid Frontends" },
    { name: "FastAPI & Go", role: "High-Concurrency Async Microservices" },
    { name: "PostgreSQL & TimescaleDB", role: "Relational ACID & Telemetry Engines" },
    { name: "Redis & Apache Kafka", role: "Distributed In-Memory Cache & Streams" },
    { name: "Docker & Kubernetes", role: "Elastic Containerized Infrastructure" },
    { name: "GraphQL & RESTful APIs", role: "Type-Safe High-Throughput Contracts" },
    { name: "AWS & Google Cloud", role: "Multi-Zone Resilient Cloud Meshes" },
    { name: "Terraform & GitHub Actions", role: "Automated GitOps & Zero-Touch CI/CD" }
  ];

  const faqs = [
    {
      q: "How do you ensure zero data loss during high-traffic transactions?",
      a: "We architect distributed transactional outbox patterns with idempotent API consumers and write-ahead Redis queues, backed by ACID PostgreSQL replicas."
    },
    {
      q: "Can you take over and modernize legacy codebase without rewriting from scratch?",
      a: "Yes. We utilize the Strangler Fig architecture to systematically carve out monolithic endpoints into performant microservices while guaranteeing 100% backward compatibility."
    },
    {
      q: "Do you hand over complete code ownership and documentation?",
      a: "Yes. From Day 1, all intellectual property, Git repositories, deployment scripts, and OpenAPI schemas belong 100% to your enterprise."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-cyan-900/15 via-blue-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-32 pb-4 px-6 max-w-7xl mx-auto relative z-20">
        <ol className="flex items-center flex-wrap gap-2 text-xs font-mono text-neutral-500">
          <li>
            <button onClick={() => navigateTo('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li>
            <button onClick={() => navigateTo('/portfolio')} className="hover:text-white transition-colors cursor-pointer">
              Portfolio
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li className="text-blue-400 font-semibold uppercase tracking-wider">
            Software Development
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono tracking-widest uppercase text-blue-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>CUSTOM SOFTWARE &amp; SAAS ARCHITECTURES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Software Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            A verified chronicle of custom cloud applications, high-throughput backend APIs, multi-tenant SaaS portals, and mission-critical enterprise systems shipped with zero technical debt.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Start Architecture Sprint →
            </button>
            <button
              onClick={() => navigateTo('/services/software-development')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Development Services
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-blue-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-2">
            // Production Deployments
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Shipped Software Platforms &amp; Client Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-blue-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Visual Project Banner Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <img src={proj.clientLogo} alt={proj.client} className="w-4 h-4 object-contain" />
                  <span className="font-mono text-[10px] uppercase text-white font-semibold tracking-wider">
                    {proj.client}
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/40 font-mono text-[10px] text-blue-300 font-bold uppercase tracking-wider">
                  {proj.impact}
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-wider text-neutral-300">
                    {proj.tag}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Key Engineering Outcomes
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engineering Performance Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-2">
            // Empirical Validation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Architecture Optimization Benchmarks
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Average performance differential measured across client projects before and after our engineering overhauls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  {b.metric}
                </span>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Previous</div>
                    <div className="text-base font-semibold text-neutral-400 line-through">{b.before}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-blue-400 uppercase">Shipped</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                  {b.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Suite Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5 bg-[#030306]">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-2">
            // Core Tooling
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Enterprise Infrastructure Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-blue-400 transition-colors mb-1">
                {tech.name}
              </h4>
              <p className="text-[11px] text-neutral-400 font-mono leading-snug">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Common Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-blue-500/40 bg-white/[0.02] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(prev => prev === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-display font-bold text-base text-white">
                    {faq.q}
                  </span>
                  <span className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/5 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-blue-950/30 to-black border border-blue-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Have a custom platform in mind?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            We architect and ship production-ready custom software with high-concurrency performance and complete IP handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-105 cursor-pointer"
            >
              Book Technical Consultation →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              View In-Depth Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
