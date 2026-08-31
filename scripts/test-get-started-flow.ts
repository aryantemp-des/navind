import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testGetStartedFlow() {
  console.log("🚀 Launching Vite dev server for Get Started -> Services Ecosystem QA...");
  const server = await createServer({
    server: { port: 5198 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5198";

  const browser = await chromium.launch({ headless: true });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP VIEWPORT TEST (1440x900)");
    console.log("=================================================");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await pageDesktop.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });
    const initialH1 = await pageDesktop.locator("h1").first().innerText();
    console.log(`  📄 Initial Page: /get-started | H1: "${initialH1}"`);

    // Verify Start Project button in Hero section
    const startProjectBtn = pageDesktop.locator('main a.clay-btn-primary:has-text("Start Project")').first();
    const btnHref = await startProjectBtn.getAttribute("href");
    console.log(`  🔗 Hero "Start Project" button href: "${btnHref}"`);

    if (btnHref !== "/services") {
      throw new Error(`Expected href="/services", but got "${btnHref}"`);
    }

    // Click "Start Project"
    await startProjectBtn.click();
    await pageDesktop.waitForTimeout(500);

    const currentUrl = pageDesktop.url();
    const destH1 = await pageDesktop.locator("h1").first().innerText();
    const destCategory = await pageDesktop.locator(".clay-badge span").first().innerText();
    console.log(`  ✅ After Click URL: ${currentUrl}`);
    console.log(`  ✅ Destination Category: "${destCategory}"`);
    console.log(`  ✅ Destination H1: "${destH1}"`);

    if (!currentUrl.endsWith("/services")) {
      throw new Error(`Expected destination URL to end with "/services", got "${currentUrl}"`);
    }
    if (destH1 !== "Services Ecosystem") {
      throw new Error(`Expected destination H1 to be "Services Ecosystem", got "${destH1}"`);
    }

    console.log("\n=================================================");
    console.log("🧪 2. MOBILE VIEWPORT TEST (390x844)");
    console.log("=================================================");
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await pageMobile.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });
    const mobileInitialH1 = await pageMobile.locator("h1").first().innerText();
    console.log(`  📱 Mobile Initial Page: /get-started | H1: "${mobileInitialH1}"`);

    const mobileStartProjectBtn = pageMobile.locator('main a.clay-btn-primary:has-text("Start Project")').first();
    const mobileBtnHref = await mobileStartProjectBtn.getAttribute("href");
    console.log(`  🔗 Mobile Hero "Start Project" button href: "${mobileBtnHref}"`);
    
    if (mobileBtnHref !== "/services") {
      throw new Error(`Expected mobile href="/services", but got "${mobileBtnHref}"`);
    }

    await mobileStartProjectBtn.click();
    await pageMobile.waitForTimeout(500);

    const mobileCurrentUrl = pageMobile.url();
    const mobileDestH1 = await pageMobile.locator("h1").first().innerText();
    const mobileDestCategory = await pageMobile.locator(".clay-badge span").first().innerText();
    console.log(`  ✅ Mobile After Click URL: ${mobileCurrentUrl}`);
    console.log(`  ✅ Mobile Destination Category: "${mobileDestCategory}"`);
    console.log(`  ✅ Mobile Destination H1: "${mobileDestH1}"`);

    if (!mobileCurrentUrl.endsWith("/services")) {
      throw new Error(`Expected mobile URL to end with "/services", got "${mobileCurrentUrl}"`);
    }
    if (mobileDestH1 !== "Services Ecosystem") {
      throw new Error(`Expected mobile destination H1 to be "Services Ecosystem", got "${mobileDestH1}"`);
    }

    console.log("\n=================================================");
    console.log("🎉 GET STARTED -> SERVICES ECOSYSTEM FLOW VERIFIED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testGetStartedFlow().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
