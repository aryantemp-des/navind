import { chromium } from "playwright";

async function runMobileSuite() {
  console.log("🚀 Starting Comprehensive Mobile & Responsive Verification Suite...");
  const browser = await chromium.launch({ headless: true });

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failedTests++;
    }
  }

  // TEST 1: Mobile Navigation Drawer on iPhone (375x667)
  console.log("\n--- TEST 1: Mobile Navigation Drawer (375px) ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(500);

  // Check hamburger button visibility
  const hamburger = mobilePage.locator("header button[aria-label='Open menu']");
  assert(await hamburger.isVisible(), "Hamburger button is visible on mobile (375px)");

  // Check desktop nav is hidden
  const desktopNav = mobilePage.locator("header nav.clay-pill-nav");
  assert(!(await desktopNav.isVisible()), "Desktop pill nav is hidden on mobile (375px)");

  // Click hamburger to open drawer
  await hamburger.click();
  await mobilePage.waitForTimeout(400);

  const drawer = mobilePage.locator("#mobile-nav-drawer");
  assert(await drawer.isVisible(), "Mobile navigation drawer opened");

  // Check drawer phone number
  const drawerPhone = drawer.locator("a[href='tel:+919355412903']");
  assert(await drawerPhone.isVisible(), "Company phone (+91 93554 12903) is visible in mobile drawer");

  // Check drawer WhatsApp
  const drawerWhatsApp = drawer.locator("a[href*='wa.me/919355412903']");
  assert(await drawerWhatsApp.isVisible(), "WhatsApp link is visible in mobile drawer");

  // Test accordion expansion (Services)
  const servicesBtn = drawer.locator("button:has-text('Services & Capabilities')");
  assert(await servicesBtn.isVisible(), "Services accordion trigger exists");
  
  // Check that AEO, SEO, and GEO links exist inside
  const aeoLink = drawer.locator("a[href='/services/aeo']");
  assert(await aeoLink.isVisible(), "AEO service link is visible inside Services accordion");

  const seoLink = drawer.locator("a[href='/services/seo']");
  assert(await seoLink.isVisible(), "SEO service link is visible inside Services accordion");

  const geoLink = drawer.locator("a[href='/services/geo']");
  assert(await geoLink.isVisible(), "GEO service link is visible inside Services accordion");

  // Test closing drawer via close button
  const closeBtn = drawer.locator("button[aria-label='Close menu']");
  await closeBtn.click();
  await mobilePage.waitForTimeout(400);
  assert(!(await drawer.isVisible()), "Mobile drawer closed via Close button");

  await mobileContext.close();

  // TEST 2: Tablet Navigation on iPad Portrait (768x1024)
  console.log("\n--- TEST 2: Tablet Navigation (768px iPad Portrait) ---");
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await tabletPage.waitForTimeout(500);

  const tabletHamburger = tabletPage.locator("header button[aria-label='Open menu']");
  assert(await tabletHamburger.isVisible(), "Hamburger button is visible on tablet portrait (768px)");

  const tabletQuoteCta = tabletPage.locator("header div.lg\\:hidden a[href='/pricing']");
  assert(await tabletQuoteCta.isVisible(), "Quote CTA is visible on tablet header");

  await tabletHamburger.click();
  await tabletPage.waitForTimeout(400);
  const tabletDrawer = tabletPage.locator("#mobile-nav-drawer");
  assert(await tabletDrawer.isVisible(), "Navigation drawer opens on tablet (768px)");

  await tabletContext.close();

  // TEST 3: Desktop Navigation (1280x800)
  console.log("\n--- TEST 3: Desktop Navigation (1280px) ---");
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await desktopPage.waitForTimeout(500);

  const desktopPillNav = desktopPage.locator("header nav.clay-pill-nav");
  assert(await desktopPillNav.isVisible(), "Desktop pill nav is visible on 1280px");

  const desktopHamburger = desktopPage.locator("header button[aria-label='Open menu']");
  assert(!(await desktopHamburger.isVisible()), "Hamburger button is hidden on desktop (1280px)");

  await desktopContext.close();

  // TEST 4: Viewport Overflow on Small Mobile (320px)
  console.log("\n--- TEST 4: Zero Overflow on Small Mobile (320px) ---");
  const smallContext = await browser.newContext({
    viewport: { width: 320, height: 568 },
  });
  const smallPage = await smallContext.newPage();

  const keyRoutes = ["/", "/services", "/pricing", "/contact", "/get-started"];
  for (const route of keyRoutes) {
    await smallPage.goto(`http://localhost:5173${route}`, { waitUntil: "domcontentloaded" });
    await smallPage.waitForTimeout(400);

    const hasOverflow = await smallPage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });
    assert(!hasOverflow, `Route ${route} has ZERO horizontal overflow on 320px`);
  }
  await smallContext.close();

  await browser.close();

  console.log("\n================ TEST SUMMARY ================");
  console.log(`Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
  if (failedTests > 0) {
    process.exit(1);
  }
}

runMobileSuite();
