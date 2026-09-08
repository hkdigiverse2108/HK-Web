import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    print("[Error] MONGODB_URI not found in .env")
    sys.exit(1)

INDUSTRIES_28 = [
    {
        "slug": "manufacturing",
        "title": "Manufacturing & Heavy Industries",
        "description": "Smart plant dashboards, automated raw material trackers, and custom ERP software.",
        "detailDescription": "We architect shop-floor monitoring systems, automated supplier procurement networks, and predictive machine maintenance portals that streamline multi-unit plant operations, reduce costly downtime, and keep material inventory tightly synced.",
        "listImg": "/media/images/industries/manufacturing.png",
        "detailImg": "/media/images/industries/manufacturing.png",
        "bg": "from-amber-500/10 to-orange-500/10",
        "colorClass": "text-amber-400",
        "borderClass": "border-amber-500/20",
        "glowClass": "rgba(245,158,11,0.06)",
        "accentColor": "#f59e0b",
        "metrics": [
            {"label": "Downtime Reduction", "value": "42%"},
            {"label": "Inventory Accuracy", "value": "99.4%"}
        ],
        "sort_order": 1
    },
    {
        "slug": "hotels-resorts",
        "title": "Hotels & Luxury Resorts",
        "description": "Direct guest booking engines, mobile concierge apps, and dynamic room tariff controllers.",
        "detailDescription": "We build high-converting direct reservation platforms, multilingual guest check-in mobile apps, and automated rate distribution dashboards that increase direct booker revenue and deliver seamless hospitality from arrival to departure.",
        "listImg": "/media/images/industries/hotels_resorts.png",
        "detailImg": "/media/images/industries/hotels_resorts.png",
        "bg": "from-teal-500/10 to-emerald-500/10",
        "colorClass": "text-teal-400",
        "borderClass": "border-teal-500/20",
        "glowClass": "rgba(20,184,166,0.06)",
        "accentColor": "#14b8a6",
        "metrics": [
            {"label": "Direct Bookings Lift", "value": "+35%"},
            {"label": "Guest Satisfaction", "value": "4.9/5"}
        ],
        "sort_order": 2
    },
    {
        "slug": "restaurants-cafes",
        "title": "Restaurants & Cafes",
        "description": "Contactless QR ordering, cloud POS sync, kitchen display feeds, and loyalty rewards.",
        "detailDescription": "We develop fast digital ordering interfaces, table reservation matrices, real-time kitchen display units (KDU), and personalized loyalty programs that boost diner retention and lower dependency on third-party aggregator apps.",
        "listImg": "/media/images/industries/restaurants_cafes.png",
        "detailImg": "/media/images/industries/restaurants_cafes.png",
        "bg": "from-orange-500/10 to-amber-500/10",
        "colorClass": "text-orange-400",
        "borderClass": "border-orange-500/20",
        "glowClass": "rgba(249,115,22,0.06)",
        "accentColor": "#f97316",
        "metrics": [
            {"label": "Table Turnaround Speed", "value": "-18 min"},
            {"label": "Repeat Customer Rate", "value": "48%"}
        ],
        "sort_order": 3
    },
    {
        "slug": "realestate",
        "title": "Real Estate & Properties",
        "description": "3D virtual project walkthroughs, interactive plot maps, and automated broker CRMs.",
        "detailDescription": "We craft cinematic property viewing platforms, interactive vector masterplans, and intelligent broker lead management CRMs designed to accelerate pre-launch unit bookings and streamline buyer documentation.",
        "listImg": "/media/images/industries/realestate.png",
        "detailImg": "/media/images/industries/realestate.png",
        "bg": "from-blue-500/10 to-indigo-500/10",
        "colorClass": "text-blue-400",
        "borderClass": "border-blue-500/20",
        "glowClass": "rgba(59,130,246,0.06)",
        "accentColor": "#3b82f6",
        "metrics": [
            {"label": "Renderings Delivered", "value": "2,500+"},
            {"label": "Lead-to-Visit Ratio", "value": "28%"}
        ],
        "sort_order": 4
    },
    {
        "slug": "education",
        "title": "Education & Institutes",
        "description": "Modern learning management systems, live classroom portals, and student records.",
        "detailDescription": "We build scalable LMS platforms, parent-teacher collaboration portals, real-time fee payment gateways, and automated examination analytics for schools, universities, and competitive coaching academies.",
        "listImg": "/media/images/industries/education.png",
        "detailImg": "/media/images/industries/education.png",
        "bg": "from-rose-500/10 to-pink-500/10",
        "colorClass": "text-rose-400",
        "borderClass": "border-rose-500/20",
        "glowClass": "rgba(244,63,94,0.06)",
        "accentColor": "#f43f5e",
        "metrics": [
            {"label": "Active Learners", "value": "65K+"},
            {"label": "Fee Collection Rate", "value": "99.1%"}
        ],
        "sort_order": 5
    },
    {
        "slug": "fashion-clothing",
        "title": "Fashion & Clothing",
        "description": "Editorial D2C storefronts, interactive lookbooks, and omnichannel inventory sync.",
        "detailDescription": "We create high-converting fashion commerce websites, dynamic size-and-fit recommenders, automated collection drops, and warehouse-to-store inventory syncing engines that elevate boutique and enterprise apparel brands.",
        "listImg": "/media/images/industries/fashion_clothing.png",
        "detailImg": "/media/images/industries/fashion_clothing.png",
        "bg": "from-fuchsia-500/10 to-pink-500/10",
        "colorClass": "text-fuchsia-400",
        "borderClass": "border-fuchsia-500/20",
        "glowClass": "rgba(217,70,239,0.06)",
        "accentColor": "#d946ef",
        "metrics": [
            {"label": "Cart Conversion Lift", "value": "+31%"},
            {"label": "Return Rate Reduction", "value": "22%"}
        ],
        "sort_order": 6
    },
    {
        "slug": "cosmetics-beauty",
        "title": "Cosmetics & Beauty",
        "description": "Personalized skincare routine quizzes, bundle builders, and subscription stores.",
        "detailDescription": "We engineer aesthetic beauty storefronts with AI-powered skin shade matchers, customized product bundling tools, automated auto-replenishment subscriptions, and influencer affiliate management systems.",
        "listImg": "/media/images/industries/cosmetics_beauty.png",
        "detailImg": "/media/images/industries/cosmetics_beauty.png",
        "bg": "from-pink-500/10 to-rose-500/10",
        "colorClass": "text-pink-400",
        "borderClass": "border-pink-500/20",
        "glowClass": "rgba(236,72,153,0.06)",
        "accentColor": "#ec4899",
        "metrics": [
            {"label": "Average Order Value", "value": "+44%"},
            {"label": "Subscriber Retention", "value": "88%"}
        ],
        "sort_order": 7
    },
    {
        "slug": "retail-supermarkets",
        "title": "Retail & Supermarkets",
        "description": "Multi-outlet barcode billing, local delivery apps, and WhatsApp loyalty automation.",
        "detailDescription": "We develop fast retail POS integrations, centralized multi-store inventory sync, local quick-delivery customer applications, and automated WhatsApp order updates that keep neighbourhood stores ahead of large chains.",
        "listImg": "/media/images/industries/retail_supermarkets.png",
        "detailImg": "/media/images/industries/retail_supermarkets.png",
        "bg": "from-emerald-500/10 to-green-500/10",
        "colorClass": "text-emerald-400",
        "borderClass": "border-emerald-500/20",
        "glowClass": "rgba(16,185,129,0.06)",
        "accentColor": "#10b981",
        "metrics": [
            {"label": "Billing Speed", "value": "3x Faster"},
            {"label": "Stock Out Reduction", "value": "65%"}
        ],
        "sort_order": 8
    },
    {
        "slug": "construction",
        "title": "Construction & Infrastructure",
        "description": "Site milestone monitors, contractor sub-contracting portals, and BOQ cost tools.",
        "detailDescription": "We construct field engineer mobile trackers, digital project milestone approvals, automated Bill of Quantities (BOQ) cost calculation engines, and vendor payment verification dashboards for developers and infrastructure contractors.",
        "listImg": "/media/images/industries/construction.png",
        "detailImg": "/media/images/industries/construction.png",
        "bg": "from-yellow-500/10 to-amber-500/10",
        "colorClass": "text-yellow-400",
        "borderClass": "border-yellow-500/20",
        "glowClass": "rgba(234,179,8,0.06)",
        "accentColor": "#eab308",
        "metrics": [
            {"label": "Projects Tracked", "value": "180+"},
            {"label": "Cost Overrun Savings", "value": "19%"}
        ],
        "sort_order": 9
    },
    {
        "slug": "automobile-dealers",
        "title": "Automobile & Dealerships",
        "description": "360-degree vehicle showcases, test drive scheduling, and automated service reminders.",
        "detailDescription": "We build interactive 360-degree vehicle visualizers, instant test-drive booking modules, digital trade-in valuation forms, and automated vehicle service reminder systems for auto dealerships and showroom networks.",
        "listImg": "/media/images/industries/automobile_dealers.png",
        "detailImg": "/media/images/industries/automobile_dealers.png",
        "bg": "from-red-500/10 to-orange-500/10",
        "colorClass": "text-red-400",
        "borderClass": "border-red-500/20",
        "glowClass": "rgba(239,68,68,0.06)",
        "accentColor": "#ef4444",
        "metrics": [
            {"label": "Test Drive Bookings", "value": "4,200+"},
            {"label": "Service Retention", "value": "78%"}
        ],
        "sort_order": 10
    },
    {
        "slug": "pharma",
        "title": "Pharma & Life Sciences",
        "description": "Batch expiry trackers, distributor order networks, and healthcare compliance portals.",
        "detailDescription": "We engineer regulatory-compliant pharmaceutical portals, batch code traceability pipelines, distributor order fulfillment apps, and doctor product information portals tailored for pharmaceutical manufacturers and marketing divisions.",
        "listImg": "/media/images/industries/pharma.png",
        "detailImg": "/media/images/industries/pharma.png",
        "bg": "from-cyan-500/10 to-blue-500/10",
        "colorClass": "text-cyan-400",
        "borderClass": "border-cyan-500/20",
        "glowClass": "rgba(6,182,212,0.06)",
        "accentColor": "#06b6d4",
        "metrics": [
            {"label": "Batch Audit Passing", "value": "100%"},
            {"label": "Distributor Sync Speed", "value": "Realtime"}
        ],
        "sort_order": 11
    },
    {
        "slug": "packaging",
        "title": "Packaging & Industrial Printing",
        "description": "Dynamic box dimension customizers, instant automated quote engines, and job trackers.",
        "detailDescription": "We create 3D packaging preview configurators, GSM-and-ply automated cost estimation engines, and live job-card production status boards for corrugated box, mono-carton, and flexible packaging manufacturers.",
        "listImg": "/media/images/industries/packaging.png",
        "detailImg": "/media/images/industries/packaging.png",
        "bg": "from-amber-500/10 to-yellow-500/10",
        "colorClass": "text-amber-400",
        "borderClass": "border-amber-500/20",
        "glowClass": "rgba(245,158,11,0.06)",
        "accentColor": "#f59e0b",
        "metrics": [
            {"label": "Quote Turnaround Time", "value": "Instant"},
            {"label": "Waste Reduction", "value": "24%"}
        ],
        "sort_order": 12
    },
    {
        "slug": "logistics-transport",
        "title": "Logistics & Transport",
        "description": "GPS fleet telemetry, smart route optimization, driver apps, and client parcel tracking.",
        "detailDescription": "We build real-time GPS fleet dashboards, AI-driven vehicle route dispatch systems, driver proof-of-delivery (POD) scanners, and customer tracking portals that minimize fuel costs and improve delivery punctuality.",
        "listImg": "/media/images/industries/logistics_transport.png",
        "detailImg": "/media/images/industries/logistics_transport.png",
        "bg": "from-orange-500/10 to-red-500/10",
        "colorClass": "text-orange-400",
        "borderClass": "border-orange-500/20",
        "glowClass": "rgba(249,115,22,0.06)",
        "accentColor": "#f97316",
        "metrics": [
            {"label": "Fleet Miles Optimized", "value": "2.4M+"},
            {"label": "On-Time Dispatch", "value": "98.8%"}
        ],
        "sort_order": 13
    },
    {
        "slug": "finance-ca-firms",
        "title": "Finance & CA Firms",
        "description": "Encrypted client document vaults, GST/tax filing trackers, and advisory portals.",
        "detailDescription": "We build bank-grade encrypted document collection vaults, automated tax milestone notifications, client balance sheet dashboards, and secure billing portals tailored for chartered accountants, auditors, and financial planners.",
        "listImg": "/media/images/industries/finance_ca_firms.png",
        "detailImg": "/media/images/industries/finance_ca_firms.png",
        "bg": "from-emerald-500/10 to-teal-500/10",
        "colorClass": "text-emerald-400",
        "borderClass": "border-emerald-500/20",
        "glowClass": "rgba(16,185,129,0.06)",
        "accentColor": "#10b981",
        "metrics": [
            {"label": "Documents Encrypted", "value": "500K+"},
            {"label": "Compliance Accuracy", "value": "100%"}
        ],
        "sort_order": 14
    },
    {
        "slug": "legal-firms",
        "title": "Legal Firms & Attorneys",
        "description": "Confidential case file managers, hearing schedule calendars, and digital retainer signing.",
        "detailDescription": "We create highly secure client onboarding portals, hearing date calendar integrations with automated court diary sync, digital contract signing workflows, and automated time-tracking billing for law firms and corporate legal counsels.",
        "listImg": "/media/images/industries/legal_firms.png",
        "detailImg": "/media/images/industries/legal_firms.png",
        "bg": "from-indigo-500/10 to-purple-500/10",
        "colorClass": "text-indigo-400",
        "borderClass": "border-indigo-500/20",
        "glowClass": "rgba(99,102,241,0.06)",
        "accentColor": "#6366f1",
        "metrics": [
            {"label": "Case Matters Managed", "value": "12,000+"},
            {"label": "Data Privacy Rating", "value": "Tier-1"}
        ],
        "sort_order": 15
    },
    {
        "slug": "corporate-b2b",
        "title": "Corporate & B2B Services",
        "description": "Enterprise client portals, RFP quote generators, and automated SLA dashboards.",
        "detailDescription": "We construct enterprise client collaboration workspaces, automated proposal and contract generators, project deliverable review matrices, and SLA performance dashboards for B2B consultancies and professional service firms.",
        "listImg": "/media/images/industries/corporate_b2b.png",
        "detailImg": "/media/images/industries/corporate_b2b.png",
        "bg": "from-slate-500/10 to-neutral-500/10",
        "colorClass": "text-neutral-300",
        "borderClass": "border-white/20",
        "glowClass": "rgba(255,255,255,0.06)",
        "accentColor": "#e5e5e5",
        "metrics": [
            {"label": "Proposals Dispatched", "value": "8,500+"},
            {"label": "Client Retention Rate", "value": "96%"}
        ],
        "sort_order": 16
    },
    {
        "slug": "travel-tourism",
        "title": "Travel & Tourism",
        "description": "Custom tour itinerary builders, multi-currency booking engines, and visa assistance.",
        "detailDescription": "We engineer dynamic travel itinerary planners, multi-supplier airline/hotel API integration engines, automated voucher generation, and secure multi-currency payment checkout flows for travel agencies and destination management companies.",
        "listImg": "/media/images/industries/travel_tourism.png",
        "detailImg": "/media/images/industries/travel_tourism.png",
        "bg": "from-sky-500/10 to-teal-500/10",
        "colorClass": "text-sky-400",
        "borderClass": "border-sky-500/20",
        "glowClass": "rgba(14,165,233,0.06)",
        "accentColor": "#0ea5e9",
        "metrics": [
            {"label": "Itineraries Booked", "value": "45K+"},
            {"label": "Booking Conversion", "value": "+38%"}
        ],
        "sort_order": 17
    },
    {
        "slug": "wedding-event",
        "title": "Wedding & Event Management",
        "description": "Interactive guest RSVP portals, vendor coordination boards, and live event photo hubs.",
        "detailDescription": "We craft branded wedding guest portals with digital invites, seating arrangement planners, vendor coordination dashboards, and real-time event photo sharing galleries that make large-scale celebrations effortless to coordinate.",
        "listImg": "/media/images/industries/wedding_event.png",
        "detailImg": "/media/images/industries/wedding_event.png",
        "bg": "from-rose-500/10 to-amber-500/10",
        "colorClass": "text-rose-400",
        "borderClass": "border-rose-500/20",
        "glowClass": "rgba(244,63,94,0.06)",
        "accentColor": "#f43f5e",
        "metrics": [
            {"label": "Events Managed", "value": "350+"},
            {"label": "RSVP Response Rate", "value": "94%"}
        ],
        "sort_order": 18
    },
    {
        "slug": "furniture-interior",
        "title": "Furniture & Interior Design",
        "description": "3D room staging previewers, custom modular furniture quote tools, and design portfolios.",
        "detailDescription": "We create interactive 3D modular furniture customizers, interior project portfolio showcases, instant material cost estimators, and on-site project progress trackers for architecture firms and luxury furniture studios.",
        "listImg": "/media/images/industries/furniture_interior.png",
        "detailImg": "/media/images/industries/furniture_interior.png",
        "bg": "from-amber-500/10 to-stone-500/10",
        "colorClass": "text-amber-400",
        "borderClass": "border-amber-500/20",
        "glowClass": "rgba(245,158,11,0.06)",
        "accentColor": "#f59e0b",
        "metrics": [
            {"label": "3D Visualizations Rendered", "value": "15,000+"},
            {"label": "Deal Closing Speed", "value": "2x Faster"}
        ],
        "sort_order": 19
    },
    {
        "slug": "solar-renewable",
        "title": "Solar & Renewable Energy",
        "description": "Rooftop solar ROI calculators, subsidy lead generators, and panel telemetry trackers.",
        "detailDescription": "We develop rooftop solar feasibility calculators, automated government subsidy application trackers, field survey mobile tools, and solar generation telemetry dashboards for EPC contractors and clean-energy providers.",
        "listImg": "/media/images/industries/solar_renewable.png",
        "detailImg": "/media/images/industries/solar_renewable.png",
        "bg": "from-yellow-500/10 to-green-500/10",
        "colorClass": "text-yellow-400",
        "borderClass": "border-yellow-500/20",
        "glowClass": "rgba(234,179,8,0.06)",
        "accentColor": "#eab308",
        "metrics": [
            {"label": "Solar KW Calculated", "value": "45 MW+"},
            {"label": "Lead-to-Survey Rate", "value": "34%"}
        ],
        "sort_order": 20
    },
    {
        "slug": "agriculture-agro",
        "title": "Agriculture & Agro Products",
        "description": "Farm-to-fork traceability portals, APMC mandi rate aggregation, and agro input apps.",
        "detailDescription": "We engineer farm-to-fork batch traceability portals, live APMC/Mandi rate aggregation dashboards, agro-chemical distributor order apps, and cold-storage inventory monitoring tools for agricultural exporters and FPOs.",
        "listImg": "/media/images/industries/agriculture_agro.png",
        "detailImg": "/media/images/industries/agriculture_agro.png",
        "bg": "from-green-500/10 to-emerald-500/10",
        "colorClass": "text-green-400",
        "borderClass": "border-green-500/20",
        "glowClass": "rgba(34,197,94,0.06)",
        "accentColor": "#22c55e",
        "metrics": [
            {"label": "Farmers Connected", "value": "30,000+"},
            {"label": "Price Transparency", "value": "100% Realtime"}
        ],
        "sort_order": 21
    },
    {
        "slug": "fmcg-consumer-brands",
        "title": "FMCG & Consumer Brands",
        "description": "Secondary sales tracking apps, retail scheme engines, and D2C online channels.",
        "detailDescription": "We build field sales representative order capture apps, distributor billing matrices, retail trade scheme calculators, and direct-to-consumer digital commerce platforms for growing consumer packaged goods brands.",
        "listImg": "/media/images/industries/fmcg_consumer_brands.png",
        "detailImg": "/media/images/industries/fmcg_consumer_brands.png",
        "bg": "from-teal-500/10 to-cyan-500/10",
        "colorClass": "text-teal-400",
        "borderClass": "border-teal-500/20",
        "glowClass": "rgba(20,184,166,0.06)",
        "accentColor": "#14b8a6",
        "metrics": [
            {"label": "Retail Outlets Reached", "value": "85,000+"},
            {"label": "Order Sync Latency", "value": "< 1 Sec"}
        ],
        "sort_order": 22
    },
    {
        "slug": "electronics-mobile",
        "title": "Electronics & Mobile",
        "description": "Specification comparison portals, serial warranty registers, and repair ticket hubs.",
        "detailDescription": "We craft tech spec comparison engines, serial number warranty verification systems, repair ticket progress tracking apps, and EMI / finance eligibility calculators for electronics retailers and regional gadget brands.",
        "listImg": "/media/images/industries/electronics_mobile.png",
        "detailImg": "/media/images/industries/electronics_mobile.png",
        "bg": "from-blue-500/10 to-cyan-500/10",
        "colorClass": "text-blue-400",
        "borderClass": "border-blue-500/20",
        "glowClass": "rgba(59,130,246,0.06)",
        "accentColor": "#3b82f6",
        "metrics": [
            {"label": "Warranties Registered", "value": "120K+"},
            {"label": "Repair Turnaround", "value": "-35% Time"}
        ],
        "sort_order": 23
    },
    {
        "slug": "gym-fitness",
        "title": "Gym & Fitness Centers",
        "description": "Mobile membership pass QR check-ins, automated subscription debits, and diet planners.",
        "detailDescription": "We create mobile membership pass apps with QR check-in, automated monthly subscription debit systems, personalized workout/diet chart delivery, and trainer booking portals for fitness centers and crossfit gyms.",
        "listImg": "/media/images/industries/gym_fitness.png",
        "detailImg": "/media/images/industries/gym_fitness.png",
        "bg": "from-red-500/10 to-pink-500/10",
        "colorClass": "text-red-400",
        "borderClass": "border-red-500/20",
        "glowClass": "rgba(239,68,68,0.06)",
        "accentColor": "#ef4444",
        "metrics": [
            {"label": "Members Managed", "value": "18,000+"},
            {"label": "Renewal Rate Lift", "value": "+29%"}
        ],
        "sort_order": 24
    },
    {
        "slug": "wellness-lifestyle",
        "title": "Wellness & Lifestyle",
        "description": "Spa appointment schedulers, therapist calendars, and curated wellness retail stores.",
        "detailDescription": "We develop intuitive treatment booking portals, therapist availability managers, customized wellness package builders, and curated organic lifestyle retail stores for wellness retreats, yoga studios, and ayurvedic spas.",
        "listImg": "/media/images/industries/wellness_lifestyle.png",
        "detailImg": "/media/images/industries/wellness_lifestyle.png",
        "bg": "from-emerald-500/10 to-teal-500/10",
        "colorClass": "text-emerald-400",
        "borderClass": "border-emerald-500/20",
        "glowClass": "rgba(16,185,129,0.06)",
        "accentColor": "#10b981",
        "metrics": [
            {"label": "Appointments Booked", "value": "60K+"},
            {"label": "Repeat Visits", "value": "52%"}
        ],
        "sort_order": 25
    },
    {
        "slug": "pet-care",
        "title": "Pet Care & Veterinary",
        "description": "Veterinary consultation schedulers, pet medical history vaults, and food subscriptions.",
        "detailDescription": "We build veterinary consultation booking systems, digital vaccination history records, pet grooming scheduling calendars, and automated pet nutrition subscription checkouts for pet clinics and pet supply retailers.",
        "listImg": "/media/images/industries/pet_care.png",
        "detailImg": "/media/images/industries/pet_care.png",
        "bg": "from-amber-500/10 to-orange-500/10",
        "colorClass": "text-amber-400",
        "borderClass": "border-amber-500/20",
        "glowClass": "rgba(245,158,11,0.06)",
        "accentColor": "#f59e0b",
        "metrics": [
            {"label": "Pets Registered", "value": "14,500+"},
            {"label": "Vaccine Reminder Sync", "value": "97%"}
        ],
        "sort_order": 26
    },
    {
        "slug": "coworking-commercial",
        "title": "Co-working & Commercial Spaces",
        "description": "Hot desk / meeting room bookers, access control sync, and automated tenant invoicing.",
        "detailDescription": "We construct real-time meeting room and hot-desk reservation portals, automated monthly tenant invoice generation, visitor log management, and community networking boards for flexible workspaces and commercial business parks.",
        "listImg": "/media/images/industries/coworking_commercial.png",
        "detailImg": "/media/images/industries/coworking_commercial.png",
        "bg": "from-indigo-500/10 to-blue-500/10",
        "colorClass": "text-indigo-400",
        "borderClass": "border-indigo-500/20",
        "glowClass": "rgba(99,102,241,0.06)",
        "accentColor": "#6366f1",
        "metrics": [
            {"label": "Desks Managed", "value": "8,200+"},
            {"label": "Occupancy Rate", "value": "92%"}
        ],
        "sort_order": 27
    },
    {
        "slug": "import-export",
        "title": "Import & Export Trading",
        "description": "Live container cargo trackers, customs document generators, and forex rate quoters.",
        "detailDescription": "We engineer live container freight tracking portals, automated commercial invoice and packing list generators, live forex currency converters, and global buyer enquiry portals for international trading houses and clearing agents.",
        "listImg": "/media/images/industries/import_export.png",
        "detailImg": "/media/images/industries/import_export.png",
        "bg": "from-cyan-500/10 to-teal-500/10",
        "colorClass": "text-cyan-400",
        "borderClass": "border-cyan-500/20",
        "glowClass": "rgba(6,182,212,0.06)",
        "accentColor": "#06b6d4",
        "metrics": [
            {"label": "Containers Tracked", "value": "25,000+"},
            {"label": "Documentation Speed", "value": "4x Faster"}
        ],
        "sort_order": 28
    }
]

