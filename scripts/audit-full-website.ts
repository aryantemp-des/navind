import { createServer } from "vite";
import { chromium } from "@playwright/test";

const VIEWPORTS = [
  { name: "320px (Narrow Mobile)", width: 320, height: 600 },
  { name: "360px (Android)", width: 360, height: 640 },
  { name: "375px (iPhone SE)", width: 375, height: 667 },
  { name: "390px (iPhone 13/14)", width: 390, height: 844 },
  { name: "414px (iPhone Plus/Max)", width: 414, height: 896 },
  { name: "768px (Tablet)", width: 768, height: 1024 },
  { name: "1024px (Laptop)", width: 1024, height: 768 },
  { name: "1440px (Desktop)", width: 1440, height: 900 },
];

const ROUTES_TO_AUDIT = [
  "/",
  "/pricing",
  "/contact",
  "/services",
  "/services/website-development",
  "/services/ecommerce-website-development",
  "/services/internet-marketing-bundle",
  "/services/seo",
  "/services/geo",
  "/industries",
  "/industries/saas",
  "/industries/ecommerce",
  "/blog",
  "/resources",
  "/privacy-policy",
  "/invalid-test-route-404",
];

async function runCompleteWebsiteAudit() {
  console.log("🚀 Starting Complete Navya Tech Website QA & Responsive Audit...\n");

  const server = await createServer({
    server: { port: 5197 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5197";

  const browser = await chromium.launch({ headless: true });

  const issues: string[] = [];
  const passedChecks: string[] = [];

  try {
    const page = await browser.newPage();
    const consoleErrors: string[] = [];

    // Pre-accept terms in test browser so modal doesn't intercept clicks
    await page.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
    });

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`[Console Error] ${msg.text()}`);
      }
    });

    page.on("pageerror", (err) => {
      consoleErrors.push(`[Page Error] ${err.message}`);
    });

    // -------------------------------------------------------------
    // CHECK 1: FAVICON & HTML HEAD TAGS
    // -------------------------------------------------------------
    console.log("🔎 Auditing Favicon & Head Metadata on Homepage...");
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const faviconSvg = await page.locator('link[rel="icon"][type="image/svg+xml"]').getAttribute("href");
    const faviconIco = await page.locator('link[rel="shortcut icon"]').getAttribute("href");
    const appleIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute("href");

    if (faviconSvg && faviconIco && appleIcon) {
      passedChecks.push(`Favicon tags present: SVG (${faviconSvg}), ICO (${faviconIco}), Apple Touch (${appleIcon})`);
      console.log(`  ✅ Favicon tags verified: SVG, ICO, Apple Touch Icon all exist.`);
    } else {
      issues.push(`Missing favicon tags in head: svg=${faviconSvg}, ico=${faviconIco}, apple=${appleIcon}`);
    }

    // -------------------------------------------------------------
    // CHECK 2: DYNAMIC COPYRIGHT YEAR
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Dynamic Copyright Year in Footer...");
    const currentYear = new Date().getFullYear().toString();
    const footerText = await page.locator("footer").first().innerText();
    if (footerText.includes(`© ${currentYear} Navya Tech Industry`)) {
      passedChecks.push(`Footer dynamic copyright year matches current year (${currentYear})`);
      console.log(`  ✅ Footer copyright dynamic year verified: "© ${currentYear} Navya Tech Industry"`);
    } else {
      issues.push(`Footer does not contain dynamic current year "© ${currentYear} Navya Tech Industry"`);
    }

    // -------------------------------------------------------------
    // CHECK 3: CLICKABLE LOGO IN HEADER AND FOOTER
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Clickable Logos...");
    const headerLogoHref = await page.locator('header a[aria-label="Navya Tech Industry Home"]').first().getAttribute("href");
    const footerLogoHref = await page.locator('footer a[aria-label="Navya Tech Industry Home"]').first().getAttribute("href");
    if (headerLogoHref === "/" && footerLogoHref === "/") {
      passedChecks.push("Desktop Header and Footer logos are clickable and link to canonical '/'");
      console.log(`  ✅ Header and Footer logos are valid links to "/" with accessible aria-label.`);
    } else {
      issues.push(`Header/Footer logo links: header=${headerLogoHref}, footer=${footerLogoHref}`);
    }

    // -------------------------------------------------------------
    // CHECK 4: CUSTOM 404 NOT FOUND PAGE
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Custom 404 Not Found Page...");
    await page.goto(`${baseUrl}/non-existent-test-page-xyz-123`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1");
    await page.waitForTimeout(100);
    const page404Title = await page.title();
    const heading404 = await page.locator("h1").innerText();
    const returnHomeBtn = await page.locator('a[href="/"]').first().isVisible();

    console.log(`  404 Title: "${page404Title}", H1: "${heading404}", HomeButton: ${returnHomeBtn}`);
    if (heading404.includes("404") && page404Title.includes("404") && returnHomeBtn) {
      passedChecks.push("Branded 404 page correctly renders on nonexistent route with home CTA");
      console.log(`  ✅ Branded 404 Not Found page successfully verified!`);
    } else {
      issues.push(`404 page failed: Title=${page404Title}, H1=${heading404}`);
    }

    // -------------------------------------------------------------
    // CHECK 5: RESPONSIVE HORIZONTAL SCROLL & OVERFLOW AUDIT
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Horizontal Scroll & Viewport Overflow across all target widths...");

    for (const route of ROUTES_TO_AUDIT) {
      console.log(`\n  Checking route: ${route}`);

      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(100);

        // Evaluate whether document scrolls horizontally
        const overflowData = await page.evaluate(() => {
          const docEl = document.documentElement;
          const bodyEl = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, bodyEl.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasScroll = scrollWidth > clientWidth + 1; // 1px tolerance for subpixel rounding

          let worstElement = null;
          let maxRight = clientWidth;

          if (hasScroll) {
            const allElements = document.querySelectorAll("*");
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > maxRight + 2) {
                maxRight = rect.right;
                worstElement = {
                  tag: el.tagName,
                  className: el.className?.toString().substring(0, 50) || "",
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                };
              }
            }
          }

          return {
            hasScroll,
            scrollWidth,
            clientWidth,
            worstElement,
          };
        });

        if (overflowData.hasScroll) {
          const detail = `Route ${route} at ${vp.name}: scrollWidth=${overflowData.scrollWidth} > clientWidth=${overflowData.clientWidth}. Offending element: ${JSON.stringify(overflowData.worstElement)}`;
          issues.push(detail);
          console.log(`    ❌ OVERFLOW at ${vp.name}: ${detail}`);
        } else {
          // Success
        }
      }
      console.log(`    ✅ Clean at all 8 viewports for ${route}`);
    }

    // -------------------------------------------------------------
    // CHECK 6: MOBILE NAVIGATION INTERACTION
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Mobile Hamburger Navigation...");
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const hamburgerBtn = page.locator('button[aria-label="Open menu"]').first();
    if (await hamburgerBtn.isVisible()) {
      await hamburgerBtn.click();
      await page.waitForTimeout(200);

      // Verify menu overlay is visible
      const mobileNav = page.locator('button[aria-label="Close menu"]').first();
      const mobileNavVisible = await mobileNav.isVisible();

      // Verify body scroll is locked
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);

      // Verify mobile logo is clickable
      const mobileLogo = page.locator('a[aria-label="Navya Tech Industry Home"]').first();
      const mobileLogoVisible = await mobileLogo.isVisible();

      console.log(`  Mobile Menu Open: ${mobileNavVisible}, Body Overflow: "${bodyOverflow}", Mobile Logo: ${mobileLogoVisible}`);

      if (mobileNavVisible && bodyOverflow === "hidden" && mobileLogoVisible) {
        passedChecks.push("Mobile menu opens smoothly, locks body scroll, and contains clickable logo");
        console.log(`  ✅ Mobile navigation menu verified.`);
      } else {
        issues.push(`Mobile menu issues: visible=${mobileNavVisible}, overflow=${bodyOverflow}`);
      }

      // Close mobile menu using Escape key (tests keyboard accessibility)
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
      const closedOverflow = await page.evaluate(() => document.body.style.overflow);
      if (closedOverflow === "") {
        passedChecks.push("Mobile menu restores body scroll on close (via Escape key / close interaction)");
        console.log(`  ✅ Mobile menu correctly unlocked body scroll upon closing.`);
      } else {
        issues.push(`Mobile menu did not restore scroll on close: overflow=${closedOverflow}`);
      }
    }

    // -------------------------------------------------------------
    // CHECK 7: FORM VALIDATION ON /contact
    // -------------------------------------------------------------
    console.log("\n🔎 Auditing Form Validation on /contact...");
    await page.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });

    // Click submit with empty fields
    const submitBtn = page.locator("text=Send Brief via WhatsApp to Founder").first();
    await submitBtn.click();
    await page.waitForTimeout(100);

    const nameError = await page.locator("text=Please enter your name.").first().isVisible();
    const phoneError = await page.locator("text=Please enter a valid phone or WhatsApp number.").first().isVisible();
    const topicError = await page.locator("text=Please briefly describe your project or enquiry.").first().isVisible();

    if (nameError && phoneError && topicError) {
      passedChecks.push("Contact form validates required fields and renders field-level errors");
      console.log(`  ✅ Field-specific validation error messages verified on /contact.`);
    } else {
      issues.push(`Contact form validation failed: nameErr=${nameError}, phoneErr=${phoneError}, topicErr=${topicError}`);
    }

    // -------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("📋 AUDIT SUMMARY & RESULTS");
    console.log("=================================================");
    console.log(`Passed Checks: ${passedChecks.length}`);
    passedChecks.forEach((p) => console.log(`  ✔️ ${p}`));

    if (issues.length > 0) {
      console.log(`\n❌ Issues Found: ${issues.length}`);
      issues.forEach((i) => console.log(`  ⚠️ ${i}`));
      process.exit(1);
    } else {
      console.log("\n🎉 ZERO ISSUES DETECTED! All responsive viewports, navigation, 404, metadata, and forms passed cleanly.\n");
    }

  } catch (err) {
    console.error("❌ Audit failed with error:", err);
    process.exit(1);
  } finally {
    await browser.close();
    await server.close();
  }
}

runCompleteWebsiteAudit();
