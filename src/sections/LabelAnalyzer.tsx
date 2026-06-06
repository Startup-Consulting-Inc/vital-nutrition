import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { extractNutritionFromImage, type ExtractedNutrients, type ExtractedNutrientField } from '@/lib/ocrParser';
import { analyzeLabelViaAPI, mergeAIWithOCR, type AIAnalysisResult } from '@/lib/openrouter';
import { getSmartRecommendations, type SmartRecommendationsResult } from '@/lib/apiClient';
import {
  analyzeNutritionLabel,
  type NutritionFacts,
  type HealthAnalysis,
  type DietaryProfile,
  getSampleProducts,
  requiresProteinConfirmation,
  inferFoodCategory,
} from '@/lib/nutritionAnalyzer';
import HealthScoreGauge from '@/components/HealthScoreGauge';
import { addEntry as addEntryToLog } from '@/lib/mealLog';
import { saveAnalysis } from '@/lib/savedList';
import { useT, useLocale } from '@/lib/i18n';
import { usePersistentProfile } from '@/hooks/usePersistentProfile';
import { useHealthGoals, type HealthGoal } from '@/hooks/useHealthGoals';
import HealthGoalsModal from '@/components/HealthGoalsModal';

const emptyForm: NutritionFacts = {
  productName: '',
  foodCategory: 'other',
  servingSize: '',
  servingsPerContainer: 1,
  calories: 0,
  totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 0,
  totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
  vitaminD: 0, calcium: 0, iron: 0, potassium: 0,
  vitaminDPercent: 0, calciumPercent: 0, ironPercent: 0, potassiumPercent: 0,
};

const categoryOptions: { value: NutritionFacts['foodCategory']; label: string }[] = [
  { value: 'other', label: 'Other / Uncertain' },
  { value: 'wholeFood', label: 'Whole / Single-Ingredient Food' },
  { value: 'protein', label: 'Protein / Meat / Seafood' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'grain', label: 'Grain / Bread / Cereal' },
  { value: 'snack', label: 'Snack' },
  { value: 'beverage', label: 'Beverage' },
  { value: 'frozen', label: 'Frozen Meal' },
  { value: 'processed', label: 'Processed Food' },
];

const profileOptions: { value: DietaryProfile; label: string; hint: string }[] = [
  { value: 'general', label: 'General', hint: 'Balanced 2,000-cal diet' },
  { value: 'heart', label: 'Heart Health', hint: 'Low sat-fat & sodium' },
  { value: 'highProtein', label: 'High Protein', hint: 'Athletes, recovery' },
  { value: 'keto', label: 'Keto', hint: 'Low net carbs' },
  { value: 'lowSodium', label: 'Low Sodium', hint: 'Hypertension' },
  { value: 'diabetic', label: 'Diabetic', hint: 'Net carb & sugar focus' },
];

const macroFields: { label: string; field: keyof NutritionFacts; unit: string; required?: boolean }[] = [
  { label: 'Calories', field: 'calories', unit: '', required: true },
  { label: 'Total Fat', field: 'totalFat', unit: 'g' },
  { label: 'Sat. Fat', field: 'saturatedFat', unit: 'g' },
  { label: 'Trans Fat', field: 'transFat', unit: 'g' },
  { label: 'Cholesterol', field: 'cholesterol', unit: 'mg' },
  { label: 'Sodium', field: 'sodium', unit: 'mg' },
  { label: 'Total Carbs', field: 'totalCarbs', unit: 'g' },
  { label: 'Fiber', field: 'dietaryFiber', unit: 'g' },
  { label: 'Total Sugar', field: 'totalSugar', unit: 'g' },
  { label: 'Added Sugar', field: 'addedSugar', unit: 'g' },
  { label: 'Protein', field: 'protein', unit: 'g' },
];

const microFields: { label: string; field: keyof NutritionFacts; unit: string }[] = [
  { label: 'Vitamin D', field: 'vitaminD', unit: 'mcg' },
  { label: 'Vitamin D', field: 'vitaminDPercent', unit: '%DV' },
  { label: 'Calcium', field: 'calcium', unit: 'mg' },
  { label: 'Calcium', field: 'calciumPercent', unit: '%DV' },
  { label: 'Iron', field: 'iron', unit: 'mg' },
  { label: 'Iron', field: 'ironPercent', unit: '%DV' },
  { label: 'Potassium', field: 'potassium', unit: 'mg' },
  { label: 'Potassium', field: 'potassiumPercent', unit: '%DV' },
];

const ESTIMATED_FIELDS_LABEL: Record<ExtractedNutrientField, string> = {
  totalFat: 'Total Fat',
  saturatedFat: 'Saturated Fat',
  transFat: 'Trans Fat',
  cholesterol: 'Cholesterol',
  sodium: 'Sodium',
  totalCarbs: 'Total Carbs',
  dietaryFiber: 'Dietary Fiber',
  totalSugar: 'Total Sugar',
  addedSugar: 'Added Sugar',
  protein: 'Protein',
};

const categoryOptionsKo: { value: NutritionFacts['foodCategory']; label: string }[] = [
  { value: 'other', label: '기타 / 불확실' },
  { value: 'wholeFood', label: '자연식품 / 단일 성분 식품' },
  { value: 'protein', label: '단백질 / 육류 / 해산물' },
  { value: 'dairy', label: '유제품' },
  { value: 'grain', label: '곡물 / 빵 / 시리얼' },
  { value: 'snack', label: '스낵 / 과자류' },
  { value: 'beverage', label: '음료' },
  { value: 'frozen', label: '냉동 식품' },
  { value: 'processed', label: '가공 식품' },
];

const profileOptionsKo: { value: DietaryProfile; label: string; hint: string }[] = [
  { value: 'general', label: '일반', hint: '균형 잡힌 2,000kcal 식단' },
  { value: 'heart', label: '심장 건강', hint: '포화지방 및 나트륨 제한' },
  { value: 'highProtein', label: '고단백', hint: '운동선수, 근육 회복' },
  { value: 'keto', label: '키토/저탄고지', hint: '순탄수화물 제한' },
  { value: 'lowSodium', label: '저나트륨', hint: '고혈압 조절' },
  { value: 'diabetic', label: '당뇨 관리', hint: '당류 및 순탄수화물 조절' },
];

const macroFieldsKo: Record<string, string> = {
  'Calories': '열량',
  'Total Fat': '총 지방',
  'Sat. Fat': '포화지방',
  'Trans Fat': '트랜스지방',
  'Cholesterol': '콜레스테롤',
  'Sodium': '나트륨',
  'Total Carbs': '총 탄수화물',
  'Fiber': '식이섬유',
  'Total Sugar': '총 당류',
  'Added Sugar': '첨가당',
  'Protein': '단백질',
};

const microFieldsKo: Record<string, string> = {
  'Vitamin D': '비타민 D',
  'Calcium': '칼슘',
  'Iron': '철분',
  'Potassium': '칼륨',
};

const ESTIMATED_FIELDS_LABEL_KO: Record<ExtractedNutrientField, string> = {
  totalFat: '총 지방',
  saturatedFat: '포화지방',
  transFat: '트랜스지방',
  cholesterol: '콜레스테롤',
  sodium: '나트륨',
  totalCarbs: '총 탄수화물',
  dietaryFiber: '식이섬유',
  totalSugar: '총 당류',
  addedSugar: '첨가당',
  protein: '단백질',
};

function translateFactor(factor: string, locale: string): string {
  if (locale !== 'ko') return factor;
  let t = factor;
  t = t.replace(/High calorie serving \((\d+)\s*cal\)/i, '높은 칼로리 제공량 ($1 kcal)');
  t = t.replace(/High in saturated fat \((\d+)%\s*of daily limit per serving\)/i, '포화지방 함량 높음 (1회 제공량당 일일 제한량의 $1%)');
  t = t.replace(/High sodium \((\d+)%\s*of daily limit per serving\)/i, '나트륨 함량 높음 (1회 제공량당 일일 제한량의 $1%)');
  t = t.replace(/High added sugar \((\d+)%\s*of daily limit per serving\)/i, '첨가당 함량 높음 (1회 제공량당 일일 제한량의 $1%)');
  t = t.replace(/Excellent fiber content \((\d+)%\s*of daily needs\)/i, '식이섬유 함량 매우 우수 (하루 권장량의 $1%)');
  t = t.replace(/High protein content \((\d+)%\s*of daily needs\)/i, '고단백 함량 (하루 권장량의 $1%)');
  t = t.replace(/High fat ratio — (\d+)%\s*of calories from fat \(mostly saturated\)/i, '높은 지방 비율 — 지방 칼로리 비율 $1% (주로 포화지방)');
  t = t.replace(/Moderate calorie serving/i, '적절한 칼로리 제공량');
  t = t.replace(/No added sugars — great for blood-sugar control/i, '첨가당 없음 — 혈당 조절에 탁월');
  t = t.replace(/Good source of dietary fiber/i, '식이섬유의 좋은 공급원');
  t = t.replace(/Contains essential vitamins and\/or minerals/i, '필수 비타민 및 미네랄 함유');
  t = t.replace(/Low fat ratio with good fiber/i, '식이섬유가 풍부하고 지방 비율이 낮음');
  t = t.replace(/Minimally processed — closer to whole food/i, '최소 가공 식품 — 자연식품에 가까움');
  t = t.replace(/Contains trans fats — strongly linked to cardiovascular disease/i, '트랜스지방 함유 — 심혈관 질환과 밀접한 연관성');
  t = t.replace(/Low in fiber — average intake already falls short of recommendations/i, '식이섬유 부족 — 일반적인 권장 기준에 미달');
  return t;
}

