import { createServer } from "vite";
import { chromium } from "@playwright/test";

const SERVICES_WHATSAPP_TESTS = [
  {
    num: "01",
    name: "Website Development",
    route: "/services/website-development",
    expectedText: "Hi, I’m interested in Website Development. I’d like to discuss building a modern, high-performance website for my business/project. Please share the available options, timeline, and pricing.",
  },
  {
    num: "02",
    name: "Website Design & UI/UX",
    route: "/services/website-design",
    expectedText: "Hi, I’m interested in Website Design & UI/UX. I’m looking for a modern, professional, and user-friendly design for my website. I’d like to discuss the design process, timeline, and pricing.",
  },
  {
    num: "03",
    name: "3D & WebGL Development",
    route: "/services/3d-website-development",
    expectedText: "Hi, I’m interested in 3D Website Development. I’m looking for an interactive 3D website with technologies like Three.js/WebGL. I’d like to discuss my idea, requirements, performance, timeline, and pricing.",
  },
  {
    num: "04",
    name: "Custom Web Development",
    route: "/services/custom-web-development",
    expectedText: "Hi, I’m interested in Custom Web Development. I have a specific web project that needs a tailored solution. I’d like to discuss the requirements, features, development timeline, and estimated cost.",
  },
  {
    num: "05",
    name: "Landing Page Development",
    route: "/services/landing-page-development",
    expectedText: "Hi, I’m interested in Landing Page Development. I need a high-converting landing page for my product, service, or marketing campaign. I’d like to discuss the requirements, goals, timeline, and pricing.",
  },
  {
    num: "06",
    name: "Website Performance & CWV",
    route: "/services/website-performance-optimization",
    expectedText: "Hi, I’m interested in Website Performance Optimization. My website needs improvement in loading speed, mobile performance, Core Web Vitals, and overall responsiveness. I’d like to discuss an audit and optimization plan.",
  },
  {
    num: "07",
    name: "Business Website Development",
    route: "/services/business-website-development",
    expectedText: "Hi, I’m interested in Business Website Development. I want to build a professional website for my business that helps establish credibility and generate more leads. I’d like to discuss my requirements, timeline, and pricing.",
  },
  {
    num: "08",
    name: "Ecommerce Website Development",
    route: "/services/ecommerce-website-development",
    expectedText: "Hi, I’m interested in Ecommerce Website Development. I’d like to build an online store with products, payments, checkout, and order management. I’d like to discuss the requirements, timeline, and pricing.",
  },
  {
    num: "09",
    name: "Web App Development",
    route: "/services/web-app-development",
    expectedText: "Hi, I’m interested in Web App Development. I have an idea for a web application and would like to discuss the features, functionality, technology, development process, timeline, and estimated cost.",
  },
  {
    num: "10",
    name: "Website Redesign",
    route: "/services/website-redesign",
    expectedText: "Hi, I’m interested in Website Redesign. I already have a website and want to improve its design, UI/UX, responsiveness, and overall user experience. I’d like to discuss the redesign process, timeline, and pricing.",
  },
  {
    num: "11",
    name: "Website Maintenance",
    route: "/services/website-maintenance",
    expectedText: "Hi, I’m interested in Website Maintenance. I need ongoing support for my website, including updates, bug fixes, security, performance improvements, and technical maintenance. Please share the available plans and pricing.",
  },
  {
    num: "12",
    name: "Technical SEO",
    route: "/services/technical-seo",
    expectedText: "Hi, I’m interested in Technical SEO. I’d like to improve my website’s crawlability, indexing, structured data, sitemap, robots.txt, and overall search-engine readiness. Please share the process and pricing.",
  },
];

