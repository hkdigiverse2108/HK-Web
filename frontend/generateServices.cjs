const fs = require('fs');
const path = require('path');

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

const toPascalCase = (str) => {
  return str.split(/[\s-/]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
};

const getTemplate = (title, color) => `import React from 'react';
import { motion } from 'framer-motion';

export default function ${toPascalCase(title)}Page() {
  const data = {
    title: "${title}",
    subtitle: "Enterprise-grade ${title} solutions designed for scale and performance.",
    heroImage: "/media/images/gallery/digiverse_workspace.png",
    overview: "Our ${title} services are tailored to meet the unique demands of modern businesses. We leverage cutting-edge technology and proven methodologies to deliver robust, secure, and scalable solutions that drive measurable growth.",
    features: [
      {
        title: "Strategic Planning",
        desc: "We analyze your business objectives to craft a precise execution strategy."
      },
      {
        title: "Advanced Technology",
        desc: "Utilizing the latest frameworks and tools to ensure future-proof solutions."
      },
      {
        title: "Scalable Architecture",
        desc: "Designed to grow seamlessly with your business without compromising performance."
      },
      {
        title: "Expert Integration",
        desc: "Smoothly integrating with your existing enterprise systems and workflows."
      }
    ],
    benefits: [
      "Accelerated Time-to-Market",
      "Enhanced Security & Compliance",
      "Optimized Operational Efficiency",
      "Data-Driven Insights",
      "Seamless User Experience",
      "24/7 Dedicated Support"
    ],
    color: "${color}"
  };

  return (
    <div className="bg-[#050508] text-neutral-300 font-sans min-h-screen relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className={\`absolute top-0 right-0 w-[500px] h-[500px] bg-\${data.color}/10 rounded-full filter blur-[120px] pointer-events-none\`} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto relative z-10 border-b border-white/5">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={\`font-mono text-xs uppercase tracking-[0.3em] text-\${data.color} font-semibold block mb-4\`}>
                // Service Detail
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {data.title}
              </h1>
              <p className="font-light text-neutral-400 text-lg sm:text-xl leading-relaxed mb-8">
                {data.subtitle}
              </p>
              <a href="#contact" className={\`inline-flex px-8 py-3 bg-\${data.color} hover:bg-\${data.color}/80 text-white font-medium rounded-lg transition-colors shadow-lg shadow-\${data.color}/20\`}>
                Discuss Your Project
              </a>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">Overview</h2>
        <p className="font-light text-neutral-400 text-lg leading-relaxed">
          {data.overview}
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-black/40 border-y border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-neutral-500 font-light max-w-2xl mx-auto">Discover the foundational elements that drive our {data.title.toLowerCase()} methodology.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0e0e13]/50 border border-white/10 rounded-2xl p-8 hover:bg-[#15151a] transition-colors"
              >
                <div className={\`w-12 h-12 rounded-xl bg-\${data.color}/10 border border-\${data.color}/20 flex items-center justify-center text-\${data.color} mb-6\`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">Why Choose Us?</h2>
            <p className="text-neutral-400 font-light leading-relaxed mb-8">
              Partnering with us means you gain access to a dedicated team of experts committed to pushing the boundaries of {data.title.toLowerCase()}.
            </p>
            <ul className="space-y-4">
              {data.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-4 text-neutral-300">
                  <div className={\`w-6 h-6 rounded-full bg-\${data.color}/10 flex items-center justify-center flex-shrink-0 text-\${data.color}\`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-light">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 p-4 bg-[#101010]/50 backdrop-blur-sm">
               <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-800 to-black overflow-hidden relative">
                 <img src="/media/images/gallery/cinematic_review.png" alt="Benefits" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display text-5xl font-bold text-white mb-2">100%</div>
                      <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">Client Satisfaction</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Ready to elevate your business?</h2>
          <p className="text-neutral-400 font-light text-lg mb-10 max-w-2xl mx-auto">
            Let's discuss how our {data.title} expertise can help you achieve your strategic goals and outpace the competition.
          </p>
          <a href="#contact" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black hover:bg-neutral-200 font-bold rounded-lg transition-colors shadow-xl">
            Start Your Project Today
          </a>
        </div>
      </section>

    </div>
  );
}`;

const colors = ["blue-500", "pink-500", "purple-500", "rose-500", "emerald-500", "amber-500"];

const allPages = [];
SERVICES_DATA.forEach((category, i) => {
  const color = colors[i];
  allPages.push({
    title: category.title,
    url: category.url,
    componentName: toPascalCase(category.title) + "Page",
    filename: toPascalCase(category.title) + "Page.jsx",
    color: color
  });

  category.services.forEach(service => {
    allPages.push({
      title: service.name,
      url: service.url,
      componentName: toPascalCase(service.name) + "Page",
      filename: toPascalCase(service.name) + "Page.jsx",
      color: color
    });
  });
});

const pagesDir = path.join('d:', 'HK WEBSITE', 'frontend', 'src', 'pages');

allPages.forEach(page => {
  const filepath = path.join(pagesDir, page.filename);
  fs.writeFileSync(filepath, getTemplate(page.title, page.color));
});

console.log("Created " + allPages.length + " files.");

// Now update App.jsx
const appPath = path.join('d:', 'HK WEBSITE', 'frontend', 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Remove DynamicServicePage import and usage since we are deleting it
appContent = appContent.replace("import DynamicServicePage from './pages/DynamicServicePage';\n", '');
appContent = appContent.replace(/\s*if \(baseRoute\.startsWith\('\/services\/'\)\) \{\s*return \<DynamicServicePage route=\{baseRoute\} \/>;\s*\}/, '');

let importStatements = allPages.map(page => `import ${page.componentName} from './pages/${page.filename.replace('.jsx', '')}';`).join('\n');
let switchCases = allPages.map(page => `      case '${page.url}':\n      case '#${page.url.replace('/services/', 'service-')}':\n        return <${page.componentName} />;`).join('\n');

// Find the line where to inject imports
appContent = appContent.replace(/import HomeSections from '\.\/sections\/HomeSections';/, importStatements + "\n\nimport HomeSections from './sections/HomeSections';");

// Find where to inject switch cases
// Before default: return null;
appContent = appContent.replace(/(\s*)default:\n\s*return null;/, '\n' + switchCases + "$1default:\n        return null;");

fs.writeFileSync(appPath, appContent);

// Remove the old dynamic page
if(fs.existsSync(path.join(pagesDir, 'DynamicServicePage.jsx'))) {
    fs.unlinkSync(path.join(pagesDir, 'DynamicServicePage.jsx'));
}

console.log("App.jsx updated.");
