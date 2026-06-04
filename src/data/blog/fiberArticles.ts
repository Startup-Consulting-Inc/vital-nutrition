import type { BlogArticle } from './types';

export const fiberArticles: BlogArticle[] = [
  {
    slug: 'fiber-guide',
    seriesId: 'fiber',
    episode: 1,
    title: {
      en: 'Dietary fiber: the carb your gut eats, and why everyone keeps talking about it',
      ko: '식이섬유: 내가 안 먹고 장이 먹는 탄수, 왜 자꾸 이야기되는지',
    },
    thesis: {
      en: 'Fiber is a carbohydrate you do not fully digest, yet it steadies blood sugar, feeds gut bacteria, and shows up in beans, oats, and whole fruit—not in juice or white flour.',
      ko: '섬유는 완전히 소화되진 않지만 혈당을 안정시키고 장내미생물을 먹이고, 콩·귀리·과일 통째에는 있지만 주스·흰밀가루에는 거의 없어요.',
    },
    description: {
      en: 'A hub on soluble vs insoluble fiber, daily targets, and the eight-part series map.',
      ko: '수용성·불용성, 하루 목표, 8편 지도를 허브로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-07-15',
    relatedSlugs: ['fiber-how-much', 'fiber-gut-microbiome', 'fiber-everyday-plate', 'carbohydrates-fiber'],
    en: [
      {
        heading: 'What fiber actually is',
        paragraphs: [
          'Fiber is plant material your small intestine cannot fully break down into glucose. Some of it ferments in the colon, where bacteria turn it into short-chain fats that support the gut lining.',
          'That makes fiber a carb on labels—but not a sugar spike. The [carbohydrates encyclopedia](/nutrients/carbohydrates) lists high-fiber staples; the short [carbohydrates & fiber](/blog/carbohydrates-fiber) piece in the carb series is a quick intro. This series goes deeper.',
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
          'Soluble fiber dissolves in water and forms gels—think oats, beans, apples. It can slow digestion and bind bile, which matters for LDL cholesterol in many people.',
          'Insoluble fiber does not gel—it adds bulk for regularity. Whole wheat bran, vegetables, and nuts lean here. Real meals mix both.',
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
        heading: '섬유가 뭔지',
        paragraphs: [
          '섬유는 소장에서 포도당으로 완전히 안 쪼개지는 식물 성분이에요. 일부는 대장에서 발효되고, 장내미생물이 짧은 지방산을 만들어 장 점막을 돕기도 해요.',
          '라벨엔 탄수화물이지만 혈당 스파이크는 아니에요. [탄수화물 백과](/nutrients/carbohydrates)에 섬유 많은 음식이 있고, 탄수 시리즈 [3편](/blog/carbohydrates-fiber)이 짧은 입문이에요. 여기서는 더 깊게 갈게요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억한다면',
            body: [
              '섬유는 장 밥이자 빠른 탄수 브레이크예요. 대부분은 통째 식물이 가루 보충제보다 낫습니다.',
            ],
          },
        ],
      },
      {
        heading: '수용성 vs 불용성(교과서 말고)',
        paragraphs: [
          '수용성은 물에 녹아 젤을 만들어요—귀리, 콩, 사과. 소화를 늦추고 담즙과 붙어 LDL에 도움이 되는 경우가 많아요.',
          '불용성은 젤이 안 돼요—배변량·포만감. 통밀 겨, 채소, 견과. 실제 식사는 둘 다 섞여 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '두 종류, 한 접시',
            headers: ['종류', '예', '자주 도움 되는 것'],
            rows: [
              ['수용성', '귀리, 렌틸, 감귤', '혈당 곡선, LDL'],
              ['불용성', '겨, 잎채소, 팝콘', '배변, 포만'],
              ['둘 다', '콩, 베리, 아보카도', '장·대사'],
            ],
          },
        ],
      },
      {
        heading: '시리즈 지도',
        paragraphs: [
          '다음은 하루 그램, 장내미생물, 콜레스테롤·혈당, 일상 식탁(영어는 미국, 한국어는 한국), 보충제, 특수 식단, 오해 순이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[하루 섬유 몇 g](/blog/fiber-how-much)'],
              ['3편', '[장내미생물·프리바이오틱](/blog/fiber-gut-microbiome)'],
              ['4편', '[섬유·콜레스테롤·혈당](/blog/fiber-cholesterol-glucose)'],
              ['5편', '[한국 식탁](/blog/fiber-everyday-plate)'],
              ['탄수 3편', '[탄수 시리즈 섬유 입문](/blog/carbohydrates-fiber)'],
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
      ko: '하루 식이섬유 몇 g? 대부분이 모자라는 이유',
    },
    thesis: {
      en: 'General guidelines land near 25 g for women and 38 g for men under 50, with slightly lower targets after 50—yet typical Western intakes often sit near half that unless beans and whole grains show up often.',
      ko: '일반 가이드는 50세 미만 여성 약 25g·남성 약 38g, 50세 이후는 조금 낮아요. 그런데 통곡·콩이 없으면 실제 섭취는 절반 근처인 경우가 많아요.',
    },
    description: {
      en: 'Age and sex targets, how to estimate intake, and ramp-up without bloating.',
      ko: '나이·성별 목표, 대략 계산, 복부 팽만 없이 늘리는 법.',
    },
    readMinutes: 8,
    datePublished: '2026-07-16',
    relatedSlugs: ['fiber-guide', 'fiber-gut-microbiome', 'fiber-everyday-plate', 'carbohydrates-how-much'],
    en: [
      {
        heading: 'Guideline numbers (not a contest)',
        paragraphs: [
          'U.S. Dietary Guidelines and NIH materials commonly cite about 14 g fiber per 1,000 kcal, with many adults aiming for 25–38 g depending on age and sex. Kids need less; pregnancy may need more—personalize with a clinician.',
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
          'One cup cooked lentils carries about 16 g fiber in our encyclopedia table; half cup chickpeas about 6 g; a medium apple about 4 g. Two cups of salad greens might add only 2–3 g—volume without density.',
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
        heading: '가이드 숫자(시합 아님)',
        paragraphs: [
          '미국·NIH 자료는 대략 1,000kcal당 14g, 성인은 나이·성별에 따라 25–38g을 말하는 경우가 많아요. 아이는 더 적고, 임신은 더 필요할 수 있어요—진료와 맞추세요.',
          '섬유 바 하나로 하루를 채운 것과, 일주일 내내 콩·채소·통과일을 먹는 건 달라요.',
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
          '렌틸 1컵 약 16g, 병아리콩 반 컵 약 6g, 사과 한 개 약 4g—백과 표예요. 샐러드 2컵은 2–3g만 될 수 있어요. 양은 많은데 밀도는 낮을 수 있어요.',
          '보충제 사기 전 [분석기](/analyzer)에 일주일 기록해 보세요. 저녁만 괜찮고 아침 채소가 비어 있을 수도 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '섬유 밀도 높은 앵커',
            headers: ['음식', '대략 섬유', '메모'],
            rows: [
              ['렌틸 1컵', '~16g', '단백·철'],
              ['검은콩 ½컵', '~7–8g', '비타민 C와'],
              ['귀리 1컵', '~4g', '베타글루칸'],
              ['치아 2큰술', '~10g', '오메가3 ALA'],
            ],
          },
        ],
      },
      {
        heading: '고통 없이 늘리기',
        paragraphs: [
          '한 번에 20g이 아니라 주당 3–5g씩. 섬유 늘리면 물도 같이. 가스는 보통 적응되면 줄어요—[장내미생물](/blog/fiber-gut-microbiome) 참고.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '더 많다고 항상 좋은 건 아님',
            body: [
              'IBS, 급성 악화, 수술 후 식단은 저FODMAP·진료 가이드가 필요할 수 있어요—무작정 고섬유 도전은 피하세요.',
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
      ko: '섬유·장내미생물·김치 헤드라인은 반만 맞는 이유',
    },
    thesis: {
      en: 'Prebiotic fiber feeds bacteria that ferment food into short-chain fats; fermented foods add microbes—but diversity comes from many plants, not one miracle spoon.',
      ko: '프리바이오틱 섬유는 발효·단쇄지방산을 돕고, 발효식품은 균을 더해요. 다양성은 한 숟가락 기적보다 여러 식물에서 나와요.',
    },
    description: {
      en: 'Prebiotics vs probiotics, bloating when you increase fiber, and fermented foods in context.',
      ko: '프리·프로바이오틱, 섬유 늘릴 때 가스, 발효식품 위치.',
    },
    readMinutes: 8,
    datePublished: '2026-07-17',
    relatedSlugs: ['fiber-how-much', 'fiber-guide', 'fiber-supplements-labels', 'vitamins-how-they-work'],
    en: [
      {
        heading: 'Prebiotic vs probiotic (plain language)',
        paragraphs: [
          'Prebiotics are fibers and polyphenols bacteria can ferment—onions, garlic, oats, beans. Probiotics are live microbes in yogurt, kefir, sauerkraut, kimchi.',
          'You need both lanes over time: fiber to feed what is already there, fermented foods to add strains. Neither replaces vegetables.',
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
          'Sudden bean portions shock a low-fiber gut. Smaller servings, rinsed canned beans, and cooking lentils thoroughly help. So does consistency for two weeks before you judge.',
          'If pain, blood, or weight loss appears, that is a clinic visit—not a fiber challenge.',
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
        heading: '프리바이오틱 vs 프로바이오틱',
        paragraphs: [
          '프리바이오틱은 미생물이 먹는 섬유·폴리페놀—양파, 마늘, 귀리, 콩. 프로바이오틱은 요거트·케피르·김치·된장 속 살아 있는 균.',
          '둘 다 시간이 필요해요. 섬유는 있는 균을 먹이고, 발효식품은 균을 더해요. 둘 다 채소를 대신하진 않아요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '대장에서 일어나는 일',
            steps: [
              { label: '섬유 도착', note: '수용성·저항성 전분' },
              { label: '발효', note: '초반 가스는 흔함' },
              { label: '단쇄지방산', note: '부티르산 등' },
            ],
          },
        ],
      },
      {
        heading: '늘릴 때 더부룩함',
        paragraphs: [
          '갑자기 콩을 많이 먹으면 섬유 낮은 장이 놀라요. 양을 줄이고, 통조림 콩은 헹구고, 렌틸은 충분히 익히면 도움이 돼요. 2주는 꾸준히 해 보고 판단하세요.',
          '통증·혈변·체중 감소가 있으면 병원이지 섬유 챌린지가 아니에요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '실전 램프',
            body: [
              '1주: 점심 채소 한 접시. 2주: 콩 반 컵 주 3회. 3주: 정제 곡물 하나 통곡으로. 매 단계에 물.',
            ],
          },
        ],
      },
      {
        heading: '발효식품, 과장 말고',
        paragraphs: [
          '김치·요거트는 나트륨·당 예산 안에서 다양성에 도움이 될 수 있어요. 일주일 초가공 스낵을 지우진 못해요.',
          '다음: [콜레스테롤·혈당](/blog/fiber-cholesterol-glucose).',
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
      ko: '섬유가 LDL·혈당에 닿는 방식',
    },
    thesis: {
      en: 'Soluble fiber from oats and beans can lower LDL modestly in many people; pairing carbs with fiber and protein blunts glucose spikes better than memorizing glycemic index tables.',
      ko: '귀리·콩의 수용성 섬유는 LDL을 완만히 낮추는 경우가 많고, 탄수에 섬유·단백을 붙이는 게 GI 외우기보다 혈당에 실용적이에요.',
    },
    description: {
      en: 'Beta-glucan, legumes, and meal pairing—links to the carb blood-sugar piece.',
      ko: '베타글루칸, 콩류, 끼니 짝짓기—탄수 혈당 글과 연결.',
    },
    readMinutes: 8,
    datePublished: '2026-07-18',
    relatedSlugs: ['fiber-guide', 'carbohydrates-blood-sugar-pairs', 'fats-saturated', 'fiber-how-much'],
    en: [
      {
        heading: 'Cholesterol: what fiber can and cannot do',
        paragraphs: [
          'FDA allows a heart-health claim for beta-glucan soluble fiber from oats at roughly 3 g per day as part of a low-saturated-fat diet. That is food-scale chemistry, not a magic oat cookie with palm oil.',
          'Beans and psyllium also show LDL-lowering patterns in trials—effects are real but modest. Statins and genetics still matter; fiber is a plate strategy.',
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
          'White rice alone spikes faster than rice with beans, vegetables, and protein. The [blood-sugar pairing](/blog/carbohydrates-blood-sugar-pairs) carb article walks meal templates; fiber is the quiet partner.',
          'Ultra-processed cereal with 12 g added sugar is not saved by 3 g added inulin on the label.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Practical rule',
            body: [
              'Every starch serving gets a fiber or vegetable co-star. Juice and soda do not count.',
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
        heading: '콜레스테롤: 섬유가 할 수 있는 것',
        paragraphs: [
          '귀리 베타글루칸 수용성 섬유는 하루 약 3g·포화지방 낮은 식단 맥락에서 심혈관 주장이 있어요. 팜유 든 오트 쿠키가 아니라 음식 규모예요.',
          '콩·차전자피도 LDL 연구가 있지만 효과는 완만해요. 스타틴·유전도 중요하고, 섬유는 식탁 전략이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '수용성 섬유 동맹',
            headers: ['음식', '메커니즘', '분량 아이디어'],
            rows: [
              ['귀리', '베타글루칸·담즙', '끓인 오트 1컵'],
              ['콩', '젤·발효', '반~1컵 자주'],
              ['사과·감귤', '펙틴', '통과일, 주스 X'],
              ['보리', '베타글루칸', '국·샐러드'],
            ],
          },
        ],
      },
      {
        heading: '혈당: 공포보다 짝짓기',
        paragraphs: [
          '백미만 먹으면 콩·채소·단백 붙은 밥보다 빨라요. [혈당 짝짓기](/blog/carbohydrates-blood-sugar-pairs) 탄수 글이 끼니 템플릿을 주고, 섬유는 조용한 파트너예요.',
          '첨가당 12g 시리얼은 라벨에 이눌린 3g이 있어도 구원 못 해요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '실전 규칙',
            body: [
              '전분 한 접시마다 섬유·채소 공연 파트너. 주스·소다는 해당 없음.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '아침 귀리나 점심 콩국 주 3회. 지질·혈당 추적하면 [분석기](/analyzer)에 기록해 보세요.',
          '다음: [일상 식탁](/blog/fiber-everyday-plate).',
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
      ko: '한국 식탁: 밥·김치·나물·콩으로 섬유 채우기',
    },
    thesis: {
      en: 'A US day can hit 30+ g fiber with oatmeal, lentil soup, avocado toast on whole grain, and berries—while still missing fiber if lunch is deli white bread and dinner is chicken only.',
      ko: '밥·국·반찬이면 섬유가 나뉘어 들어와요. 라면·빵만 점심이면 그램은 여전히 부족할 수 있어요.',
    },
    description: {
      en: 'US meal slots for high-fiber staples and common gaps.',
      ko: '한국 끼니별 섬유 앵커와 빈 구간.',
    },
    readMinutes: 9,
    datePublished: '2026-07-19',
    relatedSlugs: ['fiber-how-much', 'fiber-gut-microbiome', 'carbohydrates-everyday-plate', 'protein-everyday-plate'],
    en: [
      {
        heading: 'US patterns that miss fiber',
        paragraphs: [
          'Coffee and a pastry breakfast adds almost zero fiber. Lunch deli sandwich on white roll skips beans. Dinner grilled protein with fries replaces vegetables.',
          'Fix: one fiber-dense anchor per meal—oats, bean chili, side salad with beans, fruit dessert.',
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
        heading: '한국 식탁에서 섬유가 비는 패턴',
        paragraphs: [
          '밥만 크고 나물·김치가 없으면 섬유가 밥에만 기대요. 라면·떡볶이 점심, 고기만 저녁이면 그램이 부족해요.',
          '끼니마다 앵커 하나—김치·나물, 콩국·두부, 해조 무침, 통곡 일부.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '끼니 앵커',
            steps: [
              { label: '아침', note: '현미·잡곡밥 + 나물 소량' },
              { label: '점심', note: '된장국·콩나물 + 김치' },
              { label: '저녁', note: '반찬 3종 중 2종은 채소·해조' },
            ],
          },
        ],
      },
      {
        heading: '한국 일상 섬유 지도',
        paragraphs: [
          '[탄수화물 백과](/nutrients/carbohydrates) 음식표 기준으로 잡았어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '끼니 (한국)',
            headers: ['끼니', '골격', '섬유 포인트', '주의'],
            rows: [
              ['아침', '잡곡밥 + 김치', '배아·채소', '김치 나트륨'],
              ['점심', '비빔밥 + 나물', '콩·채소', '양념당'],
              ['저녁', '미역국 + 두부·나물', '해조·콩', '튀김 반찬'],
              ['간식', '사과·배 통째', '펙틴', '주스'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '2종+', label: '채소·김치 반찬' },
              { value: '주 3회', label: '콩·두부 끼니' },
              { value: '7일', label: '분석기 후 보충제' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '백미 한 끼를 잡곡으로, 국에 렌틸·콩나물 추가. [단백질 식탁](/blog/protein-everyday-plate)과 짝지으면 혈당도 안정돼요.',
          '다음: [보충제·라벨](/blog/fiber-supplements-labels).',
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
      ko: '섬유 보충제, 순탄수 마케팅, 섬유 강화 가공식품',
    },
    thesis: {
      en: 'Psyllium and inulin can fill gaps for some people, but they do not replace vegetables; "net carb" labels and fiber-fortified bars often hide sugar and sugar alcohols.',
      ko: '차전자피·이눌린은 빈틈을 메울 수 있지만 채소 대체는 아니고, 순탄수·섬유 강화 바는 당·당알코올을 숨기기 쉬워요.',
    },
    description: {
      en: 'Psyllium, inulin, added-fiber bars, and how to read labels.',
      ko: '차전자피, 이눌린, 섬유 바, 라벨 읽기.',
    },
    readMinutes: 8,
    datePublished: '2026-07-20',
    relatedSlugs: ['fiber-how-much', 'protein-labels-processed', 'carbohydrates-added-sugar', 'fiber-guide'],
    en: [
      {
        heading: 'When supplements make sense',
        paragraphs: [
          'Psyllium husk (mixed with water) has evidence for regularity and LDL in some trials—take with plenty of water, away from medications unless your pharmacist says otherwise.',
          'Inulin and chicory root fiber in bars can cause gas fast. They are tools, not a vegetable drawer.',
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
        heading: '보충제가 맞는 때',
        paragraphs: [
          '차전자피(물에 타기)는 배변·LDL 연구가 있어요. 물 충분히, 약 시간은 약사와—',
          '바에 넣은 이눌린·치커리 섬유는 가스가 빨라요. 도구일 뿐 채소 서랍이 아니에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '보충 vs 음식',
            headers: ['출처', '장점', '단점'],
            rows: [
              ['차전자피', 'LDL·배변', '마르게 먹으면 위험·약 시간'],
              ['바 이눌린', '그램 채우기 쉬움', '가스·당알코올'],
              ['콩·귀리', '단백·미네랄', '조리 시간'],
            ],
          },
        ],
      },
      {
        heading: '순탄수·섬유 표시',
        paragraphs: [
          '케토 제품은 섬유·당알코올을 빼서 순탄수를 작게 써요. 장은 여전히 발효하고, 당알코올은 배 아픈 사람도 있어요.',
          '섬유 15g·당알코올 12g 바는 샐러드가 아니에요. [분석기](/analyzer)에 일주일 실제 식단을 넣어 보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '라벨 함정',
            body: [
              '쿠키 "고섬유"는 분리 섬유+정제밀+첨가당인 경우가 많아요—원재료 순서를 보세요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '2주는 음식 먼저. 그래도 필요하면 차전자피 소량부터, 더부룩함 기록.',
          '다음: [특수 식단](/blog/fiber-special-diets).',
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
      ko: '저탄수·케토·FODMAP일 때 섬유는 어떻게',
    },
    thesis: {
      en: 'Low-carb diets can still get fiber from vegetables, nuts, and seeds—but skipping plants entirely trades glucose control for gut and LDL risk; IBS may need personalized FODMAP guidance, not internet fiber challenges.',
      ko: '저탄수도 채소·견과·씨로 섬유를 채울 수 있지만 식물을 통째로 빼면 장·LDL 리스크가 커져요. IBS는 인터넷 챌린지보다 FODMAP·진료 맞춤이 필요해요.',
    },
    description: {
      en: 'Vegetables on keto, resistant starch basics, and IBS caution.',
      ko: '케토 채소, 저항성 전분, IBS 주의.',
    },
    readMinutes: 8,
    datePublished: '2026-07-21',
    relatedSlugs: ['carbohydrates-myths-special', 'fiber-gut-microbiome', 'fats-myths-special', 'fiber-how-much'],
    en: [
      {
        heading: 'Low-carb is not zero-fiber',
        paragraphs: [
          'Avocado, chia, flax, leafy greens, and cauliflower still count. Many keto plates under-fiber because they center cheese and meat without plants.',
          'Resistant starch forms when some starches cool (potato, rice)—some reaches the colon. It is not a license for fried potatoes; see [carb myths](/blog/carbohydrates-myths-special).',
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
        heading: '저탄수≠섬유 0',
        paragraphs: [
          '아보카도, 치아, 아마, 잎채소, 브로콜리는 해당돼요. 치즈·고기만 중심인 케토는 섬유가 부족한 경우가 많아요.',
          '저항성 전분은 감자·밥이 식었을 때 일부 생성—튀김 감자 면책은 아니에요. [저탄수 오해](/blog/carbohydrates-myths-special) 참고.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '저탄수 섬유원',
            headers: ['음식', '섬유', '메모'],
            rows: [
              ['아보카도 ½개', '~5g', '지방도'],
              ['치아 2큰술', '~10g', '물 충분히'],
              ['브로콜리 1컵', '~5g', '포만'],
              ['아몬드 28g', '~3.5g', '칼로리'],
            ],
          },
        ],
      },
      {
        heading: 'IBS·FODMAP(개요)',
        paragraphs: [
          '섬유·발효 탄수가 IBS에서 가스를 유발할 수 있어요. 저FODMAP은 임시 임상 도구지 영구 채소 금지가 아니에요. 증상 심하면 영양사·진료와.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '혼자 벌주기 금지',
            body: [
              '섬유가 매번 통증·설사·혈변을 유발하면 추측을 멈추고 검사 받으세요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '저탄수라면 가루 사기 전 끼니마다 채소 한 종목.',
          '다음: [오해 FAQ](/blog/fiber-myths-faq).',
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
      ko: '섬유 오해: 과일 끊기, 무한 섬유, 주스=과일',
    },
    thesis: {
      en: 'Whole fruit is not the enemy of glucose control; megadoses of isolated fiber can hurt; juice strips the very material this series is about.',
      ko: '통과일은 혈당의 적이 아니고, 분리 섬유 과다는 배만 아플 수 있어요. 주스는 이 시리즈가 말하는 재료를 빼요.',
    },
    description: {
      en: 'FAQ on fruit fear, constipation, pregnancy, and when to see a clinician.',
      ko: '과일 공포, 변비, 임신, 진료가 필요한 때 FAQ.',
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
          'Fiber plus water plus movement helps many people; sudden constipation with blood or weight loss needs evaluation—not only bran.',
          'Pregnancy often needs more fiber and fluids; iron supplements worsen constipation—coordinate prenatal care.',
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
          'Start at [fiber guide](/blog/fiber-guide) or log a week and fix one meal. Sweet drinks tie to [dopamine stimulants](/blog/dopamine-stimulants)—fiber pairs help the crash.',
          'Encyclopedia: [carbohydrates](/nutrients/carbohydrates).',
        ],
      },
    ],
    ko: [
      {
        heading: '오해: 과일은 "당이 너무 많다"',
        paragraphs: [
          '사과 통째는 섬유·폴리페놀, 주스는 아니에요. 과일은 피하고 달콤 커피만 마시는 건 거꾸로예요.',
          '베리는 칼로리 대비 섬유가 좋아요. 에너지 안정은 [단백질](/blog/protein-animal-vs-plant)과 짝지어도 돼요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '오해 vs 현실',
            headers: ['주장', '현실'],
            rows: [
              ['과일 전부 끊기', '통과일은 목표에 도움 되는 경우 많음'],
              ['섬유 많을수록 항상 좋다', '가스·약·IBS 한계'],
              ['주스도 된다', '섬유 제거·당 빠름'],
              ['보충제만', '식물 다양성이 이김'],
            ],
          },
        ],
      },
      {
        heading: '변비, 임신, 진료',
        paragraphs: [
          '섬유+물+움직임은 많은 사람에게 도움이 돼요. 혈변·체중 감소 동반 급변은 검사—겨만으로 끝내지 마세요.',
          '임신은 섬유·수분 더 필요할 수 있어요. 철제가 변비를 키우면 산전 진료와 맞추세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '병원 가야 할 때',
            body: [
              '통증·구토·검은 변, 2주 천천히 늘렸는데도 반응 없음—진료 받으세요.',
            ],
          },
        ],
      },
      {
        heading: '마무리',
        paragraphs: [
          '[섬유 허브](/blog/fiber-guide)부터, 또는 일주일 기록 후 끼니 하나 고치기. 단 음료는 [도파민 자극제](/blog/dopamine-stimulants)와 연결—섬유 짝이 추락을 부드럽게 해요.',
          '백과: [탄수화물](/nutrients/carbohydrates).',
        ],
      },
    ],
  },
];
