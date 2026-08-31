import React, { useState, useMemo } from "react";
import { Link } from "@/context/RouteContext";
import { Search, Sparkles, Clock, Calendar, ArrowRight, ArrowUpRight, BookOpen, Layers, Phone } from "lucide-react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import { BlogCategoryHub, BlogArticle, getAllBlogArticles, getAllBlogCategories, searchBlogArticles, getBlogArticle } from "@/config/blogs";

interface BlogHubProps {
  hubType: "resources" | "blog" | "category";
  categoryHub?: BlogCategoryHub;
}

const CATEGORY_TABS = [
  { label: "All Insights", slug: "all" },
  { label: "Website Development", slug: "/blog/website-development" },
  { label: "Website Design", slug: "/blog/website-design" },
  { label: "3D Websites", slug: "/blog/3d-websites" },
  { label: "Business Websites", slug: "/blog/business-websites" },
  { label: "Technical SEO", slug: "/blog/seo" },
  { label: "Web Development", slug: "/blog/web-development" },
];

export const BlogHubTemplate: React.FC<BlogHubProps> = ({ hubType, categoryHub }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryHub ? categoryHub.slug : "all"
  );

  const isCategory = hubType === "category" && categoryHub;
  const isResources = hubType === "resources";

  const title = isCategory
    ? categoryHub.title
    : isResources
    ? "Resources Center | Website Development, 3D & SEO Guides | Navya"
    : "Navya Tech Blog | Website Engineering, 3D Design & SEO Insights";

  const h1 = isCategory
    ? categoryHub.h1
    : isResources
    ? "Resources for Building Better Websites"
    : "The Navya Tech Industry Blog";

  const description = isCategory
    ? categoryHub.heroDescription
    : isResources
    ? "A curated collection of practical insights covering website development, design systems, 3D WebGL experiences, business websites, and technical SEO."
    : "Practical guides, technical breakdowns, cost calculators, and architectural insights for modern web engineering and digital business growth.";

  const canonicalPath = isCategory
    ? categoryHub.slug
    : isResources
    ? "/resources"
    : "/blog";

  const heroImageAlt = isCategory ? categoryHub.heroImageAlt : isResources ? "Resources for Building Better Websites" : "The Navya Tech Industry Blog";

  const breadcrumbs = isCategory
    ? [
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/blog" },
        { label: categoryHub.categoryLabel },
      ]
    : isResources
    ? [{ label: "Home", href: "/" }, { label: "Resources" }]
    : [{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Blog" }];

  // Filtered articles based on search query and category tab
  const filteredArticles = useMemo(() => {
    return searchBlogArticles(searchQuery, isCategory ? categoryHub.slug : activeCategory);
  }, [searchQuery, activeCategory, isCategory, categoryHub]);

  // Featured Article spotlight
  const featuredArticle = useMemo(() => {
    if (isCategory && categoryHub.featuredArticleSlug) {
      return getBlogArticle(categoryHub.featuredArticleSlug);
    }
    return getBlogArticle("/blog/how-to-build-a-business-website") || getAllBlogArticles()[0];
  }, [isCategory, categoryHub]);

  return (
    <SubpageLayout breadcrumbs={breadcrumbs}>
      {/* 1. SEO Head Meta */}
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        keywords={[
          "website development blog",
          "3d website guides",
          "business website tips",
          "technical seo guides",
          "Navya Tech Industry",
        ]}
      />

      {/* 2. Hero Section */}
      <section className="relative w-full pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-red-300 text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            {isCategory ? categoryHub.categoryLabel : isResources ? "EDUCATIONAL RESOURCE HUB" : "ENGINEERING & DESIGN INSIGHTS"}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading max-w-4xl mx-auto leading-[1.1]">
            {h1}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/get-started"
              className="clay-btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919355412903"
              className="clay-btn-secondary px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Call Us Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Search & Category Filter Controls */}
      <section className="sticky top-20 z-20 py-4 px-4 sm:px-6 lg:px-8 bg-zinc-950/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Real-Time Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics: 3D, cost, SEO, speed..."
              aria-label="Search articles and resources"
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs text-white bg-black/60 border border-red-500/30 focus:outline-none focus:border-red-400 placeholder-zinc-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (when not inside a specific single category) */}
          {!isCategory && (
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => {
                    setActiveCategory(tab.slug);
                    setSearchQuery("");
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.slug
                      ? "clay-badge bg-red-600/30 text-white font-bold border border-red-500/50 shadow-md"
                      : "bg-black/40 hover:bg-black/70 text-zinc-400 hover:text-zinc-200 border border-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Main Article Grid */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Featured Article Spotlight (shown when not searching) */}
          {!searchQuery && featuredArticle && (
            <div className="clay-card p-6 sm:p-8 rounded-3xl border border-red-500/40 bg-gradient-to-br from-black/90 via-zinc-950/80 to-red-950/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 border border-white/10 relative">
                  <img
                    src={featuredArticle.heroImageSrc}
                    alt={featuredArticle.heroImageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 clay-badge px-3 py-1 text-[10px] font-mono font-bold uppercase text-red-300">
                    Featured Spotlight
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="text-red-400 font-bold uppercase">{featuredArticle.category}</span>
                    <span>•</span>
                    <span>{featuredArticle.readingTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white font-heading leading-tight">
                    {featuredArticle.h1}
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={featuredArticle.slug}
                      className="clay-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {searchQuery
                ? `Search Results for "${searchQuery}" (${filteredArticles.length})`
                : isCategory
                ? `${categoryHub.categoryLabel} Articles (${filteredArticles.length})`
                : `Latest Published Articles (${filteredArticles.length})`}
            </h3>
            {isCategory && (
              <Link
                href={categoryHub.relatedServiceHref}
                className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <span>{categoryHub.relatedServiceTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* 3-Column Article Card Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="clay-card-interactive p-5 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/10 relative mb-3">
                      <img
                        src={article.heroImageSrc}
                        alt={article.heroImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 clay-badge px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase text-red-300">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                      <Clock className="w-3 h-3 text-red-400" />
                      <span>{article.readingTime}</span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors font-heading leading-snug">
                      {article.h1}
                    </h4>

                    <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 clay-card rounded-2xl space-y-3">
              <p className="text-zinc-400 text-sm">No articles matched your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="clay-btn-secondary px-4 py-2 rounded-full text-xs text-white"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Resource Gateway Categories (for /resources) */}
          {isResources && (
            <div className="pt-12 border-t border-white/10 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="clay-badge inline-flex items-center gap-1 px-3 py-1 text-xs font-mono uppercase text-red-300">
                  Topic Hubs
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Explore by Resource Category
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getAllBlogCategories().map((cat) => (
                  <Link
                    key={cat.slug}
                    href={cat.slug}
                    className="clay-card-interactive p-6 rounded-2xl flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="clay-badge inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold text-red-300 uppercase">
                        {cat.categoryLabel}
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors font-heading">
                        {cat.h1}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {cat.heroDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-red-400 font-medium">
                      <span>{cat.articleSlugs.length} Guides Available</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion Section */}
          <div className="clay-card p-8 sm:p-12 rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-black to-zinc-950 text-center space-y-6 shadow-2xl">
            <h3 className="text-2xl sm:text-4xl font-black text-white font-heading max-w-2xl mx-auto">
              Ready to Turn Insights Into a High-Converting Digital Platform?
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto">
              Get started with our transparent $1,000 fixed commercial website packages or request a custom quotation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/get-started"
                className="clay-btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                <span>Start Project Intake</span>
                <ArrowUpRight className="w-4 h-4 inline-block ml-1" />
              </Link>
              <Link
                href="/pricing"
                className="clay-btn-secondary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white"
              >
                <span>Review Pricing Plans</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </SubpageLayout>
  );
};

export default BlogHubTemplate;
