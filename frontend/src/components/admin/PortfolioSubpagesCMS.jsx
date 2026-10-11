import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function PortfolioSubpagesCMS({ adminPassword }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [activeSection, setActiveSection] = useState('hero');

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/portfolio-subpages`);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setPages(list);
        if (list.length > 0 && !selectedIdentifier) {
          setSelectedIdentifier(list[0].identifier);
          setFormData(JSON.parse(JSON.stringify(list[0])));
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio subpages:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (item) => {
    setSelectedIdentifier(item.identifier);
    setFormData(JSON.parse(JSON.stringify(item)));
    setActiveSection('hero');
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: '', message: '' }), 3500);
  };

  const handleSave = async () => {
    if (!formData || !formData.identifier) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/collections/portfolio_subpages/identifier/${encodeURIComponent(formData.identifier)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword || ''}`,
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast('success', `Saved "${formData.title}" sector successfully!`);
        setPages(prev => prev.map(p => p.identifier === formData.identifier ? { ...p, ...formData } : p));
      } else {
        const err = await res.json().catch(() => ({}));
        showToast('error', err.detail || 'Failed to save changes.');
      }
    } catch (e) {
      console.error('Save failed:', e);
      showToast('error', 'Network error while saving.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Projects helpers
  const handleProjectChange = (index, key, value) => {
    const list = [...(formData.projects || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData(prev => ({ ...prev, projects: list }));
  };

  const addProject = () => {
    const list = [...(formData.projects || [])];
    list.push({
      title: 'Flagship Deployment',
      client: 'Enterprise Client',
      year: '2025',
      outcome: '300% throughput increase with zero downtime.',
      image: '/media/images/quantum_banking.png',
      tags: ['Enterprise', 'Architecture']
    });
    setFormData(prev => ({ ...prev, projects: list }));
  };

  const removeProject = (index) => {
    const list = (formData.projects || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: list }));
  };

  // FAQs helpers
  const handleFaqChange = (index, key, value) => {
    const list = [...(formData.faqs || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  const addFaq = () => {
    const list = [...(formData.faqs || [])];
    list.push({ question: 'Frequently Asked Question?', answer: 'Sector-specific response.' });
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  const removeFaq = (index) => {
    const list = (formData.faqs || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  const filteredPages = pages.filter(p => {
    if (!search) return true;
    return (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
      (p.identifier && p.identifier.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070708] text-white">
      {/* Top Hub Bar */}
      <div className="h-20 px-8 border-b border-white/10 bg-[#0c0c0e]/80 backdrop-blur-md flex items-center justify-between select-none shrink-0 gap-4">
        <div className="flex flex-col text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            // PORTFOLIO SECTORS CMS
          </span>
          <h2 className="text-base font-bold text-white uppercase tracking-wider mt-0.5">
            17 Industry Portfolios & Sector Deployments ({pages.length} Sectors Active)
          </h2>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3">
          {formData && (
            <>
              <button
                onClick={() => window.open(formData.slug || `/portfolio/${formData.identifier}`, '_blank')}
                className="px-3.5 py-2 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 rounded-xl font-mono text-[9px] uppercase tracking-widest text-neutral-300 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>↗ View Sector Page</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-purple-500 hover:bg-purple-400 text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <span>{saving ? '⏳ Saving...' : '💾 Save to Cloud'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toast Alert */}
      {toast.message && (
        <div className={`px-6 py-2.5 text-xs font-mono tracking-wide flex items-center justify-between border-b ${
          toast.type === 'success' 
            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast({ type: '', message: '' })} className="hover:text-white">✕</button>
        </div>
      )}

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sector Directory */}
        <aside className="w-80 border-r border-white/10 bg-[#09090b] flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <input
              type="text"
              placeholder="Search sectors (e.g. fintech, ai)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
            {loading ? (
              <div className="p-8 text-center font-mono text-xs text-neutral-500 animate-pulse">// LOADING 17 SECTORS...</div>
            ) : filteredPages.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">No sectors found</div>
            ) : (
              filteredPages.map(item => {
                const isCurrent = selectedIdentifier === item.identifier;
                return (
                  <div
                    key={item.identifier}
                    onClick={() => handleSelectPage(item)}
                    className={`p-3 rounded-xl cursor-pointer transition-all text-left group ${
                      isCurrent
                        ? 'bg-purple-500/10 border border-purple-500/30'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-purple-400/80">
                        {item.badge || 'PORTFOLIO SECTOR'}
                      </span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white mt-1 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {item.title}
                    </div>
                    <div className="font-mono text-[9px] text-neutral-500 truncate mt-0.5">
                      {item.slug || `/portfolio/${item.identifier}`}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#070708]">
          {formData ? (
            <>
              {/* Editor Subnav */}
              <div className="px-8 border-b border-white/10 bg-[#0d0d10] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1 overflow-x-auto py-3">
                  {[
                    { id: 'hero', label: '1. Sector Header', icon: '🏛️' },
                    { id: 'projects', label: `2. Case Studies & Deployments (${(formData.projects || []).length})`, icon: '🚀' },
                    { id: 'techStack', label: `3. Technologies (${(formData.techStack || []).length})`, icon: '💻' },
                    { id: 'faqs', label: `4. FAQs (${(formData.faqs || []).length})`, icon: '❓' },
                    { id: 'cta', label: '5. Bottom CTA', icon: '📢' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        activeSection === tab.id
                          ? 'bg-white text-black font-bold shadow-lg'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="font-mono text-[9px] text-neutral-400 shrink-0">
                  SLUG: <span className="text-purple-400 font-semibold">{formData.slug}</span>
                </div>
              </div>

              {/* Form Fields Area */}
              <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full space-y-6 text-left">
                {/* 1. HERO HEADER */}
                {activeSection === 'hero' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sector Overview & Header</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">Control sector identity, badge pill, and intro summary.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Sector Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => updateField('title', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Badge Pill</label>
                        <input
                          type="text"
                          value={formData.badge || ''}
                          onChange={(e) => updateField('badge', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Subtitle / Sector Focus</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => updateField('subtitle', e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Description Paragraph</label>
                      <textarea
                        rows={4}
                        value={formData.description || ''}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 2. CASE STUDIES / PROJECTS */}
                {activeSection === 'projects' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sector Work & Deployments</h3>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">Showcase verified enterprise case studies in this vertical.</p>
                      </div>
                      <button
                        onClick={addProject}
                        className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-black font-mono text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold"
                      >
                        + Add Case Study
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.projects || []).map((proj, pIdx) => (
                        <div key={pIdx} className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-bold">
                              Project #{pIdx + 1}: {proj.title}
                            </span>
                            <button
                              onClick={() => removeProject(pIdx)}
                              className="text-neutral-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                            >
                              🗑️ Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Project Title</label>
                              <input
                                type="text"
                                value={proj.title || ''}
                                onChange={(e) => handleProjectChange(pIdx, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-medium"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Client / Brand</label>
                              <input
                                type="text"
                                value={proj.client || ''}
                                onChange={(e) => handleProjectChange(pIdx, 'client', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Year / Timeline</label>
                              <input
                                type="text"
                                value={proj.year || ''}
                                onChange={(e) => handleProjectChange(pIdx, 'year', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Image Asset URL</label>
                              <input
                                type="text"
                                value={proj.image || ''}
                                onChange={(e) => handleProjectChange(pIdx, 'image', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Tags (Comma Separated)</label>
                              <input
                                type="text"
                                value={Array.isArray(proj.tags) ? proj.tags.join(', ') : (proj.tags || '')}
                                onChange={(e) => {
                                  const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                  handleProjectChange(pIdx, 'tags', arr);
                                }}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase text-neutral-400">Impact / Measurable Outcome</label>
                            <textarea
                              rows={2}
                              value={proj.outcome || ''}
                              onChange={(e) => handleProjectChange(pIdx, 'outcome', e.target.value)}
                              className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. TECH STACK */}
                {activeSection === 'techStack' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vertical Tech Ecosystem</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">Frameworks and protocols deployed in this sector.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Technologies (Comma Separated)</label>
                      <textarea
                        rows={3}
                        value={(formData.techStack || []).join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          updateField('techStack', arr);
                        }}
                        className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(formData.techStack || []).map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-xs text-purple-300">
                          ⚡ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. FAQS */}
                {activeSection === 'faqs' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vertical Domain FAQs</h3>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">Common inquiries regarding regulatory, compliance, and velocity.</p>
                      </div>
                      <button
                        onClick={addFaq}
                        className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-black font-mono text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold"
                      >
                        + Add FAQ
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.faqs || []).map((faq, fIdx) => (
                        <div key={fIdx} className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest font-bold">
                              FAQ #{fIdx + 1}
                            </span>
                            <button
                              onClick={() => removeFaq(fIdx)}
                              className="text-neutral-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                            >
                              🗑️ Remove
                            </button>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase text-neutral-400">Question</label>
                            <input
                              type="text"
                              value={faq.question || ''}
                              onChange={(e) => handleFaqChange(fIdx, 'question', e.target.value)}
                              className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-medium"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase text-neutral-400">Answer</label>
                            <textarea
                              rows={2}
                              value={faq.answer || ''}
                              onChange={(e) => handleFaqChange(fIdx, 'answer', e.target.value)}
                              className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. BOTTOM CTA */}
                {activeSection === 'cta' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sector Consultation CTA</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">Bottom call to action for booking an industry briefing.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Headline</label>
                        <input
                          type="text"
                          value={(formData.cta && formData.cta.title) || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), title: e.target.value } }))}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Subtitle</label>
                        <input
                          type="text"
                          value={(formData.cta && formData.cta.subtitle) || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), subtitle: e.target.value } }))}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Button Text</label>
                          <input
                            type="text"
                            value={(formData.cta && formData.cta.buttonText) || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), buttonText: e.target.value } }))}
                            className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Button Link</label>
                          <input
                            type="text"
                            value={(formData.cta && formData.cta.buttonLink) || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), buttonLink: e.target.value } }))}
                            className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center font-mono text-xs text-neutral-500">
              Select an industry sector from the left sidebar to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
