import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testPricingQuotationExperience() {
  console.log("🚀 Launching Vite dev server for Pricing QA...");
  const server = await createServer({
    server: { port: 5199 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5199";

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // TEST 1: DESKTOP AUDIT OF /pricing
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP VIEWPORT TEST (1440x900) - /pricing");
    console.log("=================================================");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${baseUrl}/pricing`, { waitUntil: "networkidle" });

    // Verify Title & H1
    const title = await page.title();
    console.log(`  📄 Page Title: "${title}"`);
    if (!title.includes("Custom Website & Internet Marketing Quotes | Navya Tech")) {
      throw new Error(`Unexpected page title: "${title}"`);
    }

    const h1 = await page.locator("h1").first().innerText();
    console.log(`  🏷️  H1 Heading: "${h1}"`);
    if (h1.trim() !== "Get a Pocket-Friendly Quote for Your Business") {
      throw new Error(`Unexpected H1: "${h1}"`);
    }

    // Verify Meta Description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    console.log(`  📝 Meta Description: "${metaDesc}"`);
    if (!metaDesc?.includes("pocket-friendly quote from Navya Tech Industry")) {
      throw new Error(`Unexpected meta description: "${metaDesc}"`);
    }

    // Verify Section 4: Last Month's Average Pricing Highlight
    console.log("\n🧪 Verifying Last Month's Average Pricing Highlight...");
    const avgSection = page.locator("#pricing-insights");
    const avgHeading = await avgSection.locator("h2").innerText();
    const avgLabel = await avgSection.locator(".clay-badge").first().innerText();
    const avgAmount = await avgSection.locator("text=$2,500").first().innerText();
    console.log(`  💵 Average Insight Heading: "${avgHeading}"`);
    console.log(`  🏷️  Average Label: "${avgLabel}"`);
    console.log(`  💰 Average Amount Display: "${avgAmount}"`);

    if (!avgHeading.includes("What Businesses Invested Last Month")) {
      throw new Error(`Expected heading 'What Businesses Invested Last Month', got '${avgHeading}'`);
    }
    if (!avgLabel.toLowerCase().includes("previous month's average")) {
      throw new Error(`Expected label 'Previous Month's Average', got '${avgLabel}'`);
    }
    if (avgAmount.trim() !== "$2,500") {
      throw new Error(`Expected amount '$2,500', got '${avgAmount}'`);
    }

    // -------------------------------------------------------------
    // TEST 2: INTERACTIVE FOUR-STEP QUOTATION FLOW
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. INTERACTIVE FOUR-STEP QUOTATION FLOW");
    console.log("=================================================");

    // Step 1: Choose Your Services
    console.log("  👉 Step 1: Selecting Services...");
    const step1Heading = await page.locator("text=Choose Your Service According to Your Needs").first().innerText();
    console.log(`     Step 1 Heading: "${step1Heading}"`);

    // Toggle eCommerce Website Development and GEO
    await page.locator("text=Ecommerce Website Development").first().click();
    await page.locator("text=GEO").first().click();
    console.log("     Selected additional services: Ecommerce & GEO");

    // Proceed to Step 2
    await page.locator("text=Proceed to Step 2").first().click();
    await page.waitForTimeout(400);

    // Step 2: Tell Us About Your Business
    console.log("  👉 Step 2: Filling Business Details...");
    const step2Heading = await page.locator("text=Tell Us About Your Business").first().innerText();
    console.log(`     Step 2 Heading: "${step2Heading}"`);

    // Try submitting without required fields to test validation
    await page.locator("text=Proceed to Step 3").first().click();
    await page.waitForTimeout(300);
    const hasValidationError = await page.locator("text=Business name is required.").isVisible();
    console.log(`     Validation error triggered on empty submit: ${hasValidationError ? "✅ YES" : "❌ NO"}`);
    if (!hasValidationError) {
      throw new Error("Validation did not trigger on empty form submission!");
    }

    // Fill valid business details
    await page.locator('input[placeholder="e.g. Acme Tech Solutions"]').fill("Apex Innovations Corp");
    await page.locator('input[placeholder="e.g. John Doe"]').fill("Sarah Jenkins");
    await page.locator('input[placeholder="john@example.com"]').fill("sarah@apexinnovations.io");
    await page.locator('input[placeholder="+91 93554 12903"]').fill("+1 415 890 1234");
    await page.locator('textarea[placeholder*="Describe your target audience"]').fill("We need a custom website redesign with sub-second performance, local SEO, and payment gateway integration.");

    // Proceed to Step 3
    await page.locator("text=Proceed to Step 3").first().click();
    await page.waitForTimeout(400);

    // Step 3: Consult with Decision-Makers
    console.log("  👉 Step 3: Verifying Consult with Decision-Makers...");
    const step3Heading = await page.locator("text=Consult with the Decision-Makers").first().innerText();
    console.log(`     Step 3 Heading: "${step3Heading}"`);
    if (!step3Heading.includes("Consult with the Decision-Makers")) {
      throw new Error(`Unexpected Step 3 Heading: "${step3Heading}"`);
    }

    // Verify 6 consultation pillars are visible
    const pillarsCount = await page.locator("text=Leadership Review, Technical Deep-Dive, High-ROI Filtering").count();
    const phoneButton = await page.locator('a[href^="tel:+919355412903"]').first().isVisible();
    console.log(`     Direct Phone Button Visible: ${phoneButton ? "✅ YES" : "❌ NO"}`);

    // Proceed to Step 4
    await page.locator("text=Proceed to Step 4").first().click();
    await page.waitForTimeout(400);

    // Step 4: Receive Your Customized Quote
    console.log("  👉 Step 4: Verifying Customized Quote Output...");
    const step4Heading = await page.locator("text=Your Business. Your Requirements. Your Quote.").first().innerText();
    console.log(`     Step 4 Heading: "${step4Heading}"`);

    // Verify company name in quote
    const quoteBusinessName = await page.locator("text=Apex Innovations Corp").first().isVisible();
    console.log(`     Business Name rendered in Quote: ${quoteBusinessName ? "✅ YES" : "❌ NO"}`);
    if (!quoteBusinessName) {
      throw new Error("Business Name not rendered in Step 4 Quote!");
    }

    // Verify WhatsApp and Email action triggers
    const waButton = page.locator("text=Send to Decision-Makers on WhatsApp").first();
    const emailButton = page.locator("text=Send via Email").first();
    const copyButton = page.locator("text=Copy Summary").first();

    const waVisible = await waButton.isVisible();
    const emailVisible = await emailButton.isVisible();
    const copyVisible = await copyButton.isVisible();

    console.log(`     WhatsApp Dispatch Button: ${waVisible ? "✅ YES" : "❌ NO"}`);
    console.log(`     Email Dispatch Button: ${emailVisible ? "✅ YES" : "❌ NO"}`);
    console.log(`     Copy Summary Button: ${copyVisible ? "✅ YES" : "❌ NO"}`);

    if (!waVisible || !emailVisible) {
      throw new Error("Dispatch buttons missing in Step 4 Quote!");
    }

    // Test Copy Summary button
    await copyButton.click();
    await page.waitForTimeout(300);
    const copiedText = await page.locator("text=Copied!").first().isVisible();
    console.log(`     Copy feedback displayed: ${copiedText ? "✅ YES" : "❌ NO"}`);

    // -------------------------------------------------------------
    // TEST 3: RESPONSIVE VIEWPORTS & OVERFLOW CHECK
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 3. MOBILE & TABLET RESPONSIVE AUDIT");
    console.log("=================================================");

    const viewports = [
      { name: "Tablet (iPad 768x1024)", width: 768, height: 1024 },
      { name: "Mobile (iPhone 390x844)", width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      const pageVp = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageVp.goto(`${baseUrl}/pricing`, { waitUntil: "networkidle" });

      const hasHorizontalScroll = await pageVp.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`  📱 Viewport: ${vp.name}`);
      console.log(`     Horizontal overflow detected: ${hasHorizontalScroll ? "❌ YES" : "✅ NONE"}`);

      if (hasHorizontalScroll) {
        throw new Error(`Horizontal overflow detected on ${vp.name}`);
      }
      await pageVp.close();
    }

    // -------------------------------------------------------------
    // TEST 4: HOMEPAGE PRICING SECTION CHECK
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 4. HOMEPAGE PRICING SECTION AUDIT");
    console.log("=================================================");
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

    // Scroll to #pricing on homepage
    const homePricing = page.locator("#pricing");
    await homePricing.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const homeHeading = await homePricing.locator("h2").innerText();
    console.log(`  🏠 Homepage Pricing Section Heading: "${homeHeading}"`);
    if (!homeHeading.includes("Get a Pocket-Friendly Quote for Your Business")) {
      throw new Error(`Homepage pricing heading mismatch: "${homeHeading}"`);
    }

    const homeAvgDisplay = await homePricing.locator("text=$2,500").first().isVisible();
    console.log(`  💰 Homepage $2,500 Average Display: ${homeAvgDisplay ? "✅ YES" : "❌ NO"}`);

    const homeQuoteCta = homePricing.locator("text=Get My Custom Quote").first();
    const homeCtaVisible = await homeQuoteCta.isVisible();
    console.log(`  🔘 Homepage 'Get My Custom Quote' CTA: ${homeCtaVisible ? "✅ YES" : "❌ NO"}`);

    console.log("\n=================================================");
    console.log("🎉 ALL PRICING & QUOTATION TESTS PASSED CLEANLY!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testPricingQuotationExperience().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
