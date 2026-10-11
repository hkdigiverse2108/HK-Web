import asyncio
from pymongo import MongoClient
import os

client = MongoClient("mongodb+srv://princehkdigiverse_db_user:root123@cluster0.cwptqdg.mongodb.net/?appName=Cluster0")
db = None
for db_name in client.list_database_names():
    if "site_settings" in client[db_name].list_collection_names():
        db = client[db_name]
        break

if db is not None:
    coll = db["site_settings"]
    settings = coll.find_one({"identifier": "global_settings"})

    if settings:
        navbar_links = [
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
            {
                "label": "Services",
                "href": "/services",
                "show": True,
                "megaMenu": [
                    {
                        "category": "Software Development",
                        "items": [
                            { "label": "Web Development", "href": "/services/web-development" },
                            { "label": "Web Application Dev", "href": "/services/web-application-development" },
                            { "label": "Mobile App Dev", "href": "/services/mobile-app-development" },
                            { "label": "Custom Software Dev", "href": "/services/custom-software-development" },
                            { "label": "SaaS Development", "href": "/services/saas-development" },
                            { "label": "ERP Development", "href": "/services/erp-development" },
                            { "label": "CRM Development", "href": "/services/crm-development" },
                            { "label": "API Development", "href": "/services/api-development" },
                            { "label": "Ecommerce Dev", "href": "/services/ecommerce-web-development" }
                        ]
                    },
                    {
                        "category": "Digital Marketing",
                        "items": [
                            { "label": "SEO", "href": "/services/seo" },
                            { "label": "Local SEO", "href": "/services/local-seo" },
                            { "label": "Technical SEO", "href": "/services/technical-seo" },
                            { "label": "AI SEO", "href": "/services/ai-seo" },
                            { "label": "Generative Engine Opt (GEO)", "href": "/services/generative-engine-optimization" },
                            { "label": "Google Ads / PPC", "href": "/services/google-ads-ppc" },
                            { "label": "Meta Ads", "href": "/services/meta-ads" },
                            { "label": "Social Media Marketing", "href": "/services/social-media-marketing" },
                            { "label": "Content Marketing", "href": "/services/content-marketing" },
                            { "label": "Lead Generation", "href": "/services/lead-generation" },
                            { "label": "Marketing Automation", "href": "/services/marketing-automation" }
                        ]
                    },
                    {
                        "category": "AI & Automation",
                        "items": [
                            { "label": "AI Consulting", "href": "/services/ai-consulting" },
                            { "label": "AI Strategy", "href": "/services/ai-strategy" },
                            { "label": "Generative AI Solutions", "href": "/services/generative-ai-solutions" },
                            { "label": "AI Integration", "href": "/services/ai-integration" },
                            { "label": "AI Agent Development", "href": "/services/ai-agent-development" },
                            { "label": "LLM Development", "href": "/services/llm-development" },
                            { "label": "AI Chatbot Development", "href": "/services/ai-chatbot-development" },
                            { "label": "Business Automation", "href": "/services/business-automation" }
                        ]
                    },
                    {
                        "category": "Design & Branding",
                        "items": [
                            { "label": "Branding", "href": "/services/branding" },
                            { "label": "Logo Design", "href": "/services/logo-design" },
                            { "label": "Graphic Design", "href": "/services/graphic-design" },
                            { "label": "UI/UX Design", "href": "/services/ui-ux-design" },
                            { "label": "Product Design", "href": "/services/product-design" },
                            { "label": "Website Design", "href": "/services/website-design" }
                        ]
                    },
                    {
                        "category": "Consulting",
                        "items": [
                            { "label": "IT Consulting", "href": "/services/it-consulting" },
                            { "label": "Software Consulting", "href": "/services/software-consulting" },
                            { "label": "Technology Consulting", "href": "/services/technology-consulting" },
                            { "label": "Digital Transformation Consulting", "href": "/services/digital-transformation-consulting" }
                        ]
                    },
                    {
                        "category": "Startup Solutions",
                        "items": [
                            { "label": "Startup Consulting", "href": "/services/startup-consulting" },
                            { "label": "MVP Development", "href": "/services/mvp-development" },
                            { "label": "Startup Branding", "href": "/services/startup-branding" },
                            { "label": "Product Strategy", "href": "/services/product-strategy" },
                            { "label": "Startup Technology Solutions", "href": "/services/startup-technology-solutions" },
                            { "label": "Startup Digital Growth", "href": "/services/startup-digital-growth" }
                        ]
                    }
                ]
            },
            {
                "label": "Industry",
                "href": "#industry",
                "show": True,
                "megaMenu": [
                    {
                        "category": "Core Sectors",
                        "items": [
                            { "label": "Manufacturing & Heavy Industries", "href": "#" },
                            { "label": "Real Estate & Properties", "href": "#" },
                            { "label": "Construction & Infrastructure", "href": "#" }
                        ]
                    },
                    {
                        "category": "Consumer & Retail",
                        "items": [
                            { "label": "Hotels & Luxury Resorts", "href": "#" },
                            { "label": "Restaurants & Cafes", "href": "#" },
                            { "label": "Retail & Supermarkets", "href": "#" }
                        ]
                    },
                    {
                        "category": "Specialized",
                        "items": [
                            { "label": "Pharma & Life Sciences", "href": "#" },
                            { "label": "Finance & CA Firms", "href": "#" },
                            { "label": "Education & Institutes", "href": "#" }
                        ]
                    }
                ]
            },
            {
                "label": "Career",
                "href": "#career",
                "show": True,
                "dropdown": [
                    { "label": "Open Roles", "href": "#career-jobs", "show": True },
                    { "label": "Life at HK", "href": "#our-culture", "show": True },
                    { "label": "Internships", "href": "#career-internships", "show": True }
                ]
            },
            { "label": "Case Study", "href": "#case-study", "show": True },
            { "label": "Portfolio", "href": "#portfolio", "show": True },
            { "label": "Ventures", "href": "#ventures", "show": True },
            { "label": "Contact", "href": "#contact", "show": True },
            { "label": "Franchise", "href": "/franchise", "show": True }
        ]
        
        coll.update_one({"identifier": "global_settings"}, {"$set": {"navbar_links": navbar_links}})
        print("Updated navbar_links with all actual services")
    else:
        print("Settings not found")
else:
    print("DB not found")
