import React, { useState } from 'react';
import { navigateTo } from '../utils/navigation';
import { useClientsRoster } from '../utils/useDynamicContent';

// All 24 Verified Client Logos
const CLIENTS_LIST = [
  { id: "saphira", name: "Saphira Corp", logo: "/media/images/logos/saphira_logo.png" },
  { id: "quantum", name: "Quantum Banking", logo: "/media/images/logos/quantum_logo.png" },
  { id: "finvortex", name: "FinVortex Capital", logo: "/media/images/logos/finvortex_logo.png" },
  { id: "pulsepay", name: "PulsePay Global", logo: "/media/images/logos/pulsepay_logo.png" },
  { id: "aether", name: "Aether AI Systems", logo: "/media/images/logos/aether_logo.png" },
  { id: "neuralis", name: "Neuralis Intelligence", logo: "/media/images/logos/neuralis_logo.png" },
  { id: "zenith", name: "Zenith Cognitive", logo: "/media/images/logos/zenith_logo.png" },
  { id: "nova", name: "Nova DeFi Labs", logo: "/media/images/logos/nova_logo.png" },
  { id: "aerocrm", name: "AeroCRM Global", logo: "/media/images/logos/aerocrm_logo.png" },
  { id: "hyperscale", name: "HyperScale Cloud", logo: "/media/images/logos/hyperscale_logo.png" },
  { id: "vesper", name: "Vesper CyberSecurity", logo: "/media/images/logos/vesper_logo.png" },
  { id: "omnicom", name: "OmniCom Enterprise", logo: "/media/images/logos/omnicom_logo.png" },
  { id: "core", name: "Core Logistics Global", logo: "/media/images/logos/core_logo.png" },
  { id: "axiom", name: "Axiom Industrial ERP", logo: "/media/images/logos/axiom_logo.png" },
  { id: "apex", name: "Apex Cargo Networks", logo: "/media/images/logos/apex_logo.png" },
  { id: "luxecart", name: "LuxeCart International", logo: "/media/images/logos/luxecart_logo.png" },
  { id: "kinesis", name: "Kinesis Digital Commerce", logo: "/media/images/logos/kinesis_logo.png" },
  { id: "horizon", name: "Horizon Consumer Brands", logo: "/media/images/logos/horizon_logo.png" },
  { id: "vertex", name: "Vertex Mobility", logo: "/media/images/logos/vertex_logo.png" },
  { id: "helios", name: "Helios Renewable Power", logo: "/media/images/logos/helios_logo.png" },
  { id: "solis", name: "Solis Smart Grid", logo: "/media/images/logos/solis_logo.png" },
  { id: "orion", name: "Orion Biotech Labs", logo: "/media/images/logos/orion_logo.png" },
  { id: "aura", name: "Aura Health Networks", logo: "/media/images/logos/aura_logo.png" },
  { id: "biomind", name: "BioMind Diagnostics", logo: "/media/images/logos/biomind_logo.png" }
];

// Single Logo Item Component with Monogram Fallback
function LogoCard({ client }) {
  const [hasError, setHasError] = useState(false);

  const initials = client.name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      title={client.name}
      className="h-32 sm:h-36 md:h-40 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-[#a8ce38]/70 flex flex-col items-center justify-center p-5 group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(168,206,56,0.25)] relative overflow-hidden"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-[#a8ce38]/0 group-hover:bg-[#a8ce38]/[0.03] transition-colors duration-200 pointer-events-none" />

      {/* Logo Image or Monogram */}
      <div className="w-full h-full flex items-center justify-center">
        {!hasError && client.logo ? (
          <img
            src={client.logo}
            alt={`${client.name} Logo`}
            onError={() => setHasError(true)}
            decoding="async"
            width={180}
            height={180}
            className="max-h-16 sm:max-h-20 w-auto max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200 opacity-75 group-hover:opacity-100"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <span className="font-display font-black text-xl text-[#a8ce38]">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Minimal Brand Name Below Logo */}
      <span className="text-[11px] font-mono tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors mt-2 text-center truncate max-w-full">
        {client.name}
      </span>
    </div>
  );
}

export default function OurClientsPage() {
  const { clients } = useClientsRoster(CLIENTS_LIST);

  return (
    <div
      className="text-neutral-300 font-sans min-h-screen relative selection:bg-[#a8ce38] selection:text-black"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(168, 206, 56, 0.06) 0%, transparent 40%), #050508'
      }}
    >
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-32 pb-4 px-6 max-w-7xl mx-auto relative z-20">
        <ol className="flex items-center flex-wrap gap-2 text-xs font-mono text-neutral-500">
          <li>
            <button
              onClick={() => navigateTo('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li>
            <button
              onClick={() => navigateTo('/portfolio')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Our Work
            </button>
          </li>
          <li className="text-neutral-600">/</li>
          <li className="text-[#a8ce38] font-semibold">
            Our Clients
          </li>
        </ol>
      </nav>

      {/* Clean Header */}
      <header className="pt-6 pb-12 px-6 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a8ce38]" />
          <span>// TRUSTED BY GLOBAL BRANDS</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4">
          Our Clients
        </h1>

        <p className="text-neutral-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Proudly partnering with forward-thinking enterprises, startups, and international brands.
        </p>
      </header>

      {/* Pure Client Logo Showcase Grid */}
      <main className="pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {CLIENTS_LIST.map((client) => (
            <LogoCard key={client.id} client={client} />
          ))}
        </div>

        {/* Minimal Bottom CTA */}
        <div className="mt-20 text-center border-t border-white/5 pt-12">
          <p className="text-neutral-400 text-sm mb-5 font-light">
            Want to build your next breakthrough with HariKrushn DigiVerse?
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="px-7 py-3 rounded-xl bg-[#a8ce38] hover:bg-[#b8de48] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,206,56,0.25)] hover:scale-102 cursor-pointer"
          >
            Start a Project →
          </button>
        </div>
      </main>
    </div>
  );
}
