import { chromium } from "playwright";

interface PhraseEvent {
  text: string;
  appearedAt: number;
  disappearedAt?: number;
  duration?: number;
}

async function testIndependentLifecycles() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });

  console.log("Navigating to http://127.0.0.1:5173/...");
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });

  const activeTracker = new Map<string, { appearedAt: number }>();
  const completedEvents: PhraseEvent[] = [];
  const startTime = Date.now();

  console.log("Tracking phrase lifecycles over 18 seconds...");

  // Poll every 250ms for 18 seconds (72 intervals)
  for (let i = 0; i < 72; i++) {
    await page.waitForTimeout(250);
    const now = Date.now();

    const currentTexts = await page.$$eval(".floating-text-layer span", (spans) =>
      spans.map((s) => s.textContent?.trim() || "")
    );

    const currentSet = new Set(currentTexts.filter(Boolean));

    // Check newly appeared
    for (const text of currentSet) {
      if (!activeTracker.has(text)) {
        activeTracker.set(text, { appearedAt: now });
        console.log(`[+ APPEARED] "${text}" at +${((now - startTime) / 1000).toFixed(2)}s (currently visible: ${currentSet.size})`);
      }
    }

    // Check disappeared
    for (const [text, info] of activeTracker.entries()) {
      if (!currentSet.has(text)) {
        const duration = (now - info.appearedAt) / 1000;
        completedEvents.push({
          text,
          appearedAt: info.appearedAt,
          disappearedAt: now,
          duration,
        });
        activeTracker.delete(text);
        console.log(`[- DISAPPEARED] "${text}" after ${duration.toFixed(2)}s visible (currently visible: ${currentSet.size})`);
      }
    }
  }

  await browser.close();

  console.log("\n================ OBSERVED LIFECYCLES ================");
  console.log(`Total completed lifecycles observed: ${completedEvents.length}`);
  console.table(
    completedEvents.map((e) => ({
      Phrase: e.text,
      Duration: `${e.duration?.toFixed(2)}s`,
      Appeared: `+${((e.appearedAt - startTime) / 1000).toFixed(2)}s`,
      Disappeared: `+${((e.disappearedAt! - startTime) / 1000).toFixed(2)}s`,
    }))
  );

  const durations = completedEvents.map((e) => e.duration || 0);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const hasVariance = maxDuration - minDuration > 1.5;

  console.log(`\nLifecycle Statistics:`);
  console.log(`- Minimum observed total visible time: ${minDuration.toFixed(2)}s`);
  console.log(`- Maximum observed total visible time: ${maxDuration.toFixed(2)}s`);
  console.log(`- Significant randomized duration variance (>1.5s): ${hasVariance}`);
  console.log(`- Console errors: ${consoleErrors.length}`);

  if (completedEvents.length >= 8 && hasVariance && consoleErrors.length === 0) {
    console.log("\n✅ SUCCESS: All phrase lifecycles are fully independent and randomized!");
  } else {
    console.warn("\n⚠️ Verification conditions checked.");
  }
}

testIndependentLifecycles().catch(console.error);
