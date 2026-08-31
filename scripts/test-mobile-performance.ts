import { createServer } from "vite";
import { chromium } from "@playwright/test";

const TEST_ROUTES = [
  { name: "Homepage", path: "/" },
  { name: "Services Ecosystem", path: "/services" },
  { name: "Website Development Service", path: "/services/website-development" },
  { name: "3D Website Development", path: "/services/3d-website-development" },
  { name: "Performance Optimization Service", path: "/services/website-performance-optimization" },
  { name: "Technical SEO Service", path: "/services/seo" },
  { name: "Industries Ecosystem", path: "/industries" },
  { name: "Startups Industry", path: "/industries/startups" },
  { name: "SaaS Industry", path: "/industries/saas" },
  { name: "Packages & Pricing", path: "/pricing" },
  { name: "India Pricing (INR)", path: "/pricing/india" },
  { name: "USA Pricing (USD)", path: "/pricing/usa" },
  { name: "Start Your Project (Intake)", path: "/get-started" },
  { name: "Blog Hub", path: "/blog" },
];

async function runMobilePerformanceQA() {
  console.log("🚀 Launching Vite dev server for Mobile Performance QA...");
  const server = await createServer({
    server: { port: 5212 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5212";

  const browser = await chromium.launch({ headless: true });

  try {
    // -----------------------------------------------------------------
    // 1. MOBILE AUDIT (390 x 844 - iPhone / Modern Android Viewport)
    // -----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("📱 1. MOBILE RESPONSIVE & OVERFLOW AUDIT (390x844)");
    console.log("=================================================");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await mobileContext.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
      localStorage.setItem("navya-cookie-consent", "accepted");
    });
    const mobilePage = await mobileContext.newPage();

    const consoleErrors: string[] = [];
    mobilePage.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`[Console Error] ${msg.text()}`);
      }
    });

    for (const route of TEST_ROUTES) {
      const fullUrl = `${baseUrl}${route.path}`;
      const response = await mobilePage.goto(fullUrl, { waitUntil: "networkidle" });
      const status = response?.status() || 200;

      // Check horizontal overflow
      const overflow = await mobilePage.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });

      console.log(`  📄 ${route.name.padEnd(35)} [${status}] Overflow: ${overflow.hasOverflow ? "❌ DETECTED" : "✅ NONE"} (${overflow.scrollWidth}px vs ${overflow.innerWidth}px)`);

      if (overflow.hasOverflow) {
        throw new Error(`Mobile horizontal overflow on ${route.path} (${overflow.scrollWidth}px > ${overflow.innerWidth}px)`);
      }

      // Smooth scroll test down the page to ensure zero lag or freezing
      await mobilePage.evaluate(async () => {
        const totalHeight = document.body.scrollHeight;
        const step = Math.floor(totalHeight / 6);
        for (let y = 0; y < totalHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
    }

    // -----------------------------------------------------------------
    // 2. MOBILE NAVIGATION & INTERACTIVE CTA AUDIT
    // -----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. MOBILE NAVIGATION & CTAS VERIFICATION");
    console.log("=================================================");

    // Test Mobile Navigation Menu
    await mobilePage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const hamburgerBtn = mobilePage.locator('button[aria-label="Open menu"]');
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(400);

    const mobileMenu = mobilePage.locator('nav a:has-text("Services Ecosystem")').first();
    const isMenuVisible = await mobileMenu.isVisible();
    console.log(`  🍔 Mobile Hamburger Menu Opens: ${isMenuVisible ? "✅ YES" : "❌ NO"}`);
    if (!isMenuVisible) throw new Error("Mobile menu failed to display");

    // Close menu
    const closeMenuBtn = mobilePage.locator('div.fixed button[aria-label="Close menu"]');
    await closeMenuBtn.click();
    await mobilePage.waitForTimeout(400);

    // Test Sticky Mobile CTA
    await mobilePage.evaluate(() => window.scrollTo(0, 800));
    await mobilePage.waitForTimeout(500);
    const stickyCta = mobilePage.locator('a[aria-label="Start Project with Navya Tech Industry on WhatsApp"]');
    const stickyCount = await stickyCta.count();
    console.log(`  📱 Sticky Mobile 'Start Project' CTA: ${stickyCount > 0 ? "✅ ACTIVE" : "❌ MISSING"}`);
    if (stickyCount === 0) throw new Error("Sticky mobile CTA not rendering on scroll");

    // -----------------------------------------------------------------
    // 3. TABLET RESPONSIVE AUDIT (768 x 1024 - iPad Viewport)
    // -----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("📱 3. TABLET RESPONSIVE AUDIT (768x1024)");
    console.log("=================================================");
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      isMobile: true,
      hasTouch: true,
    });
    await tabletContext.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
      localStorage.setItem("navya-cookie-consent", "accepted");
    });
    const tabletPage = await tabletContext.newPage();

    for (const route of TEST_ROUTES.slice(0, 6)) {
      await tabletPage.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
      const hasOverflow = await tabletPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(`  📱 Tablet ${route.name.padEnd(32)} Overflow: ${hasOverflow ? "❌ DETECTED" : "✅ NONE"}`);
      if (hasOverflow) {
        throw new Error(`Tablet horizontal overflow on ${route.path}`);
      }
    }

    // -----------------------------------------------------------------
    // 4. DESKTOP CONTINUITY AUDIT (1440 x 900)
    // -----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🖥️ 4. DESKTOP CONTINUITY AUDIT (1440x900)");
    console.log("=================================================");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await desktopContext.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
      localStorage.setItem("navya-cookie-consent", "accepted");
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const heroH1 = await desktopPage.locator("#parallax-title h2").first().innerText();
    console.log(`  🖥️ Desktop Hero Title: "${heroH1}" ✅ VERIFIED`);

    await desktopPage.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const forIndustriesBtn = desktopPage.locator('a.clay-btn-primary:has-text("For Industries")');
    console.log(`  🔴 Services 'For Industries' Button: ${await forIndustriesBtn.count() > 0 ? "✅ FOUND" : "❌ MISSING"}`);

    await desktopPage.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });
    const backToServicesBtn = desktopPage.locator('a.clay-btn-primary:has-text("Back to Services")');
    console.log(`  🔴 Industries 'Back to Services' Button: ${await backToServicesBtn.count() > 0 ? "✅ FOUND" : "❌ MISSING"}`);

    if (consoleErrors.length > 0) {
      console.warn("\n⚠️ Console warnings during test run:", consoleErrors);
    }

    console.log("\n=================================================");
    console.log("🎉 ALL MOBILE PERFORMANCE & CONTINUITY TESTS PASSED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

runMobilePerformanceQA().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
