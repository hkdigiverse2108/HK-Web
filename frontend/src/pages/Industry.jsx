import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const resolveImageUrl = (imgSrc) => {
  if (!imgSrc) return '';
  const normalizedSrc = imgSrc.replace(/\\/g, '/');
  if (normalizedSrc.startsWith('http://') || normalizedSrc.startsWith('https://') || normalizedSrc.startsWith('data:')) {
    return normalizedSrc;
  }
  const cleanSrc = normalizedSrc.startsWith('/') ? normalizedSrc : '/' + normalizedSrc;
  if (cleanSrc.startsWith('/uploads')) {
    return `${API_URL}${cleanSrc}`;
  }
  return cleanSrc;
};

/* ────────────────────────── 28 INDUSTRIES DATA (FALLBACK) ────────────────────────── */
const DEFAULT_INDUSTRIES = [
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    title: 'Manufacturing & Heavy Industries',
    description: 'Smart plant dashboards, automated raw material trackers, and custom ERP software.',
    detailDescription: 'We architect shop-floor monitoring systems, automated supplier procurement networks, and predictive machine maintenance portals that streamline multi-unit plant operations, reduce costly downtime, and keep material inventory tightly synced.',
    listImg: '/media/images/industries/manufacturing.png',
    detailImg: '/media/images/industries/manufacturing.png',
    bg: 'from-amber-500/10 to-orange-500/10',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    glowClass: 'rgba(245,158,11,0.06)',
    accentColor: '#f59e0b',
    metrics: [
      { label: 'Downtime Reduction', value: '42%' },
      { label: 'Inventory Accuracy', value: '99.4%' }
    ],
    sort_order: 1
  },
  {
    id: 'hotels-resorts',
    slug: 'hotels-resorts',
    title: 'Hotels & Luxury Resorts',
    description: 'Direct guest booking engines, mobile concierge apps, and dynamic room tariff controllers.',
    detailDescription: 'We build high-converting direct reservation platforms, multilingual guest check-in mobile apps, and automated rate distribution dashboards that increase direct booker revenue and deliver seamless hospitality from arrival to departure.',
    listImg: '/media/images/industries/hotels_resorts.png',
    detailImg: '/media/images/industries/hotels_resorts.png',
    bg: 'from-teal-500/10 to-emerald-500/10',
    colorClass: 'text-teal-400',
    borderClass: 'border-teal-500/20',
    glowClass: 'rgba(20,184,166,0.06)',
    accentColor: '#14b8a6',
    metrics: [
      { label: 'Direct Bookings Lift', value: '+35%' },
      { label: 'Guest Satisfaction', value: '4.9/5' }
    ],
    sort_order: 2
  },
  {
    id: 'restaurants-cafes',
    slug: 'restaurants-cafes',
    title: 'Restaurants & Cafes',
    description: 'Contactless QR ordering, cloud POS sync, kitchen display feeds, and loyalty rewards.',
    detailDescription: 'We develop fast digital ordering interfaces, table reservation matrices, real-time kitchen display units (KDU), and personalized loyalty programs that boost diner retention and lower dependency on third-party aggregator apps.',
    listImg: '/media/images/industries/restaurants_cafes.png',
    detailImg: '/media/images/industries/restaurants_cafes.png',
    bg: 'from-orange-500/10 to-amber-500/10',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-500/20',
    glowClass: 'rgba(249,115,22,0.06)',
    accentColor: '#f97316',
    metrics: [
      { label: 'Table Turnaround Speed', value: '-18 min' },
      { label: 'Repeat Customer Rate', value: '48%' }
    ],
    sort_order: 3
  },
  {
    id: 'realestate',
    slug: 'realestate',
    title: 'Real Estate & Properties',
    description: '3D virtual project walkthroughs, interactive plot maps, and automated broker CRMs.',
    detailDescription: 'We craft cinematic property viewing platforms, interactive vector masterplans, and intelligent broker lead management CRMs designed to accelerate pre-launch unit bookings and streamline buyer documentation.',
    listImg: '/media/images/industries/realestate.png',
    detailImg: '/media/images/industries/realestate.png',
    bg: 'from-blue-500/10 to-indigo-500/10',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/20',
    glowClass: 'rgba(59,130,246,0.06)',
    accentColor: '#3b82f6',
    metrics: [
      { label: 'Renderings Delivered', value: '2,500+' },
      { label: 'Lead-to-Visit Ratio', value: '28%' }
    ],
    sort_order: 4
  },
  {
    id: 'education',
    slug: 'education',
    title: 'Education & Institutes',
    description: 'Modern learning management systems, live classroom portals, and student records.',
    detailDescription: 'We build scalable LMS platforms, parent-teacher collaboration portals, real-time fee payment gateways, and automated examination analytics for schools, universities, and competitive coaching academies.',
    listImg: '/media/images/industries/education.png',
    detailImg: '/media/images/industries/education.png',
    bg: 'from-rose-500/10 to-pink-500/10',
    colorClass: 'text-rose-400',
    borderClass: 'border-rose-500/20',
    glowClass: 'rgba(244,63,94,0.06)',
    accentColor: '#f43f5e',
    metrics: [
      { label: 'Active Learners', value: '65K+' },
      { label: 'Fee Collection Rate', value: '99.1%' }
    ],
    sort_order: 5
  },
  {
    id: 'fashion-clothing',
    slug: 'fashion-clothing',
    title: 'Fashion & Clothing',
    description: 'Editorial D2C storefronts, interactive lookbooks, and omnichannel inventory sync.',
    detailDescription: 'We create high-converting fashion commerce websites, dynamic size-and-fit recommenders, automated collection drops, and warehouse-to-store inventory syncing engines that elevate boutique and enterprise apparel brands.',
    listImg: '/media/images/industries/fashion_clothing.png',
    detailImg: '/media/images/industries/fashion_clothing.png',
    bg: 'from-fuchsia-500/10 to-pink-500/10',
    colorClass: 'text-fuchsia-400',
    borderClass: 'border-fuchsia-500/20',
    glowClass: 'rgba(217,70,239,0.06)',
    accentColor: '#d946ef',
    metrics: [
      { label: 'Cart Conversion Lift', value: '+31%' },
      { label: 'Return Rate Reduction', value: '22%' }
    ],
    sort_order: 6
  },
  {
    id: 'cosmetics-beauty',
    slug: 'cosmetics-beauty',
    title: 'Cosmetics & Beauty',
    description: 'Personalized skincare routine quizzes, bundle builders, and subscription stores.',
    detailDescription: 'We engineer aesthetic beauty storefronts with AI-powered skin shade matchers, customized product bundling tools, automated auto-replenishment subscriptions, and influencer affiliate management systems.',
    listImg: '/media/images/industries/cosmetics_beauty.png',
    detailImg: '/media/images/industries/cosmetics_beauty.png',
    bg: 'from-pink-500/10 to-rose-500/10',
    colorClass: 'text-pink-400',
    borderClass: 'border-pink-500/20',
    glowClass: 'rgba(236,72,153,0.06)',
    accentColor: '#ec4899',
    metrics: [
      { label: 'Average Order Value', value: '+44%' },
      { label: 'Subscriber Retention', value: '88%' }
    ],
    sort_order: 7
  },
  {
    id: 'retail-supermarkets',
    slug: 'retail-supermarkets',
    title: 'Retail & Supermarkets',
    description: 'Multi-outlet barcode billing, local delivery apps, and WhatsApp loyalty automation.',
    detailDescription: 'We develop fast retail POS integrations, centralized multi-store inventory sync, local quick-delivery customer applications, and automated WhatsApp order updates that keep neighbourhood stores ahead of large chains.',
    listImg: '/media/images/industries/retail_supermarkets.png',
    detailImg: '/media/images/industries/retail_supermarkets.png',
    bg: 'from-emerald-500/10 to-green-500/10',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    glowClass: 'rgba(16,185,129,0.06)',
    accentColor: '#10b981',
    metrics: [
      { label: 'Billing Speed', value: '3x Faster' },
      { label: 'Stock Out Reduction', value: '65%' }
    ],
    sort_order: 8
  },
  {
    id: 'construction',
    slug: 'construction',
    title: 'Construction & Infrastructure',
    description: 'Site milestone monitors, contractor sub-contracting portals, and BOQ cost tools.',
    detailDescription: 'We construct field engineer mobile trackers, digital project milestone approvals, automated Bill of Quantities (BOQ) cost calculation engines, and vendor payment verification dashboards for developers and infrastructure contractors.',
    listImg: '/media/images/industries/construction.png',
    detailImg: '/media/images/industries/construction.png',
    bg: 'from-yellow-500/10 to-amber-500/10',
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-500/20',
    glowClass: 'rgba(234,179,8,0.06)',
    accentColor: '#eab308',
    metrics: [
      { label: 'Projects Tracked', value: '180+' },
      { label: 'Cost Overrun Savings', value: '19%' }
    ],
    sort_order: 9
  },
  {
    id: 'automobile-dealers',
    slug: 'automobile-dealers',
    title: 'Automobile & Dealerships',
    description: '360-degree vehicle showcases, test drive scheduling, and automated service reminders.',
    detailDescription: 'We build interactive 360-degree vehicle visualizers, instant test-drive booking modules, digital trade-in valuation forms, and automated vehicle service reminder systems for auto dealerships and showroom networks.',
    listImg: '/media/images/industries/automobile_dealers.png',
    detailImg: '/media/images/industries/automobile_dealers.png',
    bg: 'from-red-500/10 to-orange-500/10',
    colorClass: 'text-red-400',
    borderClass: 'border-red-500/20',
    glowClass: 'rgba(239,68,68,0.06)',
    accentColor: '#ef4444',
    metrics: [
      { label: 'Test Drive Bookings', value: '4,200+' },
      { label: 'Service Retention', value: '78%' }
    ],
    sort_order: 10
  },
  {
    id: 'pharma',
    slug: 'pharma',
    title: 'Pharma & Life Sciences',
    description: 'Batch expiry trackers, distributor order networks, and healthcare compliance portals.',
    detailDescription: 'We engineer regulatory-compliant pharmaceutical portals, batch code traceability pipelines, distributor order fulfillment apps, and doctor product information portals tailored for pharmaceutical manufacturers and marketing divisions.',
    listImg: '/media/images/industries/pharma.png',
    detailImg: '/media/images/industries/pharma.png',
    bg: 'from-cyan-500/10 to-blue-500/10',
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/20',
    glowClass: 'rgba(6,182,212,0.06)',
    accentColor: '#06b6d4',
    metrics: [
      { label: 'Batch Audit Passing', value: '100%' },
      { label: 'Distributor Sync Speed', value: 'Realtime' }
    ],
    sort_order: 11
  },
  {
    id: 'packaging',
    slug: 'packaging',
    title: 'Packaging & Industrial Printing',
    description: 'Dynamic box dimension customizers, instant automated quote engines, and job trackers.',
    detailDescription: 'We create 3D packaging preview configurators, GSM-and-ply automated cost estimation engines, and live job-card production status boards for corrugated box, mono-carton, and flexible packaging manufacturers.',
    listImg: '/media/images/industries/packaging.png',
    detailImg: '/media/images/industries/packaging.png',
    bg: 'from-amber-500/10 to-yellow-500/10',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    glowClass: 'rgba(245,158,11,0.06)',
    accentColor: '#f59e0b',
    metrics: [
      { label: 'Quote Turnaround Time', value: 'Instant' },
      { label: 'Waste Reduction', value: '24%' }
    ],
    sort_order: 12
  },
  {
    id: 'logistics-transport',
    slug: 'logistics-transport',
    title: 'Logistics & Transport',
    description: 'GPS fleet telemetry, smart route optimization, driver apps, and client parcel tracking.',
    detailDescription: 'We build real-time GPS fleet dashboards, AI-driven vehicle route dispatch systems, driver proof-of-delivery (POD) scanners, and customer tracking portals that minimize fuel costs and improve delivery punctuality.',
    listImg: '/media/images/industries/logistics_transport.png',
    detailImg: '/media/images/industries/logistics_transport.png',
    bg: 'from-orange-500/10 to-red-500/10',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-500/20',
    glowClass: 'rgba(249,115,22,0.06)',
    accentColor: '#f97316',
    metrics: [
      { label: 'Fleet Miles Optimized', value: '2.4M+' },
      { label: 'On-Time Dispatch', value: '98.8%' }
    ],
    sort_order: 13
  },
  {
    id: 'finance-ca-firms',
    slug: 'finance-ca-firms',
    title: 'Finance & CA Firms',
    description: 'Encrypted client document vaults, GST/tax filing trackers, and advisory portals.',
    detailDescription: 'We build bank-grade encrypted document collection vaults, automated tax milestone notifications, client balance sheet dashboards, and secure billing portals tailored for chartered accountants, auditors, and financial planners.',
    listImg: '/media/images/industries/finance_ca_firms.png',
    detailImg: '/media/images/industries/finance_ca_firms.png',
    bg: 'from-emerald-500/10 to-teal-500/10',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    glowClass: 'rgba(16,185,129,0.06)',
    accentColor: '#10b981',
    metrics: [
      { label: 'Documents Encrypted', value: '500K+' },
      { label: 'Compliance Accuracy', value: '100%' }
    ],
    sort_order: 14
  },
  {
    id: 'legal-firms',
    slug: 'legal-firms',
    title: 'Legal Firms & Attorneys',
    description: 'Confidential case file managers, hearing schedule calendars, and digital retainer signing.',
    detailDescription: 'We create highly secure client onboarding portals, hearing date calendar integrations with automated court diary sync, digital contract signing workflows, and automated time-tracking billing for law firms and corporate legal counsels.',
    listImg: '/media/images/industries/legal_firms.png',
    detailImg: '/media/images/industries/legal_firms.png',
    bg: 'from-indigo-500/10 to-purple-500/10',
    colorClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/20',
    glowClass: 'rgba(99,102,241,0.06)',
    accentColor: '#6366f1',
    metrics: [
      { label: 'Case Matters Managed', value: '12,000+' },
      { label: 'Data Privacy Rating', value: 'Tier-1' }
    ],
    sort_order: 15
  },
  {
    id: 'corporate-b2b',
    slug: 'corporate-b2b',
    title: 'Corporate & B2B Services',
    description: 'Enterprise client portals, RFP quote generators, and automated SLA dashboards.',
    detailDescription: 'We construct enterprise client collaboration workspaces, automated proposal and contract generators, project deliverable review matrices, and SLA performance dashboards for B2B consultancies and professional service firms.',
    listImg: '/media/images/industries/corporate_b2b.png',
    detailImg: '/media/images/industries/corporate_b2b.png',
    bg: 'from-slate-500/10 to-neutral-500/10',
    colorClass: 'text-neutral-300',
    borderClass: 'border-white/20',
    glowClass: 'rgba(255,255,255,0.06)',
    accentColor: '#e5e5e5',
    metrics: [
      { label: 'Proposals Dispatched', value: '8,500+' },
      { label: 'Client Retention Rate', value: '96%' }
    ],
    sort_order: 16
  },
  {
    id: 'travel-tourism',
    slug: 'travel-tourism',
    title: 'Travel & Tourism',
    description: 'Custom tour itinerary builders, multi-currency booking engines, and visa assistance.',
    detailDescription: 'We engineer dynamic travel itinerary planners, multi-supplier airline/hotel API integration engines, automated voucher generation, and secure multi-currency payment checkout flows for travel agencies and destination management companies.',
    listImg: '/media/images/industries/travel_tourism.png',
    detailImg: '/media/images/industries/travel_tourism.png',
    bg: 'from-sky-500/10 to-teal-500/10',
    colorClass: 'text-sky-400',
    borderClass: 'border-sky-500/20',
    glowClass: 'rgba(14,165,233,0.06)',
    accentColor: '#0ea5e9',
    metrics: [
      { label: 'Itineraries Booked', value: '45K+' },
      { label: 'Booking Conversion', value: '+38%' }
    ],
    sort_order: 17
  },
  {
    id: 'wedding-event',
    slug: 'wedding-event',
    title: 'Wedding & Event Management',
    description: 'Interactive guest RSVP portals, vendor coordination boards, and live event photo hubs.',
    detailDescription: 'We craft branded wedding guest portals with digital invites, seating arrangement planners, vendor coordination dashboards, and real-time event photo sharing galleries that make large-scale celebrations effortless to coordinate.',
    listImg: '/media/images/industries/wedding_event.png',
    detailImg: '/media/images/industries/wedding_event.png',
    bg: 'from-rose-500/10 to-amber-500/10',
    colorClass: 'text-rose-400',
    borderClass: 'border-rose-500/20',
    glowClass: 'rgba(244,63,94,0.06)',
    accentColor: '#f43f5e',
    metrics: [
      { label: 'Events Managed', value: '350+' },
      { label: 'RSVP Response Rate', value: '94%' }
    ],
    sort_order: 18
  },
  {
    id: 'furniture-interior',
    slug: 'furniture-interior',
    title: 'Furniture & Interior Design',
    description: '3D room staging previewers, custom modular furniture quote tools, and design portfolios.',
    detailDescription: 'We create interactive 3D modular furniture customizers, interior project portfolio showcases, instant material cost estimators, and on-site project progress trackers for architecture firms and luxury furniture studios.',
    listImg: '/media/images/industries/furniture_interior.png',
    detailImg: '/media/images/industries/furniture_interior.png',
    bg: 'from-amber-500/10 to-stone-500/10',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    glowClass: 'rgba(245,158,11,0.06)',
    accentColor: '#f59e0b',
    metrics: [
      { label: '3D Visualizations Rendered', value: '15,000+' },
      { label: 'Deal Closing Speed', value: '2x Faster' }
    ],
    sort_order: 19
  },
  {
    id: 'solar-renewable',
    slug: 'solar-renewable',
    title: 'Solar & Renewable Energy',
    description: 'Rooftop solar ROI calculators, subsidy lead generators, and panel telemetry trackers.',
    detailDescription: 'We develop rooftop solar feasibility calculators, automated government subsidy application trackers, field survey mobile tools, and solar generation telemetry dashboards for EPC contractors and clean-energy providers.',
    listImg: '/media/images/industries/solar_renewable.png',
    detailImg: '/media/images/industries/solar_renewable.png',
    bg: 'from-yellow-500/10 to-green-500/10',
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-500/20',
    glowClass: 'rgba(234,179,8,0.06)',
    accentColor: '#eab308',
    metrics: [
      { label: 'Solar KW Calculated', value: '45 MW+' },
      { label: 'Lead-to-Survey Rate', value: '34%' }
    ],
    sort_order: 20
  },
  {
    id: 'agriculture-agro',
    slug: 'agriculture-agro',
    title: 'Agriculture & Agro Products',
    description: 'Farm-to-fork traceability portals, APMC mandi rate aggregation, and agro input apps.',
    detailDescription: 'We engineer farm-to-fork batch traceability portals, live APMC/Mandi rate aggregation dashboards, agro-chemical distributor order apps, and cold-storage inventory monitoring tools for agricultural exporters and FPOs.',
    listImg: '/media/images/industries/agriculture_agro.png',
    detailImg: '/media/images/industries/agriculture_agro.png',
    bg: 'from-green-500/10 to-emerald-500/10',
    colorClass: 'text-green-400',
    borderClass: 'border-green-500/20',
    glowClass: 'rgba(34,197,94,0.06)',
    accentColor: '#22c55e',
    metrics: [
      { label: 'Farmers Connected', value: '30,000+' },
      { label: 'Price Transparency', value: '100% Realtime' }
    ],
    sort_order: 21
  },
  {
    id: 'fmcg-consumer-brands',
    slug: 'fmcg-consumer-brands',
    title: 'FMCG & Consumer Brands',
    description: 'Secondary sales tracking apps, retail scheme engines, and D2C online channels.',
    detailDescription: 'We build field sales representative order capture apps, distributor billing matrices, retail trade scheme calculators, and direct-to-consumer digital commerce platforms for growing consumer packaged goods brands.',
    listImg: '/media/images/industries/fmcg_consumer_brands.png',
    detailImg: '/media/images/industries/fmcg_consumer_brands.png',
    bg: 'from-teal-500/10 to-cyan-500/10',
    colorClass: 'text-teal-400',
    borderClass: 'border-teal-500/20',
    glowClass: 'rgba(20,184,166,0.06)',
    accentColor: '#14b8a6',
    metrics: [
      { label: 'Retail Outlets Reached', value: '85,000+' },
      { label: 'Order Sync Latency', value: '< 1 Sec' }
    ],
    sort_order: 22
  },
  {
    id: 'electronics-mobile',
    slug: 'electronics-mobile',
    title: 'Electronics & Mobile',
    description: 'Specification comparison portals, serial warranty registers, and repair ticket hubs.',
    detailDescription: 'We craft tech spec comparison engines, serial number warranty verification systems, repair ticket progress tracking apps, and EMI / finance eligibility calculators for electronics retailers and regional gadget brands.',
    listImg: '/media/images/industries/electronics_mobile.png',
    detailImg: '/media/images/industries/electronics_mobile.png',
    bg: 'from-blue-500/10 to-cyan-500/10',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/20',
    glowClass: 'rgba(59,130,246,0.06)',
    accentColor: '#3b82f6',
    metrics: [
      { label: 'Warranties Registered', value: '120K+' },
      { label: 'Repair Turnaround', value: '-35% Time' }
    ],
    sort_order: 23
  },
  {
    id: 'gym-fitness',
    slug: 'gym-fitness',
    title: 'Gym & Fitness Centers',
    description: 'Mobile membership pass QR check-ins, automated subscription debits, and diet planners.',
    detailDescription: 'We create mobile membership pass apps with QR check-in, automated monthly subscription debit systems, personalized workout/diet chart delivery, and trainer booking portals for fitness centers and crossfit gyms.',
    listImg: '/media/images/industries/gym_fitness.png',
    detailImg: '/media/images/industries/gym_fitness.png',
    bg: 'from-red-500/10 to-pink-500/10',
    colorClass: 'text-red-400',
    borderClass: 'border-red-500/20',
    glowClass: 'rgba(239,68,68,0.06)',
    accentColor: '#ef4444',
    metrics: [
      { label: 'Members Managed', value: '18,000+' },
      { label: 'Renewal Rate Lift', value: '+29%' }
    ],
    sort_order: 24
  },
  {
    id: 'wellness-lifestyle',
    slug: 'wellness-lifestyle',
    title: 'Wellness & Lifestyle',
    description: 'Spa appointment schedulers, therapist calendars, and curated wellness retail stores.',
    detailDescription: 'We develop intuitive treatment booking portals, therapist availability managers, customized wellness package builders, and curated organic lifestyle retail stores for wellness retreats, yoga studios, and ayurvedic spas.',
    listImg: '/media/images/industries/wellness_lifestyle.png',
    detailImg: '/media/images/industries/wellness_lifestyle.png',
    bg: 'from-emerald-500/10 to-teal-500/10',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    glowClass: 'rgba(16,185,129,0.06)',
    accentColor: '#10b981',
    metrics: [
      { label: 'Appointments Booked', value: '60K+' },
      { label: 'Repeat Visits', value: '52%' }
    ],
    sort_order: 25
  },
  {
    id: 'pet-care',
    slug: 'pet-care',
    title: 'Pet Care & Veterinary',
    description: 'Veterinary consultation schedulers, pet medical history vaults, and food subscriptions.',
    detailDescription: 'We build veterinary consultation booking systems, digital vaccination history records, pet grooming scheduling calendars, and automated pet nutrition subscription checkouts for pet clinics and pet supply retailers.',
    listImg: '/media/images/industries/pet_care.png',
    detailImg: '/media/images/industries/pet_care.png',
    bg: 'from-amber-500/10 to-orange-500/10',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    glowClass: 'rgba(245,158,11,0.06)',
    accentColor: '#f59e0b',
    metrics: [
      { label: 'Pets Registered', value: '14,500+' },
      { label: 'Vaccine Reminder Sync', value: '97%' }
    ],
    sort_order: 26
  },
  {
    id: 'coworking-commercial',
    slug: 'coworking-commercial',
    title: 'Co-working & Commercial Spaces',
    description: 'Hot desk / meeting room bookers, access control sync, and automated tenant invoicing.',
    detailDescription: 'We construct real-time meeting room and hot-desk reservation portals, automated monthly tenant invoice generation, visitor log management, and community networking boards for flexible workspaces and commercial business parks.',
    listImg: '/media/images/industries/coworking_commercial.png',
    detailImg: '/media/images/industries/coworking_commercial.png',
    bg: 'from-indigo-500/10 to-blue-500/10',
    colorClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/20',
    glowClass: 'rgba(99,102,241,0.06)',
    accentColor: '#6366f1',
    metrics: [
      { label: 'Desks Managed', value: '8,200+' },
      { label: 'Occupancy Rate', value: '92%' }
    ],
    sort_order: 27
  },
  {
    id: 'import-export',
    slug: 'import-export',
    title: 'Import & Export Trading',
    description: 'Live container cargo trackers, customs document generators, and forex rate quoters.',
    detailDescription: 'We engineer live container freight tracking portals, automated commercial invoice and packing list generators, live forex currency converters, and global buyer enquiry portals for international trading houses and clearing agents.',
    listImg: '/media/images/industries/import_export.png',
    detailImg: '/media/images/industries/import_export.png',
    bg: 'from-cyan-500/10 to-teal-500/10',
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/20',
    glowClass: 'rgba(6,182,212,0.06)',
    accentColor: '#06b6d4',
    metrics: [
      { label: 'Containers Tracked', value: '25,000+' },
      { label: 'Documentation Speed', value: '4x Faster' }
    ],
    sort_order: 28
  }
];

