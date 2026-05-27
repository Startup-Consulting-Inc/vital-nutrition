import { useState, useMemo } from 'react';
import { foodCatalog, searchCatalog, type CatalogEntry } from '@/lib/foodCatalog';
import { analyzeNutritionLabel, type NutritionFacts } from '@/lib/nutritionAnalyzer';
import HealthScoreGauge from '@/components/HealthScoreGauge';
import { useUserProfile, personalizedTargets } from '@/hooks/useUserProfile';
import { useT, useLocale, type Translator } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

interface NutrientRow {
  labelKey: Parameters<Translator>[0];
  unit: string;
  key: keyof NutritionFacts;
  /** When true, lower is better (negative nutrient). */
  lowerIsBetter: boolean;
}

const ROWS: NutrientRow[] = [
  { labelKey: 'common.calories', unit: '', key: 'calories', lowerIsBetter: true },
  { labelKey: 'common.protein', unit: 'g', key: 'protein', lowerIsBetter: false },
  { labelKey: 'common.fat', unit: 'g', key: 'totalFat', lowerIsBetter: true },
  { labelKey: 'common.satFat', unit: 'g', key: 'saturatedFat', lowerIsBetter: true },
  { labelKey: 'common.transFat', unit: 'g', key: 'transFat', lowerIsBetter: true },
  { labelKey: 'common.cholesterol', unit: 'mg', key: 'cholesterol', lowerIsBetter: true },
  { labelKey: 'common.sodium', unit: 'mg', key: 'sodium', lowerIsBetter: true },
  { labelKey: 'common.carbs', unit: 'g', key: 'totalCarbs', lowerIsBetter: true },
  { labelKey: 'common.fiber', unit: 'g', key: 'dietaryFiber', lowerIsBetter: false },
  { labelKey: 'common.sugar', unit: 'g', key: 'totalSugar', lowerIsBetter: true },
  { labelKey: 'common.addedSugar', unit: 'g', key: 'addedSugar', lowerIsBetter: true },
];

