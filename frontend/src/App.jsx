import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ScrollIndicator from './components/ScrollIndicator';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollProgressBar from './components/ScrollProgressBar';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import Provider
import { ContentProvider } from './context/ContentContext';

// Import Pages
import OurStory from './pages/OurStory';
import OurPeople from './pages/OurPeople';
import OurCulture from './pages/OurCulture';
import AboutUs from './pages/AboutUs';
import Awards from './pages/Awards';
import Blogs from './pages/Blogs';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Industry from './pages/Industry';
import Career from './pages/Career';
import CaseStudy from './pages/CaseStudy';
import Portfolio from './pages/Portfolio';
import Ventures from './pages/Ventures';
import Contact from './pages/Contact';
import Franchise from './pages/Franchise';
import FranchiseEnquiry from './pages/FranchiseEnquiry';
import FranchiseReceived from './pages/FranchiseReceived';
import AdminPanel from './pages/AdminPanel';


// Service Subpages
import ServiceWeb from './pages/ServiceWeb';
import ServiceApp from './pages/ServiceApp';
import ServiceCustomSoftware from './pages/ServiceCustomSoftware';
import ServiceDigitalMarketing from './pages/ServiceDigitalMarketing';
import ServiceSocialMedia from './pages/ServiceSocialMedia';
import ServiceAiConsulting from './pages/ServiceAiConsulting';
import ServiceItConsulting from './pages/ServiceItConsulting';

import SoftwareDevelopmentPage from './pages/SoftwareDevelopmentPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import WebApplicationDevelopmentPage from './pages/WebApplicationDevelopmentPage';
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage';
import CustomSoftwareDevelopmentPage from './pages/CustomSoftwareDevelopmentPage';
import SaasDevelopmentPage from './pages/SaasDevelopmentPage';
import ErpDevelopmentPage from './pages/ErpDevelopmentPage';
import CrmDevelopmentPage from './pages/CrmDevelopmentPage';
import ApiDevelopmentPage from './pages/ApiDevelopmentPage';
import EcommerceWebDevelopmentServicePage from './pages/EcommerceWebDevelopmentServicePage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import SeoPage from './pages/SeoPage';
import LocalSeoPage from './pages/LocalSeoPage';
import TechnicalSeoPage from './pages/TechnicalSeoPage';
import AiSeoPage from './pages/AiSeoPage';
import GenerativeEngineOptimizationGeoPage from './pages/GenerativeEngineOptimizationGeoPage';
import GoogleAdsPpcPage from './pages/GoogleAdsPpcPage';
import MetaAdsPage from './pages/MetaAdsPage';
import SocialMediaMarketingPage from './pages/SocialMediaMarketingPage';
import ContentMarketingPage from './pages/ContentMarketingPage';
import LeadGenerationPage from './pages/LeadGenerationPage';
import MarketingAutomationPage from './pages/MarketingAutomationPage';
import AiAndAutomationPage from './pages/AiAndAutomationPage';
import AiConsultingPage from './pages/AiConsultingPage';
import AiStrategyPage from './pages/AiStrategyPage';
import GenerativeAiSolutionsPage from './pages/GenerativeAiSolutionsPage';
import AiIntegrationPage from './pages/AiIntegrationPage';
import AiAgentDevelopmentPage from './pages/AiAgentDevelopmentPage';
import LlmDevelopmentPage from './pages/LlmDevelopmentPage';
import AiChatbotDevelopmentPage from './pages/AiChatbotDevelopmentPage';
import BusinessAutomationPage from './pages/BusinessAutomationPage';
import DesignAndBrandingPage from './pages/DesignAndBrandingPage';
import BrandingPage from './pages/BrandingPage';
import LogoDesignPage from './pages/LogoDesignPage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import UiUxDesignPage from './pages/UiUxDesignPage';
import ProductDesignPage from './pages/ProductDesignPage';
import WebsiteDesignPage from './pages/WebsiteDesignPage';
import ConsultingPage from './pages/ConsultingPage';
import ItConsultingPage from './pages/ItConsultingPage';
import SoftwareConsultingPage from './pages/SoftwareConsultingPage';
import TechnologyConsultingPage from './pages/TechnologyConsultingPage';
import DigitalTransformationConsultingPage from './pages/DigitalTransformationConsultingPage';
import StartupSolutionsPage from './pages/StartupSolutionsPage';
import StartupConsultingPage from './pages/StartupConsultingPage';
import MvpDevelopmentPage from './pages/MvpDevelopmentPage';
import StartupBrandingPage from './pages/StartupBrandingPage';
import ProductStrategyPage from './pages/ProductStrategyPage';
import StartupTechnologySolutionsPage from './pages/StartupTechnologySolutionsPage';
import StartupDigitalGrowthPage from './pages/StartupDigitalGrowthPage';

// Portfolio 6 Core Services Subpages
import PortfolioSoftwareDevelopmentPage from './pages/PortfolioSoftwareDevelopmentPage';
import PortfolioDigitalMarketingPage from './pages/PortfolioDigitalMarketingPage';
import PortfolioAiAutomationPage from './pages/PortfolioAiAutomationPage';
import PortfolioDesignBrandingPage from './pages/PortfolioDesignBrandingPage';
import PortfolioConsultingPage from './pages/PortfolioConsultingPage';
import PortfolioStartupSolutionsPage from './pages/PortfolioStartupSolutionsPage';

// Portfolio & Success Stories Subpages
import PortfolioDigitalTransformationPage from './pages/PortfolioDigitalTransformationPage';
import PortfolioAiWorkPage from './pages/PortfolioAiWorkPage';
import PortfolioIndustrialEcommercePage from './pages/PortfolioIndustrialEcommercePage';
import PortfolioInternationalWorkPage from './pages/PortfolioInternationalWorkPage';
import PortfolioEcommerceWorkPage from './pages/PortfolioEcommerceWorkPage';
import PortfolioIotWorkPage from './pages/PortfolioIotWorkPage';
import PortfolioSupplyChainPage from './pages/PortfolioSupplyChainPage';
import PortfolioSocialCommunitiesPage from './pages/PortfolioSocialCommunitiesPage';
import PortfolioMobileSolutionsPage from './pages/PortfolioMobileSolutionsPage';
import PortfolioDevopsCloudPage from './pages/PortfolioDevopsCloudPage';
import PortfolioAutomobilePage from './pages/PortfolioAutomobilePage';
import PortfolioDigitalPage from './pages/PortfolioDigitalPage';
import PortfolioApparelEcommercePage from './pages/PortfolioApparelEcommercePage';
import PortfolioFmcgEcommercePage from './pages/PortfolioFmcgEcommercePage';
import PortfolioUxUiWorkPage from './pages/PortfolioUxUiWorkPage';
import PortfolioHealthcarePage from './pages/PortfolioHealthcarePage';
import PortfolioMediaEntertainmentPage from './pages/PortfolioMediaEntertainmentPage';
import OurClientsPage from './pages/OurClients';
import { findCaseStudy } from './data/caseStudiesData';

import HomeSections from './sections/HomeSections';

