import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/lib/i18n';
import { getSavedAnalyses, removeSavedAnalysis, clearSavedAnalyses, type SavedAnalysis } from '@/lib/savedList';
import SEOHead from '@/components/SEOHead';

export default function SavedList() {
  const [locale] = useLocale();
  const [items, setItems] = useState<SavedAnalysis[]>(() => getSavedAnalyses());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleRemove = (id: string) => {
    removeSavedAnalysis(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleClearAll = () => {
    if (!window.confirm(locale === 'ko' ? '저장된 모든 항목을 삭제하시겠습니까?' : 'Delete all saved items?')) return;
    clearSavedAnalyses();
    setItems([]);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.has(i.id)),
    [items, selectedIds]
  );

  const comparisonDiff = useMemo(() => {
    if (selectedItems.length !== 2) return null;
    const [a, b] = selectedItems;
    return {
      scoreDelta: b.score - a.score,
      calDelta: b.calories - a.calories,
      sodiumDelta: b.analysis.nutrientScores.find((n) => n.name === 'Sodium')?.value ?? 0 - (a.analysis.nutrientScores.find((n) => n.name === 'Sodium')?.value ?? 0),
      sugarDelta: b.analysis.nutrientScores.find((n) => n.name === 'Added Sugar')?.value ?? 0 - (a.analysis.nutrientScores.find((n) => n.name === 'Added Sugar')?.value ?? 0),
    };
  }, [selectedItems]);

  return (
    <div className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        title={locale === 'ko' ? '저장된 분석' : 'Saved Analyses'}
        description={locale === 'ko' ? '나중을 위해 저장한 영양 분석 목록' : 'Nutrition analyses you saved for later'}
        path="/saved"
      />
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <Link to="/analyzer" className="text-sm text-terracotta hover:underline mb-2 inline-block">
              ← {locale === 'ko' ? '분석기로 돌아가기' : 'Back to Analyzer'}
            </Link>
            <h1 className="text-deep" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              {locale === 'ko' ? '저장된 분석' : 'Saved for Later'}
            </h1>
            <p className="text-deep/60 mt-1">
              {locale === 'ko' ? '나중을 위해 저장한 제품들을 비교하세요.' : 'Compare products you saved across shopping trips.'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-deep/40 hover:text-terracotta transition-colors"
            >
              {locale === 'ko' ? '모두 삭제' : 'Clear all'}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-deep/5">
            <div className="w-16 h-16 rounded-full bg-deep/5 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#202a26" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <p className="text-deep/60 mb-2">
              {locale === 'ko' ? '저장된 항목이 없습니다.' : 'No saved items yet.'}
            </p>
            <Link to="/analyzer" className="text-sm text-terracotta hover:underline">
              {locale === 'ko' ? '첫 번째 제품 분석하기' : 'Analyze your first product →'}
            </Link>
          </div>
        ) : (
          <>
            {/* Comparison hint */}
            {selectedIds.size > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-terracotta/5 border border-terracotta/15">
                <p className="text-sm text-deep/70">
                  {selectedIds.size === 1
                    ? (locale === 'ko' ? '비교를 위해 하나 더 선택하세요.' : 'Select one more to compare side-by-side.')
                    : selectedIds.size === 2
                    ? (locale === 'ko' ? '2개 항목 비교 중' : 'Comparing 2 items')
                    : (locale === 'ko' ? '정확한 비교를 위해 2개만 선택하세요.' : 'Select exactly 2 items for a clear comparison.')}
                </p>
                {comparisonDiff && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <span className={`font-medium ${comparisonDiff.scoreDelta >= 0 ? 'text-[#4a7c59]' : 'text-[#b8301f]'}`}>
                      Score: {comparisonDiff.scoreDelta >= 0 ? '+' : ''}{comparisonDiff.scoreDelta}
                    </span>
                    <span className="text-deep/50">
                      Calories: {comparisonDiff.calDelta >= 0 ? '+' : ''}{comparisonDiff.calDelta}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    selectedIds.has(item.id) ? 'border-terracotta/40 shadow-sm' : 'border-deep/5 hover:border-deep/15'
                  }`}
                  onClick={() => toggleSelect(item.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedIds.has(item.id) ? 'bg-terracotta border-terracotta' : 'border-deep/20'
                        }`}
                      >
                        {selectedIds.has(item.id) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-medium text-white"
                        style={{ backgroundColor: item.gradeColor }}
                      >
                        {item.grade}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="text-deep/30 hover:text-terracotta transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-sm font-medium text-deep mb-1 truncate">{item.productName || 'Unnamed Product'}</h3>
                  <p className="text-xs text-deep/50 mb-3">{item.servingSize} · {item.calories} cal</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-2 bg-deep/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(item.score, 100)}%`, backgroundColor: item.gradeColor }}
                      />
                    </div>
                    <span className="text-xs font-medium text-deep/70">{item.score}</span>
                  </div>

                  <p className="text-xs text-deep/50">
                    {new Date(item.timestamp).toLocaleDateString()} · {item.profile}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
