import { useState, useCallback } from 'react';
import type { DietaryProfile } from '@/lib/nutritionAnalyzer';

const STORAGE_KEY = 'vital_dietary_profile';

export function usePersistentProfile(): {
  profile: DietaryProfile;
  setProfile: (p: DietaryProfile) => void;
} {
  const [profile, setProfileState] = useState<DietaryProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved as DietaryProfile;
    } catch {
      // localStorage unavailable (private mode)
    }
    return 'general';
  });

  const setProfile = useCallback((p: DietaryProfile) => {
    setProfileState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      // ignore
    }
  }, []);

  return { profile, setProfile };
}
