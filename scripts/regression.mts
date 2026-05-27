/**
 * Scoring + parser regression fixtures.
 *
 * Run with: npx tsx scripts/regression.mts
 *
 * The headline assertion locks in the "Grade D ground chicken" fix from
 * docs/VITAL_master_action_items.md: ground chicken with protein=22g must
 * land at C/B or better, NOT D.
 */
import {
  analyzeNutritionLabel,
  getSampleProducts,
  requiresProteinConfirmation,
  type DietaryProfile,
  type NutritionFacts,
} from '../src/lib/nutritionAnalyzer.ts';
import { parseNutritionText } from '../src/lib/ocrParser.ts';

let pass = 0;
let fail = 0;
const expect = (cond: boolean, label: string) => {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}`);
  }
};

console.log('=== REGRESSION: ground chicken (original bug case) ===');
const groundChicken: NutritionFacts = {
  productName: 'Ground Chicken, 93% Lean',
  foodCategory: 'wholeFood',
  servingSize: '4 oz (112g)',
  servingsPerContainer: 4,
  calories: 170,
  totalFat: 9,
  saturatedFat: 2.5,
  transFat: 0,
  cholesterol: 75,
  sodium: 75,
  totalCarbs: 0,
  dietaryFiber: 0,
  totalSugar: 0,
  addedSugar: 0,
  protein: 22,
};
const gc = analyzeNutritionLabel(groundChicken);
console.log(`  Score=${gc.overallScore}  Grade=${gc.grade}`);
expect(gc.overallScore >= 55, 'Ground chicken scores ≥ 55 (was failing as Grade D)');
expect(gc.grade !== 'D' && gc.grade !== 'F', 'Ground chicken does not grade D or F');
expect(!gc.negativeFactors.some((f) => f.toLowerCase().includes('low protein')), 'No bogus "low protein" factor on a 22g-protein chicken');
expect(!gc.negativeFactors.some((f) => f.toLowerCase().includes('low in fiber')), 'No fiber penalty on a meat whole food');

console.log('\n=== Bug-case: ground chicken with protein=0 (the real-world OCR failure) ===');
const bugCase: NutritionFacts = { ...groundChicken, protein: 0 };
expect(requiresProteinConfirmation(bugCase), 'Confirmation gate triggers for protein=0 on a meat product');

console.log('\n=== Beverage category rubric: Diet Coke vs regular cola ===');
const dietCoke: NutritionFacts = {
  productName: 'Diet Coke',
  foodCategory: 'beverage',
  servingSize: '12 fl oz (355ml)',
  servingsPerContainer: 1,
  calories: 0,
  totalFat: 0,
  saturatedFat: 0,
  transFat: 0,
  cholesterol: 0,
  sodium: 40,
  totalCarbs: 0,
  dietaryFiber: 0,
  totalSugar: 0,
  addedSugar: 0,
  protein: 0,
};
const regularCola: NutritionFacts = {
  productName: 'Cola Soda',
  foodCategory: 'beverage',
  servingSize: '12 fl oz (355ml)',
  servingsPerContainer: 1,
  calories: 140,
  totalFat: 0,
  saturatedFat: 0,
  transFat: 0,
  cholesterol: 0,
  sodium: 45,
  totalCarbs: 39,
  dietaryFiber: 0,
  totalSugar: 39,
  addedSugar: 39,
  protein: 0,
};
const dc = analyzeNutritionLabel(dietCoke);
const rc = analyzeNutritionLabel(regularCola);
console.log(`  Diet Coke:    score=${dc.overallScore} grade=${dc.grade}`);
console.log(`  Regular cola: score=${rc.overallScore} grade=${rc.grade}`);
expect(!dc.negativeFactors.some((f) => f.toLowerCase().includes('fiber')), 'Beverage: no fiber penalty for Diet Coke');
expect(!dc.recommendations.some((r) => r.title.toLowerCase().includes('fiber')), 'Beverage: no fiber recommendation for Diet Coke');
expect(dc.grade === 'A' || dc.grade === 'B', 'Diet Coke grades A or B (beverage rubric)');
expect(rc.overallScore < dc.overallScore, 'Regular cola scores lower than Diet Coke');
expect(
  !rc.recommendations.some((r) => r.title.includes('Whole Food')),
  'Regular cola does not get cross-category whole-food recommendation',
);

console.log('\n=== All samples ===');
for (const sample of getSampleProducts()) {
  const a = analyzeNutritionLabel(sample.data);
  console.log(`  ${sample.name.padEnd(36)} score=${a.overallScore} grade=${a.grade} processing=${a.processingLevel}`);
}

console.log('\n=== Profile sensitivity (ground chicken) ===');
for (const profile of ['general', 'heart', 'keto', 'highProtein', 'lowSodium', 'diabetic'] as DietaryProfile[]) {
  const a = analyzeNutritionLabel(groundChicken, { profile });
  console.log(`  ${profile.padEnd(14)} score=${a.overallScore} grade=${a.grade}`);
}

console.log('\n=== Profile sensitivity (sugary cereal) ===');
const cereal = getSampleProducts().find((s) => s.name.includes('Cereal'))!;
for (const profile of ['general', 'heart', 'keto', 'highProtein', 'lowSodium', 'diabetic'] as DietaryProfile[]) {
  const a = analyzeNutritionLabel(cereal.data, { profile });
  console.log(`  ${profile.padEnd(14)} score=${a.overallScore} grade=${a.grade}`);
}

console.log('\n=== Atwater + back-calculation ===');
const labelText = `Nutrition Facts
Serving size 4 oz (112g)
Calories 170
Total Fat 9g
Saturated Fat 2.5g
Cholesterol 75mg
Sodium 75mg
Total Carbohydrate 0g
Protein 22`; // protein with no unit — common OCR failure
const parsed = parseNutritionText(labelText);
console.log('  parsed.protein =', parsed.protein);
expect(parsed.protein === 22, 'Parser reads "Protein 22" (no unit) as 22g');
expect(parsed.atwater?.status === 'match' || parsed.atwater?.status === 'soft-mismatch', 'Atwater check passes for ground chicken');

console.log('\n=== Back-calculation: missing fat ===');
const missingFatLabel = `Nutrition Facts
Calories 170
Total Carbohydrate 0g
Protein 22g`;
const bc = parseNutritionText(missingFatLabel);
console.log('  estimated fields =', bc.estimatedFields);
console.log('  back-calculated totalFat =', bc.totalFat);
expect((bc.estimatedFields || []).includes('totalFat'), 'totalFat marked as estimated');
expect((bc.totalFat || 0) > 5 && (bc.totalFat || 0) < 12, `Back-calculated fat ≈ 9g (got ${bc.totalFat}g)`);

console.log('\n=== Parser robustness: OCR variants ===');

// Variant 1: "Prot" abbreviation
const v1 = parseNutritionText(`Calories 200\nProt 12g\nFat 8g\nCarb 18g`);
expect(v1.protein === 12, `"Prot 12g" → 12 (got ${v1.protein})`);

// Variant 2: French "Protéines"
const v2 = parseNutritionText(`Calories 200\nProtéines 15g\nLipides 8g\nGlucides 18g`);
expect(v2.protein === 15, `"Protéines 15g" → 15 (got ${v2.protein})`);

// Variant 3: dropped line breaks "Protein 10 Total Fat 5"
const v3 = parseNutritionText(`Calories 100 Protein 10 Total Fat 5g Sodium 100mg`);
expect(v3.protein === 10, `"Protein 10 ..." (no unit, inline) → 10 (got ${v3.protein})`);
expect(v3.totalFat === 5, `Total Fat 5g (inline) → 5 (got ${v3.totalFat})`);

// Variant 4: OCR misread "Proteln" (l for i)
const v4 = parseNutritionText(`Calories 170\nProteln 22g\nTotal Fat 9g`);
expect(v4.protein === 22, `"Proteln 22g" (misread) → 22 (got ${v4.protein})`);

console.log(`\n=== ${pass} passed, ${fail} failed ===`);
process.exit(fail > 0 ? 1 : 0);
