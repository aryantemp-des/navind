import { BlogArticle } from "./types";

export const seoArticles: Record<string, BlogArticle> = {
  "/blog/website-seo-basics": {
    slug: "/blog/website-seo-basics",
    title: "Website SEO Basics for Businesses | Search Engine Fundamentals",
    h1: "Website SEO Basics",
    metaDescription: "Learn the core fundamentals of website SEO: on-page optimization, search intent, metadata hierarchy, crawlability, and high-quality backlink foundations.",
    category: "SEO",
    categorySlug: "/blog/seo",
    categoryLabel: "SEO FUNDAMENTALS",
    author: "Navya SEO Lab",
    publishedDate: "January 17, 2026",
    updatedDate: "February 20, 2026",
    readingTime: "5 min read",
    heroImageSrc: "/ai2.png",
    heroImageAlt: "Website SEO Basics",
    excerpt: "Demystifying search engine optimization: how Google crawls, indexes, and ranks business websites, and how to structure your site for organic visibility.",
    introParagraphs: [
      "Search Engine Optimization (SEO) is the process of improving your website's architecture, content, and authority so search engines like Google rank your pages at the top of relevant user searches.",
      "Unlike paid advertisements that stop generating leads the moment your budget runs dry, SEO builds compounding, long-term organic traffic that delivers qualified prospects month after month.",
    ],
    sections: [
      {
        title: "The Three Core Pillars of SEO",
        paragraphs: [
          "A successful SEO strategy balances technical architecture, content relevance, and domain trust:",
        ],
        bulletPoints: [
          "1. Technical SEO: Fast loading, mobile responsiveness, clean URL structures, and valid structured data schemas.",
          "2. On-Page SEO: Strategic keyword targeting, clear H1/H2 heading hierarchy, optimized meta descriptions, and descriptive image alt tags.",
          "3. Off-Page Authority: High-quality backlinks, brand citations, and verified social proof signals.",
        ],
      },
    ],
    conclusion: {
      title: "Dominate Search Rankings",
      paragraphs: [
        "Build a solid organic foundation with Navya's technical SEO engineering and performance optimization.",
      ],
    },
    relatedArticleSlugs: [
      "/blog/technical-seo-for-websites",
      "/blog/core-web-vitals",
      "/blog/how-to-get-a-website-on-google",
      "/blog/website-seo-checklist",
    ],
    contextualService: {
      title: "Technical SEO Services",
      description: "Explore our programmatic SEO and search engine ranking services.",
      href: "/services/seo",
      ctaText: "Explore SEO Services →",
    },
    tags: ["SEO", "Search Engines", "Google Ranking", "Organic Traffic"],
  },

  "/blog/technical-seo-for-websites": {
    slug: "/blog/technical-seo-for-websites",
    title: "Technical SEO for Modern Websites | Architecture, Schema & Crawlability",
    h1: "Technical SEO for Websites",
    metaDescription: "Master technical SEO for modern web apps: JSON-LD schemas, robots.txt, dynamic XML sitemaps, canonical tags, and server-side rendering (SSR).",
    category: "SEO",
    categorySlug: "/blog/seo",
    categoryLabel: "TECHNICAL DEEP DIVE",
    author: "Navya SEO Lab",
    publishedDate: "January 23, 2026",
    updatedDate: "February 23, 2026",
    readingTime: "7 min read",
    heroImageSrc: "/ai3.png",
    heroImageAlt: "Technical SEO for Websites",
    excerpt: "How code-level architecture dictates search engine rankings. Learn how to implement structured JSON-LD schemas, manage crawl budget, and fix canonical loops.",
    introParagraphs: [
      "Technical SEO is the invisible foundation of organic search visibility. Even the best content will fail to rank if Google's web crawlers encounter render blocking scripts, broken sitemaps, or indexing errors.",
      "Here is an engineering guide to configuring technical SEO on modern React and Next.js platforms.",
    ],
    sections: [
      {
        title: "Key Technical SEO Requirements",
        paragraphs: [
          "Ensure your website codebase implements these technical requirements:",
        ],
        bulletPoints: [
          "JSON-LD Schema Markup: Explicitly providing Google with Organization, Service, Product, and BreadcrumbList structured data.",
          "Server-Side Rendering (SSR) & Pre-rendering: Delivering complete HTML directly to search bots on initial request.",
          "Self-Referencing Canonical Tags: Preventing duplicate content penalties across protocol, subdomain, and query parameter variations.",
          "Clean XML Sitemap & Robots.txt: Guiding search crawlers directly to your high-value commercial routes.",
        ],
      },
    ],
    conclusion: {
      title: "Engineered for Indexing Superiority",
      paragraphs: [
        "Every website built by Navya includes enterprise-grade technical SEO architecture from day one.",
      ],
    },
    relatedArticleSlugs: [
      "/blog/website-seo-basics",
      "/blog/core-web-vitals",
      "/blog/how-to-get-a-website-on-google",
      "/blog/website-seo-checklist",
    ],
    contextualService: {
      title: "SEO & Performance Engineering",
      description: "Learn how we engineer sites for top search visibility.",
      href: "/services/seo",
      ctaText: "View Technical SEO →",
    },
    tags: ["Technical SEO", "Schema", "Crawlability", "Next.js"],
  },

  "/blog/core-web-vitals": {
    slug: "/blog/core-web-vitals",
    title: "Understanding Core Web Vitals | LCP, INP & CLS Performance Guide",
    h1: "Core Web Vitals",
    metaDescription: "The definitive guide to Google's Core Web Vitals (LCP, INP, CLS): how they affect search rankings, user experience, and step-by-step optimization techniques.",
    category: "SEO",
    categorySlug: "/blog/seo",
    categoryLabel: "PERFORMANCE & SEO",
    author: "Navya Performance Lab",
    publishedDate: "January 27, 2026",
    updatedDate: "February 25, 2026",
    readingTime: "6 min read",
    heroImageSrc: "/ai4.png",
    heroImageAlt: "Core Web Vitals",
    excerpt: "Google's Core Web Vitals directly influence your organic rankings and user bounce rates. Learn how to optimize LCP, INP, and CLS for a flawless green score.",
    introParagraphs: [
      "Core Web Vitals are Google's standardized metrics for measuring real-world user experience regarding page speed, interactivity, and visual stability.",
      "Passing all three Core Web Vitals is an explicit Google ranking signal that separates fast, premium websites from slow legacy platforms.",
    ],
    sections: [
      {
        title: "The Three Core Metrics Explained",
        paragraphs: [
          "Google evaluates every page against three specific metrics:",
        ],
        bulletPoints: [
          "Largest Contentful Paint (LCP < 2.5s): Measures perceived loading speed. How quickly the largest hero image or text block becomes visible.",
          "Interaction to Next Paint (INP < 200ms): Measures page responsiveness to user clicks, taps, and keyboard events.",
          "Cumulative Layout Shift (CLS < 0.1): Measures visual stability. Ensures page elements don't abruptly shift around as fonts and ads load.",
        ],
      },
    ],
    conclusion: {
      title: "Achieve Perfect Lighthouse Scores",
      paragraphs: [
        "Navya engineers websites that consistently score 95–100 across performance, accessibility, best practices, and SEO.",
      ],
    },
    relatedArticleSlugs: [
      "/blog/technical-seo-for-websites",
      "/blog/website-seo-basics",
      "/blog/website-seo-checklist",
      "/blog/how-to-get-a-website-on-google",
    ],
    contextualService: {
      title: "Performance Optimization Service",
      description: "Upgrade your website speed to sub-second load times.",
      href: "/services/website-performance-optimization",
      ctaText: "Speed Up Your Website →",
    },
    tags: ["Core Web Vitals", "LCP", "INP", "CLS", "Performance"],
  },

  "/blog/how-to-get-a-website-on-google": {
    slug: "/blog/how-to-get-a-website-on-google",
    title: "How to Get a Website on Google | Indexing & Verification Guide",
    h1: "How to Get a Website on Google",
    metaDescription: "Step-by-step guide on how to get your new website indexed and ranking on Google: Search Console setup, sitemap submission, and fast indexation tips.",
    category: "SEO",
    categorySlug: "/blog/seo",
    categoryLabel: "INDEXING GUIDE",
    author: "Navya SEO Lab",
    publishedDate: "January 31, 2026",
    updatedDate: "February 26, 2026",
    readingTime: "5 min read",
    heroImageSrc: "/ai1.png",
    heroImageAlt: "How to Get a Website on Google",
    excerpt: "Just launched a new website? Follow this step-by-step guide to get your pages indexed by Google Search Console within 24 to 48 hours.",
    introParagraphs: [
      "Launching a new website is only the first step—Google must discover, crawl, and index your pages before customers can find you in search results.",
      "Here is the proven checklist to get your website verified, crawled, and indexed on Google as fast as possible.",
    ],
    sections: [
      {
        title: "Step-by-Step Google Indexation Roadmap",
        paragraphs: [
          "Follow these actionable steps immediately after launching your website:",
        ],
        bulletPoints: [
          "1. Set Up Google Search Console (GSC): Verify domain ownership via DNS TXT record.",
          "2. Submit XML Sitemap: Add `https://yourdomain.com/sitemap.xml` directly into GSC.",
          "3. Request Immediate URL Inspection: Use the GSC inspection tool to request manual indexing of key commercial pages.",
          "4. Claim Google Business Profile: Link your official website URL to your verified Google Maps listing.",
          "5. Build Initial Citation Links: Create foundational brand profiles on LinkedIn, Twitter/X, Crunchbase, and GitHub.",
        ],
      },
    ],
    conclusion: {
      title: "Accelerate Your Search Discovery",
      paragraphs: [
        "Every website deployed by Navya comes pre-configured with automated XML sitemaps and verification tags for instant Google indexing.",
      ],
    },
    relatedArticleSlugs: [
      "/blog/website-seo-basics",
      "/blog/technical-seo-for-websites",
      "/blog/website-seo-checklist",
      "/blog/core-web-vitals",
    ],
    contextualService: {
      title: "Technical SEO Engineering",
      description: "Get your website discovered by customers on Google.",
      href: "/services/seo",
      ctaText: "Explore SEO Solutions →",
    },
    tags: ["Google", "Search Console", "Indexing", "Sitemap"],
  },

  "/blog/website-seo-checklist": {
    slug: "/blog/website-seo-checklist",
    title: "Complete Website SEO Checklist | Pre-Launch & Ongoing Audit",
    h1: "Website SEO Checklist",
    metaDescription: "The ultimate 20-point website SEO checklist: on-page tags, schema markup, Core Web Vitals, mobile usability, and internal link architecture.",
    category: "SEO",
    categorySlug: "/blog/seo",
    categoryLabel: "AUDIT CHECKLIST",
    author: "Navya SEO Lab",
    publishedDate: "February 05, 2026",
    updatedDate: "February 27, 2026",
    readingTime: "6 min read",
    heroImageSrc: "/ai2.png",
    heroImageAlt: "Website SEO Checklist",
    excerpt: "Use this comprehensive 20-point SEO checklist before and after launching your website to ensure zero technical blindspots and maximum search ranking potential.",
    introParagraphs: [
      "Overlooking even a single critical SEO setting—such as an accidental `noindex` tag or broken canonical link—can prevent your website from ranking on Google.",
      "Use this rigorous checklist to verify your website's technical and on-page SEO health.",
    ],
    sections: [
      {
        title: "20-Point Essential SEO Audit",
        paragraphs: [
          "Verify every item before publishing new pages:",
        ],
        bulletPoints: [
          "Unique H1 tag on every page containing the primary keyword.",
          "Descriptive title tags under 60 characters and meta descriptions under 155 characters.",
          "Self-referencing canonical URLs on all public routes.",
          "Valid JSON-LD schema markup for Organization, Service, and Breadcrumbs.",
          "All images compressed to WebP/AVIF with accurate descriptive alt text.",
          "XML sitemap updated and submitted to Google Search Console.",
          "Robots.txt correctly allowing search bot crawling on public paths.",
          "HTTPS encryption with valid SSL certificate and HSTS headers.",
          "Mobile viewport meta tag configured with zero horizontal scroll overflow.",
          "Contextual internal links connecting related articles and service packages.",
        ],
      },
    ],
    conclusion: {
      title: "Achieve Flawless SEO Health",
      paragraphs: [
        "Let Navya handle your website's architecture, design, and technical SEO from end to end.",
      ],
    },
    relatedArticleSlugs: [
      "/blog/website-seo-basics",
      "/blog/technical-seo-for-websites",
      "/blog/core-web-vitals",
      "/blog/how-to-get-a-website-on-google",
    ],
    contextualService: {
      title: "Comprehensive SEO Services",
      description: "Upgrade your website with our complete SEO package.",
      href: "/services/seo",
      ctaText: "View SEO Services →",
    },
    tags: ["Checklist", "SEO Audit", "Best Practices", "Google"],
  },
};
