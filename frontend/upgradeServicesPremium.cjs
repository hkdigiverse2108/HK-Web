const fs = require('fs');
const path = require('path');

const pagesDir = path.join('d:', 'HK WEBSITE', 'frontend', 'src', 'pages');

const SERVICES_DATA = [
  {
    title: 'Software Development',
    url: '/services/software-development',
    services: [
      { name: 'Web Development', url: '/services/web-development' },
      { name: 'Web Application Development', url: '/services/web-application-development' },
      { name: 'Mobile App Development', url: '/services/mobile-app-development' },
      { name: 'Custom Software Development', url: '/services/custom-software-development' },
      { name: 'SaaS Development', url: '/services/saas-development' },
      { name: 'ERP Development', url: '/services/erp-development' },
      { name: 'CRM Development', url: '/services/crm-development' },
      { name: 'API Development', url: '/services/api-development' },
      { name: 'Ecommerce Web Development Service', url: '/services/ecommerce-web-development' },
    ]
  },
  {
    title: 'Digital Marketing',
    url: '/services/digital-marketing',
    services: [
      { name: 'SEO', url: '/services/seo' },
      { name: 'Local SEO', url: '/services/local-seo' },
      { name: 'Technical SEO', url: '/services/technical-seo' },
      { name: 'AI SEO', url: '/services/ai-seo' },
      { name: 'Generative Engine Optimization (GEO)', url: '/services/generative-engine-optimization' },
      { name: 'Google Ads / PPC', url: '/services/google-ads-ppc' },
      { name: 'Meta Ads', url: '/services/meta-ads' },
      { name: 'Social Media Marketing', url: '/services/social-media-marketing' },
      { name: 'Content Marketing', url: '/services/content-marketing' },
      { name: 'Lead Generation', url: '/services/lead-generation' },
      { name: 'Marketing Automation', url: '/services/marketing-automation' },
    ]
  },
  {
    title: 'AI & Automation',
    url: '/services/ai-automation',
    services: [
      { name: 'AI Consulting', url: '/services/ai-consulting' },
      { name: 'AI Strategy', url: '/services/ai-strategy' },
      { name: 'Generative AI Solutions', url: '/services/generative-ai-solutions' },
      { name: 'AI Integration', url: '/services/ai-integration' },
      { name: 'AI Agent Development', url: '/services/ai-agent-development' },
      { name: 'LLM Development', url: '/services/llm-development' },
      { name: 'AI Chatbot Development', url: '/services/ai-chatbot-development' },
      { name: 'Business Automation', url: '/services/business-automation' },
    ]
  },
  {
    title: 'Design & Branding',
    url: '/services/designing',
    services: [
      { name: 'Branding', url: '/services/branding' },
      { name: 'Logo Design', url: '/services/logo-design' },
      { name: 'Graphic Design', url: '/services/graphic-design' },
      { name: 'UI/UX Design', url: '/services/ui-ux-design' },
      { name: 'Product Design', url: '/services/product-design' },
      { name: 'Website Design', url: '/services/website-design' },
    ]
  },
  {
    title: 'Consulting',
    url: '/services/consulting',
    services: [
      { name: 'IT Consulting', url: '/services/it-consulting' },
      { name: 'Software Consulting', url: '/services/software-consulting' },
      { name: 'Technology Consulting', url: '/services/technology-consulting' },
      { name: 'Digital Transformation Consulting', url: '/services/digital-transformation-consulting' },
    ]
  },
  {
    title: 'Startup Solutions',
    url: '/services/startup-solutions',
    services: [
      { name: 'Startup Consulting', url: '/services/startup-consulting' },
      { name: 'MVP Development', url: '/services/mvp-development' },
      { name: 'Startup Branding', url: '/services/startup-branding' },
      { name: 'Product Strategy', url: '/services/product-strategy' },
      { name: 'Startup Technology Solutions', url: '/services/startup-technology-solutions' },
      { name: 'Startup Digital Growth', url: '/services/startup-digital-growth' },
    ]
  }
];

const categorySubServices = {};
const siblingServices = {}; // maps sub-service name to its siblings

SERVICES_DATA.forEach(cat => {
    categorySubServices[cat.title] = cat.services;
    cat.services.forEach(sub => {
        // Find siblings (all services in the same category excluding itself, or just show all of them)
        const siblings = cat.services.filter(s => s.name !== sub.name).slice(0, 6); // limit to 6 for clean UI
        siblingServices[sub.name] = siblings;
    });
});