function FoodPicker({
  selected,
  onSelect,
  side,
  sideLabel,
}: {
  selected: CatalogEntry | null;
  onSelect: (entry: CatalogEntry) => void;
  side: 'A' | 'B';
  sideLabel: string;
}) {
  const [query, setQuery] = useState('');
  const [locale] = useLocale();
  const results = useMemo(() => searchCatalog(query).slice(0, 30), [query]);

  return (
    <div className="bg-white rounded-2xl border border-deep/5 p-5">
      <p className="text-caption text-terracotta mb-3">{sideLabel}</p>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={locale === 'ko' ? `식품 검색 (${side})…` : `Search foods (item ${side})…`}
        className="w-full px-3 py-2 rounded-lg border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40 mb-3"
      />
      <div className="max-h-56 overflow-y-auto space-y-1">
        {results.map(r => {
          const isActive = selected?.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive ? 'bg-terracotta text-white' : 'hover:bg-deep/5 text-deep/70'
              }`}
            >
              <span className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-deep/10 text-deep/70'}`}>
                {r.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{r.name}</p>
                <p className={`text-[10px] ${isActive ? 'text-white/70' : 'text-deep/40'}`}>
                  {r.data.servingSize} · {r.data.calories} {locale === 'ko' ? 'kcal' : 'cal'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Compare() {
  const [a, setA] = useState<CatalogEntry | null>(foodCatalog[0]);
  const [b, setB] = useState<CatalogEntry | null>(foodCatalog[1]);
  const [profile] = useUserProfile();
  const [locale] = useLocale();
  const t = useT();
  const targets = personalizedTargets(profile);

  const analysisA = a ? analyzeNutritionLabel(a.data) : null;
  const analysisB = b ? analyzeNutritionLabel(b.data) : null;

  const fiberH2 = locale === 'ko'
    ? '식이섬유: 가장 부족한 영양소'
    : 'Fiber: the most underconsumed nutrient';
  const fiberLead = locale === 'ko'
    ? `평균 미국인은 하루 약 15g만 섭취 — 권장량 ${targets.fiberG}g의 절반 수준입니다. 67건의 무작위 대조 연구(Brown et al., AJCN 1999), POUNDS Lost 임상(Sacks et al., NEJM 2009) 인용.`
    : `The average American consumes only ~15g/day — about half of the recommended ${targets.fiberG}g. Citing 67 controlled trials (Brown et al., AJCN 1999) and POUNDS Lost trial (Sacks et al., NEJM 2009).`;

  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead titleKey="cp.h1" descriptionKey="cp.subtitle" path="/compare" type="article" />
      <div className="max-w-[1100px] mx-auto">
        <header className="text-center mb-10">
          <p className="text-caption text-terracotta mb-3">{t('cp.eyebrow')}</p>
          <h1 className="text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {t('cp.h1')}
          </h1>
          <p className="text-deep/60 max-w-xl mx-auto">
            {t('cp.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FoodPicker selected={a} onSelect={setA} side="A" sideLabel={t('cp.itemA')} />
          <FoodPicker selected={b} onSelect={setB} side="B" sideLabel={t('cp.itemB')} />
        </div>

        {a && b && analysisA && analysisB && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ScoreCard entry={a} score={analysisA.overallScore} grade={analysisA.grade} color={analysisA.gradeColor} sideLabel={t('cp.itemA')} />
              <ScoreCard entry={b} score={analysisB.overallScore} grade={analysisB.grade} color={analysisB.gradeColor} sideLabel={t('cp.itemB')} />
            </div>

            <div className="bg-white rounded-2xl border border-deep/5 overflow-hidden mb-8">
              <div className="px-5 py-4 border-b border-deep/5 flex items-center justify-between">
                <h2 className="text-lg text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>{t('cp.diff')}</h2>
                <p className="text-xs text-deep/40">{t('cp.diffHint')}</p>
              </div>
              <table className="w-full text-sm">
                <thead className="text-deep/40 text-xs uppercase tracking-wider">
                  <tr className="border-b border-deep/5">
                    <th className="text-left px-5 py-3 font-medium">{t('nd.upperCol1')}</th>
                    <th className="text-right px-3 py-3 font-medium">{a.name.split(' ')[0]}</th>
                    <th className="text-right px-3 py-3 font-medium">{b.name.split(' ')[0]}</th>
                    <th className="text-right px-5 py-3 font-medium">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(row => {
                    const va = (a.data[row.key] as number) || 0;
                    const vb = (b.data[row.key] as number) || 0;
                    const diff = vb - va;
                    const winnerIsA = row.lowerIsBetter ? va < vb : va > vb;
                    const tie = va === vb;
                    return (
                      <tr key={String(row.key)} className="border-b border-deep/5 last:border-0">
                        <td className="px-5 py-3 text-deep">
                          {t(row.labelKey)}
                          <span className="text-deep/40 text-xs ml-1.5">{row.lowerIsBetter ? `(${t('cp.lowerBetter')})` : `(${t('cp.higherBetter')})`}</span>
                        </td>
                        <td className={`px-3 py-3 text-right font-mono tabular-nums ${winnerIsA && !tie ? 'text-[#4a7c59] font-semibold' : 'text-deep/70'}`}>
                          {va}{row.unit}
                        </td>
                        <td className={`px-3 py-3 text-right font-mono tabular-nums ${!winnerIsA && !tie ? 'text-[#4a7c59] font-semibold' : 'text-deep/70'}`}>
                          {vb}{row.unit}
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-xs text-deep/50">
                          {diff > 0 ? '+' : ''}{Math.round(diff * 10) / 10}{row.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <PercentBar label={t('common.protein')} value={a.data.protein} target={targets.proteinG} unit="g" higherBetter />
              <PercentBar label={t('common.fiber')} value={a.data.dietaryFiber} target={targets.fiberG} unit="g" higherBetter />
              <PercentBar label={t('common.sodium')} value={a.data.sodium} target={targets.sodiumMg} unit="mg" higherBetter={false} />
              <PercentBar label={t('common.protein')} value={b.data.protein} target={targets.proteinG} unit="g" higherBetter blueRail />
              <PercentBar label={t('common.fiber')} value={b.data.dietaryFiber} target={targets.fiberG} unit="g" higherBetter blueRail />
              <PercentBar label={t('common.sodium')} value={b.data.sodium} target={targets.sodiumMg} unit="mg" higherBetter={false} blueRail />
            </div>
          </>
        )}

        {/* Original comparison context */}
        <div className="bg-white rounded-2xl border border-deep/5 p-6 sm:p-8">
          <h2 className="text-2xl text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {fiberH2}
          </h2>
          <p className="text-sm text-deep/60 mb-6">
            {fiberLead}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {(locale === 'ko' ? [
              { label: '심장 질환', mech: '수용성 식이섬유가 콜레스테롤과 결합', evidence: '67건 임상, AJCN 1999' },
              { label: '제2형 당뇨', mech: '포도당 흡수 속도 둔화', evidence: '위험 20–30% 감소' },
              { label: '체중 관리', mech: '포만감 증가', evidence: 'POUNDS Lost 임상' },
              { label: '대장암', mech: '장 통과 시간 단축', evidence: 'WCRF 메타분석' },
            ] : [
              { label: 'Heart disease', mech: 'Soluble fiber binds cholesterol', evidence: '67 trials, AJCN 1999' },
              { label: 'Type 2 diabetes', mech: 'Slows glucose absorption', evidence: '20–30% lower risk' },
              { label: 'Weight management', mech: 'Increases satiety', evidence: 'POUNDS Lost trial' },
              { label: 'Colorectal cancer', mech: 'Reduces transit time', evidence: 'WCRF meta-analysis' },
            ]).map(s => <FiberStat key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCard({
  entry, score, grade, color, sideLabel,
}: { entry: CatalogEntry; score: number; grade: string; color: string; sideLabel: string }) {
  return (
    <div className="bg-white rounded-2xl border border-deep/5 p-5 flex items-center gap-5">
      <HealthScoreGauge score={score} grade={grade} gradeColor={color} category="" size={140} />
      <div>
        <p className="text-caption text-deep/40 mb-1">{sideLabel}</p>
        <h3 className="text-lg text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{entry.name}</h3>
        <p className="text-xs text-deep/50">{entry.data.servingSize}</p>
        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-white" style={{ backgroundColor: color }}>
          {grade} · {score}
        </span>
      </div>
    </div>
  );
}

function PercentBar({
  label, value, target, unit, higherBetter, blueRail,
}: { label: string; value: number; target: number; unit: string; higherBetter: boolean; blueRail?: boolean }) {
  const pct = Math.min(150, target > 0 ? (value / target) * 100 : 0);
  const isGood = higherBetter ? pct >= 20 : pct <= 30;
  const color = isGood ? '#4a7c59' : pct > 60 && !higherBetter ? '#d95c39' : '#c9a96e';
  return (
    <div className={`p-4 rounded-xl ${blueRail ? 'bg-[#374640]/5 border border-[#374640]/10' : 'bg-white border border-deep/5'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-deep">{label}</span>
        <span className="text-[11px] text-deep/40">{Math.round(value * 10) / 10}{unit} / {target}{unit}</span>
      </div>
      <div className="h-2 bg-deep/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }} />
      </div>
      <PercentBarLabel pct={pct} />
    </div>
  );
}

function PercentBarLabel({ pct }: { pct: number }) {
  const [locale] = useLocale();
  return (
    <p className="text-[10px] text-deep/40 mt-1">
      {locale === 'ko' ? `하루 목표 대비 ${Math.round(pct)}%` : `${Math.round(pct)}% of your daily target`}
    </p>
  );
}

function FiberStat({ label, mech, evidence }: { label: string; mech: string; evidence: string }) {
  return (
    <div className="p-4 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10">
      <p className="font-medium text-deep mb-1 text-sm">{label}</p>
      <p className="text-xs text-deep/60 mb-2 leading-relaxed">{mech}</p>
      <span className="text-[10px] px-2 py-0.5 rounded bg-[#4a7c59]/10 text-[#4a7c59] font-medium">{evidence}</span>
    </div>
  );
}
