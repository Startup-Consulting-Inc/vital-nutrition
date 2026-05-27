import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { nutrients, getAllFoods } from '@/data/nutrientDetails';
import { aminoAcids } from '@/data/aminoAcids';
import { foodCatalog } from '@/lib/foodCatalog';

interface SiteSearchProps {
  open: boolean;
  onClose: () => void;
}

interface PageResult { kind: 'page'; title: string; subtitle: string; href: string; }
interface NutrientResult { kind: 'nutrient'; title: string; subtitle: string; href: string; color: string; }
interface FoodResult { kind: 'food'; title: string; subtitle: string; href: string; }
interface AminoResult { kind: 'amino'; title: string; subtitle: string; href: string; }

type SearchResult = PageResult | NutrientResult | FoodResult | AminoResult;

const PAGES: PageResult[] = [
  { kind: 'page', title: 'Label Analyzer', subtitle: 'Scan a nutrition label, get a Health Index', href: '/analyzer' },
  { kind: 'page', title: 'Daily Meal Log', subtitle: 'Track today\'s plate and overall score', href: '/log' },
  { kind: 'page', title: 'Compare Foods', subtitle: 'Side-by-side nutrient diff', href: '/compare' },
  { kind: 'page', title: 'Special Populations', subtitle: 'Pregnancy, seniors, athletes, vegan, conditions', href: '/special-populations' },
  { kind: 'page', title: 'Methodology', subtitle: 'How the Health Index is calculated', href: '/methodology' },
  { kind: 'page', title: 'Research', subtitle: 'Key findings with citations', href: '/research' },
  { kind: 'page', title: 'Amino Acids', subtitle: 'The 20 building blocks of protein', href: '/amino-acids' },
];

export default function SiteSearch({ open, onClose }: SiteSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const all: SearchResult[] = [];

    for (const p of PAGES) {
      if (p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)) {
        all.push(p);
      }
    }

    for (const n of nutrients) {
      if (n.name.toLowerCase().includes(q) || n.subtitle.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)) {
        all.push({ kind: 'nutrient', title: n.name, subtitle: n.subtitle, href: `/nutrients/${n.slug}`, color: n.color });
      }
    }

    for (const a of aminoAcids) {
      if (a.name.toLowerCase().includes(q) || a.functions.some(f => f.toLowerCase().includes(q))) {
        all.push({ kind: 'amino', title: a.name, subtitle: `${a.essential ? 'Essential' : 'Non-essential'} · ${a.functions[0]}`, href: '/amino-acids' });
      }
    }

    const seenFoodNames = new Set<string>();
    for (const entry of getAllFoods()) {
      const { food, nutrient } = entry;
      const matches =
        food.name.toLowerCase().includes(q) ||
        food.amount.toLowerCase().includes(q) ||
        food.keyBenefit.toLowerCase().includes(q);
      if (matches && !seenFoodNames.has(food.name)) {
        seenFoodNames.add(food.name);
        all.push({
          kind: 'food',
          title: food.name,
          subtitle: `Top source of ${nutrient.shortName.toLowerCase()} · ${food.amount}`,
          href: `/nutrients/${nutrient.slug}`,
        });
      }
    }

    for (const f of foodCatalog) {
      if (f.name.toLowerCase().includes(q) && !seenFoodNames.has(f.name)) {
        seenFoodNames.add(f.name);
        all.push({ kind: 'food', title: f.name, subtitle: `In analyzer catalog · ${f.data.servingSize}`, href: '/compare' });
      }
    }

    return all.slice(0, 30);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-deep/40 backdrop-blur-sm pt-24 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-deep/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep/40">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search nutrients, foods, amino acids… (try: vitamin c, fiber, salmon)"
            className="flex-1 outline-none text-sm text-deep placeholder-deep/30"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-deep/40">esc</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="p-5 text-xs text-deep/50">
              <p className="mb-2 font-medium text-deep/70">Try a reverse lookup:</p>
              <div className="flex flex-wrap gap-2">
                {['vitamin C', 'fiber', 'omega-3', 'iron', 'calcium', 'protein'].map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="px-2.5 py-1 rounded bg-surface text-deep/70 hover:bg-deep/10">
                    foods high in {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <p className="p-5 text-sm text-deep/40 italic">No matches for "{query}".</p>
          )}

          {results.map((r, i) => (
            <Link
              key={`${r.kind}-${r.title}-${i}`}
              to={r.href}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 hover:bg-deep/5 transition-colors border-b border-deep/5 last:border-0"
            >
              <ResultIcon r={r} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-deep truncate">{r.title}</p>
                <p className="text-xs text-deep/50 truncate">{r.subtitle}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-deep/30">{r.kind}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultIcon({ r }: { r: SearchResult }) {
  const bg =
    r.kind === 'nutrient' ? (r as NutrientResult).color :
    r.kind === 'food' ? '#c9a96e' :
    r.kind === 'amino' ? '#4a7c59' :
    '#374640';
  const letter = r.title.slice(0, 1).toUpperCase();
  return (
    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: bg }}>
      {letter}
    </span>
  );
}
