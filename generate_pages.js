/* eslint-disable */
const fs = require('fs');
const path = require('path');

const urls = [
  "web-development-services", "website-development-company", "professional-web-developer",
  "custom-website-development", "business-website-development", "startup-website-development",
  "ecommerce-website-development", "corporate-website-design", "responsive-web-design",
  "fast-loading-websites", "mobile-optimized-websites", "modern-website-design",
  "ui-ux-web-design", "website-redesign-services", "landing-page-development",
  "high-converting-websites", "premium-website-agency", "affordable-web-development",
  "website-development-near-me", "website-design-company-india", "3d-website-development",
  "interactive-3d-websites", "immersive-web-design", "3d-animation-websites",
  "webgl-websites", "futuristic-website-design", "next-gen-websites",
  "2d-website-design", "simple-business-websites", "static-website-development",
  "dynamic-websites", "advanced-web-experiences", "creative-website-design",
  "animated-ui-websites", "modern-digital-experiences", "web-hosting-services",
  "fast-website-hosting", "secure-hosting-solutions", "domain-registration-services",
  "buy-domain-name", "cheap-domain-hosting", "premium-hosting-provider",
  "cloud-hosting-services", "vps-hosting-india", "website-security-hosting",
  "ssl-certificate-services", "domain-management-services", "business-email-hosting",
  "hosting-for-startups", "seo-services", "local-seo-services",
  "technical-seo-optimization", "on-page-seo", "off-page-seo",
  "google-ranking-services", "search-engine-optimization-company", "seo-agency-india",
  "website-traffic-increase", "organic-lead-generation", "keyword-research-services",
  "seo-audit-services", "google-my-business-optimization", "ranking-improvement-services",
  "seo-for-small-businesses", "conversion-rate-optimization", "increase-website-leads",
  "generate-more-sales-online", "high-converting-landing-pages", "website-for-lead-generation",
  "sales-funnel-optimization", "digital-growth-strategy", "online-business-growth",
  "improve-customer-conversion", "website-performance-optimization", "competitor-analysis-services",
  "competitor-website-analysis", "digital-competitor-research", "seo-competitor-analysis",
  "market-analysis-services", "lost-sales-analysis", "sales-funnel-analysis",
  "customer-drop-off-analysis", "website-analytics-services", "user-behavior-tracking",
  "heatmap-analysis-tools", "business-performance-analysis", "mobile-app-development",
  "android-app-development", "ios-app-development", "web-app-development",
  "business-app-development", "startup-app-development", "custom-app-solutions",
  "app-ui-ux-design", "scalable-app-development", "app-maintenance-services",
  "website-security-services", "cybersecurity-solutions", "secure-website-development",
  "ssl-security-implementation", "malware-protection-websites", "website-firewall-protection",
  "data-security-solutions", "secure-hosting-services", "website-vulnerability-testing",
  "business-security-systems", "digital-agency-services", "web-design-agency",
  "creative-digital-agency", "branding-agency", "startup-digital-solutions",
  "full-service-digital-agency", "premium-web-agency", "online-business-solutions",
  "digital-transformation-services", "tech-solutions-company", "hire-web-developer",
  "best-website-development-company", "website-development-cost", "build-business-website",
  "create-website-for-business", "website-developer-near-me", "seo-services-pricing",
  "buy-domain-and-hosting", "create-3d-website", "improve-website-sales"
];

function formatKeyword(slug) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Arrays of varied content to reach word count and maintain uniqueness
const intros = [
  "In today's hyper-competitive digital landscape, investing in top-tier KEYWORD is no longer just an option for businesses—it has become an absolute necessity.",
  "When you want to dominate your industry, starting with a robust approach to KEYWORD is the key difference between blending in and standing out.",
  "Your business deserves a digital identity that speaks volumes about your credibility, which is why optimizing your strategy around KEYWORD is a game changer.",
  "At Navya Tech Industry, we understand that mastering KEYWORD takes more than just basic effort. It requires a deep understanding of market dynamics."
];

