import os
import pymongo
from dotenv import load_dotenv

# Default hardcoded data from the frontend pages

DEFAULT_SITE_SETTINGS = {
    "identifier": "global_settings",
    "logo_text": "HariKrushn DigiVerse LLP",
    "navbar_styles": {
        "fontSize": "12px",
        "color": "#a3a3a3",
        "hoverColor": "#ffffff",
        "logoSize": "14px",
        "logoColor": "#ffffff"
    },
    "navbar_links": [
        {
            "label": "Company",
            "href": "#",
            "show": True,
            "dropdown": [
                { "label": "Our Story", "href": "#our-story", "show": True },
                { "label": "Our People", "href": "#our-people", "show": True },
                { "label": "Our Culture", "href": "#our-culture", "show": True },
                { "label": "About Us", "href": "#about-us", "show": True },
                { "label": "Awards and Achievements", "href": "#awards-achievements", "show": True },
                { "label": "Blogs", "href": "#blogs", "show": True },
                { "label": "Our Gallery", "href": "#our-gallery", "show": True }
            ]
        },
        { "label": "Services", "href": "#services", "show": True },
        { "label": "Industry", "href": "#industry", "show": True },
        { "label": "Career", "href": "#career", "show": True },
        { "label": "Case Study", "href": "#case-study", "show": True },
        { "label": "Portfolio", "href": "#portfolio", "show": True },
        { "label": "Ventures", "href": "#ventures", "show": True },
        { "label": "Contact", "href": "#contact", "show": True }
    ],
    "section_visibility": {},
    "footer": {
        "address": "Silver Trade Center, 501 & 502, near Pragati IT Park, Mota Varachha, Surat, Gujarat 394101",
        "email": "contact@hkdigiverse.com",
        "phone": "+91 98765 43210",
        "copyright": "© 2026 HariKrushn DigiVerse LLP. All rights reserved.",
        "capabilities": [
            { "label": "Engineering", "href": "#service-web", "show": True },
            { "label": "AI & ML", "href": "#service-ai-consulting", "show": True },
            { "label": "Branding", "href": "#service-social-media-management", "show": True },
            { "label": "Product Strategy", "href": "#service-custom-software", "show": True }
        ],
        "ecosystem": [
            { "label": "Portfolio", "href": "#portfolio", "show": True },
            { "label": "Ventures", "href": "#ventures", "show": True },
            { "label": "Careers", "href": "#career", "show": True },
            { "label": "Contact", "href": "#contact", "show": True }
        ],
        "social_links": [
            {"platform": "LinkedIn", "url": "https://linkedin.com", "show": True},
            {"platform": "Twitter", "url": "https://twitter.com", "show": True},
            {"platform": "GitHub", "url": "https://github.com", "show": True},
            {"platform": "Instagram", "url": "https://instagram.com", "show": True}
        ]
    }
}

