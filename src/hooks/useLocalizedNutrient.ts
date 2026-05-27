import { useMemo } from 'react';
import {
  type FoodItem,
  type IntakeBucket,
  type NutrientDetail,
} from '@/data/nutrientDetails';
import { nutrientsKo } from '@/data/nutrientDetails.ko';
import { useLocale } from '@/lib/i18n';

/**
 * Returns a NutrientDetail with Korean overrides merged in when the user
 * locale is "ko". Falls back to English for any field that hasn't been
 * translated yet.
 */
export function useLocalizedNutrient(nutrient: NutrientDetail | undefined): NutrientDetail | undefined {
  const [locale] = useLocale();

  return useMemo(() => {
    if (!nutrient) return nutrient;
    if (locale !== 'ko') return nutrient;

    const ko = nutrientsKo[nutrient.slug];
    if (!ko) return nutrient;

    const localizedFoods: FoodItem[] = nutrient.foodItems.map(f => {
      const o = ko.foodOverrides?.[f.name];
      return o ? { ...f, name: o.name ?? f.name, keyBenefit: o.keyBenefit ?? f.keyBenefit } : f;
    });

    // Translate intake bucket labels back to enum values when overridden;
    // tone stays as-is.
    const buckets: IntakeBucket[] | undefined = ko.intakeBuckets ?? nutrient.intakeBuckets;

    return {
      ...nutrient,
      ...ko,
      foodItems: localizedFoods,
      intakeBuckets: buckets,
    } as NutrientDetail;
  }, [nutrient, locale]);
}

/** Translate the Eat Most / Limit / Avoid bucket label to the active locale. */
export function useBucketLabel(): (label: IntakeBucket['label']) => string {
  const [locale] = useLocale();
  if (locale !== 'ko') return (l) => l;
  const map: Record<IntakeBucket['label'], string> = {
    'Eat Most': '많이 먹기',
    'Eat Some': '적당히 먹기',
    'Limit': '제한하기',
    'Avoid': '피하기',
  };
  return (l) => map[l] ?? l;
}
