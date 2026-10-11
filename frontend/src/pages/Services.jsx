import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { navigateTo } from '../utils/navigation';

const SERVICES_DATA = [
  {
    title: "Software Development",
    desc: "End-to-end software solutions tailored for enterprise scalability and performance. We build robust systems that drive digital transformation.",
    mainUrl: "/services/software-development",
    color: "blue-500",
    image: "/media/images/gallery/digiverse_workspace.png",
    services: [
      { name: "Web Development", url: "/services/web-development" },
      { name: "Web Application Development", url: "/services/web-application-development" },
      { name: "Mobile App Development", url: "/services/mobile-app-development" },
      { name: "Custom Software Development", url: "/services/custom-software-development" },
      { name: "SaaS Development", url: "/services/saas-development" },
      { name: "ERP Development", url: "/services/erp-development" },
      { name: "CRM Development", url: "/services/crm-development" },
      { name: "API Development", url: "/services/api-development" },
      { name: "Ecommerce Web Development Service", url: "/services/ecommerce-web-development" },
    ]
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies designed to maximize ROI. We elevate your brand's digital presence through targeted, intelligent campaigns.",
    mainUrl: "/services/digital-marketing",
    color: "pink-500",
    image: "/media/images/gallery/launch_celebration.png",
    services: [
      { name: "SEO", url: "/services/seo" },
      { name: "Local SEO", url: "/services/local-seo" },
      { name: "Technical SEO", url: "/services/technical-seo" },
      { name: "AI SEO", url: "/services/ai-seo" },
      { name: "Generative Engine Optimization (GEO)", url: "/services/generative-engine-optimization" },
      { name: "Google Ads / PPC", url: "/services/google-ads-ppc" },
      { name: "Meta Ads", url: "/services/meta-ads" },
      { name: "Social Media Marketing", url: "/services/social-media-marketing" },
      { name: "Content Marketing", url: "/services/content-marketing" },
      { name: "Lead Generation", url: "/services/lead-generation" },
      { name: "Marketing Automation", url: "/services/marketing-automation" },
    ]
  },
  {
    title: "AI & Automation",
    desc: "Intelligent automation and AI integrations that streamline operations. Harness the power of machine learning to gain a competitive edge.",
    mainUrl: "/services/ai-automation",
    color: "purple-500",
    image: "/media/images/gallery/ai_orchestrator.png",
    services: [
      { name: "AI Consulting", url: "/services/ai-consulting" },
      { name: "AI Strategy", url: "/services/ai-strategy" },
      { name: "Generative AI Solutions", url: "/services/generative-ai-solutions" },
      { name: "AI Integration", url: "/services/ai-integration" },
      { name: "AI Agent Development", url: "/services/ai-agent-development" },
      { name: "LLM Development", url: "/services/llm-development" },
      { name: "AI Chatbot Development", url: "/services/ai-chatbot-development" },
      { name: "Business Automation", url: "/services/business-automation" },
    ]
  },
  {
    title: "Design & Branding",
    desc: "Creating visually stunning and highly intuitive user experiences. We craft brand identities that resonate and interfaces that engage.",
    mainUrl: "/services/design-and-branding",
    color: "rose-500",
    image: "/media/images/gallery/design_sprint.png",
    services: [
      { name: "Branding", url: "/services/branding" },
      { name: "Logo Design", url: "/services/logo-design" },
      { name: "Graphic Design", url: "/services/graphic-design" },
      { name: "UI/UX Design", url: "/services/ui-ux-design" },
      { name: "Product Design", url: "/services/product-design" },
      { name: "Website Design", url: "/services/website-design" },
    ]
  },
  {
    title: "Consulting",
    desc: "Strategic advisory services to align your technology with business goals. We help you navigate complex digital transformations with confidence.",
    mainUrl: "/services/consulting",
    color: "emerald-500",
    image: "/media/images/quantum_banking.png",
    services: [
      { name: "IT Consulting", url: "/services/it-consulting" },
      { name: "Software Consulting", url: "/services/software-consulting" },
      { name: "Technology Consulting", url: "/services/technology-consulting" },
      { name: "Digital Transformation Consulting", url: "/services/digital-transformation-consulting" },
    ]
  },
  {
    title: "Startup Solutions",
    desc: "Accelerating startup growth with rapid MVP development and scalable tech architectures. We turn visionary ideas into market-ready products.",
    mainUrl: "/services/startup-solutions",
    color: "amber-500",
    image: "/media/images/gallery/cinematic_review.png",
    services: [
      { name: "Startup Consulting", url: "/services/startup-consulting" },
      { name: "MVP Development", url: "/services/mvp-development" },
      { name: "Startup Branding", url: "/services/startup-branding" },
      { name: "Product Strategy", url: "/services/product-strategy" },
      { name: "Startup Technology Solutions", url: "/services/startup-technology-solutions" },
      { name: "Startup Digital Growth", url: "/services/startup-digital-growth" },
    ]
  }
];

