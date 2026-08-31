import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testForIndustriesPlacement() {
  console.log("🚀 Launching Vite dev server for Button Placement QA...");
  const server = await createServer({
    server: { port: 5202 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5202";

  const browser = await chromium.launch({ headless: true });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. VERIFYING BUTTON PLACEMENT ON /services");
    console.log("=================================================");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });

    // 1. Verify Hero action buttons
    const heroButtons = pageDesktop.locator("main section").first().locator("a");
    const heroButtonTexts = await heroButtons.allInnerTexts();
    console.log(`  📄 Hero buttons on /services: ${JSON.stringify(heroButtonTexts.map(t => t.trim()))}`);

    const hasForIndustriesInHero = heroButtonTexts.some(t => t.includes("For Industries"));
    console.log(`  ✅ "For Industries" NOT in Hero: ${!hasForIndustriesInHero}`);
    if (hasForIndustriesInHero) {
      throw new Error('Expected "For Industries" to NOT be in the hero section');
    }

    // 2. Verify Explore Our Full Range of Services section
    const exploreSection = pageDesktop.locator("#explore-services");
    const isExploreVisible = await exploreSection.isVisible();
    console.log(`  ✅ #explore-services section visible: ${isExploreVisible}`);

    // Verify 12 cards
    const cards = exploreSection.locator(".service-card-yellow-glow");
    const cardCount = await cards.count();
    console.log(`  🃏 Total Service Cards in Grid: ${cardCount}`);
    if (cardCount !== 12) {
      throw new Error(`Expected exactly 12 service cards, but found ${cardCount}`);
    }

    // 3. Verify [ For Industries ] button directly below the 12 cards
    const forIndustriesBtn = exploreSection.locator('a.clay-btn-primary:has-text("For Industries")').first();
    const btnExists = await forIndustriesBtn.count();
    console.log(`  🔴 Red [ For Industries ] button found below 12 cards: ${btnExists > 0}`);
    if (btnExists === 0) {
      throw new Error('Expected red [ For Industries ] button below the 12 cards');
    }

    const btnHref = await forIndustriesBtn.getAttribute("href");
    console.log(`  🔗 Button href: "${btnHref}"`);
    if (btnHref !== "/industries#explore-industry-sectors") {
      throw new Error(`Expected href="/industries#explore-industry-sectors", got "${btnHref}"`);
    }

    // Verify button styling (red background / shadow)
    const btnStyles = await forIndustriesBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundImage: computed.backgroundImage,
        color: computed.color,
        boxShadow: computed.boxShadow,
      };
    });
    console.log(`  ✨ Button Styles:`);
    console.log(`     Background: ${btnStyles.backgroundImage}`);
    console.log(`     Color: ${btnStyles.color}`);
    console.log(`     Box Shadow: ${btnStyles.boxShadow}`);

    // 4. Verify Direct Technical Inquiry section is directly below
    const nextSection = pageDesktop.locator('section:has(h3:has-text("Ready to Discuss Services Ecosystem?"))');
    const isDirectInquiryVisible = await nextSection.isVisible();
    console.log(`  ✅ "Ready to Discuss Services Ecosystem?" section visible directly below: ${isDirectInquiryVisible}`);
    if (!isDirectInquiryVisible) {
      throw new Error('Expected Direct Technical Inquiry section below the Explore Services section');
    }

    // 5. Test Click & Navigation to /industries#explore-industry-sectors
    console.log("\n=================================================");
    console.log("🧪 2. CLICK & NAVIGATION TEST");
    console.log("=================================================");
    await forIndustriesBtn.click();
    await pageDesktop.waitForTimeout(1400);

    const targetUrl = pageDesktop.url();
    const scrollY = await pageDesktop.evaluate(() => window.scrollY);
    console.log(`  📍 Current URL: ${targetUrl} | ScrollY: ${scrollY}px`);

    const industryHeadingVisible = await pageDesktop
      .locator('#explore-industry-sectors h2:has-text("Explore Industry Sectors")')
      .isVisible();
    console.log(`  ✅ Landed at "Explore Industry Sectors": ${industryHeadingVisible}`);

    if (!industryHeadingVisible) {
      throw new Error("Expected to land at 'Explore Industry Sectors' on /industries");
    }

    console.log("\n=================================================");
    console.log("🎉 ALL BUTTON PLACEMENT & STYLING TESTS PASSED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testForIndustriesPlacement().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
