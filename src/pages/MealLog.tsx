import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addEntry, getEntries, removeEntry, sumEntries, todayKey, type MealEntry } from '@/lib/mealLog';
import { searchCatalog } from '@/lib/foodCatalog';
import { analyzeNutritionLabel } from '@/lib/nutritionAnalyzer';
import { useUserProfile, personalizedTargets } from '@/hooks/useUserProfile';
import HealthScoreGauge from '@/components/HealthScoreGauge';
import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

export default function MealLog() {
  const [profile] = useUserProfile();
  const targets = personalizedTargets(profile);
  const [entries, setEntries] = useState<MealEntry[]>(() => getEntries(todayKey()));
  const [query, setQuery] = useState('');
  const t = useT();
  const [locale] = useLocale();

  useEffect(() => {
    const refresh = () => setEntries(getEntries(todayKey()));
    window.addEventListener('vital:meallog-updated', refresh);
    return () => window.removeEventListener('vital:meallog-updated', refresh);
  }, []);

  const totals = sumEntries(entries);
  const dailyAnalysis = entries.length > 0 ? analyzeNutritionLabel(totals) : null;
  const search = searchCatalog(query).slice(0, 12);

  return (
    <section className="w-full py-16 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead titleKey="log.h1Prefix" descriptionKey="log.subtitle" path="/log" />
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-10">
          <p className="text-caption text-terracotta mb-2">{t('log.eyebrow')}</p>
          <h1 className="text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {t('log.h1Prefix')} · {todayKey()}
          </h1>
          <p className="text-deep/60 max-w-xl">
            {t('log.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: log + add food */}
          <div className="lg:col-span-2 space-y-5">
            {/* Add food */}
            <div className="bg-white rounded-2xl border border-deep/5 p-5">
              <p className="text-caption text-deep/40 mb-3">{t('log.addFood')}</p>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('log.searchPlaceholder')}
                aria-label={t('log.addFood')}
                className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40 mb-3"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {search.map(item => (
                  <button
                    key={item.id}
                    onClick={() => addEntry({ name: item.name, servings: 1, data: item.data })}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-deep/10 hover:border-terracotta/40 hover:bg-terracotta/5 text-left"
                  >
                    <span className="w-7 h-7 rounded-md bg-deep text-inverse flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {item.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-deep truncate">{item.name}</p>
                      <p className="text-[10px] text-deep/40">{item.data.calories} {locale === 'ko' ? 'kcal' : 'cal'} · {item.data.protein}g P</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-deep/40 mt-3">
                {locale === 'ko' ? '포장 식품인가요? ' : 'Want a packaged item? '}
                <Link to="/analyzer" className="text-terracotta hover:underline">
                  {locale === 'ko' ? '먼저 라벨을 스캔하세요' : 'Scan its label first'}
                </Link>
                {locale === 'ko' ? ' — 분석 후 여기에 추가할 수 있습니다.' : ' — once analyzed you can add it here.'}
              </p>
            </div>

            {/* Today's entries */}
            <div className="bg-white rounded-2xl border border-deep/5 p-5">
              <p className="text-caption text-deep/40 mb-3">{t('log.todayEntries')} · {entries.length}</p>
              {entries.length === 0 && (
                <p className="text-sm text-deep/50 italic">{t('log.empty')}</p>
              )}
              <div className="space-y-2">
                {entries.map(e => (
                  <div key={e.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f6f5f1]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-deep truncate">{e.name}</p>
                      <p className="text-xs text-deep/40">
                        {e.servings} × {e.data.servingSize} · {Math.round(e.data.calories * e.servings)} {locale === 'ko' ? 'kcal' : 'cal'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeEntry(e.id)}
                      className="p-1.5 rounded-md hover:bg-deep/10 text-deep/40 hover:text-[#d95c39]"
                      aria-label={locale === 'ko' ? '항목 삭제' : 'Remove entry'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: rolling totals + score */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-deep/5 p-5">
              <p className="text-caption text-deep/40 mb-3">{t('log.dailyIndex')}</p>
              {dailyAnalysis ? (
                <div className="flex flex-col items-center">
                  <HealthScoreGauge
                    score={dailyAnalysis.overallScore}
                    grade={dailyAnalysis.grade}
                    gradeColor={dailyAnalysis.gradeColor}
                    category={dailyAnalysis.category}
                    size={180}
                  />
                </div>
              ) : (
                <p className="text-sm text-deep/40 italic text-center py-8">{t('log.indexHelp')}</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-deep/5 p-5 space-y-2">
              <p className="text-caption text-deep/40 mb-2">{t('log.vsTarget')}</p>
              <Bar label={t('common.calories')} value={totals.calories} target={targets.calories} unit={locale === 'ko' ? ' kcal' : ' cal'} lower />
              <Bar label={t('common.protein')} value={totals.protein} target={targets.proteinG} unit="g" />
              <Bar label={t('common.fiber')} value={totals.dietaryFiber} target={targets.fiberG} unit="g" />
              <Bar label={t('common.sodium')} value={totals.sodium} target={targets.sodiumMg} unit="mg" lower />
              <Bar label={t('common.addedSugar')} value={totals.addedSugar} target={targets.addedSugarG} unit="g" lower />
              <Bar label={t('common.satFat')} value={totals.saturatedFat} target={targets.saturatedFatG} unit="g" lower />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bar({ label, value, target, unit, lower }: { label: string; value: number; target: number; unit: string; lower?: boolean }) {
  const pct = target > 0 ? (value / target) * 100 : 0;
  const okLow = lower && pct <= 100;
  const okHigh = !lower && pct >= 90;
  const danger = lower ? pct > 100 : pct < 50;
  const color = okLow || okHigh ? '#4a7c59' : danger ? '#d95c39' : '#c9a96e';
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-medium text-deep">{label}</span>
        <span className="text-[11px] text-deep/40 tabular-nums">
          {Math.round(value)}{unit} / {target}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-deep/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
