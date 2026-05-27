import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { syncUserProfile, loadUserProfile, subscribeUserProfile } from '@/lib/firestore';

export type Gender = 'female' | 'male' | 'unspecified';
export type ActivityLevel = 'sedentary' | 'moderate' | 'active';
export type LifeStage = 'general' | 'pregnancy' | 'lactation' | 'senior';

export interface UserProfile {
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm?: number;
  activity: ActivityLevel;
  lifeStage?: LifeStage;
}

export const DEFAULT_PROFILE: UserProfile = {
  age: 35,
  gender: 'unspecified',
  weightKg: 70,
  heightCm: 170,
  activity: 'moderate',
  lifeStage: 'general',
};

const STORAGE_KEY = 'vital.userProfile.v1';

function readLocalProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function writeLocalProfile(profile: UserProfile) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('vital:profile-updated'));
  } catch {
    // ignore
  }
}

export function useUserProfile(): [UserProfile, (next: Partial<UserProfile>) => void, () => void] {
  const { user, isAnonymous } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(() => readLocalProfile());
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Load from Firestore when user changes (signed-in users)
  useEffect(() => {
    // Clean up previous listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (user && !isAnonymous) {
      // First try to load from Firestore
      loadUserProfile(user.uid).then((cloudProfile) => {
        if (cloudProfile) {
          setProfile(cloudProfile);
          writeLocalProfile(cloudProfile);
        }
        // If no cloud profile but local exists, push local to cloud
        else {
          const local = readLocalProfile();
          syncUserProfile(user.uid, local);
        }
      });

      // Subscribe to real-time updates
      unsubscribeRef.current = subscribeUserProfile(user.uid, (cloudProfile) => {
        if (cloudProfile) {
          setProfile(cloudProfile);
          writeLocalProfile(cloudProfile);
        }
      });
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user, isAnonymous]);

  // Listen for localStorage changes from other tabs
  useEffect(() => {
    const onChange = () => setProfile(readLocalProfile());
    window.addEventListener('vital:profile-updated', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('vital:profile-updated', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const update = useCallback((next: Partial<UserProfile>) => {
    const merged = { ...profile, ...next };
    setProfile(merged);
    writeLocalProfile(merged);

    // Sync to Firestore if signed in
    if (user && !isAnonymous) {
      syncUserProfile(user.uid, merged).catch(console.error);
    }
  }, [profile, user, isAnonymous]);

  const reset = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    writeLocalProfile(DEFAULT_PROFILE);

    if (user && !isAnonymous) {
      syncUserProfile(user.uid, DEFAULT_PROFILE).catch(console.error);
    }
  }, [user, isAnonymous]);

  return [profile, update, reset];
}

/**
 * Personalized daily requirements derived from the user profile.
 * Calculations follow IOM / WHO reference equations.
 */
export interface PersonalizedTargets {
  /** Estimated daily calorie need (kcal). */
  calories: number;
  /** Protein target in grams (0.8 g/kg general; up to 1.6 for active). */
  proteinG: number;
  /** Carb target (45–55% of cal / 4 kcal/g). */
  carbsG: number;
  /** Fat target (25–30% of cal / 9 kcal/g). */
  fatG: number;
  /** Saturated-fat ceiling (10% of cal / 9 kcal/g). */
  saturatedFatG: number;
  /** Added-sugar ceiling (10% of cal / 4 kcal/g). */
  addedSugarG: number;
  /** Fiber target (~14 g per 1000 kcal). */
  fiberG: number;
  /** Sodium ceiling — uses AHA ideal (1,500 mg) when activity is "sedentary," else 2,300 mg. */
  sodiumMg: number;
  /** Total fluid intake in liters (food + drink). */
  waterL: number;
}

/** Mifflin-St Jeor BMR equation. */
function bmr(profile: UserProfile): number {
  const { gender, weightKg, heightCm = 170, age } = profile;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') return base + 5;
  if (gender === 'female') return base - 161;
  return base - 78; // average of M/F
}

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  moderate: 1.55,
  active: 1.725,
};

export function personalizedTargets(profile: UserProfile): PersonalizedTargets {
  let calories = Math.round(bmr(profile) * ACTIVITY_FACTOR[profile.activity]);
  if (profile.lifeStage === 'pregnancy') calories += 340;
  if (profile.lifeStage === 'lactation') calories += 450;
  if (profile.lifeStage === 'senior') calories = Math.round(calories * 0.95);

  const proteinPerKg =
    profile.activity === 'active' ? 1.2 :
    profile.lifeStage === 'pregnancy' ? 1.1 :
    profile.lifeStage === 'lactation' ? 1.3 :
    profile.lifeStage === 'senior' ? 1.0 :
    0.8;

  return {
    calories,
    proteinG: Math.round(profile.weightKg * proteinPerKg),
    carbsG: Math.round((calories * 0.5) / 4),
    fatG: Math.round((calories * 0.3) / 9),
    saturatedFatG: Math.round((calories * 0.1) / 9),
    addedSugarG: Math.round((calories * 0.1) / 4),
    fiberG: Math.round(calories / 1000 * 14),
    sodiumMg: profile.activity === 'sedentary' ? 1500 : 2300,
    waterL:
      profile.gender === 'male' ? 3.7 :
      profile.gender === 'female' ? 2.7 :
      3.2,
  };
}

/** Suggested daily limit/target for a specific micronutrient given the profile. */
export interface MicroTarget {
  nutrient: string;
  amount: number;
  unit: string;
  source: string;
}

export function micronutrientTargets(profile: UserProfile): MicroTarget[] {
  const isMale = profile.gender === 'male';
  const isPregnant = profile.lifeStage === 'pregnancy';
  const isLactating = profile.lifeStage === 'lactation';

  return [
    { nutrient: 'Vitamin C', amount: isMale ? 90 : 75, unit: 'mg', source: 'NIH ODS RDA' },
    { nutrient: 'Vitamin D', amount: profile.age >= 70 ? 20 : 15, unit: 'mcg', source: 'IOM RDA' },
    { nutrient: 'Vitamin B12', amount: isPregnant ? 2.6 : isLactating ? 2.8 : 2.4, unit: 'mcg', source: 'NIH ODS RDA' },
    { nutrient: 'Calcium', amount: profile.age >= 51 ? 1200 : 1000, unit: 'mg', source: 'IOM RDA' },
    { nutrient: 'Iron', amount: profile.gender === 'female' && profile.age >= 19 && profile.age <= 50 ? 18 : 8, unit: 'mg', source: 'NIH ODS RDA' },
    { nutrient: 'Potassium', amount: isMale ? 3400 : 2600, unit: 'mg', source: 'IOM AI' },
    { nutrient: 'Magnesium', amount: isMale ? 400 : 310, unit: 'mg', source: 'NIH ODS RDA' },
    { nutrient: 'Zinc', amount: isMale ? 11 : 8, unit: 'mg', source: 'NIH ODS RDA' },
  ];
}
