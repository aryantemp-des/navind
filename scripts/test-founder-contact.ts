import { createServer } from "vite";
import { chromium } from "@playwright/test";

async function testFounderContactSection() {
  console.log("🚀 Launching Vite dev server for Founder Contact QA...");
  const server = await createServer({
    server: { port: 5198 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5198";

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // TEST 1: DESKTOP AUDIT OF /contact
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 1. DESKTOP VIEWPORT TEST (1440x900) - /contact");
    console.log("=================================================");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });

    // Verify Title & H1
    const title = await page.title();
    console.log(`  📄 Page Title: "${title}"`);
    if (!title.includes("Get in Touch with Founder Directly")) {
      throw new Error(`Unexpected page title: "${title}"`);
    }

    const h2 = await page.locator("#founder-direct h2").first().innerText();
    console.log(`  🏷️  Main Heading: "${h2}"`);
    if (h2.trim() !== "Get in Touch with Founder Directly") {
      throw new Error(`Unexpected Main Heading: "${h2}"`);
    }

    // Verify Supporting description
    const introSubheading = await page.locator("#founder-direct p").first().innerText();
    console.log(`  📝 Subheading: "${introSubheading}"`);
    if (!introSubheading.includes("Connect directly with our founder to discuss your requirements")) {
      throw new Error(`Missing expected subheading copy: "${introSubheading}"`);
    }

    // Founder Name and Designation
    const founderName = await page.locator("#founder-direct").locator("text=Aryan Singh").first().innerText();
    const designation = await page.locator("#founder-direct").locator("text=Founder, Navya Tech Industry").first().innerText();
    console.log(`  👤 Founder: ${founderName} | ${designation}`);

    // Verify Personal Introduction copy
    const personalIntro = await page.locator("#founder-direct").locator("text=At Navya Tech Industry, we believe every business deserves technology and digital solutions").first().innerText();
    console.log(`  💬 Personal Intro: "${personalIntro.substring(0, 80)}..."`);

    // Verify Verified Contact details
    // LinkedIn
    const linkedinLink = await page.locator('a[href="https://in.linkedin.com/in/invaded-author"]').first();
    const linkedinText = await linkedinLink.innerText();
    console.log(`  🔗 LinkedIn link found: "${linkedinText}" -> https://in.linkedin.com/in/invaded-author`);
    if (!linkedinText.includes("Connect on LinkedIn")) {
      throw new Error(`Expected 'Connect on LinkedIn', got '${linkedinText}'`);
    }

    // Phone
    const phoneLink = await page.locator('a[href="tel:+917451812065"]').first();
    const phoneText = await phoneLink.innerText();
    console.log(`  📞 Phone link found: "${phoneText}" -> tel:+917451812065`);
    if (!phoneText.includes("+91 74518 12065")) {
      throw new Error(`Expected phone '+91 74518 12065', got '${phoneText}'`);
    }

    // WhatsApp
    const whatsappLink = await page.locator('a[href^="https://wa.me/919355412903"]').first();
    const whatsappText = await whatsappLink.innerText();
    console.log(`  💬 WhatsApp link found: "${whatsappText}" -> https://wa.me/919355412903`);
    if (!whatsappText.includes("+91 93554 12903") && !whatsappText.includes("Chat on WhatsApp")) {
      throw new Error(`Expected WhatsApp '+91 93554 12903', got '${whatsappText}'`);
    }

    // Email
    const emailLink = await page.locator('a[href="mailto:navyatechindustry@gmail.com"]').first();
    const emailText = await emailLink.innerText();
    console.log(`  ✉️ Email link found: "${emailText}" -> mailto:navyatechindustry@gmail.com`);
    if (!emailText.includes("navyatechindustry@gmail.com")) {
      throw new Error(`Expected email 'navyatechindustry@gmail.com', got '${emailText}'`);
    }

    // Photograph Placeholder Check (No stock faces or random images)
    const photoBadge = await page.locator("#founder-direct").locator("text=AS").first().innerText();
    const officialBadge = await page.locator("#founder-direct").locator("text=Official Profile").first().innerText();
    console.log(`  🖼️ Photo Placeholder Area: Monogram "${photoBadge}", Badge "${officialBadge}"`);

    // -------------------------------------------------------------
    // TEST 2: MOBILE AUDIT OF /contact (375x667)
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 2. MOBILE VIEWPORT TEST (375x667) - /contact");
    console.log("=================================================");
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await mobilePage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });

    const mobileH2 = await mobilePage.locator("#founder-direct h2").first().innerText();
    console.log(`  📱 Mobile Main Heading: "${mobileH2}"`);
    const mobilePhone = await mobilePage.locator('a[href="tel:+917451812065"]').first().isVisible();
    const mobileWA = await mobilePage.locator('a[href^="https://wa.me/919355412903"]').first().isVisible();
    const mobileEmail = await mobilePage.locator('a[href="mailto:navyatechindustry@gmail.com"]').first().isVisible();
    console.log(`  📱 Mobile Contact Actions Visibility: Phone=${mobilePhone}, WA=${mobileWA}, Email=${mobileEmail}`);
    if (!mobilePhone || !mobileWA || !mobileEmail) {
      throw new Error("Mobile contact actions are not all visible!");
    }

    // -------------------------------------------------------------
    // TEST 3: PRICING STEP 3 FOUNDER CONSULTATION INTEGRATION
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 3. PRICING STEP 3 FOUNDER CONSULTATION TEST");
    console.log("=================================================");
    await page.goto(`${baseUrl}/pricing`, { waitUntil: "networkidle" });

    // Step 1: Select a service and proceed to Step 2
    const firstService = page.locator("text=Website Development").first();
    await firstService.click();
    await page.locator("text=Proceed to Step 2: Business Details").click();

    // Step 2: Fill required fields
    await page.fill('input[placeholder="e.g. Acme Tech Solutions"]', "Founder Test Corp");
    await page.fill('input[placeholder="e.g. John Doe"]', "John FounderTester");
    await page.fill('input[placeholder="john@example.com"]', "john@example.com");
    await page.fill('input[placeholder="+91 93554 12903"]', "+91 99999 88888");
    await page.locator("text=Proceed to Step 3: Consult Decision-Makers").click();

    // Step 3: Verify Founder Section
    const founderStepHeading = await page.locator("text=Want to discuss your project directly with our founder?").first().innerText();
    console.log(`  🎯 Pricing Step 3 Heading: "${founderStepHeading}"`);
    if (!founderStepHeading.includes("Want to discuss your project directly with our founder?")) {
      throw new Error(`Pricing Step 3 founder prompt missing!`);
    }

    const step3Aryan = await page.locator("#pricing-founder-consultation").locator("text=Aryan Singh").first().innerText();
    const step3Phone = await page.locator('#pricing-founder-consultation a[href="tel:+917451812065"]').first().isVisible();
    const step3WA = await page.locator('#pricing-founder-consultation a[href^="https://wa.me/919355412903"]').first().isVisible();
    const step3Email = await page.locator('#pricing-founder-consultation a[href="mailto:navyatechindustry@gmail.com"]').first().isVisible();
    const step3LinkedIn = await page.locator('#pricing-founder-consultation a[href="https://in.linkedin.com/in/invaded-author"]').first().isVisible();

    console.log(`  🎯 Pricing Step 3 Profile: Name="${step3Aryan}", Phone=${step3Phone}, WA=${step3WA}, Email=${step3Email}, LinkedIn=${step3LinkedIn}`);
    if (!step3Phone || !step3WA || !step3Email || !step3LinkedIn) {
      throw new Error("Founder contact links missing in Pricing Step 3!");
    }

    // -------------------------------------------------------------
    // TEST 4: FOOTER FOUNDER CONTACT DETAILS
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 4. FOOTER FOUNDER CONTACT TEST");
    console.log("=================================================");
    const footerPhone = await page.locator('footer a[href="tel:+917451812065"]').first().isVisible();
    const footerWA = await page.locator('footer a[href^="https://wa.me/919355412903"]').first().isVisible();
    const footerEmail = await page.locator('footer a[href="mailto:navyatechindustry@gmail.com"]').first().isVisible();
    const footerLinkedIn = await page.locator('footer a[href="https://in.linkedin.com/in/invaded-author"]').first().isVisible();
    const footerContactLink = await page.locator('footer a[href="/contact"]').first().isVisible();

    console.log(`  🦶 Footer Verification: Phone=${footerPhone}, WA=${footerWA}, Email=${footerEmail}, LinkedIn=${footerLinkedIn}, ContactPage=${footerContactLink}`);
    if (!footerPhone || !footerWA || !footerEmail || !footerLinkedIn || !footerContactLink) {
      throw new Error("Footer missing one or more founder contact details!");
    }

    // -------------------------------------------------------------
    // TEST 5: HOMEPAGE FOUNDER CALL ACTION
    // -------------------------------------------------------------
    console.log("\n=================================================");
    console.log("🧪 5. HOMEPAGE HERO CONTACT ACTIONS TEST");
    console.log("=================================================");
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const heroPhone = await page.locator('a[href="tel:+917451812065"]').first().isVisible();
    const heroWA = await page.locator('a[href^="https://wa.me/919355412903"]').first().isVisible();
    const heroContactLink = await page.locator('a[href="/contact"]').first().isVisible();

    console.log(`  🏠 Homepage Verification: CallFounder=${heroPhone}, WA=${heroWA}, ContactPageLink=${heroContactLink}`);
    if (!heroPhone || !heroWA || !heroContactLink) {
      throw new Error("Homepage hero missing founder contact actions!");
    }

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Direct Founder Contact Section is fully verified across desktop and mobile.\n");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await browser.close();
    await server.close();
  }
}

testFounderContactSection();
