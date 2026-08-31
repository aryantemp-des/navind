export interface BlogSection {
  title?: string;
  subtitle?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  calloutBox?: {
    title: string;
    description: string;
    type?: "tip" | "warning" | "highlight";
  };
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogArticle {
  slug: string; // e.g. "/blog/how-to-build-a-business-website"
  title: string;
  h1: string;
  metaDescription: string;
  category: string;
  categorySlug: string; // e.g. "/blog/website-development"
  categoryLabel: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  heroImageSrc: string;
  heroImageAlt: string;
  excerpt: string;
  introParagraphs: string[];
  sections: BlogSection[];
  conclusion: {
    title: string;
    paragraphs: string[];
  };
  relatedArticleSlugs: string[];
  contextualService: {
    title: string;
    description: string;
    href: string;
    ctaText: string;
  };
  tags: string[];
}

export interface BlogCategoryHub {
  slug: string; // e.g. "/blog/website-development"
  title: string;
  h1: string;
  metaDescription: string;
  categoryLabel: string;
  heroDescription: string;
  featuredArticleSlug: string;
  articleSlugs: string[];
  relatedServiceHref: string;
  relatedServiceTitle: string;
  heroImageAlt: string;
}
