import fs from "fs";
import path from "path";
import { allSubpages } from "../src/config/subpages";
import { getAllBlogArticles, getAllBlogCategories } from "../src/config/blogs";

const DOMAIN = "https://www.navyatech.co.in";

/**
 * Normalizes date input to a strict W3C / ISO 8601 YYYY-MM-DD format.
 * Rejects invalid, undefined, or future dates.
 */
export function formatValidISO8601Date(dateInput?: string): string | undefined {
  if (!dateInput || typeof dateInput !== "string") return undefined;

  const trimmed = dateInput.trim();

  // 1. Direct YYYY-MM-DD match
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);
    if (year >= 2020 && year <= 2026 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return trimmed;
    }
  }

  // 2. Parse text date (e.g. "January 14, 2026")
  const parsed = Date.parse(trimmed);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    if (y >= 2020 && y <= 2026) {
      return `${y}-${m}-${day}`;
    }
  }

  return undefined;
}

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

export function generateSitemapXML(): string {
  const entries: SitemapEntry[] = [];
  const seenUrls = new Set<string>();

  const addEntry = (
    route: string,
    rawDate: string | undefined,
    changefreq: SitemapEntry["changefreq"],
    priority: string
  ) => {
    const cleanRoute = route.startsWith("/") ? route : `/${route}`;
    const fullUrl = `${DOMAIN}${cleanRoute === "/" ? "/" : cleanRoute}`;

    if (seenUrls.has(fullUrl)) return;
    seenUrls.add(fullUrl);

    const validLastMod = formatValidISO8601Date(rawDate);

    const entry: SitemapEntry = {
      loc: fullUrl,
      changefreq,
      priority,
    };

    if (validLastMod) {
      entry.lastmod = validLastMod;
    }

    entries.push(entry);
  };

  // 1. Homepage (Explicit stable baseline date)
  addEntry("/", "2026-08-30", "weekly", "1.0");

  // 2. Main Resource & Blog Hubs
  addEntry("/resources", "2026-08-30", "weekly", "0.85");
  addEntry("/blog", "2026-08-30", "weekly", "0.85");

  // 3. Blog Category Hubs
  const categories = getAllBlogCategories();
  categories.forEach((cat) => {
    addEntry(cat.slug, undefined, "weekly", "0.80");
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

    // Only include lastmod if explicit reliable metadata exists; otherwise omit per guidelines
    addEntry(route, undefined, changefreq, priority);
  });

  // 5. Individual Blog Articles (Include authentic publication dates in strict ISO YYYY-MM-DD)
  const articles = getAllBlogArticles();
  articles.forEach((art) => {
    addEntry(art.slug, art.publishedDate, "monthly", "0.75");
  });

  // Build XML String adhering to standard sitemap XML schema
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const entry of entries) {
    xmlLines.push("  <url>");
    xmlLines.push(`    <loc>${entry.loc}</loc>`);
    if (entry.lastmod) {
      xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }
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
if (
  import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}` ||
  process.argv[1]?.endsWith("generate-sitemap.ts")
) {
  writeSitemaps();
}
