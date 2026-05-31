import { useEffect, useState } from 'react';

export type Locale = 'en' | 'ko';
export const LOCALE_STORAGE_KEY = 'vital.locale.v1';

/**
 * Translation dictionary. Keys are namespaced by surface
 * (`nav.*`, `hero.*`, `analyzer.*`, `nutrients.*`, etc.).
 */
const dict = {
  en: {
    // === Nav ===
    'nav.analyzer': 'Analyzer',
    'nav.nutrients': 'Nutrients',
    'nav.amino': 'Amino Acids',
    'nav.log': 'Meal Log',
    'nav.methodology': 'Methodology',
    'nav.research': 'Research',
    'nav.compare': 'Compare',
    'nav.search': 'Search',
    'nav.profile.tooltip': 'Edit your profile',
    'nav.specialPopulations': 'Special Populations',

    // === Hero ===
    'hero.eyebrow': 'Personalized nutrition intelligence',
    'hero.title': "What's actually in your food?",
    'hero.subtitle':
      "Understand what's in your food, why it matters, and what to choose instead — grounded in WHO, NIH, and Harvard research.",
    'hero.ctaPrimary': 'Begin Exploration',
    'hero.ctaSecondary': 'Scan Food Label',

    // === Footer ===
    'footer.tagline': 'Nutrition science for a longer, more vibrant life.',
    'footer.sources': 'Sources: WHO, NIH, Harvard Health, Mayo Clinic, AHA, Cleveland Clinic.',
    'footer.disclaimer':
      'For educational purposes only — not medical advice. Consult a registered dietitian or physician for medical conditions, pregnancy, or supplement dosing.',
    'footer.privacy': 'Photos processed in your browser. Nothing stored on our servers.',
    'footer.pages': 'Pages',

    // === Common ===
    'common.source': 'Source',
    'common.sources': 'References',
    'common.daily.target': 'Your daily target',
    'common.personalized': 'Personalized for you',
    'common.editProfile': 'Edit profile in the navbar',
    'common.servings': 'servings',
    'common.calories': 'Calories',
    'common.protein': 'Protein',
    'common.fat': 'Total Fat',
    'common.satFat': 'Saturated Fat',
    'common.transFat': 'Trans Fat',
    'common.carbs': 'Total Carbs',
    'common.fiber': 'Fiber',
    'common.sugar': 'Total Sugar',
    'common.addedSugar': 'Added Sugar',
    'common.sodium': 'Sodium',
    'common.cholesterol': 'Cholesterol',
    'common.search': 'Search',
    'common.all': 'All',
    'language.label': 'Language',

    // === Nutrients index page ===
    'nutrients.eyebrow': 'Nutrient Intelligence',
    'nutrients.h1': 'The Six Essential Nutrients',
    'nutrients.subtitle':
      'The human body requires six major classes of nutrients to function optimally. Click any nutrient to explore its function, daily requirements, and the best food sources.',
    'nutrients.foodSources': 'food sources',
    'nutrients.explore': 'Explore',
    'nutrients.whyAll': 'Why All Six Matter',
    'nutrients.whyBody':
      'These six nutrients work synergistically — no single nutrient can maintain health alone. Carbohydrates, proteins, and fats provide energy and structural building blocks. Vitamins and minerals serve as critical cofactors for thousands of enzymatic reactions. Water enables virtually every biochemical process in the body. Deficiency in any one can cascade into broader health problems over time.',

    // === Nutrient detail ===
    'nd.essentialNutrient': 'Essential Nutrient',
    'nd.allNutrients': 'All Nutrients',
    'nd.overview': 'Overview',
    'nd.dailyNeed': 'Daily Need',
    'nd.functions': 'Key Functions',
    'nd.deficiency': 'Deficiency Warning Signs',
    'nd.bestFoodSources': 'Best Food Sources',
    'nd.bestFoodSourcesSub': 'Common foods rich in {name} — with serving sizes, amounts, and key benefits.',
    'nd.tips': 'Practical Tips',
    'nd.exploreOthers': 'Explore Other Nutrients',
    'nd.fatTypes': 'Types of Fat',
    'nd.fatTypesSub': 'Not all fats are equal. Use this breakdown to choose more unsaturated fats, keep saturated fat in check, and avoid trans fats.',
    'nd.fatTypeWhat': 'What it is',
    'nd.fatTypeImpact': 'Health impact',
    'nd.fatTypeIntake': 'Recommended intake',
    'nd.fatTypeFoods': 'Common food sources',
    'nd.practicalAdvice': 'Practical advice:',
    'nd.intakeFraming': 'Eat Most · Eat Some · Limit · Avoid',
    'nd.intakeFramingSub': 'Not all {name} sources are equal. Use this framing to default to whole-food choices.',
    'nd.upperLimits': 'Tolerable Upper Intake Levels',
    'nd.upperLimitsSub': 'Above these thresholds, harm risk outweighs benefit. UL values are total intake (food + supplements).',
    'nd.upperCol1': 'Nutrient',
    'nd.upperCol2': 'Upper limit (adults)',
    'nd.upperCol3': 'Symptoms of excess',
    'nd.personalizedTargets': 'Your personalized targets',
    'nd.rubricToggle.show': 'How are Best/Good/Moderate ratings decided?',
    'nd.rubricToggle.hide': 'Hide rating rubric',
    'nd.filterByDiet': 'Filter by diet:',
    'nd.noFoodsForFilter': 'No foods in this list match the selected filter.',

    // Buckets
    'bucket.eatMost': 'Eat Most',
    'bucket.eatSome': 'Eat Some',
    'bucket.limit': 'Limit',
    'bucket.avoid': 'Avoid',
    'rating.best': 'Best',
    'rating.good': 'Good',
    'rating.moderate': 'Moderate',

    // === Analyzer ===
    'an.eyebrow': 'Label Analyzer',
    'an.h1': 'Scan a nutrition label, get a Health Index in seconds',
    'an.subtitle': 'Upload a photo or fill in the panel manually. Pick your dietary goal and we score the product, surface trade-offs, and suggest a better alternative.',
    'an.upload': 'Upload Photo',
    'an.takePhoto': 'Take Photo',
    'an.uploadHint': 'PNG / JPG up to 10 MB. Image is processed in your browser.',
    'an.processingPhoto': 'Reading label…',
    'an.confirmTitle': 'Please confirm the auto-read values',
    'an.confirmHint': 'OCR is imperfect. Verify any highlighted fields below before scoring.',
    'an.confirmCheckbox': 'I have reviewed the auto-read values and confirm them',
    'an.scoreThis': 'Score this product',
    'an.scoreAnother': 'Analyze another product',
    'an.addToLog': 'Add to today\'s meal log',
    'an.addedToLog': '✓ Added to today\'s log',
    'an.profile': 'Dietary profile',
    'an.servingMultiplier': 'Serving multiplier',
    'an.estimatedBanner': 'Estimated values — back-calculated from calories using Atwater factors. Verify before relying on them.',
    'an.atwaterMismatch': 'Calorie / macro mismatch detected',
    'an.disclaimerOcr': 'OCR accuracy: ~70–95% depending on photo quality. Always verify before scoring.',
    'an.disclaimerMedical': 'Educational tool, not medical advice. Consult a clinician for medical conditions, pregnancy, or supplements.',
    'an.disclaimerPrivacy': 'Privacy: photos are processed in your browser. Nothing is uploaded.',
    'an.tabDetails': 'Details',
    'an.tabAlternatives': 'Better alternatives',
    'an.tabBreakdown': 'Score breakdown',
    'an.howCalculated': 'How is this calculated?',
    'an.tryASample': 'Or try a sample label:',

    // === Compare ===
    'cp.eyebrow': 'Side-by-side comparison',
    'cp.h1': 'Compare two foods',
    'cp.subtitle': 'Pick any two items from the catalog. We\'ll show the nutrient diff, both Health Index scores, and which row wins.',
    'cp.itemA': 'Item A',
    'cp.itemB': 'Item B',
    'cp.diff': 'Nutrient diff (per serving)',
    'cp.diffHint': 'Green = better. Compared against your profile.',
    'cp.lowerBetter': '↓ better',
    'cp.higherBetter': '↑ better',
    'cp.fiberH2': 'Fiber: the most underconsumed nutrient',
    'cp.fiberLead': 'The average American consumes only ~15g/day — about half of the recommended {target}g.',

    // === Meal Log ===
    'log.eyebrow': 'Daily meal-score logger',
    'log.h1Prefix': 'Today\'s plate',
    'log.subtitle': 'Log foods you\'ve eaten and watch your daily Health Index aggregate as the plate fills. Stored locally in your browser.',
    'log.addFood': 'Add food',
    'log.searchPlaceholder': 'Search the catalog (chicken, oatmeal, banana…)',
    'log.todayEntries': 'Today\'s entries',
    'log.empty': 'No entries yet — add a food above to start the day.',
    'log.dailyIndex': 'Daily Health Index',
    'log.indexHelp': 'Log a meal to see today\'s score.',
    'log.vsTarget': 'Vs your daily target',
    'log.scanFirst': 'Want a packaged item? Scan its label first — once analyzed you can add it here.',

    // === Methodology ===
    'mt.eyebrow': 'Scoring Methodology',
    'mt.h1': 'How the Health Index is calculated',
    'mt.subtitle': 'Every score is a transparent sum of weighted credits and penalties grounded in published nutrition guidance — not a black box.',
    'mt.baseline': 'Baseline scores',
    'mt.credits': 'Credits (positive)',
    'mt.penalties': 'Penalties (negative)',
    'mt.col.factor': 'Factor',
    'mt.col.trigger': 'Trigger',
    'mt.col.delta': 'Δ Score',
    'mt.col.source': 'Source',
    'mt.notes': 'Notes & nuance',

    // === Research ===
    'rs.eyebrow': 'The Research Paper',
    'rs.h1': 'Key Findings',
    'rs.subtitle': 'Evidence-based insights compiled from WHO, NIH, Harvard School of Public Health, American Heart Association, and Mayo Clinic research.',
    'rs.calorieTable': 'Daily Calorie Guidelines',
    'rs.calorieTitle': 'Estimated Calorie Needs',
    'rs.references': 'References',

    // === Chat ===
    'nav.chat': 'Nutrition Chat',
    'chat.eyebrow': 'Ask VITAL',
    'chat.h1': 'Nutrition Q&A',
    'chat.subtitle': 'Ask any question about food, nutrients, diets, and healthy eating.',
    'chat.placeholder': 'Ask a nutrition question...',
    'chat.send': 'Send',
    'chat.suggested': 'Suggested questions',
    'chat.typing': 'VITAL is thinking...',
    'chat.disclaimer': 'This is general information only. Consult a healthcare provider for medical advice.',

    // === Auth ===
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signOut': 'Sign Out',
    'auth.guest': 'Guest',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.google': 'Continue with Google',
    'auth.why': 'Why sign in?',
    'auth.whyBody': 'Sign in to sync your profile and meal log across all your devices. Your data is always private.',
    'auth.linkAccount': 'Link Account',
    'auth.linkBody': 'Link your account to keep your data when switching devices.',

    // === Amino Acids ===
    'aa.eyebrow': 'Protein Building Blocks',
    'aa.h1': 'The 20 Amino Acids',
    'aa.subtitle': 'The body requires 20 different amino acids to construct proteins. Nine are essential — meaning your body cannot make them, so they must come from food.',
    'aa.essentialBadge': '9 Essential (must eat)',
    'aa.nonEssentialBadge': '11 Non-essential (body makes)',
    'aa.essentialH2': '9 Essential Amino Acids',
    'aa.nonEssentialH2': '11 Non-Essential Amino Acids',
    'aa.essentialNote': '— must come from dietary sources',
    'aa.nonEssentialNote': '— synthesized by the body',
    'aa.tableTitle': 'Quick Reference Table',
    'aa.bcaaTitle': 'Branched-Chain Amino Acids (BCAAs) — your daily target',
    'aa.bcaaIntro': 'Leucine, isoleucine, and valine make up ~35% of muscle protein. Build a sample day below to see whether typical meals already cover your needs.',
    'aa.completeTitle': 'Complete-protein matchmaker',
    'aa.completeIntro': 'Most plant proteins are missing or low in one essential amino acid. Combine groups across the day (you don\'t need them in the same meal) to cover all nine.',
    'aa.completeNoteTitle': 'Complete vs. Incomplete Proteins',

    // === Special Populations ===
    'sp.eyebrow': 'Population-specific guidance',
    'sp.h1': 'Special populations',
    'sp.subtitle': 'Standard RDAs are designed for healthy adults. These groups have meaningfully different priorities — use this as a starting point, then individualize with your clinician.',
    'sp.watchOuts': 'Watch-outs',
    'sp.disclaimerLabel': 'Disclaimer',
    'sp.disclaimerBody': 'This is educational reference content compiled from public guidelines. It does not replace personalized medical or dietary advice. If you are managing a clinical condition or are pregnant, work with a registered dietitian or your physician.',

    // === Profile sheet ===
    'pf.eyebrow': 'Your profile',
    'pf.h2': 'Personalize daily targets',
    'pf.notice': 'All values are stored only in your browser. We never send your profile to any server. Used to calculate your personalized RDA targets across the encyclopedia and analyzer.',
    'pf.age': 'Age (years)',
    'pf.weight': 'Weight (kg)',
    'pf.height': 'Height (cm)',
    'pf.gender': 'Gender',
    'pf.gender.female': 'Female',
    'pf.gender.male': 'Male',
    'pf.gender.unspecified': 'Prefer not to say',
    'pf.activity': 'Activity level',
    'pf.activity.sedentary': 'Sedentary',
    'pf.activity.moderate': 'Moderate',
    'pf.activity.active': 'Active',
    'pf.lifeStage': 'Life stage',
    'pf.lifeStage.general': 'General',
    'pf.lifeStage.pregnancy': 'Pregnancy',
    'pf.lifeStage.lactation': 'Lactation',
    'pf.lifeStage.senior': 'Senior',
    'pf.save': 'Save profile',
    'pf.reset': 'Reset',

    // === Search ===
    'srch.placeholder': 'Search nutrients, foods, amino acids… (try: vitamin c, fiber, salmon)',
    'srch.try': 'Try a reverse lookup:',
    'srch.foodsHigh': 'foods high in',
    'srch.noMatches': 'No matches for',
  },
  ko: {
    // === Nav ===
    'nav.analyzer': '분석기',
    'nav.nutrients': '영양소',
    'nav.amino': '아미노산',
    'nav.log': '식단 기록',
    'nav.methodology': '평가 방법',
    'nav.research': '연구 자료',
    'nav.compare': '비교',
    'nav.search': '검색',
    'nav.profile.tooltip': '프로필 편집',
    'nav.specialPopulations': '특별 대상',

    // === Hero ===
    'hero.eyebrow': '맞춤형 영양 인텔리전스',
    'hero.title': '음식에 실제로 무엇이 들어있나요?',
    'hero.subtitle':
      '음식에 무엇이 들어있는지, 왜 중요한지, 그리고 대신 무엇을 선택해야 하는지 이해하세요 — WHO, NIH, 하버드 연구를 기반으로 합니다.',
    'hero.ctaPrimary': '탐색 시작',
    'hero.ctaSecondary': '라벨 스캔',

    // === Footer ===
    'footer.tagline': '더 길고 활기찬 삶을 위한 영양 과학.',
    'footer.sources': '출처: WHO, NIH, 하버드 헬스, 메이요 클리닉, AHA, 클리블랜드 클리닉.',
    'footer.disclaimer':
      '교육 목적의 자료이며 의학적 조언이 아닙니다. 임신, 만성질환, 보충제 복용 시에는 등록 영양사 또는 의사의 상담을 받으세요.',
    'footer.privacy': '사진은 브라우저에서만 처리되며 서버에 저장되지 않습니다.',
    'footer.pages': '페이지',

    // === Common ===
    'common.source': '출처',
    'common.sources': '참고 문헌',
    'common.daily.target': '하루 목표량',
    'common.personalized': '맞춤 추천',
    'common.editProfile': '상단 메뉴에서 프로필을 편집할 수 있습니다',
    'common.servings': '인분',
    'common.calories': '열량',
    'common.protein': '단백질',
    'common.fat': '총 지방',
    'common.satFat': '포화지방',
    'common.transFat': '트랜스지방',
    'common.carbs': '총 탄수화물',
    'common.fiber': '식이섬유',
    'common.sugar': '총 당류',
    'common.addedSugar': '첨가당',
    'common.sodium': '나트륨',
    'common.cholesterol': '콜레스테롤',
    'common.search': '검색',
    'common.all': '전체',
    'language.label': '언어',

    // === Nutrients index page ===
    'nutrients.eyebrow': '영양소 가이드',
    'nutrients.h1': '6가지 필수 영양소',
    'nutrients.subtitle':
      '인체가 최적의 기능을 하기 위해 필요한 6대 영양소입니다. 영양소를 클릭하면 기능, 권장 섭취량, 가장 좋은 식품을 확인할 수 있습니다.',
    'nutrients.foodSources': '식품',
    'nutrients.explore': '자세히 보기',
    'nutrients.whyAll': '6가지 모두가 중요한 이유',
    'nutrients.whyBody':
      '이 6가지 영양소는 서로 협력하여 작용합니다. 단독으로 건강을 유지하는 영양소는 없습니다. 탄수화물·단백질·지방은 에너지와 신체를 구성하고, 비타민·미네랄은 수많은 효소 반응의 보조 인자 역할을 하며, 물은 거의 모든 생화학 반응을 가능하게 합니다. 한 가지가 부족해도 다른 문제로 이어질 수 있습니다.',

    // === Nutrient detail ===
    'nd.essentialNutrient': '필수 영양소',
    'nd.allNutrients': '전체 영양소',
    'nd.overview': '개요',
    'nd.dailyNeed': '하루 필요량',
    'nd.functions': '주요 기능',
    'nd.deficiency': '결핍 시 신호',
    'nd.bestFoodSources': '가장 좋은 식품 공급원',
    'nd.bestFoodSourcesSub': '{name}이(가) 풍부한 일반 식품 — 1회 제공량과 핵심 효능을 함께 표시합니다.',
    'nd.tips': '실천 팁',
    'nd.exploreOthers': '다른 영양소 둘러보기',
    'nd.fatTypes': '지방의 종류',
    'nd.fatTypesSub': '모든 지방이 동등하지는 않습니다. 불포화지방은 충분히, 포화지방은 제한적으로, 트랜스지방은 피하세요.',
    'nd.fatTypeWhat': '정의',
    'nd.fatTypeImpact': '건강 영향',
    'nd.fatTypeIntake': '권장 섭취',
    'nd.fatTypeFoods': '대표 식품',
    'nd.practicalAdvice': '실천 조언:',
    'nd.intakeFraming': '많이 · 적당히 · 제한 · 회피',
    'nd.intakeFramingSub': '같은 {name}이라도 모든 공급원이 동등하지는 않습니다. 가공도가 낮은 식품을 우선 선택하세요.',
    'nd.upperLimits': '내 안전 상한 (UL)',
    'nd.upperLimitsSub': '이 임계값을 넘으면 이익보다 위험이 커집니다. UL은 식품과 보충제 합산 기준입니다.',
    'nd.upperCol1': '영양소',
    'nd.upperCol2': '성인 상한 섭취량',
    'nd.upperCol3': '과잉 시 증상',
    'nd.personalizedTargets': '나에게 맞춘 목표량',
    'nd.rubricToggle.show': 'Best/Good/Moderate 평가 기준 보기',
    'nd.rubricToggle.hide': '평가 기준 닫기',
    'nd.filterByDiet': '식단별 필터:',
    'nd.noFoodsForFilter': '선택한 필터에 해당하는 식품이 없습니다.',

    // Buckets
    'bucket.eatMost': '많이 먹기',
    'bucket.eatSome': '적당히 먹기',
    'bucket.limit': '제한하기',
    'bucket.avoid': '피하기',
    'rating.best': '최우수',
    'rating.good': '우수',
    'rating.moderate': '보통',

    // === Analyzer ===
    'an.eyebrow': '라벨 분석기',
    'an.h1': '영양 라벨을 스캔하면 몇 초 만에 건강 점수가 나옵니다',
    'an.subtitle': '사진을 업로드하거나 직접 입력하세요. 식단 목표를 선택하면 점수, 트레이드오프, 더 나은 대안을 함께 보여드립니다.',
    'an.upload': '사진 업로드',
    'an.takePhoto': '사진 촬영',
    'an.uploadHint': 'PNG / JPG, 최대 10 MB. 이미지는 브라우저에서만 처리됩니다.',
    'an.processingPhoto': '라벨을 읽는 중…',
    'an.confirmTitle': '자동 인식된 값을 확인해 주세요',
    'an.confirmHint': 'OCR이 완벽하지 않습니다. 강조된 항목은 점수 매기기 전에 확인하세요.',
    'an.confirmCheckbox': '자동 인식된 값을 검토했고 정확함을 확인합니다',
    'an.scoreThis': '이 제품 점수 보기',
    'an.scoreAnother': '다른 제품 분석',
    'an.addToLog': '오늘 식단에 추가',
    'an.addedToLog': '✓ 오늘 기록에 추가됨',
    'an.profile': '식단 프로필',
    'an.servingMultiplier': '제공량 배수',
    'an.estimatedBanner': '추정 값 — 칼로리에서 Atwater 계수로 역산했습니다. 의존하기 전에 확인하세요.',
    'an.atwaterMismatch': '칼로리와 영양소가 일치하지 않습니다',
    'an.disclaimerOcr': 'OCR 정확도: 사진 품질에 따라 약 70–95%. 점수 매기기 전 항상 확인하세요.',
    'an.disclaimerMedical': '교육용 도구이며 의학적 조언이 아닙니다. 만성 질환, 임신, 보충제는 전문가와 상담하세요.',
    'an.disclaimerPrivacy': '개인정보: 사진은 브라우저에서만 처리되며 업로드되지 않습니다.',
    'an.tabDetails': '상세',
    'an.tabAlternatives': '더 나은 대안',
    'an.tabBreakdown': '점수 분석',
    'an.howCalculated': '점수 산정 방식 보기',
    'an.tryASample': '샘플 라벨 사용해 보기:',

    // === Compare ===
    'cp.eyebrow': '나란히 비교',
    'cp.h1': '식품 두 개를 비교하기',
    'cp.subtitle': '카탈로그에서 두 항목을 선택하면 영양소 차이, 건강 점수, 어느 항목이 우세한지 한눈에 보여드립니다.',
    'cp.itemA': '항목 A',
    'cp.itemB': '항목 B',
    'cp.diff': '영양소 차이 (1회 제공량 기준)',
    'cp.diffHint': '초록 = 더 좋음. 사용자 프로필 기준으로 비교됩니다.',
    'cp.lowerBetter': '↓ 적을수록 좋음',
    'cp.higherBetter': '↑ 많을수록 좋음',
    'cp.fiberH2': '식이섬유: 가장 부족한 영양소',
    'cp.fiberLead': '평균 미국인은 하루 약 15g만 섭취 — 권장량 {target}g의 절반 수준입니다.',

    // === Meal Log ===
    'log.eyebrow': '하루 식단 기록',
    'log.h1Prefix': '오늘의 식단',
    'log.subtitle': '먹은 음식을 기록하면 하루 종합 건강 점수를 실시간으로 보여드립니다. 데이터는 브라우저에만 저장됩니다.',
    'log.addFood': '음식 추가',
    'log.searchPlaceholder': '카탈로그 검색 (닭, 귀리, 바나나…)',
    'log.todayEntries': '오늘 기록',
    'log.empty': '아직 기록이 없습니다 — 위에서 음식을 추가해 시작해 보세요.',
    'log.dailyIndex': '하루 건강 점수',
    'log.indexHelp': '식사를 기록하면 오늘의 점수를 확인할 수 있습니다.',
    'log.vsTarget': '목표량 대비',
    'log.scanFirst': '포장 식품인가요? 먼저 라벨을 스캔하세요. 분석 후 여기에 추가할 수 있습니다.',

    // === Methodology ===
    'mt.eyebrow': '평가 방법론',
    'mt.h1': '건강 점수는 어떻게 계산되나요',
    'mt.subtitle': '모든 점수는 공개된 영양 가이드라인을 기반으로 가중 부여한 가점·감점의 합입니다. 블랙박스가 아닙니다.',
    'mt.baseline': '기본 점수',
    'mt.credits': '가점 (긍정 요소)',
    'mt.penalties': '감점 (부정 요소)',
    'mt.col.factor': '항목',
    'mt.col.trigger': '발동 조건',
    'mt.col.delta': '점수 변화',
    'mt.col.source': '출처',
    'mt.notes': '세부 보충 설명',

    // === Research ===
    'rs.eyebrow': '연구 자료',
    'rs.h1': '핵심 연구 결과',
    'rs.subtitle': 'WHO, NIH, 하버드 보건대학, 미국심장학회(AHA), 메이요 클리닉의 근거 기반 자료를 정리했습니다.',
    'rs.calorieTable': '하루 권장 칼로리',
    'rs.calorieTitle': '추정 칼로리 필요량',
    'rs.references': '참고 문헌',

    // === Chat ===
    'nav.chat': '영양 상담',
    'chat.eyebrow': 'VITAL에게 물어보세요',
    'chat.h1': '영양 Q&A',
    'chat.subtitle': '음식, 영양소, 식단, 건강한 식습관에 대해 무엇이든 물어보세요.',
    'chat.placeholder': '영양 관련 질문을 입력하세요...',
    'chat.send': '볂기',
    'chat.suggested': '추천 질문',
    'chat.typing': 'VITAL이 답변을 준비 중입니다...',
    'chat.disclaimer': '일반적인 정보 제공 목적입니다. 의학적 조언이 필요하시면 전문가와 상담하세요.',

    // === Auth ===
    'auth.signIn': '로그인',
    'auth.signUp': '회원가입',
    'auth.signOut': '로그아웃',
    'auth.guest': '게스트',
    'auth.email': '이메일',
    'auth.password': '비밀번호',
    'auth.google': 'Google로 계속하기',
    'auth.why': '왜 로그인하나요?',
    'auth.whyBody': '로그인하면 모든 기기에서 프로필과 식단 기록을 동기화할 수 있습니다. 데이터는 항상 비공개입니다.',
    'auth.linkAccount': '계정 연결',
    'auth.linkBody': '계정을 연결하면 기기를 바꿔도 데이터를 유지할 수 있습니다.',

    // === Amino Acids ===
    'aa.eyebrow': '단백질 구성 단위',
    'aa.h1': '20가지 아미노산',
    'aa.subtitle': '단백질은 20가지 아미노산으로 만들어집니다. 그중 9가지는 필수 — 체내 합성이 불가능해 반드시 음식으로 섭취해야 합니다.',
    'aa.essentialBadge': '필수 9종 (반드시 섭취)',
    'aa.nonEssentialBadge': '비필수 11종 (체내 합성)',
    'aa.essentialH2': '필수 아미노산 9종',
    'aa.nonEssentialH2': '비필수 아미노산 11종',
    'aa.essentialNote': '— 식품으로 섭취해야 함',
    'aa.nonEssentialNote': '— 체내에서 합성됨',
    'aa.tableTitle': '한눈에 보는 표',
    'aa.bcaaTitle': '분지사슬 아미노산 (BCAA) — 하루 목표량',
    'aa.bcaaIntro': '류신·이소류신·발린은 근육 단백질의 약 35%를 차지합니다. 아래에서 하루 식단을 구성해 자연식만으로 충분한지 확인해 보세요.',
    'aa.completeTitle': '완전 단백질 매치메이커',
    'aa.completeIntro': '대부분의 식물성 단백질은 하나 이상의 필수 아미노산이 부족합니다. 같은 끼니가 아니어도 하루 안에 조합하면 9종 모두를 채울 수 있습니다.',
    'aa.completeNoteTitle': '완전 단백질 vs 불완전 단백질',

    // === Special Populations ===
    'sp.eyebrow': '대상별 가이드',
    'sp.h1': '특별 대상 가이드',
    'sp.subtitle': '일반 RDA는 건강한 성인 기준입니다. 아래 그룹은 우선순위가 다르므로 출발점으로 활용하고, 의료진과 함께 개인화하세요.',
    'sp.watchOuts': '주의사항',
    'sp.disclaimerLabel': '면책 고지',
    'sp.disclaimerBody': '이 페이지는 공개 가이드라인을 정리한 교육 자료입니다. 개인화된 의학·영양 조언을 대체하지 않습니다. 임신 중이거나 질환을 관리하고 있다면 등록 영양사 또는 의사와 상의하세요.',

    // === Profile sheet ===
    'pf.eyebrow': '내 프로필',
    'pf.h2': '하루 목표량 맞춤 설정',
    'pf.notice': '모든 값은 브라우저에만 저장되며 서버로 전송되지 않습니다. 백과사전과 분석기 전반의 RDA 목표 계산에 사용됩니다.',
    'pf.age': '나이 (만)',
    'pf.weight': '체중 (kg)',
    'pf.height': '키 (cm)',
    'pf.gender': '성별',
    'pf.gender.female': '여성',
    'pf.gender.male': '남성',
    'pf.gender.unspecified': '선택 안 함',
    'pf.activity': '활동 수준',
    'pf.activity.sedentary': '거의 활동 없음',
    'pf.activity.moderate': '보통',
    'pf.activity.active': '활발함',
    'pf.lifeStage': '생애 단계',
    'pf.lifeStage.general': '일반',
    'pf.lifeStage.pregnancy': '임신',
    'pf.lifeStage.lactation': '수유',
    'pf.lifeStage.senior': '노년',
    'pf.save': '프로필 저장',
    'pf.reset': '초기화',

    // === Search ===
    'srch.placeholder': '영양소·식품·아미노산 검색 (예: vitamin c, 식이섬유, 연어)',
    'srch.try': '거꾸로 찾기 예시:',
    'srch.foodsHigh': '이(가) 풍부한 식품',
    'srch.noMatches': '검색 결과 없음:',
  },
} as const;

