import fs from "fs";
import path from "path";
import { chromium } from "@playwright/test";
import { allSubpages } from "../src/config/subpages";
import { ALL_BLOG_ROUTES } from "../src/config/blogs";

const BASE_URL = "http://localhost:5173";
const DOMAIN = "https://www.navyatech.co.in";
const MAX_ALLOWED_DATE = "2026-08-30"; // Current reference date

async function runSitemapValidationSuite() {
  console.log("🗺️  Starting Strict ISO 8601 Sitemap & Lastmod Validation Suite...\n");

  const rootPath = process.cwd();
  const publicSitemapPath = path.join(rootPath, "public", "sitemap.xml");
  const publicRobotsPath = path.join(rootPath, "public", "robots.txt");

  // 1. Verify Authoritative Files Exist in public/
  if (!fs.existsSync(publicSitemapPath)) throw new Error("Missing authoritative public/sitemap.xml");
  if (!fs.existsSync(publicRobotsPath)) throw new Error("Missing authoritative public/robots.txt");

  console.log("📁 1. Verified authoritative files in public/:");
  console.log(`   📄 Sitemap: ${publicSitemapPath}`);
  console.log(`   📄 Robots: ${publicRobotsPath}`);

  // 2. Verify robots.txt configuration
  const robotsTxt = fs.readFileSync(publicRobotsPath, "utf-8");
  if (!robotsTxt.includes("Sitemap: https://www.navyatech.co.in/sitemap.xml")) {
    throw new Error("public/robots.txt missing Sitemap directive!");
  }
  if (!robotsTxt.includes("Allow: /")) {
    throw new Error("public/robots.txt missing Allow: / directive!");
  }
  console.log("🤖 2. Verified robots.txt references production XML sitemap and allows public indexing.");

  // 3. Parse XML Sitemap Content
  const sitemapXml = fs.readFileSync(publicSitemapPath, "utf-8");
  if (!sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    throw new Error("Sitemap XML missing standard XML declaration");
  }
  if (!sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    throw new Error("Sitemap XML missing valid sitemap xmlns schema namespace");
  }

  // Extract all <url> blocks
  const urlBlocks = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  console.log(`📄 3. Parsed XML sitemap: Found ${urlBlocks.length} total <url> blocks.`);

  // Validate every URL block and every <lastmod>
  const locMatches: string[] = [];
  const seen = new Set<string>();
  const duplicates: string[] = [];

  let validLastModCount = 0;
  let omittedLastModCount = 0;

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    if (!locMatch) throw new Error(`Missing <loc> in url block: ${block}`);
    const url = locMatch[1].trim();

    if (seen.has(url)) duplicates.push(url);
    seen.add(url);
    locMatches.push(url);

    // Validate URL syntax & domain
    if (!url.startsWith(DOMAIN)) {
      throw new Error(`Non-canonical or invalid domain in sitemap: "${url}"`);
    }
    if (url.includes("?") || url.includes("#")) {
      throw new Error(`URL contains query parameters or hash fragment: "${url}"`);
    }
    if (url.includes("localhost") || url.includes("127.0.0.1") || url.includes("preview")) {
      throw new Error(`Development/preview URL detected: "${url}"`);
    }

    // Validate <lastmod> if present
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
    if (lastmodMatch) {
      const lastmodVal = lastmodMatch[1].trim();

      // Strict regex check: must be YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmodVal)) {
        throw new Error(`INVALID <lastmod> FORMAT detected on ${url}: "${lastmodVal}". Must be YYYY-MM-DD!`);
      }

      // Check not a future date
      if (lastmodVal > MAX_ALLOWED_DATE) {
        throw new Error(`FUTURE <lastmod> DATE detected on ${url}: "${lastmodVal}" > ${MAX_ALLOWED_DATE}`);
      }

      // Parse date validity
      const [y, m, d] = lastmodVal.split("-").map(Number);
      if (y < 2020 || y > 2026 || m < 1 || m > 12 || d < 1 || d > 31) {
        throw new Error(`Malformed calendar date in <lastmod> on ${url}: "${lastmodVal}"`);
      }

      validLastModCount++;
    } else {
      omittedLastModCount++;
    }
  }

  if (duplicates.length > 0) {
    throw new Error(`Duplicate URLs found in sitemap: ${duplicates.join(", ")}`);
  }

  console.log(`✨ 4. Verified 0 duplicate URLs.`);
  console.log(`📅 5. Validated all <lastmod> values:`);
  console.log(`   - Strict ISO 8601 YYYY-MM-DD verified: ${validLastModCount}`);
  console.log(`   - Cleanly omitted (no date fabrication): ${omittedLastModCount}`);
  console.log(`   - Invalid date formats or future dates: 0`);

  // 4. Verify all application registry routes exist in the sitemap
  const expectedRoutes = Array.from(new Set(["/", ...Object.keys(allSubpages), ...ALL_BLOG_ROUTES]));
  console.log(`\n🔍 6. Cross-referencing against application registry (${expectedRoutes.length} expected routes)...`);

  const missingRoutes: string[] = [];
  for (const route of expectedRoutes) {
    const expectedUrl = `${DOMAIN}${route === "/" ? "/" : route}`;
    if (!seen.has(expectedUrl)) {
      missingRoutes.push(route);
    }
  }

  if (missingRoutes.length > 0) {
    throw new Error(`Missing routes from sitemap: ${missingRoutes.join(", ")}`);
  }
  console.log(`✅ All ${expectedRoutes.length} application routes are indexed in the XML sitemap.`);

  // 5. Playwright HTTP & Canonical Tag Verification
  console.log("\n🌐 7. Running Playwright live HTTP 200, Canonical Link & Noindex validation...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Bypass terms modal
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  // A. Verify GET /robots.txt
  const robotsRes = await page.goto(`${BASE_URL}/robots.txt`);
  const robotsStatus = robotsRes?.status() || 200;
  const robotsContent = await page.textContent("body");
  if (robotsStatus !== 200 || !robotsContent?.includes("Sitemap: https://www.navyatech.co.in/sitemap.xml")) {
    throw new Error(`GET /robots.txt failed or missing sitemap reference (Status: ${robotsStatus})`);
  }
  console.log("  ✅ GET /robots.txt -> HTTP 200 OK (Sitemap reference verified)");

  // B. Verify GET /sitemap.xml
  const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`);
  const sitemapStatus = sitemapRes?.status() || 200;
  if (sitemapStatus !== 200) {
    throw new Error(`GET /sitemap.xml failed with HTTP ${sitemapStatus}`);
  }
  console.log("  ✅ GET /sitemap.xml -> HTTP 200 OK (Valid XML payload)");

  // C. Verify all 87 sitemap routes
  let verifiedCount = 0;
  for (const fullUrl of locMatches) {
    const route = fullUrl.replace(DOMAIN, "") || "/";
    const localUrl = `${BASE_URL}${route}`;

    const response = await page.goto(localUrl, { waitUntil: "domcontentloaded" });
    const status = response?.status() || 200;

    if (status !== 200) {
      throw new Error(`HTTP ${status} for sitemap URL: ${fullUrl}`);
    }

    await page.waitForTimeout(60);

    // Verify canonical matches
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
    if (!canonicalHref || canonicalHref !== fullUrl) {
      throw new Error(`Canonical tag mismatch on ${route}: expected "${fullUrl}", got "${canonicalHref}"`);
    }

    // Verify no accidental noindex tag
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    if (robotsMeta && robotsMeta.includes("noindex")) {
      throw new Error(`Accidental noindex tag detected on ${route}: "${robotsMeta}"`);
    }

    verifiedCount++;
  }

  await browser.close();

  console.log("\n======================================================");
  console.log("📊 XML SITEMAP & LASTMOD AUDIT SUMMARY");
  console.log("======================================================");
  console.log(`Authoritative Sitemap: public/sitemap.xml`);
  console.log(`Authoritative Robots: public/robots.txt`);
  console.log(`Canonical Production Domain: ${DOMAIN}`);
  console.log(`Total URLs in XML Sitemap: ${locMatches.length}`);
  console.log(`Valid ISO 8601 <lastmod> Count: ${validLastModCount}`);
  console.log(`Omitted <lastmod> (No fake dates): ${omittedLastModCount}`);
  console.log(`Invalid Date Errors: 0`);
  console.log(`Future Dates: 0`);
  console.log(`Expected App Routes: ${expectedRoutes.length}`);
  console.log(`Live HTTP 200, Canonical & Noindex Verified: ${verifiedCount}`);
  console.log(`Duplicates / Broken URLs: 0`);

  console.log("\n🎉 100% AUDIT PASS! Flawless ISO 8601 dates, zero invalid-date errors.");
}

runSitemapValidationSuite().catch((err) => {
  console.error("Sitemap audit suite error:", err);
  process.exit(1);
});
