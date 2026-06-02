import type { HealthAnalysis, NutritionFacts, DietaryProfile } from './nutritionAnalyzer';

const STORAGE_KEY = 'vital_saved_analyses';

export interface SavedAnalysis {
  id: string;
  timestamp: number;
  productName: string;
  servingSize: string;
  calories: number;
  score: number;
  grade: string;
  gradeColor: string;
  verdict: string;
  profile: DietaryProfile;
  analysis: HealthAnalysis;
  nutritionFacts: NutritionFacts;
  servingMultiplier: number;
}

export function getSavedAnalyses(): SavedAnalysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SavedAnalysis[];
  } catch {
    // ignore
  }
  return [];
}

export function saveAnalysis(item: SavedAnalysis): void {
  const existing = getSavedAnalyses();
  // Prevent duplicates by product name + timestamp within 1 min
  const isDuplicate = existing.some(
    (e) => e.productName === item.productName && Math.abs(e.timestamp - item.timestamp) < 60000
  );
  if (isDuplicate) return;
  const updated = [item, ...existing].slice(0, 50); // Keep last 50
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function removeSavedAnalysis(id: string): void {
  const existing = getSavedAnalyses();
  const updated = existing.filter((e) => e.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function clearSavedAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
