import { Link } from 'react-router-dom';
import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

interface Penalty {
  name: string;
  trigger: string;
  delta: string;
  source: string;
}

const negativeFactors: Penalty[] = [
  { name: 'Trans fats present', trigger: '> 0g per serving', delta: '−22', source: 'WHO REPLACE Action Package, 2018' },
  { name: 'Very high added sugar', trigger: '> 50% of daily limit (>25g)', delta: '−16', source: 'AHA 2009; US Dietary Guidelines 2020–25' },
  { name: 'Very high saturated fat', trigger: '> 50% of daily limit (>6.5g)', delta: '−14', source: 'US Dietary Guidelines 2020–25 (≤10% calories)' },
  { name: 'Very high sodium', trigger: '> 50% DV (>1,150mg)', delta: '−14', source: 'AHA: ideal limit 1,500mg/day' },
  { name: 'Very high calorie serving', trigger: '> 700 cal per serving', delta: '−10', source: 'IOM dietary reference intakes' },
  { name: 'High net carbs (keto / diabetic profile only)', trigger: '> 25g net carbs', delta: '−8', source: 'Profile-specific re-weighting' },
  { name: 'Cholesterol + saturated-fat combo', trigger: '> 100% DV chol AND > 25% sat-fat DV', delta: '−6', source: 'US Dietary Guidelines 2015 (300mg cap dropped, but combo flagged)' },
  { name: 'Implausibly low protein for protein-category food', trigger: '< 5g on a labelled protein product', delta: '−5', source: 'Sanity guard against OCR errors' },
];

const positiveFactors: Penalty[] = [
  { name: 'Excellent fiber', trigger: '≥ 5g per serving', delta: '+12', source: 'IOM AI: 25–38g/day' },
  { name: 'High protein', trigger: '≥ 20g per serving', delta: '+10', source: 'WHO/FAO 0.83g/kg/day' },
  { name: 'No added sugar declared', trigger: 'Added sugar = 0g', delta: '+8', source: 'AHA / WHO recommendation' },
  { name: 'Strong micronutrient profile', trigger: '≥ 25% DV of any tracked vitamin/mineral', delta: '+8', source: 'US FDA labeling regulation 21 CFR 101.9' },
  { name: 'Whole / single-ingredient food bonus', trigger: 'Detected whole-food category', delta: '+5', source: 'NOVA classification (Monteiro et al., 2019)' },
  { name: 'Good fiber', trigger: '≥ 3g per serving', delta: '+7', source: 'FDA "good source of fiber" claim threshold' },
  { name: 'Low sodium', trigger: '≤ 160mg per serving', delta: '+4', source: 'FDA "low sodium" claim threshold' },
  { name: 'No trans fat', trigger: 'Trans fat = 0g', delta: '+3', source: 'WHO REPLACE Action Package' },
];

