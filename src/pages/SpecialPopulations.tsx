import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import { specialPopulationsKo } from '@/data/specialPopulations.ko';

interface PopulationGuide {
  id: string;
  title: string;
  audience: string;
  color: string;
  bgLight: string;
  emoji: string;
  intro: string;
  priorities: { name: string; target: string; rationale: string }[];
  watchOuts: string[];
  source: string;
}

const populations: PopulationGuide[] = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    audience: 'Expecting & trying to conceive',
    color: '#d95c39',
    bgLight: '#d95c3910',
    emoji: 'PG',
    intro:
      'Pregnancy increases needs for iron, folate, choline, iodine, and DHA — but caps several others (preformed vitamin A, mercury-rich fish). Add ~340 kcal in trimester 2 and ~450 kcal in trimester 3.',
    priorities: [
      { name: 'Folate (folic acid)', target: '600 mcg/day', rationale: 'Cuts neural-tube defect risk; start ≥ 1 month before conception.' },
      { name: 'Iron', target: '27 mg/day', rationale: 'Blood volume rises ~50%; deficiency tied to preterm birth.' },
      { name: 'DHA (omega-3)', target: '≥ 200 mg/day', rationale: 'Critical for fetal brain and retinal development.' },
      { name: 'Choline', target: '450 mg/day', rationale: 'Most prenatals under-deliver; eggs and meat are top sources.' },
      { name: 'Iodine', target: '220 mcg/day', rationale: 'Required for fetal neurodevelopment; iodized salt + seafood.' },
      { name: 'Calcium', target: '1,000 mg/day', rationale: 'Maintains maternal bone while building fetal skeleton.' },
    ],
    watchOuts: [
      'Avoid alcohol — no safe threshold.',
      'Limit high-mercury fish (swordfish, king mackerel, shark, bigeye tuna).',
      'Avoid raw/undercooked meat, fish, eggs, unpasteurized dairy, and deli meats unless heated.',
      'Skip preformed vitamin A supplements > 3,000 mcg/day (teratogenic). Beta-carotene from food is safe.',
      'Cap caffeine at < 200 mg/day (~1 small coffee).',
    ],
    source: 'ACOG Committee Opinion 762; NIH ODS pregnancy fact sheets',
  },
  {
    id: 'lactation',
    title: 'Lactation',
    audience: 'Breastfeeding parents',
    color: '#4a7c59',
    bgLight: '#4a7c5910',
    emoji: 'LC',
    intro:
      'Milk production adds roughly 450–500 kcal/day to your needs. Hydration and adequate iodine + DHA are the most under-emphasized nutrients in this stage.',
    priorities: [
      { name: 'Calories', target: '+450 kcal/day', rationale: 'Sustains supply without losing maternal weight too fast.' },
      { name: 'Water', target: '~3.8 L/day total fluids', rationale: 'Drink to thirst plus a glass at every nursing session.' },
      { name: 'Protein', target: '~1.3 g/kg/day', rationale: 'Supports tissue repair plus milk-protein synthesis.' },
      { name: 'Iodine', target: '290 mcg/day', rationale: 'AAP recommends a multivitamin with 150 mcg iodine while nursing.' },
      { name: 'DHA', target: '≥ 200 mg/day', rationale: 'Direct transfer to milk supports infant brain development.' },
      { name: 'Choline', target: '550 mg/day', rationale: 'Highest demand of any life stage.' },
    ],
    watchOuts: [
      'Caffeine passes into milk; cap at < 300 mg/day and watch for infant sensitivity.',
      'Alcohol: limit and time feedings ≥ 2 h after a single drink.',
      'Continue avoiding high-mercury fish.',
    ],
    source: 'AAP Section on Breastfeeding; NIH ODS',
  },
  {
    id: 'seniors',
    title: 'Older Adults (65+)',
    audience: 'Healthy aging',
    color: '#6b7d76',
    bgLight: '#6b7d7610',
    emoji: 'SR',
    intro:
      'Calorie needs drop, but protein, B12, and vitamin D needs go up. Sarcopenia (muscle loss) starts at ~30 and accelerates after 60 — aim for protein at every meal and resistance training.',
    priorities: [
      { name: 'Protein', target: '1.0–1.2 g/kg/day', rationale: 'Higher than the 0.8 g/kg RDA — preserves muscle and reduces falls.' },
      { name: 'Vitamin D', target: '20 mcg (800 IU)/day', rationale: 'Skin synthesis declines; bone and immune support.' },
      { name: 'Vitamin B12', target: '2.4 mcg/day, often supplemented', rationale: '10–30% of older adults absorb B12 poorly from food.' },
      { name: 'Calcium', target: '1,200 mg/day', rationale: 'Combats age-related bone loss.' },
      { name: 'Fiber', target: '21–30 g/day', rationale: 'Constipation is common and largely diet-driven.' },
      { name: 'Fluids', target: '~2 L/day', rationale: 'Thirst response weakens with age; dehydration is a top hospitalization driver.' },
    ],
    watchOuts: [
      'Re-evaluate sodium with any blood-pressure medication.',
      'Watch alcohol — same drink hits harder due to lower body water.',
      'Polypharmacy: many drugs (PPIs, metformin) impair B12 or magnesium.',
      'Plan resistance training 2–3×/week to convert protein into muscle.',
    ],
    source: 'NIA/NIH; ESPEN PROT-AGE position paper',
  },
  {
    id: 'athletes',
    title: 'Athletes & Active Adults',
    audience: 'Training ≥ 1 h most days',
    color: '#c9a96e',
    bgLight: '#c9a96e10',
    emoji: 'AT',
    intro:
      'Energy availability, carb timing, and protein distribution drive performance. Under-fueling is the most common error in endurance and aesthetic sports.',
    priorities: [
      { name: 'Calories', target: '~Bodyweight × 33–55 kcal', rationale: 'Higher end for endurance and strength athletes; under-fueling causes RED-S.' },
      { name: 'Protein', target: '1.4–2.0 g/kg/day', rationale: 'Distribute 0.3 g/kg per meal across 3–5 meals; emphasize leucine post-training.' },
      { name: 'Carbs (training day)', target: '5–10 g/kg/day', rationale: 'Restocks muscle glycogen for next session.' },
      { name: 'Fluids', target: 'Pre: 5–10 ml/kg; during: 0.4–0.8 L/h', rationale: 'Replace 1.25–1.5× sweat loss post-session.' },
      { name: 'Iron (especially female athletes)', target: 'Test ferritin yearly', rationale: 'Foot-strike + sweat losses cause low ferritin without classic anemia.' },
      { name: 'Vitamin D', target: '≥ 20 mcg/day', rationale: 'Linked to recovery, immune function, and bone density.' },
    ],
    watchOuts: [
      'Avoid going low-carb the day before competition.',
      'Caffeine 3–6 mg/kg ~45 min pre-event is ergogenic; > 9 mg/kg adds GI risk without further benefit.',
      'Creatine monohydrate (3–5 g/day) is the most evidence-backed legal supplement for strength sports.',
      'Replace electrolytes when sweating > 60 min, especially in heat.',
    ],
    source: 'ACSM/IOC joint position; ISSN protein recommendations',
  },
  {
    id: 'vegan',
    title: 'Vegan & Plant-Based',
    audience: 'No animal products',
    color: '#2f6244',
    bgLight: '#2f624410',
    emoji: 'VG',
    intro:
      'A well-planned plant-based diet supports every life stage. Four nutrients deserve deliberate planning: B12, vitamin D, omega-3 (EPA/DHA), and iodine.',
    priorities: [
      { name: 'Vitamin B12', target: '2.4 mcg/day from supplement or fortified food', rationale: 'Reliably absent from unfortified plant foods. Non-negotiable.' },
      { name: 'Vitamin D', target: '15–20 mcg/day', rationale: 'Lichen-derived D2/D3 supplements work; fortified plant milks help.' },
      { name: 'EPA + DHA', target: '~250–500 mg/day combined', rationale: 'Algal-oil supplement is the only direct plant source; ALA conversion is poor.' },
      { name: 'Iodine', target: '150 mcg/day', rationale: 'Use iodized salt, seaweed, or a 150 mcg supplement.' },
      { name: 'Iron (non-heme)', target: '×1.8 the standard RDA', rationale: 'Plant iron absorbs less; pair with vitamin C, avoid coffee/tea with meals.' },
      { name: 'Zinc', target: 'RDA + ~50%', rationale: 'Phytates reduce zinc absorption; soak/sprout legumes and grains.' },
      { name: 'Calcium', target: '1,000 mg/day', rationale: 'Tofu, fortified plant milk, kale, bok choy, tahini, calcium-set beans.' },
      { name: 'Protein', target: '1.0–1.1 g/kg/day', rationale: 'Combine grains + legumes across the day for complete amino acids.' },
    ],
    watchOuts: [
      'Fortified soy/pea milks are the most efficient way to hit calcium + B12 + D.',
      'Don\'t over-rely on rice + soy products — vary protein sources for amino-acid completeness.',
      'Selenium can run low outside the U.S. — 1–2 Brazil nuts every few days covers it.',
    ],
    source: 'Academy of Nutrition and Dietetics 2016 position; PCRM nutrition resources',
  },
  {
    id: 'conditions',
    title: 'Common Conditions',
    audience: 'Diabetes · hypertension · heart disease · CKD',
    color: '#374640',
    bgLight: '#37464010',
    emoji: 'RX',
    intro:
      'Coordinate dietary changes with your physician and registered dietitian — especially when on medications like blood thinners, anti-hypertensives, or insulin.',
    priorities: [
      { name: 'Type-2 Diabetes', target: 'Carbs from whole grains, legumes, vegetables; minimize added sugar', rationale: 'Mediterranean and DASH patterns improve A1c; pair carbs with protein/fat to flatten spikes.' },
      { name: 'Hypertension', target: 'DASH pattern; sodium ≤ 2,300 mg, potassium 3,500–4,700 mg', rationale: 'Sodium reduction + DASH lowers SBP comparably to a single med.' },
      { name: 'Heart Disease (ASCVD)', target: 'Saturated fat < 6% of cal; trans fat 0; ≥ 2 fatty-fish meals/week', rationale: 'Plant-rich, low-saturated-fat patterns reduce LDL and ASCVD events.' },
      { name: 'Kidney Disease (CKD)', target: 'Individualized — protein, potassium, phosphorus all matter', rationale: 'Always work with a renal dietitian; some "healthy" foods (bananas, beans) may need limits.' },
    ],
    watchOuts: [
      'Grapefruit interacts with statins, calcium-channel blockers, and several other meds.',
      'Vitamin K (leafy greens) must be kept consistent for warfarin patients — not avoided.',
      'GLP-1 agonists slow gastric emptying — smaller, protein-forward meals reduce nausea.',
    ],
    source: 'ADA Standards of Care; AHA 2021 Dietary Guidance; KDIGO',
  },
];

