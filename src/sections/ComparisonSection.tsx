import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const goodNutrients = [
  { name: 'Soluble Fiber', effect: 'Lowers LDL cholesterol', source: 'Oats, beans, apples', strength: 95 },
  { name: 'Omega-3 (EPA/DHA)', effect: 'Reduces inflammation', source: 'Fatty fish, walnuts', strength: 92 },
  { name: 'Vitamin C', effect: 'Collagen synthesis, antioxidant', source: 'Citrus, bell peppers', strength: 88 },
  { name: 'Potassium', effect: 'Blood pressure regulation', source: 'Bananas, potatoes', strength: 85 },
  { name: 'Complex Carbs', effect: 'Sustained energy release', source: 'Whole grains, legumes', strength: 82 },
];

const badNutrients = [
  { name: 'Trans Fats', effect: 'Raises LDL, lowers HDL', source: 'Fried foods, baked goods', strength: 98, danger: true },
  { name: 'Added Sugars', effect: 'Insulin resistance, obesity', source: 'Sodas, desserts, candy', strength: 94, danger: true },
  { name: 'Excess Sodium', effect: 'Hypertension, stroke risk', source: 'Processed foods', strength: 90, danger: true },
  { name: 'Saturated Fats', effect: 'LDL cholesterol increase', source: 'Fatty meats, butter', strength: 78, danger: true },
  { name: 'Refined Carbs', effect: 'Blood sugar spikes', source: 'White bread, pastries', strength: 72, danger: true },
];

const fiberBenefits = [
  { benefit: 'Heart disease prevention', mechanism: 'Soluble fiber binds cholesterol', evidence: '67 controlled trials' },
  { benefit: 'Type 2 diabetes prevention', mechanism: 'Slows glucose absorption', evidence: '20-30% lower risk' },
  { benefit: 'Weight management', mechanism: 'Increases satiety', evidence: 'POUNDS Lost study' },
  { benefit: 'Colorectal cancer prevention', mechanism: 'Reduces carcinogen exposure', evidence: 'Multiple meta-analyses' },
];

function BarChart({ items, color }: { items: typeof goodNutrients; color: string }) {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars) return;

    const ctx = gsap.context(() => {
      const barElements = bars.querySelectorAll('.bar-fill');
      gsap.fromTo(
        barElements,
        { width: 0 },
        {
          width: (i: number) => `${items[i].strength}%`,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bars,
            start: 'top 80%',
          },
        }
      );
    }, bars);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={barsRef} className="space-y-4">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-deep">{item.name}</span>
            <span className="text-xs text-deep/50">{item.source}</span>
          </div>
          <div className="h-3 bg-deep/5 rounded-full overflow-hidden">
            <div
              className="bar-fill h-full rounded-full transition-all duration-1000"
              style={{ backgroundColor: color, width: 0 }}
            />
          </div>
          <p className="text-xs text-deep/60 mt-1">{item.effect}</p>
        </div>
      ))}
    </div>
  );
}

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.compare-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 px-6"
      style={{ backgroundColor: '#e6e4dc' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-caption text-terracotta mb-4">Good vs. Harmful</p>
          <h2 className="text-display text-deep mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
            Nutrient Impact
          </h2>
          <p className="text-lg text-deep/60 max-w-3xl mx-auto">
            Understanding which nutrients actively promote health versus those that cause harm when consumed in excess.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="compare-card p-8 rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
              <h3 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
                Beneficial Nutrients
              </h3>
            </div>
            <BarChart items={goodNutrients} color="#4a7c59" />
          </div>

          <div className="compare-card p-8 rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#d95c39]" />
              <h3 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
                Harmful Nutrients
              </h3>
            </div>
            <BarChart items={badNutrients} color="#d95c39" />
          </div>
        </div>

        <div className="compare-card p-8 rounded-2xl bg-white shadow-sm">
          <h3
            className="text-2xl text-deep mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Fiber: The Most Underconsumed Nutrient
          </h3>
          <p className="text-sm text-deep/60 mb-8">
            The average American consumes only 15g/day — half the recommended 25-38g. Here are the proven benefits:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fiberBenefits.map((item, i) => (
              <div
                key={item.benefit}
                className="p-5 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10 hover:border-[#4a7c59]/30 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-[#4a7c59] mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h4 className="font-medium text-deep mb-2">{item.benefit}</h4>
                <p className="text-xs text-deep/60 mb-3">{item.mechanism}</p>
                <span className="text-xs px-2 py-1 rounded bg-[#4a7c59]/10 text-[#4a7c59] font-medium">
                  {item.evidence}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