type DictKey = keyof typeof dict.en;

function readLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === 'ko' ? 'ko' : 'en';
}

function writeLocale(loc: Locale) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCALE_STORAGE_KEY, loc);
  document.documentElement.lang = loc;
  window.dispatchEvent(new CustomEvent('vital:locale-updated'));
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocale] = useState<Locale>(() => readLocale());

  useEffect(() => {
    const onChange = () => setLocale(readLocale());
    window.addEventListener('vital:locale-updated', onChange);
    window.addEventListener('storage', onChange);
    document.documentElement.lang = readLocale();
    return () => {
      window.removeEventListener('vital:locale-updated', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return [locale, (l) => { writeLocale(l); setLocale(l); }];
}

/**
 * Translate a dict key. Optional `vars` object substitutes `{name}` style tokens.
 */
export type Translator = (key: DictKey, vars?: Record<string, string | number>) => string;

export function useT(): Translator {
  const [locale] = useLocale();
  return (key, vars) => {
    let s: string = dict[locale][key] ?? dict.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
    return s;
  };
}

/**
 * Pick a value out of an `{en, ko}` shape. Falls back to English when a Korean
 * translation hasn't been added yet for a particular field.
 */
export function pickLocalized<T>(value: { en: T; ko?: T } | T | undefined, locale: Locale): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'object' && value !== null && 'en' in (value as object)) {
    const v = value as { en: T; ko?: T };
    return locale === 'ko' && v.ko !== undefined ? v.ko : v.en;
  }
  return value as T;
}
