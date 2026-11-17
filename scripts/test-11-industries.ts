import { createServer } from "vite";
import { chromium } from "@playwright/test";

const EXPECTED_INDUSTRIES = [
  {
    num: "01",
    title: "SaaS & Voice Automation",
    route: "/industries/saas",
    points: ["AI voice agents", "Interactive demos", "Automated onboarding"],
  },
  {
    num: "02",
    title: "Real Estate & Luxury",
    route: "/industries/real-estate",
    points: ["Retina galleries", "WhatsApp tour booking", "Broker routing"],
  },
  {
    num: "03",
    title: "Healthcare & Clinics",
    route: "/industries/healthcare",
    points: ["WCAG AA compliance", "AI booking triage", "Physician credentials"],
  },
  {
    num: "04",
    title: "E-commerce & Retail",
    route: "/industries/ecommerce",
    points: ["0% commission", "WhatsApp alerts", "Sub-second search"],
  },
  {
    num: "05",
    title: "Professional Services",
    route: "/industries/professional-services",
    points: ["Document intake", "Client onboarding", "Executive authority"],
  },
  {
    num: "06",
    title: "Education & Academics",
    route: "/industries/education",
    points: ["Interactive catalogs", "24/7 AI counselor", "Easy enrollment"],
  },
  {
    num: "07",
    title: "Technology & AI Labs",
    route: "/industries/technology",
    points: ["WebGL shaders", "Multi-agent workflows", "API documentation"],
  },
  {
    num: "08",
    title: "Small Businesses",
    route: "/industries/small-business",
    points: ["One-tap calling", "AI missed-call textback", "$0 monthly tax"],
  },
  {
    num: "09",
    title: "Restaurant & Hospitality",
    route: "/industries/restaurants",
    points: ["Instant mobile menus", "Voice AI booking", "0% commission orders"],
  },
  {
    num: "10",
    title: "Consulting & Advisory",
    route: "/industries/consulting",
    points: ["Pre-screening intake", "Calendar sync", "Thought leadership"],
  },
];

