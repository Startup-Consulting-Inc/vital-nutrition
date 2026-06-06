import type { BlogArticle } from './types';

export const carbohydrateArticles: BlogArticle[] = [
  {
    slug: 'carbohydrates-guide',
    seriesId: 'carbohydrates',
    episode: 1,
    title: {
      en: 'Carbohydrates: brain fuel, fiber, and why "cut all carbs" misses the point',
      ko: '탄수화물: 뇌의 에너지원, 식이섬유, 그리고 "무조건 탄수화물 끊기"가 본질을 비껴가는 이유',
    },
    thesis: {
      en: 'Carbohydrates are your brain\'s preferred fuel and your muscles\' quick energy. The win is choosing whole grains, legumes, and fruit with fiber—not banning every starch because of one soda habit.',
      ko: '탄수화물은 뇌가 가장 선호하는 에너지원이자 근육이 빠르게 사용하는 연료예요. 건강한 탄수화물 섭취의 핵심은 모든 전분을 끊는 것이 아니라, 통곡물이나 콩류, 식이섬유가 풍부한 과일을 현명하게 선택하는 데 있습니다.',
    },
    description: {
      en: 'A hub on what carbs do, simple vs complex, fiber, and the eight-part series map.',
      ko: '탄수화물의 역할, 단순 및 복합 탄수화물의 차이, 식이섬유, 그리고 총 8부작 시리즈의 지도를 모아둔 허브 문서입니다.',
    },
    readMinutes: 9,
    datePublished: '2026-07-06',
    relatedSlugs: [
      'carbohydrates-how-much',
      'carbohydrates-fiber',
      'carbohydrates-added-sugar',
      'carbohydrates-everyday-plate',
    ],
    en: [
      {
        heading: 'What carbohydrates are (and are not)',
        paragraphs: [
          'Carbs break down into glucose—the fuel your brain and red blood cells run on. The brain uses roughly 120 grams of glucose per day even though it is only about 2% of body weight.',
          'Carbs are not the same as "sugar bombs only." Whole foods carry starch plus fiber, protein, and vitamins. Ultra-processed snacks are a different category.',
          'The [carbohydrates encyclopedia](/nutrients/carbohydrates) lists functions, food tables, and what to limit. These articles walk the ideas in order.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'One line to keep',
            body: [
              'Upgrade carb quality before slashing every gram of rice or oats.',
            ],
          },
        ],
      },
      {
        heading: 'Simple, complex, and fiber',
        paragraphs: [
          'Simple carbs (sugars, juice, candy) hit the bloodstream fast. Complex carbs (oats, beans, sweet potato) digest slower when fiber is intact. Fiber is technically a carb your gut bacteria love even though it does not fuel you like glucose.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Carb categories on your plate',
            headers: ['Type', 'Examples', 'Practical note'],
            rows: [
              ['Complex + fiber', 'Oats, lentils, quinoa', 'Eat most'],
              ['Whole fruit', 'Apple, berries', 'Not the same as juice'],
              ['Refined', 'White bread, white rice', 'Limit frequency'],
              ['Added sugar', 'Soda, sweet cereal', 'Avoid as default'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '4 kcal/g', label: 'carbohydrate energy (vs 9 fat)' },
              { value: '~120 g', label: 'brain glucose per day' },
              { value: '45–65%', label: 'AHA carb calorie band' },
            ],
          },
        ],
      },
      {
        heading: 'Series map',
        paragraphs: [
          'Sugar and screens tie into dopamine habits—see [stimulants](/blog/dopamine-stimulants) for that story. Here we focus on fuel, fiber, and labels.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[How much carbohydrate per day](/blog/carbohydrates-how-much)'],
              ['Part 3', '[Fiber and gut health](/blog/carbohydrates-fiber)'],
              ['Part 4', '[Added sugar & drinks](/blog/carbohydrates-added-sugar)'],
              ['Part 7', '[US everyday plate](/blog/carbohydrates-everyday-plate)'],
              ['Encyclopedia', '[Carbohydrate foods](/nutrients/carbohydrates)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '탄수화물의 정의와 흔한 오해',
        paragraphs: [
          '탄수화물은 체내에서 포도당으로 분해되어 뇌와 적혈구의 핵심 에너지원으로 쓰입니다. 뇌는 전체 체중의 약 2%에 불과하지만, 하루에 약 120g에 달하는 포도당을 소비합니다.',
          '탄수화물이 곧 \'당분 덩어리\'만을 의미하는 것은 아닙니다. 가공되지 않은 자연 식품 속 탄수화물은 녹말뿐만 아니라 식이섬유, 단백질, 비타민 등을 함께 제공하기 때문이죠. 초가공 식품 과자와는 완전히 다른 범주입니다.',
          '[탄수화물 백과](/nutrients/carbohydrates)에서 구체적인 기능과 식품 정보, 섭취 제한 가이드를 확인해 보세요. 이번 시리즈 글들은 이러한 개념들을 순서대로 알기 쉽게 풀어 드립니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '핵심 요약',
            body: [
              '밥이나 귀리를 무조건 끊기 전에 탄수화물의 질부터 높여 보세요.',
            ],
          },
        ],
      },
      {
        heading: '단순 탄수화물, 복합 탄수화물, 그리고 식이섬유',
        paragraphs: [
          '단순 탄수화물(설탕, 주스, 사탕 등)은 혈액 속으로 빠르게 흡수됩니다. 반면 귀리, 콩, 고구마 같은 복합 탄수화물은 식이섬유가 풍부해 천천히 소화 및 흡수됩니다. 식이섬유 역시 탄수화물의 일종이지만, 당류와 달리 직접적인 열량이 되기보다는 장내 미생물의 훌륭한 먹이가 되어 줍니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '내 식탁 위의 탄수화물 분류',
            headers: ['종류', '식품 예시', '실천 가이드'],
            rows: [
              ['복합 탄수화물 + 식이섬유', '귀리, 렌틸콩, 퀴노아', '가장 권장하는 식품'],
              ['신선한 생과일', '사과, 베리류', '주스와는 다릅니다'],
              ['정제 탄수화물', '흰빵, 백미', '섭취 빈도 줄이기'],
              ['첨가당', '탄산음료, 가당 시리얼', '기본적으로 피할 것'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '4kcal/g', label: '탄수화물의 에너지 (지방은 9 kcal/g)' },
              { value: '~120g', label: '하루 뇌에 필요한 포도당 양' },
              { value: '45–65%', label: '미국심장협회(AHA) 권장 칼로리 비율' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 안내',
        paragraphs: [
          '설탕과 스마트폰 화면 등은 도파민 중독 습관과 긴밀히 연결되어 있습니다. 자세한 내용은 [자극제 관련 글](/blog/dopamine-stimulants)을 참고해 보세요. 여기서는 영양 공급원, 식이섬유, 영양성분표 확인법에 집중해 보겠습니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '이어지는 콘텐츠 추천',
            headers: ['시리즈 순서', '주제'],
            rows: [
              ['2편', '[하루 탄수화물 적정 섭취량](/blog/carbohydrates-how-much)'],
              ['3편', '[식이섬유와 장 건강](/blog/carbohydrates-fiber)'],
              ['4편', '[첨가당과 가당 음료](/blog/carbohydrates-added-sugar)'],
              ['7편', '[우리 식탁 분석과 대체 식품](/blog/carbohydrates-everyday-plate)'],
              ['백과사전', '[탄수화물 식품 목록](/nutrients/carbohydrates)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-how-much',
    seriesId: 'carbohydrates',
    episode: 2,
    title: {
      en: 'How many carbs per day: percent of calories, grams, and brain needs',
      ko: '하루 탄수화물 적정 섭취량: 권장 칼로리 비율, 하루 권장량(g), 뇌의 포도당 소모량',
    },
    thesis: {
      en: 'Guidelines often land at 45–65% of calories from carbs on a balanced diet—about 225–325 g on 2,000 kcal. Athletes, pregnancy, and diabetes change the target; blogs do not replace your clinician.',
      ko: '균형 잡힌 식단에서 권장하는 탄수화물 칼로리 비율은 45~65%로, 하루 2,000kcal 섭취 기준 약 225~325g에 해당합니다. 운동선수, 임신부, 당뇨 환자 등에 따라 목표치는 달라질 수 있으며, 블로그 정보는 전문의의 진료를 대신할 수 없습니다.',
    },
    description: {
      en: 'Daily carb ranges, brain glucose use, and when totals shift for activity or medical care.',
      ko: '하루 탄수화물 적정 섭취량 범위, 뇌의 포도당 소모량, 신체 활동 수준 및 건강 상태에 따른 섭취량 조정 가이드입니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-07',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-blood-sugar-pairs', 'carbohydrates-myths-special', 'protein-how-much'],
    en: [
      {
        heading: 'Percent vs grams',
        paragraphs: [
          'The American Heart Association cites 45–65% of calories from carbohydrates for many adults. On 2,000 kcal that is roughly 225–325 g. Endurance athletes may need more; strict ketogenic medical diets use far less under supervision.',
          'Your brain still needs glucose daily. Very low carb without adaptation leaves some people foggy. That is a fuel mismatch, not a moral failing.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Rough daily bands (general adults)',
            headers: ['Context', 'Carb share', 'Example g (2,000 kcal)'],
            rows: [
              ['Balanced plate', '45–65%', '225–325 g'],
              ['Active runner', 'Often mid-high range', 'Individual'],
              ['Medical low-carb', 'Clinician set', 'Not DIY from posts'],
              ['Brain minimum', 'Glucose from food or adaptation', '~120 g brain use'],
            ],
          },
        ],
      },
      {
        heading: 'Quality still rules the number',
        paragraphs: [
          '300 g from lentils, oats, and fruit is not the same as 300 g from soda and pastries. The gram total matters less than where those grams came from. See [added sugar](/blog/carbohydrates-added-sugar) and [refined vs whole](/blog/carbohydrates-refined-vs-whole).',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '45–65%', label: 'AHA carb calorie range' },
              { value: '225–325 g', label: 'on 2,000 kcal diet' },
              { value: '<10%', label: 'WHO added sugar ceiling' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Log a week in the [Analyzer](/analyzer) before cutting rice entirely. Next: [fiber](/blog/carbohydrates-fiber).',
        ],
      },
    ],
    ko: [
      {
        heading: '칼로리 비율(%) vs 물리적 질량(g)',
        paragraphs: [
          '미국심장협회(AHA)는 성인 기준 하루 섭취 칼로리의 45~65%를 탄수화물로 채울 것을 권장합니다. 이는 하루 2,000kcal 섭취 시 대략 225~325g에 해당하죠. 지구력 운동선수는 이보다 많이 필요할 수 있고, 질환 치료를 위한 엄격한 키토제닉(저탄고지) 식단은 반드시 의료진의 감독 하에 진행해야 합니다.',
          '뇌가 정상적으로 활동하려면 매일 포도당이 꼭 필요해요. 신체가 준비되지 않은 상태에서 극단적인 저탄수화물 식단을 고집하면 뇌에 연료가 부족해 머리가 멍해지는 증상(브레인 포그)을 겪을 수 있습니다. 이는 의지의 문제가 아니라 몸에 필요한 연료가 맞지 않아 발생하는 현상입니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '하루 탄수화물 적정 섭취 범위 (일반 성인 기준)',
            headers: ['대상 및 상황', '탄수화물 권장 비율', '섭취량 기준 (2,000 kcal 기준)'],
            rows: [
              ['균형 잡힌 식단', '45~65%', '225~325g'],
              ['활동량이 많은 운동선수', '보통 중간에서 높은 범위 권장', '개인 맞춤형 조정'],
              ['의학적 목적의 저탄수화물 식단', '의료진이 직접 설정', '인터넷 글을 보고 임의로 결정 금지'],
              ['뇌의 기본 필요량', '식품으로 섭취하거나 신체 적응을 통해 공급', '뇌 단독으로만 하루 약 120g 소모'],
            ],
          },
        ],
      },
      {
        heading: '섭취량 숫자보다 중요한 탄수화물의 질',
        paragraphs: [
          '렌틸콩, 귀리, 생과일로 섭취하는 탄수화물 300g은 탄산음료나 초가공 빵으로 채우는 300g과 몸에 미치는 영향이 완전히 다릅니다. 단순히 몇 그램(g)을 먹느냐보다 그 탄수화물이 어디서 왔는지가 훨씬 중요해요. 자세한 내용은 [첨가당 관련 글](/blog/carbohydrates-added-sugar)과 [정제 곡물และ 통곡물의 차이](/blog/carbohydrates-refined-vs-whole)에서 확인하실 수 있습니다.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '45–65%', label: 'AHA 권장 탄수화물 칼로리 비율' },
              { value: '225–325g', label: '2,000 kcal 식단 기준 하루 권장량' },
              { value: '<10%', label: '세계보건기구(WHO) 첨가당 권장 상한선' },
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '밥공기부터 무작정 비우기 전에, [식단 분석기](/analyzer)를 통해 내가 일주일 동안 무엇을 먹는지 먼저 기록해 보세요. 다음 글에서는 [식이섬유](/blog/carbohydrates-fiber)에 대해 알아보겠습니다.',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-fiber',
    seriesId: 'carbohydrates',
    episode: 3,
    title: {
      en: 'Fiber: the carbohydrate that feeds your gut and slows the spike',
      ko: '식이섬유: 장내 유익균을 살리고 혈당 스파이크를 막아주는 똑똑한 탄수화물',
    },
    thesis: {
      en: 'Fiber is a carb you do not fully digest, yet it steadies glucose, feeds gut bacteria, and shows up in the best carb foods: beans, lentils, oats, and whole fruit.',
      ko: '식이섬유는 우리 몸에서 완전히 소화되지는 않지만, 혈당을 안정적으로 유지하고 장내 유익균의 좋은 먹이가 됩니다. 콩류, 렌틸콩, 귀리, 생과일 등 가장 건강한 탄수화물 식품에 가득 들어 있습니다.',
    },
    description: {
      en: 'Soluble vs insoluble fiber, legume targets, and why juice strips the benefit.',
      ko: '수용성과 불용성 식이섬유의 차이, 권장되는 콩류 섭취량, 주스를 마시면 왜 식이섬유의 건강 혜택을 온전히 누리지 못하는지 알아봅니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-08',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-refined-vs-whole', 'fiber-guide', 'minerals-iron'],
    en: [
      {
        heading: 'Why fiber matters',
        paragraphs: [
          'Lentils pack about 16 g fiber per cooked cup in the encyclopedia table; black beans about 7–8 g per half cup. That fiber blunts glucose spikes and supports regular digestion.',
          'Juice removes fiber and leaves a faster sugar hit. Whole apples beat apple juice for the same reason.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'High-fiber carb anchors',
            headers: ['Food', 'Fiber highlight', 'Bonus'],
            rows: [
              ['Lentils (1 cup)', '~16 g fiber', 'Protein + iron'],
              ['Chickpeas (½ cup)', '~6 g fiber', 'Hummus bowls'],
              ['Oats (1 cup cooked)', '~4 g fiber', 'LDL-friendly'],
              ['Apple (medium)', '~4 g fiber', 'Polyphenols'],
            ],
          },
        ],
      },
      {
        heading: 'Build fiber without supplements',
        paragraphs: [
          'Make half your grains whole, eat beans several times a week, and put vegetables on the plate at lunch and dinner. Most adults aim for roughly 25–38 g of fiber a day depending on age and sex (general guidelines), and food should come first.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Ramp up slowly',
            body: [
              'Jumping from low fiber to huge bean portions can bloat you. Increase water as fiber rises.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Swap white rice for brown half the week, and add lentils to soup. For a deeper dive into the gut microbiome, supplements, keto, and myths, see the [Fiber & Gut Health series](/blog/fiber-guide).',
          'Next in this carb line: [added sugar](/blog/carbohydrates-added-sugar).',
        ],
      },
    ],
    ko: [
      {
        heading: '식이섬유가 중요한 이유',
        paragraphs: [
          '영양성분표 가이드에 따르면 삶은 렌틸콩 1컵에는 약 16g, 검은콩 반 컵에는 약 7~8g의 식이섬유가 들어 있습니다. 식이섬유는 탄수화물이 몸에 빠르게 흡수되는 것을 막아 혈당 스파이크를 방지하고 원활한 소화 작용을 돕습니다.',
          '과일을 주스 형태로 착즙해 마시면 식이섬유는 대부분 걸러지고 과당만 몸에 빠르게 흡수됩니다. 액상 과즙 대신 사과를 통째로 씹어 먹는 것이 건강에 훨씬 이로운 이유도 바로 이 때문입니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '식이섬유가 풍부한 건강 탄수화물 식품',
            headers: ['식품', '식이섬유 함량', '함께 얻는 이점'],
            rows: [
              ['렌틸콩 (1컵)', '~16g', '풍부한 단백질과 철분'],
              ['병아리콩 (½컵)', '~6g', '홈메이드 후무스 활용'],
              ['조리된 귀리 (1컵)', '~4g', 'LDL 콜레스테롤 조절에 도움'],
              ['사과 (중간 크기 1개)', '~4g', '항산화 성분 폴리페놀'],
            ],
          },
        ],
      },
      {
        heading: '보충제 대신 음식으로 식이섬유 채우기',
        paragraphs: [
          '드시는 곡물의 절반은 통곡물로 바꾸고, 일주일에 몇 번은 식단에 콩을 더해 보세요. 점심과 저녁 식사 때는 채소 반찬을 꼭 올리는 습관이 좋습니다. 성인 기준 하루 권장 식이섬유 섭취량은 연령과 성별에 따라 약 25~38g 수준인데, 이를 보충제보다는 자연 식재료를 통해 채우는 것이 훨씬 효과적입니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '섭취량은 서서히 늘려가세요',
            body: [
              '평소 식이섬유를 적게 먹던 사람이 갑자기 많은 양의 콩을 섭취하면 복부 팽만감이나 더부룩함을 느낄 수 있어요. 식이섬유 섭취량을 늘릴 때는 물도 충분히 마셔주어야 합니다.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '일주일 중 절반은 흰쌀밥 대신 현미밥이나 잡곡밥을 드시고, 국이나 찌개에 렌틸콩을 한 줌 넣어 보세요. 장내 미생물 군집, 보충제 복용 요령, 식이섬유에 얽힌 흔한 오해 등에 대한 더 깊은 내용은 [식이섬유 시리즈 가이드](/blog/fiber-guide)에서 확인하실 수 있습니다.',
          '탄수화물 시리즈 다음 편: [첨가당과 건강](/blog/carbohydrates-added-sugar).',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-added-sugar',
    seriesId: 'carbohydrates',
    episode: 4,
    title: {
      en: 'Added sugar: soda, sweet coffee, and the 10% calorie line',
      ko: '첨가당: 탄산음료, 가당 커피, 그리고 하루 권장 칼로리 10% 제한선',
    },
    thesis: {
      en: 'Added sugar is the carb category with the weakest health case. WHO suggests under 10% of calories, about 50 g on 2,000 kcal, with 5% as a better target. Liquid sugar is the fastest path in.',
      ko: '첨가당은 탄수화물 중에서 건강상 이점이 가장 적은 식품군입니다. 세계보건기구(WHO)는 하루 총 섭취 칼로리의 10% 미만(2,000kcal 기준 약 50g)을 가당 권장선으로 제시하며, 5% 이하로 낮추면 더욱 이상적이라고 조언합니다. 특히 음료 형태의 액상 과당은 몸에 흡수되는 속도가 가장 빨라 각별히 주의해야 합니다.',
    },
    description: {
      en: 'Sweet drinks, label reading for added sugars, and why fruit sugar is a different conversation.',
      ko: '액상 음료 속의 당분, 영양성분표에서 첨가당 함량 확인하는 법, 그리고 신선한 과일 속 당분과의 차이점을 알아봅니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-09',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-refined-vs-whole', 'sugar-guide', 'dopamine-stimulants'],
    en: [
      {
        heading: 'Added vs natural',
        paragraphs: [
          'Lactose in plain milk and fructose in whole fruit come packaged with protein, fat, or fiber. Added sugars in soda, sweetened tea, candy, and many cereals are concentrated calories without fullness.',
          'The encyclopedia "Avoid" bucket leads with sugar-sweetened beverages and pastries for a reason: they drive metabolic risk more reliably than plain rice ever did.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Added sugar traps (US)',
            headers: ['Source', 'Why it stacks', 'Swap'],
            rows: [
              ['Soda (12 oz)', '~39 g sugar', 'Sparkling water + citrus'],
              ['Sweet coffee drinks', 'Syrups hide volume', 'Milk + cinnamon'],
              ['Breakfast cereal', 'Check added sugars line', 'Oats + berries'],
              ['Flavored yogurt', 'Fruit on label, sugar first', 'Plain + frozen berries'],
            ],
          },
        ],
      },
      {
        heading: 'Labels: added sugars line',
        paragraphs: [
          'US labels now list "Added Sugars" in grams and %DV. A bar with 15 g added sugar is half the 10% budget on one snack. The [Analyzer](/analyzer) aggregates a week faster than guessing.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<10%', label: 'WHO added sugar calories' },
              { value: '~50 g', label: '10% on 2,000 kcal' },
              { value: '0 g', label: 'ideal soda default' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Dopamine loop overlap',
            body: [
              'Sweet, fatty, salty ultra-processed foods hit reward hard. If cravings drive the pattern, see [dopamine stimulants](/blog/dopamine-stimulants).',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Drop one sweet drink for a week and notice your focus and sleep. For the science of cravings, sweeteners, and a practical approach beyond just grams, see the [Sugar & Sweetness series](/blog/sugar-guide).',
          'Next in this carb line: [refined vs whole](/blog/carbohydrates-refined-vs-whole).',
        ],
      },
    ],
    ko: [
      {
        heading: '첨가당과 천연당의 차이',
        paragraphs: [
          '흰 우유에 든 유당이나 생과일 속 천연 과당은 단백질, 지방, 식이섬유 같은 유익한 영양소와 함께 섭취됩니다. 반면 탄산음료, 액상 차, 사탕, 가공 시리얼 등에 들어가는 첨가당은 포만감은 주지 못한 채 순수하게 칼로리만 가득한 영양 결핍 에너지원입니다.',
          '탄수화물 백과 사전에서 \'주의해야 할 식품\' 항목 맨 위에 가당 음료와 디저트류가 자리한 데는 과학적인 이유가 있습니다. 이들은 일반 흰쌀밥보다 우리 몸의 대사 질환 위험을 훨씬 가파르게 올리기 때문입니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '조심해야 할 일상 속 첨가당 함정',
            headers: ['식품 유형', '원인 분석', '건강한 대체 식품'],
            rows: [
              ['탄산 및 에너지 음료', '한 캔당 대략 30~40g의 높은 당분', '탄산수 + 생레몬 즙'],
              ['카페의 가당 음료(시럽 커피)', '시럽 추가로 당 섭취량 인지 불가', '카페라떼 + 시나몬 파우더'],
              ['아침 식사용 시리얼', '제품별 영양표 내 첨가당 함량 확인', '오트밀 + 생베리류'],
              ['맛이 첨가된 요거트', '과일 함유를 강조하지만 실제론 설탕 비율이 높음', '플레인 요거트 + 냉동 베리'],
            ],
          },
        ],
      },
      {
        heading: '영양성분표에서 첨가당 함량 확인하기',
        paragraphs: [
          '식품의 영양성분 정보란에는 총 당류뿐만 아니라 \'첨가당(Added Sugars)\'의 함량(g)과 일일 영양성분 기준치에 대한 비율(%DV)이 나와 있습니다. 영양바 하나에 15g의 첨가당이 들어있다면 간식 하나로 하루 제한 권장량의 약 30%를 쓰는 셈입니다. 매번 계산하기 번거롭다면 [식단 분석기](/analyzer)를 통해 일주일 섭취 총량을 간편하게 집계해 보세요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<10%', label: '세계보건기구(WHO) 권장 첨가당 칼로리 상한선' },
              { value: '~50g', label: '2,000 kcal 섭취 기준 하루 약 50g 이하' },
              { value: '0g', label: '탄산음료 기본 제로화 목표' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: '도파민 보상 회로와의 연관성',
            body: [
              '달고 짜고 기름진 초가공 식품은 우리 뇌의 보상 회로를 강하게 자극합니다. 혹시 이들 식품에 대한 자제하기 힘든 식탐이 반복되는 패턴을 보인다면 [도파민과 자극제 관련 글](/blog/dopamine-stimulants)을 참조해 보세요.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '일주일 동안 하루 중 마시던 가당 음료 딱 한 잔만 줄여보고, 내 집중력과 수면 질이 어떻게 개선되는지 몸소 체감해 보세요. 단맛을 원하게 되는 신체 메커니즘과 대체 감미료의 진실, 그리고 스트레스 없는 식습관 가이드는 [당과 단맛 시리즈](/blog/sugar-guide)에서 더욱 심도 있게 다룹니다.',
          '탄수화물 시리즈 다음 편: [정제 곡물과 통곡물의 차이](/blog/carbohydrates-refined-vs-whole).',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-refined-vs-whole',
    seriesId: 'carbohydrates',
    episode: 5,
    title: {
      en: 'Refined vs whole grains: white rice, white bread, and the slower curve',
      ko: '정제 곡물과 통곡물: 백미, 흰 식빵, 그리고 더 완만한 혈당 곡선 만들기',
    },
    thesis: {
      en: 'Refining strips the bran and germ, and fiber, B vitamins, and slower digestion go with them. You do not need zero white rice. You need whole grains and beans often enough to matter.',
      ko: '곡물을 정제 가공하면 외피(겨)와 배아가 깎여 나가는데, 이때 우리 몸에 이로운 식이섬유, 비타민 B군, 그리고 느린 소화 능력이 함께 사라집니다. 백미를 완벽하게 차단할 필요는 없습니다. 대신 식단에 통곡물과 콩을 충분히 섞어 드시면 큰 변화를 얻으실 수 있습니다.',
    },
    description: {
      en: 'White vs brown rice, bread, pasta upgrades, and glycemic impact without fad language.',
      ko: '백미와 현미의 차이, 건강한 빵과 파스타면 고르는 법, 과장 없는 실질적인 혈당 지수 관리 가이드입니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-10',
    relatedSlugs: ['carbohydrates-fiber', 'carbohydrates-added-sugar', 'carbohydrates-blood-sugar-pairs', 'carbohydrates-guide'],
    en: [
      {
        heading: 'What refining removes',
        paragraphs: [
          'White flour and white rice are mostly starch. Nutrients and fiber from the outer layers are gone. Blood glucose rises faster; hunger returns sooner.',
          'Whole wheat bread, brown rice, quinoa, and oats still deliver carbs but with a gentler curve and more micronutrients.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Swap ladder',
            headers: ['Often', 'Upgrade', 'Keep sometimes'],
            rows: [
              ['White rice daily', 'Half brown or quinoa mix', 'White at restaurants OK'],
              ['White bread', 'Whole grain slice', 'Read fiber >2 g/slice'],
              ['Refined pasta', 'Whole wheat or legume pasta', 'Portion + salad'],
              ['Pretzels', 'Nuts or hummus + veg', 'Party exception'],
            ],
          },
        ],
      },
      {
        heading: 'Glycemic index, kept simple',
        paragraphs: [
          'Glycemic index tables are noisy. Ripeness, cooking time, and what else is on the plate all change the result. The practical rule: whole food with fiber and protein beats memorizing numbers.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Plate context wins',
            body: [
              'Rice with beans and vegetables behaves differently than rice alone. Same carb grams, different experience.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Aim for at least half your grains whole (Dietary Guidelines style). Next: [blood sugar pairs](/blog/carbohydrates-blood-sugar-pairs).',
        ],
      },
    ],
    ko: [
      {
        heading: '정제 과정에서 유실되는 영양소',
        paragraphs: [
          '흰 밀가루와 백미는 껍질이 대부분 깎여 나가 전분질(녹말)만 남은 상태입니다. 곡물의 외피에 모여있던 영양 성분과 식이섬유가 대부분 사라져 혈당이 빠르게 상승하고, 포만감도 빨리 꺼집니다.',
          '반면 통밀빵, 현미, 퀴노아, 귀리 같은 통곡물은 동일한 탄수화물이더라도 혈당 상승 곡선을 아주 완만하게 유도하며 풍부한 미량 영양소를 함께 공급합니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '탄수화물 대체 가이드',
            headers: ['현재 식단 패턴', '추천하는 대체 식품', '일반적인 허용 팁'],
            rows: [
              ['매일 백미를 먹는 경우', '현미 반반 섞기 또는 퀴노아 혼식', '외식할 때 가끔 흰쌀밥을 먹는 것은 괜찮습니다'],
              ['흰 식빵', '통곡물 식빵 1조각', '1조각당 식이섬유 2g 이상 확인'],
              ['일반 밀가루 면', '통밀면 또는 두부면·콩면', '섭취량 조절 및 샐러드 곁들이기'],
              ['프레첼, 과자류', '견과류 또는 채소 스틱과 후무스', '친목 모임이나 파티 때는 가볍게'],
            ],
          },
        ],
      },
      {
        heading: '혈당 지수(GI)를 바라보는 직관적인 태도',
        paragraphs: [
          '일반적인 혈당 지수(GI) 수치표는 변수가 너무 많아 복잡합니다. 식재료가 익은 정도, 조리 시간, 그리고 함께 먹는 다른 반찬들에 따라 수치가 계속 달라지기 때문입니다. 따라서 복잡한 숫자를 외우기보다, 가공되지 않은 자연 식품에 식이섬유와 단백질을 곁들이는 건강한 식사 방식을 기억해 두는 것이 훨씬 유용합니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '식사 조합의 힘',
            body: [
              '밥 한 공기를 그냥 먹는 것보다 콩이나 나물 반찬과 함께 조화롭게 섭취할 때 몸이 받는 혈당 영향은 완전히 달라집니다. 탄수화물 함량이 같아도 신체 반응은 다를 수 있습니다.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '매일 먹는 곡물의 최소 절반 이상은 통곡물(식생활 지침 권장 사항)로 구성하는 습관을 들여 보세요. 다음 편: [혈당 조절을 돕는 음식 조합](/blog/carbohydrates-blood-sugar-pairs).',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-blood-sugar-pairs',
    seriesId: 'carbohydrates',
    episode: 6,
    title: {
      en: 'Blood sugar steadier: pair carbs with protein, fat, and fiber',
      ko: '혈당 조절 짝꿍: 탄수화물에 단백질, 지방, 식이섬유 조합하기',
    },
    thesis: {
      en: 'The same carbs land softer with eggs, yogurt, beans, or olive oil on the same plate. That is why "cereal alone" crashes and "cereal plus nuts" does not.',
      ko: '동일한 탄수화물이더라도 달걀, 요거트, 콩류, 올리브오일 등의 식품을 같은 식탁에 구성하면 흡수가 훨씬 완만해집니다. 설탕이 가득한 시리얼만 먹었을 때는 급격한 혈당 저하를 겪지만, 견과류를 더해주면 에너지가 오래 유지되는 이유가 바로 여기에 있습니다.',
    },
    description: {
      en: 'Meal pairing, exercise fuel, and links to protein and dopamine without repeating those series.',
      ko: '현명한 식단 페어링, 운동 전후의 탄수화물 섭취 요령, 단백질 및 도파민 조절과의 상관 관계를 한눈에 짚어 봅니다.',
    },
    readMinutes: 7,
    datePublished: '2026-07-11',
    relatedSlugs: ['carbohydrates-guide', 'protein-guide', 'fats-guide', 'dopamine-stimulants'],
    en: [
      {
        heading: 'Pairing rules that actually stick',
        paragraphs: [
          'Toast with peanut butter beats jam-only toast. Rice with lentils and vegetables beats rice alone. The encyclopedia tip, pairing carbs with protein or fat, is most of the game for many meals.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Steady meal build',
            steps: [
              { label: 'Carb base', note: 'oats, rice, potato' },
              { label: 'Protein', note: 'eggs, fish, tofu' },
              { label: 'Fat or fiber', note: 'nuts, olive oil, veg' },
              { label: 'Skip liquid sugar', note: 'soda off the table' },
            ],
          },
        ],
      },
      {
        heading: 'Exercise and timing',
        paragraphs: [
          'Muscles use glucose during hard effort. Athletes may need carbs before or after training; desk workers need steady meals more than gel packs. No universal "no carbs after 6 p.m." rule holds up.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Medical patterns differ',
            body: [
              'Diabetes medications, pregnancy, and hypoglycemia need clinician meal plans, not influencer clocks.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Audit one week: which meals are carb-only? Add one partner nutrient. Next: [everyday plate](/blog/carbohydrates-everyday-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '성공적인 식사 페어링 규칙',
        paragraphs: [
          '잼만 잔뜩 바른 토스트보다는 땅콩버터를 곁들인 토스트가, 흰 쌀밥만 먹는 것보다는 렌틸콩과 채소 반찬을 같이 올린 식단이 훨씬 유익합니다. 탄수화물 백과에서 알려주는 \'탄수화물 섭취 시 단백질และ 지방을 곁들이라\'는 원칙은 거의 모든 식사에 적용되는 핵심 건강 비결입니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '혈당을 잡는 균형 식사 조립법',
            steps: [
              { label: '탄수', note: '귀리, 잡곡밥, 통감자 등' },
              { label: '단백', note: '달걀, 흰살 생선, 두부 등' },
              { label: '지방·섬유', note: '견과류, 올리브 오일, 계절 채소 등' },
              { label: '액체당 X', note: '탄산음료 등 과도한 첨가당 제한' },
            ],
          },
        ],
      },
      {
        heading: '운동과 섭취 타이밍의 중요성',
        paragraphs: [
          '강도 높은 운동을 할 때 근육은 에너지를 내기 위해 포도당을 끌어다 씁니다. 격렬하게 운동하는 운동선수는 훈련 전후로 탄수화물을 잘 보충해 주어야 하지만, 주로 책상에 오래 앉아 있는 직장인은 운동용 에너지 젤을 따로 섭취하는 것보다 매 끼니를 규칙적으로 든든히 먹는 것이 훨씬 낫습니다. 널리 퍼진 "저녁 6시 이후 탄수화물 금지"라는 조언은 모든 사람에게 통하는 규칙이 아닙니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '질병 및 임신 등 예외적 상황',
            body: [
              '당뇨병 치료제를 복용 중이거나, 임신 중이거나, 저혈당증이 자주 오는 경우에는 온라인상의 트렌디한 조언이나 임의로 만든 일정이 아니라 반드시 의료진과 상담하여 개별화된 식단을 설계하셔야 합니다.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '내 식단을 일주일 동안 찬찬히 점검해 보세요. 영양성분 중 오직 탄수화물만으로 채워진 불균형한 끼니가 있었나요? 그렇다면 그 한 끼에 단백질, 식이섬유, 건강한 지방 중 하나를 간단히 곁들여 보세요. 다음 편: [우리 식탁 분석과 대체 식품](/blog/carbohydrates-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-everyday-plate',
    seriesId: 'carbohydrates',
    episode: 7,
    title: {
      en: 'The US plate: oats, whole grains, fruit, and where sugar sneaks in',
      ko: '우리 식탁의 불균형: 건강한 통곡물과 숨겨진 가당 식품 가이드',
    },
    thesis: {
      en: 'A solid US day centers carbs on oats, beans, and whole fruit, and treats soda, pastries, and white-bread-only lunches as the real problem, not bananas.',
      ko: '영양이 가득한 좋은 식탁은 잡곡밥, 콩류, 신선한 생과일을 중심으로 구성합니다. 진짜 건강에 위해가 되는 주범은 탄산음료나 정제 밀가루 위주의 간편식이지, 천연 과일인 바나나가 결코 아닙니다.',
    },
    description: {
      en: 'US meal slots for quality carbs vs sugar traps.',
      ko: '하루 끼니 패턴에서 채워야 할 우수한 탄수화물 식품들과 우리가 무심코 지나치기 쉬운 숨은 첨가당 함정들을 낱낱이 파헤칩니다.',
    },
    readMinutes: 9,
    datePublished: '2026-07-12',
    relatedSlugs: ['carbohydrates-fiber', 'carbohydrates-added-sugar', 'carbohydrates-blood-sugar-pairs', 'carbohydrates-guide'],
    en: [
      {
        heading: 'US patterns that skew sugary',
        paragraphs: [
          'Breakfast cereal with 15 g added sugar, lunch chips and a soda, dinner pasta without vegetables: that is 200+ g of carbs with low fiber. Fixing one drink or swapping oats for cereal shifts the whole day.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Three carb anchors',
            steps: [
              { label: 'Breakfast', note: 'oats + berries + nuts' },
              { label: 'Lunch', note: 'bean soup or whole grain + salad' },
              { label: 'Dinner', note: 'sweet potato + fish + greens' },
            ],
          },
        ],
      },
      {
        heading: 'US everyday carb map',
        paragraphs: [
          'From the [carbohydrates encyclopedia](/nutrients/carbohydrates).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Meal slots (US)',
            headers: ['Meal', 'Staples', 'Quality', 'Limit'],
            rows: [
              ['Breakfast', 'Oatmeal + banana', 'Fiber + potassium', 'Sugary cereal'],
              ['Lunch', 'Chickpea bowl + olive oil', 'Fiber + protein', 'Deli sub + chips'],
              ['Dinner', 'Brown rice + salmon + broccoli', 'Omega-3 + fiber', 'Frozen pizza nightly'],
              ['Snack', 'Apple + peanut butter', 'Fiber + fat', 'Cookies'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '½', label: 'grains whole (guideline target)' },
              { value: '0', label: 'soda as default drink' },
              { value: '7 days', label: 'Analyzer before banning fruit' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Log beverages first. They are the fastest added-sugar win. Next: [myths & special cases](/blog/carbohydrates-myths-special).',
        ],
      },
    ],
    ko: [
      {
        heading: '나도 모르게 당분이 쌓이기 쉬운 일상 패턴',
        paragraphs: [
          '아침 식사로 설탕 함량이 높은 시리얼이나 가당 커피를 먹고, 점심 식사 때는 빵이나 밀가루 면을 먹으며 탄산음료를 마시고, 저녁엔 채소나 단백질 반찬 없이 탄수화물 위주의 식사를 한다면 하루 동안 섭취하는 식이섬유는 턱없이 낮아지고 200g 이상의 단순 정제 탄수화물만 쌓이게 됩니다. 가당 음료 한 잔만 무당 음료로 대체하거나 시리얼 대신 오트밀을 선택하는 작은 변화만으로도 하루 컨디션 전체가 바뀔 수 있습니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '하루 건강 탄수화물 세 가지 축',
            steps: [
              { label: '아침', note: '오트밀, 삶은 고구마, 무가당 두유' },
              { label: '점심', note: '현미잡곡밥과 콩·두부류 반찬' },
              { label: '저녁', note: '현미밥과 생선구이, 그리고 제철 나물' },
            ],
          },
        ],
      },
      {
        heading: '한국 식탁의 일상 탄수화물 가이드',
        paragraphs: [
          '[탄수화물 백과](/nutrients/carbohydrates)를 참고하여 건강하게 재구성해 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '권장 식사 패턴 예시',
            headers: ['끼니', '추천 식재료', '이유 및 장점', '줄여야 할 것'],
            rows: [
              ['아침', '오트밀 + 바나나', '풍부한 식이섬유와 칼륨 보충', '단맛이 강한 시리얼 및 시럽 커피'],
              ['점심', '병아리콩 볼 + 올리브오일', '식이섬유와 양질의 단백질', '정제 밀가루 샌드위치 및 감자칩'],
              ['저녁', '현미밥 + 연어구이 + 브로콜리', '오메가-3 지방산 및 풍부한 식이섬유', '매일 습관적으로 먹는 간편 냉동 피자'],
              ['간식', '사과 + 땅콩버터', '식이섬유와 양질의 지방 조합', '달고 짠 과자 및 초콜릿'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '반반', label: '주곡 중 통곡물(현미 등) 구성 비율 목표' },
              { value: '0', label: '음료를 통한 추가 당분 섭취 제로화' },
              { value: '7일', label: '식단에서 과일을 전면 배제하기 전 식단 분석기 사용 기간' },
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '우선 마시는 음료부터 차례차례 기록해 보세요. 음료 습관만 개선해도 첨가당 섭취를 가장 빠르게 줄일 수 있습니다. 다음 편: [탄수화물에 관한 오해와 의학적 고려 사항](/blog/carbohydrates-myths-special).',
        ],
      },
    ],
  },
  {
    slug: 'carbohydrates-myths-special',
    seriesId: 'carbohydrates',
    episode: 8,
    title: {
      en: 'Carb myths: low-fat hangover, keto headlines, and diabetes needs a clinician',
      ko: '탄수화물에 관한 오해: 저지방 식단의 함정, 대중적인 키토제닉 트렌드, 그리고 전문 진료의 중요성',
    },
    thesis: {
      en: 'Cutting every starch is not required for health. Replacing saturated fat with sugar was its own mistake; replacing soda with beans and oats is the modern fix. Diabetes and keto diets need medical context.',
      ko: '건강을 지키기 위해 식탁의 모든 녹말(전분)을 강박적으로 배제할 필요는 없습니다. 과거 포화지방을 줄이겠다며 그 자리를 인공 설탕으로 메웠던 것은 뼈아픈 실수였습니다. 탄산음료를 줄이고 콩류와 귀리로 식단을 업그레이드하는 것이 올바른 해법입니다. 당뇨 관리 및 치료용 키토 식단은 반드시 전문의와 상의해야 합니다.',
    },
    description: {
      en: 'Low-carb fear, fruit guilt, keto glance, and when labs matter.',
      ko: '저탄수화물 식단에 대한 막연한 두려움, 과일 섭취에 따르는 불필요한 죄책감, 키토제닉 식단의 진실, 그리고 혈액 검사가 필요한 순간들을 짚어봅니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-13',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-how-much', 'fats-myths-special', 'fats-saturated'],
    en: [
      {
        heading: 'Myth: all carbs spike insulin forever',
        paragraphs: [
          'Whole-food carbs with fiber do not behave like candy. Fear of fruit while drinking juice is backwards. Fear of rice while skipping vegetables on the side is incomplete.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Myth vs closer truth',
            headers: ['Myth', 'Closer truth'],
            rows: [
              ['Carbs make you fat alone', 'Calorie surplus + pattern'],
              ['Never eat rice', 'Upgrade mix and sides'],
              ['Keto for everyone', 'Medical tool, not default'],
              ['Fruit is candy', 'Fiber changes the deal'],
            ],
          },
        ],
      },
      {
        heading: 'Low-fat era lesson',
        paragraphs: [
          'When fat was demonized, food companies added sugar instead. Heart health improved when people swapped saturated fat for unsaturated fat, not when they swapped fat for sugary carbs ([saturated fat piece](/blog/fats-saturated)).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Diabetes and pregnancy',
            body: [
              'Carb targets with insulin, metformin, or gestational diabetes belong with your care team, not a generic blog table.',
            ],
          },
        ],
      },
      {
        heading: 'Close the series',
        paragraphs: [
          'Carbohydrates fuel your brain and training. Return to the [series hub](/blog/carbohydrates-guide), [everyday plate](/blog/carbohydrates-everyday-plate), and [encyclopedia](/nutrients/carbohydrates). Upgrade quality, cut liquid sugar, pair plates, and use clinicians when the story is metabolic disease.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Food-first carb loop',
            steps: [
              { label: 'Whole default', note: 'oats, beans, fruit' },
              { label: 'Cut soda', note: 'added sugar win' },
              { label: 'Pair meals', note: 'protein + fiber' },
              { label: 'Medical flags', note: 'diabetes, pregnancy' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '흔한 오해: 탄수화물은 무조건 인슐린 수치를 폭발시킨다?',
        paragraphs: [
          '식이섬유가 보존되어 있는 자연 그대로의 탄수화물 식품은 사탕처럼 몸속 혈당을 급격히 흔들지 않습니다. 시판 과일주스는 편하게 마시면서 생과일 먹기를 두려워하는 것은 이치에 맞지 않고, 정작 식단에 채소 반찬은 곁들이지 않으면서 밥공기의 탄수화물만 무작정 걱정하는 것은 올바른 영양 분석이라 할 수 없습니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '탄수화물의 진실 혹은 거짓',
            headers: ['흔한 오해(통념)', '과학적 진실'],
            rows: [
              ['탄수화물은 그 자체로 살을 찌운다', '만성적인 칼로리 잉여와 식습관의 전반적 불균형이 주원인입니다'],
              ['밥은 절대 먹어선 안 된다', '잡곡으로 업그레이드하고 양질의 반찬을 함께 곁들이면 괜찮습니다'],
              ['키토제닉 식단은 누구에게나 정답이다', '특정 건강 개선을 돕는 의학적 도구일 뿐, 모든 사람의 필수 기준은 아닙니다'],
              ['생과일은 설탕 덩어리와 같다', '생과일 속 풍부한 식이섬유가 체내 흡수 방식을 완전히 바꿉니다'],
            ],
          },
        ],
      },
      {
        heading: '과거 저지방 시대 교훈',
        paragraphs: [
          '과거에 지방이 비만과 성인병의 주범으로 내몰렸을 때, 식품 회사들은 지방 대신 설탕과 가당 물질을 대량으로 첨가하기 시작했습니다. 심혈관계 건강이 실제로 개선되었던 것은 포화지방을 올리브오일 같은 불포화지방으로 대체했을 때이지, 지방 대신 달콤한 탄수화물을 대안으로 삼았을 때가 아니었습니다(자세한 내용은 [포화지방 관련 글](/blog/fats-saturated)을 참고해 보세요).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '당뇨 및 임신 중인 경우',
            body: [
              '인슐린이나 메트포르민 등의 의약품을 복용하고 있거나, 임신성 당뇨를 진단받은 경우 적정 탄수화물 섭취 목표량은 블로그에 제시된 보편적 숫자가 아닌 담당 전문의 및 전문 영양사팀과 긴밀하게 논의하셔야 합니다.',
            ],
          },
        ],
      },
      {
        heading: '시리즈를 마치며',
        paragraphs: [
          '탄수화물은 뇌의 정상적인 활동과 활기찬 신체 활동을 위한 가장 기본적이고 훌륭한 연료입니다. [시리즈 허브](/blog/carbohydrates-guide), [우리 식탁 분석 가이드](/blog/carbohydrates-everyday-plate), 그리고 [탄수화물 백과](/nutrients/carbohydrates)를 다시 둘러보시며 건강한 원칙들을 복습해 보세요. 탄수화물 질 자체를 끌어올리고, 불필요한 액상 과당을 줄이며, 적절한 식품 조합으로 식사를 완성해 나가는 것. 그리고 대사 질환이 있을 때는 전문 치료진의 진단을 우선하는 것만 기억하시면 됩니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '자연식품 중심의 올바른 탄수화물 섭취 루프',
            steps: [
              { label: '통식품', note: '오트밀, 콩류, 신선한 생과일' },
              { label: '소다 끊기', note: '액상 과당 및 첨가당 전면 차단' },
              { label: '끼니 짝', note: '단백질 및 식이섬유와 적절히 조합하기' },
              { label: '진료', note: '당뇨, 임신 등 질환 상태 시 의료진 협진' },
            ],
          },
        ],
      },
    ],
  },
];
