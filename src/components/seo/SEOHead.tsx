import React, { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogImage?: string;
  structuredData?: Record<string, any>;
  breadcrumbs?: { label: string; href?: string }[];
  robots?: string;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogImage = "/logoimg.png",
  structuredData,
  breadcrumbs,
  robots,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes("Navya Tech")
      ? title
      : `${title} | Navya Tech Industry`;
    document.title = fullTitle;

    // Helper for Meta Tags
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 2. Update Meta Description & Robots
    const resolvedRobots = noIndex ? "noindex, nofollow" : (robots || "index, follow");
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", resolvedRobots);

    // 3. Update Canonical URL
    const canonicalUrl = `https://www.navyatech.co.in${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // 4. Update OpenGraph Tags
    const fullImageUrl = ogImage.startsWith("http") ? ogImage : `https://www.navyatech.co.in${ogImage}`;
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:site_name", "Navya Tech Industry");

    // 5. Update Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImageUrl);

    // 6. Update Keywords if available
    if (keywords.length > 0) {
      setMetaTag("name", "keywords", keywords.join(", "));
    }

    // 7. Structured Data (JSON-LD)
    const existingScript = document.getElementById("json-ld-subpage");
    if (existingScript) {
      existingScript.remove();
    }

    // Build Unified Schema Graph
    const schemaGraph: any[] = [
      {
        "@type": "Person",
        "@id": "https://www.navyatech.co.in/#founder",
        name: "Aryan Singh",
        jobTitle: "Founder | Digital Growth Strategist | AI & Automation Entrepreneur",
        worksFor: {
          "@id": "https://www.navyatech.co.in/#organization",
        },
        sameAs: [
          "https://in.linkedin.com/in/invaded-author",
          "https://wa.me/919355412903",
        ],
        telephone: "+91-74518-12065",
        email: "navyatechindustry@gmail.com",
      },
      {
        "@type": "Organization",
        "@id": "https://www.navyatech.co.in/#organization",
        name: "Navya Tech Industry",
        url: "https://www.navyatech.co.in",
        logo: "https://www.navyatech.co.in/logoimg.png",
        founder: {
          "@id": "https://www.navyatech.co.in/#founder",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-93554-12903",
          contactType: "customer service",
          areaServed: ["Global", "India", "United States"],
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
          "https://in.linkedin.com/in/invaded-author",
          "https://wa.me/919355412903",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: fullTitle,
        description: description,
        isPartOf: {
          "@id": "https://www.navyatech.co.in/#organization",
        },
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: bc.label,
          item: bc.href ? `https://www.navyatech.co.in${bc.href}` : canonicalUrl,
        })),
      });
    }

    if (structuredData) {
      schemaGraph.push(structuredData);
    }

    const script = document.createElement("script");
    script.id = "json-ld-subpage";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    });
    document.head.appendChild(script);
  }, [title, description, canonicalPath, keywords, ogImage, structuredData, breadcrumbs, robots, noIndex]);

  return null;
};

export default SEOHead;
