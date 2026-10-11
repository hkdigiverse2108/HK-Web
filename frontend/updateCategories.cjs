const fs = require('fs');
const path = require('path');

const pagesDir = path.join('d:', 'HK WEBSITE', 'frontend', 'src', 'pages');

const categorySubServices = {
  'SoftwareDevelopmentPage.jsx': [
    { name: 'Web Development', url: '/services/web-development' },
    { name: 'Web Application Development', url: '/services/web-application-development' },
    { name: 'Mobile App Development', url: '/services/mobile-app-development' },
    { name: 'Custom Software Development', url: '/services/custom-software-development' },
    { name: 'SaaS Development', url: '/services/saas-development' },
    { name: 'ERP Development', url: '/services/erp-development' },
    { name: 'CRM Development', url: '/services/crm-development' },
    { name: 'API Development', url: '/services/api-development' },
    { name: 'Ecommerce Web Development Service', url: '/services/ecommerce-web-development' }
  ],
  'DigitalMarketingPage.jsx': [
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
    { name: 'Marketing Automation', url: '/services/marketing-automation' }
  ],
  'AiAndAutomationPage.jsx': [
    { name: 'AI Consulting', url: '/services/ai-consulting' },
    { name: 'AI Strategy', url: '/services/ai-strategy' },
    { name: 'Generative AI Solutions', url: '/services/generative-ai-solutions' },
    { name: 'AI Integration', url: '/services/ai-integration' },
    { name: 'AI Agent Development', url: '/services/ai-agent-development' },
    { name: 'LLM Development', url: '/services/llm-development' },
    { name: 'AI Chatbot Development', url: '/services/ai-chatbot-development' },
    { name: 'Business Automation', url: '/services/business-automation' }
  ],
  'DesignAndBrandingPage.jsx': [
    { name: 'Branding', url: '/services/branding' },
    { name: 'Logo Design', url: '/services/logo-design' },
    { name: 'Graphic Design', url: '/services/graphic-design' },
    { name: 'UI/UX Design', url: '/services/ui-ux-design' },
    { name: 'Product Design', url: '/services/product-design' },
    { name: 'Website Design', url: '/services/website-design' }
  ],
  'ConsultingPage.jsx': [
    { name: 'IT Consulting', url: '/services/it-consulting' },
    { name: 'Software Consulting', url: '/services/software-consulting' },
    { name: 'Technology Consulting', url: '/services/technology-consulting' },
    { name: 'Digital Transformation Consulting', url: '/services/digital-transformation-consulting' }
  ],
  'StartupSolutionsPage.jsx': [
    { name: 'Startup Consulting', url: '/services/startup-consulting' },
    { name: 'MVP Development', url: '/services/mvp-development' },
    { name: 'Startup Branding', url: '/services/startup-branding' },
    { name: 'Product Strategy', url: '/services/product-strategy' },
    { name: 'Startup Technology Solutions', url: '/services/startup-technology-solutions' },
    { name: 'Startup Digital Growth', url: '/services/startup-digital-growth' }
  ]
};

for (const [filename, subServices] of Object.entries(categorySubServices)) {
  const filepath = path.join(pagesDir, filename);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Inject subServices into data object
    const subServicesJson = JSON.stringify(subServices, null, 6);
    if (!content.includes('subServices:')) {
      content = content.replace(/color: ".*?"/, match => match + ",\n    subServices: " + subServicesJson.trim());
    }

    // 2. Inject JSX block before CTA section
    const jsxBlock = `
      {/* Sub-Services Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Explore Specializations</h2>
          <p className="text-neutral-500 font-light max-w-2xl mx-auto">Dive deeper into our specific offerings tailored to your needs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.subServices.map((sub, idx) => (
            <a key={idx} href={sub.url} className="group block bg-[#101010]/50 border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-[#15151a] transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-semibold text-neutral-300 group-hover:text-white transition-colors">{sub.name}</h3>
                <svg className={\`w-5 h-5 text-\${data.color}/60 group-hover:text-\${data.color} transition-all transform group-hover:translate-x-1\`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>
`;

    if (!content.includes('{/* Sub-Services Section */}')) {
      content = content.replace('{/* CTA Section */}', jsxBlock + '\n      {/* CTA Section */}');
    }

    fs.writeFileSync(filepath, content);
    console.log('Updated ' + filename);
  } else {
    console.log('File not found: ' + filename);
  }
}
