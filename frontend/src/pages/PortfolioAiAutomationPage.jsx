import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioAiAutomationPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "48M+", label: "Inferences Processed", sub: "Enterprise Multi-Agent Pipelines" },
    { value: "< 1.2s", label: "Agent Response Latency", sub: "Streamed Token Acceleration" },
    { value: "88%", label: "Autonomous Resolution", sub: "Zero Human Escalation" },
    { value: "99.4%", label: "F1 Precision Rate", sub: "Hallucination-Guarded RAG" }
  ];

  const projects = [
    {
      title: "Neuralis Autonomous Multi-Agent Support Swarm",
      client: "Neuralis AI Corp",
      clientLogo: "/media/images/logos/neuralis_logo.png",
      impact: "88% Auto Resolution • 1.2s Latency",
      image: "/media/images/industries/aisaas.png",
      tag: "MULTI-AGENT ORCHESTRATION",
      desc: "Deployed enterprise multi-agent swarm coordinating triage, dynamic API tool execution, database state lookup, and empathetic resolution generation across 4 channels.",
      results: [
        "Cut customer support ticket backlog by 78% in 30 days",
        "Deterministic JSON schema validation preventing rogue outputs",
        "Self-healing agent routing with human-in-the-loop fallback"
      ],
      tech: ["LangGraph", "Llama 3 Fine-Tuning", "vLLM", "Pinecone", "FastAPI", "Docker"]
    },
    {
      title: "BioMind Clinical RAG & Diagnostic Parser",
      client: "BioMind Life Sciences",
      clientLogo: "/media/images/logos/biomind_logo.png",
      impact: "99.4% Precision • Zero Hallucination",
      image: "/media/images/industries/pharma.png",
      tag: "PRIVATE ENTERPRISE RAG",
      desc: "Architected HIPAA-compliant self-hosted retrieval-augmented generation engine digesting 2.4 million pathology dossiers with hybrid semantic reranking.",
      results: [
        "Eliminated clinical hallucination with dual-citation verification",
        "Sub-second vector lookup across 100M+ dense medical embeddings",
        "Zero data transmission outside enterprise VPC boundaries"
      ],
      tech: ["Private LLMs", "Qdrant Vector DB", "Cohere Rerank", "FastAPI", "Kubernetes", "HIPAA Vault"]
    },
    {
      title: "HyperScale Robotic Process Automation (RPA)",
      client: "HyperScale Logistics",
      clientLogo: "/media/images/logos/hyperscale_logo.png",
      impact: "92% Labor Saved • 120K Docs/Mo",
      image: "/media/images/industries/logistics.png",
      tag: "VISION & INVOICE AUTOMATION",
      desc: "Engineered vision-language pipeline reading multi-lingual customs slips, packing declarations, and ERP accounting bills with automated error correction.",
      results: [
        "Reduced invoice processing turnaround from 48 hours to 4 minutes",
        "120,000 documents ingested and booked automatically every month",
        "Direct bidirectional synchronization with SAP and Oracle ledgers"
      ],
      tech: ["Vision Transformers", "Python RPA", "Celery", "Redis", "Kafka", "PostgreSQL"]
    },
    {
      title: "Quantum Solar Predictive Telemetry Engine",
      client: "Quantum CleanTech",
      clientLogo: "/media/images/logos/quantum_logo.png",
      impact: "42M Data Points / Day",
      image: "/media/images/industries/solar_renewable.png",
      tag: "PREDICTIVE ANOMALY DETECTION",
      desc: "Trained continuous telemetry neural networks forecasting inverter failure 72 hours in advance across 85 commercial photovoltaic solar plants.",
      results: [
        "Prevented an estimated $2.8M in unplanned downtime losses",
        "Streaming edge evaluation running locally on low-power hardware",
        "Automated maintenance dispatch work orders triggered by risk index"
      ],
      tech: ["PyTorch", "Ray Distributed", "TimescaleDB", "MQTT Telemetry", "Docker", "GCP Edge"]
    }
  ];

  const benchmarks = [
    { metric: "Support Escalation Rate", before: "100% Manual", after: "12% Human", change: "88% Automation" },
    { metric: "Document Processing Time", before: "48 Hours", after: "4 Minutes", change: "99.8% Faster" },
    { metric: "RAG Retrieval Accuracy", before: "68% Baseline", after: "99.4% Verified", change: "Zero Hallucination" },
    { metric: "Operational Labor Cost", before: "$84,000/mo", after: "$14,000/mo", change: "83% Cost Reduction" }
  ];

  const techStack = [
    { name: "LangChain & LangGraph", role: "Multi-Agent State Machines & Tool Augmented Loops" },
    { name: "vLLM & TensorRT-LLM", role: "High-Throughput Paged Attention Model Serving" },
    { name: "Pinecone & Qdrant", role: "Scalable Billion-Scale Vector Embeddings" },
    { name: "HuggingFace & PyTorch", role: "Proprietary Model Fine-Tuning & Quantization" },
    { name: "FastAPI & Celery", role: "Asynchronous Background Inference Orchestration" },
    { name: "RAGGuard & Guardrails AI", role: "Hallucination Firewalls & PII Sanitization" },
    { name: "Docker & NVIDIA Triton", role: "GPU-Accelerated Elastic Container Clusters" },
    { name: "Apache Kafka", role: "Distributed Event Streaming & Real-Time Telemetry" }
  ];

  const faqs = [
    {
      q: "Is our proprietary company data used to train public AI models?",
      a: "Never. All AI models, vector stores, and pipelines are deployed inside your private VPC or dedicated cloud perimeter with zero external data leakage."
    },
    {
      q: "How do you eliminate AI hallucinations in critical workflows?",
      a: "We implement strict schema validation, dual-pass retrieval reranking, and citation-enforced cross-checks so models only reply with verified source evidence."
    },
    {
      q: "Can autonomous AI agents integrate with our existing ERP/CRM APIs?",
      a: "Yes. We equip agents with authenticated tool libraries, enabling them to execute structured API actions, update database records, and invoke webhooks safely."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-purple-600/20 via-violet-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-indigo-900/15 via-purple-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-purple-400 font-semibold uppercase tracking-wider">
            AI &amp; Automation
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono tracking-widest uppercase text-purple-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>AUTONOMOUS AGENTS &amp; ENTERPRISE RAG</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            AI &amp; Automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            A production chronicle of autonomous multi-agent task swarms, private enterprise RAG deployments, robotic document process pipelines, and low-latency LLM serving.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(168,85,247,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Request AI Feasibility Sprint →
            </button>
            <button
              onClick={() => navigateTo('/services/ai-automation')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore AI Capabilities
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-purple-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 block mb-2">
            // Production Intelligence
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Deployed Multi-Agent Systems &amp; Neural Pipelines
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/40 font-mono text-[10px] text-purple-300 font-bold uppercase tracking-wider">
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
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Verified AI Performance
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
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

      {/* AI Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 block mb-2">
            // Empirical Benchmarks
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Automation Efficiency Benchmarks
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Measurable efficiency transformations achieved by replacing repetitive manual tasks with agentic loops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between">
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
                    <div className="text-[10px] font-mono text-purple-400 uppercase">Automated</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-mono text-xs font-bold">
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
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 block mb-2">
            // AI Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Neural Architecture &amp; Vector Tooling
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-purple-400 transition-colors mb-1">
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
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Common AI Engineering Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-purple-500/40 bg-white/[0.02] overflow-hidden transition-all"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-purple-950/30 to-black border border-purple-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Ready to deploy enterprise AI automation?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            We build autonomous multi-agent pipelines with guaranteed data privacy and zero hallucination guardrails.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:scale-105 cursor-pointer"
            >
              Book AI Discovery Session →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Review AI Client Deployments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
