import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioConsultingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "$4.2M+", label: "Cloud Cost Saved", sub: "Annual Infrastructure Optimization" },
    { value: "100%", label: "Zero-Downtime Rate", sub: "Mission-Critical Migrations" },
    { value: "45+", label: "Enterprise Audits", sub: "Architecture & Security Reviews" },
    { value: "SOC 2", label: "Compliance Certified", sub: "ISO 27001 & HIPAA Preparedness" }
  ];

  const projects = [
    {
      title: "Vertex Capital Zero-Trust Cloud Architecture",
      client: "Vertex Global Wealth",
      clientLogo: "/media/images/logos/vertex_logo.png",
      impact: "SOC2 Type II • Zero Security Incidents",
      image: "/media/images/industries/finance_ca_firms.png",
      tag: "FINANCIAL CLOUD SECURITY & AUDIT",
      desc: "Architected hardened AWS multi-account landing zone with mTLS microservice encryption, least-privilege IAM governance, and automated intrusion monitoring.",
      results: [
        "Achieved SOC2 Type II and ISO 27001 compliance in record 4 months",
        "Encrypted all internal microservice mesh traffic via HashiCorp Vault",
        "Automated continuous cloud compliance posture scanning"
      ],
      tech: ["AWS Multi-Account", "HashiCorp Vault", "Terraform", "Istio Service Mesh", "Datadog", "SOC2"]
    },
    {
      title: "Apex Healthcare Monolith-to-Cloud Migration",
      client: "Apex Health Networks",
      clientLogo: "/media/images/logos/apex_logo.png",
      impact: "Zero Downtime • -68% Cloud Bill",
      image: "/media/images/industries/healthcare.png",
      tag: "DIGITAL TRANSFORMATION & REFACTOR",
      desc: "Re-engineered a 14-year-old monolithic healthcare scheduling core into resilient event-driven microservices with zero patient record downtime.",
      results: [
        "Eliminated legacy on-prem licensing fees saving $1.4M annually",
        "Scaled peak morning appointment booking throughput by 800%",
        "100% data fidelity verified across 18 million patient dossiers"
      ],
      tech: ["Strangler Fig Pattern", "Kubernetes", "Kafka", "PostgreSQL Replicas", "GCP Cloud", "Docker"]
    },
    {
      title: "Core Logistics 10M QPS Architecture Stress Audit",
      client: "Core Freight Global",
      clientLogo: "/media/images/logos/core_logo.png",
      impact: "Identified 42 Bottlenecks • 10M QPS",
      image: "/media/images/industries/logistics_transport.png",
      tag: "HIGH CONCURRENCY ARCHITECTURE AUDIT",
      desc: "Performed comprehensive system audit of international freight routing APIs, conducting chaos engineering drills and database index optimizations.",
      results: [
        "Resolved memory leaks under peak load reducing p99 response times from 3.2s to 120ms",
        "Optimized PostgreSQL connection pooling reducing database CPU from 95% to 22%",
        "Drafted complete engineering roadmap adopted by 120+ developers"
      ],
      tech: ["Chaos Engineering", "k6 Load Testing", "PostgreSQL Tuning", "Redis Clustering", "Datadog APM"]
    },
    {
      title: "AgroTech Enterprise Digital Transformation Roadmap",
      client: "AgroTech Industries",
      clientLogo: "/media/images/logos/biomind_logo.png",
      impact: "3-Year Plan Shipped in 8 Months",
      image: "/media/images/industries/agriculture_agro.png",
      tag: "TECHNOLOGY ADVISORY & STRATEGY",
      desc: "Advised board of directors on replacing fragmented legacy ERPs with modern IoT telemetry gateways, establishing unified data warehouse governance.",
      results: [
        "Created vendor-neutral software selection scorecard saving $600K in licenses",
        "Established automated CI/CD deployment pipelines across 4 global teams",
        "Trained internal engineering leadership in modern cloud-native standards"
      ],
      tech: ["Cloud Strategy", "Enterprise Architecture", "Vendor Due Diligence", "IoT Architecture", "Python"]
    }
  ];

  const benchmarks = [
    { metric: "Monthly Cloud Hosting Bill", before: "$68,000/mo", after: "$21,500/mo", change: "68% Cost Saved" },
    { metric: "Core System Downtime", before: "18.5 Hrs / Yr", after: "0 Minutes", change: "100% Reliability" },
    { metric: "Security Vulnerability Backlog", before: "128 Open CVEs", after: "0 Critical CVEs", change: "Hardened Posture" },
    { metric: "Time to Deploy Production Hotfix", before: "4 Days Manual", after: "15 Min Automated", change: "38x Speedup" }
  ];

  const techStack = [
    { name: "AWS & Google Cloud Well-Architected", role: "Cloud Resilience & Cost Optimization Audits" },
    { name: "Terraform & Pulumi", role: "Repeatable Infrastructure as Code (IaC) Frameworks" },
    { name: "HashiCorp Vault & AWS KMS", role: "Zero-Trust Encryption & Secrets Management" },
    { name: "Kubernetes (EKS/GKE) & Istio", role: "Zero-Downtime Microservices Service Mesh" },
    { name: "k6 & Locust Load Testing", role: "Extreme Concurrency & Stress Capacity Benchmarking" },
    { name: "Datadog & Prometheus / Grafana", role: "Full-Stack Observability & Distributed Tracing" },
    { name: "SOC 2 & ISO 27001 Playbooks", role: "Regulatory Security Governance & Hardening" },
    { name: "PostgreSQL & Redis Scaling", role: "High-Throughput ACID Sharding & Query Optimization" }
  ];

  const faqs = [
    {
      q: "What does an Enterprise Architecture Audit entail?",
      a: "We audit your codebase, database schemas, cloud infrastructure costs, security posture, and API bottlenecks to produce an actionable engineering roadmap with quantified ROI."
    },
    {
      q: "How do you guarantee zero downtime during cloud migrations?",
      a: "We deploy parallel environments, dual-write message queues, and automated data checksum validators before rerouting DNS and API gateway traffic gradually."
    },
    {
      q: "Can you help our company achieve SOC 2 or ISO 27001 compliance?",
      a: "Yes. We implement technical infrastructure controls, access policies, audit logging, and encryption configurations necessary to pass independent third-party audits."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-emerald-600/20 via-teal-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-cyan-900/15 via-emerald-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-emerald-400 font-semibold uppercase tracking-wider">
            Consulting
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-widest uppercase text-emerald-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CLOUD AUDITS &amp; DIGITAL TRANSFORMATION</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Technology Consulting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            A verified track record of enterprise cloud migrations, zero-trust cybersecurity audits, monolithic modernization roadmaps, and multi-million dollar infrastructure cost reductions.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Request Architecture Audit →
            </button>
            <button
              onClick={() => navigateTo('/services/consulting')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Advisory Services
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-emerald-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2">
            // Strategic Engagements
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Enterprise Modernization &amp; Architecture Deployments
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-emerald-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 font-mono text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
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
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Advisory Milestones Shipped
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
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

      {/* Cloud Modernization Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2">
            // Empirical Optimization
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Infrastructure &amp; Security Benchmarks
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Empirical before-and-after results achieved through our architectural and cloud audits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  {b.metric}
                </span>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Legacy</div>
                    <div className="text-base font-semibold text-neutral-400">{b.before}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">Modernized</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
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
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2">
            // Advisory Standards
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Cloud, Security &amp; Audit Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors mb-1">
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
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Consulting Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-emerald-500/40 bg-white/[0.02] overflow-hidden transition-all"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-emerald-950/30 to-black border border-emerald-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Need senior technology advisory?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            We evaluate legacy systems, eliminate architectural risk, and build clear modernization roadmaps for enterprise executives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 cursor-pointer"
            >
              Schedule Advisory Consultation →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Review Enterprise Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
