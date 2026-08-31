import { SubpageConfig } from "@/components/templates/GenericSubpage";

export const conversionPages: Record<string, SubpageConfig> = {
  "/contact": {
    slug: "/contact",
    category: "Get in Touch",
    title: "Contact Us | Direct Channels & Support by Navya Tech Industry",
    h1: "Contact Navya Tech Industry",
    primaryKeyword: "contact navya tech",
    metaDescription: "Contact Navya Tech Industry. Speak directly with our engineering and leadership team at +91 93554 12903, email hello@navyatech.co.in, or WhatsApp us.",
    breadcrumbs: [{ label: "Contact" }],
    heroDescription: "Connect directly with our engineering and leadership team. No generic support queues, no runarounds—just direct technical collaboration.",
    heroImageAlt: "Contact Navya Tech Industry",
    heroImageSrc: "/ai3.png",
    heroStats: [
      { label: "Phone Support", value: "+91 93554 12903" },
      { label: "Email Response", value: "< 4 Hours" },
      { label: "WhatsApp Direct", value: "Available 24/7" },
    ],
    overviewTitle: "Direct Channels of Communication",
    overviewDescription: "We believe in direct, frictionless communication. Whether you want to discuss a new website build, integrate autonomous AI agents, or request ongoing maintenance, our team is readily accessible across phone, WhatsApp, email, and live consultation.",
    overviewCards: [
      {
        title: "Direct Calling Line",
        description: "Speak directly with our senior engineering team for immediate technical and commercial inquiries.",
        badge: "Phone Direct",
        points: ["Call: +91 93554 12903", "Direct engineer access", "Instant quote guidance"],
      },
      {
        title: "WhatsApp Fast Channel",
        description: "Send project briefs, ask quick questions, and receive instant updates on WhatsApp.",
        badge: "WhatsApp Direct",
        points: ["Available 24/7", "Instant chat response", "Quick file sharing"],
      },
      {
        title: "Official Email Inquiries",
        description: "Send formal RFQs, architectural requirements, and enterprise specifications directly to our executive inbox.",
        badge: "hello@navyatech.co.in",
        points: ["hello@navyatech.co.in", "Detailed technical review", "Same-day response SLA"],
      },
    ],
    capabilitiesTitle: "How We Support Your Project",
    capabilitiesSubtitle: "Communication Standards",
    capabilities: [
      {
        title: "Dedicated Project Channel",
        description: "Clients receive a dedicated async communication channel (Slack / WhatsApp group) with their lead engineer.",
        badge: "Async Channel",
        points: ["Direct engineer access", "Daily progress updates", "Screen recording reviews"],
      },
      {
        title: "Milestone Transparency",
        description: "Clear sprint roadmaps and live staging links so you can track progress at every stage.",
        badge: "Transparency",
        points: ["Staging preview links", "Milestone checklists", "Zero surprise invoices"],
      },
      {
        title: "Navya AI Assistant",
        description: "Available 24/7 on every page of our website to answer basic questions and capture inquiries.",
        badge: "AI Assistant",
        points: ["Always online", "Automated FAQ triage", "Instant SMS/Email alerts"],
      },
    ],
    faqs: [
      {
        question: "What is the fastest way to get a response from Navya?",
        answer: "For immediate assistance, call us directly at +91 93554 12903 or message us on WhatsApp. For detailed RFQs, submit our /get-started form.",
      },
    ],
    relatedLinks: [
      {
        title: "Get Started",
        description: "Submit your project requirements through our intake form.",
        href: "/get-started",
        category: "Intake",
      },
      {
        title: "Request a Quote",
        description: "Request a formal proposal and quote.",
        href: "/request-a-quote",
        category: "Quote",
      },
      {
        title: "Book a Call",
        description: "Schedule a dedicated consultation call.",
        href: "/book-a-call",
        category: "Scheduling",
      },
      {
        title: "Pricing Matrix",
        description: "Explore our transparent commercial packages.",
        href: "/pricing",
        category: "Pricing",
      },
    ],
  },

  "/get-started": {
    slug: "/get-started",
    category: "Project Intake",
    title: "Get Started | Start Your Web & AI Project by Navya",
    h1: "Start Your Project",
    primaryKeyword: "start website project",
    metaDescription: "Start your website and AI automation project with Navya Tech Industry. Select your package, outline requirements, and launch in 7-14 days.",
    breadcrumbs: [{ label: "Get Started" }],
    heroDescription: "Take the first step toward a high-performance digital presence. Submit your project requirements below to receive a detailed execution blueprint.",
    heroImageAlt: "Start Your Project",
    heroImageSrc: "/ai4.png",
    heroStats: [
      { label: "Execution Window", value: "7-14 Days" },
      { label: "Fixed Package", value: "$1,000 / ₹10k" },
      { label: "Source Rights", value: "100% Owned" },
    ],
    overviewTitle: "A Streamlined Intake Process Designed for Velocity",
    overviewDescription: "We have removed all unnecessary bureaucracy. Tell us about your business, select your desired package, and our senior engineers will assemble a comprehensive technical roadmap and begin development immediately upon signoff.",
    overviewCards: [
      {
        title: "1. Scope & Requirements",
        description: "Outline your goals, target audience, preferred pages, and custom feature needs through our simple intake form below.",
        badge: "Step 1",
        points: ["Project goals", "Page hierarchy", "Design preferences"],
      },
      {
        title: "2. Technical Blueprint & Kickoff",
        description: "We provide an architectural blueprint, milestone schedule, and initiate high-fidelity UI design.",
        badge: "Step 2",
        points: ["Architecture roadmap", "UI design prototype", "50% milestone billing"],
      },
      {
        title: "3. Build, QA & Production Launch",
        description: "Clean Next.js engineering, WebGL shaders, automated testing, and zero-downtime deployment to production.",
        badge: "Step 3",
        points: ["Lighthouse audit verification", "Edge CDN deployment", "Full GitHub repository handover"],
      },
    ],
    capabilitiesTitle: "Select Your Package Tier",
    capabilitiesSubtitle: "Transparent Investment",
    capabilities: [
      {
        title: "Website Package — $1,000 / ₹10,000",
        description: "Complete modern Next.js digital presence with 3D WebGL interactions, SEO foundations, and source code ownership.",
        badge: "Web Package",
        points: ["Next.js & TypeScript", "3D WebGL accents", "Full GitHub transfer"],
      },
      {
        title: "AI Agents Package — $1,000 / ₹10,000",
        description: "Autonomous multi-agent pipeline for customer communications, lead intake qualification, and CRM sync.",
        badge: "AI Package",
        points: ["WhatsApp & CRM integration", "Autonomous lead qualification", "24/7 automation"],
      },
      {
        title: "Full Ecosystem Bundle — $1,500 / ₹₹17,000",
        description: "Combine our premier website package and AI agent automation suite together and save $500.",
        badge: "Bundle",
        points: ["Website + AI Agents", "Priority development", "Save $500 / ₹39k"],
      },
    ],
    faqs: [
      {
        question: "How quickly will an engineer follow up after I submit this form?",
        answer: "Our senior engineering team reviews every submission and responds within 4 business hours with an initial architectural roadmap.",
      },
    ],
    relatedLinks: [
      {
        title: "Request a Quote",
        description: "Need a custom enterprise quote?",
        href: "/request-a-quote",
        category: "Quote",
      },
      {
        title: "Book a Call",
        description: "Prefer a live consultation call?",
        href: "/book-a-call",
        category: "Scheduling",
      },
      {
        title: "Global Pricing",
        description: "Explore all package tiers.",
        href: "/pricing",
        category: "Pricing",
      },
      {
        title: "Contact Us",
        description: "Speak directly with an engineer.",
        href: "/contact",
        category: "Contact",
      },
    ],
  },

  "/request-a-quote": {
    slug: "/request-a-quote",
    category: "Commercial Proposals",
    title: "Request a Quote | Custom Scope & Proposals by Navya Tech Industry",
    h1: "Request a Quote",
    primaryKeyword: "request website quote",
    metaDescription: "Request an accurate, fixed-price quote for your custom website, 3D web experience, or AI agent workflow by Navya Tech Industry. Fast 4-hour response.",
    breadcrumbs: [{ label: "Request a Quote" }],
    heroDescription: "Need a tailored enterprise quote or custom feature scope? Provide your project details below to receive an accurate, fixed-price proposal.",
    heroImageAlt: "Request a Quote",
    heroImageSrc: "/ai5.png",
    heroStats: [
      { label: "Quote Turnaround", value: "< 4 Hours" },
      { label: "Pricing Model", value: "100% Fixed" },
      { label: "Technical Review", value: "Senior Engineer" },
    ],
    overviewTitle: "Accurate, Transparent Proposals Without Sales Fluff",
    overviewDescription: "We provide comprehensive, itemized proposals detailing technical architecture, deliverables, milestones, and fixed pricing. No vague estimates, no hidden hourly surprises.",
    overviewCards: [
      {
        title: "Detailed Scope Itemization",
        description: "Every page, component, API integration, and deliverable is clearly outlined before work begins.",
        badge: "Itemization",
        points: ["Deliverables checklist", "Tech stack confirmation", "Milestone timeline"],
      },
      {
        title: "Fixed Investment Guarantee",
        description: "The price quoted in your proposal is the final price. We do not bill for unexpected overtime or scope drift.",
        badge: "Fixed Price",
        points: ["Zero surprise invoices", "Milestone billing", "100% source ownership"],
      },
      {
        title: "Senior Engineering Review",
        description: "Your project is evaluated by a senior full-stack engineer who assesses performance, security, and scalability.",
        badge: "Expert Review",
        points: ["Architecture review", "Security assessment", "SEO roadmap"],
      },
    ],
    capabilitiesTitle: "Information That Helps Us Provide an Accurate Quote",
    capabilitiesSubtitle: "Proposal Inputs",
    capabilities: [
      {
        title: "1. Core Business Objectives",
        description: "What are your primary conversion goals? (e.g. Lead generation, product sales, brand prestige, investor validation).",
        badge: "Goals",
        points: ["Conversion focus", "Target audience", "Competitive positioning"],
      },
      {
        title: "2. Scope & Feature Requirements",
        description: "Estimated number of pages, custom interactive calculators, 3D WebGL scenes, or CRM integrations.",
        badge: "Features",
        points: ["Page count", "3D / WebGL features", "Third-party APIs"],
      },
      {
        title: "3. Target Timeline & Launch Date",
        description: "When do you plan to go live? Our standard delivery is 7-14 days with expedited options available.",
        badge: "Timeline",
        points: ["Target launch date", "Staging review window", "Expedited options"],
      },
    ],
    faqs: [
      {
        question: "Is there any cost or obligation to request a quote?",
        answer: "None whatsoever. All quotes and architectural roadmaps are 100% free with zero obligation.",
      },
    ],
    relatedLinks: [
      {
        title: "Get Started",
        description: "Submit project intake form.",
        href: "/get-started",
        category: "Intake",
      },
      {
        title: "Book a Call",
        description: "Schedule a strategy session.",
        href: "/book-a-call",
        category: "Scheduling",
      },
      {
        title: "Pricing Matrix",
        description: "View standard package tiers.",
        href: "/pricing",
        category: "Pricing",
      },
      {
        title: "Contact",
        description: "Speak directly with our team.",
        href: "/contact",
        category: "Contact",
      },
    ],
  },

  "/book-a-call": {
    slug: "/book-a-call",
    category: "Live Consultation",
    title: "Book a Call | Strategy & Engineering Consultation by Navya",
    h1: "Book a Strategy Call",
    primaryKeyword: "book consultation call",
    metaDescription: "Schedule a direct consultation with Navya Tech Industry's senior engineering team. Discuss website architecture, 3D WebGL, and AI agent workflows.",
    breadcrumbs: [{ label: "Book a Call" }],
    heroDescription: "Speak directly with a senior engineer or solutions architect. Discuss your business goals, technical requirements, and receive actionable advice.",
    heroImageAlt: "Book a Strategy Call",
    heroImageSrc: "/ai1.png",
    heroStats: [
      { label: "Call Duration", value: "15-30 Mins" },
      { label: "Engineer Level", value: "Senior Staff" },
      { label: "Direct Phone", value: "+91 93554 12903" },
    ],
    overviewTitle: "Direct Technical Consultation Without the Sales Pressure",
    overviewDescription: "We don't employ aggressive sales reps. When you book a call with Navya, you speak directly with experienced engineers who listen to your operational challenges and recommend the most effective technical architecture for your budget.",
    overviewCards: [
      {
        title: "Direct Technical Strategy",
        description: "We analyze your existing website, traffic patterns, and conversion bottlenecks to identify immediate opportunities.",
        badge: "Audit",
        points: ["Architecture review", "Conversion bottleneck check", "Speed recommendations"],
      },
      {
        title: "Clear Package Guidance",
        description: "We help you determine whether our $1,000 Website Package, AI Agent suite, or Full Ecosystem is best suited for your goals.",
        badge: "Package Selection",
        points: ["Scope comparison", "Fixed fee explanation", "ROI projection"],
      },
      {
        title: "Instant Direct Dial",
        description: "Prefer not to wait for a scheduled slot? Call our direct engineering line right now at +91 93554 12903.",
        badge: "Instant Dial",
        points: ["Call: +91 93554 12903", "WhatsApp instant chat", "Zero waiting"],
      },
    ],
    capabilitiesTitle: "What We Cover in Your Consultation",
    capabilitiesSubtitle: "Call Agenda",
    capabilities: [
      {
        title: "1. Business & Technical Goals",
        description: "Understanding your target audience, conversion objectives, and brand positioning requirements.",
        badge: "10 Mins",
        points: ["Target audience", "Conversion goals", "Brand standards"],
      },
      {
        title: "2. Technical Architecture & Inclusions",
        description: "Reviewing Next.js, WebGL 3D elements, API integrations, and SEO foundation requirements.",
        badge: "10 Mins",
        points: ["Next.js architecture", "3D & WebGL feasibility", "CRM / API sync"],
      },
      {
        title: "3. Delivery Timeline & Next Steps",
        description: "Establishing milestone checkpoints, handover expectations, and immediate next steps.",
        badge: "5 Mins",
        points: ["Milestone schedule", "50/50 payment terms", "Kickoff schedule"],
      },
    ],
    faqs: [
      {
        question: "Can we schedule a call via Google Meet or Zoom?",
        answer: "Yes! We support Google Meet, Zoom, Microsoft Teams, and direct phone calls at your convenience.",
      },
    ],
    relatedLinks: [
      {
        title: "Contact Us",
        description: "View all direct contact channels.",
        href: "/contact",
        category: "Contact",
      },
      {
        title: "Get Started",
        description: "Submit project intake form.",
        href: "/get-started",
        category: "Intake",
      },
      {
        title: "Pricing Matrix",
        description: "Explore our fixed commercial packages.",
        href: "/pricing",
        category: "Pricing",
      },
      {
        title: "Request a Quote",
        description: "Request an itemized written proposal.",
        href: "/request-a-quote",
        category: "Quote",
      },
    ],
  },
};
