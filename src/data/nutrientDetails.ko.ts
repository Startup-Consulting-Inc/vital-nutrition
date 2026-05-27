/**
 * Korean overlay for the nutrient encyclopedia. Values shown in the Korean
 * locale. Anything not translated falls back to the English source data.
 *
 * We intentionally keep this as a sparse override map (slug -> partial fields)
 * so the data stays inside one canonical source of truth (`nutrientDetails.ts`)
 * and we only add Korean for the strings users actually read.
 */

import type { IntakeBucket, NutrientDetail } from './nutrientDetails';

type LocalizedFood = { name?: string; keyBenefit?: string };

export interface NutrientKoOverride
  extends Partial<
    Pick<
      NutrientDetail,
      'name' | 'shortName' | 'subtitle' | 'description' | 'dailyNeed' | 'mainFunction'
        | 'functions' | 'deficiencySigns' | 'tips' | 'warning'
    >
  > {
  intakeBuckets?: IntakeBucket[];
  /** Sparse food-level overrides keyed by the English food name. */
  foodOverrides?: Record<string, LocalizedFood>;
}

export const nutrientsKo: Record<string, NutrientKoOverride> = {
  carbohydrates: {
    name: '탄수화물',
    shortName: '탄수화물',
    subtitle: '신체의 주 에너지원',
    description:
      '탄수화물은 인체가 가장 효율적으로 사용하는 에너지원이며, 특히 뇌와 중추신경계는 거의 전적으로 포도당에 의존합니다. 뇌는 하루 약 120g의 포도당을 사용하며, 이는 체중의 2%에 불과한 기관이 전체 에너지의 약 20%를 소비한다는 뜻입니다.',
    dailyNeed: '하루 칼로리의 45–65% (2,000kcal 기준 225–325g)',
    mainFunction: '에너지 생산을 위한 포도당 공급, 뇌 기능 유지, 운동 시 근육 연료, 식이섬유를 통한 소화 건강 지원.',
    functions: [
      '뇌와 적혈구의 주 에너지원',
      '중·고강도 운동 시 근육 연료',
      '식이섬유로 장 건강 및 배변 활동 지원',
      '단백질이 에너지로 소비되는 것을 절약',
    ],
    deficiencySigns: [
      '피로, 무기력, 집중력 저하',
      '두통과 짜증',
      '운동·신체 활동 수행 곤란',
    ],
    tips: [
      '정제 탄수화물보다 통곡물·콩류 등 복합 탄수화물 선택',
      '단백질·지방과 함께 섭취해 혈당 흡수 속도 늦추기',
      '곡물의 절반 이상은 통곡물로',
      '식이섬유가 풍부한 탄수화물은 포만감을 늘리고 장 건강에 도움',
    ],
    warning:
      '첨가당은 하루 칼로리의 10% 미만으로 제한하세요. 가당 음료, 흰 빵, 페이스트리는 피하는 것이 좋습니다.',
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['통곡물 (현미, 귀리, 퀴노아)', '콩류 (렌틸, 검정콩, 병아리콩)', '제철 과일 통째로', '전분 채소 (고구마, 호박)'],
        why: '식이섬유가 함유된 복합 탄수화물은 장내 미생물의 먹이가 되고, 혈당을 천천히 올리며 포만감을 줍니다. CVD·당뇨 위험을 낮추는 것으로 보고됩니다.',
      },
      {
        label: 'Limit',
        tone: 'caution',
        examples: ['흰 빵, 백미, 정제 파스타', '크래커, 프레첼', '과일 주스 (통과일 대신)'],
        why: '정제 탄수화물은 식이섬유와 미세영양소 없이 혈당만 빠르게 올립니다.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['가당 음료 (탄산, 가당차)', '페이스트리, 케이크, 사탕', '첨가당 10g 이상 시리얼'],
        why: '액상·첨가당은 대사질환의 가장 강력한 식이 요인입니다. WHO는 첨가당을 하루 칼로리의 10% 미만, 가능하면 5% 미만으로 권장합니다.',
      },
    ],
    foodOverrides: {
      'Brown Rice':       { name: '현미밥', keyBenefit: '식이섬유 3.5g, 비타민 B 풍부' },
      'Oatmeal':          { name: '오트밀', keyBenefit: '식이섬유 4g, LDL 콜레스테롤 감소' },
      'Quinoa':           { name: '퀴노아', keyBenefit: '식이섬유 5g, 단백질 8g, 완전 단백질' },
      'Sweet Potato':     { name: '고구마', keyBenefit: '식이섬유 4g, 비타민A(베타카로틴) 매우 풍부' },
      'Banana':           { name: '바나나', keyBenefit: '칼륨 422mg, 빠른 에너지 공급' },
      'Whole Wheat Bread':{ name: '통밀빵', keyBenefit: '식이섬유 2g, 흰 빵 대비 영양소 풍부' },
      'Black Beans':      { name: '검정콩',  keyBenefit: '식이섬유 7.5g, 단백질 7.6g' },
      'Chickpeas':        { name: '병아리콩', keyBenefit: '식이섬유 6.2g, 단백질 7.3g' },
      'Apple':            { name: '사과',    keyBenefit: '식이섬유 4.4g, 폴리페놀 항산화 성분' },
      'Lentils':          { name: '렌틸콩',  keyBenefit: '식이섬유 15.6g, 단백질 17.9g' },
    },
  },

  proteins: {
    name: '단백질',
    shortName: '단백질',
    subtitle: '생명의 구성 요소',
    description:
      '단백질은 모든 조직과 세포의 구성·복구·유지를 담당하는 "생명의 벽돌"입니다. 신체는 20가지 아미노산이 필요하며 이 중 9가지는 필수 아미노산으로 반드시 식품을 통해 섭취해야 합니다.',
    dailyNeed: '체중 1kg당 0.8g (성인 남성 약 56g, 여성 약 46g)',
    mainFunction: '조직 형성·복구, 효소·호르몬 생성, 면역 기능 지원, 산소·영양소 운반.',
    functions: [
      '근육·뼈·피부·장기의 형성과 복구',
      '생화학 반응을 촉매하는 효소 생성',
      '면역 항체 생성',
      '혈액에서 산소(헤모글로빈)와 영양소 운반',
    ],
    deficiencySigns: [
      '근손실과 근력 저하',
      '상처 회복 지연',
      '면역력 저하, 잦은 감염',
      '탈모와 손톱 약화',
    ],
    tips: [
      '동물성과 식물성 단백질을 균형 있게 섭취',
      '오메가-3 섭취를 위해 주 2회 이상 생선',
      '식물성 단백질(콩·렌틸)은 식이섬유도 함께 제공',
      '하루 동안 단백질을 분산해 섭취하면 흡수에 유리',
    ],
    warning: '체중 kg당 2g을 초과하는 매우 고단백 식단은 신장이 약한 사람에게 부담을 줄 수 있습니다. 포화지방이 적은 단백질을 우선 선택하세요.',
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['생선 (특히 등푸른 생선)', '껍질을 제거한 가금류', '계란', '콩류 (검정콩, 렌틸콩, 병아리콩)', '플레인 그릭 요거트', '두부·템페'],
        why: '저지방 단백질과 식물성 단백질은 적색·가공육의 포화지방 부담 없이 모든 필수 아미노산을 공급합니다.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['살코기 소·돼지', '치즈 (적당량)', '전유 유제품'],
        why: '실제 단백질 공급원이지만 매일 주식이 되면 포화지방 부담이 누적됩니다.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['가공육 (소시지, 베이컨, 핫도그, 델리미트)', '튀긴 단백질 식품'],
        why: 'WHO는 가공육을 1군 발암물질로 분류했고, 정기 섭취는 대장암 위험을 높이며 나트륨·포화지방을 다량 함유합니다.',
      },
    ],
    foodOverrides: {
      'Chicken Breast':            { name: '닭 가슴살',     keyBenefit: '저지방, 비타민B 풍부' },
      'Salmon':                    { name: '연어',          keyBenefit: '오메가-3 지방산, 심혈관 건강' },
      'Eggs':                      { name: '계란',          keyBenefit: '완전 단백질, 9가지 필수 아미노산' },
      'Greek Yogurt (Non-Fat)':    { name: '무지방 그릭 요거트', keyBenefit: '장 건강 프로바이오틱스, 칼슘' },
      'Lentils':                   { name: '렌틸콩',        keyBenefit: '식이섬유 15.6g, 철분, 엽산' },
      'Tofu':                      { name: '두부',          keyBenefit: '식물성 완전 단백질, 칼슘' },
      'Black Beans':               { name: '검정콩',        keyBenefit: '식이섬유 15g, 엽산, 마그네슘' },
      'Almonds':                   { name: '아몬드',        keyBenefit: '건강한 지방, 비타민E, 마그네슘' },
      'Tuna (Canned in Water)':    { name: '참치 (물 캔)',  keyBenefit: '오메가-3, 셀레늄, 저칼로리' },
      'Cottage Cheese (Low-Fat)':  { name: '저지방 코티지치즈', keyBenefit: '카제인 단백질, 칼슘' },
    },
  },

  fats: {
    name: '지방',
    shortName: '지방',
    subtitle: '건강과 에너지 저장의 핵심',
    description:
      '지방은 인체 건강에 필수적인 영양소이며, g당 9kcal로 가장 에너지 밀도가 높은 다량영양소입니다. 총 섭취량보다 종류가 더 중요합니다. 불포화지방은 유익하고, 트랜스지방은 완전히 피해야 하며, 포화지방은 제한해야 합니다.',
    dailyNeed: '하루 칼로리의 20–35% (2,000kcal 기준 44–78g)',
    mainFunction: '에너지 농축 공급, 지용성 비타민(A·D·E·K) 흡수, 세포막 형성, 호르몬 생성.',
    functions: [
      '가장 에너지 밀도가 높은 영양소 — g당 9kcal',
      '지용성 비타민(A·D·E·K) 흡수에 필수',
      '세포막과 뇌 구조 형성',
      '호르몬과 신호 전달 분자 생성',
    ],
    deficiencySigns: [
      '피부와 머리카락 건조',
      '호르몬 불균형',
      '지용성 비타민 흡수 저하',
      '체온 조절 곤란',
    ],
    tips: [
      '주 조리유는 올리브유로',
      '주 2회 이상 등푸른 생선 (연어·정어리·고등어)',
      '하루 한 줌의 견과·씨앗',
      '"부분 경화유(partially hydrogenated)" 표시 제품은 회피',
    ],
    warning:
      '트랜스지방은 LDL 상승 + HDL 감소를 동시에 일으키는 가장 해로운 지방입니다. 포화지방은 하루 칼로리의 6% 이내로 제한하세요.',
    foodOverrides: {
      'Avocado':               { name: '아보카도',       keyBenefit: '단일불포화지방 10g, 식이섬유, 칼륨' },
      'Olive Oil':             { name: '올리브유',       keyBenefit: '단일불포화 73%, 항염 효과' },
      'Salmon':                { name: '연어',           keyBenefit: 'EPA/DHA 4g, 심혈관 보호' },
      'Walnuts':               { name: '호두',           keyBenefit: 'ALA 오메가-3 2.5g, 항산화' },
      'Chia Seeds':            { name: '치아씨',         keyBenefit: 'ALA 오메가-3 5g, 식이섬유 10g' },
      'Almonds':               { name: '아몬드',         keyBenefit: '단일불포화지방 11g, 비타민E' },
      'Flaxseeds':             { name: '아마씨',         keyBenefit: 'ALA 오메가-3 3.8g, 리그난' },
      'Dark Chocolate (70%)':  { name: '다크 초콜릿(70%)', keyBenefit: '플라보노이드 항산화' },
      'Peanut Butter (Natural)':{ name: '천연 땅콩버터',  keyBenefit: '단일불포화지방 8g, 단백질 7g' },
      'Sardines (Canned)':     { name: '정어리(캔)',     keyBenefit: '오메가-3 1.5g, 칼슘, 비타민D' },
    },
  },

  vitamins: {
    name: '비타민',
    shortName: '비타민',
    subtitle: '작지만 강력한 유기화합물',
    description:
      '비타민은 효소 보조 인자, 항산화제, 유전자 발현 조절자로 작용하는 유기 화합물입니다. 수용성(B군·C)과 지용성(A·D·E·K)으로 나뉘며, 수용성 비타민은 매일 섭취해야 하고 지용성 비타민은 간과 지방조직에 저장됩니다.',
    dailyNeed: '비타민별로 다름 — 아래 식품 표 참고',
    mainFunction: '효소 보조 인자, 항산화제, 유전자 조절. 대사·면역·세포 건강에 필수.',
    functions: [
      '비타민 C: 콜라겐 합성, 면역 강화, 항산화',
      '비타민 D: 칼슘 흡수, 뼈 건강, 면역',
      'B 비타민군: 에너지 대사, DNA 합성, 신경 기능',
      '비타민 A: 시력, 면역, 세포 성장',
      '비타민 E: 항산화, 세포막 보호',
      '비타민 K: 혈액 응고, 뼈 대사',
    ],
    deficiencySigns: [
      '피로·무기력 (B 비타민)',
      '잇몸 출혈, 상처 회복 지연 (비타민 C)',
      '뼈 통증, 면역 저하 (비타민 D)',
      '야맹증 (비타민 A)',
    ],
    tips: [
      '다양한 색의 과일·채소 섭취 (Eat the rainbow)',
      '비타민 C는 식물성 철분 흡수를 도움 — 함께 섭취',
      '햇빛으로 비타민 D 합성, 겨울철 보충제 고려',
      'B12는 동물성 식품에만 자연 존재 — 비건은 강화식품·보충제 필요',
    ],
    warning:
      '지용성 비타민(A·D·E·K)은 보충제로 과량 섭취 시 독성 농도까지 축적될 수 있습니다. 식품 섭취를 우선하세요.',
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['알록달록한 과일·채소', '잎채소 (시금치, 케일)', '비타민 C: 감귤·파프리카', 'B12: 계란·유제품', '비타민 D: 등푸른 생선'],
        why: '자연식 비타민 공급원은 식이섬유, 수분, 항산화 성분까지 함께 제공합니다.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['강화 시리얼·식물성 음료 (비건 B12 필수)', '식단의 빈틈을 채우는 종합 비타민'],
        why: '특정 결핍(비건 B12, 겨울철 D)에 유용하지만 다양한 자연식을 대체할 수는 없습니다.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['전문가 지도 없이 고용량 지용성 비타민 보충', '메가 도즈 비타민 A·D'],
        why: '지용성 비타민은 체내에 축적됩니다. 보충 전 아래 상한 섭취량 표를 확인하세요.',
      },
    ],
    foodOverrides: {
      'Citrus Fruits (Orange)':{ name: '감귤(오렌지)', keyBenefit: '비타민C 78% DV, 엽산, 칼륨' },
      'Bell Peppers (Red)':    { name: '빨간 파프리카', keyBenefit: '비타민C 211% DV, 비타민A, B6' },
      'Sweet Potato':          { name: '고구마', keyBenefit: '베타카로틴, 식이섬유 4g, 비타민C' },
      'Spinach (Cooked)':      { name: '시금치 (조리)', keyBenefit: '비타민K 786% DV, 철분, 칼슘' },
      'Sunflower Seeds':       { name: '해바라기씨', keyBenefit: '비타민E 80% DV, 셀레늄, 마그네슘' },
      'Fatty Fish (Salmon)':   { name: '등푸른 생선(연어)', keyBenefit: '비타민D 55% DV, 오메가-3, B12' },
      'Broccoli':              { name: '브로콜리', keyBenefit: '비타민C 112% DV, 비타민K, 엽산' },
      'Eggs':                  { name: '계란', keyBenefit: 'B12 50% DV, 완전 단백질, 콜린' },
      'Fortified Cereals':     { name: '강화 시리얼', keyBenefit: 'B 비타민 약 100% DV' },
      'Kiwi':                  { name: '키위', keyBenefit: '비타민C 71% DV, 비타민K, 식이섬유' },
    },
  },

  minerals: {
    name: '미네랄',
    shortName: '미네랄',
    subtitle: '구조와 기능을 담당하는 무기 원소',
    description:
      '미네랄은 신체의 구조·조절·촉매 기능을 담당하는 무기 원소입니다. 칼슘·인·마그네슘·나트륨·칼륨·염소는 다량 무기질로 하루 100mg 이상 필요하며, 철·아연·구리·셀레늄·요오드는 미량 무기질입니다.',
    dailyNeed: '미네랄별로 다름 — 칼슘 1,000mg, 철 8–18mg, 아연 8–11mg, 마그네슘 310–420mg',
    mainFunction: '뼈와 치아 형성, 체액 균형, 신경 전도, 효소 반응, 산소 운반.',
    functions: [
      '칼슘·인: 뼈와 치아 구조',
      '철: 헤모글로빈을 통한 산소 운반',
      '칼륨·나트륨: 체액 균형과 신경 전도',
      '아연: 면역, 상처 회복, DNA 합성',
      '마그네슘: 300여 효소 반응, 근육 기능',
      '셀레늄: 항산화, 갑상선 건강',
    ],
    deficiencySigns: [
      '철: 빈혈, 피로, 창백',
      '칼슘: 골다공증, 근육 경련',
      '아연: 탈모, 면역 저하, 회복 지연',
      '칼륨: 근육 약화, 심박 이상',
    ],
    tips: [
      '식물성 철(비헴철)은 비타민C와 함께 섭취하면 흡수 향상',
      '잎채소도 우유에 못지않은 칼슘 공급원',
      '브라질너트 1–2알이면 하루 셀레늄 충족',
      '콩을 불리면 피틴산이 줄어 미네랄 흡수가 좋아집니다',
    ],
    warning:
      '나트륨 과잉(하루 2,300mg 초과)은 고혈압과 직결됩니다. 대부분의 나트륨은 가공식품에서 옵니다.',
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['잎채소 (시금치, 케일)', '콩류 (렌틸, 검정콩)', '씨앗·견과 (호박씨, 아몬드, 브라질너트)', '플레인 유제품·강화 식물성 음료', '통곡물'],
        why: '식물·자연식품에서 오는 미네랄은 식이섬유·항산화제와 함께 오며, 적색육 철분의 포화지방 부담이 없습니다.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['살코기 적색육 (헴철 공급)', '조개·굴 (아연·B12)', '경성 치즈 (칼슘)'],
        why: '미네랄 밀도가 매우 높으므로 매일 주식이 아닌 주기적 섭취로. 식물성 철은 비타민C와 함께 먹으면 흡수가 약 3배 증가합니다.',
      },
      {
        label: 'Limit',
        tone: 'caution',
        examples: ['염장·가공육', '절임·소금에 절인 식품', '대부분의 패스트푸드'],
        why: '필요 없는 나트륨은 많고 정작 필요한 칼륨·마그네슘 등은 부족합니다.',
      },
    ],
    foodOverrides: {
      'Dairy (Milk)':       { name: '우유 (유제품)', keyBenefit: '칼슘 23% DV, 단백질, B12' },
      'Kale (Cooked)':      { name: '케일 (조리)',   keyBenefit: '칼슘 14% DV, 비타민K·C·A' },
      'Red Meat (Beef)':    { name: '쇠고기',        keyBenefit: '헴철 12% DV, 아연, B12' },
      'Spinach (Cooked)':   { name: '시금치 (조리)', keyBenefit: '비헴철 36% DV, 비타민A·K' },
      'Pumpkin Seeds':      { name: '호박씨',        keyBenefit: '아연 26% DV, 마그네슘, 철' },
      'Oysters':            { name: '굴',            keyBenefit: '아연 673% DV, B12, 오메가-3' },
      'Banana':             { name: '바나나',        keyBenefit: '칼륨 9% DV, B6, C' },
      'Brazil Nuts':        { name: '브라질너트',    keyBenefit: '셀레늄 175% DV (1알로 충분)' },
      'Lentils':            { name: '렌틸콩',        keyBenefit: '철 37% DV, 식이섬유 15.6g, 엽산' },
      'Tofu (Calcium-set)': { name: '두부 (칼슘 응고)', keyBenefit: '칼슘 33% DV, 단백질 10g, 철' },
    },
  },

  water: {
    name: '물',
    shortName: '물',
    subtitle: '가장 본질적인 영양소',
    description:
      '물은 성인 체중의 약 60%를 차지하는 가장 풍부한 물질입니다. 모든 세포·조직·장기는 물에 의존해 작동합니다. 생화학 반응의 용매, 영양소 운반 매체, 체온 조절자, 관절 윤활, 노폐물 배출 등 모든 곳에서 작용합니다.',
    dailyNeed: '여성 2.7L/일, 남성 3.7L/일 (모든 음식·음료 합산)',
    mainFunction: '영양소·산소 운반, 체온 조절, 노폐물 배출, 관절 윤활, 모든 생화학 반응 가능.',
    functions: [
      '영양소와 산소를 세포로 운반',
      '땀을 통한 체온 조절',
      '소변·땀·배변으로 노폐물 배출',
      '관절 윤활과 장기 보호',
      '소화와 영양소 흡수 가능',
    ],
    deficiencySigns: [
      '갈증, 입 마름, 짙은 소변',
      '피로, 두통, 어지럼',
      '변비, 소변량 감소',
      '피부 건조, 근육 경련',
    ],
    tips: [
      '기상 직후 한 잔으로 야간 탈수 회복',
      '재사용 가능한 물병을 항상 가까이',
      '수분 많은 과일·채소도 섭취량에 포함',
      '가당 음료 대신 물(또는 레몬·오이수)로 대체',
    ],
    warning:
      '갈증은 이미 탈수 후반의 신호입니다. 운동·더위에선 더욱 자주 마시고, 노년층은 갈증 반응이 둔하니 의식적으로 섭취하세요.',
    foodOverrides: {
      'Plain Water':        { name: '맹물',           keyBenefit: '0kcal, 가장 깨끗한 수분 공급' },
      'Cucumber':           { name: '오이',           keyBenefit: '비타민K, 칼륨, 매우 높은 수분' },
      'Watermelon':         { name: '수박',           keyBenefit: '리코펜, 비타민C, 전해질' },
      'Strawberries':       { name: '딸기',           keyBenefit: '비타민C, 망간, 항산화' },
      'Lettuce (Romaine)':  { name: '로메인 상추',    keyBenefit: '비타민A·K, 거의 0kcal' },
      'Tomato':             { name: '토마토',         keyBenefit: '리코펜, 비타민C, 칼륨' },
      'Coconut Water':      { name: '코코넛 워터',    keyBenefit: '천연 전해질 (K, Na, Mg)' },
      'Broth (Low-Sodium)': { name: '저염 육수',      keyBenefit: '따뜻하고 미네랄 공급' },
      'Zucchini':           { name: '주키니 호박',    keyBenefit: '비타민C, 칼륨, 다용도' },
      'Grapefruit':         { name: '자몽',           keyBenefit: '비타민C·A, 식이섬유' },
    },
  },
};
