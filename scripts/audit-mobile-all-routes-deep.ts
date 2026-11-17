import { chromium } from "playwright";

const VIEWPORTS = [
  { name: "Extra-small mobile (320px)", width: 320, height: 568 },
  { name: "Small mobile (340px)", width: 340, height: 600 },
  { name: "Standard mobile (360px)", width: 360, height: 640 },
  { name: "iPhone SE (375px)", width: 375, height: 667 },
  { name: "iPhone 12/13/14 (390px)", width: 390, height: 844 },
  { name: "Large mobile (414px)", width: 414, height: 896 },
  { name: "iPhone Pro Max (430px)", width: 430, height: 932 },
  { name: "Small tablet (600px)", width: 600, height: 960 },
  { name: "Tablet portrait (768px)", width: 768, height: 1024 },
  { name: "Large tablet (820px)", width: 820, height: 1180 },
  { name: "Tablet landscape (1024px)", width: 1024, height: 768 },
  { name: "Desktop (1440px)", width: 1440, height: 900 },
];

const ROUTES = [
  "/",
  "/services",
  "/services/website-development",
  "/services/ecommerce-website-development",
  "/services/business-website-development",
  "/services/website-redesign",
  "/services/web-app-development",
  "/services/internet-marketing-bundle",
  "/services/seo",
  "/services/geo",
  "/services/aeo",
  "/industries",
  "/industries/saas",
  "/industries/real-estate",
  "/industries/healthcare",
  "/industries/ecommerce",
  "/industries/professional-services",
  "/industries/education",
  "/industries/technology",
  "/industries/small-business",
  "/industries/restaurants",
  "/industries/consulting",
  "/internet-marketing-company-india",
  "/internet-marketing-company-maharashtra",
  "/internet-marketing-company-mumbai",
  "/internet-marketing-company-pune",
  "/internet-marketing-company-uttar-pradesh",
  "/internet-marketing-company-bareilly",
  "/internet-marketing-company-delhi",
  "/pricing",
  "/contact",
  "/get-started",
  "/request-a-quote",
  "/book-a-call",
  "/blog",
  "/resources",
  "/privacy-policy",
  "/terms",
  "/404-nonexistent-page",
];