export default function Industry() {
  const { content } = useContent();
  const sv = content?.site_settings?.section_visibility || {};
  if (sv.industry_grid === false) return null;

  // Fully dynamic from database, falling back only if database query is loading or empty
  const rawIndustries = (content?.industries && content.industries.length > 0) 
    ? content.industries 
    : DEFAULT_INDUSTRIES;

  const industries = rawIndustries.map(ind => {
    const fallback = DEFAULT_INDUSTRIES.find(x => x.slug === ind.slug || x.id === ind.slug || x.id === ind.id) || DEFAULT_INDUSTRIES[0];
    return {
      ...fallback,
      ...ind,
      id: ind.slug || ind.id || fallback.id,
      listImg: ind.listImg || fallback.listImg,
      detailImg: ind.detailImg || fallback.detailImg
    };
  });

  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]?.id || 'manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const detailsRef = useRef(null);

  // Synchronize hash params
  useEffect(() => {
    const parseHashParam = () => {
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const queryString = hash.split('?')[1];
        const params = new URLSearchParams(queryString);
        const type = params.get('type');
        if (type && industries.some(i => i.id === type)) {
          setSelectedIndustry(type);
          return;
        }
      }
      if (industries.length > 0) {
        setSelectedIndustry(prev => (industries.some(i => i.id === prev) ? prev : industries[0].id));
      }
    };

    parseHashParam();
    window.addEventListener('hashchange', parseHashParam);
    return () => window.removeEventListener('hashchange', parseHashParam);
  }, [content?.industries]);

  const handleSelectIndustry = (id) => {
    setSelectedIndustry(id);
    window.location.hash = `#industry?type=${id}`;
    
    // Smooth scroll to details on mobile screens
    if (window.innerWidth < 1024) {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeInd = industries.find(i => i.id === selectedIndustry) || industries[0];
  const projectsList = content?.industry_projects || [];
  const filteredProjects = projectsList.filter(p => p.industryId === selectedIndustry || p.industryId === activeInd?.id || p.industryId === activeInd?.slug);

  // Search filter
  const filteredIndustries = industries.filter(ind => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (ind.title && ind.title.toLowerCase().includes(q)) ||
      (ind.description && ind.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative pb-24 overflow-hidden text-neutral-300 font-sans min-h-screen">
      
      {/* Background ambient glows */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[140px] pointer-events-none transition-all duration-1000 ease-in-out" 
        style={{ backgroundColor: activeInd?.glowClass || 'rgba(16,185,129,0.06)', opacity: 0.5 }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full filter blur-[120px] pointer-events-none transition-all duration-1000 ease-in-out" 
        style={{ backgroundColor: activeInd?.glowClass || 'rgba(16,185,129,0.06)', opacity: 0.3 }}
      />

      {/* Header Section */}
      <div className="text-center mb-16 pt-8 relative z-10 px-4">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-neutral-500 font-light block mb-3">
          // Verticals We Scale ({industries.length} Industries)
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Industries We Serve
        </h1>
        <p className="font-light text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From high-volume manufacturing to luxury retail and direct consumer brands, explore custom digital systems, production architectures, and real-world outcomes tailored for each domain.
        </p>
      </div>

      {/* ──────────────────────────────────────────────────
          SPLIT SCREEN MASTER-DETAIL CONTAINER
          ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 items-start">
        
        {/* Left Side (5 Columns) - Master Industry List */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Header & Quick Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#08080c]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white font-bold block">Select Industry</span>
              <span className="font-mono text-[9px] text-neutral-500 block">{filteredIndustries.length} available</span>
            </div>
            
            <div className="relative flex-1 sm:max-w-[220px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search industry..."
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Industry Cards List */}
          <div className="space-y-3 lg:max-h-[920px] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
            {filteredIndustries.map((ind) => {
              const isSelected = selectedIndustry === ind.id;
              const resolvedSrc = resolveImageUrl(ind.listImg);
              
              return (
                <div
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex gap-4 items-center cursor-pointer select-none text-left relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-[#0b0b12] border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
                      : 'bg-[#06060a]/60 border-white/5 hover:border-white/15 hover:bg-[#09090f]'
                  }`}
                >
                  {/* Accent border glow (Active state) */}
                  {isSelected && (
                    <div 
                      className="absolute left-0 inset-y-0 w-[4px]" 
                      style={{ backgroundColor: ind.accentColor || '#10b981' }}
                    />
                  )}

                  {/* Industry List Image Preview */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 relative bg-neutral-900 flex items-center justify-center">
                    <img 
                      src={resolvedSrc} 
                      alt={ind.title} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className={`w-full h-full object-cover transition-all duration-500 ${isSelected ? 'scale-105' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}`}
                    />
                  </div>

                  {/* Details Summary */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-display text-sm sm:text-base font-bold transition-colors truncate ${
                        isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                      }`}>
                        {ind.title}
                      </h3>
                      {isSelected && (
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: ind.accentColor || '#10b981' }}
                        />
                      )}
                    </div>
                    <p className="font-light text-neutral-400 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {ind.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredIndustries.length === 0 && (
              <div className="p-8 text-center bg-white/[0.01] border border-white/5 rounded-2xl">
                <p className="font-mono text-xs text-neutral-500">No industry matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs text-amber-400 hover:underline font-mono"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side (7 Columns) - Detail Panel (Sticky on Desktop) */}
        <div 
          ref={detailsRef}
          className="lg:col-span-7 bg-[#08080d]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[550px] flex flex-col justify-between lg:sticky lg:top-24"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInd.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 text-left"
            >
              {/* Header section containing Full Frame Image Showcase */}
              <div className="space-y-6">
                <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 relative bg-neutral-900 shadow-xl group">
                  <img 
                    src={resolveImageUrl(activeInd.detailImg)} 
                    alt={activeInd.title} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/40 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <span 
                      className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 border border-white/10 inline-block mb-2 backdrop-blur-md"
                      style={{ color: activeInd.accentColor || '#10b981' }}
                    >
                      // {activeInd.title}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activeInd.title}
                    </h2>
                  </div>
                </div>
                
                <p className="font-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {activeInd.detailDescription}
                </p>
              </div>

              {/* Dynamic metrics block */}
              {activeInd.metrics && activeInd.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
                  {activeInd.metrics.map((m) => (
                    <div key={m.label} className="space-y-1 bg-white/[0.01] p-4 rounded-xl border border-white/5">
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-white block" style={{ color: activeInd.accentColor }}>
                        {m.value}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Case Studies / Projects Briefs */}
              <div className="space-y-4">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                  // Delivered Solutions & Case Briefs ({filteredProjects.length > 0 ? filteredProjects.length : 'Bespoke'})
                </h4>
                
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProjects.map((proj) => (
                      <div 
                        key={proj.title}
                        className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 hover:border-white/15 transition-all space-y-2"
                      >
                        <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">{proj.client}</span>
                        <h5 className="font-display font-bold text-xs sm:text-sm text-white">{proj.title}</h5>
                        <p className="font-light text-neutral-400 text-[11px] leading-relaxed line-clamp-3 mb-3">{proj.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(proj.tech || []).map((t) => (
                            <span key={t} className="font-mono text-[7px] text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
                    <p className="font-light text-xs text-neutral-400 leading-relaxed">
                      We build custom software, web platforms, and mobile workflows tailored specifically to {activeInd.title} operations.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Custom ERP', 'Mobile Apps', 'Web Portals', 'Data Analytics', 'API Integrations'].map((tag) => (
                        <span key={tag} className="font-mono text-[8px] text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* CTA Inquire option at bottom */}
          <div className="border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
              Ready to scale your <strong className="text-white">{activeInd.title}</strong> ecosystem?
            </span>
            <a 
              href="#contact" 
              className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-md text-center shrink-0"
            >
              Start Project →
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
