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
    'nav.blog': 'Blog',
    'nav.methodology': 'Methodology',
    'nav.research': 'Research',
    'nav.compare': 'Compare',
    'nav.saved': 'Saved',
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

    // === Blog ===
    'blog.eyebrow': 'Articles',
    'blog.h1': 'Blog',
    'blog.subtitle':
      'Longer reads on carbohydrates, fiber, sugar, protein, vitamins, minerals, fats, dopamine, and everyday nutrition — useful first, buzzwords never.',
    'blog.seriesLabel': 'Series',
    'blog.indexLabel': 'Index',
    'blog.pickArticle': 'Choose a series on the left, then pick an article to read here.',
    'blog.pickArticleHint': 'Series are collapsed by default. Click a series title to expand its article list.',
    'blog.back': 'All articles',
    'blog.continue': 'Continue reading',
  },
  ko: {
    // === Nav ===
    'nav.analyzer': '라벨 분석기',
    'nav.nutrients': '영양소 백과',
    'nav.amino': '아미노산',
    'nav.log': '식단 기록',
    'nav.blog': '블로그',
    'nav.methodology': '평가 방법',
    'nav.research': '연구 자료',
    'nav.compare': '나란히 비교',
    'nav.saved': '저장된 분석',
    'nav.search': '검색',
    'nav.profile.tooltip': '프로필 편집',
    'nav.specialPopulations': '대상별 가이드',

    // === Hero ===
    'hero.eyebrow': '과학 기반 맞춤형 영양 분석',
    'hero.title': '우리가 먹는 음식의 진짜 성분은 무엇일까요?',
    'hero.subtitle':
      '음식에 들어있는 성분의 정보와 건강에 왜 중요한지, 그리고 더 나은 대체 식품은 무엇인지 이해해 보세요. (세계보건기구 WHO, 미국국립보건원 NIH, 하버드 연구 기반)',
    'hero.ctaPrimary': '탐색 시작하기',
    'hero.ctaSecondary': '라벨 스캔하기',

    // === Footer ===
    'footer.tagline': '더 건강하고 활기찬 삶을 위한 영양 과학.',
    'footer.sources': '출처: 세계보건기구(WHO), 미국국립보건원(NIH), 하버드 보건대학원, 메이요 클리닉, 미국심장협회(AHA), 클리블랜드 클리닉.',
    'footer.disclaimer':
      '본 자료는 교육 목적으로 제공되며 의학적 진단이나 조언이 아닙니다. 임신, 만성질환 관리, 보충제 복용 시에는 의사 또는 전문 영양사와 상담하세요.',
    'footer.privacy': '업로드된 사진은 서버에 저장되지 않으며 브라우저 내에서만 안전하게 처리됩니다.',
    'footer.pages': '페이지',

    // === Common ===
    'common.source': '출처',
    'common.sources': '참고 문헌',
    'common.daily.target': '일일 목표량',
    'common.personalized': '개인 맞춤형 추천',
    'common.editProfile': '우측 상단 프로필에서 나의 권장 목표량을 설정할 수 있습니다',
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
    'nutrients.eyebrow': '필수 영양소 백과',
    'nutrients.h1': '신체에 필요한 6대 필수 영양소',
    'nutrients.subtitle':
      '신체가 최상의 상태를 유지하기 위해 반드시 필요한 6대 필수 영양소입니다. 각 영양소를 선택하여 주요 효능, 권장 섭취량, 그리고 풍부한 추천 식품을 확인해 보세요.',
    'nutrients.foodSources': '대표 식품',
    'nutrients.explore': '자세히 보기',
    'nutrients.whyAll': '6대 영양소가 모두 필수적인 이유',
    'nutrients.whyBody':
      '이 6가지 영양소는 우리 몸 안에서 유기적으로 협력합니다. 어느 하나만으로는 건강을 온전히 유지할 수 없습니다. 탄수화물, 단백질, 지방은 에너지를 공급하고 신체 조직을 구성하며, 비타민과 미네랄은 신체 내 수많은 화학 반응을 조절하는 윤활유 역할을 합니다. 그리고 물은 이 모든 생화학적 반응이 일어날 수 있는 생명의 기초가 됩니다. 따라서 단 한 가지 영양소만 부족해도 신체의 전반적인 균형이 무너질 수 있습니다.',

    // === Nutrient detail ===
    'nd.essentialNutrient': '필수 영양소',
    'nd.allNutrients': '전체 영양소',
    'nd.overview': '개요',
    'nd.dailyNeed': '일일 권장량',
    'nd.functions': '주요 기능',
    'nd.deficiency': '결핍 시 나타나는 증상',
    'nd.bestFoodSources': '추천 식품 및 공급원',
    'nd.bestFoodSourcesSub': '{name} 함량이 높은 대표적인 식품들입니다. 1회 제공량 기준 함량과 건강에 미치는 핵심 효능을 함께 확인해 보세요.',
    'nd.tips': '생활 속 실천 팁',
    'nd.exploreOthers': '다른 필수 영양소 알아보기',
    'nd.fatTypes': '지방의 종류',
    'nd.fatTypesSub': '모든 지방이 몸에 해로운 것은 아닙니다. 건강한 불포화지방은 충분히 섭취하고, 포화지방은 줄이며, 인공 트랜스지방은 최대한 피하는 것이 좋습니다.',
    'nd.fatTypeWhat': '정의',
    'nd.fatTypeImpact': '인체에 미치는 영향',
    'nd.fatTypeIntake': '권장 섭취 기준',
    'nd.fatTypeFoods': '대표 식품',
    'nd.practicalAdvice': '추천 식습관:',
    'nd.intakeFraming': '충분히 섭취 · 적당량 섭취 · 섭취 제한 · 섭취 피하기',
    'nd.intakeFramingSub': '같은 {name}군에 속하더라도 식품 종류에 따라 건강에 미치는 영향은 다릅니다. 가능하면 가공되지 않은 자연 식품 위주로 선택하세요.',
    'nd.upperLimits': '일일 최대 안전 섭취량 (UL)',
    'nd.upperLimitsSub': '이 기준치를 초과하여 섭취하면 부작용이나 건강상의 위험이 발생할 수 있습니다. 상한 섭취량은 일반 식품과 영양 보충제를 모두 합산한 기준입니다.',
    'nd.upperCol1': '영양소',
    'nd.upperCol2': '성인 하루 상한 섭취량',
    'nd.upperCol3': '과다 섭취 시 부작용',
    'nd.personalizedTargets': '나의 맞춤형 하루 권장량',
    'nd.rubricToggle.show': '식품 평가 기준 확인하기 (우수/양호/보통)',
    'nd.rubricToggle.hide': '평가 기준 닫기',
    'nd.filterByDiet': '식단 필터:',
    'nd.noFoodsForFilter': '선택한 필터에 해당하는 식품이 없습니다.',

    // Buckets
    'bucket.eatMost': '충분히 섭취',
    'bucket.eatSome': '적당량 섭취',
    'bucket.limit': '섭취 제한',
    'bucket.avoid': '섭취 피하기',
    'rating.best': '매우 우수',
    'rating.good': '우수',
    'rating.moderate': '보통',

    // === Analyzer ===
    'an.eyebrow': '영양 라벨 분석기',
    'an.h1': '영양 성분표 스캔 한 번으로 확인하는 내 식품 건강 점수',
    'an.subtitle': '식품의 영양성분표 사진을 업로드하거나 수치를 입력해 보세요. 나의 건강 목표에 맞춘 분석 점수와 함께 주의할 성분, 그리고 더 건강한 대체 식품까지 제안해 드립니다.',
    'an.upload': '사진 업로드',
    'an.takePhoto': '사진 촬영',
    'an.uploadHint': 'PNG / JPG, 최대 10 MB. 이미지는 브라우저에서만 처리됩니다.',
    'an.processingPhoto': '라벨을 분석하는 중입니다...',
    'an.confirmTitle': '인식된 영양 성분값을 확인해 주세요',
    'an.confirmHint': '텍스트 자동 인식(OCR) 결과에 일부 오류가 있을 수 있습니다. 강조 표시된 항목이 실제 성분표와 일치하는지 확인 후 분석해 주세요.',
    'an.confirmCheckbox': '위 영양성분 정보가 실제 제품의 성분표와 일치함을 확인합니다.',
    'an.scoreThis': '이 제품의 건강 점수 분석하기',
    'an.scoreAnother': '다른 제품 분석하기',
    'an.addToLog': '오늘 식단 기록에 추가',
    'an.addedToLog': '✓ 오늘 식단에 추가되었습니다',
    'an.profile': '나의 식단 프로필',
    'an.servingMultiplier': '섭취 분량 (배수)',
    'an.estimatedBanner': '[추정치 안내] 일부 성분은 칼로리와 다른 영양소 비율(Atwater 계수)을 바탕으로 역산한 추정값입니다. 실제 정보와 다를 수 있으니 참고용으로만 활용해 주세요.',
    'an.atwaterMismatch': '표기된 칼로리와 영양소 총합이 일치하지 않습니다.',
    'an.disclaimerOcr': '사진 화질과 각도에 따라 자동 인식률(70%~95%)에 차이가 있을 수 있으므로 분석 전 성분값을 꼭 검토해 주세요.',
    'an.disclaimerMedical': '본 서비스는 정보 제공을 목적으로 하는 교육용 도구이며 전문적인 의학적 진단이나 조언을 대체할 수 없습니다. 질환 관리, 임신, 영양 보충제 복용 시에는 의사 또는 전문 영양사와 상담하시기 바랍니다.',
    'an.disclaimerPrivacy': '개인정보 보호: 업로드하신 이미지는 전송되거나 저장되지 않으며 브라우저 내에서만 안전하게 처리됩니다.',
    'an.tabDetails': '영양 성분 상세',
    'an.tabAlternatives': '추천 대체 식품',
    'an.tabBreakdown': '세부 감점·가점 분석',
    'an.howCalculated': '건강 점수가 어떻게 계산되는지 확인하기',
    'an.tryASample': '샘플 영양성분표로 테스트해 보기:',

    // === Compare ===
    'cp.eyebrow': '식품 비교',
    'cp.h1': '두 식품의 영양 성분 비교하기',
    'cp.subtitle': '선택한 두 식품의 영양소 함량과 건강 점수를 나란히 비교하여, 어떤 식품이 내 식단 목표에 더 알맞은지 한눈에 보여 드립니다.',
    'cp.itemA': '식품 A',
    'cp.itemB': '식품 B',
    'cp.diff': '영양성분 차이 (1회 제공량 기준)',
    'cp.diffHint': '녹색 표시 = 내 맞춤 프로필 기준 더 건강한 영양 수준을 뜻합니다.',
    'cp.lowerBetter': '↓ 적을수록 좋음',
    'cp.higherBetter': '↑ 많을수록 좋음',
    'cp.fiberH2': '식이섬유: 가장 부족한 영양소',
    'cp.fiberLead': '대부분의 현대인은 하루 평균 권장 섭취량인 {target}g의 절반 수준인 약 15g의 식이섬유만을 섭취하고 있습니다.',

    // === Meal Log ===
    'log.eyebrow': '식단 기록',
    'log.h1Prefix': '오늘의 식단 기록',
    'log.subtitle': '오늘 섭취한 음식을 기록해 보세요. 하루 영양 밸런스와 식단 건강 점수를 실시간으로 계산해 드립니다. (모든 데이터는 브라우저에만 안전하게 저장됩니다)',
    'log.addFood': '음식 추가',
    'log.searchPlaceholder': '카탈로그 검색 (닭고기, 귀리, 바나나…)',
    'log.todayEntries': '오늘 섭취 목록',
    'log.empty': '아직 기록된 식단이 없습니다. 상단 검색창에서 음식을 찾아 추가해 보세요!',
    'log.dailyIndex': '식단 균형 점수',
    'log.indexHelp': '음식을 추가하면 오늘 하루 식단의 균형과 영양 점수가 여기에 표시됩니다.',
    'log.vsTarget': '일일 권장 목표 대비',
    'log.scanFirst': '바코드나 가공식품의 성분표가 있다면, 먼저 [라벨 분석기]에서 사진을 스캔해 보세요. 분석을 마친 후 클릭 한 번으로 이곳 식단에 바로 추가할 수 있습니다.',

    // === Methodology ===
    'mt.eyebrow': '평가 방법론',
    'mt.h1': '식품 건강 점수 산정 기준',
    'mt.subtitle': 'VITAL의 건강 점수는 공신력 있는 기관의 영양 가이드라인을 기반으로 엄격하게 설계되었습니다. 가점과 감점 요인을 투명하게 공개합니다.',
    'mt.baseline': '기본 점수',
    'mt.credits': '가점 (긍정 요소)',
    'mt.penalties': '감점 (부정 요소)',
    'mt.col.factor': '평가 요소',
    'mt.col.trigger': '기준 조건',
    'mt.col.delta': '점수 변동',
    'mt.col.source': '가이드라인 출처',
    'mt.notes': '세부 평가 기준 안내',

    // === Research ===
    'rs.eyebrow': '연구 자료 및 가이드라인',
    'rs.h1': '과학 기반 영양 가이드라인',
    'rs.subtitle': '세계보건기구(WHO), 미국국립보건원(NIH), 하버드 보건대학원, 미국심장학회(AHA) 등 공신력 있는 의학·과학적 연구 결과를 바탕으로 한 기초 자료입니다.',
    'rs.calorieTable': '성별·연령별 일일 필요 에너지',
    'rs.calorieTitle': '하루 권장 칼로리 추정치',
    'rs.references': '참고 문헌',

    // === Chat ===
    'nav.chat': '실시간 영양 Q&A',
    'chat.eyebrow': 'AI 영양 상담원 VITAL',
    'chat.h1': '무엇이든 물어보세요',
    'chat.subtitle': '영양 성분, 올바른 식습관, 나에게 맞는 음식 궁합 등 평소 궁금했던 영양에 관한 모든 것을 물어보세요.',
    'chat.placeholder': '영양과 식습관에 대해 질문을 입력해 주세요...',
    'chat.send': '보내기',
    'chat.suggested': '추천 질문',
    'chat.typing': 'VITAL이 답변을 준비하는 중입니다...',
    'chat.disclaimer': '※ 본 답변은 일반적인 영양 정보 제공을 목적으로 하며, 의사의 진료나 전문적인 의학적 조언을 대신할 수 없습니다.',

    // === Auth ===
    'auth.signIn': '로그인',
    'auth.signUp': '회원가입',
    'auth.signOut': '로그아웃',
    'auth.guest': '게스트',
    'auth.email': '이메일',
    'auth.password': '비밀번호',
    'auth.google': 'Google 계정으로 계속하기',
    'auth.why': '계정이 왜 필요한가요?',
    'auth.whyBody': '회원가입/로그인 시 다양한 기기에서 식단 프로필과 기록 데이터를 안전하게 연동할 수 있습니다. 모든 개인 정보는 엄격히 보호됩니다.',
    'auth.linkAccount': '계정 연동하기',
    'auth.linkBody': '소셜 계정을 연동하면 기기를 변경하거나 브라우저 캐시가 삭제되어도 이전 기록을 안전하게 이어갈 수 있습니다.',

    // === Amino Acids ===
    'aa.eyebrow': '단백질 구성 단위',
    'aa.h1': '20가지 필수 및 비필수 아미노산',
    'aa.subtitle': '우리 몸의 근육 and 세포를 구성하는 단백질은 20종의 아미노산으로 이루어집니다. 이 중 9종의 필수 아미노산은 체내에서 스스로 합성되지 않으므로, 반드시 매일 음식을 통해 섭취해야 합니다.',
    'aa.essentialBadge': '필수 아미노산 9종 (식품 섭취 필수)',
    'aa.nonEssentialBadge': '비필수 아미노산 11종 (체내 자체 합성)',
    'aa.essentialH2': '필수 아미노산 9종',
    'aa.nonEssentialH2': '비필수 아미노산 11종',
    'aa.essentialNote': '— 반드시 식품을 통해 섭취해야 함',
    'aa.nonEssentialNote': '— 체내에서 자체 합성 가능함',
    'aa.tableTitle': '아미노산 요약 데이터',
    'aa.bcaaTitle': '분지사슬 아미노산 (BCAA) — 나의 일일 목표량',
    'aa.bcaaIntro': '분지사슬 아미노산(BCAA)으로 불리는 류신, 이소류신, 발린은 근육 단백질의 약 35%를 형성하는 핵심 필수 아미노산입니다. 오늘 내가 먹은 식단을 기록하고, 보충제 없이 식품만으로 충분한 양을 섭취하고 있는지 진단해 보세요.',
    'aa.completeTitle': '식물성 완전 단백질 조합 도우미',
    'aa.completeIntro': '대부분의 식물성 식품은 특정 필수 아미노산의 함량이 부족한 불완전 단백질입니다. 하지만 매 끼니 완벽하게 채우지 않더라도, 하루 동안 다양한 식재료를 조화롭게 섭취하면 필수 아미노산 9종을 충분히 보완할 수 있습니다.',
    'aa.completeNoteTitle': '완전 단백질 vs 불완전 단백질',

    // === Special Populations ===
    'sp.eyebrow': '대상별 가이드',
    'sp.h1': '생애 주기 및 대상별 영양 가이드',
    'sp.subtitle': '일반적인 권장 섭취량(RDA)은 건강한 성인을 기준으로 합니다. 생애 주기나 특정 상황(임신, 수유, 고령 등)에 처한 분들은 영양 요구량이 크게 다르므로, 본 가이드를 참고하여 전문 의료진과 함께 나만의 식단을 계획해 보세요.',
    'sp.watchOuts': '식습관 주의사항',
    'sp.disclaimerLabel': '의학적 면책 고지',
    'sp.disclaimerBody': '이 페이지는 공개 가이드라인을 정리한 교육 자료입니다. 개인화된 의학·영양 조언을 대체하지 않습니다. 임신 중이거나 질환을 관리하고 있다면 등록 영양사 또는 의사와 상의하세요.',

    // === Profile sheet ===
    'pf.eyebrow': '나의 프로필 설정',
    'pf.h2': '하루 영양 목표량 설정',
    'pf.notice': '입력하신 모든 정보는 서버로 전송되지 않고 브라우저에만 안전하게 저장됩니다. 이 프로필을 바탕으로 영양소 백과사전과 라벨 분석기에서 회원님께 최적화된 맞춤형 일일 영양 목표(RDA)를 자동 계산합니다.',
    'pf.age': '나이 (만)',
    'pf.weight': '체중 (kg)',
    'pf.height': '키 (cm)',
    'pf.gender': '성별',
    'pf.gender.female': '여성',
    'pf.gender.male': '남성',
    'pf.gender.unspecified': '선택 안 함',
    'pf.activity': '평소 활동 수준',
    'pf.activity.sedentary': '활동량 적음 (좌식 생활)',
    'pf.activity.moderate': '보통 활동량 (가벼운 운동)',
    'pf.activity.active': '활동량 많음 (강도 높은 운동)',
    'pf.lifeStage': '생애 단계',
    'pf.lifeStage.general': '일반 성인',
    'pf.lifeStage.pregnancy': '임신 중',
    'pf.lifeStage.lactation': '수유 중',
    'pf.lifeStage.senior': '시니어 (65세 이상)',
    'pf.save': '프로필 정보 저장',
    'pf.reset': '설정 초기화',

    // === Search ===
    'srch.placeholder': '영양소, 식품, 아미노산 검색 (예: 비타민 C, 식이섬유, 연어)',
    'srch.try': '이런 검색은 어떠세요?',
    'srch.foodsHigh': '이(가) 풍부한 식품',
    'srch.noMatches': '검색 결과 없음:',

    // === Blog ===
    'blog.eyebrow': '영양학 아티클',
    'blog.h1': 'VITAL 블로그',
    'blog.subtitle':
      '탄수화물·식이섬유·당·단백질·비타민·미네랄·지방·도파민·일상 영양을 길게 풀어 쓴 글입니다. 유행어 채우기보다 읽고 바로 쓸 수 있게 썼어요.',
    'blog.seriesLabel': '연재 시리즈',
    'blog.indexLabel': '목차 목록',
    'blog.pickArticle': '왼쪽에서 시리즈를 펼친 뒤, 읽을 글을 고르면 여기에 본문이 나와요.',
    'blog.pickArticleHint': '시리즈는 기본으로 접혀 있어요. 시리즈 제목을 누르면 글 목록이 펼쳐져요.',
    'blog.back': '글 목록으로 돌아가기',
    'blog.continue': '이어서 읽기',
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