const resolveImgUrl = (url) => {
  if (!url) return '';
  return (import.meta.env.DEV && !url.startsWith('http') && window.location.hostname === 'localhost') ? `http://localhost:8008${url}` : url;
};

const ServiceSection = ({ category, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="py-24 border-t border-white/5 relative overflow-hidden group">
      {/* Subtle Background Glow */}
      <div className={`absolute top-1/2 ${isEven ? '-left-1/4' : '-right-1/4'} w-[500px] h-[500px] bg-${category.color}/5 rounded-full filter blur-[120px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100`} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 hover:border-[#a8ce38]/60 hover:shadow-[0_20px_60px_rgba(168,206,56,0.18)] transition-all duration-500 shadow-2xl group/img"
            >
              <img 
                src={resolveImgUrl(category.image)} 
                alt={category.title} 
                className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Category Badge over image */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a8ce38] animate-pulse shadow-[0_0_8px_rgba(168,206,56,0.8)]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/90 drop-shadow-md">
                  {category.title.split(' ')[0]} Hub
                </span>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight group-hover:text-[#a8ce38] transition-colors duration-300">
                {category.title}
              </h2>
              <p className="font-light text-neutral-400 text-base lg:text-lg leading-relaxed mb-10">
                {category.desc}
              </p>

              {/* Services List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {category.services.map((service, sIdx) => (
                  <a 
                    key={sIdx}
                    href={service.url}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(service.url);
                    }}
                    className="group/link flex items-start gap-3 py-1.5 text-neutral-300 hover:text-[#a8ce38] transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-neutral-500 group-hover/link:text-[#a8ce38] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-light text-sm sm:text-base leading-snug">
                      {service.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Action Button */}
              <a 
                href={category.mainUrl} 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(category.mainUrl);
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 hover:bg-[#a8ce38] border border-white/10 hover:border-[#a8ce38] text-white hover:text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(168,206,56,0.35)] group/btn cursor-pointer"
              >
                <span>Explore {category.title}</span>
                <svg className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const { content } = useContent();
  const sv = content?.site_settings?.section_visibility || {};
  if (sv.services_list === false) return null;

  return (
    <div className="relative font-sans min-h-screen bg-[#07070a] overflow-hidden">
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

      {/* Hero Header */}
      <div className="pt-40 pb-20 text-center relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 font-semibold block mb-6">
            // Our Capabilities
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Comprehensive Digital <br className="hidden md:block"/> Engineering & Growth
          </h1>
          <p className="font-light text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            From robust software architectures to targeted digital marketing, we provide end-to-end solutions designed to scale your enterprise and dominate the market.
          </p>
        </motion.div>
      </div>

      {/* Services Sections Container */}
      <div className="pb-32">
        {SERVICES_DATA.map((category, index) => (
          <ServiceSection key={category.title} category={category} index={index} />
        ))}
      </div>
      
    </div>
  );
}
