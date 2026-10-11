from pymongo import MongoClient

client = MongoClient('mongodb+srv://princehkdigiverse_db_user:root123@cluster0.cwptqdg.mongodb.net/?appName=Cluster0')
db = [client[d] for d in client.list_database_names() if 'site_settings' in client[d].list_collection_names()][0]

new_services = [
    {
        'num': '01/06',
        'title': 'Software Development',
        'desc': 'Architecting high-performance enterprise platforms, custom SaaS dashboards, scalable cloud microservices, and mobile applications.',
        'description': 'Architecting high-performance enterprise platforms, custom SaaS dashboards, scalable cloud microservices, and mobile applications.',
        'tags': ['ENTERPRISE', 'WEB & MOBILE'],
        'href': '/services/software-development',
        'img': '/media/images/gallery/digiverse_workspace.png',
        'gradient': 'from-blue-500 via-indigo-500 to-cyan-500'
    },
    {
        'num': '02/06',
        'title': 'Digital Marketing',
        'desc': 'Data-driven SEO, Google Ads / PPC, Meta ads, generative engine optimization (GEO), and high-ROI performance marketing campaigns.',
        'description': 'Data-driven SEO, Google Ads / PPC, Meta ads, generative engine optimization (GEO), and high-ROI performance marketing campaigns.',
        'tags': ['SEO', 'GROWTH & ADS'],
        'href': '/services/digital-marketing',
        'img': '/media/images/gallery/launch_celebration.png',
        'gradient': 'from-rose-500 via-pink-500 to-purple-500'
    },
    {
        'num': '03/06',
        'title': 'AI & Automation',
        'desc': 'Developing autonomous AI agents, enterprise LLM pipelines, intelligent chatbots, and end-to-end robotic process automations.',
        'description': 'Developing autonomous AI agents, enterprise LLM pipelines, intelligent chatbots, and end-to-end robotic process automations.',
        'tags': ['AI AGENTS', 'AUTOMATION'],
        'href': '/services/ai-automation',
        'img': '/media/images/gallery/ai_orchestrator.png',
        'gradient': 'from-purple-500 via-violet-500 to-indigo-500'
    },
    {
        'num': '04/06',
        'title': 'Design & Branding',
        'desc': 'Creating visually stunning design systems, immersive UI/UX experiences, distinctive logos, and iconic brand identities that convert.',
        'description': 'Creating visually stunning design systems, immersive UI/UX experiences, distinctive logos, and iconic brand identities that convert.',
        'tags': ['UI/UX', 'BRANDING'],
        'href': '/services/design-and-branding',
        'img': '/media/images/gallery/design_sprint.png',
        'gradient': 'from-pink-500 via-rose-500 to-amber-500'
    },
    {
        'num': '05/06',
        'title': 'Consulting',
        'desc': 'Strategic technology advisory, enterprise software audits, cloud migration roadmaps, and digital transformation consulting.',
        'description': 'Strategic technology advisory, enterprise software audits, cloud migration roadmaps, and digital transformation consulting.',
        'tags': ['IT STRATEGY', 'CLOUD ADVISORY'],
        'href': '/services/consulting',
        'img': '/media/images/quantum_banking.png',
        'gradient': 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
        'num': '06/06',
        'title': 'Startup Solutions',
        'desc': 'Accelerating startup lifecycles with rapid MVP engineering, scalable architecture foundations, tech advisory, and digital growth playbooks.',
        'description': 'Accelerating startup lifecycles with rapid MVP engineering, scalable architecture foundations, tech advisory, and digital growth playbooks.',
        'tags': ['MVP', 'STARTUP GROWTH'],
        'href': '/services/startup-solutions',
        'img': '/media/images/gallery/cinematic_review.png',
        'gradient': 'from-amber-500 via-orange-500 to-yellow-500'
    }
]

res = db['site_content'].update_many(
    {'identifier': {'$in': ['website_content_published', 'website_content_draft', 'website_content']}},
    {'$set': {'services': new_services}}
)
print('site_content updated documents count:', res.modified_count)

res2 = db['site_settings'].update_many(
    {'identifier': 'global_settings'},
    {'$set': {'services': new_services}}
)
print('site_settings updated:', res2.modified_count)

print('SUCCESSFULLY APPLIED 6 CORE PILLARS TO ALL DATABASE DOCUMENTS')
