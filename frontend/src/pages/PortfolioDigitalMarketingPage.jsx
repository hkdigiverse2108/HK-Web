import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioDigitalMarketingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "5.4x", label: "Average Blended ROAS", sub: "Performance Ad Spend" },
    { value: "+460%", label: "Organic Search Growth", sub: "Technical SEO & GEO" },
    { value: "$38M+", label: "Client Revenue Driven", sub: "Direct Tracked Attribution" },
    { value: "-48%", label: "Customer Acquisition Cost", sub: "Optimized Conversion Funnels" }
  ];

  const projects = [
    {
      title: "LuxeCart Global D2C Omnichannel Scale",
      client: "LuxeCart International",
      clientLogo: "/media/images/logos/luxecart_logo.png",
      impact: "6.2x ROAS • +480% Organic Reach",
      image: "/media/images/industries/fashion_clothing.png",
      tag: "PERFORMANCE MARKETING & E-COM",
      desc: "Engineered full-funnel acquisition strategy combining Meta ASC dynamic catalogs, Google Performance Max, and high-converting retargeting loops.",
      results: [
        "Scaled monthly GMV from $85K to $520K in 9 months",
        "Decreased blended CAC by 42% through creative testing",
        "Built automated email/SMS flows contributing 31% of total sales"
      ],
      tech: ["Meta Ads", "Google Ads PMax", "Klaviyo", "Technical SEO", "Shopify Plus", "GA4 Attribution"]
    },
    {
      title: "CoreLogistics B2B Inbound Lead Engine",
      client: "Core Logistics Inc",
      clientLogo: "/media/images/logos/core_logo.png",
      impact: "+420% Inbound Leads • -54% CAC",
      image: "/media/images/industries/corporate_b2b.png",
      tag: "B2B LEAD GEN & SEO",
      desc: "Architected high-intent search capture campaign ranking #1 for commercial freight keywords, supported by LinkedIn Account-Based Marketing (ABM).",
      results: [
        "Generated 480+ enterprise RFQ inquiries within 2 quarters",
        "Captured top 3 SERP rankings for 180+ commercial queries",
        "Implemented automated CRM pipeline lead-scoring workflows"
      ],
      tech: ["Technical SEO", "LinkedIn ABM", "HubSpot Automation", "Content Clusters", "Google Search Ads"]
    },
    {
      title: "Aura Beauty Viral Social & Influencer Growth",
      client: "Aura Cosmetics",
      clientLogo: "/media/images/logos/aura_logo.png",
      impact: "+320% Revenue • 14M Impressions",
      image: "/media/images/industries/cosmetics_beauty.png",
      tag: "SOCIAL MEDIA & VIRAL FUNNELS",
      desc: "Designed and executed high-frequency TikTok & Instagram Reels campaign featuring creator seeding, conversion UGC, and remarketing hooks.",
      results: [
        "14 Million organic & paid video impressions generated",
        "Surpassed $1M annual run rate within 120 days of product launch",
        "Achieved 18% repeat customer purchase rate via SMS nurture"
      ],
      tech: ["TikTok Ads", "Meta Ads", "Influencer Seeding", "UGC Direct Response", "Attribution Modeling"]
    },
    {
      title: "OmniRetail 50-Location Local SEO Grid",
      client: "Omni Supermarkets",
      clientLogo: "/media/images/logos/solis_logo.png",
      impact: "#1 Map Pack in 42 Cities",
      image: "/media/images/industries/retail_supermarkets.png",
      tag: "LOCAL & AI SEARCH OPTIMIZATION",
      desc: "Optimized 50+ Google Business Profiles with automated review collection, localized landing pages, and AI engine citation priming (GEO).",
      results: [
        "85% lift in 'direction requests' and foot-traffic searches",
        "Consolidated top 3 rankings in local Google Map Packs",
        "Direct mentions in Perplexity and ChatGPT local queries"
      ],
      tech: ["Local SEO", "Google Business Profile", "GEO Optimization", "Schema.org Markup", "Review Automation"]
    }
  ];

  const benchmarks = [
    { metric: "Blended Return on Ad Spend (ROAS)", before: "1.9x", after: "5.4x", change: "+184% Growth" },
    { metric: "Organic Traffic (Monthly Visits)", before: "12K visits", after: "185K visits", change: "+1,440% Traffic" },
    { metric: "Lead Conversion Rate (CRO)", before: "1.4%", after: "4.8%", change: "3.4x More Leads" },
    { metric: "Cost Per Acquisition (CAC)", before: "$78 / lead", after: "$26 / lead", change: "66% Cheaper" }
  ];

  const techStack = [
    { name: "Google Ads & PMax", role: "Search, Shopping & High-Intent Acquisition" },
    { name: "Meta Advantage+ (ASC)", role: "Algorithmic Prospecting & Creative Funnels" },
    { name: "Technical SEO & Schema", role: "Core Web Vitals & Knowledge Graph Indexing" },
    { name: "Generative Engine Opt (GEO)", role: "Perplexity, ChatGPT & Gemini Brand Citations" },
    { name: "Klaviyo & HubSpot", role: "Lifecycle Retention, SMS & CRM Automation" },
    { name: "Triple Whale & GA4", role: "First-Party Cookie Multi-Touch Attribution" },
    { name: "Hotjar & Microsoft Clarity", role: "Conversion Rate Optimization (CRO) Heatmaps" },
    { name: "Ahrefs & Semrush Enterprise", role: "Keyword Gap Audits & Competitor Counter-Action" }
  ];

  const faqs = [
    {
      q: "How fast do we see measurable ROI from performance campaigns?",
      a: "Paid advertising funnels generate measurable sales data within 7 to 14 days of creative testing. SEO and organic authority matrices compound over 60 to 90 days."
    },
    {
      q: "What is Generative Engine Optimization (GEO)?",
      a: "GEO structures your digital presence so AI engines like ChatGPT, Perplexity, and Google AI Overviews cite and recommend your brand when users research products."
    },
    {
      q: "Do you manage both creative production and media buying?",
      a: "Yes. Our team handles copy, visual creative variants, video hooks, landing page CRO, and media budget bidding under a unified data feedback loop."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-rose-600/20 via-pink-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-purple-900/15 via-rose-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-rose-400 font-semibold uppercase tracking-wider">
            Digital Marketing
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono tracking-widest uppercase text-rose-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>GROWTH ENGINES &amp; PERFORMANCE ADVERTISING</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Digital Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            Verified growth campaigns, algorithmic PPC ad funnels, high-intent technical SEO conquests, and multi-channel attribution architectures delivering sustainable client scale.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(244,63,94,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Initiate Growth Audit →
            </button>
            <button
              onClick={() => navigateTo('/services/digital-marketing')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Marketing Services
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-rose-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-400 block mb-2">
            // Revenue Track Record
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Client Campaign Case Studies &amp; Attribution Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-rose-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/40 font-mono text-[10px] text-rose-300 font-bold uppercase tracking-wider">
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
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Verified Campaign Outcomes
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
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

      {/* Growth Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-400 block mb-2">
            // Performance Metrics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Campaign Optimization Benchmarks
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Directly measurable ROI improvements across paid ad channels and organic rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-rose-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  {b.metric}
                </span>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Baseline</div>
                    <div className="text-base font-semibold text-neutral-400">{b.before}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-rose-400 uppercase">Optimized</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 font-mono text-xs font-bold">
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
          <span className="font-mono text-xs uppercase tracking-widest text-rose-400 block mb-2">
            // Marketing Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Analytics &amp; Acquisition Technology
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-rose-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-rose-400 transition-colors mb-1">
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
          <span className="font-mono text-xs uppercase tracking-widest text-rose-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Common Marketing Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-rose-500/40 bg-white/[0.02] overflow-hidden transition-all"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-rose-950/30 to-black border border-rose-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Ready to accelerate revenue acquisition?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            We build predictable growth funnels backed by multi-channel attribution and empirical ROAS targets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(244,63,94,0.3)] hover:scale-105 cursor-pointer"
            >
              Claim Growth Audit →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Growth Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
