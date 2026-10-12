import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioStartupSolutionsPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "4-6 Wks", label: "Average MVP Launch", sub: "Production Market Readiness" },
    { value: "$32M+", label: "Venture Capital Raised", sub: "By HK DigiVerse Built Startups" },
    { value: "82%", label: "Founder Retention Rate", sub: "Scaling Past Series A" },
    { value: "100%", label: "Zero Technical Debt", sub: "Clean Modular Repositories" }
  ];

  const projects = [
    {
      title: "PulsePay Instant Settlement Fintech MVP",
      client: "PulsePay Technologies",
      clientLogo: "/media/images/logos/pulsepay_logo.png",
      impact: "Shipped in 34 Days • $2.4M Seed Raised",
      image: "/media/images/industries/fintech.png",
      tag: "FINTECH MVP & ACCELERATION",
      desc: "Engineered compliant peer-to-peer payment gateway prototype with real-time Plaid bank linking, instant KYC checkouts, and micro-deposit verification.",
      results: [
        "Delivered fully working production MVP in under 5 weeks",
        "Helped founding team secure $2.4M institutional Seed round",
        "Zero security vulnerabilities reported in third-party penetration audits"
      ],
      tech: ["React 19", "Node.js", "Plaid API", "Stripe Connect", "AWS Serverless", "PostgreSQL"]
    },
    {
      title: "NovaDeFi Next-Gen Liquidity Portal",
      client: "Nova DeFi Labs",
      clientLogo: "/media/images/logos/nova_logo.png",
      impact: "12K Users Day 1 • $8M Locked",
      image: "/media/images/industries/aisaas.png",
      tag: "WEB3 & ASSET MANAGEMENT",
      desc: "Built cinematic decentralized web dashboard with multi-wallet connection, live gas fee estimation, and automated smart contract yield calculation.",
      results: [
        "12,000 active wallets transacting on launch day without downtime",
        "Optimized Web3 transaction RPC polling reducing node bills by 72%",
        "Designed distinctive brand identity, tokenomics deck, and UI kit"
      ],
      tech: ["Next.js 15", "Wagmi", "Viem", "Tailwind CSS", "Go Microservices", "Alchemy"]
    },
    {
      title: "EduSpark Interactive EdTech Video Suite",
      client: "EduSpark Systems",
      clientLogo: "/media/images/logos/helios_logo.png",
      impact: "45K Students • 99.8% Retention",
      image: "/media/images/industries/education.png",
      tag: "EDTECH PLATFORM & STREAMING",
      desc: "Constructed gamified video learning platform with interactive code sandboxes, automated homework evaluation, and multi-currency subscriptions.",
      results: [
        "Onboarded 45,000 active students within first 60 days post-launch",
        "Sub-second video stream initialization powered by Cloudflare Stream",
        "Integrated parental SMS notifications and automated grade reports"
      ],
      tech: ["React", "WebRTC", "Cloudflare Stream", "Supabase", "Stripe Subscriptions", "Tailwind"]
    },
    {
      title: "CleanGrid Renewable Solar Telemetry App",
      client: "CleanGrid IoT",
      clientLogo: "/media/images/logos/quantum_logo.png",
      impact: "Seed to Series A Architecture",
      image: "/media/images/industries/solar_renewable.png",
      tag: "HARDWARE IOT & MOBILE APP",
      desc: "Developed cross-platform mobile and web controller communicating with residential solar micro-inverters via Bluetooth Low Energy and MQTT.",
      results: [
        "Architected scalable backend capable of handling 500,000 live sensor pings",
        "Helped founders graduate from Y Combinator-tier accelerator",
        "Real-time watt generation charts updating every 500ms"
      ],
      tech: ["React Native", "FastAPI", "MQTT Broker", "TimescaleDB", "Docker", "AWS IoT Core"]
    }
  ];

  const benchmarks = [
    { metric: "Time to First Working Prototype", before: "6 Months Legacy", after: "3 Weeks Shipped", change: "88% Faster" },
    { metric: "Initial Cloud Infrastructure Burn", before: "$3,800/mo", after: "$180/mo (Serverless)", change: "95% Capital Saved" },
    { metric: "Code Review Pass Rate (Audits)", before: "High Debt", after: "100% Production Ready", change: "Zero Debt" },
    { metric: "Investor Pitch Demo Conversion", before: "Clickable Slides", after: "Live Interactive App", change: "High Trust" }
  ];

  const techStack = [
    { name: "Next.js & React 19", role: "Rapid Conversion-Engineered Frontend Interfaces" },
    { name: "Supabase & PostgreSQL", role: "Instant Auth, Realtime Database & Row-Level Security" },
    { name: "FastAPI & Node.js", role: "Lean High-Throughput Microservice Foundations" },
    { name: "Stripe Connect & Billing", role: "Turnkey Subscription, Invoicing & Marketplace Rails" },
    { name: "AWS Serverless & Cloudflare", role: "Elastic Pay-As-You-Grow Zero-Idle Cloud Costs" },
    { name: "React Native & Expo", role: "Single-Codebase iOS & Android Mobile Deployment" },
    { name: "Tailwind CSS & Shadcn/UI", role: "Bespoke Brand Styling Without Component Bloat" },
    { name: "PostHog & Mixpanel", role: "Product-Market Fit Analytics & Funnel Drop-Off Tracking" }
  ];

  const faqs = [
    {
      q: "Can you build an MVP in 4 to 6 weeks without cutting corners?",
      a: "Yes. We focus on core hypothesis validation, using proven serverless architectural foundations and pre-built design tokens to eliminate technical debt while moving fast."
    },
    {
      q: "What happens after our MVP launches and we raise funding?",
      a: "We act as your Fractional CTO and engineering squad, seamlessly scaling your platform into Series A without needing to rewrite any codebase."
    },
    {
      q: "Do you assist with investor pitch decks and product demos?",
      a: "Yes. We design high-fidelity interactive prototypes and cinematic product demo videos that showcase technical defensibility to venture capitalists."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-orange-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-orange-600/20 via-amber-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-rose-900/15 via-orange-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-orange-400 font-semibold uppercase tracking-wider">
            Startup Solutions
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] font-mono tracking-widest uppercase text-orange-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>RAPID MVP ENGINEERING &amp; VENTURE SCALE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Startup Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            A venture chronicle of rapid minimum viable products (MVPs), seed-stage architectural foundations, investor-ready interactive platforms, and scalable growth engines built for ambitious founders.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(249,115,22,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Launch Your Startup MVP →
            </button>
            <button
              onClick={() => navigateTo('/services/startup-solutions')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Startup Services
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-orange-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 block mb-2">
            // Startup Cohort
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Shipped Minimum Viable Products &amp; Founder Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-orange-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/40 font-mono text-[10px] text-orange-300 font-bold uppercase tracking-wider">
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
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Founder Traction Outcomes
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
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

      {/* Startup Acceleration Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 block mb-2">
            // Time to Market
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Venture Velocity &amp; Burn Optimization
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Comparison between traditional slow agency delivery versus our rapid MVP acceleration model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  {b.metric}
                </span>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Traditional</div>
                    <div className="text-base font-semibold text-neutral-400">{b.before}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-orange-400 uppercase">HK Model</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-mono text-xs font-bold">
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
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 block mb-2">
            // Startup Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Rapid Scalability Tooling
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/40 hover:bg-orange-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-orange-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-orange-400 transition-colors mb-1">
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
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Founder Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] overflow-hidden transition-all"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-orange-950/30 to-black border border-orange-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Building the next unicorn venture?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            Partner with HariKrushn DigiVerse to design, engineer, and launch your high-performance startup MVP in 4 to 6 weeks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-105 cursor-pointer"
            >
              Book Founder Discovery Sprint →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Startup Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
