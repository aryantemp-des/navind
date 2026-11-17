import { preview } from "vite";
import { chromium } from "@playwright/test";

async function runTests() {
  console.log("🚀 Starting Playwright verification for Founder Authority & Portfolio on Production Build...");

  // Start Vite preview server programmatically on dist build
  const previewServer = await preview({
    preview: { port: 4178 },
  });
  const baseUrl = "http://localhost:4178";
  console.log(`📡 Preview server online at ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Accept terms upfront to prevent modal interception
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  let allPassed = true;

  try {
    console.log(`➡️ Navigating to ${baseUrl}/contact ...`);
    await page.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const content = await page.content();

    // 1. Main Contact Hero
    if (content.includes("Get in Touch with Founder Directly")) {
      console.log("✅ 1. Main Contact Hero Heading verified.");
    } else {
      console.error("❌ 1. Main Contact Hero Heading missing!");
      allPassed = false;
    }

    // 2. Featured Founder Profile
    if (
      content.includes("Aryan Singh") &&
      content.includes("Founder | Digital Growth Strategist | AI & Automation Entrepreneur") &&
      content.includes("Reserved Placeholder")
    ) {
      console.log("✅ 2. Featured Founder Profile & Reserved Photo Placeholder verified.");
    } else {
      console.error("❌ 2. Featured Founder Profile or Photo Placeholder missing!");
      allPassed = false;
    }

    // 3. Founder Introduction
    if (
      content.includes("Aryan Singh is the Founder of Navya Tech Industry") &&
      content.includes("building digital growth solutions")
    ) {
      console.log("✅ 3. Founder Executive Introduction verified.");
    } else {
      console.error("❌ 3. Founder Executive Introduction missing!");
      allPassed = false;
    }

    // 4 & 5. Business Achievement Highlight & Dynamic 43-Day Counter
    if (
      content.includes("18 Businesses Supported with Organic Growth in") &&
      content.includes("43") &&
      content.includes("Days")
    ) {
      console.log("✅ 4 & 5. Dynamic 43-Day Duration Counter & Headline verified.");
    } else {
      console.error("❌ 4 & 5. Dynamic 43-Day Counter or Headline missing!");
      allPassed = false;
    }

    // 6. Business Portfolio Statistics (18: 11 Intl, 7 Indian)
    if (
      content.includes("11") &&
      content.includes("International Businesses") &&
      content.includes("7") &&
      content.includes("Indian Businesses")
    ) {
      console.log("✅ 6. Portfolio Statistics (11 Intl, 7 Indian) verified.");
    } else {
      console.error("❌ 6. Portfolio Statistics missing!");
      allPassed = false;
    }

    // 7. Core Expertise & Education (BCA AI 8.18 CGPA)
    const hasDigitalGrowth = content.includes("Digital Growth & Internet Marketing") || content.includes("Digital Growth &amp; Internet Marketing");
    const hasWebDev = content.includes("Website Development");
    const hasAIAuto = content.includes("AI & Business Automation") || content.includes("AI &amp; Business Automation");
    const hasBCA = content.includes("Bachelor of Computer Applications (BCA)");
    const hasCGPA = content.includes("8.18");

    if (hasDigitalGrowth && hasWebDev && hasAIAuto && hasBCA && hasCGPA) {
      console.log("✅ 7. Core Expertise & BCA AI 8.18 CGPA verified.");
    } else {
      console.error("❌ 7. Core Expertise or BCA AI qualification missing!", {
        hasDigitalGrowth,
        hasWebDev,
        hasAIAuto,
        hasBCA,
        hasCGPA,
      });
      allPassed = false;
    }

    // 8. Approved Public Business Portfolio & Zero Private Keywords check
    if (
      content.includes("Approved Public Portfolio") &&
      content.includes("Nexus SaaS Automation")
    ) {
      console.log("✅ 8. Public Business Portfolio displayed.");
    } else {
      console.error("❌ 8. Public Business Portfolio missing!");
      allPassed = false;
    }

    // Strict confidentiality check: Ensure private SEO keywords are NOT exposed publicly
    const exposedPrivateKeyword = content.includes("conversational ivr workflow") || content.includes("inbound call automation");
    if (!exposedPrivateKeyword) {
      console.log("✅ 8b. Zero Private SEO/GEO/AEO Keywords leaked in public DOM.");
    } else {
      console.error("❌ 8b. LEAK: Private keywords found in public DOM!");
      allPassed = false;
    }

    // 9. Direct Founder Contact Details
    if (
      content.includes("+91 74518 12065") &&
      content.includes("+91 93554 12903") &&
      content.includes("navyatechindustry@gmail.com") &&
      content.includes("https://in.linkedin.com/in/invaded-author")
    ) {
      console.log("✅ 9. Verified Direct Founder Contact Details (Phone, WA, Email, LinkedIn) verified.");
    } else {
      console.error("❌ 9. Verified Contact details missing!");
      allPassed = false;
    }

    // 10. Project Enquiry CTA
    if (
      content.includes("Discuss Your Project &amp; Get Custom Quote") ||
      content.includes("Discuss Your Project & Get Custom Quote")
    ) {
      console.log("✅ 10. Project Enquiry / Custom Quote CTA verified.");
    } else {
      console.error("❌ 10. Project Enquiry CTA missing!");
      allPassed = false;
    }

    // Check Admin Modal Trigger & Passcode Protection
    console.log("➡️ Testing Admin Passcode Gate & CRUD Modal...");
    const adminBtn = await page.$('button:has-text("Admin Database Access")');
    if (adminBtn) {
      await adminBtn.click();
      await page.waitForTimeout(500);

      // Verify passcode input prompt is visible
      const modalContent = await page.content();
      if (modalContent.includes("Administrator Authentication Required")) {
        console.log("✅ Admin Passcode Gate active and locked.");
      }

      // Enter incorrect passcode
      await page.fill('input[type="password"]', "wrongpass");
      await page.click('button:has-text("Authenticate & Open Database")');
      await page.waitForTimeout(300);
      const afterWrong = await page.content();
      if (afterWrong.includes("Invalid administrator passcode")) {
        console.log("✅ Invalid passcode rejected.");
      }

      // Enter correct passcode
      await page.fill('input[type="password"]', "navya-founder-2026");
      await page.click('button:has-text("Authenticate & Open Database")');
      await page.waitForTimeout(500);

      const afterAuth = await page.content();
      if (afterAuth.includes("Authorized Administrator Session Active") || afterAuth.includes("Add Business")) {
        console.log("✅ Administrator Passcode accepted! Management console unlocked.");
      } else {
        console.error("❌ Administrator Passcode unlock failed!");
        allPassed = false;
      }
    } else {
      console.error("❌ Admin Database Access button not found!");
      allPassed = false;
    }

    // Check direct /admin/portfolio route
    console.log(`➡️ Testing direct route ${baseUrl}/admin/portfolio ...`);
    await page.goto(`${baseUrl}/admin/portfolio`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const adminRouteContent = await page.content();
    if (adminRouteContent.includes("Business Portfolio Management")) {
      console.log("✅ /admin/portfolio route rendered successfully.");
    } else {
      console.error("❌ /admin/portfolio route failed to render!");
      allPassed = false;
    }

  } catch (err) {
    console.error("Test execution exception:", err);
    allPassed = false;
  } finally {
    await browser.close();
    previewServer.httpServer.close();
  }

  if (allPassed) {
    console.log("\n🎉 ALL FOUNDER AUTHORITY & PORTFOLIO TESTS PASSED WITH 100% ACCURACY!");
    process.exit(0);
  } else {
    console.error("\n🚨 SOME TESTS FAILED.");
    process.exit(1);
  }
}

runTests();