async function testIndustriesEcosystem() {
  console.log("🚀 Launching Vite dev server for Industries QA...");
  const server = await createServer({
    server: { port: 5198 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5198";

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // TEST 1: DESKTOP AUDIT OF /industries HUB
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP VIEWPORT TEST (1440x900) - /industries");
    console.log("=================================================");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });

    const hubH1 = await pageDesktop.locator("h1").first().innerText();
    console.log(`  📄 Hub Page: /industries | H1: "${hubH1}"`);

    // Verify exactly 10 cards in FeatureGrid (Explore Industry Sectors)
    const featureGridSection = pageDesktop.locator('section:has(h2:has-text("Explore Industry Sectors"))');
    const cards = featureGridSection.locator(".service-card-yellow-glow, .clay-card-interactive");
    const cardCount = await cards.count();
    console.log(`  🃏 Total Industry Cards in Grid: ${cardCount}`);

    if (cardCount !== 10) {
      throw new Error(`Expected exactly 10 industry cards, but found ${cardCount}`);
    }

    // Inspect every card
    for (let i = 0; i < EXPECTED_INDUSTRIES.length; i++) {
      const expected = EXPECTED_INDUSTRIES[i];
      const card = cards.nth(i);

      const cardTitle = await card.locator("h3").innerText();
      const cardIndex = await card.locator(".font-mono").first().innerText();
      const cardHref = await card.getAttribute("href");

      console.log(`  🔎 [${expected.num}] "${cardTitle}" -> href: "${cardHref}" (Index badge: "${cardIndex.trim()}")`);

      if (cardTitle.trim() !== expected.title) {
        throw new Error(`Card ${i + 1}: expected title "${expected.title}", got "${cardTitle}"`);
      }

      if (cardHref !== expected.route) {
        throw new Error(`Card ${i + 1}: expected href "${expected.route}", got "${cardHref}"`);
      }
    }

    // -------------------------------------------------------------
    // TEST 2: AUDIT ALL 10 INDIVIDUAL INDUSTRY SUBPAGES
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. VERIFYING ALL 10 INDIVIDUAL SUBPAGES & WHATSAPP CTAS");
    console.log("=================================================");

    for (const ind of EXPECTED_INDUSTRIES) {
      await pageDesktop.goto(`${baseUrl}${ind.route}`, { waitUntil: "networkidle" });
      const subH1 = await pageDesktop.locator("h1").first().innerText();

      // Check WhatsApp Link
      const waLink = pageDesktop.locator('a[href^="https://wa.me/919355412903"]').first();
      const waHref = await waLink.getAttribute("href");

      // Check for absence of Start Project in Hero
      const heroButtons = pageDesktop.locator("section.relative.w-full.pt-4.pb-16 a, section.relative.w-full.md\\:py-20 a");
      const heroButtonTexts = await heroButtons.allInnerTexts();
      const hasStartProjectInHero = heroButtonTexts.some((txt) => txt.toLowerCase().includes("start project"));

      console.log(`  🏢 [${ind.num}] ${ind.title} (${ind.route})`);
      console.log(`     H1: "${subH1}"`);
      console.log(`     Hero Start Project Removed: ${!hasStartProjectInHero ? "✅ Verified" : "❌ Found"}`);
      console.log(`     WhatsApp CTA: "${waHref?.slice(0, 75)}..."`);

      if (!waHref || !waHref.includes("wa.me/919355412903")) {
        throw new Error(`Subpage ${ind.route} is missing valid WhatsApp link`);
      }

      if (hasStartProjectInHero) {
        throw new Error(`Subpage ${ind.route} has unexpected Start Project button in Hero`);
      }
    }

    // -------------------------------------------------------------
    // TEST 3: TABLET & MOBILE VIEWPORT LAYOUT & OVERFLOW CHECK
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 3. TABLET & MOBILE VIEWPORT & OVERFLOW TEST");
    console.log("=================================================");

    const viewports = [
      { name: "Tablet (iPad 768x1024)", width: 768, height: 1024 },
      { name: "Mobile (iPhone 390x844)", width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      const pageVp = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageVp.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });

      const vpFeatureGrid = pageVp.locator('section:has(h2:has-text("Explore Industry Sectors"))');
      const vpCardCount = await vpFeatureGrid.locator(".service-card-yellow-glow, .clay-card-interactive").count();
      const hasHorizontalScroll = await pageVp.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`  📱 Viewport: ${vp.name}`);
      console.log(`     Cards count: ${vpCardCount}/10`);
      console.log(`     Horizontal overflow detected: ${hasHorizontalScroll ? "❌ YES" : "✅ NONE"}`);

      if (hasHorizontalScroll) {
        throw new Error(`Horizontal overflow detected on ${vp.name}`);
      }
      if (vpCardCount !== 10) {
        throw new Error(`Expected 10 cards on ${vp.name}, got ${vpCardCount}`);
      }
      await pageVp.close();
    }

    // -------------------------------------------------------------
    // TEST 4: VERIFY 301 REDIRECT OF /industries/startups -> /industries/saas
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 4. VERIFYING CLIENT REDIRECT /industries/startups -> /industries/saas");
    console.log("=================================================");
    await pageDesktop.goto(`${baseUrl}/industries/startups`, { waitUntil: "networkidle" });
    const redirectedUrl = pageDesktop.url();
    console.log(`  🔀 Navigated to /industries/startups -> Resolved URL: ${redirectedUrl}`);
    if (!redirectedUrl.includes("/industries/saas")) {
      throw new Error(`Expected redirect to /industries/saas, but got ${redirectedUrl}`);
    }
    console.log("  ✅ Redirect verified successfully!");

    console.log("\n=================================================");
    console.log("🎉 ALL 10 INDUSTRY CARDS, ROUTES, CTAS & REDIRECT VERIFIED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testIndustriesEcosystem().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