// Live Iframe Preview Container Component
function PreviewContainer({ currentHash }) {
  const [previewContent, setPreviewContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const previewContentRef = React.useRef(previewContent);

  const handlePreloadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const scrollToActiveTab = useCallback((tab) => {
    if (tab === 'hero' || tab === 'navbar') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'footer') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      const targetId = tab === 'stats' ? 'stats-section' : tab === 'services' ? 'services-section' : tab === 'brands' ? 'brands-section' : tab === 'caseStudy' ? 'case-study-section' : tab === 'testimonials' ? 'testimonials-section' : tab === 'bottomCta' ? 'bottom-cta-section' : null;
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  }, []);

  useEffect(() => {
    previewContentRef.current = previewContent;
  }, [previewContent]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'UPDATE_CMS_PREVIEW') {
        const nextContent = event.data.content;
        setPreviewContent(nextContent);
        if (event.data.activeTab) {
          scrollToActiveTab(event.data.activeTab);
        }
      } else if (event.data && event.data.type === 'CMS_SCROLL_TO') {
        scrollToActiveTab(event.data.section);
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: If parent doesn't send content within 1.5s, fetch it directly
    const fallbackTimeout = setTimeout(async () => {
      if (!previewContentRef.current) {
        try {
          const res = await fetch('/api/content/draft');
          if (res.ok) {
            const data = await res.json();
            setPreviewContent(data);
          }
        } catch (e) {
          console.error("Failed to fetch fallback preview content", e);
        }
      }
    }, 1500);

    if (window.parent) {
      window.parent.postMessage({ type: 'CMS_PREVIEW_READY' }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, [scrollToActiveTab]);

  if (!previewContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-neutral-400 font-mono text-xs select-none">
        <span className="animate-pulse">// CONNECTING TO BUILDER CANVAS...</span>
      </div>
    );
  }

  // Determine what page to render inside the preview container with normalization
  const rawSubpage = currentHash.replace('#preview', '').trim();
  const subpage = rawSubpage.startsWith('/') ? rawSubpage : '/' + rawSubpage;

  const renderPreviewPage = () => {
    if (subpage.startsWith('/case-study/') || subpage.startsWith('/case-studies/')) {
      const slug = subpage.replace(/^\/(?:case-study|case-studies)\//, '').split('?')[0];
      return <CaseStudy dynamicSlug={slug} />;
    }

    switch (subpage) {
      case '':
      case '/':
      case '/home':
        return (
          <>
            <HeroSection isLoaded={isLoaded} overrideContent={previewContent} />
            <HomeSections overrideContent={previewContent} />
          </>
        );
      case '/our-story':
        return <OurStory />;
      case '/our-people':
        return <OurPeople overrideContent={previewContent} />;
      case '/our-culture':
        return <OurCulture />;
      case '/about-us':
        return <AboutUs />;
      case '/awards-achievements':
        return <Awards />;
      case '/blog':
      case '#blog':
      case '/blogs':
      case '#blogs':
        return <Blogs />;
      case '/our-gallery':
        return <Gallery />;
      case '/services':
        return <Services />;
      case '/industry':
        return <Industry />;
      case '/career':
        return <Career />;
      case '/case-study':
      case '/case-studies':
        return <CaseStudy />;
      case '/portfolio/software-development':
      case '#portfolio/software-development':
        return <PortfolioSoftwareDevelopmentPage />;
      case '/portfolio/digital-marketing':
      case '#portfolio/digital-marketing':
        return <PortfolioDigitalMarketingPage />;
      case '/portfolio/ai-automation':
      case '#portfolio/ai-automation':
        return <PortfolioAiAutomationPage />;
      case '/portfolio/design-and-branding':
      case '#portfolio/design-and-branding':
        return <PortfolioDesignBrandingPage />;
      case '/portfolio/consulting':
      case '#portfolio/consulting':
        return <PortfolioConsultingPage />;
      case '/portfolio/startup-solutions':
      case '#portfolio/startup-solutions':
        return <PortfolioStartupSolutionsPage />;
      case '/portfolio/digital-transformation':
      case '#portfolio/digital-transformation':
        return <PortfolioDigitalTransformationPage />;
      case '/portfolio/ai-work':
      case '#portfolio/ai-work':
        return <PortfolioAiWorkPage />;
      case '/portfolio/industrial-ecommerce-solutions':
      case '#portfolio/industrial-ecommerce-solutions':
        return <PortfolioIndustrialEcommercePage />;
      case '/portfolio/international-work':
      case '#portfolio/international-work':
        return <PortfolioInternationalWorkPage />;
      case '/portfolio/ecommerce-work':
      case '#portfolio/ecommerce-work':
        return <PortfolioEcommerceWorkPage />;
      case '/portfolio/iot-work':
      case '#portfolio/iot-work':
        return <PortfolioIotWorkPage />;
      case '/portfolio/supply-chain-management':
      case '#portfolio/supply-chain-management':
        return <PortfolioSupplyChainPage />;
      case '/portfolio/social-communities':
      case '#portfolio/social-communities':
        return <PortfolioSocialCommunitiesPage />;
      case '/portfolio/mobile-solutions':
      case '#portfolio/mobile-solutions':
        return <PortfolioMobileSolutionsPage />;
      case '/portfolio/devops-cloud-security':
      case '#portfolio/devops-cloud-security':
        return <PortfolioDevopsCloudPage />;
      case '/portfolio/automobile-solutions':
      case '#portfolio/automobile-solutions':
        return <PortfolioAutomobilePage />;
      case '/portfolio/digital':
      case '#portfolio/digital':
        return <PortfolioDigitalPage />;
      case '/portfolio/apparel-ecommerce':
      case '#portfolio/apparel-ecommerce':
        return <PortfolioApparelEcommercePage />;
      case '/portfolio/fmcg-ecommerce':
      case '#portfolio/fmcg-ecommerce':
        return <PortfolioFmcgEcommercePage />;
      case '/portfolio/ux-ui-work':
      case '#portfolio/ux-ui-work':
        return <PortfolioUxUiWorkPage />;
      case '/portfolio/healthcare-solutions':
      case '#portfolio/healthcare-solutions':
        return <PortfolioHealthcarePage />;
      case '/portfolio/media-entertainment-solutions':
      case '#portfolio/media-entertainment-solutions':
        return <PortfolioMediaEntertainmentPage />;
      case '/our-clients':
      case '#our-clients':
      case '/clients':
      case '#clients':
        return <OurClientsPage />;
      case '/portfolio':
        return <Portfolio />;
      case '/ventures':
        return <Ventures />;
      case '/contact':
        return <Contact />;
      case '/franchise':
      case '/franchise.html':
        return <Franchise />;
      case '/franchise-enquiry':
      case '/franchise-enquiry.html':
        return <FranchiseEnquiry />;
      case '/franchise-received':
      case '/franchise-received.html':
      case '/1.html':
        return <FranchiseReceived />;
      case '/service-web':
        return <ServiceWeb overrideContent={previewContent} />;
      case '/service-app':
        return <ServiceApp overrideContent={previewContent} />;
      case '/service-custom-software':
        return <ServiceCustomSoftware overrideContent={previewContent} />;
      case '/service-digital-marketing':
        return <ServiceDigitalMarketing overrideContent={previewContent} />;
      case '/service-social-media-management':
        return <ServiceSocialMedia overrideContent={previewContent} />;
      case '/service-ai-consulting':
        return <ServiceAiConsulting overrideContent={previewContent} />;
      case '/service-it-consulting':
        return <ServiceItConsulting overrideContent={previewContent} />;
      default:
        return (
          <>
            <HeroSection isLoaded={isLoaded} overrideContent={previewContent} />
            <HomeSections overrideContent={previewContent} />
          </>
        );
    }
  };

  const isNavbarOnly = subpage === '/navbar';
  const isFooterOnly = subpage === '/footer';

  if (isNavbarOnly) {
    return (
      <div className="bg-black min-h-screen w-full relative flex flex-col items-center justify-center pt-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <Navbar overrideContent={previewContent} />
        <div className="mt-40 text-center max-w-md px-6 z-10 select-none">
          <p className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest">// NAVBAR ISOLATION CANVAS</p>
          <p className="text-[11px] text-neutral-400 font-sans mt-2">
            This mode isolates the header layout. Test hovering, logo, and page links. Any font size or color settings modified in the CMS editor will propagate directly here.
          </p>
        </div>
      </div>
    );
  }

  if (isFooterOnly) {
    return (
      <div className="bg-black min-h-screen w-full relative flex flex-col justify-end">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="flex-1 flex items-center justify-center select-none z-10 p-6 text-center">
          <div className="max-w-md">
            <p className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest">// FOOTER ISOLATION CANVAS</p>
            <p className="text-[11px] text-neutral-400 font-sans mt-2">
              This mode isolates the footer layout. Any changes made to addresses, contact details, social links, and copyright text in the CMS editor will render below in real time.
            </p>
          </div>
        </div>
        <Footer overrideContent={previewContent} />
      </div>
    );
  }

  const isFranchisePreview = subpage === '/franchise' || subpage === '/franchise.html' || subpage === '/franchise-enquiry' || subpage === '/franchise-enquiry.html' || subpage === '/franchise-received' || subpage === '/franchise-received.html' || subpage === '/1.html';
  if (isFranchisePreview) {
    return (
      <div className="w-full h-screen overflow-hidden">
        {renderPreviewPage()}
      </div>
    );
  }

  const isHomePreview = subpage === '' || subpage === '/' || subpage === '/home';

  return (
    <>
      {!isLoaded && <Preloader onComplete={handlePreloadComplete} />}
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar overrideContent={previewContent} />
        {isHomePreview ? (
          renderPreviewPage()
        ) : (
          <main className="pt-36 sm:pt-40 lg:pt-44 xl:pt-48 pb-24 w-full mx-auto min-h-screen relative z-10">
            {renderPreviewPage()}
          </main>
        )}
        <Footer overrideContent={previewContent} />
      </div>
    </>
  );
}

const PAGE_TITLES = {
  '/': 'HK DigiVerse LLP – 360° Tech & Digital Partner for Startups',
  '/our-story': 'Our Story | HariKrushn DigiVerse LLP',
  '/our-people': 'Our People | HariKrushn DigiVerse LLP',
  '/our-culture': 'Our Culture | HariKrushn DigiVerse LLP',
  '/about-us': 'About Us | HariKrushn DigiVerse LLP',
  '/awards-achievements': 'Awards & Achievements | HariKrushn DigiVerse LLP',
  '/blogs': 'Software Technology & Business Blogs | HariKrushn DigiVerse',
  '/blog': 'Software Technology & Business Blogs | HariKrushn DigiVerse',
  '/our-gallery': 'Our Gallery | HariKrushn DigiVerse LLP',
  '/services': 'Services | HariKrushn DigiVerse LLP',
  '/industry': 'Industries We Serve | HariKrushn DigiVerse LLP',
  '/career': 'Careers | HariKrushn DigiVerse LLP',
  '/case-study': 'Case Studies | HariKrushn DigiVerse LLP',
  '/case-studies/hipaa-compliant-healthcare-platform-security': 'HIPAA-Aligned Healthcare Data Security Case Study | HariKrushn DigiVerse LLP',
  '/case-study/hipaa-compliant-healthcare-platform-security': 'HIPAA-Aligned Healthcare Data Security Case Study | HariKrushn DigiVerse LLP',
  '/case-study/hipaa-healthcare': 'HIPAA-Aligned Healthcare Data Security Case Study | HariKrushn DigiVerse LLP',
  '/portfolio': 'Portfolio & Featured Projects | HariKrushn DigiVerse LLP',
  '/ventures': 'Ventures | HariKrushn DigiVerse LLP',
  '/contact': 'Contact Us | HariKrushn DigiVerse LLP',
  '/franchise': 'HK DigiVerse LLP — Franchise Opportunity',
  '/franchise.html': 'HK DigiVerse LLP — Franchise Opportunity',
  '/franchise-enquiry': 'Franchise Enquiry — HK DigiVerse LLP',
  '/franchise-enquiry.html': 'Franchise Enquiry — HK DigiVerse LLP',
  '/service-web': 'Web Development Services | HariKrushn DigiVerse LLP',
  '/service-app': 'Mobile App Development | HariKrushn DigiVerse LLP',
  '/service-custom-software': 'Custom Software & SaaS Development | HariKrushn DigiVerse LLP',
  '/service-digital-marketing': 'Digital Marketing & SEO Services | HariKrushn DigiVerse LLP',
  '/service-social-media-management': 'Social Media & Brand Management | HariKrushn DigiVerse LLP',
  '/service-ai-consulting': 'AI Consulting & Integration | HariKrushn DigiVerse LLP',
  '/service-it-consulting': 'IT & Cloud Consulting | HariKrushn DigiVerse LLP',
  '/admin': 'Admin Panel | HariKrushn DigiVerse LLP',
  // Software Development
  '/services/software-development': 'Custom Software Development Services | HK DigiVerse LLP',
  '/services/web-development': 'Web Development Company | Custom Web Apps - HK DigiVerse LLP',
  '/services/web-application-development': 'Web Application Development Company | Scalable Web Apps - HK DigiVerse LLP',
  '/services/mobile-app-development': 'Mobile App Development Services | iOS & Android Apps - HK DigiVerse LLP',
  '/services/custom-software-development': 'Custom Enterprise Software Development | HK DigiVerse LLP',
  '/services/saas-development': 'SaaS Application Development Company | Scalable Multi-Tenant - HK DigiVerse LLP',
  '/services/erp-development': 'Custom ERP Software Development Services | HK DigiVerse LLP',
  '/services/crm-development': 'Custom CRM Development Solutions | Pipeline Automation - HK DigiVerse LLP',
  '/services/api-development': 'REST & GraphQL API Development Services | HK DigiVerse LLP',
  '/services/ecommerce-web-development': 'E-Commerce Website Development Company | Shopify & Custom - HK DigiVerse LLP',
  // Digital Marketing
  '/services/digital-marketing': 'Digital Marketing Agency & Growth Strategy | HK DigiVerse LLP',
  '/services/seo': 'SEO Services Company | Search Engine Optimization - HK DigiVerse LLP',
  '/services/local-seo': 'Local SEO Services | Google Business Profile & Maps - HK DigiVerse LLP',
  '/services/technical-seo': 'Technical SEO Agency | Core Web Vitals & Crawl Audits - HK DigiVerse LLP',
  '/services/ai-seo': 'AI SEO Services | Next-Gen AI-Driven Search Strategy - HK DigiVerse LLP',
  '/services/generative-engine-optimization': 'Generative Engine Optimization (GEO) | AI Search Citations - HK DigiVerse LLP',
  '/services/google-ads-ppc': 'Google Ads & PPC Management Agency | High-ROI Ads - HK DigiVerse LLP',
  '/services/meta-ads': 'Meta Ads Agency | High-Converting Facebook & Instagram Ads - HK DigiVerse LLP',
  '/services/social-media-marketing': 'Social Media Marketing Agency | Organic & Paid Reach - HK DigiVerse LLP',
  '/services/content-marketing': 'Content Marketing Services | E-E-A-T Authority & Clusters - HK DigiVerse LLP',
  '/services/lead-generation': 'B2B & B2C Lead Generation Agency | High-Intent Inbound Funnels - HK DigiVerse LLP',
  '/services/marketing-automation': 'Marketing Automation Services | Email & CRM Workflows - HK DigiVerse LLP',
  // AI & Automation
  '/services/ai-automation': 'AI & Business Automation Solutions | HK DigiVerse LLP',
  '/services/ai-and-automation': 'AI & Business Automation Solutions | HK DigiVerse LLP',
  '/services/ai-consulting': 'AI Consulting Company | Strategic AI Advisory - HK DigiVerse LLP',
  '/services/ai-strategy': 'Enterprise AI Strategy & Roadmapping | HK DigiVerse LLP',
  '/services/generative-ai-solutions': 'Generative AI Solutions & Custom Model Deployments | HK DigiVerse LLP',
  '/services/ai-integration': 'Enterprise AI Integration Services | Private APIs - HK DigiVerse LLP',
  '/services/ai-agent-development': 'Autonomous AI Agent Development Company | LangGraph Agents - HK DigiVerse LLP',
  '/services/llm-development': 'Custom LLM Development & Fine-Tuning Services | HK DigiVerse LLP',
  '/services/ai-chatbot-development': 'Custom AI Chatbot Development | Omnichannel Support - HK DigiVerse LLP',
  '/services/business-automation': 'Business Process Automation (BPA & RPA) | HK DigiVerse LLP',
  // Design & Branding
  '/services/designing': 'Design & Creative Studio | UI/UX & Brand Identity - HK DigiVerse LLP',
  '/services/design-and-branding': 'Design & Creative Studio | UI/UX & Brand Identity - HK DigiVerse LLP',
  '/services/design-branding': 'Design & Creative Studio | UI/UX & Brand Identity - HK DigiVerse LLP',
  '/services/branding': 'Strategic Brand Identity & Branding Agency | HK DigiVerse LLP',
  '/services/logo-design': 'Bespoke Logo Design Services | Minimalist & Premium - HK DigiVerse LLP',
  '/services/graphic-design': 'Professional Graphic Design Services | Visual Assets - HK DigiVerse LLP',
  '/services/ui-ux-design': 'UI/UX Design Agency | Conversion-Driven Digital Design - HK DigiVerse LLP',
  '/services/product-design': 'Digital Product Design Services | SaaS & Mobile UI/UX - HK DigiVerse LLP',
  '/services/website-design': 'High-Fidelity Website Design Services | Bespoke Web Design - HK DigiVerse LLP',
  // Consulting
  '/services/consulting': 'Enterprise Technology & Strategy Consulting | HK DigiVerse LLP',
  '/services/it-consulting': 'Strategic IT Consulting Services | Infrastructure & Cloud - HK DigiVerse LLP',
  '/services/software-consulting': 'Software Architecture Consulting & Code Audits | HK DigiVerse LLP',
  '/services/technology-consulting': 'Technology Advisory & Innovation Consulting | HK DigiVerse LLP',
  '/services/digital-transformation-consulting': 'Digital Transformation Consulting Services | HK DigiVerse LLP',
  // Startup Solutions
  '/services/startup-solutions': '360° Tech & Digital Partner for Startups | HK DigiVerse LLP',
  '/services/startup-consulting': 'Startup Advisory & Venture Consulting | Product-Market Fit - HK DigiVerse LLP',
  '/services/mvp-development': 'Rapid MVP Development for Startups (4-6 Weeks) | HK DigiVerse LLP',
  '/services/startup-branding': 'Startup Branding & Launch Kits | Identity & Social Assets - HK DigiVerse LLP',
  '/services/product-strategy': 'Startup Product Strategy & Roadmap Planning | HK DigiVerse LLP',
  '/services/startup-technology-solutions': 'Cost-Effective Startup Cloud Tech Architecture | HK DigiVerse LLP',
  '/services/startup-digital-growth': 'Startup Growth Hacking & Customer Acquisition | HK DigiVerse LLP',
  // Portfolio 6 Core Services Subpages
  '/portfolio/software-development': 'Software Development Portfolio & Shipped Platforms | HK DigiVerse LLP',
  '/portfolio/digital-marketing': 'Digital Marketing Portfolio, Campaigns & ROAS Case Studies | HK DigiVerse LLP',
  '/portfolio/ai-automation': 'AI & Automation Engineering Portfolio & Agent Deployments | HK DigiVerse LLP',
  '/portfolio/design-and-branding': 'Design & Branding Portfolio, UI/UX & Systems | HK DigiVerse LLP',
  '/portfolio/consulting': 'Technology Consulting Portfolio, Audits & Cloud Modernization | HK DigiVerse LLP',
  '/portfolio/startup-solutions': 'Startup Solutions Portfolio, MVPs & Founder Acceleration | HK DigiVerse LLP',
  // Portfolio Subpages & Success Stories
  '/portfolio/digital-transformation': 'Digital Transformation Case Studies | HK DigiVerse LLP',
  '/portfolio/ai-work': 'AI & Machine Learning Engineering Portfolio | HK DigiVerse LLP',
  '/portfolio/industrial-ecommerce-solutions': 'Industrial E-Commerce & B2B Solutions | HK DigiVerse LLP',
  '/portfolio/international-work': 'Global Engineering & International Work | HK DigiVerse LLP',
  '/portfolio/ecommerce-work': 'E-Commerce Architecture & Scale Work | HK DigiVerse LLP',
  '/portfolio/iot-work': 'IoT Telemetry & Embedded Systems | HK DigiVerse LLP',
  '/portfolio/supply-chain-management': 'Supply Chain & Logistics Tech Portfolio | HK DigiVerse LLP',
  '/portfolio/social-communities': 'Social Communities & Network Platform Portfolio | HK DigiVerse LLP',
  '/portfolio/mobile-solutions': 'Mobile App Engineering (iOS & Android) | HK DigiVerse LLP',
  '/portfolio/devops-cloud-security': 'DevOps, Cloud Infrastructure & Cybersecurity | HK DigiVerse LLP',
  '/portfolio/automobile-solutions': 'Automotive Tech & Telematics Engineering | HK DigiVerse LLP',
  '/portfolio/digital': 'Digital Acceleration & Custom Software | HK DigiVerse LLP',
  '/portfolio/apparel-ecommerce': 'Apparel & Fashion E-Commerce Engineering | HK DigiVerse LLP',
  '/portfolio/fmcg-ecommerce': 'FMCG Omnichannel E-Commerce Solutions | HK DigiVerse LLP',
  '/portfolio/ux-ui-work': 'Editorial UI/UX Design & Prototyping Portfolio | HK DigiVerse LLP',
  '/portfolio/healthcare-solutions': 'Healthcare & Life Sciences Tech Solutions | HK DigiVerse LLP',
  '/portfolio/media-entertainment-solutions': 'Media Streaming & Entertainment Solutions | HK DigiVerse LLP',
  '/our-clients': 'Our Clients & Strategic Partners | HariKrushn DigiVerse LLP'
};

const PAGE_DESCRIPTIONS = {
  '/': 'HariKrushn DigiVerse LLP architects custom software, enterprise platforms, autonomous AI systems, and digital brand presence for ambitious global teams.',
  '/our-story': 'Discover the genesis, journey, and operational ethos of HariKrushn DigiVerse LLP — engineering precision meets bespoke digital artistry.',
  '/our-people': 'Meet the engineers, architects, researchers, and designers behind HariKrushn DigiVerse LLP shipping mission-critical products globally.',
  '/our-culture': 'Explore the culture code, values, and engineering standards at HariKrushn DigiVerse LLP: high trust, absolute ownership, and zero generic code.',
  '/about-us': 'About HariKrushn DigiVerse LLP — a premier full-cycle technology partnership building transformative software and intelligent digital solutions.',
  '/awards-achievements': 'Awards, industry recognitions, and milestone achievements earned by HariKrushn DigiVerse across global digital engineering categories.',
  '/blogs': 'Stay updated with software engineering breakthroughs, enterprise AI, system design, and digital business transformation insights from HariKrushn DigiVerse.',
  '/blog': 'Stay updated with software engineering breakthroughs, enterprise AI, system design, and digital business transformation insights from HariKrushn DigiVerse.',
  '/our-gallery': 'Visual tour of our state-of-the-art engineering studios, sprint review spaces, collaborative war rooms, and team events.',
  '/services': 'Comprehensive technology services index: enterprise software engineering, performance marketing, AI automation, and technology advisory.',
  '/industry': 'Tailored digital solutions engineered for Fintech, Healthcare, E-Commerce, Logistics, Automotive, Media, and Industrial manufacturing.',
  '/career': 'Join HariKrushn DigiVerse LLP. Explore open software engineering, AI research, cloud architecture, and UI/UX design positions.',
  '/case-study': 'In-depth case studies showcasing how we solved mission-critical engineering challenges, accelerated pipelines, and generated exponential ROI.',
  '/case-studies/hipaa-compliant-healthcare-platform-security': 'Technical deep-dive on how HK DigiVerse engineered a HIPAA-aligned healthcare platform with role-based access, AES-256 encryption, tamper-evident audit trails, and secure EHR/FHIR integrations.',
  '/case-study/hipaa-compliant-healthcare-platform-security': 'Technical deep-dive on how HK DigiVerse engineered a HIPAA-aligned healthcare platform with role-based access, AES-256 encryption, tamper-evident audit trails, and secure EHR/FHIR integrations.',
  '/case-study/hipaa-healthcare': 'Technical deep-dive on how HK DigiVerse engineered a HIPAA-aligned healthcare platform with role-based access, AES-256 encryption, tamper-evident audit trails, and secure EHR/FHIR integrations.',
  '/portfolio': 'Explore our featured portfolio of enterprise software platforms, mobile applications, autonomous AI agents, and custom SaaS products.',
  '/our-clients': 'Explore our verified global client roster of forward-thinking enterprises, funded startups, and industry leaders across 18 countries.',
  '/ventures': 'Incubating, co-founding, and scaling proprietary disruptive tech startups and venture studios backed by HariKrushn DigiVerse.',
  '/contact': 'Initiate an engineering consultation or project discovery sprint with HariKrushn DigiVerse LLP. Response guaranteed within 24 hours.',
  // Software Development
  '/services/software-development': 'Full-cycle enterprise software development services: scalable cloud architectures, custom SaaS platforms, and secure APIs.',
  '/services/web-development': 'Custom web development using modern React, Next.js, and Node.js frameworks engineered for speed, SEO, and sub-second loading.',
  '/services/web-application-development': 'Scalable web application development engineered for high concurrency, real-time data sync, and enterprise security standards.',
  '/services/mobile-app-development': 'Native and cross-platform mobile application development for iOS and Android using Swift, Kotlin, and Flutter.',
  '/services/custom-software-development': 'Bespoke enterprise software engineering tailored to solve complex operational workflows and eliminate technical debt.',
  '/services/saas-development': 'Multi-tenant SaaS application development featuring subscription billing, role-based access, and elastic cloud scaling.',
  '/services/erp-development': 'Custom ERP software development integrating supply chain, financial ledgers, human capital, and real-time operational analytics.',
  '/services/crm-development': 'Custom CRM platform engineering with automated sales pipelines, omnichannel lead tracking, and ERP integration.',
  '/services/api-development': 'High-throughput RESTful and GraphQL API development, API gateway management, and microservice mesh engineering.',
  '/services/ecommerce-web-development': 'Headless e-commerce development with sub-second page loads, conversion-optimized checkouts, and ERP inventory sync.',
  // Digital Marketing
  '/services/digital-marketing': 'Data-driven performance digital marketing: technical SEO, generative search optimization (GEO), Google Ads, and Meta PPC.',
  '/services/seo': 'Data-backed Search Engine Optimization (SEO) driving qualified organic traffic, domain authority, and top SERP rankings.',
  '/services/local-seo': 'Dominating local search and Google Maps with localized landing pages, review automation, and local citation building.',
  '/services/technical-seo': 'Deep technical SEO audits: Core Web Vitals optimization, crawl budget allocation, structured data schema, and indexation.',
  '/services/ai-seo': 'Next-generation AI-powered SEO leveraging algorithmic content modeling, entity mapping, and predictive keyword trends.',
  '/services/generative-engine-optimization': 'Optimize your brand visibility across generative AI engines like ChatGPT, Google AI Overviews, and Perplexity.',
  '/services/google-ads-ppc': 'ROI-focused Google Ads and PPC campaign management delivering predictable inbound leads and scalable customer acquisition.',
  '/services/meta-ads': 'High-converting Facebook and Instagram ad campaigns powered by audience testing, dynamic creative optimization, and retargeting.',
  '/services/social-media-marketing': 'Strategic social media management, brand storytelling, viral short-form video production, and community engagement.',
  '/services/content-marketing': 'E-E-A-T compliant content marketing campaigns establishing industry thought leadership and ranking for high-intent keywords.',
  '/services/lead-generation': 'B2B and B2C inbound lead generation engines combining conversion rate optimization (CRO) with hyper-targeted paid funnels.',
  '/services/marketing-automation': 'Automated email nurture sequences, CRM lead scoring workflows, and lifecycle marketing triggered by user behaviors.',
  // AI & Automation
  '/services/ai-automation': 'Enterprise artificial intelligence and robotic process automation (RPA) systems replacing repetitive manual workflows.',
  '/services/ai-consulting': 'Strategic AI consulting: feasibility audits, technology selection, ROI projections, and proprietary model fine-tuning.',
  '/services/ai-strategy': 'Actionable enterprise AI adoption roadmaps aligning machine learning capabilities with core commercial business objectives.',
  '/services/generative-ai-solutions': 'Custom generative AI solutions: domain-specific text synthesis, multimodal asset generation, and private model deployments.',
  '/services/ai-integration': 'Seamlessly integrate leading LLMs and neural models into your existing software stack via secure, private enterprise APIs.',
  '/services/ai-agent-development': 'Autonomous multi-agent AI systems orchestrating complex workflows, decision trees, and tool-augmented task execution.',
  '/services/llm-development': 'Proprietary Large Language Model (LLM) fine-tuning, retrieval-augmented generation (RAG), and vector database architecture.',
  '/services/ai-chatbot-development': 'Intelligent conversational AI chatbots providing human-grade customer support, qualification, and internal knowledge lookup.',
  '/services/business-automation': 'End-to-end business process automation eliminating bottlenecks, reducing labor costs, and ensuring zero error rates.',
  // Design & Branding
  '/services/design-and-branding': 'Full-suite digital design studio: brand identity systems, product design, design tokens, and user experience engineering.',
  '/services/branding': 'Distinctive brand positioning, narrative frameworks, color psychology, and comprehensive brand guidelines.',
  '/services/logo-design': 'Iconic, minimalist logo design crafted for timeless recognition across digital interfaces and physical touchpoints.',
  '/services/graphic-design': 'High-impact visual communication design: pitch decks, marketing collateral, social assets, and brand illustrations.',
  '/services/ui-ux-design': 'User-centric UI/UX design: wireframing, interactive prototyping, usability testing, and conversion-engineered interfaces.',
  '/services/product-design': 'End-to-end digital product design for web and mobile SaaS platforms focusing on intuitive user flows and retention.',
  '/services/website-design': 'Bespoke web design creating unforgettable first impressions, cinematic typography, and responsive micro-animations.',
  // Consulting
  '/services/consulting': 'Strategic technology consulting: enterprise software audits, cloud architecture roadmaps, and digital transformation.',
  '/services/it-consulting': 'Enterprise IT infrastructure advisory, cybersecurity risk management, and scalable cloud migration strategies.',
  '/services/software-consulting': 'Senior software architecture consulting, monolithic refactoring blueprints, and technical due diligence audits.',
  '/services/technology-consulting': 'Advising executive leadership on emerging technology adoption, vendor evaluations, and technical debt mitigation.',
  '/services/digital-transformation-consulting': 'Modernizing legacy enterprise systems with modern cloud-native architectures, digital pipelines, and automations.',
  // Startup Solutions
  '/services/startup-solutions': 'All-in-one technology and digital growth partner for ambitious startups from concept validation to Series A scale.',
  '/services/startup-consulting': 'Actionable startup advisory: technical founder guidance, architecture reviews, and product-market fit roadmaps.',
  '/services/mvp-development': 'Rapid minimum viable product (MVP) engineering shipped in 4 to 6 weeks to test hypotheses and secure funding.',
  '/services/startup-branding': 'Turnkey startup launch kits: brand identity, investor pitch decks, launch landing pages, and social branding.',
  '/services/product-strategy': 'Data-backed product roadmapping, user persona identification, competitive moat analysis, and sprint prioritization.',
  '/services/startup-technology-solutions': 'Cost-effective, serverless cloud architectures engineered for rapid scaling without premature infrastructure burn.',
  '/services/startup-digital-growth': 'Growth hacking, organic acquisition funnels, and performance marketing engineered for startup velocity.',
  // Portfolio 6 Core Services Subpages
  '/portfolio/software-development': 'Production case work archive: high-concurrency custom software, multi-tenant enterprise ERPs, and cloud microservices shipped by HK DigiVerse.',
  '/portfolio/digital-marketing': 'Empirical performance marketing case work: technical SEO authority clusters, algorithmic PPC ad funnels, and ROAS benchmarks.',
  '/portfolio/ai-automation': 'Autonomous AI case work: multi-agent task orchestration, private VPC enterprise RAG, and robotic process automation deployments.',
  '/portfolio/design-and-branding': 'Visual design portfolio: editorial brand identities, tokenized design systems, and conversion-engineered luxury UI/UX interfaces.',
  '/portfolio/consulting': 'Senior advisory case work: enterprise architecture audits, cloud cost optimization, and zero-downtime monolithic refactoring.',
  '/portfolio/startup-solutions': 'Venture acceleration case work: rapid MVP engineering delivered in 4 to 6 weeks and scalable seed-stage tech foundations.',
  // Portfolio Subpages
  '/portfolio/digital-transformation': 'Case study archive of enterprise cloud migrations, monolithic refactorings, and digital transformation initiatives.',
  '/portfolio/ai-work': 'Featured engineering portfolio of autonomous AI agents, LLM pipelines, computer vision models, and predictive analytics.',
  '/portfolio/industrial-ecommerce-solutions': 'Specialized B2B e-commerce platforms engineered for industrial equipment, wholesale distribution, and bulk purchasing.',
  '/portfolio/international-work': 'Global technology solutions delivered for international clients across the US, UK, Europe, Australia, and Asia-Pacific.',
  '/portfolio/ecommerce-work': 'High-volume e-commerce storefronts, custom checkout funnels, and headless Shopify architectures delivering record sales.',
  '/portfolio/iot-work': 'Connected IoT hardware solutions, telematics ingestion pipelines, and real-time sensor dashboards.',
  '/portfolio/supply-chain-management': 'Intelligent supply chain software, warehouse inventory tracking, and route optimization systems.',
  '/portfolio/social-communities': 'Modern social networking platforms, community hubs, live messaging meshes, and interactive member portals.',
  '/portfolio/mobile-solutions': 'Portfolio of iOS and Android mobile applications engineered with native Swift, Kotlin, and Flutter.',
  '/portfolio/devops-cloud-security': 'DevOps automation, Kubernetes cluster deployments, infrastructure as code, and cloud cybersecurity case studies.',
  '/portfolio/automobile-solutions': 'Connected vehicle telematics, automotive inventory management, and dealership digital showroom platforms.',
  '/portfolio/digital': 'Digital acceleration initiatives, custom software portals, and automated business workflows delivered for diverse industries.',
  '/portfolio/apparel-ecommerce': 'Editorial fashion and apparel e-commerce websites featuring dynamic sizing, lookbooks, and high conversion rates.',
  '/portfolio/fmcg-ecommerce': 'Omnichannel D2C and B2B platforms engineered for fast-moving consumer goods with rapid order fulfillment.',
  '/portfolio/ux-ui-work': 'Showcase of design systems, interactive prototypes, user journey maps, and award-winning user interfaces.',
  '/portfolio/healthcare-solutions': 'HIPAA-compliant telehealth platforms, clinical trial management systems, and electronic health record integrations.',
  '/portfolio/media-entertainment-solutions': 'Low-latency video streaming backends, digital rights management (DRM), and interactive media applications.'
};

// Comprehensive Dynamic SEO Head updater
function updatePageSEO(route) {
  if (typeof document === 'undefined' || !route || route.startsWith('#preview')) return;

  const cleanRoute = route.split('?')[0].replace('#', '/').replace('//', '/');
  
  // Dynamic SEO lookup for case studies
  let title = PAGE_TITLES[route] || PAGE_TITLES[cleanRoute];
  let description = PAGE_DESCRIPTIONS[route] || PAGE_DESCRIPTIONS[cleanRoute];

  if ((!title || !description) && (cleanRoute.startsWith('/case-study/') || cleanRoute.startsWith('/case-studies/'))) {
    const slug = cleanRoute.replace(/^\/(?:case-study|case-studies)\//, '').split('?')[0];
    const caseData = findCaseStudy(null, slug);
    if (caseData) {
      title = `${caseData.title} | HariKrushn DigiVerse LLP`;
      description = caseData.lede || description;
    }
  }

  title = title || 'HK DigiVerse LLP – 360° Tech & Digital Partner for Startups';
  description = description || 'HariKrushn DigiVerse LLP builds custom software, AI systems, mobile applications, and digital growth platforms for ambitious global enterprises.';
  const canonicalUrl = `https://harikrushndigiverse.com${cleanRoute === '/' ? '' : cleanRoute}`;

  // Title
  document.title = title;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  // OpenGraph Tags
  const updateMetaTag = (selector, attrName, attrVal, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
}

function getNormalizedLocation() {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '/';

  // If preview mode, return preview hash
  if (hash.startsWith('#preview')) {
    return hash;
  }

  // Auto-redirect legacy hash URLs (e.g. /#our-people -> /our-people)
  if (hash && hash !== '#' && hash !== '#home' && !hash.startsWith('#preview')) {
    const rawPath = hash.replace('#', '').split('?')[0];
    const searchParams = hash.includes('?') ? '?' + hash.split('?')[1] : window.location.search;
    const cleanPath = (rawPath.startsWith('/') ? rawPath : '/' + rawPath) + searchParams;
    
    // Smoothly replace legacy hash in browser URL bar
    window.history.replaceState(null, '', cleanPath);
    return cleanPath.split('?')[0];
  }

  const base = pathname.split('?')[0];
  if (base === '' || base === '/home') {
    return '/';
  }
  return base;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      const loc = getNormalizedLocation();
      const base = loc.split('?')[0];
      if (base.startsWith('/franchise') || base.startsWith('#franchise') || base === '/admin' || base === '#admin') {
        return true;
      }
      if (sessionStorage.getItem('hk_site_loaded') === 'true') {
        return true;
      }
    }
    return false;
  });
  const [currentRoute, setCurrentRoute] = useState(getNormalizedLocation());

  useEffect(() => {
    const handleLocationChange = () => {
      const newRoute = getNormalizedLocation();
      if (newRoute.startsWith('/franchise') || newRoute.startsWith('#franchise')) {
        setIsLoaded(true);
      }
      setCurrentRoute((prevRoute) => {
        if (prevRoute !== newRoute) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
        return newRoute;
      });

      updatePageSEO(newRoute);
    };

    const initRoute = getNormalizedLocation();
    updatePageSEO(initRoute);

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const baseRoute = currentRoute.split('?')[0];
  const isPreviewMode = baseRoute.startsWith('#preview');
  const isFranchiseStandalone = baseRoute === '/franchise' || baseRoute === '#franchise' || baseRoute === '/franchise.html' || baseRoute === '/franchise-enquiry' || baseRoute === '#franchise-enquiry' || baseRoute === '/franchise-enquiry.html' || baseRoute === '/franchise-received' || baseRoute === '#franchise-received' || baseRoute === '/franchise-received.html' || baseRoute === '/1.html';
  const isAdminOrPreview = baseRoute === '/admin' || baseRoute === '#admin' || isPreviewMode || isFranchiseStandalone;
  const isSubpage = baseRoute !== '/' && baseRoute !== '/home' && baseRoute !== '/admin' && baseRoute !== '#' && baseRoute !== '#home' && !isPreviewMode && !isFranchiseStandalone;

  // Global Momentum Smooth Scrolling (Lenis) - Unified across all pages & synced with GSAP
  useEffect(() => {
    if (isAdminOrPreview || typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.0, // Crisp & responsive, zero lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    window.__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Single ticker loop driven by GSAP at 120fps
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [isAdminOrPreview]);

  // Smooth scroll to top on route change without resetting Lenis instance
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [baseRoute]);

  const handlePreloadComplete = useCallback(() => {
    setIsLoaded(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hk_site_loaded', 'true');
    }
  }, []);

  const renderPageContent = () => {
    if (baseRoute.startsWith('#preview')) {
      return <PreviewContainer currentHash={baseRoute} />;
    }

    // Dynamic Case Study Deep-Dive Routes (/case-study/:slug or /case-studies/:slug)
    if (
      baseRoute.startsWith('/case-study/') ||
      baseRoute.startsWith('/case-studies/') ||
      baseRoute.startsWith('#case-study/') ||
      baseRoute.startsWith('#case-studies/')
    ) {
      const slug = baseRoute.replace(/^#?\/(?:case-study|case-studies)\//, '').split('?')[0];
      return <CaseStudy dynamicSlug={slug} />;
    }

    // Dynamic Blog Deep-Dive Routes (/blog/:slug or /blogs/:slug)
    if (
      baseRoute.startsWith('/blog/') ||
      baseRoute.startsWith('/blogs/') ||
      baseRoute.startsWith('#blog/') ||
      baseRoute.startsWith('#blogs/')
    ) {
      const slug = baseRoute.replace(/^#?\/(?:blog|blogs)\//, '').split('?')[0];
      return <Blogs initialSlug={slug} />;
    }

    switch (baseRoute) {
      case '/admin':
      case '#admin':
        return (
          <ErrorBoundary>
            <AdminPanel />
          </ErrorBoundary>
        );
      case '/our-story':
      case '#our-story':
        return <OurStory />;
      case '/our-people':
      case '#our-people':
        return <OurPeople />;
      case '/our-culture':
      case '#our-culture':
        return <OurCulture />;
      case '/about-us':
      case '#about-us':
        return <AboutUs />;
      case '/awards-achievements':
      case '#awards-achievements':
        return <Awards />;
      case '/blog':
      case '#blog':
      case '/blogs':
      case '#blogs':
        return <Blogs />;
      case '/our-gallery':
      case '#our-gallery':
        return <Gallery />;
      case '/services':
      case '#services':
        return <Services />;
      case '/industry':
      case '#industry':
        return <Industry />;
      case '/career':
      case '#career':
      case '/jobs':
      case '#jobs':
      case '#career-jobs':
      case '#career-internships':
        return <Career />;
      case '/case-study':
      case '#case-study':
      case '/case-studies':
      case '#case-studies':
        return <CaseStudy />;
      case '/portfolio':
      case '#portfolio':
        return <Portfolio />;
      case '/ventures':
      case '#ventures':
        return <Ventures />;
      case '/contact':
      case '#contact':
        return <Contact />;
      case '/franchise':
      case '#franchise':
      case '/franchise.html':
        return <Franchise />;
      case '/franchise-enquiry':
      case '#franchise-enquiry':
      case '/franchise-enquiry.html':
        return <FranchiseEnquiry />;
      case '/franchise-received':
      case '#franchise-received':
      case '/franchise-received.html':
      case '/1.html':
        return <FranchiseReceived />;
      case '/service-web':
      case '#service-web':
        return <ServiceWeb />;
      case '/service-app':
      case '#service-app':
        return <ServiceApp />;
      case '/service-custom-software':
      case '#service-custom-software':
        return <ServiceCustomSoftware />;
      case '/service-digital-marketing':
      case '#service-digital-marketing':
        return <ServiceDigitalMarketing />;
      case '/service-social-media-management':
      case '#service-social-media-management':
        return <ServiceSocialMedia />;
      case '/service-ai-consulting':
      case '#service-ai-consulting':
        return <ServiceAiConsulting />;
      case '/service-it-consulting':
      case '#service-it-consulting':
        return <ServiceItConsulting />;
      case '/services/software-development':
      case '#service-software-development':
        return <SoftwareDevelopmentPage />;
      case '/services/web-development':
      case '#service-web-development':
        return <WebDevelopmentPage />;
      case '/services/web-application-development':
      case '#service-web-application-development':
        return <WebApplicationDevelopmentPage />;
      case '/services/mobile-app-development':
      case '#service-mobile-app-development':
        return <MobileAppDevelopmentPage />;
      case '/services/custom-software-development':
      case '#service-custom-software-development':
        return <CustomSoftwareDevelopmentPage />;
      case '/services/saas-development':
      case '#service-saas-development':
        return <SaasDevelopmentPage />;
      case '/services/erp-development':
      case '#service-erp-development':
        return <ErpDevelopmentPage />;
      case '/services/crm-development':
      case '#service-crm-development':
        return <CrmDevelopmentPage />;
      case '/services/api-development':
      case '#service-api-development':
        return <ApiDevelopmentPage />;
      case '/services/ecommerce-web-development':
      case '#service-ecommerce-web-development':
        return <EcommerceWebDevelopmentServicePage />;
      case '/services/digital-marketing':
      case '#service-digital-marketing':
        return <DigitalMarketingPage />;
      case '/services/seo':
      case '#service-seo':
        return <SeoPage />;
      case '/services/local-seo':
      case '#service-local-seo':
        return <LocalSeoPage />;
      case '/services/technical-seo':
      case '#service-technical-seo':
        return <TechnicalSeoPage />;
      case '/services/ai-seo':
      case '#service-ai-seo':
        return <AiSeoPage />;
      case '/services/generative-engine-optimization':
      case '#service-generative-engine-optimization':
        return <GenerativeEngineOptimizationGeoPage />;
      case '/services/google-ads-ppc':
      case '#service-google-ads-ppc':
        return <GoogleAdsPpcPage />;
      case '/services/meta-ads':
      case '#service-meta-ads':
        return <MetaAdsPage />;
      case '/services/social-media-marketing':
      case '#service-social-media-marketing':
        return <SocialMediaMarketingPage />;
      case '/services/content-marketing':
      case '#service-content-marketing':
        return <ContentMarketingPage />;
      case '/services/lead-generation':
      case '#service-lead-generation':
        return <LeadGenerationPage />;
      case '/services/marketing-automation':
      case '#service-marketing-automation':
        return <MarketingAutomationPage />;
      case '/services/ai-automation':
      case '#service-ai-automation':
      case '/services/ai-and-automation':
      case '#service-ai-and-automation':
        return <AiAndAutomationPage />;
      case '/services/ai-consulting':
      case '#service-ai-consulting':
        return <AiConsultingPage />;
      case '/services/ai-strategy':
      case '#service-ai-strategy':
        return <AiStrategyPage />;
      case '/services/generative-ai-solutions':
      case '#service-generative-ai-solutions':
        return <GenerativeAiSolutionsPage />;
      case '/services/ai-integration':
      case '#service-ai-integration':
        return <AiIntegrationPage />;
      case '/services/ai-agent-development':
      case '#service-ai-agent-development':
        return <AiAgentDevelopmentPage />;
      case '/services/llm-development':
      case '#service-llm-development':
        return <LlmDevelopmentPage />;
      case '/services/ai-chatbot-development':
      case '#service-ai-chatbot-development':
        return <AiChatbotDevelopmentPage />;
      case '/services/business-automation':
      case '#service-business-automation':
        return <BusinessAutomationPage />;
      case '/services/designing':
      case '#service-designing':
      case '/services/design-and-branding':
      case '#service-design-and-branding':
      case '/services/design-branding':
      case '#service-design-branding':
        return <DesignAndBrandingPage />;
      case '/services/branding':
      case '#service-branding':
        return <BrandingPage />;
      case '/services/logo-design':
      case '#service-logo-design':
        return <LogoDesignPage />;
      case '/services/graphic-design':
      case '#service-graphic-design':
        return <GraphicDesignPage />;
      case '/services/ui-ux-design':
      case '#service-ui-ux-design':
        return <UiUxDesignPage />;
      case '/services/product-design':
      case '#service-product-design':
        return <ProductDesignPage />;
      case '/services/website-design':
      case '#service-website-design':
        return <WebsiteDesignPage />;
      case '/services/consulting':
      case '#service-consulting':
        return <ConsultingPage />;
      case '/services/it-consulting':
      case '#service-it-consulting':
        return <ItConsultingPage />;
      case '/services/software-consulting':
      case '#service-software-consulting':
        return <SoftwareConsultingPage />;
      case '/services/technology-consulting':
      case '#service-technology-consulting':
        return <TechnologyConsultingPage />;
      case '/services/digital-transformation-consulting':
      case '#service-digital-transformation-consulting':
        return <DigitalTransformationConsultingPage />;
      case '/services/startup-solutions':
      case '#service-startup-solutions':
        return <StartupSolutionsPage />;
      case '/services/startup-consulting':
      case '#service-startup-consulting':
        return <StartupConsultingPage />;
      case '/services/mvp-development':
      case '#service-mvp-development':
        return <MvpDevelopmentPage />;
      case '/services/startup-branding':
      case '#service-startup-branding':
        return <StartupBrandingPage />;
      case '/services/product-strategy':
      case '#service-product-strategy':
        return <ProductStrategyPage />;
      case '/services/startup-technology-solutions':
      case '#service-startup-technology-solutions':
        return <StartupTechnologySolutionsPage />;
      case '/services/startup-digital-growth':
      case '#service-startup-digital-growth':
        return <StartupDigitalGrowthPage />;
      // Portfolio 6 Core Services Subpages
      case '/portfolio/software-development':
      case '#portfolio/software-development':
      case '#portfolio-software-development':
        return <PortfolioSoftwareDevelopmentPage />;
      case '/portfolio/digital-marketing':
      case '#portfolio/digital-marketing':
      case '#portfolio-digital-marketing':
        return <PortfolioDigitalMarketingPage />;
      case '/portfolio/ai-automation':
      case '#portfolio/ai-automation':
      case '#portfolio-ai-automation':
        return <PortfolioAiAutomationPage />;
      case '/portfolio/design-and-branding':
      case '#portfolio/design-and-branding':
      case '#portfolio-design-and-branding':
        return <PortfolioDesignBrandingPage />;
      case '/portfolio/consulting':
      case '#portfolio/consulting':
      case '#portfolio-consulting':
        return <PortfolioConsultingPage />;
      case '/portfolio/startup-solutions':
      case '#portfolio/startup-solutions':
      case '#portfolio-startup-solutions':
        return <PortfolioStartupSolutionsPage />;
      // Portfolio Subpages & Success Stories
      case '/portfolio/digital-transformation':
      case '#portfolio/digital-transformation':
      case '#portfolio-digital-transformation':
        return <PortfolioDigitalTransformationPage />;
      case '/portfolio/ai-work':
      case '#portfolio/ai-work':
      case '#portfolio-ai-work':
        return <PortfolioAiWorkPage />;
      case '/portfolio/industrial-ecommerce-solutions':
      case '#portfolio/industrial-ecommerce-solutions':
      case '#portfolio-industrial-ecommerce-solutions':
        return <PortfolioIndustrialEcommercePage />;
      case '/portfolio/international-work':
      case '#portfolio/international-work':
      case '#portfolio-international-work':
        return <PortfolioInternationalWorkPage />;
      case '/portfolio/ecommerce-work':
      case '#portfolio/ecommerce-work':
      case '#portfolio-ecommerce-work':
        return <PortfolioEcommerceWorkPage />;
      case '/portfolio/iot-work':
      case '#portfolio/iot-work':
      case '#portfolio-iot-work':
        return <PortfolioIotWorkPage />;
      case '/portfolio/supply-chain-management':
      case '#portfolio/supply-chain-management':
      case '#portfolio-supply-chain-management':
        return <PortfolioSupplyChainPage />;
      case '/portfolio/social-communities':
      case '#portfolio/social-communities':
      case '#portfolio-social-communities':
        return <PortfolioSocialCommunitiesPage />;
      case '/portfolio/mobile-solutions':
      case '#portfolio/mobile-solutions':
      case '#portfolio-mobile-solutions':
        return <PortfolioMobileSolutionsPage />;
      case '/portfolio/devops-cloud-security':
      case '#portfolio/devops-cloud-security':
      case '#portfolio-devops-cloud-security':
        return <PortfolioDevopsCloudPage />;
      case '/portfolio/automobile-solutions':
      case '#portfolio/automobile-solutions':
      case '#portfolio-automobile-solutions':
        return <PortfolioAutomobilePage />;
      case '/portfolio/digital':
      case '#portfolio/digital':
      case '#portfolio-digital':
        return <PortfolioDigitalPage />;
      case '/portfolio/apparel-ecommerce':
      case '#portfolio/apparel-ecommerce':
      case '#portfolio-apparel-ecommerce':
        return <PortfolioApparelEcommercePage />;
      case '/portfolio/fmcg-ecommerce':
      case '#portfolio/fmcg-ecommerce':
      case '#portfolio-fmcg-ecommerce':
        return <PortfolioFmcgEcommercePage />;
      case '/portfolio/ux-ui-work':
      case '#portfolio/ux-ui-work':
      case '#portfolio-ux-ui-work':
        return <PortfolioUxUiWorkPage />;
      case '/portfolio/healthcare-solutions':
      case '#portfolio/healthcare-solutions':
      case '#portfolio-healthcare-solutions':
        return <PortfolioHealthcarePage />;
      case '/portfolio/media-entertainment-solutions':
      case '#portfolio/media-entertainment-solutions':
      case '#portfolio-media-entertainment-solutions':
        return <PortfolioMediaEntertainmentPage />;
      case '/our-clients':
      case '#our-clients':
      case '/clients':
      case '#clients':
        return <OurClientsPage />;
      default:
        return null;
    }
  };

  return (
    <ContentProvider>
      {/* Global Reading / Scroll Progress Bar */}
      {!isAdminOrPreview && <ScrollProgressBar />}

      {/* Desktop custom cursor - hidden in admin and preview modes for cleaner UX */}
      {!isAdminOrPreview && <CustomCursor />}

      {/* Cinematic preloader screen - bypassed in preview mode and franchise standalone */}
      {!isLoaded && !isPreviewMode && !isFranchiseStandalone && <Preloader onComplete={handlePreloadComplete} />}

      {/* Main website layout */}
      <div className={`transition-opacity duration-1000 ${(isLoaded || isPreviewMode || isFranchiseStandalone) ? 'opacity-100' : 'opacity-0'}`}>
        {!isAdminOrPreview && <Navbar />}

        {isSubpage ? (
          /* Subpages Layout Wrapper */
          <main className="pt-36 sm:pt-40 lg:pt-44 xl:pt-48 pb-24 w-full mx-auto min-h-screen relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={baseRoute}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {renderPageContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        ) : isAdminOrPreview ? (
          /* Fullscreen Admin Panel or Preview container */
          <div key={`admin-preview-wrapper-${baseRoute}`} translate="no" className="notranslate w-full min-h-screen">
            {renderPageContent()}
          </div>
        ) : (
          /* Home Page Cinematic Hero & Sections */
          <div key="home-page-wrapper" className="w-full">
            <HeroSection isLoaded={isLoaded} />
            <HomeSections />
          </div>
        )}

        {!isAdminOrPreview && <Footer />}

        {/* Sleek bottom scroll hint - only shown on Home page */}
        {!isSubpage && !isAdminOrPreview && <ScrollIndicator />}

        {/* Floating 3D WhatsApp Mascot Widget */}
        {!isAdminOrPreview && <WhatsAppWidget />}
      </div>
    </ContentProvider>
  );
}

export default App;