INDUSTRY_PROJECTS_56 = [
    # Manufacturing
    {
        "title": "AeroPlant ERP Grid",
        "industryId": "manufacturing",
        "description": "Centralized multi-factory manufacturing operations portal with live production shift monitoring and automated raw material reordering.",
        "tech": ["React", "FastAPI", "PostgreSQL", "MQTT"],
        "client": "Apex Precision Engineering",
        "sort_order": 1
    },
    {
        "title": "ProFlow Machine Telemetry",
        "industryId": "manufacturing",
        "description": "IoT sensor ingestion system monitoring spindle vibration and heat metrics across 40 CNC machines with predictive maintenance alerts.",
        "tech": ["Python", "TimescaleDB", "Redis", "Grafana"],
        "client": "Sterling Forgings Ltd",
        "sort_order": 2
    },

    # Hotels & Resorts
    {
        "title": "StayLux Direct Booking Engine",
        "industryId": "hotels-resorts",
        "description": "Luxury resort reservation portal featuring dynamic pricing algorithms, room inventory sync, and multi-currency checkout.",
        "tech": ["Next.js", "Stripe API", "PostgreSQL"],
        "client": "StayLux Resorts",
        "sort_order": 3
    },
    {
        "title": "GuestWave Concierge Portal",
        "industryId": "hotels-resorts",
        "description": "Mobile web guest concierge enabling guests to order in-room dining, book spa appointments, and chat with the front desk.",
        "tech": ["React", "Firebase", "WebSockets"],
        "client": "Palacio Heritage Hotels",
        "sort_order": 4
    },

    # Restaurants & Cafes
    {
        "title": "TableOrder QR & POS Sync",
        "industryId": "restaurants-cafes",
        "description": "Contactless dining menu ordering system integrated directly with thermal kitchen printers and cloud POS billing.",
        "tech": ["React", "Node.js", "Socket.io", "MongoDB"],
        "client": "The Rustic Table Chain",
        "sort_order": 5
    },
    {
        "title": "DineRepeat Loyalty Matrix",
        "industryId": "restaurants-cafes",
        "description": "Automated customer retention platform delivering targeted WhatsApp dining offers based on visit frequency and spend tiers.",
        "tech": ["FastAPI", "WhatsApp Cloud API", "PostgreSQL"],
        "client": "Brew & Bean Cafes",
        "sort_order": 6
    },

    # Real Estate
    {
        "title": "Skyline 3D Walkthrough Portal",
        "industryId": "realestate",
        "description": "Interactive architectural walkthrough platform rendering 4K unit previews and vector masterplan lot availability.",
        "tech": ["Three.js", "WebGL", "React", "AWS S3"],
        "client": "Skyline Developers",
        "sort_order": 7
    },
    {
        "title": "RealtyPulse Lead Matrix",
        "industryId": "realestate",
        "description": "Automated broker lead distribution CRM with instant WhatsApp site-visit scheduling and broker commission calculators.",
        "tech": ["Next.js", "FastAPI", "PostgreSQL"],
        "client": "Prime Habitat Realty",
        "sort_order": 8
    },

    # Education & Institutes
    {
        "title": "SkillPath LMS Platform",
        "industryId": "education",
        "description": "Scalable digital learning ecosystem with interactive video lectures, adaptive quizzes, and auto-generated certificates.",
        "tech": ["React", "Node.js", "PostgreSQL", "Mux Video"],
        "client": "SkillPath Institute",
        "sort_order": 9
    },
    {
        "title": "EduAdmin Campus Suite",
        "industryId": "education",
        "description": "Centralized student admission, digital fee collection, and attendance management software for multi-branch institutions.",
        "tech": ["Next.js", "Razorpay API", "FastAPI"],
        "client": "Oxford Global Academy",
        "sort_order": 10
    },

    # Fashion & Clothing
    {
        "title": "VogueAura Headless Storefront",
        "industryId": "fashion-clothing",
        "description": "Ultra-fast headless luxury fashion storefront with 3D garment previews and dynamic colorway customizers.",
        "tech": ["Next.js", "Shopify Storefront API", "TailwindCSS"],
        "client": "VogueAura London",
        "sort_order": 11
    },
    {
        "title": "FitSense Sizing Engine",
        "industryId": "fashion-clothing",
        "description": "Interactive body measurement and size recommendation engine that reduced return rates by 22% for apparel brands.",
        "tech": ["React", "TensorFlow.js", "FastAPI"],
        "client": "UrbanThread Studios",
        "sort_order": 12
    },

    # Cosmetics & Beauty
    {
        "title": "GlowBotanics Skin Diagnostic",
        "industryId": "cosmetics-beauty",
        "description": "Personalized 60-second skincare assessment quiz that generates customized beauty routines and one-click bundles.",
        "tech": ["React", "Node.js", "PostgreSQL"],
        "client": "GlowBotanics Organics",
        "sort_order": 13
    },
    {
        "title": "LuxeCare Auto-Replenish",
        "industryId": "cosmetics-beauty",
        "description": "Subscription checkout platform with flexible delivery cadences, loyalty points integration, and automated recurring billing.",
        "tech": ["Next.js", "Stripe Subscriptions", "Redis"],
        "client": "LuxeCare Labs",
        "sort_order": 14
    },

    # Retail & Supermarkets
    {
        "title": "OmniStore Multi-POS Matrix",
        "industryId": "retail-supermarkets",
        "description": "Unified inventory synchronization engine connecting 14 supermarket branches with real-time barcode checkout terminals.",
        "tech": ["React", "FastAPI", "PostgreSQL", "Redis"],
        "client": "FreshMart Superstores",
        "sort_order": 15
    },
    {
        "title": "SpeedyCart Local Delivery App",
        "industryId": "retail-supermarkets",
        "description": "Neighborhood 30-minute grocery delivery platform with live rider GPS tracking and automated order dispatch.",
        "tech": ["Flutter", "Node.js", "MongoDB", "Google Maps API"],
        "client": "DailyNeed Retailers",
        "sort_order": 16
    },

    # Construction & Infrastructure
    {
        "title": "BuildTrack Milestone Hub",
        "industryId": "construction",
        "description": "Civil engineering site monitoring platform capturing daily progress logs, material receipts, and architect sign-offs.",
        "tech": ["React", "FastAPI", "AWS S3", "PostgreSQL"],
        "client": "InfraCore Builders",
        "sort_order": 17
    },
    {
        "title": "QuantBOQ Cost Estimator",
        "industryId": "construction",
        "description": "Automated Bill of Quantities (BOQ) cost calculation tool calculating steel, concrete, and labor rates against master schedules.",
        "tech": ["Next.js", "Python", "PostgreSQL"],
        "client": "Apex Structural Engineers",
        "sort_order": 18
    },

    # Automobile & Dealerships
    {
        "title": "AutoShowroom 360 Visualizer",
        "industryId": "automobile-dealers",
        "description": "Web-based 360-degree vehicle interior and exterior customizer with accessory selection and instant EMI quotes.",
        "tech": ["Three.js", "React", "WebGL"],
        "client": "SpeedStar Auto Group",
        "sort_order": 19
    },
    {
        "title": "DriveSync Service Scheduler",
        "industryId": "automobile-dealers",
        "description": "Dealership service appointment portal with live bay status tracking, parts estimate approvals, and automated SMS reminders.",
        "tech": ["React", "Node.js", "PostgreSQL"],
        "client": "Elite Motors Network",
        "sort_order": 20
    },

    # Pharma & Life Sciences
    {
        "title": "PharmaTrack Batch Compliance",
        "industryId": "pharma",
        "description": "Serialized pharmaceutical batch code verification system enabling distributors to track batch certificates and expiry schedules.",
        "tech": ["FastAPI", "PostgreSQL", "Redis", "Docker"],
        "client": "BioCore Pharma LLP",
        "sort_order": 21
    },
    {
        "title": "MedOrder Distributor Portal",
        "industryId": "pharma",
        "description": "B2B stock ordering portal for 400+ pharmacy distributors with live inventory status, credit limits, and invoice generation.",
        "tech": ["React", "Python", "MongoDB"],
        "client": "MedLife Formulations",
        "sort_order": 22
    },

    # Packaging & Industrial Printing
    {
        "title": "BoxCraft 3D Die-Line Studio",
        "industryId": "packaging",
        "description": "Online 3D corrugated box customizer calculating board strength, flute density, and instant wholesale manufacturing quotations.",
        "tech": ["Three.js", "React", "FastAPI"],
        "client": "Universal Packaging Corp",
        "sort_order": 23
    },
    {
        "title": "PrintFlow Job-Card Manager",
        "industryId": "packaging",
        "description": "Factory production tracking board managing prepress approvals, lamination queues, die-cutting, and shipping dispatches.",
        "tech": ["Next.js", "PostgreSQL", "Socket.io"],
        "client": "Apex Cartons & Prints",
        "sort_order": 24
    },

    # Logistics & Transport
    {
        "title": "FreightPulse Fleet Telemetry",
        "industryId": "logistics-transport",
        "description": "Real-time GPS fleet monitoring dashboard with geofence breach alerts, driver behavior scoring, and fuel theft detection.",
        "tech": ["React", "FastAPI", "PostGIS", "TimescaleDB"],
        "client": "FreightPulse Logistics",
        "sort_order": 25
    },
    {
        "title": "RouteOptima Dispatch Engine",
        "industryId": "logistics-transport",
        "description": "Multi-stop delivery route optimization algorithm that reduced fleet fuel consumption by 22% across interstate routes.",
        "tech": ["Python", "Google Maps Matrix API", "Redis"],
        "client": "CrossCountry Express",
        "sort_order": 26
    },

    # Finance & CA Firms
    {
        "title": "TaxVault Client Repository",
        "industryId": "finance-ca-firms",
        "description": "Encrypted client financial document exchange repository with automatic GST filing checklist reminders and e-signatures.",
        "tech": ["Next.js", "FastAPI", "AWS KMS", "PostgreSQL"],
        "client": "Mehta & Associates CAs",
        "sort_order": 27
    },
    {
        "title": "FinAdviser Portfolio Matrix",
        "industryId": "finance-ca-firms",
        "description": "Wealth advisory dashboard aggregating mutual funds, fixed returns, and tax liabilities into monthly automated PDF digests.",
        "tech": ["React", "Python", "Chart.js"],
        "client": "Equitas Wealth Advisory",
        "sort_order": 28
    },

    # Legal Firms & Attorneys
    {
        "title": "LexDocket Case Manager",
        "industryId": "legal-firms",
        "description": "Confidential legal case file portal with automated court hearing calendar sync and secure client document exchange.",
        "tech": ["Next.js", "FastAPI", "PostgreSQL"],
        "client": "Singhania & Partners Law",
        "sort_order": 29
    },
    {
        "title": "ContractSign Retainer Suite",
        "industryId": "legal-firms",
        "description": "Digital legal engagement signing platform with biometric timestamp audit trails and automated retainer billing.",
        "tech": ["React", "Node.js", "MongoDB", "Crypto"],
        "client": "Vanguard Legal Chambers",
        "sort_order": 30
    },

    # Corporate & B2B Services
    {
        "title": "EnterpriseSync B2B Portal",
        "industryId": "corporate-b2b",
        "description": "Client collaboration portal providing enterprise clients with live project milestone tracking and deliverable sign-offs.",
        "tech": ["React", "FastAPI", "PostgreSQL"],
        "client": "Stellaris Consulting Group",
        "sort_order": 31
    },
    {
        "title": "ProposalFlow RFP Builder",
        "industryId": "corporate-b2b",
        "description": "Automated enterprise proposal and RFP generator creating branded pitch decks and cost schedules in minutes.",
        "tech": ["Next.js", "Python", "TailwindCSS"],
        "client": "Benchmark Corporate Solutions",
        "sort_order": 32
    },

    # Travel & Tourism
    {
        "title": "WanderCraft Dynamic Itinerary",
        "industryId": "travel-tourism",
        "description": "Customizable multi-city holiday package builder with live flight/hotel pricing and instant PDF voucher generation.",
        "tech": ["Next.js", "Amadeus API", "PostgreSQL"],
        "client": "Wanderlust Journeys",
        "sort_order": 33
    },
    {
        "title": "TourPass Booking Portal",
        "industryId": "travel-tourism",
        "description": "Multi-currency excursion and attraction ticketing portal with instant QR ticket delivery and multi-lingual guides.",
        "tech": ["React", "Stripe Payments", "Node.js"],
        "client": "Voyageur Global Holidays",
        "sort_order": 34
    },

    # Wedding & Event
    {
        "title": "CelebrationPass RSVP Hub",
        "industryId": "wedding-event",
        "description": "Luxury digital wedding invite portal with interactive guest RSVP trackers, travel coordinator boards, and live itineraries.",
        "tech": ["Next.js", "Firebase", "Framer Motion"],
        "client": "The Royal Knot Events",
        "sort_order": 35
    },
    {
        "title": "EventSync Vendor Board",
        "industryId": "wedding-event",
        "description": "Real-time vendor milestone management software coordinating decorators, caterers, and photographers across multi-day galas.",
        "tech": ["React", "Node.js", "PostgreSQL"],
        "client": "Grandeur Celebrations",
        "sort_order": 36
    },

    # Furniture & Interior
    {
        "title": "RoomCraft 3D Staging Suite",
        "industryId": "furniture-interior",
        "description": "Interactive WebGL room visualizer enabling homeowners to position modular sofas, tables, and lighting in real-time dimensions.",
        "tech": ["Three.js", "WebGL", "React"],
        "client": "WoodCraft Studios",
        "sort_order": 37
    },
    {
        "title": "InteriorQuote BOQ Studio",
        "industryId": "furniture-interior",
        "description": "Instant interior design estimate engine calculating square-footage woodwork, veneer, and hardware pricing accurately.",
        "tech": ["Next.js", "PostgreSQL", "FastAPI"],
        "client": "DesignSpace Architects",
        "sort_order": 38
    },

    # Solar & Renewable Energy
    {
        "title": "SunPower Feasibility Calculator",
        "industryId": "solar-renewable",
        "description": "Rooftop solar savings and subsidy calculation engine generating customized 25-year financial ROI reports for clients.",
        "tech": ["React", "FastAPI", "Chart.js"],
        "client": "SunRay Green Energy",
        "sort_order": 39
    },
    {
        "title": "SolarTelemetry Grid Monitor",
        "industryId": "solar-renewable",
        "description": "Live solar panel telemetry monitor tracking daily energy generation, inverter efficiency, and maintenance alerts.",
        "tech": ["Python", "TimescaleDB", "React"],
        "client": "Helix Solar Parks",
        "sort_order": 40
    },

    # Agriculture & Agro Products
    {
        "title": "AgriTrace Farm-to-Fork",
        "industryId": "agriculture-agro",
        "description": "Batch crop traceability portal providing export buyers with harvest dates, soil lab reports, and pesticide compliance records.",
        "tech": ["React", "FastAPI", "PostgreSQL"],
        "client": "GreenHarvest Agro Exporters",
        "sort_order": 41
    },
    {
        "title": "MandiPulse Rate Aggregator",
        "industryId": "agriculture-agro",
        "description": "Real-time APMC mandi commodity rate tracker providing farmers and traders with daily live crop rate updates via web and SMS.",
        "tech": ["FastAPI", "Python", "Redis", "Twilio"],
        "client": "KisanVikas Federation",
        "sort_order": 42
    },

    # FMCG & Consumer Brands
    {
        "title": "SalesField Rep Dispatcher",
        "industryId": "fmcg-consumer-brands",
        "description": "Field sales tracking application recording retailer orders, store visit GPS logs, and target fulfillment in real-time.",
        "tech": ["Flutter", "FastAPI", "PostgreSQL"],
        "client": "NourishFresh Foods",
        "sort_order": 43
    },
    {
        "title": "TradeScheme Rebate Portal",
        "industryId": "fmcg-consumer-brands",
        "description": "Automated dealer trade discount and incentive calculator calculating seasonal volume payouts for 2,000+ distributors.",
        "tech": ["React", "Node.js", "PostgreSQL"],
        "client": "Heritage Consumer Goods",
        "sort_order": 44
    },

    # Electronics & Mobile
    {
        "title": "TechCompare Gadget Selector",
        "industryId": "electronics-mobile",
        "description": "High-speed electronics specification comparison engine with side-by-side benchmark scores and live stock check.",
        "tech": ["Next.js", "Algolia Search", "TailwindCSS"],
        "client": "GadgetZone Retail",
        "sort_order": 45
    },
    {
        "title": "WarrantySync Ticket Desk",
        "industryId": "electronics-mobile",
        "description": "Serial-number warranty registry and customer repair tracking portal with automated status SMS notifications.",
        "tech": ["React", "FastAPI", "PostgreSQL"],
        "client": "AcroVolt Electronics",
        "sort_order": 46
    },

    # Gym & Fitness
    {
        "title": "FitPass Member Mobile Suite",
        "industryId": "gym-fitness",
        "description": "Mobile membership pass application featuring QR turnstile check-in, automated membership renewals, and class booking.",
        "tech": ["React Native", "Node.js", "Stripe Subscriptions"],
        "client": "IronCore Fitness Clubs",
        "sort_order": 47
    },
    {
        "title": "TrainerSync Workout Studio",
        "industryId": "gym-fitness",
        "description": "Personal trainer scheduling and client workout log platform tracking body composition metrics and diet milestones.",
        "tech": ["React", "FastAPI", "PostgreSQL"],
        "client": "Pulse Performance Gyms",
        "sort_order": 48
    },

    # Wellness & Lifestyle
    {
        "title": "Sanctuary Spa Scheduler",
        "industryId": "wellness-lifestyle",
        "description": "Intuitive treatment booking portal with therapist availability sync, treatment customization, and package gift vouchers.",
        "tech": ["Next.js", "Stripe", "PostgreSQL"],
        "client": "Sanctuary Wellness Retreat",
        "sort_order": 49
    },
    {
        "title": "AyurLifestyle Curated Store",
        "industryId": "wellness-lifestyle",
        "description": "Ayurvedic wellness e-commerce portal with dosha assessment quiz and customized herbal supplement recommendations.",
        "tech": ["React", "Shopify API", "Node.js"],
        "client": "VedaLiving Organic",
        "sort_order": 50
    },

    # Pet Care & Veterinary
    {
        "title": "VetCare Clinic Scheduler",
        "industryId": "pet-care",
        "description": "Veterinary appointment booking software with digital pet vaccination passports and automated deworming reminders.",
        "tech": ["React", "FastAPI", "PostgreSQL"],
        "client": "PetPaws Hospital Network",
        "sort_order": 51
    },
    {
        "title": "PawNutrition Auto-Delivery",
        "industryId": "pet-care",
        "description": "Pet diet and prescription food subscription checkout platform calculating breed-specific nutrition portions.",
        "tech": ["Next.js", "Stripe Subscriptions", "PostgreSQL"],
        "client": "TailWaggers Nutrition",
        "sort_order": 52
    },

    # Co-working & Commercial Spaces
    {
        "title": "SpaceHub Desk & Room Booker",
        "industryId": "coworking-commercial",
        "description": "Live floorplan hot-desk and conference room reservation portal with automated monthly membership invoice generation.",
        "tech": ["React", "Node.js", "PostgreSQL", "Razorpay"],
        "client": "SpaceHub Co-works",
        "sort_order": 53
    },
    {
        "title": "AccessPulse Visitor Manager",
        "industryId": "coworking-commercial",
        "description": "Digital visitor check-in kiosk system with host notification pings and Wi-Fi credential auto-generation.",
        "tech": ["Next.js", "FastAPI", "Twilio API"],
        "client": "Nexus Business Towers",
        "sort_order": 54
    },

    # Import & Export
    {
        "title": "PortStream Container Tracker",
        "industryId": "import-export",
        "description": "Live maritime container tracking portal consolidating bill of lading milestones, customs clearance status, and demurrage alerts.",
        "tech": ["React", "AIS Vessel Tracking API", "FastAPI", "PostgreSQL"],
        "client": "Oceanic Global Trade",
        "sort_order": 55
    },
    {
        "title": "DocuExport Customs Engine",
        "industryId": "import-export",
        "description": "Automated export commercial invoice, packing list, and certificate of origin generator supporting multi-currency forex rates.",
        "tech": ["Python", "FastAPI", "PostgreSQL", "React"],
        "client": "Apex TransGlobal Trading",
        "sort_order": 56
    }
]

