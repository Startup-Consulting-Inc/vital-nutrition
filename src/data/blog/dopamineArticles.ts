import type { BlogArticle } from './types';

export const dopamineArticles: BlogArticle[] = [
  {
    slug: 'dopamine-guide',
    seriesId: 'dopamine',
    episode: 1,
    title: {
      en: 'Dopamine: what it actually does, and why your plate matters',
      ko: '도파민이 진짜 하는 일, 그리고 식단이 중요한 이유',
    },
    thesis: {
      en: 'Dopamine is not a "pleasure chemical." It is closer to a "go" signal for motivation and movement, and your brain builds it from raw materials that come straight off your plate.',
      ko: '도파민은 "쾌락 물질"이 아니라 의욕과 움직임을 위한 "출발 신호"에 가까워요. 그리고 뇌는 그걸 식탁에서 온 재료로 직접 만들어요.',
    },
    description: {
      en: 'A plain-language hub on dopamine: what it really does in the brain, how protein becomes dopamine step by step, and where food fits in.',
      ko: '도파민이 뇌에서 실제로 하는 일, 단백질이 도파민이 되는 과정, 식단이 끼는 자리를 쉽게 정리한 시작 글이에요.',
    },
    readMinutes: 8,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-synthesis-balance', 'dopamine-foods', 'dopamine-stimulants', 'dopamine-lifestyle', 'dopamine-detox'],
    en: [
      {
        heading: 'What dopamine actually does (it is not the happy chemical)',
        paragraphs: [
          'You have probably seen dopamine called the "feel-good chemical" or the "pleasure molecule." Catchy line. Also wrong, and the mistake sends people somewhere odd: chasing dopamine like it is a mood they can top up. Dopamine is closer to a "go" signal. It is the little nudge that says this is worth doing, pay attention, do it again. You feel it as drive and focus, not as a warm glow.',
          'A simpler way to picture it: dopamine is the brain\'s accelerator pedal, not its happiness. That tiny push you get when you finally start a task you have been dodging all day? That is dopamine doing its job.',
          'The clearest proof comes from Parkinson\'s disease. People with Parkinson\'s lose the neurons that make dopamine in a part of the brain that runs movement (the substantia nigra, a small dark cluster deep in the midbrain). The result is not sadness. It is trouble starting and controlling movement. Depression and ADHD involve dopamine circuits too, but those are medical conditions with medical treatments.',
          'This article stays in its lane: nutrition. Specifically, the raw materials your brain needs to build dopamine in the first place.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'The one thing to remember',
            body: [
              'Dopamine signals motivation and movement, not happiness. Feeling unmotivated does not automatically mean you are "low on dopamine," and no single food fixes a mood.',
            ],
          },
        ],
      },
      {
        heading: 'How your body builds dopamine, step by step',
        paragraphs: [
          'Here is the part most "dopamine food" posts skip: you do not absorb dopamine from food. Eating a so-called dopamine-rich food does not pour dopamine into your brain. Your brain makes its own, on site, from a raw material called tyrosine, an amino acid you get from protein.',
          'It helps to picture a small factory line. Protein comes in, and three stations later, dopamine comes out.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Your brain assembles dopamine from protein. No step can be skipped.',
            steps: [
              { label: 'Protein', note: 'from food' },
              { label: 'Tyrosine', note: 'the raw material' },
              { label: 'L-DOPA', note: 'half-built' },
              { label: 'Dopamine', note: 'finished' },
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '~47 mg', label: 'tyrosine an average adult needs per day (NIH)' },
              { value: '0.8 g/kg', label: 'baseline daily protein target (WHO/FAO)' },
              { value: '3 steps', label: 'from a bite of protein to dopamine' },
            ],
          },
        ],
      },
      {
        heading: 'The tools that keep the line running',
        paragraphs: [
          'Each station on that line needs a tool to work. The first step (tyrosine to L-DOPA) needs iron and a helper molecule called BH4 (tetrahydrobiopterin, which folate helps recycle). The second step (L-DOPA to dopamine) needs vitamin B6. Run low on any of these tools and the whole line slows down, even when you have plenty of raw material sitting there.',
          'How much raw material do you actually need? The NIH puts the average adult requirement for tyrosine at roughly 47 mg a day, and your body also makes tyrosine from another amino acid (phenylalanine). So anyone eating enough protein rarely has to think about it. The gap tends to show up somewhere specific: crash diets, eating too little for too long, or a day built almost entirely from ultra-processed snacks with barely any protein in them.',
        ],
      },
      {
        heading: 'Why this is not a self-diagnosis guide',
        paragraphs: [
          'Feeling unmotivated, foggy, or weirdly desperate for something sweet does not mean you are "dopamine deficient" in any medical sense. There is no blood test that reads the dopamine level in your synapses, and most supplements sold as "dopamine boosters" have no human results behind the label.',
          'What is actually in your hands is less exciting and far more reliable: eat enough protein, cover the B vitamins and minerals that run the line, sleep, move, and ease off the sugar-plus-caffeine-plus-screens loop that keeps your reward system on edge.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'See a clinician, not a protocol',
            body: [
              'If your movement is slowing, your mood stays low or swings high, or your focus has suddenly collapsed, that is a medical question. Parkinson\'s, depression, ADHD, and bipolar disorder involve dopamine systems in ways food cannot replace. A TikTok protocol is not a diagnosis.',
            ],
          },
        ],
      },
      {
        heading: 'Where to go next',
        paragraphs: [
          'Treat dopamine as upkeep, not a hack. Steady protein, the right micronutrients, sleep, and movement beat any single superfood or 48-hour detox. If you want to go deeper, the rest of the series picks up where this leaves off.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'The series map',
            headers: ['Part', 'What it covers'],
            rows: [
              ['Part 2 & 4', '[How dopamine is built, and what "too low" or "too high" means](/blog/dopamine-synthesis-balance)'],
              ['Part 3', '[Seven nutrients that support dopamine, with everyday foods](/blog/dopamine-foods)'],
              ['Part 5', '[Caffeine, sugar, and alcohol](/blog/dopamine-stimulants)'],
              ['Part 6', '[Exercise, sleep, and sunlight](/blog/dopamine-lifestyle)'],
              ['Part 7', '[The truth about "dopamine detox"](/blog/dopamine-detox)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '도파민이 진짜 하는 일 (행복 호르몬이 아니에요)',
        paragraphs: [
          '도파민을 "행복 호르몬", "쾌락 물질"이라고 부르는 글, 정말 많죠. 듣기엔 좋은데 사실 틀린 말이에요. 그리고 이 오해 때문에 사람들이 좀 이상한 데로 가요. 도파민을 기분처럼 충전하려고 들거든요. 도파민은 행복보다 "출발 신호"에 가까워요. "이거 할 만해, 집중해, 한 번 더" 하고 등을 떠미는 느낌이요. 그래서 따뜻한 행복감이 아니라 추진력하고 집중으로 느껴져요.',
          '더 쉽게 말하면, 도파민은 뇌의 행복이 아니라 액셀 페달이에요. 하루 종일 미루던 일을 드디어 시작할 때 등 떠밀어 주는 그 한 방, 그게 도파민이 일하는 거예요.',
          '제일 분명한 증거는 파킨슨병이에요. 파킨슨병은 움직임을 맡는 뇌 부위(흑질, 중뇌 깊숙이 있는 작고 검은 신경 뭉치)에서 도파민 만드는 신경세포가 줄어드는 병이거든요. 그 결과가 슬픔이 아니라 "움직임을 시작하고 조절하기가 어려움"이에요. 우울증이나 ADHD도 도파민 회로랑 얽히지만, 그건 진단과 치료가 필요한 의학 영역이고요.',
          '이 글은 딱 영양 얘기만 할게요. 뇌가 애초에 도파민을 만들 때 필요한 재료요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '딱 하나만 기억한다면',
            body: [
              '도파민은 행복이 아니라 의욕·움직임 신호예요. 의욕이 없다고 곧바로 "도파민 부족"인 것도 아니고, 음식 하나로 기분이 고쳐지지도 않아요.',
            ],
          },
        ],
      },
      {
        heading: '도파민이 만들어지는 과정, 한 단계씩',
        paragraphs: [
          '"도파민 음식" 글들이 대개 빼먹는 게 있어요. 음식 속 도파민을 그대로 흡수하는 게 아니라는 점이요. "도파민 풍부한 음식"을 먹는다고 뇌에 도파민이 부어지진 않아요. 뇌는 자기 도파민을 직접 만들어요. 티로신(Tyrosine)이라는 재료로요. 티로신은 단백질에서 나오는 아미노산이에요.',
          '작은 공장 라인을 떠올리면 쉬워요. 단백질이 들어가고, 세 공정을 지나면 도파민이 나와요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '뇌는 단백질로 도파민을 조립해요. 어느 단계도 건너뛸 수 없어요.',
            steps: [
              { label: '단백질', note: '음식에서' },
              { label: '티로신', note: '원료' },
              { label: 'L-DOPA', note: '반제품' },
              { label: '도파민', note: '완제품' },
            ],
          },
          {
            kind: 'stats',
            items: [
              { value: '약 47mg', label: '성인 하루 티로신 평균 필요량 (NIH)' },
              { value: '0.8g/kg', label: '하루 기본 단백질 목표 (WHO/FAO)' },
              { value: '3단계', label: '단백질 한 입에서 도파민까지' },
            ],
          },
        ],
      },
      {
        heading: '라인을 돌리는 도구들',
        paragraphs: [
          '각 공정엔 도구가 필요해요. 첫 단계(티로신→L-DOPA)엔 철분이랑 BH4(테트라하이드로바이옵테린)라는 도우미 분자가 들어가요. BH4 재생은 엽산이 돕고요. 둘째 단계(L-DOPA→도파민)엔 비타민 B6가 필요해요. 이 도구 중 하나라도 모자라면, 원료가 옆에 잔뜩 있어도 라인이 느려져요.',
          '재료는 얼마나 필요할까요? NIH 기준 성인 티로신 평균 필요량이 하루 약 47mg이에요. 게다가 몸은 페닐알라닌이라는 다른 아미노산으로도 티로신을 만들 수 있어서, 단백질을 충분히 먹는 사람은 신경 쓸 일이 거의 없어요. 빈틈은 좀 특정한 데서 생겨요. 무리한 다이어트, 오래 적게 먹기, 단백질 거의 없는 초가공 간식으로만 채운 하루 같은 거요.',
        ],
      },
      {
        heading: '이건 자가진단 가이드가 아니에요',
        paragraphs: [
          '의욕이 없고, 머리가 멍하고, 이상하게 단 게 당긴다고 해서 의학적으로 "도파민 결핍"인 건 아니에요. 시냅스 속 도파민 농도를 읽는 혈액 검사는 없거든요. "도파민 부스터"라고 파는 보충제도 사람 대상 결과가 라벨을 뒷받침하는 경우가 드물고요.',
          '정작 내가 할 수 있는 일은 덜 자극적이지만 훨씬 확실해요. 단백질 충분히 먹기, 라인을 돌리는 비타민·미네랄 채우기, 자기, 움직이기, 그리고 보상 회로를 계속 긴장시키는 설탕+카페인+스크린 루프 줄이기요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '프로토콜 말고 의사를',
            body: [
              '움직임이 느려지거나, 기분이 오래 가라앉거나 들뜨거나, 집중이 갑자기 무너졌다면 그건 의학적인 문제예요. 파킨슨, 우울증, ADHD, 양극성은 도파민 시스템이 얽히지만 음식으로 대신할 수 없어요. 틱톡 프로토콜은 진단이 아니고요.',
            ],
          },
        ],
      },
      {
        heading: '다음은 어디로',
        paragraphs: [
          '도파민은 해킹 대상이 아니라 관리할 시스템이에요. 슈퍼푸드 한 방이나 48시간 디톡스보다 꾸준한 단백질·미량영양소·수면·운동이 나아요. 더 깊이 보고 싶으면, 이어지는 글들이 여기서 멈춘 데서부터 이어져요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '시리즈 지도',
            headers: ['편', '다루는 내용'],
            rows: [
              ['2·4편', '[도파민은 어떻게 만들어지고, "부족"과 "과잉"은 무슨 뜻인가](/blog/dopamine-synthesis-balance)'],
              ['3편', '[도파민을 돕는 7가지 영양소와 식탁 매칭](/blog/dopamine-foods)'],
              ['5편', '[카페인, 설탕, 알코올](/blog/dopamine-stimulants)'],
              ['6편', '[운동, 수면, 햇빛](/blog/dopamine-lifestyle)'],
              ['7편', '["도파민 디톡스"의 진실](/blog/dopamine-detox)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'dopamine-synthesis-balance',
    seriesId: 'dopamine',
    episode: 2,
    episodeLabel: { en: 'Parts 2 & 4', ko: '2·4편' },
    title: {
      en: 'How dopamine is built, and what "too low" or "too high" actually means',
      ko: '도파민은 어떻게 만들어지고, "부족"과 "과잉"은 무엇을 뜻할까',
    },
    thesis: {
      en: 'Dopamine is assembled from dietary tyrosine in two enzyme steps that need iron, folate, and B6. Feeling flat or overstimulated rarely maps to a lab number you can fix with food alone.',
      ko: '도파민은 식단의 티로신이 철·엽산·B6가 필요한 두 단계를 거쳐 만들어져요. 무기력이나 과자극은 혈액 검사 숫자랑 1:1로 맞지 않고, 음식만으로 해결되지도 않아요.',
    },
    description: {
      en: 'The tyrosine → L-DOPA → dopamine pathway, the helper nutrients at each step, how much protein you need, and how to read "deficiency" and "excess" talk without self-diagnosing.',
      ko: '티로신→L-DOPA→도파민 경로, 단계별 도우미 영양소, 필요한 단백질량, 그리고 "부족·과잉" 이야기를 자가진단 없이 읽는 법.',
    },
    readMinutes: 11,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-guide', 'dopamine-foods', 'dopamine-stimulants'],
    en: [
      {
        heading: 'Step 1: turning protein into the starter ingredient',
        paragraphs: [
          'Dopamine in your brain starts as [tyrosine](/nutrients/proteins), an amino acid you get from digesting protein. Phenylalanine, another amino acid from food, converts to tyrosine first, so both feed the same pool.',
          'The first machine on the line is an enzyme with a long name: tyrosine hydroxylase. Think of it as the slowest worker on the assembly line. It sets the pace for everything downstream, which is why scientists call it the "rate-limiting" step. It turns tyrosine into L-DOPA, and to do that it needs iron plus a helper molecule called BH4 (tetrahydrobiopterin). Folate keeps the BH4 supply topped up. If BH4 runs low, the line crawls even when tyrosine is everywhere.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '~47 mg', label: 'average daily tyrosine requirement, adults (NIH)' },
              { value: '0.8 g/kg', label: 'baseline protein per day; more if you train hard' },
            ],
          },
        ],
      },
      {
        heading: 'Step 2: the finishing touch',
        paragraphs: [
          'The second machine, another enzyme (aromatic L-amino acid decarboxylase, or AADC for short), converts L-DOPA into dopamine. Its essential tool is the active form of [vitamin B6](/nutrients/vitamins). Adults need about 1.3 to 1.7 mg of B6 a day.',
          'There is one more step worth knowing: copper helps turn some dopamine into norepinephrine further down the line. You do not need to micromanage copper if you eat a varied diet, and megadoses are not the goal. Here is the table version of the whole line.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'The dopamine assembly line and the nutrients each step needs',
            headers: ['Step', 'What happens', 'Helper nutrients'],
            rows: [
              ['1. Tyrosine → L-DOPA', 'The slow, pace-setting step', 'Iron, folate (via BH4)'],
              ['2. L-DOPA → dopamine', 'The finishing step', 'Vitamin B6'],
              ['3. Dopamine → norepinephrine', 'Optional downstream conversion', 'Copper'],
            ],
          },
        ],
      },
      {
        heading: 'When the line runs thin (the nutrition angle only)',
        paragraphs: [
          'A few patterns can genuinely strain dopamine synthesis: chronically low protein, heavy alcohol use (which drains B6 and folate), untreated iron deficiency, and very narrow diets with no legumes or animal protein.',
          'But here is the honest part. What people describe as "low dopamine," the low drive, the flatness, the restless legs, the brain fog, overlaps with dozens of other causes: sleep debt, thyroid problems, depression, medication side effects. Nutrition can be one thread in that knot. It is rarely the whole sweater.',
          'And you cannot measure your synaptic dopamine with a standard blood draw. Urine metabolites and plasma levels do not tell you what your brain is doing this afternoon. If a creator implies a simple test can read your "dopamine level," be skeptical.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'No, your blood test cannot read your dopamine',
            body: [
              'There is no routine lab that measures dopamine where it matters, in the synapses of your brain. Claims to the contrary are a red flag.',
            ],
          },
        ],
      },
      {
        heading: 'When stimulation outruns supply',
        paragraphs: [
          'The flip side is not a clinical "dopamine overdose." It is reward overload: endless scrolling, gambling, binge eating, stacking stimulants. The fix here is not a clinical one either.',
          'Picture a volume knob. Crank the music loud enough for long enough and your ears stop registering it as loud. Reward circuits do something similar. With constant heavy stimulation they turn down their own sensitivity, so you need more of the thing to feel the same hit. That is a behavioral pattern, often tangled up with poor sleep, and one more bowl of lentils will not untangle it. Blood-sugar swings and late-day caffeine do make the loop harder to break, though ([Part 5](/blog/dopamine-stimulants)).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'The volume-knob idea',
            body: [
              'Heavy, constant stimulation makes your reward system less sensitive, not more. The answer is usually less input and better sleep, not a stronger "dopamine booster."',
            ],
          },
        ],
      },
      {
        heading: 'Lines you should not cross at home',
        paragraphs: [
          'Parkinson\'s disease, major depression, ADHD, and bipolar disorder all involve dopamine systems in ways food cannot replace. If your movement is slowing, your mood is persistently low or manic, or your focus has collapsed in a way that is new and severe, see a clinician. This article is education about pathways and diet gaps. It is not a substitute for a diagnosis or a medication decision.',
        ],
      },
      {
        heading: 'What to do with this',
        paragraphs: [
          'Cover the line: enough protein, B6-rich foods, iron with a little vitamin C if you eat plant-based, and folate from greens and legumes. Then read the [seven nutrients with food matches](/blog/dopamine-foods) and the [series overview](/blog/dopamine-guide). If you want to check whether your usual packaged snacks carry any protein at all, run a label through the [Analyzer](/analyzer).',
        ],
      },
    ],
    ko: [
      {
        heading: '1단계: 단백질을 출발 재료로 바꾸기',
        paragraphs: [
          '뇌 도파민은 [단백질](/nutrients/proteins)을 소화해서 얻는 아미노산, 티로신(Tyrosine)에서 시작해요. 페닐알라닌이라는 또 다른 아미노산도 먼저 티로신으로 바뀌어서 같은 풀에 합류하고요.',
          '라인의 첫 기계는 이름이 긴 효소예요. 티로신 하이드록실라제(tyrosine hydroxylase). 조립 라인에서 제일 느린 일꾼이라고 생각하면 돼요. 이 일꾼이 뒤 공정 전체의 속도를 정하거든요. 그래서 과학자들이 "속도 제한" 단계라고 불러요. 이 효소가 티로신을 L-DOPA로 바꾸는데, 그러려면 철분이랑 BH4(테트라하이드로바이옵테린)라는 도우미 분자가 필요해요. 엽산은 그 BH4 재고를 계속 채워 주고요. BH4가 모자라면 티로신이 사방에 있어도 라인이 기어가요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '약 47mg', label: '성인 하루 티로신 평균 필요량 (NIH)' },
              { value: '0.8g/kg', label: '하루 기본 단백질, 운동 많으면 더' },
            ],
          },
        ],
      },
      {
        heading: '2단계: 마무리 손질',
        paragraphs: [
          '두 번째 기계는 또 다른 효소예요(aromatic L-amino acid decarboxylase, 줄여서 AADC). 이게 L-DOPA를 도파민으로 바꿔요. 필수 도구는 [비타민 B6](/nutrients/vitamins)의 활성형이고요. 성인은 하루 1.3~1.7mg 정도 필요해요.',
          '하나 더 알아 두면 좋은 단계가 있어요. 구리는 도파민 일부를 더 뒤에서 노르에피네프린으로 바꾸는 걸 도와요. 식단이 다양하면 구리를 일일이 챙길 필요는 없고, 과다 보충이 목표도 아니에요. 라인 전체를 표로 보면 이래요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '도파민 조립 라인과 단계별로 필요한 영양소',
            headers: ['단계', '하는 일', '도우미 영양소'],
            rows: [
              ['1. 티로신 → L-DOPA', '속도를 정하는 느린 단계', '철분, 엽산(BH4 경유)'],
              ['2. L-DOPA → 도파민', '마무리 단계', '비타민 B6'],
              ['3. 도파민 → 노르에피네프린', '뒤쪽의 선택적 전환', '구리'],
            ],
          },
        ],
      },
      {
        heading: '라인이 빈약해질 때 (영양 관점만)',
        paragraphs: [
          '도파민 합성을 진짜로 압박할 수 있는 패턴이 몇 개 있어요. 만성 저단백, 과음(B6·엽산을 빼앗아요), 치료 안 된 철결핍, 콩이나 동물성 단백질이 거의 없는 극단 식단요.',
          '그런데 솔직하게 말할게요. 사람들이 "도파민 낮다"고 부르는 것, 그러니까 의욕 저하, 평평한 기분, 안절부절, 머리 멍함은 다른 원인 수십 가지랑 겹쳐요. 수면 부채, 갑상선 문제, 우울증, 약 부작용 같은 거요. 영양은 그 엉킨 실타래의 한 가닥일 수 있어요. 전부인 경우는 드물고요.',
          '그리고 일반 혈액 검사로는 시냅스 도파민을 못 재요. 소변 대사물이나 혈장 수치가 오늘 오후 내 뇌가 뭘 하는지 말해 주지 않거든요. "간단한 검사로 도파민 수치를 안다"는 콘텐츠가 보이면 의심하는 게 나아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '혈액 검사로 도파민은 못 읽어요',
            body: [
              '정작 중요한 곳, 즉 뇌 시냅스의 도파민을 재는 일반 검사는 없어요. 잰다고 하면 경계 신호예요.',
            ],
          },
        ],
      },
      {
        heading: '자극이 공급을 앞지를 때',
        paragraphs: [
          '반대쪽은 임상적인 "도파민 과다"가 아니에요. 보상 과부하예요. 끝없는 스크롤, 도박, 폭식, 자극제 쌓기 같은 거요. 여기 해법도 임상이 아니고요.',
          '볼륨 손잡이를 떠올려 보세요. 음악을 충분히 크게, 충분히 오래 틀면 귀가 더 이상 그걸 크다고 느끼지 않아요. 보상 회로도 비슷해요. 센 자극이 계속되면 스스로 민감도를 낮춰서, 같은 효과를 보려면 더 센 자극이 필요해져요. 이건 행동 패턴이고, 부족한 잠이랑 자주 엮여요. 렌틸콩 한 그릇 더 먹는다고 풀리지 않아요. 다만 혈당 요동이랑 늦은 카페인은 이 루프를 더 단단하게 만들긴 해요([5편](/blog/dopamine-stimulants)).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '볼륨 손잡이 비유',
            body: [
              '세고 잦은 자극은 보상 회로를 더 둔하게 만들어요. 더 센 "부스터"가 아니라 자극을 줄이고 잘 자는 게 보통 답이에요.',
            ],
          },
        ],
      },
      {
        heading: '집에서 넘지 말아야 할 경계',
        paragraphs: [
          '파킨슨, 주요 우울, ADHD, 양극성은 모두 도파민 시스템이 얽히지만 음식으로 대신할 수 없어요. 움직임이 느려지거나, 기분이 오래 가라앉거나 들뜨거나, 집중이 새로 심하게 무너졌다면 클리니션을 보세요. 이 글은 경로랑 식단 공백에 대한 교육이에요. 진단이나 약 조정을 대신하지 않아요.',
        ],
      },
      {
        heading: '이걸로 뭘 하면 되나',
        paragraphs: [
          '라인부터 채워요. 단백질 충분히, B6 식품, 식물 위주면 비타민 C 약간이랑 같이 철분, 그리고 나물·콩으로 엽산요. 그다음 [7가지 영양소·식품](/blog/dopamine-foods)이랑 [시리즈 개요](/blog/dopamine-guide)를 읽으면 돼요. 자주 사는 가공식에 단백질이 있긴 한지 궁금하면 라벨을 [분석기](/analyzer)에 넣어 보세요.',
        ],
      },
    ],
  },
  {
    slug: 'dopamine-foods',
    seriesId: 'dopamine',
    episode: 3,
    title: {
      en: 'Seven nutrients that support dopamine, with everyday foods that actually show up on your table',
      ko: '도파민을 돕는 7가지 영양소: 근거와 식탁 매칭',
    },
    thesis: {
      en: 'Dopamine synthesis runs on tyrosine plus a short list of helpers: B6, iron, folate, magnesium, vitamin D, and omega-3. You can cover most of them with ordinary Korean staples.',
      ko: '도파민 합성은 티로신에 더해 B6·철·엽산·마그네슘·비타민 D·오메가-3 같은 도우미에 기대요. 대부분은 한국 식탁의 흔한 재료로 채울 수 있어요.',
    },
    description: {
      en: 'Tyrosine, B6, iron, folate, magnesium, vitamin D, and omega-3: what each does for the dopamine pathway and which foods to reach for, in one table you can scan.',
      ko: '티로신·B6·철·엽산·마그네슘·비타민 D·오메가-3가 도파민 경로에서 하는 일과, 두부·김·닭가슴살·고등어·달걀 같은 식탁 매칭을 한 표로 정리했어요.',
    },
    readMinutes: 9,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-guide', 'dopamine-synthesis-balance', 'dopamine-stimulants', 'dopamine-lifestyle'],
    en: [
      {
        heading: 'The seven nutrients at a glance',
        paragraphs: [
          'You do not need to memorize the chemistry to eat well for this. Here is the whole list in one table: what each nutrient does for dopamine, roughly how much you need, and the everyday foods (including Korean staples) that carry it. The sections below add detail on the ones worth a second look.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Seven nutrients, what they do, and where to find them',
            headers: ['Nutrient', 'Its job in the pathway', 'Daily target', 'Everyday foods'],
            rows: [
              ['Tyrosine (protein)', 'The raw material dopamine is built from', '~0.8 g/kg protein', 'Chicken breast, eggs, tofu, Greek yogurt; 닭가슴살, 달걀, 두부, 콩나물국'],
              ['Vitamin B6', 'Runs the L-DOPA → dopamine step', '1.3–1.7 mg', 'Salmon, potatoes, bananas, chickpeas; 고등어, 감자, 바나나'],
              ['Iron', 'Powers the first, pace-setting step', '8 mg (men), 18 mg (women)', 'Lean beef, lentils, spinach, pumpkin seeds; 소고기, 시금치나물, 호박씨'],
              ['Folate', 'Recycles BH4, the first step\'s fuel', '400 mcg DFE', 'Leafy greens, legumes, broccoli; 시금치, 콩, 브로콜리'],
              ['Magnesium', 'Supports hundreds of enzyme reactions', '310–420 mg', 'Pumpkin seeds, black beans, almonds; 호박씨, 검은콩, 아몬드'],
              ['Vitamin D', 'Receptors sit on dopamine neurons', 'aim 30+ ng/mL in blood', 'Fatty fish, egg yolks, fortified milk; 고등어·연어, 달걀 노른자'],
              ['Omega-3 (EPA/DHA)', 'Keeps cell membranes and signaling healthy', '2 fish meals/week', 'Salmon, mackerel, sardines, walnuts; 고등어, 꽁치, 호두'],
            ],
          },
        ],
      },
      {
        heading: '1. Protein, the one that matters most',
        paragraphs: [
          'Tyrosine is the direct raw material, and phenylalanine converts into it, so both come down to eating enough protein. Aim for roughly 0.8 g/kg of body weight a day (WHO/FAO); active adults often need more. For a 60 kg person that is about 48 g, which sounds like a lot until you spread it across the day: eggs at breakfast, tofu or fish at lunch, a normal dinner.',
          'The catch is that a day of crackers, coffee, and a sweet drink can leave you short on tyrosine without ever feeling "protein deficient." That is the gap to watch.',
        ],
        bullets: [
          'Easy wins: chicken breast, eggs, tofu, Greek yogurt',
          'Korean table: 닭가슴살, 달걀, 두부, 된장국, 콩나물국',
        ],
      },
      {
        heading: '2. Iron and B6, the line\'s two tools',
        paragraphs: [
          'Iron powers the first, pace-setting step, and B6 runs the last one. Women of reproductive age need about 18 mg of iron a day; men and post-menopausal women need 8 mg. If you eat mostly plants, pair iron-rich foods with a little vitamin C to absorb more of it. Spinach with a squeeze of citrus, or 콩나물 with bell peppers, both work.',
          'B6 deficiency is uncommon on a mixed diet, but it shows up with heavy drinking or a narrow vegan pattern that was not planned carefully.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Small habit, real difference',
            body: [
              'Plant iron absorbs far better with vitamin C in the same meal. A side of fruit or peppers does more than an expensive supplement here.',
            ],
          },
        ],
      },
      {
        heading: '3. The supporting cast: folate, magnesium, vitamin D, omega-3',
        paragraphs: [
          'Folate keeps BH4 (the first step\'s fuel) topped up, and heavy alcohol drains it, which is one more reason the [stimulant article](/blog/dopamine-stimulants) matters. Magnesium sits in hundreds of enzyme reactions and many adults simply under-eat it. Vitamin D receptors turn up on dopamine neurons, and food alone rarely fixes a real shortfall, so sunlight and a blood test usually enter the picture. Omega-3 fats keep cell membranes and signaling healthy, and the American Heart Association suggests two fish meals a week.',
        ],
        bullets: [
          'Folate: 시금치, 콩, 브로콜리, asparagus',
          'Magnesium: 호박씨, 검은콩, 아몬드, dark leafy greens',
          'Vitamin D: 고등어·꽁치·연어, 달걀 노른자, fortified milk',
          'Omega-3: 고등어, 꽁치, 참치, 호두',
        ],
      },
      {
        heading: 'Build a plate, not a stack of pills',
        paragraphs: [
          'One meal will not fix your motivation. But a week of skimping on protein and minerals can leave less raw material on the bench. Start with the [dopamine overview](/blog/dopamine-guide) or the [synthesis pathway](/blog/dopamine-synthesis-balance), then scan a few labels in the [Analyzer](/analyzer) if you want to see where your usual packaged foods fall short on protein or micronutrients.',
        ],
      },
    ],
    ko: [
      {
        heading: '7가지 영양소 한눈에 보기',
        paragraphs: [
          '이걸 위해 화학을 외울 필요는 없어요. 표 하나에 다 담았어요. 각 영양소가 도파민에 하는 일, 대략 얼마나 필요한지, 그리고 그걸 담은 흔한 음식(한국 식탁 포함)이요. 아래 단락에선 한 번 더 볼 만한 것들만 자세히 풀게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '7가지 영양소, 하는 일, 찾을 곳',
            headers: ['영양소', '경로에서 하는 일', '하루 목표', '흔한 음식'],
            rows: [
              ['티로신(단백질)', '도파민을 만드는 원료', '단백질 약 0.8g/kg', '닭가슴살, 달걀, 두부, 그릭요거트; 콩나물국, 두부조림'],
              ['비타민 B6', 'L-DOPA→도파민 단계 담당', '1.3~1.7mg', '고등어, 감자, 바나나, 병아리콩'],
              ['철분', '첫 번째 속도 결정 단계의 동력', '남 8mg, 여 18mg', '소고기, 렌틸콩, 시금치, 호박씨'],
              ['엽산', '첫 단계 연료 BH4 재생', '400mcg DFE', '시금치, 콩, 브로콜리'],
              ['마그네슘', '수백 가지 효소 반응 지원', '310~420mg', '호박씨, 검은콩, 아몬드'],
              ['비타민 D', '도파민 뉴런에 수용체가 있음', '혈중 30ng/mL 이상 목표', '고등어·연어, 달걀 노른자, 강화 우유'],
              ['오메가-3(EPA/DHA)', '세포막·신호 건강 유지', '주 2회 생선', '고등어, 꽁치, 정어리, 호두'],
            ],
          },
        ],
      },
      {
        heading: '1. 단백질, 제일 중요한 하나',
        paragraphs: [
          '티로신이 직접 원료고, 페닐알라닌도 티로신으로 바뀌니까 결국 단백질을 충분히 먹는 문제로 돌아와요. WHO/FAO 기준 하루 체중 kg당 약 0.8g, 활동량 많으면 더요. 60kg이면 약 48g인데, 듣기엔 많아 보여도 하루에 나눠 보면 별거 아니에요. 아침에 달걀, 점심에 두부나 생선, 평범한 저녁이면 돼요.',
          '함정은 이거예요. 과자랑 커피랑 단 음료로 채운 하루는 라벨상 "단백질 부족"으로 안 느껴지는데 티로신은 모자랄 수 있어요. 바로 그 빈틈을 봐야 해요.',
        ],
        bullets: [
          '쉬운 선택: 닭가슴살, 달걀, 두부, 그릭요거트',
          '식탁 매칭: 된장국, 콩나물국, 두부조림',
        ],
      },
      {
        heading: '2. 철분과 B6, 라인의 두 도구',
        paragraphs: [
          '철분은 속도를 정하는 첫 단계의 동력이고, B6는 마지막 단계를 돌려요. 가임기 여성은 하루 약 18mg, 남성·폐경 후는 8mg이 필요해요. 식물 위주로 먹으면 철분이 많은 음식을 [비타민 C](/nutrients/vitamins) 조금이랑 같이 먹어서 흡수를 올리세요. 시금치에 귤 한 쪽, 콩나물에 파프리카, 둘 다 효과 있어요.',
          'B6 결핍은 혼합 식단이면 드물어요. 다만 술을 많이 마시거나, 꼼꼼히 계획 안 한 채식을 하면 부족해질 수 있어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '작은 습관, 진짜 차이',
            body: [
              '식물성 철분은 같은 끼니에 비타민 C가 있으면 훨씬 잘 흡수돼요. 여기선 비싼 보충제보다 과일이나 파프리카 한 접시가 더 일해요.',
            ],
          },
        ],
      },
      {
        heading: '3. 조연들: 엽산, 마그네슘, 비타민 D, 오메가-3',
        paragraphs: [
          '엽산은 첫 단계 연료인 BH4를 계속 채워 주는데, 과음이 그걸 빼앗아 가요. [자극제 편](/blog/dopamine-stimulants)이 중요한 이유가 하나 더 생기는 거죠. 마그네슘은 수백 가지 효소 반응에 들어가는데 의외로 부족하게 먹는 성인이 많아요. 비타민 D 수용체는 도파민 뉴런에도 있고, 진짜 부족은 음식만으로 잘 안 메워져서 햇빛이랑 혈액 검사가 보통 같이 등장해요. 오메가-3 지방은 세포막이랑 신호를 건강하게 유지하고, 미국심장협회는 주 2회 생선을 권해요.',
        ],
        bullets: [
          '엽산: 시금치, 콩, 브로콜리, 아스파라거스',
          '마그네슘: 호박씨, 검은콩, 아몬드, 진한 잎채소',
          '비타민 D: 고등어·꽁치·연어, 달걀 노른자, 강화 우유',
          '오메가-3: 고등어, 꽁치, 참치, 호두',
        ],
      },
      {
        heading: '알약 스택보다 한 끼',
        paragraphs: [
          '한 끼로 의욕이 살아나진 않아요. 그런데 일주일 내내 단백질·미네랄을 아끼면 도마 위 재료가 줄긴 해요. [도파민 개요](/blog/dopamine-guide)나 [합성 경로](/blog/dopamine-synthesis-balance)부터 보고, 자주 사는 가공식이 단백질·미량영양소에서 어디가 부족한지 궁금하면 라벨 몇 개를 [분석기](/analyzer)에 넣어 보세요.',
        ],
      },
    ],
  },
  {
    slug: 'dopamine-stimulants',
    seriesId: 'dopamine',
    episode: 5,
    title: {
      en: 'Caffeine, sugar, and alcohol: the everyday chemicals that push your dopamine system around',
      ko: '카페인, 설탕, 알코올: 도파민을 흔드는 일상의 화학',
    },
    thesis: {
      en: 'Caffeine, sugar, and alcohol all touch dopamine-related circuits, but on different timelines, and none of them replace sleep, protein, or movement.',
      ko: '카페인·설탕·알코올은 모두 도파민 관련 회로에 닿아요. 다만 시간 스케일이 다르고, 어느 것도 수면·단백질·운동을 대신하지 못해요.',
    },
    description: {
      en: 'What coffee, sweets, and drinks do to reward signaling in the short and long run, without the moral panic.',
      ko: '커피, 단 것, 술이 보상 회로에 미치는 단기·장기 영향을 영양 관점에서, 설교 없이 정리했어요.',
    },
    readMinutes: 8,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-guide', 'dopamine-synthesis-balance', 'dopamine-foods', 'dopamine-lifestyle'],
    en: [
      {
        heading: 'The three, side by side',
        paragraphs: [
          'Caffeine, sugar, and alcohol get lumped together as "things that mess with dopamine," but they work on completely different clocks. Here is the quick comparison before we get into each one.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'How the three compare',
            headers: ['', 'Short-term effect', 'Long-term cost', 'A reasonable limit'],
            rows: [
              ['Caffeine', 'Alertness, small dopamine bump', 'Tolerance, disrupted sleep', 'Up to 400 mg/day (≈4 coffees)'],
              ['Sugar', 'Quick reward spike, then a crash', 'The spike-crash-crave loop', 'Pair it with protein or fiber'],
              ['Alcohol', 'Brief lift, lowered inhibition', 'Receptor downshift, drained B6 & folate', '≤1 drink/day (women), ≤2 (men)'],
            ],
          },
        ],
      },
      {
        heading: 'Caffeine: borrowed alertness',
        paragraphs: [
          'Caffeine works mostly by blocking adenosine, the molecule that builds up through the day and makes you sleepy. Block it and you feel awake. Caffeine also nudges dopamine release a little, which is part of why the second cup feels easier than the first.',
          'The trade-off is tolerance. The same dose moves you less over time, and the withdrawal headache is real. The FDA puts the general ceiling for healthy adults at about 400 mg a day, roughly four 8-oz brewed coffees. Past that, anxiety and sleep debt start stacking up, and sleep debt is exactly what dents your dopamine receptors ([Part 6](/blog/dopamine-lifestyle)).',
        ],
      },
      {
        heading: 'Sugar: the spike, the crash, the next cookie',
        paragraphs: [
          'A hit of fast sugar raises insulin and can briefly light up reward regions in brain-imaging studies. The problem was never one donut. It is the loop: spike, crash, crave, repeat.',
          'Ultra-processed foods make that loop worse because they combine refined carbs, fat, and salt in ratios you almost never find in nature. That combination grabs your learning signals harder than plain rice or fruit ever could. And the blood-sugar swings steal focus from the slower, earned rewards, like finishing a project or cooking a real meal.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'One swap that actually sticks',
            body: [
              'Trade one daily sweet drink for protein plus fiber: yogurt and berries, or eggs and toast. It is not exciting, and it works far more often than "quit sugar forever" posts.',
            ],
          },
        ],
      },
      {
        heading: 'Alcohol: short lift, long tax',
        paragraphs: [
          'Alcohol raises dopamine release in the moment, which is part of why the first drink loosens you up. Drink heavily over time and the opposite sets in: receptors downshift, and your B vitamins and folate get drained, the very helpers you need to build dopamine in the first place ([Part 3](/blog/dopamine-foods)).',
          'The American Heart Association suggests capping it at one drink a day for women and two for men, and less is better. This is not a lecture. It is arithmetic on sleep, folate, and how motivated you feel the next morning.',
        ],
      },
      {
        heading: 'What actually helps',
        paragraphs: [
          'Keep caffeine before noon if your sleep is shaky. Pair sweets with protein or fiber so the crash is gentler. Treat alcohol as a trade, not a free calorie. Then read the [lifestyle piece](/blog/dopamine-lifestyle), because none of this sticks without sleep.',
        ],
      },
    ],
    ko: [
      {
        heading: '셋을 나란히 놓고 보면',
        paragraphs: [
          '카페인, 설탕, 알코올은 "도파민을 건드리는 것들"로 묶이지만, 작동하는 시계가 완전히 달라요. 각각 들어가기 전에 빠르게 비교부터 해볼게요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '세 가지 비교',
            headers: ['', '단기 효과', '장기 비용', '적당한 한도'],
            rows: [
              ['카페인', '각성, 작은 도파민 상승', '내성, 수면 방해', '하루 400mg까지(커피 약 4잔)'],
              ['설탕', '빠른 보상 스파이크, 곧 추락', '올랐다-추락-당김 루프', '단백질이나 섬유랑 같이'],
              ['알코올', '잠깐의 고양, 억제 풀림', '수용체 둔화, B6·엽산 소모', '여 1잔, 남 2잔 이하/일'],
            ],
          },
        ],
      },
      {
        heading: '카페인: 빌려 쓰는 각성',
        paragraphs: [
          '카페인은 주로 아데노신을 막아서 일해요. 아데노신은 하루 동안 쌓여서 졸리게 만드는 분자거든요. 이걸 막으니까 깨어 있는 느낌이 들어요. 카페인은 도파민 방출도 살짝 밀어 주는데, 두 번째 잔이 첫 잔보다 "쉽게" 넘어가는 느낌엔 그 영향도 있어요.',
          '대가는 내성이에요. 같은 양이 시간이 갈수록 덜 듣고, 끊을 때 두통도 진짜예요. FDA는 건강한 성인 기준 하루 약 400mg, 그러니까 브루 커피 4잔쯤을 상한으로 둬요. 그 이상이면 불안이랑 수면 부채가 쌓이기 시작하고, 수면 부채는 바로 도파민 수용체를 깎는 그것이에요([6편](/blog/dopamine-lifestyle)).',
        ],
      },
      {
        heading: '설탕: 스파이크, 추락, 다음 과자',
        paragraphs: [
          '빠른 당이 들어오면 인슐린이 오르고, 뇌영상 연구에선 보상 영역이 잠깐 켜질 수 있어요. 문제는 도넛 한 개가 아니었어요. 루프예요. 올랐다, 추락, 당김, 반복.',
          '초가공식은 이 루프를 더 나쁘게 만들어요. 정제 탄수·지방·소금을 자연에선 거의 못 보는 비율로 섞어 놓거든요. 그 조합이 밥이나 과일보다 학습 신호를 훨씬 세게 잡아당겨요. 게다가 혈당 요동은 더 느리게 번 보상, 그러니까 프로젝트 끝내기나 진짜 밥 해 먹기 같은 데서 집중을 빼앗아요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '진짜 지켜지는 교환 하나',
            body: [
              '하루 단 음료 하나를 단백질+섬유로 바꿔 보세요. 그릭요거트+베리, 아니면 달걀+토스트요. 재미없지만, "설탕 영원히 끊기"보다 훨씬 자주 지켜져요.',
            ],
          },
        ],
      },
      {
        heading: '알코올: 짧은 고양, 긴 세금',
        paragraphs: [
          '술은 그 순간 도파민 방출을 올려요. 첫 잔에서 긴장이 풀리는 데엔 그 영향이 있어요. 그런데 오래 많이 마시면 반대가 와요. 수용체가 둔해지고, B 비타민이랑 엽산이 닳아요. 애초에 도파민을 만들 때 필요한 바로 그 도우미들이요([3편](/blog/dopamine-foods)).',
          '미국심장협회는 여성 하루 1잔, 남성 2잔 이하를 권하고, 적을수록 좋다고 해요. 설교가 아니에요. 수면이랑 엽산, 다음 날 아침 의욕에 대한 계산이에요.',
        ],
      },
      {
        heading: '실제로 도움이 되는 것',
        paragraphs: [
          '잠이 얕으면 카페인은 낮 12시 전에요. 단 것은 단백질이나 섬유랑 같이 먹어서 추락을 부드럽게요. 술은 공짜 칼로리가 아니라 교환으로 보세요. 그다음 [생활 습관 편](/blog/dopamine-lifestyle)을 읽어 보세요. 잠 없이는 위 규칙들도 잘 안 지켜지거든요.',
        ],
      },
    ],
  },
  {
    slug: 'dopamine-lifestyle',
    seriesId: 'dopamine',
    episode: 6,
    title: {
      en: 'Exercise, sleep, and sunlight: supporting dopamine without a prescription',
      ko: '운동, 수면, 햇빛: 약 없이 도파민을 돕는 법',
    },
    thesis: {
      en: 'Nutrition supplies the parts; exercise, sleep, and sunlight assemble them. Skip those three and no supplement stack catches up.',
      ko: '영양은 부품을 공급하고, 운동·수면·햇빛이 그걸 조립해요. 이 셋을 건너뛰면 보충제로는 못 따라잡아요.',
    },
    description: {
      en: 'How movement, sleep, and sunlight interact with dopamine signaling, and why food alone is not enough.',
      ko: '운동·수면·햇빛(비타민 D)이 도파민 신호와 어떻게 맞물리는지, 그리고 식단만으로는 왜 부족한지.',
    },
    readMinutes: 8,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-guide', 'dopamine-synthesis-balance', 'dopamine-foods', 'dopamine-stimulants'],
    en: [
      {
        heading: 'The three habits, and the numbers that matter',
        paragraphs: [
          'If the food articles were about supplying parts, this one is about assembly. Exercise, sleep, and sunlight do not "release dopamine" in the cartoon sense, but they shape how well the whole system runs. Three numbers are worth pinning to the fridge.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '150 min', label: 'moderate activity per week (WHO)' },
              { value: '7–9 hrs', label: 'sleep for adults (AASM)' },
              { value: '20 ng/mL', label: 'blood vitamin D below this is deficient (NIH)' },
            ],
          },
        ],
      },
      {
        heading: 'Exercise: the honest drug',
        paragraphs: [
          'A single bout of aerobic exercise raises dopamine in animal studies and increases BDNF, a kind of fertilizer for brain cells that helps neurons adapt and connect. In people, regular movers report better mood and an easier time starting tasks, often before the scale moves at all.',
          'You do not need a marathon. The WHO target of 150 minutes a week of moderate activity counts brisk walking. For mood, consistency beats intensity. A short walk you actually take every day does more than the heroic gym session you keep skipping.',
        ],
      },
      {
        heading: 'Sleep: where the receptors reset',
        paragraphs: [
          'This is the one people underrate. In PET imaging studies, a single night of total sleep deprivation lowered the availability of D2/D3 dopamine receptors in the striatum, by roughly 5 to 12 percent in some groups. It is not permanent, but it explains why everything feels flat and unrewarding after an all-nighter.',
          'Adults do best on 7 to 9 hours. Caffeine after about 2 p.m. and alcohol before bed both eat into the deep, slow-wave sleep where a lot of the repair happens.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'Sleep is not optional here',
            body: [
              'No amount of protein or supplements compensates for chronic short sleep. If you fix one thing this week, fix this one.',
            ],
          },
        ],
      },
      {
        heading: 'Sunlight and vitamin D',
        paragraphs: [
          'Morning outdoor light anchors your circadian rhythm, the internal clock that indirectly steadies your dopamine-driven alertness through the day. Separately, vitamin D status tracks with mood in large population studies. The mechanism is still messy, but correcting a genuine deficiency (a blood level under 20 ng/mL) is a reasonable, low-risk move.',
          'Food helps ([Part 3](/blog/dopamine-foods)), but a mid-latitude winter often does not give you enough sun to manage it. A blood test beats guessing.',
        ],
      },
      {
        heading: 'Synergy, not substitution',
        paragraphs: [
          'Protein at breakfast, a walk after lunch, phone down by 10 p.m. It is a boring stack, and it beats chasing a new nootropic every month. If you have not read it yet, start with the [overview](/blog/dopamine-guide).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'A week, in three habits',
            headers: ['Habit', 'Simple target', 'Why it matters for dopamine'],
            rows: [
              ['Move', '150 min/week, walking counts', 'Raises dopamine and BDNF, eases task start'],
              ['Sleep', '7–9 hrs, caffeine before 2 p.m.', 'Lets dopamine receptors recover'],
              ['Light', 'Morning sun; test D if low', 'Steadies the daily alertness rhythm'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '세 가지 습관, 그리고 중요한 숫자들',
        paragraphs: [
          '앞의 음식 글들이 부품 공급 얘기였다면, 이 글은 조립 얘기예요. 운동·수면·햇빛은 만화처럼 "도파민을 분출"하진 않아요. 대신 시스템 전체가 얼마나 잘 돌아가는지를 좌우해요. 냉장고에 붙여 둘 만한 숫자가 셋 있어요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '150분', label: '주당 중강도 활동 (WHO)' },
              { value: '7~9시간', label: '성인 권장 수면 (AASM)' },
              { value: '20ng/mL', label: '혈중 비타민 D가 이 밑이면 결핍 (NIH)' },
            ],
          },
        ],
      },
      {
        heading: '운동: 부작용 목록이 짧은 약',
        paragraphs: [
          '유산소 운동 한 번이면 동물 연구에서 도파민이 오르고 BDNF도 늘어요. BDNF는 뇌세포의 거름 같은 거라, 뉴런이 적응하고 연결되는 걸 도와요. 사람도 규칙적으로 움직이면 기분이 낫고 일을 시작하기가 수월하다고 말하는 경우가 많아요. 체중이 변하기도 전에요.',
          '마라톤은 필요 없어요. WHO가 권하는 주 150분 중강도엔 빠른 걷기도 들어가요. 기분에는 강도보다 꾸준함이 이겨요. 매일 진짜로 하는 짧은 산책이, 자꾸 건너뛰는 영웅적인 헬스 한 번보다 나아요.',
        ],
      },
      {
        heading: '수면: 수용체가 리셋되는 시간',
        paragraphs: [
          '이게 사람들이 제일 과소평가하는 거예요. PET 영상 연구에서, 하룻밤 완전히 못 잤더니 선조체(striatum)의 D2/D3 도파민 수용체 가용성이 줄었어요. 집단에 따라 대략 5~12%요. 영구적이진 않지만, 밤샘 다음 날 모든 게 평평하고 보상이 안 느껴지는 이유를 설명해 줘요.',
          '성인은 7~9시간이 제일 좋아요. 오후 2시쯤 이후의 카페인이랑 잠들기 전 술은 둘 다 깊은 서파 수면을 갉아먹어요. 회복이 많이 일어나는 그 잠이요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '여기선 잠이 선택이 아니에요',
            body: [
              '만성적인 짧은 잠은 단백질이나 보충제로 못 메워요. 이번 주에 딱 하나만 고친다면, 이걸 고치세요.',
            ],
          },
        ],
      },
      {
        heading: '햇빛과 비타민 D',
        paragraphs: [
          '아침 야외 빛이 일주기 리듬을 고정해요. 하루 동안 도파민 기반 각성을 간접적으로 안정시키는 몸 안의 시계요. 그리고 따로, 비타민 D 상태는 큰 인구 연구에서 기분이랑 같이 움직여요. 메커니즘은 아직 복잡하지만, 진짜 결핍(혈중 20ng/mL 미만)을 교정하는 건 위험이 낮고 합리적인 선택이에요.',
          '음식도 도와요([3편](/blog/dopamine-foods)). 그런데 중위도 겨울엔 햇빛이 그것만으로 충분치 않은 경우가 많아요. 추측보다 혈액 검사가 나아요.',
        ],
      },
      {
        heading: '대체가 아니라 시너지',
        paragraphs: [
          '아침에 단백질, 점심 후 산책, 밤 10시 전에 폰 내려놓기. 지루한 조합이죠. 그래도 매달 새 뇌 영양제 사는 것보다 나아요. 아직 안 읽었으면 [개요](/blog/dopamine-guide)부터 보세요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '일주일, 세 가지 습관으로',
            headers: ['습관', '간단한 목표', '도파민에 왜 중요한가'],
            rows: [
              ['움직이기', '주 150분, 걷기도 OK', '도파민·BDNF를 올리고 일 시작을 쉽게'],
              ['자기', '7~9시간, 카페인은 오후 2시 전', '도파민 수용체가 회복할 시간'],
              ['빛 쬐기', '아침 햇빛, 낮으면 D 검사', '하루 각성 리듬을 안정시킴'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'dopamine-detox',
    seriesId: 'dopamine',
    episode: 7,
    title: {
      en: 'The truth about "dopamine detox": what the science says and what nutrition can actually do',
      ko: '"도파민 디톡스"의 진실: 과학이 말하는 것과 말하지 않는 것',
    },
    thesis: {
      en: 'A dopamine detox does not wash anything out of your brain. It is a behavioral reset, and nutrition helps by steadying the blood sugar and building blocks that make a reset stick.',
      ko: '도파민 디톡스는 뇌에서 뭔가를 씻어내는 게 아니에요. 행동 리셋이고, 영양은 그 리셋이 유지되도록 혈당이랑 재료를 안정시키는 쪽에서 도와요.',
    },
    description: {
      en: 'Why the viral "detox" framing is misleading, what a useful reset actually looks like, and where food fits.',
      ko: '바이럴 "디톡스" 표현이 왜 오해를 부르는지, 쓸 만한 리셋은 어떤 모습인지, 음식이 끼는 자리는 어디인지.',
    },
    readMinutes: 7,
    datePublished: '2026-06-04',
    relatedSlugs: ['dopamine-guide', 'dopamine-synthesis-balance', 'dopamine-stimulants', 'dopamine-lifestyle'],
    en: [
      {
        heading: 'You cannot detox dopamine',
        paragraphs: [
          'Let us clear this up first: dopamine is not a toxin. Your brain makes it around the clock because you need it to move, plan, and learn. If it actually drained away, you would not feel "reset," you would struggle to walk.',
          'So what are those "detox" videos really describing? Usually: stop scrolling, gaming, and snacking for 48 hours. That is stimulus reduction, which is fine and sometimes useful. The name is just wrong, and the wrong name leads people to expect a chemical flush that was never going to happen.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Myth vs. what is actually true',
            headers: ['The popular claim', 'What is really going on'],
            rows: [
              ['"Flush dopamine out of your brain"', 'Dopamine is made constantly; you cannot and would not want to flush it'],
              ['"Reset your dopamine levels in 48 hours"', 'You are dialing down overstimulation, not draining a chemical'],
              ['"Cut out everything fun"', 'Targeting one or two specific loops works better and lasts longer'],
            ],
          },
        ],
      },
      {
        heading: 'What a useful reset actually looks like',
        paragraphs: [
          'Pick one high-stimulation loop. Late-night Shorts, the third coffee, the candy in the desk drawer. Just one. Remove its cue for two weeks and replace it with a slower reward: a walk, a paperback, cooking. Track your sleep while you do it. The boredom is not a bug, it is the point. That quiet is when your baseline sensitivity creeps back.',
          'The extreme "no fun at all" versions tend to fail because they ignore real withdrawal from caffeine or nicotine. Match the reset to your actual dependencies, not to a video\'s rules.',
        ],
      },
      {
        heading: 'Where nutrition fits',
        paragraphs: [
          'This is the part the detox videos skip. Steady protein and [minerals](/nutrients/minerals) keep dopamine synthesis from dipping while you cut the junk stimuli. Balanced meals blunt the sugar crash that quietly sends you back to the phone. None of this replaces the behavioral work. It just removes an avoidable trip-up.',
          'If you want a structured food lens, revisit the [seven nutrients for dopamine](/blog/dopamine-foods) and the [stimulant breakdown](/blog/dopamine-stimulants).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'The quiet helper',
            body: [
              'A meal with protein and fiber keeps your blood sugar steady, so you are not white-knuckling a crash on top of breaking a habit. That alone makes a reset much easier to hold.',
            ],
          },
        ],
      },
      {
        heading: 'Back to the hub',
        paragraphs: [
          'The series starts with [what dopamine is](/blog/dopamine-guide). Wander into the [nutrient encyclopedia](/nutrients) when a name catches your eye, like tyrosine, iron, or B6. That is the whole point of VITAL: a name on a label should map to something you can eat tomorrow.',
        ],
      },
    ],
    ko: [
      {
        heading: '도파민은 "디톡스"할 수 없어요',
        paragraphs: [
          '이것부터 짚고 갈게요. 도파민은 독소가 아니에요. 움직이고, 계획하고, 배우려면 필요해서 뇌가 쉬지 않고 만들어요. 진짜로 빠져나간다면 "리셋"되는 느낌이 아니라 걷는 것부터 힘들어질 거예요.',
          '그럼 그 "디톡스" 영상들은 사실 뭘 말하는 걸까요? 보통은 48시간 동안 스크롤·게임·간식 끊기예요. 자극 줄이기죠. 괜찮고 때론 쓸모도 있어요. 이름이 틀렸을 뿐이에요. 그런데 그 틀린 이름 때문에 사람들이 일어나지도 않을 화학적 세척을 기대하게 돼요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '오해 vs 실제',
            headers: ['흔한 주장', '실제로 일어나는 일'],
            rows: [
              ['"뇌에서 도파민을 씻어낸다"', '도파민은 계속 만들어져요. 씻어낼 수도 없고, 그러고 싶지도 않을 거예요'],
              ['"48시간이면 도파민 수치 리셋"', '화학물질을 빼는 게 아니라 과자극을 낮추는 거예요'],
              ['"재미있는 건 다 끊어라"', '특정 루프 한두 개만 노리는 게 더 효과 있고 오래가요'],
            ],
          },
        ],
      },
      {
        heading: '쓸 만한 리셋은 이렇게 생겼어요',
        paragraphs: [
          '고자극 루프 하나를 고르세요. 밤늦은 숏폼, 세 번째 커피, 책상 서랍 속 사탕. 딱 하나만요. 그 단서를 2주간 빼고, 느린 보상으로 바꿔요. 산책, 종이책, 요리 같은 거요. 하는 동안 수면도 기록하고요. 지루함은 버그가 아니라 핵심이에요. 그 조용한 틈에 기준선 민감도가 슬슬 돌아오거든요.',
          '"재미는 전부 금지" 같은 극단은 잘 깨져요. 카페인이나 니코틴의 진짜 금단을 무시하니까요. 영상의 규칙이 아니라 내 실제 의존에 맞춰야 해요.',
        ],
      },
      {
        heading: '영양이 끼는 자리',
        paragraphs: [
          '디톡스 영상들이 건너뛰는 부분이 이거예요. 단백질이랑 [미네랄](/nutrients/minerals)을 꾸준히 채우면, 자극을 줄이는 동안에도 도파민 합성이 처지지 않아요. 균형 잡힌 끼니는 슬그머니 폰으로 끌고 가는 혈당 추락을 완화하고요. 이게 행동 변화를 대신하진 않아요. 그냥 피할 수 있는 걸림돌 하나를 치우는 거예요.',
          '음식 관점으로 정리하고 싶으면 [도파민 7가지 영양소](/blog/dopamine-foods)랑 [자극제 정리](/blog/dopamine-stimulants)를 다시 보세요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '조용한 조력자',
            body: [
              '단백질이랑 섬유가 든 끼니는 혈당을 안정시켜요. 그래서 습관을 끊는 와중에 혈당 추락까지 이 악물고 버틸 필요가 없어져요. 그것만으로도 리셋을 유지하기가 훨씬 쉬워져요.',
            ],
          },
        ],
      },
      {
        heading: '허브로 돌아가기',
        paragraphs: [
          '시리즈는 [도파민이 뭔지](/blog/dopamine-guide)에서 시작해요. 티로신, 철분, B6 같은 이름이 눈에 띄면 [영양소 백과](/nutrients)로 넘어가 보세요. VITAL이 하려는 게 딱 그거예요. 라벨 위 이름이 내일 먹을 것과 연결되게 하는 거요.',
        ],
      },
    ],
  },
];
