import type { ExtractedNutrientField } from './ocrParser';

export type FoodCategory =
  | 'processed'
  | 'snack'
  | 'beverage'
  | 'dairy'
  | 'grain'
  | 'protein'
  | 'frozen'
  | 'wholeFood'
  | 'other';

export type DietaryProfile =
  | 'general'
  | 'heart'
  | 'keto'
  | 'highProtein'
  | 'lowSodium'
  | 'diabetic';

export interface NutritionFacts {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  dietaryFiber: number;
  totalSugar: number;
  addedSugar: number;
  protein: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
  vitaminDPercent?: number;
  calciumPercent?: number;
  ironPercent?: number;
  potassiumPercent?: number;
  productName?: string;
  foodCategory?: FoodCategory;
  /** Fields that were back-calculated rather than read directly from the label. */
  estimatedFields?: ExtractedNutrientField[];
}

export interface NutrientScore {
  name: string;
  value: number;
  unit: string;
  limit: number;
  percentOfLimit: number;
  status: 'good' | 'warning' | 'danger';
  /** Whether the limit is per-meal vs per-day so the UI can label clearly. */
  frame: 'meal' | 'day';
  icon: string;
}

export interface ScoreContribution {
  label: string;
  delta: number;
  reason: string;
}

export interface HealthAnalysis {
  overallScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  gradeColor: string;
  category: string;
  nutrientScores: NutrientScore[];
  positiveFactors: string[];
  negativeFactors: string[];
  recommendations: Recommendation[];
  fatRatio: number;
  fatRatioLabel: 'low' | 'moderate' | 'high';
  nutrientDensity: 'high' | 'moderate' | 'low';
  processingLevel: 'minimally' | 'moderately' | 'ultra';
  processingExplanation: string;
  isWholeFood: boolean;
  inlineAlternative?: InlineAlternative;
  contributions: ScoreContribution[];
  profile: DietaryProfile;
}

export interface Recommendation {
  title: string;
  description: string;
  category: 'alternative' | 'tip' | 'warning';
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface InlineAlternative {
  name: string;
  reason: string;
  scoreDelta: number;
  approxScore: number;
}

type NutrientWeightKey = 'saturatedFat' | 'sodium' | 'addedSugar' | 'protein' | 'fiber' | 'netCarbs';

export interface CategoryRubric {
  category: FoodCategory;
  /** Baseline score for non-whole-food items in this category. */
  baseline: number;
  /** Whether low fiber should count as a negative for this category. */
  penalizeLowFiber: boolean;
  /** Whether this category expects meaningful protein (used for validation + scoring guards). */
  expectsProtein: boolean;
  /** Multiply profile weights by these per-category modifiers. */
  weightMultipliers: Record<NutrientWeightKey, number>;
}

const RDI = {
  totalFat: 78,
  saturatedFat: 13,
  transFat: 0,
  cholesterol: 300,
  sodium: 2300,
  totalCarbs: 275,
  dietaryFiber: 28,
  addedSugar: 50,
  protein: 50,
  vitaminD: 20,
  calcium: 1300,
  iron: 18,
  potassium: 4700,
};

const PER_MEAL_CALORIE_TARGET = 600;

export function inferFoodCategory(data: Pick<NutritionFacts, 'productName' | 'servingSize'>): FoodCategory {
  const name = (data.productName || '').toLowerCase();
  const serving = (data.servingSize || '').toLowerCase();
  const text = `${name} ${serving}`;

  // Beverage signals: common drink words + volume units.
  if (
    /\b(diet|zero|cola|coke|soda|sparkling|seltzer|water|juice|tea|coffee|drink|beverage|energy)\b/.test(text) ||
    /\b(fl oz|oz|ml|l)\b/.test(text)
  ) {
    return 'beverage';
  }

  if (/\b(chip|crisp|cracker|cookie|bar|snack)\b/.test(text)) return 'snack';
  if (/\b(pizza|frozen|microwave)\b/.test(text)) return 'frozen';
  if (/\b(milk|yogurt|cheese|cottage)\b/.test(text)) return 'dairy';
  if (/\b(bread|grain|cereal|oat|quinoa|rice)\b/.test(text)) return 'grain';
  if (/\b(chicken|turkey|beef|pork|lamb|fish|salmon|tuna|egg|tofu|tempeh|protein)\b/.test(text)) return 'protein';

  return 'other';
}

export function resolveCategory(data: NutritionFacts): FoodCategory {
  if (data.foodCategory && data.foodCategory !== 'other') return data.foodCategory;
  const inferred = inferFoodCategory({ productName: data.productName, servingSize: data.servingSize });
  return inferred === 'other' ? (data.foodCategory ?? 'other') : inferred;
}

function categoryRubric(category: FoodCategory): CategoryRubric {
  switch (category) {
    case 'beverage':
      // Beverages should not be penalized for fiber/protein absence; sugar is the main driver.
      return {
        category,
        baseline: 60,
        penalizeLowFiber: false,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 0.6, sodium: 1.2, addedSugar: 1.5, protein: 0.0, fiber: 0.0, netCarbs: 1.3 },
      };
    case 'snack':
      return {
        category,
        baseline: 50,
        penalizeLowFiber: true,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 1.1, sodium: 1.1, addedSugar: 1.1, protein: 0.8, fiber: 1.0, netCarbs: 1.0 },
      };
    case 'grain':
      return {
        category,
        baseline: 50,
        penalizeLowFiber: true,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.2, protein: 0.9, fiber: 1.2, netCarbs: 1.0 },
      };
    case 'protein':
      return {
        category,
        baseline: 50,
        penalizeLowFiber: false,
        expectsProtein: true,
        weightMultipliers: { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.0, protein: 1.2, fiber: 0.0, netCarbs: 0.8 },
      };
    case 'dairy':
      return {
        category,
        baseline: 50,
        penalizeLowFiber: false,
        expectsProtein: true,
        weightMultipliers: { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.0, protein: 1.1, fiber: 0.0, netCarbs: 0.9 },
      };
    case 'frozen':
    case 'processed':
      return {
        category,
        baseline: 50,
        penalizeLowFiber: true,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 1.2, sodium: 1.3, addedSugar: 1.2, protein: 0.9, fiber: 1.0, netCarbs: 1.0 },
      };
    case 'wholeFood':
      return {
        category,
        baseline: 65,
        penalizeLowFiber: false,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.0, protein: 1.0, fiber: 0.8, netCarbs: 1.0 },
      };
    default:
      return {
        category: 'other',
        baseline: 50,
        penalizeLowFiber: true,
        expectsProtein: false,
        weightMultipliers: { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.0, protein: 1.0, fiber: 1.0, netCarbs: 1.0 },
      };
  }
}