const toPascalCase = (str) => {
  return str.split(/[\s-/]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('').replace(/&/g, 'And');
};

const getPremiumTemplate = (title, color, isCategory) => {
    
  let subServicesBlock = "";
  
  const subs = isCategory ? categorySubServices[title] : siblingServices[title];
  const sectionTitle = isCategory ? "Our Core Offerings" : "Related Services";
  const sectionDesc = isCategory 
    ? `Explore the diverse range of specialized solutions under our ${title} division.`
    : `Discover other specialized services that complement our ${title} expertise.`;
    
  if (subs && subs.length > 0) {
      const subJson = JSON.stringify(subs, null, 8);
      subServicesBlock = `
      {/* Sub-Services Explorer */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-[#030305]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className={\`font-mono text-xs uppercase tracking-widest text-\${data.color} mb-3 block\`}>// Explore More</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">${sectionTitle}</h2>
            <p className="text-neutral-400 font-light text-lg max-w-2xl mx-auto">${sectionDesc}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {${subJson}.map((sub, idx) => (
              <motion.a 
                key={idx} 
                href={sub.url} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative block overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className={\`absolute inset-0 bg-gradient-to-br from-\${data.color}/20 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500\`} />
                <div className="p-8">
                  <div className="flex justify-between items-start mb-12">
                    <div className={\`w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-\${data.color} group-hover:scale-110 transition-transform duration-500\`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div className={\`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-\${data.color} group-hover:text-white group-hover:border-\${data.color} transition-all duration-300 transform group-hover:rotate-45\`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-500 transition-all">{sub.name}</h3>
                  <div className={\`h-1 w-12 bg-\${data.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500\`} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      `;
  }

  return `import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ${toPascalCase(title)}Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const data = {
    title: "${title}",
    subtitle: "Next-Generation ${title} Solutions",
    description: "We architect scalable, high-performance digital ecosystems. Our specialized engineering and strategic execution empower visionary brands to dominate their markets.",
    heroImage: "/media/images/gallery/digiverse_workspace.png",
    color: "${color}",
    stats: [
      { value: "150+", label: "Projects Delivered" },
      { value: "99%", label: "Client Retention" },
      { value: "24/7", label: "Expert Support" }
    ],
    features: [
      { title: "Strategic Architecture", desc: "We design robust, future-proof blueprints tailored to your exact business objectives." },
      { title: "Rapid Execution", desc: "Agile methodologies ensure lightning-fast time-to-market without compromising quality." },
      { title: "Seamless Integration", desc: "Flawless synchronization with your existing tools, platforms, and enterprise systems." },
      { title: "Data-Driven Scaling", desc: "Continuous optimization leveraging real-time analytics and performance metrics." }
    ]
  };

  return (
    <div ref={containerRef} className="bg-[#050507] text-neutral-300 font-sans min-h-screen relative overflow-hidden">
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-50" />
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-gradient-to-b from-\${data.color}/20 to-transparent rounded-full filter blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-[40%] left-0 w-[60vw] h-[60vw] bg-gradient-to-tr from-indigo-900/10 to-transparent rounded-full filter blur-[120px] pointer-events-none -translate-x-1/2" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 max-w-7xl mx-auto relative z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 relative">
            <motion.div style={{ y: y1, opacity: opacity1 }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                <span className={\`w-2 h-2 rounded-full bg-\${data.color} animate-pulse\`} />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">Premium Tech Partner</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
                {data.title.split(' ').map((word, i) => (
                  <span key={i} className="block overflow-hidden pb-2">
                    <motion.span 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={\`inline-block \${i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500' : ''}\`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-light text-neutral-400 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-10 max-w-2xl"
              >
                {data.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-6"
              >
                <a href="#contact" className={\`relative overflow-hidden group inline-flex items-center justify-center px-10 py-4 bg-\${data.color} text-white font-bold rounded-full transition-transform hover:scale-105\`}>
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Project
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-black/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent mix-blend-multiply" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="relative z-20 -mt-10 mb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="pt-6 md:pt-0">
                <div className="font-display text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className={\`font-mono text-sm uppercase tracking-widest text-\${data.color}\`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Premium Features Parallax */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Our Methodology</h2>
          <p className="text-neutral-400 font-light text-xl max-w-2xl mx-auto">Precision engineering meets creative excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {data.features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-10 lg:p-12 rounded-[2.5rem] bg-[#0c0c10] border border-white/5 hover:border-white/20 hover:bg-[#121218] transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className={\`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-\${data.color} mb-8 group-hover:scale-110 transition-transform duration-500\`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-neutral-400 font-light text-lg leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      ${subServicesBlock}

      {/* Massive CTA */}
      <section className="py-40 px-6 relative z-10 overflow-hidden">
        <div className={\`absolute inset-0 bg-gradient-to-b from-transparent to-\${data.color}/20 opacity-50 pointer-events-none\`} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 lg:p-24 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
              Ready to Innovate?
            </h2>
            <p className="text-neutral-300 font-light text-xl lg:text-2xl mb-12 max-w-3xl mx-auto">
              Partner with HK DigiVerse to architect the future of your enterprise. Let's build something extraordinary together.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center px-12 py-5 bg-white text-black hover:bg-neutral-200 hover:scale-105 font-bold rounded-full transition-all duration-300 shadow-2xl shadow-white/20 text-lg">
              Start The Conversation
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}`;
};


const colors = ["blue-500", "pink-500", "purple-500", "rose-500", "emerald-500", "amber-500"];

const allPages = [];
SERVICES_DATA.forEach((category, i) => {
  const color = colors[i];
  allPages.push({
    title: category.title,
    isCategory: true,
    color: color
  });

  category.services.forEach(service => {
    allPages.push({
      title: service.name,
      isCategory: false,
      color: color
    });
  });
});

allPages.forEach(page => {
  let componentName = toPascalCase(page.title) + "Page";
  if (componentName === 'GenerativeEngineOptimization(geo)Page') componentName = 'GenerativeEngineOptimizationGeoPage';
  
  const filename = componentName + ".jsx";
  const filepath = path.join(pagesDir, filename);
  
  if (fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, getPremiumTemplate(page.title, page.color, page.isCategory));
      console.log('Upgraded ' + filename);
  }
});
