import { useEffect, useMemo, useState } from 'react';
import { useUserProfile, personalizedTargets, type Gender, type ActivityLevel, type LifeStage } from '@/hooks/useUserProfile';
import { useLocale } from '@/lib/i18n';

interface ProfileSheetProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-over profile editor. Stored locally in the browser; never sent to any server.
 */
export default function ProfileSheet({ open, onClose }: ProfileSheetProps) {
  const [profile, update, reset] = useUserProfile();
  const [draft, setDraft] = useState(profile);
  const [locale] = useLocale();

  const isKo = locale === 'ko';

  // String-backed inputs so users can freely edit (including deleting digits)
  // without being forced through Number() coercion mid-typing.
  const [ageInput, setAgeInput] = useState<string>(String(profile.age));
  const [weightInput, setWeightInput] = useState<string>(String(profile.weightKg));
  const [heightCmInput, setHeightCmInput] = useState<string>(String(profile.heightCm ?? 170));
  const [heightFtInput, setHeightFtInput] = useState<string>('5');
  const [heightInInput, setHeightInInput] = useState<string>('7');

  const clampInt = (v: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(v)));
  const clampNum = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  const kgToLb = (kg: number) => kg * 2.2046226218;
  const lbToKg = (lb: number) => lb / 2.2046226218;
  const cmToTotalIn = (cm: number) => cm / 2.54;
  const totalInToCm = (inches: number) => inches * 2.54;

  const targets = personalizedTargets(draft);

  const heightParts = useMemo(() => {
    const totalIn = cmToTotalIn(draft.heightCm ?? 170);
    const ft = Math.floor(totalIn / 12);
    const inch = Math.round(totalIn - ft * 12);
    return { ft, inch };
  }, [draft.heightCm]);

  // Keep input strings in sync when opening or when profile changes externally.
  useEffect(() => {
    setDraft(profile);
    setAgeInput(String(profile.age));
    setWeightInput(String(profile.weightKg));
    setHeightCmInput(String(profile.heightCm ?? 170));
  }, [profile]);

  useEffect(() => {
    // When locale switches to EN, initialize ft/in fields from current cm.
    if (!isKo) {
      setHeightFtInput(String(heightParts.ft));
      setHeightInInput(String(heightParts.inch));
      setWeightInput(String(Math.round(kgToLb(draft.weightKg))));
    } else {
      // When switching to KO, show metric values directly.
      setHeightCmInput(String(draft.heightCm ?? 170));
      setWeightInput(String(draft.weightKg));
    }
    // Intentionally not depending on draft.weightKg to avoid overriding mid-typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKo]);

  const commitAge = () => {
    const n = Number(ageInput);
    if (!Number.isFinite(n)) return;
    const next = clampInt(n, 1, 120);
    setDraft((d) => ({ ...d, age: next }));
    setAgeInput(String(next));
  };

  const commitWeight = () => {
    const raw = Number(weightInput);
    if (!Number.isFinite(raw)) return;
    const kg = isKo ? raw : lbToKg(raw);
    const nextKg = clampNum(kg, 1, 400);
    setDraft((d) => ({ ...d, weightKg: nextKg }));
    setWeightInput(isKo ? String(Math.round(nextKg)) : String(Math.round(kgToLb(nextKg))));
  };

  const commitHeightCm = () => {
    const raw = Number(heightCmInput);
    if (!Number.isFinite(raw)) return;
    const next = clampInt(raw, 50, 250);
    setDraft((d) => ({ ...d, heightCm: next }));
    setHeightCmInput(String(next));
  };

  const commitHeightFtIn = () => {
    const ft = Number(heightFtInput);
    const inch = Number(heightInInput);
    if (!Number.isFinite(ft) || !Number.isFinite(inch)) return;
    const totalIn = clampNum(ft * 12 + inch, 24, 98); // ~2ft–8ft2in guardrail
    const cm = clampInt(totalInToCm(totalIn), 50, 250);
    setDraft((d) => ({ ...d, heightCm: cm }));
    const parts = { ft: Math.floor(totalIn / 12), inch: Math.round(totalIn - Math.floor(totalIn / 12) * 12) };
    setHeightFtInput(String(parts.ft));
    setHeightInInput(String(parts.inch));
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-stretch justify-end bg-deep/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-6 py-5 border-b border-deep/5 flex items-center justify-between">
          <div>
            <p className="text-caption text-terracotta">{isKo ? '내 프로필' : 'Your profile'}</p>
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isKo ? '일일 목표를 개인화하기' : 'Personalize daily targets'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-deep/5 text-deep/60" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <p className="text-xs text-deep/50 leading-relaxed">
            {isKo
              ? '모든 값은 브라우저에만 저장됩니다. 프로필은 어떤 서버로도 전송되지 않습니다. 백과사전과 분석기의 개인화 목표 계산에 사용됩니다.'
              : 'All values are stored only in your browser. We never send your profile to any server. Used to calculate your personalized targets across the encyclopedia and analyzer.'}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Field label={isKo ? '나이 (세)' : 'Age (years)'}>
              <input
                inputMode="numeric"
                value={ageInput}
                onChange={e => setAgeInput(e.target.value)}
                onBlur={commitAge}
                className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40"
              />
            </Field>
            <Field label={isKo ? '체중 (kg)' : 'Weight (lb)'}>
              <input
                inputMode="numeric"
                value={weightInput}
                onChange={e => setWeightInput(e.target.value)}
                onBlur={commitWeight}
                className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40"
              />
            </Field>
          </div>

          {isKo ? (
            <Field label="키 (cm)">
              <input
                inputMode="numeric"
                value={heightCmInput}
                onChange={e => setHeightCmInput(e.target.value)}
                onBlur={commitHeightCm}
                className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40"
              />
            </Field>
          ) : (
            <Field label="Height (ft / in)">
              <div className="grid grid-cols-2 gap-3">
                <input
                  inputMode="numeric"
                  value={heightFtInput}
                  onChange={e => setHeightFtInput(e.target.value)}
                  onBlur={commitHeightFtIn}
                  className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40"
                  aria-label="Height in feet"
                />
                <input
                  inputMode="numeric"
                  value={heightInInput}
                  onChange={e => setHeightInInput(e.target.value)}
                  onBlur={commitHeightFtIn}
                  className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40"
                  aria-label="Height in inches"
                />
              </div>
              <p className="text-[11px] text-deep/40 mt-2">
                Tip: enter feet on the left and inches on the right.
              </p>
            </Field>
          )}

          <Field label={isKo ? '성별' : 'Gender'}>
            <div className="grid grid-cols-3 gap-2">
              {(['female', 'male', 'unspecified'] as Gender[]).map(g => (
                <button
                  key={g}
                  onClick={() => setDraft({ ...draft, gender: g })}
                  className={`px-3 py-2 rounded-lg text-xs capitalize ${draft.gender === g ? 'bg-terracotta text-white' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
                >
                  {isKo
                    ? (g === 'female' ? '여성' : g === 'male' ? '남성' : '선택 안 함')
                    : (g === 'unspecified' ? 'Prefer not to say' : g)}
                </button>
              ))}
            </div>
          </Field>

          <Field label={isKo ? '활동 수준' : 'Activity level'}>
            <div className="grid grid-cols-3 gap-2">
              {(['sedentary', 'moderate', 'active'] as ActivityLevel[]).map(a => (
                <button
                  key={a}
                  onClick={() => setDraft({ ...draft, activity: a })}
                  className={`px-3 py-2 rounded-lg text-xs capitalize ${draft.activity === a ? 'bg-terracotta text-white' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
                >
                  {isKo
                    ? (a === 'sedentary' ? '낮음' : a === 'moderate' ? '보통' : '높음')
                    : a}
                </button>
              ))}
            </div>
          </Field>

          <Field label={isKo ? '생애 단계' : 'Life stage'}>
            <div className="grid grid-cols-2 gap-2">
              {(['general', 'pregnancy', 'lactation', 'senior'] as LifeStage[]).map(l => (
                <button
                  key={l}
                  onClick={() => setDraft({ ...draft, lifeStage: l })}
                  className={`px-3 py-2 rounded-lg text-xs capitalize ${draft.lifeStage === l ? 'bg-terracotta text-white' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
                >
                  {isKo
                    ? (l === 'general' ? '일반' : l === 'pregnancy' ? '임신' : l === 'lactation' ? '수유' : '시니어')
                    : l}
                </button>
              ))}
            </div>
          </Field>

          {/* Live preview */}
          <div className="p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10 space-y-1 text-xs text-deep/70">
            <p className="text-caption text-deep mb-2">{isKo ? '나의 일일 목표' : 'Your daily targets'}</p>
            <Row label="Calories" value={`${targets.calories} kcal`} />
            <Row label="Protein" value={`${targets.proteinG} g`} />
            <Row label="Carbs" value={`${targets.carbsG} g`} />
            <Row label="Fat (total / sat ceiling)" value={`${targets.fatG} g / ≤${targets.saturatedFatG} g`} />
            <Row label="Fiber" value={`${targets.fiberG} g`} />
            <Row label="Added sugar ceiling" value={`≤${targets.addedSugarG} g`} />
            <Row label="Sodium ceiling" value={`≤${targets.sodiumMg} mg`} />
            <Row label="Water" value={`${targets.waterL} L (food + drink)`} />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => { update(draft); onClose(); }}
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: '#d95c39' }}
            >
              {isKo ? '프로필 저장' : 'Save profile'}
            </button>
            <button
              onClick={() => {
                reset();
                const next = { ...draft, age: 35, weightKg: 70, heightCm: 170 };
                setDraft(next);
                setAgeInput('35');
                setWeightInput(isKo ? '70' : String(Math.round(kgToLb(70))));
                setHeightCmInput('170');
                setHeightFtInput('5');
                setHeightInInput('7');
              }}
              className="px-4 py-2.5 rounded-lg text-deep/60 text-xs hover:bg-deep/5"
            >
              {isKo ? '초기화' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-deep/40 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-deep/50">{label}</span>
      <span className="font-medium text-deep">{value}</span>
    </div>
  );
}
