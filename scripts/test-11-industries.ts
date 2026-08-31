import { createServer } from "vite";
import { chromium } from "@playwright/test";

const EXPECTED_INDUSTRIES = [
  {
    num: "01",
    title: "Startups & Scaleups",
    route: "/industries/startups",
    points: ["Rapid 7-day launch", "Waitlist conversion", "Product previews"],
  },
  {
    num: "02",
    title: "Small Business & Local",
    route: "/industries/small-business",
    points: ["One-tap calling", "Local Google ranking", "Affordable packages"],
  },
  {
    num: "03",
    title: "SaaS & Digital Products",
    route: "/industries/saas",
    points: ["Feature showcases", "Pricing calculators", "Docs & onboarding"],
  },
  {
    num: "04",
    title: "Restaurants & Hospitality",
    route: "/industries/restaurants",
    points: ["Fast mobile menus", "Direct WhatsApp ordering", "Table booking"],
  },
  {
    num: "05",
    title: "Real Estate & Architecture",
    route: "/industries/real-estate",
    points: ["Property galleries", "Virtual tour support", "Agent inquiry forms"],
  },
  {
    num: "06",
    title: "Healthcare & Wellness",
    route: "/industries/healthcare",
    points: ["HIPAA-conscious", "Doctor profiles", "Online booking"],
  },
  {
    num: "07",
    title: "Consulting & Advisory",
    route: "/industries/consulting",
    points: ["Thought leadership", "Lead capture systems", "Authority positioning"],
  },
  {
    num: "08",
    title: "Education & Academies",
    route: "/industries/education",
    points: ["Course catalogues", "Student enquiries", "Easy enrollment"],
  },
  {
    num: "09",
    title: "Ecommerce & Retail",
    route: "/industries/ecommerce",
    points: ["Product catalogues", "Fast checkout", "Conversion-focused storefronts"],
  },
  {
    num: "10",
    title: "Technology & AI Labs",
    route: "/industries/technology",
    points: ["Product showcases", "AI & technology demos", "Technical credibility"],
  },
  {
    num: "11",
    title: "Professional Services",
    route: "/industries/professional-services",
    points: ["Service showcases", "Client enquiries", "Professional credibility"],
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

    // Verify exactly 11 cards in FeatureGrid (Explore Industry Sectors)
    const featureGridSection = pageDesktop.locator('section:has(h2:has-text("Explore Industry Sectors"))');
    const cards = featureGridSection.locator(".clay-card-interactive");
    const cardCount = await cards.count();
    console.log(`  🃏 Total Industry Cards in Grid: ${cardCount}`);

    if (cardCount !== 11) {
      throw new Error(`Expected exactly 11 industry cards, but found ${cardCount}`);
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
    // TEST 2: AUDIT ALL 11 INDIVIDUAL INDUSTRY SUBPAGES
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. VERIFYING ALL 11 INDIVIDUAL SUBPAGES & WHATSAPP CTAS");
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
      const vpCardCount = await vpFeatureGrid.locator(".clay-card-interactive").count();
      const hasHorizontalScroll = await pageVp.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`  📱 Viewport: ${vp.name}`);
      console.log(`     Cards count: ${vpCardCount}/11`);
      console.log(`     Horizontal overflow detected: ${hasHorizontalScroll ? "❌ YES" : "✅ NONE"}`);

      if (hasHorizontalScroll) {
        throw new Error(`Horizontal overflow detected on ${vp.name}`);
      }
      if (vpCardCount !== 11) {
        throw new Error(`Expected 11 cards on ${vp.name}, got ${vpCardCount}`);
      }
      await pageVp.close();
    }

    console.log("\n=================================================");
    console.log("🎉 ALL 11 INDUSTRY CARDS, ROUTES & CTAS VERIFIED!");
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