async function runDeepAudit() {
  console.log("🚀 Starting Comprehensive Mobile & Tablet Responsive Audit...");
  console.log(`Routes to audit: ${ROUTES.length}`);
  console.log(`Viewports to test: ${VIEWPORTS.length}`);

  const browser = await chromium.launch({ headless: true });
  const allIssues: { route: string; viewport: string; overflow: number; offendingElements: string[] }[] = [];

  // 1. Horizontal overflow testing across all routes & viewports
  for (const vp of VIEWPORTS) {
    console.log(`\n🔍 Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15",
    });
    const page = await context.newPage();

    let passedRoutes = 0;
    for (const route of ROUTES) {
      try {
        await page.goto(`http://localhost:5173${route}`, { waitUntil: "domcontentloaded", timeout: 10000 });
        await page.waitForTimeout(400); // allow hydration & layout calculations

        const result = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const windowWidth = window.innerWidth;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasOverflow = scrollWidth > windowWidth + 1;

          let offenders: string[] = [];
          if (hasOverflow) {
            const allElements = document.querySelectorAll("*");
            for (const el of Array.from(allElements)) {
              const rect = el.getBoundingClientRect();
              if (rect.right > windowWidth + 2) {
                const tag = el.tagName.toLowerCase();
                const cls = (el.className && typeof el.className === "string") ? el.className.slice(0, 40) : "";
                offenders.push(`${tag}.${cls.trim().replace(/\s+/g, ".")} [right: ${Math.round(rect.right)}px vs ${windowWidth}px]`);
              }
            }
          }
          return {
            hasOverflow,
            scrollWidth,
            windowWidth,
            diff: scrollWidth - windowWidth,
            offenders: offenders.slice(0, 3),
          };
        });

        if (result.hasOverflow) {
          console.warn(`   ⚠️ Overflow on ${route}: +${result.diff}px (scroll: ${result.scrollWidth}px vs win: ${result.windowWidth}px)`);
          allIssues.push({
            route,
            viewport: vp.name,
            overflow: result.diff,
            offendingElements: result.offenders,
          });
        } else {
          passedRoutes++;
        }
      } catch (err: any) {
        console.error(`   ❌ Failed loading ${route}: ${err.message}`);
      }
    }
    console.log(`   ✅ Passed: ${passedRoutes}/${ROUTES.length} routes with ZERO horizontal overflow.`);
    await context.close();
  }

  // 2. Mobile Navigation Drawer Interaction Test (375x667)
  console.log("\n📱 Testing Mobile Navigation Drawer Interaction (375x667)...");
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(600);

  // Open drawer
  const hamburger = mobilePage.locator('button[aria-label="Open menu"]');
  const isHamburgerVisible = await hamburger.isVisible();
  console.log(`- Hamburger menu visible: ${isHamburgerVisible}`);
  if (isHamburgerVisible) {
    await hamburger.click();
    await mobilePage.waitForTimeout(400);

    // Check body overflow lock
    const bodyOverflow = await mobilePage.evaluate(() => document.body.style.overflow);
    console.log(`- Body scroll lock applied: ${bodyOverflow === "hidden"}`);

    // Check close button
    const closeBtn = mobilePage.locator('button[aria-label="Close menu"]').first();
    const isCloseVisible = await closeBtn.isVisible();
    console.log(`- Drawer close button visible: ${isCloseVisible}`);

    // Check phone links in drawer
    const phoneLinks = await mobilePage.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href^="tel:"]'));
      return links.map(a => a.getAttribute("href"));
    });
    console.log(`- Telephony links in drawer: ${JSON.stringify(phoneLinks)}`);

    // Test close via Esc key
    await mobilePage.keyboard.press("Escape");
    await mobilePage.waitForTimeout(300);
    const drawerStillOpen = await mobilePage.locator('#mobile-nav-drawer').isVisible();
    console.log(`- Drawer closed via Escape key: ${!drawerStillOpen}`);

    const bodyOverflowAfterClose = await mobilePage.evaluate(() => document.body.style.overflow);
    console.log(`- Body scroll restored after close: ${bodyOverflowAfterClose === ""}`);
  }

  // 3. Floating Chatbot vs Sticky Mobile CTA Spacing Test (375x667)
  console.log("\n💬 Testing Chatbot & Sticky Mobile CTA Non-Obstruction (375x667)...");
  await mobilePage.evaluate(() => window.scrollTo(0, 800)); // Scroll down to trigger sticky CTA
  await mobilePage.waitForTimeout(600);

  const stickyCTA = mobilePage.locator('a[href="/pricing"]').filter({ hasText: "Get a Quote" });
  const isStickyVisible = await stickyCTA.first().isVisible();
  console.log(`- Sticky Mobile CTA visible upon scroll: ${isStickyVisible}`);

  const chatbotButton = mobilePage.locator('button[aria-label="Open chatbot"]');
  const isChatbotVisible = await chatbotButton.isVisible();
  console.log(`- Floating Chatbot button visible: ${isChatbotVisible}`);

  if (isStickyVisible && isChatbotVisible) {
    const stickyBox = await stickyCTA.first().boundingBox();
    const chatbotBox = await chatbotButton.boundingBox();
    if (stickyBox && chatbotBox) {
      console.log(`- Sticky CTA bounding box: y=${Math.round(stickyBox.y)}, height=${Math.round(stickyBox.height)}`);
      console.log(`- Chatbot bounding box: y=${Math.round(chatbotBox.y)}, bottom=${Math.round(chatbotBox.y + chatbotBox.height)}`);
      const noOverlap = (chatbotBox.y + chatbotBox.height) <= stickyBox.y;
      console.log(`- Chatbot sits ABOVE Sticky Mobile CTA without overlap: ${noOverlap}`);
    }
  }

  await mobileContext.close();
  await browser.close();

  console.log("\n================ AUDIT SUMMARY ================");
  console.log(`Total horizontal overflow issues detected: ${allIssues.length}`);
  if (allIssues.length === 0) {
    console.log("🎉 ALL ROUTES & VIEWPORTS PASSED WITH ZERO HORIZONTAL OVERFLOW!");
  } else {
    for (const issue of allIssues) {
      console.log(`- [${issue.viewport}] ${issue.route}: +${issue.overflow}px (${issue.offendingElements.join(", ")})`);
    }
  }
}

runDeepAudit().catch((err) => {
  console.error("Deep audit error:", err);
  process.exit(1);
});
