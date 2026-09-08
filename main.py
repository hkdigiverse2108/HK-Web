import sys
import os
import json
import subprocess
import threading
import time
import shutil
import datetime
try:
    import cv2
except ImportError:
    cv2 = None

from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, Header
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

try:
    from pymongo import MongoClient
except ImportError:
    MongoClient = None

# 1. Setup backend import path and load environment variables
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
os.environ["PYTHONPATH"] = backend_dir + os.pathsep + os.environ.get("PYTHONPATH", "")

load_dotenv(override=True)  # Loads .env from the root directory

from app.core.config import settings

# 2. Define FastAPI Application
app = FastAPI(
    title="HariKrushn Digiverse API",
    description="API Backend for HariKrushn Digiverse LLP Platform",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pre-warm MongoDB connection on startup so first request doesn't block
@app.on_event("startup")
async def startup_event():
    """Pre-warm MongoDB connection in background thread to avoid cold-start timeouts."""
    def _warmup():
        try:
            print("[Startup] Pre-warming MongoDB connection...")
            coll = get_mongo_collection()
            if coll is not None:
                print("[Startup] MongoDB connection ready!")
            else:
                print("[Startup] MongoDB not available, will use local fallback.")
        except Exception as e:
            print(f"[Startup] MongoDB warmup failed: {e}")
    
    warmup_thread = threading.Thread(target=_warmup, daemon=True)
    warmup_thread.start()


# Pydantic models for admin auth and content
class VerifyRequest(BaseModel):
    password: str

class ContentUpdateRequest(BaseModel):
    password: str
    content: dict

# All content data is stored in MongoDB. DEFAULT_CONTENT (in-memory) is the fallback.

# Import defaults from seed module
from app.db.seed import (
    DEFAULT_SITE_SETTINGS, DEFAULT_ABOUT_US, DEFAULT_CULTURE, DEFAULT_PEOPLE,
    DEFAULT_AWARDS, DEFAULT_BLOGS, DEFAULT_PORTFOLIO, DEFAULT_VENTURES,
    DEFAULT_CAREER_JOBS, DEFAULT_CAREER_PERKS, DEFAULT_CAREER_TESTIMONIALS,
    DEFAULT_CAREER_FAQS, DEFAULT_CONTACT_OFFICES, DEFAULT_CONTACT_FAQS,
    DEFAULT_SERVICES_SUBPAGES, DEFAULT_CONTACT_SETTINGS, DEFAULT_CAREER_SETTINGS,
    DEFAULT_VENTURES_SETTINGS, DEFAULT_CULTURE_SETTINGS
)

DEFAULT_STRATEGIC_DIRECTIVES = [
  {
    "year": "2026",
    "month": "",
    "theme": "Cognitive Ecosystem & Edge AI",
    "color": "from-blue-500/10 to-cyan-500/5 border-blue-500/20",
    "glowColor": "rgba(59, 130, 246, 0.15)",
    "badgeColor": "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "vision": "Empower modern platforms with self-optimizing code nodes, localized LLMs, and zero-latency visual computing ecosystems.",
    "mission": "Deploy robust, edge-native micro-agents and visual rendering engines that sync in real-time across decentralized client networks.",
    "kpis": [
      "Autonomous prompt compilation loops",
      "Edge-native sub-10ms data sync",
      "Unified cognitive control panels"
    ]
  },
  {
    "year": "2025",
    "month": "",
    "theme": "Decentralized Autonomy & Spatial Web",
    "color": "from-emerald-500/10 to-teal-500/5 border-emerald-500/20",
    "glowColor": "rgba(16, 185, 129, 0.15)",
    "badgeColor": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "vision": "Lead the evolution of visual human-computer interaction by bridging decentralized visual nodes with spatial web computing frameworks.",
    "mission": "Architect fully autonomous multi-agent networks that execute secure device-level tasks, rendering real-time responsive spatial grids.",
    "kpis": [
      "Peer-to-peer visual state routers",
      "Responsive 3D viewport systems",
      "Local-first cryptographic databases"
    ]
  },
  {
    "year": "2024",
    "month": "",
    "theme": "Cognitive Intelligence & Cinematic Web",
    "color": "from-amber-500/10 to-orange-500/5 border-amber-500/20",
    "glowColor": "rgba(245, 158, 11, 0.15)",
    "badgeColor": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "vision": "Pioneer the application of customized LLM agents, vector database indexing pipelines, and fluid, high-fidelity user interfaces.",
    "mission": "Integrate context-aware AI automations directly into client product structures, accompanied by 3D gestures and cinematic front-end animations.",
    "kpis": [
      "Dynamic prompt-caching networks",
      "Framer Motion & WebGL fluid interfaces",
      "Vector-based cognitive search nodes"
    ]
  },
  {
    "year": "2023",
    "month": "",
    "theme": "Enterprise Integration & Core CRM",
    "color": "from-purple-500/10 to-indigo-500/5 border-purple-500/20",
    "glowColor": "rgba(168, 85, 247, 0.15)",
    "badgeColor": "text-purple-400 bg-purple-500/10 border-purple-500/20",
    "vision": "Establish HariKrushn as a leading architect of high-concurrency cloud ecosystems, custom CRM software, and data management matrices for global enterprises.",
    "mission": "Deploy secure, multi-tenant databases and automated signing portals that reduce human administrative overhead by 80% and scale operational speeds.",
    "kpis": [
      "Zero-downtime migration protocols",
      "Unified client management databases",
      "High-throughput microservices mesh"
    ]
  }
]

DEFAULT_CASE_STUDIES = [
  {
    "slug": "vesper",
    "client": "Vesper Luxury Living",
    "title": "Cinematic Visual Sales Engine",
    "industry": "Real Estate",
    "summary": "We transformed Vesper's high-end property portal by integrating custom canvas scrubbing transitions, rendering 4K frame sequences that scroll smoothly on desktop and mobile. The cinematic experience increased buyer engagement dramatically.",
    "challenge": "Vesper needed a property showcase that felt like a luxury brand experience, not a generic listing site. Their existing platform had poor mobile performance and lacked visual storytelling.",
    "solution": "Built a custom canvas-based scroll scrub engine with optimized frame preloading, lazy-loaded 4K imagery, and GPU-accelerated transitions. Integrated interactive floor plans and virtual walkthrough modules.",
    "tech": ["React", "Canvas API", "GSAP", "Vite", "Three.js"],
    "img": "/media/images/casestudies/vesper.png",
    "metrics": [
      { "label": "Conversion Rate", "value": "+142%" },
      { "label": "Avg. Time on Page", "value": "4m 12s" },
      { "label": "Load Time", "value": "0.8s" }
    ],
    "duration": "4 months",
    "color": "amber",
    "accentColor": "#f59e0b",
    "glowColor": "rgba(245,158,11,0.15)"
  },
  {
    "slug": "aerocrm",
    "client": "AeroCRM Aviation",
    "title": "Automated Operations Platform",
    "industry": "Aviation",
    "summary": "Replaced a fragmented array of legacy software sheets with a custom high-performance CRM, featuring automated emailers, booking schedules, vector notifications, and daily backups.",
    "challenge": "AeroCRM was managing fleet operations across spreadsheets and disconnected tools, causing booking conflicts, delayed communications, and zero audit trails.",
    "solution": "Architected a unified CRM with real-time booking conflict detection, automated email/SMS triggers, role-based dashboards, and end-to-end encrypted data backups running every 6 hours.",
    "tech": ["React", "FastAPI", "PostgreSQL", "Docker", "Redis"],
    "img": "/media/images/casestudies/aerocrm.png",
    "metrics": [
      { "label": "Operational Efficiency", "value": "+400%" },
      { "label": "Booking Failures", "value": "0%" },
      { "label": "Manual Input Time", "value": "-85%" }
    ],
    "duration": "6 months",
    "color": "blue",
    "accentColor": "#3b82f6",
    "glowColor": "rgba(59,130,246,0.15)"
  },
  {
    "slug": "novadefi",
    "client": "Nova DeFi",
    "title": "Web3 Trading Platform & UX Overhaul",
    "industry": "Fintech / Web3",
    "summary": "Co-architected the complete user flow for Nova's decentralized finance platform, designing intuitive swap interfaces, wallet connectivity, and real-time portfolio dashboards.",
    "challenge": "Nova's existing DeFi interface had a 60% user drop-off at the wallet connection step. Complex transaction flows confused first-time crypto users.",
    "solution": "Redesigned the entire UX flow with progressive disclosure patterns, one-click wallet connect, real-time gas estimation, and visual transaction confirmations with animated feedback.",
    "tech": ["Next.js", "Ethers.js", "Solidity", "The Graph", "Framer Motion"],
    "img": "/media/images/casestudies/novadefi.png",
    "metrics": [
      { "label": "Transaction Success", "value": "+40%" },
      { "label": "User Drop-off", "value": "-60%" },
      { "label": "Daily Active Users", "value": "3x" }
    ],
    "duration": "5 months",
    "color": "purple",
    "accentColor": "#a855f7",
    "glowColor": "rgba(168,85,247,0.15)"
  },
  {
    "slug": "corelogistics",
    "client": "Core Logistics",
    "title": "AI-Driven Supply Chain Matrix",
    "industry": "Logistics",
    "summary": "Constructed a custom supply chain optimization system from scratch, integrating AI-driven route prediction, real-time fleet tracking, and automated warehouse inventory management.",
    "challenge": "Core Logistics was losing 20% of delivery efficiency due to manual route planning and lack of real-time visibility into fleet locations and warehouse stock levels.",
    "solution": "Built an AI route optimizer using historical traffic and weather data, integrated GPS fleet tracking with geofence alerts, and automated inventory scanning with barcode/QR integration.",
    "tech": ["Python", "TensorFlow", "React", "Google Maps API", "PostgreSQL"],
    "img": "/media/images/casestudies/corelogistics.png",
    "metrics": [
      { "label": "Delivery Efficiency", "value": "+38%" },
      { "label": "Fuel Cost Savings", "value": "12L/yr" },
      { "label": "Real-time Accuracy", "value": "99.7%" }
    ],
    "duration": "7 months",
    "color": "emerald",
    "accentColor": "#10b981",
    "glowColor": "rgba(16,185,129,0.15)"
  },
  {
    "slug": "pulsehealth",
    "client": "Pulse MedTech",
    "title": "HIPAA-Compliant Patient Portal",
    "industry": "Healthcare",
    "summary": "Designed and built a secure doctor-patient portal with encrypted medical records, automated appointment scheduling, video consultations, and digital prescription management.",
    "challenge": "Pulse MedTech needed a patient management system that met strict HIPAA compliance while being intuitive enough for elderly patients to navigate without assistance.",
    "solution": "Created an accessibility-first portal with large-text modes, voice-guided navigation, E2E encrypted data at rest and in transit, and automated appointment reminders via SMS and WhatsApp.",
    "tech": ["React", "Express", "MongoDB", "WebGL", "Twilio"],
    "img": "/media/images/casestudies/pulsehealth.png",
    "metrics": [
      { "label": "Patient Satisfaction", "value": "4.9/5" },
      { "label": "Booking Efficiency", "value": "+200%" },
      { "label": "Data Breach Incidents", "value": "0" }
    ],
    "duration": "5 months",
    "color": "sky",
    "accentColor": "#0ea5e9",
    "glowColor": "rgba(14,165,233,0.15)"
  },
  {
    "slug": "learnverse",
    "client": "LearnVerse Academy",
    "title": "Full-Stack LMS with Live Classrooms",
    "industry": "EdTech",
    "summary": "Built a scalable Learning Management System with live video classrooms, adaptive quiz engines, real-time progress tracking, and automated certificate generation for 50,000+ students.",
    "challenge": "LearnVerse was using Zoom for classes and Google Sheets for tracking, losing student engagement data and unable to personalize the learning experience.",
    "solution": "Developed a custom LMS with WebRTC-based live classrooms, adaptive quizzing that adjusts difficulty based on performance, gamified progress dashboards, and auto-generated PDF certificates.",
    "tech": ["Next.js", "WebRTC", "FastAPI", "PostgreSQL", "Redis"],
    "img": "/media/images/casestudies/learnverse.png",
    "metrics": [
      { "label": "Student Retention", "value": "+65%" },
      { "label": "Course Completion", "value": "94%" },
      { "label": "Students Onboarded", "value": "50K+" }
    ],
    "duration": "6 months",
    "color": "rose",
    "accentColor": "#f43f5e",
    "glowColor": "rgba(244,63,94,0.15)"
  }
]

DEFAULT_CAREER_LADDER = [
  { "level": "Intern", "duration": "3-6 months", "desc": "Learn fundamentals, shadow senior team members, and contribute to live projects." },
  { "level": "Junior", "duration": "Year 1", "desc": "Own small features independently, participate in code reviews, and build domain expertise." },
  { "level": "Mid-Level", "duration": "Year 2-3", "desc": "Lead feature development, mentor juniors, and make architectural decisions." },
  { "level": "Senior", "duration": "Year 3-5", "desc": "Drive technical strategy, lead client engagements, and define engineering standards." },
  { "level": "Lead / Manager", "duration": "Year 5+", "desc": "Shape company direction, manage teams, and drive innovation across verticals." }
]

DEFAULT_JOB_FORM_FIELDS = [
  { "id": "name", "label": "Name", "type": "text", "placeholder": "Your name", "required": True },
  { "id": "phone", "label": "Phone", "type": "tel", "placeholder": "+91 XXXXX XXXXX", "required": False },
  { "id": "email", "label": "Email", "type": "email", "placeholder": "your@email.com", "required": True },
  { "id": "role", "label": "Target Role", "type": "text", "placeholder": "Select a role or specify", "required": True },
  { "id": "resume", "label": "Resume / Portfolio", "type": "file", "placeholder": "Or paste LinkedIn / GitHub / Portfolio URL", "required": True },
  { "id": "message", "label": "Cover Note", "type": "textarea", "placeholder": "Tell us why you'd be a great fit...", "required": False }
]

DEFAULT_INTERN_FORM_FIELDS = [
  { "id": "name", "label": "Your Name", "type": "text", "placeholder": "Radhe Patel", "required": True },
  { "id": "email", "label": "Email Address", "type": "email", "placeholder": "radhe@example.com", "required": True },
  { "id": "phone", "label": "Phone Number", "type": "tel", "placeholder": "+91 99999 99999", "required": True },
  { "id": "track", "label": "Select Track", "type": "text", "placeholder": "React/Next.js or specify track", "required": True },
  { "id": "college", "label": "College Name & Current Semester", "type": "text", "placeholder": "SCET, Surat - Sem 6", "required": True },
  { "id": "resume", "label": "Resume / Portfolio", "type": "file", "placeholder": "Or paste link (Google Drive, GitHub, etc.)", "required": True }
]

DEFAULT_PHILOSOPHY_CARDS = [
  {
    "title": "Cutting-Edge Technology",
    "desc": "Work with React, Next.js, Flutter, FastAPI, LLMs, Vector DBs, and cloud-native infrastructure every single day.",
    "color": "emerald",
    "icon": "lightning"
  },
  {
    "title": "Culture of Ownership",
    "desc": "Take full responsibility for your features and projects. Your ideas directly shape the products we ship.",
    "color": "cyan",
    "icon": "target"
  },
  {
    "title": "Continuous Growth",
    "desc": "Weekly tech shares, conference budgets, and mentorship from senior architects to accelerate your career.",
    "color": "amber",
    "icon": "chart"
  },
  {
    "title": "Collaborative Spirit",
    "desc": "Flat hierarchy, open communication, weekly knowledge-sharing sessions, and a team that genuinely cares about each other's growth.",
    "color": "rose",
    "icon": "users"
  }
]

DEFAULT_INDUSTRIES = [
  {
    "slug": "manufacturing",
    "title": "Manufacturing & Heavy Industries",
    "description": "Smart plant dashboards, automated raw material trackers, and custom ERP software.",
    "detailDescription": "We architect shop-floor monitoring systems, automated supplier procurement networks, and predictive machine maintenance portals that streamline multi-unit plant operations, reduce costly downtime, and keep material inventory tightly synced.",
    "listImg": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-amber-500/10 to-orange-500/10",
    "colorClass": "text-amber-400",
    "borderClass": "border-amber-500/20",
    "glowClass": "rgba(245,158,11,0.06)",
    "accentColor": "#f59e0b",
    "metrics": [
      {
        "label": "Downtime Reduction",
        "value": "42%"
      },
      {
        "label": "Inventory Accuracy",
        "value": "99.4%"
      }
    ],
    "sort_order": 1
  },
  {
    "slug": "hotels-resorts",
    "title": "Hotels & Luxury Resorts",
    "description": "Direct guest booking engines, mobile concierge apps, and dynamic room tariff controllers.",
    "detailDescription": "We build high-converting direct reservation platforms, multilingual guest check-in mobile apps, and automated rate distribution dashboards that increase direct booker revenue and deliver seamless hospitality from arrival to departure.",
    "listImg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-teal-500/10 to-emerald-500/10",
    "colorClass": "text-teal-400",
    "borderClass": "border-teal-500/20",
    "glowClass": "rgba(20,184,166,0.06)",
    "accentColor": "#14b8a6",
    "metrics": [
      {
        "label": "Direct Bookings Lift",
        "value": "+35%"
      },
      {
        "label": "Guest Satisfaction",
        "value": "4.9/5"
      }
    ],
    "sort_order": 2
  },
  {
    "slug": "restaurants-cafes",
    "title": "Restaurants & Cafes",
    "description": "Contactless QR ordering, cloud POS sync, kitchen display feeds, and loyalty rewards.",
    "detailDescription": "We develop fast digital ordering interfaces, table reservation matrices, real-time kitchen display units (KDU), and personalized loyalty programs that boost diner retention and lower dependency on third-party aggregator apps.",
    "listImg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-orange-500/10 to-amber-500/10",
    "colorClass": "text-orange-400",
    "borderClass": "border-orange-500/20",
    "glowClass": "rgba(249,115,22,0.06)",
    "accentColor": "#f97316",
    "metrics": [
      {
        "label": "Table Turnaround Speed",
        "value": "-18 min"
      },
      {
        "label": "Repeat Customer Rate",
        "value": "48%"
      }
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
      {
        "label": "Renderings Delivered",
        "value": "2,500+"
      },
      {
        "label": "Lead-to-Visit Ratio",
        "value": "28%"
      }
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
      {
        "label": "Active Learners",
        "value": "65K+"
      },
      {
        "label": "Fee Collection Rate",
        "value": "99.1%"
      }
    ],
    "sort_order": 5
  },
  {
    "slug": "fashion-clothing",
    "title": "Fashion & Clothing",
    "description": "Editorial D2C storefronts, interactive lookbooks, and omnichannel inventory sync.",
    "detailDescription": "We create high-converting fashion commerce websites, dynamic size-and-fit recommenders, automated collection drops, and warehouse-to-store inventory syncing engines that elevate boutique and enterprise apparel brands.",
    "listImg": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-fuchsia-500/10 to-pink-500/10",
    "colorClass": "text-fuchsia-400",
    "borderClass": "border-fuchsia-500/20",
    "glowClass": "rgba(217,70,239,0.06)",
    "accentColor": "#d946ef",
    "metrics": [
      {
        "label": "Cart Conversion Lift",
        "value": "+31%"
      },
      {
        "label": "Return Rate Reduction",
        "value": "22%"
      }
    ],
    "sort_order": 6
  },
  {
    "slug": "cosmetics-beauty",
    "title": "Cosmetics & Beauty",
    "description": "Personalized skincare routine quizzes, bundle builders, and subscription stores.",
    "detailDescription": "We engineer aesthetic beauty storefronts with AI-powered skin shade matchers, customized product bundling tools, automated auto-replenishment subscriptions, and influencer affiliate management systems.",
    "listImg": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-pink-500/10 to-rose-500/10",
    "colorClass": "text-pink-400",
    "borderClass": "border-pink-500/20",
    "glowClass": "rgba(236,72,153,0.06)",
    "accentColor": "#ec4899",
    "metrics": [
      {
        "label": "Average Order Value",
        "value": "+44%"
      },
      {
        "label": "Subscriber Retention",
        "value": "88%"
      }
    ],
    "sort_order": 7
  },
  {
    "slug": "retail-supermarkets",
    "title": "Retail & Supermarkets",
    "description": "Multi-outlet barcode billing, local delivery apps, and WhatsApp loyalty automation.",
    "detailDescription": "We develop fast retail POS integrations, centralized multi-store inventory sync, local quick-delivery customer applications, and automated WhatsApp order updates that keep neighbourhood stores ahead of large chains.",
    "listImg": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-emerald-500/10 to-green-500/10",
    "colorClass": "text-emerald-400",
    "borderClass": "border-emerald-500/20",
    "glowClass": "rgba(16,185,129,0.06)",
    "accentColor": "#10b981",
    "metrics": [
      {
        "label": "Billing Speed",
        "value": "3x Faster"
      },
      {
        "label": "Stock Out Reduction",
        "value": "65%"
      }
    ],
    "sort_order": 8
  },
  {
    "slug": "construction",
    "title": "Construction & Infrastructure",
    "description": "Site milestone monitors, contractor sub-contracting portals, and BOQ cost tools.",
    "detailDescription": "We construct field engineer mobile trackers, digital project milestone approvals, automated Bill of Quantities (BOQ) cost calculation engines, and vendor payment verification dashboards for developers and infrastructure contractors.",
    "listImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-yellow-500/10 to-amber-500/10",
    "colorClass": "text-yellow-400",
    "borderClass": "border-yellow-500/20",
    "glowClass": "rgba(234,179,8,0.06)",
    "accentColor": "#eab308",
    "metrics": [
      {
        "label": "Projects Tracked",
        "value": "180+"
      },
      {
        "label": "Cost Overrun Savings",
        "value": "19%"
      }
    ],
    "sort_order": 9
  },
  {
    "slug": "automobile-dealers",
    "title": "Automobile & Dealerships",
    "description": "360-degree vehicle showcases, test drive scheduling, and automated service reminders.",
    "detailDescription": "We build interactive 360-degree vehicle visualizers, instant test-drive booking modules, digital trade-in valuation forms, and automated vehicle service reminder systems for auto dealerships and showroom networks.",
    "listImg": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-red-500/10 to-orange-500/10",
    "colorClass": "text-red-400",
    "borderClass": "border-red-500/20",
    "glowClass": "rgba(239,68,68,0.06)",
    "accentColor": "#ef4444",
    "metrics": [
      {
        "label": "Test Drive Bookings",
        "value": "4,200+"
      },
      {
        "label": "Service Retention",
        "value": "78%"
      }
    ],
    "sort_order": 10
  },
  {
    "slug": "pharma",
    "title": "Pharma & Life Sciences",
    "description": "Batch expiry trackers, distributor order networks, and healthcare compliance portals.",
    "detailDescription": "We engineer regulatory-compliant pharmaceutical portals, batch code traceability pipelines, distributor order fulfillment apps, and doctor product information portals tailored for pharmaceutical manufacturers and marketing divisions.",
    "listImg": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-cyan-500/10 to-blue-500/10",
    "colorClass": "text-cyan-400",
    "borderClass": "border-cyan-500/20",
    "glowClass": "rgba(6,182,212,0.06)",
    "accentColor": "#06b6d4",
    "metrics": [
      {
        "label": "Batch Audit Passing",
        "value": "100%"
      },
      {
        "label": "Distributor Sync Speed",
        "value": "Realtime"
      }
    ],
    "sort_order": 11
  },
  {
    "slug": "packaging",
    "title": "Packaging & Industrial Printing",
    "description": "Dynamic box dimension customizers, instant automated quote engines, and job trackers.",
    "detailDescription": "We create 3D packaging preview configurators, GSM-and-ply automated cost estimation engines, and live job-card production status boards for corrugated box, mono-carton, and flexible packaging manufacturers.",
    "listImg": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-amber-500/10 to-yellow-500/10",
    "colorClass": "text-amber-400",
    "borderClass": "border-amber-500/20",
    "glowClass": "rgba(245,158,11,0.06)",
    "accentColor": "#f59e0b",
    "metrics": [
      {
        "label": "Quote Turnaround Time",
        "value": "Instant"
      },
      {
        "label": "Waste Reduction",
        "value": "24%"
      }
    ],
    "sort_order": 12
  },
  {
    "slug": "logistics-transport",
    "title": "Logistics & Transport",
    "description": "GPS fleet telemetry, smart route optimization, driver apps, and client parcel tracking.",
    "detailDescription": "We build real-time GPS fleet dashboards, AI-driven vehicle route dispatch systems, driver proof-of-delivery (POD) scanners, and customer tracking portals that minimize fuel costs and improve delivery punctuality.",
    "listImg": "/media/images/industries/logistics.png",
    "detailImg": "/media/images/industries/logistics.png",
    "bg": "from-orange-500/10 to-red-500/10",
    "colorClass": "text-orange-400",
    "borderClass": "border-orange-500/20",
    "glowClass": "rgba(249,115,22,0.06)",
    "accentColor": "#f97316",
    "metrics": [
      {
        "label": "Fleet Miles Optimized",
        "value": "2.4M+"
      },
      {
        "label": "On-Time Dispatch",
        "value": "98.8%"
      }
    ],
    "sort_order": 13
  },
  {
    "slug": "finance-ca-firms",
    "title": "Finance & CA Firms",
    "description": "Encrypted client document vaults, GST/tax filing trackers, and advisory portals.",
    "detailDescription": "We build bank-grade encrypted document collection vaults, automated tax milestone notifications, client balance sheet dashboards, and secure billing portals tailored for chartered accountants, auditors, and financial planners.",
    "listImg": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-emerald-500/10 to-teal-500/10",
    "colorClass": "text-emerald-400",
    "borderClass": "border-emerald-500/20",
    "glowClass": "rgba(16,185,129,0.06)",
    "accentColor": "#10b981",
    "metrics": [
      {
        "label": "Documents Encrypted",
        "value": "500K+"
      },
      {
        "label": "Compliance Accuracy",
        "value": "100%"
      }
    ],
    "sort_order": 14
  },
  {
    "slug": "legal-firms",
    "title": "Legal Firms & Attorneys",
    "description": "Confidential case file managers, hearing schedule calendars, and digital retainer signing.",
    "detailDescription": "We create highly secure client onboarding portals, hearing date calendar integrations with automated court diary sync, digital contract signing workflows, and automated time-tracking billing for law firms and corporate legal counsels.",
    "listImg": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-indigo-500/10 to-purple-500/10",
    "colorClass": "text-indigo-400",
    "borderClass": "border-indigo-500/20",
    "glowClass": "rgba(99,102,241,0.06)",
    "accentColor": "#6366f1",
    "metrics": [
      {
        "label": "Case Matters Managed",
        "value": "12,000+"
      },
      {
        "label": "Data Privacy Rating",
        "value": "Tier-1"
      }
    ],
    "sort_order": 15
  },
  {
    "slug": "corporate-b2b",
    "title": "Corporate & B2B Services",
    "description": "Enterprise client portals, RFP quote generators, and automated SLA dashboards.",
    "detailDescription": "We construct enterprise client collaboration workspaces, automated proposal and contract generators, project deliverable review matrices, and SLA performance dashboards for B2B consultancies and professional service firms.",
    "listImg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-slate-500/10 to-neutral-500/10",
    "colorClass": "text-neutral-300",
    "borderClass": "border-white/20",
    "glowClass": "rgba(255,255,255,0.06)",
    "accentColor": "#e5e5e5",
    "metrics": [
      {
        "label": "Proposals Dispatched",
        "value": "8,500+"
      },
      {
        "label": "Client Retention Rate",
        "value": "96%"
      }
    ],
    "sort_order": 16
  },
  {
    "slug": "travel-tourism",
    "title": "Travel & Tourism",
    "description": "Custom tour itinerary builders, multi-currency booking engines, and visa assistance.",
    "detailDescription": "We engineer dynamic travel itinerary planners, multi-supplier airline/hotel API integration engines, automated voucher generation, and secure multi-currency payment checkout flows for travel agencies and destination management companies.",
    "listImg": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-sky-500/10 to-teal-500/10",
    "colorClass": "text-sky-400",
    "borderClass": "border-sky-500/20",
    "glowClass": "rgba(14,165,233,0.06)",
    "accentColor": "#0ea5e9",
    "metrics": [
      {
        "label": "Itineraries Booked",
        "value": "45K+"
      },
      {
        "label": "Booking Conversion",
        "value": "+38%"
      }
    ],
    "sort_order": 17
  },
  {
    "slug": "wedding-event",
    "title": "Wedding & Event Management",
    "description": "Interactive guest RSVP portals, vendor coordination boards, and live event photo hubs.",
    "detailDescription": "We craft branded wedding guest portals with digital invites, seating arrangement planners, vendor coordination dashboards, and real-time event photo sharing galleries that make large-scale celebrations effortless to coordinate.",
    "listImg": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-rose-500/10 to-amber-500/10",
    "colorClass": "text-rose-400",
    "borderClass": "border-rose-500/20",
    "glowClass": "rgba(244,63,94,0.06)",
    "accentColor": "#f43f5e",
    "metrics": [
      {
        "label": "Events Managed",
        "value": "350+"
      },
      {
        "label": "RSVP Response Rate",
        "value": "94%"
      }
    ],
    "sort_order": 18
  },
  {
    "slug": "furniture-interior",
    "title": "Furniture & Interior Design",
    "description": "3D room staging previewers, custom modular furniture quote tools, and design portfolios.",
    "detailDescription": "We create interactive 3D modular furniture customizers, interior project portfolio showcases, instant material cost estimators, and on-site project progress trackers for architecture firms and luxury furniture studios.",
    "listImg": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-amber-500/10 to-stone-500/10",
    "colorClass": "text-amber-400",
    "borderClass": "border-amber-500/20",
    "glowClass": "rgba(245,158,11,0.06)",
    "accentColor": "#f59e0b",
    "metrics": [
      {
        "label": "3D Visualizations Rendered",
        "value": "15,000+"
      },
      {
        "label": "Deal Closing Speed",
        "value": "2x Faster"
      }
    ],
    "sort_order": 19
  },
  {
    "slug": "solar-renewable",
    "title": "Solar & Renewable Energy",
    "description": "Rooftop solar ROI calculators, subsidy lead generators, and panel telemetry trackers.",
    "detailDescription": "We develop rooftop solar feasibility calculators, automated government subsidy application trackers, field survey mobile tools, and solar generation telemetry dashboards for EPC contractors and clean-energy providers.",
    "listImg": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-yellow-500/10 to-green-500/10",
    "colorClass": "text-yellow-400",
    "borderClass": "border-yellow-500/20",
    "glowClass": "rgba(234,179,8,0.06)",
    "accentColor": "#eab308",
    "metrics": [
      {
        "label": "Solar KW Calculated",
        "value": "45 MW+"
      },
      {
        "label": "Lead-to-Survey Rate",
        "value": "34%"
      }
    ],
    "sort_order": 20
  },
  {
    "slug": "agriculture-agro",
    "title": "Agriculture & Agro Products",
    "description": "Farm-to-fork traceability portals, APMC mandi rate aggregation, and agro input apps.",
    "detailDescription": "We engineer farm-to-fork batch traceability portals, live APMC/Mandi rate aggregation dashboards, agro-chemical distributor order apps, and cold-storage inventory monitoring tools for agricultural exporters and FPOs.",
    "listImg": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-green-500/10 to-emerald-500/10",
    "colorClass": "text-green-400",
    "borderClass": "border-green-500/20",
    "glowClass": "rgba(34,197,94,0.06)",
    "accentColor": "#22c55e",
    "metrics": [
      {
        "label": "Farmers Connected",
        "value": "30,000+"
      },
      {
        "label": "Price Transparency",
        "value": "100% Realtime"
      }
    ],
    "sort_order": 21
  },
  {
    "slug": "fmcg-consumer-brands",
    "title": "FMCG & Consumer Brands",
    "description": "Secondary sales tracking apps, retail scheme engines, and D2C online channels.",
    "detailDescription": "We build field sales representative order capture apps, distributor billing matrices, retail trade scheme calculators, and direct-to-consumer digital commerce platforms for growing consumer packaged goods brands.",
    "listImg": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-teal-500/10 to-cyan-500/10",
    "colorClass": "text-teal-400",
    "borderClass": "border-teal-500/20",
    "glowClass": "rgba(20,184,166,0.06)",
    "accentColor": "#14b8a6",
    "metrics": [
      {
        "label": "Retail Outlets Reached",
        "value": "85,000+"
      },
      {
        "label": "Order Sync Latency",
        "value": "< 1 Sec"
      }
    ],
    "sort_order": 22
  },
  {
    "slug": "electronics-mobile",
    "title": "Electronics & Mobile",
    "description": "Specification comparison portals, serial warranty registers, and repair ticket hubs.",
    "detailDescription": "We craft tech spec comparison engines, serial number warranty verification systems, repair ticket progress tracking apps, and EMI / finance eligibility calculators for electronics retailers and regional gadget brands.",
    "listImg": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-blue-500/10 to-cyan-500/10",
    "colorClass": "text-blue-400",
    "borderClass": "border-blue-500/20",
    "glowClass": "rgba(59,130,246,0.06)",
    "accentColor": "#3b82f6",
    "metrics": [
      {
        "label": "Warranties Registered",
        "value": "120K+"
      },
      {
        "label": "Repair Turnaround",
        "value": "-35% Time"
      }
    ],
    "sort_order": 23
  },
  {
    "slug": "gym-fitness",
    "title": "Gym & Fitness Centers",
    "description": "Mobile membership pass QR check-ins, automated subscription debits, and diet planners.",
    "detailDescription": "We create mobile membership pass apps with QR check-in, automated monthly subscription debit systems, personalized workout/diet chart delivery, and trainer booking portals for fitness centers and crossfit gyms.",
    "listImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-red-500/10 to-pink-500/10",
    "colorClass": "text-red-400",
    "borderClass": "border-red-500/20",
    "glowClass": "rgba(239,68,68,0.06)",
    "accentColor": "#ef4444",
    "metrics": [
      {
        "label": "Members Managed",
        "value": "18,000+"
      },
      {
        "label": "Renewal Rate Lift",
        "value": "+29%"
      }
    ],
    "sort_order": 24
  },
  {
    "slug": "wellness-lifestyle",
    "title": "Wellness & Lifestyle",
    "description": "Spa appointment schedulers, therapist calendars, and curated wellness retail stores.",
    "detailDescription": "We develop intuitive treatment booking portals, therapist availability managers, customized wellness package builders, and curated organic lifestyle retail stores for wellness retreats, yoga studios, and ayurvedic spas.",
    "listImg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-emerald-500/10 to-teal-500/10",
    "colorClass": "text-emerald-400",
    "borderClass": "border-emerald-500/20",
    "glowClass": "rgba(16,185,129,0.06)",
    "accentColor": "#10b981",
    "metrics": [
      {
        "label": "Appointments Booked",
        "value": "60K+"
      },
      {
        "label": "Repeat Visits",
        "value": "52%"
      }
    ],
    "sort_order": 25
  },
  {
    "slug": "pet-care",
    "title": "Pet Care & Veterinary",
    "description": "Veterinary consultation schedulers, pet medical history vaults, and food subscriptions.",
    "detailDescription": "We build veterinary consultation booking systems, digital vaccination history records, pet grooming scheduling calendars, and automated pet nutrition subscription checkouts for pet clinics and pet supply retailers.",
    "listImg": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-amber-500/10 to-orange-500/10",
    "colorClass": "text-amber-400",
    "borderClass": "border-amber-500/20",
    "glowClass": "rgba(245,158,11,0.06)",
    "accentColor": "#f59e0b",
    "metrics": [
      {
        "label": "Pets Registered",
        "value": "14,500+"
      },
      {
        "label": "Vaccine Reminder Sync",
        "value": "97%"
      }
    ],
    "sort_order": 26
  },
  {
    "slug": "coworking-commercial",
    "title": "Co-working & Commercial Spaces",
    "description": "Hot desk / meeting room bookers, access control sync, and automated tenant invoicing.",
    "detailDescription": "We construct real-time meeting room and hot-desk reservation portals, automated monthly tenant invoice generation, visitor log management, and community networking boards for flexible workspaces and commercial business parks.",
    "listImg": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-indigo-500/10 to-blue-500/10",
    "colorClass": "text-indigo-400",
    "borderClass": "border-indigo-500/20",
    "glowClass": "rgba(99,102,241,0.06)",
    "accentColor": "#6366f1",
    "metrics": [
      {
        "label": "Desks Managed",
        "value": "8,200+"
      },
      {
        "label": "Occupancy Rate",
        "value": "92%"
      }
    ],
    "sort_order": 27
  },
  {
    "slug": "import-export",
    "title": "Import & Export Trading",
    "description": "Live container cargo trackers, customs document generators, and forex rate quoters.",
    "detailDescription": "We engineer live container freight tracking portals, automated commercial invoice and packing list generators, live forex currency converters, and global buyer enquiry portals for international trading houses and clearing agents.",
    "listImg": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&h=600&q=80",
    "detailImg": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&h=600&q=80",
    "bg": "from-cyan-500/10 to-teal-500/10",
    "colorClass": "text-cyan-400",
    "borderClass": "border-cyan-500/20",
    "glowClass": "rgba(6,182,212,0.06)",
    "accentColor": "#06b6d4",
    "metrics": [
      {
        "label": "Containers Tracked",
        "value": "25,000+"
      },
      {
        "label": "Documentation Speed",
        "value": "4x Faster"
      }
    ],
    "sort_order": 28
  }
]

DEFAULT_INDUSTRY_PROJECTS = [
  {
    "title": "AeroPlant ERP Grid",
    "industryId": "manufacturing",
    "description": "Centralized multi-factory manufacturing operations portal with live production shift monitoring and automated raw material reordering.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL",
      "MQTT"
    ],
    "client": "Apex Precision Engineering",
    "sort_order": 1
  },
  {
    "title": "ProFlow Machine Telemetry",
    "industryId": "manufacturing",
    "description": "IoT sensor ingestion system monitoring spindle vibration and heat metrics across 40 CNC machines with predictive maintenance alerts.",
    "tech": [
      "Python",
      "TimescaleDB",
      "Redis",
      "Grafana"
    ],
    "client": "Sterling Forgings Ltd",
    "sort_order": 2
  },
  {
    "title": "StayLux Direct Booking Engine",
    "industryId": "hotels-resorts",
    "description": "Luxury resort reservation portal featuring dynamic pricing algorithms, room inventory sync, and multi-currency checkout.",
    "tech": [
      "Next.js",
      "Stripe API",
      "PostgreSQL"
    ],
    "client": "StayLux Resorts",
    "sort_order": 3
  },
  {
    "title": "GuestWave Concierge Portal",
    "industryId": "hotels-resorts",
    "description": "Mobile web guest concierge enabling guests to order in-room dining, book spa appointments, and chat with the front desk.",
    "tech": [
      "React",
      "Firebase",
      "WebSockets"
    ],
    "client": "Palacio Heritage Hotels",
    "sort_order": 4
  },
  {
    "title": "TableOrder QR & POS Sync",
    "industryId": "restaurants-cafes",
    "description": "Contactless dining menu ordering system integrated directly with thermal kitchen printers and cloud POS billing.",
    "tech": [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB"
    ],
    "client": "The Rustic Table Chain",
    "sort_order": 5
  },
  {
    "title": "DineRepeat Loyalty Matrix",
    "industryId": "restaurants-cafes",
    "description": "Automated customer retention platform delivering targeted WhatsApp dining offers based on visit frequency and spend tiers.",
    "tech": [
      "FastAPI",
      "WhatsApp Cloud API",
      "PostgreSQL"
    ],
    "client": "Brew & Bean Cafes",
    "sort_order": 6
  },
  {
    "title": "Skyline 3D Walkthrough Portal",
    "industryId": "realestate",
    "description": "Interactive architectural walkthrough platform rendering 4K unit previews and vector masterplan lot availability.",
    "tech": [
      "Three.js",
      "WebGL",
      "React",
      "AWS S3"
    ],
    "client": "Skyline Developers",
    "sort_order": 7
  },
  {
    "title": "RealtyPulse Lead Matrix",
    "industryId": "realestate",
    "description": "Automated broker lead distribution CRM with instant WhatsApp site-visit scheduling and broker commission calculators.",
    "tech": [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "Prime Habitat Realty",
    "sort_order": 8
  },
  {
    "title": "SkillPath LMS Platform",
    "industryId": "education",
    "description": "Scalable digital learning ecosystem with interactive video lectures, adaptive quizzes, and auto-generated certificates.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL",
      "Mux Video"
    ],
    "client": "SkillPath Institute",
    "sort_order": 9
  },
  {
    "title": "EduAdmin Campus Suite",
    "industryId": "education",
    "description": "Centralized student admission, digital fee collection, and attendance management software for multi-branch institutions.",
    "tech": [
      "Next.js",
      "Razorpay API",
      "FastAPI"
    ],
    "client": "Oxford Global Academy",
    "sort_order": 10
  },
  {
    "title": "VogueAura Headless Storefront",
    "industryId": "fashion-clothing",
    "description": "Ultra-fast headless luxury fashion storefront with 3D garment previews and dynamic colorway customizers.",
    "tech": [
      "Next.js",
      "Shopify Storefront API",
      "TailwindCSS"
    ],
    "client": "VogueAura London",
    "sort_order": 11
  },
  {
    "title": "FitSense Sizing Engine",
    "industryId": "fashion-clothing",
    "description": "Interactive body measurement and size recommendation engine that reduced return rates by 22% for apparel brands.",
    "tech": [
      "React",
      "TensorFlow.js",
      "FastAPI"
    ],
    "client": "UrbanThread Studios",
    "sort_order": 12
  },
  {
    "title": "GlowBotanics Skin Diagnostic",
    "industryId": "cosmetics-beauty",
    "description": "Personalized 60-second skincare assessment quiz that generates customized beauty routines and one-click bundles.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "client": "GlowBotanics Organics",
    "sort_order": 13
  },
  {
    "title": "LuxeCare Auto-Replenish",
    "industryId": "cosmetics-beauty",
    "description": "Subscription checkout platform with flexible delivery cadences, loyalty points integration, and automated recurring billing.",
    "tech": [
      "Next.js",
      "Stripe Subscriptions",
      "Redis"
    ],
    "client": "LuxeCare Labs",
    "sort_order": 14
  },
  {
    "title": "OmniStore Multi-POS Matrix",
    "industryId": "retail-supermarkets",
    "description": "Unified inventory synchronization engine connecting 14 supermarket branches with real-time barcode checkout terminals.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "client": "FreshMart Superstores",
    "sort_order": 15
  },
  {
    "title": "SpeedyCart Local Delivery App",
    "industryId": "retail-supermarkets",
    "description": "Neighborhood 30-minute grocery delivery platform with live rider GPS tracking and automated order dispatch.",
    "tech": [
      "Flutter",
      "Node.js",
      "MongoDB",
      "Google Maps API"
    ],
    "client": "DailyNeed Retailers",
    "sort_order": 16
  },
  {
    "title": "BuildTrack Milestone Hub",
    "industryId": "construction",
    "description": "Civil engineering site monitoring platform capturing daily progress logs, material receipts, and architect sign-offs.",
    "tech": [
      "React",
      "FastAPI",
      "AWS S3",
      "PostgreSQL"
    ],
    "client": "InfraCore Builders",
    "sort_order": 17
  },
  {
    "title": "QuantBOQ Cost Estimator",
    "industryId": "construction",
    "description": "Automated Bill of Quantities (BOQ) cost calculation tool calculating steel, concrete, and labor rates against master schedules.",
    "tech": [
      "Next.js",
      "Python",
      "PostgreSQL"
    ],
    "client": "Apex Structural Engineers",
    "sort_order": 18
  },
  {
    "title": "AutoShowroom 360 Visualizer",
    "industryId": "automobile-dealers",
    "description": "Web-based 360-degree vehicle interior and exterior customizer with accessory selection and instant EMI quotes.",
    "tech": [
      "Three.js",
      "React",
      "WebGL"
    ],
    "client": "SpeedStar Auto Group",
    "sort_order": 19
  },
  {
    "title": "DriveSync Service Scheduler",
    "industryId": "automobile-dealers",
    "description": "Dealership service appointment portal with live bay status tracking, parts estimate approvals, and automated SMS reminders.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "client": "Elite Motors Network",
    "sort_order": 20
  },
  {
    "title": "PharmaTrack Batch Compliance",
    "industryId": "pharma",
    "description": "Serialized pharmaceutical batch code verification system enabling distributors to track batch certificates and expiry schedules.",
    "tech": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker"
    ],
    "client": "BioCore Pharma LLP",
    "sort_order": 21
  },
  {
    "title": "MedOrder Distributor Portal",
    "industryId": "pharma",
    "description": "B2B stock ordering portal for 400+ pharmacy distributors with live inventory status, credit limits, and invoice generation.",
    "tech": [
      "React",
      "Python",
      "MongoDB"
    ],
    "client": "MedLife Formulations",
    "sort_order": 22
  },
  {
    "title": "BoxCraft 3D Die-Line Studio",
    "industryId": "packaging",
    "description": "Online 3D corrugated box customizer calculating board strength, flute density, and instant wholesale manufacturing quotations.",
    "tech": [
      "Three.js",
      "React",
      "FastAPI"
    ],
    "client": "Universal Packaging Corp",
    "sort_order": 23
  },
  {
    "title": "PrintFlow Job-Card Manager",
    "industryId": "packaging",
    "description": "Factory production tracking board managing prepress approvals, lamination queues, die-cutting, and shipping dispatches.",
    "tech": [
      "Next.js",
      "PostgreSQL",
      "Socket.io"
    ],
    "client": "Apex Cartons & Prints",
    "sort_order": 24
  },
  {
    "title": "FreightPulse Fleet Telemetry",
    "industryId": "logistics-transport",
    "description": "Real-time GPS fleet monitoring dashboard with geofence breach alerts, driver behavior scoring, and fuel theft detection.",
    "tech": [
      "React",
      "FastAPI",
      "PostGIS",
      "TimescaleDB"
    ],
    "client": "FreightPulse Logistics",
    "sort_order": 25
  },
  {
    "title": "RouteOptima Dispatch Engine",
    "industryId": "logistics-transport",
    "description": "Multi-stop delivery route optimization algorithm that reduced fleet fuel consumption by 22% across interstate routes.",
    "tech": [
      "Python",
      "Google Maps Matrix API",
      "Redis"
    ],
    "client": "CrossCountry Express",
    "sort_order": 26
  },
  {
    "title": "TaxVault Client Repository",
    "industryId": "finance-ca-firms",
    "description": "Encrypted client financial document exchange repository with automatic GST filing checklist reminders and e-signatures.",
    "tech": [
      "Next.js",
      "FastAPI",
      "AWS KMS",
      "PostgreSQL"
    ],
    "client": "Mehta & Associates CAs",
    "sort_order": 27
  },
  {
    "title": "FinAdviser Portfolio Matrix",
    "industryId": "finance-ca-firms",
    "description": "Wealth advisory dashboard aggregating mutual funds, fixed returns, and tax liabilities into monthly automated PDF digests.",
    "tech": [
      "React",
      "Python",
      "Chart.js"
    ],
    "client": "Equitas Wealth Advisory",
    "sort_order": 28
  },
  {
    "title": "LexDocket Case Manager",
    "industryId": "legal-firms",
    "description": "Confidential legal case file portal with automated court hearing calendar sync and secure client document exchange.",
    "tech": [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "Singhania & Partners Law",
    "sort_order": 29
  },
  {
    "title": "ContractSign Retainer Suite",
    "industryId": "legal-firms",
    "description": "Digital legal engagement signing platform with biometric timestamp audit trails and automated retainer billing.",
    "tech": [
      "React",
      "Node.js",
      "MongoDB",
      "Crypto"
    ],
    "client": "Vanguard Legal Chambers",
    "sort_order": 30
  },
  {
    "title": "EnterpriseSync B2B Portal",
    "industryId": "corporate-b2b",
    "description": "Client collaboration portal providing enterprise clients with live project milestone tracking and deliverable sign-offs.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "Stellaris Consulting Group",
    "sort_order": 31
  },
  {
    "title": "ProposalFlow RFP Builder",
    "industryId": "corporate-b2b",
    "description": "Automated enterprise proposal and RFP generator creating branded pitch decks and cost schedules in minutes.",
    "tech": [
      "Next.js",
      "Python",
      "TailwindCSS"
    ],
    "client": "Benchmark Corporate Solutions",
    "sort_order": 32
  },
  {
    "title": "WanderCraft Dynamic Itinerary",
    "industryId": "travel-tourism",
    "description": "Customizable multi-city holiday package builder with live flight/hotel pricing and instant PDF voucher generation.",
    "tech": [
      "Next.js",
      "Amadeus API",
      "PostgreSQL"
    ],
    "client": "Wanderlust Journeys",
    "sort_order": 33
  },
  {
    "title": "TourPass Booking Portal",
    "industryId": "travel-tourism",
    "description": "Multi-currency excursion and attraction ticketing portal with instant QR ticket delivery and multi-lingual guides.",
    "tech": [
      "React",
      "Stripe Payments",
      "Node.js"
    ],
    "client": "Voyageur Global Holidays",
    "sort_order": 34
  },
  {
    "title": "CelebrationPass RSVP Hub",
    "industryId": "wedding-event",
    "description": "Luxury digital wedding invite portal with interactive guest RSVP trackers, travel coordinator boards, and live itineraries.",
    "tech": [
      "Next.js",
      "Firebase",
      "Framer Motion"
    ],
    "client": "The Royal Knot Events",
    "sort_order": 35
  },
  {
    "title": "EventSync Vendor Board",
    "industryId": "wedding-event",
    "description": "Real-time vendor milestone management software coordinating decorators, caterers, and photographers across multi-day galas.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "client": "Grandeur Celebrations",
    "sort_order": 36
  },
  {
    "title": "RoomCraft 3D Staging Suite",
    "industryId": "furniture-interior",
    "description": "Interactive WebGL room visualizer enabling homeowners to position modular sofas, tables, and lighting in real-time dimensions.",
    "tech": [
      "Three.js",
      "WebGL",
      "React"
    ],
    "client": "WoodCraft Studios",
    "sort_order": 37
  },
  {
    "title": "InteriorQuote BOQ Studio",
    "industryId": "furniture-interior",
    "description": "Instant interior design estimate engine calculating square-footage woodwork, veneer, and hardware pricing accurately.",
    "tech": [
      "Next.js",
      "PostgreSQL",
      "FastAPI"
    ],
    "client": "DesignSpace Architects",
    "sort_order": 38
  },
  {
    "title": "SunPower Feasibility Calculator",
    "industryId": "solar-renewable",
    "description": "Rooftop solar savings and subsidy calculation engine generating customized 25-year financial ROI reports for clients.",
    "tech": [
      "React",
      "FastAPI",
      "Chart.js"
    ],
    "client": "SunRay Green Energy",
    "sort_order": 39
  },
  {
    "title": "SolarTelemetry Grid Monitor",
    "industryId": "solar-renewable",
    "description": "Live solar panel telemetry monitor tracking daily energy generation, inverter efficiency, and maintenance alerts.",
    "tech": [
      "Python",
      "TimescaleDB",
      "React"
    ],
    "client": "Helix Solar Parks",
    "sort_order": 40
  },
  {
    "title": "AgriTrace Farm-to-Fork",
    "industryId": "agriculture-agro",
    "description": "Batch crop traceability portal providing export buyers with harvest dates, soil lab reports, and pesticide compliance records.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "GreenHarvest Agro Exporters",
    "sort_order": 41
  },
  {
    "title": "MandiPulse Rate Aggregator",
    "industryId": "agriculture-agro",
    "description": "Real-time APMC mandi commodity rate tracker providing farmers and traders with daily live crop rate updates via web and SMS.",
    "tech": [
      "FastAPI",
      "Python",
      "Redis",
      "Twilio"
    ],
    "client": "KisanVikas Federation",
    "sort_order": 42
  },
  {
    "title": "SalesField Rep Dispatcher",
    "industryId": "fmcg-consumer-brands",
    "description": "Field sales tracking application recording retailer orders, store visit GPS logs, and target fulfillment in real-time.",
    "tech": [
      "Flutter",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "NourishFresh Foods",
    "sort_order": 43
  },
  {
    "title": "TradeScheme Rebate Portal",
    "industryId": "fmcg-consumer-brands",
    "description": "Automated dealer trade discount and incentive calculator calculating seasonal volume payouts for 2,000+ distributors.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "client": "Heritage Consumer Goods",
    "sort_order": 44
  },
  {
    "title": "TechCompare Gadget Selector",
    "industryId": "electronics-mobile",
    "description": "High-speed electronics specification comparison engine with side-by-side benchmark scores and live stock check.",
    "tech": [
      "Next.js",
      "Algolia Search",
      "TailwindCSS"
    ],
    "client": "GadgetZone Retail",
    "sort_order": 45
  },
  {
    "title": "WarrantySync Ticket Desk",
    "industryId": "electronics-mobile",
    "description": "Serial-number warranty registry and customer repair tracking portal with automated status SMS notifications.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "AcroVolt Electronics",
    "sort_order": 46
  },
  {
    "title": "FitPass Member Mobile Suite",
    "industryId": "gym-fitness",
    "description": "Mobile membership pass application featuring QR turnstile check-in, automated membership renewals, and class booking.",
    "tech": [
      "React Native",
      "Node.js",
      "Stripe Subscriptions"
    ],
    "client": "IronCore Fitness Clubs",
    "sort_order": 47
  },
  {
    "title": "TrainerSync Workout Studio",
    "industryId": "gym-fitness",
    "description": "Personal trainer scheduling and client workout log platform tracking body composition metrics and diet milestones.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "Pulse Performance Gyms",
    "sort_order": 48
  },
  {
    "title": "Sanctuary Spa Scheduler",
    "industryId": "wellness-lifestyle",
    "description": "Intuitive treatment booking portal with therapist availability sync, treatment customization, and package gift vouchers.",
    "tech": [
      "Next.js",
      "Stripe",
      "PostgreSQL"
    ],
    "client": "Sanctuary Wellness Retreat",
    "sort_order": 49
  },
  {
    "title": "AyurLifestyle Curated Store",
    "industryId": "wellness-lifestyle",
    "description": "Ayurvedic wellness e-commerce portal with dosha assessment quiz and customized herbal supplement recommendations.",
    "tech": [
      "React",
      "Shopify API",
      "Node.js"
    ],
    "client": "VedaLiving Organic",
    "sort_order": 50
  },
  {
    "title": "VetCare Clinic Scheduler",
    "industryId": "pet-care",
    "description": "Veterinary appointment booking software with digital pet vaccination passports and automated deworming reminders.",
    "tech": [
      "React",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "PetPaws Hospital Network",
    "sort_order": 51
  },
  {
    "title": "PawNutrition Auto-Delivery",
    "industryId": "pet-care",
    "description": "Pet diet and prescription food subscription checkout platform calculating breed-specific nutrition portions.",
    "tech": [
      "Next.js",
      "Stripe Subscriptions",
      "PostgreSQL"
    ],
    "client": "TailWaggers Nutrition",
    "sort_order": 52
  },
  {
    "title": "SpaceHub Desk & Room Booker",
    "industryId": "coworking-commercial",
    "description": "Live floorplan hot-desk and conference room reservation portal with automated monthly membership invoice generation.",
    "tech": [
      "React",
      "Node.js",
      "PostgreSQL",
      "Razorpay"
    ],
    "client": "SpaceHub Co-works",
    "sort_order": 53
  },
  {
    "title": "AccessPulse Visitor Manager",
    "industryId": "coworking-commercial",
    "description": "Digital visitor check-in kiosk system with host notification pings and Wi-Fi credential auto-generation.",
    "tech": [
      "Next.js",
      "FastAPI",
      "Twilio API"
    ],
    "client": "Nexus Business Towers",
    "sort_order": 54
  },
  {
    "title": "PortStream Container Tracker",
    "industryId": "import-export",
    "description": "Live maritime container tracking portal consolidating bill of lading milestones, customs clearance status, and demurrage alerts.",
    "tech": [
      "React",
      "AIS Vessel Tracking API",
      "FastAPI",
      "PostgreSQL"
    ],
    "client": "Oceanic Global Trade",
    "sort_order": 55
  },
  {
    "title": "DocuExport Customs Engine",
    "industryId": "import-export",
    "description": "Automated export commercial invoice, packing list, and certificate of origin generator supporting multi-currency forex rates.",
    "tech": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React"
    ],
    "client": "Apex TransGlobal Trading",
    "sort_order": 56
  }
]

DEFAULT_CONTACT_SETTINGS = {
    "title": "Let's Create Together",
    "subtitle": "Have a project in mind, want to inquire about custom solutions, or simply want to say hello? We'd love to hear from you.",
    "email_hello": "hello@harikrushndigiverse.com",
    "email_join": "join@harikrushndigiverse.com",
    "phone": "+91 98765 43210",
    "stats": [
        {"label": "2-4 Hour Response", "value": "Mon — Sat", "icon": "time"},
        {"label": "Global Clients", "value": "India • USA • UK • UAE", "icon": "globe"},
        {"label": "Free Consultation", "value": "No obligation quote", "icon": "shield"}
    ]
}

# Default hardcoded content representing original site data
DEFAULT_CONTENT = {
    "hero": {
        "label": "// EST. 2019 — A DIGITAL ATELIER",
        "title1": "Architecting the",
        "title2": "infinite digital.",
        "desc": "HariKrushn DigiVerse is an engineering & design partnership building custom software, AI systems and digital brand presence for ambitious global teams.",
        "frameCount": 792,
        "mobileFrameCount": 868
    },
    "brands": {
        "show": True,
        "fontSize": "36px",
        "imageSize": "56px",
        "list": [
            { "name": "SAPHIRA", "logo": "/media/images/logos/saphira_logo.png" },
            { "name": "NOVA", "logo": "/media/images/logos/nova_logo.png" },
            { "name": "CORE", "logo": "/media/images/logos/core_logo.png" },
            { "name": "AETHER", "logo": "/media/images/logos/aether_logo.png" },
            { "name": "QUANTUM", "logo": "/media/images/logos/quantum_logo.png" },
            { "name": "VERTEX", "logo": "/media/images/logos/vertex_logo.png" },
            { "name": "HELIOS", "logo": "/media/images/logos/helios_logo.png" },
            { "name": "ORION", "logo": "/media/images/logos/orion_logo.png" },
            { "name": "AXIOM", "logo": "/media/images/logos/axiom_logo.png" }
        ]
    },
    "stats": [
        { "value": "140+", "label": "Projects Shipped" },
        { "value": "46", "label": "Engineers" },
        { "value": "18", "label": "Countries Served" },
        { "value": "98%", "label": "Client Retention" }
    ],
    "services": [
        { "num": "01/07", "title": "Web Engineering", "desc": "Creating high-fidelity, cinematic, and fast-loading web applications that captivate and convert.", "tags": ["FRONTEND", "DESIGN"], "href": "#service-web", "img": "/media/images/gallery/design_sprint.png", "gradient": "from-blue-500 via-indigo-500 to-cyan-500" },
        { "num": "02/07", "title": "Mobile Applications", "desc": "Building bespoke native-feeling iOS and Android solutions with fluid gestures and offline sync.", "tags": ["IOS", "ANDROID"], "href": "#service-app", "img": "/media/images/gallery/digiverse_workspace.png", "gradient": "from-emerald-500 via-teal-500 to-cyan-500" },
        { "num": "03/07", "title": "Custom Software", "desc": "Constructing robust backend panels, CRM matrices, SaaS dashboards, and multi-tenant systems.", "tags": ["CRM", "ERP"], "href": "#service-custom-software", "img": "/media/images/quantum_banking.png", "gradient": "from-amber-500 via-orange-500 to-yellow-500" },
        { "num": "04/07", "title": "Digital Marketing", "desc": "Driving traffic and client acquisitions using data-backed strategies, SEO, and paid ads.", "tags": ["SEO", "GROWTH"], "href": "#service-digital-marketing", "img": "/media/images/gallery/launch_celebration.png", "gradient": "from-rose-500 via-pink-500 to-purple-500" },
        { "num": "05/07", "title": "Social Media Management", "desc": "Crafting brand presence, graphic design guides, and content calendars to elevate recognition.", "tags": ["BRANDING", "CONTENT"], "href": "#service-social-media-management", "img": "/media/images/gallery/cinematic_review.png", "gradient": "from-pink-500 via-fuchsia-500 to-violet-500" },
        { "num": "06/07", "title": "AI Consulting", "desc": "Developing automated AI agents, vector database search pipelines, and custom LLM integrations.", "tags": ["LLM", "AGENTS"], "href": "#service-ai-consulting", "img": "/media/images/gallery/ai_orchestrator.png", "gradient": "from-purple-500 via-violet-500 to-indigo-500" },
        { "num": "07/07", "title": "IT Consulting", "desc": "Designing Cloud migrations, Docker orchestration files, hardened security, and CI/CD pipelines.", "tags": ["CLOUD", "DEVOPS"], "href": "#service-it-consulting", "img": "/media/images/gallery/hardware_calibration.png", "gradient": "from-sky-500 via-blue-500 to-indigo-500" }
    ],
    "caseStudy": {
        "show": True,
        "client": "AeroCRM Aviation",
        "logo": "/media/images/logos/aerocrm_logo.png",
        "title": "Custom Cloud CRM Platform",
        "label": "Simulation [CRM.v1]",
        "image": "/media/images/gallery/digiverse_workspace.png",
        "linkText": "View Case Study Details",
        "linkHref": "#case-study",
        "points": [
            "Constructed custom CRM dashboards with automated lead tracking pipelines",
            "Built secure client management portal and transaction records matrix",
            "Integrated automated contract signing and PDF invoice generators"
        ]
    },
    "testimonials": {
        "show": True,
        "title": "Trusted by pioneers.",
        "description": "Read what industry leaders say about our custom software engineering, high-fidelity interfaces, and digital architectures.",
        "list": [
            {
                "name": "Alexander Vance",
                "role": "VP of Engineering, Saphira Aviation",
                "quote": "HariKrushn DigiVerse completely transformed our fleet tracking CRM. Their engineering precision, combined with a meticulous design language, gave us a product that is both cinematic and lightning-fast. They operate at the highest level of craftsmanship.",
                "rating": 5,
                "avatar": "/media/images/gallery/avatar_alexander.png",
                "tag": "CUSTOM CRM",
                "color": "from-amber-500/10 to-orange-500/5",
                "glowColor": "rgba(245,158,11,0.25)",
                "tagClass": "text-amber-400 bg-amber-500/10 border-amber-500/20",
                "starClass": "text-amber-500"
            },
            {
                "name": "Elena Rostova",
                "role": "Co-Founder, Nova DeFi",
                "quote": "Building a Web3 platform requires absolute trust and flawless UX. The team didn't just build our interfaces; they co-architected the user flow. Our transaction success rate increased by 40% after launching the new interface.",
                "rating": 5,
                "avatar": "/media/images/gallery/avatar_elena.png",
                "tag": "WEB3 PLATFORM",
                "color": "from-purple-500/10 to-indigo-500/5",
                "glowColor": "rgba(168,85,247,0.25)",
                "tagClass": "text-purple-400 bg-purple-500/10 border-purple-500/20",
                "starClass": "text-purple-500"
            },
            {
                "name": "Marcus Thorn",
                "role": "Head of Product, Core Logistics",
                "quote": "Managing a global supply chain demands real-time data visibility. HariKrushn Digiverse built an AI-driven predictive dispatch matrix that integrated seamlessly with our legacy database. Their work is a masterclass in modern systems integration.",
                "rating": 5,
                "avatar": "/media/images/gallery/avatar_marcus.png",
                "tag": "AI LOGISTICS",
                "color": "from-emerald-500/10 to-teal-500/5",
                "glowColor": "rgba(16,185,129,0.25)",
                "tagClass": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                "starClass": "text-emerald-500"
            }
        ]
    },
    "bottomCta": {
        "show": True,
        "titleNormal": "Let's build the",
        "titleItalic": "future together.",
        "btnText": "Start a Project →",
        "btnLink": "#contact"
    },
    "sectors": ["FINTECH", "HEALTHTECH", "E-COMMERCE", "LOGISTICS", "EDTECH", "REAL ESTATE", "SAAS", "HOSPITALITY"],
    "milestones": [
        { "year": "2024", "title": "Digital Craftsmanship Leader", "description": "Established a premium reputation in cinematic web engineering, high-end AI automation integrations, and luxury UI design." },
        { "year": "2023", "title": "Scaling Enterprise Systems", "description": "Expanded capabilities to construct complex custom CRMs, cloud architectures, and deep AI-driven process automations for global businesses." },
        { "year": "2022", "title": "The Growth Phase", "description": "Built a team of elite designers and developers. Delivered over 50 custom websites, creating immersive user interfaces that set new industry standards." },
        { "year": "2021", "title": "The Spark of Innovation", "description": "HariKrushn Digiverse LLP was founded with a single mission: to merge fine design aesthetics with robust software engineering." }
    ],
    "gallery": [
        { "title": "The Digiverse Workspace", "category": "Studio", "size": "col-span-2 row-span-1", "image": "/media/images/gallery/digiverse_workspace.png" },
        { "title": "Design Sprint Session", "category": "Team", "size": "col-span-1 row-span-1", "image": "/media/images/gallery/design_sprint.png" },
        { "title": "Hardware Calibration", "category": "Equipment", "size": "col-span-1 row-span-2", "image": "/media/images/gallery/hardware_calibration.png" },
        { "title": "AI Orchestrator Architecture", "category": "Engineering", "size": "col-span-2 row-span-1", "image": "/media/images/gallery/ai_orchestrator.png" },
        { "title": "Cinematic Review", "category": "Studio", "size": "col-span-1 row-span-1", "image": "/media/images/gallery/cinematic_review.png" },
        { "title": "Launch Celebration", "category": "Team", "size": "col-span-2 row-span-1", "image": "/media/images/gallery/launch_celebration.png" }
    ],
    "site_settings": DEFAULT_SITE_SETTINGS,
    "about_us": DEFAULT_ABOUT_US,
    "our_culture": DEFAULT_CULTURE,
    "people": DEFAULT_PEOPLE,
    "awards": DEFAULT_AWARDS,
    "blogs": DEFAULT_BLOGS,
    "portfolio": DEFAULT_PORTFOLIO,
    "ventures": DEFAULT_VENTURES,
    "career_jobs": DEFAULT_CAREER_JOBS,
    "career_perks": DEFAULT_CAREER_PERKS,
    "career_testimonials": DEFAULT_CAREER_TESTIMONIALS,
    "career_faqs": DEFAULT_CAREER_FAQS,
    "contact_offices": DEFAULT_CONTACT_OFFICES,
    "contact_faqs": DEFAULT_CONTACT_FAQS,
    "services_subpages": DEFAULT_SERVICES_SUBPAGES,
    "contact_settings": DEFAULT_CONTACT_SETTINGS,
    "ventures_settings": DEFAULT_VENTURES_SETTINGS,
    "career_settings": DEFAULT_CAREER_SETTINGS,
    "career_job_form_fields": DEFAULT_JOB_FORM_FIELDS,
    "career_intern_form_fields": DEFAULT_INTERN_FORM_FIELDS,
    "career_philosophy_cards": DEFAULT_PHILOSOPHY_CARDS,
    "industries": DEFAULT_INDUSTRIES,
    "industry_projects": DEFAULT_INDUSTRY_PROJECTS,
    "strategic_directives": DEFAULT_STRATEGIC_DIRECTIVES,
    "culture_settings": DEFAULT_CULTURE_SETTINGS
}

# MongoDB connection cache
mongo_client = None
mongo_db = None
mongo_collection = None

def get_mongo_collection():
    global mongo_client, mongo_db, mongo_collection
    if mongo_collection is not None:
        return mongo_collection
        
    if MongoClient is None:
        print("[MongoDB] pymongo is not installed. Using local JSON fallback.")
        return None
        
    uri = os.getenv("MONGODB_URI")
    if not uri:
        print("[MongoDB] MONGODB_URI not found in env. Using local JSON fallback.")
        return None
        
    try:
        # Connect to MongoDB with 5s timeout
        mongo_client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        # Verify connection
        mongo_client.admin.command('ping')
        mongo_db = mongo_client["hk_digiverse"]
        mongo_collection = mongo_db["site_content"]
        print("[MongoDB] Connected to MongoDB successfully!")
        
        # Trigger seeding dynamically on connect
        try:
            from app.db.seed import seed_database
            seed_database()
        except Exception as e:
            print(f"[MongoDB] Seeding trigger warning: {e}")
            
        return mongo_collection
    except Exception as e:
        print(f"[MongoDB] Connection failed: {e}. Using local JSON fallback.")
        mongo_client = None
        mongo_db = None
        mongo_collection = None
        return None

def get_mongo_history_collection():
    global mongo_client, mongo_db
    if mongo_db is not None:
        return mongo_db["content_history"]
    coll = get_mongo_collection()
    if coll is not None and mongo_db is not None:
        return mongo_db["content_history"]
    return None

def verify_admin_password(password: str) -> bool:
    collection = get_mongo_collection()
    if collection is not None:
        try:
            doc = collection.find_one({"identifier": "admin_credentials"})
            if doc and "password" in doc:
                return password == doc["password"]
            else:
                collection.insert_one({"identifier": "admin_credentials", "password": "admin123"})
                return password == "admin123"
        except Exception as e:
            print(f"[MongoDB] Error verifying admin password: {e}")
    return password == os.getenv("ADMIN_PASSWORD", "admin123")

def compile_full_content(base_content: dict) -> dict:
    global mongo_db
    if mongo_db is None:
        return base_content
        
    compiled = {**base_content}
    
    collections_map = {
        "site_settings": ("site_settings", "identifier", "global_settings", DEFAULT_SITE_SETTINGS),
        "about_us": ("about_us", "identifier", "about_us_content", DEFAULT_ABOUT_US),
        "contact_settings": ("contact_settings", "identifier", "contact_page_settings", DEFAULT_CONTACT_SETTINGS),
        "ventures_settings": ("ventures_settings", "identifier", "ventures_page_settings", DEFAULT_VENTURES_SETTINGS),
        "career_settings": ("career_settings", "identifier", "career_page_settings", DEFAULT_CAREER_SETTINGS),
        "culture_settings": ("culture_settings", "identifier", "culture_page_settings", DEFAULT_CULTURE_SETTINGS)
    }
    
    for key, (coll_name, query_field, query_val, fallback) in collections_map.items():
        try:
            doc = mongo_db[coll_name].find_one({query_field: query_val}, {"_id": 0})
            compiled[key] = doc if doc else fallback
        except Exception:
            compiled[key] = base_content.get(key, fallback)
            
    # 2. List based collections to compile (filtered & sorted)
    list_collections_map = {
        "our_culture": ("our_culture", "sort_order", DEFAULT_CULTURE),
        "people": ("people", "sort_order", DEFAULT_PEOPLE),
        "awards": ("awards", "sort_order", DEFAULT_AWARDS),
        "blogs": ("blogs", "slug", DEFAULT_BLOGS),
        "portfolio": ("portfolio", "sort_order", DEFAULT_PORTFOLIO),
        "ventures": ("ventures", "sort_order", DEFAULT_VENTURES),
        "career_jobs": ("career_jobs", "slug", DEFAULT_CAREER_JOBS),
        "career_perks": ("career_perks", "title", DEFAULT_CAREER_PERKS),
        "career_testimonials": ("career_testimonials", "name", DEFAULT_CAREER_TESTIMONIALS),
        "career_faqs": ("career_faqs", "q", DEFAULT_CAREER_FAQS),
        "contact_offices": ("contact_offices", "slug", DEFAULT_CONTACT_OFFICES),
        "contact_faqs": ("contact_faqs", "q", DEFAULT_CONTACT_FAQS),
        "services_subpages": ("services_subpages", "identifier", DEFAULT_SERVICES_SUBPAGES),
        "case_studies": ("case_studies", "sort_order", DEFAULT_CASE_STUDIES),
        "career_ladder": ("career_ladder", "sort_order", DEFAULT_CAREER_LADDER),
        "career_stats": ("career_stats", "sort_order", DEFAULT_CAREER_STATS),
        "career_job_form_fields": ("career_job_form_fields", "sort_order", DEFAULT_JOB_FORM_FIELDS),
        "career_intern_form_fields": ("career_intern_form_fields", "sort_order", DEFAULT_INTERN_FORM_FIELDS),
        "career_philosophy_cards": ("career_philosophy_cards", "sort_order", DEFAULT_PHILOSOPHY_CARDS),
        "industries": ("industries", "sort_order", DEFAULT_INDUSTRIES),
        "industry_projects": ("industry_projects", "sort_order", DEFAULT_INDUSTRY_PROJECTS),
        "strategic_directives": ("strategic_directives", "sort_order", DEFAULT_STRATEGIC_DIRECTIVES)
    }
    
    for key, (coll_name, sort_field, fallback) in list_collections_map.items():
        try:
            cursor = mongo_db[coll_name].find({"deleted_at": None}, {"_id": 0}).sort(sort_field, 1)
            docs = list(cursor)
            compiled[key] = docs if docs else fallback
        except Exception:
            compiled[key] = base_content.get(key, fallback)
            
    return compiled

def load_content() -> dict:
    collection = get_mongo_collection()
    if collection is None:
        print("[Fallback] Serving local JSON content for load_content")
        return compile_full_content(load_local_content())
    try:
        # Check for published content
        doc = collection.find_one({"identifier": "website_content_published"})
        if not doc:
            # Compatibility check
            doc = collection.find_one({"identifier": "website_content"})
        if doc:
            content = dict(doc)
            content.pop("_id", None)
            content.pop("identifier", None)
            return compile_full_content(content)
        else:
            print("[MongoDB] Published document not found. Seeding base...")
            local_data = load_local_content()
            try:
                collection.insert_one({"identifier": "website_content_published", **local_data})
                collection.insert_one({"identifier": "website_content", **local_data})
                print("[MongoDB] Base seeding completed.")
            except Exception as e:
                print(f"[MongoDB] Base seeding failed: {e}")
            return compile_full_content(local_data)
    except Exception as e:
        print(f"[MongoDB] Error loading published content: {e}.")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

def load_draft() -> dict:
    collection = get_mongo_collection()
    if collection is None:
        print("[Fallback] Serving local JSON content for load_draft")
        return compile_full_content(load_local_content())
    try:
        doc = collection.find_one({"identifier": "website_content_draft"})
        if doc:
            content = dict(doc)
            content.pop("_id", None)
            content.pop("identifier", None)
            return compile_full_content(content)
        else:
            # Seed draft with published content
            print("[MongoDB] Draft not found. Creating draft from published content...")
            published = load_content()
            try:
                collection.replace_one(
                    {"identifier": "website_content_draft"},
                    {"identifier": "website_content_draft", **published},
                    upsert=True
                )
            except Exception as e:
                print(f"[MongoDB] Failed to write initial draft: {e}")
            return published
    except Exception as e:
        print(f"[MongoDB] Error loading draft: {e}.")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

def load_local_content() -> dict:
    # All data now lives in MongoDB. This function returns in-memory defaults only.
    return DEFAULT_CONTENT

def save_normalized_draft(data: dict):
    global mongo_db
    if mongo_db is None:
        return
        
    # Save site settings
    if "site_settings" in data:
        mongo_db["site_settings"].replace_one(
            {"identifier": "global_settings"},
            {"identifier": "global_settings", **data["site_settings"]},
            upsert=True
        )
        
    # Save about_us
    if "about_us" in data:
        mongo_db["about_us"].replace_one(
            {"identifier": "about_us_content"},
            {"identifier": "about_us_content", **data["about_us"]},
            upsert=True
        )

    # Save contact_settings
    if "contact_settings" in data:
        mongo_db["contact_settings"].replace_one(
            {"identifier": "contact_page_settings"},
            {"identifier": "contact_page_settings", **data["contact_settings"]},
            upsert=True
        )

    # Save ventures_settings
    if "ventures_settings" in data:
        mongo_db["ventures_settings"].replace_one(
            {"identifier": "ventures_page_settings"},
            {"identifier": "ventures_page_settings", **data["ventures_settings"]},
            upsert=True
        )

    # Save career_settings
    if "career_settings" in data:
        mongo_db["career_settings"].replace_one(
            {"identifier": "career_page_settings"},
            {"identifier": "career_page_settings", **data["career_settings"]},
            upsert=True
        )
        
    # Save culture_settings
    if "culture_settings" in data:
        mongo_db["culture_settings"].replace_one(
            {"identifier": "culture_page_settings"},
            {"identifier": "culture_page_settings", **data["culture_settings"]},
            upsert=True
        )
        
    # Save list-based collections (clear and insert to keep sync)
    list_collections = {
        "our_culture": "our_culture",
        "people": "people",
        "awards": "awards",
        "blogs": "blogs",
        "portfolio": "portfolio",
        "ventures": "ventures",
        "career_jobs": "career_jobs",
        "career_perks": "career_perks",
        "career_testimonials": "career_testimonials",
        "career_faqs": "career_faqs",
        "contact_offices": "contact_offices",
        "contact_faqs": "contact_faqs",
        "services_subpages": "services_subpages",
        "case_studies": "case_studies",
        "career_ladder": "career_ladder",
        "career_stats": "career_stats",
        "career_job_form_fields": "career_job_form_fields",
        "career_intern_form_fields": "career_intern_form_fields",
        "career_philosophy_cards": "career_philosophy_cards",
        "industries": "industries",
        "industry_projects": "industry_projects",
        "strategic_directives": "strategic_directives"
    }
    
    for key, coll_name in list_collections.items():
        if key in data and isinstance(data[key], list):
            mongo_db[coll_name].delete_many({})
            if data[key]:
                # Assign sort_order dynamically to preserve order during fetch sorting
                for idx, item in enumerate(data[key]):
                    if isinstance(item, dict):
                        item["sort_order"] = idx
                mongo_db[coll_name].insert_many(data[key])

def save_draft_db(data: dict):
    # Save to MongoDB (single source of truth)
    collection = get_mongo_collection()
    if collection is not None:
        try:
            # 1. Save base content draft
            base_keys = ["hero", "stats", "services", "caseStudy", "sectors", "milestones", "gallery", "brands", "testimonials", "bottomCta"]
            base_doc = {k: data.get(k) for k in base_keys if k in data}
            
            result = collection.replace_one(
                {"identifier": "website_content_draft"},
                {"identifier": "website_content_draft", **base_doc},
                upsert=True
            )
            print(f"[MongoDB] Base Draft saved (matched={result.matched_count}, modified={result.modified_count})")
            
            # 2. Sync to normalized collections
            save_normalized_draft(data)
        except Exception as e:
            print(f"[MongoDB] Error saving draft: {e}")
    else:
        print("[WARNING] MongoDB unavailable. Draft NOT saved.")

def publish_db(data: dict):
    # Save to MongoDB (single source of truth)
    collection = get_mongo_collection()
    if collection is not None:
        try:
            # Save base content published
            base_keys = ["hero", "stats", "services", "caseStudy", "sectors", "milestones", "gallery", "brands", "testimonials", "bottomCta"]
            base_doc = {k: data.get(k) for k in base_keys if k in data}
            
            collection.replace_one(
                {"identifier": "website_content_published"},
                {"identifier": "website_content_published", **base_doc},
                upsert=True
            )
            # Sync standard identifier
            collection.replace_one(
                {"identifier": "website_content"},
                {"identifier": "website_content", **base_doc},
                upsert=True
            )
            
            # Sync to normalized collections
            save_normalized_draft(data)
            print("[MongoDB] Published successfully.")
        except Exception as e:
            print(f"[MongoDB] Error publishing to db: {e}")
    else:
        print("[WARNING] MongoDB unavailable. Content NOT published.")
            
    # Save to version history
    history_coll = get_mongo_history_collection()
    if history_coll is not None:
        try:
            version_doc = {
                "timestamp": datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None).isoformat() + "Z",
                "content": data
            }
            history_coll.insert_one(version_doc)
            print("[MongoDB] Version entry logged.")
        except Exception as e:
            print(f"[MongoDB] Error writing history: {e}")

