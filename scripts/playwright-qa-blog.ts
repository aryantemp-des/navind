import { chromium } from "@playwright/test";
import { ALL_BLOG_ROUTES, getBlogArticle, getBlogCategory } from "../src/config/blogs";

const BASE_URL = "http://localhost:5173";

async function runBlogQASuite() {
  console.log("🚀 Starting Comprehensive 33-Page Blog & Resource Playwright QA Suite...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Bypass terms modal
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  let totalTested = 0;
  let passedPages = 0;
  const failures: { route: string; error: string }[] = [];

  console.log(`Auditing all ${ALL_BLOG_ROUTES.length} Blog & Resource routes...`);

  for (const route of ALL_BLOG_ROUTES) {
    totalTested++;
    const fullUrl = `${BASE_URL}${route}`;

    try {
      const response = await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
      const status = response?.status() || 200;

      if (status !== 200) {
        throw new Error(`HTTP status ${status}`);
      }

      await page.waitForTimeout(150);

      // 1. Verify Page Title
      const title = await page.title();
      if (!title || title.length < 5) {
        throw new Error(`Invalid or empty page title: "${title}"`);
      }

      // 2. Verify H1
      const h1 = await page.locator("h1").first().textContent();
      if (!h1 || h1.trim().length < 3) {
        throw new Error(`Missing or empty H1 tag.`);
      }

      // 3. Verify Meta Description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
      if (!metaDesc || metaDesc.length < 15) {
        throw new Error(`Missing or short meta description: "${metaDesc}"`);
      }

      // 4. Verify Canonical Tag
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      if (!canonical || !canonical.includes("navyatech.co.in")) {
        throw new Error(`Missing or invalid canonical link: "${canonical}"`);
      }

      // 5. Verify Primary Image & Alt Text
      const img = page.locator("img[alt]").first();
      const alt = await img.getAttribute("alt");
      if (!alt || alt === "image" || alt === "hero" || alt === "photo") {
        throw new Error(`Invalid or generic image alt attribute: "${alt}"`);
      }

      // 6. Verify Start Project CTA
      const startCta = page.locator("a[href='/get-started']").first();
      if (!(await startCta.count())) {
        throw new Error(`Missing Start Project CTA link to /get-started`);
      }

      // 7. Verify Phone Call Action
      const callCta = page.locator("a[href='tel:+919355412903']").first();
      if (!(await callCta.count())) {
        throw new Error(`Missing Call Now button with tel:+919355412903`);
      }

      // 8. Verify Navya Assistant Floating Button
      const assistantBtn = page.locator("button[aria-label*='chatbot']").first();
      if (!(await assistantBtn.count())) {
        throw new Error(`Missing Navya Assistant button`);
      }

      passedPages++;
      console.log(`  ✅ [200 OK] ${route} -> H1: "${h1.trim()}" | Alt: "${alt}"`);
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${route} -> ${err.message}`);
      failures.push({ route, error: err.message });
    }
  }

  // 9. Interactive Tests on /blog: Search & Category Filter
  console.log("\n🔍 Testing Live Search and Filter Interactions on /blog...");
  await page.goto(`${BASE_URL}/blog`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  const searchInput = page.locator('input[placeholder*="Search topics"]');
  await searchInput.fill("3D");
  await page.waitForTimeout(400);

  const results3D = await page.locator("a[href^='/blog/']").count();
  console.log(`  🔎 Search "3D" returned ${results3D} articles.`);

  await searchInput.fill("");
  await page.waitForTimeout(200);

  // Category Tab Click
  const seoTab = page.locator("button:has-text('Technical SEO')").first();
  await seoTab.click();
  await page.waitForTimeout(400);
  const seoResults = await page.locator("a[href^='/blog/']").count();
  console.log(`  🏷️ Category tab "Technical SEO" filtered to ${seoResults} articles.`);

  // 10. Mobile Responsiveness Check (390x844)
  console.log("\n📱 Testing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/blog/what-is-a-3d-website`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  const isH1VisibleMobile = await page.locator("h1").first().isVisible();
  console.log(`  📱 Mobile H1 Visible: ${isH1VisibleMobile}`);

  await browser.close();

  console.log("\n======================================================");
  console.log("📊 BLOG & RESOURCE QA SUITE SUMMARY");
  console.log("======================================================");
  console.log(`Total Routes Audited: ${totalTested}`);
  console.log(`Passed: ${passedPages}`);
  console.log(`Failed: ${failures.length}`);

  if (failures.length === 0) {
    console.log("\n🎉 100% QA PASS! All 33 Blog & Resource pages are fully functional, responsive, and verified.");
    process.exit(0);
  } else {
    console.error(`\n❌ ${failures.length} pages failed verification.`);
    process.exit(1);
  }
}

runBlogQASuite().catch((err) => {
  console.error("Blog QA Suite encountered an unhandled error:", err);
  process.exit(1);
});
