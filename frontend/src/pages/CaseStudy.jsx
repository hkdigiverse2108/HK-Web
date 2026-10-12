import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { navigateTo } from '../utils/navigation';
import { DEFAULT_CASE_STUDIES, normalizeCaseStudy, findCaseStudy } from '../data/caseStudiesData';

export default function CaseStudy({ dynamicSlug }) {
  const { content } = useContent();
  const sv = content?.site_settings?.section_visibility || {};
  if (sv.casestudy_list === false) return null;

  // Merge CMS dynamic case studies with default case studies
  const allCases = useMemo(() => {
    const cmsList = Array.isArray(content?.case_studies) ? content.case_studies : [];
    if (cmsList.length === 0) {
      return DEFAULT_CASE_STUDIES.map(c => normalizeCaseStudy(c));
    }

    const combined = [...cmsList.map(c => normalizeCaseStudy(c))];
    DEFAULT_CASE_STUDIES.forEach(def => {
      const exists = combined.some(c => c.slug === def.slug || c.id === def.id || (c.aliases && c.aliases.includes(def.slug)));
      if (!exists) {
        combined.push(normalizeCaseStudy(def));
      }
    });
    return combined;
  }, [content?.case_studies]);

  // Determine active slug from prop, search param, hash, or pathname
  const [activeSlug, setActiveSlug] = useState(() => {
    if (dynamicSlug) return dynamicSlug;
    if (typeof window === 'undefined') return null;

    const path = window.location.pathname || '';
    const match = path.match(/^\/(?:case-study|case-studies)\/([^/?#]+)/);
    if (match) return match[1];

    const search = window.location.search;
    if (search.includes('case=')) {
      return new URLSearchParams(search).get('case');
    }

    const hash = window.location.hash;
    if (hash.includes('?case=')) {
      return hash.split('?case=')[1].split('&')[0];
    }
    const hashMatch = hash.match(/^#(?:case-study|case-studies)\/([^/?#]+)/);
    if (hashMatch) return hashMatch[1];

    return null;
  });

  // State for Main Listing Filters & Search
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync active slug with URL navigation
  useEffect(() => {
    const updateSlugFromUrl = () => {
      if (dynamicSlug) {
        setActiveSlug(dynamicSlug);
        return;
      }
      const path = window.location.pathname || '';
      const match = path.match(/^\/(?:case-study|case-studies)\/([^/?#]+)/);
      if (match) {
        setActiveSlug(match[1]);
        return;
      }

      const search = window.location.search;
      if (search.includes('case=')) {
        setActiveSlug(new URLSearchParams(search).get('case'));
        return;
      }

      const hash = window.location.hash;
      if (hash.includes('?case=')) {
        setActiveSlug(hash.split('?case=')[1].split('&')[0]);
        return;
      }
      const hashMatch = hash.match(/^#(?:case-study|case-studies)\/([^/?#]+)/);
      if (hashMatch) {
        setActiveSlug(hashMatch[1]);
        return;
      }

      setActiveSlug(null);
    };

    updateSlugFromUrl();
    window.addEventListener('popstate', updateSlugFromUrl);
    window.addEventListener('hashchange', updateSlugFromUrl);
    return () => {
      window.removeEventListener('popstate', updateSlugFromUrl);
      window.removeEventListener('hashchange', updateSlugFromUrl);
    };
  }, [dynamicSlug]);

  const activeCase = useMemo(() => {
    if (!activeSlug) return null;
    return findCaseStudy(allCases, activeSlug);
  }, [allCases, activeSlug]);

  useEffect(() => {
    if (activeCase) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeCase]);

  const handleOpenCase = (slug) => {
    navigateTo(`/case-studies/${slug}`);
  };

  const handleBackToList = () => {
    navigateTo('/case-study');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER DYNAMIC SINGLE CASE STUDY (CLEAN, CONCISE, EDITORIAL)
  // ─────────────────────────────────────────────────────────────────────────────
  if (activeCase) {
    const relatedCases = allCases
      .filter(c => c.slug !== activeCase.slug && c.id !== activeCase.id)
      .slice(0, 3);

    return (
      <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden selection:bg-[#a8ce38] selection:text-black">
        {/* Subtle Ambient Glow */}
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
        <div className="absolute top-0 right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full filter blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-[40%] left-0 w-[45vw] h-[45vw] bg-emerald-600/5 rounded-full filter blur-[130px] pointer-events-none -translate-x-1/3" />

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-32 pb-6 px-6 max-w-5xl mx-auto relative z-20">
          <ol className="flex items-center flex-wrap gap-2 text-xs font-mono text-neutral-500">
            <li>
              <button onClick={() => navigateTo('/')} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li className="text-neutral-600">&gt;</li>
            <li>
              <button onClick={handleBackToList} className="hover:text-white transition-colors cursor-pointer">
                Case Studies
              </button>
            </li>
            <li className="text-neutral-600">&gt;</li>
            <li className="text-[#a8ce38] font-semibold truncate max-w-xs sm:max-w-md">
              {activeCase.title}
            </li>
          </ol>
        </nav>

        {/* HERO / HEADER */}
        <header className="px-6 max-w-5xl mx-auto pb-12 relative z-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
            <span>Case Study</span>
            <span className="text-neutral-600">&middot;</span>
            <span className="text-[#a8ce38]">{activeCase.industry}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-6">
            {activeCase.title}
          </h1>

          <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {activeCase.lede}
          </p>

          {/* Clean Meta Strip */}
          <div className="flex items-center gap-8 py-4 border-t border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Client</span>
              <span className="text-sm font-medium text-white">{activeCase.client}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Industry</span>
              <span className="text-sm font-medium text-blue-400">{activeCase.industry}</span>
            </div>
          </div>
        </header>

        {/* HERO COVER MEDIA */}
        {activeCase.coverImage && (
          <section className="px-6 max-w-5xl mx-auto mb-16 relative z-10">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0c0d14] shadow-2xl">
              <img
                src={activeCase.coverImage}
                alt={activeCase.title}
                className="w-full h-auto object-cover max-h-[460px]"
                loading="eager"
              />
            </div>
          </section>
        )}

        {/* MAIN EDITORIAL CONTENT */}
        <main className="px-6 max-w-5xl mx-auto space-y-16 pb-20 relative z-10">
          {/* 01. CHALLENGE */}
          <section className="border-t border-white/5 pt-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-[#a8ce38] bg-[#a8ce38]/10 px-2 py-0.5 rounded border border-[#a8ce38]/30">
                01
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Challenge
              </h2>
            </div>

            <div className="space-y-4 text-neutral-300 font-light text-base leading-relaxed max-w-3xl mb-8">
              {activeCase.challenge.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Optional Diagram */}
            {activeCase.challenge.diagram && (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0f] p-3 max-w-3xl shadow-lg">
                <img
                  src={activeCase.challenge.diagram}
                  alt={activeCase.challenge.diagramAlt || "Challenge Architecture"}
                  className="w-full h-auto rounded object-contain bg-black/40"
                />
              </div>
            )}
          </section>

          {/* 02. OUR SOLUTION */}
          <section className="border-t border-white/5 pt-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-[#a8ce38] bg-[#a8ce38]/10 px-2 py-0.5 rounded border border-[#a8ce38]/30">
                02
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Our Solution
              </h2>
            </div>

            <p className="text-neutral-300 font-light text-base leading-relaxed mb-6 max-w-3xl">
              {activeCase.solution.intro} The approach follows one principle:{' '}
              <strong className="text-white font-semibold">{activeCase.solution.principle}</strong>
            </p>

            {/* Concise Glow-Bullet List */}
            <ul className="space-y-3.5 max-w-3xl">
              {activeCase.solution.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a8ce38] mt-2 shrink-0 shadow-[0_0_8px_rgba(168,206,56,0.6)]" />
                  <span>
                    <strong className="text-white font-semibold">{pt.label}:</strong> {pt.text}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 03. BUSINESS IMPACT */}
          <section className="border-t border-white/5 pt-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-[#a8ce38] bg-[#a8ce38]/10 px-2 py-0.5 rounded border border-[#a8ce38]/30">
                03
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Business Impact
              </h2>
            </div>

            <p className="text-neutral-300 font-light text-base leading-relaxed mb-6 max-w-3xl">
              {activeCase.businessImpact.intro}
            </p>

            <ul className="space-y-3.5 max-w-3xl">
              {activeCase.businessImpact.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 04. SERVICES DELIVERED */}
          <section className="border-t border-white/5 pt-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-[#a8ce38] bg-[#a8ce38]/10 px-2 py-0.5 rounded border border-[#a8ce38]/30">
                04
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Services Delivered
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5 max-w-3xl pt-2">
              {activeCase.servicesDelivered.map((serv, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-200 text-xs sm:text-sm font-medium hover:border-[#a8ce38]/50 hover:text-white transition-colors cursor-default"
                >
                  {serv}
                </span>
              ))}
            </div>
          </section>
        </main>

        {/* RELATED WORK / MORE WORK LIKE THIS */}
        {relatedCases.length > 0 && (
          <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10 relative z-10">
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-1">
                + Related Case Studies
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                More Work Like This
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((rc) => (
                <div
                  key={rc.slug}
                  onClick={() => handleOpenCase(rc.slug)}
                  className="rounded-2xl bg-[#090a10] border border-white/5 hover:border-white/20 transition-all overflow-hidden group cursor-pointer"
                >
                  <div className="h-40 overflow-hidden relative bg-black/60">
                    <img
                      src={rc.coverImage}
                      alt={rc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                        {rc.industry}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display text-base font-bold text-white mb-2 group-hover:text-[#a8ce38] transition-colors line-clamp-2">
                      {rc.title}
                    </h4>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-2 mb-4">
                      {rc.lede}
                    </p>
                    <span className="text-xs font-mono text-[#a8ce38] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Case Study &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CLEAN CTA */}
        <section className="pb-24 px-6 max-w-5xl mx-auto relative z-10">
          <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-blue-950/30 via-[#0a0f18] to-emerald-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                Have a similar project in mind?
              </h3>
              <p className="text-neutral-400 text-sm font-light">
                Let&apos;s discuss how our engineering team can build your solution.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-[#a8ce38] transition-all shrink-0 cursor-pointer shadow-lg"
            >
              Get In Touch &rarr;
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER MAIN CASE STUDIES DIRECTORY / HUB (WHEN NO SLUG SELECTED)
  // ─────────────────────────────────────────────────────────────────────────────
  const categories = ['All', ...Array.from(new Set(allCases.map(c => c.industry)))];

  const filteredCases = allCases.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.industry === activeCategory;
    const matchesSearch = searchQuery === ''
      || item.title.toLowerCase().includes(searchQuery.toLowerCase())
      || item.client.toLowerCase().includes(searchQuery.toLowerCase())
      || item.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative text-neutral-300 font-sans min-h-screen bg-[#050508] overflow-hidden selection:bg-[#a8ce38] selection:text-black pb-24">
      {/* Background ambience */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-[10%] right-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center pt-28 pb-12 px-6 max-w-4xl mx-auto relative z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#a8ce38] block mb-3">
          // Client Impact &amp; Engineering Case Work
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Case Studies
        </h1>
        <p className="font-light text-neutral-400 text-base max-w-2xl mx-auto leading-relaxed">
          Explore how we solved critical technical challenges, built compliant architectures, and accelerated digital growth for our clients.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <section className="px-6 max-w-6xl mx-auto mb-10 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-white/5">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#a8ce38]/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((item) => (
            <div
              key={item.slug || item.id}
              onClick={() => handleOpenCase(item.slug)}
              className="group rounded-2xl bg-[#090a10] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-black/60">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      {item.industry}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1.5">
                    {item.client}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mb-2.5 group-hover:text-[#a8ce38] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                    {item.lede}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full py-2.5 rounded-lg bg-white/5 group-hover:bg-[#a8ce38] group-hover:text-black border border-white/10 text-white font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2">
                  <span>View Case Study</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
