import { allSubpages, getAllSubpageRoutes } from "../src/config/subpages/index";

console.log("=== NAVYA SUBPAGES ROUTE AUDIT ===");
const routes = getAllSubpageRoutes();
console.log(`Total Subpage Routes Registered: ${routes.length}`);

let hasErrors = false;

routes.forEach((route, idx) => {
  const config = allSubpages[route];
  if (!config) {
    console.error(`❌ [${idx + 1}] Missing config for route: ${route}`);
    hasErrors = true;
    return;
  }

  // Check required fields
  const missing: string[] = [];
  if (!config.h1) missing.push("h1");
  if (!config.title) missing.push("title");
  if (!config.metaDescription) missing.push("metaDescription");
  if (!config.primaryKeyword) missing.push("primaryKeyword");
  if (!config.heroDescription) missing.push("heroDescription");
  if (!config.heroImageAlt) missing.push("heroImageAlt");
  if (!config.breadcrumbs || config.breadcrumbs.length === 0) missing.push("breadcrumbs");
  if (!config.overviewTitle) missing.push("overviewTitle");
  if (!config.overviewCards || config.overviewCards.length === 0) missing.push("overviewCards");
  if (!config.capabilities || config.capabilities.length === 0) missing.push("capabilities");
  if (!config.faqs || config.faqs.length === 0) missing.push("faqs");
  if (!config.relatedLinks || config.relatedLinks.length === 0) missing.push("relatedLinks");

  // Check Image Alt rule
  if (config.heroImageAlt.toLowerCase().includes("image") && config.heroImageAlt.toLowerCase() === "image") {
    missing.push("heroImageAlt is generic 'image'");
  }

  if (missing.length > 0) {
    console.error(`❌ [${idx + 1}] ${route}: Missing fields: ${missing.join(", ")}`);
    hasErrors = true;
  } else {
    console.log(`✅ [${idx + 1}/${routes.length}] ${route} — H1: "${config.h1}" | Alt: "${config.heroImageAlt}" | FAQs: ${config.faqs.length} | Links: ${config.relatedLinks.length}`);
  }
});

if (hasErrors) {
  console.error("\n❌ Route Audit Failed with errors.");
  process.exit(1);
} else {
  console.log(`\n🎉 All ${routes.length} subpages passed 100% of data and SEO checks!`);
}