const bodyTextBlocks = [
  "Navya Tech Industry has dedicated its vision to pioneering digital solutions, crafting approaches that resonate with modern consumer demands. By leveraging KEYWORD, companies can significantly optimize their operational outreach and user engagement metrics, translating initial interest into tangible, long-lasting loyalty and financial returns.",
  "Through rigorous analysis and innovative frameworks, our agency pushes the envelope of what is possible online. Integrating the principles of KEYWORD deeply into your business architecture not only streamlines customer acquisition but acts as a force multiplier for every other digital effort you undertake. We focus intensely on user experience, speed, and conversion strategy.",
  "The shift toward a completely digital-first strategy demands an unwavering commitment to scalability and security. Utilizing KEYWORD ensures that no matter how rapidly your enterprise scales, your technical foundation remains unshakable. Our team continuously researches global trends to ensure that you are always steps ahead of your competition.",
  "In a world where attention spans are plummeting, possessing a magnetic digital presence is crucial. Our highly specialized methodologies surrounding KEYWORD ensure that every touchpoint your brand has with its audience is optimized for engagement. From aesthetic brilliance to back-end stability, we cover every angle to propel your business forward.",
  "What separates a thriving enterprise from a struggling one often comes down to their digital leverage. Our focus on KEYWORD focuses on bridging that exact gap. It's about designing a frictionless journey for your users while capturing vital data to continuously refine and maximize the reach and impact of your campaigns."
];

const featuresList = [
  "Scalable Infrastructure to ensure your digital assets grow alongside your business.",
  "High-converting UX/UI strategies meticulously designed to turn visitors into paying customers.",
  "Robust Cybersecurity Protocols ensuring flawless data integrity and compliance.",
  "Advanced Search Engine Optimization embedded structurally into your online identity.",
  "Hyper-fast Performance Optimization reducing bounce rates to near zero.",
  "Cross-platform compatibility, functioning identically across web, mobile, and tablet paradigms."
];

function generateContent(keyword) {
  let content = '';

  // Generate around 800+ words by repeating and shuffling text blocks uniquely
  for(let i = 0; i < 15; i++) {
    const p1 = intros[Math.floor(Math.random() * intros.length)].replace(/KEYWORD/g, keyword);
    const p2 = bodyTextBlocks[Math.floor(Math.random() * bodyTextBlocks.length)].replace(/KEYWORD/g, keyword);
    const p3 = bodyTextBlocks[Math.floor(Math.random() * bodyTextBlocks.length)].replace(/KEYWORD/g, keyword);
    const p4 = bodyTextBlocks[Math.floor(Math.random() * bodyTextBlocks.length)].replace(/KEYWORD/g, keyword);
    const p5 = bodyTextBlocks[Math.floor(Math.random() * bodyTextBlocks.length)].replace(/KEYWORD/g, keyword);

    content += `<p class="mb-4 text-gray-300 leading-relaxed">${p1} ${p2} ${p3} ${p4} ${p5}</p>\n`;
    
    // Add subheadings naturally
    if (i === 3) content += `<h2 class="text-2xl md:text-3xl font-bold mt-8 mb-4 text-white">Why ${keyword} is Paramount</h2>\n`;
    if (i === 7) content += `<h2 class="text-2xl md:text-3xl font-bold mt-8 mb-4 text-white">Our Strategic Approach to ${keyword}</h2>\n`;
    if (i === 11) content += `<h3 class="text-xl md:text-2xl font-bold mt-8 mb-4 text-white">Measurable Results and Brand Growth</h3>\n`;
  }
  
  return content;
}

