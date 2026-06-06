import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { nutrients, getAllFoods } from '@/data/nutrientDetails';
import { aminoAcids } from '@/data/aminoAcids';
import { foodCatalog, catalogNameMap } from '@/lib/foodCatalog';
import { blogArticles, blogSeries, formatEpisodeLabel } from '@/data/blogArticles';
import { useLocale } from '@/lib/i18n';
import { nutrientsKo } from '@/data/nutrientDetails.ko';
import { localizeAminoAcid } from '@/pages/AminoAcids';

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
  { kind: 'page', title: 'Blog', subtitle: 'Sugar, fiber, carbs, protein, vitamins, minerals, fats & dopamine', href: '/blog' },
  { kind: 'page', title: 'Methodology', subtitle: 'How the Health Index is calculated', href: '/methodology' },
  { kind: 'page', title: 'Research', subtitle: 'Key findings with citations', href: '/research' },
  { kind: 'page', title: 'Amino Acids', subtitle: 'The 20 building blocks of protein', href: '/amino-acids' },
];

const PAGES_KO: PageResult[] = [
  { kind: 'page', title: '라벨 분석기', subtitle: '영양 성분표 스캔으로 확인하는 건강 점수', href: '/analyzer' },
  { kind: 'page', title: '오늘의 식단 기록', subtitle: '오늘 섭취한 식단과 영양 밸런스 실시간 계산', href: '/log' },
  { kind: 'page', title: '식품 비교', subtitle: '두 식품의 영양성분 및 점수 나란히 비교', href: '/compare' },
  { kind: 'page', title: '대상별 가이드', subtitle: '생애 주기 및 상황별 (임신, 고령, 식단 유형 등) 가이드', href: '/special-populations' },
  { kind: 'page', title: '블로그', subtitle: '영양소와 식습관에 관한 깊이 있는 아티클', href: '/blog' },
  { kind: 'page', title: '평가 방법론', subtitle: '식품 건강 점수가 산정되는 세부 기준 안내', href: '/methodology' },
  { kind: 'page', title: '연구 자료 및 가이드라인', subtitle: '공신력 있는 학계 논문 및 과학 연구 기반 자료', href: '/research' },
  { kind: 'page', title: '아미노산 백과', subtitle: '단백질을 구성하는 20가지 아미노산 정보', href: '/amino-acids' },
];

