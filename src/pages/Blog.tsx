import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import BlogArticlePanel from '@/components/BlogArticlePanel';
import SEOHead from '@/components/SEOHead';
import {
  BLOG_SERIES_ORDER,
  blogSeries,
  formatEpisodeLabel,
  getArticlesBySeries,
  getBlogArticle,
  type BlogSeriesId,
} from '@/data/blogArticles';
import { useLocale, useT } from '@/lib/i18n';

export default function Blog() {
  const t = useT();
  const [locale] = useLocale();
  const isKo = locale === 'ko';
  const [searchParams, setSearchParams] = useSearchParams();
  const articleParam = searchParams.get('article');

  const [expandedSeriesId, setExpandedSeriesId] = useState<BlogSeriesId | null>(null);
  const selectedSlug = articleParam && getBlogArticle(articleParam) ? articleParam : null;

  useEffect(() => {
    if (selectedSlug) {
      const article = getBlogArticle(selectedSlug);
      if (article) {
        setExpandedSeriesId(article.seriesId);
      }
    }
  }, [selectedSlug]);

  const toggleSeries = (seriesId: BlogSeriesId) => {
    setExpandedSeriesId(prev => (prev === seriesId ? null : seriesId));
  };

  const selectArticle = (slug: string, seriesId: BlogSeriesId) => {
    setExpandedSeriesId(seriesId);
    setSearchParams({ article: slug }, { replace: true });
  };

  return (
    <div className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        titleKey="blog.h1"
        descriptionKey="blog.subtitle"
        path="/blog"
        type="website"
        breadcrumb={[
          { name: isKo ? '홈' : 'Home', path: '/' },
          { name: isKo ? '블로그' : 'Blog', path: '/blog' },
        ]}
      />
      <div className="max-w-6xl mx-auto">
        <p className="text-caption text-terracotta mb-3">{t('blog.eyebrow')}</p>
        <h1
          className="text-deep mb-4"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          {t('blog.h1')}
        </h1>
        <p className="text-deep/60 max-w-2xl mb-10 leading-relaxed">{t('blog.subtitle')}</p>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left: series index */}
          <nav
            className="w-full lg:w-[280px] lg:flex-shrink-0 lg:sticky lg:top-24 bg-white rounded-2xl border border-deep/5 overflow-hidden"
            aria-label={isKo ? '블로그 목차' : 'Blog index'}
          >
            <p className="text-xs uppercase tracking-wider text-deep/40 px-5 pt-5 pb-3">{t('blog.indexLabel')}</p>
            <ul className="pb-2">
              {BLOG_SERIES_ORDER.map(seriesId => {
                const series = blogSeries[seriesId];
                const articles = getArticlesBySeries(seriesId);
                const isExpanded = expandedSeriesId === seriesId;
                const seriesTitle = isKo ? series.title.ko : series.title.en;

                return (
                  <li key={seriesId} className="border-t border-deep/5 first:border-t-0">
                    <button
                      type="button"
                      onClick={() => toggleSeries(seriesId)}
                      className="w-full flex items-center justify-between gap-2 px-5 py-4 text-left hover:bg-deep/[0.02] transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span className="text-sm font-semibold text-deep leading-snug">{seriesTitle}</span>
                      <ChevronDown
                        className={`size-4 text-deep/40 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {isExpanded && (
                      <ol className="pb-3 px-3 space-y-0.5">
                        {articles.map(article => {
                          const title = isKo ? article.title.ko : article.title.en;
                          const isActive = selectedSlug === article.slug;
                          return (
                            <li key={article.slug}>
                              <button
                                type="button"
                                onClick={() => selectArticle(article.slug, seriesId)}
                                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                                  isActive
                                    ? 'bg-terracotta/10 text-terracotta'
                                    : 'text-deep/80 hover:bg-deep/5 hover:text-deep'
                                }`}
                              >
                                <span className="block text-[11px] font-medium opacity-80 mb-0.5">
                                  {formatEpisodeLabel(article, isKo)}
                                  <span className="text-deep/25 mx-1">·</span>
                                  {article.readMinutes}
                                  {isKo ? '분' : ' min'}
                                </span>
                                <span className="block text-sm leading-snug">{title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: article content */}
          <div className="flex-1 min-w-0 w-full bg-white rounded-2xl border border-deep/5 p-6 sm:p-8 lg:p-10">
            {selectedSlug ? (
              <BlogArticlePanel slug={selectedSlug} />
            ) : (
              <div className="py-6 sm:py-12 text-center max-w-md mx-auto">
                <p className="text-sm text-deep/50 leading-relaxed">{t('blog.pickArticle')}</p>
                <p className="text-xs text-deep/35 mt-4 leading-relaxed">{t('blog.pickArticleHint')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
