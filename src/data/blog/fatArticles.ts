import type { BlogArticle } from './types';

export const fatArticles: BlogArticle[] = [
  {
    slug: 'fats-guide',
    seriesId: 'fats',
    episode: 1,
    title: {
      en: 'Dietary fats: why the type matters more than a single "fat gram" number',
      ko: '식이 지방: "지방 몇 g"보다 종류가 먼저인 이유',
    },
    thesis: {
      en: 'Fat is the most calorie-dense macronutrient at 9 kcal per gram, but health hinges on unsaturated vs saturated vs trans—not on fearing every lipid on a label.',
      ko: '지방은 1g당 9kcal로 가장 촘촘한 에너지지만, 건강은 총량 공포보다 불포화·포화·트랜스 구분이 먼저예요.',
    },
    description: {
      en: 'A hub on what fats do, the three fat families, and where the eight-part series goes next.',
      ko: '지방 역할, 세 가지 지방군, 8편 시리즈 지도를 허브로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-28',
    relatedSlugs: ['fats-omega-3', 'fats-saturated', 'fats-trans-labels', 'fats-everyday-plate'],
    en: [
      {
        heading: 'What fats do in the body',
        paragraphs: [
          'Fats store energy, cushion organs, build cell membranes, and help you absorb the fat-soluble vitamins A, D, E, and K. Your brain is largely lipid; hormones like estrogen and testosterone are built from cholesterol backbones.',
          'Cutting fat to zero breaks vitamin absorption and can make meals unsatisfying in a way that pushes people toward sugar instead. The goal is quality and balance, not elimination.',
          'The [fats encyclopedia](/nutrients/fats) breaks down unsaturated, saturated, and trans fats with food lists. This series walks them in order.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'One line to keep',
            body: [
              'Swap harmful fat types and add omega-3-rich foods before obsessing over a single daily fat gram target.',
            ],
          },
        ],
      },
      {
        heading: 'Three families on your plate',
        paragraphs: [
          'Unsaturated fats (olive oil, nuts, fish) are the default to emphasize. Saturated fats (butter, fatty meat, coconut oil) are fine in modest amounts but raise LDL when they dominate. Industrial trans fats are the outlier—harmful at almost any dose.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Fat types at a glance',
            headers: ['Type', 'Label', 'Examples', 'Goal'],
            rows: [
              ['Unsaturated', 'Eat most', 'Olive oil, avocado, salmon, walnuts', 'Majority of fat calories'],
              ['Saturated', 'Limit', 'Butter, cheese, palm oil, bacon', 'Under 6–10% of calories'],
              ['Trans (industrial)', 'Avoid', 'PHO, some fried/baked goods', 'As close to zero as possible'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '9 kcal/g', label: 'fat energy density' },
              { value: '20–35%', label: 'AHA fat calorie band' },
              { value: '3 types', label: 'unsaturated, saturated, trans' },
            ],
          },
        ],
      },
      {
        heading: 'Series map',
        paragraphs: [
          'Brain chemistry also uses fats indirectly—see the [dopamine series](/blog/dopamine-guide) for mood food hype. Here we stay on cardiovascular and everyday eating.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[Omega-3: ALA, EPA, DHA](/blog/fats-omega-3)'],
              ['Part 3', '[Saturated fat limits](/blog/fats-saturated)'],
              ['Part 4', '[Trans fat & labels](/blog/fats-trans-labels)'],
              ['Part 7', '[US everyday plate](/blog/fats-everyday-plate)'],
              ['Encyclopedia', '[Full fat reference](/nutrients/fats)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '몸에서 지방이 하는 일',
        paragraphs: [
          '지방은 에너지를 저장하고 장기를 보호해요. 세포막을 만들고 지용성 비타민 A·D·E·K 흡수도 도와요. 뇌에도 지질이 많고, 에스트로겐·테스토스테론 같은 호르몬도 콜레스테롤 골격에서 만들어져요.',
          '지방을 제로로 잡으면 비타민 흡수가 깨지고, 배고픔이 설탕 쪽으로 밀릴 수 있어요. 목표는 없애기가 아니라 질과 균형이에요.',
          '[지방 백과](/nutrients/fats)에 불포화·포화·트랜스 음식표가 있어요. 이 시리즈는 순서대로 풀어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억',
            body: [
              '하루 지방 g 숫자에 집착하기 전에, 해로운 지방 종류부터 바꾸고 오메가3 식품을 더하세요.',
            ],
          },
        ],
      },
      {
        heading: '식탁의 세 가족',
        paragraphs: [
          '불포화(올리브오일, 견과, 생선)를 기본으로 하세요. 포화(버터, 기름진 고기, 코코넛)는 적당히 먹으면 괜찮은데, 많아지면 LDL이 올라가요. 공업 트랜스는 양에 상관없이 해로워서 예외예요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '지방 종류 한눈에',
            headers: ['종류', '라벨', '예', '목표'],
            rows: [
              ['불포화', '많이', '올리브유, 아보카도, 연어, 호두', '지방 칼로리 대부분'],
              ['포화', '제한', '버터, 치즈, 팜유, 베이컨', '칼로리 6–10% 이하'],
              ['트랜스(공업)', '피하기', '부분수소, 일부 튀김·과자', '가능한 0에 가깝게'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '9kcal/g', label: '지방 에너지 밀도' },
              { value: '20–35%', label: '미국심장협회(AHA) 권장 지방 칼로리 비율' },
              { value: '3종', label: '불포화·포화·트랜스' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 지도',
        paragraphs: [
          '뇌 화학도 지방과 간접적으로 얽혀 있는데, 기분에 좋다는 음식 과장은 [도파민 시리즈](/blog/dopamine-guide)에서 다뤄요. 여기선 심혈관과 일상 식단에 집중할게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[오메가3: ALA, EPA, DHA](/blog/fats-omega-3)'],
              ['3편', '[포화지방 한도](/blog/fats-saturated)'],
              ['4편', '[트랜스·라벨](/blog/fats-trans-labels)'],
              ['7편', '[한국 식탁](/blog/fats-everyday-plate)'],
              ['백과', '[지방 전체](/nutrients/fats)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'fats-omega-3',
    seriesId: 'fats',
    episode: 2,
    title: {
      en: 'Omega-3 fats: ALA from plants, EPA and DHA from fish',
      ko: '오메가3: 식물 ALA, 생선 EPA·DHA',
    },
    thesis: {
      en: 'Omega-3s are essential polyunsaturated fats. Flax and walnuts supply ALA; fatty fish supply the EPA and DHA your heart and brain use most directly—about two fish meals a week is the practical target.',
      ko: '오메가3는 필수 불포화지방이에요. 아마·호두는 ALA, 등푸른생선은 EPA·DHA를 줘요. 주 2회 생선이 현실적인 목표예요.',
    },
    description: {
      en: 'ALA vs EPA/DHA, fish servings, plant sources, and how much matters for most adults.',
      ko: 'ALA·EPA/DHA 차이, 생선·식물 공급, 대략적인 양.',
    },
    readMinutes: 8,
    datePublished: '2026-06-29',
    relatedSlugs: ['fats-guide', 'fats-everyday-plate', 'protein-animal-vs-plant', 'fats-cooking-oils'],
    en: [
      {
        heading: 'Three names, one family',
        paragraphs: [
          'ALA (alpha-linolenic acid) comes from flax, chia, walnuts, and canola. Your body converts only a small share to EPA and DHA. EPA and DHA from salmon, sardines, and mackerel skip that bottleneck.',
          'Dietary guidelines often cite about 250 mg combined EPA + DHA per day for cardiovascular benefit—roughly two 3 oz fatty fish servings weekly. Protein series covers fish for muscle; here the focus is the oil inside the fillet.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Omega-3 sources',
            headers: ['Source', 'Type', 'Serving', 'Note'],
            rows: [
              ['Salmon (3 oz)', 'EPA + DHA', '~4 g omega-3', 'Heart + protein'],
              ['Sardines (canned)', 'EPA + DHA', '~1.5 g', 'Calcium in bones'],
              ['Walnuts (¼ cup)', 'ALA', '~2.5 g ALA', 'Daily sprinkle'],
              ['Ground flax (2 tbsp)', 'ALA', '~3.8 g ALA', 'Grind for absorption'],
            ],
          },
        ],
      },
      {
        heading: 'Fish oil pills vs food',
        paragraphs: [
          'Supplements can help if you never eat fish, but food brings protein, vitamin D, and selenium with the oil. If you are on blood thinners, high-dose fish oil needs medical oversight.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '2×/wk', label: 'fatty fish meals (AHA-style)' },
              { value: '250 mg', label: 'EPA+DHA daily target (guidelines)' },
              { value: 'ALA', label: 'plant backup, weak conversion' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Rotate salmon, sardines, or trout; add walnuts or ground flax to breakfast. Next: [saturated fat](/blog/fats-saturated) and [everyday plate](/blog/fats-everyday-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '이름 셋, 한 가족',
        paragraphs: [
          'ALA는 아마, 치아, 호두, 카놀라유에서 와요. 그런데 몸이 ALA를 EPA·DHA로 바꾸는 비율은 작아요. 고등어·꽁치·연어에 든 EPA·DHA는 이 병목을 건너뛰고요.',
          '가이드라인은 심혈관 이득을 위해 EPA+DHA를 합쳐 하루 약 250mg, 주 2회 85g짜리 등푸른생선쯤을 자주 권해요. 단백질 시리즈가 생선을 살코기 관점에서 봤다면, 여기선 살 속 기름이 주인공이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '오메가3 공급',
            headers: ['출처', '종류', '분량', '메모'],
            rows: [
              ['연어 85g', 'EPA+DHA', '오메가3 ~4g', '심장+단백'],
              ['통조림 정어리', 'EPA+DHA', '~1.5g', '뼈 칼슘'],
              ['호두 ¼컵', 'ALA', 'ALA ~2.5g', '매일 조금'],
              ['간 아마 2숟가락', 'ALA', 'ALA ~3.8g', '갈아야 흡수'],
            ],
          },
        ],
      },
      {
        heading: '피쉬오일 vs 음식',
        paragraphs: [
          '생선을 전혀 안 먹는다면 보충제도 대안이 돼요. 하지만 음식으로 먹으면 단백질·비타민 D·셀레늄이 기름과 함께 따라와요. 항응고제를 쓰고 있다면 고용량 피쉬오일은 꼭 진료와 맞춰야 해요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '주 2회', label: '등푸른생선' },
              { value: '250mg', label: 'EPA+DHA 하루 목표' },
              { value: 'ALA', label: '식물 보조, 전환 약함' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '고등어·꽁치·연어를 돌리고, 아침에 호두·간 아마를 더하세요. 다음: [포화지방](/blog/fats-saturated), [일상 식탁](/blog/fats-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'fats-saturated',
    seriesId: 'fats',
    episode: 3,
    title: {
      en: 'Saturated fat: when butter and bacon count, and what to swap',
      ko: '포화지방: 버터·삼겹이 쌓일 때, 무엇으로 바꿀지',
    },
    thesis: {
      en: 'Saturated fat is not poison in a slice of cheese, but diets dominated by it raise LDL cholesterol. Replacing it with unsaturated fat—not with refined carbs—is the win.',
      ko: '포화지방이 치즈 한 조각만으로 독은 아니에요. 식단이 이쪽으로 쏠리면 LDL이 올라가요. 정제 탄수로 바꾸기보다 불포화로 바꾸는 게 이득이에요.',
    },
    description: {
      en: 'AHA 6–10% calorie limits, top saturated sources, and practical swaps.',
      ko: '미국심장협회(AHA)의 6~10% 포화지방 제한 권장량, 주요 포화지방 급원 식품, 그리고 실천할 수 있는 식단 대체법.',
    },
    readMinutes: 8,
    datePublished: '2026-06-30',
    relatedSlugs: ['fats-guide', 'fats-cooking-oils', 'fats-everyday-plate', 'minerals-sodium-potassium'],
    en: [
      {
        heading: 'What saturated fat is',
        paragraphs: [
          'Saturated fats have no double bonds, so they are solid at room temperature—butter, coconut oil, fat on steak, cream. They are fine as flavor, risky as the main fat source every meal.',
          'The American Heart Association suggests under 6% of calories from saturated fat if you have elevated LDL or heart risk (~13 g on 2,000 kcal), or under 10% for general adults (~22 g).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Common saturated sources',
            headers: ['Food', 'Why it adds up', 'Swap idea'],
            rows: [
              ['Butter on toast daily', '7 g sat fat per tbsp', 'Olive oil on veg'],
              ['Bacon + sausage breakfast', 'Processed + sat fat', 'Eggs + avocado'],
              ['Cheese-heavy pizza', 'Sat fat + sodium', 'Half cheese, veg topping'],
              ['Coconut oil hype', 'Still saturated', 'Olive for daily cooking'],
            ],
          },
        ],
      },
      {
        heading: 'Red meat and dairy in context',
        paragraphs: [
          'Lean poultry and fish deliver protein with less saturated fat than ribeye daily. Dairy gives calcium but stacks saturated fat when cheese is the main garnish.',
          'Processed meats add sodium too—see [sodium & potassium](/blog/minerals-sodium-potassium) for deli and fast-food context.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Replace, do not just delete',
            body: [
              'A bagel instead of bacon lowers sat fat but may spike blood sugar. Salmon + salad hits protein and unsaturated fat together.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cook with olive or canola, treat butter as accent, trim visible fat on meat. Next: [trans fat labels](/blog/fats-trans-labels).',
        ],
      },
    ],
    ko: [
      {
        heading: '포화지방이란',
        paragraphs: [
          '이중결합이 없어 실온에서 굳어요—버터, 코코넛오일, 삼겹, 크림. 양념은 괜찮고, 매 끼니 주인공이면 LDL이 올라가기 쉬워요.',
          '미국심장협회(AHA)는 나쁜 LDL 콜레스테롤 수치 및 심혈관 질환 위험이 있는 경우 포화지방을 총 칼로리의 6% 이하(하루 2,000kcal 섭취 시 약 13g 이하), 일반 성인은 10% 이하(약 22g 이하)로 제한할 것을 권장합니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '흔한 포화 공급',
            headers: ['음식', '왜 쌓이나', '바꾸기'],
            rows: [
              ['매일 버터 토스트', '1숟가락 포화 ~7g', '채소에 올리브'],
              ['아침 베이컨·소시지', '가공+포화', '달걀+아보카도'],
              ['치즈 듬뿍 피자', '포화+나트륨', '치즈 절반·채소'],
              ['코코넛 오일 신화', '여전히 포화', '일상 조리는 올리브'],
            ],
          },
        ],
      },
      {
        heading: '붉은 고기와 유제품은 어떻게 볼까',
        paragraphs: [
          '닭고기·생선은 매일 꽃등심을 먹는 것보다 포화가 적으면서 단백질을 줘요. 유제품은 칼슘을 주지만, 치즈를 주로 곁들이는 식이면 포화가 쌓여요.',
          '가공육은 나트륨도 많아요. 델리 햄이나 패스트푸드 얘기는 [나트륨·칼륨](/blog/minerals-sodium-potassium)에서 더 봐요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '없애기만 말고 바꾸기',
            body: [
              '베이컨 대신 빵만 먹으면 포화는 줄지만 혈당이 튈 수 있어요. 생선+샐러드가 단백·불포화를 같이 줘요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '올리브유·카놀라유로 조리하고, 버터는 포인트로만 쓰고, 고기에 보이는 기름은 떼어내세요. 다음: [트랜스 라벨](/blog/fats-trans-labels).',
        ],
      },
    ],
  },
  {
    slug: 'fats-trans-labels',
    seriesId: 'fats',
    episode: 4,
    title: {
      en: 'Trans fat and labels: "0 g" on the front, hydrogenated oil in the fine print',
      ko: '트랜스지방·라벨: 앞면 0g, 속은 부분수소',
    },
    thesis: {
      en: 'Industrial trans fats raise LDL and lower HDL—a double hit. The FDA banned partially hydrogenated oils in most US foods in 2018, but fried and imported snacks still deserve a label check.',
      ko: '공업 트랜스는 LDL을 올리고 HDL을 낮춰요. 미국은 2018년 부분수소를 대부분 금지했지만, 튀김·수입 과자는 라벨 확인이 필요해요.',
    },
    description: {
      en: 'PHO, serving-size loopholes, fried food, and using the Analyzer on packaged snacks.',
      ko: '부분수소, 0g 함정, 튀김, 분석기.',
    },
    readMinutes: 8,
    datePublished: '2026-07-01',
    relatedSlugs: ['fats-guide', 'fats-everyday-plate', 'fats-myths-special', 'fats-saturated'],
    en: [
      {
        heading: 'Why trans fat is different',
        paragraphs: [
          'No other fat type simultaneously raises "bad" LDL and lowers "good" HDL. WHO targets eliminating industrial trans fat globally because of heart disease burden.',
          'Dairy and beef carry trace natural trans fat, but the real problem is industrial partial hydrogenation.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Ingredient list beats front label',
            body: [
              'US labels may say "0 g trans fat" if a serving has under 0.5 g—multiple servings erase the claim.',
            ],
          },
        ],
      },
      {
        heading: 'Where trans still hides (US)',
        paragraphs: [
          'Some fried restaurant foods, microwave popcorn brands, refrigerated dough, stick margarine, and imported cookies. Scan for "partially hydrogenated oil" even when the nutrition panel shows zero.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Label reading checklist',
            headers: ['Check', 'Red flag', 'Better default'],
            rows: [
              ['Ingredients', 'partially hydrogenated oil', 'Olive, canola, avocado oil'],
              ['Serving size', 'tiny serving, many per package', 'Whole snack vs mindless bag'],
              ['Fried items', 'reused fryer oil', 'Bake, grill, air-fry'],
              ['Analyzer', 'weekly packaged pattern', 'Swap one repeat offender'],
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Treat ultra-processed pastries and drive-through fries as occasional, not daily fat sources. Log a week in the [Analyzer](/analyzer). Next: [cooking oils](/blog/fats-cooking-oils).',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<2 g', label: 'trans fat daily ceiling (AHA)' },
              { value: '2018', label: 'US PHO ban (most foods)' },
              { value: '0.5 g', label: 'per serving "0 g" loophole' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '트랜스가 다른 이유',
        paragraphs: [
          '다른 지방은 \'나쁜\' LDL을 올리면서 \'좋은\' HDL까지 동시에 떨어뜨리진 않아요. 세계보건기구(WHO)도 심혈관 질환 부담 때문에 공업 트랜스를 전 세계에서 없애자고 해요.',
          '유제품·쇠고기에도 자연 트랜스가 아주 소량 들어 있긴 해요. 그래도 진짜 문제는 부분수소 공정으로 만든 공업용 트랜스예요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '앞면보다 원재료',
            body: [
              '1회 제공량당 트랜스가 0.5g 미만이면 "0g"으로 표시할 수 있어요. 한 봉지를 다 먹으면 이 표시는 의미가 없어지고요.',
            ],
          },
        ],
      },
      {
        heading: '한국·미국에서 여전히 조심할 곳',
        paragraphs: [
          '마트 과자·라면 스프·일부 튀김·수입 스낵. "부분수소유"·"쇼트닝"을 찾으세요. 앞면 0g만 믿지 마세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '라벨 체크리스트',
            headers: ['볼 곳', '경고', '대안'],
            rows: [
              ['원재료', '부분수소·쇼트닝', '올리브·카놀라·아보카도'],
              ['1회량', '작게 쪼갠 표시', '반복 간식 줄이기'],
              ['튀김', '기름 재사용', '굽기·찜'],
              ['분석기', '일주일 패턴', '한 가지 끊기'],
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '과자·튀김 배달을 매일 기름 원천으로 삼지 마세요. [분석기](/analyzer)에 일주일 기록해 보세요. 다음: [조리유](/blog/fats-cooking-oils).',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<2g', label: '미국심장협회(AHA) 권장 하루 트랜스지방 상한선' },
              { value: '2018', label: '미국 PHO 금지(대부분)' },
              { value: '0.5g', label: '1회량 0g 함정' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'fats-cooking-oils',
    seriesId: 'fats',
    episode: 5,
    title: {
      en: 'Cooking oils: olive for everyday, high heat without smoke panic',
      ko: '조리유: 올리브는 일상용, 연점은 너무 걱정 말기',
    },
    thesis: {
      en: 'Olive, canola, and avocado oils cover most home cooking. Smoke point matters for deep frying, but most people overthink oil chemistry while underthinking fried takeout frequency.',
      ko: '올리브·카놀라·아보카도면 집밥은 거의 다 돼요. 연점은 튀김할 때나 중요하지, 사실 기름 화학 따지는 것보다 배달 튀김을 얼마나 자주 먹느냐가 더 큰 변수예요.',
    },
    description: {
      en: 'Oil choice by cooking method, reused fryer oil, and coconut oil saturation reality.',
      ko: '조리법별 유 선택, 재사용 기름, 코코넛 포화.',
    },
    readMinutes: 7,
    datePublished: '2026-07-02',
    relatedSlugs: ['fats-saturated', 'fats-omega-3', 'fats-everyday-plate', 'fats-guide'],
    en: [
      {
        heading: 'Default oils for US kitchens',
        paragraphs: [
          'Extra-virgin olive oil for sauté and dressing. Canola or avocado oil when you need neutral flavor or higher heat. Butter for finish flavor, not the quart you fry in.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Oil by job',
            headers: ['Job', 'Oil', 'Note'],
            rows: [
              ['Salad, low heat', 'Extra-virgin olive', 'Polyphenols, flavor'],
              ['General sauté', 'Olive or avocado', 'Stable enough for home heat'],
              ['Bake substitute', 'Canola', 'Neutral, omega-3 ALA'],
              ['Deep fry (rare)', 'High-heat refined', 'Occasion food, not daily'],
            ],
          },
        ],
      },
      {
        heading: 'Coconut oil and smoke-point anxiety',
        paragraphs: [
          'Coconut oil is mostly saturated—fine occasionally, not a health halo for daily bulletproof coffee. Smoke point charts matter less than whether you are eating fried food five nights a week.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Frequency beats chemistry trivia',
            body: [
              'One homemade stir-fry with olive oil beats researching smoke points while ordering fries.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Buy one good olive oil and one neutral high-heat oil; skip giant tubs of shortening. Next: [fat-soluble vitamins](/blog/fats-and-vitamins).',
        ],
      },
    ],
    ko: [
      {
        heading: '한국·미국 주방 기본유',
        paragraphs: [
          '미국식이면 볶음·드레싱엔 올리브, 중성 맛이나 고온엔 카놀라·아보카도, 버터는 마무리 향용으로 써요. 한국이라면 들기름·참기름은 향이 강하니까 나물 마무리에 조금만 쓰고, 매 끼니 많이 쓰면 포화와 산패를 조심하는 게 좋아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '용도별',
            headers: ['용도', '유', '메모'],
            rows: [
              ['나물 마무리', '참기름 소량', '향, 포화 인지'],
              ['일반 볶음', '올리브·카놀라', '집에서 충분'],
              ['국물', '기름 적게', '국물이 포화 저장고'],
              ['튀김(가끔)', '새 기름', '재사용 튀김집 주의'],
            ],
          },
        ],
      },
      {
        heading: '코코넛·연점 불안',
        paragraphs: [
          '코코넛은 포화 위주—가끔은 몰라도 매일 만능이 아니에요. 연점 표보다 주 5회 튀김 배달이 더 큰 변수예요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '화학 지식보다 빈도가 중요해요',
            body: [
              '연점 공부하면서 감자튀김 시키는 것보다, 올리브유로 볶음밥 한 번 해 먹는 게 나아요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '올리브 하나·중성유 하나면 대부분 충분해요. 쇼트닝 대통은 피하세요. 다음: [지용성 비타민](/blog/fats-and-vitamins).',
        ],
      },
    ],
  },
  {
    slug: 'fats-and-vitamins',
    seriesId: 'fats',
    episode: 6,
    title: {
      en: 'Fat-soluble vitamins: why salad-only meals miss A, D, E, and K',
      ko: '지용성 비타민: 샐러드만으로는 A·D·E·K가 비어요',
    },
    thesis: {
      en: 'Vitamins A, D, E, and K need dietary fat to absorb well. A fat-free dressing or skim-only pattern can leave colorful plates that still under-deliver fat-soluble nutrients.',
      ko: '비타민 A·D·E·K는 지방이 있어야 잘 흡수돼요. 무지방 드레싱에 저지방 우유만 먹는 식이면 접시 색은 화려해도 정작 지용성 영양소는 부족할 수 있어요.',
    },
    description: {
      en: 'Pairing greens with oil, eggs, fish, nuts; link to vitamin ULs without repeating the full fat-soluble article.',
      ko: '채소+기름, 달걀·생선·견과, 비타민 상한은 링크.',
    },
    readMinutes: 7,
    datePublished: '2026-07-03',
    relatedSlugs: ['fats-guide', 'vitamins-fat-soluble', 'vitamins-c-and-d', 'fats-everyday-plate'],
    en: [
      {
        heading: 'Fat as a delivery truck',
        paragraphs: [
          'Carotenoids in carrots and sweet potatoes convert to vitamin A only when fat is present. Vitamin D in salmon and egg yolks rides along with the fish oil. Vitamin E sits in almonds and sunflower seeds, which are already fatty foods.',
          'A bare spinach salad with lemon only is a missed chance. Olive oil, avocado, or seeds on the same bowl fix absorption without a pill.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Fat-soluble meal pattern',
            steps: [
              { label: 'Color', note: 'greens + orange veg' },
              { label: 'Fat', note: '1–2 tbsp olive or ¼ avocado' },
              { label: 'Protein', note: 'eggs or fish for D' },
              { label: 'Check UL', note: 'if supplementing A/D' },
            ],
          },
        ],
      },
      {
        heading: 'Do not megadose to compensate',
        paragraphs: [
          'High-dose vitamin A or D supplements accumulate. Full detail lives in [fat-soluble vitamins](/blog/vitamins-fat-soluble) and [vitamin C & D](/blog/vitamins-c-and-d). Food + modest fat usually comes first.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Warfarin and vitamin K',
            body: [
              'Suddenly doubling leafy greens or K supplements shifts INR—medical coordination, not blog experiments.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Put fat on the same fork as colorful plants. Next: [everyday plate](/blog/fats-everyday-plate) by locale.',
        ],
      },
    ],
    ko: [
      {
        heading: '지방은 배달 트럭',
        paragraphs: [
          '당근·고구마의 카로티노이드는 지방이 곁들여져야 비타민 A로 잘 바뀌어요. 연어·노른자의 비타민 D는 생선 기름에 실려 같이 들어오고요. 비타민 E는 아몬드·해바라기씨에 들어 있는데, 이건 원래 기름진 음식이에요.',
          '레몬만 뿌린 시금치 샐러드는 아쉬워요. 올리브·아보카도·씨앗을 같은 그릇에 올리면 알약 없이 흡수가 나아져요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '지용성 끼니 패턴',
            steps: [
              { label: '색', note: '나물+주황 채소' },
              { label: '지방', note: '올리브 1–2숟가락·아보카도' },
              { label: '단백', note: '달걀·생선으로 D' },
              { label: 'UL', note: 'A/D 보충 시' },
            ],
          },
        ],
      },
      {
        heading: '알약 고용량으로 메우지 않기',
        paragraphs: [
          '비타민 A·D 고용량은 쌓여요. 자세한 건 [지용성 비타민](/blog/vitamins-fat-soluble), [C·D](/blog/vitamins-c-and-d). 음식+적당한 지방이 보통 먼저예요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '와파린·비타민 K',
            body: [
              '나물·K 보충을 갑자기 늘리면 INR이 흔들려요—진료와 맞추세요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '채소와 같은 젓가락에 지방을 올리세요. 다음: 로케일별 [일상 식탁](/blog/fats-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'fats-everyday-plate',
    seriesId: 'fats',
    episode: 7,
    title: {
      en: 'The US plate: olive oil, nuts, fatty fish, and where saturated fat stacks',
      ko: '한국 식탁: 참기름·생선·견과, 포화·트랜스는 어디서 쌓이나',
    },
    thesis: {
      en: 'A solid US day gets fat from avocado, nuts, olive oil, and fish while limiting butter, fried takeout, and pastry shortening—not from fearing every gram on the label.',
      ko: '좋은 한국 식탁은 생선·견과·나물 기름을 쓰고, 삼겹·튀김·라면 스프로 포화·트랜스가 쌓이는지 보는 거예요. 라벨의 모든 g를 공포로 삼지 않아요.',
    },
    description: {
      en: 'US meal slots for healthy fats vs saturated/trans traps.',
      ko: '한국 끼니별 좋은 지방 vs 포화·트랜스 함정.',
    },
    readMinutes: 9,
    datePublished: '2026-07-04',
    relatedSlugs: ['fats-omega-3', 'fats-saturated', 'fats-trans-labels', 'fats-guide'],
    en: [
      {
        heading: 'US patterns that push fat the wrong way',
        paragraphs: [
          'A coffee-and-pastry breakfast adds saturated and trans fat with no omega-3. Deli lunch sandwiches stack cheese and cured meat. And a week of dinners with protein but no fish misses out on EPA and DHA.',
          'The fix is one unsaturated anchor per meal: nuts on oats, olive oil on salad, salmon twice a week.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Three fat anchors',
            steps: [
              { label: 'Breakfast', note: 'walnuts + yogurt' },
              { label: 'Lunch', note: 'olive oil salad + beans' },
              { label: 'Dinner', note: 'salmon or tofu + veg' },
            ],
          },
        ],
      },
      {
        heading: 'US everyday fat map',
        paragraphs: [
          'From the [fats encyclopedia](/nutrients/fats) food list.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Meal slots (US)',
            headers: ['Meal', 'Staples', 'Fat quality', 'Limit'],
            rows: [
              ['Breakfast', 'Oats + walnuts, avocado toast', 'MUFA, ALA', 'Bacon daily'],
              ['Lunch', 'Salmon salad, olive dressing', 'EPA/DHA, MUFA', 'Deli macaroni salad'],
              ['Dinner', 'Stir-fry with canola, side greens', 'Mixed unsaturated', 'Frozen pizza nightly'],
              ['Snack', 'Almonds, dark chocolate square', 'MUFA', 'Frosted pastries'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1 tbsp', label: 'olive oil ~14 g fat' },
              { value: '2×/wk', label: 'fatty fish' },
              { value: '7 days', label: 'Analyzer before fish oil' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cook at home with olive oil, schedule fish, treat drive-through fries as monthly. Next: [myths & special cases](/blog/fats-myths-special).',
        ],
      },
    ],
    ko: [
      {
        heading: '한국 식탁에서 지방이 한쪽으로 쏠리는 패턴',
        paragraphs: [
          '아침을 빵·커피로만 때우면 불포화와 오메가3가 비어요. 점심 돈까스·라면은 튀김 포화에 나트륨까지 더해지고요. 일주일 내내 삼겹살만 먹으면 EPA·DHA가 빠져요.',
          '그래서 끼니마다 불포화를 하나씩 챙기면 좋아요. 아침엔 견과·두유, 점심엔 나물에 참기름 조금, 저녁엔 고등어처럼요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '지방 앵커 세 개',
            steps: [
              { label: '아침', note: '두유·호두' },
              { label: '점심', note: '나물+기름 소량' },
              { label: '저녁', note: '고등어·두부' },
            ],
          },
        ],
      },
      {
        heading: '한국 일상 지방 지도',
        paragraphs: [
          '[지방 백과](/nutrients/fats) 음식표와 맞춰 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '끼니별 (한국)',
            headers: ['끼니', '식재', '지방 질', '줄일 것'],
            rows: [
              ['아침', '두유·호두', '불포화', '매일 소시지'],
              ['점심', '밥+나물+들기름 한 방울', 'MUFA', '튀김 도시락'],
              ['저녁', '고등어구이·두부', 'EPA/DHA', '삼겹 매일'],
              ['간식', '아몬드·다크초콜릿', 'MUFA', '크림빵·과자'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1방울', label: '참기름—향, 소량' },
              { value: '주 2회', label: '등푸른생선' },
              { value: '7일', label: '분석기 후 피쉬오일' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '집에서 굽고·찌고, 생선 일정 잡고, 튀김 배달은 가끔으로. 다음: [신화·특수](/blog/fats-myths-special).',
        ],
      },
    ],
  },
  {
    slug: 'fats-myths-special',
    seriesId: 'fats',
    episode: 8,
    title: {
      en: 'Fat myths: low-fat eras, cholesterol in food, and when medical diets change the rules',
      ko: '지방 신화: 저지방 열풍, 식이 콜레스테롤, 진료가 필요한 때',
    },
    thesis: {
      en: 'The 1990s low-fat craze swapped fat for sugar and did not fix hearts. Dietary cholesterol matters less than saturated and trans fat for most people—but lipid disorders and gallbladder disease need individualized plans.',
      ko: '90년대 저지방 열풍은 지방 대신 설탕을 늘렸어요. 식이 콜레스테롤보다 포화·트랜스가 더 중요한 경우가 많지만, 지질 이상·담석은 개인 계획이 필요해요.',
    },
    description: {
      en: 'Low-fat mistakes, eggs and cholesterol update, keto glance, gallbladder and lipid clinic flags.',
      ko: '저지방 오류, 달걀·콜레스테롤, 키토 한 줄, 담석·지질 진료.',
    },
    readMinutes: 8,
    datePublished: '2026-07-05',
    relatedSlugs: ['fats-guide', 'fats-saturated', 'fats-omega-3', 'fats-trans-labels'],
    en: [
      {
        heading: 'Low-fat packaged food trap',
        paragraphs: [
          'Fat-free cookies often add sugar and refined flour. The heart win came from replacing saturated fat with unsaturated fat—not from labeling snacks "fat free."',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Quality swap, not erase',
            body: [
              'Butter → olive oil beats butter → fat-free muffin with extra sugar.',
            ],
          },
        ],
      },
      {
        heading: 'Dietary cholesterol today',
        paragraphs: [
          'For most healthy adults, eggs and shellfish are not the primary LDL driver—saturated fat, trans fat, and overall pattern are. People with familial hypercholesterolemia or specific clinician orders are the exception.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Myth vs current view (general adults)',
            headers: ['Myth', 'Closer truth'],
            rows: [
              ['All fat makes you fat', 'Calorie surplus does; fat is dense'],
              ['Eggs always clog arteries', 'Context: sat fat + genetics'],
              ['Coconut oil is heart-perfect', 'Still mostly saturated'],
              ['Keto solves everyone', 'Medical supervision for some; not universal'],
            ],
          },
        ],
      },
      {
        heading: 'Close the series',
        paragraphs: [
          'Fats are structural and flavorful, not the enemy. Return to the [series hub](/blog/fats-guide), [everyday plate](/blog/fats-everyday-plate), and [encyclopedia](/nutrients/fats). Eat unsaturated defaults, limit saturated stacks, eliminate industrial trans, and use clinicians for lipid labs—not influencer fear.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Food-first fat loop',
            steps: [
              { label: 'Type check', note: 'unsaturated default' },
              { label: 'Fish 2×/wk', note: 'EPA/DHA' },
              { label: 'Label scan', note: 'PHO zero' },
              { label: 'Medical flags', note: 'lipids, gallbladder' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '저지방 가공식 함정',
        paragraphs: [
          '무지방 쿠키는 당·정밀 밀가루를 늘리는 경우가 많아요. 심장 이득은 지방 제거가 아니라 포화→불포화 교체에서 왔어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '없애기보다 질 바꾸기',
            body: [
              '버터→올리브가 버터→무지방 머핀(당↑)보다 낫습니다.',
            ],
          },
        ],
      },
      {
        heading: '식이 콜레스테롤, 지금',
        paragraphs: [
          '대부분 건강한 성인에겐 달걀·조개가 LDL 1순위 원인은 아니에요—포화·트랜스·전체 패턴이 커요. 가족성 고콜레스테롤·의사 지시는 예외예요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '신화 vs 가까운 진실',
            headers: ['신화', '가까운 진실'],
            rows: [
              ['지방=살', '칼로리 잉여, 지방은 촘촘'],
              ['달걀=혈관 막힘', '포화·유전 맥락'],
              ['코코넛=완벽', '여전히 포화 많음'],
              ['키토=만능', '일부만, 진료 필요'],
            ],
          },
        ],
      },
      {
        heading: '시리즈 마무리',
        paragraphs: [
          '지방은 구조·맛이지 적이 아니에요. [허브](/blog/fats-guide), [한국 식탁](/blog/fats-everyday-plate), [백과](/nutrients/fats)로 돌아가세요. 불포화 기본, 포화 줄이기, 공업 트랜스 제거, 지질 검사는 인플루언서 공포 말고 진료로.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '음식 우선 루프',
            steps: [
              { label: '종류', note: '불포화 기본' },
              { label: '생선', note: '주 2회' },
              { label: '라벨', note: '부분수소 0' },
              { label: '진료', note: '지질·담석' },
            ],
          },
        ],
      },
    ],
  },
];