function calcPercent(value: number, limit: number): number {
  if (limit === 0) return value > 0 ? 999 : 0;
  return Math.round((value / limit) * 100);
}

function getStatus(percent: number, nutrientType: 'limit' | 'target' = 'limit'): 'good' | 'warning' | 'danger' {
  if (nutrientType === 'limit') {
    if (percent <= 10) return 'good';
    if (percent <= 25) return 'warning';
    return 'danger';
  }
  if (percent >= 20) return 'good';
  if (percent >= 10) return 'warning';
  return 'danger';
}

function getCalorieStatus(calories: number, target: number): 'good' | 'warning' | 'danger' {
  if (calories <= target * 0.5) return 'good';
  if (calories <= target) return 'warning';
  return 'danger';
}

function getMicronutrientPercent(value: number | undefined, percentDv: number | undefined, dailyValue: number): number {
  if (percentDv !== undefined && percentDv > 0) return Math.round(percentDv);
  if (value !== undefined && value > 0) return calcPercent(value, dailyValue);
  return 0;
}

/**
 * A "whole food" is a single-ingredient, minimally-processed item like ground
 * chicken, plain Greek yogurt, raw spinach, or steel-cut oats. These should not
 * be penalized for missing fiber (meat) or zero protein (vegetables) — we use
 * a separate, gentler rubric.
 */
function isLikelyWholeFood(data: NutritionFacts): boolean {
  if (data.foodCategory === 'wholeFood') return true;

  const nameLower = (data.productName || '').toLowerCase();
  const wholeFoodKeywords = [
    'ground chicken', 'ground turkey', 'ground beef', 'chicken breast',
    'salmon', 'tuna', 'cod', 'tilapia', 'shrimp',
    'spinach', 'kale', 'broccoli', 'cauliflower', 'carrot', 'apple', 'banana',
    'almonds', 'walnuts', 'cashews', 'peanuts', 'avocado',
    'plain yogurt', 'plain greek', 'cottage cheese', 'eggs', 'egg whites',
    'oats', 'rolled oats', 'steel cut', 'brown rice', 'quinoa', 'lentils',
    'black beans', 'chickpeas', 'kidney beans', 'tofu', 'tempeh',
  ];
  if (wholeFoodKeywords.some(k => nameLower.includes(k))) return true;

  // Heuristic: minimal additives (low sugar, low sodium, no trans fat) +
  // meaningful protein or carbs from a non-processed category.
  const looksMinimal =
    data.addedSugar <= 1 &&
    data.sodium <= 200 &&
    data.transFat === 0 &&
    (data.foodCategory === 'protein' || data.foodCategory === 'dairy' || data.foodCategory === 'grain');

  return looksMinimal;
}

