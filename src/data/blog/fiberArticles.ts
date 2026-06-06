import type { BlogArticle } from './types';

export const fiberArticles: BlogArticle[] = [
  {
    slug: 'fiber-guide',
    seriesId: 'fiber',
    episode: 1,
    title: {
      en: 'Dietary fiber: the carb your gut eats, and why everyone keeps talking about it',
      ko: '식이섬유: 내가 아닌 장내 유익균의 에너지원, 식이섬유가 주목받는 이유',
    },
    thesis: {
      en: 'Fiber is a carbohydrate you do not fully digest, yet it steadies blood sugar and feeds gut bacteria. You get it from beans, oats, and whole fruit, not from juice or white flour.',
      ko: '식이섬유는 우리 몸에서 소화·흡수되지 않는 탄수화물이지만, 혈당을 안정적으로 유지하고 장내 유익균을 활성화합니다. 주스나 정제 밀가루 대신 콩류, 귀리, 신선한 생과일을 통해 풍부하게 섭취할 수 있습니다.',
    },
    description: {
      en: 'A hub on soluble vs insoluble fiber, daily targets, and the eight-part series map.',
      ko: '수용성과 불용성 식이섬유의 차이, 하루 권장 섭취량, 그리고 식이섬유 관련 총 8부작 시리즈 지도를 소개하는 허브 문서입니다.',
    },
    readMinutes: 9,
    datePublished: '2026-07-15',
    relatedSlugs: ['fiber-how-much', 'fiber-gut-microbiome', 'fiber-everyday-plate', 'carbohydrates-fiber'],
    en: [
      {
        heading: 'What fiber actually is',
        paragraphs: [
          'Fiber is plant material your small intestine cannot fully break down into glucose. Some of it ferments in the colon, where bacteria turn it into short-chain fats that support the gut lining.',
          'So fiber counts as a carb on labels, but it does not spike your sugar. The [carbohydrates encyclopedia](/nutrients/carbohydrates) lists high-fiber staples, and the short [carbohydrates & fiber](/blog/carbohydrates-fiber) piece in the carb series is a quick intro. This series goes deeper.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'The one line to keep',
            body: [
              'Fiber is food for your gut and a brake on fast carbs. Whole plants beat fiber powders for most people.',
            ],
          },
        ],
      },
      {
        heading: 'Soluble vs insoluble (without the textbook)',
        paragraphs: [
          'Soluble fiber dissolves in water and forms gels, like the kind in oats, beans, and apples. It can slow digestion and bind bile, which helps lower LDL cholesterol in many people.',
          'Insoluble fiber does not gel; it adds bulk that keeps you regular. Whole wheat bran, vegetables, and nuts lean this way. Real meals mix both.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Two types, one plate',
            headers: ['Type', 'Examples', 'Often helps with'],
            rows: [
              ['Soluble', 'Oats, lentils, citrus', 'Glucose curve, LDL'],
              ['Insoluble', 'Bran, leafy greens, popcorn', 'Regularity, fullness'],
              ['Both', 'Beans, berries, avocado', 'Gut + metabolic health'],
            ],
          },
        ],
      },
      {
        heading: 'Series map',
        paragraphs: [
          'Next: how many grams, then the microbiome, cholesterol and glucose, everyday plates (US in English, Korean table in Korean), supplements, special diets, and myths.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[How much fiber per day](/blog/fiber-how-much)'],
              ['Part 3', '[Gut microbiome & prebiotics](/blog/fiber-gut-microbiome)'],
              ['Part 4', '[Fiber, cholesterol & blood sugar](/blog/fiber-cholesterol-glucose)'],
              ['Part 5', '[Everyday plate: US staples](/blog/fiber-everyday-plate)'],
              ['Carb series', '[Fiber in the carb line](/blog/carbohydrates-fiber)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '식이섬유란 무엇인가',
        paragraphs: [
          '식이섬유는 소장에서 포도당으로 완전히 분해되지 않는 식물성 탄수화물입니다. 이 성분은 대장으로 내려가 장내 미생물에 의해 발효되며, 이때 생성된 단쇄지방산(Short-Chain Fatty Acids)은 장 점막 세포의 에너지원이자 보호막 역할을 해 줍니다.',
          '영양성분표에는 탄수화물로 표시되지만 당류와 달리 혈당을 급격히 올리지 않습니다. 자세한 식품 리스트는 [탄수화물 백과](/nutrients/carbohydrates)에서, 핵심 개념은 탄수화물 시리즈 [3편](/blog/carbohydrates-fiber)에서 간편하게 만나보실 수 있습니다. 이번 시리즈에서는 그보다 훨씬 깊이 있는 내용을 다뤄봅니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '핵심 요약',
            body: [
              '식이섬유는 장내 유익균의 먹이인 동시에, 정제 탄수화물의 급격한 흡수를 늦춰 주는 천연 브레이크입니다. 보충용 분말 제품보다는 자연 그대로의 식재료를 섭취하는 것이 좋습니다.',
            ],
          },
        ],
      },
      {
        heading: '수용성 식이섬유 vs 불용성 식이섬유',
        paragraphs: [
          '수용성 식이섬유는 물에 녹아 끈적한 젤 형태로 변합니다. 귀리, 콩, 사과 등에 풍부하며 소화 속도를 늦추고 체내 담즙산과 결합하여 배출됨으로써 혈중 LDL 콜레스테롤을 낮추는 데 기여합니다.',
          '불용성 식이섬유는 물에 녹지 않고 수분을 흡수하여 변의 부피를 늘립니다. 통밀 겨, 녹색 잎채소, 견과류에 많으며 규칙적인 배변과 포만감 유지를 돕습니다. 우리가 일상에서 접하는 자연 식재료에는 대개 두 종류가 고루 섞여 있습니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '두 가지 식이섬유의 조화',
            headers: ['종류', '대표 식품', '주요 건강 이점'],
            rows: [
              ['수용성 식이섬유', '귀리, 렌틸콩, 감귤류', '혈당 곡선 완화, LDL 콜레스테롤 감소'],
              ['불용성 식이섬유', '밀 겨, 잎채소, 팝콘', '원활한 배변 활동, 포만감 지속'],
              ['혼합형', '대두 및 검은콩, 베리류, 아보카도', '장 건강 및 대사 효율 향상'],
            ],
          },
        ],
      },
      {
        heading: '시리즈 안내',
        paragraphs: [
          '이어지는 시리즈에서는 하루 권장량, 장내 미생물과 프리바이오틱스, 콜레스테롤 및 혈당 관리, 일상 식탁 활용법, 섬유질 보충제, 특수 식단 가이드, 그리고 잘못된 오해들을 하나씩 다룹니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '이어지는 콘텐츠 추천',
            headers: ['시리즈 순서', '주제'],
            rows: [
              ['2편', '[하루 식이섬유 적정 섭취량](/blog/fiber-how-much)'],
              ['3편', '[장내 미생물과 프리바이오틱스](/blog/fiber-gut-microbiome)'],
              ['4편', '[식이섬유와 콜레스테롤, 그리고 혈당 조절](/blog/fiber-cholesterol-glucose)'],
              ['5편', '[우리 식탁 속 식이섬유 채우기](/blog/fiber-everyday-plate)'],
              ['탄수화물 3편', '[탄수화물 시리즈 속 식이섬유 이야기](/blog/carbohydrates-fiber)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'fiber-how-much',
    seriesId: 'fiber',
    episode: 2,
    title: {
      en: 'How much fiber per day—and why most adults fall short',
      ko: '하루 식이섬유 적정 섭취량: 우리 식탁에서 식이섬유가 부족한 진짜 이유',
    },
    thesis: {
      en: 'General guidelines land near 25 g for women and 38 g for men under 50, with slightly lower targets after 50. Yet typical Western intakes often sit near half that unless beans and whole grains show up often.',
      ko: '일반적인 식생활 지침에 따르면 50세 미만 성인의 하루 권장 섭취량은 여성 약 25g, 남성 약 38g입니다(50세 이후에는 소폭 감소). 그러나 콩류나 통곡물을 자주 챙겨 먹지 않는 현대인들의 실제 섭취량은 권장량의 절반 수준에 머물러 있습니다.',
    },
    description: {
      en: 'Age and sex targets, how to estimate intake, and ramp-up without bloating.',
      ko: '연령 및 성별에 따른 목표치, 식단 내 식이섬유 함량 추정법, 그리고 속이 더부룩하지 않게 섭취량을 늘리는 실천 요령을 공유합니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-16',
    relatedSlugs: ['fiber-guide', 'fiber-gut-microbiome', 'fiber-everyday-plate', 'carbohydrates-how-much'],
    en: [
      {
        heading: 'Guideline numbers (not a contest)',
        paragraphs: [
          'U.S. Dietary Guidelines and NIH materials commonly cite about 14 g fiber per 1,000 kcal, with many adults aiming for 25–38 g depending on age and sex. Kids need less, and pregnancy may need more, so personalize with a clinician.',
          'Hitting the number once with a fiber bar is not the same as eating beans, vegetables, and whole fruit all week.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '25 g', label: 'common target (women, <50)' },
              { value: '38 g', label: 'common target (men, <50)' },
              { value: '14 g', label: 'per 1,000 kcal (rule of thumb)' },
            ],
          },
        ],
      },
      {
        heading: 'Where grams actually come from',
        paragraphs: [
          'One cup of cooked lentils carries about 16 g fiber in our encyclopedia table, half a cup of chickpeas about 6 g, and a medium apple about 4 g. Two cups of salad greens might add only 2–3 g: lots of volume, not much fiber.',
          'Log a week in the [Analyzer](/analyzer) before buying a supplement. You may already eat enough at dinner and skip breakfast plants entirely.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Fiber-dense anchors',
            headers: ['Food', 'Approx fiber', 'Note'],
            rows: [
              ['Lentils (1 cup cooked)', '~16 g', 'Protein + iron'],
              ['Black beans (½ cup)', '~7–8 g', 'Pair with vitamin C'],
              ['Oats (1 cup cooked)', '~4 g', 'Beta-glucan'],
              ['Chia (2 tbsp)', '~10 g', 'Also omega-3 ALA'],
            ],
          },
        ],
      },
      {
        heading: 'Ramp up without misery',
        paragraphs: [
          'Add 3–5 g per week, not 20 g overnight. Drink water as fiber rises. Gas usually eases as the microbiome adapts—see [gut microbiome](/blog/fiber-gut-microbiome).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'When more is not better',
            body: [
              'IBS, active flares, or post-surgery diets may need low-FODMAP or clinician-guided plans—not random high-fiber challenges.',
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '일반적인 식이섬유 일일 권장량',
        paragraphs: [
          '미국 국립보건원(NIH) 가이드라인에 따르면 보통 1,000kcal당 14g의 식이섬유 섭취를 권하며, 성인 기준 하루 25~38g을 권장합니다. 어린이는 이보다 적고 임신부의 경우 더 높은 기준이 적용될 수 있으므로 담당 의료진과 조율하여 계획을 세우는 것이 좋습니다.',
          '설탕이 든 시리얼 바 하나로 그램(g)만 채우는 것과, 일주일 내내 자연 식품인 콩, 신선한 채소, 과일을 골고루 먹는 것은 몸이 받아들이는 영양 수준 자체가 다릅니다.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '25g', label: '흔한 목표(여성, 50세 미만)' },
              { value: '38g', label: '흔한 목표(남성, 50세 미만)' },
              { value: '14g', label: '1,000kcal당(대략)' },
            ],
          },
        ],
      },
      {
        heading: '그램이 어디서 오는지',
        paragraphs: [
          '백과 표를 보면 렌틸 1컵이 약 16g, 병아리콩 반 컵이 약 6g, 사과 한 개가 약 4g이에요. 샐러드 2컵은 2–3g밖에 안 될 수 있고요. 부피만 클 뿐 섬유는 적은 거죠.',
          '보충제를 사기 전에 [식단 분석기](/analyzer)에 일주일을 기록해 보세요. 저녁은 괜찮은데 아침에 채소가 통째로 빠져 있을 수도 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '식이섬유가 풍부한 건강 탄수화물 식품',
            headers: ['식품 목록', '일반적인 식이섬유 함량', '특징 및 영양 혜택'],
            rows: [
              ['렌틸콩 (삶은 것 1컵)', '~16g', '단백질과 철분 동시 보충'],
              ['검은콩 (삶은 것 ½컵)', '~7~8g', '비타민 C 식품과 함께 드시면 철분 흡수에 좋습니다'],
              ['오트밀 (조리된 것 1컵)', '~4g', '심혈관 건강에 좋은 베타글루칸'],
              ['치아씨드 (2큰술)', '~10g', '식물성 오메가-3(ALA)도 풍부'],
            ],
          },
        ],
      },
      {
        heading: '속 편하게 식이섬유 섭취량 늘리기',
        paragraphs: [
          '하루아침에 20g을 늘리려 하지 말고, 매주 3~5g씩 점진적으로 추가하세요. 또한 식이섬유가 수분을 충분히 머금어 작용할 수 있도록 물도 넉넉히 드셔야 합니다. 초기의 가스는 장내 균총이 적응함에 따라 점차 줄어듭니다(상세 내용은 [장내 미생물과 섬유질 관련 글](/blog/fiber-gut-microbiome)을 참조해 보세요).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '질병 상태나 개인차 고려하기',
            body: [
              '과민성 대장 증후군(IBS)이 있거나, 장 질환이 급성으로 악화되었거나, 수술 후 회복 중인 경우에는 오히려 저FODMAP 식단이나 제한식이 필요하므로 의료진의 맞춤형 처방을 따라야 합니다.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'fiber-gut-microbiome',
    seriesId: 'fiber',
    episode: 3,
    title: {
      en: 'Fiber, your microbiome, and why kimchi headlines are only half the story',
      ko: '식이섬유와 장내 유익균: 미디어의 발효식품 유행이 전부가 아닌 이유',
    },
    thesis: {
      en: 'Prebiotic fiber feeds bacteria that ferment food into short-chain fats, and fermented foods add microbes. But diversity comes from eating many plants, not one miracle spoonful.',
      ko: '프리바이오틱스 역할을 하는 식이섬유는 장내 유익균을 먹여 살려 건강에 유익한 단쇄지방산을 만들어냅니다. 발효식품은 장내 미생물을 직접 주입해 주지만, 건강한 장내 생태계의 다양성을 가꾸는 것은 단 하나의 기적 같은 슈퍼푸드가 아닌 다양한 식물성 식품을 고루 먹는 습관입니다.',
    },
    description: {
      en: 'Prebiotics vs probiotics, bloating when you increase fiber, and fermented foods in context.',
      ko: '프리바이오틱스와 프로바이오틱스의 원리, 섬유질 섭취 증량 시 겪을 수 있는 더부룩함의 대처법, 장 건강에서 발효식품이 차지하는 실질적 위상을 알아봅니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-17',
    relatedSlugs: ['fiber-how-much', 'fiber-guide', 'fiber-supplements-labels', 'vitamins-how-they-work'],
    en: [
      {
        heading: 'Prebiotic vs probiotic (plain language)',
        paragraphs: [
          'Prebiotics are fibers and polyphenols bacteria can ferment, like onions, garlic, oats, and beans. Probiotics are live microbes in yogurt, kefir, sauerkraut, and kimchi.',
          'Over time you want both: fiber to feed the bacteria you already have, and fermented foods to add new strains. Neither one replaces vegetables.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'What happens in the colon',
            steps: [
              { label: 'Fiber arrives', note: 'especially soluble + resistant starch' },
              { label: 'Bacteria ferment', note: 'gas is normal early on' },
              { label: 'Short-chain fats', note: 'butyrate supports gut lining' },
            ],
          },
        ],
      },
      {
        heading: 'Bloating when you level up',
        paragraphs: [
          'A big plate of beans shocks a gut that is not used to fiber. Smaller servings, rinsed canned beans, and well-cooked lentils all help, and so does sticking with it for two weeks before you judge.',
          'If pain, blood, or weight loss shows up, that is a reason to see a doctor, not to push through a fiber challenge.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Practical ramp',
            body: [
              'Week 1: extra vegetable at lunch. Week 2: half cup beans three times. Week 3: swap one refined grain. Water with each step.',
            ],
          },
        ],
      },
      {
        heading: 'Fermented foods without the hype',
        paragraphs: [
          'Kimchi and yogurt can support gut diversity when they fit your sodium and sugar budget. They do not erase a week of ultra-processed snacks.',
          'Next: [cholesterol and glucose](/blog/fiber-cholesterol-glucose).',
        ],
      },
    ],
    ko: [
      {
        heading: '프리바이오틱스 vs 프로바이오틱스',
        paragraphs: [
          '프리바이오틱스(Prebiotics)는 장내 유익균이 먹고 자라는 영양원(식이섬유, 폴리페놀 등)입니다. 양파, 마늘, 아스파라거스, 콩류가 대표적이죠. 반면 프로바이오틱스(Probiotics)는 요거트, 케피어, 김치, 낫토 등 발효식품을 통해 직접 섭취하는 유익균 자체를 일컫습니다.',
          '장 건강을 위해서는 이 두 가지 요소를 균형 있게 구성하는 것이 이상적입니다. 식이섬유는 기존의 유익균들을 활성화하고, 발효식품은 외계로부터 새로운 유익균들을 지속적으로 공급해 주기 때문입니다. 다만 그 어떤 영양 요법도 신선한 제철 채소 중심의 식생활을 대신할 수는 없습니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '대장 내부의 소화 생리학 흐름',
            steps: [
              { label: '섬유 도착', note: '특히 수용성 식이섬유 및 저항성 전분' },
              { label: '발효', note: '미생물 발효 개시 (초기 가스는 자연스러운 증상)' },
              { label: '단쇄지방산', note: '단쇄지방산 형성 (부티르산 등이 장 점막 재생에 기여)' },
            ],
          },
        ],
      },
      {
        heading: '식이섬유 증량 시 발생하는 더부룩함 대처법',
        paragraphs: [
          '그동안 식이섬유 섭취량이 적었던 장에 갑자기 대량의 콩류를 밀어 넣으면 복부 팽만감과 가스가 차며 배가 더부룩해질 수 있습니다. 처음엔 섭취 단위를 작게 나누고, 통조림 콩은 물에 깨끗이 헹궈서 조리하며, 렌틸콩은 완전히 부드러워질 때까지 푹 익혀 드시면 소화가 훨씬 편안해집니다. 장내 균총이 적응할 수 있도록 최소 2주는 꾸준히 먹어본 뒤 조절해 보세요.',
          '만약 극심한 복통, 점액변이나 혈변, 또는 이유 없는 체중 감소 등의 적신호가 관찰된다면 식이섬유 섭취량을 고민할 것이 아니라 즉각 병원에 방문하여 검사를 받아야 합니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '3단계 점진적 실천 로드맵',
            body: [
              '1주차: 점심 식사에 신선한 채소 반찬 한 접시 추가. 2주차: 밥이나 요리에 삶은 콩 반 컵씩 주 3회 곁들이기. 3주차: 흰 식빵이나 백미 대신 통밀빵이나 현미잡곡밥으로 대체하기. 모든 단계에서 물을 자주 충분히 마셔 줍니다.',
            ],
          },
        ],
      },
      {
        heading: '발효식품의 과장되지 않은 진실',
        paragraphs: [
          '김치, 수제 요거트 등은 나트륨과 인공 당 함량에 신경 쓰면서 적절히 섭취하면 장내 미생물의 다양성을 넓히는 훌륭한 조력자가 됩니다. 다만 주말 하루 발효식품을 챙겨 먹는다고 해서 주중에 먹은 다량의 초가공 식품 해악을 전부 없애주는 것은 아닙니다.',
          '다음 편: [식이섬유가 콜레스테롤과 혈당에 작용하는 원리](/blog/fiber-cholesterol-glucose).',
        ],
      },
    ],
  },
  {
    slug: 'fiber-cholesterol-glucose',
    seriesId: 'fiber',
    episode: 4,
    title: {
      en: 'Fiber for LDL cholesterol and steadier blood sugar',
      ko: '식이섬유의 대사 개선 효과: LDL 콜레스테롤 감소와 안정적인 혈당 조절',
    },
    thesis: {
      en: 'Soluble fiber from oats and beans can lower LDL modestly in many people, and pairing carbs with fiber and protein blunts glucose spikes better than memorizing glycemic index tables.',
      ko: '귀리와 콩에 포함된 수용성 식이섬유는 혈중 LDL 콜레스테롤 수치를 효과적으로 낮춰 줍니다. 복잡한 혈당 지수(GI) 수치표를 맹신하기보다 탄수화물에 식이섬유와 단백질을 짝지어 식단을 구성하는 것이 혈당 안정에 훨씬 효과적입니다.',
    },
    description: {
      en: 'Beta-glucan, legumes, and meal pairing—links to the carb blood-sugar piece.',
      ko: '베타글루칸의 효능, 콩류 섭취 요령, 그리고 현명한 식품 조합 방법을 알아봅니다. 탄수화물 시리즈의 혈당 조합 가이드와 연결하여 읽어 보세요.',
    },
    readMinutes: 8,
    datePublished: '2026-07-18',
    relatedSlugs: ['fiber-guide', 'carbohydrates-blood-sugar-pairs', 'fats-saturated', 'fiber-how-much'],
    en: [
      {
        heading: 'Cholesterol: what fiber can and cannot do',
        paragraphs: [
          'FDA allows a heart-health claim for beta-glucan soluble fiber from oats at roughly 3 g per day as part of a low-saturated-fat diet. That works at the level of real food, not a sugary oat cookie made with palm oil.',
          'Beans and psyllium also lower LDL in trials. The effect is real but modest. Statins and genetics still matter, and fiber is one part of how you build a plate.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Soluble-fiber allies',
            headers: ['Food', 'Mechanism', 'Portion idea'],
            rows: [
              ['Oats', 'Beta-glucan binds bile', '1 cup cooked oatmeal'],
              ['Beans', 'Gel + fermentation', '½–1 cup most days'],
              ['Apples, citrus', 'Pectin', 'Whole fruit, not juice'],
              ['Barley', 'Beta-glucan cousin', 'Soups, salads'],
            ],
          },
        ],
      },
      {
        heading: 'Blood sugar: pairing beats fear',
        paragraphs: [
          'White rice on its own spikes faster than rice eaten with beans, vegetables, and protein. The [blood-sugar pairing](/blog/carbohydrates-blood-sugar-pairs) carb article walks through meal templates, and fiber is the quiet partner in each one.',
          'Ultra-processed cereal with 12 g of added sugar is not rescued by 3 g of added inulin on the label.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Practical rule',
            body: [
              'Give every serving of starch a fiber or vegetable to go with it. Juice and soda do not count.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Breakfast oats or lunch bean soup three times weekly. Log outcomes in the [Analyzer](/analyzer) if you track lipids or glucose.',
          'Next: [everyday plate](/blog/fiber-everyday-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '콜레스테롤 관리: 식이섬유의 한계와 실질적 역할',
        paragraphs: [
          '미국 FDA는 포화지방이 적은 식단을 유지하면서 귀리 유래 베타글루칸 수용성 식이섬유를 하루 약 3g 섭취하면 심혈관계 건강 증진에 도움이 된다는 기능성 주장을 승인했습니다. 이는 정제 설탕이나 팜유가 범벅된 오트 쿠키가 아닌, 정제되지 않은 온전한 귀리 식품을 먹었을 때 해당하는 이야기입니다.',
          '여러 임상 시험에서 콩류와 차전자피 섭취가 LDL 콜레스테롤을 낮춘다는 결과가 보고되었습니다. 그러나 이 효과는 보완적인 수준입니다. 이상지질혈증 관리에는 유전적 요인이나 전문 처방 약물(스타틴 등)이 우선하며, 식이섬유 섭취는 생활 습관 개선을 뒷받침하는 든든한 밑거름으로 보셔야 합니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '수용성 식이섬유가 풍부한 추천 식재료',
            headers: ['식품 목록', '체내 작용 기전', '적정 섭취 팁'],
            rows: [
              ['귀리 (오트밀)', '베타글루칸이 담즙산과 결합하여 배출 유도', '조리된 오트밀 1컵'],
              ['콩 및 렌틸콩', '젤 형성 및 장내 균 Fermentation', '하루 반 컵에서 1컵 꾸준히 섭취'],
              ['사과 및 감귤류', '천연 유용성 펙틴 함유', '착즙 주스 대신 껍질째 생과일 섭취'],
              ['보리', '베타글루칸이 풍부한 통곡물', '보리밥 또는 스프나 국에 혼식'],
            ],
          },
        ],
      },
      {
        heading: '혈당 안정: 탄수화물 공포에서 벗어나 현명하게 조합하기',
        paragraphs: [
          '흰 쌀밥만 단독으로 먹으면 채소, 콩류, 양질의 단백질 반찬을 골고루 곁들여 먹을 때보다 체내 혈당 상승 속도가 훨씬 가파릅니다. 앞선 [혈당 조절을 돕는 음식 조합](/blog/carbohydrates-blood-sugar-pairs) 글에서 제안한 식단 구성표를 보면, 식이섬유가 혈당 스파이크를 막는 핵심적인 파트너 역할을 수행함을 알 수 있습니다.',
          '첨가당이 무려 12g이나 들어간 가공 시리얼 제품은 포장지에 식이섬유(이눌린 등) 3g이 추가되었다고 마케팅하더라도 건강한 대안이 될 수 없습니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '실용적인 식사 배합 규칙',
            body: [
              '식단에 전분(밥, 빵, 감자 등)을 올릴 때는 반드시 풍부한 식이섬유나 녹색 채소 반찬을 커플로 매칭하세요. 액상 주스나 설탕이 들어간 음료는 식이섬유 대체재가 될 수 없습니다.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '일주일에 3회 정도는 아침 식사로 오트밀을, 점심 식사로 콩 국물이나 된장찌개의 콩류를 적극적으로 섭취해 보세요. 평소 혈당이나 지질 수치를 추적 중이시라면 [식단 분석기](/analyzer)에 꼼꼼히 일주일을 기록해 보시는 것이 좋습니다.',
          '다음 편: [우리 식탁 속 식이섬유 채우기](/blog/fiber-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'fiber-everyday-plate',
    seriesId: 'fiber',
    episode: 5,
    title: {
      en: 'The US plate: oats, beans, berries, and where fiber hides',
      ko: '우리 식탁의 식이섬유: 전통 식재료와 일상식 속 식이섬유 강화 팁',
    },
    thesis: {
      en: 'A US day can hit 30+ g fiber with oatmeal, lentil soup, avocado toast on whole grain, and berries. It can also fall short if lunch is deli white bread and dinner is chicken only.',
      ko: '한식의 정갈한 밥, 국, 나물 반찬 조합은 다양한 종류의 식이섬유를 손쉽게 제공합니다. 그러나 끼니를 라면이나 가공 빵, 배달 육류 위주로 해결하게 되면 일일 권장량 수준에 한참 미치지 못하게 됩니다.',
    },
    description: {
      en: 'US meal slots for high-fiber staples and common gaps.',
      ko: '하루 식단 속에서 챙겨야 할 풍부한 식이섬유 식품군과 평소 놓치기 쉬운 영양 결핍 구간을 분석합니다.',
    },
    readMinutes: 9,
    datePublished: '2026-07-19',
    relatedSlugs: ['fiber-how-much', 'fiber-gut-microbiome', 'carbohydrates-everyday-plate', 'protein-everyday-plate'],
    en: [
      {
        heading: 'US patterns that miss fiber',
        paragraphs: [
          'Coffee with a pastry adds almost no fiber. A deli sandwich on a white roll skips the beans. Grilled protein with fries puts fries where the vegetables should be.',
          'The fix: one fiber-dense anchor per meal, like oats, bean chili, a side salad with beans, or fruit for dessert.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Three anchors',
            steps: [
              { label: 'Breakfast', note: 'oats or whole-grain toast + berries' },
              { label: 'Lunch', note: 'lentil soup or bean burrito bowl' },
              { label: 'Dinner', note: 'half plate vegetables + brown rice or quinoa' },
            ],
          },
        ],
      },
      {
        heading: 'US everyday fiber map',
        paragraphs: [
          'Portions from the [carbohydrates encyclopedia](/nutrients/carbohydrates) food table.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Meal slots (US)',
            headers: ['Meal', 'Staples', 'Fiber highlight', 'Watch'],
            rows: [
              ['Breakfast', 'Oatmeal + blueberries', '~8–10 g', 'Syrup on oats'],
              ['Lunch', 'Black bean soup + salad', '~12–15 g', 'Creamy soup sodium'],
              ['Dinner', 'Salmon + broccoli + quinoa', '~10 g', 'Fried sides'],
              ['Snack', 'Apple + peanut butter', '~6 g', 'Fiber bar > fruit'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '½', label: 'grains whole when possible' },
              { value: '3×/wk', label: 'bean or lentil meals' },
              { value: '7 days', label: 'Analyzer before powders' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Pick one swap: sugary cereal → oats; lunch chips → carrot + hummus. Compare with [protein everyday plate](/blog/protein-everyday-plate) for pairing.',
          'Next: [supplements & labels](/blog/fiber-supplements-labels).',
        ],
      },
    ],
    ko: [
      {
        heading: '바쁜 일상 식단에서 식이섬유가 유실되는 전형적인 패턴',
        paragraphs: [
          '흰 쌀밥 위주로 식사하면서 채소 반찬이나 나물류를 거의 곁들이지 않으면 섭취하는 식이섬유의 양은 극히 제한됩니다. 특히 점심 식사를 라면이나 떡볶이 같은 탄수화물 위주 간편식으로 떼우고, 저녁 식사는 고기 위주로만 먹는다면 하루 식이섬유 섭취량은 턱없이 부족하게 됩니다.',
          '이를 보완하기 위해 매 끼니마다 섬유질을 보강해 줄 \'식탁 앵커\'를 하나씩 지정해 보세요. 잡곡밥 섞기, 김치나 신선한 나물 반찬 챙기기, 된장국 속 두부나 콩나물 건져 먹기, 미역이나 다시마 같은 해조류 무침 곁들이기 등이 아주 좋은 예입니다.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '하루 세 끼 식이섬유 배치 예시',
            steps: [
              { label: '아침', note: '현미잡곡밥 반 공기 + 제철 나물 반찬' },
              { label: '점심', note: '콩나물이나 두부를 곁들인 국물 + 숙성 김치' },
              { label: '저녁', note: '생선·육류 옆에 해조류 무침이나 채소 반찬 2가지 이상 구성' },
            ],
          },
        ],
      },
      {
        heading: '우리 식탁의 식이섬유 맞춤 가이드',
        paragraphs: [
          '[탄수화물 백과](/nutrients/carbohydrates)의 식품 함량 표를 기반으로 설계한 권장 식단입니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '식이섬유 중심의 균형 잡힌 하루 식단',
            headers: ['끼니', '기본 구성', '식이섬유 핵심 포인트', '식사 요령 및 주의사항'],
            rows: [
              ['아침', '현미잡곡밥 + 겉절이 혹은 나물', '통곡물의 쌀겨 영양소 및 나물의 식이섬유', '김치와 염분 함량 조절'],
              ['점심', '채소 비빔밥 (두부 혹은 콩 포함)', '다양한 제철 나물과 콩 단백질의 섬유', '고추장 양념 속 당분 가미 주의'],
              ['저녁', '맑은 미역국 + 두부 조림 + 나물 반찬', '알긴산이 풍부한 해조류와 콩 단백의 섬유', '튀김류 등 고지방 반찬 과다 주의'],
              ['간식', '사과나 배 (생과일)', '껍질째 섭취 시 펙틴 성분 풍부', '가공 과일주스 형태로 섭취 지양'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '2종+', label: '매 한 끼 채소·해조류 반찬 구성' },
              { value: '주 3회', label: '콩·두부 중심의 메인 끼니 비율' },
              { value: '7일', label: '보충제 구매 전 식단 분석기 활용 권장 기간' },
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '일상에서 가장 쉬운 스왑부터 도전해 보세요. 흰쌀밥을 잡곡밥으로 바꾸거나, 국물에 콩나물이나 삶은 콩을 고명처럼 추가하는 것만으로도 충분합니다. 앞서 다룬 [단백질 중심 식단 분석](/blog/protein-everyday-plate) 가이드를 연계하여 음식을 조합하면 포만감이 극대화되고 혈당도 안정적으로 다스릴 수 있습니다.',
          '다음 편: [식이섬유 보충제의 허와 실, 영양성분표 확인 요령](/blog/fiber-supplements-labels).',
        ],
      },
    ],
  },
  {
    slug: 'fiber-supplements-labels',
    seriesId: 'fiber',
    episode: 6,
    title: {
      en: 'Fiber supplements, "net carbs," and fortified junk food',
      ko: '식이섬유 보충제와 \'순탄수화물\' 마케팅의 함정',
    },
    thesis: {
      en: 'Psyllium and inulin can fill gaps for some people, but they do not replace vegetables; "net carb" labels and fiber-fortified bars often hide sugar and sugar alcohols.',
      ko: '차전자피나 이눌린 같은 식이섬유 분말이 식단의 보조적인 틈새를 메워줄 수는 있지만, 신선한 야채의 역할을 완벽하게 대체하지는 못합니다. 특히 저탄수 \'순탄수화물\' 표기나 섬유질 첨가를 내세운 바 제품에는 종종 액상 과당이나 인공 당알코올이 가려져 있어 주의가 필요합니다.',
    },
    description: {
      en: 'Psyllium, inulin, added-fiber bars, and how to read labels.',
      ko: '차전자피, 이눌린 성분의 특성, 섬유질 강화 스낵 제품군의 주의점, 그리고 스마트한 가공식품 라벨 판독법을 정리합니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-20',
    relatedSlugs: ['fiber-how-much', 'protein-labels-processed', 'carbohydrates-added-sugar', 'fiber-guide'],
    en: [
      {
        heading: 'When supplements make sense',
        paragraphs: [
          'Psyllium husk, mixed with water, has trial evidence for regularity and LDL. Take it with plenty of water, and keep it away from your medications unless your pharmacist says otherwise.',
          'The inulin and chicory root fiber in bars can bring on gas fast. They are tools, not a stand-in for the vegetable drawer.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Supplement vs food',
            headers: ['Source', 'Pros', 'Cons'],
            rows: [
              ['Psyllium', 'LDL, regularity data', 'Choking risk if dry; med timing'],
              ['Inulin in bars', 'Easy grams', 'Gas, often with sugar alcohols'],
              ['Beans & oats', 'Protein, minerals', 'Cooking time'],
            ],
          },
        ],
      },
      {
        heading: '"Net carbs" and fiber claims',
        paragraphs: [
          'Keto products subtract all fiber (and sugar alcohols) from total carbs to print a small "net" number. Your gut still ferments many fibers; sugar alcohols still upset some stomachs.',
          'A bar with 15 g fiber and 12 g sugar alcohol is not a salad. Use the [Analyzer](/analyzer) on real weekly intake.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Label trick',
            body: [
              '"High fiber" on cookies often means isolated fibers plus refined flour and added sugar—check the ingredient list order.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Food first for two weeks. If you still need psyllium, start low and track bloating.',
          'Next: [special diets](/blog/fiber-special-diets).',
        ],
      },
    ],
    ko: [
      {
        heading: '식이섬유 보충제의 적절한 섭취 기준',
        paragraphs: [
          '차전자피(Psyllium Husk) 가루는 물과 섞였을 때 크게 팽창하여 규칙적인 배변과 혈중 콜레스테롤 저하에 도움을 준다는 풍부한 임상 연구가 입증되어 있습니다. 단, 목이 막히지 않도록 물을 동량 대비 다량 마셔야 하며, 다른 의약품의 흡수를 방해할 수 있으므로 약물 복용 시 복약 지도를 받아 시간 조절이 필요합니다.',
          '에너지 바나 쿠키 등에 단골로 첨가되는 이눌린, 치커리 뿌리 추출 섬유 등은 장내 미생물의 빠른 가스 생성을 유도해 복부 팽만감을 일으키기 쉽습니다. 이들은 어디까지나 일시적 도구일 뿐 신선한 채소 칸의 자연 식재료를 대신해 줄 수는 없습니다.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '보충용 분말 vs 자연 식재료 비교',
            headers: ['보완 유형', '기대 가능한 혜택', '잠재적 부작용 및 제한 사항'],
            rows: [
              ['차전자피 분말', 'LDL 콜레스테롤 감소 및 변비 완화 효과', '충분한 수분 없이 복용 시 질식 위험, 타 약물 흡수 방해 가능성'],
              ['이눌린 가미 바류', '바쁜 일상 중 빠르고 간편한 섬유질 수치 보강', '복부 팽만감 및 가스 유발, 인공 감미료 함유'],
              ['콩류 및 오트밀', '식이섬유 외 단백질, 필수 미네랄이 집약된 우수한 식사', '조리 및 준비 시간이 다소 필요'],
            ],
          },
        ],
      },
      {
        heading: '순탄수화물 표기와 가공 스낵의 눈속임',
        paragraphs: [
          '다이어트용이나 키토 스낵 광고를 보면 전체 탄수화물에서 식이섬유와 당알코올 함량을 모두 제외한 뒤 \'순탄수화물(Net Carbs)\'을 아주 미량으로 홍보합니다. 그러나 우리 장내 미생물은 그 섬유질을 발효시키며 칼로리를 유도하고, 과다 섭취한 당알코올 성분은 위장에 자극을 주어 심한 설사나 복통을 일으킬 수도 있습니다.',
          '식이섬유 15g과 당알코올 12g으로 급하게 채워 넣은 가공 간식 바는 자연 유기농 샐러드와 절대 같은 가치를 가질 수 없습니다. 내가 평소 자연 음식을 얼마나 먹는지 [식단 분석기](/analyzer)를 통해 진짜 한 주를 들여다보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '마케팅 라벨의 맹점',
            body: [
              '제과 제품에 적힌 \'고식이섬유 함유\' 문구는 건강에 해로운 정제 밀가루와 첨가당 덩어리에 강제로 가공 분리 섬유를 찔러 넣은 꼼수인 경우가 흔합니다. 포장지 뒷면의 원재료명 기재 순서를 꼭 확인해 보세요.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '우선 2주일간 영양 가득한 자연 음식을 통해 몸에 적응할 시간을 줘 보세요. 그 후에도 식이섬유 보완이 필요하다면 차전자피 분말을 소량씩 안전하게 타서 드셔 보시고, 매번 위장 상태나 소화 반응이 어떠했는지 간단하게 기록해 두는 습관이 좋습니다.',
          '다음 편: [저탄수, 키토제닉, 그리고 과민성 장을 위한 식이섬유 요령](/blog/fiber-special-diets).',
        ],
      },
    ],
  },
  {
    slug: 'fiber-special-diets',
    seriesId: 'fiber',
    episode: 7,
    title: {
      en: 'Fiber on keto, low-carb, and when FODMAPs matter',
      ko: '저탄수 및 키토제닉 식단에서의 식이섬유 섭취법과 FODMAP 가이드',
    },
    thesis: {
      en: 'Low-carb diets can still get fiber from vegetables, nuts, and seeds. Skipping plants entirely, though, trades glucose control for gut and LDL risk. IBS may need personalized FODMAP guidance, not internet fiber challenges.',
      ko: '탄수화물 섭취량을 엄격하게 줄이더라도 아보카도, 견과류, 씨앗류, 녹색 잎채소를 조합하면 필요한 식이섬유를 충분히 확보할 수 있습니다. 장 건강과 혈중 LDL 콜레스테롤 조절을 지키기 위해서는 식탁의 채소들을 통째로 제외하는 우를 범하지 않아야 합니다. 특히 과민성 대장 증후군(IBS)이 있다면 유행하는 고식이섬유 챌린지를 따르기보다 개인의 몸 상태에 맞춰 세밀한 저FODMAP 식단을 짜야 합니다.',
    },
    description: {
      en: 'Vegetables on keto, resistant starch basics, and IBS caution.',
      ko: '키토제닉 식단 하에서 섭취 가능한 녹색 채소류 정보, 조리 및 냉각으로 생기는 저항성 전분의 기본 생리학, 그리고 위장 장애 시 주의해야 할 사항들을 전해 드립니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-21',
    relatedSlugs: ['carbohydrates-myths-special', 'fiber-gut-microbiome', 'fats-myths-special', 'fiber-how-much'],
    en: [
      {
        heading: 'Low-carb is not zero-fiber',
        paragraphs: [
          'Avocado, chia, flax, leafy greens, and cauliflower still count. Many keto plates come up short on fiber because they revolve around cheese and meat with no plants.',
          'Resistant starch forms when some starches cool, like potato and rice, and a portion of it reaches the colon. That is not a license for fried potatoes, though. See [carb myths](/blog/carbohydrates-myths-special).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Lower-carb fiber sources',
            headers: ['Food', 'Fiber', 'Note'],
            rows: [
              ['Avocado (½)', '~5 g', 'Monounsaturated fat too'],
              ['Chia (2 tbsp)', '~10 g', 'Hydrate well'],
              ['Broccoli (1 cup)', '~5 g', 'Volume helps fullness'],
              ['Almonds (1 oz)', '~3.5 g', 'Calorie-dense'],
            ],
          },
        ],
      },
      {
        heading: 'IBS and FODMAP (high level)',
        paragraphs: [
          'Some fibers and fermentables trigger gas in IBS. Low-FODMAP phases are temporary clinical tools—not a permanent ban on plants. Work with a dietitian when symptoms are severe.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Do not self-punish',
            body: [
              'If fiber consistently causes pain, diarrhea, or bleeding, stop guessing and get evaluated.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'On low-carb: add one non-starchy vegetable per meal before buying fiber powder.',
          'Next: [myths FAQ](/blog/fiber-myths-faq).',
        ],
      },
    ],
    ko: [
      {
        heading: '저탄수화물 식단이 곧 식이섬유 섭취 제로(0)를 뜻하지는 않습니다',
        paragraphs: [
          '아보카도, 치아씨드, 아마씨, 녹색 잎채소, 브로콜리 등은 훌륭한 저탄수 식이섬유 식품입니다. 대중적인 가이드 없이 치즈와 붉은 고기로만 가득 채우는 키토 식단은 필연적으로 식이섬유 부족과 장 기능 저하를 동반할 수밖에 없습니다.',
          '일반적인 가이드라인을 보면 감자나 밥을 지은 뒤 차갑게 식히면 소화 효소에 분해되지 않는 \'저항성 전분(Resistant Starch)\'의 비중이 늘어나 대장 속 미생물의 좋은 양식이 됩니다. 그렇다고 해서 기름진 해시 브라운이나 감자튀김이 면죄부를 받는 것은 아니므로, 자세한 오해들은 앞선 [탄수화물 신화와 의학적 고려 사항](/blog/carbohydrates-myths-special) 편을 읽어 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '저탄수화물 고식이섬유 추천 식품',
            headers: ['식품', '식이섬유 함량', '주요 이점 및 주의'],
            rows: [
              ['아보카도 (½개)', '~5g', '단일불포화지방산도 풍부하게 함유'],
              ['치아씨드 (2큰술)', '~10g', '섭취 시 수분을 넉넉히 머금게 하세요'],
              ['브로콜리 (1컵)', '~5g', '낮은 칼로리 대비 풍부한 부피와 포만감'],
              ['아몬드 (28g)', '~3.5g', '에너지 밀도가 높으므로 적정량 섭취'],
            ],
          },
        ],
      },
      {
        heading: '과민성 대장 증후군(IBS)과 FODMAP 식단의 필요성',
        paragraphs: [
          '식이섬유 중 일부 수용성이나 짧은 사슬 형태의 발효성 당질은 과민성 대장 증후군(IBS) 환자의 대장에서 지나치게 빠르게 가스를 발생시켜 심한 복통과 설사, 경련을 부를 수 있습니다. 저FODMAP(포드맵) 식단은 대장을 진정시키기 위한 단기적인 임상 교정용 도구일 뿐, 모든 채소와 식물성 식품을 영구적으로 제한하라는 지침이 아닙니다. 자의로 극단적 차단을 결정하기보다, 전문 의료진 및 영양 치료팀과 연계하여 체계적인 가이드를 받으셔야 합니다.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '무리한 자가 극복 지양하기',
            body: [
              '만약 일상에서 식이섬유를 섭취할 때마다 상습적으로 팽만감, 급격한 배변 장애, 혹은 장 출혈 신호가 반복적으로 관찰된다면 인터넷 요법을 즉각 멈추고 정밀 검사를 받으셔야 합니다.',
            ],
          },
        ],
      },
      {
        heading: '실천 가이드',
        paragraphs: [
          '저탄수화물 식단 중에 무작정 값비싼 가루 보충제부터 장바구니에 담기보다는, 끼니마다 기름지지 않고 푸릇푸릇한 비녹말성 채소를 한 접시씩 먼저 올려 소화기관의 기초를 다져 보세요.',
          '다음 편: [식이섬유에 관한 대중적인 오해와 팩트 체크 FAQ](/blog/fiber-myths-faq).',
        ],
      },
    ],
  },
  {
    slug: 'fiber-myths-faq',
    seriesId: 'fiber',
    episode: 8,
    title: {
      en: 'Fiber myths: quitting fruit, infinite grams, and juice vs whole food',
      ko: '식이섬유에 관한 오해: 과일 섭취에 대한 공포, 무작정 과다 섭취의 맹점, 착즙 주스의 진실',
    },
    thesis: {
      en: 'Whole fruit is not the enemy of glucose control. Megadoses of isolated fiber can backfire, and juice strips out the very material this series is about.',
      ko: '가공하지 않은 생과일은 결코 건강한 혈당 조절의 걸림돌이 아닙니다. 오히려 정제 및 가공 분리 섬유를 지나치게 많이 섭취하면 복부 가스 등 부작용이 생기며, 착즙 주스는 알맹이가 걸러져 이 시리즈의 핵심 주인공인 유익한 식이섬유를 완전히 잃어버리게 됩니다.',
    },
    description: {
      en: 'FAQ on fruit fear, constipation, pregnancy, and when to see a clinician.',
      ko: '생과일 섭취에 따르는 두려움 해결, 변비 예방을 위한 기본 수칙, 임신 기간의 생리학적 변화, 그리고 의사의 처방이 필요한 경고 증상들을 알아봅니다.',
    },
    readMinutes: 8,
    datePublished: '2026-07-22',
    relatedSlugs: ['fiber-guide', 'carbohydrates-fiber', 'dopamine-stimulants', 'fiber-supplements-labels'],
    en: [
      {
        heading: 'Myth: fruit is "too much sugar"',
        paragraphs: [
          'A medium apple delivers fiber and polyphenols; apple juice does not. Fear of fruit while drinking sweet coffee is backwards.',
          'Berries are especially fiber-dense per calorie. Pair with [protein](/blog/protein-animal-vs-plant) if you want steadier energy.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Myth vs reality',
            headers: ['Claim', 'Reality'],
            rows: [
              ['Skip all fruit', 'Whole fruit often helps goals'],
              ['More fiber = always better', 'Gas, meds, IBS caps'],
              ['Juice counts', 'Fiber stripped; faster sugar'],
              ['Only supplements count', 'Plants win for diversity'],
            ],
          },
        ],
      },
      {
        heading: 'Constipation, pregnancy, and clinics',
        paragraphs: [
          'Fiber, water, and movement help many people. But sudden constipation with blood or weight loss needs a real evaluation, not just more bran.',
          'Pregnancy often calls for more fiber and fluids, and iron supplements tend to worsen constipation, so coordinate with your prenatal care.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'When to escalate',
            body: [
              'Persistent pain, vomiting, black stool, or no response after two weeks of gradual fiber increase—see a clinician.',
            ],
          },
        ],
      },
      {
        heading: 'Series close',
        paragraphs: [
          'Start at the [fiber guide](/blog/fiber-guide), or log a week and fix one meal. Sweet drinks connect to [dopamine stimulants](/blog/dopamine-stimulants), and pairing them with fiber softens the crash.',
          'Encyclopedia: [carbohydrates](/nutrients/carbohydrates).',
        ],
      },
    ],
    ko: [
      {
        heading: '흔한 오해: 과일은 당류가 높아 혈당 관리에 나쁘다?',
        paragraphs: [
          '생과일인 사과를 통째로 아삭하게 씹어 먹으면 풍부한 천연 식이섬유와 껍질 속 유익한 폴리페놀을 온전히 섭취하게 되지만, 사과 주스로 과즙만 먹으면 그렇지 못합니다. 영양가가 뛰어난 생과일 섭취는 강박적으로 피하면서, 정작 당류 가득한 카페 시럽 음료를 즐겨 드시는 것은 우선순위가 크게 어긋난 행동입니다.',
          '특히 블루베리나 라즈베리 같은 베리류는 칼로리 밀도 대비 식이섬유 비율이 대단히 높습니다. 만약 한층 더 잔잔하고 안정적인 혈당 그래프와 활기찬 일상의 활력을 원하신다면, 생베리류를 드실 때 [식물성 및 동물성 단백질 조합 가이드](/blog/protein-animal-vs-plant)를 참고하여 단백질 식품을 약간 곁들여 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '식이섬유에 대한 진실 혹은 거짓',
            headers: ['흔한 오해(통념)', '과학적 사실'],
            rows: [
              ['다이어트를 위해 모든 과일을 전면 배제해야 한다', '가공되지 않은 신선한 생과일은 건강과 혈당 안정 모두에 긍정적인 파트너입니다'],
              ['식이섬유는 다량 섭취할수록 무조건 유익하다', '과다 섭취 시 과도한 가스 발생, 의약품 흡수율 간섭, 과민성 장 증상 악화 등의 제약이 따릅니다'],
              ['과일 주스나 착즙 주스도 똑같은 효과를 낸다', '착즙 시 소화 및 흡수 차단막 역할을 하던 섬유질이 대부분 걸러지며 혈중 당분 수치를 가파르게 올립니다'],
              ['가루나 약 형태의 보충제가 더 확실하다', '다양한 자연 유기농 식물을 통한 고른 음식 섭취가 장내 생태계의 다양성을 가꾸는 진정한 열쇠입니다'],
            ],
          },
        ],
      },
      {
        heading: '일상 변비 해결, 임신 기간의 조율, 진료 요령',
        paragraphs: [
          '풍부한 식이섬유 식단에 따뜻한 수분 보충, 그리고 적절한 신체 활동을 조화롭게 일상에 입혀주면 많은 만성 불편감들이 말끔히 해소됩니다. 다만 평소와 달리 갑자기 배변 패턴이 급변하거나 혈변, 설명할 수 없는 체중 감소가 병행된다면, 귀리 겨를 늘릴 것이 아니라 즉시 신뢰할 수 있는 병원에 방문하셔야 합니다.',
          '임신 기간에는 체내 생리적 변화로 소화 속도가 늘어지기 때문에 충분한 식이섬유와 맑은 물이 더욱 많이 요구됩니다. 만약 임신부 필수 처방약인 철분 보충제 복용 후 변비가 가팔라졌다면, 자의로 조절하기보다 담당 산전 진료진과 약 복용 스케줄이나 처방약 변경을 적극 논의하세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '즉각적인 내원이 필요한 적신호',
            body: [
              '극심한 복부 통증, 잦은 구토나 오심, 흑색 융털성 변(짜장색 변)이 관찰되거나, 2주 이상 점진적으로 식이섬유와 물을 충분히 보강했음에도 아무런 진전이나 반응이 없는 경우에는 지체 없이 내원하셔야 합니다.',
            ],
          },
        ],
      },
      {
        heading: '시리즈를 마치며',
        paragraphs: [
          '가장 먼저 [식이섬유 시리즈 허브 문서](/blog/fiber-guide)를 훑어보거나, 평소 본인의 식단을 조용히 한 주 동안 기록해 본 뒤 우선 딱 한 끼 식단의 질만 업그레이드해 보세요. 당분 가득한 음료 습관은 [도파민 자극제의 보상 루프](/blog/dopamine-stimulants)와 깊게 결합하지만, 건강한 식이섬유를 식단에 단단히 페어링하면 당 떨어질 때 겪게 되는 피로와 급격한 무기력함(슈가 크래시)을 한층 부드럽게 지켜줍니다.',
          '종합 가이드북: [탄수화물 백과사전](/nutrients/carbohydrates).',
        ],
      },
    ],
  },
];