# schemas for API
class AdminPasswordReq(BaseModel):
    password: str

class PublishRequest(BaseModel):
    password: str
    content: dict

class DraftRequest(BaseModel):
    password: str
    content: dict

class RestoreRequest(BaseModel):
    password: str
    version_id: str

@app.get("/health", tags=["Health"])
async def health_check():
    db_status = "disconnected"
    collection = get_mongo_collection()
    if collection is not None:
        try:
            global mongo_client
            if mongo_client:
                mongo_client.admin.command('ping')
                db_status = "connected"
        except Exception:
            db_status = "error"
            
    return {
        "status": "healthy",
        "database": db_status,
        "service": "HariKrushn Digiverse Core API",
        "version": "1.0.0"
    }

@app.get("/api/content")
async def get_site_content():
    return load_content()

@app.get("/api/content/draft")
async def get_draft_content():
    return load_draft()

@app.post("/api/content/draft")
async def update_draft_content(req: DraftRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    try:
        save_draft_db(req.content)
        return {"status": "success", "message": "Draft saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/content/publish")
async def publish_content(req: PublishRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    try:
        publish_db(req.content)
        # Sync draft workspace with published state
        save_draft_db(req.content)
        return {"status": "success", "message": "Content published successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/content/history")
async def get_content_history():
    history_coll = get_mongo_history_collection()
    if history_coll is not None:
        try:
            cursor = history_coll.find({}, {"_id": 0}).sort("timestamp", -1).limit(20)
            return list(cursor)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return []

@app.post("/api/content/history/restore")
async def restore_content_version(req: RestoreRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    history_coll = get_mongo_history_collection()
    if history_coll is None:
        raise HTTPException(status_code=500, detail="Database not available")
        
    try:
        doc = history_coll.find_one({"timestamp": req.version_id})
        if not doc:
            raise HTTPException(status_code=404, detail="Version not found")
        content = doc["content"]
        save_draft_db(content)
        return {"status": "success", "message": f"Draft restored to version {req.version_id}", "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload/resume")
async def upload_resume(file: UploadFile = File(...)):
    filename = file.filename or ""
    ext = os.path.splitext(filename)[1].lower()
    if ext not in [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"]:
        raise HTTPException(status_code=400, detail="Only PDF, Word documents (.doc/.docx), or image formats are allowed.")
        
    uploads_dir = os.path.join("media", "uploads", "resumes")
    os.makedirs(uploads_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    resume_filename = f"resume_{timestamp}{ext}"
    resume_path = os.path.join(uploads_dir, resume_filename)
    
    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    resume_url = f"/media/uploads/resumes/{resume_filename}"
    return {
        "status": "success",
        "resumeUrl": resume_url,
        "filename": filename
    }

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...)):
    filename = file.filename or ""
    if not filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg")):
        raise HTTPException(status_code=400, detail="Only standard image files are allowed.")
        
    uploads_dir = os.path.join("media", "images", "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    ext = os.path.splitext(filename)[1]
    image_filename = f"img_{timestamp}{ext}"
    image_path = os.path.join(uploads_dir, image_filename)
    
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    image_url = f"/media/images/uploads/{image_filename}"
    return {
        "status": "success",
        "imageUrl": image_url
    }

@app.post("/api/upload/video")
async def upload_video(file: UploadFile = File(...)):
    filename = file.filename or ""
    if not filename.lower().endswith(".mp4"):
        raise HTTPException(status_code=400, detail="Only MP4 video files are allowed.")
        
    uploads_dir = os.path.join("media", "images", "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    video_filename = f"video_{timestamp}.mp4"
    video_path = os.path.join(uploads_dir, video_filename)
    
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Extract frames using OpenCV
    frames_dir = os.path.join("frontend", "public", "images", "frames")
    os.makedirs(frames_dir, exist_ok=True)
    
    # Clear old frames
    for filename in os.listdir(frames_dir):
        file_path = os.path.join(frames_dir, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception:
            pass
            
    if cv2 is None:
        raise HTTPException(status_code=500, detail="OpenCV not loaded in Python backend.")
        
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise HTTPException(status_code=500, detail="Failed to open uploaded MP4 video.")
        
    frame_count = 0
    max_frames = 500
    
    while cap.isOpened() and frame_count < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        frame_name = f"frame_{frame_count:04d}.jpg"
        frame_path = os.path.join(frames_dir, frame_name)
        cv2.imwrite(frame_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 90])
        frame_count += 1
        
    cap.release()
    
    video_url = f"/media/images/uploads/{video_filename}"
    return {
        "status": "success",
        "videoUrl": video_url,
        "frameCount": frame_count
    }

class InquirySubmission(BaseModel):
    name: str
    email: str
    phone: str
    service: str
    budget: str
    message: str

class JobApplicationSubmission(BaseModel):
    job_id: str
    name: str
    email: str
    phone: str
    role: str
    resume: str
    message: str

class InternApplicationSubmission(BaseModel):
    name: str
    email: str
    phone: str
    track: str
    college: str
    resume: str
    message: str

def get_collection(name: str):
    global mongo_db
    if mongo_db is not None:
        return mongo_db[name]
    get_mongo_collection()
    if mongo_db is not None:
        return mongo_db[name]
    return None

@app.post("/api/inquiries")
async def create_inquiry(req: dict):
    coll = get_collection("inquiries")
    if coll is not None:
        try:
            doc = {**req}
            doc["created_at"] = datetime.datetime.now().isoformat()
            coll.insert_one(doc)
            return {"status": "success", "message": "Inquiry submitted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    raise HTTPException(status_code=500, detail="Database not available")

@app.post("/api/applications/job")
async def apply_job(req: dict):
    coll = get_collection("career_applications")
    if coll is not None:
        try:
            doc = {**req}
            doc["type"] = "job"
            doc["applied_at"] = datetime.datetime.now().isoformat()
            coll.insert_one(doc)
            return {"status": "success", "message": "Application submitted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    raise HTTPException(status_code=500, detail="Database not available")

@app.post("/api/applications/intern")
async def apply_intern(req: dict):
    coll = get_collection("career_applications")
    if coll is not None:
        try:
            doc = {**req}
            doc["type"] = "internship"
            doc["applied_at"] = datetime.datetime.now().isoformat()
            coll.insert_one(doc)
            return {"status": "success", "message": "Internship application submitted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    raise HTTPException(status_code=500, detail="Database not available")

@app.post("/api/admin/inquiries")
async def get_inquiries(req: VerifyRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    coll = get_collection("inquiries")
    if coll is not None:
        try:
            cursor = coll.find({}).sort("created_at", -1)
            results = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                results.append(doc)
            return results
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return []

@app.post("/api/admin/applications")
async def get_applications(req: VerifyRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    coll = get_collection("career_applications")
    if coll is not None:
        try:
            cursor = coll.find({}).sort("applied_at", -1)
            results = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                results.append(doc)
            return results
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return []

class DeleteSubmissionRequest(BaseModel):
    password: str
    id: str
    type: str # 'inquiry' or 'application'

@app.post("/api/admin/submissions/delete")
async def delete_submission(req: DeleteSubmissionRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    collection_name = "inquiries" if req.type == "inquiry" else "career_applications"
    coll = get_collection(collection_name)
    if coll is not None:
        try:
            from bson import ObjectId
            result = coll.delete_one({"_id": ObjectId(req.id)})
            if result.deleted_count > 0:
                return {"status": "success", "message": "Submission deleted successfully"}
            raise HTTPException(status_code=404, detail="Submission not found")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    raise HTTPException(status_code=500, detail="Database not available")

class ClearSubmissionsRequest(BaseModel):
    password: str
    type: str # 'inquiry' or 'application' or 'all'

@app.post("/api/admin/submissions/clear-all")
async def clear_all_submissions(req: ClearSubmissionsRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    try:
        deleted_count = 0
        if req.type in ["inquiry", "all"]:
            coll_inq = get_collection("inquiries")
            if coll_inq is not None:
                res = coll_inq.delete_many({})
                deleted_count += res.deleted_count
        if req.type in ["application", "all"]:
            coll_app = get_collection("career_applications")
            if coll_app is not None:
                res = coll_app.delete_many({})
                deleted_count += res.deleted_count
        return {"status": "success", "message": f"Successfully deleted {deleted_count} submissions"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from app.core.security import verify_password, create_session_token, verify_session_token

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    token = authorization.replace("Bearer ", "")
    user = verify_session_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Session expired or invalid")
    return user

# Helper to write activity log
def log_action(username: str, role: str, action: str, details: dict):
    logs_coll = get_collection("activity_logs")
    if logs_coll is not None:
        try:
            logs_coll.insert_one({
                "username": username,
                "role": role,
                "action": action,
                "details": details,
                "timestamp": datetime.datetime.utcnow().isoformat() + "Z"
            })
        except Exception as e:
            print(f"[Logs] Failed to write log: {e}")

class LoginRequest(BaseModel):
    username: str = "admin"
    password: str

@app.post("/api/auth/login")
async def login_api(req: LoginRequest):
    # 1. First verify against users collection
    users_coll = get_collection("users")
    if users_coll is not None:
        user = users_coll.find_one({"username": req.username, "deleted_at": None})
        if user and verify_password(req.password, user["hashed_password"]):
            role_name = user.get("role", "viewer")
            roles_coll = get_collection("roles")
            permissions = []
            if roles_coll is not None:
                role_doc = roles_coll.find_one({"name": role_name})
                if role_doc:
                    permissions = role_doc.get("permissions", [])
            
            token = create_session_token({
                "username": user["username"],
                "role": role_name,
                "permissions": permissions
            })
            return {
                "status": "success",
                "token": token,
                "user": {
                    "username": user["username"],
                    "role": role_name,
                    "permissions": permissions
                }
            }
            
    # 2. Legacy fallback
    if verify_admin_password(req.password):
        permissions = ["all"]
        token = create_session_token({
            "username": "admin",
            "role": "super_admin",
            "permissions": permissions
        })
        return {
            "status": "success",
            "token": token,
            "user": {
                "username": "admin",
                "role": "super_admin",
                "permissions": permissions
            }
        }
    raise HTTPException(status_code=401, detail="Invalid username or password")

@app.post("/api/auth/verify")
async def verify_auth(req: VerifyRequest):
    if verify_admin_password(req.password):
        return {"status": "success", "message": "Authentication successful"}
    raise HTTPException(status_code=401, detail="Invalid password")

@app.post("/api/content")
async def update_site_content(req: ContentUpdateRequest):
    if not verify_admin_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    try:
        publish_db(req.content)
        save_draft_db(req.content)
        return {"status": "success", "message": "Content updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save content: {str(e)}")

# GET collection items (Read)
@app.get("/api/collections/{collection_name}")
async def get_collection_items(
    collection_name: str,
    search: str | None = None,
    status: str | None = None,
    page: int = 1,
    limit: int = 100,
    user: dict = Depends(get_current_user)
):
    coll = get_collection(collection_name)
    if coll is None:
        raise HTTPException(status_code=404, detail="Collection not found")
        
    query = {"deleted_at": None}
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"name": {"$regex": search, "$options": "i"}},
            {"slug": {"$regex": search, "$options": "i"}},
            {"q": {"$regex": search, "$options": "i"}}
        ]
        
    try:
        cursor = coll.find(query, {"_id": 0})
        docs = list(cursor.sort("sort_order", 1).skip((page - 1) * limit).limit(limit))
        if not docs:
            cursor = coll.find(query, {"_id": 0})
            docs = list(cursor.sort("created_at", -1).skip((page - 1) * limit).limit(limit))
        return {
            "status": "success",
            "data": docs,
            "page": page,
            "limit": limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# POST create collection item
@app.post("/api/collections/{collection_name}")
async def create_collection_item(
    collection_name: str,
    item: dict,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "content:write" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection(collection_name)
    if coll is None:
        raise HTTPException(status_code=404, detail="Collection not found")
        
    try:
        item["created_at"] = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None).isoformat() + "Z"
        item["updated_at"] = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None).isoformat() + "Z"
        item["created_by"] = user["username"]
        item["updated_by"] = user["username"]
        item["deleted_at"] = None
        if "status" not in item:
            item["status"] = "draft"
            
        if "sort_order" not in item:
            count = coll.count_documents({"deleted_at": None})
            item["sort_order"] = count
            
        coll.insert_one(item)
        item.pop("_id", None)
        log_action(user["username"], user["role"], f"create_{collection_name}", {"item": item})
        return {"status": "success", "message": "Item created successfully", "data": item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# PUT update collection item
@app.put("/api/collections/{collection_name}/{key_field}/{key_value}")
async def update_collection_item(
    collection_name: str,
    key_field: str,
    key_value: str,
    item: dict,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "content:write" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection(collection_name)
    if coll is None:
        raise HTTPException(status_code=404, detail="Collection not found")
        
    try:
        item.pop("_id", None)
        item["updated_at"] = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None).isoformat() + "Z"
        item["updated_by"] = user["username"]
        
        original = coll.find_one({key_field: key_value, "deleted_at": None})
        if not original:
            # Upsert fallback
            original = {}
            
        new_doc = {**original, **item}
        # Keep identifier fields immutable if they are dict keys
        coll.replace_one({key_field: key_value}, new_doc, upsert=True)
        log_action(user["username"], user["role"], f"update_{collection_name}", {"key": key_value, "changes": item})
        return {"status": "success", "message": "Item updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# DELETE soft delete item
@app.delete("/api/collections/{collection_name}/{key_field}/{key_value}")
async def delete_collection_item(
    collection_name: str,
    key_field: str,
    key_value: str,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "content:write" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection(collection_name)
    if coll is None:
        raise HTTPException(status_code=404, detail="Collection not found")
        
    try:
        original = coll.find_one({key_field: key_value, "deleted_at": None})
        if not original:
            raise HTTPException(status_code=404, detail="Item not found")
            
        coll.update_one(
            {key_field: key_value},
            {"$set": {"deleted_at": datetime.datetime.utcnow().isoformat() + "Z"}}
        )
        log_action(user["username"], user["role"], f"delete_{collection_name}", {"key": key_value})
        return {"status": "success", "message": "Item soft-deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# POST bulk reorder items
@app.post("/api/collections/{collection_name}/reorder")
async def reorder_collection(
    collection_name: str,
    req: dict,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "content:write" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection(collection_name)
    if coll is None:
        raise HTTPException(status_code=404, detail="Collection not found")
        
    orders = req.get("orders", [])
    key_field = req.get("key_field", "slug")
    try:
        for entry in orders:
            val = entry.get("key_value")
            order_idx = entry.get("order")
            coll.update_one(
                {key_field: val},
                {"$set": {"sort_order": order_idx, "updated_at": datetime.datetime.utcnow().isoformat() + "Z"}}
            )
        log_action(user["username"], user["role"], f"reorder_{collection_name}", {"count": len(orders)})
        return {"status": "success", "message": "Reordering synchronized successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# GET Media items
@app.get("/api/media")
async def get_media_items(
    folder: str = "/",
    user: dict = Depends(get_current_user)
):
    coll = get_collection("media_library")
    if coll is None:
        return {"status": "success", "data": []}
    try:
        cursor = coll.find({"folder_path": folder, "deleted_at": None}, {"_id": 0})
        return {"status": "success", "data": list(cursor)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Upload media with registration
@app.post("/api/media/upload")
async def upload_media_file(
    file: UploadFile = File(...),
    folder: str = "/",
    tags: str = "",
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "media:upload" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    allowed = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".pdf", ".zip", ".doc", ".docx")
    filename = file.filename or ""
    if not filename.lower().endswith(allowed):
        raise HTTPException(status_code=400, detail="Unsupported file format.")
        
    uploads_dir = os.path.join("media", "images", "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    ext = os.path.splitext(filename)[1]
    clean_name = "".join(c for c in os.path.splitext(filename)[0] if c.isalnum() or c in ("-", "_")).strip()
    saved_filename = f"{clean_name}_{timestamp}{ext}"
    saved_path = os.path.join(uploads_dir, saved_filename)
    
    with open(saved_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    file_url = f"/media/images/uploads/{saved_filename}"
    file_size = os.path.getsize(saved_path)
    
    coll = get_collection("media_library")
    if coll is not None:
        try:
            doc = {
                "filename": filename,
                "file_url": file_url,
                "file_type": file.content_type,
                "size_bytes": file_size,
                "folder_path": folder,
                "tags": [t.strip() for t in tags.split(",") if t.strip()],
                "created_by": user["username"],
                "created_at": datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None).isoformat() + "Z",
                "deleted_at": None
            }
            coll.replace_one({"file_url": file_url}, doc, upsert=True)
        except Exception as e:
            print(f"[Media] DB registration warning: {e}")
            
    return {
        "status": "success",
        "fileUrl": file_url,
        "filename": file.filename,
        "sizeBytes": file_size
    }

# DELETE media file
@app.delete("/api/media")
async def delete_media_file(
    file_url: str,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "media:delete" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection("media_library")
    if coll is not None:
        coll.update_one(
            {"file_url": file_url},
            {"$set": {"deleted_at": datetime.datetime.utcnow().isoformat() + "Z"}}
        )
        
    # Extract filename and delete
    filename = os.path.basename(file_url)
    saved_path = os.path.join("media", "images", "uploads", filename)
    if os.path.exists(saved_path):
        try:
            os.remove(saved_path)
        except Exception:
            pass
            
    log_action(user["username"], user["role"], "delete_media", {"file_url": file_url})
    return {"status": "success", "message": "File deleted successfully"}

# GET Activity logs
@app.get("/api/admin/logs")
async def get_activity_logs(
    page: int = 1,
    limit: int = 50,
    user: dict = Depends(get_current_user)
):
    if "all" not in user["permissions"] and "logs:read" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    coll = get_collection("activity_logs")
    if coll is None:
        return {"status": "success", "data": []}
    try:
        cursor = coll.find({}, {"_id": 0}).sort("timestamp", -1).skip((page - 1) * limit).limit(limit)
        return {"status": "success", "data": list(cursor)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create backups JSON file
@app.post("/api/admin/backups/create")
async def create_backup(user: dict = Depends(get_current_user)):
    if "all" not in user["permissions"] and "backups:manage" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    backup_dir = os.path.join(backend_dir, "backups")
    os.makedirs(backup_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_filename = f"backup_{timestamp}.json"
    backup_path = os.path.join(backup_dir, backup_filename)
    
    content = load_draft()
    try:
        with open(backup_path, "w", encoding="utf-8") as f:
            json.dump(content, f, indent=4, ensure_ascii=False)
            
        log_action(user["username"], user["role"], "create_backup", {"filename": backup_filename})
        return {"status": "success", "message": f"Backup created successfully: {backup_filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# List backups
@app.get("/api/admin/backups")
async def list_backups(user: dict = Depends(get_current_user)):
    if "all" not in user["permissions"] and "backups:manage" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    backup_dir = os.path.join(backend_dir, "backups")
    os.makedirs(backup_dir, exist_ok=True)
    
    backups = []
    for f in os.listdir(backup_dir):
        if f.endswith(".json"):
            fp = os.path.join(backup_dir, f)
            backups.append({
                "filename": f,
                "size_bytes": os.path.getsize(fp),
                "created_at": datetime.datetime.fromtimestamp(os.path.getctime(fp)).isoformat()
            })
    return {"status": "success", "data": sorted(backups, key=lambda x: x["created_at"], reverse=True)}

# Restore from backup
@app.post("/api/admin/backups/restore")
async def restore_backup(req: dict, user: dict = Depends(get_current_user)):
    if "all" not in user["permissions"] and "backups:manage" not in user["permissions"]:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    filename = req.get("filename")
    if not filename:
        raise HTTPException(status_code=400, detail="Missing filename")
        
    backup_path = os.path.join(backend_dir, "backups", filename)
    if not os.path.exists(backup_path):
        raise HTTPException(status_code=404, detail="Backup file not found")
        
    try:
        with open(backup_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        save_draft_db(data)
        publish_db(data)
        log_action(user["username"], user["role"], "restore_backup", {"filename": filename})
        return {"status": "success", "message": f"System successfully restored from {filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. Production & Development Static Files / SPA Server Setup
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Universal Media Mount (Development & Production)
# All static images and uploads are consolidated under the single 'media' folder.
root_media_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "media"))
os.makedirs(root_media_dir, exist_ok=True)
app.mount("/media", StaticFiles(directory=root_media_dir), name="root_media")

env_mode = os.getenv("ENV", "development")
if env_mode == "production":
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend", "dist"))
    if os.path.exists(dist_dir):
        # Serve compiled static assets
        assets_dir = os.path.join(dist_dir, "assets")
        if os.path.exists(assets_dir):
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

        # Catch-all fallback route to support React SPA Routing and root files
        @app.get("/{catchall:path}")
        async def serve_spa_frontend(catchall: str):
            if catchall.startswith("api/") or catchall == "api" or catchall == "health" or catchall.startswith("docs") or catchall.startswith("openapi.json"):
                raise HTTPException(status_code=404)
            
            # Check if it's a file in the root of dist (e.g. favicon, robots.txt)
            target_path = os.path.join(dist_dir, catchall)
            if os.path.isfile(target_path):
                return FileResponse(target_path)
                
            index_file = os.path.join(dist_dir, "index.html")
            if os.path.exists(index_file):
                return FileResponse(index_file)
            raise HTTPException(status_code=404)
else:
    # In development mode, API routes are proxied via Vite (no fallback needed)
    pass

# 4. Process Runner Orchestrator
if __name__ == "__main__":
    import signal

    print("\n" + "=" * 60)
    print("      HariKrushn Digiverse LLP - Service Orchestrator")
    print("=" * 60)

    # Determine Python executable
    def get_python_executable():
        paths = [
            os.path.join(backend_dir, "venv", "Scripts", "python.exe"),
            os.path.join(backend_dir, "venv", "bin", "python"),
        ]
        for p in paths:
            if os.path.exists(p):
                print(f"[System] Found virtual environment python: {p}")
                return p
        print(f"[System] Virtual environment python not found. Using system python: {sys.executable}")
        return sys.executable

    python_exe = get_python_executable()

    # Determine npm executable
    npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")



    # Always rebuild frontend to ensure latest code is served
    dist_dir = os.path.join(frontend_dir, "dist")
    print("[System] Generating frontend production build...")
    try:
        subprocess.run([npm_cmd, "run", "build"], cwd=frontend_dir, check=True, shell=(os.name == 'nt'))
        print("[System] Production build created successfully!")
    except Exception as e:
        print(f"[System] Warning: Production build failed ({e}). Starting dev services anyway...")

    # Define commands
    backend_port = os.getenv("PORT", "8008")
    frontend_port = os.getenv("FRONTEND_PORT", "5173")
    
    if env_mode == "production":
        backend_cmd = [
            python_exe, "-m", "uvicorn", "main:app",
            "--host", "0.0.0.0",
            "--port", backend_port
        ]
        frontend_cmd = None
    else:
        backend_cmd = [
            python_exe, "-m", "uvicorn", "main:app",
            "--host", "0.0.0.0",
            "--port", backend_port,
            "--reload"
        ]
        frontend_cmd = [npm_cmd, "run", "dev", "--", "--port", frontend_port]

    processes = []

    def log_stream(stream, prefix):
        try:
            for line in iter(stream.readline, ''):
                if line:
                    sys.stdout.write(f"{prefix} {line}")
                    sys.stdout.flush()
        except Exception:
            pass

    def run_service(cmd, cwd, prefix):
        # We start the process using shell=False for direct signals and cleaner shutdown
        p = subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        processes.append(p)
        t = threading.Thread(target=log_stream, args=(p.stdout, prefix), daemon=True)
        t.start()
        return p

    def cleanup():
        print("\n[System] Shutting down all services...")
        for p in processes:
            try:
                if os.name == 'nt':
                    # Use taskkill on Windows to kill the process and its child processes cleanly
                    subprocess.run(
                        ["taskkill", "/F", "/T", "/PID", str(p.pid)],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL
                    )
                else:
                    p.terminate()
            except Exception:
                pass

    # Register signals for graceful termination (non-Windows)
    try:
        signal.signal(signal.SIGINT, lambda sig, frame: sys.exit(0))
        signal.signal(signal.SIGTERM, lambda sig, frame: sys.exit(0))
    except Exception:
        pass

    try:
        print("[System] Starting Backend (FastAPI)...")
        backend_proc = run_service(backend_cmd, os.path.dirname(__file__), "[Backend]")

        frontend_proc = None
        if frontend_cmd:
            print("[System] Starting Frontend (Vite)...")
            frontend_proc = run_service(frontend_cmd, os.path.join(os.path.dirname(__file__), "frontend"), "[Frontend]")

        print("\n" + "=" * 60)
        print(f"  - Backend:  http://localhost:{backend_port}")
        if frontend_cmd:
            print(f"  - Frontend: http://localhost:{frontend_port}")
        print("  - CTRL+C to terminate both servers")
        print("=" * 60 + "\n")

        # Monitor processes
        while True:
            time.sleep(1)
            if backend_proc.poll() is not None:
                print(f"[System] Backend stopped with code {backend_proc.returncode}")
                break
            if frontend_proc and frontend_proc.poll() is not None:
                print(f"[System] Frontend stopped with code {frontend_proc.returncode}")
                break

    except KeyboardInterrupt:
        pass
    finally:
        cleanup()
