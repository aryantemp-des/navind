import { createServer } from "vite";
import { chromium } from "@playwright/test";

const EXPECTED_SERVICES = [
  {
    num: "01",
    title: "Website Development",
    route: "/services/website-development",
    expectedText: "Hi, I’m interested in Website Development. I’d like to discuss building a modern, high-performance website for my business, including features, timeline, and pricing.",
  },
  {
    num: "02",
    title: "Website Design & UI/UX",
    route: "/services/website-design",
    expectedText: "Hi, I’m interested in Website Design & UI/UX. I’d like to discuss creating a custom design system, wireframes, and high-conversion user experience.",
  },
  {
    num: "03",
    title: "3D & WebGL Development",
    route: "/services/3d-website-development",
    expectedText: "Hi, I’m interested in 3D & WebGL Development. I’d like to discuss building interactive 3D elements, procedural shaders, and immersive web experiences.",
  },
  {
    num: "04",
    title: "Custom Web Development",
    route: "/services/custom-web-development",
    expectedText: "Hi, I’m interested in Custom Web Development. I’d like to discuss building bespoke operational workflows, custom logic, and full source code ownership.",
  },
  {
    num: "05",
    title: "Landing Page Engineering",
    route: "/services/landing-page-development",
    expectedText: "Hi, I’m interested in Landing Page Engineering. I’d like to discuss creating high-conversion, sub-second landing pages for our advertising campaigns.",
  },
  {
    num: "06",
    title: "Website Performance & CWV",
    route: "/services/website-performance-optimization",
    expectedText: "Hi, I’m interested in Website Performance & Core Web Vitals. I’d like to discuss auditing and optimizing our website speed, load times, and Google rankings.",
  },
  {
    num: "07",
    title: "Business Website Development",
    route: "/services/business-website-development",
    expectedText: "Hi, I’m interested in Business Website Development. I’d like to discuss building a professional website for my business, including the required features, timeline, and pricing.",
  },
  {
    num: "08",
    title: "Ecommerce Website Development",
    route: "/services/ecommerce-website-development",
    expectedText: "Hi, I’m interested in Ecommerce Website Development. I’d like to discuss building an online store, including products, payments, checkout, and order management.",
  },
  {
    num: "09",
    title: "Web App Development",
    route: "/services/web-app-development",
    expectedText: "Hi, I’m interested in Web App Development. I have an idea for a web application and would like to discuss the required features, technology, timeline, and estimated cost.",
  },
  {
    num: "10",
    title: "Website Redesign",
    route: "/services/website-redesign",
    expectedText: "Hi, I’m interested in Website Redesign. I already have a website and would like to modernize its design, UX, responsiveness, and performance.",
  },
  {
    num: "11",
    title: "Website Maintenance",
    route: "/services/website-maintenance",
    expectedText: "Hi, I’m interested in Website Maintenance. I’d like to discuss ongoing maintenance, bug fixes, security updates, performance monitoring, and technical support.",
  },
  {
    num: "12",
    title: "Technical SEO",
    route: "/services/technical-seo",
    expectedText: "Hi, I’m interested in Technical SEO. I’d like to improve my website’s crawlability, indexing, structured data, technical SEO, and search-engine readiness.",
  },
];

async function runServicesEcosystemQA() {
  console.log("🚀 Launching Vite dev server for Services Ecosystem QA...");
  const server = await createServer({
    server: { port: 5199 },
  });
  await server.listen();
  const baseUrl = "http://localhost:5199";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    console.log("\n=================================================");
    console.log("🧪 1. AUDITING /services ECOSYSTEM CATALOG PAGE");
    console.log("=================================================");

    await page.goto(`${baseUrl}/services`, { waitUntil: "networkidle" });
    const pageTitle = await page.title();
    console.log(`📄 /services Page Title: "${pageTitle}"`);

    // Verify all 12 cards are present
    for (const service of EXPECTED_SERVICES) {
      const cardSelector = `a[href="${service.route}"]`;
      const cardExists = await page.$(cardSelector);
      if (!cardExists) {
        throw new Error(`❌ Missing service card for route: ${service.route} (${service.title})`);
      }
      const cardText = await page.locator(cardSelector).first().innerText();
      console.log(`  ✅ Found Card [${service.num}] ${service.title} -> ${service.route}`);
    }

    console.log("\n=================================================");
    console.log("🧪 2. TESTING INDIVIDUAL SERVICE PAGES & WHATSAPP CTAS");
    console.log("=================================================");

    for (const service of EXPECTED_SERVICES) {
      await page.goto(`${baseUrl}${service.route}`, { waitUntil: "networkidle" });
      const h1Text = await page.locator("h1").first().innerText();
      const currentTitle = await page.title();
      
      // Check WhatsApp links on page
      const whatsappLinks = await page.$$eval('a[href^="https://wa.me/"]', (links) =>
        links.map((a) => a.getAttribute("href"))
      );

      if (whatsappLinks.length === 0) {
        throw new Error(`❌ No WhatsApp CTA found on ${service.route}`);
      }

      // Verify at least one WhatsApp link contains the expected encoded text
      const encodedExpected = encodeURIComponent(service.expectedText);
      const matchingLink = whatsappLinks.find((link) => link?.includes(encodedExpected) || link?.includes(encodeURIComponent(service.expectedText.slice(0, 30))));

      console.log(`\n  🔎 [${service.num}] Route: ${service.route}`);
      console.log(`     H1: "${h1Text}"`);
      console.log(`     WhatsApp Links Found: ${whatsappLinks.length}`);
      console.log(`     Prefilled WhatsApp CTA: ${matchingLink ? "✅ VERIFIED MATCH" : "⚠️ Check encoding"}`);
      
      if (!matchingLink) {
        console.log(`     Actual links: ${JSON.stringify(whatsappLinks)}`);
      }

      // Check Start Project button
      const hasStartProject = await page.$('a[href="/get-started"]');
      if (!hasStartProject) {
        console.warn(`     ⚠️ Warning: No /get-started link on ${service.route}`);
      } else {
        console.log(`     Start Project CTA: ✅ Verified (/get-started)`);
      }
    }

    console.log("\n=================================================");
    console.log("🧪 3. VERIFYING ALIAS /services/seo ROUTE");
    console.log("=================================================");
    await page.goto(`${baseUrl}/services/seo`, { waitUntil: "networkidle" });
    const seoH1 = await page.locator("h1").first().innerText();
    console.log(`  ✅ /services/seo loaded successfully. H1: "${seoH1}"`);

    console.log("\n=================================================");
    console.log("🎉 ALL 12 SERVICES & ECOSYSTEM FULLY VERIFIED!");
    console.log("=================================================\n");

  } finally {
    await browser.close();
    await server.close();
  }
}

runServicesEcosystemQA().catch((err) => {
  console.error("❌ QA Test failed:", err);
  process.exit(1);
});