export default function SiteSearch({ open, onClose }: SiteSearchProps) {
  const [locale] = useLocale();
  const isKo = locale === 'ko';
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
    const pagesList = isKo ? PAGES_KO : PAGES;

    for (const p of pagesList) {
      if (p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)) {
        all.push(p);
      }
    }

    for (const article of blogArticles) {
      const haystack = [
        article.title.en,
        article.title.ko,
        article.description.en,
        article.description.ko,
        article.thesis.en,
        article.thesis.ko,
      ].join(' ').toLowerCase();
      if (haystack.includes(q)) {
        const seriesTitle = isKo
          ? blogSeries[article.seriesId].title.ko
          : blogSeries[article.seriesId].title.en;
        all.push({
          kind: 'page',
          title: isKo ? article.title.ko : article.title.en,
          subtitle: `${seriesTitle} · ${formatEpisodeLabel(article, isKo)}`,
          href: `/blog?article=${article.slug}`,
        });
      }
    }

    for (const n of nutrients) {
      const koOverride = nutrientsKo[n.slug];
      const name = isKo && koOverride?.name ? koOverride.name : n.name;
      const subtitle = isKo && koOverride?.subtitle ? koOverride.subtitle : n.subtitle;
      const description = isKo && koOverride?.description ? koOverride.description : n.description;

      if (
        name.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q) ||
        description.toLowerCase().includes(q) ||
        (!isKo && (n.name.toLowerCase().includes(q) || n.subtitle.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)))
      ) {
        all.push({ kind: 'nutrient', title: name, subtitle: subtitle, href: `/nutrients/${n.slug}`, color: n.color });
      }
    }

    for (const a of aminoAcids) {
      const localized = localizeAminoAcid(a, isKo ? 'ko' : 'en');
      const matches =
        localized.name.toLowerCase().includes(q) ||
        localized.functions.some(f => f.toLowerCase().includes(q)) ||
        (!isKo && (a.name.toLowerCase().includes(q) || a.functions.some(f => f.toLowerCase().includes(q))));

      if (matches) {
        all.push({
          kind: 'amino',
          title: localized.name,
          subtitle: isKo
            ? `${localized.essential ? '필수 아미노산' : '비필수 아미노산'} · ${localized.functions[0]}`
            : `${localized.essential ? 'Essential' : 'Non-essential'} · ${localized.functions[0]}`,
          href: '/amino-acids',
        });
      }
    }

    const seenFoodNames = new Set<string>();
    for (const entry of getAllFoods()) {
      const { food, nutrient } = entry;
      const koOverride = nutrientsKo[nutrient.slug];
      const foodOverride = koOverride?.foodOverrides?.[food.name];

      const nName = isKo && koOverride?.shortName ? koOverride.shortName : nutrient.shortName;
      const fName = isKo && foodOverride?.name ? foodOverride.name : food.name;
      const fBenefit = isKo && foodOverride?.keyBenefit ? foodOverride.keyBenefit : food.keyBenefit;

      const matches =
        fName.toLowerCase().includes(q) ||
        food.amount.toLowerCase().includes(q) ||
        fBenefit.toLowerCase().includes(q) ||
        (!isKo && (food.name.toLowerCase().includes(q) || food.keyBenefit.toLowerCase().includes(q)));

      if (matches && !seenFoodNames.has(fName)) {
        seenFoodNames.add(fName);
        all.push({
          kind: 'food',
          title: fName,
          subtitle: isKo
            ? `${nName}의 주요 공급원 · ${food.amount}`
            : `Top source of ${nName.toLowerCase()} · ${food.amount}`,
          href: `/nutrients/${nutrient.slug}`,
        });
      }
    }

    for (const f of foodCatalog) {
      const localizedName = isKo ? (catalogNameMap[f.name] || f.name) : f.name;
      const matches = f.name.toLowerCase().includes(q) || localizedName.toLowerCase().includes(q);
      if (matches && !seenFoodNames.has(localizedName)) {
        seenFoodNames.add(localizedName);
        all.push({
          kind: 'food',
          title: localizedName,
          subtitle: isKo
            ? `분석기 카탈로그 수록 · ${f.data.servingSize}`
            : `In analyzer catalog · ${f.data.servingSize}`,
          href: '/compare',
        });
      }
    }

    return all.slice(0, 30);
  }, [query, isKo]);

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
            placeholder={isKo ? '영양소, 식품, 아미노산 검색… (예: 비타민 C, 식이섬유, 연어)' : 'Search nutrients, foods, amino acids… (try: vitamin c, fiber, salmon)'}
            className="flex-1 outline-none text-sm text-deep placeholder-deep/30"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-deep/40">esc</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="p-5 text-xs text-deep/50">
              <p className="mb-2 font-medium text-deep/70">{isKo ? '성분별 식품 역검색:' : 'Try a reverse lookup:'}</p>
              <div className="flex flex-wrap gap-2">
                {(isKo ? ['비타민 C', '식이섬유', '오메가-3', '철분', '칼슘', '단백질'] : ['vitamin C', 'fiber', 'omega-3', 'iron', 'calcium', 'protein']).map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="px-2.5 py-1 rounded bg-surface text-deep/70 hover:bg-deep/10">
                    {isKo ? `${s} 풍부한 식품` : `foods high in ${s}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <p className="p-5 text-sm text-deep/40 italic">
              {isKo ? `"${query}"에 대한 검색 결과가 없습니다.` : `No matches for "${query}".`}
            </p>
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
              <span className="text-[10px] uppercase tracking-wider text-deep/30">
                {isKo
                  ? (r.kind === 'page' ? '페이지' : r.kind === 'nutrient' ? '영양소' : r.kind === 'food' ? '식품' : '아미노산')
                  : r.kind}
              </span>
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

