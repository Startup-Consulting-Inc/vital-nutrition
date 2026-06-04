import type { BlogArticle } from './types';

export const carbohydrateArticles: BlogArticle[] = [
  {
    slug: 'carbohydrates-guide',
    seriesId: 'carbohydrates',
    episode: 1,
    title: {
      en: 'Carbohydrates: brain fuel, fiber, and why "cut all carbs" misses the point',
      ko: '탄수화물: 뇌 연료, 섬유, "탄수 전부 끊기"가 빗나가는 이유',
    },
    thesis: {
      en: 'Carbohydrates are your brain\'s preferred fuel and your muscles\' quick energy. The win is choosing whole grains, legumes, and fruit with fiber—not banning every starch because of one soda habit.',
      ko: '탄수화물은 뇌가 좋아하는 연료이고 근육의 빠른 에너지예요. 이기는 건 통곡·콩·섬유 있는 과일을 고르는 거지, 소다 한 잔 때문에 밥까지 끊는 게 아니에요.',
    },
    description: {
      en: 'A hub on what carbs do, simple vs complex, fiber, and the eight-part series map.',
      ko: '탄수화물 역할, 단순·복합, 섬유, 8편 지도를 허브로 정리했어요.',
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
        heading: '탄수화물이 뭐고, 뭐가 아닌지',
        paragraphs: [
          '탄수화물은 포도당으로 쪼개져요. 뇌와 적혈구가 쓰는 연료예요. 뇌만 해도 하루 약 120g 포도당을 씁니다. 몸무게 2%인데 에너지의 20%쯤을 씁니다.',
          '탄수화물=설탕만은 아니에요. 통곡·콩·과일은 전분+섬유+단백·비타민이 같이 와요. 초가공 스낵은 다른 카테고리예요.',
          '[탄수화물 백과](/nutrients/carbohydrates)에 기능·음식·제한이 있어요. 이 글들은 순서대로 풀어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억',
            body: [
              '모든 g를 자르기 전에 탄수화물 질부터 올리세요.',
            ],
          },
        ],
      },
      {
        heading: '단순, 복합, 섬유',
        paragraphs: [
          '단순(설탕, 주스, 사탕)은 혈당에 빨리 닿아요. 복합(귀리, 콩, 고구마)은 섬유가 있으면 천천히 풀려요. 섬유는 탄수화물인데 장내미생물이 좋아하고, 당처럼 바로 연료가 되진 않아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '식탁의 탄수화물 구분',
            headers: ['종류', '예', '실전'],
            rows: [
              ['복합+섬유', '귀리, 렌틸, 퀴노아', '많이'],
              ['과일 통째', '사과, 베리', '주스와 다름'],
              ['정제', '흰빵, 백미', '빈도 줄이기'],
              ['첨가당', '소다, 달콤 시리얼', '기본은 피하기'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '4kcal/g', label: '탄수화물 (지방 9)' },
              { value: '~120g', label: '뇌 포도당/일' },
              { value: '45–65%', label: 'AHA 칼로리 비중' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 지도',
        paragraphs: [
          '설탕·스크린은 도파민 습관과 연결돼요—[자극제](/blog/dopamine-stimulants)에서 다루고, 여기선 연료·섬유·라벨에 맞출게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[하루 탄수화물 얼마나](/blog/carbohydrates-how-much)'],
              ['3편', '[섬유·장 건강](/blog/carbohydrates-fiber)'],
              ['4편', '[첨가당·음료](/blog/carbohydrates-added-sugar)'],
              ['7편', '[한국 식탁](/blog/carbohydrates-everyday-plate)'],
              ['백과', '[탄수화물 음식](/nutrients/carbohydrates)'],
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
      ko: '하루 탄수화물: 칼로리 %, g, 뇌 필요량',
    },
    thesis: {
      en: 'Guidelines often land at 45–65% of calories from carbs on a balanced diet—about 225–325 g on 2,000 kcal. Athletes, pregnancy, and diabetes change the target; blogs do not replace your clinician.',
      ko: '균형 식단에선 탄수화물이 칼로리의 45–65%—2,000kcal면 대략 225–325g이에요. 운동·임신·당뇨는 달라지고, 블로그가 진료를 대신하진 않아요.',
    },
    description: {
      en: 'Daily carb ranges, brain glucose use, and when totals shift for activity or medical care.',
      ko: '하루 구간, 뇌 포도당, 활동·의료 시 조정.',
    },
    readMinutes: 8,
    datePublished: '2026-07-07',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-blood-sugar-pairs', 'carbohydrates-myths-special', 'protein-how-much'],
    en: [
      {
        heading: 'Percent vs grams',
        paragraphs: [
          'The American Heart Association cites 45–65% of calories from carbohydrates for many adults. On 2,000 kcal that is roughly 225–325 g. Endurance athletes may need more; strict ketogenic medical diets use far less under supervision.',
          'Your brain still needs glucose daily. Very low carb without adaptation can feel like fog for some people—not a moral failing, a fuel mismatch.',
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
          '300 g from lentils, oats, and fruit is not 300 g from soda and pastries. The gram total matters less than the bucket the grams came from—see [added sugar](/blog/carbohydrates-added-sugar) and [refined vs whole](/blog/carbohydrates-refined-vs-whole).',
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
        heading: '% vs g',
        paragraphs: [
          'AHA는 많은 성인에게 탄수화물 칼로리 45–65%를 말해요. 2,000kcal면 대략 225–325g. 지구력 운동은 더 필요할 수 있고, 의학적 저탄수는 감독 하에만요.',
          '뇌는 매일 포도당이 필요해요. 적응 없이 극단 저탄수면 멍함이 올 수 있어요. 의지 문제가 아니라 연료 불일치예요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '대략적인 하루 구간',
            headers: ['상황', '탄수 비중', 'g 예(2,000kcal)'],
            rows: [
              ['균형 식단', '45–65%', '225–325g'],
              ['활발한 운동', '중·상단 흔함', '개인별'],
              ['의학적 저탄수', '진료 설정', '글로 DIY X'],
              ['뇌', '음식 또는 적응', '뇌 ~120g 사용'],
            ],
          },
        ],
      },
      {
        heading: '숫자보다 질',
        paragraphs: [
          '렌틸·귀리·과일 300g과 소다·과자 300g은 같지 않아요. g보다 어느 바구니에서 왔는지가 먼저예요—[첨가당](/blog/carbohydrates-added-sugar), [정제 vs 통곡](/blog/carbohydrates-refined-vs-whole).',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '45–65%', label: 'AHA 탄수 칼로리' },
              { value: '225–325g', label: '2,000kcal 기준' },
              { value: '<10%', label: 'WHO 첨가당 상한' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '밥을 통째로 자르기 전 [분석기](/analyzer)에 일주일 기록해 보세요. 다음: [섬유](/blog/carbohydrates-fiber).',
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
      ko: '식이섬유: 장을 먹이고 혈당 스파이크를 늦추는 탄수화물',
    },
    thesis: {
      en: 'Fiber is a carb you do not fully digest, yet it steadies glucose, feeds gut bacteria, and shows up in the best carb foods—beans, lentils, oats, and whole fruit.',
      ko: '섬유는 완전히 소화되진 않지만 혈당을 안정시키고 장내미생물을 먹이고, 콩·렌틸·귀리·과일 통째에 있어요.',
    },
    description: {
      en: 'Soluble vs insoluble fiber, legume targets, and why juice strips the benefit.',
      ko: '수용성·불용성, 콩류 목표, 주스가 섬유를 빼는 이유.',
    },
    readMinutes: 8,
    datePublished: '2026-07-08',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-refined-vs-whole', 'carbohydrates-everyday-plate', 'minerals-iron'],
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
          'Half your grains whole, beans several times weekly, vegetables at lunch and dinner. Most adults aim for roughly 25–38 g fiber per day depending on age and sex (general guidelines)—from food first.',
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
          'Swap white rice for brown half the week; add lentils to soup. Next: [added sugar](/blog/carbohydrates-added-sugar).',
        ],
      },
    ],
    ko: [
      {
        heading: '섬유가 중요한 이유',
        paragraphs: [
          '렌틸 1컵에 섬유 약 16g, 검은콩 반 컵에 7–8g—백과 표 기준이에요. 섬유가 혈당 급상승을 완화하고 배변 리듬을 돕아요.',
          '주스는 섬유를 빼고 당만 빨리 들어와요. 사과 통째가 사과 주스보다 나은 이유예요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '섬유 많은 탄수 앵커',
            headers: ['음식', '섬유', '보너스'],
            rows: [
              ['렌틸 1컵', '~16g', '단백·철'],
              ['병아리콩 ½컵', '~6g', '후무스'],
              ['귀리 1컵', '~4g', 'LDL에 도움'],
              ['사과 1개', '~4g', '폴리페놀'],
            ],
          },
        ],
      },
      {
        heading: '보충제 없이 쌓기',
        paragraphs: [
          '곡물 절반은 통곡, 콩은 주 몇 번, 점심·저녁에 채소. 성인 섬유는 대략 하루 25–38g(나이·성별, 일반 가이드)—음식에서 먼저요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '천천히 늘리기',
            body: [
              '섬유가 거의 없다가 콩을 한꺼번에 많이 먹으면 더부룩할 수 있어요. 섬유 늘리면 물도 같이.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '백미를 주 3회 현미로 바꾸고, 국에 렌틸을 넣어 보세요. 다음: [첨가당](/blog/carbohydrates-added-sugar).',
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
      ko: '첨가당: 소다, 달콤 커피, 칼로리 10% 선',
    },
    thesis: {
      en: 'Added sugar is the carb category with the weakest health case. WHO suggests under 10% of calories—about 50 g on 2,000 kcal—with 5% as a better target. Liquid sugar is the fastest path in.',
      ko: '첨가당은 건강 근거가 가장 약한 탄수화물이에요. WHO는 칼로리 10% 미만—2,000kcal면 약 50g—5%가 더 낫다고 해요. 액체 당이 가장 빨리 들어와요.',
    },
    description: {
      en: 'Sweet drinks, label reading for added sugars, and why fruit sugar is a different conversation.',
      ko: '달콤 음료, 첨가당 라벨, 과일 당과의 차이.',
    },
    readMinutes: 8,
    datePublished: '2026-07-09',
    relatedSlugs: ['carbohydrates-guide', 'carbohydrates-refined-vs-whole', 'dopamine-stimulants', 'carbohydrates-everyday-plate'],
    en: [
      {
        heading: 'Added vs natural',
        paragraphs: [
          'Lactose in plain milk and fructose in whole fruit come packaged with protein, fat, or fiber. Added sugars in soda, sweetened tea, candy, and many cereals are concentrated calories without fullness.',
          'The encyclopedia "Avoid" bucket leads with sugar-sweetened beverages and pastries for a reason—they drive metabolic risk more reliably than plain rice ever did.',
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
              'Sweet + fat + salt ultra-processed foods hit reward hard—see [dopamine stimulants](/blog/dopamine-stimulants) if cravings drive the pattern.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Drop one sweet drink for a week and notice focus and sleep. Next: [refined vs whole](/blog/carbohydrates-refined-vs-whole).',
        ],
      },
    ],
    ko: [
      {
        heading: '첨가 vs 자연',
        paragraphs: [
          '우유의 유당, 과일의 과당은 단백·지방·섬유와 같이 와요. 소다·달콤 음료·사탕·많은 시리얼의 첨가당은 포만 없이 칼로리만 촘촘해요.',
          '백과 "피하기"에 당음료·과자가 맨 앞인 이유가 있어요. 밥보다 대사 위험을 더 잘 올려요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '첨가당 함정 (한국)',
            headers: ['출처', '왜 쌓이나', '바꾸기'],
            rows: [
              ['탄산·에너지음료', '당 30–40g+', '물·무가당 차'],
              ['카페 시럽 음료', '양이 안 보임', '우유+시나몬'],
              ['시리얼', '첨가당 줄 확인', '귀리+베리'],
              ['플레이버 요거트', '과일 맛=당', '플레인+냉동베리'],
            ],
          },
        ],
      },
      {
        heading: '라벨: 첨가당 줄',
        paragraphs: [
          '라벨에 "첨가당" g·%DV가 있어요. 바 하나에 15g이면 10% 예산의 절반이 한 번에 가요. [분석기](/analyzer)가 일주일 합이 빠릅니다.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<10%', label: 'WHO 첨가당 칼로리' },
              { value: '~50g', label: '2,000kcal의 10%' },
              { value: '0g', label: '소다 기본값 목표' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: '도파민 루프 겹침',
            body: [
              '단+지방+소금 초가공은 보상을 세게 잡아요—욕구가 패턴이면 [도파민 자극제](/blog/dopamine-stimulants).',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '달콤 음료 하나만 일주일 빼 보고 집중·잠을 봐요. 다음: [정제 vs 통곡](/blog/carbohydrates-refined-vs-whole).',
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
      ko: '정제 vs 통곡: 백미·흰빵과 더 완만한 곡선',
    },
    thesis: {
      en: 'Refining strips bran and germ—fiber, B vitamins, and slower digestion go with them. You do not need zero white rice; you need whole grains and beans often enough to matter.',
      ko: '정제는 겨와 배아를 빼요—섬유·B군·느린 소화가 같이 사라져요. 백미를 0으로 할 필요는 없고, 통곡·콩을 자주 먹으면 돼요.',
    },
    description: {
      en: 'White vs brown rice, bread, pasta upgrades, and glycemic impact without fad language.',
      ko: '백미·현미, 빵·면 업그레이드, 혈당당 지수 과장 없이.',
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
        heading: 'Glycemic talk, downsized',
        paragraphs: [
          'Glycemic index tables are noisy—ripeness, cooking time, and what else is on the plate change results. Practical rule: whole food + fiber + protein beats memorizing numbers.',
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
        heading: '정제가 빼는 것',
        paragraphs: [
          '흰 밀가루·백미는 전분 위주예요. 겉층의 영양·섬유가 없어져요. 혈당이 빨리 오르고 배고픔이 빨리 돌아와요.',
          '통밀, 현미, 퀴노아, 귀리는 같은 탄수화물도 곡선이 완만하고 미량영양이 붙어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '스왑 사다리',
            headers: ['자주', '업그레이드', '가끔 OK'],
            rows: [
              ['매일 백미', '현미 반반·퀴노아', '외식 백미'],
              ['흰빵', '통곡물 1조각', '슬라이스 섬유 2g+'],
              ['일반 면', '통밀·콩면', '양+샐러드'],
              ['프렌철', '견과·후무스+채소', '모임 한 번'],
            ],
          },
        ],
      },
      {
        heading: '혈당지수, 크기 줄이기',
        paragraphs: [
          '혈당지수 표는 잘 익은 바나나, 끓인 시간, 같은 끼니의 단백·채소에 따라 달라져요. 실전 규칙: 통식품+섬유+단백질이 숫자 암기보다 낫습니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '식탁 맥락이 이김',
            body: [
              '밥+콩+나물은 밥만 먹는 것과 달라요. g는 같아도 경험이 다릅니다.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '곡물 절반 이상 통곡(미국 가이드 스타일)을 목표로. 다음: [혈당 짝](/blog/carbohydrates-blood-sugar-pairs).',
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
      ko: '혈당 안정: 탄수화물에 단백·지방·섬유 짝짓기',
    },
    thesis: {
      en: 'The same carbs land softer with eggs, yogurt, beans, or olive oil on the same plate. That is why "cereal alone" crashes and "cereal plus nuts" does not.',
      ko: '같은 탄수화물도 달걀·요거트·콩·올리브오일이 있으면 완만해요. 시리얼만이면 추락하고, 시리얼+견과면 다른 이유예요.',
    },
    description: {
      en: 'Meal pairing, exercise fuel, and links to protein and dopamine without repeating those series.',
      ko: '끼니 짝, 운동 연료, 단백·도파민 링크.',
    },
    readMinutes: 7,
    datePublished: '2026-07-11',
    relatedSlugs: ['carbohydrates-guide', 'protein-guide', 'fats-guide', 'dopamine-stimulants'],
    en: [
      {
        heading: 'Pairing rules that actually stick',
        paragraphs: [
          'Toast with peanut butter beats jam-only toast. Rice with lentils and vegetables beats rice alone. The encyclopedia tip—pair carbs with protein or fat—is the whole game for many meals.',
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
              'Diabetes medications, pregnancy, and hypoglycemia need clinician meal plans—not influencer clocks.',
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
        heading: '실전에서 먹히는 짝',
        paragraphs: [
          '땅콩버터 토스트가 잼만 토스트보다 낫고, 밥+콩+나물이 밥만보다 낫습니다. 백과 팁—탄수에 단백·지방—이 많은 끼니의 전부에 가깝습니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '안정 끼니 조립',
            steps: [
              { label: '탄수', note: '귀리, 밥, 감자' },
              { label: '단백', note: '달걀, 생선, 두부' },
              { label: '지방·섬유', note: '견과, 기름, 채소' },
              { label: '액체당 X', note: '소다 제외' },
            ],
          },
        ],
      },
      {
        heading: '운동·타이밍',
        paragraphs: [
          '격한 운동에 근육은 포도당을 씁니다. 선수는 전후 탄수가 필요할 수 있고, 책상 일은 젤보다 끼니 안정이 먼저예요. "저녁 6시 이후 탄수 금지"는 만능 규칙이 아니에요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '질병은 다름',
            body: [
              '당뇨 약, 임신, 저혈당은 인플루언서 시계가 아니라 진료 식단이에요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '일주일 돌아보며 탄수만 있는 끼니를 찾고, 단백·섬유·지방 중 하나를 더하세요. 다음: [일상 식탁](/blog/carbohydrates-everyday-plate).',
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
      ko: '한국 식탁: 밥·잡곡·감자, 떡·라면·음료 당은 어디서 오나',
    },
    thesis: {
      en: 'A solid US day centers carbs on oats, beans, and whole fruit while treating soda, pastries, and white-bread-only lunches as the real problem—not bananas.',
      ko: '좋은 한국 식탁은 밥·잡곡·감자·콩 반찬을 중심으로 하고, 라면·떡·음료 당을 패턴으로 보는 거예요. 바나나를 적이로 삼지 않아요.',
    },
    description: {
      en: 'US meal slots for quality carbs vs sugar traps.',
      ko: '한국 끼니별 탄수 질 vs 당 함정.',
    },
    readMinutes: 9,
    datePublished: '2026-07-12',
    relatedSlugs: ['carbohydrates-fiber', 'carbohydrates-added-sugar', 'carbohydrates-blood-sugar-pairs', 'carbohydrates-guide'],
    en: [
      {
        heading: 'US patterns that skew sugary',
        paragraphs: [
          'Breakfast cereal with 15 g added sugar, lunch chips and a soda, dinner pasta without vegetables—that is 200+ g carb with low fiber. Fixing one drink or swapping oats for cereal shifts the whole day.',
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
          'Log beverages first—they are the fastest added-sugar win. Next: [myths & special cases](/blog/carbohydrates-myths-special).',
        ],
      },
    ],
    ko: [
      {
        heading: '한국 식탁에서 당이 기울는 패턴',
        paragraphs: [
          '아침 빵·커피 시럽, 점심 김밥·라면, 저녁 밥만 많고 나물 적음—섬유 낮고 첨가당 높은 하루가 되기 쉬워요. 음료 하나만 바꿔도 하루가 달라져요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '탄수 앵커 세 개',
            steps: [
              { label: '아침', note: '귀리·고구마·두유' },
              { label: '점심', note: '밥+콩·두부 반찬' },
              { label: '저녁', note: '현미밥+생선+나물' },
            ],
          },
        ],
      },
      {
        heading: '한국 일상 탄수 지도',
        paragraphs: [
          '[탄수화물 백과](/nutrients/carbohydrates)와 맞춰 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '끼니별 (한국)',
            headers: ['끼니', '식재', '질', '줄일 것'],
            rows: [
              ['아침', '귀리·고구마', '섬유', '달콤 빵·시리얼'],
              ['점심', '밥+된장·나물', '섬유+단백', '떡볶이·김밥만'],
              ['저녁', '잡곡밥+생선', '오메가3+섬유', '튀김 반찬만'],
              ['간식', '사과·땅콩', '섬유+지방', '음료·떡'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '반반', label: '백미·현미 섞기 목표' },
              { value: '0', label: '음료 당 기본' },
              { value: '7일', label: '과일 금지 전 분석기' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '음료부터 기록하세요—첨가당 줄이기가 가장 빠릅니다. 다음: [신화·특수](/blog/carbohydrates-myths-special).',
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
      ko: '탄수 신화: 저지방 열풍, 키토 헤드라인, 당뇨는 진료',
    },
    thesis: {
      en: 'Cutting every starch is not required for health. Replacing saturated fat with sugar was its own mistake; replacing soda with beans and oats is the modern fix. Diabetes and keto diets need medical context.',
      ko: '모든 전분을 자를 필요는 없어요. 포화지방을 설탕으로 바꾼 것도 실수였고, 소다를 콩·귀리로 바꾸는 게 지금의 수정이에요. 당뇨·키토는 진료 맥락이 필요해요.',
    },
    description: {
      en: 'Low-carb fear, fruit guilt, keto glance, and when labs matter.',
      ko: '저탄수 공포, 과일 죄책감, 키토, 검사.',
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
          'When fat was demonized, food companies added sugar. Heart health improved when people swapped saturated fat for unsaturated fat—not when they swapped fat for sugary carbs ([saturated fat piece](/blog/fats-saturated)).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Diabetes and pregnancy',
            body: [
              'Carb targets with insulin, metformin, or gestational diabetes belong with your care team—not a generic blog table.',
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
        heading: '신화: 탄수=영원한 인슐린 폭탄',
        paragraphs: [
          '섬유 있는 통식품 탄수는 사탕과 다르게 행동해요. 주스 마시면서 과일을 무서워하는 건 거꾸로예요. 나물 없이 밥만 걱정하는 것도 반쪽이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '신화 vs 가까운 진실',
            headers: ['신화', '가까운 진실'],
            rows: [
              ['탄수만 살찜', '칼로리 잉여+패턴'],
              ['밥 절대 금지', '곡물·반찬 업그레이드'],
              ['키토 만능', '의학 도구, 기본 아님'],
              ['과일=사탕', '섬유가 다름'],
            ],
          },
        ],
      },
      {
        heading: '저지방 시대 교훈',
        paragraphs: [
          '지방을 악마화하던 때 회사는 설탕을 넣었어요. 심장 이득은 포화→불포화 교체에서 왔지, 지방→단 음식 교체에서 균일하게 오진 않았어요—[포화지방](/blog/fats-saturated).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '당뇨·임신',
            body: [
              '인슐린·메트포르민·임신성 당뇨 탄수 목표는 진료팀과—블로그 표가 아니에요.',
            ],
          },
        ],
      },
      {
        heading: '시리즈 마무리',
        paragraphs: [
          '탄수화물은 뇌와 운동을 먹여요. [허브](/blog/carbohydrates-guide), [한국 식탁](/blog/carbohydrates-everyday-plate), [백과](/nutrients/carbohydrates)로 돌아가세요. 질 올리고, 액체 당 자르고, 끼니 짝짓고, 대사 질환 이야기면 진료로.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '음식 우선 탄수 루프',
            steps: [
              { label: '통식품', note: '귀리·콩·과일' },
              { label: '소다 끊기', note: '첨가당' },
              { label: '끼니 짝', note: '단백·섬유' },
              { label: '진료', note: '당뇨·임신' },
            ],
          },
        ],
      },
    ],
  },
];
