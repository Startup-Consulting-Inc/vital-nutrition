import type { NutritionFacts } from './nutritionAnalyzer';

const API_BASE = 'https://world.openfoodfacts.org/api/v2';
const CACHE_KEY = 'vital_barcode_cache';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface OFFProduct {
  code: string;
  product: {
    product_name?: string;
    serving_size?: string;
    nutriments?: {
      'energy-kcal_serving'?: number;
      'energy-kcal'?: number;
      fat_serving?: number;
      'saturated-fat_serving'?: number;
      carbohydrates_serving?: number;
      sugars_serving?: number;
      'added-sugars_serving'?: number;
      fiber_serving?: number;
      proteins_serving?: number;
      salt_serving?: number;
      sodium_serving?: number;
      cholesterol_serving?: number;
      'trans-fat_serving'?: number;
      'vitamin-d_serving'?: number;
      calcium_serving?: number;
      iron_serving?: number;
      potassium_serving?: number;
      // per-100g fallbacks
      fat_100g?: number;
      'saturated-fat_100g'?: number;
      carbohydrates_100g?: number;
      sugars_100g?: number;
      fiber_100g?: number;
      proteins_100g?: number;
      salt_100g?: number;
      sodium_100g?: number;
    };
    serving_quantity?: number;
    serving_quantity_unit?: string;
    quantity?: string;
  };
  status: number;
  status_verbose: string;
}

interface CacheEntry {
  barcode: string;
  data: NutritionFacts;
  fetchedAt: number;
}

function getCache(): Record<string, CacheEntry> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {};
}

function setCache(barcode: string, data: NutritionFacts): void {
  const cache = getCache();
  cache[barcode] = { barcode, data, fetchedAt: Date.now() };
  // Clean old entries
  const now = Date.now();
  Object.keys(cache).forEach((k) => {
    if (now - cache[k].fetchedAt > CACHE_TTL_MS) delete cache[k];
  });
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
}

function getCached(barcode: string): NutritionFacts | null {
  const cache = getCache();
  const entry = cache[barcode];
  if (entry && Date.now() - entry.fetchedAt < CACHE_TTL_MS) {
    return entry.data;
  }
  return null;
}

function parseServingSize(quantity?: string, servingSize?: string): string {
  if (servingSize) return servingSize;
  if (quantity) return quantity;
  return '1 serving';
}

function offToNutritionFacts(product: OFFProduct['product']): NutritionFacts | null {
  const n = product.nutriments;
  if (!n) return null;

  // Prefer per-serving values, fallback to per-100g with a warning that user should verify
  const serving = {
    calories: n['energy-kcal_serving'] ?? n['energy-kcal'] ?? 0,
    totalFat: n.fat_serving ?? n.fat_100g ?? 0,
    saturatedFat: n['saturated-fat_serving'] ?? n['saturated-fat_100g'] ?? 0,
    transFat: n['trans-fat_serving'] ?? 0,
    cholesterol: n.cholesterol_serving ?? 0,
    sodium: (n.sodium_serving ?? (n.salt_serving ? n.salt_serving * 400 : 0)) || (n.sodium_100g ?? (n.salt_100g ? n.salt_100g * 400 : 0)) || 0,
    totalCarbs: n.carbohydrates_serving ?? n.carbohydrates_100g ?? 0,
    dietaryFiber: n.fiber_serving ?? n.fiber_100g ?? 0,
    totalSugar: n.sugars_serving ?? n.sugars_100g ?? 0,
    addedSugar: n['added-sugars_serving'] ?? 0,
    protein: n.proteins_serving ?? n.proteins_100g ?? 0,
    vitaminD: n['vitamin-d_serving'] ?? 0,
    calcium: n.calcium_serving ?? 0,
    iron: n.iron_serving ?? 0,
    potassium: n.potassium_serving ?? 0,
  };

  // If we only have per-100g values and no per-serving, flag it
  const hasServingData = !!n['energy-kcal_serving'] || !!n.fat_serving || !!n.proteins_serving;

  return {
    productName: product.product_name || 'Unknown Product',
    foodCategory: 'other',
    servingSize: parseServingSize(product.quantity, product.serving_size),
    servingsPerContainer: 1,
    ...serving,
    estimatedFields: hasServingData ? [] : ['totalFat', 'saturatedFat', 'totalCarbs', 'totalSugar', 'protein', 'sodium', 'dietaryFiber'],
  };
}

export async function fetchProductByBarcode(barcode: string): Promise<NutritionFacts | null> {
  // Check cache first
  const cached = getCached(barcode);
  if (cached) return cached;

  try {
    const response = await fetch(`${API_BASE}/product/${barcode}.json?fields=product_name,serving_size,quantity,serving_quantity,serving_quantity_unit,nutriments`, {
      headers: {
        'User-Agent': 'VITAL Nutrition App - vital@nutrition.ai-biz.app',
      },
    });

    if (!response.ok) {
      throw new Error(`Open Food Facts API error: ${response.status}`);
    }

    const data: OFFProduct = await response.json();

    if (data.status !== 1 || !data.product) {
      return null; // Product not found
    }

    const facts = offToNutritionFacts(data.product);
    if (facts) {
      setCache(barcode, facts);
    }
    return facts;
  } catch (err) {
    console.warn('Barcode lookup failed:', err);
    return null;
  }
}
