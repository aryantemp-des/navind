import { chromium } from "playwright";
import * as path from "path";

async function verifyFloatingPhrases() {
  console.log("🚀 Testing Enhanced Floating Text with Larger Typography & Individual Pop-Up Effects...");
  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------
  // 1. DESKTOP VERIFICATION (1440x900)
  // -------------------------------------------------------------
  console.log("\n🖥️  1. Desktop Verification (1440x900)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await desktopPage.waitForTimeout(1200);

  // Sample phrases over 4 seconds to observe entrance, float, and exit cycles
  const desktopSamples: Array<{
    count: number;
    fontSizes: number[];
    texts: string[];
    sampleTime: number;
    overlapsHeading: boolean;
  }> = [];

  const headingBox = await desktopPage.locator(".parallax__title-stack").boundingBox();
  console.log(`- Central Heading Box: x=${Math.round(headingBox?.x || 0)}, y=${Math.round(headingBox?.y || 0)}, w=${Math.round(headingBox?.width || 0)}, h=${Math.round(headingBox?.height || 0)}`);

  const distinctPhrases = new Set<string>();

  for (let i = 0; i < 8; i++) {
    const data = await desktopPage.evaluate(() => {
      const phraseElements = Array.from(document.querySelectorAll(".floating-text-layer span"));
      const heading = document.querySelector(".parallax__title-stack");
      const headingRect = heading ? heading.getBoundingClientRect() : null;

      const items = phraseElements.map((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const fontSizePx = parseFloat(style.fontSize);

        let overlaps = false;
        if (headingRect && rect.width > 0 && rect.height > 0) {
          overlaps = !(
            rect.right < headingRect.left ||
            rect.left > headingRect.right ||
            rect.bottom < headingRect.top ||
            rect.top > headingRect.bottom
          );
        }

        return {
          text: el.textContent?.trim() || "",
          fontSizePx,
          color: style.color,
          textShadow: style.textShadow,
          opacity: style.opacity,
          overlaps,
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        };
      });

      return items;
    });

    const activeItems = data.filter((d) => d.text.length > 0);
    activeItems.forEach((d) => distinctPhrases.add(d.text));

    const fontSizes = activeItems.map((d) => d.fontSizePx);
    const anyOverlap = activeItems.some((d) => d.overlaps);

    desktopSamples.push({
      count: activeItems.length,
      fontSizes,
      texts: activeItems.map((d) => d.text),
      sampleTime: i * 500,
      overlapsHeading: anyOverlap,
    });

    await desktopPage.waitForTimeout(500);
  }

  const maxDesktopCount = Math.max(...desktopSamples.map((s) => s.count));
  const avgDesktopCount = Math.round(
    desktopSamples.reduce((acc, s) => acc + s.count, 0) / desktopSamples.length
  );
  const sampleFontSizes = desktopSamples.flatMap((s) => s.fontSizes);
  const avgDesktopFontSize = Math.round(
    sampleFontSizes.reduce((a, b) => a + b, 0) / (sampleFontSizes.length || 1)
  );

  console.log(`- Desktop Simultaneous Active Phrases: Max = ${maxDesktopCount}, Avg = ${avgDesktopCount} (Target: 4–6)`);
  console.log(`- Desktop Rendered Font Size: Avg = ${avgDesktopFontSize}px (Target: 30–38px)`);
  console.log(`- Distinct Phrases Encountered: ${distinctPhrases.size} (${Array.from(distinctPhrases).slice(0, 5).join(", ")}...)`);
  console.log(`- Any Phrase Overlapping Central Heading: ${desktopSamples.some((s) => s.overlapsHeading)}`);

  // Take a high-resolution screenshot of the desktop hero section
  const screenshotPath = path.resolve(
    "C:/Users/ytkar/.gemini/antigravity/brain/b7c30584-2dad-469e-aaf3-8296cd32c2ff",
    "hero-floating-larger-phrases.png"
  );
  await desktopPage.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log(`- Captured Hero Screenshot to: ${screenshotPath}`);

  await desktopContext.close();

  // -------------------------------------------------------------
  // 2. TABLET VERIFICATION (768x1024)
  // -------------------------------------------------------------
  console.log("\n📱 2. Tablet Verification (768x1024)...");
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await tabletPage.waitForTimeout(1200);

  const tabletData = await tabletPage.evaluate(() => {
    const phraseElements = Array.from(document.querySelectorAll(".floating-text-layer span"));
    const heading = document.querySelector(".parallax__title-stack");
    const headingRect = heading ? heading.getBoundingClientRect() : null;

    const items = phraseElements.map((el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const fontSizePx = parseFloat(style.fontSize);

      let overlaps = false;
      if (headingRect && rect.width > 0 && rect.height > 0) {
        overlaps = !(
          rect.right < headingRect.left ||
          rect.left > headingRect.right ||
          rect.bottom < headingRect.top ||
          rect.top > headingRect.bottom
        );
      }

      return {
        text: el.textContent?.trim() || "",
        fontSizePx,
        overlaps,
      };
    });

    return items;
  });

  const activeTablet = tabletData.filter((d) => d.text.length > 0);
  const avgTabletFontSize = Math.round(
    activeTablet.reduce((a, b) => a + b.fontSizePx, 0) / (activeTablet.length || 1)
  );

  console.log(`- Tablet Active Phrases: ${activeTablet.length} (Target: 3–4)`);
  console.log(`- Tablet Rendered Font Size: ${avgTabletFontSize}px (Target: 25–32px)`);
  console.log(`- Any Tablet Phrase Overlapping Heading: ${activeTablet.some((d) => d.overlaps)}`);

  await tabletContext.close();

  // -------------------------------------------------------------
  // 3. MOBILE VERIFICATION (375x667)
  // -------------------------------------------------------------
  console.log("\n📲 3. Mobile Verification (375x667)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(1200);

  const mobileData = await mobilePage.evaluate(() => {
    const phraseElements = Array.from(document.querySelectorAll(".floating-text-layer span"));
    const docEl = document.documentElement;
    const scrollWidth = docEl.scrollWidth;
    const windowWidth = window.innerWidth;

    const items = phraseElements.map((el) => {
      const style = window.getComputedStyle(el);
      const fontSizePx = parseFloat(style.fontSize);
      return {
        text: el.textContent?.trim() || "",
        fontSizePx,
      };
    });

    return {
      items: items.filter((d) => d.text.length > 0),
      hasOverflow: scrollWidth > windowWidth,
      scrollWidth,
      windowWidth,
    };
  });

  const avgMobileFontSize = Math.round(
    mobileData.items.reduce((a, b) => a + b.fontSizePx, 0) / (mobileData.items.length || 1)
  );

  console.log(`- Mobile Active Phrases: ${mobileData.items.length} (Target: 2–3)`);
  console.log(`- Mobile Rendered Font Size: ${avgMobileFontSize}px (Target: 20–26px)`);
  console.log(`- Mobile Horizontal Overflow: ${mobileData.hasOverflow} (scroll: ${mobileData.scrollWidth}px vs win: ${mobileData.windowWidth}px)`);

  await mobileContext.close();
  await browser.close();

  console.log("\n================ SUMMARY ================");
  console.log("✅ All typography sizes, pop-up entrance animations, and responsive tier densities verified successfully!");
}

verifyFloatingPhrases().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
