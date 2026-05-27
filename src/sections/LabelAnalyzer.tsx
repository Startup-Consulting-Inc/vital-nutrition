import { useState, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { extractNutritionFromImage, type ExtractedNutrients, type ExtractedNutrientField } from '@/lib/ocrParser';
import { analyzeLabelViaAPI, mergeAIWithOCR, type AIAnalysisResult } from '@/lib/openrouter';
import { getSmartRecommendations, type SmartRecommendationsResult } from '@/lib/apiClient';
import {
  analyzeNutritionLabel,
  type NutritionFacts,
  type HealthAnalysis,
  type DietaryProfile,
  getSampleProducts,
  requiresProteinConfirmation,
  inferFoodCategory,
} from '@/lib/nutritionAnalyzer';
import HealthScoreGauge from '@/components/HealthScoreGauge';
import { addEntry as addEntryToLog } from '@/lib/mealLog';
import { useT, useLocale } from '@/lib/i18n';

const emptyForm: NutritionFacts = {
  productName: '',
  foodCategory: 'other',
  servingSize: '',
  servingsPerContainer: 1,
  calories: 0,
  totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 0,
  totalCarbs: 0, dietaryFiber: 0, totalSugar: 0, addedSugar: 0, protein: 0,
  vitaminD: 0, calcium: 0, iron: 0, potassium: 0,
  vitaminDPercent: 0, calciumPercent: 0, ironPercent: 0, potassiumPercent: 0,
};

const categoryOptions: { value: NutritionFacts['foodCategory']; label: string }[] = [
  { value: 'other', label: 'Other / Uncertain' },
  { value: 'wholeFood', label: 'Whole / Single-Ingredient Food' },
  { value: 'protein', label: 'Protein / Meat / Seafood' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'grain', label: 'Grain / Bread / Cereal' },
  { value: 'snack', label: 'Snack' },
  { value: 'beverage', label: 'Beverage' },
  { value: 'frozen', label: 'Frozen Meal' },
  { value: 'processed', label: 'Processed Food' },
];

const profileOptions: { value: DietaryProfile; label: string; hint: string }[] = [
  { value: 'general', label: 'General', hint: 'Balanced 2,000-cal diet' },
  { value: 'heart', label: 'Heart Health', hint: 'Low sat-fat & sodium' },
  { value: 'highProtein', label: 'High Protein', hint: 'Athletes, recovery' },
  { value: 'keto', label: 'Keto', hint: 'Low net carbs' },
  { value: 'lowSodium', label: 'Low Sodium', hint: 'Hypertension' },
  { value: 'diabetic', label: 'Diabetic', hint: 'Net carb & sugar focus' },
];

const macroFields: { label: string; field: keyof NutritionFacts; unit: string; required?: boolean }[] = [
  { label: 'Calories', field: 'calories', unit: '', required: true },
  { label: 'Total Fat', field: 'totalFat', unit: 'g' },
  { label: 'Sat. Fat', field: 'saturatedFat', unit: 'g' },
  { label: 'Trans Fat', field: 'transFat', unit: 'g' },
  { label: 'Cholesterol', field: 'cholesterol', unit: 'mg' },
  { label: 'Sodium', field: 'sodium', unit: 'mg' },
  { label: 'Total Carbs', field: 'totalCarbs', unit: 'g' },
  { label: 'Fiber', field: 'dietaryFiber', unit: 'g' },
  { label: 'Total Sugar', field: 'totalSugar', unit: 'g' },
  { label: 'Added Sugar', field: 'addedSugar', unit: 'g' },
  { label: 'Protein', field: 'protein', unit: 'g' },
];

const microFields: { label: string; field: keyof NutritionFacts; unit: string }[] = [
  { label: 'Vitamin D', field: 'vitaminD', unit: 'mcg' },
  { label: 'Vitamin D', field: 'vitaminDPercent', unit: '%DV' },
  { label: 'Calcium', field: 'calcium', unit: 'mg' },
  { label: 'Calcium', field: 'calciumPercent', unit: '%DV' },
  { label: 'Iron', field: 'iron', unit: 'mg' },
  { label: 'Iron', field: 'ironPercent', unit: '%DV' },
  { label: 'Potassium', field: 'potassium', unit: 'mg' },
  { label: 'Potassium', field: 'potassiumPercent', unit: '%DV' },
];

const ESTIMATED_FIELDS_LABEL: Record<ExtractedNutrientField, string> = {
  totalFat: 'Total Fat',
  saturatedFat: 'Saturated Fat',
  transFat: 'Trans Fat',
  cholesterol: 'Cholesterol',
  sodium: 'Sodium',
  totalCarbs: 'Total Carbs',
  dietaryFiber: 'Dietary Fiber',
  totalSugar: 'Total Sugar',
  addedSugar: 'Added Sugar',
  protein: 'Protein',
};

export default function LabelAnalyzer() {
  const t = useT();
  const [locale] = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<NutritionFacts>({ ...emptyForm });
  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);
  const [smartRecs, setSmartRecs] = useState<SmartRecommendationsResult | null>(null);
  const [smartRecsLoading, setSmartRecsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle');
  const [aiMode, setAiMode] = useState<'ai-first' | 'ocr-only'>('ai-first');
  // AI is always the default for analysis. OCR-only is a fallback option.
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [ocrDebug, setOcrDebug] = useState<{ line: string; matched: string; value: number }[]>([]);
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set());
  const [estimatedFields, setEstimatedFields] = useState<Set<string>>(new Set());
  const [atwaterWarning, setAtwaterWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'alternatives' | 'breakdown'>('details');
  const [showForm, setShowForm] = useState(true);
  const [profile, setProfile] = useState<DietaryProfile>('general');
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loggedFlash, setLoggedFlash] = useState(false);
  const [confirmedOcr, setConfirmedOcr] = useState(false);
  const [proteinValidationError, setProteinValidationError] = useState<string | null>(null);
  const [autoDetectedCategory, setAutoDetectedCategory] = useState<NutritionFacts['foodCategory'] | null>(null);

  const applyExtracted = useCallback((extracted: ExtractedNutrients) => {
    const filled = new Set<string>();
    const updates: Partial<NutritionFacts> = {};

    const mapField = (key: keyof ExtractedNutrients, formKey: keyof NutritionFacts) => {
      const val = extracted[key];
      if (val !== undefined && val !== null) {
        (updates as Record<string, unknown>)[formKey] = val;
        filled.add(formKey);
      }
    };

    mapField('productName', 'productName');
    mapField('servingSize', 'servingSize');
    mapField('servingsPerContainer', 'servingsPerContainer');
    mapField('calories', 'calories');
    mapField('totalFat', 'totalFat');
    mapField('saturatedFat', 'saturatedFat');
    mapField('transFat', 'transFat');
    mapField('cholesterol', 'cholesterol');
    mapField('sodium', 'sodium');
    mapField('totalCarbs', 'totalCarbs');
    mapField('dietaryFiber', 'dietaryFiber');
    mapField('totalSugar', 'totalSugar');
    mapField('addedSugar', 'addedSugar');
    mapField('protein', 'protein');
    mapField('vitaminD', 'vitaminD');
    mapField('calcium', 'calcium');
    mapField('iron', 'iron');
    mapField('potassium', 'potassium');
    mapField('vitaminDPercent', 'vitaminDPercent');
    mapField('calciumPercent', 'calciumPercent');
    mapField('ironPercent', 'ironPercent');
    mapField('potassiumPercent', 'potassiumPercent');

    setForm((prev) => {
      const next: NutritionFacts = { ...prev, ...updates };
      if ((!next.foodCategory || next.foodCategory === 'other') && (next.productName || next.servingSize)) {
        const inferred = inferFoodCategory({ productName: next.productName, servingSize: next.servingSize });
        if (inferred !== 'other') {
          setAutoDetectedCategory(inferred);
          return { ...next, foodCategory: inferred };
        }
      }
      setAutoDetectedCategory(null);
      return next;
    });
    setAutoFilledFields(filled);
    setEstimatedFields(new Set(extracted.estimatedFields || []));
    setOcrDebug(extracted.debug || []);
    setOcrStatus('done');
    setNeedsConfirmation(true);
    setConfirmedOcr(false);

    // Atwater warning surfacing
    const a = extracted.atwater;
    if (a && a.status !== 'match') {
      setAtwaterWarning(
        `Calorie reconciliation: macros imply ${a.computedCalories} cal, label says ${a.labelCalories} cal (off by ~${a.diffPercent}%). ` +
        (a.status === 'hard-mismatch'
          ? 'This usually means a macro is missing or misread — please verify before scoring.'
          : 'Within rounding tolerance, but worth a quick check.')
      );
    } else {
      setAtwaterWarning(null);
    }
  }, []);

  const processImage = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const imageUrl = ev.target?.result as string;
      setUploadedImage(imageUrl);
      setOcrStatus('scanning');
      setAutoFilledFields(new Set());
      setEstimatedFields(new Set());
      setAiResult(null);

      let ocrExtracted: ExtractedNutrients | null = null;
      let aiExtracted: AIAnalysisResult | null = null;

      // Always run OCR in background as fallback
      const ocrPromise = extractNutritionFromImage(imageUrl).catch((err) => {
        console.warn('OCR failed:', err);
        return null;
      });

      // Try AI first if in AI mode
      if (aiMode === 'ai-first') {
        try {
          aiExtracted = await analyzeLabelViaAPI(imageUrl);
          setAiResult(aiExtracted);
        } catch (err: any) {
          console.warn('AI analysis failed:', err);
          setAiResult(null);
        }
      }

      // Wait for OCR to complete
      ocrExtracted = await ocrPromise;

      // Decide which result to use
      if (aiExtracted && aiExtracted.confidence >= 0.6) {
        // Use AI result, but merge with OCR for any missing fields
        const merged = ocrExtracted
          ? mergeAIWithOCR(aiExtracted, ocrExtracted)
          : aiExtracted;
        applyExtracted({
          productName: merged.productName,
          servingSize: merged.servingSize,
          servingsPerContainer: merged.servingsPerContainer,
          calories: merged.calories,
          totalFat: merged.totalFat,
          saturatedFat: merged.saturatedFat,
          transFat: merged.transFat,
          cholesterol: merged.cholesterol,
          sodium: merged.sodium,
          totalCarbs: merged.totalCarbs,
          dietaryFiber: merged.dietaryFiber,
          totalSugar: merged.totalSugar,
          addedSugar: merged.addedSugar,
          protein: merged.protein,
          vitaminD: merged.vitaminD,
          calcium: merged.calcium,
          iron: merged.iron,
          potassium: merged.potassium,
          rawText: aiExtracted.reasoning,
        });
      } else if (ocrExtracted) {
        // OCR fallback
        applyExtracted(ocrExtracted);
      } else {
        setOcrStatus('error');
      }

      // AI loading complete
    };
    reader.readAsDataURL(file);
  }, [applyExtracted, aiMode]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleCameraCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleAnalyze = useCallback(() => {
    setProteinValidationError(null);

    // === Mandatory protein gate (P0 critical bug fix) ===
    if (requiresProteinConfirmation(form)) {
      setProteinValidationError(
        'Protein looks implausibly low for this product. The label likely shows a non-zero value — please verify and update Protein before scoring.'
      );
      return;
    }

    // === Mandatory OCR confirmation gate ===
    if (needsConfirmation && !confirmedOcr) {
      setProteinValidationError(
        'Please review the auto-read values and confirm them before scoring (check the box below).'
      );
      return;
    }

    const result = analyzeNutritionLabel(form, { profile, servingMultiplier });
    setAnalysis(result);
    setShowForm(false);

    // Fetch AI-powered smart recommendations
    setSmartRecsLoading(true);
    getSmartRecommendations(
      {
        productName: form.productName,
        servingSize: form.servingSize,
        calories: form.calories,
        totalFat: form.totalFat,
        saturatedFat: form.saturatedFat,
        transFat: form.transFat,
        cholesterol: form.cholesterol,
        sodium: form.sodium,
        totalCarbs: form.totalCarbs,
        dietaryFiber: form.dietaryFiber,
        totalSugar: form.totalSugar,
        addedSugar: form.addedSugar,
        protein: form.protein,
        vitaminD: form.vitaminD,
        calcium: form.calcium,
        iron: form.iron,
        potassium: form.potassium,
      },
      result.overallScore,
      result.grade,
      profile,
      form.foodCategory || 'other',
      locale as 'en' | 'ko'
    ).then((recs) => {
      setSmartRecs(recs);
    }).catch((err) => {
      console.warn('Smart recommendations failed:', err);
    }).finally(() => {
      setSmartRecsLoading(false);
    });
  }, [form, profile, servingMultiplier, needsConfirmation, confirmedOcr]);

  const resetAll = useCallback(() => {
    setForm({ ...emptyForm });
    setAnalysis(null);
    setUploadedImage(null);
    setOcrStatus('idle');
    setOcrDebug([]);
    setAutoFilledFields(new Set());
    setEstimatedFields(new Set());
    setAtwaterWarning(null);
    setShowForm(true);
    setNeedsConfirmation(false);
    setConfirmedOcr(false);
    setProteinValidationError(null);
    setServingMultiplier(1);
    setAutoDetectedCategory(null);
    setAiResult(null);
    setSmartRecs(null);
    setSmartRecsLoading(false);
  }, []);

  const updateField = useCallback((field: keyof NutritionFacts, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'foodCategory') setAutoDetectedCategory(null);
    setEstimatedFields(prev => {
      if (!prev.has(field as string)) return prev;
      const next = new Set(prev);
      next.delete(field as string);
      return next;
    });
  }, []);

  const samples = useMemo(() => getSampleProducts(), []);

  const handleSampleSelect = useCallback((sample: { data: NutritionFacts }) => {
    setForm({ ...sample.data });
    setUploadedImage(null);
    setOcrStatus('idle');
    setAutoFilledFields(new Set());
    setEstimatedFields(new Set());
    setAtwaterWarning(null);
    setNeedsConfirmation(false);
    setConfirmedOcr(true);
    setProteinValidationError(null);
    setAutoDetectedCategory(null);
  }, []);

  const hasData = form.calories > 0 || form.totalFat > 0 || form.sodium > 0 || form.protein > 0;

  // ---- RESULTS VIEW ----
  if (!showForm && analysis) {
    return (
      <section id="analyzer" className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <button onClick={resetAll} className="flex items-center gap-2 text-sm text-deep/50 hover:text-terracotta transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {t('an.scoreAnother')}
            </button>
            <button
              onClick={() => {
                addEntryToLog({ name: form.productName || (locale === 'ko' ? '스캔한 제품' : 'Scanned product'), servings: servingMultiplier, data: form });
                setLoggedFlash(true);
                window.setTimeout(() => setLoggedFlash(false), 2000);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-[#c44e2f] transition-colors"
            >
              {loggedFlash ? t('an.addedToLog') : t('an.addToLog')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-deep/5 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <HealthScoreGauge score={analysis.overallScore} grade={analysis.grade} gradeColor={analysis.gradeColor} category={analysis.category} size={200} showLegend />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-2xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {form.productName || 'Analyzed Product'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface text-deep/60 text-xs">
                    {form.servingSize || '1 serving'}{servingMultiplier !== 1 && ` × ${servingMultiplier}`}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-deep/60 text-xs">{Math.round(form.calories * servingMultiplier)} cal</span>
                  <span className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: analysis.gradeColor }}>Grade {analysis.grade}</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-deep/5 text-deep/60">
                    Profile: {profileOptions.find(p => p.value === profile)?.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    title={analysis.processingExplanation}
                    style={{
                      backgroundColor: (analysis.processingLevel === 'ultra' ? '#d95c39' : analysis.processingLevel === 'moderately' ? '#c9a96e' : '#4a7c59') + '15',
                      color: analysis.processingLevel === 'ultra' ? '#d95c39' : analysis.processingLevel === 'moderately' ? '#c9a96e' : '#4a7c59',
                    }}
                  >
                    {analysis.processingLevel === 'ultra' ? 'Ultra-Processed' : analysis.processingLevel === 'moderately' ? 'Moderately Processed' : 'Minimally Processed'} ⓘ
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{
                    backgroundColor: (analysis.nutrientDensity === 'high' ? '#4a7c59' : analysis.nutrientDensity === 'moderate' ? '#c9a96e' : '#d95c39') + '15',
                    color: analysis.nutrientDensity === 'high' ? '#4a7c59' : analysis.nutrientDensity === 'moderate' ? '#c9a96e' : '#d95c39',
                  }}>
                    {analysis.nutrientDensity === 'high' ? 'High' : analysis.nutrientDensity === 'moderate' ? 'Moderate' : 'Low'} Nutrient Density
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs bg-deep/5 text-deep/60">
                    Fat ratio: {Math.round(analysis.fatRatio * 100)}% ({analysis.fatRatioLabel})
                  </span>
                </div>

                {/* Processing tag explanation */}
                <p className="text-xs text-deep/50 leading-relaxed">{analysis.processingExplanation}</p>

                {analysis.positiveFactors.length > 0 && (
                  <div className="space-y-1">
                    {analysis.positiveFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-deep/70">
                        <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5 text-[#4a7c59]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" fill="currentColor"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                )}
                {analysis.negativeFactors.length > 0 && (
                  <div className="space-y-1">
                    {analysis.negativeFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-deep/70">
                        <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5 text-[#d95c39]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 5.5L9 8l2.5 2.5-1 1L8 9l-2.5 2.5-1-1L7 8 4.5 5.5l1-1L8 7l2.5-2.5 1 1z" fill="currentColor"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                )}

                {/* Methodology link */}
                <Link to="/methodology" className="inline-flex items-center gap-1 text-xs text-terracotta hover:underline">
                  How is this calculated?
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* AI-Powered Smart Analysis */}
          {smartRecsLoading && (
            <div className="mb-6 p-5 rounded-2xl bg-white border border-deep/5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
                <p className="text-sm text-deep/60">Generating smart recommendations...</p>
              </div>
            </div>
          )}

          {smartRecs && smartRecs.analysis && (
            <div className="mb-6 p-5 rounded-2xl bg-terracotta/5 border border-terracotta/15">
              <p className="text-[10px] uppercase tracking-widest text-terracotta mb-2">AI Analysis</p>
              <p className="text-sm text-deep font-medium mb-1">{smartRecs.analysis.topConcern}</p>
              <p className="text-sm text-deep/60">{smartRecs.analysis.keyInsight}</p>
            </div>
          )}

          {/* AI-Powered Better Alternatives */}
          {smartRecs && smartRecs.alternatives && smartRecs.alternatives.length > 0 && (
            <div className="mb-6 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-deep/40 px-1">AI-Suggested Better Alternatives</p>
              {smartRecs.alternatives.map((alt, i) => (
                <div key={i} className="p-5 rounded-2xl border-2 bg-white" style={{ borderColor: '#4a7c5930' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ backgroundColor: '#4a7c59' }}>
                      ↑
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {alt.name}
                      </h4>
                      <p className="text-sm text-deep/60 leading-relaxed mb-2">{alt.reason}</p>
                      <p className="text-xs text-[#4a7c59] font-medium">
                        Approx Health Index: {alt.approxScore} (+{alt.scoreDelta} vs current)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback: legacy inline alternative */}
          {!smartRecs?.alternatives?.length && analysis.inlineAlternative && (
            <div className="mb-6 p-5 rounded-2xl border-2 bg-white" style={{ borderColor: '#4a7c5930' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ backgroundColor: '#4a7c59' }}>
                  ↑
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] mb-1">Better alternative</p>
                  <h4 className="text-lg text-deep mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {analysis.inlineAlternative.name}
                  </h4>
                  <p className="text-sm text-deep/60 leading-relaxed mb-2">{analysis.inlineAlternative.reason}</p>
                  <p className="text-xs text-[#4a7c59] font-medium">
                    Approx Health Index: {analysis.inlineAlternative.approxScore} (+{analysis.inlineAlternative.scoreDelta} vs current)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Amino acid link for high-protein foods */}
          {form.protein * servingMultiplier > 5 && (
            <div className="mb-6 p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm text-deep font-medium">Complete protein? See the breakdown.</p>
                  <p className="text-xs text-deep/50">View essential amino acids and meal-pairing tips.</p>
                </div>
                <Link to="/amino-acids" className="text-xs px-3 py-1.5 rounded-lg bg-deep text-inverse hover:bg-deep/90 transition-colors">
                  Amino Acids →
                </Link>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-6 border-b border-deep/10 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('details')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'details' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>Nutrient Breakdown</button>
            <button onClick={() => setActiveTab('alternatives')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'alternatives' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>All Recommendations ({smartRecs?.recommendations?.length || analysis.recommendations.length})</button>
            <button onClick={() => setActiveTab('breakdown')} className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'breakdown' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep/40 hover:text-deep/70'}`}>Score Breakdown</button>
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.nutrientScores.map((ns) => (
                <div key={ns.name} className="p-4 rounded-xl bg-white border border-deep/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }}>{ns.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-deep">{ns.name}</p>
                        <p className="text-xs text-deep/40">
                          {ns.value}{ns.unit} / {ns.limit}{ns.unit} <span className="text-deep/30">({ns.frame === 'meal' ? 'per meal' : 'daily'})</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold" style={{ color: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }}>{ns.percentOfLimit}%</span>
                  </div>
                  <div className="h-2 bg-deep/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(ns.percentOfLimit, 100)}%`, backgroundColor: ns.status === 'good' ? '#4a7c59' : ns.status === 'warning' ? '#c9a96e' : '#d95c39' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alternatives' && (
            <div className="space-y-3">
              {/* AI-powered recommendations */}
              {smartRecs && smartRecs.recommendations && smartRecs.recommendations.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-deep/40 px-1 mb-2">AI-Powered Recommendations</p>
                  {smartRecs.recommendations.map((rec, i) => (
                    <div key={`ai-${i}`} className="p-5 rounded-xl border" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3908' : rec.priority === 'medium' ? '#c9a96e08' : '#4a7c5908', borderColor: rec.priority === 'high' ? '#d95c3920' : rec.priority === 'medium' ? '#c9a96e20' : '#4a7c5920' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rec.category === 'warning' ? '#d95c3915' : rec.category === 'alternative' ? '#c9a96e15' : '#4a7c5915' }}>
                          {rec.category === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>}
                          {rec.category === 'alternative' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                          {rec.category === 'tip' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-deep text-sm">{rec.title}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3915' : rec.priority === 'medium' ? '#c9a96e15' : '#4a7c5915', color: rec.priority === 'high' ? '#d95c39' : rec.priority === 'medium' ? '#c9a96e' : '#4a7c59' }}>{rec.priority}</span>
                          </div>
                          <p className="text-sm text-deep/60 leading-relaxed">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Fallback: legacy recommendations */}
              {(!smartRecs?.recommendations?.length) && analysis.recommendations.map((rec, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3908' : rec.priority === 'medium' ? '#c9a96e08' : '#4a7c5908', borderColor: rec.priority === 'high' ? '#d95c3920' : rec.priority === 'medium' ? '#c9a96e20' : '#4a7c5920' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rec.category === 'warning' ? '#d95c3915' : rec.category === 'alternative' ? '#c9a96e15' : '#4a7c5915' }}>
                      {rec.category === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>}
                      {rec.category === 'alternative' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                      {rec.category === 'tip' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-deep text-sm">{rec.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: rec.priority === 'high' ? '#d95c3915' : rec.priority === 'medium' ? '#c9a96e15' : '#4a7c5915', color: rec.priority === 'high' ? '#d95c39' : rec.priority === 'medium' ? '#c9a96e' : '#4a7c59' }}>{rec.priority}</span>
                      </div>
                      <p className="text-sm text-deep/60 leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="bg-white rounded-2xl border border-deep/5 p-6">
              <p className="text-xs uppercase tracking-widest text-deep/40 mb-4">How we got to {analysis.overallScore}</p>
              <div className="space-y-2">
                {analysis.contributions.length === 0 && (
                  <p className="text-sm text-deep/50">No adjustments — score equals the baseline.</p>
                )}
                {analysis.contributions.map((c, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-deep/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-deep">{c.label}</p>
                      <p className="text-xs text-deep/50">{c.reason}</p>
                    </div>
                    <span className={`font-mono text-sm ${c.delta >= 0 ? 'text-[#4a7c59]' : 'text-[#b8301f]'}`}>
                      {c.delta >= 0 ? '+' : ''}{c.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ---- FORM VIEW ----
  return (
    <section id="analyzer" className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <div className="max-w-[1100px] mx-auto">
        <header className="text-center mb-10">
          <p className="text-caption text-terracotta mb-3">{t('an.eyebrow')}</p>
          <h1 className="text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            {t('an.h1')}
          </h1>
          <p className="text-deep/60 max-w-xl mx-auto">
            {t('an.subtitle')}
          </p>
          <p className="text-xs text-deep/40 mt-3">
            {locale === 'ko'
              ? '미국 영양 정보표, EU 100g 당, 한국 식품영양성분표 모두 인식합니다.'
              : 'Works with US Nutrition Facts, EU per-100g, and Korean 식품영양성분표 panels.'}
          </p>
        </header>

        {/* Upload buttons */}
        {!uploadedImage && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 hover:border-terracotta/40 hover:bg-terracotta/3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{t('an.upload')}</span>
            </button>
            <button onClick={() => cameraInputRef.current?.click()} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 hover:border-terracotta/40 hover:bg-terracotta/3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{t('an.takePhoto')}</span>
            </button>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-deep/15 bg-deep/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-[#374640]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374640" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <span className="text-sm font-medium text-deep">{locale === 'ko' ? '직접 입력' : 'Enter Manually'}</span>
            </div>
          </div>
        )}

        {/* AI mode toggle + disclaimers */}
        {!uploadedImage && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setAiMode('ai-first')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  aiMode === 'ai-first'
                    ? 'bg-deep text-inverse'
                    : 'bg-white border border-deep/10 text-deep/60 hover:bg-deep/5'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                AI + OCR
              </button>
              <button
                onClick={() => setAiMode('ocr-only')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  aiMode === 'ocr-only'
                    ? 'bg-deep text-inverse'
                    : 'bg-white border border-deep/10 text-deep/60 hover:bg-deep/5'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                OCR Only
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#374640]/5 border border-[#374640]/10 text-xs text-deep/60 flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374640" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <span>
                  {aiMode === 'ai-first'
                    ? 'AI analyzes the image first, with OCR as fallback. Results may need verification.'
                    : 'Uses local OCR only. No image is sent to external services.'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10 text-xs text-deep/60 flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>
                  {aiMode === 'ai-first'
                    ? 'Images are sent to OpenRouter AI for analysis. Nutrition data only, no personal info.'
                    : 'Photos are processed entirely in your browser. Nothing is uploaded.'}
                </span>
              </div>
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCameraCapture} />

        {/* Two-column layout: image + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image + OCR status */}
          {uploadedImage && (
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-deep/5 bg-white p-3">
                <img src={uploadedImage} alt="Nutrition label" className="w-full rounded-xl object-contain max-h-[400px]" />
              </div>

              {ocrStatus === 'scanning' && (
                <div className="p-4 rounded-xl bg-[#374640]/5 border border-[#374640]/10 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#374640]/30 border-t-[#374640] rounded-full animate-spin" />
                  <span className="text-sm text-deep/70">{t('an.processingPhoto')}</span>
                </div>
              )}
              {ocrStatus === 'done' && (
                <div className="p-4 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#4a7c59]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" fill="currentColor"/></svg>
                    <span className="text-sm font-medium text-[#4a7c59]">
                      {aiResult
                        ? `AI analyzed (${Math.round(aiResult.confidence * 100)}% confidence)`
                        : `Auto-filled ${autoFilledFields.size} fields`}
                    </span>
                    {aiResult && aiResult.productName && !aiResult.reasoning.includes('visible') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">inferred name</span>
                    )}
                  </div>
                  <p className="text-xs text-deep/50">
                    {aiResult
                      ? aiResult.reasoning || 'Review and edit the values on the right, then check the confirmation box and click Analyze.'
                      : 'Review and edit the values on the right, then check the confirmation box and click Analyze.'}
                  </p>
                  {aiResult && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-deep/40">Source:</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-deep/5 text-deep/60">
                        {aiResult.confidence >= 0.7 ? 'AI primary' : aiResult.confidence >= 0.4 ? 'AI + OCR merged' : 'OCR fallback'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {ocrStatus === 'error' && (
                <div className="p-4 rounded-xl bg-[#d95c39]/5 border border-[#d95c39]/15">
                  <p className="text-sm text-[#d95c39] font-medium mb-1">Could not read label</p>
                  <p className="text-xs text-deep/50">Please enter the nutrition values manually.</p>
                </div>
              )}

              {/* Atwater warning banner */}
              {atwaterWarning && (
                <div className="p-4 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                  <div className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                    <p className="text-xs text-deep/70 leading-relaxed">{atwaterWarning}</p>
                  </div>
                </div>
              )}

              {estimatedFields.size > 0 && (
                <div className="p-4 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                  <p className="text-xs font-medium text-deep mb-1">⚠️ Estimated values</p>
                  <p className="text-xs text-deep/60 leading-relaxed">
                    The following were back-calculated from calories rather than read directly:{' '}
                    <strong>
                      {Array.from(estimatedFields)
                        .map(f => ESTIMATED_FIELDS_LABEL[f as ExtractedNutrientField] || f)
                        .join(', ')}
                    </strong>
                    . Please verify against the label.
                  </p>
                </div>
              )}

              <button onClick={() => { setUploadedImage(null); setOcrStatus('idle'); setAutoFilledFields(new Set()); setAtwaterWarning(null); setNeedsConfirmation(false); }} className="text-xs text-terracotta hover:underline">
                Remove image & start over
              </button>
            </div>
          )}

          {/* Right: Form */}
          <div className={uploadedImage ? 'lg:col-span-8' : 'lg:col-span-12'}>
            {/* Profile + serving multiplier — visible always above the form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-deep/5 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-deep/40 mb-2">Score for</label>
                  <div className="flex flex-wrap gap-1.5">
                    {profileOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setProfile(opt.value)}
                        title={opt.hint}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${profile === opt.value ? 'bg-terracotta text-white' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-deep/40 mt-2">
                    {profileOptions.find(p => p.value === profile)?.hint}
                  </p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-deep/40 mb-2">
                    I'm eating <span className="text-deep">{servingMultiplier}</span> serving{servingMultiplier !== 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min={0.25}
                    max={4}
                    step={0.25}
                    value={servingMultiplier}
                    onChange={e => setServingMultiplier(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-deep/40 mt-1">
                    <span>¼</span><span>1</span><span>2</span><span>4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-deep/5">
              {/* Samples with thumbnails */}
              <div className="mb-6">
                <p className="text-caption text-muted-sage mb-3">{t('an.tryASample')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {samples.map(s => (
                    <button
                      key={s.name}
                      onClick={() => handleSampleSelect(s)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface hover:bg-terracotta/10 transition-all border border-deep/5 hover:border-terracotta/30 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-deep text-inverse flex items-center justify-center text-xs font-bold group-hover:bg-terracotta transition-colors">
                        {s.thumb}
                      </div>
                      <span className="text-[11px] text-deep/70 text-center leading-tight">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '제품명' : 'Product Name'}</label>
                  <input type="text" value={form.productName || ''} onChange={e => updateField('productName', e.target.value)} placeholder={locale === 'ko' ? '예: 통곡물 그래놀라' : 'e.g., Organic Granola Bars'}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '식품 카테고리' : 'Food Category'}</label>
                  <select value={form.foodCategory} onChange={e => updateField('foodCategory', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40">
                    {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  {autoDetectedCategory && (
                    <p className="text-[11px] text-deep/40 mt-2">
                      Detected from label: <span className="text-deep font-medium">{categoryOptions.find(o => o.value === autoDetectedCategory)?.label}</span>. Change if wrong.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '1회 제공량' : 'Serving Size'}</label>
                  <input type="text" value={form.servingSize} onChange={e => updateField('servingSize', e.target.value)} placeholder={locale === 'ko' ? '예: 1컵' : 'e.g., 1 cup'}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{locale === 'ko' ? '제공 횟수' : 'Servings / Container'}</label>
                  <input type="number" value={form.servingsPerContainer} onChange={e => updateField('servingsPerContainer', Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-deep/10 bg-[#f6f5f1] text-deep text-sm focus:outline-none focus:border-terracotta/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep mb-1.5">{t('common.calories')} <span className="text-terracotta">*</span></label>
                  <input type="number" value={form.calories || ''} onChange={e => updateField('calories', Number(e.target.value))} placeholder="0"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-terracotta/40 ${autoFilledFields.has('calories') ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' : 'border-deep/10 bg-[#f6f5f1]'}`} />
                </div>
              </div>

              {/* Macronutrients */}
              <p className="text-caption text-terracotta mb-3">
                {locale === 'ko' ? '다량 영양소 (1회 제공량)' : 'Macronutrients (per serving)'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {macroFields.filter(f => f.field !== 'calories').map(item => {
                  const isAuto = autoFilledFields.has(item.field as string);
                  const isEstimated = estimatedFields.has(item.field as string);
                  return (
                    <div key={item.field}>
                      <label className="block text-xs text-deep/60 font-medium mb-1">
                        {item.label} ({item.unit})
                      </label>
                      <input type="number" value={(form[item.field] as number) || ''} onChange={e => updateField(item.field, Number(e.target.value))} placeholder="0"
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-terracotta/40 ${
                          isEstimated ? 'border-[#c9a96e]/60 bg-[#c9a96e]/10' :
                          isAuto ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' :
                          'border-deep/10 bg-[#f6f5f1]'
                        }`} />
                      {isEstimated && <span className="text-[10px] text-[#c9a96e] mt-0.5 block">⚠ estimated</span>}
                      {isAuto && !isEstimated && <span className="text-[10px] text-[#4a7c59] mt-0.5 block">auto-filled</span>}
                    </div>
                  );
                })}
              </div>

              {/* Micronutrients */}
              <p className="text-caption text-[#374640] mb-3">
                {locale === 'ko' ? '미량 영양소 (선택)' : 'Micronutrients (optional)'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {microFields.map(item => (
                  <div key={item.field}>
                    <label className="block text-xs text-deep/60 font-medium mb-1">{item.label} ({item.unit})</label>
                    <input type="number" value={(form[item.field] as number) || ''} onChange={e => updateField(item.field, Number(e.target.value))} placeholder="0"
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-terracotta/40 ${autoFilledFields.has(item.field as string) ? 'border-[#4a7c59]/40 bg-[#4a7c59]/5' : 'border-deep/10 bg-[#f6f5f1]'}`} />
                    {autoFilledFields.has(item.field as string) && <span className="text-[10px] text-[#4a7c59] mt-0.5 block">auto-filled</span>}
                  </div>
                ))}
              </div>

              {/* OCR confirmation gate */}
              {needsConfirmation && (
                <div className="mb-4 p-4 rounded-xl bg-terracotta/5 border border-terracotta/30">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedOcr}
                      onChange={e => setConfirmedOcr(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-terracotta"
                    />
                    <div>
                      <p className="text-sm font-medium text-deep">I've reviewed the auto-read values</p>
                      <p className="text-xs text-deep/50 mt-0.5">
                        OCR can misread digits and dropped units. Confirming locks in your edits before scoring.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {proteinValidationError && (
                <div className="mb-4 p-4 rounded-xl bg-[#d95c39]/5 border border-[#d95c39]/30">
                  <div className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d95c39" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                    <p className="text-sm text-[#d95c39] leading-relaxed">{proteinValidationError}</p>
                  </div>
                </div>
              )}

              <button onClick={handleAnalyze} disabled={!hasData}
                className="w-full py-3 rounded-xl text-white font-medium text-sm transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#d95c39' }}
                onMouseEnter={e => { if (hasData) (e.target as HTMLElement).style.backgroundColor = '#c44e2f'; }}
                onMouseLeave={e => { if (hasData) (e.target as HTMLElement).style.backgroundColor = '#d95c39'; }}>
                Analyze Nutrition Label
              </button>

              <Link to="/methodology" className="block mt-3 text-center text-xs text-terracotta hover:underline">
                How is the score calculated? See methodology →
              </Link>

              {/* Medical disclaimer */}
              <p className="text-[11px] text-deep/40 mt-4 leading-relaxed text-center">
                Not medical advice. This tool is a label sanity-check, not a substitute for a registered dietitian or physician.
                Special conditions (CKD, PKU, allergies, pregnancy) need professional guidance.
              </p>
            </div>

            {ocrDebug.length > 0 && (
              <div className="mt-4 p-4 rounded-xl border border-deep/5 bg-white">
                <p className="text-xs uppercase tracking-wider text-deep/40 mb-3">Detected from your label</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ocrDebug.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-deep">{d.matched}:</span>
                      <span className="text-terracotta font-semibold">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
