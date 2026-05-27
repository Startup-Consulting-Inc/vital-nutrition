import { useParams, Link } from 'react-router-dom';
import { getNutrientBySlug, FOOD_RATING_RUBRIC, DIETARY_TAG_META, type DietaryTag } from '@/data/nutrientDetails';
import { nutrientsKo } from '@/data/nutrientDetails.ko';
import DietaryTagBadge from '@/components/DietaryTagBadge';
import { useUserProfile, personalizedTargets, micronutrientTargets } from '@/hooks/useUserProfile';
import { useLocalizedNutrient, useBucketLabel } from '@/hooks/useLocalizedNutrient';
import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

import { useState, useMemo } from 'react';

export default function NutrientDetail() {
  const { slug } = useParams<{ slug: string }>();
  const baseNutrient = getNutrientBySlug(slug || '');
  const nutrient = useLocalizedNutrient(baseNutrient);
  const [profile] = useUserProfile();
  const [locale] = useLocale();
  const [tagFilter, setTagFilter] = useState<DietaryTag | null>(null);
  const [showRubric, setShowRubric] = useState(false);
  const t = useT();
  const bucketLabel = useBucketLabel();

  const targets = useMemo(() => personalizedTargets(profile), [profile]);
  const microTargets = useMemo(() => micronutrientTargets(profile), [profile]);

  const personalizedNeed = useMemo(() => {
    if (!nutrient) return null;
    switch (nutrient.slug) {
      case 'carbohydrates': return `${targets.carbsG} g/day`;
      case 'proteins': return `${targets.proteinG} g/day`;
      case 'fats': return `${targets.fatG} g/day (saturated ≤ ${targets.saturatedFatG} g)`;
      case 'water': return `${targets.waterL} L/day total fluids`;
      default: return null;
    }
  }, [nutrient, targets]);

  const filteredFoods = useMemo(() => {
    if (!nutrient) return [];
    if (!tagFilter) return nutrient.foodItems;
    return nutrient.foodItems.filter(f => f.dietaryTags?.includes(tagFilter));
  }, [nutrient, tagFilter]);

  if (!nutrient) {
    return (
      <section className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem' }}>
            {locale === 'ko' ? '영양소를 찾을 수 없습니다' : 'Nutrient Not Found'}
          </h1>
          <p className="text-deep/60 mb-6">
            {locale === 'ko' ? '요청하신 영양소를 찾지 못했습니다.' : 'We could not find the nutrient you are looking for.'}
          </p>
          <Link
            to="/nutrients"
            className="inline-flex items-center gap-2 text-sm text-terracotta hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {t('nd.allNutrients')}
          </Link>
        </div>
      </section>
    );
  }

  // Build a NutritionInformation JSON-LD payload (one of the most useful
  // schema.org types for AI-powered search) using the canonical English data
  // so machines can reliably parse it regardless of UI locale.
  const baselineFoods = (baseNutrient?.foodItems ?? []).slice(0, 8);
  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://vital.nutrition/nutrients/${baseNutrient?.slug}` },
      headline: baseNutrient?.name,
      description: baseNutrient?.description,
      inLanguage: locale,
      about: {
        '@type': 'Thing',
        name: baseNutrient?.name,
        description: baseNutrient?.subtitle,
      },
      isPartOf: { '@type': 'WebSite', name: 'VITAL — Nutrition Intelligence' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Top food sources of ${baseNutrient?.name}`,
      itemListElement: baselineFoods.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Food',
          name: f.name,
          description: f.keyBenefit,
          nutrition: {
            '@type': 'NutritionInformation',
            servingSize: f.serving,
            calories: `${f.calories} kcal`,
            description: f.amount,
          },
        },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={`${nutrient.name} — ${nutrient.subtitle}`}
        description={(baseNutrient?.description || '').slice(0, 220)}
        path={`/nutrients/${nutrient.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
    <section className="w-full py-16 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <div className="max-w-[1000px] mx-auto">
        {/* Back link */}
        <Link
          to="/nutrients"
          className="inline-flex items-center gap-2 text-sm text-deep/50 hover:text-terracotta transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {t('nd.allNutrients')}
        </Link>

        {/* Header */}
        <header className="flex items-start gap-5 mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{ backgroundColor: nutrient.color, color: '#ffffff' }}
          >
            {nutrient.icon}
          </div>
          <div>
            <p className="text-caption mb-1" style={{ color: nutrient.color }}>
              {t('nd.essentialNutrient')}
            </p>
            <h1
              className="text-deep mb-2"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {nutrient.name}
            </h1>
            <p className="text-deep/50">{nutrient.subtitle}</p>
          </div>
        </header>

        {/* Description + Daily Need */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-deep/5">
            <h2 className="text-lg text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('nd.overview')}
            </h2>
            <p className="text-sm text-deep/70 leading-relaxed">{nutrient.description}</p>
          </div>
          <aside className="p-6 rounded-2xl text-white" style={{ backgroundColor: nutrient.color }}>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-2">{t('nd.dailyNeed')}</p>
            <p className="text-sm font-medium mb-3">{nutrient.dailyNeed}</p>
            {personalizedNeed && (
              <div className="mt-3 pt-3 border-t border-white/15">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{t('common.personalized')}</p>
                <p className="text-sm font-semibold">{personalizedNeed}</p>
                <p className="text-[10px] text-white/40 mt-1">
                  {profile.weightKg}kg · {t(`pf.activity.${profile.activity}` as never)}
                </p>
              </div>
            )}
            <p className="text-xs text-white/40 mt-3">{t('common.source')}: {nutrient.dailyNeedSource}</p>
          </aside>
        </div>

        {/* Types of Fat (only shown for nutrients that define fatTypes) */}
        {nutrient.fatTypes && nutrient.fatTypes.length > 0 && (
          <div className="mb-10">
            <h2
              className="text-xl text-deep mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {t('nd.fatTypes')}
            </h2>
            <p className="text-sm text-deep/50 mb-6">
              {t('nd.fatTypesSub')}
            </p>

            <div className="grid grid-cols-1 gap-5">
              {nutrient.fatTypes.map((ft) => {
                const toneColor =
                  ft.tone === 'good'
                    ? '#4a7c59'
                    : ft.tone === 'caution'
                    ? '#c9a96e'
                    : '#d95c39';

                return (
                  <div
                    key={ft.name}
                    className="p-6 rounded-2xl bg-white border"
                    style={{ borderColor: toneColor + '25' }}
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3
                        className="text-lg text-deep"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {ft.name}
                      </h3>
                      <span
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-semibold"
                        style={{ backgroundColor: toneColor + '15', color: toneColor }}
                      >
                        {ft.toneLabel}
                      </span>
                    </div>

                    <p className="text-sm text-deep/70 italic mb-4">{ft.oneLiner}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-deep/40 mb-1">
                          {t('nd.fatTypeWhat')}
                        </p>
                        <p className="text-sm text-deep/70 leading-relaxed">{ft.whatItIs}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-deep/40 mb-1">
                          {t('nd.fatTypeImpact')}
                        </p>
                        <p className="text-sm text-deep/70 leading-relaxed">{ft.healthImpact}</p>
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl mb-4"
                      style={{ backgroundColor: toneColor + '08' }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-wider mb-1 font-semibold"
                        style={{ color: toneColor }}
                      >
                        {t('nd.fatTypeIntake')}
                      </p>
                      <p className="text-sm text-deep/80 leading-relaxed">{ft.recommendedIntake}</p>
                      <p className="text-xs text-deep/40 mt-2">
                        {t('common.source')}: {ft.recommendedIntakeSource}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wider text-deep/40 mb-2">
                        {t('nd.fatTypeFoods')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ft.topFoods.map((food) => (
                          <span
                            key={food}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{ backgroundColor: toneColor + '12', color: toneColor }}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: toneColor + '15' }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke={toneColor}
                          strokeWidth="2"
                        >
                          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-sm text-deep/70 leading-relaxed">
                        <span className="font-medium text-deep">{t('nd.practicalAdvice')} </span>
                        {ft.practicalAdvice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Functions */}
        <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
          <h2 className="text-lg text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('nd.functions')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nutrient.functions.map((fn, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: nutrient.color + '20' }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={nutrient.color} strokeWidth="2">
                    <path d="M3 8l3 3 7-7" />
                  </svg>
                </div>
                <span className="text-sm text-deep/70">{fn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deficiency Signs */}
        <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
          <h2 className="text-lg text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('nd.deficiency')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {nutrient.deficiencySigns.map((sign, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs"
                style={{ backgroundColor: '#d95c39' + '10', color: '#d95c39' }}
              >
                {sign}
              </span>
            ))}
          </div>
        </div>

        {/* Eat Most / Limit / Avoid framing */}
        {nutrient.intakeBuckets && nutrient.intakeBuckets.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('nd.intakeFraming')}
            </h2>
            <p className="text-sm text-deep/50 mb-6">
              {t('nd.intakeFramingSub', { name: nutrient.name.toLowerCase() })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nutrient.intakeBuckets.map(b => {
                const tone = b.tone === 'good' ? '#4a7c59' : b.tone === 'avoid' ? '#d95c39' : b.tone === 'caution' ? '#c9a96e' : '#6b7d76';
                return (
                  <div key={b.label} className="p-5 rounded-2xl bg-white border" style={{ borderColor: tone + '25' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: tone + '15', color: tone }}>
                        {bucketLabel(b.label)}
                      </span>
                    </div>
                    <p className="text-sm text-deep/70 leading-relaxed mb-3">{b.why}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {b.examples.map(e => (
                        <span key={e} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: tone + '08', color: tone }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Food Sources Table */}
        <div className="mb-10">
          <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('nd.bestFoodSources')}
            </h2>
            <button
              type="button"
              onClick={() => setShowRubric(s => !s)}
              className="text-xs text-terracotta hover:underline"
            >
              {showRubric ? t('nd.rubricToggle.hide') : t('nd.rubricToggle.show')}
            </button>
          </div>
          <p className="text-sm text-deep/50 mb-4">
            {t('nd.bestFoodSourcesSub', { name: nutrient.name.toLowerCase() })}
          </p>

          {showRubric && (
            <div className="mb-5 p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {(['excellent', 'good', 'moderate'] as const).map(k => {
                const labelKey = (k === 'excellent' ? 'rating.best' : k === 'good' ? 'rating.good' : 'rating.moderate') as never;
                return (
                  <div key={k}>
                    <p className="font-semibold text-deep mb-1">{t(labelKey)}</p>
                    <p className="text-deep/60 leading-relaxed">{FOOD_RATING_RUBRIC[k].description}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dietary tag filters */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs text-deep/40 mr-1">{t('nd.filterByDiet')}</span>
            <button
              onClick={() => setTagFilter(null)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium ${tagFilter === null ? 'bg-deep text-inverse' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
            >
              {t('common.all')}
            </button>
            {(Object.keys(DIETARY_TAG_META) as DietaryTag[]).map(tag => {
              const meta = DIETARY_TAG_META[tag];
              const isActive = tagFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setTagFilter(isActive ? null : tag)}
                  title={meta.long}
                  className="text-xs px-2.5 py-1 rounded-md font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? meta.color : meta.color + '15',
                    color: isActive ? '#ffffff' : meta.color,
                  }}
                >
                  {meta.label} <span className="opacity-60 font-normal">— {meta.long}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredFoods.length === 0 && (
              <p className="text-sm text-deep/50 italic px-4 py-6 bg-white border border-deep/5 rounded-xl text-center">
                {t('nd.noFoodsForFilter')}
              </p>
            )}
            {filteredFoods.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-white border border-deep/5 hover:shadow-sm transition-shadow"
              >
                {/* Rank */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: item.category === 'excellent' ? nutrient.color + '15' : item.category === 'good' ? '#c9a96e15' : '#6b7d7615',
                      color: item.category === 'excellent' ? nutrient.color : item.category === 'good' ? '#c9a96e' : '#6b7d76',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-deep truncate">{item.name}</p>
                    <p className="text-xs text-deep/40">{item.serving}</p>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex-shrink-0">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: nutrient.color }}
                  >
                    {item.amount}
                  </span>
                </div>

                {/* Calories */}
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-xs text-deep/40">{item.calories} {locale === 'ko' ? 'kcal' : 'cal'}</span>
                </div>

                {/* Key Benefit */}
                <div className="flex-shrink-0 sm:w-56">
                  <span className="text-xs text-deep/50">{item.keyBenefit}</span>
                  {item.dietaryTags && item.dietaryTags.length > 0 && (
                    <div className="mt-1.5">
                      <DietaryTagBadge tags={item.dietaryTags} highlight={tagFilter ? [tagFilter] : undefined} />
                    </div>
                  )}
                </div>

                {/* Category badge */}
                <div className="flex-shrink-0 w-20 text-right">
                  <span
                    title={FOOD_RATING_RUBRIC[item.category].description}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium cursor-help"
                    style={{
                      backgroundColor: item.category === 'excellent' ? nutrient.color + '10' : item.category === 'good' ? '#c9a96e10' : '#6b7d7610',
                      color: item.category === 'excellent' ? nutrient.color : item.category === 'good' ? '#c9a96e' : '#6b7d76',
                    }}
                  >
                    {item.category === 'excellent' ? t('rating.best') : item.category === 'good' ? t('rating.good') : t('rating.moderate')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upper limits table (vitamins / minerals only) */}
        {nutrient.upperLimits && nutrient.upperLimits.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('nd.upperLimits')}
            </h2>
            <p className="text-sm text-deep/50 mb-5">
              {t('nd.upperLimitsSub')}
            </p>
            <div className="overflow-x-auto rounded-2xl bg-white border border-deep/5">
              <table className="w-full text-sm">
                <thead className="text-deep/40 text-xs uppercase tracking-wider">
                  <tr className="border-b border-deep/5">
                    <th className="text-left px-4 py-3 font-medium">{t('nd.upperCol1')}</th>
                    <th className="text-left px-4 py-3 font-medium">{t('nd.upperCol2')}</th>
                    <th className="text-left px-4 py-3 font-medium">{t('nd.upperCol3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrient.upperLimits.map(u => (
                    <tr key={u.nutrient} className="border-b border-deep/5 last:border-0">
                      <td className="px-4 py-3 font-medium text-deep">{u.nutrient}</td>
                      <td className="px-4 py-3 text-deep/70 font-mono text-xs">{u.ulValue}</td>
                      <td className="px-4 py-3 text-deep/60 text-xs leading-relaxed">{u.symptoms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Personalized micronutrient targets (vitamins / minerals only) */}
        {(nutrient.slug === 'vitamins' || nutrient.slug === 'minerals') && (
          <div className="mb-10 p-5 rounded-2xl bg-white border border-deep/5">
            <p className="text-caption text-terracotta mb-3">{t('nd.personalizedTargets')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {microTargets.map(m => (
                <div key={m.nutrient} className="p-3 rounded-lg bg-[#f6f5f1]">
                  <p className="text-deep/50 mb-0.5">{m.nutrient}</p>
                  <p className="text-deep font-semibold">{m.amount} {m.unit}</p>
                  <p className="text-[10px] text-deep/40 mt-0.5">{m.source}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-deep/40 mt-3">
              {t('common.editProfile')}
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
          <h2 className="text-lg text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('nd.tips')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nutrient.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#4a7c59' + '15' }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#4a7c59" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-sm text-deep/70">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        {nutrient.warning && (
          <div
            className="p-5 rounded-xl mb-10 flex items-start gap-3"
            style={{ backgroundColor: '#d95c39' + '08', border: '1px solid ' + '#d95c39' + '15' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
            </svg>
            <p className="text-sm text-deep/60">{nutrient.warning}</p>
          </div>
        )}

        {/* Navigation to other nutrients */}
        <nav className="border-t border-deep/10 pt-10" aria-label={t('nd.exploreOthers')}>
          <p className="text-caption text-deep/40 mb-4">{t('nd.exploreOthers')}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { slug: 'carbohydrates', icon: 'C', color: '#c9a96e' },
              { slug: 'proteins', icon: 'P', color: '#374640' },
              { slug: 'fats', icon: 'F', color: '#d95c39' },
              { slug: 'vitamins', icon: 'V', color: '#6b7d76' },
              { slug: 'minerals', icon: 'M', color: '#202a26' },
              { slug: 'water', icon: 'H2O', color: '#4a90a4' },
            ].filter(n => n.slug !== slug).map(n => {
              const baseN = getNutrientBySlug(n.slug);
              const koName = locale === 'ko' ? nutrientsKo[n.slug]?.name : undefined;
              const displayName = koName ?? baseN?.name ?? n.slug;
              return (
                <Link
                  key={n.slug}
                  to={`/nutrients/${n.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-sm"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(32, 42, 38, 0.06)',
                    color: n.color,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: n.color + '10' }}
                  >
                    {n.icon}
                  </span>
                  {displayName}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
    </>
  );
}
