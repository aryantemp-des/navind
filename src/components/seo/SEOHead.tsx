import React, { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogImage = "/logoimg.png",
  structuredData,
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes("Navya Tech Industry")
      ? title
      : `${title} | Navya Tech Industry`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

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
    const updateOG = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement("meta");
        ogTag.setAttribute("property", property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute("content", content);
    };

    updateOG("og:title", fullTitle);
    updateOG("og:description", description);
    updateOG("og:url", canonicalUrl);
    updateOG("og:type", "website");
    updateOG(
      "og:image",
      ogImage.startsWith("http") ? ogImage : `https://www.navyatech.co.in${ogImage}`
    );

    // 5. Update Keywords if available
    if (keywords.length > 0) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement("meta");
        metaKw.setAttribute("name", "keywords");
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute("content", keywords.join(", "));
    }

    // 6. Structured Data (JSON-LD)
    const existingScript = document.getElementById("json-ld-subpage");
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "json-ld-subpage";
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, keywords, ogImage, structuredData]);

  return null;
};

export default SEOHead;
