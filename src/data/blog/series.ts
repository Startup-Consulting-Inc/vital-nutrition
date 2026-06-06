export const blogSeries = {
  carbohydrates: {
    id: 'carbohydrates' as const,
    title: { en: 'Carbohydrates & Everyday Meals', ko: '탄수화물과 일상 식탁' },
    description: {
      en: 'Eight articles on carbs as brain fuel, fiber, added sugar, whole vs refined grains, blood-sugar pairing, US and Korean plates, and low-carb myths.',
      ko: '뇌의 에너지원인 탄수화물, 식이섬유, 첨가당, 통곡물과 정제 곡물의 차이, 혈당을 돕는 식사 조합, 한국 식탁 가이드, 저탄수화물 식단의 오해까지 총 8편으로 쉽게 풀어낸 시리즈입니다.',
    },
  },
  fiber: {
    id: 'fiber' as const,
    title: { en: 'Fiber & Gut Health', ko: '식이섬유와 장 건강' },
    description: {
      en: 'Eight articles on soluble vs insoluble fiber, daily targets, the microbiome, cholesterol and glucose, US and Korean plates, supplements, low-carb diets, and common myths.',
      ko: '수용성·불용성 식이섬유의 차이, 하루 권장량, 장내 미생물, 콜레스테롤과 혈당 조절, 한국 식탁 가이드, 보충제 섭취 요령, 저탄수화물 식단 시 주의점과 흔한 오해를 8편으로 구성한 시리즈입니다.',
    },
  },
  sugar: {
    id: 'sugar' as const,
    title: { en: 'Sugar & Sweetness', ko: '당과 단맛' },
    description: {
      en: 'Eight articles on why we crave sugar, health impacts, fruit vs added sugar, artificial sweeteners, zero-sugar labels, and a practical everyday approach.',
      ko: '우리가 단맛을 갈망하는 생리적 이유, 설탕의 건강 영향, 과일당과 첨가당의 차이, 대체 감미료의 진실, 무설탕(제로) 라벨 읽는 법, 일상에서 실천하는 타협안을 8편으로 정리한 시리즈입니다.',
    },
  },
  dopamine: {
    id: 'dopamine' as const,
    title: { en: 'Dopamine & Nutrition', ko: '도파민과 영양' },
    description: {
      en: 'Six plain-language articles on how food, habits, and everyday chemistry shape your brain\'s motivation system.',
      ko: '우리가 먹는 음식과 습관, 카페인 및 단맛 등의 자극이 뇌의 동기부여와 행동 조절을 담당하는 도파민 시스템에 어떤 영향을 주는지 6편에 걸쳐 명쾌하게 풀어낸 시리즈입니다.',
    },
  },
  vitamins: {
    id: 'vitamins' as const,
    title: { en: 'Vitamins & Daily Life', ko: '비타민과 일상' },
    description: {
      en: 'Eight articles on what vitamins actually do, how your body uses them, Korean-table staples, and when supplements help (or do not).',
      ko: '비타민의 진짜 생리학적 역할, 체내 흡수 및 활성화 과정, 한국 식탁에서 영양소 채우는 법, 그리고 영양제 섭취가 실제로 도움이 되는 시점을 8편으로 자세히 정리한 시리즈입니다.',
    },
  },
  protein: {
    id: 'protein' as const,
    title: { en: 'Protein & Everyday Meals', ko: '단백질과 일상 식탁' },
    description: {
      en: 'Eight articles on what protein does, how much you need, animal vs plant sources, US and Korean plates, timing myths, labels, and special cases.',
      ko: '단백질의 필수 역할, 하루 권장량 계산법, 동물성 단백질과 식물성 단백질의 차이, 섭취 타이밍에 관한 오해, 단백질 식품 라벨과 특수 상황을 8편으로 다룬 시리즈입니다.',
    },
  },
  minerals: {
    id: 'minerals' as const,
    title: { en: 'Minerals & Everyday Meals', ko: '미네랄과 일상 식탁' },
    description: {
      en: 'Eight articles on macro and trace minerals, iron and electrolytes, absorption, US and Korean plates, and when supplements or labs make sense.',
      ko: '다량 미네랄과 미량 미네랄의 차이, 철분과 전해질 흡수율 높이기, 한국 식탁의 미네랄 가이드, 보충제나 혈액 검사가 필요한 시점을 8편으로 체계적으로 다룬 시리즈입니다.',
    },
  },
  fats: {
    id: 'fats' as const,
    title: { en: 'Fats & Everyday Meals', ko: '지방과 일상 식탁' },
    description: {
      en: 'Eight articles on fat types, omega-3s, saturated and trans fats, cooking oils, fat-soluble vitamins, US and Korean plates, and common myths.',
      ko: '지방의 종류, 오메가-3의 중요성, 포화지방과 트랜스지방의 진실, 건강한 요리용 기름 선택법, 지용성 비타민 흡수율 높이기, 그리고 대중적인 오해를 8편으로 다룬 시리즈입니다.',
    },
  }
} as const;

export type BlogSeriesId = keyof typeof blogSeries;

export const BLOG_SERIES_ORDER: BlogSeriesId[] = [
  'carbohydrates',
  'fiber',
  'sugar',
  'protein',
  'vitamins',
  'minerals',
  'fats',
  'dopamine',
];
