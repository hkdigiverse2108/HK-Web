import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';
import { usePortfolioSubpage } from '../utils/useDynamicContent';

export default function PortfolioDigitalPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const staticData = {
  "name": "Digital",
  "slug": "/portfolio/digital",
  "componentName": "PortfolioDigitalPage",
  "tag": "FULL-STACK DIGITAL ATELIER",
  "color": "violet-500",
  "accentColor": "#8b5cf6",
  "desc": "Building bespoke digital portals, SaaS operations matrices, high-fidelity customer applications, and custom APIs tailored to unique commercial business models.",
  "projects": [
    {
      "title": "Bespoke Operations & Client Portal",
      "client": "Veritas Asset Management",
      "impact": "$140M Managed Assets Tracked",
      "desc": "Custom investor dashboards, automated capital call notices, verified PDF distribution, and end-to-end encrypted messaging.",
      "tech": [
        "React 19",
        "FastAPI",
        "Docker",
        "PostgreSQL",
        "Tailwind"
      ]
    },
    {
      "title": "Multi-Tenant Subscription SaaS",
      "client": "CloudFlow Suite",
      "impact": "40,000 Paid Workspaces",
      "desc": "Multi-tenant database schema isolation, role-based workspace permissions, Stripe recurring billing, and automated audit logging.",
      "tech": [
        "Next.js 15",
        "PostgreSQL",
        "Stripe Billing",
        "Redis",
        "Docker"
      ]
    }
  ],
  "techStack": [
    {
      "name": "React 19 & Next.js 15",
      "role": "Modern Component Architectures"
    },
    {
      "name": "FastAPI & Node.js",
      "role": "Bulletproof REST & GraphQL Endpoints"
    },
    {
      "name": "PostgreSQL & Redis",
      "role": "Rock-Solid Multi-Tenant Data Storage"
    },
    {
      "name": "Tailwind CSS & Framer",
      "role": "Editorial Cinematic UI/UX Motion"
    }
  ],
  "faqs": [
    {
      "q": "What makes custom software better than off-the-shelf subscriptions?",
      "a": "You gain complete intellectual property ownership, zero recurring per-user licensing fees, and software designed 100% around your exact operational workflows."
    }
  ]
};

  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  };
  const { data } = usePortfolioSubpage(staticData.slug ? staticData.slug.replace('/portfolio/', '') : '', staticData);


  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-amber-400 selection:text-black">
      {/* Dynamic Ambient Background Orbs */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-violet-500/20 via-indigo-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[35%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-cyan-900/15 via-purple-900/15 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-violet-500 font-semibold">
            {data.name}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-28 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono tracking-widest uppercase text-violet-500 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8ce38] animate-pulse" />
            <span>{data.tag}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            {data.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-300">Architecture</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            {data.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-white to-neutral-200 text-black font-semibold text-sm hover:from-white hover:to-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(168,206,56,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              Initiate Project Discussion →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a8ce38]/50 text-white font-medium text-sm transition-all hover:text-[#a8ce38] cursor-pointer"
            >
              View Client Case Studies
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/5">
          {[
            { value: "100%", label: "IP Handover", sub: "Day 1 Ownership" },
            { value: "99.99%", label: "System Uptime", sub: "Enterprise SLA" },
            { value: "< 200ms", label: "Global Latency", sub: "Edge Distributed" },
            { value: "0 Debt", label: "Modular Code", sub: "Automated QA" }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#a8ce38]/50 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-violet-500 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-500 block mb-2">
            // Selected Client Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Shipped Deployments &amp; Production Benchmarks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.018, borderColor: "rgba(168, 206, 56, 0.55)", boxShadow: "0 25px 50px -12px rgba(168, 206, 56, 0.22)" }}
              className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/5 hover:border-[#a8ce38]/60 hover:bg-[#121612]/30 transition-all flex flex-col justify-between group cursor-default relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a8ce38]/10 rounded-full blur-2xl group-hover:bg-[#a8ce38]/20 transition-all pointer-events-none" />
              
              <div className="relative z-10 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    {proj.client}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#a8ce38]/10 border border-[#a8ce38]/30 font-mono text-[10px] text-[#a8ce38] font-bold">
                    {proj.impact}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#a8ce38] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Ecosystem */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5 bg-[#030306]">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-500 block mb-2">
            // Technical Suite
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Domain Tooling &amp; Infrastructure
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Battle-tested technologies powering this sector with zero-debt reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#a8ce38]/50 hover:bg-[#a8ce38]/[0.02] transition-all group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#a8ce38] mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-base text-white group-hover:text-[#a8ce38] transition-colors mb-1">
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
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-24 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-500 block mb-2">
              // Clarifications
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 hover:border-[#a8ce38]/40 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
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
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a8ce38] font-bold block mb-4">
            // Start Your Project
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Build Next-Gen {data.name}?
          </h2>
          <p className="text-neutral-300 font-light text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Partner with HK DigiVerse to architect production-grade software that drives measurable business outcomes.
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="px-10 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-[#a8ce38] transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            Schedule Technical Consultation →
          </button>
        </div>
      </section>
    </div>
  );
}
