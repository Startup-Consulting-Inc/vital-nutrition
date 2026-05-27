import type { NutritionFacts } from './nutritionAnalyzer';
import { useAuth } from '@/hooks/useAuth';
import { syncMealEntry, deleteMealEntry, loadMealLog, subscribeMealLog } from './firestore';
import { useEffect, useState, useCallback, useRef } from 'react';

export interface MealEntry {
  id: string;
  date: string; // YYYY-MM-DD
  name: string;
  servings: number;
  data: NutritionFacts;
  addedAt: number;
}

const STORAGE_KEY = 'vital.mealLog.v1';

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function readLocalLog(): MealEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MealEntry[];
  } catch {
    return [];
  }
}

function writeLocalLog(entries: MealEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent('vital:meallog-updated'));
  } catch {
    // ignore
  }
}

/* ------------------------------------------------------------------ */
/*  Core functions (always write to localStorage, optionally Firestore) */
/* ------------------------------------------------------------------ */

export function getEntries(date?: string): MealEntry[] {
  const all = readLocalLog();
  if (!date) return all;
  return all.filter((e) => e.date === date);
}

export function addEntry(
  entry: Omit<MealEntry, 'id' | 'addedAt' | 'date'> & { date?: string }
): MealEntry {
  const all = readLocalLog();
  const newEntry: MealEntry = {
    ...entry,
    date: entry.date ?? todayKey(),
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    addedAt: Date.now(),
  };
  all.push(newEntry);
  writeLocalLog(all);

  // Firestore sync is handled by the caller if they have auth context
  return newEntry;
}

export function removeEntry(id: string): void {
  const all = readLocalLog().filter((e) => e.id !== id);
  writeLocalLog(all);
}

export function clearDate(date: string): void {
  const all = readLocalLog().filter((e) => e.date !== date);
  writeLocalLog(all);
}

/** Sum nutrition facts across entries, multiplying each by its `servings`. */
export function sumEntries(entries: MealEntry[]): NutritionFacts {
  const empty: NutritionFacts = {
    productName: 'Daily Total',
    foodCategory: 'other',
    servingSize: 'Daily total',
    servingsPerContainer: 1,
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbs: 0,
    dietaryFiber: 0,
    totalSugar: 0,
    addedSugar: 0,
    protein: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
  };
  return entries.reduce<NutritionFacts>((acc, e) => {
    const m = e.servings || 1;
    return {
      ...acc,
      calories: acc.calories + (e.data.calories || 0) * m,
      totalFat: round((acc.totalFat || 0) + (e.data.totalFat || 0) * m),
      saturatedFat: round((acc.saturatedFat || 0) + (e.data.saturatedFat || 0) * m),
      transFat: round((acc.transFat || 0) + (e.data.transFat || 0) * m),
      cholesterol: round((acc.cholesterol || 0) + (e.data.cholesterol || 0) * m),
      sodium: round((acc.sodium || 0) + (e.data.sodium || 0) * m),
      totalCarbs: round((acc.totalCarbs || 0) + (e.data.totalCarbs || 0) * m),
      dietaryFiber: round((acc.dietaryFiber || 0) + (e.data.dietaryFiber || 0) * m),
      totalSugar: round((acc.totalSugar || 0) + (e.data.totalSugar || 0) * m),
      addedSugar: round((acc.addedSugar || 0) + (e.data.addedSugar || 0) * m),
      protein: round((acc.protein || 0) + (e.data.protein || 0) * m),
      vitaminD: round((acc.vitaminD || 0) + (e.data.vitaminD || 0) * m),
      calcium: round((acc.calcium || 0) + (e.data.calcium || 0) * m),
      iron: round((acc.iron || 0) + (e.data.iron || 0) * m),
      potassium: round((acc.potassium || 0) + (e.data.potassium || 0) * m),
    };
  }, empty);
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/* ------------------------------------------------------------------ */
/*  Hook for reactive meal log with Firestore sync                     */
/* ------------------------------------------------------------------ */

export function useMealLog(date?: string) {
  const { user, isAnonymous } = useAuth();
  const targetDate = date ?? todayKey();
  const [entries, setEntries] = useState<MealEntry[]>(() =>
    getEntries(targetDate)
  );
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Load from Firestore for signed-in users
  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (user && !isAnonymous) {
      // First load from cloud
      loadMealLog(user.uid, targetDate).then((cloudEntries) => {
        if (cloudEntries.length > 0) {
          // Merge: cloud wins for this date
          const allLocal = readLocalLog();
          const otherDates = allLocal.filter((e) => e.date !== targetDate);
          const merged = [...otherDates, ...cloudEntries];
          writeLocalLog(merged);
          setEntries(cloudEntries);
        } else {
          // Push local to cloud
          const localEntries = getEntries(targetDate);
          for (const entry of localEntries) {
            syncMealEntry(user.uid, entry);
          }
        }
      });

      // Subscribe to real-time updates
      unsubscribeRef.current = subscribeMealLog(user.uid, targetDate, (cloudEntries) => {
        setEntries(cloudEntries);
        // Update localStorage to match
        const allLocal = readLocalLog();
        const otherDates = allLocal.filter((e) => e.date !== targetDate);
        writeLocalLog([...otherDates, ...cloudEntries]);
      });
    } else {
      // Anonymous: just use localStorage
      setEntries(getEntries(targetDate));
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user, isAnonymous, targetDate]);

  // Listen for localStorage changes
  useEffect(() => {
    const onChange = () => setEntries(getEntries(targetDate));
    window.addEventListener('vital:meallog-updated', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('vital:meallog-updated', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, [targetDate]);

  const add = useCallback(
    (entry: Omit<MealEntry, 'id' | 'addedAt' | 'date'> & { date?: string }) => {
      const newEntry = addEntry(entry);

      // Sync to Firestore if signed in
      if (user && !isAnonymous) {
        syncMealEntry(user.uid, newEntry).catch(console.error);
      }

      setEntries((prev) => [...prev, newEntry]);
      return newEntry;
    },
    [user, isAnonymous]
  );

  const remove = useCallback(
    (id: string) => {
      removeEntry(id);

      if (user && !isAnonymous) {
        deleteMealEntry(user.uid, id).catch(console.error);
      }

      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [user, isAnonymous]
  );

  return { entries, add, remove };
}
