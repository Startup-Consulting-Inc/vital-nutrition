import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NutrientData {
  name: string;
  category: string;
  function: string;
  sources: string[];
  rda: string;
  calories?: string;
  icon: string;
  color: string;
}

const nutrients: NutrientData[] = [
  {
    name: 'Carbohydrates',
    category: 'Macronutrient',
    function: 'Primary energy source for brain and muscles. Provides 4 calories per gram.',
    sources: ['Whole grains', 'Legumes', 'Fruits', 'Vegetables'],
    rda: '45-65% of daily calories',
    calories: '4 cal/g',
    icon: 'C',
    color: '#d95c39',
  },
  {
    name: 'Proteins',
    category: 'Macronutrient',
    function: 'Building and repairing tissues, enzymes, hormones, and immune function.',
    sources: ['Chicken breast', 'Salmon', 'Lentils', 'Greek yogurt', 'Eggs'],
    rda: '10-35% of daily calories (0.8g/kg body weight)',
    calories: '4 cal/g',
    icon: 'P',
    color: '#374640',
  },
  {
    name: 'Fats',
    category: 'Macronutrient',
    function: 'Energy storage, hormone production, cell membrane formation, vitamin absorption.',
    sources: ['Olive oil', 'Avocados', 'Nuts', 'Fatty fish', 'Seeds'],
    rda: '20-35% of daily calories',
    calories: '9 cal/g',
    icon: 'F',
    color: '#ffe8b2',
  },
  {
    name: 'Vitamins',
    category: 'Micronutrient',
    function: 'Coenzymes, antioxidants, gene expression regulators. Essential for metabolic processes.',
    sources: ['Citrus fruits', 'Leafy greens', 'Fortified foods', 'Sunlight (Vit D)'],
    rda: 'Varies by vitamin (mg to mcg)',
    icon: 'V',
    color: '#6b7d76',
  },
  {
    name: 'Minerals',
    category: 'Micronutrient',
    function: 'Bone structure, fluid balance, nerve transmission, enzymatic reactions.',
    sources: ['Dairy (Calcium)', 'Red meat (Iron)', 'Bananas (Potassium)', 'Nuts (Magnesium)'],
    rda: 'Varies by mineral',
    icon: 'M',
    color: '#202a26',
  },
  {
    name: 'Water',
    category: 'Essential',
    function: 'Temperature regulation, nutrient transport, waste removal, joint lubrication.',
    sources: ['Water', 'Beverages', 'Fruits', 'Vegetables', 'Soups'],
    rda: '2.7-3.7 liters per day',
    icon: 'H₂O',
    color: '#4a90a4',
  },
];

const proteinSources = [
  { name: 'Chicken breast', serving: '3 oz (85g)', protein: '26g', note: 'Choose skinless to reduce saturated fat' },
  { name: 'Salmon', serving: '3 oz (85g)', protein: '22g', note: 'Rich in omega-3 fatty acids' },
  { name: 'Lentils (cooked)', serving: '1 cup', protein: '18g', note: 'High in fiber and iron' },
  { name: 'Greek yogurt', serving: '1 cup', protein: '20g', note: 'Probiotics for gut health' },
  { name: 'Eggs', serving: '2 large', protein: '12g', note: 'Complete protein, versatile' },
  { name: 'Tofu', serving: '1/2 cup', protein: '10g', note: 'Plant-based complete protein' },
  { name: 'Black beans', serving: '1 cup', protein: '15g', note: 'High in fiber, folate' },
  { name: 'Almonds', serving: '1/4 cup', protein: '8g', note: 'Healthy fats, vitamin E' },
];

function NutrientCard({ nutrient, isActive, onClick }: {
  nutrient: NutrientData;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 border ${
        isActive
          ? 'bg-white border-terracotta/30 shadow-xl shadow-terracotta/5 scale-[1.02]'
          : 'bg-white/50 border-transparent hover:bg-white hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{ backgroundColor: nutrient.color + '15', color: nutrient.color }}
        >
          {nutrient.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-deep">{nutrient.name}</h3>
            <span className="text-caption text-muted-sage">{nutrient.category}</span>
          </div>
          <p className="text-sm text-deep/70 leading-relaxed mb-3">{nutrient.function}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {nutrient.sources.map((s) => (
              <span key={s} className="text-xs px-3 py-1 rounded-full bg-surface text-deep/80">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-caption text-terracotta">{nutrient.rda}</span>
            {nutrient.calories && (
              <span className="text-xs px-2 py-1 rounded bg-deep text-inverse font-mono">
                {nutrient.calories}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NutrientIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeNutrient, setActiveNutrient] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
      id="nutrients"
      ref={sectionRef}
      className="w-full py-32 px-6"
      style={{ backgroundColor: '#f6f5f1' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="text-caption text-terracotta mb-4">Nutrient Intelligence</p>
              <h2 className="text-display text-deep mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
                The Big Six
              </h2>
              <p className="text-base text-deep/70 leading-relaxed mb-8">
                The human body requires six major classes of nutrients to function optimally: carbohydrates, proteins, fats, vitamins, minerals, and water. These work synergistically to support every physiological process.
              </p>

              <div className="hidden lg:block">
                <div
                  className="rounded-2xl overflow-hidden mb-6"
                  style={{ aspectRatio: '3/2' }}
                >
                  <img
                    src={activeNutrient === 2 ? '/images/nutrient-salmon.jpg' : '/images/nutrient-fruits.jpg'}
                    alt="Nutrient sources"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                <div className="p-6 rounded-2xl bg-deep text-inverse">
                  <p className="text-caption text-inverse/50 mb-2">Did You Know?</p>
                  <p className="text-sm leading-relaxed text-inverse/80">
                    The brain alone consumes approximately 120 grams of glucose per day, accounting for about 20% of the body's total energy expenditure, despite representing only 2% of body weight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div ref={cardsRef} className="space-y-4">
              {nutrients.map((nutrient, i) => (
                <NutrientCard
                  key={nutrient.name}
                  nutrient={nutrient}
                  isActive={activeNutrient === i}
                  onClick={() => setActiveNutrient(i)}
                />
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Protein Sources Comparison
              </h3>
              <p className="text-sm text-muted-sage mb-6">
                Complete proteins contain all nine essential amino acids. Animal sources are complete; plant sources can be combined for completeness.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-deep/10">
                      <th className="text-left py-3 px-4 text-caption text-muted-sage">Source</th>
                      <th className="text-left py-3 px-4 text-caption text-muted-sage">Serving</th>
                      <th className="text-left py-3 px-4 text-caption text-muted-sage">Protein</th>
                      <th className="text-left py-3 px-4 text-caption text-muted-sage hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proteinSources.map((source, i) => (
                      <tr
                        key={source.name}
                        className={`border-b border-deep/5 transition-colors duration-200 hover:bg-white/60 ${
                          i % 2 === 0 ? 'bg-white/30' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-deep">{source.name}</td>
                        <td className="py-3 px-4 text-deep/70">{source.serving}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-terracotta">{source.protein}</span>
                        </td>
                        <td className="py-3 px-4 text-deep/60 hidden sm:table-cell">{source.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
