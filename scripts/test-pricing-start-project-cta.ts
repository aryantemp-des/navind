import { createServer } from "vite";
import { chromium } from "@playwright/test";

const PRICING_PAGES = [
  { name: "Packages & Pricing", route: "/pricing" },
  { name: "India Pricing (₹10,000)", route: "/pricing/india" },
  { name: "USA Pricing ($1,000)", route: "/pricing/usa" },
  { name: "Business Website Pricing", route: "/pricing/business-website" },
  { name: "3D Website Pricing", route: "/pricing/3d-website" },
  { name: "Ecommerce Store Pricing", route: "/pricing/ecommerce" },
];

async function testPricingStartProjectCTA() {
  console.log("🚀 Launching Vite dev server for Pricing 'Start Project' CTA QA...");
  const server = await createServer({
    server: { port: 5208 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5208";

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await context.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
    });

    const page = await context.newPage();

    // -------------------------------------------------------------
    // TEST 1: ALL 6 DEDICATED PRICING SUBPAGES
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 1. AUDITING ALL PRICING SUBPAGES FOR 'START PROJECT' CTA");
    console.log("=================================================");

    for (const p of PRICING_PAGES) {
      await page.goto(`${baseUrl}${p.route}`, { waitUntil: "networkidle" });
      console.log(`\n📄 Testing: ${p.name} (${p.route})`);

      // 1. Hero Primary CTA
      const heroBtn = page.locator('main section').first().locator('a.clay-btn-primary:has-text("Start Project")').first();
      const heroBtnCount = await heroBtn.count();
      console.log(`   🔴 Hero 'Start Project' Button: ${heroBtnCount > 0 ? "✅ FOUND" : "❌ MISSING"}`);
      if (heroBtnCount === 0) {
        throw new Error(`Missing hero 'Start Project' button on ${p.route}`);
      }

      const heroHref = await heroBtn.getAttribute("href");
      console.log(`      Hero href: "${heroHref}"`);
      if (heroHref !== "/get-started") {
        throw new Error(`Expected hero href="/get-started" on ${p.route}, got "${heroHref}"`);
      }

      // 2. Overview Package Cards CTAs
      const cardBtns = page.locator('main section:nth-of-type(2) a.clay-btn-primary:has-text("Start Project")');
      const cardBtnCount = await cardBtns.count();
      console.log(`   🃏 Card 'Start Project' Buttons: ${cardBtnCount} found`);
      if (cardBtnCount < 3) {
        throw new Error(`Expected at least 3 card 'Start Project' buttons on ${p.route}, got ${cardBtnCount}`);
      }

      for (let i = 0; i < cardBtnCount; i++) {
        const cHref = await cardBtns.nth(i).getAttribute("href");
        if (cHref !== "/get-started") {
          throw new Error(`Card ${i + 1} href mismatch on ${p.route}: got "${cHref}"`);
        }
      }

      // 3. Test Click navigation to /get-started
      await heroBtn.click();
      await page.waitForTimeout(800);

      const landedUrl = page.url();
      const intakeH1 = await page.locator("h1").first().innerText();
      console.log(`   🖱️ Clicked Hero CTA -> Landed at: ${landedUrl} | H1: "${intakeH1}"`);

      if (!landedUrl.includes("/get-started") || !intakeH1.includes("Start Your Project")) {
        throw new Error(`Failed to land on /get-started from ${p.route}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 2: HOMEPAGE GLOBAL PRICING OVERVIEW SECTION
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. HOMEPAGE GLOBAL PRICING OVERVIEW SECTION (#pricing)");
    console.log("=================================================");
    await page.goto(`${baseUrl}/#pricing`, { waitUntil: "networkidle" });

    const homePricingBtns = page.locator('#pricing a.clay-btn-primary:has-text("Start Project")');
    const homePricingCount = await homePricingBtns.count();
    console.log(`  🃏 Homepage #pricing 'Start Project' CTA Count: ${homePricingCount}/3`);
    if (homePricingCount !== 3) {
      throw new Error(`Expected 3 'Start Project' buttons in homepage #pricing, found ${homePricingCount}`);
    }

    for (let i = 0; i < homePricingCount; i++) {
      const href = await homePricingBtns.nth(i).getAttribute("href");
      console.log(`     Card ${i + 1} href: "${href}"`);
      if (href !== "/get-started") {
        throw new Error(`Expected card ${i + 1} href="/get-started", got "${href}"`);
      }
    }

    // Click first card CTA on homepage
    await homePricingBtns.first().click();
    await page.waitForTimeout(800);
    console.log(`  🖱️ Clicked Homepage Pricing CTA -> Landed at: ${page.url()}`);
    if (!page.url().includes("/get-started")) {
      throw new Error(`Homepage pricing card failed to route to /get-started`);
    }

    // -------------------------------------------------------------
    // TEST 3: MOBILE RESPONSIVE VERIFICATION (390x844)
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 3. MOBILE RESPONSIVE QA (390x844)");
    console.log("=================================================");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    await mobileContext.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
    });
    const mobilePage = await mobileContext.newPage();

    for (const p of PRICING_PAGES) {
      await mobilePage.goto(`${baseUrl}${p.route}`, { waitUntil: "networkidle" });
      const hasOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(`  📱 Mobile ${p.name}: Overflow: ${hasOverflow ? "❌ DETECTED" : "✅ NONE"}`);
      if (hasOverflow) {
        throw new Error(`Horizontal overflow on mobile ${p.route}`);
      }
    }

    console.log("\n=================================================");
    console.log("🎉 ALL PRICING 'START PROJECT' CTA TESTS PASSED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testPricingStartProjectCTA().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
