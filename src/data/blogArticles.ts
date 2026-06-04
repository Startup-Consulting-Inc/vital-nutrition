export type { SectionBlock, BlogSection, BlogArticle } from './blog/types';
export { blogSeries, BLOG_SERIES_ORDER, type BlogSeriesId } from './blog/series';

import type { BlogArticle } from './blog/types';
import { blogSeries } from './blog/series';
import { carbohydrateArticles } from './blog/carbohydrateArticles';
import { dopamineArticles } from './blog/dopamineArticles';
import { fatArticles } from './blog/fatArticles';
import { mineralArticles } from './blog/mineralArticles';
import { proteinArticles } from './blog/proteinArticles';
import { vitaminArticles } from './blog/vitaminArticles';

export const blogArticles: BlogArticle[] = [
  ...carbohydrateArticles,
  ...proteinArticles,
  ...vitaminArticles,
  ...mineralArticles,
  ...fatArticles,
  ...dopamineArticles,
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}

export function getArticlesBySeries(seriesId: keyof typeof blogSeries): BlogArticle[] {
  return blogArticles.filter(a => a.seriesId === seriesId).sort((a, b) => a.episode - b.episode);
}

export function formatEpisodeLabel(article: BlogArticle, isKo: boolean): string {
  if (article.episodeLabel) {
    return isKo ? article.episodeLabel.ko : article.episodeLabel.en;
  }
  return isKo ? `${article.episode}편` : `Part ${article.episode}`;
}
