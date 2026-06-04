export const blogSeries = {
  carbohydrates: {
    id: 'carbohydrates' as const,
    title: { en: 'Carbohydrates & Everyday Meals', ko: '탄수화물과 일상 식탁' },
    description: {
      en: 'Eight articles on carbs as brain fuel, fiber, added sugar, whole vs refined grains, blood-sugar pairing, US and Korean plates, and low-carb myths.',
      ko: '뇌 연료, 섬유, 첨가당, 통곡 vs 정제, 혈당 짝짓기, 미국·한국 식탁, 저탄수 오해를 여덟 편으로 풀어 쓴 시리즈예요.',
    },
  },
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
  protein: {
    id: 'protein' as const,
    title: { en: 'Protein & Everyday Meals', ko: '단백질과 일상 식탁' },
    description: {
      en: 'Eight articles on what protein does, how much you need, animal vs plant sources, US and Korean plates, timing myths, labels, and special cases.',
      ko: '단백질 역할, 하루 양, 동물·식물, 미국·한국 식탁, 타이밍 신화, 라벨, 특수 상황을 여덟 편으로 풀어 쓴 시리즈예요.',
    },
  },
  minerals: {
    id: 'minerals' as const,
    title: { en: 'Minerals & Everyday Meals', ko: '미네랄과 일상 식탁' },
    description: {
      en: 'Eight articles on macro and trace minerals, iron and electrolytes, absorption, US and Korean plates, and when supplements or labs make sense.',
      ko: '다량·미량 미네랄, 철·전해질, 흡수, 미국·한국 식탁, 보충·검사가 맞을 때를 여덟 편으로 풀어 쓴 시리즈예요.',
    },
  },
  fats: {
    id: 'fats' as const,
    title: { en: 'Fats & Everyday Meals', ko: '지방과 일상 식탁' },
    description: {
      en: 'Eight articles on fat types, omega-3s, saturated and trans fats, cooking oils, fat-soluble vitamins, US and Korean plates, and common myths.',
      ko: '지방 종류, 오메가3, 포화·트랜스, 조리유, 지용성 비타민, 미국·한국 식탁, 흔한 오해를 여덟 편으로 풀어 쓴 시리즈예요.',
    },
  },
} as const;

export type BlogSeriesId = keyof typeof blogSeries;

export const BLOG_SERIES_ORDER: BlogSeriesId[] = [
  'carbohydrates',
  'protein',
  'vitamins',
  'minerals',
  'fats',
  'dopamine',
];
