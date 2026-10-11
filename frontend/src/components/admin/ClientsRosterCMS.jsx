import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ClientsRosterCMS({ adminPassword }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingClient, setEditingClient] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/clients`);
      if (res.ok) {
        const data = await res.json();
        setClients(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load clients:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: '', message: '' }), 3500);
  };

  const handleOpenEdit = (client) => {
    setIsNew(false);
    setEditingClient(JSON.parse(JSON.stringify(client)));
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingClient({
      id: `client_${Date.now()}`,
      name: '',
      logo: '/media/images/clients/placeholder.png',
      category: 'Enterprise',
      website: '',
      sortOrder: clients.length + 1,
      isActive: true
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.url || data.image_url;
        setEditingClient(prev => ({ ...prev, logo: uploadedUrl }));
        showToast('success', 'Logo uploaded successfully!');
      } else {
        showToast('error', 'Failed to upload logo image.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      showToast('error', 'Network error during upload.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSaveClient = async () => {
    if (!editingClient || !editingClient.name) {
      showToast('error', 'Client name is required.');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        // POST create item
        const res = await fetch(`${API_URL}/api/collections/clients_roster`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword || ''}`,
            'x-admin-password': adminPassword || ''
          },
          body: JSON.stringify(editingClient)
        });
        if (res.ok) {
          showToast('success', `Added "${editingClient.name}" to roster!`);
          setClients(prev => [...prev, editingClient]);
          setEditingClient(null);
        } else {
          showToast('error', 'Failed to create client.');
        }
      } else {
        // PUT update item
        const res = await fetch(`${API_URL}/api/collections/clients_roster/id/${encodeURIComponent(editingClient.id)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword || ''}`,
            'x-admin-password': adminPassword || ''
          },
          body: JSON.stringify(editingClient)
        });
        if (res.ok) {
          showToast('success', `Updated "${editingClient.name}"!`);
          setClients(prev => prev.map(c => c.id === editingClient.id ? editingClient : c));
          setEditingClient(null);
        } else {
          showToast('error', 'Failed to update client.');
        }
      }
    } catch (e) {
      console.error('Save failed:', e);
      showToast('error', 'Network error while saving client.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClient = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from clients?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/collections/clients_roster/id/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminPassword || ''}`,
          'x-admin-password': adminPassword || ''
        }
      });
      if (res.ok) {
        showToast('success', `Removed "${name}".`);
        setClients(prev => prev.filter(c => c.id !== id));
      } else {
        showToast('error', 'Failed to remove client.');
      }
    } catch (e) {
      console.error('Delete failed:', e);
      showToast('error', 'Network error during delete.');
    }
  };

  const handleToggleActive = async (client) => {
    const updated = { ...client, isActive: !client.isActive };
    try {
      const res = await fetch(`${API_URL}/api/collections/clients_roster/id/${encodeURIComponent(client.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword || ''}`,
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setClients(prev => prev.map(c => c.id === client.id ? updated : c));
      }
    } catch (e) {
      console.error('Toggle failed:', e);
    }
  };

  const filteredClients = clients.filter(c => {
    if (!search) return true;
    return (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
      (c.category && c.category.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070708] text-white">
      {/* Top Hub Bar */}
      <div className="h-20 px-8 border-b border-white/10 bg-[#0c0c0e]/80 backdrop-blur-md flex items-center justify-between select-none shrink-0 gap-4">
        <div className="flex flex-col text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            // CLIENT PARTNERS & LOGO WALL CMS
          </span>
          <h2 className="text-base font-bold text-white uppercase tracking-wider mt-0.5">
            Enterprise Client Logos ({clients.length} Verified Partners)
          </h2>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('/our-clients', '_blank')}
            className="px-3.5 py-2 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 rounded-xl font-mono text-[9px] uppercase tracking-widest text-neutral-300 hover:text-amber-400 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>↗ Open Live Wall</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer flex items-center gap-1.5"
          >
            <span>+ Add Client Partner</span>
          </button>
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

      {/* Search Toolbar */}
      <div className="px-8 py-4 border-b border-white/10 bg-[#09090b] flex items-center justify-between gap-4">
        <div className="w-80">
          <input
            type="text"
            placeholder="Search partners by name or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div className="font-mono text-[10px] text-neutral-400">
          Showing {filteredClients.length} of {clients.length} partners
        </div>
      </div>

      {/* Clients Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <div className="text-center py-20 font-mono text-xs text-neutral-500 animate-pulse">
            // LOADING CLIENT WALL ASSETS...
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-20 text-xs text-neutral-500">
            No client records found matching search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="p-5 bg-white/[0.02] border border-white/5 hover:border-amber-500/30 rounded-2xl flex flex-col justify-between transition-all group relative overflow-hidden"
              >
                <div>
                  {/* Status & Sort Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400">
                      #{client.sortOrder || 1} • {client.category || 'PARTNER'}
                    </span>
                    <button
                      onClick={() => handleToggleActive(client)}
                      className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                        client.isActive !== false
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {client.isActive !== false ? '● ACTIVE' : '○ HIDDEN'}
                    </button>
                  </div>

                  {/* Logo Preview Container */}
                  <div className="h-24 bg-black/50 border border-white/5 rounded-xl flex items-center justify-center p-3 mb-4 group-hover:bg-black/70 transition-colors">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="font-mono text-xs text-neutral-500">{client.name}</span>
                    )}
                  </div>

                  {/* Client Info */}
                  <h3 className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {client.name}
                  </h3>
                  {client.website && (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[9px] text-neutral-500 hover:text-white truncate block mt-0.5"
                    >
                      {client.website}
                    </a>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEdit(client)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id, client.name)}
                    className="px-2.5 py-1.5 text-neutral-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0d0d10] border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest font-bold">
                  // {isNew ? 'ADD NEW PARTNER' : 'EDIT CLIENT PARTNER'}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {isNew ? 'Register New Client' : editingClient.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingClient(null)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-neutral-400">Client / Brand Name *</label>
                <input
                  type="text"
                  value={editingClient.name || ''}
                  onChange={(e) => setEditingClient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Apex Global Bank"
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-400">Category / Sector</label>
                  <input
                    type="text"
                    value={editingClient.category || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Fintech, Healthcare, AI..."
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-400">Display Order</label>
                  <input
                    type="number"
                    value={editingClient.sortOrder || 1}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-neutral-400">Website URL (Optional)</label>
                <input
                  type="text"
                  value={editingClient.website || ''}
                  onChange={(e) => setEditingClient(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-neutral-400">Logo Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingClient.logo || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="/media/images/clients/logo.svg"
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                  <label className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-mono text-[9px] uppercase tracking-wider text-white cursor-pointer flex items-center shrink-0">
                    <span>{uploadingLogo ? '...' : '📁 Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>

                {/* Logo Preview Box */}
                {editingClient.logo && (
                  <div className="h-16 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center p-2">
                    <img
                      src={editingClient.logo}
                      alt="Logo preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingClient(null)}
                className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl font-mono text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClient}
                disabled={saving}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save Partner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
