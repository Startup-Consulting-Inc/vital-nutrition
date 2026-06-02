import { useState, useCallback } from 'react';

export type HealthGoal =
  | 'bloodSugar'
  | 'heartHealth'
  | 'weightManagement'
  | 'lowSodium'
  | 'highProtein'
  | 'foodAllergies'
  | 'general';

export interface HealthGoalsState {
  goals: HealthGoal[];
  allergens: string[];
  hasCompletedSetup: boolean;
}

const STORAGE_KEY = 'vital_health_goals';

const defaultGoals: HealthGoalsState = {
  goals: ['general'],
  allergens: [],
  hasCompletedSetup: false,
};

export function useHealthGoals(): {
  goals: HealthGoalsState;
  setGoals: (g: HealthGoalsState) => void;
  addGoal: (g: HealthGoal) => void;
  removeGoal: (g: HealthGoal) => void;
  toggleAllergen: (a: string) => void;
  markSetupComplete: () => void;
} {
  const [goals, setGoalsState] = useState<HealthGoalsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as HealthGoalsState;
    } catch {
      // ignore
    }
    return defaultGoals;
  });

  const persist = useCallback((g: HealthGoalsState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(g));
    } catch {
      // ignore
    }
  }, []);

  const setGoals = useCallback(
    (g: HealthGoalsState | ((prev: HealthGoalsState) => HealthGoalsState)) => {
      setGoalsState(g);
      if (typeof g !== 'function') persist(g);
    },
    [persist]
  );

  const addGoal = useCallback(
    (g: HealthGoal) => {
      setGoalsState((prev) => {
        if (prev.goals.includes(g)) return prev;
        const next = {
          ...prev,
          goals: [...prev.goals.filter((x) => x !== 'general'), g],
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeGoal = useCallback(
    (g: HealthGoal) => {
      setGoalsState((prev) => {
        const nextGoals = prev.goals.filter((x) => x !== g);
        const next: HealthGoalsState = {
          ...prev,
          goals: (nextGoals.length === 0 ? ['general'] : nextGoals) as HealthGoal[],
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleAllergen = useCallback(
    (a: string) => {
      setGoalsState((prev) => {
        const has = prev.allergens.includes(a);
        const next = {
          ...prev,
          allergens: has
            ? prev.allergens.filter((x) => x !== a)
            : [...prev.allergens, a],
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const markSetupComplete = useCallback(() => {
    setGoalsState((prev) => {
      const next: HealthGoalsState = { ...prev, hasCompletedSetup: true };
      persist(next);
      return next;
    });
  }, [persist]);

  return {
    goals,
    setGoals,
    addGoal,
    removeGoal,
    toggleAllergen,
    markSetupComplete,
  };
}