export default function Methodology() {
  const t = useT();
  const [locale] = useLocale();

  // FAQPage JSON-LD — high-leverage for AI search engines (Perplexity,
  // ChatGPT search, Google AIO). Each rule becomes a Q&A pair.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is the Health Index score calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Health Index starts from a category-aware baseline (65 for whole foods, 60 for beverages, 50 for most packaged foods) and applies explicit credits (fiber, protein, micronutrients) and penalties (trans fat, added sugar, saturated fat, sodium) sourced from WHO, NIH, AHA, and the US Dietary Guidelines. Profile re-weighting (Heart, Keto, High-Protein, Low-Sodium, Diabetic) scales penalties up to ~1.6×.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is cholesterol not a standalone penalty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 300 mg/day dietary cholesterol cap was dropped from the US Dietary Guidelines in 2015. Cholesterol is only penalized when combined with high saturated fat, the actually concerning pattern.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the analyzer detect calorie / macro mismatches?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The analyzer reconciles scanned macros against stated calories using Atwater factors (4 kcal/g for protein and carbs, 9 kcal/g for fat). If the numbers don\'t match within tolerance, the discrepancy is flagged for user correction before scoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this medical advice?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The Health Index is a label sanity-check and educational tool, not a substitute for a registered dietitian or physician. Special conditions like CKD, PKU, allergies, pregnancy, or diabetes require professional guidance.',
        },
      },
    ],
  };

  // HowTo JSON-LD — describes the actual process to score a label.
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to score any nutrition label with VITAL',
    description: 'Step-by-step process for scanning a packaged-food label and producing a Health Index using credits and penalties from public dietary guidelines.',
    step: [
      { '@type': 'HowToStep', name: 'Capture the label', text: 'Photograph or upload the Nutrition Facts panel. Image processing happens entirely in your browser.' },
      { '@type': 'HowToStep', name: 'Confirm OCR values', text: 'Review the auto-read calories, macros, and micronutrients. OCR is imperfect, so any flagged values must be confirmed before scoring.' },
      { '@type': 'HowToStep', name: 'Pick a dietary profile', text: 'Choose General, Heart, Keto, High-Protein, Low-Sodium, or Diabetic. The profile reweights individual penalties.' },
      { '@type': 'HowToStep', name: 'Score and review', text: 'The analyzer applies the credits-and-penalties rule set, surfaces trade-offs, and proposes a better alternative.' },
    ],
  };

  return (
    <div className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        titleKey="mt.h1"
        descriptionKey="mt.subtitle"
        path="/methodology"
        type="article"
        jsonLd={[faqJsonLd, howToJsonLd]}
      />
      <div className="max-w-[920px] mx-auto">
        <Link to="/analyzer" className="text-sm text-terracotta hover:underline mb-8 inline-block">
          ← {locale === 'ko' ? '라벨 분석기로 돌아가기' : 'Back to Label Analyzer'}
        </Link>

        <p className="text-caption text-terracotta mb-3">{t('mt.eyebrow')}</p>
        <h1 className="text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
          {t('mt.h1')}
        </h1>
        <p className="text-deep/60 max-w-2xl mb-12 leading-relaxed">
          {t('mt.subtitle')}
        </p>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-deep/5 mb-8">
          <h2 className="text-2xl text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('mt.baseline')}</h2>
          <p className="text-sm text-deep/60 mb-4">
            {locale === 'ko' ? '가점·감점을 적용하기 전 모든 점수는 기본값에서 시작합니다.' : 'We start every score at a baseline before applying penalties and credits.'}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b border-deep/5 pb-2">
              <span className="text-deep">{locale === 'ko' ? '단일 재료의 자연식품' : 'Whole / single-ingredient food'}</span>
              <span className="font-mono text-deep/70">{locale === 'ko' ? '65점' : '65 points'}</span>
            </li>
            <li className="flex justify-between border-b border-deep/5 pb-2">
              <span className="text-deep">{locale === 'ko' ? '음료' : 'Beverage'}</span>
              <span className="font-mono text-deep/70">{locale === 'ko' ? '60점' : '60 points'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-deep">{locale === 'ko' ? '포장·가공식품 (기타)' : 'Packaged / processed (default)'}</span>
              <span className="font-mono text-deep/70">{locale === 'ko' ? '50점' : '50 points'}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-deep/5 mb-8">
          <h2 className="text-2xl text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('mt.penalties')}</h2>
          <p className="text-sm text-deep/60 mb-4">{locale === 'ko' ? '기본값에서 차감됩니다. 프로필 가중치에 따라 최대 약 1.6배까지 확대될 수 있습니다.' : 'Subtracted from the baseline. Profile re-weighting can scale individual penalties up to ~1.6×.'}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-deep/10 text-left text-deep/40 text-xs uppercase tracking-wider">
                  <th className="py-2 pr-4 font-medium">{t('mt.col.factor')}</th>
                  <th className="py-2 pr-4 font-medium">{t('mt.col.trigger')}</th>
                  <th className="py-2 pr-4 font-medium">{t('mt.col.delta')}</th>
                  <th className="py-2 font-medium">{t('mt.col.source')}</th>
                </tr>
              </thead>
              <tbody>
                {negativeFactors.map(p => (
                  <tr key={p.name} className="border-b border-deep/5 last:border-0">
                    <td className="py-3 pr-4 text-deep">{p.name}</td>
                    <td className="py-3 pr-4 text-deep/60 text-xs">{p.trigger}</td>
                    <td className="py-3 pr-4 font-mono text-[#b8301f]">{p.delta}</td>
                    <td className="py-3 text-deep/40 text-xs">{p.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-deep/5 mb-8">
          <h2 className="text-2xl text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('mt.credits')}</h2>
          <p className="text-sm text-deep/60 mb-4">{locale === 'ko' ? '기본값에 더해집니다.' : 'Added to the baseline.'}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-deep/10 text-left text-deep/40 text-xs uppercase tracking-wider">
                  <th className="py-2 pr-4 font-medium">{t('mt.col.factor')}</th>
                  <th className="py-2 pr-4 font-medium">{t('mt.col.trigger')}</th>
                  <th className="py-2 pr-4 font-medium">{t('mt.col.delta')}</th>
                  <th className="py-2 font-medium">{t('mt.col.source')}</th>
                </tr>
              </thead>
              <tbody>
                {positiveFactors.map(p => (
                  <tr key={p.name} className="border-b border-deep/5 last:border-0">
                    <td className="py-3 pr-4 text-deep">{p.name}</td>
                    <td className="py-3 pr-4 text-deep/60 text-xs">{p.trigger}</td>
                    <td className="py-3 pr-4 font-mono text-[#4a7c59]">{p.delta}</td>
                    <td className="py-3 text-deep/40 text-xs">{p.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-deep/5 mb-8">
          <h2 className="text-2xl text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('mt.notes')}</h2>
          <ul className="space-y-3 text-sm text-deep/70 list-disc pl-5">
            <li>
              <strong className="text-deep">Cholesterol</strong> is not a standalone penalty. The 300mg/day cap was dropped
              from the US Dietary Guidelines in 2015. We only flag it in combination with high
              saturated fat — the actually concerning pattern.
            </li>
            <li>
              <strong className="text-deep">Fat ratio</strong> (% of calories from fat) is not the same as calorie density. A
              high fat ratio on a whole low-carb food (avocado, salmon, ground chicken) is not
              inherently negative. We only penalize a high fat ratio when paired with high
              <em> saturated</em> fat.
            </li>
            <li>
              <strong className="text-deep">Atwater check</strong>: scanned macros must roughly reconcile with stated
              calories. If they don't, we flag the discrepancy and let you correct it before scoring.
            </li>
            <li>
              <strong className="text-deep">Confirmation step</strong> is mandatory: every OCR'd value can be reviewed and
              edited before the score is generated. Auto-read values are not authoritative.
            </li>
            <li>
              <strong className="text-deep">Profile re-weighting</strong>: the General profile uses neutral 1.0× weights.
              Heart, Keto, High-Protein, Low-Sodium, and Diabetic profiles scale individual penalties
              and credits.
            </li>
            <li>
              <strong className="text-deep">Not medical advice.</strong> This tool is a quick label sanity-check, not a
              substitute for a registered dietitian or physician. Special conditions (CKD, PKU,
              specific allergies, pregnancy) need professional guidance.
            </li>
          </ul>
        </div>

        <p className="text-xs text-deep/40">
          Last updated alongside the analyzer. If you spot a rule that looks wrong or under-cites
          a guideline, please open a ticket — methodology should be defensible.
        </p>
      </div>
    </div>
  );
}
