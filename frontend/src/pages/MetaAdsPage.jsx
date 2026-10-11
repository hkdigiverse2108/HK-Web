import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';
import { useServiceSubpage } from '../utils/useDynamicContent';

export default function MetaAdsPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTechCategory, setActiveTechCategory] = useState('All');

  const staticPageData = {
  "title": "Meta Ads",
  "category": "Digital Marketing",
  "categoryUrl": "/services/digital-marketing",
  "color": "pink-500",
  "tag": "GROWTH & PERFORMANCE DIVISION",
  "description": "Empower your business with our specialized Meta Ads services. Architected for unmatched speed, military-grade security, and measurable ROI, we build digital solutions that dominate search rankings and drive sustainable growth.",
  "capabilities": [
    {
      "title": "Technical & Algorithmic SEO",
      "desc": "Deep crawl budget optimization, JavaScript rendering fixes, Core Web Vitals acceleration, and schema markup injection.",
      "deliverables": [
        "Lighthouse 95+ Performance",
        "JSON-LD Rich Snippet Coverage",
        "Indexation & Crawl Health Audits"
      ],
      "tag": "Technical Foundation"
    },
    {
      "title": "Generative Engine Optimization (GEO)",
      "desc": "Proprietary strategies ensuring your brand is cited and recommended as the primary authority in ChatGPT, Perplexity, and Gemini search.",
      "deliverables": [
        "AI Search Citations Strategy",
        "Entity & Knowledge Graph Alignment",
        "Conversational Search Visibility"
      ],
      "tag": "Next-Gen Search"
    },
    {
      "title": "High-Intent Google Ads & PPC",
      "desc": "Laser-targeted Google Search, Shopping, and Performance Max campaigns with aggressive negative keyword filtering to maximize ROI.",
      "deliverables": [
        "Sub-15% Cost Per Acquisition",
        "High Quality Score (>8/10)",
        "Automated Bid & Conversion Tracking"
      ],
      "tag": "Paid Performance"
    },
    {
      "title": "Meta & Paid Social Scaling",
      "desc": "Full-funnel creative testing frameworks across Meta, LinkedIn, and Instagram backed by server-side Conversions API (CAPI).",
      "deliverables": [
        "High-Converting Video & Static Creatives",
        "First-Party CAPI Tracking",
        "Dynamic Retargeting Loops"
      ],
      "tag": "Social Growth"
    },
    {
      "title": "Topical Authority Content Strategy",
      "desc": "E-E-A-T aligned keyword clustering that builds semantic authority, capturing high-intent long-tail transactional queries.",
      "deliverables": [
        "Comprehensive Keyword Mapping",
        "Thought-Leadership Articles",
        "Zero Keyword Cannibalization"
      ],
      "tag": "Organic Content"
    },
    {
      "title": "Marketing Automation & Lead Nurturing",
      "desc": "Automated multi-channel email workflows, webhook routing, and lead qualification scoring that converts warm leads into sales.",
      "deliverables": [
        "HubSpot / Zapier Workflows",
        "Automated Drip Sequences",
        "Real-Time CRM Sync"
      ],
      "tag": "Conversion Funnels"
    }
  ],
  "techStack": [
    {
      "name": "Google Search Console",
      "role": "Indexation & Core Ranking Analytics"
    },
    {
      "name": "Ahrefs & SEMrush",
      "role": "Competitive Intelligence & Keyword Audits"
    },
    {
      "name": "Google Analytics 4",
      "role": "Full-Funnel Event & Attribution Tracking"
    },
    {
      "name": "Meta Business Suite",
      "role": "High-Performance Social Ad Scaling"
    },
    {
      "name": "Google Ads (PMax)",
      "role": "Intent-Driven Search & Display Reach"
    },
    {
      "name": "Screaming Frog",
      "role": "Deep Architecture & Technical Crawling"
    },
    {
      "name": "Looker Studio",
      "role": "Live Transparent Client KPI Dashboards"
    },
    {
      "name": "HubSpot CRM",
      "role": "Lead Pipeline & Marketing Automation"
    },
    {
      "name": "Zapier / Make",
      "role": "Zero-Latency Workflow Webhooks"
    },
    {
      "name": "Hotjar",
      "role": "Behavioral Heatmaps & Conversion Optimization"
    }
  ],
  "faqs": [
    {
      "q": "How fast can our business expect tangible organic SEO results?",
      "a": "Technical SEO fixes and indexation improvements show initial traffic shifts within 3 to 5 weeks. Competitive keyword rankings and high-intent commercial positions compound over 3 to 6 months into sustained organic lead generation."
    },
    {
      "q": "What is Generative Engine Optimization (GEO) and why is it crucial today?",
      "a": "As users migrate from classic search engines to AI assistants (ChatGPT, Gemini, Perplexity), GEO optimizes your digital footprint, entity structure, and brand citations so AI models surface your company as the definitive solution."
    },
    {
      "q": "How do you monitor and report return on investment (ROI)?",
      "a": "We provide real-time Looker Studio dashboards linked to Google Analytics 4 and your CRM. You will track exact Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and organic pipeline revenue with weekly transparent syncs."
    },
    {
      "q": "Do you create the ad creatives and copywriting in-house?",
      "a": "Yes. Our dedicated creative studio produces high-converting ad copy, visual assets, video hooks, and custom landing pages specifically engineered for maximum conversion rates."
    },
    {
      "q": "How do you eliminate wasted ad spend on Google and Meta Ads?",
      "a": "Through extensive daily negative keyword audits, conversion API deduplication, strict demographic exclusions, and iterative A/B creative testing to continuously lower Cost Per Acquisition (CPA)."
    }
  ],
  "siblings": [
    {
      "name": "SEO",
      "url": "/services/seo"
    },
    {
      "name": "Local SEO",
      "url": "/services/local-seo"
    },
    {
      "name": "Technical SEO",
      "url": "/services/technical-seo"
    },
    {
      "name": "AI SEO",
      "url": "/services/ai-seo"
    },
    {
      "name": "Generative Engine Optimization (GEO)",
      "url": "/services/generative-engine-optimization"
    },
    {
      "name": "Google Ads / PPC",
      "url": "/services/google-ads-ppc"
    }
  ]
};

  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  };
  const { data: pageData } = useServiceSubpage(staticPageData.title ? staticPageData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '', staticPageData);


  // Structured Data (JSON-LD) for Rich Google Snippets
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Meta Ads",
        "provider": {
          "@type": "Organization",
          "name": "HK DigiVerse LLP",
          "url": "https://hkdigiverse.com"
        },
        "description": "Empower your business with our specialized Meta Ads services. Architected for unmatched speed, military-grade security, and measurable ROI, we build digital solutions that dominate search rankings and drive sustainable growth.",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Meta Ads Deliverables"
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
            "name": "Digital Marketing",
            "item": "https://hkdigiverse.com/services/digital-marketing"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Meta Ads",
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
        className="absolute top-0 right-1/4 w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-pink-500/20 via-indigo-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2"
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
          <li className="text-pink-500 font-semibold">
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
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
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
                Enterprise-Grade Meta Ads Solutions
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
                  className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full transition-all shadow-xl shadow-pink-500/25 flex items-center gap-3 text-sm cursor-pointer"
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
                className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-pink-500/40 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-pink-500 uppercase tracking-wider">Quality Verified</span>
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
                className={`flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/[0.02] transition-all ${ribbon.extra || ''}`}
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
              <div className="font-mono text-xs uppercase tracking-wider text-pink-500 font-bold mb-1">{item.label}</div>
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
            className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3"
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
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 group-hover:bg-[#a8ce38]/15 group-hover:border-[#a8ce38]/40 group-hover:text-[#a8ce38] transition-colors">
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">// Architecture Suite</span>
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">// Execution Blueprint</span>
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
                <div className="w-full h-full bg-pink-500/40 group-hover:bg-pink-500 transition-colors" />
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">// Sector Expertise</span>
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
              <h4 className="font-display font-bold text-xl text-white mb-3 group-hover:text-pink-500 transition-colors">{sec.title}</h4>
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">// Competitive Advantage</span>
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
                <th className="p-6 font-mono text-xs uppercase tracking-wider text-pink-500 font-bold">HK DigiVerse Squads</th>
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">// Transparency First</span>
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
                  <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/10 text-white' : 'text-neutral-500'}`}>
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
            <span className="font-mono text-xs uppercase tracking-widest text-pink-500 block mb-3">
              // Ecosystem Exploration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Related Services &amp; Synergies
            </h2>
            <p className="text-neutral-400 font-light text-sm sm:text-base max-w-2xl mx-auto">
              Explore interconnected services designed to amplify your digital capabilities.
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
                    <span className="font-mono text-[10px] text-pink-500 uppercase tracking-widest px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 group-hover:text-[#a8ce38] group-hover:border-[#a8ce38]/40 group-hover:bg-[#a8ce38]/10 transition-colors">
                      0{idx + 1} // Ecosystem
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
          <span className="font-mono text-xs uppercase tracking-widest text-pink-500 font-bold mb-4 block">
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
