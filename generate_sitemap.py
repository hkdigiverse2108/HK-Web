import os

pages = [
    ('/', 1.0, 'daily'),
    ('/services', 0.9, 'weekly'),
    ('/portfolio', 0.9, 'weekly'),
    ('/case-study', 0.9, 'weekly'),
    ('/our-clients', 0.9, 'weekly'),
    ('/about-us', 0.9, 'monthly'),
    ('/our-story', 0.8, 'monthly'),
    ('/our-people', 0.9, 'weekly'),
    ('/our-culture', 0.8, 'monthly'),
    ('/career', 0.8, 'weekly'),
    ('/contact', 0.9, 'monthly'),
    ('/blogs', 0.8, 'daily'),
    ('/blog', 0.8, 'daily'),
    ('/industry', 0.8, 'monthly'),
    ('/our-gallery', 0.7, 'monthly'),
    ('/awards-achievements', 0.7, 'monthly'),
    ('/ventures', 0.7, 'monthly'),
    # Main Services
    ('/services/software-development', 0.9, 'weekly'),
    ('/services/digital-marketing', 0.9, 'weekly'),
    ('/services/ai-automation', 0.9, 'weekly'),
    ('/services/design-and-branding', 0.9, 'weekly'),
    ('/services/consulting', 0.9, 'weekly'),
    ('/services/startup-solutions', 0.9, 'weekly'),
    # Software Subservices
    ('/services/web-development', 0.8, 'weekly'),
    ('/services/web-application-development', 0.8, 'weekly'),
    ('/services/mobile-app-development', 0.8, 'weekly'),
    ('/services/custom-software-development', 0.8, 'weekly'),
    ('/services/saas-development', 0.8, 'weekly'),
    ('/services/erp-development', 0.8, 'weekly'),
    ('/services/crm-development', 0.8, 'weekly'),
    ('/services/api-development', 0.8, 'weekly'),
    ('/services/ecommerce-web-development', 0.8, 'weekly'),
    # Digital Marketing Subservices
    ('/services/seo', 0.8, 'weekly'),
    ('/services/local-seo', 0.8, 'weekly'),
    ('/services/technical-seo', 0.8, 'weekly'),
    ('/services/ai-seo', 0.8, 'weekly'),
    ('/services/generative-engine-optimization', 0.8, 'weekly'),
    ('/services/google-ads-ppc', 0.8, 'weekly'),
    ('/services/meta-ads', 0.8, 'weekly'),
    ('/services/social-media-marketing', 0.8, 'weekly'),
    ('/services/content-marketing', 0.8, 'weekly'),
    ('/services/lead-generation', 0.8, 'weekly'),
    ('/services/marketing-automation', 0.8, 'weekly'),
    # AI Subservices
    ('/services/ai-consulting', 0.8, 'weekly'),
    ('/services/ai-strategy', 0.8, 'weekly'),
    ('/services/generative-ai-solutions', 0.8, 'weekly'),
    ('/services/ai-integration', 0.8, 'weekly'),
    ('/services/ai-agent-development', 0.8, 'weekly'),
    ('/services/llm-development', 0.8, 'weekly'),
    ('/services/ai-chatbot-development', 0.8, 'weekly'),
    ('/services/business-automation', 0.8, 'weekly'),
    # Design Subservices
    ('/services/branding', 0.8, 'weekly'),
    ('/services/logo-design', 0.8, 'weekly'),
    ('/services/graphic-design', 0.8, 'weekly'),
    ('/services/ui-ux-design', 0.8, 'weekly'),
    ('/services/product-design', 0.8, 'weekly'),
    ('/services/website-design', 0.8, 'weekly'),
    # Consulting Subservices
    ('/services/it-consulting', 0.8, 'weekly'),
    ('/services/software-consulting', 0.8, 'weekly'),
    ('/services/technology-consulting', 0.8, 'weekly'),
    ('/services/digital-transformation-consulting', 0.8, 'weekly'),
    # Startup Subservices
    ('/services/startup-consulting', 0.8, 'weekly'),
    ('/services/mvp-development', 0.8, 'weekly'),
    ('/services/startup-branding', 0.8, 'weekly'),
    ('/services/product-strategy', 0.8, 'weekly'),
    ('/services/startup-technology-solutions', 0.8, 'weekly'),
    ('/services/startup-digital-growth', 0.8, 'weekly'),
    # Portfolio Subpages
    ('/portfolio/digital-transformation', 0.85, 'weekly'),
    ('/portfolio/ai-work', 0.85, 'weekly'),
    ('/portfolio/industrial-ecommerce-solutions', 0.85, 'weekly'),
    ('/portfolio/international-work', 0.85, 'weekly'),
    ('/portfolio/ecommerce-work', 0.85, 'weekly'),
    ('/portfolio/iot-work', 0.85, 'weekly'),
    ('/portfolio/supply-chain-management', 0.85, 'weekly'),
    ('/portfolio/social-communities', 0.85, 'weekly'),
    ('/portfolio/mobile-solutions', 0.85, 'weekly'),
    ('/portfolio/devops-cloud-security', 0.85, 'weekly'),
    ('/portfolio/automobile-solutions', 0.85, 'weekly'),
    ('/portfolio/digital', 0.85, 'weekly'),
    ('/portfolio/apparel-ecommerce', 0.85, 'weekly'),
    ('/portfolio/fmcg-ecommerce', 0.85, 'weekly'),
    ('/portfolio/ux-ui-work', 0.85, 'weekly'),
    ('/portfolio/healthcare-solutions', 0.85, 'weekly'),
    ('/portfolio/media-entertainment-solutions', 0.85, 'weekly'),
]

domain = 'https://harikrushndigiverse.com'
lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for path, prio, freq in pages:
    lines.append('  <url>')
    lines.append(f'    <loc>{domain}{path}</loc>')
    lines.append('    <lastmod>2026-10-11</lastmod>')
    lines.append(f'    <changefreq>{freq}</changefreq>')
    lines.append(f'    <priority>{prio}</priority>')
    lines.append('  </url>')

lines.append('</urlset>')
xml_content = '\n'.join(lines) + '\n'

with open('frontend/public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml_content)

print(f'Successfully generated sitemap.xml with {len(pages)} URLs!')