export default function SpecialPopulations() {
  const t = useT();
  const [locale] = useLocale();

  const localized = populations.map(p => {
    if (locale !== 'ko') return p;
    const ko = specialPopulationsKo[p.id];
    if (!ko) return p;
    return {
      ...p,
      title: ko.title ?? p.title,
      audience: ko.audience ?? p.audience,
      intro: ko.intro ?? p.intro,
      priorities: ko.priorities ?? p.priorities,
      watchOuts: ko.watchOuts ?? p.watchOuts,
    };
  });

  return (
    <section className="w-full py-16 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead titleKey="sp.h1" descriptionKey="sp.subtitle" path="/special-populations" type="article" dateModified="2026-05-30" breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Special Populations', path: '/special-populations' }]} />
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12">
          <p className="text-caption text-terracotta mb-2">{t('sp.eyebrow')}</p>
          <h1 className="text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {t('sp.h1')}
          </h1>
          <p className="text-deep/60 max-w-2xl">
            {t('sp.subtitle')}
          </p>
        </header>

        <div className="space-y-6">
          {localized.map(p => (
            <article key={p.id} className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: p.color + '20' }}>
              <header className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: p.color }}>
                  {p.emoji}
                </div>
                <div>
                  <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>{p.title}</h2>
                  <p className="text-xs text-deep/50">{p.audience}</p>
                </div>
              </header>

              <p className="text-sm text-deep/70 leading-relaxed mb-5">{p.intro}</p>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {p.priorities.map(pr => (
                  <div key={pr.name} className="rounded-xl p-3 border" style={{ backgroundColor: p.bgLight, borderColor: p.color + '15' }}>
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <dt className="text-sm font-semibold text-deep">{pr.name}</dt>
                      <dd className="text-xs font-mono text-deep/70 flex-shrink-0">{pr.target}</dd>
                    </div>
                    <p className="text-xs text-deep/60 leading-relaxed">{pr.rationale}</p>
                  </div>
                ))}
              </dl>

              <div className="bg-[#d95c39]/5 border border-[#d95c39]/15 rounded-xl p-4 mb-3">
                <p className="text-xs uppercase tracking-wider text-[#d95c39] font-semibold mb-2">{t('sp.watchOuts')}</p>
                <ul className="space-y-1">
                  {p.watchOuts.map((w, i) => (
                    <li key={i} className="text-xs text-deep/70 leading-relaxed flex items-start gap-2">
                      <span className="text-[#d95c39] mt-0.5 flex-shrink-0">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[10px] text-deep/40">{t('common.source')}: {p.source}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-[#374640]/5 border border-[#374640]/10">
          <p className="text-sm text-deep/70 leading-relaxed">
            <strong className="text-deep">{t('sp.disclaimerLabel')}:</strong> {t('sp.disclaimerBody')}
          </p>
        </div>

        <p className="text-[10px] text-deep/40 mt-4">
          {locale === 'ko' ? '최종 업데이트: 2026년 5월 30일' : 'Last updated: May 30, 2026'}
        </p>
      </div>
    </section>
  );
}
