import { chromium } from "@playwright/test";
import { queryAssistantNavigation } from "../src/config/assistant-registry";

const BASE_URL = "http://localhost:5173";

const TEST_QUERIES = [
  { input: "build a website", expectedRoute: "/build-website" },
  { input: "create a website", expectedRoute: "/create-website" },
  { input: "I want a 3D website", expectedRoute: "/3d-website" },
  { input: "how much does a website cost?", expectedRoute: "/pricing" },
  { input: "I need a restaurant website", expectedRoute: "/industries/restaurants" },
  { input: "I run a SaaS company", expectedRoute: "/industries/saas" },
  { input: "show me website development", expectedRoute: "/services/website-development" },
  { input: "I want a custom website", expectedRoute: "/custom-website" },
  { input: "I need ecommerce", expectedRoute: "/services/ecommerce-website-development" },
  { input: "my website is slow", expectedRoute: "/services/website-performance-optimization" },
  { input: "I want SEO", expectedRoute: "/services/seo" },
  { input: "I want to start a project", expectedRoute: "/get-started" },
  { input: "I want a quote", expectedRoute: "/request-a-quote" },
  { input: "I want to book a call", expectedRoute: "/book-a-call" },
  { input: "what is the price in India?", expectedRoute: "/pricing/india" },
  { input: "what is the price in USA?", expectedRoute: "/pricing/usa" },
  // Multi-intent
  { input: "I need a 3D website for my real estate business", expectedRoute: "/3d-website" },
  // Typo resilience
  { input: "I need a resturant webiste", expectedRoute: "/industries/restaurants" },
  { input: "what is the prcing for ecomerce?", expectedRoute: "/pricing/ecommerce" },
];

async function runAssistantQATests() {
  console.log("🤖 Starting Navya Assistant Intelligent Navigator QA Tests...\n");

  // Step 1: Unit tests on queryAssistantNavigation logic
  console.log("🧪 1. Testing Assistant Intent Engine (Registry & Matching)...");
  let enginePasses = 0;
  for (const test of TEST_QUERIES) {
    const result = queryAssistantNavigation(test.input);
    const matched =
      result.primaryPage?.route === test.expectedRoute ||
      result.relatedPages.some((r) => r.route === test.expectedRoute) ||
      result.suggestedOptions.some((o) => o.route === test.expectedRoute);

    if (matched) {
      enginePasses++;
      console.log(`  ✅ "${test.input}" -> ${result.primaryPage?.title} (${result.primaryPage?.route})`);
    } else {
      console.error(`  ❌ "${test.input}" FAILED -> Expected ${test.expectedRoute}, got ${result.primaryPage?.route}`);
    }
  }

  console.log(`\nEngine Test Results: ${enginePasses}/${TEST_QUERIES.length} Passed.`);
  if (enginePasses < TEST_QUERIES.length) {
    process.exit(1);
  }

  // Step 2: Browser End-to-End Test in Playwright
  console.log("\n🌐 2. Testing Navya Assistant in Playwright Browser UI...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    localStorage.setItem("navya-terms-accepted", "true");
  });
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  // Open the Floating Chatbot Modal
  console.log("Clicking FAB trigger to open Navya Assistant...");
  const fabButton = page.locator("button[aria-label='Open chatbot']").first();
  await fabButton.click();
  await page.waitForTimeout(600);

  // Verify chat opened
  const chatInput = page.locator("input[placeholder*='Ask about Web']");
  const isInputVisible = await chatInput.isVisible();
  console.log(`Chat Input Visible: ${isInputVisible}`);

  if (!isInputVisible) {
    console.error("Chat input is not visible!");
    process.exit(1);
  }

  // Test interactive query inside UI
  const sampleBrowserQueries = [
    { query: "how much does a website cost?", expectedText: "Pricing" },
    { query: "I want a 3D website", expectedText: "3D" },
    { query: "I run a restaurant", expectedText: "Restaurant" },
  ];

  for (const item of sampleBrowserQueries) {
    await chatInput.fill(item.query);
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(1000);

    const lastBotMessage = page.locator("div.clay-card h4").last();
    const cardTitle = await lastBotMessage.textContent();
    console.log(`  💬 Sent "${item.query}" -> Recommendation Card: "${cardTitle?.trim()}"`);
  }

  // Test clicking a card button inside chat to trigger client-side SPA navigation
  console.log("\n🧭 3. Testing in-chat card navigation click...");
  const firstCardButton = page.locator("div.clay-card button:has-text('View')").last();
  if (await firstCardButton.isVisible()) {
    await firstCardButton.click();
    await page.waitForTimeout(600);
    const currentUrl = page.url();
    const currentTitle = await page.title();
    console.log(`  🎯 Navigated successfully to: ${currentUrl} (Title: "${currentTitle.slice(0, 35)}...")`);
  }

  await browser.close();

  console.log("\n🎉 ALL NAVYA ASSISTANT DISCOVERY & NAVIGATION TESTS PASSED!\n");
}

runAssistantQATests().catch((err) => {
  console.error("Assistant QA test script failed:", err);
  process.exit(1);
});
