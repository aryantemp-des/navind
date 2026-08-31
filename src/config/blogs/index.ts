import { BlogArticle, BlogCategoryHub } from "./types";
import { websiteDevArticles } from "./website-dev";
import { threeDArticles } from "./three-d";
import { businessArticles } from "./business";
import { seoArticles } from "./seo";
import { blogCategories } from "./categories";

export * from "./types";

// Master aggregation of all 25 individual blog articles
export const ALL_BLOG_ARTICLES: Record<string, BlogArticle> = {
  ...websiteDevArticles,
  ...threeDArticles,
  ...businessArticles,
  ...seoArticles,
};

// Master aggregation of all 6 category hubs
export const ALL_BLOG_CATEGORIES: Record<string, BlogCategoryHub> = {
  ...blogCategories,
};

export function getBlogArticle(path: string): BlogArticle | undefined {
  return ALL_BLOG_ARTICLES[path];
}

export function getBlogCategory(path: string): BlogCategoryHub | undefined {
  return ALL_BLOG_CATEGORIES[path];
}

export function getAllBlogArticles(): BlogArticle[] {
  return Object.values(ALL_BLOG_ARTICLES);
}

export function getAllBlogCategories(): BlogCategoryHub[] {
  return Object.values(ALL_BLOG_CATEGORIES);
}

export const ALL_BLOG_ROUTES = [
  "/resources",
  "/blog",
  ...Object.keys(ALL_BLOG_CATEGORIES),
  ...Object.keys(ALL_BLOG_ARTICLES),
];

export function searchBlogArticles(query: string, categoryFilter: string = "all"): BlogArticle[] {
  const all = getAllBlogArticles();
  const cleanQ = query.toLowerCase().trim();

  return all.filter((article) => {
    // Category check
    if (categoryFilter !== "all") {
      const matchCat =
        article.categorySlug === categoryFilter ||
        article.category.toLowerCase().replace(/\s+/g, "-") === categoryFilter.replace("/blog/", "");
      if (!matchCat) return false;
    }

    if (!cleanQ) return true;

    // Search text overlap
    const inTitle = article.title.toLowerCase().includes(cleanQ);
    const inH1 = article.h1.toLowerCase().includes(cleanQ);
    const inDesc = article.metaDescription.toLowerCase().includes(cleanQ);
    const inExcerpt = article.excerpt.toLowerCase().includes(cleanQ);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(cleanQ));

    return inTitle || inH1 || inDesc || inExcerpt || inTags;
  });
}