function profileWeight(profile: DietaryProfile): {
  saturatedFat: number;
  sodium: number;
  addedSugar: number;
  protein: number;
  fiber: number;
  netCarbs: number;
} {
  switch (profile) {
    case 'heart':
      return { saturatedFat: 1.4, sodium: 1.4, addedSugar: 1.2, protein: 1.0, fiber: 1.2, netCarbs: 1.0 };
    case 'keto':
      return { saturatedFat: 0.8, sodium: 1.0, addedSugar: 1.5, protein: 1.2, fiber: 1.1, netCarbs: 1.6 };
    case 'highProtein':
      return { saturatedFat: 0.9, sodium: 1.0, addedSugar: 1.0, protein: 1.6, fiber: 1.0, netCarbs: 0.9 };
    case 'lowSodium':
      return { saturatedFat: 1.0, sodium: 1.8, addedSugar: 1.0, protein: 1.0, fiber: 1.0, netCarbs: 1.0 };
    case 'diabetic':
      return { saturatedFat: 1.1, sodium: 1.2, addedSugar: 1.6, protein: 1.1, fiber: 1.3, netCarbs: 1.5 };
    default:
      return { saturatedFat: 1.0, sodium: 1.0, addedSugar: 1.0, protein: 1.0, fiber: 1.0, netCarbs: 1.0 };
  }
}

function applyCategoryWeights(
  base: ReturnType<typeof profileWeight>,
  rubric: CategoryRubric,
): ReturnType<typeof profileWeight> {
  return {
    saturatedFat: base.saturatedFat * rubric.weightMultipliers.saturatedFat,
    sodium: base.sodium * rubric.weightMultipliers.sodium,
    addedSugar: base.addedSugar * rubric.weightMultipliers.addedSugar,
    protein: base.protein * rubric.weightMultipliers.protein,
    fiber: base.fiber * rubric.weightMultipliers.fiber,
    netCarbs: base.netCarbs * rubric.weightMultipliers.netCarbs,
  };
}

function gradeColorFor(grade: 'A' | 'B' | 'C' | 'D' | 'F'): string {
  switch (grade) {
    case 'A': return '#4a7c59';
    case 'B': return '#6b8f5e';
    case 'C': return '#c9a96e';
    case 'D': return '#e08a4a'; // amber for D — not blood red
    case 'F': return '#b8301f';
  }
}

function computeInlineAlternative(
  data: NutritionFacts,
  baseScore: number,
  isWholeFood: boolean,
): InlineAlternative | undefined {
  const name = (data.productName || '').toLowerCase();

  if (isWholeFood) return undefined; // whole foods rarely need a swap

  if (resolveCategory(data) === 'beverage') {
    // Keep alternatives within beverages: sugar-first swaps.
    if (data.addedSugar >= 10 || data.totalSugar >= 10) {
      return {
        name: 'Diet / zero-sugar version (or sparkling water)',
        reason: 'Same beverage format with dramatically less sugar.',
        scoreDelta: Math.max(20, 80 - baseScore),
        approxScore: 82,
      };
    }
    if (data.addedSugar === 0 && data.calories <= 5) {
      return {
        name: 'Sparkling water or unsweetened iced tea',
        reason: 'Similar refreshment without sweeteners or added sugar.',
        scoreDelta: Math.max(5, 85 - baseScore),
        approxScore: 85,
      };
    }
  }

  if (data.addedSugar >= 10 || /cereal|granola/.test(name)) {
    return {
      name: 'Plain rolled oats + fresh fruit',
      reason: 'Same warm-bowl feel, with no added sugar and 4g fiber per serving.',
      scoreDelta: Math.max(15, 80 - baseScore),
      approxScore: 82,
    };
  }
  if (data.sodium >= 700 || /pizza|frozen meal|microwave/.test(name)) {
    return {
      name: 'Stir-fry: frozen veg + rotisserie chicken + brown rice',
      reason: 'Cuts sodium roughly in half and adds 6g+ fiber in 15 minutes.',
      scoreDelta: 25,
      approxScore: 78,
    };
  }
  if (/chip|crisp|cracker|snack/.test(name)) {
    return {
      name: 'Roasted chickpeas or unsalted almonds',
      reason: 'Same crunch, ~3× the protein and meaningful fiber.',
      scoreDelta: 18,
      approxScore: 76,
    };
  }
  if (data.saturatedFat >= 6 || /sausage|bacon|pepperoni/.test(name)) {
    return {
      name: 'Ground chicken breast / 93% lean turkey',
      reason: '70% less saturated fat, similar protein.',
      scoreDelta: 20,
      approxScore: 80,
    };
  }
  return undefined;
}

