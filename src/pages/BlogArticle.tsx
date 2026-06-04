import { Link, Navigate, useParams } from 'react-router-dom';
import BlogArticleBody from '@/components/BlogArticleBody';
import SEOHead from '@/components/SEOHead';
import { blogSeries, formatEpisodeLabel, getBlogArticle } from '@/data/blogArticles';
import { useLocale, useT } from '@/lib/i18n';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticle(slug) : undefined;
  const [locale] = useLocale();
  const t = useT();
  const isKo = locale === 'ko';

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const title = isKo ? article.title.ko : article.title.en;
  const thesis = isKo ? article.thesis.ko : article.thesis.en;
  const description = isKo ? article.description.ko : article.description.en;
  const sections = isKo ? article.ko : article.en;
  const series = blogSeries[article.seriesId];
  const keywords =
    article.seriesId === 'carbohydrates'
      ? ['carbohydrates', 'nutrition', 'fiber', 'added sugar', 'blood sugar', 'whole grains', 'carbs']
      : article.seriesId === 'vitamins'
        ? ['vitamins', 'nutrition', 'vitamin D', 'vitamin B12', 'folate', 'supplements', 'Korean diet']
        : article.seriesId === 'protein'
          ? ['protein', 'nutrition', 'amino acids', 'protein intake', 'plant protein', 'protein supplements']
          : article.seriesId === 'minerals'
            ? ['minerals', 'nutrition', 'iron', 'calcium', 'sodium', 'zinc', 'selenium', 'supplements']
            : article.seriesId === 'fats'
              ? ['fats', 'nutrition', 'omega-3', 'saturated fat', 'trans fat', 'olive oil', 'cholesterol']
              : ['dopamine', 'nutrition', 'tyrosine', 'caffeine', 'sleep', 'exercise'];
  const related = article.relatedSlugs
    .map(s => getBlogArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        title={title}
        description={description}
        path={`/blog/${article.slug}`}
        type="article"
        dateModified={article.datePublished}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          keywords,
          isAccessibleForFree: true,
          articleSection: isKo ? series.title.ko : series.title.en,
        }}
        breadcrumb={[
          { name: isKo ? '홈' : 'Home', path: '/' },
          { name: isKo ? '블로그' : 'Blog', path: '/blog' },
          { name: title, path: `/blog/${article.slug}` },
        ]}
      />
      <div className="max-w-[720px] mx-auto">
        <Link
          to={`/blog?article=${article.slug}`}
          className="text-sm text-terracotta hover:underline mb-8 inline-block"
        >
          ← {t('blog.back')}
        </Link>

        <p className="text-xs uppercase tracking-wider text-deep/40 mb-2">
          {isKo ? series.title.ko : series.title.en}
          <span className="mx-2">·</span>
          {formatEpisodeLabel(article, isKo)}
        </p>
        <h1
          className="text-deep mb-6"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
        >
          {title}
        </h1>

        <div className="bg-deep/5 border-l-4 border-terracotta rounded-r-xl px-5 py-4 mb-10">
          <p className="text-sm font-medium text-deep leading-relaxed">{thesis}</p>
        </div>

        <BlogArticleBody sections={sections} />

        {related.length > 0 && (
          <aside className="mt-14 pt-8 border-t border-deep/10">
            <h2 className="text-sm uppercase tracking-wider text-deep/40 mb-4">{t('blog.continue')}</h2>
            <ul className="space-y-3">
              {related.map(r => (
                <li key={r.slug}>
                  <Link to={`/blog?article=${r.slug}`} className="text-sm text-deep hover:text-terracotta transition-colors">
                    {formatEpisodeLabel(r, isKo)} · {isKo ? r.title.ko : r.title.en}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <p className="text-xs text-deep/40 mt-10">
          {t('footer.disclaimer')}
        </p>
      </div>
    </div>
  );
}
