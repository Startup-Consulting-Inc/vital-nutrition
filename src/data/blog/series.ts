export const blogSeries = {
  dopamine: {
    id: 'dopamine' as const,
    title: { en: 'Dopamine & Nutrition', ko: '도파민과 영양' },
    description: {
      en: 'Six plain-language articles on how food, habits, and everyday chemistry shape your brain\'s motivation system.',
      ko: '음식이랑 습관, 카페인·단 것 같은 일상 자극이 뇌 "의욕 회로"에 어떻게 닿는지, 여섯 편으로 쉽게 풀어 쓴 시리즈예요.',
    },
  },
  vitamins: {
    id: 'vitamins' as const,
    title: { en: 'Vitamins & Daily Life', ko: '비타민과 일상' },
    description: {
      en: 'Eight articles on what vitamins actually do, how your body uses them, Korean-table staples, and when supplements help (or do not).',
      ko: '비타민이 뭔지, 몸에서 어떻게 쓰이는지, 한국 식탁으로 채우는 법, 영양제가 도움이 될 때를 여덟 편으로 풀어 쓴 시리즈예요.',
    },
  },
} as const;

export type BlogSeriesId = keyof typeof blogSeries;

export const BLOG_SERIES_ORDER: BlogSeriesId[] = ['dopamine', 'vitamins'];
