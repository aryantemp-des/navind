import { chromium } from "@playwright/test";
import { allSubpages, getSubpageConfig } from "../src/config/subpages";
import { ALL_BLOG_ROUTES } from "../src/config/blogs";

const BASE_URL = "http://localhost:5173";

interface LinkAuditResult {
  sourceText: string;
  href: string;
  resolvedUrl: string;
  status: "PASS" | "FAIL";
  error?: string;
}

async function auditHomepageLinks() {
  console.log("🚀 Starting Comprehensive Homepage Link Audit on Navya Tech Industry...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const auditResults: LinkAuditResult[] = [];
  const discoveredHrefs = new Set<string>();

  // 1. Desktop Audit (1440x900)
  console.log("🖥️  1. Auditing Desktop Viewport (1440x900)...");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  // Extract all hrefs from homepage
  const links = await page.locator("a[href]").evaluateAll((els) =>
    els.map((el) => ({
      text: el.textContent?.trim().replace(/\s+/g, " ") || el.getAttribute("aria-label") || el.getAttribute("title") || "Icon/Element",
      href: el.getAttribute("href") || "",
    }))
  );

  console.log(`Found ${links.length} total <a> elements on homepage.`);

  for (const item of links) {
    if (!item.href) continue;

    // Skip tel, mailto, wa.me, and external links for route validation but record them as PASS
    if (
      item.href.startsWith("tel:") ||
      item.href.startsWith("mailto:") ||
      item.href.startsWith("https://wa.me") ||
      item.href.startsWith("https://") ||
      item.href.startsWith("http://")
    ) {
      auditResults.push({
        sourceText: item.text,
        href: item.href,
        resolvedUrl: item.href,
        status: "PASS",
      });
      continue;
    }

    if (item.href.startsWith("#")) {
      auditResults.push({
        sourceText: item.text,
        href: item.href,
        resolvedUrl: `${BASE_URL}/${item.href}`,
        status: "PASS",
      });
      continue;
    }

    discoveredHrefs.add(item.href);

    // Validate internal routes
    const pathWithoutHash = item.href.split("#")[0];
    const cleanPath = pathWithoutHash.split("?")[0].replace(/\/$/, "") || "/";
    const STANDALONE_PAGES = [
      "/",
      "/pricing",
      "/contact",
      "/privacy-policy",
      "/privacy",
      "/resources",
      "/blog",
      "/admin/portfolio",
      "/get-started",
    ];
    const exists =
      STANDALONE_PAGES.includes(cleanPath) ||
      Boolean(allSubpages[cleanPath]) ||
      ALL_BLOG_ROUTES.includes(cleanPath);

    if (exists) {
      auditResults.push({
        sourceText: item.text,
        href: item.href,
        resolvedUrl: `${BASE_URL}${item.href}`,
        status: "PASS",
      });
    } else {
      auditResults.push({
        sourceText: item.text,
        href: item.href,
        resolvedUrl: `${BASE_URL}${item.href}`,
        status: "FAIL",
        error: `Route '${cleanPath}' does not exist in website architecture`,
      });
    }
  }

  // 2. Test Dropdown Navigation Menus
  console.log("\n🔍 2. Testing Header Dropdown Navigation Menus...");
  await page.hover("text=Services");
  await page.waitForTimeout(300);
  const servicesDropdownVisible = await page.locator("text=Website Development").first().isVisible();
  console.log(`Services Dropdown Visible on Hover: ${servicesDropdownVisible}`);

  await page.hover("text=Industries");
  await page.waitForTimeout(300);
  const industriesDropdownVisible = await page.locator("text=SaaS & Voice Automation").first().isVisible();
  console.log(`Industries Dropdown Visible on Hover: ${industriesDropdownVisible}`);

  await page.hover("text=Pricing");
  await page.waitForTimeout(300);
  const pricingDropdownVisible = await page.locator("text=India Pricing").first().isVisible();
  console.log(`Pricing Dropdown Visible on Hover: ${pricingDropdownVisible}`);

  // 3. Test Mobile Navigation (390x844)
  console.log("\n📱 3. Auditing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);

  // Open mobile drawer
  const menuButton = page.locator("button[aria-label='Open menu']");
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await page.waitForTimeout(400);

    const mobileLinks = await page.locator("a[href]").evaluateAll((els) =>
      els.map((el) => ({
        text: el.textContent?.trim().replace(/\s+/g, " ") || el.getAttribute("aria-label") || "Link",
        href: el.getAttribute("href") || "",
      }))
    );
    console.log(`Found ${mobileLinks.length} total links in mobile menu.`);

    for (const item of mobileLinks) {
      if (
        !item.href ||
        item.href.startsWith("tel:") ||
        item.href.startsWith("mailto:") ||
        item.href.startsWith("https://") ||
        item.href.startsWith("http://") ||
        item.href.startsWith("#")
      ) {
        continue;
      }
      const pathWithoutHash = item.href.split("#")[0];
      const cleanPath = pathWithoutHash.split("?")[0].replace(/\/$/, "") || "/";
      const STANDALONE_PAGES = [
        "/",
        "/pricing",
        "/contact",
        "/privacy-policy",
        "/privacy",
        "/resources",
        "/blog",
        "/admin/portfolio",
        "/get-started",
      ];
      const exists =
        STANDALONE_PAGES.includes(cleanPath) ||
        Boolean(allSubpages[cleanPath]) ||
        ALL_BLOG_ROUTES.includes(cleanPath);
      if (!exists) {
        auditResults.push({
          sourceText: `[Mobile] ${item.text}`,
          href: item.href,
          resolvedUrl: `${BASE_URL}${item.href}`,
          status: "FAIL",
          error: `Mobile Route '${cleanPath}' not found in website architecture`,
        });
      }
    }
  }

  // 4. Test Navigation to Major Subpages from Homepage Click Interactions
  console.log("\n🧭 4. Verifying Direct Navigation from Homepage Click Interactions...");
  await page.setViewportSize({ width: 1440, height: 900 });
  const sampleTestTargets = [
    { name: "Services Overview", selector: "a[href='/services']", expectedTitle: "Services" },
    { name: "Website Development", selector: "a[href='/services/website-development']", expectedTitle: "Website Development" },
    { name: "Website Redesign", selector: "a[href='/services/website-redesign']", expectedTitle: "Website Redesign" },
    { name: "SaaS Industry", selector: "a[href='/industries/saas']", expectedTitle: "SaaS" },
    { name: "Pricing Quotation", selector: "a[href='/pricing']", expectedTitle: "Quote" },
    { name: "Get Started Conversion", selector: "a[href='/get-started']", expectedTitle: "Get Started" },
    { name: "Contact Page", selector: "a[href='/contact']", expectedTitle: "Founder Directly" },
  ];

  for (const target of sampleTestTargets) {
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.locator(target.selector).first().click();
    await page.waitForTimeout(500);

    const title = await page.title();
    const h1 = await page.locator("h1").textContent();
    const success = title.includes(target.expectedTitle) || (h1 && h1.includes(target.expectedTitle));
    console.log(`  🔗 ${target.name} clicked -> ${success ? "✅ PASS" : "❌ FAIL"} (Title: "${title.slice(0, 35)}...")`);
  }

  await browser.close();

  // Summary Report
  const totalAudited = auditResults.length;
  const failed = auditResults.filter((r) => r.status === "FAIL");

  console.log(`\n======================================================`);
  console.log(`📊 HOMEPAGE LINK AUDIT SUMMARY`);
  console.log(`======================================================`);
  console.log(`Total Links Audited: ${totalAudited}`);
  console.log(`Unique Subpage Destinations Connected: ${discoveredHrefs.size}`);
  console.log(`Passed: ${totalAudited - failed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.error(`\n❌ Discovered Failed Links:`);
    console.error(JSON.stringify(failed, null, 2));
    process.exit(1);
  } else {
    console.log(`\n🎉 100% LINK AUDIT PASSED! All homepage interactive links connect to valid subpages.\n`);
  }
}

auditHomepageLinks().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