async function testNavigationAndWhatsApp() {
  console.log("🚀 Launching Vite dev server for Navigation & WhatsApp QA...");
  const server = await createServer({
    server: { port: 5199 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5199";

  const browser = await chromium.launch({ headless: true });

  try {
    // ----------------------------------------------------------------
    // TEST 1: SERVICES HERO NAVIGATION & 'FOR INDUSTRIES' BUTTON
    // ----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 1. /services HERO & 'FOR INDUSTRIES' BUTTON TEST");
    console.log("=================================================");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });

    // Verify "Services" button
    const servicesBtn = pageDesktop.locator('main a.clay-btn-primary:has-text("Services")').first();
    const servicesHref = await servicesBtn.getAttribute("href");
    console.log(`  🔗 "Services" button href: "${servicesHref}"`);
    if (servicesHref !== "#explore-services") {
      throw new Error(`Expected "Services" button href to be #explore-services, got "${servicesHref}"`);
    }

    // Verify "For Industries" button
    const forIndustriesBtn = pageDesktop.locator('main a:has-text("For Industries")').first();
    const forIndustriesHref = await forIndustriesBtn.getAttribute("href");
    console.log(`  🔗 "For Industries" button href: "${forIndustriesHref}"`);
    if (forIndustriesHref !== "/industries#explore-industry-sectors") {
      throw new Error(`Expected "For Industries" button href to be "/industries#explore-industry-sectors", got "${forIndustriesHref}"`);
    }

    // Click "For Industries" and test cross-page navigation + auto scroll
    await forIndustriesBtn.click();
    await pageDesktop.waitForTimeout(1400);

    const currentUrl = pageDesktop.url();
    const scrollYAfterCrossPage = await pageDesktop.evaluate(() => window.scrollY);
    console.log(`  📍 Navigated to: ${currentUrl} | ScrollY: ${scrollYAfterCrossPage}px`);

    const industryHeadingVisible = await pageDesktop
      .locator('#explore-industry-sectors h2:has-text("Explore Industry Sectors")')
      .isVisible();
    console.log(`  ✅ "Explore Industry Sectors" heading visible in viewport: ${industryHeadingVisible}`);

    if (!industryHeadingVisible) {
      throw new Error("Expected 'Explore Industry Sectors' section to be visible after clicking 'For Industries'");
    }

    // ----------------------------------------------------------------
    // TEST 2: INDUSTRIES PAGE & 'INDUSTRY' BUTTON IN-PAGE SCROLL
    // ----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. /industries HERO & 'INDUSTRY' IN-PAGE SCROLL TEST");
    console.log("=================================================");
    await pageDesktop.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });

    const industryBtn = pageDesktop.locator('main a.clay-btn-primary:has-text("Industry")').first();
    const industryBtnHref = await industryBtn.getAttribute("href");
    console.log(`  🔗 "Industry" button href: "${industryBtnHref}"`);

    if (industryBtnHref !== "#explore-industry-sectors") {
      throw new Error(`Expected "Industry" button href to be #explore-industry-sectors, got "${industryBtnHref}"`);
    }

    // Click "Industry" and test in-page smooth scroll
    await industryBtn.click();
    await pageDesktop.waitForTimeout(1400);

    const industrySectionVisible = await pageDesktop
      .locator('#explore-industry-sectors h2:has-text("Explore Industry Sectors")')
      .isVisible();
    console.log(`  ✅ In-page scroll to "Explore Industry Sectors" verified: ${industrySectionVisible}`);

    if (!industrySectionVisible) {
      throw new Error("Expected in-page smooth scroll to 'Explore Industry Sectors'");
    }

    // ----------------------------------------------------------------
    // TEST 3: VERIFY YELLOW BORDER & GLOW ON BOTH /services & /industries
    // ----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 3. VERIFYING YELLOW BORDER & SHADOW ON SERVICES & INDUSTRIES");
    console.log("=================================================");
    // On /services
    await pageDesktop.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const serviceGlowCards = pageDesktop.locator("#explore-services .service-card-yellow-glow");
    const serviceGlowCount = await serviceGlowCards.count();
    console.log(`  🃏 /services yellow glow cards: ${serviceGlowCount}/12`);
    if (serviceGlowCount !== 12) {
      throw new Error(`Expected 12 yellow glow cards on /services, got ${serviceGlowCount}`);
    }

    // On /industries
    await pageDesktop.goto(`${baseUrl}/industries`, { waitUntil: "networkidle" });
    const industryGlowCards = pageDesktop.locator("#explore-industry-sectors .service-card-yellow-glow");
    const industryGlowCount = await industryGlowCards.count();
    console.log(`  🃏 /industries yellow glow cards: ${industryGlowCount}/11`);
    if (industryGlowCount !== 11) {
      throw new Error(`Expected 11 yellow glow cards on /industries, got ${industryGlowCount}`);
    }

    // ----------------------------------------------------------------
    // TEST 4: VERIFY ALL 12 SERVICE SUBPAGES' EXACT WHATSAPP CTAS
    // ----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 4. VERIFYING ALL 12 SERVICE SUBPAGES' WHATSAPP CTAS");
    console.log("=================================================");

    for (const s of SERVICES_WHATSAPP_TESTS) {
      await pageDesktop.goto(`${baseUrl}${s.route}`, { waitUntil: "networkidle" });
      const waLink = pageDesktop.locator('a[href^="https://wa.me/919355412903"]').first();
      const waHref = await waLink.getAttribute("href");

      const expectedEncoded = encodeURIComponent(s.expectedText);
      const isMatch = waHref?.includes(expectedEncoded) || (waHref && decodeURIComponent(waHref).includes(s.expectedText));

      console.log(`  💬 [${s.num}] ${s.name}`);
      console.log(`     WhatsApp URL matched: ${isMatch ? "✅ EXACT MATCH" : "❌ MISMATCH"}`);

      if (!isMatch) {
        throw new Error(`WhatsApp message mismatch on ${s.route}!\nExpected: ${s.expectedText}\nGot: ${waHref}`);
      }
    }

    // ----------------------------------------------------------------
    // TEST 5: MOBILE & TABLET RESPONSIVE CHECKS
    // ----------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 5. MOBILE & TABLET RESPONSIVE CHECKS");
    console.log("=================================================");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });

    // Test /services mobile
    await mobilePage.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const mobileForIndustries = mobilePage.locator('main a:has-text("For Industries")').first();
    await mobileForIndustries.click();
    await mobilePage.waitForTimeout(1400);

    const mobileHasHorizontalScroll = await mobilePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`  📱 Mobile Cross-page Navigation Scroll: ${await mobilePage.evaluate(() => window.scrollY)}px`);
    console.log(`  📱 Mobile Horizontal Overflow: ${mobileHasHorizontalScroll ? "❌ DETECTED" : "✅ NONE"}`);

    if (mobileHasHorizontalScroll) {
      throw new Error("Horizontal overflow detected on mobile!");
    }

    console.log("\n=================================================");
    console.log("🎉 ALL NAVIGATION, WHATSAPP & YELLOW GLOW TESTS PASSED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testNavigationAndWhatsApp().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