const template = (slug, keyword, content, internalLinks) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${keyword} - Navya Tech Industry</title>
    <meta name="description" content="Discover premium ${keyword} with Navya Tech Industry. Grow your business and dominate your industry with our high-converting web solutions." />
    
    <!-- Favicon Links -->
    <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon/favicon-32x32.png" type="image/png" />
    <link rel="icon" href="/favicon/favicon-16x16.png" type="image/png" />
    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />

    <!-- Tailwind CSS for Modern Premium Design -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
          --bg-color: #0A0A0F;
          --primary: #6C63FF;
          --secondary: #00E5FF;
          --text-main: #FFFFFF;
          --gradient-aurora: linear-gradient(125deg, #2a0f52 0%, #5227ff 18%, #7c3aed 34%, #b19eef 48%, #e879f9 64%, #ff9ffc 78%, #13f8fb 100%);
        }
        body { background-color: #050505; color: #ffffff; font-family: 'Inter', sans-serif; }
        .gradient-text { background: linear-gradient(90deg, #9f7aea, #4fd1c5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .premium-bg { background-image: radial-gradient(circle at top right, rgba(89, 6, 178, 0.15), transparent 40%); background-color: #050505; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
        .flex-center { display: flex; justify-content: center; align-items: center; }
        .primary-btn { background: linear-gradient(135deg, var(--primary), #8B85FF); color: white; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3); }
        .primary-btn:hover { transform: scale(1.05); box-shadow: 0 6px 25px rgba(108, 99, 255, 0.5); }
        .btn-gradient-border { background-color: #000000 !important; background-image: linear-gradient(#000000, #000000), var(--gradient-aurora) !important; background-origin: border-box; background-clip: padding-box, border-box; border: 2px solid transparent !important; color: #ffffff; box-shadow: none; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .primary-btn.btn-gradient-border:hover { box-shadow: 0 0 24px rgba(82, 39, 255, 0.28), 0 0 18px rgba(19, 248, 251, 0.18); }
        .secondary-btn { background: transparent; color: var(--text-main); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .secondary-btn:hover { border-color: var(--text-main); background: rgba(255, 255, 255, 0.05); }
    </style>
</head>
<body class="premium-bg">

    <!-- HERO SECTION -->
    <header class="relative overflow-hidden py-16 sm:py-24 md:py-32 flex items-center justify-center min-h-[60vh] border-b border-gray-800">
        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Elevate Your Brand with <br /><span class="gradient-text">${keyword}</span></h1>
            <p class="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">We engineer digital mastery. Leverage our premium solutions to achieve explosive business growth, skyrocket conversions, and leave your competitors in the dust.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <a href="tel:+919355412903" class="w-full sm:w-auto" style="text-decoration: none;">
                  <button class="primary-btn flex-center btn-gradient-border w-full" style="gap: 0.5rem; padding: 1rem 2.5rem; font-size: 1.1rem;">
                    Book Call
                  </button>
                </a>
                <a href="https://wa.me/919355412903?text=Hi%2C%20I%20visited%20your%20website%20and%20I%E2%80%99m%20interested%20in%20your%20services.%20I%E2%80%99m%20looking%20to%20build%20a%20website%20and%20would%20like%20to%20know%20more%20about%20pricing%20and%20process." target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto" style="text-decoration: none;">
                  <button class="secondary-btn flex-center w-full" style="gap: 0.5rem; padding: 1rem 2.5rem; font-size: 1.1rem; border-color: #25D366; color: #25D366;">
                    WhatsApp Us
                  </button>
                </a>
            </div>
        </div>
    </header>

    <!-- CONTENT SECTION -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        <!-- Trust Section -->
        <div class="mb-12 md:mb-16 p-6 md:p-8 glass-panel rounded-2xl text-center shadow-lg border border-purple-500/20">
            <h3 class="text-xl md:text-2xl font-semibold mb-3">Trusted by Innovators</h3>
            <p class="text-base md:text-lg text-gray-300 font-medium">✨ Navya Tech Industry is a Government of India-backed company. We adhere to the highest standards of digital excellence and data security.</p>
        </div>

        <article class="prose prose-invert lg:prose-xl w-full max-w-none">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white">What is ${keyword}?</h2>
            ${content}
        </article>
        
        <!-- Internal Linking -->
        <div class="mt-16 md:mt-20 border-t border-gray-800 pt-10 md:pt-12">
            <h3 class="text-xl md:text-2xl font-bold mb-6">Explore More Expertise</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                ${internalLinks.map(link => `
                    <a href="/seofolders/${link.slug}.html" class="glass-panel p-6 rounded-xl hover:bg-gray-800 transition block text-center">
                        <span class="block text-purple-400 font-semibold mb-2">${link.keyword}</span>
                        <span class="text-sm text-gray-400">Discover more about our solutions in this sector &rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>
    </main>


    <!-- FOOTER -->
    <footer class="py-8 bg-black border-t border-gray-900 text-center text-sm text-gray-500">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Navya Tech Industry, All rights reserved</p>
            <div class="flex flex-wrap gap-4 md:gap-6 justify-center">
                <a href="#" class="hover:text-white transition">Terms & Conditions</a>
                <a href="#" class="hover:text-white transition">Privacy Policy</a>
            </div>
        </div>
    </footer>

</body>
</html>
`;

urls.forEach(slug => {
    const keyword = formatKeyword(slug);
    const content = generateContent(keyword);
    
    // Pick 3 random internal links
    const internalLinks = [];
    while (internalLinks.length < 3) {
        const randomSlug = urls[Math.floor(Math.random() * urls.length)];
        if (randomSlug !== slug && !internalLinks.find(link => link.slug === randomSlug)) {
            internalLinks.push({ slug: randomSlug, keyword: formatKeyword(randomSlug) });
        }
    }

    const htmlString = template(slug, keyword, content, internalLinks);
    
    // Write
    fs.writeFileSync(path.join(__dirname, 'seofolders', `${slug}.html`), htmlString);
    console.log(`Generated ${slug}.html`);
});