function translateContribLabel(label: string, locale: string): string {
  if (locale !== 'ko') return label;
  const map: Record<string, string> = {
    'Very high calories': '매우 높은 칼로리',
    'High calories': '높은 칼로리',
    'Trans fat present': '트랜스지방 함유',
    'Very high saturated fat': '매우 높은 포화지방',
    'High saturated fat': '높은 포화지방',
    'Very high sodium': '매우 높은 나트륨',
    'High sodium': '높은 나트륨',
    'Very high added sugar': '매우 높은 첨가당',
    'High added sugar': '높은 첨가당',
    'Low protein relative to calories': '칼로리 대비 부족한 단백질',
    'Low fiber relative to carbs': '탄수화물 대비 부족한 식이섬유',
    'Highly processed (ultra-processed)': '초가공 식품 가점 차감',
    'Low saturated fat benefit': '낮은 포화지방 가점',
    'Low sodium benefit': '낮은 나트륨 가점',
    'No added sugar benefit': '첨가당 없음 가점',
    'High protein boost': '고단백 보너스',
    'High fiber boost': '식이섬유 보너스',
    'Minimally processed bonus': '최소 가공 식품 보너스',
    'Very high cholesterol with high saturated fat': '고콜레스테롤 및 고포화지방 복합 위험',
  };
  return map[label] || label;
}

function translateContribReason(reason: string, locale: string): string {
  if (locale !== 'ko') return reason;
  let t = reason;
  t = t.replace(/Industrial trans fats raise CVD risk/i, '가공 트랜스지방은 심장병, 뇌졸중 등 심혈관질환(CVD) 위험을 높입니다');
  t = t.replace(/Combined CVD risk profile/i, '심장병 및 뇌졸중 등 심혈관질환(CVD) 복합 위험군에 해당');
  t = t.replace(/(\d+)\s*kcal per serving exceeds recommended density/i, '1회 제공량당 $1 kcal로 권장 영양 밀도 초과');
  t = t.replace(/Contains trans fat, which increases LDL cholesterol/i, 'LDL 콜레스테롤을 높이는 트랜스지방 함유');
  t = t.replace(/(\d+)g saturated fat per serving/i, '1회 제공량당 포화지방 $1g');
  t = t.replace(/(\d+)mg sodium per serving/i, '1회 제공량당 나트륨 $1mg');
  t = t.replace(/(\d+)g added sugar per serving/i, '1회 제공량당 첨가당 $1g');
  t = t.replace(/Only (\d+)g protein in (\d+) kcal/i, '$2 kcal 대비 단백질이 $1g에 불과함');
  t = t.replace(/Only (\d+)g fiber for (\d+)g carbs/i, '탄수화물 $2g 대비 식이섬유가 $1g에 불과함');
  t = t.replace(/Ultra-processed food category/i, '초가공 식품군에 해당');
  t = t.replace(/Under (\d+)g saturated fat per serving/i, '1회 제공량당 포화지방 $1g 미만');
  t = t.replace(/Under (\d+)mg sodium per serving/i, '1회 제공량당 나트륨 $1mg 미만');
  t = t.replace(/0g added sugar/i, '첨가당 0g');
  t = t.replace(/(\d+)g protein per serving/i, '1회 제공량당 단백질 $1g');
  t = t.replace(/(\d+)g fiber per serving/i, '1회 제공량당 식이섬유 $1g');
  t = t.replace(/Whole or minimally processed food category/i, '자연식품 또는 최소 가공 식품군에 해당');
  return t;
}

function translateProcessingExplanation(explanation: string, locale: string): string {
  if (locale !== 'ko') return explanation;
  const map: Record<string, string> = {
    'Ultra-processed foods undergo industrial formulation and contain multiple added ingredients. Lower intake is recommended.': '초가공 식품은 여러 차례의 산업적 가공을 거치며 인공 첨가물이 첨가된 식품군입니다. 섭취를 최소화하는 것이 권장됩니다.',
    'Moderately processed foods have some added ingredients (like salt, sugar, or oils) but retain their basic structure.': '중가공 식품은 조미나 보존을 위해 일부 성분(소금, 당류, 오일 등)이 첨가되었으나 원물의 형태가 기본적으로 유지된 식품군입니다.',
    'Minimally processed foods are near their natural state, maintaining maximum fiber, vitamins, and minerals.': '최소 가공 식품은 원재료에 가까운 자연 상태로 가공을 최소화하여 식이섬유, 비타민, 미네랄이 최대로 보존된 식품군입니다.',
  };
  return map[explanation] || explanation;
}

function translateRecommendation(rec: { title: string; description: string; category?: string; priority?: string; source?: string }, locale: string) {
  if (locale !== 'ko') return rec;
  const titleMap: Record<string, string> = {
    'Reduce Serving Size': '섭취량 조절 권장',
    'Limit Saturated Fat Intake': '포화지방 섭취 제한',
    'Watch Saturated Fat': '포화지방 주의',
    'High Saturated Fat Alert': '높은 포화지방 경고',
    'Reduce Sodium Intake': '나트륨 섭취 제한',
    'High Sodium Warning': '높은 나트륨 경고',
    'Limit Added Sugars': '첨가당 제한',
    'Sugar Level Alert': '당류 주의 경고',
    'Increase Dietary Fiber': '식이섬유 섭취 증대',
    'Ensure Adequate Protein': '단백질 섭취 보완',
    'Consider Whole-Food Alternatives': '자연식품 대안 고려',
    'Avoid Trans Fats': '트랜스지방 배제',
  };

  const sourceMap: Record<string, string> = {
    'AHA': '미국심장협회(AHA)',
    'WHO': '세계보건기구(WHO)',
    'DGA': '미국식생활지침(DGA)',
    'FDA': '미국식품의약국(FDA)',
  };

  let translatedDesc = rec.description;
  if (rec.title === 'Reduce Serving Size') {
    const calMatch = rec.description.match(/(\d+)\s*cal/);
    const cal = calMatch ? calMatch[1] : '';
    translatedDesc = `1회 제공량당 ${cal} kcal로 매우 높습니다. 섭취량을 절반으로 줄여 칼로리 부담을 줄여 보세요.`;
  } else if (rec.title === 'Limit Saturated Fat Intake' || rec.title === 'Watch Saturated Fat' || rec.title === 'High Saturated Fat Alert') {
    const limitMatch = rec.description.match(/(\d+)% of your daily limit/);
    const limit = limitMatch ? limitMatch[1] : '';
    translatedDesc = `이 제품의 포화지방 함량은 일일 제한량의 ${limit}%에 달합니다. 뇌혈관 및 심혈관 건강을 위해 저지방 대안을 찾아보세요.`;
  } else if (rec.title === 'Reduce Sodium Intake' || rec.title === 'High Sodium Warning') {
    const mgMatch = rec.description.match(/(\d+)mg per serving/);
    const mg = mgMatch ? mgMatch[1] : '';
    translatedDesc = `1회 제공량당 ${mg}mg. 미국심장협회(AHA)의 하루 이상적인 제한량은 1,500mg입니다. "저나트륨"(1회 제공량당 140mg 이하) 표시가 있는 제품을 선택해 보세요.`;
  } else if (rec.title === 'Limit Added Sugars' || rec.title === 'Sugar Level Alert') {
    const sugarMatch = rec.description.match(/(\d+)g of added sugars/);
    const sugar = sugarMatch ? sugarMatch[1] : '';
    translatedDesc = `첨가당 ${sugar}g 함유. 하루 권장량의 상당 부분을 차지하므로 혈당 변동과 대사 건강을 위해 무가당 대체품을 추천합니다.`;
  } else if (rec.title === 'Increase Dietary Fiber') {
    translatedDesc = '식이섬유는 장내 유익균 활성화와 혈당 안정에 중요합니다. 하루 25g 이상 섭취할 수 있도록 통곡물, 채소류 섭취를 늘려 보세요.';
  } else if (rec.title === 'Ensure Adequate Protein') {
    translatedDesc = '칼로리에 비해 단백질 함량이 낮습니다. 근육 합성 및 포만감 유지 유지를 위해 그릭 요거트, 닭가슴살, 달걀 등 고단백 식품과 병행 섭취하십시오.';
  } else if (rec.title === 'Consider Whole-Food Alternatives') {
    translatedDesc = '가공을 최소화한 자연식품 위주로 섭취하면 영양소 밀도가 올라가고 대사 부담을 현저히 낮출 수 있습니다.';
  } else if (rec.title === 'Avoid Trans Fats') {
    translatedDesc = '트랜스지방은 심혈관 건강에 직격탄을 줍니다. 성분표에 일부경화유(Partially Hydrogenated Oil)가 포함되었는지 확인하고 가급적 피하십시오.';
  }

  return {
    ...rec,
    title: titleMap[rec.title] || rec.title,
    description: translatedDesc,
    source: rec.source ? (sourceMap[rec.source] || rec.source) : undefined,
  };
}

