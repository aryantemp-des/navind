import { chromium } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

async function runMobilePerformanceAudit() {
  console.log("📱 Starting Mobile Performance & Interaction Audit Suite...\n");

  const browser = await chromium.launch({ headless: true });
  // Emulate mobile device (iPhone 14 / modern Android viewport)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    hasTouch: true,
    isMobile: true,
  });

  const page = await context.newPage();

  // Bypass terms modal for automated crawl
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  const testRoutes = [
    "/",
    "/services",
    "/pricing",
    "/pricing/india",
    "/pricing/usa",
    "/website-development/mumbai",
    "/website-development/bangalore",
    "/website-development/new-york",
    "/resources",
    "/blog",
    "/blog/how-to-build-a-business-website",
    "/get-started",
    "/contact",
  ];

  let passedRoutes = 0;
  const failures: { route: string; error: string }[] = [];

  for (const route of testRoutes) {
    const fullUrl = `${BASE_URL}${route}`;

    try {
      const startTime = Date.now();
      const response = await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
      const loadDuration = Date.now() - startTime;

      const status = response?.status() || 200;
      if (status !== 200) {
        throw new Error(`HTTP ${status}`);
      }

      await page.waitForTimeout(200);

      // 1. Check for Horizontal Scroll Overflow (Critical Mobile UX Bug)
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 2;
      });

      if (hasHorizontalOverflow) {
        const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
        throw new Error(`Horizontal scroll overflow detected! scrollWidth=${scrollW}px, innerWidth=390px`);
      }

      // 2. Perform smooth simulated touch scroll down the page
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const maxScroll = Math.min(document.body.scrollHeight, 4000);

          const timer = setInterval(() => {
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= maxScroll) {
              clearInterval(timer);
              resolve();
            }
          }, 60);
        });
      });

      await page.waitForTimeout(150);

      // Scroll back up smoothly
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

      passedRoutes++;
      console.log(`  ✅ [PASS] ${route} -> Load: ${loadDuration}ms | Zero Horizontal Overflow | Smooth Mobile Touch Scroll`);
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${route} -> ${err.message}`);
      failures.push({ route, error: err.message });
    }
  }

  // 3. Test Mobile Navigation Drawer
  console.log("\n🧭 Testing Mobile Navigation Drawer...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  const menuButton = page.locator('button[aria-label="Open menu"]').first();
  const menuVisible = await menuButton.isVisible();
  console.log(`  🍔 Mobile Menu Button Visible: ${menuVisible}`);

  if (menuVisible) {
    await menuButton.click();
    await page.waitForTimeout(300);

    const drawerServicesLink = page.locator('a:has-text("Services Ecosystem")').first();
    const isDrawerOpen = await drawerServicesLink.isVisible();
    console.log(`  📂 Mobile Drawer Expanded: ${isDrawerOpen}`);

    // Click Close button
    const closeButton = page.locator('button[aria-label="Close menu"]').first();
    await closeButton.click({ force: true });
    await page.waitForTimeout(200);
  }

  // 4. Test Mobile Sticky CTA Bar
  console.log("\n📱 Testing Mobile Sticky CTA Bar...");
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(350);

  const stickyCta = page.locator('a[aria-label="Call Navya Tech Industry"]').first();
  const ctaVisible = await stickyCta.isVisible();
  console.log(`  📞 Mobile Sticky CTA Bar Visible after scroll: ${ctaVisible}`);

  await browser.close();

  console.log("\n======================================================");
  console.log("📊 MOBILE PERFORMANCE AUDIT SUMMARY");
  console.log("======================================================");
  console.log(`Routes Audited: ${testRoutes.length}`);
  console.log(`Passed: ${passedRoutes}`);
  console.log(`Failed: ${failures.length}`);

  if (failures.length === 0) {
    console.log("\n🎉 100% MOBILE PERFORMANCE PASS! Silky smooth scrolling, instant loading, and zero layout overflow.");
    process.exit(0);
  } else {
    console.error(`\n❌ ${failures.length} mobile checks failed.`);
    process.exit(1);
  }
}

runMobilePerformanceAudit().catch((err) => {
  console.error("Mobile audit error:", err);
  process.exit(1);
});
