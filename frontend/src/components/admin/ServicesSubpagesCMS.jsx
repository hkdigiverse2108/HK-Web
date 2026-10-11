import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ServicesSubpagesCMS({ adminPassword }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [activeSection, setActiveSection] = useState('hero');

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/services-subpages`);
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
      console.error('Failed to load services subpages:', e);
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
      const res = await fetch(`${API_URL}/api/collections/services_subpages/identifier/${encodeURIComponent(formData.identifier)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword || ''}`,
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast('success', `Saved "${formData.title}" successfully!`);
        // Update local list
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

  // Helper form updates
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Capabilities helpers
  const handleCapabilityChange = (index, key, value) => {
    const list = [...(formData.capabilities || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData(prev => ({ ...prev, capabilities: list }));
  };

  const addCapability = () => {
    const list = [...(formData.capabilities || [])];
    list.push({ title: 'New Capability', description: 'Describe what HK Digiverse delivers.', icon: '⚡' });
    setFormData(prev => ({ ...prev, capabilities: list }));
  };

  const removeCapability = (index) => {
    const list = (formData.capabilities || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, capabilities: list }));
  };

  // Process helpers
  const handleProcessChange = (index, key, value) => {
    const list = [...(formData.process || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData(prev => ({ ...prev, process: list }));
  };

  const addProcess = () => {
    const list = [...(formData.process || [])];
    list.push({ step: `0${list.length + 1}`, title: 'New Stage', description: 'Describe the milestone output.' });
    setFormData(prev => ({ ...prev, process: list }));
  };

  const removeProcess = (index) => {
    const list = (formData.process || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, process: list }));
  };

  // FAQs helpers
  const handleFaqChange = (index, key, value) => {
    const list = [...(formData.faqs || [])];
    list[index] = { ...list[index], [key]: value };
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  const addFaq = () => {
    const list = [...(formData.faqs || [])];
    list.push({ question: 'Frequently Asked Question?', answer: 'Clear, concise client-oriented response.' });
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  const removeFaq = (index) => {
    const list = (formData.faqs || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, faqs: list }));
  };

  // Filtered pages
  const categories = ['All', ...Array.from(new Set(pages.map(p => p.category).filter(Boolean)))];
  const filteredPages = pages.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = !search || 
      (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
      (p.identifier && p.identifier.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070708] text-white">
      {/* Top Hub Bar */}
      <div className="h-20 px-8 border-b border-white/10 bg-[#0c0c0e]/80 backdrop-blur-md flex items-center justify-between select-none shrink-0 gap-4">
        <div className="flex flex-col text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            // SERVICES CMS ENGINE
          </span>
          <h2 className="text-base font-bold text-white uppercase tracking-wider mt-0.5">
            50 Service Capabilities Manager ({pages.length} Pages Live)
          </h2>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-3">
          {formData && (
            <>
              <button
                onClick={() => window.open(formData.slug || `/services/${formData.identifier}`, '_blank')}
                className="px-3.5 py-2 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 rounded-xl font-mono text-[9px] uppercase tracking-widest text-neutral-300 hover:text-emerald-400 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>↗ View Live Page</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer flex items-center gap-2"
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
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast({ type: '', message: '' })} className="hover:text-white">✕</button>
        </div>
      )}

      {/* Main Split Layout: Left Subpage List, Right Detailed Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Subpages Directory (320px) */}
        <aside className="w-80 border-r border-white/10 bg-[#09090b] flex flex-col shrink-0 overflow-hidden">
          {/* Search & Category Filter */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <input
              type="text"
              placeholder="Search services (e.g. cloud, ai)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
            />
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[9px] font-mono scrollbar-none">
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Pages */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
            {loading ? (
              <div className="p-8 text-center font-mono text-xs text-neutral-500 animate-pulse">// LOADING 50 CAPABILITIES...</div>
            ) : filteredPages.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">No services match filter</div>
            ) : (
              filteredPages.map(item => {
                const isCurrent = selectedIdentifier === item.identifier;
                return (
                  <div
                    key={item.identifier}
                    onClick={() => handleSelectPage(item)}
                    className={`p-3 rounded-xl cursor-pointer transition-all text-left group ${
                      isCurrent
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400/80">
                        {item.category || 'CAPABILITY'}
                      </span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white mt-1 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.title}
                    </div>
                    <div className="font-mono text-[9px] text-neutral-500 truncate mt-0.5">
                      {item.slug || `/services/${item.identifier}`}
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
                    { id: 'hero', label: '1. Hero & Header', icon: '⚡' },
                    { id: 'capabilities', label: `2. Capabilities (${(formData.capabilities || []).length})`, icon: '🛠️' },
                    { id: 'process', label: `3. Process (${(formData.process || []).length})`, icon: '📈' },
                    { id: 'techStack', label: `4. Tech Stack (${(formData.techStack || []).length})`, icon: '💻' },
                    { id: 'faqs', label: `5. FAQs (${(formData.faqs || []).length})`, icon: '❓' },
                    { id: 'cta', label: '6. Bottom CTA', icon: '📢' }
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
                  SLUG: <span className="text-emerald-400 font-semibold">{formData.slug}</span>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full space-y-6 text-left">
                {/* 1. HERO SECTION */}
                {activeSection === 'hero' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hero Banner & Overview</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">Control the top visual headline, badges, and category labels.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Page Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => updateField('title', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Hero Badge Pill</label>
                        <input
                          type="text"
                          value={formData.heroBadge || ''}
                          onChange={(e) => updateField('heroBadge', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Category</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => updateField('category', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Tagline / Mission</label>
                        <input
                          type="text"
                          value={formData.tagline || ''}
                          onChange={(e) => updateField('tagline', e.target.value)}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Subtitle / Tagline Summary</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => updateField('subtitle', e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Full Description Paragraph</label>
                      <textarea
                        rows={4}
                        value={formData.description || ''}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 2. CAPABILITIES LIST */}
                {activeSection === 'capabilities' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Capabilities & Feature Pillars</h3>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">Edit the modular capability cards highlighted on this service page.</p>
                      </div>
                      <button
                        onClick={addCapability}
                        className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold"
                      >
                        + Add Capability
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.capabilities || []).map((cap, cIdx) => (
                        <div key={cIdx} className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold">
                              #0{cIdx + 1} Capability
                            </span>
                            <button
                              onClick={() => removeCapability(cIdx)}
                              className="text-neutral-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                            >
                              🗑️ Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="space-y-1 md:col-span-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Icon / Emoji</label>
                              <input
                                type="text"
                                value={cap.icon || ''}
                                onChange={(e) => handleCapabilityChange(cIdx, 'icon', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1 md:col-span-3">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Title</label>
                              <input
                                type="text"
                                value={cap.title || ''}
                                onChange={(e) => handleCapabilityChange(cIdx, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase text-neutral-400">Description</label>
                            <textarea
                              rows={2}
                              value={cap.description || ''}
                              onChange={(e) => handleCapabilityChange(cIdx, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PROCESS STEPS */}
                {activeSection === 'process' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Delivery Process Milestones</h3>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">Sequential methodology executed for client projects.</p>
                      </div>
                      <button
                        onClick={addProcess}
                        className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold"
                      >
                        + Add Milestone
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.process || []).map((step, pIdx) => (
                        <div key={pIdx} className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-blue-400 uppercase tracking-widest font-bold">
                              Milestone {pIdx + 1}
                            </span>
                            <button
                              onClick={() => removeProcess(pIdx)}
                              className="text-neutral-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                            >
                              🗑️ Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="space-y-1 md:col-span-1">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Step Tag (e.g. 01)</label>
                              <input
                                type="text"
                                value={step.step || ''}
                                onChange={(e) => handleProcessChange(pIdx, 'step', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1 md:col-span-3">
                              <label className="text-[9px] font-mono uppercase text-neutral-400">Milestone Title</label>
                              <input
                                type="text"
                                value={step.title || ''}
                                onChange={(e) => handleProcessChange(pIdx, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase text-neutral-400">Description</label>
                            <textarea
                              rows={2}
                              value={step.description || ''}
                              onChange={(e) => handleProcessChange(pIdx, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. TECH STACK */}
                {activeSection === 'techStack' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Technology Stack & Frameworks</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">List technology badges displayed in the service credentials grid.</p>
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
                        placeholder="React, TypeScript, Node.js, AWS, Kubernetes..."
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(formData.techStack || []).map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-xs text-emerald-300">
                          ⚡ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. FAQS */}
                {activeSection === 'faqs' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">Direct answers addressing client queries and scope clarity.</p>
                      </div>
                      <button
                        onClick={addFaq}
                        className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold"
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

                {/* 6. BOTTOM CTA */}
                {activeSection === 'cta' && (
                  <div className="space-y-6 bg-white/[0.015] border border-white/5 p-6 rounded-2xl">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Bottom Conversion CTA</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">Closing banner urging visitors to book an architectural consultation.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">CTA Headline</label>
                        <input
                          type="text"
                          value={(formData.cta && formData.cta.title) || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), title: e.target.value } }))}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">CTA Subtitle</label>
                        <input
                          type="text"
                          value={(formData.cta && formData.cta.subtitle) || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), subtitle: e.target.value } }))}
                          className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Button Label</label>
                          <input
                            type="text"
                            value={(formData.cta && formData.cta.buttonText) || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), buttonText: e.target.value } }))}
                            className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Button Target URL</label>
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
              Select a capability from the left sidebar to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
