import type { BlogArticle } from './types';

export const mineralArticles: BlogArticle[] = [
  {
    slug: 'minerals-guide',
    seriesId: 'minerals',
    episode: 1,
    title: {
      en: 'Minerals: the inorganic toolkit for bone, blood, and nerves',
      ko: '미네랄: 뼈·혈액·신경을 만드는 무기 재료',
    },
    thesis: {
      en: 'Minerals are not calories and not vitamins. They are inorganic elements your body uses for bone, fluid balance, oxygen transport, and enzyme work—and most gaps are pattern problems, not one missing superfood.',
      ko: '미네랄은 칼로리도 비타민도 아니에요. 뼈·수분·산소 운반·효소에 쓰이는 무기 원소이고, 부족은 보통 한 가지 슈퍼푸드가 아니라 식단 패턴에서 나와요.',
    },
    description: {
      en: 'A hub on macro vs trace minerals, how they differ from vitamins, and the eight-part series map.',
      ko: '다량·미량 미네랄, 비타민과 차이, 8편 시리즈 지도를 허브로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-20',
    relatedSlugs: ['minerals-iron', 'minerals-calcium-magnesium', 'minerals-everyday-plate', 'minerals-sodium-potassium'],
    en: [
      {
        heading: 'What minerals are (and what they are not)',
        paragraphs: [
          'Vitamins are organic molecules. Minerals are elements—calcium in bone, iron in hemoglobin, sodium and potassium in nerve signals. You need some in grams per day (macrominerals) and others in milligrams or micrograms (trace minerals).',
          'Marketing blurs lines: "electrolyte water" for a desk job, mega-dose calcium for everyone, or diagnosing fatigue as "low minerals" from a mood post. This series stays in food-first nutrition and points to labs when the story is medical.',
          'The [minerals encyclopedia](/nutrients/minerals) lists functions, food tables, and upper limits. These articles walk topics in order.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'One line to keep',
            body: [
              'Minerals maintain structure and signals; tired does not automatically mean supplement shopping.',
            ],
          },
        ],
      },
      {
        heading: 'Macro vs trace',
        paragraphs: [
          'Macrominerals—calcium, phosphorus, magnesium, sodium, potassium, chloride—show up in larger daily amounts. Trace minerals—iron, zinc, copper, selenium, iodine—matter in smaller doses but are equally essential.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Two mineral families',
            headers: ['Group', 'Examples', 'Daily scale', 'Practical note'],
            rows: [
              ['Macro', 'Ca, Mg, Na, K', '100 mg+', 'Electrolytes + bone'],
              ['Trace', 'Fe, Zn, Se, I', 'mg–mcg', 'Small amounts, big jobs'],
              ['Overlap', 'Iron', '8–18 mg adults', 'Heme vs non-heme in Part 2'],
              ['Safety', 'Na, Se, Fe pills', 'UL exists', 'See Parts 4, 5, 8'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1,000 mg', label: 'calcium RDA (adults, NIH)' },
              { value: '8–18 mg', label: 'iron RDA range' },
              { value: '2,300 mg', label: 'sodium UL (US adults)' },
            ],
          },
        ],
      },
      {
        heading: 'Series map',
        paragraphs: [
          'Dopamine chemistry needs iron and magnesium too—covered lightly in the [dopamine foods article](/blog/dopamine-foods); here we focus on minerals for the whole body.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[Iron & anemia basics](/blog/minerals-iron)'],
              ['Part 3', '[Calcium & magnesium](/blog/minerals-calcium-magnesium)'],
              ['Part 4', '[Sodium & potassium](/blog/minerals-sodium-potassium)'],
              ['Part 7', '[US everyday plate](/blog/minerals-everyday-plate)'],
              ['Encyclopedia', '[Mineral foods & limits](/nutrients/minerals)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '미네랄이 뭐고, 뭐가 아닌지',
        paragraphs: [
          '비타민은 유기 분자예요. 미네랄은 원소예요. 뼈의 칼슘, 헤모글로빈의 철, 신경 신호의 나트륨·칼륨. 하루에 그램 단위(다량)와 밀리·마이크로그램 단위(미량)가 같이 필요해요.',
          '"전해질 음료", 누구에게나 칼슘 고용량, 피곤=미네랄 결핍 같은 말은 헷갈리게 만들어요. 이 시리즈는 음식 우선이고, 의료 이야기면 검사·진료로 보내요.',
          '[미네랄 백과](/nutrients/minerals)에 기능·음식·상한이 있어요. 이 글들은 순서대로 풀어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억',
            body: [
              '미네랄은 구조와 신호를 유지해요. 피곧다고 바로 영양제 살 일은 아닐 때가 많아요.',
            ],
          },
        ],
      },
      {
        heading: '다량 vs 미량',
        paragraphs: [
          '다량은 칼슘·인·마그네슘·나트륨·칼륨·염소. 미량은 철·아연·구리·셀레늄·요오드. 양은 작아도 필수예요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '미네랄 두 가족',
            headers: ['구분', '예', '규모', '실전'],
            rows: [
              ['다량', 'Ca, Mg, Na, K', '100mg+', '전해질·뼈'],
              ['미량', 'Fe, Zn, Se, I', 'mg–mcg', '적은 양, 큰 역할'],
              ['겹침', '철', '8–18mg', '2편 헴/비헴'],
              ['안전', 'Na, Se, 철제', 'UL 있음', '4·5·8편'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1,000mg', label: '칼슘 RDA (성인, NIH)' },
              { value: '8–18mg', label: '철 RDA 구간' },
              { value: '2,300mg', label: '나트륨 UL (미국 성인)' },
            ],
          },
        ],
      },
      {
        heading: '시리즈 지도',
        paragraphs: [
          '도파민 합성에도 철·마그네슘이 필요해요—[도파민 음식](/blog/dopamine-foods)에서 가볍게, 여기선 몸 전체 미네랄에 맞출게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[철·빈혈 기초](/blog/minerals-iron)'],
              ['3편', '[칼슘·마그네슘](/blog/minerals-calcium-magnesium)'],
              ['4편', '[나트륨·칼륨](/blog/minerals-sodium-potassium)'],
              ['7편', '[한국 식탁](/blog/minerals-everyday-plate)'],
              ['백과', '[미네랄 음식·상한](/nutrients/minerals)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'minerals-iron',
    seriesId: 'minerals',
    episode: 2,
    title: {
      en: 'Iron: heme vs non-heme, vitamin C pairing, and when labs beat guessing',
      ko: '철: 헴·비헴, 비타민 C 짝, 추측보다 검사',
    },
    thesis: {
      en: 'Iron carries oxygen in blood. Heme iron from animal foods absorbs easily; plant iron needs vitamin C and steady intake. Fatigue alone is not proof you need pills.',
      ko: '철은 혈액이 산소를 실어 나르요. 동물성 헴철은 잘 흡수되고, 식물 철은 비타민 C·꾸준한 섭취가 필요해요. 피곤만으로 철제가 답은 아니에요.',
    },
    description: {
      en: 'Iron types, RDAs, menstruation and pregnancy flags, and links to B12/folate.',
      ko: '철 종류, RDA, 생리·임신, B12·엽산 링크.',
    },
    readMinutes: 8,
    datePublished: '2026-06-21',
    relatedSlugs: ['minerals-guide', 'minerals-absorption', 'vitamins-b12-folate', 'protein-animal-vs-plant'],
    en: [
      {
        heading: 'Two irons on your plate',
        paragraphs: [
          'Heme iron in beef, poultry, and fish absorbs at roughly 15–35% depending on body stores. Non-heme iron in spinach, lentils, and fortified cereal absorbs at roughly 2–20%—often closer to the low end without vitamin C at the same meal.',
          'The site encyclopedia notes pairing plant iron with vitamin C can raise absorption about threefold. Orange with lentils, bell pepper on spinach salad, tomato in bean chili.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Iron sources at a glance',
            headers: ['Source', 'Type', 'Serving idea', 'Tip'],
            rows: [
              ['Beef (3 oz)', 'Heme', '12% DV in encyclopedia table', 'Lean cuts, not daily requirement'],
              ['Lentils (1 cup)', 'Non-heme', '37% DV', 'Add vitamin C source'],
              ['Spinach (cooked)', 'Non-heme', 'High on label, absorbs less', 'Pair with C, not tea at lunch'],
              ['Fortified cereal', 'Non-heme', 'Check label', 'Watch added sugar'],
            ],
          },
        ],
      },
      {
        heading: 'Who should think about iron seriously',
        paragraphs: [
          'Menstruating adults, pregnancy, endurance athletes with heavy losses, and restrictive diets can run low over time. Vegan eaters need planning—not hope from salad alone. [B12 and folate](/blog/vitamins-b12-folate) matter for anemia workups too; iron without B12 does not fix every "tired" story.',
          'Signs like persistent pallor, breathlessness on stairs, or craving ice belong with clinicians and ferritin/hemoglobin tests—not supplement roulette.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Symptoms are not a diagnosis',
            body: [
              'Self-dosing high iron can harm people with hemochromatosis or normal stores. UL for supplemental iron is 45 mg/day (NIH).',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '8 mg', label: 'iron RDA men 19–50' },
              { value: '18 mg', label: 'iron RDA women 19–50' },
              { value: '~3×', label: 'non-heme boost with vitamin C' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Rotate lentils, leafy greens, and occasional lean red meat or shellfish if you eat animal foods. Log a week in the [Analyzer](/analyzer) before buying iron gummies. Next: [absorption tricks](/blog/minerals-absorption).',
        ],
      },
    ],
    ko: [
      {
        heading: '식탁에 있는 두 종류의 철',
        paragraphs: [
          '소고기·닭·생선의 헴철은 대략 15–35% 흡수돼요(저장량에 따라). 시금치·렌틸·강화 시리얼의 비헴철은 2–20%—같은 끼니에 비타민 C 없으면 낮은 쪽에 가까워요.',
          '백과에 식물 철+비타민 C면 흡수가 약 3배까지 올라간다고 적혀 있어요. 렌틸에 귤, 시금치 샐러드에 피망, 콩찌개에 토마토 같은 짝이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '철 공급 한눈에',
            headers: ['출처', '종류', '감', '팁'],
            rows: [
              ['소고기 85g', '헴', '백과 표 12% DV', '살코기, 매일 필수 아님'],
              ['렌틸 1컵', '비헴', '37% DV', '비타민 C 동반'],
              ['시금치(익힘)', '비헴', '라벨은 높음', 'C 짝, 점심 차 분리'],
              ['강화 시리얼', '비헴', '라벨 확인', '당 함량도 보기'],
            ],
          },
        ],
      },
      {
        heading: '철을 진지히 볼 사람',
        paragraphs: [
          '생리·임신·큰 운동 손실·좁은 식단은 시간이 지나면 낮아질 수 있어요. 비건은 계획이 필요해요. [B12·엽산](/blog/vitamins-b12-folate)도 빈혈 검사에 같이 봐요. 철만으로 모든 "피곤"이 해결되진 않아요.',
          '계단에서 숨참, 창백함, 얼음 먹고 싶음이 계속되면 페리틴·헤모글로빈 검사와 진료 쪽이 맞아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '증상≠진단',
            body: [
              '저장이 정상인데 철을 많이 먹으면 해로울 수 있어요. 보충 철 UL 45mg/일(NIH).',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '8mg', label: '철 RDA 남성 19–50' },
              { value: '18mg', label: '철 RDA 여성 19–50' },
              { value: '~3배', label: '비타민 C와 비헴철' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '렌틸·나물·가끔 살코기·조개(먹는다면)를 돌려요. 철 젤리 사기 전 [분석기](/analyzer)에 일주일 기록해 보세요. 다음: [흡수](/blog/minerals-absorption).',
        ],
      },
    ],
  },
  {
    slug: 'minerals-calcium-magnesium',
    seriesId: 'minerals',
    episode: 3,
    title: {
      en: 'Calcium and magnesium: bone, cramps, and supplement upper limits',
      ko: '칼슘·마그네슘: 뼈, 쥐먹저리, 보충 상한',
    },
    thesis: {
      en: 'Calcium builds bone with vitamin D and weight-bearing movement; magnesium runs hundreds of enzymes and muscle relaxation. Food first—megadose pills have ULs.',
      ko: '칼슘은 비타민 D·체중 부하와 함께 뼈를 만들고, 마그네슘은 수백 개 효소·근육 이완에 쓰여요. 음식이 먼저고, 고용량 알약은 상한이 있어요.',
    },
    description: {
      en: 'Dairy vs greens vs calcium-set tofu, magnesium-rich foods, and NIH upper limits for supplements.',
      ko: '유제품 vs 채소·칼슘두부, 마그네슘 식품, 보충 상한.',
    },
    readMinutes: 8,
    datePublished: '2026-06-22',
    relatedSlugs: ['minerals-guide', 'minerals-absorption', 'vitamins-c-and-d', 'minerals-everyday-plate'],
    en: [
      {
        heading: 'Calcium beyond "drink milk"',
        paragraphs: [
          'Adults need about 1,000 mg calcium per day (NIH), more for some older adults. One cup milk delivers ~300 mg; calcium-set tofu half cup ~434 mg; cooked kale cup ~177 mg. Bone health still needs [vitamin D](/blog/vitamins-c-and-d) and activity—not calcium alone in a pill.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Calcium anchors (US portions)',
            headers: ['Food', 'Calcium', 'Note'],
            rows: [
              ['Milk (1 cup)', '~300 mg', 'Protein + B12 rider'],
              ['Calcium-set tofu (½ cup)', '~434 mg', 'Check label for calcium sulfate'],
              ['Kale, cooked (1 cup)', '~177 mg', 'Vitamin K co-traveler'],
              ['Hard cheese', 'Dense', 'Saturated fat adds up'],
            ],
          },
        ],
      },
      {
        heading: 'Magnesium: cramps, sleep, and pills',
        paragraphs: [
          'Magnesium supports 300+ enzyme reactions and muscle function. Pumpkin seeds, almonds, black beans, and leafy greens carry it. Supplement UL from pills is 350 mg/day for adults (food magnesium has no UL). Loose stools often mean you crossed personal tolerance on pills.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '310–420 mg', label: 'Mg RDA range (NIH)' },
              { value: '2,500 mg', label: 'calcium UL 19–50 (total intake)' },
              { value: '350 mg', label: 'Mg supplement UL only' },
            ],
          },
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Do not double-stack blindly',
            body: [
              'Calcium pills plus fortified OJ plus antacids can approach UL without noticing.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Build plates with dairy or fortified plant milk, greens, and seeds. If night cramps persist despite adequate intake, medical causes deserve a look. Next: [sodium & potassium](/blog/minerals-sodium-potassium).',
        ],
      },
    ],
    ko: [
      {
        heading: '칼슘, "우유만"이 아님',
        paragraphs: [
          '성인은 하루 약 1,000mg(NIH), 고령은 더 필요할 수 있어요. 우유 1컵 ~300mg, 칼슘두부 반 모 ~434mg, 익힌 케일 1컵 ~177mg. 뼈는 [비타민 D](/blog/vitamins-c-and-d)·활동과 같이 가요—알약만으로 끝나진 않아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '칼슘 앵커',
            headers: ['음식', '칼슘', '메모'],
            rows: [
              ['우유 1컵', '~300mg', '단백·B12 동반'],
              ['칼슘두부 반 모', '~434mg', '라벨에 황산칼슘 확인'],
              ['케일 1컵', '~177mg', '비타민 K 함께'],
              ['치즈', '밀도 높음', '포화지방 누적'],
            ],
          },
        ],
      },
      {
        heading: '마그네슘: 쥐먹저리·수면·알약',
        paragraphs: [
          '마그네슘은 300개 넘는 효소·근육 이완에 쓰여요. 호박씨·아몬드·검은콩·나물에 있어요. 보충제만 UL 350mg/일(음식 Mg는 UL 없음). 알약으로 설사 나면 용량을 넘긴 경우가 많아요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '310–420mg', label: 'Mg RDA (NIH)' },
              { value: '2,500mg', label: '칼슘 UL 19–50' },
              { value: '350mg', label: 'Mg 보충 UL' },
            ],
          },
          {
            kind: 'callout',
            tone: 'tip',
            title: '겹치기 주의',
            body: [
              '칼슘 알약+강화 주스+제산제면 UL에 가까워질 수 있어요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '유제품·강화 두유·채소·씨앗으로 식탁을 만들어요. 충분히 먹는데도 밤 쥐먹저리가 계속이면 다른 원인도 봐야 해요. 다음: [나트륨·칼륨](/blog/minerals-sodium-potassium).',
        ],
      },
    ],
  },
  {
    slug: 'minerals-sodium-potassium',
    seriesId: 'minerals',
    episode: 4,
    title: {
      en: 'Sodium and potassium: blood pressure, processed food, and real electrolytes',
      ko: '나트륨·칼륨: 혈압, 가공식, 진짜 전해질',
    },
    thesis: {
      en: 'Most excess sodium hides in packaged and restaurant food, not the salt shaker. Potassium from plants helps balance fluids; sports drinks are rarely the fix for desk workers.',
      ko: '나트륨 과다는 소금통보다 라면·김치·배달·가공식에 많아요. 칼륨은 채소·과일에서 받고, 책상 앞에서 스포츠음료가 답은 아닐 때가 많아요.',
    },
    description: {
      en: 'Sodium limits, potassium foods, and US vs Korean high-salt patterns.',
      ko: '나트륨 한도, 칼륨 식품, 미국·한국 고염 패턴.',
    },
    readMinutes: 8,
    datePublished: '2026-06-23',
    relatedSlugs: ['minerals-guide', 'minerals-everyday-plate', 'minerals-absorption', 'minerals-supplements-labs'],
    en: [
      {
        heading: 'Where sodium actually comes from',
        paragraphs: [
          'US adults are advised to stay under 2,300 mg sodium per day (Dietary Guidelines); AHA ideal target is 1,500 mg for many. Roughly 70% of sodium in typical US diets comes from packaged, restaurant, and deli foods—not home cooking salt.',
          'Deli turkey, canned soup, frozen meals, and fast food stack sodium while adding little potassium.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Sodium traps vs potassium helpers (US)',
            headers: ['Higher sodium', 'Higher potassium'],
            rows: [
              ['Deli meats, bacon', 'Banana, potato with skin'],
              ['Canned soup, ramen kits', 'Beans, lentils'],
              ['Cheese-heavy pizza', 'Spinach, avocado'],
              ['Sports drink habit', 'Water + meals with plants'],
            ],
          },
        ],
      },
      {
        heading: 'Potassium and blood pressure context',
        paragraphs: [
          'Potassium helps kidneys balance sodium. A medium banana (~422 mg potassium) is a snack, not a prescription. People on certain blood pressure meds or kidney disease need clinician guidance—more potassium is not automatically safe.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Kidney disease changes the rules',
            body: [
              'Do not mega-dose potassium supplements or salt substitutes without medical advice.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '2,300 mg', label: 'sodium UL adults (US)' },
              { value: '70%+', label: 'sodium from processed/restaurant (typical US)' },
              { value: '422 mg', label: 'potassium in one medium banana' },
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cook more at home, rinse canned beans, and read labels on bread and sauce. Next: [zinc, iodine, selenium](/blog/minerals-zinc-iodine-selenium) and the [US mineral plate](/blog/minerals-everyday-plate).',
        ],
      },
    ],
    ko: [
      {
        heading: '나트륨은 어디서 오나',
        paragraphs: [
          '미국 기준 성인 나트륨은 하루 2,300mg 이하 권고(AHA는 1,500mg 이상적이라는 경우도). 전형적인 미국 식단의 70% 가까이가 가공·외식·델리에서 와요.',
          '한국은 김치·젓갈·라면·배달 국물이 하루 염분을 올려요. 소금을 덜 쳐도 국물 한 그릇이 크면 숫자가 커져요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '나트륨 함정 vs 칼륨 돕는 쪽',
            headers: ['나트륨 높음', '칼륨 높음'],
            rows: [
              ['김치·젓갈·라면', '바나나, 감자'],
              ['햄·소시지', '콩·렌틸'],
              ['치즈 피자·버거', '시금치, 아보카도'],
              ['책상 앞 이온음료', '물+채소 반찬'],
            ],
          },
        ],
      },
      {
        heading: '칼륨·혈압 맥락',
        paragraphs: [
          '칼륨은 신장이 나트륨 균형을 잡는 데 도와요. 바나나 한 개(~422mg)는 간식이지 처방이 아니에요. 혈압약·신장 질환 있으면 칼륨 보충은 의사와 맞춰야 해요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '신장 질환이면 규칙이 바뀜',
            body: [
              'KCl 대체소금·칼륨 보충을 임의로 늘리지 마세요.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '2,300mg', label: '나트륨 UL (미국 성인)' },
              { value: '70%+', label: '가공·외식 비중(미국 전형)' },
              { value: '422mg', label: '바나나 1개 칼륨' },
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '국물·젓갈 빈도를 줄이고, 콩·나물·과일로 칼륨 쪽을 채워요. 다음: [아연·요오드·셀레늄](/blog/minerals-zinc-iodine-selenium), [한국 식탁](/blog/minerals-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'minerals-zinc-iodine-selenium',
    seriesId: 'minerals',
    episode: 5,
    title: {
      en: 'Zinc, iodine, and selenium: immunity, thyroid, and the Brazil nut caution',
      ko: '아연·요오드·셀레늄: 면역, 갑상선, 브라질너트 주의',
    },
    thesis: {
      en: 'Trace minerals work in small amounts: zinc for immunity and healing, iodine for thyroid hormone, selenium for antioxidant defense. Too much selenium from nuts or pills is a real risk.',
      ko: '미량 미네랄은 적은 양으로 큰 일을 해요. 아연·면역, 요오드·갑상선, 셀레늄·항산화. 셀레늄은 견과·알약 과다가 실제 위험이에요.',
    },
    description: {
      en: 'Oysters and pumpkin seeds, iodized salt and seaweed, selenium UL and Brazil nuts.',
      ko: '굴·호박씨, 요오드 소금·김, 셀레늄 UL·브라질너트.',
    },
    readMinutes: 8,
    datePublished: '2026-06-24',
    relatedSlugs: ['minerals-guide', 'minerals-everyday-plate', 'minerals-supplements-labs', 'minerals-absorption'],
    en: [
      {
        heading: 'Zinc in food',
        paragraphs: [
          'Adults need about 8–11 mg zinc per day (NIH). Oysters are extreme on the chart; pumpkin seeds, beef, and chickpeas are everyday sources. Chronic mega-zinc blocks copper absorption—UL 40 mg/day.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Zinc anchors (US)',
            headers: ['Food', 'Zinc note', 'Practical tip'],
            rows: [
              ['Oysters (3 oz)', 'Very high', 'Occasional, not daily staple'],
              ['Pumpkin seeds (¼ cup)', '~26% DV', 'Snack or salad topper'],
              ['Beef (3 oz)', 'Moderate', 'Pair with plants'],
              ['Chickpeas', 'Moderate + fiber', 'Hummus, bowls'],
            ],
          },
        ],
      },
      {
        heading: 'Iodine and thyroid',
        paragraphs: [
          'Iodized table salt fixed deficiency in many countries. Seaweed and fish add iodine; excess from kelp supplements can swing thyroid the wrong way. Pregnancy needs adequate iodine—obstetric care sets targets.',
        ],
      },
      {
        heading: 'Selenium: one nut can be enough',
        paragraphs: [
          'One Brazil nut (~5 g) can deliver roughly 175% DV selenium; four to five nuts can exceed the 400 mcg/day UL. Food-first: a nut or two some days, not a handful daily plus a multivitamin.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Selenium overload is real',
            body: [
              'Hair loss, brittle nails, GI upset—signs of excess. Check total from nuts + supplements.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '8–11 mg', label: 'zinc RDA adults' },
              { value: '400 mcg', label: 'selenium UL adults' },
              { value: '1–2', label: 'Brazil nuts many days (not 5+)' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '아연, 음식에서',
        paragraphs: [
          '성인 아연은 하루 8–11mg(NIH). 굴은 극단적으로 높고, 호박씨·소고기·병아리콩이 일상이에요. 아연을 오래 과다하면 구리 흡수가 막혀요—UL 40mg/일.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '아연 앵커',
            headers: ['음식', '아연', '팁'],
            rows: [
              ['굴', '매우 높음', '가끔, 매일 주식 아님'],
              ['호박씨 ¼컵', '~26% DV', '간식·샐러드'],
              ['소고기 85g', '중간', '채소와 짝'],
              ['병아리콩', '섬유 동반', '후무스·볶음'],
            ],
          },
        ],
      },
      {
        heading: '요오드·갑상선',
        paragraphs: [
          '요오드화 소금이 결핍을 줄였어요. 김·미역·생선이 요오드를 더해요. 다시마 보충 과다는 갑상선을 흔들 수 있어요. 임신은 충분한 요오드가 필요—산부가 목표를 잡아요.',
        ],
      },
      {
        heading: '셀레늄: 한 알이면 충분할 때',
        paragraphs: [
          '브라질너트 1알(~5g)이 하루 DV의 175%쯤; 4–5알이면 UL 400mcg를 넘을 수 있어요. 하루 한두 알 가끔, 종합비타민+한 줌은 위험해요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '셀레늄 과다는 실제로 있음',
            body: [
              '탈모·부서지는 손톱·설사—과다 신호. 견과+영양제 합산을 보세요.',
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '8–11mg', label: '아연 RDA' },
              { value: '400mcg', label: '셀레늄 UL' },
              { value: '1–2알', label: '브라질너트 많은 날' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'minerals-absorption',
    seriesId: 'minerals',
    episode: 6,
    title: {
      en: 'Mineral absorption: phytates, tea with lunch, and calcium–iron competition',
      ko: '미네랄 흡수: 피틴산, 점심 차, 칼슘·철 경쟁',
    },
    thesis: {
      en: 'You can eat enough minerals on paper and still absorb less because of phytates, timing, or competing supplements. Small meal tweaks beat expensive chelated pills for most people.',
      ko: '표면상 충분해도 피틴산·타이밍·겹치는 보충 때문에 흡수가 줄 수 있어요. 대부분은 비싼 킬레이트보다 끼니 습관이 먼저예요.',
    },
    description: {
      en: 'Soaking beans, vitamin C with iron, spacing calcium and iron pills, coffee timing.',
      ko: '콩 불리기, 철+C, 칼슘·철 간격, 커피 타이밍.',
    },
    readMinutes: 7,
    datePublished: '2026-06-25',
    relatedSlugs: ['minerals-iron', 'minerals-calcium-magnesium', 'vitamins-c-and-d', 'minerals-everyday-plate'],
    en: [
      {
        heading: 'Phytates and plants',
        paragraphs: [
          'Whole grains and legumes carry phytates that bind minerals. Soaking beans and lentils overnight and discarding water reduces phytates—the encyclopedia tip—and improves iron and zinc uptake.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Plant iron boosters',
            steps: [
              { label: 'Soak legumes', note: '8+ hours when possible' },
              { label: 'Add vitamin C', note: 'pepper, citrus, tomato' },
              { label: 'Separate tea/coffee', note: '1 hour from iron-rich meal' },
              { label: 'Log week', note: 'Analyzer pattern check' },
            ],
          },
        ],
      },
      {
        heading: 'Competition at the supplement aisle',
        paragraphs: [
          'Calcium and iron supplements taken together fight for absorption. High-dose zinc long-term can steal copper. Spread minerals across meals when possible; use [Part 8](/blog/minerals-supplements-labs) for pill strategy.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Food pairing beats pill stacking',
            body: [
              'Lentil bowl with bell pepper at lunch, yogurt at snack, steak or tofu at dinner—timing separates competitors naturally.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Fix absorption habits before blaming "low quality soil." Next: [everyday plate](/blog/minerals-everyday-plate) by locale.',
        ],
      },
    ],
    ko: [
      {
        heading: '피틴산과 식물',
        paragraphs: [
          '통곡·콩에 피틴산이 있어 미네랄을 붙잡아요. 콩·렌틸을 밤새 불리고 물 버리면 피틴산이 줄어요—백과 팁—철·아연 흡수가 나아져요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '식물 철 올리기',
            steps: [
              { label: '콩 불리기', note: '가능하면 8시간+' },
              { label: '비타민 C', note: '피망·귤·토마토' },
              { label: '차·커피 분리', note: '철 식사 전후 1시간' },
              { label: '일주일 기록', note: '분석기' },
            ],
          },
        ],
      },
      {
        heading: '보충제끼리 경쟁',
        paragraphs: [
          '칼슘·철 알약을 같이 먹으면 흡수가 싸워요. 아연 고용량 장기는 구리를 뺏어요. 끼니로 나누고, 알약 전략은 [8편](/blog/minerals-supplements-labs).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '짝짓기가 겹치기보다 낫다',
            body: [
              '점심 렌틸+피망, 간식 요거트, 저녁 두부·생선—시간이 경쟁을 나눠 줘요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '"흙이 빈약해서"라고 하기 전에 습관부터 보세요. 다음: 로케일별 [일상 식탁](/blog/minerals-everyday-plate).',
        ],
      },
    ],
  },
  {
    slug: 'minerals-everyday-plate',
    seriesId: 'minerals',
    episode: 7,
    title: {
      en: 'The US plate: dairy, greens, beans, and where sodium hides',
      ko: '한국 식탁: 나물·김·멸치·콩으로 미네랄 채우기',
    },
    thesis: {
      en: 'A typical US day can cover calcium and iron with milk, yogurt, lentils, and greens—while blowing sodium through deli, bread, and drive-through. Log before buying a multimineral.',
      ko: '밥·국·반찬이면 철·칼슘·요오드가 나뉘어 들어와요. 김치·젓갈·라면이 나트륨을 올리고, 피곧함만으로 종합미네랄을 사기 전에 일주일 기록이 낫아요.',
    },
    description: {
      en: 'US meal slots for iron, calcium, potassium, and sodium traps.',
      ko: '한국 끼니별 철·칼슘·요오드·나트륨 패턴.',
    },
    readMinutes: 9,
    datePublished: '2026-06-26',
    relatedSlugs: ['minerals-iron', 'minerals-sodium-potassium', 'minerals-absorption', 'minerals-guide'],
    en: [
      {
        heading: 'US patterns that miss minerals',
        paragraphs: [
          'Coffee and a pastry breakfast skips calcium and iron. Lunch sandwich with chips adds sodium without potassium. Dinner-only meat leaves non-heme iron without vitamin C partners.',
          'Fix: one mineral-dense anchor per meal—yogurt, bean soup, salmon or tofu, side salad.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Three anchors',
            steps: [
              { label: 'Breakfast', note: 'milk or fortified soy + eggs' },
              { label: 'Lunch', note: 'lentil soup or spinach salad + C' },
              { label: 'Dinner', note: 'fish or calcium-set tofu' },
            ],
          },
        ],
      },
      {
        heading: 'US everyday mineral map',
        paragraphs: [
          'Portions from the [minerals encyclopedia](/nutrients/minerals) food table.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Meal slots (US)',
            headers: ['Meal', 'Staples', 'Minerals highlighted', 'Watch'],
            rows: [
              ['Breakfast', 'Milk + fortified cereal', 'Ca, some Fe', 'Cereal sugar'],
              ['Lunch', 'Lentil soup + orange', 'Fe, Mg, folate', 'Deli soup sodium'],
              ['Dinner', 'Salmon or kale side', 'Fe, Ca, Se if fish', 'Fried fish sodium'],
              ['Snack', 'Pumpkin seeds / banana', 'Zn, K', 'Not sodium jerky'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '1–2', label: 'Brazil nuts per week max' },
              { value: '2×/wk', label: 'fatty fish rotation' },
              { value: '7 days', label: 'Analyzer before multimineral' },
            ],
          },
        ],
      },
      {
        heading: 'Sodium reality check',
        paragraphs: [
          'Frozen meals, pizza, and chain burgers can exceed half a day\'s sodium in one sitting. The [Analyzer](/analyzer) shows whether your week is high-salt with low-potassium plants.',
          'Next: [supplements & labs](/blog/minerals-supplements-labs).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Potassium comes with plants',
            body: [
              'Beans and leafy greens help balance sodium when you actually eat them—not when they sit in the fridge.',
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '한국 식탁에서 미네랄이 숨는 곳',
        paragraphs: [
          '아침이 커피·빵만이면 철·칼슘이 비어요. 점심이 김밥·라면만이면 나트륨은 넘치고 칼륨·철 짝이 약해요. 저녁 고기만으로는 비헴철+C가 부족할 수 있어요.',
          '끼니마다 앵커 하나—두유·달걀, 된장국·나물, 생선·두부.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '세 앵커',
            steps: [
              { label: '아침', note: '두유·삶은 달걀' },
              { label: '점심', note: '밥+나물+콩·두부' },
              { label: '저녁', note: '고등어·멸치·시금치' },
            ],
          },
        ],
      },
      {
        heading: '한국 일상 미네랄 지도',
        paragraphs: [
          '[미네랄 백과](/nutrients/minerals) 음식표와 맞춰 보면 돼요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '끼니별 (한국)',
            headers: ['끼니', '식재', '미네랄', '주의'],
            rows: [
              ['아침', '두유·달걀', 'Ca, Fe', '단 것만 아침'],
              ['점심', '밥+시금치나물+된장', 'Fe, Ca, folate', '김치만 반찬'],
              ['저녈', '고등어·멸치국', 'Fe, I, Se', '젓갈 나트륨'],
              ['간식', '호박씨·바나나', 'Zn, K', '짠 과자 대신'],
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '주 1–2알', label: '브라질너트 상한' },
              { value: '주 2회', label: '등푸른생선' },
              { value: '7일', label: '분석기 후 종합미네랄' },
            ],
          },
        ],
      },
      {
        heading: '나트륨 현실 점검',
        paragraphs: [
          '김치·라면·배달 한 번에 하루 나트륨 상당량이 올라가요. [분석기](/analyzer)로 일주일을 보면 "나물은 있는데 국물이 짠" 패턴이 보여요.',
          '다음: [보충·검사](/blog/minerals-supplements-labs).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '칼륨은 채소·콩과 함께',
            body: [
              '나물·콩을 실제로 먹을 때 효과가 있어요. 냉장고에만 있으면 숫자가 안 올라가요.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'minerals-supplements-labs',
    seriesId: 'minerals',
    episode: 8,
    title: {
      en: 'Mineral supplements and labs: iron pills, multimineral myths, and when to test',
      ko: '미네랄 보충·검사: 철제, 종합미네랄, 검사가 맞을 때',
    },
    thesis: {
      en: 'Supplements fill targeted gaps after food and context—not "insurance" for everyone. Ferritin, thyroid panels, and pregnancy care beat buying minerals from fatigue alone.',
      ko: '보충은 음식·맥락 다음에 빈 곳을 채우는 거지, 모두에게 "보험"이 아니에요. 페리틴·갑상선·임신 관리가 피곧함만으로 사는 것보다 낫아요.',
    },
    description: {
      en: 'When iron, calcium, or multimineral products help, UL reminders, and medical red flags.',
      ko: '철·칼슘·종합미네랄이 맞을 때, UL, 진료 신호.',
    },
    readMinutes: 8,
    datePublished: '2026-06-27',
    relatedSlugs: ['minerals-guide', 'minerals-iron', 'minerals-everyday-plate', 'minerals-zinc-iodine-selenium'],
    en: [
      {
        heading: 'Food first, then targeted bottles',
        paragraphs: [
          'Multimineral gummies rarely match what your log shows missing. Iron pills help diagnosed deficiency; they stain teeth and upset stomachs when unnecessary. Calcium carbonate needs food; spread doses if prescribed.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Supplement vs food default',
            headers: ['Nutrient', 'Try food first', 'Pill when'],
            rows: [
              ['Iron', 'Lentils + C, lean meat', 'Low ferritin, clinician plan'],
              ['Calcium', 'Dairy, tofu, greens', 'Osteoporosis plan, split doses'],
              ['Magnesium', 'Seeds, beans', 'Documented low, watch UL 350 mg'],
              ['Selenium', '1–2 Brazil nuts weekly', 'Avoid stacking with multi'],
            ],
          },
        ],
      },
      {
        heading: 'Labs worth the name',
        paragraphs: [
          'Ferritin and CBC for iron stories. TSH and iodine context for thyroid—not seaweed mega-doses. Sodium is usually a diet pattern, not a blood test for healthy adults.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Red flags → clinician',
            body: [
              'Pregnancy, warfarin, kidney disease, unexplained weight change, or heart rhythm symptoms—not supplement shopping.',
            ],
          },
        ],
      },
      {
        heading: 'Close the series',
        paragraphs: [
          'Minerals are maintenance, not magic. Return to the [series hub](/blog/minerals-guide), [US or Korean plate](/blog/minerals-everyday-plate), [encyclopedia](/nutrients/minerals), and [absorption](/blog/minerals-absorption). Eat, log, test when the story fits, supplement on purpose.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Food-first loop',
            steps: [
              { label: 'Plate pattern', note: '3 anchors/day' },
              { label: '7-day log', note: 'Analyzer' },
              { label: 'Target gap', note: 'iron, sodium, etc.' },
              { label: 'Test if flagged', note: 'ferritin, thyroid, pregnancy' },
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '음식 먼저, 그다음 겨냥한 알약',
        paragraphs: [
          '종합미네랄 젤리가 기록과 맞는 경우는 드물어요. 철제는 진단된 결핍에 도움이 되고, 불필요하면 속쓰림·변색이 와요. 칼슘 탄산염은 식사와, 처방이면 분할 복용.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '보충 vs 음식 기본',
            headers: ['영양소', '음식 먼저', '알약은'],
            rows: [
              ['철', '렌틸+C, 살코기', '페리틴 낮음, 진료 계획'],
              ['칼슘', '유제품·두부·채소', '골다공증 계획, 분할'],
              ['마그네슘', '씨앗·콩', '확인된 저하, UL 350mg'],
              ['셀레늄', '브라질너트 주 1–2알', '종합비타민과 겹치지 않기'],
            ],
          },
        ],
      },
      {
        heading: '검사가 의미 있을 때',
        paragraphs: [
          '철 이야기는 페리틴·CBC. 갑상선은 TSH·요오드 맥락—다시마 고용량 아님. 나트륨은 보통 식단 패턴이지 건강한 성인 혈액검사 주제가 아니에요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '깃발 → 진료',
            body: [
              '임신, 와파린, 신장 질환, 체중 급변, 심박 이상—영양제 쇼핑 전에.',
            ],
          },
        ],
      },
      {
        heading: '시리즈 마무리',
        paragraphs: [
          '미네랄은 관리지 마법이 아니에요. [허브](/blog/minerals-guide), [한국 식탁](/blog/minerals-everyday-plate), [백과](/nutrients/minerals), [흡수](/blog/minerals-absorption)로 돌아가세요. 먹고, 기록하고, 이야기가 맞을 때 검사하고, 필요할 때만 보충하세요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '음식 우선 루프',
            steps: [
              { label: '식탁 패턴', note: '하루 앵커 3' },
              { label: '7일 기록', note: '분석기' },
              { label: '빈 곳', note: '철·나트륨 등' },
              { label: '검사', note: '페리틴·갑상선·임신' },
            ],
          },
        ],
      },
    ],
  },
];
