import { useState, useEffect, useCallback } from 'react';
import { essentialAminoAcids, nonEssentialAminoAcids, aminoAcids, type AminoAcid } from '@/data/aminoAcids';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
  'nonpolar': { label: 'Nonpolar', color: '#c9a96e', bg: '#c9a96e10' },
  'polar': { label: 'Polar', color: '#4a90a4', bg: '#4a90a410' },
  'aromatic': { label: 'Aromatic', color: '#6b7d76', bg: '#6b7d7610' },
  'positively-charged': { label: 'Basic (+)', color: '#4a7c59', bg: '#4a7c5910' },
  'negatively-charged': { label: 'Acidic (-)', color: '#d95c39', bg: '#d95c3910' },
};

function AcidCard({ acid, onClick }: { acid: AminoAcid; onClick: (acid: AminoAcid) => void }) {
  const cat = categoryLabels[acid.category];
  const [locale] = useLocale();
  return (
    <button
      onClick={() => onClick(acid)}
      className="rounded-2xl border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-left w-full"
      style={{
        backgroundColor: '#ffffff',
        borderColor: acid.essential ? 'rgba(74, 124, 89, 0.2)' : 'rgba(32, 42, 38, 0.06)',
        borderLeftWidth: acid.essential ? '4px' : '1px',
        borderLeftColor: acid.essential ? '#4a7c59' : undefined,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: acid.essential ? '#4a7c59' : '#6b7d76' }}
          >
            {acid.abbreviation1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-deep">{acid.name}</h3>
              {acid.essential && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4a7c59] text-white">
                  {locale === 'ko' ? '필수' : 'Essential'}
                </span>
              )}
            </div>
            <span className="text-xs text-deep/40 font-mono">{acid.abbreviation3} — {acid.abbreviation1}</span>
          </div>
        </div>
        <span
          className="text-[10px] px-2 py-1 rounded-full font-medium flex-shrink-0"
          style={{ backgroundColor: cat.bg, color: cat.color }}
        >
          {cat.label}
        </span>
      </div>

      {/* Functions */}
      <div className="space-y-1.5 mb-3">
        {acid.functions.slice(0, 2).map((fn, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-deep/20 flex-shrink-0 mt-1.5" />
            <span className="text-xs text-deep/60 leading-relaxed">{fn}</span>
          </div>
        ))}
      </div>

      {/* Food sources */}
      <div className="flex flex-wrap gap-1">
        {acid.foodSources.slice(0, 4).map(src => (
          <span key={src} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-deep/50">
            {src}
          </span>
        ))}
        {acid.foodSources.length > 4 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-deep/30">+{acid.foodSources.length - 4}</span>
        )}
      </div>

      {/* Daily need for essential */}
      {acid.essential && acid.dailyNeed && (
        <div className="mt-3 pt-3 border-t border-deep/5">
          <span className="text-[10px] text-deep/30">RDA: {acid.dailyNeed}</span>
        </div>
      )}
    </button>
  );
}

