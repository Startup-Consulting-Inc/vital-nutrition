import { Link } from 'react-router-dom';
import BlogArticleBody from '@/components/BlogArticleBody';
import { blogSeries, formatEpisodeLabel, getBlogArticle } from '@/data/blogArticles';
import { useLocale, useT } from '@/lib/i18n';

interface BlogArticlePanelProps {
  slug: string;
  showContinue?: boolean;
}

export default function BlogArticlePanel({ slug, showContinue = true }: BlogArticlePanelProps) {
  const article = getBlogArticle(slug);
  const [locale] = useLocale();
  const t = useT();
  const isKo = locale === 'ko';

  if (!article) {
    return (
      <p className="text-sm text-deep/50 py-8">
        {isKo ? '글을 찾을 수 없어요.' : 'Article not found.'}
      </p>
    );
  }

  const title = isKo ? article.title.ko : article.title.en;
  const thesis = isKo ? article.thesis.ko : article.thesis.en;
  const sections = isKo ? article.ko : article.en;
  const series = blogSeries[article.seriesId];
  const related = article.relatedSlugs
    .map(s => getBlogArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <article>
      <p className="text-xs uppercase tracking-wider text-deep/40 mb-2">
        {isKo ? series.title.ko : series.title.en}
        <span className="mx-2">·</span>
        {formatEpisodeLabel(article, isKo)}
        <span className="text-deep/30 mx-2">·</span>
        {article.readMinutes} {isKo ? '분' : 'min'}
      </p>
      <h2
        className="text-deep mb-5"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
      >
        {title}
      </h2>

      <div className="bg-deep/5 border-l-4 border-terracotta rounded-r-xl px-5 py-4 mb-8">
        <p className="text-sm font-medium text-deep leading-relaxed">{thesis}</p>
      </div>

      <BlogArticleBody sections={sections} />

      {showContinue && related.length > 0 && (
        <aside className="mt-12 pt-8 border-t border-deep/10">
          <h3 className="text-sm uppercase tracking-wider text-deep/40 mb-4">{t('blog.continue')}</h3>
          <ul className="space-y-2">
            {related.map(r => (
              <li key={r.slug}>
                <Link
                  to={`/blog?article=${r.slug}`}
                  className="text-sm text-deep hover:text-terracotta transition-colors"
                >
                  {formatEpisodeLabel(r, isKo)} · {isKo ? r.title.ko : r.title.en}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <p className="text-xs text-deep/40 mt-10">{t('footer.disclaimer')}</p>
    </article>
  );
}
