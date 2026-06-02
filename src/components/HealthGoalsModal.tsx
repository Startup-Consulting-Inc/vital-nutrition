import { useState } from 'react';
import { useLocale } from '@/lib/i18n';
import type { HealthGoal } from '@/hooks/useHealthGoals';

interface HealthGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goals: HealthGoal[], allergens: string[]) => void;
}

const goalOptions: { value: HealthGoal; label: string; description: string }[] = [
  { value: 'bloodSugar', label: 'Blood Sugar', description: 'Managing diabetes or prediabetes' },
  { value: 'heartHealth', label: 'Heart Health', description: 'Lowering saturated fat & sodium' },
  { value: 'weightManagement', label: 'Weight', description: 'Calorie awareness & portion control' },
  { value: 'lowSodium', label: 'Low Sodium', description: 'Hypertension or kidney health' },
  { value: 'highProtein', label: 'High Protein', description: 'Athletes, recovery, muscle preservation' },
  { value: 'foodAllergies', label: 'Allergies', description: 'Avoid specific ingredients' },
];

const commonAllergens = [
  'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Wheat', 'Soy',
  'Fish', 'Shellfish', 'Sesame', 'Mustard',
];

export default function HealthGoalsModal({ isOpen, onClose, onSave }: HealthGoalsModalProps) {
  const [locale] = useLocale();
  const [selectedGoals, setSelectedGoals] = useState<HealthGoal[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [showAllergens, setShowAllergens] = useState(false);

  if (!isOpen) return null;

  const toggleGoal = (goal: HealthGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
    if (goal === 'foodAllergies') {
      setShowAllergens((prev) => !prev);
    }
  };

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleSave = () => {
    const goals: HealthGoal[] = selectedGoals.length > 0 ? (selectedGoals as HealthGoal[]) : ['general'];
    onSave(goals, selectedAllergens);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h2 className="text-xl text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          {locale === 'ko' ? '건강 목표 설정' : 'Set Your Health Goals'}
        </h2>
        <p className="text-sm text-deep/60 mb-6">
          {locale === 'ko'
            ? '분석 결과를 개인화하기 위해 관리 중인 건강 목표를 선택하세요.'
            : 'Choose what you\'re managing so we can personalize every analysis.'}
        </p>

        <div className="space-y-2 mb-6">
          {goalOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleGoal(opt.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                selectedGoals.includes(opt.value)
                  ? 'border-terracotta bg-terracotta/5'
                  : 'border-deep/10 hover:border-deep/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                  selectedGoals.includes(opt.value)
                    ? 'bg-terracotta border-terracotta'
                    : 'border-deep/20'
                }`}
              >
                {selectedGoals.includes(opt.value) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-deep">{opt.label}</p>
                <p className="text-xs text-deep/50">{opt.description}</p>
              </div>
            </button>
          ))}
        </div>

        {showAllergens && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {locale === 'ko' ? '알레르기 항목' : 'Allergens to avoid'}
            </p>
            <div className="flex flex-wrap gap-2">
              {commonAllergens.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAllergen(a)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedAllergens.includes(a)
                      ? 'bg-terracotta text-white'
                      : 'bg-deep/5 text-deep/60 hover:bg-deep/10'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-deep/10 text-sm text-deep/60 hover:bg-deep/5 transition-colors"
          >
            {locale === 'ko' ? '나중에' : 'Later'}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-terracotta text-white text-sm font-medium hover:bg-[#c44e2f] transition-colors"
          >
            {locale === 'ko' ? '저장' : 'Save Goals'}
          </button>
        </div>
      </div>
    </div>
  );
}
