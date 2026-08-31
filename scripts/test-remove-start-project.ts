import { createServer } from "vite";
import { chromium } from "@playwright/test";

const INDIVIDUAL_SERVICES = [
  { num: "01", name: "Website Development", route: "/services/website-development" },
  { num: "02", name: "Website Design & UI/UX", route: "/services/website-design" },
  { num: "03", name: "3D & WebGL Development", route: "/services/3d-website-development" },
  { num: "04", name: "Custom Web Development", route: "/services/custom-web-development" },
  { num: "05", name: "Landing Page Development", route: "/services/landing-page-development" },
  { num: "06", name: "Website Performance & CWV", route: "/services/website-performance-optimization" },
  { num: "07", name: "Business Website Development", route: "/services/business-website-development" },
  { num: "08", name: "Ecommerce Website Development", route: "/services/ecommerce-website-development" },
  { num: "09", name: "Web App Development", route: "/services/web-app-development" },
  { num: "10", name: "Website Redesign", route: "/services/website-redesign" },
  { num: "11", name: "Website Maintenance", route: "/services/website-maintenance" },
  { num: "12", name: "Technical SEO", route: "/services/technical-seo" },
];

async function testRemoveStartProject() {
  console.log("🚀 Launching Vite dev server for Start Project Removal QA...");
  const server = await createServer({
    server: { port: 5196 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5196";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. CHECKING ALL 12 INDIVIDUAL SERVICE PAGES");
    console.log("=================================================");

    for (const service of INDIVIDUAL_SERVICES) {
      await page.goto(`${baseUrl}${service.route}`, { waitUntil: "networkidle" });
      const h1Text = await page.locator("h1").first().innerText();

      // Check hero action buttons specifically
      const heroButtons = page.locator("section.relative.w-full.pt-4.pb-16 a, section.relative.w-full.md\\:py-20 a");
      const heroButtonTexts = await heroButtons.allInnerTexts();
      const heroButtonHrefs = await heroButtons.evaluateAll((list) => list.map((a) => a.getAttribute("href")));

      const hasStartProjectInHero = heroButtonTexts.some((txt) => txt.toLowerCase().includes("start project"));

      console.log(`\n  🔎 [${service.num}] ${service.name} (${service.route})`);
      console.log(`     H1: "${h1Text}"`);
      console.log(`     Hero Buttons Found: ${JSON.stringify(heroButtonTexts.map(t => t.trim()))}`);
      console.log(`     Start Project in Hero: ${hasStartProjectInHero ? "❌ STILL PRESENT" : "✅ REMOVED"}`);

      if (hasStartProjectInHero) {
        throw new Error(`❌ Found 'Start Project' button in hero on ${service.route}`);
      }

      // Check WhatsApp CTA button exists
      const whatsappBtn = page.locator('a[href^="https://wa.me/919355412903"]').first();
      const whatsappExists = await whatsappBtn.count();
      console.log(`     WhatsApp CTA: ${whatsappExists > 0 ? "✅ Verified" : "⚠️ Missing"}`);
    }

    console.log("\n=================================================");
    console.log("🧪 2. VERIFYING /services ECOSYSTEM CTA PRESERVED");
    console.log("=================================================");
    await page.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const servicesBtn = page.locator('main a.clay-btn-primary:has-text("Services")').first();
    const servicesBtnHref = await servicesBtn.getAttribute("href");
    console.log(`  ✅ /services Hero CTA: "${await servicesBtn.innerText()}" -> "${servicesBtnHref}"`);
    if (servicesBtnHref !== "#explore-services") {
      throw new Error(`Expected /services hero CTA to be #explore-services, got ${servicesBtnHref}`);
    }

    console.log("\n=================================================");
    console.log("🧪 3. VERIFYING /get-started CTA PRESERVED");
    console.log("=================================================");
    await page.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });
    const getStartedBtn = page.locator('main a.clay-btn-primary:has-text("Start Project")').first();
    const getStartedHref = await getStartedBtn.getAttribute("href");
    console.log(`  ✅ /get-started Hero CTA: "${await getStartedBtn.innerText()}" -> "${getStartedHref}"`);
    if (getStartedHref !== "/services") {
      throw new Error(`Expected /get-started hero CTA to be /services, got ${getStartedHref}`);
    }

    console.log("\n=================================================");
    console.log("🎉 ALL 12 SERVICE PAGES VERIFIED — START PROJECT REMOVED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

testRemoveStartProject().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
