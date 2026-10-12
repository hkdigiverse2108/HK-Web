/**
 * Case Studies Data Store & Dynamic Normalizer
 * HariKrushn DigiVerse LLP
 *
 * Clean, concise, and editorial data model matching modern high-end agency case studies.
 */

export const DEFAULT_CASE_STUDIES = [
  {
    id: "hipaa-compliant-healthcare-platform-security",
    slug: "hipaa-compliant-healthcare-platform-security",
    aliases: ["hipaa-healthcare", "hipaa-compliant-healthcare-platform-security"],
    client: "Leading Healthcare Organization",
    industry: "Healthcare",
    title: "HIPAA-Aligned Healthcare Data Security for a Care-Management Platform",
    lede: "A healthcare organization partnered with HK DigiVerse with a clear ask: build a care-management platform that clinicians and care teams can rely on every day, without ever putting patient data at risk. We made security part of the architecture from the first design decision.",
    coverImage: "/media/casestudies/hipaa-healthcare/hero-cover.png",
    challenge: {
      paragraphs: [
        "Care-management platforms handle some of the most sensitive data there is: patient demographics, clinical records, consent, care plans, provider notes, and patient communications. Each of these flows across users, integrations, and third-party services, which raises the risk of unauthorized access.",
        "The client needed a platform that could give every role the right level of access, secure every integration, and keep a clear record of who accessed what, all in line with HIPAA privacy and security requirements."
      ],
      diagram: "/media/casestudies/hipaa-healthcare/project-challenges.png",
      diagramAlt: "Healthcare Platform Security Architecture"
    },
    solution: {
      intro: "We designed security and privacy into the application, infrastructure, integrations, and workflows from the start, rather than adding them as a layer at the end.",
      principle: "Protect → Control Access → Monitor → Audit → Respond",
      points: [
        { label: "PHI protection", text: "controlled workflows across the full data lifecycle" },
        { label: "Role-based access", text: "separate access for providers, care managers, coordinators, billing teams, front desk, and admins" },
        { label: "Authentication & authorization", text: "secure login, session management, token-based API access, and separate admin and operational privileges" },
        { label: "Data encryption", text: "HTTPS/TLS 1.3 in transit and AES-256 encryption at rest for stored data and clinical documents" },
        { label: "Audit trails", text: "immutable logging of logins, record views, data updates, provider actions, and integration events" },
        { label: "Secure integrations", text: "authenticated and authorized data exchange with existing EHRs and labs, limited to the required workflow" },
        { label: "Data minimization", text: "users, integrations, and external services receive only the minimum necessary data they need" }
      ]
    },
    businessImpact: {
      intro: "The platform gives the client a security foundation they can build on, with stronger protection of patient data and clearer accountability across teams.",
      points: [
        "Lower risk of unauthorized PHI access through role-based, minimum-necessary access",
        "Full visibility into data access and changes through tamper-evident audit trails",
        "Safer data exchange with healthcare systems and third-party clinical vendors",
        "Greater confidence in security through regular penetration testing and automated remediation",
        "Continued access to critical data through multi-region backup and disaster recovery",
        "A HIPAA-aligned foundation that supports the client's wider compliance program"
      ]
    },
    servicesDelivered: [
      "HIPAA-Aligned Architecture",
      "Role-Based Access Control",
      "Data Encryption",
      "Secure Cloud Infrastructure",
      "Audit Logging",
      "Healthcare Integrations",
      "VAPT & Security Testing"
    ],
    tech: ["HIPAA AWS VPC", "FastAPI", "React", "PostgreSQL", "Docker", "HL7 / FHIR"]
  },

  {
    id: "vesper",
    slug: "vesper",
    aliases: ["vesper", "vesper-luxury-living"],
    client: "Vesper Luxury Living",
    industry: "Real Estate",
    title: "Cinematic Visual Sales Engine for Luxury Properties",
    lede: "We transformed Vesper's property portal by integrating custom canvas scrubbing transitions, rendering 4K frame sequences that scroll smoothly on desktop and mobile. The cinematic experience increased buyer engagement dramatically.",
    coverImage: "/media/images/casestudies/vesper.png",
    challenge: {
      paragraphs: [
        "Vesper needed a property showcase that felt like a luxury brand experience, not a generic listing site. Their existing platform had poor mobile performance and lacked visual storytelling.",
        "High-resolution architectural renderings were causing heavy page load delays and stuttering scroll transitions on mobile devices, leading to high visitor bounce rates."
      ],
      diagram: null
    },
    solution: {
      intro: "We engineered a GPU-accelerated visual storytelling pipeline optimized for smooth browsing across all screen sizes.",
      principle: "Preload → Buffer → Scrub → Streamline → Convert",
      points: [
        { label: "Custom canvas engine", text: "hardware-accelerated frame preloading ensuring 60 FPS smooth scrolling" },
        { label: "Adaptive asset streaming", text: "intelligent resolution delivery tailoring image fidelity to user device and bandwidth" },
        { label: "Interactive 3D floor plans", text: "lightweight spatial models allowing prospective buyers to inspect daylight and room layouts" },
        { label: "Edge-cached API", text: "sub-second global content delivery via Cloudflare Edge infrastructure" },
        { label: "VIP concierge flow", text: "frictionless private viewing reservation with direct broker routing" }
      ]
    },
    businessImpact: {
      intro: "The immersive visual platform transformed high-net-worth buyer engagement and accelerated sales velocity.",
      points: [
        "142% increase in qualified buyer inquiry conversion rate within 60 days",
        "Average time on page expanded from 55 seconds to 4 minutes 12 seconds",
        "Sub-second global First Contentful Paint (0.8s) on desktop and mobile",
        "Zero frame drops during interactive 4K architectural canvas scrubbing"
      ]
    },
    servicesDelivered: [
      "Canvas Scrubbing Engine",
      "3D WebGL Floor Plans",
      "Headless CMS Architecture",
      "Edge CDN Optimization",
      "Mobile Performance Tuning"
    ],
    tech: ["React", "Canvas API", "GSAP", "Three.js", "Vite", "Cloudflare Workers"]
  },

  {
    id: "aerocrm",
    slug: "aerocrm",
    aliases: ["aerocrm", "aerocrm-aviation"],
    client: "AeroCRM Aviation",
    industry: "Aviation",
    title: "Automated Flight Operations & Fleet Management CRM",
    lede: "Replaced a fragmented array of legacy software sheets and disconnected dispatch tools with a custom high-performance CRM, featuring automated emailers, slot collision detection, vector notifications, and daily backups.",
    coverImage: "/media/images/casestudies/aerocrm.png",
    challenge: {
      paragraphs: [
        "AeroCRM was managing charter fleet operations across disconnected spreadsheets and legacy software, causing booking conflicts, delayed communications, and zero audit trails.",
        "Flight dispatchers struggled to coordinate crew duty rest limits, aircraft maintenance windows, and VIP passenger manifests in real time."
      ],
      diagram: null
    },
    solution: {
      intro: "We architected an event-driven operations platform that synchronizes scheduling, crew compliance, and passenger data in real time.",
      principle: "Ingest → Validate Rules → Arbitrate → Dispatch → Archive",
      points: [
        { label: "Conflict detection", text: "real-time slot collision resolution preventing double-booked tail allocations" },
        { label: "Crew duty compliance", text: "automated tracking of FAA/EASA flight duty and rest limits with proactive alerts" },
        { label: "Role-based dashboards", text: "dedicated interfaces for flight dispatchers, pilots, and maintenance crews" },
        { label: "Encrypted manifest vault", text: "field-level encryption for sensitive traveler passports and customs records" },
        { label: "Automated backups", text: "immutable database snapshot backups executed every 6 hours with instant restore" }
      ]
    },
    businessImpact: {
      intro: "The unified CRM streamlined flight operations, eliminated scheduling errors, and strengthened regulatory compliance.",
      points: [
        "400% increase in dispatch operations throughput and booking speed",
        "0% booking collision rate across more than 12,000 flight segments",
        "85% reduction in manual data entry through automated manifest pipelines",
        "Clean regulatory audit records with immutable flight hour history"
      ]
    },
    servicesDelivered: [
      "Flight Operations CRM",
      "Real-Time Conflict Engine",
      "Regulatory Compliance Tracker",
      "Encrypted Passenger Vault",
      "Automated Database Backups"
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "Docker", "Redis", "WebSockets"]
  },

  {
    id: "novadefi",
    slug: "novadefi",
    aliases: ["novadefi", "nova-defi"],
    client: "Nova DeFi Protocol",
    industry: "Fintech & Web3",
    title: "High-Throughput Web3 Trading Platform & UX Overhaul",
    lede: "Co-architected the complete user flow and frontend gateway for Nova's decentralized finance protocol, designing intuitive swap interfaces, multi-chain wallet connectivity, and real-time portfolio dashboards.",
    coverImage: "/media/images/casestudies/novadefi.png",
    challenge: {
      paragraphs: [
        "Nova's existing trading interface suffered from a 60% user drop-off at the wallet connection step due to confusing permission prompts and failed gas estimations.",
        "Traders frequently experienced unexpected slippage and slow balance updates during peak on-chain market activity."
      ],
      diagram: null
    },
    solution: {
      intro: "We redesigned the decentralized trading experience with progressive disclosure, transparent gas fees, and sub-second price indexing.",
      principle: "Quote → Simulate → Sign → Execute → Reconcile",
      points: [
        { label: "Frictionless onboarding", text: "universal wallet modal with one-click multi-chain pairing and social login options" },
        { label: "Smart swap routing", text: "multi-pool order routing reducing slippage and protecting against MEV sandwich attacks" },
        { label: "Reactive subgraphs", text: "real-time WebSocket event indexing delivering sub-second portfolio balance updates" },
        { label: "Clear EIP-712 signing", text: "human-readable signature requests explaining exact token allowances before signing" },
        { label: "Gas fee pre-estimation", text: "accurate transaction fee preview displayed in USD and native crypto tokens" }
      ]
    },
    businessImpact: {
      intro: "The streamlined interface restored trader confidence and fueled massive daily trading volume growth.",
      points: [
        "60% reduction in user drop-off at the wallet connection onboarding step",
        "40% increase in successful swap executions with optimized slippage controls",
        "3x growth in daily active traders reaching over $14M in daily volume",
        "Zero smart contract security vulnerabilities or wallet phishing incidents"
      ]
    },
    servicesDelivered: [
      "Web3 UI/UX Design",
      "Multi-Chain Wallet Integration",
      "Slippage Routing Algorithm",
      "The Graph Reactive Subgraphs",
      "EIP-712 Signature Security"
    ],
    tech: ["Next.js", "Ethers.js", "Solidity", "The Graph", "Framer Motion", "Tailwind CSS"]
  },

  {
    id: "corelogistics",
    slug: "corelogistics",
    aliases: ["corelogistics", "core-logistics"],
    client: "Core Logistics",
    industry: "Logistics",
    title: "AI-Driven Supply Chain Matrix & Fleet Telematics",
    lede: "Constructed a custom supply chain optimization system from scratch, integrating AI-driven route prediction, real-time IoT fleet tracking, and automated warehouse inventory management.",
    coverImage: "/media/images/casestudies/corelogistics.png",
    challenge: {
      paragraphs: [
        "Core Logistics was losing significant operational margin due to manual route planning, inaccurate traffic predictions, and lack of real-time visibility into multi-temperature freight trailers.",
        "Warehouse loading docks frequently experienced bottleneck delays because trucks arrived unannounced or delayed by unexpected congestion."
      ],
      diagram: null
    },
    solution: {
      intro: "We engineered an automated intelligence loop connecting highway vehicle telematics directly with warehouse dock schedules.",
      principle: "Ingest → Predict → Optimize → Dispatch → Reconcile",
      points: [
        { label: "AI route optimization", text: "predictive highway routing utilizing historical traffic, weather, and load weights" },
        { label: "Cold chain IoT telemetry", text: "continuous temperature sensor streaming via MQTT with instant anomaly alerts" },
        { label: "Dynamic dock scheduling", text: "automated gate and dock door allocation based on real-time vehicle GPS ETAs" },
        { label: "Digital e-POD manifests", text: "electronic proof of delivery with timestamped mobile signatures and barcode scans" },
        { label: "Customer tracking links", text: "real-time shipment tracking eliminating customer status inquiry calls" }
      ]
    },
    businessImpact: {
      intro: "The intelligent telematics platform delivered substantial fuel savings and accelerated freight throughput.",
      points: [
        "38% increase in daily delivery throughput across regional fleet hubs",
        "₹12 Lakh annual fuel savings per cluster from reduced engine idle time and optimal pathing",
        "Zero perishable cargo spoilage incidents with continuous cold chain monitoring",
        "45% reduction in warehouse truck dwell time through automated dock scheduling"
      ]
    },
    servicesDelivered: [
      "AI Predictive Route Optimization",
      "IoT Telematics & MQTT Mesh",
      "Smart Warehouse Scheduling",
      "Digital e-POD Manifest System",
      "Real-Time Customer Tracking"
    ],
    tech: ["Python", "TensorFlow", "React", "Google Maps API", "PostgreSQL", "MQTT"]
  },

  {
    id: "learnverse",
    slug: "learnverse",
    aliases: ["learnverse", "learnverse-academy"],
    client: "LearnVerse Academy",
    industry: "EdTech",
    title: "Full-Stack Learning Management System with Live Classrooms",
    lede: "Built a scalable Learning Management System with WebRTC-based live video classrooms, adaptive quiz engines, real-time student progress tracking, and automated certificate generation for 50,000+ students.",
    coverImage: "/media/images/casestudies/learnverse.png",
    challenge: {
      paragraphs: [
        "LearnVerse was conducting live classes across external video tools and tracking student submissions manually in spreadsheets, leading to fragmented analytics and low course completion rates.",
        "Students felt disengaged during passive video streams, while instructors spent hours manually grading quizzes and issuing completion certificates."
      ],
      diagram: null
    },
    solution: {
      intro: "We built an all-in-one e-learning platform that transforms passive video viewing into interactive, verified mastery.",
      principle: "Stream → Engage → Assess → Verify → Certify",
      points: [
        { label: "Low-latency live classrooms", text: "sub-250ms WebRTC video streaming with synchronized collaborative whiteboards and polls" },
        { label: "Adaptive quiz engine", text: "algorithmic question difficulty adjustment with immediate conceptual remediation videos" },
        { label: "Cryptographic certificates", text: "tamper-proof PDF credential generation embedded with unique verification QR codes" },
        { label: "Instructor heatmaps", text: "live analytics showing where students pause, re-watch, or drop off during lectures" },
        { label: "Gamified progression", text: "achievement badges and weekly streaks driving consistent course study habits" }
      ]
    },
    businessImpact: {
      intro: "The interactive platform significantly elevated student course completion and institutional credibility.",
      points: [
        "Course completion rate climbed from 29% to 94% with gamified learning loops",
        "Supported over 50,000 concurrent students globally with zero video stream latency lag",
        "Tamper-proof digital certificates eliminated credential forgery across employer verifications",
        "4.9 / 5 overall instructor satisfaction with automated grading and engagement telemetry"
      ]
    },
    servicesDelivered: [
      "WebRTC Live Video Classroom",
      "Adaptive Algorithmic Quizzing",
      "Cryptographic Certificate Engine",
      "Real-Time Learning Analytics",
      "Scalable Cloud Streaming"
    ],
    tech: ["Next.js", "WebRTC", "FastAPI", "PostgreSQL", "Redis", "Docker"]
  }
];

