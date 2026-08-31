import React from "react";
import { Link } from "@/context/RouteContext";
import { Clock, Calendar, User, ArrowRight, ArrowUpRight, Sparkles, Check, Phone, Bookmark, Share2 } from "lucide-react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import { BlogArticle, getBlogArticle } from "@/config/blogs";

export const BlogArticleTemplate: React.FC<{ article: BlogArticle }> = ({ article }) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: article.category, href: article.categorySlug },
    { label: article.h1 },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.h1,
    description: article.metaDescription,
    image: `https://www.navyatech.co.in${article.heroImageSrc}`,
    author: {
      "@type": "Organization",
      name: "Navya Tech Industry",
      url: "https://www.navyatech.co.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Navya Tech Industry",
      logo: {
        "@type": "ImageObject",
        url: "https://www.navyatech.co.in/logoimg.png",
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.navyatech.co.in${article.slug}`,
    },
  };

  const relatedArticles = article.relatedArticleSlugs
    .map((slug) => getBlogArticle(slug))
    .filter(Boolean) as BlogArticle[];

  const formatDisplayDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <SubpageLayout breadcrumbs={breadcrumbs}>
      {/* 1. Technical SEO & Social Graph */}
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        canonicalPath={article.slug}
        keywords={[...article.tags, "Navya Tech Industry", "blog", "web engineering"]}
        structuredData={structuredData}
      />

      <article className="relative w-full pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Metadata */}
          <header className="mb-10 text-center sm:text-left space-y-6">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <Link
                href={article.categorySlug}
                className="clay-badge px-3 py-1 text-xs font-mono font-bold uppercase text-red-300 hover:text-white transition-colors"
              >
                {article.category}
              </Link>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>{article.readingTime}</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>{formatDisplayDate(article.publishedDate)}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading leading-[1.15]">
              {article.h1}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              {article.excerpt}
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-300 font-bold text-xs font-mono">
                  NT
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-heading">{article.author}</div>
                  <div className="text-xs text-zinc-400 font-light">Technical Editorial Team</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+919355412903"
                  className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs text-zinc-200 hover:text-white flex items-center gap-1.5"
                  aria-label="Call Navya Engineering Team"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>Call Team</span>
                </a>
              </div>
            </div>
          </header>

          {/* Primary Featured Image with STRICT Title Alt Attribute */}
          <div className="mb-12 rounded-3xl overflow-hidden clay-card p-2 border border-red-500/30 shadow-2xl relative">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60">
              <img
                src={article.heroImageSrc}
                alt={article.heroImageAlt}
                className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
                {article.heroImageAlt} • Navya Tech Architecture
              </div>
            </div>
          </div>

          {/* Article Editorial Body */}
          <div className="space-y-10 text-zinc-200 font-light leading-relaxed text-base sm:text-lg">
            
            {/* Intro Lead Paragraphs */}
            <div className="space-y-4 text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal border-l-2 border-red-500/60 pl-4 sm:pl-6 py-1 bg-red-950/10 rounded-r-xl">
              {article.introParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Main Content Sections */}
            {article.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-6 pt-6">
                {section.title && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight flex items-center gap-3">
                    <span className="w-2 h-6 rounded-full bg-red-500 shrink-0 inline-block" />
                    <span>{section.title}</span>
                  </h2>
                )}

                {section.subtitle && (
                  <h3 className="text-xl font-semibold text-red-200 font-heading">
                    {section.subtitle}
                  </h3>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-zinc-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="clay-card p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3">
                    {section.bulletPoints.map((pt, ptIdx) => (
                      <div key={ptIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-200">
                        <Check className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Callout Box */}
                {section.calloutBox && (
                  <div className="clay-card p-6 rounded-2xl border-l-4 border-l-red-500 border-white/10 bg-black/60 shadow-lg">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {section.calloutBox.title}
                    </div>
                    <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
                      {section.calloutBox.description}
                    </p>
                  </div>
                )}

                {/* Comparison Table */}
                {section.comparisonTable && (
                  <div className="overflow-x-auto rounded-2xl clay-card border border-white/10 p-1">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-black/60 text-white font-mono uppercase text-[11px] border-b border-white/10">
                        <tr>
                          {section.comparisonTable.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5 font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-light">
                        {section.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? "font-semibold text-white font-mono" : "text-zinc-300"}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion Block */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl border border-red-500/40 bg-gradient-to-b from-black/80 to-red-950/20 space-y-4">
              <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-400" />
                <span>{article.conclusion.title}</span>
              </h2>
              {article.conclusion.paragraphs.map((cp, cIdx) => (
                <p key={cIdx} className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {cp}
                </p>
              ))}
            </div>

            {/* Contextual Service Conversion Box */}
            <div className="clay-card-interactive p-6 sm:p-8 rounded-3xl border border-red-500/50 bg-black/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase font-bold text-red-300">
                  Ready to Build?
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                  {article.contextualService.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-md">
                  {article.contextualService.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  href={article.contextualService.href}
                  className="clay-btn-secondary w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white text-center flex items-center justify-center gap-1.5"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/get-started"
                  className="clay-btn-primary w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                >
                  <span>Start Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Related Articles Cluster */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
                  <span>Related Articles & Guides</span>
                </h3>
                <Link href="/blog" className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1">
                  <span>View All Blog</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={rel.slug}
                    className="clay-card-interactive p-5 rounded-2xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="clay-badge px-2.5 py-0.5 text-[9px] font-mono uppercase text-red-300">
                          {rel.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">{rel.readingTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-red-300 transition-colors font-heading mb-2">
                        {rel.h1}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-red-400">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </SubpageLayout>
  );
};

export default BlogArticleTemplate;