DEFAULT_ABOUT_US = {
    "identifier": "about_us_content",
    "philosophy": {
        "title": "Why We Exist",
        "quote": "We exist to simplify digital transformation and construct scalable, future-ready technology platforms that drive clear business value.",
        "description": "In a landscape crowded with off-the-shelf templates and rigid software designs, HariKrushn DigiVerse stands for bespoke digital craftsmanship. We combine architectural-grade frontend graphics with secure, high-concurrency microservices, crafting products that elevate your brand and work reliably."
    },
    "vision": {
        "title": "Our Vision",
        "text": "To stand as the international benchmark for bespoke digital craftsmanship, engineering high-concurrency cloud networks that empower enterprises to run reliably at scale."
    },
    "mission": {
        "title": "Our Mission",
        "text": "Architect fully autonomous multi-agent networks that execute secure device-level tasks, rendering real-time responsive spatial grids."
    },
    "dna_values": [
        {"name": "Innovation", "desc": "Pushing technical boundaries to create custom, forward-thinking architectures."},
        {"name": "Ownership", "desc": "Taking complete accountability for code execution, product quality, and business impact."},
        {"name": "Transparency", "desc": "Clear, open communication with no hidden costs, agendas, or black boxes."},
        {"name": "Execution", "desc": "Moving fast from design blueprints to high-availability production code."},
        {"name": "Learning", "desc": "Constant upskilling and integration of emerging technology and scientific paradigms."},
        {"name": "Quality", "desc": "Writing clean, test-driven, performant code that stands the test of time."},
        {"name": "Speed", "desc": "Launching software rapidly without compromising architectural integrity."},
        {"name": "Impact", "desc": "Aligning software decisions directly with measurable enterprise value."}
    ],
    "workspace_rooms": [
        {"title": "The Digiverse Workspace", "desc": "Ergonomic layout optimized for developer flow, equipped with dual 4K monitors.", "img": "/media/images/gallery/digiverse_workspace.png", "size": "col-span-2 row-span-1"},
        {"title": "Design Sprint Lounge", "desc": "Collaborative sandbox where visual assets and wireframe mockups are mapped.", "img": "/media/images/gallery/design_sprint.png", "size": "col-span-1 row-span-1"},
        {"title": "Hardware Calibration Lab", "desc": "Testing and deploying edge-AI microcomputers and localized sensory controllers.", "img": "/media/images/gallery/hardware_calibration.png", "size": "col-span-1 row-span-2"},
        {"title": "AI Orchestration Suite", "desc": "Servers dedicated to caching prompts and hosting sandboxed local LLM loops.", "img": "/media/images/gallery/ai_orchestrator.png", "size": "col-span-2 row-span-1"},
        {"title": "Cinematic Review Deck", "desc": "High-fidelity screens configured to audit front-end animations at 120 FPS.", "img": "/media/images/gallery/cinematic_review.png", "size": "col-span-1 row-span-1"},
        {"title": "Launch Celebration Area", "desc": "Recreational space dedicated to team milestones and collaborative growth.", "img": "/media/images/gallery/launch_celebration.png", "size": "col-span-2 row-span-1"}
    ],
    "personal_letter": {
        "eyebrow": "// Personal Letter",
        "title": "Crafting the Infinite Digital",
        "founders": [
            {
                "name": "Radhe Patel",
                "role": "Co-Founder & CEO",
                "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80",
                "signatureTitle": "Radhe Patel, CEO"
            },
            {
                "name": "Prince Patel",
                "role": "Co-Founder & Partner",
                "img": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=500&q=80",
                "signatureTitle": "Prince Patel, Partner"
            }
        ],
        "paragraphs": [
            "Dear Partners & Clients,",
            "From the moment we envisioned HariKrushn DigiVerse, our goal was clear: to create corporate platforms that combine structural engineering with luxury aesthetics. Software should not just be functional; it should be an asset that inspires trust and is satisfying to interact with.",
            "We do not believe in taking shortcuts. Every system configuration, cloud setup, and animation path we build is designed with precision. We are committed to fostering deep engineering partnerships, helping your team scale into the next phase of digital business with confidence.",
            "Thank you for trusting us with your core technology architectures."
        ]
    },
    "timeline_operational": {
        "eyebrow": "// Operational Lifecycle",
        "title": "Development Standards",
        "steps": [
            {"step": "Discovery", "label": "01", "desc": "Aligning business needs with technical deliverables, specifying database matrices and system blueprints."},
            {"step": "Architecture", "label": "02", "desc": "Drafting data models, serverless endpoint paths, caching grids, load handling, and folder schemas."},
            {"step": "UI/UX Design", "label": "03", "desc": "Crafting luxury glassmorphic layouts, customized typography matrices, responsive systems, and gestural motions."},
            {"step": "Development", "label": "04", "desc": "Coding responsive structures, clean React components, fast FastAPI routes, clean logic, and TDD validations."},
            {"step": "Quality Assurance", "label": "05", "desc": "Rigorous manual tests, automated Selenium scripts, concurrency validation, and memory leak analysis."},
            {"step": "Deployment", "label": "06", "desc": "Setting CI/CD integration checkpoints, cloud assets, and SSL certificates."},
            {"step": "Continuous Improvement", "label": "07", "desc": "Analyzing user telemetry, updating databases, tuning speeds, and updating emerging packages."}
        ]
    },
    "office_locations": {
        "eyebrow": "// Corporate Nodes",
        "title": "Office Locations",
        "offices": [
            {"location": "Dubai Headquarters", "code": "UAE-HQ", "address": "Techno Hub, Silicon Oasis, Dubai, United Arab Emirates", "contact": "hello@hkdigiverse.com"},
            {"location": "Surat Development Hub", "code": "IN-DEV", "address": "401, HariKrushn Tower, VIP Road, Surat, GJ 395007, India", "contact": "surat@hkdigiverse.com"},
            {"location": "Future Expansion Nodes", "code": "US/UK-EXP", "address": "Planning operations hubs in London and New York tech hubs.", "contact": "expansion@hkdigiverse.com"}
        ]
    },
    "manifesto": {
        "eyebrow": "// Company Manifesto",
        "quote1": "We don't just build software. We build digital ecosystems.",
        "quote2": "We don't follow technology. We create the future with it.",
        "footnote": "// Every line of code should create measurable business value."
    }
}

DEFAULT_CULTURE = [
    {
        "title": "Continuous Learning",
        "desc": "We encourage curiosity and continuous learning. From new technologies to emerging trends, we invest in our team to stay future-ready.",
        "img": "/media/images/culture/learning.png",
        "icon": "learning",
        "sort_order": 0,
        "status": "published"
    },
    {
        "title": "Collaborative Environment",
        "desc": "We believe the best ideas come from working together. Open communication and teamwork are at the heart of everything we do.",
        "img": "/media/images/culture/collab.png",
        "icon": "collab",
        "sort_order": 1,
        "status": "published"
    },
    {
        "title": "Celebrate Every Moment",
        "desc": "From birthdays to big wins, we celebrate every milestone together. Because memories built together, last forever.",
        "img": "/media/images/culture/celebrate.png",
        "icon": "celebrate",
        "sort_order": 2,
        "status": "published"
    },
    {
        "title": "Client Success Mindset",
        "desc": "Our clients' goals become our mission. We focus on delivering real value and long-term growth through every solution we build.",
        "img": "/media/images/culture/client.png",
        "icon": "client",
        "sort_order": 3,
        "status": "published"
    },
    {
        "title": "Ownership & Accountability",
        "desc": "We take pride in ownership. Every team member is empowered to take initiative and deliver quality with integrity.",
        "img": "/media/images/culture/ownership.png",
        "icon": "ownership",
        "sort_order": 4,
        "status": "published"
    },
    {
        "title": "Grow Without Limits",
        "desc": "We provide the platform, resources, and freedom to grow. Your progress drives our progress. Together, we scale new heights.",
        "img": "/media/images/culture/grow.png",
        "icon": "grow",
        "sort_order": 5,
        "status": "published"
    }
]

