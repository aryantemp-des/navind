export interface AssistantPageItem {
  id: string;
  title: string;
  route: string;
  description: string;
  category: "commercial" | "services" | "industries" | "pricing" | "conversion" | "resources" | "blog" | "geo";
  categoryLabel: string;
  keywords: string[];
  intentPhrases: string[];
  relatedRoutes: string[];
  conversionPriority?: boolean;
}

export const ASSISTANT_PAGE_REGISTRY: AssistantPageItem[] = [
  // --- CORE COMMERCIAL SEO ---
  {
    id: "build-website",
    title: "Build Website",
    route: "/build-website",
    description: "Full-stack modern website engineering with Next.js, React, TypeScript, and high-performance WebGL.",
    category: "commercial",
    categoryLabel: "WEB ENGINEERING",
    keywords: ["build", "builder", "build website", "build a website", "make website", "create site", "coding website", "develop web"],
    intentPhrases: ["build a website", "build website", "website builder", "i need a website", "i want a website", "can you make me a website"],
    relatedRoutes: ["/services/website-development", "/pricing/business-website", "/get-started"],
  },
  {
    id: "create-website",
    title: "Create Website",
    route: "/create-website",
    description: "Custom brand web creation engineered for engagement, user retention, and market authority.",
    category: "commercial",
    categoryLabel: "BRAND CREATION",
    keywords: ["create", "make", "create website", "create a website", "make a website", "website creation", "new website"],
    intentPhrases: ["create a website", "create website", "make a website", "website creation", "need a new site"],
    relatedRoutes: ["/build-website", "/website-design", "/get-started"],
  },
  {
    id: "website-building",
    title: "Website Building Process",
    route: "/website-building",
    description: "End-to-end building methodology from architecture and wireframing to production deployment.",
    category: "commercial",
    categoryLabel: "ENGINEERING PROCESS",
    keywords: ["building", "methodology", "architecture", "lifecycle", "development process", "workflow"],
    intentPhrases: ["website building", "website building process", "how do you build websites", "how long to build"],
    relatedRoutes: ["/services/website-development", "/custom-website", "/get-started"],
  },
  {
    id: "buy-website",
    title: "Buy Turnkey Website",
    route: "/buy-website",
    description: "Turnkey $1,000 package with lifetime access, complete source code, and zero vendor lock-in.",
    category: "commercial",
    categoryLabel: "TURNKEY PACKAGE",
    keywords: ["buy", "purchase", "turnkey", "ready", "source code", "lifetime ownership", "buy website"],
    intentPhrases: ["buy a website", "i want to buy a website", "website for sale", "ready website", "purchase site"],
    relatedRoutes: ["/pricing", "/pricing/business-website", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "3d-website",
    title: "3D Interactive Website",
    route: "/3d-website",
    description: "Immersive WebGL, Three.js, and GLSL shader experiences delivering 60fps tactile 3D interactions.",
    category: "commercial",
    categoryLabel: "IMMERSIVE 3D",
    keywords: ["3d", "webgl", "threejs", "shaders", "interactive 3d", "spline", "immersive", "3d animation"],
    intentPhrases: ["3d website", "3d web design", "immersive website", "interactive 3d website", "three js", "webgl website"],
    relatedRoutes: ["/services/3d-website-development", "/pricing/3d-website", "/get-started"],
  },
  {
    id: "website-development",
    title: "Website Development",
    route: "/website-development",
    description: "Enterprise full-stack architecture, clean codebases, and scalable microservices.",
    category: "commercial",
    categoryLabel: "FULL-STACK DEV",
    keywords: ["development", "dev", "fullstack", "frontend", "backend", "code", "nextjs", "react"],
    intentPhrases: ["website development", "web development", "develop a website", "developer", "engineering"],
    relatedRoutes: ["/services/website-development", "/custom-website", "/get-started"],
  },
  {
    id: "website-design",
    title: "Website UI/UX Design",
    route: "/website-design",
    description: "Claymorphic tactile lighting, custom typography systems, and human-centered design tokens.",
    category: "commercial",
    categoryLabel: "UI/UX DESIGN",
    keywords: ["design", "ui", "ux", "interface", "figma", "visual", "claymorphic", "aesthetic", "branding"],
    intentPhrases: ["website design", "web design", "ui ux website", "website ui", "designer"],
    relatedRoutes: ["/services/website-design", "/custom-website", "/get-started"],
  },
  {
    id: "custom-website",
    title: "Custom Website Engineering",
    route: "/custom-website",
    description: "Bespoke engineering tailored to your operational workflows vs generic website builder templates.",
    category: "commercial",
    categoryLabel: "CUSTOM CODE",
    keywords: ["custom", "bespoke", "from scratch", "tailored", "no template", "custom site"],
    intentPhrases: ["custom website", "custom web development", "website from scratch", "bespoke website"],
    relatedRoutes: ["/services/custom-web-development", "/services/web-app-development", "/get-started"],
  },
  {
    id: "business-website",
    title: "Business Website Platform",
    route: "/business-website",
    description: "High-converting corporate presence with automated lead qualification and CRM synchronization.",
    category: "commercial",
    categoryLabel: "CORPORATE PRESENCE",
    keywords: ["business", "company", "corporate", "commercial", "enterprise", "organization", "b2b"],
    intentPhrases: ["business website", "website for my business", "company website", "corporate site"],
    relatedRoutes: ["/services/business-website-development", "/pricing/business-website", "/get-started"],
  },
  {
    id: "professional-website",
    title: "Professional Website",
    route: "/professional-website",
    description: "High-trust architecture engineered for legal practices, advisory firms, and medical clinics.",
    category: "commercial",
    categoryLabel: "HIGH TRUST",
    keywords: ["professional", "high trust", "firm", "advisory", "practice", "reputation", "expert"],
    intentPhrases: ["professional website", "premium website", "professional business website", "executive website"],
    relatedRoutes: ["/industries/professional-services", "/industries/consulting", "/get-started"],
  },

  // --- SERVICES ECOSYSTEM ---
  {
    id: "services-index",
    title: "Services Ecosystem Overview",
    route: "/services",
    description: "Complete digital engineering catalog: Web development, 3D systems, AI automation, and SEO.",
    category: "services",
    categoryLabel: "SERVICE CATALOG",
    keywords: ["services", "all services", "service list", "capabilities", "what you do", "solutions"],
    intentPhrases: ["services", "explore services", "all services", "view services", "what services do you offer"],
    relatedRoutes: ["/services/website-development", "/services/web-app-development", "/pricing"],
  },
  {
    id: "services-web-dev",
    title: "Website Development Services",
    route: "/services/website-development",
    description: "Next.js 15, React 19, TypeScript, and edge runtime full-stack web platforms.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["web dev service", "nextjs development", "react development", "full stack service"],
    intentPhrases: ["website development service", "web dev services", "hire web developer", "nextjs developer"],
    relatedRoutes: ["/services/website-design", "/services/custom-web-development", "/pricing"],
  },
  {
    id: "services-web-design",
    title: "Website Design Services",
    route: "/services/website-design",
    description: "Comprehensive UI/UX design systems, component libraries, and interactive prototypes.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["web design service", "ui design", "ux audit", "figma design", "prototyping"],
    intentPhrases: ["website design services", "hire ui designer", "redesign my ui", "figma designer"],
    relatedRoutes: ["/website-design", "/services/website-redesign", "/get-started"],
  },
  {
    id: "services-3d-dev",
    title: "3D Website Development Services",
    route: "/services/3d-website-development",
    description: "Interactive WebGL, Three.js shaders, and Spline 3D scenes running at silky 60fps.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["3d services", "three js services", "webgl developer", "spline 3d service"],
    intentPhrases: ["3d website development services", "webgl development", "interactive 3d services"],
    relatedRoutes: ["/3d-website", "/pricing/3d-website", "/get-started"],
  },
  {
    id: "services-custom-dev",
    title: "Custom Web Development Services",
    route: "/services/custom-web-development",
    description: "Bespoke business logic, complex data models, API integrations, and customized workflows.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["custom dev service", "bespoke web logic", "api integration", "database sync"],
    intentPhrases: ["custom development service", "custom web engineering", "complex web logic"],
    relatedRoutes: ["/custom-website", "/services/web-app-development", "/request-a-quote"],
  },
  {
    id: "services-business-dev",
    title: "Business Website Development",
    route: "/services/business-website-development",
    description: "High-conversion corporate websites engineered to generate inbound leads and client trust.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["business dev service", "corporate website dev", "lead gen site", "b2b web service"],
    intentPhrases: ["business website development service", "corporate web development", "b2b website dev"],
    relatedRoutes: ["/business-website", "/pricing/business-website", "/get-started"],
  },
  {
    id: "services-landing-page",
    title: "Landing Page Development",
    route: "/services/landing-page-development",
    description: "Ultra-fast campaign landing pages optimized for Google Ads, Meta Ads, and maximum ROAS.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["landing page", "funnel", "squeeze page", "ppc landing page", "conversion page", "campaign site"],
    intentPhrases: ["landing page", "landing page development", "need a landing page", "sales funnel page", "ad landing page"],
    relatedRoutes: ["/services/website-performance-optimization", "/get-started", "/pricing"],
  },
  {
    id: "services-ecommerce-dev",
    title: "Ecommerce Website Development",
    route: "/services/ecommerce-website-development",
    description: "High-speed D2C storefronts with 0% platform commissions, Stripe/Razorpay, and inventory sync.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["ecommerce", "online store", "shop", "cart", "checkout", "storefront", "products", "d2c"],
    intentPhrases: ["ecommerce", "online store", "ecommerce website", "sell products online", "shopify alternative", "online shopping site"],
    relatedRoutes: ["/industries/ecommerce", "/pricing/ecommerce", "/get-started"],
  },
  {
    id: "services-web-app",
    title: "Web App & AI Development",
    route: "/services/web-app-development",
    description: "Interactive single-page apps, SaaS client portals, autonomous agent dashboards, and PWAs.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["web app", "application", "portal", "dashboard", "pwa", "saas app", "ai agent app"],
    intentPhrases: ["web application", "web app", "build a web app", "client portal", "saas dashboard", "ai dashboard"],
    relatedRoutes: ["/industries/saas", "/services/custom-web-development", "/get-started"],
  },
  {
    id: "services-redesign",
    title: "Website Redesign Services",
    route: "/services/website-redesign",
    description: "Modernize legacy websites with claymorphic dark aesthetic while preserving 100% SEO rankings.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["redesign", "revamp", "modernize", "old site", "refresh", "upgrade website", "makeover"],
    intentPhrases: ["redesign my website", "old website", "website redesign", "modernize my website", "website makeover"],
    relatedRoutes: ["/services/website-design", "/services/website-performance-optimization", "/get-started"],
  },
  {
    id: "services-maintenance",
    title: "Website Maintenance & Support",
    route: "/services/website-maintenance",
    description: "On-demand $50/request updates, security patching, uptime monitoring, and SLA guarantees.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["maintenance", "support", "updates", "fixes", "50 dollar", "bug fix", "care plan", "retainer"],
    intentPhrases: ["website maintenance", "website updates", "website support", "fix website bug", "help with website"],
    relatedRoutes: ["/pricing", "/contact", "/get-started"],
  },
  {
    id: "services-performance",
    title: "Performance & Speed Optimization",
    route: "/services/website-performance-optimization",
    description: "Core Web Vitals tuning, LCP/INP/CLS speed optimization, and sub-second page loads.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["performance", "speed", "slow", "fast", "core web vitals", "lcp", "inp", "lighthouse", "optimize speed", "slow website", "website is slow"],
    intentPhrases: ["my website is slow", "website is slow", "slow website", "website speed", "core web vitals", "performance optimization", "speed up my website", "speed up site", "improve website speed"],
    relatedRoutes: ["/services/seo", "/services/website-redesign", "/get-started"],
  },
  {
    id: "services-seo",
    title: "Technical SEO Services",
    route: "/services/seo",
    description: "JSON-LD structured schema, programmatic metadata, semantic HTML5, and Google search dominance.",
    category: "services",
    categoryLabel: "SERVICE",
    keywords: ["seo", "google ranking", "search engine", "organic traffic", "schema", "sitemap", "keywords"],
    intentPhrases: ["seo", "search engine optimization", "google ranking", "website seo", "rank on google", "improve seo"],
    relatedRoutes: ["/services/website-performance-optimization", "/build-website", "/get-started"],
  },

  // --- INDUSTRIES WE POWER ---
  {
    id: "industries-index",
    title: "Industries Solutions",
    route: "/industries",
    description: "Tailored digital engineering and operational workflows across 11 key market sectors.",
    category: "industries",
    categoryLabel: "INDUSTRY DIRECTORY",
    keywords: ["industries", "sectors", "verticals", "use cases", "domains"],
    intentPhrases: ["industries", "all industries", "what industries do you work with", "industry solutions"],
    relatedRoutes: ["/services", "/pricing", "/get-started"],
  },
  {
    id: "industries-startups",
    title: "Startup & Scaleup Web Systems",
    route: "/industries/startups",
    description: "Rapid 7-day launch sites, investor pitch polish, waitlist funnels, and growth analytics.",
    category: "industries",
    categoryLabel: "STARTUPS",
    keywords: ["startup", "scaleup", "founder", "fundraising", "pitch", "mvp", "launch", "waitlist", "early stage"],
    intentPhrases: ["startup", "startup website", "website for my startup", "mvp website", "founder website"],
    relatedRoutes: ["/industries/saas", "/pricing/usa", "/get-started"],
  },
  {
    id: "industries-small-business",
    title: "Small & Local Business Websites",
    route: "/industries/small-business",
    description: "Local search dominance, one-tap calling, Google Business sync, and customer trust.",
    category: "industries",
    categoryLabel: "SMALL BUSINESS",
    keywords: ["small business", "local business", "sme", "shop", "local", "store", "plumber", "electrician", "contractor"],
    intentPhrases: ["small business", "small business website", "local business website", "website for small business"],
    relatedRoutes: ["/pricing/india", "/pricing/business-website", "/get-started"],
  },
  {
    id: "industries-saas",
    title: "SaaS Platform Websites",
    route: "/industries/saas",
    description: "Interactive product walkthroughs, feature comparison matrices, and dynamic pricing calculators.",
    category: "industries",
    categoryLabel: "SAAS",
    keywords: ["saas", "software as a service", "b2b saas", "cloud software", "product tour", "app landing"],
    intentPhrases: ["saas", "saas website", "b2b saas website", "software website", "app website"],
    relatedRoutes: ["/services/web-app-development", "/3d-website", "/get-started"],
  },
  {
    id: "industries-restaurants",
    title: "Restaurant & Hospitality Websites",
    route: "/industries/restaurants",
    description: "Digital menus, online table booking, and direct 0% commission WhatsApp food ordering.",
    category: "industries",
    categoryLabel: "RESTAURANTS",
    keywords: ["restaurant", "cafe", "bar", "food", "dining", "menu", "table reservation", "culinary", "hospitality"],
    intentPhrases: ["restaurant", "restaurant website", "cafe website", "menu website", "food website", "online menu"],
    relatedRoutes: ["/services/ecommerce-website-development", "/pricing/business-website", "/get-started"],
  },
  {
    id: "industries-real-estate",
    title: "Real Estate & Luxury Properties",
    route: "/industries/real-estate",
    description: "Retina property galleries, floor plan viewers, 3D virtual tour embeds, and broker lead capture.",
    category: "industries",
    categoryLabel: "REAL ESTATE",
    keywords: ["real estate", "property", "realtor", "broker", "homes", "luxury estate", "apartments", "listings"],
    intentPhrases: ["real estate", "real estate website", "property website", "realtor website", "property listings site"],
    relatedRoutes: ["/3d-website", "/pricing/3d-website", "/get-started"],
  },
  {
    id: "industries-consulting",
    title: "Consulting & Advisory Practices",
    route: "/industries/consulting",
    description: "Authority thought leadership layouts, case study showcases, and calendar booking funnels.",
    category: "industries",
    categoryLabel: "CONSULTING",
    keywords: ["consulting", "consultant", "advisory", "coach", "strategy", "advisor", "management consulting"],
    intentPhrases: ["consulting", "consulting website", "consultant website", "advisory website", "coaching website"],
    relatedRoutes: ["/book-a-call", "/professional-website", "/get-started"],
  },
  {
    id: "industries-healthcare",
    title: "Healthcare & Clinic Web Portals",
    route: "/industries/healthcare",
    description: "Accessible doctor profiles, department directories, and confidential patient intake forms.",
    category: "industries",
    categoryLabel: "HEALTHCARE",
    keywords: ["healthcare", "health", "medical", "doctor", "clinic", "hospital", "dentist", "physician", "patient"],
    intentPhrases: ["healthcare", "healthcare website", "medical website", "clinic website", "doctor website", "dental website"],
    relatedRoutes: ["/professional-website", "/pricing/business-website", "/get-started"],
  },
  {
    id: "industries-education",
    title: "Education & Academy Platforms",
    route: "/industries/education",
    description: "Course catalogs, syllabus outlines, instructor credentials, and student registration funnels.",
    category: "industries",
    categoryLabel: "EDUCATION",
    keywords: ["education", "school", "course", "academy", "university", "learning", "tutor", "training", "edtech"],
    intentPhrases: ["education", "education website", "school website", "course website", "academy website", "training website"],
    relatedRoutes: ["/services/web-app-development", "/pricing/business-website", "/get-started"],
  },
  {
    id: "industries-ecommerce",
    title: "Ecommerce & Retail Brands",
    route: "/industries/ecommerce",
    description: "High-conversion D2C storefronts, instant search, fast checkout, and 0% platform tax.",
    category: "industries",
    categoryLabel: "ECOMMERCE",
    keywords: ["retail", "d2c", "store", "products", "apparel", "goods", "shop online"],
    intentPhrases: ["ecommerce business", "online retail", "d2c website", "clothing brand website"],
    relatedRoutes: ["/services/ecommerce-website-development", "/pricing/ecommerce", "/get-started"],
  },
  {
    id: "industries-technology",
    title: "Technology & AI Companies",
    route: "/industries/technology",
    description: "Deep tech dark aesthetic, interactive code snippets, API documentation, and WebGL animations.",
    category: "industries",
    categoryLabel: "TECHNOLOGY",
    keywords: ["technology", "tech company", "ai company", "software company", "deeptech", "hardware", "robotics"],
    intentPhrases: ["technology company", "tech company website", "ai startup website", "software company website"],
    relatedRoutes: ["/3d-website", "/services/web-app-development", "/get-started"],
  },
  {
    id: "industries-professional-services",
    title: "Professional Services & Legal",
    route: "/industries/professional-services",
    description: "High-trust digital footprint for law firms, CPA practices, and institutional consultancies.",
    category: "industries",
    categoryLabel: "PROFESSIONAL",
    keywords: ["law firm", "lawyer", "attorney", "cpa", "accounting", "auditing", "tax firm", "corporate services"],
    intentPhrases: ["professional services", "professional firm", "law firm website", "accounting website", "cpa website"],
    relatedRoutes: ["/professional-website", "/pricing/business-website", "/get-started"],
  },

  // --- PRICING MATRIX ---
  {
    id: "pricing-index",
    title: "Global Pricing Overview",
    route: "/pricing",
    description: "Transparent, fixed packages: Website Package ($1,000) and Complete AI Ecosystem ($1,500).",
    category: "pricing",
    categoryLabel: "PRICING",
    keywords: ["pricing", "cost", "price", "rate", "quotation", "how much", "plans", "packages", "fees"],
    intentPhrases: ["pricing", "website cost", "website price", "how much does a website cost", "how much is it", "pricing plans"],
    relatedRoutes: ["/pricing/india", "/pricing/usa", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "pricing-india",
    title: "India Pricing (INR)",
    route: "/pricing/india",
    description: "Fixed Indian Rupee packages (₹79,000 / ₹1,19,000) with GST invoices and local UPI/NEFT support.",
    category: "pricing",
    categoryLabel: "INDIA PRICING",
    keywords: ["india", "inr", "rupee", "rupees", "₹", "gst", "delhi", "mumbai", "bangalore", "79000", "119000"],
    intentPhrases: ["india price", "india pricing", "website cost india", "rupee price", "inr price", "price in rupees", "cost in india"],
    relatedRoutes: ["/pricing", "/pricing/business-website", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "pricing-usa",
    title: "USA Pricing (USD)",
    route: "/pricing/usa",
    description: "Fixed US Dollar packages ($1,000 / $1,500) with Stripe credit card and ACH/Wire transfer support.",
    category: "pricing",
    categoryLabel: "USA PRICING",
    keywords: ["usa", "usd", "dollar", "dollars", "$", "us pricing", "america", "global pricing", "1000", "1500"],
    intentPhrases: ["usa price", "usa pricing", "website cost usa", "dollar price", "usd price", "price in dollars", "cost in usa"],
    relatedRoutes: ["/pricing", "/pricing/3d-website", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "pricing-business",
    title: "Business Website Pricing",
    route: "/pricing/business-website",
    description: "Corporate package breakdown: Next.js frontend, lead intake forms, SEO, and full source code ($1,000).",
    category: "pricing",
    categoryLabel: "BUSINESS PRICING",
    keywords: ["business price", "business cost", "company price", "corporate quote"],
    intentPhrases: ["business website price", "business website cost", "cost of business website", "price for company website"],
    relatedRoutes: ["/business-website", "/pricing", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "pricing-3d",
    title: "3D Website Pricing",
    route: "/pricing/3d-website",
    description: "Immersive WebGL experience pricing breakdown: Custom 3D shaders, Three.js scenes, and 60fps tuning.",
    category: "pricing",
    categoryLabel: "3D PRICING",
    keywords: ["3d price", "3d cost", "webgl price", "three js quote", "immersive cost"],
    intentPhrases: ["3d website price", "3d website cost", "how much for 3d website", "cost of 3d site"],
    relatedRoutes: ["/3d-website", "/services/3d-website-development", "/get-started"],
    conversionPriority: true,
  },
  {
    id: "pricing-ecommerce",
    title: "Ecommerce Store Pricing",
    route: "/pricing/ecommerce",
    description: "Digital storefront package breakdown: Payment gateways, product catalogs, and 0% platform tax.",
    category: "pricing",
    categoryLabel: "ECOMMERCE PRICING",
    keywords: ["ecommerce price", "store cost", "shop price", "ecommerce quote", "online store cost"],
    intentPhrases: ["ecommerce website price", "ecommerce website cost", "cost to build online store", "price for ecommerce"],
    relatedRoutes: ["/services/ecommerce-website-development", "/industries/ecommerce", "/get-started"],
    conversionPriority: true,
  },

  // --- CONVERSION & ACTION CHANNELS ---
  {
    id: "get-started",
    title: "Start Project Intake",
    route: "/get-started",
    description: "Configure project goals, select your commercial package, and initiate development in 24 hours.",
    category: "conversion",
    categoryLabel: "GET STARTED",
    keywords: ["start", "hire", "begin", "get started", "onboard", "launch project", "hire navya"],
    intentPhrases: ["i want to start", "start project", "start my project", "build my website", "hire navya", "let's start", "ready to begin"],
    relatedRoutes: ["/request-a-quote", "/book-a-call", "/contact"],
    conversionPriority: true,
  },
  {
    id: "request-a-quote",
    title: "Request Custom Quote (RFQ)",
    route: "/request-a-quote",
    description: "Submit custom project specifications and receive a fixed-price architectural estimate.",
    category: "conversion",
    categoryLabel: "CUSTOM QUOTE",
    keywords: ["quote", "rfq", "estimate", "proposal", "custom scope", "pricing estimate"],
    intentPhrases: ["i want a quote", "website quote", "get a quote", "how much will my project cost", "request a quote", "send me a proposal"],
    relatedRoutes: ["/get-started", "/book-a-call", "/pricing"],
    conversionPriority: true,
  },
  {
    id: "book-a-call",
    title: "Book Strategy Call",
    route: "/book-a-call",
    description: "Schedule a 20-minute live architectural and business strategy consultation with senior engineers.",
    category: "conversion",
    categoryLabel: "SCHEDULE CALL",
    keywords: ["call", "schedule", "book", "zoom", "google meet", "calendar", "consultation", "talk"],
    intentPhrases: ["book a call", "schedule a call", "talk to someone", "consultation", "speak with an engineer", "schedule meeting"],
    relatedRoutes: ["/contact", "/get-started", "/request-a-quote"],
    conversionPriority: true,
  },
  {
    id: "contact",
    title: "Contact & Consultation",
    route: "/contact",
    description: "Direct phone (+91 93554 12903), WhatsApp, and email channels to reach Navya Tech Industry.",
    category: "conversion",
    categoryLabel: "CONTACT US",
    keywords: ["contact", "phone", "email", "whatsapp", "reach", "office", "address", "support"],
    intentPhrases: ["contact navya", "contact", "talk to navya", "how do i reach you", "what is your phone number", "email address"],
    relatedRoutes: ["/get-started", "/book-a-call", "/pricing"],
    conversionPriority: true,
  },

  // --- RESOURCE & BLOG HUBS ---
  {
    id: "resources-hub",
    title: "Resource Center",
    route: "/resources",
    description: "Curated collection of practical guides covering web engineering, 3D WebGL, business platforms, and SEO.",
    category: "resources",
    categoryLabel: "RESOURCE CENTER",
    keywords: ["resources", "guides", "learning", "documentation", "resource center", "tutorials"],
    intentPhrases: ["resources", "resource center", "website guides", "educational content", "tutorials"],
    relatedRoutes: ["/blog", "/services", "/pricing"],
  },
  {
    id: "blog-hub",
    title: "Navya Blog & Insights",
    route: "/blog",
    description: "Articles, technical breakdowns, cost calculators, and architectural insights for modern web engineering.",
    category: "blog",
    categoryLabel: "BLOG INDEX",
    keywords: ["blog", "articles", "news", "insights", "read", "posts", "technical articles"],
    intentPhrases: ["blog", "read blog", "articles", "navya blog", "latest posts"],
    relatedRoutes: ["/resources", "/blog/website-development", "/blog/3d-websites"],
  },
  {
    id: "blog-cat-webdev",
    title: "Website Development Blog",
    route: "/blog/website-development",
    description: "Guides and breakdowns on Next.js, building costs, timelines, custom code, and web engineering.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["web dev blog", "development articles", "building websites articles"],
    intentPhrases: ["website development blog", "web development articles", "web dev guides"],
    relatedRoutes: ["/blog/how-to-build-a-business-website", "/blog/how-much-does-it-cost-to-build-a-website", "/services/website-development"],
  },
  {
    id: "blog-cat-design",
    title: "Website Design Blog",
    route: "/blog/website-design",
    description: "UI/UX design systems, claymorphic aesthetics, responsive spatial tokens, and high-converting interfaces.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["design blog", "ui ux articles", "web design guides"],
    intentPhrases: ["website design blog", "ui ux articles", "design guides"],
    relatedRoutes: ["/blog/how-to-create-a-professional-website", "/website-design", "/services/website-design"],
  },
  {
    id: "blog-cat-3d",
    title: "3D Websites & WebGL Blog",
    route: "/blog/3d-websites",
    description: "Articles on interactive 3D web design, WebGL graphics pipelines, Three.js shaders, and 60fps tuning.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["3d blog", "webgl articles", "three js guides", "3d website blog"],
    intentPhrases: ["3d websites blog", "webgl articles", "3d web guides"],
    relatedRoutes: ["/blog/what-is-a-3d-website", "/blog/how-3d-websites-work", "/3d-website"],
  },
  {
    id: "blog-cat-business",
    title: "Business Websites Blog",
    route: "/blog/business-websites",
    description: "Strategic articles for founders: website ROI, avoiding common web mistakes, and agency evaluation.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["business blog", "founder guides", "business website articles"],
    intentPhrases: ["business website blog", "business web guides", "corporate website articles"],
    relatedRoutes: ["/blog/why-businesses-need-a-website", "/blog/what-makes-a-good-business-website", "/business-website"],
  },
  {
    id: "blog-cat-seo",
    title: "Technical SEO Blog",
    route: "/blog/seo",
    description: "Guides on technical SEO architecture, structured JSON-LD schemas, Core Web Vitals, and Google rankings.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["seo blog", "technical seo articles", "core web vitals guides", "ranking articles"],
    intentPhrases: ["seo blog", "technical seo articles", "seo guides"],
    relatedRoutes: ["/blog/technical-seo-for-websites", "/blog/core-web-vitals", "/services/seo"],
  },
  {
    id: "blog-cat-modern-dev",
    title: "Modern Web Development Blog",
    route: "/blog/web-development",
    description: "Modern framework architectures, React 19, TypeScript paradigms, and edge-native full-stack practices.",
    category: "blog",
    categoryLabel: "BLOG CATEGORY",
    keywords: ["modern web dev", "react articles", "nextjs guides", "edge computing blog"],
    intentPhrases: ["web development blog", "modern web articles"],
    relatedRoutes: ["/blog/custom-website-vs-website-builder", "/blog/website-building-process", "/services/web-app-development"],
  },

  // --- WEBSITE DEVELOPMENT ARTICLES ---
  {
    id: "blog-how-to-build-a-business-website",
    title: "How to Build a Business Website",
    route: "/blog/how-to-build-a-business-website",
    description: "Step-by-step architecture guide on building a high-converting business website from scratch.",
    category: "blog",
    categoryLabel: "GUIDE",
    keywords: ["build business website", "how to build business site", "steps to build website"],
    intentPhrases: ["how do i build a business website", "how to build a business website", "how to build website for business"],
    relatedRoutes: ["/business-website", "/blog/how-much-does-it-cost-to-build-a-website", "/get-started"],
  },
  {
    id: "blog-how-much-does-it-cost",
    title: "How Much Does It Cost to Build a Website?",
    route: "/blog/how-much-does-it-cost-to-build-a-website",
    description: "Detailed pricing breakdown across builders, freelancers, agencies, and Navya fixed packages.",
    category: "blog",
    categoryLabel: "PRICING GUIDE",
    keywords: ["website cost guide", "how much website cost", "web dev pricing guide"],
    intentPhrases: ["how much does it cost to build a website", "cost to build a website", "how much does a website cost to make"],
    relatedRoutes: ["/pricing", "/pricing/business-website", "/blog/website-development-cost"],
  },
  {
    id: "blog-how-long-does-it-take",
    title: "How Long Does It Take to Build a Website?",
    route: "/blog/how-long-does-it-take-to-build-a-website",
    description: "Realistic build timelines from 7-day rapid launches to custom enterprise platforms.",
    category: "blog",
    categoryLabel: "TIMELINE GUIDE",
    keywords: ["website timeline", "how long to build site", "web development duration"],
    intentPhrases: ["how long does it take to build a website", "how long to build a website", "website building timeline"],
    relatedRoutes: ["/blog/website-building-process", "/get-started"],
  },
  {
    id: "blog-how-to-create-a-professional-website",
    title: "How to Create a Professional Website",
    route: "/blog/how-to-create-a-professional-website",
    description: "Enterprise standards in typography, spatial scale, micro-interactions, and trust signals.",
    category: "blog",
    categoryLabel: "BEST PRACTICES",
    keywords: ["professional site guide", "how to make professional website"],
    intentPhrases: ["how to create a professional website", "make a professional website", "professional website best practices"],
    relatedRoutes: ["/professional-website", "/website-design"],
  },
  {
    id: "blog-custom-vs-builder",
    title: "Custom Website vs Website Builder",
    route: "/blog/custom-website-vs-website-builder",
    description: "Compare custom Next.js engineering with WordPress, Wix, and Squarespace across speed and ownership.",
    category: "blog",
    categoryLabel: "COMPARISON",
    keywords: ["custom vs builder", "wix vs custom", "wordpress vs nextjs", "squarespace vs custom"],
    intentPhrases: ["custom website vs website builder", "should i use a website builder or custom code", "custom vs wordpress"],
    relatedRoutes: ["/custom-website", "/build-website"],
  },
  {
    id: "blog-what-does-business-website-need",
    title: "What Does a Business Website Need?",
    route: "/blog/what-does-a-business-website-need",
    description: "The 10 essential features, trust signals, and integrations every modern business website must have.",
    category: "blog",
    categoryLabel: "CHECKLIST",
    keywords: ["business website checklist", "what website needs", "essential website features"],
    intentPhrases: ["what does a business website need", "what should be on a business website", "business website requirements"],
    relatedRoutes: ["/business-website", "/blog/what-makes-a-good-business-website"],
  },
  {
    id: "blog-website-development-cost",
    title: "Website Development Cost Breakdown",
    route: "/blog/website-development-cost",
    description: "Itemized breakdown of design, frontend, backend, hosting, and ongoing maintenance costs.",
    category: "blog",
    categoryLabel: "COST BREAKDOWN",
    keywords: ["web dev cost itemized", "cost breakdown website", "development budget"],
    intentPhrases: ["website development cost", "website development price breakdown", "cost of web development"],
    relatedRoutes: ["/pricing", "/blog/how-much-does-it-cost-to-build-a-website"],
  },
  {
    id: "blog-website-building-process",
    title: "The Website Building Process",
    route: "/blog/website-building-process",
    description: "Step-by-step walkthrough of the 5-phase engineering lifecycle behind building enterprise platforms.",
    category: "blog",
    categoryLabel: "PROCESS",
    keywords: ["web building process", "development lifecycle", "website roadmap"],
    intentPhrases: ["website building process", "how do you build websites", "steps in building a website"],
    relatedRoutes: ["/website-building", "/services/website-development"],
  },

  // --- 3D WEBSITE ARTICLES ---
  {
    id: "blog-what-is-a-3d-website",
    title: "What Is a 3D Website?",
    route: "/blog/what-is-a-3d-website",
    description: "Learn how browser-native WebGL and Three.js graphics work and how 3D web design drives engagement.",
    category: "blog",
    categoryLabel: "3D GUIDE",
    keywords: ["what is 3d website", "3d web explained", "interactive 3d web"],
    intentPhrases: ["what is a 3d website", "tell me about 3d websites", "what does a 3d website look like"],
    relatedRoutes: ["/3d-website", "/blog/how-3d-websites-work", "/pricing/3d-website"],
  },
  {
    id: "blog-how-3d-websites-work",
    title: "How 3D Websites Work",
    route: "/blog/how-3d-websites-work",
    description: "Under the hood of WebGL pipelines, shaders, GPU rendering, and 3D asset compression.",
    category: "blog",
    categoryLabel: "TECHNICAL GUIDE",
    keywords: ["how 3d websites work", "webgl pipeline explained", "shaders in browser"],
    intentPhrases: ["how do 3d websites work", "how 3d websites work", "how does webgl work in browser"],
    relatedRoutes: ["/blog/webgl-website-development", "/services/3d-website-development"],
  },
  {
    id: "blog-3d-vs-traditional",
    title: "3D Website vs Traditional Website",
    route: "/blog/3d-website-vs-traditional-website",
    description: "Analyze key differences in user dwell time, conversion rates, development cost, and performance.",
    category: "blog",
    categoryLabel: "COMPARISON",
    keywords: ["3d vs 2d website", "3d vs traditional website", "is 3d better than 2d"],
    intentPhrases: ["3d website vs traditional website", "3d vs flat website", "difference between 3d and traditional website"],
    relatedRoutes: ["/3d-website", "/blog/benefits-of-3d-web-design"],
  },
  {
    id: "blog-3d-website-dev-guide",
    title: "3D Website Development Guide",
    route: "/blog/3d-website-development",
    description: "A practical developer roadmap to building 3D websites with Next.js, React Three Fiber, and shaders.",
    category: "blog",
    categoryLabel: "DEVELOPER GUIDE",
    keywords: ["3d web dev guide", "how to build 3d website", "r3f threejs guide"],
    intentPhrases: ["3d website development", "how to develop 3d website", "building 3d websites"],
    relatedRoutes: ["/services/3d-website-development", "/3d-website"],
  },
  {
    id: "blog-benefits-of-3d",
    title: "Benefits of 3D Web Design",
    route: "/blog/benefits-of-3d-web-design",
    description: "Explore the proven commercial benefits: 3x longer dwell time, higher conversion, and brand memorability.",
    category: "blog",
    categoryLabel: "BUSINESS BENEFITS",
    keywords: ["benefits of 3d web", "why use 3d website", "3d web advantages"],
    intentPhrases: ["benefits of 3d web design", "why should i get a 3d website", "advantages of 3d websites"],
    relatedRoutes: ["/3d-website", "/blog/is-a-3d-website-good-for-business"],
  },
  {
    id: "blog-is-3d-good-for-business",
    title: "Is a 3D Website Good for Business?",
    route: "/blog/is-a-3d-website-good-for-business",
    description: "Industry use cases and honest framework to evaluate if 3D web aligns with your business model.",
    category: "blog",
    categoryLabel: "STRATEGY GUIDE",
    keywords: ["is 3d good for business", "3d website roi", "should my business use 3d"],
    intentPhrases: ["is a 3d website good for business", "does my company need a 3d website", "is 3d website worth it"],
    relatedRoutes: ["/pricing/3d-website", "/3d-website"],
  },
  {
    id: "blog-webgl-dev",
    title: "WebGL Website Development",
    route: "/blog/webgl-website-development",
    description: "Deep dive into WebGL browser graphics, GLSL shaders, GPU memory management, and 60fps tuning.",
    category: "blog",
    categoryLabel: "DEEP TECH",
    keywords: ["webgl development", "webgl shaders", "gpu memory in browser"],
    intentPhrases: ["webgl website development", "how to code webgl", "webgl web development"],
    relatedRoutes: ["/services/3d-website-development", "/blog/how-3d-websites-work"],
  },

  // --- BUSINESS WEBSITE ARTICLES ---
  {
    id: "blog-why-businesses-need-website",
    title: "Why Businesses Need a Website",
    route: "/blog/why-businesses-need-a-website",
    description: "Why every business must own a professional website to protect brand equity and capture search traffic.",
    category: "blog",
    categoryLabel: "STRATEGY",
    keywords: ["why business needs website", "importance of business website", "why have a website"],
    intentPhrases: ["why businesses need a website", "why do i need a website for my business", "reasons to have a website"],
    relatedRoutes: ["/business-website", "/blog/what-makes-a-good-business-website"],
  },
  {
    id: "blog-what-makes-good-business-website",
    title: "What Makes a Good Business Website?",
    route: "/blog/what-makes-a-good-business-website",
    description: "The 5 foundational pillars that distinguish extraordinary, high-converting business websites.",
    category: "blog",
    categoryLabel: "DESIGN PILLARS",
    keywords: ["what makes good website", "elements of good business site", "high converting web design"],
    intentPhrases: ["what makes a good business website", "how to make a good business website", "qualities of a good website"],
    relatedRoutes: ["/business-website", "/services/business-website-development"],
  },
  {
    id: "blog-business-website-mistakes",
    title: "Top 7 Business Website Mistakes",
    route: "/blog/business-website-mistakes",
    description: "Avoid the most common pitfalls: slow speeds, confusing navigation, weak CTAs, and broken layouts.",
    category: "blog",
    categoryLabel: "COMMON PITFALLS",
    keywords: ["website mistakes", "common web errors", "conversion killers website"],
    intentPhrases: ["business website mistakes", "common website mistakes to avoid", "why is my website not converting"],
    relatedRoutes: ["/services/website-redesign", "/services/website-performance-optimization"],
  },
  {
    id: "blog-website-vs-social-media",
    title: "Website vs Social Media for Business",
    route: "/blog/website-vs-social-media",
    description: "Why relying solely on social media is risky. Compare audience ownership, conversion, and digital equity.",
    category: "blog",
    categoryLabel: "COMPARISON",
    keywords: ["website vs social media", "instagram vs website", "do i need website if i have instagram"],
    intentPhrases: ["website vs social media", "should i get a website or just use instagram", "website or social media for business"],
    relatedRoutes: ["/business-website", "/get-started"],
  },
  {
    id: "blog-how-to-choose-agency",
    title: "How to Choose a Website Development Company",
    route: "/blog/how-to-choose-a-website-development-company",
    description: "5 critical questions to ask potential web partners regarding code ownership, tech stack, and pricing.",
    category: "blog",
    categoryLabel: "BUYER'S GUIDE",
    keywords: ["how to choose web agency", "hiring web developers", "choosing web company"],
    intentPhrases: ["how to choose a website development company", "how to hire a web developer", "how to select a web development agency"],
    relatedRoutes: ["/get-started", "/pricing"],
  },

  // --- SEO ARTICLES ---
  {
    id: "blog-seo-basics",
    title: "Website SEO Basics for Businesses",
    route: "/blog/website-seo-basics",
    description: "Learn how Google crawls, indexes, and ranks websites, and how to structure your site for organic traffic.",
    category: "blog",
    categoryLabel: "SEO BASICS",
    keywords: ["seo basics", "seo fundamentals", "seo for beginners", "website seo basics"],
    intentPhrases: ["website seo basics", "how does seo work", "seo basics for small business"],
    relatedRoutes: ["/services/seo", "/blog/technical-seo-for-websites"],
  },
  {
    id: "blog-technical-seo",
    title: "Technical SEO for Modern Websites",
    route: "/blog/technical-seo-for-websites",
    description: "Master technical SEO: JSON-LD schemas, robots.txt, dynamic XML sitemaps, and server-side rendering.",
    category: "blog",
    categoryLabel: "TECHNICAL SEO",
    keywords: ["technical seo", "json ld schema", "sitemaps", "crawlability"],
    intentPhrases: ["technical seo for websites", "how to do technical seo", "technical seo guide"],
    relatedRoutes: ["/services/seo", "/blog/core-web-vitals"],
  },
  {
    id: "blog-core-web-vitals",
    title: "Understanding Core Web Vitals (LCP, INP, CLS)",
    route: "/blog/core-web-vitals",
    description: "The definitive guide to Google's Core Web Vitals and step-by-step techniques to achieve 95+ green scores.",
    category: "blog",
    categoryLabel: "PERFORMANCE",
    keywords: ["core web vitals", "lcp", "inp", "cls", "google speed score"],
    intentPhrases: ["what are core web vitals", "core web vitals", "how to improve core web vitals", "lcp inp cls"],
    relatedRoutes: ["/services/website-performance-optimization", "/blog/technical-seo-for-websites"],
  },
  {
    id: "blog-how-to-get-on-google",
    title: "How to Get a Website on Google",
    route: "/blog/how-to-get-a-website-on-google",
    description: "Step-by-step guide to get your new website indexed and ranking on Google Search Console in 24 hours.",
    category: "blog",
    categoryLabel: "INDEXING GUIDE",
    keywords: ["get website on google", "google indexing guide", "search console setup"],
    intentPhrases: ["how to get a website on google", "how do i get my website on google", "how to index website on google"],
    relatedRoutes: ["/services/seo", "/blog/website-seo-checklist"],
  },
  {
    id: "blog-seo-checklist",
    title: "Complete 20-Point Website SEO Checklist",
    route: "/blog/website-seo-checklist",
    description: "20-point audit checklist covering on-page tags, schema markup, Core Web Vitals, and mobile usability.",
    category: "blog",
    categoryLabel: "CHECKLIST",
    keywords: ["seo checklist", "website seo checklist", "seo audit checklist"],
    intentPhrases: ["website seo checklist", "seo checklist for new website", "pre launch seo checklist"],
    relatedRoutes: ["/services/seo", "/blog/technical-seo-for-websites"],
  },

  // --- STRATEGIC GEO HUBS ---
  {
    id: "geo-india",
    title: "Website Development in India",
    route: "/website-development/india",
    description: "Enterprise web development across India. Fixed ₹79,000 + GST packages, local UPI/Razorpay, and full GST billing.",
    category: "geo",
    categoryLabel: "INDIA HUB",
    keywords: ["website development india", "web design company india", "custom website development india", "web developer in india", "website cost india"],
    intentPhrases: ["website development in india", "website development company in india", "web design india", "hire web developer in india", "website price in india"],
    relatedRoutes: ["/pricing/india", "/website-development/mumbai", "/website-development/bangalore", "/get-started"],
  },
  {
    id: "geo-mumbai",
    title: "Website Development in Mumbai",
    route: "/website-development/mumbai",
    description: "High-trust website development for Mumbai financial practices, corporate headquarters, media agencies, and scaleups.",
    category: "geo",
    categoryLabel: "MUMBAI HUB",
    keywords: ["website development mumbai", "web design mumbai", "custom web development mumbai", "business website mumbai", "bkc web development"],
    intentPhrases: ["website development in mumbai", "website development company in mumbai", "web design in mumbai", "website designer mumbai", "corporate website mumbai"],
    relatedRoutes: ["/website-development/india", "/pricing/india", "/business-website", "/get-started"],
  },
  {
    id: "geo-bangalore",
    title: "Website Development in Bangalore",
    route: "/website-development/bangalore",
    description: "Engineering-grade website development for Bangalore AI startups, SaaS scaleups, and tech companies. 7-day launch sprint.",
    category: "geo",
    categoryLabel: "BANGALORE HUB",
    keywords: ["website development bangalore", "web design bangalore", "startup website bangalore", "saas web development bangalore", "bengaluru web development"],
    intentPhrases: ["website development in bangalore", "website development company in bangalore", "web design in bangalore", "startup website development bangalore", "web development bengaluru"],
    relatedRoutes: ["/website-development/india", "/industries/startups", "/services/3d-website-development", "/get-started"],
  },
  {
    id: "geo-delhi-ncr",
    title: "Website Development in Delhi NCR",
    route: "/website-development/delhi-ncr",
    description: "High-converting corporate and industrial web systems across Delhi, Noida, and Gurugram (Gurgaon). Lead generation & RFQ.",
    category: "geo",
    categoryLabel: "DELHI NCR HUB",
    keywords: ["website development delhi", "web design noida", "web development gurgaon", "business website delhi ncr", "gurugram web development"],
    intentPhrases: ["website development in delhi", "website development in noida", "website development in gurgaon", "web development in delhi ncr", "website company delhi"],
    relatedRoutes: ["/website-development/india", "/pricing/india", "/services/business-website-development", "/get-started"],
  },
  {
    id: "geo-usa",
    title: "Website Development in USA",
    route: "/website-development/usa",
    description: "Nationwide US commercial website development at a fixed $1,000 USD. Sub-second US edge delivery and Stripe/ACH support.",
    category: "geo",
    categoryLabel: "USA HUB",
    keywords: ["website development usa", "web design company usa", "custom website development usa", "american web development company", "website cost usa"],
    intentPhrases: ["website development in usa", "website development company in the usa", "web design in usa", "hire web developer in usa", "website price in usa"],
    relatedRoutes: ["/pricing/usa", "/website-development/new-york", "/website-development/san-francisco", "/website-development/austin", "/get-started"],
  },
  {
    id: "geo-new-york",
    title: "Website Development in New York",
    route: "/website-development/new-york",
    description: "High-trust corporate and financial web development for New York City advisory firms, media companies, and startups.",
    category: "geo",
    categoryLabel: "NYC HUB",
    keywords: ["website development new york", "web design nyc", "manhattan web development", "corporate website new york", "high trust web design nyc"],
    intentPhrases: ["website development in new york", "website development in nyc", "web design in new york", "manhattan web design company", "nyc website development"],
    relatedRoutes: ["/website-development/usa", "/pricing/usa", "/professional-website", "/get-started"],
  },
  {
    id: "geo-san-francisco",
    title: "Website Development in San Francisco",
    route: "/website-development/san-francisco",
    description: "Next-gen web development for San Francisco AI startups, Silicon Valley scaleups, and tech innovators. 3D WebGL & 60fps.",
    category: "geo",
    categoryLabel: "SF BAY AREA HUB",
    keywords: ["website development san francisco", "web design bay area", "ai startup website sf", "silicon valley web developer", "3d web design san francisco"],
    intentPhrases: ["website development in san francisco", "web development in bay area", "silicon valley website development", "ai startup web design san francisco"],
    relatedRoutes: ["/website-development/usa", "/industries/startups", "/services/3d-website-development", "/get-started"],
  },
  {
    id: "geo-austin",
    title: "Website Development in Austin",
    route: "/website-development/austin",
    description: "High-performance web development for Austin Silicon Hills startups, technology scaleups, and Texas enterprises. Fixed $1,000.",
    category: "geo",
    categoryLabel: "AUSTIN HUB",
    keywords: ["website development austin", "web design austin texas", "startup website austin", "silicon hills web developer", "business website austin tx"],
    intentPhrases: ["website development in austin", "website development in austin tx", "web design in austin", "austin web development company"],
    relatedRoutes: ["/website-development/usa", "/pricing/usa", "/business-website", "/get-started"],
  },
];

export interface AssistantDiscoveryResult {
  primaryPage: AssistantPageItem | null;
  relatedPages: AssistantPageItem[];
  suggestedOptions: { label: string; action: string; route?: string }[];
  botResponse: string;
  directNavigateRoute?: string;
  isAmbiguous?: boolean;
}

// Normalization & Typo Mapping
const TYPO_MAP: Record<string, string> = {
  "resturant": "restaurant",
  "restraunt": "restaurant",
  "restaraunt": "restaurant",
  "ecomerce": "ecommerce",
  "eccomerce": "ecommerce",
  "prce": "price",
  "prcing": "pricing",
  "prizing": "pricing",
  "sofware": "software",
  "softwear": "software",
  "startp": "startup",
  "stratup": "startup",
  "webiste": "website",
  "websit": "website",
  "develoop": "develop",
  "devlopment": "development",
  "desing": "design",
  "perfomance": "performance",
};

export function normalizeAssistantQuery(raw: string): string {
  let cleaned = raw.toLowerCase().trim().replace(/[^\w\s$₹]/g, " ");
  for (const [typo, fixed] of Object.entries(TYPO_MAP)) {
    cleaned = cleaned.replace(new RegExp(`\\b${typo}\\b`, "gi"), fixed);
  }
  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Intelligent Multi-Intent Search & Navigation Engine
 */
export function queryAssistantNavigation(rawQuery: string): AssistantDiscoveryResult {
  const query = normalizeAssistantQuery(rawQuery);
  const words = query.split(" ").filter((w) => w.length > 1);

  // 1. Direct Navigation Commands ("take me to pricing", "open 3d website", "show me contact")
  const directNavPatterns = [
    /^(?:take me to|go to|open|navigate to|show me|bring me to|switch to)\s+(.+)$/i,
  ];

  for (const pattern of directNavPatterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      const targetQuery = match[1].trim();
      const targetResult = queryAssistantNavigation(targetQuery);
      if (targetResult.primaryPage) {
        return {
          primaryPage: targetResult.primaryPage,
          relatedPages: targetResult.relatedPages,
          suggestedOptions: [
            { label: `View ${targetResult.primaryPage.title}`, action: `route_${targetResult.primaryPage.route}`, route: targetResult.primaryPage.route },
          ],
          botResponse: `Taking you to **${targetResult.primaryPage.title}** now.`,
          directNavigateRoute: targetResult.primaryPage.route,
        };
      }
    }
  }

  // 2. High-Priority Intent Scoring
  const scoredPages: { page: AssistantPageItem; score: number; matchReasons: string[] }[] = [];

  for (const page of ASSISTANT_PAGE_REGISTRY) {
    let score = 0;
    const reasons: string[] = [];

    // Exact Phrase Match
    for (const phrase of page.intentPhrases) {
      if (query.includes(phrase)) {
        score += 35;
        reasons.push(`intent_phrase: ${phrase}`);
      }
    }

    // Keyword Matches
    for (const kw of page.keywords) {
      if (query.includes(kw)) {
        score += 15;
        reasons.push(`keyword: ${kw}`);
      }
    }

    // Individual Word Overlap
    for (const word of words) {
      if (page.keywords.some((k) => k.toLowerCase().includes(word))) {
        score += 4;
      }
      if (page.title.toLowerCase().includes(word)) {
        score += 8;
      }
    }

    // Multi-Intent Boosters
    // Example: "3d" + "restaurant" -> boosts both 3d-website and restaurant
    if (query.includes("3d") && (page.route.includes("3d") || page.id.includes("3d"))) {
      score += 20;
    }
    if ((query.includes("price") || query.includes("cost") || query.includes("$") || query.includes("₹") || query.includes("inr") || query.includes("usd")) && page.category === "pricing") {
      score += 25;
    }
    if ((query.includes("start") || query.includes("hire") || query.includes("quote") || query.includes("book") || query.includes("call")) && page.category === "conversion") {
      score += 25;
    }
    if ((query.includes("slow") || query.includes("speed") || query.includes("vitals") || query.includes("lighthouse")) && page.route.includes("performance")) {
      score += 35;
    }

    // Specific Country & City Boosters
    if ((query.includes("india") || query.includes("inr") || query.includes("₹") || query.includes("rupee")) && (page.route === "/pricing/india" || page.route === "/website-development/india")) {
      score += 45;
    }
    if ((query.includes("usa") || query.includes("usd") || query.includes("$") || query.includes("dollar") || query.includes("america")) && (page.route === "/pricing/usa" || page.route === "/website-development/usa")) {
      score += 45;
    }
    if (query.includes("mumbai") && page.route === "/website-development/mumbai") {
      score += 60;
    }
    if ((query.includes("bangalore") || query.includes("bengaluru")) && page.route === "/website-development/bangalore") {
      score += 60;
    }
    if ((query.includes("delhi") || query.includes("noida") || query.includes("gurgaon") || query.includes("gurugram")) && page.route === "/website-development/delhi-ncr") {
      score += 60;
    }
    if ((query.includes("new york") || query.includes("nyc") || query.includes("manhattan")) && page.route === "/website-development/new-york") {
      score += 60;
    }
    if ((query.includes("san francisco") || query.includes("bay area") || query.includes("silicon valley")) && page.route === "/website-development/san-francisco") {
      score += 60;
    }
    if (query.includes("austin") && page.route === "/website-development/austin") {
      score += 60;
    }

    if (score > 0) {
      scoredPages.push({ page, score, matchReasons: reasons });
    }
  }

  // Sort descending by score
  scoredPages.sort((a, b) => b.score - a.score);

  // 3. Ambiguous Fallback Check (e.g. "I need a website")
  if (query === "website" || query === "i need a website" || query === "i want a website" || query === "build a website") {
    const buildWeb = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/build-website")!;
    const busWeb = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/business-website")!;
    const customWeb = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/custom-website")!;
    const threeD = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/3d-website")!;

    return {
      primaryPage: buildWeb,
      relatedPages: [busWeb, threeD],
      suggestedOptions: [
        { label: "Build Website", action: "route_/build-website", route: "/build-website" },
        { label: "Business Website", action: "route_/business-website", route: "/business-website" },
        { label: "Custom Website", action: "route_/custom-website", route: "/custom-website" },
        { label: "3D Website", action: "route_/3d-website", route: "/3d-website" },
        { label: "Explore Pricing ($1,000)", action: "route_/pricing", route: "/pricing" },
      ],
      botResponse: "We engineer high-performance web systems tailored to your exact business goals. Which type of website are you looking to build?",
      isAmbiguous: true,
    };
  }

  // 4. Strong Match Found
  if (scoredPages.length > 0 && scoredPages[0].score >= 12) {
    const primary = scoredPages[0].page;

    // Gather up to 2 related pages (prioritize explicitly configured related routes, then next top scored pages)
    const relatedList: AssistantPageItem[] = [];

    for (const relRoute of primary.relatedRoutes) {
      const match = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === relRoute);
      if (match && match.route !== primary.route && !relatedList.some((r) => r.route === match.route)) {
        relatedList.push(match);
        if (relatedList.length >= 2) break;
      }
    }

    // If still have room, add from next scored
    for (let i = 1; i < scoredPages.length && relatedList.length < 2; i++) {
      const nextP = scoredPages[i].page;
      if (nextP.route !== primary.route && !relatedList.some((r) => r.route === nextP.route)) {
        relatedList.push(nextP);
      }
    }

    // Contextual bot response formulation
    let botResponse = `I found the ideal destination for your request: **${primary.title}**.\n\n${primary.description}`;

    if (query.includes("price") || query.includes("cost") || query.includes("how much")) {
      botResponse = `Here is our transparent pricing information for **${primary.title}**:\n\n${primary.description}`;
    } else if (primary.category === "industries") {
      botResponse = `We have specialized solutions built specifically for **${primary.title}**:\n\n${primary.description}`;
    } else if (primary.category === "conversion") {
      botResponse = `Ready to bring your project to life! You can proceed directly with **${primary.title}**:`;
    }

    const options = [
      { label: `View ${primary.title} →`, action: `route_${primary.route}`, route: primary.route },
      ...relatedList.map((rel) => ({
        label: `${rel.title}`,
        action: `route_${rel.route}`,
        route: rel.route,
      })),
      { label: "Start Project ($1,000)", action: "route_/get-started", route: "/get-started" },
    ];

    return {
      primaryPage: primary,
      relatedPages: relatedList,
      suggestedOptions: options,
      botResponse,
    };
  }

  // 5. Default Fallback
  const defaultServices = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/services/website-development")!;
  const default3D = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/3d-website")!;
  const defaultPricing = ASSISTANT_PAGE_REGISTRY.find((p) => p.route === "/pricing")!;

  return {
    primaryPage: defaultServices,
    relatedPages: [default3D, defaultPricing],
    suggestedOptions: [
      { label: "Website Development", action: "route_/services/website-development", route: "/services/website-development" },
      { label: "3D Interactive Web", action: "route_/3d-website", route: "/3d-website" },
      { label: "Commercial Pricing", action: "route_/pricing", route: "/pricing" },
      { label: "Start a Project", action: "route_/get-started", route: "/get-started" },
    ],
    botResponse: "I can help you navigate our services, tailored industry solutions, or commercial packages. Here are the top pathways visitors explore:",
  };
}
