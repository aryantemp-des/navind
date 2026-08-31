import fs from "fs";
import path from "path";
import { allSubpages } from "../src/config/subpages";
import { getAllBlogArticles, getAllBlogCategories } from "../src/config/blogs";

const DOMAIN = "https://www.navyatech.co.in";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

export function generateSitemapXML(): string {
  const entries: SitemapEntry[] = [];
  const seenUrls = new Set<string>();

  const addEntry = (route: string, lastmod: string, changefreq: SitemapEntry["changefreq"], priority: string) => {
    const cleanRoute = route.startsWith("/") ? route : `/${route}`;
    const fullUrl = `${DOMAIN}${cleanRoute === "/" ? "/" : cleanRoute}`;

    if (seenUrls.has(fullUrl)) return;
    seenUrls.add(fullUrl);

    entries.push({
      loc: fullUrl,
      lastmod,
      changefreq,
      priority,
    });
  };

  // 1. Homepage
  addEntry("/", TODAY, "weekly", "1.0");

  // 2. Main Resource & Blog Hubs
  addEntry("/resources", TODAY, "weekly", "0.85");
  addEntry("/blog", TODAY, "weekly", "0.85");

  // 3. Blog Category Hubs
  const categories = getAllBlogCategories();
  categories.forEach((cat) => {
    addEntry(cat.slug, TODAY, "weekly", "0.80");
  });

  // 4. All Core Subpages (Commercial, Services, Industries, Pricing, Conversion, Geo Hubs)
  Object.entries(allSubpages).forEach(([route, subpage]) => {
    let priority = "0.80";
    let changefreq: SitemapEntry["changefreq"] = "monthly";

    if (subpage.category === "commercial" || subpage.category === "pricing") {
      priority = "0.90";
      changefreq = "weekly";
    } else if (subpage.category === "services") {
      priority = "0.90";
      changefreq = "monthly";
    } else if (subpage.category === "geo") {
      priority = "0.85";
      changefreq = "monthly";
    } else if (subpage.category === "conversion") {
      priority = "0.85";
      changefreq = "monthly";
    } else if (subpage.category === "industry") {
      priority = "0.80";
      changefreq = "monthly";
    }

    addEntry(route, TODAY, changefreq, priority);
  });

  // 5. Individual Blog Articles
  const articles = getAllBlogArticles();
  articles.forEach((art) => {
    addEntry(art.slug, art.publishedDate || TODAY, "monthly", "0.75");
  });

  // Build XML String
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const entry of entries) {
    xmlLines.push("  <url>");
    xmlLines.push(`    <loc>${entry.loc}</loc>`);
    xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${entry.priority}</priority>`);
    xmlLines.push("  </url>");
  }

  xmlLines.push("</urlset>");
  return xmlLines.join("\n") + "\n";
}

export function writeSitemaps() {
  const xmlContent = generateSitemapXML();
  const rootPath = process.cwd();
  const publicDir = path.join(rootPath, "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(publicSitemapPath, xmlContent, "utf-8");

  // Write authoritative public/robots.txt
  const robotsContent = `# ==============================================================================
# Navya Tech Industry — Production Robots Configuration
# https://www.navyatech.co.in/
# ==============================================================================

User-agent: *
Allow: /

# Disallow non-public internal or development assets
Disallow: /api/
Disallow: /private/
Disallow: /draft/

# Production XML Sitemap Reference
Sitemap: https://www.navyatech.co.in/sitemap.xml
`;

  const publicRobotsPath = path.join(publicDir, "robots.txt");
  fs.writeFileSync(publicRobotsPath, robotsContent, "utf-8");

  console.log(`✅ Successfully generated authoritative XML sitemap & robots.txt:`);
  console.log(`   📄 Sitemap: ${publicSitemapPath}`);
  console.log(`   📄 Robots: ${publicRobotsPath}`);
}

// Run if called directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("generate-sitemap.ts")) {
  writeSitemaps();
}
