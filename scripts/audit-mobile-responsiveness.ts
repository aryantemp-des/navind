import { chromium } from "playwright";

const VIEWPORTS = [
  { name: "Small Mobile (320px)", width: 320, height: 568 },
  { name: "Standard Mobile (360px)", width: 360, height: 640 },
  { name: "iPhone SE (375px)", width: 375, height: 667 },
  { name: "iPhone 12/13/14 (390px)", width: 390, height: 844 },
  { name: "Large Mobile (414px)", width: 414, height: 896 },
  { name: "iPhone Pro Max (430px)", width: 430, height: 932 },
  { name: "Small Tablet (600px)", width: 600, height: 960 },
  { name: "Tablet Portrait (768px)", width: 768, height: 1024 },
  { name: "Tablet Landscape (1024px)", width: 1024, height: 768 },
  { name: "Laptop (1280px)", width: 1280, height: 800 },
];

const ROUTES = [
  "/",
  "/services",
  "/services/website-development",
  "/services/seo",
  "/services/geo",
  "/services/aeo",
  "/industries",
  "/industries/saas",
  "/pricing",
  "/contact",
  "/get-started",
  "/request-a-quote",
  "/blog",
  "/resources",
  "/privacy-policy",
  "/terms",
  "/internet-marketing-company-india",
];

async function runAudit() {
  console.log("📱 Launching Mobile Responsiveness & Horizontal Overflow Audit...");
  const browser = await chromium.launch({ headless: true });
  
  const issues: { route: string; viewport: string; overflow: number; offendingElements: string[] }[] = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n🔍 Checking Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      try {
        await page.goto(`http://localhost:5173${route}`, { waitUntil: "domcontentloaded", timeout: 10000 });
        await page.waitForTimeout(600); // allow hydration & layout

        // Check horizontal overflow
        const overflowData = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const windowWidth = window.innerWidth;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasOverflow = scrollWidth > windowWidth + 1;

          let offenders: string[] = [];
          if (hasOverflow) {
            const allElements = document.querySelectorAll("*");
            for (const el of Array.from(allElements)) {
              const rect = el.getBoundingClientRect();
              if (rect.right > windowWidth + 2) {
                const tag = el.tagName.toLowerCase();
                const cls = (el.className && typeof el.className === "string") ? el.className.slice(0, 50) : "";
                const id = el.id ? `#${el.id}` : "";
                offenders.push(`${tag}${id}.${cls.trim().replace(/\s+/g, ".")} [right: ${Math.round(rect.right)}px vs ${windowWidth}px]`);
              }
            }
          }
          return {
            hasOverflow,
            scrollWidth,
            windowWidth,
            diff: scrollWidth - windowWidth,
            offenders: offenders.slice(0, 5),
          };
        });

        if (overflowData.hasOverflow) {
          console.warn(`⚠️ [${vp.name}] ${route}: Overflow by ${overflowData.diff}px! ScrollWidth: ${overflowData.scrollWidth}px vs Window: ${overflowData.windowWidth}px`);
          if (overflowData.offenders.length > 0) {
            console.warn(`   Offenders:`, overflowData.offenders);
          }
          issues.push({
            route,
            viewport: vp.name,
            overflow: overflowData.diff,
            offendingElements: overflowData.offenders,
          });
        }
      } catch (err: any) {
        console.error(`❌ Error testing ${route} on ${vp.name}: ${err.message}`);
      }
    }
    await context.close();
  }

  await browser.close();

  console.log("\n================ AUDIT SUMMARY ================");
  console.log(`Total overflow issues detected: ${issues.length}`);
  if (issues.length > 0) {
    for (const issue of issues) {
      console.log(`- ${issue.viewport} on ${issue.route}: +${issue.overflow}px overflow (${issue.offendingElements[0] || "unknown"})`);
    }
  } else {
    console.log("🎉 Perfect! Zero horizontal overflow across all tested routes and viewports!");
  }
}

runAudit();