export default function AminoAcids() {
  const t = useT();
  const [locale] = useLocale();
  const [selectedAcid, setSelectedAcid] = useState<AminoAcid | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = useCallback((acid: AminoAcid) => {
    setSelectedAcid(acid);
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setTimeout(() => setSelectedAcid(null), 200);
  }, []);

  // Close dialog on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return (
    <section className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead titleKey="aa.h1" descriptionKey="aa.subtitle" path="/amino-acids" type="article" />
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-caption text-terracotta mb-4">{t('aa.eyebrow')}</p>
          <h1
            className="text-deep mb-4"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            {t('aa.h1')}
          </h1>
          <p className="text-lg text-deep/60 max-w-2xl mx-auto mb-6">
            {t('aa.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
              <span className="text-deep/60">{t('aa.essentialBadge')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6b7d76]" />
              <span className="text-deep/60">{t('aa.nonEssentialBadge')}</span>
            </div>
          </div>
        </header>

        {/* Essential Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('aa.essentialH2')}
            </h2>
            <span className="text-xs text-deep/30">{t('aa.essentialNote')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {essentialAminoAcids.map((acid) => (
              <AcidCard key={acid.name} acid={acid} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Non-Essential Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#6b7d76]" />
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('aa.nonEssentialH2')}
            </h2>
            <span className="text-xs text-deep/30">{t('aa.nonEssentialNote')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonEssentialAminoAcids.map((acid) => (
              <AcidCard key={acid.name} acid={acid} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
          <h2 className="text-lg text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('aa.tableTitle')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-deep/10">
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">#</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '이름' : 'Name'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '약어' : 'Code'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '분류' : 'Type'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '필수 여부' : 'Essential'}</th>
                  <th className="text-left py-2 text-caption text-deep/40">{locale === 'ko' ? '주요 기능' : 'Key Function'}</th>
                </tr>
              </thead>
              <tbody>
                {aminoAcids.map((acid, i) => (
                  <tr
                    key={acid.name}
                    className="border-b border-deep/5 hover:bg-[#f6f5f1] transition-colors"
                  >
                    <td className="py-2 pr-4 text-deep/30 font-mono text-xs">{i + 1}</td>
                    <td className="py-2 pr-4 font-medium text-deep">{acid.name}</td>
                    <td className="py-2 pr-4 font-mono text-deep/50 text-xs">{acid.abbreviation3} ({acid.abbreviation1})</td>
                    <td className="py-2 pr-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: categoryLabels[acid.category]?.bg, color: categoryLabels[acid.category]?.color }}>
                        {categoryLabels[acid.category]?.label}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {acid.essential ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4a7c59] text-white font-bold">{locale === 'ko' ? '필수' : 'YES'}</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-deep/5 text-deep/30">{locale === 'ko' ? '비필수' : 'No'}</span>
                      )}
                    </td>
                    <td className="py-2 text-deep/50 text-xs max-w-[200px] truncate">{acid.functions[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BCAA + practical meal example calculator */}
        <BcaaCalculator />

        {/* Complete proteins matchmaker */}
        <CompleteProteinMatchmaker />

        {/* Complete vs. Incomplete Proteins */}
        <CompleteVsIncomplete locale={locale} />

        {/* Acid Detail Dialog */}
        <AcidDetailDialog acid={selectedAcid} open={dialogOpen} onClose={handleClose} />
      </div>
    </section>
  );
}

// === BCAA Calculator (practical meal example) ===
// Targets follow WHO/FAO 2007 amino-acid scoring patterns.
const BCAA_TARGETS_MG_PER_KG = { leucine: 39, isoleucine: 20, valine: 26 };

interface BcaaFood {
  name: string;
  serving: string;
  /** mg of leucine, isoleucine, valine per serving (USDA SR-Legacy). */
  leu: number; ile: number; val: number;
  protein: number;
}

const BCAA_FOODS: BcaaFood[] = [
  { name: 'Chicken breast (3 oz)', serving: '85 g cooked', leu: 1990, ile: 1100, val: 1180, protein: 26 },
  { name: 'Greek yogurt (1 cup)',  serving: '227 g',       leu: 2080, ile: 1140, val: 1500, protein: 22 },
  { name: 'Salmon (3 oz)',         serving: '85 g cooked', leu: 1750, ile: 1010, val: 1110, protein: 22 },
  { name: 'Eggs (2 large)',        serving: '100 g',       leu: 1090, ile: 670,  val: 870,  protein: 12 },
  { name: 'Lentils (1 cup)',       serving: '198 g cooked',leu: 1300, ile: 770,  val: 890,  protein: 18 },
  { name: 'Tofu (1/2 cup)',        serving: '126 g',       leu: 770,  ile: 470,  val: 510,  protein: 10 },
  { name: 'Quinoa (1 cup)',        serving: '185 g cooked',leu: 530,  ile: 290,  val: 350,  protein: 8 },
  { name: 'Whey protein (1 scoop)',serving: '30 g',        leu: 2700, ile: 1500, val: 1430, protein: 24 },
];

function BcaaCalculator() {
  const [profile] = useUserProfile();
  const [picked, setPicked] = useState<string[]>(['Chicken breast (3 oz)', 'Greek yogurt (1 cup)']);
  const t = useT();
  const [locale] = useLocale();

  const targets = {
    leu: Math.round(BCAA_TARGETS_MG_PER_KG.leucine * profile.weightKg),
    ile: Math.round(BCAA_TARGETS_MG_PER_KG.isoleucine * profile.weightKg),
    val: Math.round(BCAA_TARGETS_MG_PER_KG.valine * profile.weightKg),
  };

  const totals = picked.reduce(
    (acc, name) => {
      const f = BCAA_FOODS.find(b => b.name === name);
      if (!f) return acc;
      return { leu: acc.leu + f.leu, ile: acc.ile + f.ile, val: acc.val + f.val, protein: acc.protein + f.protein };
    },
    { leu: 0, ile: 0, val: 0, protein: 0 },
  );

  const toggle = (name: string) =>
    setPicked(p => (p.includes(name) ? p.filter(x => x !== name) : [...p, name]));

  return (
    <div className="p-6 rounded-2xl bg-deep text-white mb-10">
      <h3 className="text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.bcaaTitle')}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed mb-5">
        {t('aa.bcaaIntro')}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Goal label={locale === 'ko' ? '류신' : 'Leucine'}    have={totals.leu} target={targets.leu} />
        <Goal label={locale === 'ko' ? '이소류신' : 'Isoleucine'} have={totals.ile} target={targets.ile} />
        <Goal label={locale === 'ko' ? '발린' : 'Valine'}     have={totals.val} target={targets.val} />
      </div>

      <p className="text-xs text-white/50 mb-2">
        {locale === 'ko' ? '식품을 클릭해 샘플 식단에 추가/제거하세요:' : 'Tap foods to add/remove from your sample day:'}
      </p>
      <div className="flex flex-wrap gap-2">
        {BCAA_FOODS.map(f => {
          const active = picked.includes(f.name);
          return (
            <button
              key={f.name}
              onClick={() => toggle(f.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active ? 'bg-terracotta text-white' : 'bg-white/10 text-white/70 hover:bg-white/15'}`}
              title={`${f.serving} · ${f.protein}g protein · ${f.leu} mg Leu`}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-white/40 mt-4">
        {locale === 'ko'
          ? `목표: WHO/FAO 2007 (${BCAA_TARGETS_MG_PER_KG.leucine}/${BCAA_TARGETS_MG_PER_KG.isoleucine}/${BCAA_TARGETS_MG_PER_KG.valine} mg/kg) × 사용자 체중 ${profile.weightKg} kg. 프로필에서 체중을 수정할 수 있습니다.`
          : `Targets: WHO/FAO 2007 (${BCAA_TARGETS_MG_PER_KG.leucine}/${BCAA_TARGETS_MG_PER_KG.isoleucine}/${BCAA_TARGETS_MG_PER_KG.valine} mg/kg) × your ${profile.weightKg} kg. Edit weight in the Profile panel.`}
      </p>
    </div>
  );
}

function Goal({ label, have, target }: { label: string; have: number; target: number }) {
  const pct = target > 0 ? Math.min(100, (have / target) * 100) : 0;
  const met = have >= target;
  const color = met ? '#86d09a' : pct > 60 ? '#e8c987' : '#f1a07c';
  const [locale] = useLocale();
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-[11px] text-white/40 tabular-nums">
          {have} / {target} mg
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <p className="text-[10px] mt-0.5" style={{ color }}>
        {met
          ? (locale === 'ko' ? '✓ 목표 달성' : '✓ target met')
          : (locale === 'ko' ? `${Math.round(target - have)} mg 부족` : `${Math.round(target - have)} mg short`)}
      </p>
    </div>
  );
}

// === Complete-protein matchmaker (plant complementarity) ===
const COMPLEMENTS: { base: string; pairs: { food: string; rationale: string }[] }[] = [
  {
    base: 'Beans / lentils / peas',
    pairs: [
      { food: 'Brown rice / wheat / corn', rationale: 'Grains supply methionine; legumes supply lysine — combined = complete protein.' },
      { food: 'Nuts / seeds',              rationale: 'Sesame, sunflower, and pumpkin seeds plug the methionine gap.' },
      { food: 'Whole-wheat tortilla',      rationale: 'Classic combo (rice & beans, hummus & pita, dal & roti).' },
    ],
  },
  {
    base: 'Grains (rice, oats, wheat, corn)',
    pairs: [
      { food: 'Beans / lentils', rationale: 'Lysine-rich legumes complete the grain\'s amino-acid profile.' },
      { food: 'Soy / tofu / edamame', rationale: 'Soy is a complete protein on its own — instantly elevates any grain.' },
      { food: 'Dairy or eggs',   rationale: 'Animal proteins are complete and high in lysine.' },
    ],
  },
  {
    base: 'Nuts & seeds',
    pairs: [
      { food: 'Beans / lentils', rationale: 'Adds the lysine that nuts/seeds run short on.' },
      { food: 'Whole grains',    rationale: 'Peanut butter on whole-wheat toast — old-school complete pairing.' },
    ],
  },
  {
    base: 'Vegetables',
    pairs: [
      { food: 'Quinoa / soy / amaranth', rationale: 'These three plant proteins are complete on their own.' },
      { food: 'Beans + grains',          rationale: 'A bean-and-grain bowl rounds out any vegetable stir-fry.' },
    ],
  },
];

function CompleteProteinMatchmaker() {
  const [base, setBase] = useState(COMPLEMENTS[0].base);
  const current = COMPLEMENTS.find(c => c.base === base) || COMPLEMENTS[0];
  const t = useT();
  return (
    <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
      <h3 className="text-lg text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.completeTitle')}
      </h3>
      <p className="text-sm text-deep/60 leading-relaxed mb-4">
        {t('aa.completeIntro')}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {COMPLEMENTS.map(c => (
          <button
            key={c.base}
            onClick={() => setBase(c.base)}
            className={`text-xs px-3 py-1.5 rounded-md font-medium ${base === c.base ? 'bg-deep text-inverse' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
          >
            {c.base}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {current.pairs.map(p => (
          <div key={p.food} className="p-4 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10">
            <p className="text-sm font-medium text-deep mb-1">+ {p.food}</p>
            <p className="text-xs text-deep/60 leading-relaxed">{p.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// === Acid Detail Dialog ===
function AcidDetailDialog({
  acid,
  open,
  onClose,
}: {
  acid: AminoAcid | null;
  open: boolean;
  onClose: () => void;
}) {
  const [locale] = useLocale();
  if (!acid) return null;
  const cat = categoryLabels[acid.category];
  const isKo = locale === 'ko';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto p-0 gap-0"
        style={{ backgroundColor: '#ffffff', borderColor: 'rgba(32,42,38,0.08)' }}
      >
        {/* Header */}
        <div
          className="p-6 pb-4"
          style={{
            borderBottom: '1px solid rgba(32,42,38,0.06)',
            backgroundColor: acid.essential ? 'rgba(74,124,89,0.03)' : 'rgba(107,125,118,0.03)',
          }}
        >
          <div className="flex items-start gap-4">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
              style={{ backgroundColor: acid.essential ? '#4a7c59' : '#6b7d76' }}
            >
              {acid.abbreviation1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle
                  className="text-xl font-medium text-deep"
                  style={{ fontFamily: 'Playfair Display, serif', lineHeight: 1.2 }}
                >
                  {acid.name}
                </DialogTitle>
                {acid.essential && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4a7c59] text-white">
                    {isKo ? '필수' : 'Essential'}
                  </span>
                )}
              </div>
              <DialogDescription className="text-xs text-deep/40 font-mono mt-1">
                {acid.abbreviation3} — {acid.abbreviation1} ·{' '}
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: cat.bg, color: cat.color }}
                >
                  {cat.label}
                </span>
              </DialogDescription>
            </div>
          </div>
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{acid.name}</DialogTitle>
          <DialogDescription>
            {isKo ? `${acid.name}의 상세 정보` : `Detailed information about ${acid.name}`}
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Functions */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '주요 기능' : 'Key Functions'}
            </h4>
            <div className="space-y-2">
              {acid.functions.map((fn, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: (acid.essential ? '#4a7c59' : '#6b7d76') + '15' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke={acid.essential ? '#4a7c59' : '#6b7d76'} strokeWidth="2">
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                  </div>
                  <span className="text-sm text-deep/70 leading-relaxed">{fn}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Food Sources */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '식품 공급원' : 'Food Sources'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {acid.foodSources.map((src) => (
                <span
                  key={src}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: (acid.essential ? '#4a7c59' : '#6b7d76') + '10',
                    color: acid.essential ? '#4a7c59' : '#6b7d76',
                  }}
                >
                  {src}
                </span>
              ))}
            </div>
          </section>

          {/* Deficiency Effects */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '결핍 시 증상' : 'Deficiency Effects'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {acid.deficiencyEffects.map((eff, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ backgroundColor: '#d95c39' + '10', color: '#d95c39' }}
                >
                  {eff}
                </span>
              ))}
            </div>
          </section>

          {/* Daily Need */}
          {acid.dailyNeed && (
            <section
              className="p-4 rounded-xl"
              style={{ backgroundColor: acid.essential ? 'rgba(74,124,89,0.06)' : 'rgba(107,125,118,0.06)' }}
            >
              <p className="text-[10px] uppercase tracking-wider text-deep/40 mb-1">
                {isKo ? '하루 권장량' : 'Daily Requirement'}
              </p>
              <p className="text-sm font-medium text-deep">{acid.dailyNeed}</p>
              <p className="text-[10px] text-deep/30 mt-1">
                {isKo ? 'WHO/FAO 2007 기준' : 'Based on WHO/FAO 2007'}
              </p>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// === Complete vs. Incomplete Proteins (expanded) ===
const PROTEIN_COMPARISON = {
  en: {
    complete: {
      label: 'Complete Proteins',
      description: 'Contain all 9 essential amino acids in ratios that match human needs.',
      sources: ['Eggs', 'Fish', 'Chicken', 'Beef', 'Dairy', 'Quinoa', 'Soy', 'Buckwheat', 'Hemp seeds'],
      pros: ['No combining needed', 'High bioavailability (PDCAAS ~1.0)', 'Ideal for muscle repair'],
      note: 'Animal proteins are complete; only a few plant proteins (soy, quinoa, buckwheat, hemp) are complete on their own.',
    },
    incomplete: {
      label: 'Incomplete Proteins',
      description: 'Low or missing in one or more essential amino acids.',
      sources: ['Rice', 'Wheat', 'Beans', 'Lentils', 'Nuts', 'Seeds', 'Most vegetables'],
      limiting: [
        { food: 'Grains (rice, wheat, corn)', lacking: 'Lysine', richIn: 'Methionine' },
        { food: 'Legumes (beans, lentils, peas)', lacking: 'Methionine', richIn: 'Lysine' },
        { food: 'Nuts & seeds', lacking: 'Lysine', richIn: 'Methionine' },
      ],
      note: 'Not inferior — just pair them across the day. Your body pools amino acids for ~24 hours.',
    },
    myth: {
      title: 'Myth-buster: You do NOT need to combine proteins in the same meal.',
      body: 'Research (Young & Pellett, 1994; Academy of Nutrition & Dietetics) shows that eating a variety of plant proteins across the day is sufficient. Your body maintains a free amino-acid pool and can assemble complete proteins from meals eaten hours apart.',
    },
  },
  ko: {
    complete: {
      label: '완전 단백질',
      description: '9가지 필수 아미노산을 모두 포함하고, 인체 필요 비율에 맞춰 제공합니다.',
      sources: ['계란', '생선', '닭고기', '쇠고기', '유제품', '퀴노아', '대두', '메밀', '햄프씨드'],
      pros: ['별도 조합 불필요', '생체이용률 높음 (PDCAAS ~1.0)', '근육 회복에 최적'],
      note: '동물성 단백질은 모두 완전 단백질이며, 식물성 중에서는 대두·퀴노아·메밀·햄프씨드 등 소수만이 완전 단백질입니다.',
    },
    incomplete: {
      label: '불완전 단백질',
      description: '하나 이상의 필수 아미노산이 부족하거나 비율이 낮습니다.',
      sources: ['쌀', '밀', '콩', '렌틸', '견과', '씨앗', '대부분의 채소'],
      limiting: [
        { food: '곡류(쌀, 밀, 옥수수)', lacking: '라이신', richIn: '메티오닌' },
        { food: '콩류(강낭콩, 렌틸, 완두)', lacking: '메티오닌', richIn: '라이신' },
        { food: '견과·씨앗', lacking: '라이신', richIn: '메티오닌' },
      ],
      note: '열등한 것이 아닙니다 — 하루 안에 조합만 해 주면 됩니다. 몸은 약 24시간 동안 아미노산을 저장·조합합니다.',
    },
    myth: {
      title: '오해 바로잡기: 같은 끼니에 꼭 조합할 필요는 없습니다.',
      body: '연구(Young & Pellett, 1994; 미국영양·식이학회)에 따르면, 하루 동안 다양한 식물성 단백질을 섭취하는 것으로 충분합니다. 몸은 자유 아미노산 풀을 유지하며, 몇 시간 간격으로 먹은 식사에서도 완전 단백질을 조합할 수 있습니다.',
    },
  },
};

function CompleteVsIncomplete({ locale }: { locale: 'en' | 'ko' }) {
  const data = PROTEIN_COMPARISON[locale];
  const [activeTab, setActiveTab] = useState<'complete' | 'incomplete'>('complete');
  const t = useT();

  return (
    <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
      <h3 className="text-lg text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.completeNoteTitle')}
      </h3>
      <p className="text-sm text-deep/60 leading-relaxed mb-5">
        {locale === 'ko'
          ? '"완전 단백질"은 9가지 필수 아미노산을 충분한 비율로 모두 포함합니다. 동물성 식품은 대체로 완전 단백질이고, 대부분의 식물성 단백질은 한 가지 이상이 부족하지만 하루 안에 조합하면 완전한 프로필을 만들 수 있습니다.'
          : 'A "complete protein" contains all nine essential amino acids in adequate proportions. Animal sources are typically complete. Most plant sources are "incomplete" — but combining them across the day creates a complete amino-acid profile.'}
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(['complete', 'incomplete'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab
                ? tab === 'complete'
                  ? 'bg-[#4a7c59] text-white'
                  : 'bg-[#c9a96e] text-white'
                : 'bg-surface text-deep/60 hover:bg-deep/10'
            }`}
          >
            {data[tab].label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="space-y-5">
        <p className="text-sm text-deep/70 leading-relaxed">{data[activeTab].description}</p>

        {/* Sources */}
        <div>
          <p className="text-xs uppercase tracking-wider text-deep/40 mb-2">
            {locale === 'ko' ? '대표 식품' : 'Common Sources'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data[activeTab].sources.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: activeTab === 'complete' ? '#4a7c5910' : '#c9a96e10',
                  color: activeTab === 'complete' ? '#4a7c59' : '#c9a96e',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Pros / Limiting amino acids */}
        {activeTab === 'complete' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.complete.pros.map((pro, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#4a7c59]/5 border border-[#4a7c59]/10">
                <p className="text-xs text-deep/70">{pro}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-deep/5">
            <table className="w-full text-sm">
              <thead className="text-deep/40 text-xs uppercase tracking-wider">
                <tr className="border-b border-deep/5">
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '식품군' : 'Food Group'}</th>
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '부족한 아미노산' : 'Limiting Amino Acid'}</th>
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '풍부한 아미노산' : 'Rich In'}</th>
                </tr>
              </thead>
              <tbody>
                {data.incomplete.limiting.map((row) => (
                  <tr key={row.food} className="border-b border-deep/5 last:border-0">
                    <td className="px-4 py-3 text-deep font-medium text-xs">{row.food}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d95c39]/10 text-[#d95c39] font-medium">
                        {row.lacking}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] font-medium">
                        {row.richIn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-deep/50 leading-relaxed italic">{data[activeTab].note}</p>
      </div>

      {/* Myth-buster box */}
      <div className="mt-6 p-4 rounded-xl bg-[#4a90a4]/5 border border-[#4a90a4]/10">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#4a90a4]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a90a4" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-deep mb-1">{data.myth.title}</p>
            <p className="text-xs text-deep/60 leading-relaxed">{data.myth.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