/**
 * Intelligent Normalizer:
 * Takes any raw case study (CMS/database/custom) and produces a clean, concise,
 * uniform format matching the Orangemantra editorial standard.
 */
export function normalizeCaseStudy(raw) {
  if (!raw) return null;

  const id = raw.slug || raw.id || "case-study";
  const slug = raw.slug || raw.id || "case-study";
  const client = raw.client || "Leading Enterprise Client";
  const industry = raw.industry || "Technology";
  const title = raw.title || "Enterprise Digital Transformation Platform";
  const lede = raw.lede || raw.summary || raw.desc || "A comprehensive case study on engineering scalable architecture and measurable business transformation.";
  const coverImage = raw.coverImage || raw.img || "/media/images/casestudies/aerocrm.png";

  // Challenge normalization
  let challengeParagraphs = [];
  let challengeDiagram = null;
  let challengeDiagramAlt = "";

  if (typeof raw.challenge === "string") {
    challengeParagraphs = [raw.challenge];
  } else if (raw.challenge && typeof raw.challenge === "object") {
    if (Array.isArray(raw.challenge.paragraphs)) {
      challengeParagraphs = raw.challenge.paragraphs;
    } else if (Array.isArray(raw.challenge.narrative)) {
      challengeParagraphs = raw.challenge.narrative;
    } else {
      challengeParagraphs = [raw.challenge.text || raw.challenge.desc || "The client required a resilient, modern digital architecture."];
    }
    challengeDiagram = raw.challenge.diagram || null;
    challengeDiagramAlt = raw.challenge.diagramAlt || `${title} Architecture`;
  }

  // Solution normalization
  let solutionIntro = "We designed scalability, resilience, and operational precision into the infrastructure, APIs, and workflows from day one.";
  let solutionPrinciple = "Protect → Control Access → Monitor → Audit → Respond";
  let solutionPoints = [];

  if (typeof raw.solution === "string") {
    solutionIntro = raw.solution;
    solutionPoints = [
      { label: "Core Architecture", text: "modular, cloud-native microservices engineered for high concurrency" },
      { label: "Role-Based Access", text: "granular permissions ensuring strict separation of operational duties" },
      { label: "Data Security", text: "military-grade encryption at rest and in transit across all endpoints" },
      { label: "Automated Workflows", text: "real-time task orchestration eliminating manual operational friction" }
    ];
  } else if (raw.solution && typeof raw.solution === "object") {
    solutionIntro = raw.solution.intro || solutionIntro;
    solutionPrinciple = Array.isArray(raw.solution.principle)
      ? raw.solution.principle.join(" → ")
      : (raw.solution.principle || solutionPrinciple);

    if (Array.isArray(raw.solution.points)) {
      solutionPoints = raw.solution.points.map(p => {
        if (typeof p === "string") {
          const parts = p.split(":");
          return {
            label: parts[0] ? parts[0].trim() : "Feature",
            text: parts[1] ? parts[1].trim() : parts[0]
          };
        }
        return p;
      });
    } else if (Array.isArray(raw.solution.pillars)) {
      // Map pillars concisely
      solutionPoints = raw.solution.pillars.map(p => ({
        label: p.title,
        text: p.desc
      }));
    }
  }

  // Business Impact normalization
  let impactIntro = "The platform delivers measurable improvements in operational performance, user satisfaction, and system reliability.";
  let impactPoints = [];

  if (raw.businessImpact && typeof raw.businessImpact === "object") {
    impactIntro = raw.businessImpact.intro || impactIntro;
    if (Array.isArray(raw.businessImpact.points)) {
      impactPoints = raw.businessImpact.points;
    } else if (Array.isArray(raw.businessImpact)) {
      impactPoints = raw.businessImpact.map(i => typeof i === "string" ? i : `${i.title}: ${i.desc}`);
    }
  } else if (Array.isArray(raw.metrics)) {
    impactPoints = raw.metrics.map(m => `${m.value} ${m.label} (${m.sub || 'Verified Benchmark'})`);
  }

  // Services Delivered normalization
  let servicesDelivered = raw.servicesDelivered || [];
  if (servicesDelivered.length === 0 && raw.tech && raw.tech.length > 0) {
    servicesDelivered = raw.tech.map(t => `${t} Engineering`);
  }

  return {
    ...raw,
    id,
    slug,
    client,
    industry,
    title,
    lede,
    coverImage,
    challenge: {
      paragraphs: challengeParagraphs,
      diagram: challengeDiagram,
      diagramAlt: challengeDiagramAlt
    },
    solution: {
      intro: solutionIntro,
      principle: solutionPrinciple,
      points: solutionPoints
    },
    businessImpact: {
      intro: impactIntro,
      points: impactPoints
    },
    servicesDelivered,
    tech: raw.tech || ["React", "FastAPI", "PostgreSQL", "Docker"]
  };
}

/**
 * Find a case study by slug, id, or alias
 */
export function findCaseStudy(caseStudiesList, identifier) {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim();
  const list = (caseStudiesList && caseStudiesList.length > 0) ? caseStudiesList : DEFAULT_CASE_STUDIES;

  const found = list.find(item => {
    const itemId = (item.slug || item.id || "").toLowerCase();
    if (itemId === clean) return true;
    if (item.aliases && item.aliases.some(a => a.toLowerCase() === clean)) return true;
    return false;
  });

  return found ? normalizeCaseStudy(found) : null;
}