DEFAULT_PEOPLE = [
    # Founders (Level 1)
    {"name": "Radhe Patel", "role": "Co-Founder & CEO", "bio": "Leading strategic partnerships, vision, and growth. Radhe aligns complex commercial needs with exceptional digital delivery.", "level": 1, "icon": "⚡", "dept": "FOUNDER", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": None, "sort_order": 0, "status": "published", "x": 350, "y": 150},
    {"name": "Prince Patel", "role": "Co-Founder & Managing Partner", "bio": "Overseeing global operations, legal structures, and commercial growth strategy for HariKrushn DigiVerse.", "level": 1, "icon": "👑", "dept": "FOUNDER", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": None, "sort_order": 1, "status": "published", "x": 750, "y": 150},
    
    # C-Suite (Level 2)
    {"name": "Krushn Patel", "role": "Chief Technology Officer", "bio": "Pioneering system architectures, custom database layers, and robust AI orchestrations. Krushn codes systems that scale to millions.", "level": 2, "icon": "🛡️", "dept": "C-SUITE / TECH", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Radhe Patel", "sort_order": 2, "status": "published", "x": 200, "y": 300},
    {"name": "Arjun Shah", "role": "Chief Design Officer", "bio": "Shaping the digital craftsmanship ethos. Arjun creates high-end interactive visuals, smooth motion layouts, and premium user flows.", "level": 2, "icon": "📐", "dept": "C-SUITE / DESIGN", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Radhe Patel", "sort_order": 3, "status": "published", "x": 450, "y": 300},
    {"name": "Pooja Mehta", "role": "Chief AI Officer", "bio": "Integrating LLMs, custom training agent pipelines, and automated intelligence layers that streamline complex business workflows.", "level": 2, "icon": "🧠", "dept": "C-SUITE / AI", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Prince Patel", "sort_order": 4, "status": "published", "x": 700, "y": 300},
    {"name": "Neha Sharma", "role": "Chief Marketing Officer", "bio": "Leading business scaling, operational excellence, client strategy, and product delivery management for international accounts.", "level": 2, "icon": "📈", "dept": "C-SUITE / GROWTH", "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Prince Patel", "sort_order": 5, "status": "published", "x": 950, "y": 300},
    
    # Software Development Column (CTO)
    {"name": "Vikram Rathod", "role": "Software Dev Lead", "bio": "Crafting fluid React interfaces and interactive visual layers with high-performance styling and custom motion graphics.", "level": 3, "icon": "💻", "dept": "DEVELOPMENT", "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Krushn Patel", "sort_order": 6, "status": "published", "x": 100, "y": 480},
    {"name": "Aarav Singhania", "role": "Senior Fullstack Developer", "bio": "Architecting secure RESTful/GraphQL APIs, database schemas, and microservice infrastructure for high availability.", "level": 4, "icon": "⚙️", "dept": "DEVELOPMENT", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Vikram Rathod", "sort_order": 7, "status": "published", "x": 100, "y": 660},
    {"name": "Neil D'Souza", "role": "Frontend Intern", "bio": "Specializing in premium animations, user interactions, and CSS optimization across platforms.", "level": 5, "icon": "🎨", "dept": "DEVELOPMENT", "image": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Aarav Singhania", "sort_order": 8, "status": "published", "x": 100, "y": 840},
    
    # Product & QA Column (CTO)
    {"name": "Simran Kaur", "role": "Product & QA Lead", "bio": "Managing strategic client communications, technical roadmaps, and cross-functional engineering deliverables.", "level": 3, "icon": "🤝", "dept": "PRODUCT & QA", "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Krushn Patel", "sort_order": 9, "status": "published", "x": 350, "y": 480},
    {"name": "Dev Patel", "role": "Senior QA Engineer", "bio": "Optimizing server load, DevOps CI/CD deployments, and cloud scalability across multi-region networks.", "level": 4, "icon": "🚀", "dept": "PRODUCT & QA", "image": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Simran Kaur", "sort_order": 10, "status": "published", "x": 350, "y": 660},
    {"name": "Meera Nair", "role": "Product Testing Intern", "bio": "Structuring internal workflows, employee onboarding automation, and resource loading metrics.", "level": 5, "icon": "📋", "dept": "PRODUCT & QA", "image": "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Dev Patel", "sort_order": 11, "status": "published", "x": 350, "y": 840},
    
    # UI/UX & Design Column (CDO)
    {"name": "Diya Joshi", "role": "Creative & UI/UX Lead", "bio": "Designing user-centered product flows, high-fidelity mockups, and unified design system architectures.", "level": 3, "icon": "✏️", "dept": "CREATIVE & DESIGN", "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Arjun Shah", "sort_order": 12, "status": "published", "x": 600, "y": 480},
    {"name": "Isha Verma", "role": "Senior UI Designer", "bio": "Creating cinematic transitions, svg web animations, and premium micro-interactions that make interfaces feel alive.", "level": 4, "icon": "🎨", "dept": "CREATIVE & DESIGN", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Diya Joshi", "sort_order": 13, "status": "published", "x": 600, "y": 660},
    {"name": "Zara Khan", "role": "UI/UX Intern", "bio": "Collaborating on luxury layout frames, high-end vector branding assets, and client prototypes.", "level": 5, "icon": "📐", "dept": "CREATIVE & DESIGN", "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Isha Verma", "sort_order": 14, "status": "published", "x": 600, "y": 840},
    
    # AI Research Column (CAIO)
    {"name": "Kabir Malhotra", "role": "AI Research Lead", "bio": "Directing multi-agent network strategies, prompt compiler layers, and local vector indexing pipelines.", "level": 3, "icon": "🧠", "dept": "AI RESEARCH", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Pooja Mehta", "sort_order": 15, "status": "published", "x": 850, "y": 480},
    {"name": "Rohan Das", "role": "Senior AI Engineer", "bio": "Tuning localized RAG models, semantic embedding matrices, and device-level agent routines.", "level": 4, "icon": "⚡", "dept": "AI RESEARCH", "image": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Kabir Malhotra", "sort_order": 16, "status": "published", "x": 850, "y": 660},
    {"name": "Kabir Das", "role": "AI Intern", "bio": "Testing cognitive automation flows, custom dataset compilation, and prompt evaluation tests.", "level": 5, "icon": "💡", "dept": "AI RESEARCH", "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Rohan Das", "sort_order": 17, "status": "published", "x": 850, "y": 840},
    
    # Marketing & Brand Column (CMO)
    {"name": "Yash Wardhan", "role": "Marketing & Brand Lead", "bio": "Coordinating international accounts, brand identity scaling, and digital narrative distributions.", "level": 3, "icon": "📈", "dept": "MARKETING", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Neha Sharma", "sort_order": 18, "status": "published", "x": 1100, "y": 480},
    {"name": "Ananya Sen", "role": "Senior Digital Marketer", "bio": "Designing analytics campaigns, conversion optimization charts, and luxury social marketing briefs.", "level": 4, "icon": "🎯", "dept": "MARKETING", "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Yash Wardhan", "sort_order": 19, "status": "published", "x": 1100, "y": 660},
    {"name": "Simran Sen", "role": "Digital Marketing Intern", "bio": "Managing content placement tracking, SEO campaign metrics, and press distribution logs.", "level": 5, "icon": "📣", "dept": "MARKETING", "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Ananya Sen", "sort_order": 20, "status": "published", "x": 1100, "y": 840},
    
    # Multiple Manager Connections Demonstration Nodes
    {"name": "Sub-Node A", "role": "Demo Coordinator A", "bio": "Created to demonstrate multi-manager connections.", "level": 1, "icon": "⚡", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 21, "status": "published", "x": 150, "y": 150},
    {"name": "Sub-Node B", "role": "Demo Coordinator B", "bio": "Created to demonstrate multi-manager connections.", "level": 1, "icon": "👑", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 22, "status": "published", "x": 1250, "y": 150},
    {"name": "Sub-Node C", "role": "Multi-Manager Child", "bio": "This node is connected to both Sub-Node A and Sub-Node B.", "level": 2, "icon": "🧠", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Sub-Node A, Sub-Node B", "sort_order": 23, "status": "published", "x": 700, "y": 300},
    {"name": "Sub-Node D", "role": "Demo Coordinator D", "bio": "Created to demonstrate multi-parent connections.", "level": 1, "icon": "⚡", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 24, "status": "published", "x": 300, "y": 150},
    {"name": "Sub-Node E", "role": "Demo Coordinator E", "bio": "Created to demonstrate multi-parent connections.", "level": 1, "icon": "👑", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 25, "status": "published", "x": 1100, "y": 150},
    {"name": "Sub-Node F", "role": "Multi-Parent Child", "bio": "This node is connected to both Sub-Node D and Sub-Node E.", "level": 2, "icon": "🧠", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Sub-Node D, Sub-Node E", "sort_order": 26, "status": "published", "x": 700, "y": 450},

    # New requested nodes connected under HariKrushn DigiVerse LLP
    {"name": "Hari Node", "role": "Special Coordinator A", "bio": "Created under HariKrushn DigiVerse LLP.", "level": 1, "icon": "✨", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 27, "status": "published", "x": 500, "y": 150},
    {"name": "Krushn Node", "role": "Special Coordinator B", "bio": "Created under HariKrushn DigiVerse LLP.", "level": 1, "icon": "⚡", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "HariKrushn DigiVerse LLP", "sort_order": 28, "status": "published", "x": 900, "y": 150},
    {"name": "Hari Krushn Child Node", "role": "Dual-Connected Child Node", "bio": "This node is connected to both Hari Node and Krushn Node.", "level": 2, "icon": "🤝", "dept": "DEMO", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", "parent_id": "Hari Node, Krushn Node", "sort_order": 29, "status": "published", "x": 700, "y": 350}
]

DEFAULT_AWARDS = [
    {
        "slug": "digital-craftsmanship",
        "title": "Best Digital Craftsmanship Studio",
        "by": "Tech & Design Guild",
        "year": "2024",
        "description": "Awarded to HariKrushn DigiVerse for outstanding excellence in building bespoke, high-performance web systems and premium responsive animations.",
        "category": "company",
        "recipient": "HariKrushn DigiVerse LLP",
        "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80",
        "longDescription": "This award recognizes our studio's commitment to pushing the boundaries of web engineering and aesthetics. The Tech & Design Guild evaluated our projects based on visual supremacy, codebase clean-room metrics, and 120 FPS motion responses on high-concurrency portals.",
        "impactStats": [
            {"label": "Evaluation Score", "value": "99.4%"},
            {"label": "Performance Rank", "value": "Top 1%"},
            {"label": "Motion Frame Rate", "value": "120 FPS"}
        ],
        "highlights": [
            "Exceptional design engineering rating",
            "Bespoke web framework rendering standards",
            "Pioneering user interactivity paradigms"
        ],
        "sort_order": 0,
        "status": "published"
    }
]

DEFAULT_BLOGS = [
    {
        "slug": "microservices",
        "title": "Re-architecting Enterprise Microservices for Scale",
        "desc": "How we transitioned a legacy monolithic platform into a high-availability microservices mesh capable of millions of transactions.",
        "date": "JUNE 24, 2026",
        "category": "ENGINEERING",
        "readTime": "5 MIN READ",
        "image": "/media/images/gallery/ai_orchestrator.png",
        "author": "Radhe Patel (CEO)",
        "longContent": [
            "At HariKrushn DigiVerse, we frequently consult with enterprise firms running legacy monolithic codebases. Over time, these platforms struggle to maintain performance under high concurrent user load, leading to database lockups and downtime. In this deep dive, we walk through our engineering strategy for decomposing a core monolithic financial transactional ledger into a fully distributed microservices mesh.",
            "We began by establishing strict boundaries using domain-driven design (DDD). By separating user authentication, transactional ledger records, billing details, and analytics into independent services, we isolated computational dependencies. We chose FastAPI for our REST endpoints and compiled them into lightweight Docker containers orchestrated by Kubernetes.",
            "A key challenge was maintaining transaction consistency across services without introducing blocking locks. We implemented the Saga design pattern using an asynchronous message broker (RabbitMQ) to trigger compensating transactions in case of failure. Additionally, we placed a Redis Sentinel caching grid in front of hot database tables, reducing average response latency from 450ms to less than 15ms.",
            "The resulting network now easily scales to handle millions of transactions daily, providing our enterprise clients with absolute reliability, auto-scaling, and a clean interface to integrate emerging internal apps."
        ],
        "highlights": [
            "Reduced response latency from 450ms to 15ms",
            "Implemented Saga Pattern for transaction safety",
            "Containerized orchestration with Auto-Scaling Kubernetes"
        ],
        "status": "published"
    },
    {
        "slug": "cinematic-design",
        "title": "The Art of Cinematic Web Design",
        "desc": "Exploring the boundary between luxury brand aesthetics, smooth WebGL canvasses, and interactive scroll animations.",
        "date": "MAY 18, 2026",
        "category": "DESIGN",
        "readTime": "4 MIN READ",
        "image": "/media/images/gallery/cinematic_review.png",
        "author": "Prince Patel (Partner)",
        "longContent": [
            "Traditional web development prioritizes static layout grids. However, high-end brands require digital environments that evoke emotion, establish premium status, and tell a memorable visual story. Cinematic web design bridges this gap by merging classic layout logic with WebGL graphics, custom typography matrices, and dynamic scroll physics.",
            "When we set out to build HariKrushn's design system, we established a strict set of visual parameters. Every hover state should feel responsive, utilizing custom cursor interactions to guide the user. Every transition should utilize smooth spring physics (via Framer Motion) to mimic the natural inertia of real-world materials.",
            "Furthermore, we utilize asset lazy-loading and GPU-accelerated canvas layers to ensure that complex animation-heavy websites load instantly. By separating heavy visual logic onto background threads and rendering only viewport-adjacent nodes, we achieve 120 FPS scrolling interactions even on legacy mobile devices.",
            "Ultimately, cinematic design is not about decoration. It is about crafting an interactive virtual space where brand values are communicated through motion, light, and editorial detail."
        ],
        "highlights": [
            "Maintained consistent 120 FPS viewport transitions",
            "Designed fluid glassmorphism component libraries",
            "Engineered custom cursor tracking algorithms"
        ],
        "status": "published"
    },
    {
        "slug": "ai-agents",
        "title": "Integrating Advanced AI Agents in CRM Systems",
        "desc": "A technical walkthrough of building automated database query flows and vector search engines into modern SaaS apps.",
        "date": "APRIL 02, 2026",
        "category": "AI & SYSTEMS",
        "readTime": "7 MIN READ",
        "image": "/media/images/gallery/digiverse_workspace.png",
        "author": "Radhe Patel (CEO)",
        "longContent": [
            "Integrating Large Language Models (LLMs) into customer relationship platforms (CRMs) has evolved beyond basic chatbot widgets. Today's enterprise applications require autonomous AI agents capable of querying live databases, executing workflows, and preparing data briefs without human intervention.",
            "In this technical guide, we outline our architecture for building AI agents that operate directly inside client-managed CRM systems. We utilize a secure prompt-cache compilation layer to reduce API latency. When a user requests an analytical summary, the agent utilizes a secure semantic router to match the query to a pre-authorized SQL template.",
            "To maintain data security, the agent operates in an isolated execution sandbox. Telemetry data is stripped of personally identifiable information (PII) before it is passed to cloud-hosted LLM endpoints. For highly sensitive operations, we deploy decentralized local LLM clusters within the client's private VPC.",
            "By automating database queries, client categorization, and response drafting, our AI integrations have increased operational efficiency for our clients by more than 10x, enabling teams to focus on relationship management rather than database navigation."
        ],
        "highlights": [
            "Developed secure sandboxed execution environments",
            "Reduced API costs with semantic prompt caching",
            "Deployed private local LLM clusters for VPC security"
        ],
        "status": "published"
    }
]

DEFAULT_PORTFOLIO = [
    {
        "slug": "zenith",
        "title": "Zenith CRM Platform",
        "client": "Zenith Global",
        "category": "platform",
        "description": "An automation-rich CRM platform designed for global distribution and supply chains, featuring real-time analytical logs, automated email campaigns, and role-based dashboards.",
        "tech": ["React", "FastAPI", "Docker", "PostgreSQL"],
        "img": "/media/images/casestudies/corelogistics.png",
        "color": "emerald",
        "accentColor": "#10b981",
        "sort_order": 0,
        "status": "published"
    },
    {
        "slug": "devpulse",
        "title": "DevPulse Agentic System",
        "client": "DevPulse Inc",
        "category": "ai",
        "description": "An automated developer metrics platform powered by custom LLM pipelines, pulling analytics directly from vector search and providing AI-generated code review summaries.",
        "tech": ["Python", "Vector DB", "FastAPI", "LangChain"],
        "img": "/media/images/casestudies/novadefi.png",
        "color": "purple",
        "accentColor": "#a855f7",
        "sort_order": 1,
        "status": "published"
    },
    {
        "slug": "solis",
        "title": "Solis Trading Portal",
        "client": "Solis Ltd",
        "category": "platform",
        "description": "A responsive fintech dashboard delivering rapid metric updates, instant payment gates, multi-tenant scaling, and real-time portfolio tracking with Stripe integration.",
        "tech": ["React", "Stripe API", "AWS", "Redis"],
        "img": "/media/images/casestudies/vesper.png",
        "color": "amber",
        "accentColor": "#f59e0b",
        "sort_order": 2,
        "status": "published"
    }
]

DEFAULT_VENTURES = [
    {
        "slug": "aisetu",
        "name": "AI Setu",
        "tagline": "Bridging India to AI",
        "status": "Active",
        "img": "/media/images/ventures/aisetu.png",
        "color": "cyan",
        "accentColor": "#06b6d4",
        "glowColor": "rgba(6,182,212,0.20)",
        "shortDesc": "A national-scale AI literacy and integration initiative designed to democratize artificial intelligence across Tier-2 and Tier-3 cities of India.",
        "fullDescription": "AI Setu (meaning \"AI Bridge\") is our flagship social-impact venture aimed at making artificial intelligence accessible, understandable, and usable for every Indian citizen — regardless of their technical background. We believe AI should not remain an urban privilege. From local shopkeepers to rural entrepreneurs, AI Setu bridges the knowledge gap through vernacular workshops, ready-to-deploy AI toolkits, and community-driven learning hubs.",
        "mission": "To create a seamless bridge between cutting-edge AI technology and India's diverse population, enabling 10 million people to leverage AI tools for business, education, and governance by 2030.",
        "vision": "An India where every citizen, regardless of geography or language, can harness the power of AI to improve their livelihood, education, and community governance.",
        "keyInitiatives": [
            {"title": "Vernacular AI Workshops", "desc": "Free monthly workshops in Hindi, Gujarati, Tamil, Telugu, and Marathi teaching AI basics, prompt engineering, and tool usage to local entrepreneurs and students."},
            {"title": "AI Toolkit for SMEs", "desc": "Pre-built AI templates for invoice processing, customer support chatbots, inventory prediction, and marketing automation — all in regional languages."},
            {"title": "AI Setu Fellowship", "desc": "A 6-month paid fellowship for graduates from Tier-2/3 cities to learn AI engineering and get placed in top tech companies."}
        ],
        "impactStats": [
            {"label": "Cities Reached", "value": "25+"},
            {"label": "Workshops Conducted", "value": "100+"},
            {"label": "Lives Impacted", "value": "50K+"},
            {"label": "AI Models Released", "value": "15+"}
        ],
        "techStack": ["Python", "FastAPI", "LangChain", "React Native", "PostgreSQL", "Hugging Face"],
        "partners": ["IIT Research Labs", "State Skill Missions", "Google for Startups", "NASSCOM"],
        "sort_order": 0,
        "status": "published"
    }
]

DEFAULT_CAREER_JOBS = [
    {
        "slug": "frontend",
        "title": "Senior Frontend Architect",
        "department": "Engineering",
        "type": "Full-time / Hybrid",
        "location": "Surat, Gujarat",
        "description": "We are seeking an expert developer capable of building cinematic frontend experiences. Experience with custom Canvas, GSAP, WebGL, and Lenis smooth scrolling is highly desired.",
        "requirements": ["4+ years of React development experience", "Extensive knowledge of DOM rendering performance", "Deep expertise in CSS transitions and canvas mechanics"],
        "steps": ["Resume & Portfolio Screening", "30-Min Technical Sync", "Culture Fit & Offer"],
        "status": "published"
    },
    {
        "slug": "ai-eng",
        "title": "Senior AI Systems Engineer",
        "department": "AI & Data",
        "type": "Full-time / Hybrid",
        "location": "Surat, Gujarat",
        "description": "You will orchestrate localized LLM middleware solutions, agent-to-agent architectures, vector search databases, and automated pipelines syncing CRMs with intelligence systems.",
        "requirements": ["3+ years in Python, FastAPI, and Docker", "Strong background in prompt engineering and embeddings", "Experience deploying scalable async applications"],
        "steps": ["Resume & Technical Briefing", "Sandbox Coding Test", "Architecture Discussion & Offer"],
        "status": "published"
    }
]

DEFAULT_CAREER_PERKS = [
    {"title": "Elite Hardware", "desc": "M3 Max MacBook Pro setups, dual 4K monitors, and custom layouts tailored to engineering speed.", "color": "emerald"},
    {"title": "Hybrid Autonomy", "desc": "Flexible hours and fluid work-from-home options to support creative focus and lifestyle flow.", "color": "blue"},
    {"title": "20% R&D Labs", "desc": "Dedicate every Friday afternoon exclusively to experimental tools, personal projects, or open source.", "color": "purple"}
]

DEFAULT_CAREER_TESTIMONIALS = [
    {"name": "Ravi Patel", "role": "Frontend Developer", "tenure": "2 years", "quote": "The engineering culture here is unmatched. Every day I get to push the boundaries of what's possible with web animations and performance.", "rating": 5, "color": "from-emerald-500/10 to-teal-500/5", "glowColor": "rgba(16,185,129,0.25)", "tag": "ENGINEERING", "tagClass": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", "starClass": "text-emerald-500"}
]

DEFAULT_CAREER_FAQS = [
    {"q": "What is the interview process like?", "a": "Our process typically involves 3 stages: an initial resume/portfolio screening, a technical or creative assessment, and a final culture-fit discussion with the founders. The entire process takes 5-7 business days."},
    {"q": "Is remote work allowed?", "a": "Yes! Several roles support full remote work. For hybrid roles, we follow a flexible 3-days-in-office model at our Surat headquarters."}
]

DEFAULT_CONTACT_OFFICES = [
    {
        "slug": "surat",
        "city": "Surat",
        "country": "INDIA",
        "role": "Headquarters",
        "address": "Silver Trade Center, 501 & 502, near Pragati IT Park, Mota Varachha, Surat, Gujarat 394101",
        "phone": "+91 98765 43210",
        "timeZone": "Asia/Kolkata",
        "isHQ": True,
        "color": "border-emerald-500/10 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
        "badge": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    }
]

DEFAULT_CONTACT_FAQS = [
    {"q": "How quickly do you respond to inquiries?", "a": "We aim to respond to every inquiry within 2-4 business hours during working days (Mon-Sat)."},
    {"q": "What is the minimum project budget?", "a": "Our projects typically start from ₹50,000 for basic websites."}
]

DEFAULT_SERVICES_SUBPAGES = [
    {
        "identifier": "service_web",
        "title": "Web Engineering",
        "description": "Crafting high-fidelity, cinematic, and fast-loading web applications using custom WebGL rendering, 120 FPS Framer Motion structures, and optimized server side rendering (SSR).",
        "tech_stack": {
            "react": {"name": "React.js", "role": "Frontend core framework that enables component reusability, quick routing, and reactive virtual DOM state updates.", "badge": "Interactive UI"},
            "nextjs": {"name": "Next.js", "role": "Server-side rendering (SSR), static site generation (SSG), and optimized image parameters for rapid load times.", "badge": "SEO & Speed"}
        }
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
    "identifier": "contact_page_settings",
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

DEFAULT_CAREER_SETTINGS = {
    "identifier": "career_page_settings",
    "title": "Build the Future",
    "subtitle": "We are always looking for exceptional engineers, designers, and strategists obsessed with visual, motion, and backend perfection.",
    "philosophy_eyebrow": "// Our Philosophy",
    "philosophy_title": "Why Join HariKrushn Digiverse?",
    "philosophy_desc": "We don't just build software — we engineer premium digital experiences that set industry benchmarks."
}

DEFAULT_VENTURES_SETTINGS = {
    "identifier": "ventures_page_settings",
    "overline": "// Our Initiatives",
    "title": "Digiverse Ventures",
    "subtitle": "Beyond client work, we build, incubate, and run initiatives that create lasting social and economic impact across India."
}

DEFAULT_CULTURE_SETTINGS = {
    "identifier": "culture_page_settings",
    "subtitle": "// Where Code Meets Art",
    "title": "Our Culture",
    "description": "At HariKrushn DigiVerse LLP, our culture is the foundation of innovation, collaboration, and impact. We don't just build digital solutions, we build trust and long-term relationships.",
    "gridSubtitle": "Life at HK DigiVerse",
    "gridTitle": "More Than Work. It's Our Way of Life.",
    "gridDescription": "At HK DigiVerse LLP, we believe that a strong culture builds a strong team. Here's what makes our workplace inspiring, engaging, and truly our own.",
    "widgetSubtitle": "// Interactive Widget",
    "widgetTitle": "Art & Logic Equilibrium",
    "widgetDescription": "We operate at the intersection of fine digital art and deep system logic. Adjust the slider below to observe how the structures sync.",
    "manifestoSubtitle": "// Manifesto Protocol",
    "manifestoTitle": "The Culture Code",
    "manifestoFilename": "hk_culture_protocol.json",
    "manifestoCode": '{\n  "organization": "HariKrushn DigiVerse LLP",\n  "ethos": "Bespoke Digital Craftsmanship",\n  "foundationalRule": "Zero generic templates, 100% custom architectures",\n  "executionStandards": {\n    "designFrameRate": 120,\n    "backendQuality": "TDD + Strict API health parameters",\n    "deliveryPipeline": "Automated CI/CD gates"\n  },\n  "communicationCode": [\n    "High trust, absolute ownership",\n    "Low meetings, maximum coding flow",\n    "Constructive, transparent feedback loops"\n  ]\n}'
}

DEFAULT_STRATEGIC_DIRECTIVES = [
  {
    "year": "2026",
    "month": "",
    "theme": "Cognitive Ecosystems",
    "subtitle": "INTELLIGENCE LAYER [V6.8]",
    "glowColor": "rgba(251, 191, 36, 0.15)",
    "badgeColor": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "vision": "Lead the global transition into edge-intelligence systems, autonomous visual frameworks, and secure multi-agent node coordination.",
    "mission": "Deliver responsive 3D spatial viewport components, real-time context management APIs, and local vector database caching mechanisms.",
    "kpis": [
      "Sub-100ms multi-agent loop responses",
      "Unified spatial viewport components",
      "Robust client-side encryption layers"
    ],
    "sort_order": 0
  },
  {
    "year": "2025",
    "month": "",
    "theme": "Decentralized Systems",
    "subtitle": "SPATIAL WEB CONTEXT [V5.0]",
    "glowColor": "rgba(16, 185, 129, 0.15)",
    "badgeColor": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "vision": "Pioneer immersive, decentralized application architectures that scale to millions of concurrent sessions globally.",
    "mission": "Construct real-time transaction graphs, secure peer-to-peer data transport channels, and performant state synchronization layers.",
    "kpis": [
      "Peer-to-peer transport synchronizations",
      "Zero-downtime ledger migration keys",
      "Adaptive viewport frame pacing scripts"
    ],
    "sort_order": 1
  },
  {
    "year": "2024",
    "month": "",
    "theme": "Strategic Blueprints",
    "subtitle": "SYSTEM ARCHITECTURES [V4.2]",
    "glowColor": "rgba(168, 85, 247, 0.15)",
    "badgeColor": "text-purple-400 bg-purple-500/10 border-purple-500/20",
    "vision": "Establish HariKrushn as a leading architect of high-concurrency cloud ecosystems, custom CRM software, and data management matrices for global enterprises.",
    "mission": "Deploy secure, multi-tenant databases and automated signing portals that reduce human administrative overhead by 80% and scale operational speeds.",
    "kpis": [
      "Zero-downtime migration protocols",
      "Unified client management databases",
      "High-throughput microservices mesh"
    ],
    "sort_order": 2
  }
]


def seed_database():
    load_dotenv(override=True)
    uri = os.getenv("MONGODB_URI")
    if not uri:
        print("MONGODB_URI not found in env!")
        return

    print("Connecting to MongoDB...")
    client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["hk_digiverse"]

    # Roles seed definition
    default_roles = [
        {
            "name": "super_admin",
            "description": "Full access to all modules, roles, logs, and backups.",
            "permissions": ["all"]
        },
        {
            "name": "admin",
            "description": "Manage content, media, files, and backups.",
            "permissions": ["content:read", "content:write", "content:publish", "media:upload", "media:delete", "submissions:read", "backups:manage", "logs:read"]
        },
        {
            "name": "editor",
            "description": "Edit and publish draft content.",
            "permissions": ["content:read", "content:write", "content:publish", "media:upload", "submissions:read"]
        },
        {
            "name": "content_manager",
            "description": "Create and edit draft content without publishing rights.",
            "permissions": ["content:read", "content:write", "media:upload", "submissions:read"]
        },
        {
            "name": "viewer",
            "description": "Read-only access to drafts, logs, and public pages.",
            "permissions": ["content:read"]
        }
    ]

    # Collection Seed Map
    seed_map = {
        "roles": (default_roles, "name"),
        "site_settings": ([DEFAULT_SITE_SETTINGS], "identifier"),
        "about_us": ([DEFAULT_ABOUT_US], "identifier"),
        "our_culture": (DEFAULT_CULTURE, "title"),
        "people": (DEFAULT_PEOPLE, "name"),
        "awards": (DEFAULT_AWARDS, "slug"),
        "blogs": (DEFAULT_BLOGS, "slug"),
        "portfolio": (DEFAULT_PORTFOLIO, "slug"),
        "ventures": (DEFAULT_VENTURES, "slug"),
        "career_jobs": (DEFAULT_CAREER_JOBS, "slug"),
        "career_perks": (DEFAULT_CAREER_PERKS, "title"),
        "career_testimonials": (DEFAULT_CAREER_TESTIMONIALS, "name"),
        "career_faqs": (DEFAULT_CAREER_FAQS, "q"),
        "contact_offices": (DEFAULT_CONTACT_OFFICES, "slug"),
        "contact_faqs": (DEFAULT_CONTACT_FAQS, "q"),
        "services_subpages": (DEFAULT_SERVICES_SUBPAGES, "identifier"),
        "industries": (DEFAULT_INDUSTRIES, "slug"),
        "industry_projects": (DEFAULT_INDUSTRY_PROJECTS, "title"),
        "contact_settings": ([DEFAULT_CONTACT_SETTINGS], "identifier"),
        "career_settings": ([DEFAULT_CAREER_SETTINGS], "identifier"),
        "ventures_settings": ([DEFAULT_VENTURES_SETTINGS], "identifier"),
        "culture_settings": ([DEFAULT_CULTURE_SETTINGS], "identifier"),
        "strategic_directives": (DEFAULT_STRATEGIC_DIRECTIVES, "theme")
    }

    for coll_name, (data_list, key) in seed_map.items():
        collection = db[coll_name]
        
        # Create unique index constraint
        try:
            collection.create_index([(key, pymongo.ASCENDING)], unique=True)
            print(f"[{coll_name}] Unique index created on field: '{key}'")
        except Exception as e:
            print(f"[{coll_name}] Failed to create index: {e}")

        # Seed data if empty
        if collection.count_documents({}) == 0:
            print(f"[{coll_name}] Seeding {len(data_list)} items...")
            try:
                collection.insert_many(data_list)
                print(f"[{coll_name}] Seeding completed successfully.")
            except Exception as e:
                print(f"[{coll_name}] Seeding failed: {e}")
        else:
            print(f"[{coll_name}] Collection already populated, skipping seeding.")

    # Seed default admin user
    users_collection = db["users"]
    try:
        users_collection.create_index([("username", pymongo.ASCENDING)], unique=True)
    except Exception:
        pass

    if users_collection.count_documents({"username": "admin"}) == 0:
        from app.core.security import hash_password
        import datetime
        try:
            users_collection.insert_one({
                "username": "admin",
                "hashed_password": hash_password("admin123"),
                "email": "admin@hkdigiverse.com",
                "role": "super_admin",
                "status": "active",
                "created_at": datetime.datetime.utcnow().isoformat(),
                "updated_at": datetime.datetime.utcnow().isoformat()
            })
            print("[Users] Seeded default super_admin 'admin' user.")
        except Exception as e:
            print(f"[Users] Seeding failed: {e}")

    # Seed default media explorer folder index
    media_collection = db["media_library"]
    try:
        media_collection.create_index([("file_url", pymongo.ASCENDING)], unique=True)
        media_collection.create_index([("folder_path", pymongo.ASCENDING)])
    except Exception:
        pass

    print("\nDatabase initialization and seeding completed successfully!")


if __name__ == "__main__":
    seed_database()
