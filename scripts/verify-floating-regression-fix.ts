import { chromium } from "playwright";

interface CheckResult {
  device: string;
  mounted: boolean;
  phraseCount: number;
  averageFontSize: string;
  opacityValid: boolean;
  insideHero: boolean;
  cyclesObserved: number;
  consoleErrors: string[];
}

async function verifyDevice(tierName: string, width: number, height: number): Promise<CheckResult> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  console.log(`\n=== Testing ${tierName} (${width}x${height}) ===`);
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });

  // 1. Layer mounted
  const layer = await page.$(".floating-text-layer");
  const mounted = layer !== null;
  const hero = await page.$("#parallax-title");
  const heroBox = hero ? await hero.boundingBox() : null;

  console.log(`- Layer mounted: ${mounted}`);
  console.log(`- Hero bounding box:`, heroBox);

  // 2. Layer computed style & z-index
  const layerStyle = await page.$eval(".floating-text-layer", (el) => {
    const s = window.getComputedStyle(el);
    return {
      zIndex: s.zIndex,
      position: s.position,
      display: s.display,
      visibility: s.visibility,
    };
  });
  console.log(`- Layer computed style:`, layerStyle);

  // 3. Observe phrases over 6 seconds (~5 cycles)
  let maxPhrases = 0;
  const fontSizes: number[] = [];
  let allInsideHero = true;
  let opacityFoundVisible = false;
  const seenTexts = new Set<string>();

  for (let step = 0; step < 12; step++) {
    await page.waitForTimeout(500);

    const phrases = await page.$$eval(".floating-text-layer span", (spans) =>
      spans.map((s) => {
        const item = s.parentElement; // motion.div
        const itemStyle = item ? window.getComputedStyle(item) : null;
        const spanStyle = window.getComputedStyle(s);
        const rect = s.getBoundingClientRect();
        const fSize = parseFloat(spanStyle.fontSize);
        return {
          text: s.textContent || "",
          fontSize: isNaN(fSize) ? 0 : fSize,
          opacity: itemStyle ? parseFloat(itemStyle.opacity) : 0,
          rect: { x: rect.x, y: rect.y, width: rect.width, right: rect.x + rect.width, bottom: rect.y + rect.height },
        };
      })
    );

    maxPhrases = Math.max(maxPhrases, phrases.length);

    phrases.forEach((p) => {
      seenTexts.add(p.text);
      if (p.fontSize > 0) fontSizes.push(p.fontSize);
      if (p.opacity > 0.5) opacityFoundVisible = true;

      if (heroBox) {
        // Must be horizontally within viewport and vertically within hero
        if (p.rect.x < -2 || p.rect.right > width + 2) {
          allInsideHero = false;
          console.log(`  [OVERFLOW] ${p.text} horizontally: x=${p.rect.x.toFixed(1)}, right=${p.rect.right.toFixed(1)}, viewport width=${width}`);
        }
        if (p.rect.y < -2 || p.rect.bottom > heroBox.height + 2) {
          allInsideHero = false;
          console.log(`  [OVERFLOW] ${p.text} vertically: y=${p.rect.y.toFixed(1)}, bottom=${p.rect.bottom.toFixed(1)}, hero height=${heroBox.height}`);
        }
      }
    });

    console.log(`  Step ${step + 1} (time ${(step + 1) * 0.5}s): ${phrases.length} phrases visible`);
  }

  const validFontSizes = fontSizes.filter((s) => !isNaN(s) && s > 0);
  const avgFontSize = validFontSizes.length > 0
    ? validFontSizes.reduce((a, b) => a + b, 0) / validFontSizes.length
    : 0;

  console.log(`- Observed unique phrases: ${seenTexts.size}`);
  console.log(`- Average font size: ${avgFontSize.toFixed(1)}px`);
  console.log(`- Opacity visible (>0.5): ${opacityFoundVisible}`);
  console.log(`- All phrases inside hero bounds: ${allInsideHero}`);

  // Take screenshot for visual audit
  if (tierName === "Desktop") {
    await page.screenshot({
      path: "C:/Users/ytkar/.gemini/antigravity/brain/b7c30584-2dad-469e-aaf3-8296cd32c2ff/hero-regression-fixed-desktop.png",
    });
  } else if (tierName === "Tablet") {
    await page.screenshot({
      path: "C:/Users/ytkar/.gemini/antigravity/brain/b7c30584-2dad-469e-aaf3-8296cd32c2ff/hero-regression-fixed-tablet.png",
    });
  } else if (tierName === "Mobile") {
    await page.screenshot({
      path: "C:/Users/ytkar/.gemini/antigravity/brain/b7c30584-2dad-469e-aaf3-8296cd32c2ff/hero-regression-fixed-mobile.png",
    });
  }

  await browser.close();

  return {
    device: tierName,
    mounted,
    phraseCount: maxPhrases,
    averageFontSize: `${avgFontSize.toFixed(1)}px`,
    opacityValid: opacityFoundVisible,
    insideHero: allInsideHero,
    cyclesObserved: seenTexts.size,
    consoleErrors,
  };
}

async function run() {
  const desktop = await verifyDevice("Desktop", 1440, 900);
  const tablet = await verifyDevice("Tablet", 768, 1024);
  const mobile = await verifyDevice("Mobile", 375, 667);

  console.log("\n================ FINAL VERIFICATION REPORT ================");
  console.table([desktop, tablet, mobile]);
}

run().catch(console.error);
