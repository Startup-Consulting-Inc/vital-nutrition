import type { BlogArticle } from './types';

export const proteinArticles: BlogArticle[] = [
  {
    slug: 'protein-guide',
    seriesId: 'protein',
    episode: 1,
    title: {
      en: 'Protein: what it builds, and why grams per day matter more than timing hacks',
      ko: '단백질이 만드는 것, 타이밍보다 하루 그램이 먼저인 이유',
    },
    thesis: {
      en: 'Protein is not just muscle fuel. It supplies amino acids for repair, enzymes, antibodies, and transport—and most adults meet needs with ordinary food spread across the day.',
      ko: '단백질은 근육 연료만이 아니에요. 수리·효소·항체·운반에 쓰이는 아미노산을 주고, 대부분은 하루에 골고루 먹는 평범한 음식으로 충분해요.',
    },
    description: {
      en: 'A hub on protein roles, essential amino acids, complete vs incomplete proteins, and where the eight-part series goes next.',
      ko: '단백질 역할, 필수아미노산, 완전·불완전 단백질, 이어지는 글 지도를 허브로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-12',
    relatedSlugs: ['protein-how-much', 'protein-amino-acids', 'protein-everyday-plate', 'protein-animal-vs-plant'],
    en: [
      {
        heading: 'What protein does (beyond the gym)',
        paragraphs: [
          'Protein is often sold as a physique ingredient. In the body it is broader: structural material for muscle, bone, skin, and organs; enzymes that run chemistry; antibodies; hemoglobin and other carriers. Every cell uses it.',
          'You do not store protein like fat. You turn food protein into amino acids, then rebuild what you need. That is why steady intake from real food beats chasing a single "super protein" food.',
          'The [protein encyclopedia](/nutrients/proteins) lists functions, deficiency signs, and food tables. This series walks the ideas in order without replacing labs or medical care.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'The one line to keep',
            body: [
              'Protein maintains the body; it is not a sugar-style energy spike. Enough grams from varied sources usually comes before timing tricks.',
            ],
          },
        ],
      },
      {
        heading: 'Amino acids in plain language',
        paragraphs: [
          'Proteins are chains of twenty amino acids. Nine are "essential"—your diet must supply them. Animal foods and a few plants (soy, quinoa) often deliver complete sets; grains and beans mix well (rice + beans, hummus + pita).',
          'Your brain makes dopamine from tyrosine, an amino acid from protein. That pathway is detailed in the [dopamine series](/blog/dopamine-guide); here we focus on total protein and food patterns.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Jobs protein does in the body',
            headers: ['Role', 'Why it matters', 'Food angle'],
            rows: [
              ['Structure', 'Muscle, skin, bone repair', 'Fish, poultry, legumes, eggs'],
              ['Enzymes', 'Digestion, metabolism', 'Spread intake across meals'],
              ['Immune', 'Antibody production', 'Do not crash-diet protein'],
              ['Transport', 'Oxygen via hemoglobin', 'Iron partners in [minerals](/nutrients/minerals)'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '20', label: 'amino acids in human proteins' },
              { value: '9', label: 'essential—must come from food' },
              { value: '0.8 g/kg', label: 'WHO/FAO baseline for adults' },
            ],
          },
        ],
      },
      {
        heading: 'Series map',
        paragraphs: [
          'Start with how much you need, then amino acid basics, animal vs plant, everyday plates (US in English, Korean table in Korean), timing myths, labels, and special cases.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[How much protein per day](/blog/protein-how-much)'],
              ['Part 3', '[Essential amino acids & complete protein](/blog/protein-amino-acids)'],
              ['Part 4', '[Animal vs plant protein](/blog/protein-animal-vs-plant)'],
              ['Part 5', '[Everyday plate: US staples](/blog/protein-everyday-plate)'],
              ['Encyclopedia', '[Protein foods & intake buckets](/nutrients/proteins)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '단백질이 하는 일(헬스장 밖에서도)',
        paragraphs: [
          '단백질은 몸매 재료로만 팔려요. 실제로는 근육·뼈·피부·장기 구조, 소화·대사 효소, 항체, 헤모글로빈 같은 운반까지 넓어요. 세포마다 쓰여요.',
          '지방처럼 단백질 창고가 있는 건 아니에요. 음식 단백질을 아미노산으로 쪼갠 뒤 필요한 걸 다시 조립해요. 그래서 특정 "슈퍼 단백질"보다 꾸준한 실제 음식이 먼저예요.',
          '[단백질 백과](/nutrients/proteins)에 기능·결핍·음식표가 있어요. 이 시리즈는 순서대로 풀고, 검사·진료를 대신하진 않아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억한다면',
            body: [
              '단백질은 몸을 유지하는 재료예요. 설탕처럼 순간 에너지가 아니고, 타이밍 트릭보다 하루 그램과 골고루 먹는 게 보통 먼저예요.',
            ],
          },
        ],
      },
      {
        heading: '아미노산을 쉽게',
        paragraphs: [
          '단백질은 20종 아미노산 사슬이에요. 9종은 필수라 식단에서 꼭 받아야 해요. 동물성·콩·퀴노아는 완전단백에 가깝고, 곡물+콩(밥+된장, 후무스+빵)은 서로 메꿔 줘요.',
          '뇌는 티로신으로 도파민을 만들어요. 그 경로는 [도파민 시리즈](/blog/dopamine-guide)에서 다뤄요. 여기선 총 단백질·식탁 패턴에 맞출게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '몸에서 단백질 역할',
            headers: ['역할', '왜 중요한지', '음식 쪽'],
            rows: [
              ['구조', '근육·피부·뼈 수리', '생선·닭·콩·달걀'],
              ['효소', '소화·대사', '끼니에 나눠 섭취'],
              ['면역', '항체', '단백질 극단 다이어트 주의'],
              ['운반', '헤모글로빈', '철은 [미네랄](/nutrients/minerals)과 짝'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '20', label: '인체 단백질 아미노산' },
              { value: '9', label: '필수—식단 필수' },
              { value: '0.8g/kg', label: '성인 기본 (WHO/FAO)' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 지도',
        paragraphs: [
          '하루 양 → 아미노산 → 동물·식물 → 일상 식탁(영문은 미국, 한국어는 한국) → 타이밍 신화 → 라벨 → 특수 상황 순이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[하루 단백질 얼마나](/blog/protein-how-much)'],
              ['3편', '[필수아미노산·완전단백](/blog/protein-amino-acids)'],
              ['4편', '[동물 vs 식물 단백질](/blog/protein-animal-vs-plant)'],
              ['5편', '[한국 식탁으로 채우기](/blog/protein-everyday-plate)'],
              ['백과', '[단백질 음식·섭취 구간](/nutrients/proteins)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'protein-how-much',
    seriesId: 'protein',
    episode: 2,
    title: {
      en: 'How much protein per day: g per kg beats generic "56 grams"',
      ko: '하루 단백질 얼마나: "56g"보다 kg당 g가 실전에 맞아요',
    },
    thesis: {
      en: 'Adult baseline is about 0.8 g per kg body weight per day (WHO/FAO). Active people and older adults often benefit from more, but megadoses are not automatic wins.',
      ko: '성인 기본은 체중 1kg당 하루 약 0.8g(WHO/FAO)이에요. 운동·고령은 더 필요할 수 있지만, 무조건 고단백이 답은 아니에요.',
    },
    description: {
      en: 'Daily protein targets by body weight, activity, age, and when very high intakes need medical context.',
      ko: '체중·활동·나이별 단백질 목표, 고단백이 의료 맥락이 필요한 경우.',
    },
    readMinutes: 8,
    datePublished: '2026-06-13',
    relatedSlugs: ['protein-guide', 'protein-everyday-plate', 'protein-special-cases', 'protein-timing-myths'],
    en: [
      {
        heading: 'Start with your weight, not a meme number',
        paragraphs: [
          'You will see "56 g for men, 46 g for women" from population averages. They are anchors, not personal prescriptions. Multiplying body weight in kg by 0.8 gives a maintenance floor for most healthy adults.',
          'Example: 70 kg × 0.8 ≈ 56 g per day. A 55 kg adult ≈ 44 g. Spread that across breakfast, lunch, and dinner instead of loading dinner only.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Common daily bands (general nutrition info, not medical orders)',
            headers: ['Situation', 'g per kg body weight', 'Notes'],
            rows: [
              ['General adult maintenance', '0.8', 'WHO/FAO baseline'],
              ['Regular resistance training', '1.2–1.6', 'Spread across meals'],
              ['Older adults (sarcopenia risk)', '1.0–1.2', 'Often with clinician if kidney disease'],
              ['Very high (>2.0)', '—', 'See [special cases](/blog/protein-special-cases)'],
            ],
          },
        ],
      },
      {
        heading: 'What a day near 60–80 g looks like in food',
        paragraphs: [
          'Two eggs (~12 g), 6 oz Greek yogurt (~18 g), 3 oz chicken (~26 g), and ½ cup cooked lentils (~9 g) already land near 65 g without powders. The [encyclopedia](/nutrients/proteins) serving list uses US portions (oz, cups).',
          'If your log is mostly cereal, pastries, and soda with one large steak at night, total protein may still be low on many days. The [Analyzer](/analyzer) helps spot patterns before buying another tub of powder.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '0.8 g/kg', label: 'baseline maintenance' },
              { value: '3 meals', label: 'split beats one mega dinner' },
              { value: '2 g/kg', label: 'upper zone—check kidneys if chronic disease' },
            ],
          },
        ],
      },
      {
        heading: 'When more is not automatically better',
        paragraphs: [
          'Athletes and heavy lifters need more building blocks, not infinite protein. Excess beyond what you use does not magically add muscle; calories and training still rule.',
          'Kidney disease, pregnancy, and some metabolic conditions change the target. Part 8 covers flags; do not self-prescribe 200 g because a podcast said so.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Medical context changes the number',
            body: [
              'Chronic kidney disease, dialysis, liver disease, or pregnancy need individualized targets—not blog defaults.',
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '체중부터, 밈 숫자 말고',
        paragraphs: [
          '"남성 56g, 여성 46g"은 인구 평균이에요. 개인 처방은 아니에요. 체중(kg)×0.8이 대부분 건강한 성인 유지 바닥에 가깝아요.',
          '예: 60kg×0.8≈48g/일. 70kg≈56g. 저녁에만 몰아 넣기보다 아침·점심·저녁에 나누는 게 낫아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '흔한 하루 구간(일반 정보, 의학 처방 아님)',
            headers: ['상황', 'kg당 g', '메모'],
            rows: [
              ['일반 성인 유지', '0.8', 'WHO/FAO 기준'],
              ['근력 운동 꾸준', '1.2–1.6', '끼니 분산'],
              ['고령(근감소 위험)', '1.0–1.2', '신장 질환 있으면 진료'],
              ['매우 높음(>2.0)', '—', '[특수 상황](/blog/protein-special-cases) 참고'],
            ],
          },
        ],
      },
      {
        heading: '하루 50~70g을 음식으로',
        paragraphs: [
          '달걀 2개(~12g), 두부 반 모(~10g), 닭가슴살 한 줌(~25g), 된장국·콩 반찬(~10g)만 해도 50g대에 가까워요. 백과 음식표는 미국 단위도 있지만 g로 보면 비슷해요.',
          '시리얼·빵·음료만 많고 저녁에 고기 한 번이면 "고기 먹는 날"과 "단백질 부족한 날"이 섞여요. [분석기](/analyzer)로 일주일 패턴을 보는 게 파우더 사기보다 나을 때가 많아요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '0.8g/kg', label: '유지 바닥' },
              { value: '3끼', label: '한 끼 몰빵보다 나음' },
              { value: '2g/kg', label: '상한 근처—만성 신장은 진료' },
            ],
          },
        ],
      },
      {
        heading: '많다고 항상 좋은 건 아님',
        paragraphs: [
          '운동 많으면 재료가 더 필요해요. 무한 단백질이 근육을 만드진 않아요. 칼로리·훈련이 여전히 중심이에요.',
          '신장·임신·대사 질환은 숫자가 달라져요. 8편에서 깃발을 다루고, 팟캐스트가 200g이라 해서 스스로 처방하지 마세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '질병·임신이면 숫자가 바뀜',
            body: [
              '만성 신장, 투석, 간질환, 임신은 개인 목표가 필요해요. 블로그 기본값으로 고정하면 안 돼요.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'protein-amino-acids',
    seriesId: 'protein',
    episode: 3,
    title: {
      en: 'Essential amino acids and complete protein without biochemistry flashcards',
      ko: '필수아미노산·완전단백질, 암기 카드 없이 이해하기',
    },
    thesis: {
      en: 'You need nine essential amino acids from food. Complete proteins deliver them in one bite; incomplete pairs (beans + grains) cover the gaps when the week is varied.',
      ko: '식단에서 꼭 받아야 하는 필수아미노산은 9종이에요. 완전단백은 한 번에, 불완전은 콩+곡물처럼 짝지으면 주간 식단이 넓어져요.',
    },
    description: {
      en: 'The nine essentials, complete vs incomplete proteins, complementary meals, and why leucine hype is secondary to total intake.',
      ko: '9종 필수, 완전·불완전, 상보 단백질, 레우신 과장 정리.',
    },
    readMinutes: 8,
    datePublished: '2026-06-14',
    relatedSlugs: ['protein-guide', 'protein-animal-vs-plant', 'protein-everyday-plate'],
    en: [
      {
        heading: 'Nine you must eat',
        paragraphs: [
          'Your body makes the other eleven amino acids when it has enough nitrogen and energy. The nine essentials—histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, valine—must arrive from protein-containing foods.',
          'You do not need to memorize them to eat well. You need varied protein sources across the week.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Practical rule',
            body: [
              'If you eat animal protein, soy, or mix beans with grains across the week, essentials usually sort themselves out.',
            ],
          },
        ],
      },
      {
        heading: 'Complete vs incomplete',
        paragraphs: [
          'Complete proteins supply all nine in useful amounts: eggs, dairy, fish, poultry, beef, soy, quinoa. Incomplete proteins are low in one or more essentials—most grains (low lysine), many legumes (low methionine).',
          'Rice and beans, peanut butter on whole wheat, lentil soup with bread: classic pairs. Korean tables do this with rice + doenjang/tofu without calling it "complementary protein theory."',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Pairs that cover gaps',
            headers: ['Food A', 'Food B', 'What it fixes'],
            rows: [
              ['Rice', 'Beans or tofu', 'Lysine from legumes'],
              ['Bread', 'Peanut butter', 'Methionine from grains + legumes'],
              ['Oats', 'Greek yogurt', 'Complete dairy + grain'],
              ['Kimchi stew base', 'Tofu or egg', 'Protein anchor in soup'],
            ],
          },
        ],
      },
      {
        heading: 'Leucine and muscle marketing',
        paragraphs: [
          'Leucine triggers muscle protein synthesis signals, which is why influencers obsess over it. For most people, hitting total daily protein with real meals matters more than timing 2.5 g leucine pre-workout.',
          'Next: [animal vs plant](/blog/protein-animal-vs-plant). Amino acid deep dive also lives under [amino acids](/amino-acids) on the site.',
        ],
      },
    ],
    ko: [
      {
        heading: '꼭 먹어야 하는 9종',
        paragraphs: [
          '나머지 11종은 질소·에너지가 있으면 몸에서 만들어요. 필수 9종(히스티딘, 이소류신, 류신, 라이신, 메티오닌, 페닐알라닌, 트레오닌, 트립토판, 발린)은 단백질 음식에서 와야 해요.',
          '암기 없이도 잘 먹을 수 있어요. 주간에 단백질 출처만 다양하면 돼요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '실전 규칙',
            body: [
              '동물성·콩을 먹거나, 곡물+콩을 주간에 섞으면 필수아미노산은 대개 알아서 맞아요.',
            ],
          },
        ],
      },
      {
        heading: '완전 vs 불완전',
        paragraphs: [
          '완전단백은 9종을 한 번에 충분히 줘요: 달걀, 유제품, 생선, 닭, 쇠고기, 콩, 퀴노아. 불완전은 한두 종이 부족해요. 곡물(라이신 낮음), 콩류(메티오닌 낮음).',
          '밥+콩, 빵+땅콩버터, 렌틸 수프+빵이 대표예요. 한국 식탁은 밥+된장·두부로 같은 원리를 이름 없이 쓰고 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '갭을 메우는 짝',
            headers: ['A', 'B', '보완'],
            rows: [
              ['밥', '콩·두부', '콩에서 라이신'],
              ['빵', '땅콩버터', '곡물+콩 메티오닌'],
              ['오트', '그릭요거트', '유제품 완전단백'],
              ['된장국', '두부·달걀', '국에 단백질 앵커'],
            ],
          },
        ],
      },
      {
        heading: '류신·근육 마케팅',
        paragraphs: [
          '류신은 근단백 합성 신호를 켜서 인플루언서가 집착해요. 대부분은 운동 전 2.5g보다 하루 총 단백질·실제 끼니가 먼저예요.',
          '다음: [동물 vs 식물](/blog/protein-animal-vs-plant). 아미노산 표는 사이트 [아미노산](/amino-acids)에도 있어요.',
        ],
      },
    ],
  },
  {
    slug: 'protein-animal-vs-plant',
    seriesId: 'protein',
    episode: 4,
    title: {
      en: 'Animal vs plant protein: both work, different side nutrients',
      ko: '동물 vs 식물 단백질: 둘 다 되고, 곁들임 영양이 달라요',
    },
    thesis: {
      en: 'Animal proteins often come complete with B12 and heme iron; plant proteins add fiber and phytochemicals but need B12 planning if vegan. Processed meats are poor protein heroes.',
      ko: '동물성은 B12·헴철이 같이 오고, 식물성은 섬유·식물 화합물이 붙어요. 비건은 B12 계획이 필요해요. 가공육은 단백질 주인공이 아니에요.',
    },
    description: {
      en: 'Comparing animal and plant protein quality, micronutrient riders, and why deli meat is not the same as fish.',
      ko: '동물·식물 단백질 질, 미량영양 차이, 햄·소시지 vs 생선.',
    },
    readMinutes: 8,
    datePublished: '2026-06-15',
    relatedSlugs: ['protein-guide', 'protein-amino-acids', 'protein-everyday-plate', 'vitamins-b12-folate'],
    en: [
      {
        heading: 'Animal sources: complete, but watch the package',
        paragraphs: [
          'Fish, eggs, poultry, and dairy deliver complete protein plus B12, vitamin D (in fatty fish and eggs), and heme iron. The tradeoff is saturated fat and sodium when choices slide into bacon, sausage, and fried buckets.',
          'The site [protein page](/nutrients/proteins) labels processed meats under "Avoid"—WHO Group 1 carcinogen context for processed meat, not fear of chicken breast.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Animal protein snapshot',
            headers: ['Source', 'Protein perk', 'Watch'],
            rows: [
              ['Salmon, tuna', 'Omega-3s, complete', 'Mercury limits for some fish'],
              ['Eggs', 'Complete, cheap anchor', 'Cook thoroughly if risk-averse'],
              ['Chicken breast', 'Lean grams', 'Fried versions add fat'],
              ['Deli turkey/ham', 'Convenient', 'Sodium, processing—limit frequency'],
            ],
          },
        ],
      },
      {
        heading: 'Plant sources: fiber plus pairing',
        paragraphs: [
          'Lentils, black beans, tofu, tempeh, and nuts add protein with fiber and minerals. Strict vegan diets need fortified B12 and attention to iron and zinc—see [B12 & folate](/blog/vitamins-b12-folate).',
          'Soy is the most complete plant protein common in US groceries. Combining beans and grains still helps amino acid variety even when soy is in the rotation.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Vegan checklist',
            body: [
              'B12 fortified foods or supplement, varied legumes, iodine/omega-3 if seafood absent—protein grams alone do not cover the whole board.',
            ],
          },
        ],
      },
      {
        heading: 'Choosing for your plate',
        paragraphs: [
          'Mixing fish twice weekly, eggs or yogurt daily anchors, and beans several times covers most US patterns without obsessing over "animal vs plant" teams. Next: [US everyday plate](/blog/protein-everyday-plate) (English) with meal slots.',
        ],
      },
    ],
    ko: [
      {
        heading: '동물성: 완전하지만 꾸러미를 봐요',
        paragraphs: [
          '생선·달걀·닭·유제품은 완전단백에 B12, D(등푸른생선·달걀), 헴철이 따라와요. 베이컨·소시지·튀김 쪽으로 가면 포화지방·나트륨이 커져요.',
          '[단백질 백과](/nutrients/proteins)는 가공육을 "피하기"에 넣어요. WHO 가공육 1군 맥락이지 닭가슴살 공포가 아니에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '동물성 단백질 스냅샷',
            headers: ['출처', '장점', '주의'],
            rows: [
              ['고등어·참치', '오메가3, 완전', '일부 생선 수은 한도'],
              ['달걀', '완전, 저렴한 앵커', '위험 회피 시 완숙'],
              ['닭가슴살', '저지방 단백', '튀김은 지방 추가'],
              ['햄·소시지', '간편', '나트륨·가공—빈도 줄이기'],
            ],
          },
        ],
      },
      {
        heading: '식물성: 섬유+짝짓기',
        paragraphs: [
          '렌틸, 검은콩, 두부, 템페, 견과는 단백질에 섬유·미네랄이 붙어요. 엄격한 비건은 강화 B12·철·아연—[B12·엽산](/blog/vitamins-b12-folate) 참고.',
          '콩이 한국·미국 식료에서 가장 흔한 완전에 가까운 식물 단백이에요. 콩만 먹어도 되지만 곡물+콩을 돌리면 아미노산 폭이 넓어져요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '비건 체크',
            body: [
              'B12 강화식·보충, 콩류 다양화, 해산물 없으면 요오드·오메가3도—단백질 g만으로 보드 전체가 안 채워져요.',
            ],
          },
        ],
      },
      {
        heading: '식탁에서 고르기',
        paragraphs: [
          '생선 주 2회, 달걀·두부·유제품 앵커, 콩 반찬 여러 번이면 "팀 나누기" 없이 대부분 커버돼요. 다음: [한국 일상 식탁](/blog/protein-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'protein-everyday-plate',
    seriesId: 'protein',
    episode: 5,
    title: {
      en: 'The US plate: eggs, chicken, Greek yogurt, and beans across the day',
      ko: '한국 식탁: 달걀·두부·생선·콩으로 하루 단백질 채우기',
    },
    thesis: {
      en: 'Typical US eating often under-funds protein at breakfast and lunch, then over-relies on one dinner entree. Spreading eggs, yogurt, fish, and legumes across meals hits grams without shakes.',
      ko: '한국 식탁은 삼겹살 한 접시가 아니라 국·반찬·밥에 단백질이 나뉘어 있어요. 달걀·두부·생선·콩을 끼니에 깔면 쉐이크 없이도 g가 채워져요.',
    },
    description: {
      en: 'US breakfast-lunch-dinner protein anchors, weak patterns (cereal-only, sandwich+chips), and logging before powder.',
      ko: '아침·점심·저녁 단백질 앵커, 약한 패턴(빵·음료만), 파우더 전 기록.',
    },
    readMinutes: 9,
    datePublished: '2026-06-16',
    relatedSlugs: ['protein-how-much', 'protein-animal-vs-plant', 'protein-labels-processed', 'protein-guide'],
    en: [
      {
        heading: 'Where US meals leak protein',
        paragraphs: [
          'Coffee-only mornings, cereal without milk or eggs, lunch that is chips plus a soda, and a huge steak at 8 p.m. are common. Total grams may still miss the 0.8 g/kg floor on many days.',
          'Fix the pattern: one protein anchor per meal, vegetables on the side, and fish on rotation twice weekly per [protein tips](/nutrients/proteins).',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Three anchors beat one hero dinner',
            steps: [
              { label: 'Breakfast', note: 'eggs or Greek yogurt' },
              { label: 'Lunch', note: 'chicken salad, tuna, or lentil soup' },
              { label: 'Dinner', note: 'salmon, tofu stir-fry, or beans' },
            ],
          },
        ],
      },
      {
        heading: 'Meal slots with US staples',
        paragraphs: [
          'Portions below use common US household measures from the encyclopedia. Adjust for your weight target from [Part 2](/blog/protein-how-much).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'US everyday protein map',
            headers: ['Meal', 'Staples', '~Protein', 'Plate tip'],
            rows: [
              ['Breakfast', '2 eggs + nonfat Greek yogurt (1 cup)', '~34 g', 'Skip pastry-only mornings'],
              ['Lunch', '3 oz chicken breast or 1 cup lentil soup', '~18–26 g', 'Add salad, not chips alone'],
              ['Dinner', '3 oz salmon or ½ cup firm tofu', '~20–22 g', 'Bake or grill, not deep-fry'],
              ['Snack', '½ cup cottage cheese or ¼ cup almonds', '~8–14 g', 'Before protein bars'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '2×/wk', label: 'fatty fish for protein + omega-3' },
              { value: '3 meals', label: 'split daily grams' },
              { value: '7 days', label: 'log in Analyzer before powders' },
            ],
          },
        ],
      },
      {
        heading: 'Delivery and drive-through reality',
        paragraphs: [
          'Burger combos and fried chicken buckets pack protein numbers but also sodium, refined carbs, and fats. Use the [Analyzer](/analyzer) on a week of real orders—you may already hit grams while missing fiber and micronutrients.',
          'Next: [timing myths](/blog/protein-timing-myths) and [labels on bars and shakes](/blog/protein-labels-processed).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Protein is not only meat',
            body: [
              'Eggs, yogurt, lentils, and tofu are US grocery staples that count the same toward daily grams.',
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '한국 식탁에서 단백질이 숨는 곳',
        paragraphs: [
          '단백질은 삼겹살 한 접시만이 아니에요. 된장국·멸치국, 두부·나물 반찬, 밥 위 달걀, 생선구이에 나뉘어 있어요. 아침이 빵·커피만이면 하루가 약해지기 쉬워요.',
          '밥+국+반찬 2~3+단백질 반찬(생선·닭·두부) 패턴이 [단백질 허브](/blog/protein-guide)가 말한 "끼니 분산"이에요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '한 끼 히어로보다 세 앵커',
            steps: [
              { label: '아침', note: '삶은 달걀·두유' },
              { label: '점심', note: '밥+생선/닭+나물' },
              { label: '저녁', note: '두부·콩국·고등어' },
            ],
          },
        ],
      },
      {
        heading: '끼니별 한국 식재',
        paragraphs: [
          '숫자는 대략 g예요. 목표는 [2편](/blog/protein-how-much)에서 체중으로 맞추세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '한국 일상 단백질 지도',
            headers: ['끼니', '식재', '단백질 감', '팁'],
            rows: [
              ['아침', '달걀 2개 + 두유 1팩', '~15g+', '쉐이크만 말고 실제 음식'],
              ['점심', '밥+고등어/닭+나물 2~3', '~25–35g', '김치만 반찬이면 약함'],
              ['저녁', '두부 반 모 + 콩나물·시금치', '~15–25g', '튀김 반찬만 늘리지 않기'],
              ['간식', '삶은 달걀, 두유', '~6–12g', '프로틴 바는 7편'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '주 2회', label: '등푸른생선(단백+지방산)' },
              { value: '3끼', label: '하루 g 나누기' },
              { value: '7일', label: '분석기 기록 후 파우더' },
            ],
          },
        ],
      },
      {
        heading: '배달·외식 날',
        paragraphs: [
          '치킨·떡볶이·라면 위주면 단백질 숫자는 나와도 나트륨·탄수가 커져요. [분석기](/analyzer)로 일주일 배달을 찍어 보면 "고기 먹는 날"과 "사실 부족한 날"이 갈려요.',
          '다음: [타이밍 신화](/blog/protein-timing-myths), [라벨·가공식](/blog/protein-labels-processed).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '고기만 단백질이 아님',
            body: [
              '달걀·두부·콩·멸치·유제품도 하루 g에 똑같이 들어가요.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'protein-timing-myths',
    seriesId: 'protein',
    episode: 6,
    title: {
      en: 'Protein timing: the 30-minute window is smaller than the daily total',
      ko: '단백질 타이밍: "운동 후 30분"보다 하루 총량이 커요',
    },
    thesis: {
      en: 'For most people, hitting daily protein across meals beats obsessing over a post-workout stopwatch. Athletes may fine-tune, but beginners should fix breakfast and lunch first.',
      ko: '대부분은 운동 직후 스톱워치보다 하루 단백질을 끼니에 나누는 게 먼저예요. 선수는 미세 조정해도, 초보면 아침·점심부터 고치는 게 낫아요.',
    },
    description: {
      en: 'Post-workout windows, bedtime casein hype, and spreading protein across meals.',
      ko: '운동 후 창, 취침 전 카제인 과장, 끼니 분산.',
    },
    readMinutes: 7,
    datePublished: '2026-06-17',
    relatedSlugs: ['protein-how-much', 'protein-everyday-plate', 'protein-labels-processed', 'protein-guide'],
    en: [
      {
        heading: 'The anabolic window, downsized',
        paragraphs: [
          'Muscle repair runs for hours, not minutes. Eating protein within 30 minutes after lifting helps if you trained fasted, but skipping a shake right away does not erase a workout if the day totals are solid.',
          'Priority order: enough daily grams → protein at each meal → optional post-workout convenience.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Order of operations',
            body: [
              'Fix chronically low breakfast protein before buying timed-release powder.',
            ],
          },
        ],
      },
      {
        heading: 'Spreading vs stacking',
        paragraphs: [
          'Twenty to forty grams per meal is a practical band for many adults—roughly what three US anchors (eggs, chicken, yogurt) provide without math apps.',
          'Bedtime casein shakes matter mainly when total intake is already low. Sleep and total calories still dominate recovery for hobby lifters.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '20–40 g', label: 'common per-meal band' },
              { value: '24 h', label: 'muscle repair window (not 30 min)' },
              { value: '3 meals', label: 'minimum split for most' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Train, eat protein within a few hours, drink water, sleep. If you want label literacy on powders and bars, read [protein labels](/blog/protein-labels-processed).',
        ],
      },
    ],
    ko: [
      {
        heading: '동화 창, 크기 줄이기',
        paragraphs: [
          '근수리는 몇 분이 아니라 몇 시간 단위예요. 공복에 헬스하면 운동 후 단백질이 도움이 되지만, 바로 쉐이크를 안 마셨다고 운동이 사라지진 않아요. 하루 총량이 맞으면요.',
          '순서: 하루 g 충분 → 끼니마다 단백질 → (선택) 운동 후 간편식.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '우선순위',
            body: [
              '아침 단백질이 늘 빈약하면 시간방출 파우더보다 끼니부터 고치세요.',
            ],
          },
        ],
      },
      {
        heading: '나누기 vs 한 번에 몰기',
        paragraphs: [
          '끼니당 20~40g은 많은 성인에게 현실적인 밴드예요. 달걀·닭·두부·유제품으로도 대략 맞아요.',
          '잠들기 전 카제인 쉐이크는 총 섭취가 이미 낮을 때 의미가 커요. 취미 운동은 수면·총 칼로리가 여전히 중심이에요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '20–40g', label: '흔한 끼니 밴드' },
              { value: '24시간', label: '근수리 창(30분 아님)' },
              { value: '3끼', label: '최소 분산' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '운동하고, 몇 시간 안에 단백질, 물, 잠. 파우더·바 라벨은 [라벨 편](/blog/protein-labels-processed)에서 이어요.',
        ],
      },
    ],
  },
  {
    slug: 'protein-labels-processed',
    seriesId: 'protein',
    episode: 7,
    title: {
      en: 'Protein bars, shakes, and labels: grams on the front, sugar in the fine print',
      ko: '프로틴 바·쉐이크·라벨: 앞면은 g, 속은 당',
    },
    thesis: {
      en: 'Packaged protein can help convenience but often trades sugar, sugar alcohols, and sodium for front-label gram counts. Real food plus the Analyzer beats guessing from marketing.',
      ko: '가공 단백질은 편하지만 당·당알코올·나트륨을 숨기는 경우가 많아요. 앞면 g보다 [분석기](/analyzer)와 실제 음식이 먼저예요.',
    },
    description: {
      en: 'Reading protein labels, comparing bars vs yogurt vs chicken, and when powder is a tool not a crutch.',
      ko: '단백질 라벨, 바 vs 요거트 vs 닭, 파우더가 도구일 때.',
    },
    readMinutes: 8,
    datePublished: '2026-06-18',
    relatedSlugs: ['protein-everyday-plate', 'protein-how-much', 'protein-timing-myths', 'protein-guide'],
    en: [
      {
        heading: 'Front-label protein is not the whole story',
        paragraphs: [
          'A bar advertising 20 g protein may ship 15 g added sugar and sugar alcohols that upset your gut. Shakes can be thin on fiber and heavy on artificial sweeteners—fine occasionally, weak as a meal pattern.',
          'Compare per dollar and per calorie: 3 oz chicken (~26 g, ~128 kcal) vs many bars (~20 g, ~200+ kcal with extras).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Label lines worth reading',
            headers: ['Line', 'Why it matters'],
            rows: [
              ['Protein (g)', 'Target from [daily math](/blog/protein-how-much)'],
              ['Added sugars', 'Can cancel "healthy" branding'],
              ['Sodium', 'High in jerky, deli wraps, powders'],
              ['Ingredient list', 'Protein isolates vs whole food length'],
            ],
          },
        ],
      },
      {
        heading: 'When powder helps',
        paragraphs: [
          'Travel, shift work, or appetite limits after illness are fair use cases. Use unflavored or low-sugar bases, blend with fruit and yogurt, and keep whole meals when schedule allows.',
          'Run a week in the [Analyzer](/analyzer) before stacking bar + shake + dinner steak—duplication is common.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Not a meal forever',
            body: [
              'Liquid calories slip past fullness cues. Reset to plates when routine stabilizes.',
            ],
          },
        ],
      },
      {
        heading: 'Processed "high protein" traps',
        paragraphs: [
          'Cookies, cereal, and ice cream with protein claims still behave like desserts. The [protein encyclopedia](/nutrients/proteins) warns on processed meats—protein grams do not erase carcinogen and sodium loads.',
          'Next: [special cases](/blog/protein-special-cases) for pregnancy, kidneys, and high-protein diets.',
        ],
      },
    ],
    ko: [
      {
        heading: '앞면 단백질만 믿지 않기',
        paragraphs: [
          '바에 20g 써 있어도 첨가당 15g·당알코올이 붙을 수 있어요. 쉐이크는 섬유는 약하고 감미료만 강할 때가 있어요. 가끔은 괜찮지만 끼니 패턴으로는 약해요.',
          '돈·칼로리로 보면 닭가슴살 3oz(~26g, ~128kcal)가 많은 바(~20g, 200kcal+)보다 깔끔한 날이 많아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '라벨에서 볼 줄',
            headers: ['항목', '이유'],
            rows: [
              ['단백질(g)', '[하루 계산](/blog/protein-how-much)과 연결'],
              ['첨가당', '"건강" 브랜딩을 깸'],
              ['나트륨', '육포·랩·파우더에 높음'],
              ['원재료', '분리단백 vs 통식품 길이'],
            ],
          },
        ],
      },
      {
        heading: '파우더가 맞는 때',
        paragraphs: [
          '출장·교대·질병 후 식욕 부족은 타당해요. 무가당·저당 베이스에 과일·요거트를 섞고, 일정이 되면 접시로 돌아오세요.',
          '바+쉐이크+저녁 고기를 [분석기](/analyzer)로 일주일 찍어 보면 중복이 자주 보여요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '영원한 끼니는 아님',
            body: [
              '액체 칼로리는 포만감을 속여요. 루틴이 잡히면 식탁으로 돌아오세요.',
            ],
          },
        ],
      },
      {
        heading: '"고단백" 가공 함정',
        paragraphs: [
          '고단백 쿠키·시리얼·아이스크림은 여전히 디저트예요. [단백질 백과](/nutrients/proteins)는 가공육도 경고해요. g가 발암·나트륨을 지우진 않아요.',
          '다음: [특수 상황](/blog/protein-special-cases).',
        ],
      },
    ],
  },
  {
    slug: 'protein-special-cases',
    seriesId: 'protein',
    episode: 8,
    title: {
      en: 'Pregnancy, kidneys, and high-protein diets: when the default stops',
      ko: '임신·신장·고단백: 기본값이 멈추는 때',
    },
    thesis: {
      en: 'Baseline 0.8 g/kg is for generally healthy adults. Pregnancy, kidney disease, liver disease, and extreme high-protein experiments need individualized targets from clinicians—not blog tables.',
      ko: '0.8g/kg는 대체로 건강한 성인용이에요. 임신·신장·간·극단 고단백은 진료·영양사와 맞춰야 하고, 블로그 표로 고정하면 안 돼요.',
    },
    description: {
      en: 'When to raise protein, when to limit it, and red flags that belong in medical care.',
      ko: '늘리는 때, 줄이는 때, 진료로 가야 할 신호.',
    },
    readMinutes: 8,
    datePublished: '2026-06-19',
    relatedSlugs: ['protein-how-much', 'protein-guide', 'protein-labels-processed', 'vitamins-b12-folate'],
    en: [
      {
        heading: 'Pregnancy and breastfeeding',
        paragraphs: [
          'Protein needs rise during pregnancy and lactation. NIH and obstetric guidelines bump intake above standard adult RDAs; exact grams depend on trimester, weight, and complications.',
          'Pair protein with folate and iron conversations—see [B12 & folate](/blog/vitamins-b12-folate). Raw fish, unpasteurized dairy, and high-mercury fish have separate safety rules.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Obstetric care leads',
            body: [
              'Do not copy bodybuilder macros while pregnant. Use prenatal visits for targets.',
            ],
          },
        ],
      },
      {
        heading: 'Kidney and liver disease',
        paragraphs: [
          'Healthy kidneys handle normal protein. Chronic kidney disease often requires moderated protein with medical supervision—sometimes lower, sometimes dialysis-specific higher. Liver disease varies by stage.',
          'Very high protein diets (>2 g/kg) marketed for weight loss can stress susceptible kidneys when hydration and medical history are ignored.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '>2 g/kg', label: 'high zone—medical review if CKD risk' },
              { value: 'CKD', label: 'individualized protein prescription' },
              { value: '0.8 g/kg', label: 'default does not apply here' },
            ],
          },
        ],
      },
      {
        heading: 'Closing the series',
        paragraphs: [
          'Protein is maintenance and repair, not a hack. Return to the [series hub](/blog/protein-guide), [US or Korean plate](/blog/protein-everyday-plate) by language, [encyclopedia](/nutrients/proteins), and [amino acids](/amino-acids). Eat food first, supplement on purpose, and escalate to clinicians when the story is medical.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Food-first loop',
            steps: [
              { label: 'Estimate grams', note: '0.8 g/kg baseline' },
              { label: 'Build plates', note: '3 anchors/day' },
              { label: 'Log week', note: 'Analyzer' },
              { label: 'Medical flags', note: 'pregnancy, CKD, neuro symptoms' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '임신·수유',
        paragraphs: [
          '임신·수유 때 단백질 필요는 올라가요. NIH·산부 지침이 성인 RDA보다 높게 잡아요. 분기·체중·합병증에 따라 달라져요.',
          '엽산·철 얘기와 짝지어요—[B12·엽산](/blog/vitamins-b12-folate). 회·비살규 유제품·고수은 생선은 별도 안전 규칙이 있어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '산부 진료가 앞',
            body: [
              '임신 중 보디빌더 매크로를 복사하지 마세요. 산전 방문에서 목표를 맞추세요.',
            ],
          },
        ],
      },
      {
        heading: '신장·간',
        paragraphs: [
          '건강한 신장은 보통 단백질을 처리해요. 만성 신장은 의료 감독 하에 조절—낮추거나, 투석 때는 다르게 올리기도 해요. 간도 단계마다 달라요.',
          '다이어트용 >2g/kg 고단백은 수분·병력 무시하면 취약한 신장에 부담일 수 있어요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '>2g/kg', label: '고구간—CKD 위험이면 진료' },
              { value: 'CKD', label: '개인별 단백질 처방' },
              { value: '0.8g/kg', label: '여기엔 기본값 해당 없음' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 마무리',
        paragraphs: [
          '단백질은 관리·수리지 해킹이 아니에요. [허브](/blog/protein-guide), [한국 식탁](/blog/protein-everyday-plate), [백과](/nutrients/proteins), [아미노산](/amino-acids)으로 돌아가세요. 음식 먼저, 보충은 목적 있을 때, 의료 이야기면 진료로.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '음식 우선 루프',
            steps: [
              { label: 'g 추정', note: '0.8g/kg 바닥' },
              { label: '식탁', note: '하루 앵커 3개' },
              { label: '일주일 기록', note: '분석기' },
              { label: '의료 깃발', note: '임신·CKD·신경 증상' },
            ],
          },
        ],
      },
    ],
  },
];
