import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testBackToServicesFlow() {
  console.log("🚀 Launching Vite dev server for Back to Services QA...");
  const server = await createServer({
    server: { port: 5204 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5204";

  const browser = await chromium.launch({ headless: true });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP ROUNDTRIP FLOW TEST (1440x900)");
    console.log("=================================================");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Step 1: Start at /services
    await page.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const servicesH1 = await page.locator("h1").first().innerText();
    console.log(`  📄 1. On /services | H1: "${servicesH1}"`);
    if (!servicesH1.includes("Services Ecosystem")) {
      throw new Error(`Expected Services Ecosystem H1, got: "${servicesH1}"`);
    }

    // Step 2: Click [ For Industries ] below 12 service cards
    const forIndustriesBtn = page.locator('#explore-services a.clay-btn-primary:has-text("For Industries")').first();
    console.log(`  🔴 Found [ For Industries ] button on /services`);
    await forIndustriesBtn.click();
    await page.waitForTimeout(1400);

    // Step 3: Verify we are at /industries#explore-industry-sectors
    console.log(`  📍 2. Navigated to: ${page.url()}`);
    if (!page.url().includes("/industries")) {
      throw new Error(`Expected /industries URL, got: "${page.url()}"`);
    }

    const industryHeading = page.locator('#explore-industry-sectors h2:has-text("Explore Industry Sectors")');
    const isHeadingVisible = await industryHeading.isVisible();
    console.log(`  ✅ "Explore Industry Sectors" heading visible: ${isHeadingVisible}`);
    if (!isHeadingVisible) {
      throw new Error('Expected "Explore Industry Sectors" heading to be visible');
    }

    // Step 4: Verify 11 industry cards exist
    const industryCards = page.locator("#explore-industry-sectors .service-card-yellow-glow");
    const industryCardCount = await industryCards.count();
    console.log(`  🃏 11 Industry Cards count: ${industryCardCount}/11`);
    if (industryCardCount !== 11) {
      throw new Error(`Expected 11 cards, got: ${industryCardCount}`);
    }

    // Step 5: Verify [ Back to Services ] button directly below 11 cards
    const backToServicesBtn = page.locator('#explore-industry-sectors a.clay-btn-primary:has-text("Back to Services")').first();
    const btnExists = await backToServicesBtn.count();
    console.log(`  🔴 Found red [ Back to Services ] button: ${btnExists > 0}`);
    if (btnExists === 0) {
      throw new Error('Expected red [ Back to Services ] button in #explore-industry-sectors');
    }

    const btnHref = await backToServicesBtn.getAttribute("href");
    console.log(`  🔗 Button href: "${btnHref}"`);
    if (btnHref !== "/services") {
      throw new Error(`Expected href="/services", got: "${btnHref}"`);
    }

    // Verify Direct Technical Inquiry section is directly below
    const inquirySection = page.locator('section:has(h3:has-text("Ready to Discuss Industries We Power?"))');
    const isInquiryVisible = await inquirySection.isVisible();
    console.log(`  ✅ "Ready to Discuss Industries We Power?" section visible directly below: ${isInquiryVisible}`);
    if (!isInquiryVisible) {
      throw new Error('Expected Direct Technical Inquiry section below Back to Services button');
    }

    // Step 6: Click [ Back to Services ]
    console.log(`  🖱️ Clicking [ Back to Services ]...`);
    await backToServicesBtn.click();
    await page.waitForTimeout(1400);

    // Step 7: Verify landed back on /services
    const returnUrl = page.url();
    const returnH1 = await page.locator("h1").first().innerText();
    console.log(`  📍 3. Returned to: ${returnUrl} | H1: "${returnH1}"`);
    if (!returnUrl.includes("/services") || !returnH1.includes("Services Ecosystem")) {
      throw new Error(`Expected return to /services with Services Ecosystem H1, got URL: "${returnUrl}", H1: "${returnH1}"`);
    }

    // -------------------------------------------------------------
    // TEST 2: MOBILE VIEWPORT VERIFICATION (390x844)
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. MOBILE ROUNDTRIP FLOW TEST (390x844)");
    console.log("=================================================");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await mobilePage.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });
    const mobileBackBtn = mobilePage.locator('#explore-industry-sectors a.clay-btn-primary:has-text("Back to Services")').first();
    console.log(`  📱 Mobile [ Back to Services ] found: ${await mobileBackBtn.count() > 0}`);

    const mobileHasOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`  📱 Mobile Horizontal Overflow: ${mobileHasOverflow ? "❌ DETECTED" : "✅ NONE"}`);
    if (mobileHasOverflow) {
      throw new Error("Horizontal overflow detected on mobile");
    }

    await mobileBackBtn.click();
    await mobilePage.waitForTimeout(1400);

    console.log(`  📱 Mobile Navigated to: ${mobilePage.url()}`);
    if (!mobilePage.url().includes("/services")) {
      throw new Error(`Expected /services on mobile click, got "${mobilePage.url()}"`);
    }

    console.log("\n=================================================");
    console.log("🎉 COMPLETE SERVICES ⇄ INDUSTRIES FLOW VERIFIED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testBackToServicesFlow().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
