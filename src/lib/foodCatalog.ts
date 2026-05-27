import type { NutritionFacts } from './nutritionAnalyzer';

/**
 * Lightweight catalog of common foods with full nutrition facts so the
 * comparison tool and meal logger work without OCR for whole-food / staple items.
 * Values are USDA / NIH per-serving reference data, rounded.
 */
export interface CatalogEntry {
  id: string;
  name: string;
  category: string;
  emoji: string;
  data: NutritionFacts;
}

export const foodCatalog: CatalogEntry[] = [
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (skinless)',
    category: 'Protein',
    emoji: 'CB',
    data: {
      productName: 'Chicken Breast (Skinless, Roasted)', foodCategory: 'wholeFood',
      servingSize: '3 oz (85g)', servingsPerContainer: 1, calories: 128,
      totalFat: 2.7, saturatedFat: 0.8, transFat: 0, cholesterol: 73, sodium: 44,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 26,
    },
  },
  {
    id: 'ground-chicken',
    name: 'Ground Chicken (93% lean)',
    category: 'Protein',
    emoji: 'GC',
    data: {
      productName: 'Ground Chicken, 93% Lean', foodCategory: 'wholeFood',
      servingSize: '4 oz (112g)', servingsPerContainer: 1, calories: 170,
      totalFat: 9, saturatedFat: 2.5, transFat: 0, cholesterol: 75, sodium: 75,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 22,
    },
  },
  {
    id: 'salmon',
    name: 'Salmon (Atlantic, baked)',
    category: 'Protein',
    emoji: 'SL',
    data: {
      productName: 'Salmon, Baked', foodCategory: 'wholeFood',
      servingSize: '3 oz (85g)', servingsPerContainer: 1, calories: 175,
      totalFat: 11, saturatedFat: 2.2, transFat: 0, cholesterol: 54, sodium: 50,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 22,
    },
  },
  {
    id: 'eggs',
    name: 'Eggs (2 large)',
    category: 'Protein',
    emoji: 'EG',
    data: {
      productName: 'Eggs, 2 large', foodCategory: 'wholeFood',
      servingSize: '2 large (100g)', servingsPerContainer: 1, calories: 143,
      totalFat: 9.5, saturatedFat: 3.1, transFat: 0, cholesterol: 372, sodium: 142,
      totalCarbs: 0.7, dietaryFiber: 0, totalSugar: 0.3, addedSugar: 0, protein: 12.6,
    },
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (plain, non-fat)',
    category: 'Dairy',
    emoji: 'GY',
    data: {
      productName: 'Greek Yogurt, plain', foodCategory: 'dairy',
      servingSize: '1 cup (227g)', servingsPerContainer: 1, calories: 130,
      totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 10, sodium: 80,
      totalCarbs: 9, dietaryFiber: 0, totalSugar: 6, addedSugar: 0, protein: 22,
      calcium: 250, potassium: 350,
    },
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal (rolled, cooked)',
    category: 'Grain',
    emoji: 'OM',
    data: {
      productName: 'Rolled Oats, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (234g)', servingsPerContainer: 1, calories: 154,
      totalFat: 2.6, saturatedFat: 0.5, transFat: 0, cholesterol: 0, sodium: 9,
      totalCarbs: 27, dietaryFiber: 4, totalSugar: 1, addedSugar: 0, protein: 6,
    },
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (cooked)',
    category: 'Grain',
    emoji: 'BR',
    data: {
      productName: 'Brown Rice, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (195g)', servingsPerContainer: 1, calories: 216,
      totalFat: 1.8, saturatedFat: 0.4, transFat: 0, cholesterol: 0, sodium: 10,
      totalCarbs: 45, dietaryFiber: 3.5, totalSugar: 0.7, addedSugar: 0, protein: 5,
    },
  },
  {
    id: 'quinoa',
    name: 'Quinoa (cooked)',
    category: 'Grain',
    emoji: 'QN',
    data: {
      productName: 'Quinoa, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (185g)', servingsPerContainer: 1, calories: 222,
      totalFat: 3.6, saturatedFat: 0.4, transFat: 0, cholesterol: 0, sodium: 13,
      totalCarbs: 39, dietaryFiber: 5, totalSugar: 1.6, addedSugar: 0, protein: 8,
    },
  },
  {
    id: 'lentils',
    name: 'Lentils (cooked)',
    category: 'Legume',
    emoji: 'LT',
    data: {
      productName: 'Lentils, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (198g)', servingsPerContainer: 1, calories: 230,
      totalFat: 0.8, saturatedFat: 0.1, transFat: 0, cholesterol: 0, sodium: 4,
      totalCarbs: 40, dietaryFiber: 16, totalSugar: 3.6, addedSugar: 0, protein: 18,
    },
  },
  {
    id: 'black-beans',
    name: 'Black Beans (cooked)',
    category: 'Legume',
    emoji: 'BB',
    data: {
      productName: 'Black Beans, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (172g)', servingsPerContainer: 1, calories: 227,
      totalFat: 0.9, saturatedFat: 0.2, transFat: 0, cholesterol: 0, sodium: 2,
      totalCarbs: 41, dietaryFiber: 15, totalSugar: 0.6, addedSugar: 0, protein: 15,
    },
  },
  {
    id: 'tofu',
    name: 'Tofu (firm)',
    category: 'Protein',
    emoji: 'TF',
    data: {
      productName: 'Tofu, Firm', foodCategory: 'wholeFood',
      servingSize: '1/2 cup (126g)', servingsPerContainer: 1, calories: 88,
      totalFat: 5.5, saturatedFat: 0.8, transFat: 0, cholesterol: 0, sodium: 12,
      totalCarbs: 2.2, dietaryFiber: 0.4, totalSugar: 0.6, addedSugar: 0, protein: 10,
    },
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fruit',
    emoji: 'AV',
    data: {
      productName: 'Avocado', foodCategory: 'wholeFood',
      servingSize: '1/2 medium (75g)', servingsPerContainer: 1, calories: 120,
      totalFat: 11, saturatedFat: 1.6, transFat: 0, cholesterol: 0, sodium: 5,
      totalCarbs: 6, dietaryFiber: 5, totalSugar: 0.5, addedSugar: 0, protein: 1.5,
      potassium: 364,
    },
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruit',
    emoji: 'BN',
    data: {
      productName: 'Banana', foodCategory: 'wholeFood',
      servingSize: '1 medium (118g)', servingsPerContainer: 1, calories: 105,
      totalFat: 0.4, saturatedFat: 0.1, transFat: 0, cholesterol: 0, sodium: 1,
      totalCarbs: 27, dietaryFiber: 3.1, totalSugar: 14, addedSugar: 0, protein: 1.3,
      potassium: 422,
    },
  },
  {
    id: 'spinach-cooked',
    name: 'Spinach (cooked)',
    category: 'Vegetable',
    emoji: 'SP',
    data: {
      productName: 'Spinach, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (180g)', servingsPerContainer: 1, calories: 41,
      totalFat: 0.5, saturatedFat: 0.1, transFat: 0, cholesterol: 0, sodium: 126,
      totalCarbs: 6.8, dietaryFiber: 4.3, totalSugar: 0.8, addedSugar: 0, protein: 5.3,
      iron: 6.4, calcium: 245, potassium: 839,
    },
  },
  {
    id: 'broccoli',
    name: 'Broccoli (cooked)',
    category: 'Vegetable',
    emoji: 'BC',
    data: {
      productName: 'Broccoli, Cooked', foodCategory: 'wholeFood',
      servingSize: '1 cup (156g)', servingsPerContainer: 1, calories: 55,
      totalFat: 0.6, saturatedFat: 0.1, transFat: 0, cholesterol: 0, sodium: 64,
      totalCarbs: 11, dietaryFiber: 5.1, totalSugar: 2.2, addedSugar: 0, protein: 3.7,
    },
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Nut',
    emoji: 'AL',
    data: {
      productName: 'Almonds, Raw', foodCategory: 'wholeFood',
      servingSize: '1/4 cup (35g)', servingsPerContainer: 1, calories: 207,
      totalFat: 18, saturatedFat: 1.4, transFat: 0, cholesterol: 0, sodium: 0,
      totalCarbs: 8, dietaryFiber: 4.4, totalSugar: 1.4, addedSugar: 0, protein: 7.6,
    },
  },
  {
    id: 'sugary-cereal',
    name: 'Sugary Breakfast Cereal',
    category: 'Processed',
    emoji: 'CR',
    data: {
      productName: 'Sugary Breakfast Cereal', foodCategory: 'processed',
      servingSize: '1 cup (40g)', servingsPerContainer: 12, calories: 150,
      totalFat: 1.5, saturatedFat: 0.5, transFat: 0, cholesterol: 0, sodium: 210,
      totalCarbs: 34, dietaryFiber: 1, totalSugar: 15, addedSugar: 14, protein: 2,
      calcium: 100, iron: 8,
    },
  },
  {
    id: 'frozen-pizza',
    name: 'Frozen Pepperoni Pizza',
    category: 'Frozen',
    emoji: 'PZ',
    data: {
      productName: 'Frozen Pepperoni Pizza', foodCategory: 'frozen',
      servingSize: '1/4 pizza (150g)', servingsPerContainer: 4, calories: 380,
      totalFat: 18, saturatedFat: 8, transFat: 0, cholesterol: 35, sodium: 850,
      totalCarbs: 38, dietaryFiber: 2, totalSugar: 5, addedSugar: 2, protein: 16,
      calcium: 200, iron: 2, potassium: 280,
    },
  },
  {
    id: 'potato-chips',
    name: 'Potato Chips',
    category: 'Snack',
    emoji: 'PC',
    data: {
      productName: 'Potato Chips', foodCategory: 'processed',
      servingSize: '1 oz (28g)', servingsPerContainer: 8, calories: 160,
      totalFat: 10, saturatedFat: 1.5, transFat: 0, cholesterol: 0, sodium: 170,
      totalCarbs: 15, dietaryFiber: 1, totalSugar: 0, addedSugar: 0, protein: 2,
      potassium: 350,
    },
  },
  {
    id: 'soda',
    name: 'Cola Soda (12 oz)',
    category: 'Beverage',
    emoji: 'SD',
    data: {
      productName: 'Cola Soda', foodCategory: 'beverage',
      servingSize: '12 fl oz (355ml)', servingsPerContainer: 1, calories: 140,
      totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 45,
      totalCarbs: 39, dietaryFiber: 0, totalSugar: 39, addedSugar: 39, protein: 0,
    },
  },
  {
    id: 'diet-soda',
    name: 'Diet Cola (12 oz)',
    category: 'Beverage',
    emoji: 'DS',
    data: {
      productName: 'Diet Cola', foodCategory: 'beverage',
      servingSize: '12 fl oz (355ml)', servingsPerContainer: 1, calories: 0,
      totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 40,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
    },
  },
  {
    id: 'sparkling-water',
    name: 'Sparkling Water (12 oz)',
    category: 'Beverage',
    emoji: 'SW',
    data: {
      productName: 'Sparkling Water', foodCategory: 'beverage',
      servingSize: '12 fl oz (355ml)', servingsPerContainer: 1, calories: 0,
      totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 0,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
    },
  },
  {
    id: 'unsweetened-tea',
    name: 'Unsweetened Iced Tea (12 oz)',
    category: 'Beverage',
    emoji: 'UT',
    data: {
      productName: 'Unsweetened Iced Tea', foodCategory: 'beverage',
      servingSize: '12 fl oz (355ml)', servingsPerContainer: 1, calories: 0,
      totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 10,
      totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
    },
  },
];

export function findCatalogEntry(id: string): CatalogEntry | undefined {
  return foodCatalog.find(f => f.id === id);
}

export function searchCatalog(q: string): CatalogEntry[] {
  const query = q.trim().toLowerCase();
  if (!query) return foodCatalog;
  return foodCatalog.filter(f =>
    f.name.toLowerCase().includes(query) ||
    f.category.toLowerCase().includes(query) ||
    f.data.productName?.toLowerCase().includes(query),
  );
}
