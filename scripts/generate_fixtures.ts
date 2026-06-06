/**
 * Generates regression-test fixtures for the Health Index scoring engine by
 * calling the canonical TypeScript `analyzeNutritionLabel` and recording each
 * (input, output) pair. The mobile Dart port asserts byte-identical numeric
 * output against this file — that's the guard against silent scoring drift.
 *
 * Run: `npx tsx scripts/generate_fixtures.ts` from the repo root.
 * Output: `scripts/fixtures.json` — copied into the mobile project's
 *         `test/domain/scoring/fixtures/web_outputs.json`.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  analyzeNutritionLabel,
  getSampleProducts,
  type DietaryProfile,
  type NutritionFacts,
} from '../src/lib/nutritionAnalyzer';

interface FixtureCase {
  label: string;
  input: {
    data: NutritionFacts;
    options: { profile?: DietaryProfile; servingMultiplier?: number };
  };
  output: ReturnType<typeof analyzeNutritionLabel>;
}

const cases: { label: string; data: NutritionFacts; options?: { profile?: DietaryProfile; servingMultiplier?: number } }[] = [];

// 1. The 5 canonical sample products from getSampleProducts().
for (const sample of getSampleProducts()) {
  cases.push({ label: `sample:${sample.name}`, data: sample.data });
}

// 2. The same 5 samples, scored under every dietary profile, to capture
//    profile-weight interactions.
const profiles: DietaryProfile[] = ['heart', 'keto', 'highProtein', 'lowSodium', 'diabetic'];
for (const sample of getSampleProducts()) {
  for (const profile of profiles) {
    cases.push({
      label: `sample:${sample.name}|profile:${profile}`,
      data: sample.data,
      options: { profile },
    });
  }
}

// 3. Edge-case products that exercise specific scoring rules.

// Trans fat present — heavy penalty (-22).
cases.push({
  label: 'edge:trans_fat_present',
  data: {
    productName: 'Old-school margarine',
    foodCategory: 'processed',
    servingSize: '1 tbsp (14g)',
    servingsPerContainer: 32,
    calories: 100,
    totalFat: 11, saturatedFat: 2, transFat: 1.5, cholesterol: 0, sodium: 90,
    totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
  },
});

// Very high sodium — hits the -14 penalty rung.
cases.push({
  label: 'edge:very_high_sodium',
  data: {
    productName: 'Instant ramen',
    foodCategory: 'processed',
    servingSize: '1 packet (85g)',
    servingsPerContainer: 1,
    calories: 380,
    totalFat: 14, saturatedFat: 7, transFat: 0, cholesterol: 0, sodium: 1820,
    totalCarbs: 52, dietaryFiber: 2, totalSugar: 2, addedSugar: 0, protein: 8,
  },
});

// Very high added sugar — hits the -16 penalty rung.
cases.push({
  label: 'edge:very_high_added_sugar',
  data: {
    productName: 'Cola, 20 oz',
    foodCategory: 'beverage',
    servingSize: '20 fl oz (591ml)',
    servingsPerContainer: 1,
    calories: 240,
    totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 75,
    totalCarbs: 65, dietaryFiber: 0, totalSugar: 65, addedSugar: 65, protein: 0,
  },
});

// Whole food: should get baseline boost + no-added-sugar bonus shouldn't apply.
cases.push({
  label: 'edge:whole_food_banana',
  data: {
    productName: 'Banana, raw',
    foodCategory: 'wholeFood',
    servingSize: '1 medium (118g)',
    servingsPerContainer: 1,
    calories: 105,
    totalFat: 0.4, saturatedFat: 0.1, transFat: 0, cholesterol: 0, sodium: 1,
    totalCarbs: 27, dietaryFiber: 3.1, totalSugar: 14, addedSugar: 0, protein: 1.3,
    potassium: 422, vitaminD: 0,
  },
});

// Whole food protein with high protein — should get +10 bonus.
cases.push({
  label: 'edge:wild_salmon_protein_bonus',
  data: {
    productName: 'Wild salmon fillet',
    foodCategory: 'wholeFood',
    servingSize: '6 oz (170g)',
    servingsPerContainer: 1,
    calories: 280,
    totalFat: 12, saturatedFat: 2.5, transFat: 0, cholesterol: 95, sodium: 80,
    totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 39,
    potassium: 720, vitaminD: 18,
  },
});

// High-fiber whole grain — should get +12 fiber bonus.
cases.push({
  label: 'edge:steel_cut_oats_fiber_bonus',
  data: {
    productName: 'Steel-cut oats, cooked',
    foodCategory: 'wholeFood',
    servingSize: '1 cup (234g)',
    servingsPerContainer: 1,
    calories: 220,
    totalFat: 4, saturatedFat: 0.6, transFat: 0, cholesterol: 0, sodium: 5,
    totalCarbs: 38, dietaryFiber: 6, totalSugar: 1, addedSugar: 0, protein: 8,
    iron: 2.2, calcium: 30,
  },
});

// Snack with poor profile — exercises baseline penalty multipliers.
cases.push({
  label: 'edge:salty_chips',
  data: {
    productName: 'Salted potato chips',
    foodCategory: 'snack',
    servingSize: '1 oz (28g)',
    servingsPerContainer: 8,
    calories: 160,
    totalFat: 10, saturatedFat: 1.5, transFat: 0, cholesterol: 0, sodium: 170,
    totalCarbs: 15, dietaryFiber: 1, totalSugar: 0, addedSugar: 0, protein: 2,
  },
});

// Beverage with zero added sugar — should not get the added-sugar bonus.
cases.push({
  label: 'edge:sparkling_water',
  data: {
    productName: 'Sparkling water, unsweetened',
    foodCategory: 'beverage',
    servingSize: '12 fl oz (355ml)',
    servingsPerContainer: 8,
    calories: 0,
    totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 30,
    totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
  },
});

// Serving-multiplier variations on one product.
const salmonBase: NutritionFacts = {
  productName: 'Wild salmon fillet',
  foodCategory: 'wholeFood',
  servingSize: '6 oz (170g)',
  servingsPerContainer: 1,
  calories: 280,
  totalFat: 12, saturatedFat: 2.5, transFat: 0, cholesterol: 95, sodium: 80,
  totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 39,
  potassium: 720, vitaminD: 18,
};
cases.push({ label: 'multiplier:salmon@0.5x', data: salmonBase, options: { servingMultiplier: 0.5 } });
cases.push({ label: 'multiplier:salmon@2x', data: salmonBase, options: { servingMultiplier: 2 } });

// Profile + serving multiplier combined.
cases.push({
  label: 'combo:ramen|heart@1x',
  data: cases.find(c => c.label === 'edge:very_high_sodium')!.data,
  options: { profile: 'heart' },
});
cases.push({
  label: 'combo:cola|diabetic@1x',
  data: cases.find(c => c.label === 'edge:very_high_added_sugar')!.data,
  options: { profile: 'diabetic' },
});

// --- Run the analyzer and capture (input, output) per case. ---

const fixtures: FixtureCase[] = cases.map(c => ({
  label: c.label,
  input: { data: c.data, options: c.options ?? {} },
  output: analyzeNutritionLabel(c.data, c.options),
}));

const outPath = resolve(import.meta.dirname, 'fixtures.json');
writeFileSync(outPath, JSON.stringify(fixtures, null, 2));
console.log(`Wrote ${fixtures.length} fixtures to ${outPath}`);