function translateInlineAlternative(alt: { name: string; reason: string; approxScore: number; scoreDelta: number } | undefined, locale: string) {
  if (!alt || locale !== 'ko') return alt;
  
  const nameMap: Record<string, string> = {
    'Diet / zero-sugar version (or sparkling water)': '다이어트 / 제로 슈거 음료 (또는 탄산수)',
    'Sparkling water or unsweetened iced tea': '탄산수 또는 무가당 아이스티',
    'Plain rolled oats + fresh fruit': '플레인 오트밀 + 신선한 과일',
    'Stir-fry: frozen veg + rotisserie chicken + brown rice': '냉동 채소 + 로티세리 치킨 + 현미밥 볶음',
    'Roasted chickpeas or unsalted almonds': '구운 병아리콩 또는 무염 아몬드',
    'Ground chicken breast / 93% lean turkey': '닭가슴살 다짐육 / 93% 살코기 칠면조',
  };
  
  const reasonMap: Record<string, string> = {
    'Same beverage format with dramatically less sugar.': '동일한 음료 형태이면서 당류가 획기적으로 적습니다.',
    'Similar refreshment without sweeteners or added sugar.': '감미료나 첨가당 없이 유사한 청량감을 줍니다.',
    'Same warm-bowl feel, with no added sugar and 4g fiber per serving.': '따뜻하게 한 그릇 먹는 포만감은 유지하면서, 첨가당은 없고 1회 제공량당 4g의 식이섬유를 섭취할 수 있습니다.',
    'Cuts sodium roughly in half and adds 6g+ fiber in 15 minutes.': '15분 만에 조리할 수 있으며, 나트륨을 절반으로 줄이고 6g 이상의 식이섬유를 더합니다.',
    'Same crunch, ~3× the protein and meaningful fiber.': '바삭한 식감은 그대로이면서 단백질은 약 3배 많고, 유의미한 식이섬유를 섭취할 수 있습니다.',
    '70% less saturated fat, similar protein.': '포화지방이 70% 적으며, 단백질 함량은 비슷합니다.',
  };

  return {
    ...alt,
    name: nameMap[alt.name] || alt.name,
    reason: reasonMap[alt.reason] || alt.reason,
  };
}

function translateNarrative(analysis: HealthAnalysis, locale: string): string {
  if (locale !== 'ko') return analysis.narrativeExplanation;
  
  const score = analysis.overallScore;
  const grade = analysis.grade;
  const verdict = analysis.verdict;
  
  const verdictLabel = verdict === 'go' ? '건강에 좋은 선택입니다' : verdict === 'pause' ? '적당히 섭취하는 것이 좋습니다' : '섭취를 제한하는 것이 바람직합니다';
  
  const topNeg = analysis.negativeFactors.slice(0, 2).map(f => translateFactor(f, 'ko'));
  const topPos = analysis.positiveFactors.slice(0, 1).map(f => translateFactor(f, 'ko'));
  
  let sentence = `헬스 지수: ${score}점 (${grade} 등급) — ${verdictLabel}.`;
  
  if (topNeg.length > 0 && topPos.length > 0) {
    sentence += ` ${topNeg.join(' 및 ')} 부분을 주의해야 하지만, 긍정적인 면으로는 ${topPos[0]}의 특징이 있습니다.`;
  } else if (topNeg.length > 0) {
    sentence += ` 주요 주의 사항: ${topNeg.join(' 및 ')}.`;
  } else if (topPos.length > 0) {
    sentence += ` 긍정적인 특징: ${topPos[0]}.`;
  }
  
  if (analysis.processingLevel === 'ultra') {
    sentence += ' 이 제품은 초가공 식품입니다.';
  } else if (analysis.processingLevel === 'minimally') {
    sentence += ' 자연식품에 가까운 최소 가공 식품입니다.';
  }
  
  return sentence;
}

function translateSampleName(name: string, locale: string): string {
  if (locale !== 'ko') return name;
  const sampleMap: Record<string, string> = {
    'Plain Greek Yogurt': '플레인 그릭 요거트',
    'Sugary Cereal': '설탕 첨가 시리얼',
    'Frozen Pepperoni Pizza': '냉동 페퍼로니 피자',
    'Ground Chicken (Regression)': '다진 닭고기 (회귀 분석)',
    'Quinoa Bowl': '퀴노아 샐러드 볼',
  };
  return sampleMap[name] || name;
}

function translateFatRatioLabel(label: string, locale: string): string {
  if (locale !== 'ko') return label;
  const map: Record<string, string> = {
    'good': '양호',
    'high': '높음',
    'very high': '매우 높음',
  };
  return map[label.toLowerCase()] || label;
}

