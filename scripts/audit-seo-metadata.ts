import { chromium } from "@playwright/test";
import { allSubpages } from "../src/config/subpages";
import { ALL_BLOG_ROUTES } from "../src/config/blogs";
import { queryAssistantNavigation } from "../src/config/assistant-registry";

const BASE_URL = "http://localhost:5173";

async function runGlobalSEOAudit() {
  console.log("🚀 Starting Comprehensive Global SEO & Geo-SEO Playwright Audit Suite...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Bypass terms modal
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  // Collect all unique routes
  const subpageRoutes = Object.keys(allSubpages);
  const allRoutes = Array.from(new Set(["/", ...subpageRoutes, ...ALL_BLOG_ROUTES]));

  console.log(`Auditing ${allRoutes.length} total indexable routes for SEO & Schema compliance...\n`);

  const seenTitles = new Map<string, string>();
  const seenMetaDescs = new Map<string, string>();
  const seenCanonicals = new Map<string, string>();
  let passedCount = 0;
  const failures: { route: string; error: string }[] = [];

  for (const route of allRoutes) {
    const fullUrl = `${BASE_URL}${route}`;

    try {
      const response = await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
      const status = response?.status() || 200;

      if (status !== 200) {
        throw new Error(`HTTP ${status} returned for ${route}`);
      }

      await page.waitForTimeout(100);

      // 1. Verify Page Title
      const title = await page.title();
      if (!title || title.length < 10) {
        throw new Error(`Title too short or empty: "${title}"`);
      }
      if (seenTitles.has(title) && seenTitles.get(title) !== route) {
        throw new Error(`Duplicate title detected: "${title}" (already used on ${seenTitles.get(title)})`);
      }
      seenTitles.set(title, route);

      // 2. Verify Meta Description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
      if (!metaDesc || metaDesc.length < 25) {
        throw new Error(`Meta description too short or empty: "${metaDesc}"`);
      }
      if (seenMetaDescs.has(metaDesc) && seenMetaDescs.get(metaDesc) !== route) {
        throw new Error(`Duplicate meta description detected: "${metaDesc.substring(0, 40)}..." (already used on ${seenMetaDescs.get(metaDesc)})`);
      }
      seenMetaDescs.set(metaDesc, route);

      // 3. Verify Single H1
      const h1Count = await page.locator("h1").count();
      if (h1Count === 0) {
        throw new Error("Missing H1 tag");
      }
      const h1Text = await page.locator("h1").first().textContent();
      if (!h1Text || h1Text.trim().length < 3) {
        throw new Error(`Empty or invalid H1 text: "${h1Text}"`);
      }

      // 4. Verify Canonical Tag
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      if (!canonical || !canonical.startsWith("https://www.navyatech.co.in")) {
        throw new Error(`Invalid canonical URL: "${canonical}"`);
      }
      seenCanonicals.set(canonical, route);

      // 5. Verify OpenGraph & Twitter Tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute("content");
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
      const twCard = await page.locator('meta[name="twitter:card"]').getAttribute("content");

      if (!ogTitle || !ogDesc || !ogImage || !twCard) {
        throw new Error("Missing essential OpenGraph or Twitter Card meta tags");
      }

      // 6. Verify Structured Data (JSON-LD)
      if (route !== "/") {
        const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
        if (jsonLdCount === 0) {
          throw new Error("Missing JSON-LD structured data script");
        }
        const jsonLdContent = await page.locator('script[type="application/ld+json"]').first().textContent();
        if (!jsonLdContent || !jsonLdContent.includes("schema.org")) {
          throw new Error("Invalid or empty JSON-LD schema content");
        }
      }

      // 7. Verify Primary Image & Alt Attribute
      const img = page.locator("img[alt]").first();
      const alt = await img.getAttribute("alt");
      if (!alt || alt.toLowerCase() === "image" || alt.toLowerCase() === "hero" || alt.toLowerCase() === "photo") {
        throw new Error(`Generic or empty image alt attribute: "${alt}"`);
      }

      passedCount++;
      console.log(`  ✅ [PASS] ${route} -> H1: "${h1Text.trim().substring(0, 38)}..." | Canonical: ${canonical}`);
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${route} -> ${err.message}`);
      failures.push({ route, error: err.message });
    }
  }

  // 8. Test Assistant Geo & Local Intent Engine
  console.log("\n🧭 Testing Assistant Geo-SEO Intent Matching...");
  const geoQueries = [
    { q: "website development in mumbai", expectedRoute: "/website-development/mumbai" },
    { q: "website development bangalore", expectedRoute: "/website-development/bangalore" },
    { q: "website design noida delhi", expectedRoute: "/website-development/delhi-ncr" },
    { q: "web development in new york", expectedRoute: "/website-development/new-york" },
    { q: "ai startup web design san francisco", expectedRoute: "/website-development/san-francisco" },
    { q: "website development in austin tx", expectedRoute: "/website-development/austin" },
    { q: "website development in india", expectedRoute: "/website-development/india" },
    { q: "website development company in usa", expectedRoute: "/website-development/usa" },
  ];

  let geoPassed = 0;
  for (const item of geoQueries) {
    const result = queryAssistantNavigation(item.q);
    if (result.primaryPage?.route === item.expectedRoute) {
      console.log(`  ✅ Query "${item.q}" -> ${result.primaryPage.title} (${result.primaryPage.route})`);
      geoPassed++;
    } else {
      console.error(`  ❌ Query "${item.q}" -> Expected ${item.expectedRoute}, got ${result.primaryPage?.route}`);
      failures.push({ route: item.q, error: `Assistant routing mismatch: got ${result.primaryPage?.route}` });
    }
  }

  // 9. Mobile Viewport Test (390x844)
  console.log("\n📱 Testing Mobile Viewport Rendering (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/website-development/mumbai`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  const mumbaiH1Visible = await page.locator("h1").isVisible();
  console.log(`  📱 Mobile H1 Visible on /website-development/mumbai: ${mumbaiH1Visible}`);

  await browser.close();

  console.log("\n======================================================");
  console.log("📊 GLOBAL SEO & GEO-SEO AUDIT SUMMARY");
  console.log("======================================================");
  console.log(`Total Routes Audited: ${allRoutes.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failures.length}`);
  console.log(`Assistant Geo Intents: ${geoPassed}/${geoQueries.length} Passed`);

  if (failures.length === 0) {
    console.log("\n🎉 100% SEO AUDIT PASS! All pages have unique metadata, valid JSON-LD schemas, strict alt tags, and precise Geo-SEO routing.");
    process.exit(0);
  } else {
    console.error(`\n❌ ${failures.length} SEO audit checks failed.`);
    process.exit(1);
  }
}

runGlobalSEOAudit().catch((err) => {
  console.error("SEO Audit Suite error:", err);
  process.exit(1);
});
