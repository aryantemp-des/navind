import { chromium } from "playwright";
import { allSubpages, getAllSubpageRoutes } from "../src/config/subpages/index";

async function runQA() {
  console.log("🚀 Starting Playwright QA on Navya Tech Industry...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const BASE_URL = "http://localhost:5173";
  const routes = ["/", ...getAllSubpageRoutes()];

  console.log(`Auditing ${routes.length} total pages against localhost dev server...`);

  let failures = 0;

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const targetUrl = `${BASE_URL}${route}`;

    try {
      const response = await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 10000 });
      const status = response ? response.status() : 0;

      // Check title
      const title = await page.title();
      if (!title || title.length === 0) {
        console.error(`❌ [${route}] Missing document.title`);
        failures++;
      }

      // Check H1
      const h1Count = await page.locator("h1").count();
      if (h1Count === 0) {
        console.error(`❌ [${route}] Missing H1 element`);
        failures++;
      }

      // Check Start Project button existence
      const startProjectBtn = await page.locator("text=/Start Project|Start a Project/i").count();
      if (startProjectBtn === 0) {
        console.error(`❌ [${route}] Missing Start Project CTA`);
        failures++;
      }

      // Check Footer text
      const footerText = await page.locator("footer").innerText();
      if (!footerText.includes("Crafted with ❤️ in Navya Tech Industry")) {
        console.error(`❌ [${route}] Footer missing 'Crafted with ❤️ in Navya Tech Industry'`);
        failures++;
      }

      console.log(`✅ [${i + 1}/${routes.length}] ${route} loaded OK (Title: "${title.slice(0, 30)}...")`);
    } catch (err: any) {
      console.error(`❌ [${route}] Page failed to render: ${err.message}`);
      failures++;
    }
  }

  // Mobile Viewport Test on /build-website
  console.log("\n📱 Testing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/build-website`, { waitUntil: "domcontentloaded" });
  
  const mobileHeader = await page.locator("header").isVisible();
  
  // Scroll down to trigger sticky CTA
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  
  const mobileCta = await page.locator("text=/Start Project/i").first().isVisible();
  console.log(`📱 Mobile Header Visible: ${mobileHeader} | CTA Visible: ${mobileCta}`);

  await browser.close();

  if (failures > 0) {
    console.error(`\n❌ QA Completed with ${failures} failure(s).`);
    process.exit(1);
  } else {
    console.log(`\n🎉 QA Verification Passed! All ${routes.length} pages verified with 0 errors.`);
  }
}

runQA();