export function analyzeNutritionLabel(
  data: NutritionFacts,
  options: { profile?: DietaryProfile; servingMultiplier?: number } = {},
): HealthAnalysis {
  const profile = options.profile ?? 'general';
  const servingRatio = options.servingMultiplier ?? 1;
  const category = resolveCategory(data);
  const rubric = categoryRubric(category);
  const weights = applyCategoryWeights(profileWeight(profile), rubric);
  const isWholeFood = isLikelyWholeFood(data);

  const calories = data.calories * servingRatio;
  const totalFat = data.totalFat * servingRatio;
  const saturatedFat = data.saturatedFat * servingRatio;
  const transFat = data.transFat * servingRatio;
  const cholesterol = data.cholesterol * servingRatio;
  const sodium = data.sodium * servingRatio;
  const totalCarbs = data.totalCarbs * servingRatio;
  const dietaryFiber = data.dietaryFiber * servingRatio;
  const totalSugar = data.totalSugar * servingRatio;
  const addedSugar = data.addedSugar * servingRatio;
  const protein = data.protein * servingRatio;

  const scores: NutrientScore[] = [];
  const positiveFactors: string[] = [];
  const negativeFactors: string[] = [];
  const recommendations: Recommendation[] = [];
  const contributions: ScoreContribution[] = [];

  // 0. Calories — labelled as a meal frame so it doesn't read as "% of daily"
  const caloriePct = calcPercent(calories, PER_MEAL_CALORIE_TARGET);
  scores.push({
    name: 'Calories',
    value: Math.round(calories),
    unit: '',
    limit: PER_MEAL_CALORIE_TARGET,
    percentOfLimit: caloriePct,
    status: getCalorieStatus(calories, PER_MEAL_CALORIE_TARGET),
    frame: 'meal',
    icon: 'Cal',
  });
  if (calories > 600) negativeFactors.push(`High calorie serving (${Math.round(calories)} cal)`);
  else if (calories > 0 && calories <= 350) positiveFactors.push('Moderate calorie serving');

  // 1. Saturated Fat
  const satFatPct = calcPercent(saturatedFat, RDI.saturatedFat);
  scores.push({
    name: 'Saturated Fat', value: saturatedFat, unit: 'g', limit: RDI.saturatedFat,
    percentOfLimit: satFatPct, status: getStatus(satFatPct, 'limit'), frame: 'day', icon: 'SF',
  });
  if (satFatPct > 25) {
    negativeFactors.push(`High in saturated fat (${satFatPct}% of daily limit per serving)`);
    recommendations.push({
      title: 'Choose Lower-Saturated-Fat Options',
      description: 'Look for products with under 2g saturated fat per serving. Plant-based fats (nuts, seeds, avocado, olive oil) are healthier substitutes.',
      category: 'alternative', priority: 'high', icon: 'swap',
    });
  }

  // 2. Trans Fat — non-negotiable
  if (transFat > 0) {
    scores.push({
      name: 'Trans Fat', value: transFat, unit: 'g', limit: RDI.transFat,
      percentOfLimit: 999, status: 'danger', frame: 'day', icon: 'TF',
    });
    negativeFactors.push('Contains trans fats — strongly linked to cardiovascular disease');
    recommendations.push({
      title: 'Avoid Trans Fats Completely',
      description: 'WHO recommends eliminating industrial trans fats from the food supply. Check ingredients for "partially hydrogenated oils."',
      category: 'warning', priority: 'high', icon: 'alert',
    });
  }

  // 3. Sodium
  const sodiumPct = calcPercent(sodium, RDI.sodium);
  scores.push({
    name: 'Sodium', value: Math.round(sodium), unit: 'mg', limit: RDI.sodium,
    percentOfLimit: sodiumPct, status: getStatus(sodiumPct, 'limit'), frame: 'day', icon: 'Na',
  });
  if (sodiumPct > 20) {
    negativeFactors.push(`High sodium (${sodiumPct}% of daily limit per serving)`);
    if (sodiumPct > 40) {
      recommendations.push({
        title: 'Seek Low-Sodium Options',
        description: `${Math.round(sodium)}mg per serving. AHA's ideal daily limit is 1,500mg. Look for "low sodium" (≤140mg/serving).`,
        category: 'alternative', priority: 'high', icon: 'swap',
      });
    }
  }

  // 3b. Cholesterol — modernized: 2015 US Dietary Guidelines dropped the 300mg
  // cap; cholesterol is no longer a primary negative. We track it but apply
  // only a small penalty at extremes and don't surface it as alarmist for
  // whole foods (eggs, shellfish).
  const cholesterolPct = calcPercent(cholesterol, RDI.cholesterol);
  scores.push({
    name: 'Cholesterol', value: Math.round(cholesterol), unit: 'mg', limit: RDI.cholesterol,
    percentOfLimit: cholesterolPct, status: cholesterolPct > 60 ? 'warning' : 'good', frame: 'day', icon: 'Ch',
  });
  // No factor surfaced unless extreme + ultra-processed context.

  // 4. Added Sugar
  const sugarPct = calcPercent(addedSugar, RDI.addedSugar);
  scores.push({
    name: 'Added Sugar', value: addedSugar, unit: 'g', limit: RDI.addedSugar,
    percentOfLimit: sugarPct, status: getStatus(sugarPct, 'limit'), frame: 'day', icon: 'SU',
  });
  if (sugarPct > 20) {
    negativeFactors.push(`High added sugar (${sugarPct}% of daily limit per serving)`);
    recommendations.push({
      title: 'Reduce Added Sugar',
      description: 'Excess added sugar is linked to obesity, type 2 diabetes, and heart disease. Choose unsweetened versions or fruit-sweetened alternatives.',
      category: 'alternative', priority: 'high', icon: 'swap',
    });
  }
  if (addedSugar === 0 && totalSugar <= 5) {
    positiveFactors.push('No added sugars — great for blood-sugar control');
  }

  if (totalSugar > 0) {
    const totalSugarPct = calcPercent(totalSugar, RDI.addedSugar);
    scores.push({
      name: 'Total Sugar', value: totalSugar, unit: 'g', limit: RDI.addedSugar,
      percentOfLimit: totalSugarPct, status: getStatus(totalSugarPct, 'limit'), frame: 'day', icon: 'TS',
    });
  }

  // 5. Fiber — no penalty for animal whole foods which naturally lack fiber
  const fiberPct = calcPercent(dietaryFiber, RDI.dietaryFiber);
  scores.push({
    name: 'Dietary Fiber', value: dietaryFiber, unit: 'g', limit: RDI.dietaryFiber,
    percentOfLimit: fiberPct, status: getStatus(fiberPct, 'target'), frame: 'day', icon: 'FB',
  });
  if (fiberPct >= 20) positiveFactors.push(`Excellent fiber content (${fiberPct}% of daily needs)`);
  else if (fiberPct >= 10) positiveFactors.push('Good source of dietary fiber');
  else if (dietaryFiber < 2 && !isWholeFood && rubric.penalizeLowFiber) {
    negativeFactors.push('Low in fiber — average intake already falls short of recommendations');
    recommendations.push({
      title: 'Add Fiber-Rich Foods',
      description: 'Choose whole grains with ≥3g fiber per serving and add legumes, fruits, and vegetables.',
      category: 'tip', priority: 'medium', icon: 'plus',
    });
  }

  // 6. Protein
  const proteinPct = calcPercent(protein, RDI.protein);
  scores.push({
    name: 'Protein', value: protein, unit: 'g', limit: RDI.protein,
    percentOfLimit: proteinPct, status: getStatus(proteinPct, 'target'), frame: 'day', icon: 'PR',
  });
  if (proteinPct >= 20) positiveFactors.push(`High protein content (${proteinPct}% of daily needs)`);

  // 7. Total Fat — informational, not penalized for whole foods
  const totalFatPct = calcPercent(totalFat, RDI.totalFat);
  scores.push({
    name: 'Total Fat', value: totalFat, unit: 'g', limit: RDI.totalFat,
    percentOfLimit: totalFatPct, status: getStatus(totalFatPct, 'limit'), frame: 'day', icon: 'TF',
  });

  if (totalCarbs > 0) {
    const carbPct = calcPercent(totalCarbs, RDI.totalCarbs);
    scores.push({
      name: 'Total Carbs', value: totalCarbs, unit: 'g', limit: RDI.totalCarbs,
      percentOfLimit: carbPct, status: getStatus(carbPct, 'limit'), frame: 'day', icon: 'CB',
    });
  }

  // Micronutrient picture
  const calciumPct = getMicronutrientPercent(data.calcium, data.calciumPercent, RDI.calcium);
  const ironPct = getMicronutrientPercent(data.iron, data.ironPercent, RDI.iron);
  const vitaminDPct = getMicronutrientPercent(data.vitaminD, data.vitaminDPercent, RDI.vitaminD);
  const potassiumPct = getMicronutrientPercent(data.potassium, data.potassiumPercent, RDI.potassium);
  const micronutrientPct = Math.max(calciumPct, ironPct, vitaminDPct, potassiumPct);
  const hasVitamins = micronutrientPct > 0;
  if (hasVitamins) positiveFactors.push('Contains essential vitamins and/or minerals');

  // ====================================================================
  // SCORING
  // ====================================================================
  // Whole foods get a more generous baseline; ultra-processed foods get a
  // tougher one. This is the core fix for "Grade D ground chicken." The
  // baseline already accounts for the whole-food advantage — we don't stack
  // a separate whole-food bonus on top.
  let score = isWholeFood ? 65 : rubric.baseline;

  const add = (label: string, delta: number, reason: string) => {
    if (delta === 0) return;
    score += delta;
    contributions.push({ label, delta, reason });
  };

  // Calorie deductions (gentler for whole foods)
  if (calories > 700) add('Very high calories', -10, '> 700 cal per serving');
  else if (calories > 500 && !isWholeFood) add('High calories', -6, '> 500 cal per serving');

  // Trans fat — always severe
  if (transFat > 0) add('Trans fat present', -22, 'Industrial trans fats raise CVD risk');

  // Saturated fat penalties scaled by profile
  if (satFatPct > 50) add('Very high saturated fat', Math.round(-14 * weights.saturatedFat), `${satFatPct}% of daily limit`);
  else if (satFatPct > 25) add('High saturated fat', Math.round(-7 * weights.saturatedFat), `${satFatPct}% of daily limit`);

  // Sodium penalties (heavily up-weighted for low-sodium / heart profile)
  if (sodiumPct > 50) add('Very high sodium', Math.round(-14 * weights.sodium), `${sodiumPct}% of daily limit`);
  else if (sodiumPct > 25) add('High sodium', Math.round(-7 * weights.sodium), `${sodiumPct}% of daily limit`);
  else if (sodiumPct < 7 && sodium > 0) add('Low sodium', 3, 'Sodium ≤ 160mg per serving');

  // Cholesterol — modernized: only penalize the extreme combo of high
  // dietary cholesterol AND high saturated fat (the actually concerning pair).
  if (cholesterolPct > 100 && satFatPct > 25) {
    add('Very high cholesterol with high saturated fat', -6, 'Combined CVD risk profile');
  }

  // Added sugar (heavily up-weighted for diabetic / keto profiles)
  if (sugarPct > 50) add('Very high added sugar', Math.round(-16 * weights.addedSugar), `${sugarPct}% of daily limit`);
  else if (sugarPct > 25) add('High added sugar', Math.round(-10 * weights.addedSugar), `${sugarPct}% of daily limit`);
  else if (sugarPct > 10) add('Moderate added sugar', Math.round(-4 * weights.addedSugar), `${sugarPct}% of daily limit`);
  // Reward "no added sugar" only on foods where it's a real signal of restraint
  // (i.e. anything that isn't a whole food — a piece of meat trivially has 0
  // added sugar and shouldn't get a free +5 just for that).
  if (addedSugar === 0 && !isWholeFood) add('No added sugar', Math.round(5 * weights.addedSugar), 'Zero added sugar declared');

  // Net-carb consideration for keto / diabetic profiles
  const netCarbs = Math.max(0, totalCarbs - dietaryFiber);
  if ((profile === 'keto' || profile === 'diabetic') && netCarbs > 25) {
    add('High net carbs', Math.round(-8 * weights.netCarbs), `${Math.round(netCarbs)}g net carbs per serving`);
  }

  // Fiber bonus
  if (rubric.penalizeLowFiber) {
    if (dietaryFiber >= 5) add('Excellent fiber', Math.round(12 * weights.fiber), `${dietaryFiber}g fiber per serving`);
    else if (dietaryFiber >= 3) add('Good fiber', Math.round(7 * weights.fiber), `${dietaryFiber}g fiber per serving`);
  }

  // Protein bonus (huge for highProtein, normal otherwise)
  if (protein >= 20) add('High protein', Math.round(10 * weights.protein), `${protein}g protein per serving`);
  else if (protein >= 10) add('Good protein', Math.round(6 * weights.protein), `${protein}g protein per serving`);
  else if (protein >= 5) add('Some protein', Math.round(3 * weights.protein), `${protein}g protein per serving`);

  // Whole-food protein-category guard (non-blocking — already covered by
  // confirmation step, but if it slips through we don't want to award a free
  // "no added sugar" bonus for an obviously bogus-looking meat reading).
  if (resolveCategory(data) === 'protein' && protein < 5 && !isWholeFood) {
    add('Implausibly low protein for protein category', -5, 'Verify the protein value');
  }

  // Micronutrients
  if (micronutrientPct >= 25) add('Strong micronutrient profile', 8, `Up to ${micronutrientPct}% DV`);
  else if (micronutrientPct >= 10) add('Some micronutrients', 4, `Up to ${micronutrientPct}% DV`);

  // Trans-fat-free explicit bonus (small) — only for processed foods where
  // it's a meaningful signal. Whole foods don't get rewarded for not having
  // an additive that whole foods never have.
  if (transFat === 0 && !isWholeFood) add('No trans fat', 2, 'Zero trans fat declared');

  // === Fat ratio (renamed from "calorie density") ===
  const calFromFat = totalFat * 9;
  const fatRatio = calories > 0 ? calFromFat / calories : 0;
  let fatRatioLabel: 'low' | 'moderate' | 'high' = 'moderate';
  if (fatRatio > 0.6) fatRatioLabel = 'high';
  else if (fatRatio < 0.25) fatRatioLabel = 'low';

  // Only treat fat ratio as a NEGATIVE when paired with high saturated fat.
  // A high fat ratio on a whole low-carb food (avocado, salmon, ground chicken)
  // is not inherently bad.
  if (fatRatioLabel === 'high' && satFatPct > 25 && !isWholeFood) {
    add('High fat ratio with high saturated fat', -4, `${Math.round(fatRatio * 100)}% of calories from fat`);
    negativeFactors.push(`High fat ratio — ${Math.round(fatRatio * 100)}% of calories from fat (mostly saturated)`);
  } else if (fatRatioLabel === 'low' && dietaryFiber > 3) {
    positiveFactors.push('Low fat ratio with good fiber');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  // Grade — tied to amber-zone gauge (40-60 = amber, <40 = red)
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let gradeCategory: string;
  if (score >= 85) { grade = 'A'; gradeCategory = 'Excellent Choice'; }
  else if (score >= 70) { grade = 'B'; gradeCategory = 'Good Choice'; }
  else if (score >= 55) { grade = 'C'; gradeCategory = 'Moderate — Room for Improvement'; }
  else if (score >= 40) { grade = 'D'; gradeCategory = 'Consider Alternatives'; }
  else { grade = 'F'; gradeCategory = 'Avoid Regular Consumption'; }
  const gradeColor = gradeColorFor(grade);

  // Processing level + explanation
  let processingLevel: 'minimally' | 'moderately' | 'ultra';
  let processingExplanation: string;
  if (isWholeFood && transFat === 0 && addedSugar <= 1 && sodium <= 200) {
    processingLevel = 'minimally';
    processingExplanation = 'Looks like a single-ingredient whole food (or close to it).';
    positiveFactors.push('Minimally processed — closer to whole food');
  } else if (transFat > 0 || addedSugar > 10 || sodium > 500) {
    processingLevel = 'ultra';
    processingExplanation = 'Ultra-processed: contains trans fats, high added sugar, or high sodium.';
    if (score >= 55) {
      recommendations.push({
        title: 'Limit Ultra-Processed Foods',
        description: 'Regular consumption of ultra-processed foods is linked with higher risk of obesity, heart disease, and type 2 diabetes. Prioritize whole foods.',
        category: 'warning', priority: 'high', icon: 'alert',
      });
    }
  } else if (addedSugar > 5 || sodium > 200) {
    processingLevel = 'moderately';
    processingExplanation = 'Moderately processed: some added sugar or salt.';
  } else {
    processingLevel = 'minimally';
    processingExplanation = 'Few signs of heavy processing.';
    positiveFactors.push('Minimally processed — closer to whole food');
  }

  const nutrientDensity = score >= 70 ? 'high' : score >= 50 ? 'moderate' : 'low';

  if (score < 50) {
    if (category === 'beverage') {
      recommendations.push({
        title: 'Choose a Lower-Sugar Drink',
        description: 'Swap sugary sodas and juices for diet/zero-sugar versions, sparkling water, or unsweetened tea.',
        category: 'alternative', priority: 'high', icon: 'swap',
      });
    } else if (category === 'snack') {
      recommendations.push({
        title: 'Choose a Better Snack',
        description: 'Try roasted chickpeas, unsalted nuts, or whole-grain crackers with ≥3g fiber instead of highly processed snacks.',
        category: 'alternative', priority: 'high', icon: 'swap',
      });
    } else if (category === 'protein') {
      recommendations.push({
        title: 'Choose a Leaner Protein',
        description: 'Look for 93% lean poultry, fish, or plant proteins with less saturated fat per serving.',
        category: 'alternative', priority: 'high', icon: 'swap',
      });
    } else {
      recommendations.push({
        title: 'Choose Whole Food Alternatives',
        description: 'Replace this with fresh fruits, vegetables, whole grains, lean proteins, or nuts. Whole foods provide more nutrients per calorie.',
        category: 'alternative', priority: 'high', icon: 'leaf',
      });
    }
  }

  if (sodium > 300 && !recommendations.find(r => r.title.includes('Sodium'))) {
    recommendations.push({
      title: 'Watch Your Sodium Stack',
      description: category === 'beverage'
        ? 'Sodium from drinks adds up across the day. Pair with lower-sodium meals when possible.'
        : 'Multiple servings or paired foods compound sodium quickly. Aim for meals totaling under 700mg.',
      category: 'tip', priority: 'medium', icon: 'tip',
    });
  }

  if (score >= 70) {
    if (category === 'beverage') {
      recommendations.push({
        title: 'Solid Choice Within Beverages',
        description: 'For everyday hydration, plain water or unsweetened tea are the lightest options.',
        category: 'tip', priority: 'low', icon: 'check',
      });
    } else {
      recommendations.push({
        title: 'Solid Nutritious Choice',
        description: 'This product fits a healthy diet. Pair with a variety of vegetables, fruits, and whole grains.',
        category: 'tip', priority: 'low', icon: 'check',
      });
    }
  }

  const inlineAlternative = computeInlineAlternative(data, score, isWholeFood);

  return {
    overallScore: score,
    grade,
    gradeColor,
    category: gradeCategory,
    nutrientScores: scores,
    positiveFactors,
    negativeFactors,
    recommendations,
    fatRatio,
    fatRatioLabel,
    nutrientDensity,
    processingLevel,
    processingExplanation,
    isWholeFood,
    inlineAlternative,
    contributions,
    profile,
  };
}

export function getSampleProducts(): { name: string; category: string; thumb: string; data: NutritionFacts }[] {
  return [
    {
      name: 'Plain Greek Yogurt',
      category: 'dairy',
      thumb: 'GY',
      data: {
        productName: 'Greek Yogurt (Plain, Non-Fat)',
        foodCategory: 'dairy',
        servingSize: '1 cup (227g)',
        servingsPerContainer: 1,
        calories: 130,
        totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 10, sodium: 80,
        totalCarbs: 9, dietaryFiber: 0, totalSugar: 6, addedSugar: 0, protein: 22,
        calcium: 250, potassium: 350,
      },
    },
    {
      name: 'Sugary Cereal',
      category: 'grain',
      thumb: 'CR',
      data: {
        productName: 'Sugary Breakfast Cereal',
        foodCategory: 'processed',
        servingSize: '1 cup (40g)',
        servingsPerContainer: 12,
        calories: 150,
        totalFat: 1.5, saturatedFat: 0.5, transFat: 0, cholesterol: 0, sodium: 210,
        totalCarbs: 34, dietaryFiber: 1, totalSugar: 15, addedSugar: 14, protein: 2,
        calcium: 100, iron: 8,
      },
    },
    {
      name: 'Frozen Pepperoni Pizza',
      category: 'frozen',
      thumb: 'PZ',
      data: {
        productName: 'Frozen Pepperoni Pizza',
        foodCategory: 'frozen',
        servingSize: '1/4 pizza (150g)',
        servingsPerContainer: 4,
        calories: 380,
        totalFat: 18, saturatedFat: 8, transFat: 0, cholesterol: 35, sodium: 850,
        totalCarbs: 38, dietaryFiber: 2, totalSugar: 5, addedSugar: 2, protein: 16,
        calcium: 200, iron: 2, potassium: 280,
      },
    },
    {
      name: 'Ground Chicken (Regression)',
      category: 'protein',
      thumb: 'GC',
      data: {
        productName: 'Ground Chicken, 93% Lean',
        foodCategory: 'wholeFood',
        servingSize: '4 oz (112g)',
        servingsPerContainer: 4,
        calories: 170,
        totalFat: 9, saturatedFat: 2.5, transFat: 0, cholesterol: 75, sodium: 75,
        totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 22,
      },
    },
    {
      name: 'Quinoa Bowl',
      category: 'grain',
      thumb: 'QB',
      data: {
        productName: 'Quinoa Salad Bowl',
        foodCategory: 'grain',
        servingSize: '1 bowl (300g)',
        servingsPerContainer: 1,
        calories: 320,
        totalFat: 12, saturatedFat: 1.5, transFat: 0, cholesterol: 0, sodium: 180,
        totalCarbs: 45, dietaryFiber: 8, totalSugar: 4, addedSugar: 0, protein: 12,
        calcium: 60, iron: 4, potassium: 620,
      },
    },
  ];
}

/**
 * Categories whose products MUST have plausible protein values before scoring
 * (the "Grade D ground chicken" guard).
 */
export function requiresProteinConfirmation(data: NutritionFacts): boolean {
  const category = resolveCategory(data);
  const rubric = categoryRubric(category);
  if (rubric.expectsProtein) return data.protein < 3;
  const name = (data.productName || '').toLowerCase();
  const proteinKeywords = [
    'chicken', 'turkey', 'beef', 'pork', 'lamb', 'salmon', 'tuna', 'fish',
    'egg', 'milk', 'yogurt', 'cheese', 'tofu', 'tempeh', 'edamame',
    'lentil', 'beans', 'chickpea', 'protein',
  ];
  if (proteinKeywords.some(k => name.includes(k))) {
    return data.protein < 3;
  }
  return false;
}
