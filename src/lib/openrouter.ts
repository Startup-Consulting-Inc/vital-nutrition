import { analyzeLabelViaAPI, sendChatViaAPI, type AIAnalysisResult, type ChatMessage } from './apiClient';
import type { NutritionFacts } from './nutritionAnalyzer';

export type { AIAnalysisResult, ChatMessage };
export { analyzeLabelViaAPI, sendChatViaAPI };

/**
 * Legacy export for backward compatibility.
 * Use analyzeLabelViaAPI() for new code.
 */
export async function analyzeLabelWithAI(imageBase64: string): Promise<AIAnalysisResult> {
  return analyzeLabelViaAPI(imageBase64);
}

/**
 * Merge AI result with OCR result, preferring AI for most fields
 * but using OCR as fallback for any fields AI missed.
 */
export function mergeAIWithOCR(
  ai: AIAnalysisResult,
  ocr: Partial<NutritionFacts>
): AIAnalysisResult {
  return {
    ...ai,
    productName: ai.productName || ocr.productName || '',
    servingSize: ai.servingSize || ocr.servingSize || '',
    servingsPerContainer: ai.servingsPerContainer || ocr.servingsPerContainer || 1,
    calories: ai.calories || ocr.calories || 0,
    totalFat: ai.totalFat || ocr.totalFat || 0,
    saturatedFat: ai.saturatedFat || ocr.saturatedFat || 0,
    transFat: ai.transFat || ocr.transFat || 0,
    cholesterol: ai.cholesterol || ocr.cholesterol || 0,
    sodium: ai.sodium || ocr.sodium || 0,
    totalCarbs: ai.totalCarbs || ocr.totalCarbs || 0,
    dietaryFiber: ai.dietaryFiber || ocr.dietaryFiber || 0,
    totalSugar: ai.totalSugar || ocr.totalSugar || 0,
    addedSugar: ai.addedSugar || ocr.addedSugar || 0,
    protein: ai.protein || ocr.protein || 0,
    vitaminD: ai.vitaminD || ocr.vitaminD || 0,
    calcium: ai.calcium || ocr.calcium || 0,
    iron: ai.iron || ocr.iron || 0,
    potassium: ai.potassium || ocr.potassium || 0,
  };
}


