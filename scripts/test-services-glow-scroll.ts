import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testServicesGlowAndScroll() {
  console.log("🚀 Launching Vite dev server for Services Glow & Scroll QA...");
  const server = await createServer({
    server: { port: 5197 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5197";

  const browser = await chromium.launch({ headless: true });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP VIEWPORT TEST (1440x900)");
    console.log("=================================================");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await pageDesktop.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const pageH1 = await pageDesktop.locator("h1").first().innerText();
    console.log(`  📄 Page: /services | H1: "${pageH1}"`);

    // Verify Services button in Hero
    const servicesBtn = pageDesktop.locator('main a.clay-btn-primary:has-text("Services")').first();
    const btnHref = await servicesBtn.getAttribute("href");
    const btnText = await servicesBtn.innerText();
    console.log(`  🔗 Hero button text: "${btnText.trim()}" | href: "${btnHref}"`);

    if (btnHref !== "#explore-services") {
      throw new Error(`Expected href="#explore-services", but got "${btnHref}"`);
    }

    const initialScrollY = await pageDesktop.evaluate(() => window.scrollY);
    console.log(`  📏 Initial Scroll Y: ${initialScrollY}px`);

    // Click "Services"
    await servicesBtn.click();
    await pageDesktop.waitForTimeout(1200); // Allow smooth scroll animation to finish

    const afterScrollY = await pageDesktop.evaluate(() => window.scrollY);
    console.log(`  📏 After Click Scroll Y: ${afterScrollY}px`);

    if (afterScrollY <= 100) {
      throw new Error(`Expected page to smooth-scroll down, but scrollY is only ${afterScrollY}px`);
    }

    // Verify the "Explore Our Full Range of Services" section is in view
    const sectionHeading = pageDesktop.locator('#explore-services h2:has-text("Explore Our Full Range of Services")');
    const isHeadingVisible = await sectionHeading.isVisible();
    console.log(`  ✅ "Explore Our Full Range of Services" heading visible: ${isHeadingVisible}`);

    if (!isHeadingVisible) {
      throw new Error(`Expected "Explore Our Full Range of Services" heading to be visible in viewport`);
    }

    console.log("\n=================================================");
    console.log("🧪 2. VERIFYING 12 SERVICE CARDS YELLOW GLOW");
    console.log("=================================================");
    const cards = pageDesktop.locator("#explore-services .service-card-yellow-glow");
    const cardCount = await cards.count();
    console.log(`  🃏 Found ${cardCount} cards with .service-card-yellow-glow class`);

    if (cardCount !== 12) {
      throw new Error(`Expected exactly 12 cards with .service-card-yellow-glow, but found ${cardCount}`);
    }

    // Check computed styles on first card
    const firstCard = cards.first();
    const cardStyles = await firstCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderColor: computed.borderColor,
        boxShadow: computed.boxShadow,
      };
    });

    console.log(`  ✨ Resting State Styles:`);
    console.log(`     Border Color: ${cardStyles.borderColor}`);
    console.log(`     Box Shadow: ${cardStyles.boxShadow}`);

    // Verify box shadow has yellow/amber components
    const hasYellowGlow =
      cardStyles.boxShadow.includes("234, 179, 8") ||
      cardStyles.boxShadow.includes("250, 204, 21") ||
      cardStyles.boxShadow.includes("254, 240, 138") ||
      cardStyles.borderColor.includes("234, 179, 8") ||
      cardStyles.borderColor.includes("250, 204, 21");

    console.log(`  ✅ Yellow Glow & Border Verified: ${hasYellowGlow}`);
    if (!hasYellowGlow) {
      throw new Error("Yellow glow / border color not detected in computed styles");
    }

    // Test hover state
    await firstCard.hover();
    await pageDesktop.waitForTimeout(350);

    const hoveredStyles = await firstCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderColor: computed.borderColor,
        boxShadow: computed.boxShadow,
      };
    });

    console.log(`  ✨ Hover State Styles:`);
    console.log(`     Hovered Border Color: ${hoveredStyles.borderColor}`);
    console.log(`     Hovered Box Shadow: ${hoveredStyles.boxShadow}`);

    console.log("\n=================================================");
    console.log("🧪 3. MOBILE VIEWPORT TEST (390x844)");
    console.log("=================================================");
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await pageMobile.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const mobileServicesBtn = pageMobile.locator('main a.clay-btn-primary:has-text("Services")').first();
    const mobileBtnHref = await mobileServicesBtn.getAttribute("href");
    const mobileBtnText = await mobileServicesBtn.innerText();
    console.log(`  📱 Mobile Hero button text: "${mobileBtnText.trim()}" | href: "${mobileBtnHref}"`);

    const mobileInitialScrollY = await pageMobile.evaluate(() => window.scrollY);
    await mobileServicesBtn.click();
    await pageMobile.waitForTimeout(1000);

    const mobileAfterScrollY = await pageMobile.evaluate(() => window.scrollY);
    console.log(`  📱 Mobile Scroll Y: ${mobileInitialScrollY}px -> ${mobileAfterScrollY}px`);

    if (mobileAfterScrollY <= 100) {
      throw new Error(`Expected mobile page to scroll down, but scrollY is ${mobileAfterScrollY}px`);
    }

    const mobileCards = pageMobile.locator("#explore-services .service-card-yellow-glow");
    const mobileCardCount = await mobileCards.count();
    console.log(`  📱 Mobile Found ${mobileCardCount}/12 cards with .service-card-yellow-glow`);

    if (mobileCardCount !== 12) {
      throw new Error(`Expected 12 yellow-glow cards on mobile, got ${mobileCardCount}`);
    }

    console.log("\n=================================================");
    console.log("🎉 ALL SERVICES GLOW & SCROLL TESTS PASSED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testServicesGlowAndScroll().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
