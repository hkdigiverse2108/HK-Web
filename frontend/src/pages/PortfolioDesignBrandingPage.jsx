import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';

export default function PortfolioDesignBrandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: "85+", label: "Design Systems Built", sub: "Enterprise & Luxury Brands" },
    { value: "120 FPS", label: "Animation Pacing", sub: "Cinematic Micro-Interactions" },
    { value: "+320%", label: "Average Session Length", sub: "Immersive Editorial Flows" },
    { value: "4.9★", label: "User Usability Rating", sub: "Validated UX Testing" }
  ];

  const projects = [
    {
      title: "LuxeThread Haute Couture Digital Identity",
      client: "LuxeThread International",
      clientLogo: "/media/images/logos/saphira_logo.png",
      impact: "Awarded UI Benchmark • +340% Engagement",
      image: "/media/images/industries/fashion_clothing.png",
      tag: "LUXURY BRAND IDENTITY & SYSTEM",
      desc: "Architected a high-fashion digital editorial design system featuring minimalist serif typography, gesture-driven runway lookbooks, and high-conversion e-commerce checkout.",
      results: [
        "Doubled average user session duration from 1m 20s to 4m 15s",
        "Decreased checkout cart abandonment from 68% to 34%",
        "Crafted 140+ bespoke design tokens implemented in code"
      ],
      tech: ["Figma Enterprise", "Design Tokens", "Editorial Layouts", "Motion Design", "Storybook", "React"]
    },
    {
      title: "Kinesis Spatial Interior UI & 3D Showcase",
      client: "Kinesis Architecture Studio",
      clientLogo: "/media/images/logos/kinesis_logo.png",
      impact: "Sub-Second Pacing • +210% Leads",
      image: "/media/images/industries/furniture_interior.png",
      tag: "SPATIAL UI & 3D INTERACTIVE",
      desc: "Created dark-mode spatial web interface featuring 60 FPS interactive interior walkthroughs, glassmorphic client dashboards, and custom material swatch selectors.",
      results: [
        "210% increase in high-ticket architectural project inquiries",
        "Silky 120 FPS smooth scrolling synced across mobile and desktop",
        "Featured on international design community showcases"
      ],
      tech: ["Three.js", "WebGL", "Figma Prototyping", "Glassmorphism", "Micro-Interactions"]
    },
    {
      title: "Horizon Luxury Resorts Mobile-First UX",
      client: "Horizon Hospitality",
      clientLogo: "/media/images/logos/horizon_logo.png",
      impact: "3.8x Mobile Booking • -58% Friction",
      image: "/media/images/industries/hotels_resorts.png",
      tag: "MOBILE ERGONOMICS & UX AUDIT",
      desc: "Redesigned global hotel reservation funnel with bottom-sheet thumb ergonomics, instant date-picker calendar meshes, and cinematic full-bleed suites photography.",
      results: [
        "Shifted direct booking share from third-party OTAs by 42%",
        "Reduced multi-room checkout steps from 9 pages to 2 friction-free steps",
        "Flawless responsive typography scaling across 32 device viewports"
      ],
      tech: ["Mobile-First UX", "User Journey Mapping", "Thumb-Zone Ergonomics", "Figma", "Usability Testing"]
    },
    {
      title: "Vesper Labs Component Matrix & Brand Kit",
      client: "Vesper Digital Studio",
      clientLogo: "/media/images/logos/vesper_logo.png",
      impact: "Turnkey System for 4 Platforms",
      image: "/media/images/industries/cosmetics_beauty.png",
      tag: "DESIGN TOKENS & ICONOGRAPHY",
      desc: "Constructed comprehensive multi-platform design guidelines, bespoke vector icon libraries, accessible color contrast matrices, and brand storytelling decks.",
      results: [
        "Engineers accelerated frontend sprint delivery by 65% using pre-built tokens",
        "WCAG AAA accessibility compliance achieved across all digital states",
        "Complete trademark brand identity bible and logo construction guide"
      ],
      tech: ["Brand Strategy", "Vector Iconography", "WCAG AAA Accessible", "Design Tokens", "Typography Systems"]
    }
  ];

  const benchmarks = [
    { metric: "Checkout Abandonment Rate", before: "72% Dropped", after: "34% Lost", change: "52% Improvement" },
    { metric: "Average User Session Duration", before: "1m 15s", after: "4m 10s", change: "3.3x Engagement" },
    { metric: "Design-to-Code Dev Velocity", before: "3 Weeks / Feature", after: "4 Days / Feature", change: "78% Faster" },
    { metric: "System Usability Score (SUS)", before: "58 (Below Average)", after: "94 (Top 1% Tier)", change: "+62% Usability" }
  ];

  const techStack = [
    { name: "Figma & FigJam", role: "Collaborative Wireframing & Responsive Prototypes" },
    { name: "Design Tokens & Style Dictionary", role: "Cross-Platform Synced Design System Tokens" },
    { name: "Spline & Three.js", role: "Interactive 3D Spatial Geometry & Lighting" },
    { name: "Framer Motion & GSAP", role: "GPU-Accelerated 120 FPS Interaction Physics" },
    { name: "Storybook & Tailwind CSS", role: "Atomic Component Documentation & Accessibility" },
    { name: "Adobe Illustrator & After Effects", role: "Precision Vector Iconography & Motion Lottie" },
    { name: "Maze & Optimal Workshop", role: "Quantitative Usability & Tree-Testing Validation" },
    { name: "WCAG 2.2 Contrast Standards", role: "Enterprise Inclusive Accessibility Auditing" }
  ];

  const faqs = [
    {
      q: "Do you deliver code-ready design components or just design mockups?",
      a: "We deliver both. You receive production-ready Figma libraries, automated design token JSONs, and matching React / Tailwind CSS component code."
    },
    {
      q: "How do you ensure user interfaces convert rather than just looking pretty?",
      a: "We apply cognitive load reduction, thumb-friendly mobile layouts, and clear information hierarchies validated through user testing and heatmaps."
    },
    {
      q: "Do we get full trademark ownership of our logo and brand assets?",
      a: "Yes. All vector files, source assets, typography licenses, and brand books are transferred 100% to your enterprise upon project completion."
    }
  ];

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-1/4 w-[75vw] h-[75vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-b from-amber-600/20 via-orange-600/10 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[55vw] h-[55vw] bg-gradient-to-tr from-pink-900/15 via-amber-900/10 to-transparent rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

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
          <li className="text-amber-400 font-semibold uppercase tracking-wider">
            Design &amp; Branding
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pt-8 pb-20 lg:pt-14 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono tracking-widest uppercase text-amber-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>EDITORIAL UX/UI &amp; ICONIC BRAND IDENTITIES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Design &amp; Branding <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-orange-300">Case Work.</span>
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            A visual showcase of cinematic design systems, high-conversion UI/UX interfaces, iconic brand guidelines, and spatial digital experiences crafted with editorial precision.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Commission Design Sprint →
            </button>
            <button
              onClick={() => navigateTo('/services/design-and-branding')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Explore Design Capabilities
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="font-mono text-xs uppercase text-amber-400 font-semibold mb-0.5">{item.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Featured Projects Showcase with Images & Analytics */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
            // Curated Gallery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Design Systems &amp; Immersive Product Interfaces
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#09090f] border border-white/10 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 font-mono text-[10px] text-amber-300 font-bold uppercase tracking-wider">
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
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Measurable Results */}
                  <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                      Design Impact Metrics
                    </span>
                    {proj.results.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
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

      {/* UX Benchmarks (Before vs After) */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
            // Ergonomic Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            UX Conversion &amp; Usability Benchmarks
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Measurable user friction elimination and retention benchmarks achieved via modern design systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between">
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
                    <div className="text-[10px] font-mono text-amber-400 uppercase">Redesigned</div>
                    <div className="text-xl font-bold text-white">{b.after}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">
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
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
            // Design Tooling
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Design System &amp; Prototyping Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/[0.02] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 mb-3 group-hover:scale-125 transition-transform" />
              <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors mb-1">
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
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
            // FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Common Design Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 hover:border-amber-500/40 bg-white/[0.02] overflow-hidden transition-all"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-amber-950/30 to-black border border-amber-500/20 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            Elevate your brand with digital craftsmanship.
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-8 font-light">
            We build timeless brand identities, design systems, and conversion-engineered interfaces that command industry authority.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
            >
              Start Design Discovery →
            </button>
            <button
              onClick={() => navigateTo('/case-study')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Review Design Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
