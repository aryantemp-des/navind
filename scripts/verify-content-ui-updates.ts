import { chromium } from "playwright";

async function main() {
  console.log("🚀 Starting Playwright verification for Content & UI updates...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });
  const page = await context.newPage();

  const baseUrl = "http://localhost:5173";
  let allPassed = true;

  try {
    // 1. Test Homepage
    console.log(`➡️ Navigating to ${baseUrl} ...`);
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // 1. Check "Crafting Digital Experiences That Matter" section
    console.log("🧪 1. Testing 'Crafting Digital Experiences That Matter' Section...");
    const craftSection = page.locator("section:has-text('Crafting Digital')");
    await craftSection.scrollIntoViewIfNeeded();
    const craftText = await craftSection.innerText();

    if (craftText.includes("Organic Growth Focused")) {
      console.log("  ✅ 'Organic Growth Focused' found in Crafting Digital Experiences section.");
    } else {
      console.error("  ❌ 'Organic Growth Focused' NOT found in section!");
      allPassed = false;
    }

    if (!craftText.includes("150+")) {
      console.log("  ✅ '150+' is completely removed from Crafting Digital Experiences section.");
    } else {
      console.error("  ❌ Old '150+' text still found in section!");
      allPassed = false;
    }

    // 2. Check "We treat every project..." section
    console.log("🧪 2. Testing 'We treat every project...' CTA Section...");
    const waitlistSection = page.locator("section:has-text('We treat every project like our reputation depends on its success')");
    await waitlistSection.scrollIntoViewIfNeeded();
    const waitlistText = await waitlistSection.innerText();

    if (waitlistText.toLowerCase().includes("call decision makers")) {
      console.log("  ✅ 'Call Decision Makers' found in CTA button.");
    } else {
      console.error("  ❌ 'Call Decision Makers' NOT found! Text was:", waitlistText);
      allPassed = false;
    }

    const phoneLink = waitlistSection.locator("a[href^='tel:']");
    const href = await phoneLink.getAttribute("href");
    const ariaLabel = await phoneLink.getAttribute("aria-label");
    console.log(`  📞 Phone link href: ${href}, aria-label: ${ariaLabel}`);
    if (href === "tel:+917451812065" && ariaLabel?.includes("Call Decision Makers")) {
      console.log("  ✅ Phone call functionality & aria-label verified.");
    } else {
      console.error("  ❌ Phone link or aria-label mismatch!");
      allPassed = false;
    }

    // 3. Check Header Navbar CTA Button (WhatsApp Green)
    console.log("🧪 3. Testing Header Navbar Button styling (WhatsApp Green)...");
    const headerCta = page.locator("header a:has-text('Get a Custom Quote')");
    const ctaClasses = await headerCta.getAttribute("class");
    console.log(`  🎨 Header CTA Classes: ${ctaClasses}`);
    if (ctaClasses?.includes("clay-btn-whatsapp")) {
      console.log("  ✅ Header CTA button has 'clay-btn-whatsapp' class.");
    } else {
      console.error("  ❌ Header CTA missing 'clay-btn-whatsapp'!");
      allPassed = false;
    }

    const ctaBgColor = await headerCta.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        bg: styles.backgroundColor,
        color: styles.color,
      };
    });
    console.log(`  🎨 Computed styles: background=${ctaBgColor.bg}, color=${ctaBgColor.color}`);

    // Check Mobile Menu Header CTA
    console.log("🧪 3b. Testing Mobile Navigation Menu Button...");
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await mobileContext.addInitScript(() => {
      localStorage.setItem("navya-terms-accepted", "true");
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const mobileMenuBtn = mobilePage.locator("button[aria-label='Open menu']");
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      await mobilePage.waitForTimeout(500);
      const mobileCta = mobilePage.locator("a:has-text('Start a Project Now')").first();
      const mobileCtaClass = await mobileCta.getAttribute("class").catch(() => "");
      console.log(`  📱 Mobile Nav CTA class: ${mobileCtaClass}`);
      if (mobileCtaClass?.includes("clay-btn-whatsapp")) {
        console.log("  ✅ Mobile menu CTA button also has 'clay-btn-whatsapp'.");
      } else {
        console.error("  ❌ Mobile menu CTA button missing 'clay-btn-whatsapp'!");
        allPassed = false;
      }
    }
    await mobileContext.close();

    // 4. Test Footer: Founder Details Removal
    console.log("🧪 4. Testing Footer for complete removal of Founder contact block...");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    const footerText = await footer.innerText();

    const founderKeywordsInFooter = [
      "Direct Founder Contact",
      "Aryan Singh",
      "+91 74518 12065",
      "+91 93554 12903",
      "navyatechindustry@gmail.com",
      "Founder Profile",
    ];

    let foundLeak = false;
    for (const kw of founderKeywordsInFooter) {
      if (footerText.includes(kw)) {
        console.error(`  ❌ LEAK: '${kw}' still found in footer!`);
        foundLeak = true;
        allPassed = false;
      }
    }
    if (!foundLeak) {
      console.log("  ✅ Founder contact block completely removed from footer.");
    }

    // 4b. Verify Contact Page STILL HAS founder details!
    console.log("🧪 4b. Verifying dedicated /contact page STILL HAS founder details...");
    await page.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const contactText = await page.locator("body").innerText();
    if (
      contactText.includes("Aryan Singh") &&
      contactText.includes("Get in Touch with Founder") &&
      contactText.includes("+91 74518 12065")
    ) {
      console.log("  ✅ Dedicated Contact page retains all verified founder authority & contact details.");
    } else {
      console.error("  ❌ Founder details missing on /contact page!");
      allPassed = false;
    }

    // 5. Test Footer Legal Links & Copyright
    console.log("🧪 5. Testing Footer Legal Links & Copyright line...");
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const footerElem = page.locator("footer");
    await footerElem.scrollIntoViewIfNeeded();

    const termsLinks = await footerElem.locator("a[href='/terms'], a[href*='terms']").all();
    const privacyLinks = await footerElem.locator("a[href='/privacy-policy']").all();

    console.log(`  📄 Terms & Conditions links in footer: ${termsLinks.length}`);
    console.log(`  📄 Privacy Policy links in footer: ${privacyLinks.length}`);

    if (termsLinks.length === 1) {
      console.log("  ✅ Exactly ONE Terms & Conditions link in footer.");
    } else {
      console.error(`  ❌ Expected 1 Terms & Conditions link, found ${termsLinks.length}!`);
      allPassed = false;
    }

    if (privacyLinks.length === 1) {
      console.log("  ✅ Exactly ONE Privacy Policy link in footer.");
    } else {
      console.error(`  ❌ Expected 1 Privacy Policy link, found ${privacyLinks.length}!`);
      allPassed = false;
    }

    // Test clicking Terms & Conditions link
    console.log("🧪 5b. Testing Navigation to Terms & Conditions (/terms)...");
    await termsLinks[0].click();
    await page.waitForTimeout(1000);
    const termsUrl = page.url();
    const termsTitle = await page.title();
    console.log(`  📄 Current URL: ${termsUrl}`);
    console.log(`  📄 Page Title: ${termsTitle}`);
    if (termsUrl.includes("/terms") && termsTitle.includes("Terms & Conditions")) {
      console.log("  ✅ Terms & Conditions page rendered successfully with valid route.");
    } else {
      console.error("  ❌ Terms & Conditions page failed to navigate or render!");
      allPassed = false;
    }

    // Check dynamic copyright year in footer on /terms page
    const termsFooterText = await page.locator("footer").innerText();
    const currentYear = new Date().getFullYear();
    if (termsFooterText.includes(`© ${currentYear} Navya Tech Industry. All rights reserved.`)) {
      console.log(`  ✅ Dynamic copyright year (© ${currentYear}) verified.`);
    } else {
      console.error(`  ❌ Dynamic copyright year © ${currentYear} missing in footer!`);
      allPassed = false;
    }

    // 6. Test Responsive Layout & Overflow across Viewports
    console.log("🧪 6. Testing Responsive Layout & Overflow across multiple viewports...");
    const viewports = [
      { name: "Mobile S (320px)", width: 320, height: 640 },
      { name: "Mobile M (375px)", width: 375, height: 667 },
      { name: "Mobile L (390px)", width: 390, height: 844 },
      { name: "Tablet (768px)", width: 768, height: 1024 },
      { name: "Desktop (1440px)", width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(300);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (!hasHorizontalScroll) {
        console.log(`  📱 ${vp.name}: Horizontal overflow: NONE (PASS)`);
      } else {
        console.error(`  ❌ ${vp.name}: Horizontal overflow DETECTED!`);
        allPassed = false;
      }
    }

  } catch (err) {
    console.error("❌ Test crashed with error:", err);
    allPassed = false;
  } finally {
    await browser.close();
  }

  if (allPassed) {
    console.log("\n🎉 ALL CONTENT & UI UPDATES VERIFIED SUCCESSFULLY WITH 100% ACCURACY!");
    process.exit(0);
  } else {
    console.error("\n🚨 SOME VERIFICATION CHECKS FAILED!");
    process.exit(1);
  }
}

main();