export default function LabelAnalyzer() {
  const t = useT();
  const [locale] = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<NutritionFacts>({ ...emptyForm });
  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);
  const [smartRecs, setSmartRecs] = useState<SmartRecommendationsResult | null>(null);
  const [smartRecsLoading, setSmartRecsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle');
  const [aiMode, setAiMode] = useState<'ai-first' | 'ocr-only'>('ai-first');
  // AI is always the default for analysis. OCR-only is a fallback option.
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [ocrDebug, setOcrDebug] = useState<{ line: string; matched: string; value: number }[]>([]);
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set());
  const [estimatedFields, setEstimatedFields] = useState<Set<string>>(new Set());
  const [atwaterWarning, setAtwaterWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'alternatives' | 'breakdown'>('details');
  const [showForm, setShowForm] = useState(true);
  const { profile, setProfile } = usePersistentProfile();
  const healthGoals = useHealthGoals();
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loggedFlash, setLoggedFlash] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [sharedFlash, setSharedFlash] = useState(false);
  const [confirmedOcr, setConfirmedOcr] = useState(false);
  const [proteinValidationError, setProteinValidationError] = useState<string | null>(null);
  const [autoDetectedCategory, setAutoDetectedCategory] = useState<NutritionFacts['foodCategory'] | null>(null);

  // Show health goals modal on first visit
  useEffect(() => {
    if (!healthGoals.goals.hasCompletedSetup) {
      setShowGoalsModal(true);
    }
  }, [healthGoals.goals.hasCompletedSetup]);

  const applyExtracted = useCallback((extracted: ExtractedNutrients) => {
    const filled = new Set<string>();
    const updates: Partial<NutritionFacts> = {};

    const mapField = (key: keyof ExtractedNutrients, formKey: keyof NutritionFacts) => {
      const val = extracted[key];
      if (val !== undefined && val !== null) {
        (updates as Record<string, unknown>)[formKey] = val;
        filled.add(formKey);
      }
    };

    mapField('productName', 'productName');
    mapField('servingSize', 'servingSize');
    mapField('servingsPerContainer', 'servingsPerContainer');
    mapField('calories', 'calories');
    mapField('totalFat', 'totalFat');
    mapField('saturatedFat', 'saturatedFat');
    mapField('transFat', 'transFat');
    mapField('cholesterol', 'cholesterol');
    mapField('sodium', 'sodium');
    mapField('totalCarbs', 'totalCarbs');
    mapField('dietaryFiber', 'dietaryFiber');
    mapField('totalSugar', 'totalSugar');
    mapField('addedSugar', 'addedSugar');
    mapField('protein', 'protein');
    mapField('vitaminD', 'vitaminD');
    mapField('calcium', 'calcium');
    mapField('iron', 'iron');
    mapField('potassium', 'potassium');
    mapField('vitaminDPercent', 'vitaminDPercent');
    mapField('calciumPercent', 'calciumPercent');
    mapField('ironPercent', 'ironPercent');
    mapField('potassiumPercent', 'potassiumPercent');

    setForm((prev) => {
      const next: NutritionFacts = { ...prev, ...updates };
      if ((!next.foodCategory || next.foodCategory === 'other') && (next.productName || next.servingSize)) {
        const inferred = inferFoodCategory({ productName: next.productName, servingSize: next.servingSize });
        if (inferred !== 'other') {
          setAutoDetectedCategory(inferred);
          return { ...next, foodCategory: inferred };
        }
      }
      setAutoDetectedCategory(null);
      return next;
    });
    setAutoFilledFields(filled);
    setEstimatedFields(new Set(extracted.estimatedFields || []));
    setOcrDebug(extracted.debug || []);
    setOcrStatus('done');
    setNeedsConfirmation(true);
    setConfirmedOcr(false);

    // Atwater warning surfacing
    const a = extracted.atwater;
    if (a && a.status !== 'match') {
      setAtwaterWarning(
        `Calorie reconciliation: macros imply ${a.computedCalories} cal, label says ${a.labelCalories} cal (off by ~${a.diffPercent}%). ` +
        (a.status === 'hard-mismatch'
          ? 'This usually means a macro is missing or misread — please verify before scoring.'
          : 'Within rounding tolerance, but worth a quick check.')
      );
    } else {
      setAtwaterWarning(null);
    }
  }, []);

  const processImage = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const imageUrl = ev.target?.result as string;
      setUploadedImage(imageUrl);
      setOcrStatus('scanning');
      setAutoFilledFields(new Set());
      setEstimatedFields(new Set());
      setAiResult(null);

      let ocrExtracted: ExtractedNutrients | null = null;
      let aiExtracted: AIAnalysisResult | null = null;

      // Always run OCR in background as fallback
      const ocrPromise = extractNutritionFromImage(imageUrl).catch((err) => {
        console.warn('OCR failed:', err);
        return null;
      });

      // Try AI first if in AI mode
      if (aiMode === 'ai-first') {
        try {
          aiExtracted = await analyzeLabelViaAPI(imageUrl);
          setAiResult(aiExtracted);
        } catch (err: any) {
          console.warn('AI analysis failed:', err);
          setAiResult(null);
        }
      }

      // Wait for OCR to complete
      ocrExtracted = await ocrPromise;

      // Decide which result to use
      if (aiExtracted && aiExtracted.confidence >= 0.6) {
        // Use AI result, but merge with OCR for any missing fields
        const merged = ocrExtracted
          ? mergeAIWithOCR(aiExtracted, ocrExtracted)
          : aiExtracted;
        applyExtracted({
          productName: merged.productName,
          servingSize: merged.servingSize,
          servingsPerContainer: merged.servingsPerContainer,
          calories: merged.calories,
          totalFat: merged.totalFat,
          saturatedFat: merged.saturatedFat,
          transFat: merged.transFat,
          cholesterol: merged.cholesterol,
          sodium: merged.sodium,
          totalCarbs: merged.totalCarbs,
          dietaryFiber: merged.dietaryFiber,
          totalSugar: merged.totalSugar,
          addedSugar: merged.addedSugar,
          protein: merged.protein,
          vitaminD: merged.vitaminD,
          calcium: merged.calcium,
          iron: merged.iron,
          potassium: merged.potassium,
          rawText: aiExtracted.reasoning,
        });
      } else if (ocrExtracted) {
        // OCR fallback
        applyExtracted(ocrExtracted);
      } else {
        setOcrStatus('error');
      }

      // AI loading complete
    };
    reader.readAsDataURL(file);
  }, [applyExtracted, aiMode]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleCameraCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleAnalyze = useCallback(() => {
    setProteinValidationError(null);

    // === Mandatory protein gate (P0 critical bug fix) ===
    if (requiresProteinConfirmation(form)) {
      setProteinValidationError(
        locale === 'ko'
          ? '이 제품군의 단백질 수치가 비정상적으로 낮게 입력되었습니다. 영양성분표의 단백질 함량을 다시 한 번 확인하고 수정한 뒤 분석해 주십시오.'
          : 'Protein looks implausibly low for this product. The label likely shows a non-zero value — please verify and update Protein before scoring.'
      );
      return;
    }

    // === Mandatory OCR confirmation gate ===
    if (needsConfirmation && !confirmedOcr) {
      setProteinValidationError(
        locale === 'ko'
          ? '자동 입력된 값들을 확인하신 뒤 아래 확인란에 체크해 주십시오.'
          : 'Please review the auto-read values and confirm them before scoring (check the box below).'
      );
      return;
    }

    const result = analyzeNutritionLabel(form, { profile, servingMultiplier });
    setAnalysis(result);
    setShowForm(false);

    // Fetch AI-powered smart recommendations
    setSmartRecsLoading(true);
    getSmartRecommendations(
      {
        productName: form.productName,
        servingSize: form.servingSize,
        calories: form.calories,
        totalFat: form.totalFat,
        saturatedFat: form.saturatedFat,
        transFat: form.transFat,
        cholesterol: form.cholesterol,
        sodium: form.sodium,
        totalCarbs: form.totalCarbs,
        dietaryFiber: form.dietaryFiber,
        totalSugar: form.totalSugar,
        addedSugar: form.addedSugar,
        protein: form.protein,
        vitaminD: form.vitaminD,
        calcium: form.calcium,
        iron: form.iron,
        potassium: form.potassium,
      },
      result.overallScore,
      result.grade,
      profile,
      form.foodCategory || 'other',
      locale as 'en' | 'ko'
    ).then((recs) => {
      setSmartRecs(recs);
    }).catch((err) => {
      console.warn('Smart recommendations failed:', err);
    }).finally(() => {
      setSmartRecsLoading(false);
    });
  }, [form, profile, servingMultiplier, needsConfirmation, confirmedOcr]);

  const resetAll = useCallback(() => {
    setForm({ ...emptyForm });
    setAnalysis(null);
    setUploadedImage(null);
    setOcrStatus('idle');
    setOcrDebug([]);
    setAutoFilledFields(new Set());
    setEstimatedFields(new Set());
    setAtwaterWarning(null);
    setShowForm(true);
    setNeedsConfirmation(false);
    setConfirmedOcr(false);
    setProteinValidationError(null);
    setServingMultiplier(1);
    setAutoDetectedCategory(null);
    setAiResult(null);
    setSmartRecs(null);
    setSmartRecsLoading(false);
  }, []);

  const updateField = useCallback((field: keyof NutritionFacts, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'foodCategory') setAutoDetectedCategory(null);
    setEstimatedFields(prev => {
      if (!prev.has(field as string)) return prev;
      const next = new Set(prev);
      next.delete(field as string);
      return next;
    });
  }, []);

  const samples = useMemo(() => getSampleProducts(), []);

  const handleSampleSelect = useCallback((sample: { data: NutritionFacts }) => {
    setForm({ ...sample.data });
    setUploadedImage(null);
    setOcrStatus('idle');
    setAutoFilledFields(new Set());
    setEstimatedFields(new Set());
    setAtwaterWarning(null);
    setNeedsConfirmation(false);
    setConfirmedOcr(true);
    setProteinValidationError(null);
    setAutoDetectedCategory(null);
  }, []);

  const hasData = form.calories > 0 || form.totalFat > 0 || form.sodium > 0 || form.protein > 0;

  // Map health goals to nutrients that should be highlighted
  const goalRelevantNutrients = useMemo(() => {
    const map: Record<HealthGoal, string[]> = {
      general: [],
      bloodSugar: ['Added Sugar', 'Total Sugar', 'Total Carbs', 'Dietary Fiber'],
      heartHealth: ['Saturated Fat', 'Sodium', 'Trans Fat'],
      weightManagement: ['Calories', 'Total Fat', 'Added Sugar'],
      lowSodium: ['Sodium'],
      highProtein: ['Protein'],
      foodAllergies: [],
    };
    const relevant = new Set<string>();
    healthGoals.goals.goals.forEach((g) => {
      map[g]?.forEach((n) => relevant.add(n));
    });
    return relevant;
  }, [healthGoals.goals.goals]);

  // ---- RESULTS VIEW ----
  if (!showForm && analysis) {
    return (
      <>
      <HealthGoalsModal
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        onSave={(goals, allergens) => {
          healthGoals.setGoals({
            goals: goals.length > 0 ? goals : ['general'],
            allergens,
            hasCompletedSetup: true,
          });
          setShowGoalsModal(false);
        }}
      />
      <section id="analyzer" className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <button onClick={resetAll} className="flex items-center gap-2 text-sm text-deep/50 hover:text-terracotta transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {t('an.scoreAnother')}
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  saveAnalysis({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    timestamp: Date.now(),
                    productName: form.productName || '',
                    servingSize: form.servingSize || '',
                    calories: form.calories,
                    score: analysis.overallScore,
                    grade: analysis.grade,
                    gradeColor: analysis.gradeColor,
                    verdict: analysis.verdict,
                    profile,
                    analysis,
                    nutritionFacts: form,
                    servingMultiplier,
                  });
                  setSavedFlash(true);
                  window.setTimeout(() => setSavedFlash(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-deep text-white text-sm font-medium hover:bg-deep/90 transition-colors"
              >
                {savedFlash ? (locale === 'ko' ? '저장됨!' : 'Saved!') : (locale === 'ko' ? '저장하기' : 'Save for Later')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button
                onClick={async () => {
                  const productNameLabel = form.productName || (locale === 'ko' ? '제품' : 'Product');
                  const text = `${productNameLabel} — ${locale === 'ko' ? '헬스 지수' : 'Health Index'}: ${analysis.overallScore}/100 (${analysis.grade})\n${translateNarrative(analysis, locale)}\n${locale === 'ko' ? 'VITAL로 분석함' : 'Analyzed with VITAL'}: https://nutrition.ai-biz.app`;
                  try {
                    if (navigator.share) {
                      await navigator.share({ title: 'VITAL Nutrition Analysis', text });
                    } else {
                      await navigator.clipboard.writeText(text);
                      setSharedFlash(true);
                      window.setTimeout(() => setSharedFlash(false), 2000);
                    }
                  } catch {
                    // User cancelled or share failed
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-deep/15 text-deep text-sm font-medium hover:bg-deep/5 transition-colors"
              >
                {sharedFlash ? (locale === 'ko' ? '복사됨!' : 'Copied!') : (locale === 'ko' ? '공유하기' : 'Share')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>
              </button>
              <button
                onClick={() => {
                  addEntryToLog({ name: form.productName || (locale === 'ko' ? '스캔한 제품' : 'Scanned product'), servings: servingMultiplier, data: form });
                  setLoggedFlash(true);
                  window.setTimeout(() => setLoggedFlash(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-[#c44e2f] transition-colors"
              >
                {loggedFlash ? t('an.addedToLog') : t('an.addToLog')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-deep/5 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <HealthScoreGauge score={analysis.overallScore} grade={analysis.grade} gradeColor={analysis.gradeColor} category={analysis.category} size={200} showLegend />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-2xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {form.productName || (locale === 'ko' ? '분석된 제품' : 'Analyzed Product')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface text-deep/60 text-xs">
                    {form.servingSize || (locale === 'ko' ? '1회 제공량' : '1 serving')}{servingMultiplier !== 1 && ` × ${servingMultiplier}`}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-deep/60 text-xs">{Math.round(form.calories * servingMultiplier)} {locale === 'ko' ? 'kcal' : 'cal'}</span>
                  <span className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: analysis.gradeColor }}>{locale === 'ko' ? '등급 ' : 'Grade '}{analysis.grade}</span>
                  <span className="px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{
                      backgroundColor: analysis.verdict === 'go' ? '#4a7c59' : analysis.verdict === 'pause' ? '#c9a96e' : '#b8301f',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {locale === 'ko' 
                      ? (analysis.verdict === 'go' ? '✓ 안심' : analysis.verdict === 'pause' ? '◐ 주의' : '✕ 제한') 
                      : (analysis.verdict === 'go' ? '✓ Go' : analysis.verdict === 'pause' ? '◐ Pause' : '✕ Avoid')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-deep/5 text-deep/60">
                    {locale === 'ko' ? '분석 기준: ' : 'Profile: '}{(locale === 'ko' ? profileOptionsKo : profileOptions).find(p => p.value === profile)?.label}
                  </span>
                </div>
                {/* Narrative explanation */}
                <p className="text-sm text-deep/80 leading-relaxed bg-deep/5 rounded-xl p-3">
                  {translateNarrative(analysis, locale)}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    title={translateProcessingExplanation(analysis.processingExplanation, locale)}
                    style={{
                      backgroundColor: (analysis.processingLevel === 'ultra' ? '#d95c39' : analysis.processingLevel === 'moderately' ? '#c9a96e' : '#4a7c59') + '15',
                      color: analysis.processingLevel === 'ultra' ? '#d95c39' : analysis.processingLevel === 'moderately' ? '#c9a96e' : '#4a7c59',
                    }}
                  >
                    {locale === 'ko' 
                      ? (analysis.processingLevel === 'ultra' ? '초가공 식품' : analysis.processingLevel === 'moderately' ? '중가공 식품' : '최소 가공 식품') 
                      : (analysis.processingLevel === 'ultra' ? 'Ultra-Processed' : analysis.processingLevel === 'moderately' ? 'Moderately Processed' : 'Minimally Processed')} ⓘ
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{
                    backgroundColor: (analysis.nutrientDensity === 'high' ? '#4a7c59' : analysis.nutrientDensity === 'moderate' ? '#c9a96e' : '#d95c39') + '15',
                    color: analysis.nutrientDensity === 'high' ? '#4a7c59' : analysis.nutrientDensity === 'moderate' ? '#c9a96e' : '#d95c39',
                  }}>
                    {locale === 'ko' ? (analysis.nutrientDensity === 'high' ? '높음' : analysis.nutrientDensity === 'moderate' ? '보통' : '낮음') : (analysis.nutrientDensity === 'high' ? 'High' : analysis.nutrientDensity === 'moderate' ? 'Moderate' : 'Low')}{locale === 'ko' ? ' 영양소 밀도' : ' Nutrient Density'}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs bg-deep/5 text-deep/60">
                    {locale === 'ko' ? '지방 비율: ' : 'Fat ratio: '}{Math.round(analysis.fatRatio * 100)}% ({locale === 'ko' ? translateFatRatioLabel(analysis.fatRatioLabel, locale) : analysis.fatRatioLabel})
                  </span>
                </div>

                {/* Processing tag explanation */}
                <p className="text-xs text-deep/50 leading-relaxed">{translateProcessingExplanation(analysis.processingExplanation, locale)}</p>

                {analysis.positiveFactors.length > 0 && (
                  <div className="space-y-1">
                    {analysis.positiveFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-deep/70">
                        <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5 text-[#4a7c59]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" fill="currentColor"/></svg>
                        {translateFactor(f, locale)}
                      </div>
                    ))}
                  </div>
                )}
                {analysis.negativeFactors.length > 0 && (
                  <div className="space-y-1">
                    {analysis.negativeFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-deep/70">
                        <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5 text-[#d95c39]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 5.5L9 8l2.5 2.5-1 1L8 9l-2.5 2.5-1-1L7 8 4.5 5.5l1-1L8 7l2.5-2.5 1 1z" fill="currentColor"/></svg>
                        {translateFactor(f, locale)}
                      </div>
                    ))}
                  </div>
                )}

                {/* Methodology link */}
                <Link to="/methodology" className="inline-flex items-center gap-1 text-xs text-terracotta hover:underline">
                  {locale === 'ko' ? '점수는 어떻게 계산되나요?' : 'How is this calculated?'}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* AI-Powered Smart Analysis */}
          {smartRecsLoading && (
            <div className="mb-6 p-5 rounded-2xl bg-white border border-deep/5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
                <p className="text-sm text-deep/60">{locale === 'ko' ? 'AI 맞춤 영양 추천 생성 중...' : 'Generating smart recommendations...'}</p>
              </div>
            </div>
          )}

          {smartRecs && smartRecs.analysis && (
            <div className="mb-6 p-5 rounded-2xl bg-terracotta/5 border border-terracotta/15">
              <p className="text-[10px] uppercase tracking-widest text-terracotta mb-2">{locale === 'ko' ? 'AI 종합 영양 판독' : 'AI Analysis'}</p>
              <p className="text-sm text-deep font-medium mb-1">{smartRecs.analysis.topConcern}</p>
              <p className="text-sm text-deep/60">{smartRecs.analysis.keyInsight}</p>
            </div>
          )}

          {/* AI-Powered Better Alternatives */}
          {smartRecs && smartRecs.alternatives && smartRecs.alternatives.length > 0 && (
            <div className="mb-6 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-deep/40 px-1">{locale === 'ko' ? 'AI 추천 대체 식품' : 'AI-Suggested Better Alternatives'}</p>
              {smartRecs.alternatives.map((alt, i) => (
                <div key={i} className="p-5 rounded-2xl border-2 bg-white" style={{ borderColor: '#4a7c5930' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ backgroundColor: '#4a7c59' }}>
                      ↑
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {alt.name}
                      </h4>
                      <p className="text-sm text-deep/60 leading-relaxed mb-2">{alt.reason}</p>
                      <p className="text-xs text-[#4a7c59] font-medium">
                        {locale === 'ko' 
                          ? `예상 헬스 지수: ${alt.approxScore}점 (현재 대비 +${alt.scoreDelta}점)` 
                          : `Approx Health Index: ${alt.approxScore} (+${alt.scoreDelta} vs current)`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback: legacy inline alternative */}
          {!smartRecs?.alternatives?.length && analysis.inlineAlternative && (() => {
            const translatedAlt = translateInlineAlternative(analysis.inlineAlternative, locale);
            return (
              <div className="mb-6 p-5 rounded-2xl border-2 bg-white" style={{ borderColor: '#4a7c5930' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ backgroundColor: '#4a7c59' }}>
                    ↑
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] mb-1">{locale === 'ko' ? '추천 대체 식품' : 'Better alternative'}</p>
                    <h4 className="text-lg text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {translatedAlt?.name}
                    </h4>
                    <p className="text-sm text-deep/60 leading-relaxed mb-2">{translatedAlt?.reason}</p>
                    <p className="text-xs text-[#4a7c59] font-medium">
                      {locale === 'ko' 
                        ? `예상 헬스 지수: ${translatedAlt?.approxScore}점 (현재 대비 +${translatedAlt?.scoreDelta}점)` 
                        : `Approx Health Index: ${translatedAlt?.approxScore} (+${translatedAlt?.scoreDelta} vs current)`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Amino acid link for high-protein foods */}
          {form.protein * servingMultiplier > 5 && (
            <div className="mb-6 p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm text-deep font-medium">{locale === 'ko' ? '완전 단백질일까요? 아미노산 조성을 확인해 보세요.' : 'Complete protein? See the breakdown.'}</p>
                  <p className="text-xs text-deep/50">{locale === 'ko' ? '필수 아미노산 함량과 식단 매칭 팁을 볼 수 있습니다.' : 'View essential amino acids and meal-pairing tips.'}</p>
                </div>
                <Link to="/amino-acids" className="text-xs px-3 py-1.5 rounded-lg bg-deep text-inverse hover:bg-deep/90 transition-colors">
                  {locale === 'ko' ? '아미노산 분석 →' : 'Amino Acids →'}
                </Link>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-6 border-b border-deep/10 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('details')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'details' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>{locale === 'ko' ? '영양성분 상세' : 'Nutrient Breakdown'}</button>
            <button onClick={() => setActiveTab('alternatives')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'alternatives' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>{locale === 'ko' ? `추천 제안 (${smartRecs?.recommendations?.length || analysis.recommendations.length})` : `All Recommendations (${smartRecs?.recommendations?.length || analysis.recommendations.length})`}</button>
            <button onClick={() => setActiveTab('breakdown')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'breakdown' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>{locale === 'ko' ? '점수 산출 내역' : 'Score Breakdown'}</button>
          </div>

          {/* Goal-aware banner */}
          {goalRelevantNutrients.size > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-terracotta/5 border border-terracotta/15 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <p className="text-xs text-deep/70">
                {locale === 'ko' ? '건강 목표와 연관된 영양소 강조:' : 'Highlighting nutrients relevant to your goals:'} <span className="font-medium text-deep">{Array.from(goalRelevantNutrients).map(n => locale === 'ko' ? (macroFieldsKo[n] || microFieldsKo[n] || n) : n).join(', ')}</span>
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.nutrientScores.map((ns) => {
                const isRelevant = goalRelevantNutrients.has(ns.name);
                return (
                  <div key={ns.name} className={`p-4 rounded-xl bg-white border transition-all ${isRelevant ? 'border-terracotta/40 shadow-sm' : 'border-deep/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }}>{ns.icon}</div>
                        <div>
                          <p className="text-sm font-medium text-deep flex items-center gap-1.5">
                            {locale === 'ko' ? (macroFieldsKo[ns.name] || microFieldsKo[ns.name] || ns.name) : ns.name}
                            {isRelevant && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-medium">{locale === 'ko' ? '건강 목표' : 'Your goal'}</span>
                            )}
                          </p>
                          <p className="text-xs text-deep/40">
                            {ns.value}{ns.unit} / {ns.limit}{ns.unit} <span className="text-deep/30">({locale === 'ko' ? (ns.frame === 'meal' ? '끼니당' : '하루 기준') : (ns.frame === 'meal' ? 'per meal' : 'daily')})</span>
                          </p>
                          {ns.source && (
                            <p className="text-[10px] text-deep/30 mt-0.5">{locale === 'ko' ? '출처: ' : 'Source: '}{ns.source}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-lg font-bold" style={{ color: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }}>{ns.percentOfLimit}%</span>
                    </div>
                    <div className="h-2 bg-deep/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(ns.percentOfLimit, 100)}%`, backgroundColor: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'alternatives' && (
            <div className="space-y-3">
              {/* AI-powered recommendations */}
              {smartRecs && smartRecs.recommendations && smartRecs.recommendations.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-deep/40 px-1 mb-2">{locale === 'ko' ? 'AI 맞춤 영양 추천' : 'AI-Powered Recommendations'}</p>
                  {smartRecs.recommendations.map((rec, i) => (
                    <div key={`ai-${i}`} className="p-5 rounded-xl border" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3908' : rec.priority === 'medium' ? '#c9a96e08' : '#4a7c5908', borderColor: rec.priority === 'high' ? '#d95c3920' : rec.priority === 'medium' ? '#c9a96e20' : '#4a7c5920' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rec.category === 'warning' ? '#d95c3915' : rec.category === 'alternative' ? '#c9a96e15' : '#4a7c5915' }}>
                          {rec.category === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>}
                          {rec.category === 'alternative' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                          {rec.category === 'tip' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-deep text-sm">{rec.title}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3915' : rec.priority === 'medium' ? '#c9a96e15' : '#4a7c5915', color: rec.priority === 'high' ? '#d95c39' : rec.priority === 'medium' ? '#c9a96e' : '#4a7c59' }}>
                              {locale === 'ko' ? (rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '보통' : '낮음') : rec.priority}
                            </span>
                          </div>
                          <p className="text-sm text-deep/60 leading-relaxed">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Fallback: legacy recommendations */}
              {(!smartRecs?.recommendations?.length) && analysis.recommendations.map((rec, i) => {
                const translatedRec = translateRecommendation(rec, locale);
                return (
                  <div key={i} className="p-5 rounded-xl border" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3908' : rec.priority === 'medium' ? '#c9a96e08' : '#4a7c5908', borderColor: rec.priority === 'high' ? '#d95c3920' : rec.priority === 'medium' ? '#c9a96e20' : '#4a7c5920' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rec.category === 'warning' ? '#d95c3915' : rec.category === 'alternative' ? '#c9a96e15' : '#4a7c5915' }}>
                        {rec.category === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>}
                        {rec.category === 'alternative' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                        {rec.category === 'tip' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-deep text-sm">{translatedRec.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3915' : rec.priority === 'medium' ? '#c9a96e15' : '#4a7c5915', color: rec.priority === 'high' ? '#d95c39' : rec.priority === 'medium' ? '#c9a96e' : '#4a7c59' }}>
                            {locale === 'ko' ? (rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '보통' : '낮음') : rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-deep/60 leading-relaxed">{translatedRec.description}</p>
                        {translatedRec.source && (
                          <p className="text-[10px] text-deep/30 mt-1.5">{locale === 'ko' ? '출처: ' : 'Source: '}{translatedRec.source}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="bg-white rounded-2xl border border-deep/5 p-6">
              <p className="text-xs uppercase tracking-widest text-deep/40 mb-4">{locale === 'ko' ? `점수 산출 내역 (${analysis.overallScore}점)` : `How we got to ${analysis.overallScore}`}</p>
              <div className="space-y-2">
                {analysis.contributions.length === 0 && (
                  <p className="text-sm text-deep/50">{locale === 'ko' ? '조정 내역 없음 — 기본 점수 유지' : 'No adjustments — score equals the baseline.'}</p>
                )}
                {analysis.contributions.map((c, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-deep/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-deep">{translateContribLabel(c.label, locale)}</p>
                      <p className="text-xs text-deep/50">{translateContribReason(c.reason, locale)}</p>
                    </div>
                    <span className={`font-mono text-sm ${c.delta >= 0 ? 'text-[#4a7c59]' : 'text-[#b8301f]'}`}>
                      {c.delta >= 0 ? '+' : ''}{c.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      </>
    );
  }

  // ---- FORM VIEW ----
  return (
    <>
    <HealthGoalsModal
      isOpen={showGoalsModal}
      onClose={() => setShowGoalsModal(false)}
      onSave={(goals, allergens) => {
        healthGoals.setGoals({
          goals: goals.length > 0 ? goals : ['general'],
          allergens,
          hasCompletedSetup: true,
        });
        setShowGoalsModal(false);
      }}
    />
    <section id="analyzer" className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <div className="max-w-[1100px] mx-auto">
        <header className="text-center mb-10">
          <p className="text-caption text-terracotta mb-3">{t('an.eyebrow')}</p>
          <h1 className="text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {t('an.h1')}
          </h1>
          <p className="text-deep/60 max-w-xl mx-auto">
            {t('an.subtitle')}
          </p>
          <p className="text-xs text-deep/40 mt-3">
            {locale === 'ko'
              ? '미국 영양 정보표, EU 100g 당, 한국 식품영양성분표 모두 인식합니다.'
              : 'Works with US Nutrition Facts, EU per-100g, and Korean 식품영양성분표 panels.'}
          </p>
        </header>

        {/* Upload buttons */}
        {!uploadedImage && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 hover:border-terracotta/40 hover:bg-terracotta/3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{t('an.upload')}</span>
            </button>
            <button onClick={() => cameraInputRef.current?.click()} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 hover:border-terracotta/40 hover:bg-terracotta/3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{t('an.takePhoto')}</span>
            </button>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 bg-deep/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-[#374640]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374640" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{locale === 'ko' ? '직접 입력' : 'Enter Manually'}</span>
            </div>
          </div>
        )}

        {/* AI mode toggle + disclaimers */}
        {!uploadedImage && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setAiMode('ai-first')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  aiMode === 'ai-first'
                    ? 'bg-deep text-inverse'
                    : 'bg-white border border-deep/10 text-deep/60 hover:bg-deep/5'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                AI + OCR
              </button>
              <button
                onClick={() => setAiMode('ocr-only')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  aiMode === 'ocr-only'
                    ? 'bg-deep text-inverse'
                    : 'bg-white border border-deep/10 text-deep/60 hover:bg-deep/5'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                OCR Only
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#374640]/5 border border-[#374640]/10 text-xs text-deep/60 flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374640" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <span>
                  {aiMode === 'ai-first'
                    ? (locale === 'ko' ? 'AI가 먼저 성분표를 분석하고 판독 실패 시 OCR이 백업으로 동작합니다. 일부 오차가 있을 수 있습니다.' : 'AI analyzes the image first, with OCR as fallback. Results may need verification.')
                    : (locale === 'ko' ? '기기 자체 OCR만 사용합니다. 이미지가 외부 서버로 전송되지 않습니다.' : 'Uses local OCR only. No image is sent to external services.')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10 text-xs text-deep/60 flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>
                  {aiMode === 'ai-first'
                    ? (locale === 'ko' ? '영양 판독 목적 외의 개인정보나 관련 없는 이미지는 수집 또는 분석하지 않습니다.' : 'Images are sent to OpenRouter AI for analysis. Nutrition data only, no personal info.')
                    : (locale === 'ko' ? '브라우저 내에서 직접 판독하므로 오프라인 상태에서도 동작 가능합니다.' : 'Photos are processed entirely in your browser. Nothing is uploaded.')}
                </span>
              </div>
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCameraCapture} />

        {/* Two-column layout: image + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image + OCR status */}
          {uploadedImage && (
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-deep/5 bg-white p-3">
                <img src={uploadedImage} alt="Nutrition label" className="w-full rounded-xl object-contain max-h-[400px]" />
              </div>

              {ocrStatus === 'scanning' && (
                <div className="p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#374640]/30 border-t-[#374640] rounded-full animate-spin" />
                  <span className="text-sm text-deep/70">{t('an.processingPhoto')}</span>
                </div>
              )}
              {ocrStatus === 'done' && (
                <div className="p-4 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#4a7c59]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" fill="currentColor"/></svg>
                    <span className="text-sm font-medium text-[#4a7c59]">
                      {aiResult
                        ? (locale === 'ko' ? `AI 분석 완료 (${Math.round(aiResult.confidence * 100)}% 신뢰도)` : `AI analyzed (${Math.round(aiResult.confidence * 100)}% confidence)`)
                        : (locale === 'ko' ? `${autoFilledFields.size}개 성분 자동 입력됨` : `Auto-filled ${autoFilledFields.size} fields`)}
                    </span>
                    {aiResult && aiResult.productName && !aiResult.reasoning.includes('visible') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        {locale === 'ko' ? '제품명 추정' : 'inferred name'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-deep/50">
                    {aiResult
                      ? aiResult.reasoning || (locale === 'ko' ? '우측의 성분 값을 확인하고 수정한 뒤, 동의란에 체크하고 분석하기를 클릭하세요.' : 'Review and edit the values on the right, then check the confirmation box and click Analyze.')
                      : (locale === 'ko' ? '우측의 성분 값을 확인하고 수정한 뒤, 동의란에 체크하고 분석하기를 클릭하세요.' : 'Review and edit the values on the right, then check the confirmation box and click Analyze.')}
                  </p>
                  {aiResult && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-deep/40">{locale === 'ko' ? '출처:' : 'Source:'}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-deep/5 text-deep/60">
                        {aiResult.confidence >= 0.7 
                          ? (locale === 'ko' ? 'AI 기본 판독' : 'AI primary') 
                          : aiResult.confidence >= 0.4 
                            ? (locale === 'ko' ? 'AI + OCR 병합' : 'AI + OCR merged') 
                            : (locale === 'ko' ? 'OCR 대체' : 'OCR fallback')}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {ocrStatus === 'error' && (
                <div className="p-4 rounded-xl bg-[#d95c39]/5 border border-[#d95c39]/15">
                  <p className="text-sm text-[#d95c39] font-medium mb-1">{locale === 'ko' ? '라벨을 판독할 수 없습니다' : 'Could not read label'}</p>
                  <p className="text-xs text-deep/50">{locale === 'ko' ? '직접 영양성분 값을 입력해 주십시오.' : 'Please enter the nutrition values manually.'}</p>
                </div>
              )}

              {/* Atwater warning banner */}
              {atwaterWarning && (
                <div className="p-4 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                  <div className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                    <p className="text-xs text-deep/70 leading-relaxed">{atwaterWarning}</p>
                  </div>
                </div>
              )}

              {estimatedFields.size > 0 && (
                <div className="p-4 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                  <p className="text-xs font-medium text-deep mb-1">{locale === 'ko' ? '⚠️ 추정값 표시' : '⚠️ Estimated values'}</p>
                  <p className="text-xs text-deep/60 leading-relaxed">
                    {locale === 'ko' ? '다음 영양소는 직접 판독하지 않고 열량을 기준으로 역산출되었습니다: ' : 'The following were back-calculated from calories rather than read directly: '}
                    <strong>
                      {Array.from(estimatedFields)
                        .map(f => locale === 'ko' ? (ESTIMATED_FIELDS_LABEL_KO[f as ExtractedNutrientField] || f) : (ESTIMATED_FIELDS_LABEL[f as ExtractedNutrientField] || f))
                        .join(', ')}
                    </strong>
                    {locale === 'ko' ? '. 실제 제품 라벨과 확인해 주십시오.' : '. Please verify against the label.'}
                  </p>
                </div>
              )}

              <button onClick={() => { setUploadedImage(null); setOcrStatus('idle'); setAutoFilledFields(new Set()); setAtwaterWarning(null); setNeedsConfirmation(false); }} className="text-xs text-terracotta hover:underline">
                {locale === 'ko' ? '이미지 삭제 및 초기화' : 'Remove image & start over'}
              </button>
            </div>
          )}

          {/* Right: Form */}
          <div className={uploadedImage ? 'lg:col-span-8' : 'lg:col-span-12'}>
            {/* Profile + serving multiplier — visible always above the form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-deep/5 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-deep/40">{locale === 'ko' ? '분석 기준' : 'Score for'}</label>
                    <button
                      onClick={() => setShowGoalsModal(true)}
                      className="text-[11px] text-terracotta hover:underline flex items-center gap-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                      {locale === 'ko' ? '건강 목표' : 'Health Goals'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(locale === 'ko' ? profileOptionsKo : profileOptions).map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setProfile(opt.value)}
                        title={opt.hint}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${profile === opt.value ? 'bg-terracotta text-white' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-deep/40 mt-2">
                    {(locale === 'ko' ? profileOptionsKo : profileOptions).find(p => p.value === profile)?.hint}
                  </p>
                  {healthGoals.goals.goals.length > 0 && !healthGoals.goals.goals.includes('general') && (
                    <p className="text-[11px] text-terracotta mt-1">
                      {locale === 'ko' ? '목표' : 'Goals'}: {healthGoals.goals.goals.map(g => locale === 'ko' ? (g === 'bloodSugar' ? '혈당 조절' : g === 'heartHealth' ? '심장 건강' : g === 'weightManagement' ? '체중 관리' : g === 'lowSodium' ? '저나트륨' : g === 'highProtein' ? '고단백' : g === 'foodAllergies' ? '알레르기' : g) : (g === 'bloodSugar' ? 'Blood Sugar' : g === 'heartHealth' ? 'Heart Health' : g === 'weightManagement' ? 'Weight' : g === 'lowSodium' ? 'Low Sodium' : g === 'highProtein' ? 'High Protein' : g === 'foodAllergies' ? 'Allergies' : g)).join(', ')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-deep/40 mb-2">
                    {locale === 'ko' ? <>섭취량: <span className="text-deep">{servingMultiplier}</span>회 제공량</> : <>I'm eating <span className="text-deep">{servingMultiplier}</span> serving{servingMultiplier !== 1 ? 's' : ''}</>}
                  </label>
                  <input
                    type="range"
                    min={0.25}
                    max={4}
                    step={0.25}
                    value={servingMultiplier}
                    onChange={e => setServingMultiplier(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-deep/40 mt-1">
                    <span>¼</span><span>1</span><span>2</span><span>4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-deep/5">
              {/* Samples with thumbnails */}
              <div className="mb-6">
                <p className="text-caption text-muted-sage mb-3">{t('an.tryASample')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {samples.map(s => (
                    <button
                      key={s.name}
                      onClick={() => handleSampleSelect(s)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface hover:bg-terracotta/10 transition-all border border-deep/5 hover:border-terracotta/30 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-deep text-inverse flex items-center justify-center text-xs font-bold group-hover:bg-terracotta transition-colors">
                        {s.thumb}
                      </div>
                      <span className="text-[11px] text-deep/70 text-center leading-tight">{translateSampleName(s.name, locale)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '제품명' : 'Product Name'}</label>
                  <input type="text" value={form.productName || ''} onChange={e => updateField('productName', e.target.value)} placeholder={locale === 'ko' ? '예: 통곡물 그래놀라' : 'e.g., Organic Granola Bars'}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '식품 카테고리' : 'Food Category'}</label>
                  <select value={form.foodCategory} onChange={e => updateField('foodCategory', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40">
                    {(locale === 'ko' ? categoryOptionsKo : categoryOptions).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  {autoDetectedCategory && (
                    <p className="text-[11px] text-deep/40 mt-2">
                      {locale === 'ko' ? <>성분표에서 감지됨: <span className="text-deep font-medium">{(locale === 'ko' ? categoryOptionsKo : categoryOptions).find(o => o.value === autoDetectedCategory)?.label}</span> (틀린 경우 변경)</> : <>Detected from label: <span className="text-deep font-medium">{categoryOptions.find(o => o.value === autoDetectedCategory)?.label}</span>. Change if wrong.</>}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '1회 제공량' : 'Serving Size'}</label>
                  <input type="text" value={form.servingSize} onChange={e => updateField('servingSize', e.target.value)} placeholder={locale === 'ko' ? '예: 1컵' : 'e.g., 1 cup'}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '제공 횟수' : 'Servings / Container'}</label>
                  <input type="number" value={form.servingsPerContainer} onChange={e => updateField('servingsPerContainer', Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{t('common.calories')} <span className="text-terracotta">*</span></label>
                  <input type="number" value={form.calories || ''} onChange={e => updateField('calories', Number(e.target.value))} placeholder="0"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-terracotta/40 ${autoFilledFields.has('calories') ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' : 'border-deep/10 bg-[#f6f5f1]'}`} />
                </div>
              </div>

              {/* Macronutrients */}
              <p className="text-caption text-terracotta mb-3">
                {locale === 'ko' ? '다량 영양소 (1회 제공량)' : 'Macronutrients (per serving)'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {macroFields.filter(f => f.field !== 'calories').map(item => {
                  const isAuto = autoFilledFields.has(item.field as string);
                  const isEstimated = estimatedFields.has(item.field as string);
                  return (
                    <div key={item.field}>
                      <label className="block text-xs text-deep/60 font-medium mb-1">
                        {locale === 'ko' ? (macroFieldsKo[item.label] || item.label) : item.label} ({item.unit})
                      </label>
                      <input type="number" value={(form[item.field] as number) || ''} onChange={e => updateField(item.field, Number(e.target.value))} placeholder="0"
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-terracotta/40 ${
                          isEstimated ? 'border-[#c9a96e]/60 bg-[#c9a96e]/10' :
                          isAuto ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' :
                          'border-deep/10 bg-[#f6f5f1]'
                        }`} />
                      {isEstimated && <span className="text-[10px] text-[#c9a96e] mt-0.5 block">{locale === 'ko' ? '⚠ 추정치' : '⚠ estimated'}</span>}
                      {isAuto && !isEstimated && <span className="text-[10px] text-[#4a7c59] mt-0.5 block">{locale === 'ko' ? '자동 입력됨' : 'auto-filled'}</span>}
                    </div>
                  );
                })}
              </div>

              {/* Micronutrients */}
              <p className="text-caption text-[#374640] mb-3">
                {locale === 'ko' ? '미량 영양소 (선택)' : 'Micronutrients (optional)'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {microFields.map(item => (
                  <div key={item.field}>
                    <label className="block text-xs text-deep/60 font-medium mb-1">{locale === 'ko' ? (microFieldsKo[item.label] || item.label) : item.label} ({item.unit})</label>
                    <input type="number" value={(form[item.field] as number) || ''} onChange={e => updateField(item.field, Number(e.target.value))} placeholder="0"
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-terracotta/40 ${autoFilledFields.has(item.field as string) ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' : 'border-deep/10 bg-[#f6f5f1]'}`} />
                    {autoFilledFields.has(item.field as string) && <span className="text-[10px] text-[#4a7c59] mt-0.5 block">{locale === 'ko' ? '자동 입력됨' : 'auto-filled'}</span>}
                  </div>
                ))}
              </div>

              {/* OCR confirmation gate */}
              {needsConfirmation && (
                <div className="mb-4 p-4 rounded-xl bg-terracotta/5 border border-terracotta/30">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedOcr}
                      onChange={e => setConfirmedOcr(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-terracotta"
                    />
                    <div>
                      <p className="text-sm font-medium text-deep">{locale === 'ko' ? '자동 판독 값을 확인했습니다' : "I've reviewed the auto-read values"}</p>
                      <p className="text-xs text-deep/50 mt-0.5">
                        {locale === 'ko' ? 'OCR 판독 중 숫자 오인이나 단위 누락이 발생할 수 있습니다. 확인란에 체크하시면 수정된 값이 고정됩니다.' : 'OCR can misread digits and dropped units. Confirming locks in your edits before scoring.'}
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {proteinValidationError && (
                <div className="mb-4 p-4 rounded-xl bg-[#d95c39]/5 border border-[#d95c39]/30">
                  <div className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                    <p className="text-sm text-[#d95c39] leading-relaxed">{proteinValidationError}</p>
                  </div>
                </div>
              )}

              <button onClick={handleAnalyze} disabled={!hasData}
                className="w-full py-3 rounded-xl text-white font-medium text-sm transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#d95c39' }}
                onMouseEnter={e => { if (hasData) (e.target as HTMLElement).style.backgroundColor = '#c44e2f'; }}
                onMouseLeave={e => { if (hasData) (e.target as HTMLElement).style.backgroundColor = '#d95c39'; }}>
                {locale === 'ko' ? '영양 성분 분석하기' : 'Analyze Nutrition Label'}
              </button>

              <Link to="/methodology" className="block mt-3 text-center text-xs text-terracotta hover:underline">
                {locale === 'ko' ? '점수는 어떻게 계산되나요? 산출 방식 보기 →' : 'How is the score calculated? See methodology →'}
              </Link>

              {/* Medical disclaimer */}
              <p className="text-[11px] text-deep/40 mt-4 leading-relaxed text-center">
                {locale === 'ko' 
                  ? '의학적 조언이 아닙니다. 이 도구는 라벨 판독 검증용이며 전문 영양사나 의사의 진단을 대신할 수 없습니다.' 
                  : 'Not medical advice. This tool is a label sanity-check, not a substitute for a registered dietitian or physician.'}
                <br />
                {locale === 'ko' 
                  ? '특이 체질이나 질환(만성 신장 질환, 페닐케톤뇨증, 알레르기, 임신 등)이 있는 경우 전문가의 지침을 따르십시오.' 
                  : 'Special conditions (CKD, PKU, allergies, pregnancy) need professional guidance.'}
              </p>
            </div>

            {ocrDebug.length > 0 && (
              <div className="mt-4 p-4 rounded-xl border border-deep/5 bg-white">
                <p className="text-xs uppercase tracking-wider text-deep/40 mb-3">{locale === 'ko' ? '라벨에서 판독된 항목' : 'Detected from your label'}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ocrDebug.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-deep">{locale === 'ko' ? (macroFieldsKo[d.matched] || microFieldsKo[d.matched] || d.matched) : d.matched}:</span>
                      <span className="text-terracotta font-semibold">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
