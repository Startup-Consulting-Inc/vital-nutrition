import type { BlogArticle } from './types';

export const vitaminArticles: BlogArticle[] = [
  {
    slug: 'vitamins-guide',
    seriesId: 'vitamins',
    episode: 1,
    title: {
      en: 'Vitamins: what they actually do, and why your plate beats a pill',
      ko: '비타민이 진짜 하는 일, 그리고 알약보다 식탁이 먼저인 이유',
    },
    thesis: {
      en: 'Vitamins are not energy in a capsule. They are tiny tools that help your cells run chemistry, and most people cover them with ordinary food if the diet is not extremely narrow.',
      ko: '비타민은 캡슐 속 에너지가 아니라 세포 화학을 돕는 작은 공구예요. 식단이 극단적으로 좁지 않다면 대부분은 평범한 음식으로 채울 수 있어요.',
    },
    description: {
      en: 'A plain-language hub on vitamins: water-soluble vs fat-soluble, what coenzymes mean in real life, and where the rest of the series goes deeper.',
      ko: '비타민이 뭔지, 수용성·지용성 차이, 일상에서 보조인자가 무슨 뜻인지, 이어지는 글들이 어디를 파는지 허브로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-how-they-work', 'vitamins-b-energy', 'vitamins-c-and-d', 'vitamins-korean-plate'],
    en: [
      {
        heading: 'What vitamins are (and what they are not)',
        paragraphs: [
          'Vitamins sit in a weird middle ground. They are not protein, fat, or carbs, so they do not carry calories the way macronutrients do. They are also not minerals like iron or calcium. They are organic helpers: small molecules your body uses as coenzymes, antioxidants, and switches in gene regulation.',
          'The marketing line "take this vitamin for energy" is the main confusion. B vitamins help you extract energy from food, but they do not pour watts into your bloodstream like sugar does. Vitamin C does not block every cold. Vitamin D is not a mood pill. They are maintenance tools, not hacks.',
          'This series stays in nutrition\'s lane. It explains how [vitamins](/nutrients/vitamins) work, which foods carry them, and when supplements make sense. It does not replace blood work, pregnancy care, or prescriptions.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'The one thing to remember',
            body: [
              'Vitamins help chemistry run; they do not replace sleep, movement, or a clinician when something is seriously off.',
            ],
          },
        ],
      },
      {
        heading: 'Two storage rules: water-soluble vs fat-soluble',
        paragraphs: [
          'Think of two toolboxes. Water-soluble vitamins (B-complex and vitamin C) dissolve in watery parts of your meal and body. Your body does not store most of them for long, so you need a steady drip from food.',
          'Fat-soluble vitamins (A, D, E, K) ride with dietary fat into the gut, then can lodge in liver and fat tissue. That is useful in lean times, but it also means megadoses from bottles can pile up to harmful levels.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'The two vitamin families at a glance',
            headers: ['Group', 'Members', 'Storage', 'Practical note'],
            rows: [
              ['Water-soluble', 'B1, B2, B3, B6, B12, folate, C', 'Limited; eat regularly', 'Lost somewhat in cooking water; varied plate helps'],
              ['Fat-soluble', 'A, D, E, K', 'Can accumulate', 'Need some fat in the meal; watch supplement doses'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '13+', label: 'essential vitamins humans need from diet' },
              { value: '2', label: 'major groups: water-soluble and fat-soluble' },
              { value: '400 mcg DFE', label: 'folate RDA for adults (NIH)' },
            ],
          },
        ],
      },
      {
        heading: 'Why "deficiency" talk spreads faster than facts',
        paragraphs: [
          'Tired, foggy, catching every bug: those feelings sell supplement ads. Real deficiency patterns are narrower: very low intake for months, malabsorption, pregnancy, heavy alcohol, strict vegan diets without fortified foods, or medical conditions.',
          'Standard blood tests do not map one-to-one to "you need more vitamin X for energy today." Some vitamins (like B12) can be checked; others are inferred from diet history. If a creator promises a simple at-home read of your whole vitamin status, be skeptical.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Symptoms are not a diagnosis',
            body: [
              'Feeling run-down does not prove a vitamin deficiency. Persistent numbness, severe anemia, pregnancy, or new neurological symptoms belong with a clinician, not a shopping cart.',
            ],
          },
        ],
      },
      {
        heading: 'Where to go next in the series',
        paragraphs: [
          'Treat vitamins as upkeep: colorful plants, protein with B vitamins, fat-containing meals for A/D/E/K, and fortified foods when your pattern is vegan or very restrictive. The encyclopedia page has food lists and upper limits; these articles walk the ideas in order.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'The series map',
            headers: ['Part', 'What it covers'],
            rows: [
              ['Part 2', '[How vitamins are absorbed and turned into active tools](/blog/vitamins-how-they-work)'],
              ['Part 3', '[B vitamins and the "energy vitamin" myth](/blog/vitamins-b-energy)'],
              ['Part 4', '[Folate and B12: pregnancy, vegan diets, alcohol](/blog/vitamins-b12-folate)'],
              ['Part 5', '[Vitamin C and D without the hype](/blog/vitamins-c-and-d)'],
              ['Part 7', '[Korean staples that cover the gaps](/blog/vitamins-korean-plate)'],
              ['Encyclopedia', '[Full vitamin reference with foods](/nutrients/vitamins)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '비타민이 뭐고, 뭐가 아닌지',
        paragraphs: [
          '비타민은 애매한 중간쯤에 있어요. 단백질·지방·탄수처럼 칼로리를 실어 나르진 않거든요. 철이나 칼슘 같은 미네랄도 아니고요. 세포가 쓰는 작은 도우미예요. 효소 보조인자, 항산화, 유전자 스위치 같은 역할을 해요.',
          '"이 비타민 먹으면 에너지"가 제일 헷갈리게 만들어요. B군은 음식에서 에너지를 꺼내는 걸 돕지, 설탕처럼 혈관에 와트를 부어 넣진 않아요. 비타민 C가 모든 감기를 막지도 않고, D가 기분 약이 아니에요. 관리용 공구지 해킹이 아니에요.',
          '이 시리즈는 영양 얘기만 할게요. [비타민](/nutrients/vitamins)이 어떻게 일하고, 어떤 음식에 있고, 영양제가 언제 의미 있는지요. 검사, 임신 관리, 처방을 대신하진 않아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '딱 하나만 기억한다면',
            body: [
              '비타민은 화학 반응을 돕는 거지, 잠·운동·진료를 대신하지 않아요. 심하게 이상하면 의사 쪽이 먼저예요.',
            ],
          },
        ],
      },
      {
        heading: '저장 규칙 두 가지: 수용성 vs 지용성',
        paragraphs: [
          '공구함 두 개로 나눠 보면 쉬워요. 수용성 비타민(B군, C)은 물기 많은 식사·몸에 녹아요. 대부분 오래 쌓이지 않아서 음식에서 꾸준히 받는 게 맞아요.',
          '지용성(A, D, E, K)은 식사 속 지방을 타고 들어가고, 간·지방에 쌓일 수 있어요. 덜 먹을 때는 도움이 되지만, 병으로 과하게 먹으면 해로울 수도 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '비타민 두 가족 한눈에',
            headers: ['구분', '포함', '저장', '실전 포인트'],
            rows: [
              ['수용성', 'B1·B2·B3·B6·B12·엽산·C', '제한적, 자주 섭취', '끓는 물에 일부 빠짐, 식단 다양하게'],
              ['지용성', 'A·D·E·K', '축적 가능', '지방 있는 한 끼 필요, 영양제 과다 주의'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '13+', label: '식단에서 필요한 필수 비타민' },
              { value: '2', label: '큰 그룹: 수용성·지용성' },
              { value: '400mcg DFE', label: '성인 엽산 권장섭취량(RDA) (미국 국립보건원 NIH 기준)' },
            ],
          },
        ],
      },
      {
        heading: '"결핍" 말이 사실보다 빨리 퍼지는 이유',
        paragraphs: [
          '피곤하고 멍하고 감기 걸린다, 이런 느낌은 영양제 광고에 잘 맞아요. 진짜 결핍 패턴은 더 좁아요. 몇 달 동안 극단적으로 적게 먹거나, 흡수 장애, 임신, 과음, 강화식 없는 엄격한 비건, 특정 질환 같은 경우요.',
          '일반 혈액 검사가 "오늘 비타민 X 더 먹어"랑 1:1로 맞지 않아요. B12는 검사가 되지만, 다른 건 식단·병력으로 추정하는 경우가 많아요. 집에서 전체 비타민 상태를 한 번에 안다고 하면 의심해 보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '증상만으로 진단 아니에요',
            body: [
              '피곤하다고 비타민 결핍은 아니에요. 손발 저림, 심한 빈혈, 임신, 새로 생긴 신경 증상은 장보기 전에 진료 쪽이 맞아요.',
            ],
          },
        ],
      },
      {
        heading: '시리즈에서 다음으로',
        paragraphs: [
          '비타민은 관리예요. 채소·과일 색깔, B군 있는 단백질, A/D/E/K용 지방 한 끼, 비건·극단 식단이면 강화식요. 백과사전에 음식·상한선이 있고, 이 글들은 순서대로 풀어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '시리즈 지도',
            headers: ['편', '다루는 내용'],
            rows: [
              ['2편', '[흡수랑 활성형으로 바뀌는 과정](/blog/vitamins-how-they-work)'],
              ['3편', '[B군과 "에너지 비타민" 오해](/blog/vitamins-b-energy)'],
              ['4편', '[엽산·B12: 임신·비건·술](/blog/vitamins-b12-folate)'],
              ['5편', '[비타민 C·D, 과장 정리](/blog/vitamins-c-and-d)'],
              ['7편', '[한국 식탁으로 채우기](/blog/vitamins-korean-plate)'],
              ['백과', '[비타민 음식·상한선](/nutrients/vitamins)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'vitamins-how-they-work',
    seriesId: 'vitamins',
    episode: 2,
    title: {
      en: 'How vitamins work: from your plate to the enzyme that needs them',
      ko: '비타민은 어떻게 일할까: 식탁에서 효소까지',
    },
    thesis: {
      en: 'Most vitamins arrive as provitamins or bound forms, get absorbed with the right food partners, then convert into active coenzymes that enzymes cannot run without.',
      ko: '비타민은 대개 전구체·결합 형태로 들어와서, 흡수 조건을 맞춘 뒤 효소가 못 버티는 활성 보조인자로 바뀌어요.',
    },
    description: {
      en: 'The food → gut → bloodstream → active coenzyme path, why fat and vitamin C matter for absorption, and what "bioavailability" means without jargon.',
      ko: '음식→장→혈액→활성 보조인자 경로, 지방·비타민 C가 흡수에 왜 끼는지, 전문 용어 없이 설명해요.',
    },
    readMinutes: 10,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-b-energy', 'vitamins-b12-folate'],
    en: [
      {
        heading: 'Vitamins as wrench sets, not fuel',
        paragraphs: [
          'Enzymes are the workers that break down carbs, fats, and protein. Many workers arrive at the job site without their wrench. That wrench is often a vitamin-derived coenzyme. Without it, the reaction stalls even when plenty of substrate is sitting there.',
          'Food rarely delivers the finished coenzyme. It delivers precursors: pyridoxine becomes active B6, folate becomes methyl-folate, beta-carotene can become vitamin A. Your gut and liver finish the assembly.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'From bite to biochemistry. Each step has conditions.',
            steps: [
              { label: 'Food', note: 'whole or fortified' },
              { label: 'Gut absorption', note: 'needs acid, fat, or carriers' },
              { label: 'Blood transport', note: 'bound to proteins' },
              { label: 'Active coenzyme', note: 'enzyme can work' },
            ],
          },
        ],
      },
      {
        heading: 'What helps or blocks absorption',
        paragraphs: [
          'Fat-soluble vitamins need dietary fat in the same meal. A naked salad with fat-free dressing is a weak delivery truck for vitamin D from eggs or vitamin K from greens. A drizzle of olive oil, nuts, or fish changes the picture.',
          'Iron from plants absorbs far better with vitamin C in the same meal, which indirectly protects the B-vitamin and energy pathways that depend on healthy iron status. Large amounts of calcium and coffee at the same sitting compete with iron, so spacing them out helps.',
          'Alcohol irritates the gut and drains B vitamins over time. Heavy drinking is less "one bad night" and more a slow leak in the assembly line.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Absorption partners and friction',
            headers: ['Nutrient', 'Absorption boost', 'Friction'],
            rows: [
              ['A, D, E, K', 'Some fat in the meal', 'Very low-fat meals, some malabsorption syndromes'],
              ['Plant iron', 'Vitamin C at the same meal', 'Large calcium + iron at once, excess tea/coffee'],
              ['B12', 'Stomach acid + intrinsic factor', 'Metformin, PPIs long-term, pernicious anemia'],
              ['Folate', 'Generally good from food', 'Alcohol, certain drugs (ask your clinician)'],
            ],
          },
        ],
      },
      {
        heading: 'Numbers worth knowing (NIH adult RDAs)',
        paragraphs: [
          'You do not need to memorize the table, but anchors stop you from chasing megadoses. These are representative adult targets from NIH Office of Dietary Supplements.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '90 mg', label: 'vitamin C RDA (men); 75 mg (women)' },
              { value: '15 mcg', label: 'vitamin D RDA (600 IU) ages 1–70' },
              { value: '1.3–1.7 mg', label: 'vitamin B6 RDA adults' },
              { value: '2.4 mcg', label: 'vitamin B12 RDA adults' },
            ],
          },
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Food first, then targeted gaps',
            body: [
              'Cover the pathway with meals before buying a high-dose bottle. If your diet is vegan, pregnant, or post-bariatric surgery, targeted supplements beat a random multivitamin scattershot.',
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Pair plants and iron with vitamin C, pair colorful plants and fish with a little fat, and keep alcohol modest if B vitamins matter to you. Next: [B vitamins and energy](/blog/vitamins-b-energy), then [folate and B12](/blog/vitamins-b12-folate). The [vitamin encyclopedia](/nutrients/vitamins) lists foods per nutrient.',
        ],
      },
    ],
    ko: [
      {
        heading: '연료가 아니라 렌치 세트',
        paragraphs: [
          '효소는 탄수·지방·단백질을 갈아 넣는 일꾼이에요. 일꾼이 현장에 와도 렌치가 없는 경우가 많아요. 그 렌치가 비타민에서 온 보조인자인 경우가 많고요. 렌치가 없으면 재료가 잔뜩 있어도 반응이 멈춰요.',
          '음식이 완성된 보조인자를 바로 주진 않아요. 전구체를 줘요. 피리독신이 활성 B6로, 엽산이 메틸엽산으로, 베타카로틴이 비타민 A로 바뀌는 식이에요. 장과 간이 마무리 조립을 해요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '한 입에서 생화학까지. 단계마다 조건이 있어요.',
            steps: [
              { label: '음식', note: '자연식·강화식' },
              { label: '장 흡수', note: '산·지방·운반체' },
              { label: '혈액 운반', note: '단백질에 결합' },
              { label: '활성 보조인자', note: '효소 가동' },
            ],
          },
        ],
      },
      {
        heading: '흡수를 돕는 것, 막는 것',
        paragraphs: [
          '지용성 비타민은 같은 끼에 지방이 있어야 해요. 무지방 드레싱만 곁들인 샐러드는 달걀의 D나 나물의 K 배달차가 약해요. 올리브유 한 스푼, 견과, 생선이 그림을 바꿔요.',
          '식물성 철은 같은 끼에 [비타민 C](/nutrients/vitamins)가 있으면 흡수가 훨씬 좋아져요. 철 상태가 무너지면 B군·에너지 경로도 흔들릴 수 있고요. 한 끼에 칼슘이나 커피를 너무 많이 먹으면 철과 겹칠 수 있어서, 시간 간격을 두는 게 나아요.',
          '술은 장을 자극하고 B군을 서서히 빼앗아요. 과음은 "하루 실수"보다 조립 라인에 구멍 내는 쪽에 가까워요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '흡수 파트너와 마찰',
            headers: ['영양소', '돕는 것', '방해'],
            rows: [
              ['A·D·E·K', '끼니에 지방 조금', '극저지방 식사, 흡수 장애'],
              ['식물성 철', '같은 끼 비타민 C', '철+칼슘 과다 동시, 차·커피 과다'],
              ['B12', '위산·내인자', '메트포르민, PPI 장기, 악성빈혈'],
              ['엽산', '음식에서 대체로 양호', '알코올, 일부 약물(의사와 상의)'],
            ],
          },
        ],
      },
      {
        heading: '기억할 숫자 (미국 국립보건원 NIH 권장 성인 RDA)',
        paragraphs: [
          '표를 외울 필요는 없어요. 기준점이 있으면 고용량 영양제를 덜 찾게 되거든요. 미국 국립보건원(NIH) 산하 영양보충제 사무국(Office of Dietary Supplements)이 제시한 성인 기준 예시입니다.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '90mg', label: '비타민 C RDA (남); 75mg (여)' },
              { value: '15mcg', label: '비타민 D RDA (600IU), 1–70세' },
              { value: '1.3–1.7mg', label: '비타민 B6 RDA 성인' },
              { value: '2.4mcg', label: '비타민 B12 RDA 성인' },
            ],
          },
          {
            kind: 'callout',
            tone: 'tip',
            title: '음식 먼저, 빈틈만 겨냥',
            body: [
              '무작위 종합비타민보다 끼니로 경로를 채우는 게 먼저예요. 비건·임신·비만 수술 후라면 필요한 것만 골라 보충하는 편이 나아요.',
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '철·나물은 비타민 C랑 같이, 채소·생선은 지방 조금이랑 같이, B군이 중요하면 술은 줄여요. 다음은 [B군·에너지](/blog/vitamins-b-energy), [엽산·B12](/blog/vitamins-b12-folate). [비타민 백과](/nutrients/vitamins)에 영양소별 음식이 있어요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-b-energy',
    seriesId: 'vitamins',
    episode: 3,
    title: {
      en: 'B vitamins and energy: why they unlock fuel, not pour it in',
      ko: 'B군과 에너지: 부어 넣는 게 아니라 꺼내게 돕는 이유',
    },
    thesis: {
      en: 'B1, B2, B3, and B6 do not create calories. They help enzymes convert food into usable energy, which is why deficiency feels like fatigue but extra pills rarely feel like a coffee hit.',
      ko: 'B1·B2·B3·B6는 칼로리를 만들지 않아요. 음식을 쓸 수 있는 에너지로 바꾸는 효소를 돕기 때문에, 결핍은 피곤함처럼 느껴지지만 과다 복용이 커피 한 잔 같진 않아요.',
    },
    description: {
      en: 'What B1, B2, B3, and B6 each do in the energy pathway, NIH RDAs, Korean plate examples, and why "B-complex for energy" marketing oversells the effect.',
      ko: 'B1·B2·B3·B6가 에너지 대사 경로에서 하는 일, 미국 국립보건원(NIH) 권장 하루 섭취량(RDA), 김·나물·고등어 같은 한국 식탁 예시, 그리고 "에너지용 B군" 마케팅 광고가 과장된 이유를 설명합니다.',
    },
    readMinutes: 9,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-how-they-work', 'vitamins-b12-folate', 'vitamins-korean-plate'],
    en: [
      {
        heading: 'The myth: "energy vitamins"',
        paragraphs: [
          'Energy drinks and glowing supplement labels love B vitamins because the chemistry is real. Your cells make ATP using pathways that need thiamin (B1), riboflavin (B2), niacin (B3), and pyridoxine (B6).',
          'But "need for the pathway" is not the same as "more pills equals more energy." If you already meet RDAs from food, extra B vitamins mostly exit in urine (water-soluble) and do not feel like a stimulant. The honest lever for afternoon slump is usually sleep, meal balance, and caffeine timing, not a megadose B-complex.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Unlock, not inject',
            body: [
              'B vitamins help you extract energy from food. They do not replace food, sleep, or a medical workup for unexplained exhaustion.',
            ],
          },
        ],
      },
      {
        heading: 'The four Bs on the energy assembly line',
        paragraphs: [
          'B1 (thiamin) is central to breaking down glucose. Severe shortage shows up as beriberi or Wernicke-Korsakoff in heavy alcohol use, not just "Monday tired."',
          'B2 (riboflavin) and B3 (niacin) shuttle electrons in the mitochondrial chain, the part of the cell that actually churns ATP. B3 can also be made from tryptophan in protein, so low protein can squeeze niacin status indirectly.',
          'B6 helps decarboxylate amino acids and supports hundreds of reactions, including making neurotransmitters. It is the same family used in dopamine synthesis ([dopamine series](/blog/dopamine-guide)), which is why B6 shows up in both stories.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'B vitamins on the energy line (adult RDAs, NIH)',
            headers: ['Vitamin', 'Job on the line', 'RDA (adults)', 'Korean plate examples'],
            rows: [
              ['B1 thiamin', 'Glucose breakdown', '1.2 mg (M), 1.1 mg (F)', 'Pork, brown rice, sesame; 돼지고기, 현미, 깨'],
              ['B2 riboflavin', 'Electron transport', '1.3 mg (M), 1.1 mg (F)', 'Eggs, milk, almonds; 달걀, 우유, 아몬드'],
              ['B3 niacin', 'ATP production, NAD+', '16 mg NE (M), 14 mg (F)', 'Chicken, peanuts, fish; 닭가슴살, 땅콩, 고등어'],
              ['B6 pyridoxine', 'Amino acid handling', '1.3–1.7 mg', 'Fish, potatoes, bananas; 고등어, 감자, 바나나'],
            ],
          },
        ],
      },
      {
        heading: 'When extra B vitamins help, and when they do not',
        paragraphs: [
          'Higher needs show up with heavy training, pregnancy, malabsorption, chronic alcohol, or very refined diets (white rice and instant noodles with almost no legumes). Fortified grains and mixed banchan help.',
          'If you are not in those groups, food-first wins: a bowl with fish or tofu, a side of greens, and whole grains beats a sugar drink with 2000% DV B12 on the label.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '1.2 mg', label: 'thiamin RDA men (NIH)' },
              { value: '16 mg NE', label: 'niacin RDA men (NIH)' },
              { value: '1.7 mg', label: 'B6 RDA adults 19–50 (NIH)' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'High-dose B6 is not "more energy"',
            body: [
              'Chronic very high B6 supplements can cause nerve symptoms. Do not chase energy with grams of B6 without medical guidance.',
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Eat protein and whole grains, rotate fish and legumes, and treat B-complex ads as insurance marketing unless your clinician targets a gap. Next: [folate and B12](/blog/vitamins-b12-folate), where the stakes rise for pregnancy and vegan diets.',
        ],
      },
    ],
    ko: [
      {
        heading: '오해: "에너지 비타민"',
        paragraphs: [
          '에너지 드링크·반짝이는 라벨이 B군을 좋아하는 건 화학이 맞아서예요. 세포가 ATP를 만들 때 티아민(B1), 리보플라빈(B2), 나이아신(B3), 피리독신(B6)이 필요해요.',
          '근데 "경로에 필요"랑 "알약 더 많이 = 에너지 더 많이"는 달라요. 음식으로 RDA를 채우면 추가 B군은 수용성이라 대부분 소변으로 나가고, 자극제처럼 느껴지진 않아요. 오후에 처지는 건 보통 잠, 끼니 균형, 카페인 타이밍부터 봐야 하지, B군 고용량이 커피를 대신하진 않아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '부어 넣기 말고 꺼내기',
            body: [
              'B군은 음식에서 에너지를 꺼내게 돕는 거예요. 식사·수면·원인 모를 피로 진료를 대신하지 않아요.',
            ],
          },
        ],
      },
      {
        heading: '에너지 라인의 B 네 친구',
        paragraphs: [
          'B1(티아민)은 포도당 분해의 중심이에요. 심하게 모자라면 각기병이나 과음 후 뇌병증으로 가는 거지, 그냥 "월요병 피곤" 수준이 아니에요.',
          'B2·B3는 미토콘드리아 전자 운반, ATP를 실제로 찍어내는 구간을 돕죠. B3는 단백질 속 트립토판에서도 만들어져서, 단백질이 너무 적으면 간접으로 나이아신도 빡빡해질 수 있어요.',
          'B6는 아미노산 탈탄산, 신경전달물질 합성 등 반응이 많아요. 도파민 합성에도 나와서 [도파민 시리즈](/blog/dopamine-guide)랑 겹쳐요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '에너지 대사 B군 일일 권장섭취량 (미국 국립보건원 NIH 기준)',
            headers: ['비타민', '라인에서 하는 일', 'RDA (성인)', '한국 식탁 예'],
            rows: [
              ['B1 티아민', '포도당 분해', '1.2mg(남), 1.1mg(여)', '돼지고기, 현미, 깨'],
              ['B2 리보플라빈', '전자 운반', '1.3mg(남), 1.1mg(여)', '달걀, 우유, 아몬드'],
              ['B3 나이아신', 'ATP, NAD+', '16mg NE(남), 14mg(여)', '닭가슴살, 땅콩, 고등어'],
              ['B6 피리독신', '아미노산 처리', '1.3–1.7mg', '고등어, 감자, 바나나'],
            ],
          },
        ],
      },
      {
        heading: '추가가 통할 때, 안 통할 때',
        paragraphs: [
          '운동량 많음, 임신, 흡수 장애, 만성 과음, 흰쌀·인스턴트만 있는 식단에서 필요량이 올라가요. 강화 곡물, 나물·콩 반찬이 도움이 돼요.',
          '여기에 해당 안 되면 음식이 이겨요. 생선·두부 한 그릇에 나물 반찬, 통곡이 라벨에 B12 2000% 적힌 단 음료보다 낫죠.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '1.2mg', label: '티아민 하루 권장섭취량(RDA) 남성 (미국 국립보건원 NIH 기준)' },
              { value: '16mg NE', label: '나이아신 하루 권장섭취량(RDA) 남성 (미국 국립보건원 NIH 기준)' },
              { value: '1.7mg', label: '비타민 B6 하루 권장섭취량(RDA) 성인 19–50세 (미국 국립보건원 NIH 기준)' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'B6 고용량 ≠ 에너지',
            body: [
              'B6를 아주 오래 고용량으로 먹으면 신경 증상이 생길 수 있어요. 의사 없이 그램 단위로 에너지 채우지 마세요.',
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '단백질·통곡, 생선·콩을 돌리고, B군 광고는 클리닉이 빈틈 짚어줄 때만 보험으로 보세요. 다음은 [엽산·B12](/blog/vitamins-b12-folate), 임신·비건에서 판이 커져요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-b12-folate',
    seriesId: 'vitamins',
    episode: 4,
    title: {
      en: 'Folate and B12: pregnancy, vegan diets, alcohol, and the masking trap',
      ko: '엽산과 B12: 임신·비건·술, 그리고 가려지는 함정',
    },
    thesis: {
      en: 'Folate (B9) and B12 share DNA chemistry but need different foods; high folate can hide B12 deficiency on blood counts, which is why pregnancy and vegan plans need both on purpose.',
      ko: '엽산(B9)과 B12는 DNA 작업을 같이 하지만 음식 출처가 달라요. 엽산이 많으면 B12 결핍이 혈액 검사에서 가려질 수 있어서, 임신·비건은 둘 다 의도적으로 챙겨야 해요.',
    },
    description: {
      en: 'B9 and B12 roles, NIH RDAs, why vegans need fortified B12, alcohol and pregnancy risks, and the folate-masks-B12 problem in plain language.',
      ko: '비타민 B9(엽산)과 B12의 역할, 미국 국립보건원(NIH) 권장 하루 섭취량(RDA), 비건 식단에서 강화식품을 통한 B12 섭취의 중요성, 알코올 섭취 및 임신 중 위험성, 그리고 고용량 엽산 섭취가 B12 결핍을 가리는 문제를 쉽게 설명합니다.',
    },
    readMinutes: 10,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-how-they-work', 'vitamins-b-energy', 'vitamins-korean-plate'],
    en: [
      {
        heading: 'Two partners on the same DNA line',
        paragraphs: [
          'Folate (vitamin B9) and vitamin B12 meet on the assembly line that builds DNA and recycles homocysteine. Run low on either and blood cells can balloon (megaloblastic anemia), but the fixes are not interchangeable.',
          'Folate is abundant in legumes and greens: 콩, 시금치나물, 브로콜리. B12 is made by microbes and shows up reliably in animal foods and fortified products: 달걀, 우유, fish, or fortified plant milk labeled with cobalamin.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Same chemistry bench, different supply trucks',
            steps: [
              { label: 'Folate (B9)', note: 'greens, legumes' },
              { label: 'B12', note: 'animal or fortified' },
              { label: 'DNA / methylation', note: 'shared step' },
              { label: 'Healthy red cells', note: 'when both arrive' },
            ],
          },
        ],
      },
      {
        heading: 'NIH numbers and who needs more',
        paragraphs: [
          'Adults need 400 mcg DFE of folate and 2.4 mcg of B12 daily (NIH). Pregnancy pushes folate to 600 mcg DFE to cut neural tube defect risk; clinicians often pair prenatal folate with confirmed B12 status.',
          'Strict vegans should use fortified foods or a labeled B12 supplement, not guess from sea vegetables. Older adults may absorb B12 poorly even with enough on the plate; blood tests and sometimes injections are clinician calls.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '400 mcg DFE', label: 'folate RDA adults (NIH)' },
              { value: '600 mcg DFE', label: 'folate during pregnancy (NIH)' },
              { value: '2.4 mcg', label: 'B12 RDA adults (NIH)' },
            ],
          },
          {
            kind: 'table',
            caption: 'Life stages and practical sources',
            headers: ['Situation', 'Folate focus', 'B12 focus'],
            rows: [
              ['Pregnancy planning', '600 mcg DFE, leafy greens + fortified grains', 'Confirm B12; do not rely on folate alone'],
              ['Vegan', 'Beans, greens, folate-rich banchan', 'Fortified milk/nutritional yeast or supplement'],
              ['Heavy alcohol', 'Depletes both; Wernicke risk with low B1 too', 'Clinician-guided repletion, not DIY megadoses'],
              ['Older adult', 'Greens, legumes', 'Absorption may fail despite diet; test if symptomatic'],
            ],
          },
        ],
      },
      {
        heading: 'The masking trap: folate fixing the lab while B12 still bleeds',
        paragraphs: [
          'Large folate supplements can fix the anemia that shows up on a standard blood count while nerve damage from a B12 deficiency keeps progressing. That is why "just take folic acid" is dangerous advice when B12 was never checked.',
          'Korean tables already carry plenty of folate from banchan, which is good. Vegetarians who eat eggs and dairy still need to watch their B12, and vegans need a real B12 plan, not hope pinned on kim alone.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Folate can hide B12 deficiency',
            body: [
              'High folate may normalize red blood cells while nerve problems worsen. Pregnancy planning and vegan diets should include B12 status, not folate alone.',
            ],
          },
        ],
      },
      {
        heading: 'Alcohol and the gut leak',
        paragraphs: [
          'Alcohol hits the stomach and liver, dropping B12 absorption and draining folate. Drink heavily for long enough and low B1 (thiamin) often comes along too, which is the Wernicke-Korsakoff risk zone. Nutrition support here is medical teamwork, not a shopping-list hack.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Korean plate anchors',
            body: [
              'Folate: 콩나물국, 시금치나물, 두부·콩 반찬. B12: 달걀, 우유, 고등어·꽁치. Vegans: 강화 두유·영양효모 라벨 확인.',
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'If you are pregnant, planning pregnancy, vegan, over 60, or drinking heavily, ask about B12 and folate together. Everyone else: steady greens and legumes plus occasional animal or fortified B12 covers most days. Next in the series: [vitamin C and D](/blog/vitamins-c-and-d) and the [Korean plate guide](/blog/vitamins-korean-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '같은 DNA 라인, 다른 공급',
        paragraphs: [
          '엽산(B9)과 비타민 B12는 DNA 만들기·호모시스테인 재활용 라인에서 만나요. 둘 중 하나라도 모자라면 적혈구가 커지는 거대적아형 빈혈이 올 수 있는데, 해결책은 서로 대체되지 않아요.',
          '엽산은 콩·녹색 채소에 많아요. 콩, 시금치나물, 브로콜리. B12는 미생물이 만들고 동물성·강화식에 확실히 있어요. 달걀, 우유, 생선, 코발라민 적힌 강화 두유요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '같은 작업대, 다른 배송차',
            steps: [
              { label: '엽산(B9)', note: '나물·콩' },
              { label: 'B12', note: '동물성·강화식' },
              { label: 'DNA·메틸화', note: '공동 단계' },
              { label: '건강한 적혈구', note: '둘 다 있을 때' },
            ],
          },
        ],
      },
      {
        heading: '미국 국립보건원(NIH) 권장 수치와 추가 섭취가 필요한 사람',
        paragraphs: [
          '성인은 하루에 엽산 400mcg DFE, 비타민 B12 2.4mcg이 기준치입니다(미국 국립보건원 NIH 기준). 임신 중에는 태아 신경관 결손 예방을 위해 엽산 권장량이 600mcg DFE로 상향됩니다. 산전 엽산 영양제를 고를 때는 비타민 B12의 상태도 함께 확인하여 균형을 맞추는 것이 좋습니다.',
          '엄격한 비건은 강화식이나 라벨 있는 B12 보충이 필요해요. 해조류만으로는 부족한 경우가 많고요. 나이 들면 충분히 먹어도 B12 흡수가 떨어질 수 있어서, 검사·주사는 의사 판단이에요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '400mcg DFE', label: '성인 엽산 하루 권장섭취량(RDA) (미국 국립보건원 NIH 기준)' },
              { value: '600mcg DFE', label: '임신 중 엽산 하루 권장섭취량 (미국 국립보건원 NIH 기준)' },
              { value: '2.4mcg', label: '성인 비타민 B12 하루 권장섭취량(RDA) (미국 국립보건원 NIH 기준)' },
            ],
          },
          {
            kind: 'table',
            caption: '상황별 실전',
            headers: ['상황', '엽산', 'B12'],
            rows: [
              ['임신·계획', '600mcg DFE, 나물·강화곡', 'B12 확인, 엽산만 믿지 않기'],
              ['비건', '콩·나물 반찬', '강화 두유·영양효모 또는 보충'],
              ['과음', '둘 다 빠짐, B1 위험도', '의사 주도 보충, DIY 고용량 X'],
              ['고령', '나물·콩', '먹어도 흡수 실패 가능, 증상 있으면 검사'],
            ],
          },
        ],
      },
      {
        heading: '가려지는 함정: 엽산이 숫자만 예쁘게',
        paragraphs: [
          '엽산을 많이 먹으면 일반 혈액 검사에서 빈혈 수치는 나아 보일 수 있어요. 근데 B12 결핍으로 인한 신경 손상은 그대로 진행되거든요. 그래서 B12 확인도 없이 "엽산만 챙겨"는 건 위험해요.',
          '한국 식탁은 반찬 덕에 엽산이 이미 괜찮은 편이에요. 편식 채식은 B12를 봐야 하고, 비건은 김만으로는 부족할 때가 많아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '엽산이 B12 결핍을 가릴 수 있어요',
            body: [
              '엽산이 많으면 적혈구는 정상처럼 보이는데 신경 문제는 악화될 수 있어요. 임신·비건은 B12까지 같이 보세요.',
            ],
          },
        ],
      },
      {
        heading: '술과 장·간 새는 구멍',
        paragraphs: [
          '술은 위·간을 때려서 B12 흡수를 떨어뜨리고 엽산을 빼앗아요. 만성 과음이면 B1(티아민)까지 같이 모자라는 뇌병증 위험 구간이고요. 이때 영양 관리는 의료팀이랑 같이 하는 일이지, 장보기 꿀팁만으로 끝나지 않아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '한국 식탁 앵커',
            body: [
              '엽산: 콩나물국, 시금치나물, 두부·콩. B12: 달걀, 우유, 고등어·꽁치. 비건: 강화 두유·영양효모 라벨 확인.',
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '임신·계획·비건·60대·과음이면 B12랑 엽산을 묶어서 물어보세요. 그 외엔 나물·콩 꾸준히, 가끔 동물성·강화 B12면 대부분의 날은 커버돼요. 시리즈 다음은 [비타민 C·D](/blog/vitamins-c-and-d), [한국 식탁](/blog/vitamins-korean-plate)이에요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-c-and-d',
    seriesId: 'vitamins',
    episode: 5,
    title: {
      en: 'Vitamin C and D: immunity hype, collagen, sun, and Korean winters',
      ko: '비타민 C·D: 면역 과장, 콜라겐, 햇빛, 한국 겨울',
    },
    thesis: {
      en: 'Vitamin C helps iron absorption and collagen chemistry but does not block every cold; vitamin D needs sun or fish in winter Korea, and blood targets near 20–30 ng/mL are clinician territory, not supplement roulette.',
      ko: '비타민 C는 철 흡수·콜라겐 화학을 돕지만 모든 감기를 막진 않아요. 비타민 D는 햇빛·생선이 필요하고, 한국 겨울엔 부족하기 쉬우며, 혈중 20–30ng/mL 목표는 의사와 검사 영역이지 영양제 도박이 아니에요.',
    },
    description: {
      en: 'Vitamin C for colds vs iron and collagen, vitamin D from sun and fish, winter gaps in Korea, and NIH context for 20–30 ng/mL without megadose hype.',
      ko: '비타민 C 감기·철·콜라겐, D는 햇빛·생선, 한국 겨울 부족, NIH 기준 20–30ng/mL 맥락을 과장 없이 정리해요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-fat-soluble', 'vitamins-korean-plate'],
    en: [
      {
        heading: 'Vitamin C: not a cold shield, still useful',
        paragraphs: [
          'Vitamin C is an antioxidant and a cofactor for collagen cross-links and carnitine synthesis. Marketing turned it into "take 1000 mg when you feel a tickle." In the general population, trials show colds get a little shorter at best, and only if you were already eating enough. Megadoses once symptoms start rarely do much.',
          'Where C really earns its keep is plant iron absorption. Eat spinach, beans, or fortified grains with peppers, citrus, or kimchi in the same meal and the non-heme iron absorbs better. That is everyday nutrition, not a pharmacy stunt.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'C helps chemistry, not miracles',
            body: [
              'A varied plate with fruit and vegetables usually covers C. Reserve high-dose packets for clinician advice, not every sniffle.',
            ],
          },
        ],
      },
      {
        heading: 'Collagen, skin, and the food-first line',
        paragraphs: [
          'Collagen supplements are trendy, but vitamin C is the wrench your body uses to stabilize the collagen you already make. Smoking, sun damage, and skimping on produce hurt skin more than any powder without C and protein.',
          'NIH adult RDAs are 90 mg for men and 75 mg for women. One orange, a handful of strawberries, or a bowl of kimchi with peppers often gets you there. See the [vitamin encyclopedia](/nutrients/vitamins) for food lists.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '90 mg', label: 'vitamin C RDA men (NIH)' },
              { value: '75 mg', label: 'vitamin C RDA women (NIH)' },
              { value: '2–3×', label: 'typical boost to plant iron with C at same meal' },
            ],
          },
          {
            kind: 'table',
            caption: 'Vitamin C jobs vs myths',
            headers: ['Claim', 'Reality'],
            rows: [
              ['Stops all colds', 'Small effect if already low; food variety beats megadose'],
              ['Collagen pills replace C', 'Your body still needs C + protein to build collagen'],
              ['Pairs with plant iron', 'Strong evidence; same-meal peppers or citrus help'],
            ],
          },
        ],
      },
      {
        heading: 'Vitamin D: sun, fish, and the Korea winter gap',
        paragraphs: [
          'Vitamin D is a hormone-like fat-soluble nutrient. Your skin makes it from UVB, but latitude, sunscreen, indoor jobs, and long winters all cut production. Food sources are narrow: fatty fish (고등어, 꽁치), egg yolks, fortified milk.',
          'In Korea, short winter days and a lot of time indoors leave many adults with low 25(OH)D unless they eat fish regularly or supplement on purpose. Darker skin and older age lower what the skin can make, too.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Where D actually comes from',
            steps: [
              { label: 'UVB on skin', note: 'summer midday, brief' },
              { label: 'Fatty fish / eggs', note: 'year-round plate' },
              { label: 'Fortified milk', note: 'check label' },
              { label: 'Supplement', note: 'if tested low, clinician dose' },
            ],
          },
        ],
      },
      {
        heading: 'Blood levels: 20 ng/mL, 30 ng/mL, and NIH context',
        paragraphs: [
          'Labs report 25-hydroxyvitamin D in ng/mL (US) or nmol/L. NIH and Endocrine Society discussions often call below roughly 20 ng/mL (50 nmol/L) deficient and the 20–30 ng/mL band insufficient for bone health, though the ideal target for every outcome is still debated.',
          'Do not chase 80 ng/mL because an influencer said so. Too much D from bottles can cause calcium problems. Test when your risk is high (osteoporosis, malabsorption, very little sun and fish), then dose with medical guidance.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '15 mcg', label: 'vitamin D RDA 600 IU ages 1–70 (NIH)' },
              { value: '<20 ng/mL', label: 'often labeled deficient (NIH context)' },
              { value: '20–30 ng/mL', label: 'insufficiency band many clinicians treat' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Winter is a planning problem, not a panic buy',
            body: [
              'If you eat fish twice weekly and get summer sun, you may be fine. If you are vegan, housebound, or osteoporotic, ask about testing before megadosing.',
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Pair iron-rich plants with C at lunch, keep fatty fish in the rotation, and treat D supplements as a targeted fix once you know your situation, not a default winter multivitamin. Next: [fat-soluble vitamins A, E, K](/blog/vitamins-fat-soluble) and the [Korean plate map](/blog/vitamins-korean-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '비타민 C: 감기 방패 아님, 그래도 쓸모 있음',
        paragraphs: [
          '비타민 C는 항산화·콜라겐 가교·카르니틴 합성에 쓰여요. 광고는 이걸 "목이 칼칼하면 1000mg"으로 바꿔놨죠. 근데 이미 충분히 먹는 사람은 감기 기간이 조금 줄어드는 정도고, 증상 생긴 뒤에 고용량 먹는다고 극적이진 않아요.',
          'C가 확실히 일하는 곳은 식물성 철 흡수예요. 시금치·콩·강화곡에 고추·귤·김치를 같은 끼에 두면 비헴철 흡수가 올라가요. 약국에서 사 먹는 묘기가 아니라 평범한 일상 영양이에요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '화학은 돕고, 기적은 아님',
            body: [
              '과일·채소 다양하면 C는 대체로 채워져요. 고용량 스틱은 의사 조언 때만, 코막힐 때마다가 아니에요.',
            ],
          },
        ],
      },
      {
        heading: '콜라겐, 피부, 음식 먼저',
        paragraphs: [
          '콜라겐 파우더가 유행이지만, 몸이 만드는 콜라겐을 안정시키는 렌치는 비타민 C예요. 사실 피부엔 흡연·자외선·채소 부족이 더 큰 타격이고, C랑 단백질이 빠진 가루만으론 한계가 있어요.',
          'NIH 성인 RDA는 남 90mg, 여 75mg이에요. 귤 하나, 딸기 한 줌, 김치+고추 한 그릇이면 종종 도달해요. 음식 목록은 [비타민 백과](/nutrients/vitamins)에 있어요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '90mg', label: '비타민 C RDA 남성 (NIH)' },
              { value: '75mg', label: '비타민 C RDA 여성 (NIH)' },
              { value: '2–3배', label: '같은 끼 C 있을 때 식물성 철 흡수 상승' },
            ],
          },
          {
            kind: 'table',
            caption: '비타민 C 역할 vs 오해',
            headers: ['말', '실제'],
            rows: [
              ['감기 전부 차단', '이미 충분하면 소폭; 식단 다양성이 고용량보다 나음'],
              ['콜라겐 알약이 C 대체', '몸은 여전히 C+단백질로 콜라겐 조립'],
              ['식물성 철과 짝', '근거 확실, 같은 끼 고추·귤'],
            ],
          },
        ],
      },
      {
        heading: '비타민 D: 햇빛, 생선, 한국 겨울',
        paragraphs: [
          '비타민 D는 호르몬처럼 일하는 지용성 영양소예요. 피부가 UVB로 만들지만, 위도·선크림·실내·긴 겨울이 생산을 깎아요. 음식은 좁아요. 등푸른생선(고등어, 꽁치), 달걀 노른자, 강화 우유요.',
          '한국은 겨울 낮이 짧고 실내에서 보내는 시간이 많아요. 그래서 생선을 자주 안 먹고 따로 보충도 안 하면 25(OH)D가 낮아지기 쉬워요. 피부가 어둡거나 나이가 들면 피부에서 만드는 양도 줄고요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'D가 실제로 오는 곳',
            steps: [
              { label: '피부 UVB', note: '여름 한낮, 짧게' },
              { label: '등푸른생선·달걀', note: '연중 식탁' },
              { label: '강화 우유', note: '라벨 확인' },
              { label: '보충', note: '검사 후 의사 용량' },
            ],
          },
        ],
      },
      {
        heading: '혈중 수치: 20·30ng/mL, NIH 맥락',
        paragraphs: [
          '검사는 25-하이드록시비타민 D를 ng/mL(미국)나 nmol/L로 알려줘요. NIH나 내분비 학회 논의를 보면 대략 20ng/mL(50nmol/L) 미만은 결핍, 20–30ng/mL 구간은 골 건강 측면에서 부족으로 보는 경우가 많아요. 다만 질환마다 최적값이 얼마인지는 아직 논쟁 중이에요.',
          '인플루언서 말 듣고 80ng/mL을 쫓지 마세요. 병으로 과하면 칼슘 문제가 생겨요. 해·생선이 거의 없거나 골다공증·흡수 장애면 검사 후 의사와 용량을 정하세요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '15mcg', label: '비타민 D RDA 600IU, 1–70세 (NIH)' },
              { value: '<20ng/mL', label: 'NIH 맥락에서 결핍으로 부르는 경우' },
              { value: '20–30ng/mL', label: '많은 진료에서 보충 검토 구간' },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: '겨울은 계획 문제, 공황 구매 아님',
            body: [
              '생선 주 2회·여름 햇빛이면 괜찮을 수 있어요. 비건·실내 생활·골다공증이면 고용량 전에 검사부터요.',
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '점심에 철 나물+비타민 C, 등푸른생선은 돌리고, D 보충은 맥락·검사 후 겨냥해요. 다음은 [지용성 A·E·K](/blog/vitamins-fat-soluble), [한국 식탁](/blog/vitamins-korean-plate)이에요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-fat-soluble',
    seriesId: 'vitamins',
    episode: 6,
    title: {
      en: 'Fat-soluble vitamins A, D, E, K: storage, upper limits, and warfarin',
      ko: '지용성 A·D·E·K: 저장, 상한선, 와파린',
    },
    thesis: {
      en: 'Vitamins A, D, E, and K ride with fat and can build up in tissue, so NIH upper limits matter, especially for A and D megadoses and vitamin K when you take warfarin.',
      ko: '비타민 A·D·E·K는 지방을 타고 조직에 쌓일 수 있어서 NIH 상한선이 중요해요. A·D 고용량, 와파린 쓰는 사람의 K는 특히 조심해야 해요.',
    },
    description: {
      en: 'How fat-soluble vitamins store, NIH tolerable upper intake levels for A, D, and E, and why vitamin K and warfarin need clinician coordination.',
      ko: '지용성 비타민 저장, A·D·E NIH 상한(UL), 비타민 K와 와파린은 의사와 맞춰야 하는 이유를 설명해요.',
    },
    readMinutes: 10,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-c-and-d', 'vitamins-supplements'],
    en: [
      {
        heading: 'Why fat-soluble vitamins stick around',
        paragraphs: [
          'Unlike B vitamins and C, vitamins A, D, E, and K dissolve in fat droplets, travel with chylomicrons, and can lodge in liver and fat tissue. That helps during lean seasons, but it gets dangerous when a bottle delivers years of RDA in one week.',
          'Meals still matter. A carrot salad with no fat barely delivers its carotenoids, and vitamin K from spinach absorbs better with a little oil. The [vitamin encyclopedia](/nutrients/vitamins) lists food sources and ULs side by side.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Stored means dose errors linger',
            body: [
              'Water-soluble excess often leaves in urine. Fat-soluble excess can accumulate until symptoms or labs flag harm.',
            ],
          },
        ],
      },
      {
        heading: 'NIH upper limits you should not blow past',
        paragraphs: [
          'Tolerable Upper Intake Levels (UL) are the daily max from food plus supplements that is unlikely to harm a healthy adult. They are not targets to hit. They are guardrails.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Adult UL highlights (NIH Office of Dietary Supplements)',
            headers: ['Vitamin', 'UL (adults)', 'What goes wrong above UL'],
            rows: [
              ['A (preformed retinol)', '3,000 mcg RAE', 'Liver toxicity, bone risk with chronic excess'],
              ['D', '100 mcg (4,000 IU)', 'Hypercalcemia, kidney stones'],
              ['E (alpha-tocopherol)', '1,000 mg', 'Bleeding risk especially with anticoagulants'],
              ['K', 'No UL set', 'Warfarin interaction: consistency beats avoidance panic'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '3,000 mcg', label: 'vitamin A UL adults (NIH)' },
              { value: '4,000 IU', label: 'vitamin D UL adults (NIH)' },
              { value: '1,000 mg', label: 'vitamin E UL adults (NIH)' },
            ],
          },
        ],
      },
      {
        heading: 'Vitamin A and E in real meals',
        paragraphs: [
          'Preformed vitamin A lives in liver, dairy, and eggs. Beta-carotene from carrots and sweet potatoes converts only up to a ceiling, so eating a lot of plants is more likely to tint your skin orange than to poison you.',
          'Vitamin E is in nuts, seeds, and vegetable oils. Most people get enough without 400 IU capsules. High-dose E supplements can interfere with clotting, especially alongside blood thinners.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Food anchors vs bottle risk',
            headers: ['Vitamin', 'Korean-friendly foods', 'Bottle caution'],
            rows: [
              ['A', '달걀, 간 occasionally, carrot banchan', 'Fish liver oil, retinol stacks'],
              ['E', '아몬드, 들기름, 참기름', 'High IU softgels + anticoagulants'],
              ['K', '나물, 김, 두부, fermented greens', 'Sudden megadose on warfarin'],
            ],
          },
        ],
      },
      {
        heading: 'Vitamin K and warfarin: consistency, not fear',
        paragraphs: [
          'Vitamin K helps clotting factors switch on. Warfarin blocks vitamin K recycling, which is why clinics track your INR. The mistake is swinging from no greens to huge kale smoothies overnight. Keep leafy intake steady, and tell your clinician before starting any new supplement.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Do not ghost your greens on warfarin',
            body: [
              'Sudden large changes in vitamin K foods or supplements shift INR. Coordinate with your prescriber; do not self-stop vegetables.',
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Eat colorful plants and fish with some fat, treat retinol and D bottles as serious medicine, and bring your clinician in on vitamin K if you take a blood thinner. Next: [supplements and labels](/blog/vitamins-supplements), or back to the [series hub](/blog/vitamins-guide).',
        ],
      },
    ],
    ko: [
      {
        heading: '지용성 비타민이 남는 이유',
        paragraphs: [
          'B군·C와 달리 A·D·E·K는 지방 방울에 녹아 키로미크론을 타고 간·지방에 쌓일 수 있어요. 먹을 게 적을 땐 도움이 되지만, 영양제 한 병으로 몇 년치 RDA를 한 주에 털어 넣으면 위험해요.',
          '끼니도 중요해요. 기름 없는 당근 샐러드는 카로티노이드가 잘 안 넘어가고, 시금치의 K는 기름이 있어야 흡수가 나아요. 음식이랑 UL은 [비타민 백과](/nutrients/vitamins)에 같이 정리돼 있어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '쌓이면 실수도 오래 감',
            body: [
              '수용성은 소변으로 많이 나가지만, 지용성 과다는 증상·검사가 뜰 때까지 남을 수 있어요.',
            ],
          },
        ],
      },
      {
        heading: 'NIH 상한선(UL), 넘기면 안 되는 숫자',
        paragraphs: [
          'UL은 건강한 성인이 음식이랑 보충제로 하루에 먹어도 해가 적을 최대치예요. 채워야 할 목표가 아니라 가드레일이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '성인 UL 요약 (NIH ODS)',
            headers: ['비타민', 'UL (성인)', '과다 시'],
            rows: [
              ['A(레티놀)', '3,000mcg RAE', '간 독성, 만성 골 위험'],
              ['D', '100mcg(4,000IU)', '고칼슘혈증, 신장결석'],
              ['E(알파-토코페롤)', '1,000mg', '출혈 위험, 항응고제와 겹침'],
              ['K', 'UL 없음', '와파린: 일관성이 회피 공황보다 중요'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '3,000mcg', label: '비타민 A UL 성인 (NIH)' },
              { value: '4,000IU', label: '비타민 D UL 성인 (NIH)' },
              { value: '1,000mg', label: '비타민 E UL 성인 (NIH)' },
            ],
          },
        ],
      },
      {
        heading: 'A·E는 식탁 vs 병',
        paragraphs: [
          '레티놀 형태 A는 간·유제품·달걀에 있고, 베타카로틴은 당근·고구마에서 전환돼요. 베타카로틴은 전환에 한계가 있어서, 식물만 많이 먹으면 독성보다 피부가 노래지는 게 먼저 오는 경우가 많아요.',
          'E는 견과·씨·식물성 기름에 있어요. 대부분 식단만으로 RDA가 채워지고, 400IU 캡슐을 항응고제랑 같이 먹으면 출혈 위험이 커질 수 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '음식 앵커 vs 병 위험',
            headers: ['비타민', '한국 식탁', '병 주의'],
            rows: [
              ['A', '달걀, 가끔 간, 당근 반찬', '어간기름, 레티놀 중첩'],
              ['E', '아몬드, 들기름, 참기름', '고 IU+항응고'],
              ['K', '나물, 김, 두부, 발효 채소', '와파린 중 갑작스런 고용량'],
            ],
          },
        ],
      },
      {
        heading: '비타민 K와 와파린: 두려움 말고 일관성',
        paragraphs: [
          'K는 응고 인자를 켜고, 와파린은 K 재활용을 막아요. 그래서 병원에서 INR을 보는 거고요. 흔한 실수가 나물을 아예 안 먹다가 하루아침에 케일 스무디로 폭주하는 거예요. 잎채소 양은 일정하게 유지하고, 새 보충제는 먹기 전에 처방의와 상의하세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '와파린인데 나물을 없애지 마세요',
            body: [
              'K 식품·보충 변화는 INR을 흔들어요. 스스로 채소를 끊지 말고, 처방의와 맞추세요.',
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '채소·생선에 지방 조금 곁들이고, 레티놀·D 병은 약처럼 다루세요. 항응고제를 쓰는 중이면 K 섭취 변화는 의사와 상의하고요. 다음은 [영양제·라벨](/blog/vitamins-supplements), 허브는 [시리즈 1편](/blog/vitamins-guide)이에요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-korean-plate',
    seriesId: 'vitamins',
    episode: 7,
    title: {
      en: 'The Korean plate: 나물, 김, eggs, tofu, and mackerel for everyday vitamins',
      ko: '한국 식탁: 나물·김·달걀·두부·고등어로 비타민 채우기',
    },
    thesis: {
      en: 'A typical Korean table already spreads B vitamins, folate, C, and K across banchan; tiredness is not proof of deficiency, and logging a week in the Analyzer beats buying another multivitamin on guesswork.',
      ko: '흔한 한국 식탁은 반찬으로 B군·엽산·C·K를 이미 나눠 줘요. 피곤이 결핍 증거는 아니고, 일주일 기록이 또 종합비타민 사기보다 나아요.',
    },
    description: {
      en: 'How 나물, 김, 달걀, 두부, and 고등어 cover common vitamin gaps, when symptoms warrant labs, and using the Analyzer before supplement shopping.',
      ko: '나물·김·달걀·두부·고등어가 비타민을 어떻게 채우는지, 증상과 검사 차이, 영양제 사기 전 Analyzer 쓰는 법.',
    },
    readMinutes: 9,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-b-energy', 'vitamins-supplements'],
    en: [
      {
        heading: 'Banchan as a vitamin delivery system',
        paragraphs: [
          'Korean meals rarely lean on one hero food. They stack small portions: spinach 나물 for folate and K, bean sprouts for folate, kim and pickles for C, eggs and tofu for B2 and B12 (if you are not vegan), mackerel for B12, D, and niacin.',
          'White rice and one fried item is weak. Rice with three vegetable sides and a protein is strong. That is the same food-first upkeep the [vitamin hub](/blog/vitamins-guide) describes.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Staples and what they carry',
            headers: ['Food', 'Vitamins highlighted', 'Plate tip'],
            rows: [
              ['나물 (spinach, bean sprout)', 'Folate, K, some C', 'Rotate colors, not only kimchi'],
              ['김 / seaweed', 'Iodine partner, some B12 analogs unreliable', 'Pair with fish or eggs for B12'],
              ['달걀', 'B2, B12, A, D in yolk', 'Boiled eggs as daily anchor'],
              ['두부 / 콩', 'Folate, some B vitamins', 'Vegans still need fortified B12'],
              ['고등어 / 꽁치', 'B12, D, niacin', 'Twice weekly covers winter D partly'],
            ],
          },
        ],
      },
      {
        heading: 'Symptoms vs diagnosis',
        paragraphs: [
          'An afternoon slump, dry skin, or a cold does not map cleanly onto "low vitamin X." Real deficiency shows up with duration, a diet pattern, labs, or medical signs behind it: numb hands (B12), night blindness (A), bleeding gums (severe C), or INR swings on warfarin (K).',
          'Creator content that diagnoses you from a selfie is entertainment. If you are vegan, pregnant, malabsorbing, or drinking heavily, ask for targeted tests instead of a cart full of letters.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Signals are clues, not labels',
            body: [
              'Track meals for a week before blaming vitamins. Persistent neurological or pregnancy issues belong with clinicians.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '3+', label: 'vegetable sides beats one pickle for folate/K' },
              { value: '2×/wk', label: 'fatty fish target for D and B12' },
              { value: '7 days', label: 'meal log window before supplement leap' },
            ],
          },
        ],
      },
      {
        heading: 'Use the Analyzer before the pharmacy aisle',
        paragraphs: [
          'The site [Analyzer](/analyzer) lets you log meals and see whether your week already covers the broad patterns (a spread of B vitamins, folate, C, and fat for A/D/E/K). It is a reality check, not a stand-in for lab work.',
          'If your logs show steady fish, eggs, and 나물 and you still feel awful, look at sleep, iron, thyroid, and mental health before reaching for another multivitamin. B vitamins tie into dopamine chemistry too ([dopamine guide](/blog/dopamine-guide)), if mood and focus are what worry you.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Food-first check before bottles',
            steps: [
              { label: 'Log 7 days', note: 'Analyzer or paper' },
              { label: 'Spot gaps', note: 'no fish, no greens, vegan B12' },
              { label: 'Adjust plate', note: 'banchan + protein' },
              { label: 'Test if flagged', note: 'pregnancy, vegan, neuro symptoms' },
            ],
          },
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Keep 나물 and fish as weekly non-negotiables, lean on eggs or fortified B12 if you are vegan, and treat symptoms as a reason to log, not to panic-buy. Next: [supplements, %DV, and myths](/blog/vitamins-supplements). Full numbers live in [vitamins](/nutrients/vitamins).',
        ],
      },
    ],
    ko: [
      {
        heading: '반찬이 비타민 배달 시스템',
        paragraphs: [
          '한국 식사는 한 가지 히어로 음식에 안 묶여요. 시금치 나물(엽산·K), 콩나물(엽산), 김치·절임(C), 달걀·두부(B2·B12, 비건 아닐 때), 고등어(B12·D·나이아신)가 층층이 쌓여요.',
          '흰밥+튀김 하나는 약하고, 밥+나물 셋+단백질은 강해요. [비타민 허브](/blog/vitamins-guide)가 말한 음식 우선 관리랑 같은 패턴이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '기본 식재료와 담긴 비타민',
            headers: ['음식', '비타민', '팁'],
            rows: [
              ['나물(시금치, 콩나물)', '엽산, K, C 일부', '김치만 반복 말고 색 돌리기'],
              ['김·해조', '요오드 짝, B12 유사체는 신뢰 X', 'B12는 생선·달걀과'],
              ['달걀', 'B2, B12, A, D(노른자)', '삶은 달걀을 매일 앵커로'],
              ['두부·콩', '엽산, B군 일부', '비건은 강화 B12 필수'],
              ['고등어·꽁치', 'B12, D, 나이아신', '주 2회면 겨울 D도 일부'],
            ],
          },
        ],
      },
      {
        heading: '증상 vs 진단',
        paragraphs: [
          '오후에 처지거나, 피부가 건조하거나, 감기 걸리는 게 "비타민 X 부족"으로 깔끔하게 떨어지진 않아요. 진짜 결핍은 기간이나 식단, 검사, 의료 신호가 뒤에 같이 있어요. 손발 저림(B12), 야맹(A), 잇몸 출혈(심한 C), 와파린 쓸 때 INR 흔들림(K) 같은 식으로요.',
          '셀카 보고 진단해 주는 콘텐츠는 오락이에요. 비건이거나 임신·흡수 장애·과음 중이면, 알파벳 영양제 바구니 말고 겨냥한 검사를 물어보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '신호는 단서, 라벨 아님',
            body: [
              '비타민 탓하기 전에 일주일 식단을 보세요. 신경·임신 이슈는 진료가 먼저예요.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '3+', label: '나물 반찬이 김치 하나보다 엽산·K에 유리' },
              { value: '주2회', label: '등푸른생선 D·B12 목표' },
              { value: '7일', label: '영양제 점프 전 기록 기간' },
            ],
          },
        ],
      },
      {
        heading: '약국 전에 Analyzer로 확인',
        paragraphs: [
          '사이트 [Analyzer](/analyzer)에 식단을 넣으면 한 주 동안 B군·엽산·C, 지용성용 지방 패턴을 이미 채웠는지 볼 수 있어요. 검사를 대신하는 건 아니고 현실 점검이에요.',
          '기록을 보니 생선·달걀·나물은 잘 챙기는데도 계속 컨디션이 안 좋다면, 잠·철·갑상선·정신건강을 먼저 살펴보세요. 기분이나 집중이 걱정이면 B군이 도파민 경로와도 얽혀 있어요([도파민 가이드](/blog/dopamine-guide)).',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '병 사기 전 음식 먼저',
            steps: [
              { label: '7일 기록', note: 'Analyzer 또는 수기' },
              { label: '빈틈 찾기', note: '생선 없음, 나물 없음, 비건 B12' },
              { label: '식탁 수정', note: '반찬+단백질' },
              { label: '필요 시 검사', note: '임신·비건·신경 증상' },
            ],
          },
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '나물·생선을 주간 필수로, 비건은 달걀 대신 강화 B12, 증상은 기록 신호로 쓰세요. 다음은 [영양제·%DV](/blog/vitamins-supplements). 숫자 전체는 [비타민](/nutrients/vitamins)에 있어요.',
        ],
      },
    ],
  },
  {
    slug: 'vitamins-supplements',
    seriesId: 'vitamins',
    episode: 8,
    title: {
      en: 'Supplements: reading %DV, multivitamin myths, and when to test blood',
      ko: '영양제: %DV 읽기, 종합비타민 오해, 검사 시점',
    },
    thesis: {
      en: 'Labels with 500% DV are marketing noise, not better nutrition. A food-first decision tree beats reaching for a default multivitamin, and blood tests matter for B12, D, and pregnancy, not for guessing at fatigue.',
      ko: '라벨 500% DV는 영양이 아니라 광고 소리예요. 음식 우선 결정 나무가 종합비타민 기본값보다 낫고, B12·D·임신처럼 맥락 있을 때만 혈액 검사가 의미 있어요.',
    },
    description: {
      en: 'How %DV on labels works, why multivitamins oversell, a food-first decision tree, when labs help, and linking back to the vitamin series hub.',
      ko: '%DV 표기, 종합비타민 과장, 음식 우선 결정 흐름, 검사가 필요한 때, 시리즈 허브로 돌아가기.',
    },
    readMinutes: 10,
    datePublished: '2026-06-05',
    relatedSlugs: ['vitamins-guide', 'vitamins-korean-plate', 'vitamins-fat-soluble'],
    en: [
      {
        heading: '%DV on the label is not a grade',
        paragraphs: [
          'Percent Daily Value compares one serving to a general 2,000 kcal reference diet. "500% vitamin B12" sounds like winning, but it usually just means the pill is loud, not that your cells use five times more.',
          'Extra water-soluble vitamins mostly leave in urine. Extra fat-soluble ones (A, D, E) build toward the UL. So check retinol versus beta-carotene, D2 versus D3, and whether you already drink fortified milk or take fish oil.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Label reading in one pass',
            headers: ['Line', 'What to ask'],
            rows: [
              ['%DV >300%', 'Do I already get this food? Am I stacking two products?'],
              ['Fat-soluble high %', 'Am I near NIH UL with diet + pill?'],
              ['"Blend" or proprietary mix', 'Hidden doses; skip if unclear'],
              ['Third-party seal', 'USP/NSF helps, but food-first still wins'],
            ],
          },
        ],
      },
      {
        heading: 'Multivitamin myths',
        paragraphs: [
          'The "insurance policy" multivitamin rarely fixes a specific gap. It sprinkles a little of everything, which can mask a B12 deficiency with folate, or push your fat-soluble totals up if you also take fish liver oil and vitamin D gummies.',
          'Athletes, pregnancy, vegan diets, and malabsorption call for specific nutrients, not alphabet soup. People who eat a lot of Korean banchan often clear folate and K easily while still coming up short on winter D or, for vegans, B12.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Target gaps, not the whole alphabet',
            body: [
              'Identify the hole (B12, D, folate in pregnancy) then pick one product. Random multis are scattershot, not precision.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1', label: 'primary gap per season beats 20-in-1' },
              { value: '4,000 IU', label: 'vitamin D UL ceiling to respect (NIH)' },
              { value: '0', label: 'proof that multi fixes unexplained fatigue alone' },
            ],
          },
        ],
      },
      {
        heading: 'Food-first decision tree',
        paragraphs: [
          'Start with a week of real meals, logged in the [Analyzer](/analyzer) or a notebook. If fish, eggs, 나물, and fruit keep showing up, hold off on supplements unless a clinician flagged a lab.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Before you buy bottles',
            steps: [
              { label: 'Log meals 7 days', note: 'see pattern' },
              { label: 'Adjust plate', note: 'fish, greens, fat for A/D/E/K' },
              { label: 'Still at risk?', note: 'vegan, pregnancy, winter D' },
              { label: 'Single-nutrient or test', note: 'B12, 25(OH)D, folate plan' },
              { label: 'Revisit in 3 months', note: 'avoid stack creep' },
            ],
          },
        ],
      },
      {
        heading: 'When blood tests help',
        paragraphs: [
          'Worth doing: B12 with neurological symptoms or on a vegan diet; 25(OH)D if you have osteoporosis risk, malabsorption, or rarely get sun and fish; folate plus B12 when planning a pregnancy. Not worth doing: screening every vitamin because an ad said "panel."',
          'Fatigue on its own is a weak reason to test. Thyroid trouble, low iron, sleep apnea, and depression all overlap with it. If supplements are piling up and you have no labs, take the list to a clinician.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Bring the bottle list',
            body: [
              'Photos of labels beat memory. Include fish oil, D gummies, and fortified drink totals.',
            ],
          },
        ],
      },
      {
        heading: 'Close the loop: back to the hub',
        paragraphs: [
          'Vitamins are maintenance, not magic. Head back to the [series hub](/blog/vitamins-guide) for the map, the [Korean plate](/blog/vitamins-korean-plate) for staples, [fat-soluble limits](/blog/vitamins-fat-soluble) for the UL guardrails, and [vitamins](/nutrients/vitamins) for food tables. Eat first, supplement on purpose, and test when your situation calls for it.',
        ],
      },
    ],
    ko: [
      {
        heading: '%DV는 성적표가 아니에요',
        paragraphs: [
          '일일 섭취율(%DV)은 한 서빙을 2,000kcal 기준 식단과 비교한 거예요. "B12 500%"는 이긴 게 아니라 그냥 라벨 소리가 큰 거예요. 세포가 다섯 배 쓰는 게 아니거든요.',
          '수용성은 남으면 대부분 소변으로 빠지지만, 지용성(A·D·E)은 UL 쪽으로 차곡차곡 쌓여요. 그래서 레티놀인지 베타카로틴인지, D2인지 D3인지, 강화 우유나 어유를 이미 먹고 있는지 확인하세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '라벨 한 번에 읽기',
            headers: ['항목', '질문'],
            rows: [
              ['%DV 300% 초과', '음식으로 이미 충분? 제품 중복?'],
              ['지용성 고%', '식단+알약이 NIH UL 근처?'],
              ['블렌드·독점 배합', '함량 불투명하면 패스'],
              ['인증 마크', 'USP/NSF는 도움, 음식 우선은 변함없음'],
            ],
          },
        ],
      },
      {
        heading: '종합비타민 오해',
        paragraphs: [
          '"보험용" 종합비타민은 정작 빈틈을 잘 못 막아요. 모든 걸 조금씩 넣다 보니 엽산이 B12 결핍을 가리거나, 어간기름이랑 D 젤리까지 겹쳐서 지용성이 쌓이기도 하고요.',
          '운동량 많은 사람, 임신, 비건, 흡수 장애는 특정 영양소가 필요하지 알파벳 모음이 필요한 게 아니에요. 반찬 많이 먹는 한국 식단은 엽산·K는 넉넉한데 겨울 D나 비건의 B12는 비는 경우가 많아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '알파벳 말고 빈틈만',
            body: [
              '구멍(B12, D, 임신 엽산)을 찾고 제품 하나를 고르세요. 무작위 종합은 산탄총이에요.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1', label: '계절당 주요 1가지가 20in1보다 나음' },
              { value: '4,000IU', label: '비타민 D UL 상한 (NIH)' },
              { value: '0', label: '종합비타민만으로 설명되는 피로 근거' },
            ],
          },
        ],
      },
      {
        heading: '음식 우선 결정 나무',
        paragraphs: [
          '일단 일주일치 실제 식단부터 기록해요. [Analyzer](/analyzer)나 수기로요. 생선·달걀·나물·과일이 계속 보이면, 병원이 검사로 짚어준 게 아닌 한 보충은 미뤄도 돼요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '병 사기 전',
            steps: [
              { label: '7일 기록', note: '패턴 보기' },
              { label: '식탁 조정', note: '생선, 나물, A/D/E/K용 지방' },
              { label: '위험군?', note: '비건, 임신, 겨울 D' },
              { label: '단일 영양소·검사', note: 'B12, 25(OH)D, 엽산 계획' },
              { label: '3개월 후 재점검', note: '중첩 방지' },
            ],
          },
        ],
      },
      {
        heading: '혈액 검사가 통할 때',
        paragraphs: [
          '할 만한 경우: 신경 증상이 있거나 비건일 때의 B12, 골다공증·흡수 장애가 있거나 해·생선이 거의 없을 때의 25(OH)D, 임신 계획 중의 엽산+B12. 굳이 안 해도 되는 경우: 광고가 "패널"이라고 해서 모든 비타민을 다 찍어보는 거요.',
          '피로 하나만으로는 검사 트리거가 약해요. 갑상선·철·수면무호흡·우울이 다 겹치거든요. 검사도 없이 영양제만 쌓이고 있으면, 라벨 사진 챙겨서 진료를 보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '병 목록을 가져가세요',
            body: [
              '기억보다 라벨 사진. 어유, D 젤리, 강화 음료 합산까지요.',
            ],
          },
        ],
      },
      {
        heading: '허브로 돌아가기',
        paragraphs: [
          '비타민은 관리지 마법이 아니에요. [시리즈 허브](/blog/vitamins-guide)에서 지도를, [한국 식탁](/blog/vitamins-korean-plate)에서 반찬, [지용성 상한](/blog/vitamins-fat-soluble)에서 UL, [비타민](/nutrients/vitamins)에서 음식표를 보세요. 먹고, 필요할 때만 보충하고, 이야기가 맞을 때 검사하세요.',
        ],
      },
    ],
  },
];
