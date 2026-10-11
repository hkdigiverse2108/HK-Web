import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { useContent } from '../context/ContentContext';
import { navigateTo } from '../utils/navigation';

const API_URL = import.meta.env.VITE_API_URL || '';

export const getCategoryUrl = (catName) => {
  if (!catName) return '/services';
  const norm = catName.toLowerCase();
  if (norm.includes('portfolio')) return '/portfolio';
  if (norm.includes('success') || norm.includes('stories')) return '/case-study';
  if (norm.includes('software')) return '/services/software-development';
  if (norm.includes('marketing')) return '/services/digital-marketing';
  if (norm.includes('ai') || norm.includes('automation')) return '/services/ai-automation';
  if (norm.includes('design') || norm.includes('brand')) return '/services/design-and-branding';
  if (norm.includes('consulting')) return '/services/consulting';
  if (norm.includes('startup')) return '/services/startup-solutions';
  return '/services';
};

function MegaMenuDropdown({ megaMenu, styles, isDropdownOpen }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = megaMenu[activeTab] || megaMenu[0] || {};
  const activeCategoryUrl = activeCategory.href || getCategoryUrl(activeCategory.category);

  return (
    <div 
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[840px] max-w-[92vw] transition-all duration-300 ease-out z-50",
        isDropdownOpen 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
      )}
    >
      <div className="bg-[#050508]/95 backdrop-blur-xl border border-white/10 p-0 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-row overflow-hidden min-h-[320px]">
        {/* Left Sidebar - Core Categories */}
        <div className="flex flex-col w-[38%] bg-white/[0.02] border-r border-white/10 p-3 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            // Core Domains
          </div>
          {megaMenu.map((cat, idx) => {
            const catUrl = cat.href || getCategoryUrl(cat.category);
            return (
              <button
                key={idx}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => {
                  if (catUrl) navigateTo(catUrl);
                }}
                className={cn(
                  "text-left flex items-center justify-between py-2.5 px-3.5 rounded-xl transition-all duration-200 text-xs font-light uppercase tracking-wider cursor-pointer group/cat",
                  activeTab === idx ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="truncate">{cat.category}</span>
                <svg className={cn("w-3 h-3 transition-transform text-white/50 group-hover/cat:text-white", activeTab === idx ? "translate-x-0.5 opacity-100" : "opacity-0 -translate-x-1")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Right Content - Sub-services with Main Category Header */}
        <div className="flex-1 p-7 bg-gradient-to-br from-transparent to-white/[0.02] flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block">Pillar Overview</span>
              <h3 className="text-white text-sm font-display uppercase tracking-widest font-bold">
                {activeCategory?.category}
              </h3>
            </div>
            <button
              onClick={() => {
                if (activeCategoryUrl) navigateTo(activeCategoryUrl);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[9px] font-mono text-neutral-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer group/explore"
            >
              <span>Explore Pillar Page</span>
              <svg className="w-2.5 h-2.5 group-hover/explore:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 flex-grow content-start">
            {activeCategory?.items?.map((subItem, idx) => {
              const isSubFranchise = (subItem.label || subItem.name)?.toLowerCase().includes('franchise');
              return (
                <a
                  key={idx}
                  href={isSubFranchise ? "/franchise" : subItem.href}
                  onClick={(e) => {
                    if (!isSubFranchise) {
                      e.preventDefault();
                      navigateTo(subItem.href);
                    }
                  }}
                  className="uppercase tracking-[0.08em] font-light transition-all duration-200 text-neutral-400 hover:text-white text-[10px] cursor-pointer flex items-center gap-2 group/sub py-1 hover:translate-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/sub:bg-blue-400 transition-colors" />
                  <span className="truncate">{subItem.label || subItem.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { content } = useContent();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Logo clicking authentication state
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Parse styles
  const styles = content?.site_settings?.navbar_styles || {
    fontSize: "12px",
    color: "#a3a3a3",
    hoverColor: "#ffffff",
    logoSize: "14px",
    logoColor: "#ffffff"
  };

  // Parse dynamic logo text
  const logoText = content?.site_settings?.logo_text || "HariKrushn DigiVerse LLP";
  const spaceIndex = logoText.indexOf(' ');
  const logoTextFirst = spaceIndex > -1 ? logoText.substring(0, spaceIndex) : logoText;
  const logoTextRest = spaceIndex > -1 ? logoText.substring(spaceIndex + 1) : "";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if we have scrolled past a threshold to apply styling
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine scrolling direction to show/hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Scrolling down - hide
      } else {
        setIsHidden(false); // Scrolling up - show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Click handler to trigger admin panel after 7 clicks
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigateTo('/');
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 7) {
      setLogoClicks(0);
      setShowAuthModal(true);
    }
  };

  // Reset logo click count after 4s inactivity
  useEffect(() => {
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 4000);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      const res = await fetch(API_URL + '/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: passwordInput })
      });

      if (res.ok) {
        sessionStorage.setItem('adminPassword', passwordInput);
        setShowAuthModal(false);
        setPasswordInput('');
        setTimeout(() => {
          navigateTo('/admin');
        }, 50);
      } else {
        const errData = await res.json();
        setAuthError(errData.detail || 'Invalid credentials');
      }
    } catch {
      setAuthError('Connection failed. Is the API backend running?');
    } finally {
      setIsVerifying(false);
    }
  };

  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const desktopNavRef = React.useRef(null);

  // Close desktop/tablet dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target)) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLinkClick = (href, e, isExternal = false) => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({});
    setOpenDesktopDropdown(null);

    const isFranchise = href?.toLowerCase().includes('franchise');
    if (isFranchise || isExternal) {
      if (e && e.preventDefault) e.preventDefault();
      window.open('/franchise', '_blank', 'noopener,noreferrer');
      return;
    }

    if (e && e.preventDefault) e.preventDefault();
    if (href) {
      navigateTo(href);
    }
  };

  // Calculate active navigation items dynamically from content context navbar_links
  const rawLinks = content?.site_settings?.navbar_links || [];
  
  const activeNavigationItems = rawLinks
    .filter(item => {
      if (item.show === false) return false;
      const key = (item.label || item.name || '').toLowerCase();
      if (key === 'industry') return false;
      return true;
    })
    .map(item => {
      // Career is a single unified page with no dropdown
      if ((item.label || item.name)?.toLowerCase() === 'career') {
        return { ...item, href: '/career', dropdown: null, megaMenu: null };
      }
      if (item.dropdown) {
        const filteredDropdown = item.dropdown.filter(subItem => subItem.show !== false);
        return { ...item, dropdown: filteredDropdown };
      }
      return item;
    });

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1600px] z-50 transition-all duration-500 ease-out",
          isHidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100",
          isScrolled 
            ? "bg-[#050505]/40 backdrop-blur-md border border-white/5 py-4 px-6 md:px-8 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            : "bg-transparent py-6 px-4 rounded-none border-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} aria-label="Homepage and Admin Portal Trigger" className="flex items-center gap-3 group relative cursor-pointer z-50">
            <img 
              src="/media/images/hk-logo.png" 
              alt="HK Logo" 
              className="w-9 h-9 object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-1.5 leading-none">
              <span 
                className="font-display tracking-[0.15em] text-xs sm:text-sm font-semibold text-white" 
                style={{ fontSize: styles.logoSize || '14px', color: styles.logoColor || '#ffffff' }}
              >
                {logoTextFirst}
              </span>
              {logoTextRest && (
                <span 
                  className="font-display font-light opacity-80 tracking-[0.15em] text-[8px] sm:text-[9px] md:text-xs text-white uppercase md:normal-case mt-0.5 md:mt-0" 
                  style={{ fontSize: `calc(${styles.logoSize || '14px'} - 2px)`, color: styles.logoColor || '#ffffff' }}
                >
                  {logoTextRest}
                </span>
              )}
            </div>
          </a>

          {/* Desktop & Tablet Navigation */}
          <div ref={desktopNavRef} className="hidden md:flex items-center md:gap-3 lg:gap-6 xl:gap-8">
            {activeNavigationItems.map((item, index) => {
              const itemKey = item.label || item.name;
              const isDropdownOpen = openDesktopDropdown === itemKey;

              if (item.megaMenu && item.megaMenu.length > 0) {
                return (
                  <div 
                    key={itemKey} 
                    className="relative group py-1"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <button 
                      type="button"
                      aria-haspopup="true" 
                      aria-expanded={isDropdownOpen} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDesktopDropdown(prev => prev === itemKey ? null : itemKey);
                      }}
                      className="flex items-center gap-1.5 uppercase tracking-[0.15em] font-light transition-colors duration-300 cursor-pointer select-none"
                      style={{
                        fontSize: styles.fontSize || '12px',
                        color: (hoveredIndex === index || isDropdownOpen) ? (styles.hoverColor || '#ffffff') : (styles.color || '#a3a3a3')
                      }}
                    >
                      <span>{itemKey}</span>
                      <svg 
                        className={cn(
                          "w-2.5 h-2.5 transition-transform duration-300", 
                          isDropdownOpen ? "rotate-180 text-white" : "group-hover:rotate-180"
                        )} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <MegaMenuDropdown megaMenu={item.megaMenu} styles={styles} isDropdownOpen={isDropdownOpen} />
                  </div>
                );
              }

              if (item.dropdown && item.dropdown.length > 0) {
                return (
                  <div 
                    key={itemKey} 
                    className="relative group py-1"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <button 
                      type="button"
                      aria-haspopup="true" 
                      aria-expanded={isDropdownOpen} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDesktopDropdown(prev => prev === itemKey ? null : itemKey);
                      }}
                      className="flex items-center gap-1.5 uppercase tracking-[0.15em] font-light transition-colors duration-300 cursor-pointer select-none"
                      style={{
                        fontSize: styles.fontSize || '12px',
                        color: (hoveredIndex === index || isDropdownOpen) ? (styles.hoverColor || '#ffffff') : (styles.color || '#a3a3a3')
                      }}
                    >
                      <span>{itemKey}</span>
                      <svg 
                        className={cn(
                          "w-2.5 h-2.5 transition-transform duration-300", 
                          isDropdownOpen ? "rotate-180 text-white" : "group-hover:rotate-180"
                        )} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Glassmorphic Dropdown Wrapper (Supports Touch/Click on Tablet & Hover on Desktop) */}
                    <div 
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-300 ease-out z-50",
                        isDropdownOpen 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                      )}
                    >
                      {/* Actual Styled Dropdown Box */}
                      <div className="bg-[#050505]/95 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1">
                        {item.dropdown.map((subItem) => {
                          const isSubFranchise = (subItem.label || subItem.name)?.toLowerCase().includes('franchise') || subItem.href?.toLowerCase().includes('franchise');
                          return (
                            <a
                              key={subItem.label || subItem.name}
                              href={isSubFranchise ? "/franchise" : subItem.href}
                              target={isSubFranchise ? "_blank" : undefined}
                              rel={isSubFranchise ? "noopener noreferrer" : undefined}
                              onClick={(e) => handleLinkClick(isSubFranchise ? '/franchise' : subItem.href, e, isSubFranchise)}
                              className="uppercase tracking-[0.15em] font-light transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer block text-left"
                              style={{
                                fontSize: `calc(${styles.fontSize || '12px'} - 1px)`,
                                color: styles.color || '#a3a3a3'
                              }}
                              onMouseEnter={(e) => e.target.style.color = styles.hoverColor || '#ffffff'}
                              onMouseLeave={(e) => e.target.style.color = styles.color || '#a3a3a3'}
                            >
                              {subItem.label || subItem.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const isFranchise = itemKey?.toLowerCase().includes('franchise') || item.href?.toLowerCase().includes('franchise');
              return (
                <a
                  key={itemKey}
                  href={isFranchise ? "/franchise" : item.href}
                  target={isFranchise ? "_blank" : undefined}
                  rel={isFranchise ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleLinkClick(isFranchise ? '/franchise' : item.href, e, isFranchise)}
                  className="relative uppercase tracking-[0.15em] font-light transition-colors duration-300 cursor-pointer group"
                  style={{
                    fontSize: styles.fontSize || '12px',
                    color: hoveredIndex === index ? (styles.hoverColor || '#ffffff') : (styles.color || '#a3a3a3')
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {itemKey}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" style={{ backgroundColor: styles.hoverColor }} />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] relative z-50 cursor-pointer focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                "w-6 h-[1.5px] bg-white transition-all duration-300 origin-center",
                isMobileMenuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              )}
            />
            <span
              className={cn(
                "w-6 h-[1.5px] bg-white transition-all duration-300 origin-center",
                isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "w-6 h-[1.5px] bg-white transition-all duration-300 origin-center",
                isMobileMenuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 w-full h-screen bg-[#050505] z-40 flex flex-col items-center justify-start pt-28 pb-10 overflow-y-auto transition-all duration-700 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6 w-full max-w-sm px-6 text-center">
          {activeNavigationItems.map((item, index) => {
            if (item.megaMenu) {
              const isDropdownOpen = !!mobileDropdowns[item.label || item.name];
              return (
                <div 
                  key={item.label || item.name} 
                  className="flex flex-col items-center"
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: 'all 0.5s ease-out'
                  }}
                >
                  <button 
                    onClick={() => toggleMobileDropdown(item.label || item.name)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center justify-center gap-2 text-2xl uppercase tracking-[0.25em] font-light text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <span>{item.label || item.name}</span>
                    <svg 
                      className={cn(
                        "w-4 h-4 transition-transform duration-300", 
                        isDropdownOpen ? "rotate-180 text-white" : "text-neutral-500"
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={cn(
                      "flex flex-col gap-3 transition-all duration-500 ease-in-out overflow-hidden mt-3 w-full bg-white/[0.02] border border-white/5 rounded-xl px-4",
                      isDropdownOpen ? "max-h-[800px] py-4 opacity-100" : "max-h-0 py-0 opacity-0 border-none"
                    )}
                  >
                    {item.megaMenu.map((cat, catIdx) => {
                      const catUrl = cat.href || getCategoryUrl(cat.category);
                      return (
                        <div key={catIdx} className="flex flex-col gap-2 mb-4 last:mb-0 text-left">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1">
                            <button
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                if (catUrl) navigateTo(catUrl);
                              }}
                              className="text-white text-xs font-semibold uppercase tracking-widest text-left hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              {cat.category}
                            </button>
                            <button
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                if (catUrl) navigateTo(catUrl);
                              }}
                              className="text-[9px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider cursor-pointer"
                            >
                              View All →
                            </button>
                          </div>
                          {cat.items.map((subItem, idx) => {
                            const isSubFranchise = (subItem.label || subItem.name)?.toLowerCase().includes('franchise');
                            return (
                              <a
                                key={idx}
                                href={isSubFranchise ? "/franchise" : subItem.href}
                                onClick={(e) => {
                                  if (!isSubFranchise) {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    navigateTo(subItem.href);
                                  }
                                }}
                                className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-500 hover:text-white transition-colors duration-300 py-1.5 cursor-pointer block"
                              >
                                {subItem.label || subItem.name}
                              </a>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (item.dropdown) {
              const isDropdownOpen = !!mobileDropdowns[item.label || item.name];
              return (
                <div 
                  key={item.label || item.name} 
                  className="flex flex-col items-center"
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: 'all 0.5s ease-out'
                  }}
                >
                  <button 
                    onClick={() => toggleMobileDropdown(item.label || item.name)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center justify-center gap-2 text-2xl uppercase tracking-[0.25em] font-light text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <span>{item.label || item.name}</span>
                    <svg 
                      className={cn(
                        "w-4 h-4 transition-transform duration-300", 
                        isDropdownOpen ? "rotate-180 text-white" : "text-neutral-500"
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={cn(
                      "flex flex-col gap-3 transition-all duration-500 ease-in-out overflow-hidden mt-3 w-full bg-white/[0.02] border border-white/5 rounded-xl px-4",
                      isDropdownOpen ? "max-h-[350px] py-4 opacity-100" : "max-h-0 py-0 opacity-0 border-none"
                    )}
                  >
                    {item.dropdown.map((subItem) => {
                      const isSubFranchise = (subItem.label || subItem.name)?.toLowerCase().includes('franchise') || subItem.href?.toLowerCase().includes('franchise');
                      return (
                        <a
                          key={subItem.label || subItem.name}
                          href={isSubFranchise ? "/franchise" : subItem.href}
                          target={isSubFranchise ? "_blank" : undefined}
                          rel={isSubFranchise ? "noopener noreferrer" : undefined}
                          onClick={(e) => handleLinkClick(isSubFranchise ? '/franchise' : subItem.href, e, isSubFranchise)}
                          className="text-xs uppercase tracking-[0.2em] font-light text-neutral-500 hover:text-white transition-colors duration-300 py-2 cursor-pointer block"
                        >
                          {subItem.label || subItem.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isFranchise = (item.label || item.name)?.toLowerCase().includes('franchise') || item.href?.toLowerCase().includes('franchise');
            return (
              <a
                key={item.label || item.name}
                href={isFranchise ? "/franchise" : item.href}
                target={isFranchise ? "_blank" : undefined}
                rel={isFranchise ? "noopener noreferrer" : undefined}
                onClick={(e) => handleLinkClick(isFranchise ? '/franchise' : item.href, e, isFranchise)}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: 'all 0.5s ease-out'
                }}
                className="text-2xl uppercase tracking-[0.25em] font-light text-neutral-400 hover:text-white transition-all duration-500 cursor-pointer block"
              >
                {item.label || item.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Admin Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="w-[90%] max-w-md bg-[#080808]/90 border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden group">
            {/* Glow accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col space-y-6">
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-light block mb-2">// ACCESS PORTAL</span>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">Enter credentials</h3>
                <p className="text-xs text-neutral-400 font-light">Administrative access to HariKrushn Digiverse system.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="PASSWORD"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#101010]/80 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-all duration-300 font-mono tracking-widest text-center"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-red-500 font-mono text-center">{authError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setPasswordInput('');
                      setAuthError('');
                      setShowPassword(false);
                    }}
                    className="w-1/2 px-6 py-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] rounded-xl text-neutral-400 hover:text-white transition-all duration-300 text-xs font-mono tracking-widest uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-1/2 px-6 py-3 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-600 transition-all duration-300 rounded-xl text-xs font-mono tracking-widest uppercase font-semibold cursor-pointer"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
