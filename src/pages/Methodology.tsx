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

const negativeFactorsKo: Penalty[] = [
  { name: '트랜스지방 함유', trigger: '1회 제공량당 > 0g', delta: '−22', source: 'WHO REPLACE 실행 패키지, 2018' },
  { name: '매우 높은 첨가당 함량', trigger: '일일 제한량의 > 50% (>25g)', delta: '−16', source: '미국심장학회(AHA) 2009; 미국 식생활 지침 2020–25' },
  { name: '매우 높은 포화지방 함량', trigger: '일일 제한량의 > 50% (>6.5g)', delta: '−14', source: '미국 식생활 지침 2020–25 (총 열량의 ≤10%)' },
  { name: '매우 높은 나트륨 함량', trigger: '일일 권장량(DV)의 > 50% (>1,150mg)', delta: '−14', source: '미국심장협회(AHA) 권장 하루 이상적 제한량 1,500mg' },
  { name: '1회 제공량당 고칼로리', trigger: '1회 제공량당 > 700 kcal', delta: '−10', source: '미국 의학한림원(IOM) 영양섭취기준' },
  { name: '높은 순 탄수화물 (키토 / 당뇨 프로필 전용)', trigger: '순 탄수화물 > 25g', delta: '−8', source: '선택 식단 프로필 가중치 적용' },
  { name: '콜레스테롤 + 포화지방 동시 함유', trigger: '콜레스테롤 DV > 100% 및 포화지방 DV > 25%', delta: '−6', source: '미국 식생활 지침 2015 (300mg 제한은 해제되었으나 동시 섭취 경고)' },
  { name: '단백질 식품의 비정상적으로 낮은 단백질 함량', trigger: '표기된 단백질 제품에서 단백질 < 5g', delta: '−5', source: 'OCR 오류 방지 장치' },
];

const positiveFactorsKo: Penalty[] = [
  { name: '매우 우수한 식이섬유 공급원', trigger: '1회 제공량당 ≥ 5g', delta: '+12', source: 'IOM 충분섭취량: 하루 25–38g' },
  { name: '고단백 식품', trigger: '1회 제공량당 ≥ 20g', delta: '+10', source: 'WHO/FAO 하루 0.83g/kg' },
  { name: '첨가당 없음 선언', trigger: '첨가당 = 0g', delta: '+8', source: '미국심장협회(AHA) 및 세계보건기구(WHO) 권장 사항' },
  { name: '우수한 미량영양소 프로필', trigger: '추적 비타민/미네랄 중 하나라도 DV ≥ 25%', delta: '+8', source: '미국 FDA 라벨링 규정 21 CFR 101.9' },
  { name: '자연식 / 단일 재료 식품 보너스', trigger: '가공되지 않은 자연 식품군 감지', delta: '+5', source: 'NOVA 식품 분류 체계 (Monteiro et al., 2019)' },
  { name: '우수한 식이섬유 공급원', trigger: '1회 제공량당 ≥ 3g', delta: '+7', source: 'FDA "식이섬유 우수 공급원" 기준치' },
  { name: '저나트륨 식품', trigger: '1회 제공량당 ≤ 160mg', delta: '+4', source: 'FDA "저나트륨" 기준치' },
  { name: '트랜스지방 없음', trigger: '트랜스지방 = 0g', delta: '+3', source: 'WHO REPLACE 실행 패키지' },
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
        dateModified="2026-05-30"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Methodology', path: '/methodology' }]}
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
                {(locale === 'ko' ? negativeFactorsKo : negativeFactors).map(p => (
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
                {(locale === 'ko' ? positiveFactorsKo : positiveFactors).map(p => (
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
          {locale === 'ko' ? (
            <ul className="space-y-3 text-sm text-deep/70 list-disc pl-5">
              <li>
                <strong className="text-deep">콜레스테롤</strong>은 단독 감점 항목이 아닙니다. 하루 300mg 섭취 제한 기준은 2015년 미국 식생활 지침에서 폐지되었습니다. 실제로 건강에 실제로 악영향을 주는 포화지방이 과다한 상황에서 동시에 검출될 때만 감점(조합 위험)이 적용됩니다.
              </li>
              <li>
                <strong className="text-deep">지방 비율</strong>(총 열량 대비 지방 열량 비율)은 칼로리 밀도와 다릅니다. 아보카도, 연어, 다진 닭고기 같은 가공되지 않은 고단백/고지방 식품의 높은 지방 비율 자체를 감점하지 않습니다. 지방 비율에 대한 감점은 포화지방이 과다할 때만 연계되어 부과됩니다.
              </li>
              <li>
                <strong className="text-deep">Atwater 검증</strong>: 자동 판독된 3대 영양소 총합의 환산 칼로리와 라벨상의 칼로리가 대략 일치하는지 비교합니다. 오차가 허용 범위를 넘는 경우 분석 시작 전에 사용자에게 안내 경고를 보냅니다.
              </li>
              <li>
                <strong className="text-deep">검토 및 확인 필수</strong>: OCR 스캔에 오차가 있을 수 있으므로 점수 판정 전 사용자가 모든 인식값을 검토하고 교정할 수 있는 확인 체크 박스와 편집 폼을 제공합니다.
              </li>
              <li>
                <strong className="text-deep">프로필 재가중치 적용</strong>: 기본(General) 프로필은 1.0배 가중치로 평가하지만, 심장 건강(Heart), 키토(Keto), 고단백(High-Protein), 저나트륨(Low-Sodium), 당뇨 관리(Diabetic) 식단 유형에서는 특정 성분의 감점 및 가점 가중치를 최대 1.6배까지 조절하여 나에게 맞춘 점수를 보여줍니다.
              </li>
              <li>
                <strong className="text-deep">의학적 조언이 아닙니다.</strong> 이 도구는 라벨의 영양 균형도를 확인해 주는 교육적 도구일 뿐 의사나 전문 영양사의 개별 진단을 대신할 수 없습니다. 만성 신장질환(CKD, 만성 콩팥병), 페닐케톤뇨증(PKU), 식품 알레르기, 당뇨나 임신 등의 특수 상황은 전문 상담을 받아야 합니다.
              </li>
            </ul>
          ) : (
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
          )}
        </div>

        <p className="text-xs text-deep/40">
          {locale === 'ko'
            ? '최종 업데이트: 2026년 5월 30일. 규칙에 오류가 있거나 출처가 부족해 보이면 티켓을 열어주세요 — 방법론은 방어 가능해야 합니다.'
            : 'Last updated: May 30, 2026. If you spot a rule that looks wrong or under-cites a guideline, please open a ticket — methodology should be defensible.'}
        </p>
      </div>
    </div>
  );
}