def update_database():
    try:
        client = MongoClient(MONGODB_URI)
        db = client["hk_digiverse"]
        
        # 1. Update 'industries' collection
        ind_coll = db["industries"]
        ind_coll.delete_many({})
        ind_coll.insert_many(INDUSTRIES_28)
        print(f"[MongoDB] Inserted {len(INDUSTRIES_28)} industries into 'industries' collection.")
        
        # 2. Update 'industry_projects' collection
        proj_coll = db["industry_projects"]
        proj_coll.delete_many({})
        proj_coll.insert_many(INDUSTRY_PROJECTS_56)
        print(f"[MongoDB] Inserted {len(INDUSTRY_PROJECTS_56)} projects into 'industry_projects' collection.")
        
        # 3. Update 'website_content_published' and 'website_content_draft' in 'site_content'
        site_coll = db["site_content"]
        for identifier in ["website_content_published", "website_content_draft", "website_content"]:
            doc = site_coll.find_one({"identifier": identifier})
            if doc:
                site_coll.update_one(
                    {"identifier": identifier},
                    {"$set": {
                        "industries": INDUSTRIES_28,
                        "industry_projects": INDUSTRY_PROJECTS_56
                    }}
                )
                print(f"[MongoDB] Updated industries & projects in site_content -> '{identifier}'")
            else:
                site_coll.insert_one({
                    "identifier": identifier,
                    "industries": INDUSTRIES_28,
                    "industry_projects": INDUSTRY_PROJECTS_56
                })
                print(f"[MongoDB] Created & populated '{identifier}' in site_content")
                
        print("\n[SUCCESS] All 28 Industries and 56 Projects populated successfully in MongoDB!")
    except Exception as e:
        print(f"[Error] Database update failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    update_database()
