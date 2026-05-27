/**
 * API client for calling Cloud Functions.
 * In development, calls go directly to OpenRouter (for cost savings).
 * In production, calls go through Cloud Functions (for secret management).
 */

const USE_CLOUD_FUNCTIONS = import.meta.env.VITE_USE_CLOUD_FUNCTIONS === 'true';

// Cloud Functions region — must match your deployment region
const FUNCTIONS_BASE_URL = 'https://us-central1-nutrition-help.cloudfunctions.net';

function getApiUrl(endpoint: string): string {
  if (USE_CLOUD_FUNCTIONS) {
    return `${FUNCTIONS_BASE_URL}/${endpoint}`;
  }
  // In dev, smartRecommendations still goes through Cloud Functions
  // because it needs the API key. Only label analysis and chat
  // can optionally use direct OpenRouter.
  if (endpoint === 'smartRecommendations') {
    return `${FUNCTIONS_BASE_URL}/${endpoint}`;
  }
  return 'https://openrouter.ai/api/v1/chat/completions';
}

/* ------------------------------------------------------------------ */
/*  Label Analysis                                                     */
/* ------------------------------------------------------------------ */

export interface AIAnalysisResult {
  productName: string;
  foodCategory: string;
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  dietaryFiber: number;
  totalSugar: number;
  addedSugar: number;
  protein: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
  confidence: number;
  reasoning: string;
  source: 'ai' | 'ocr';
}

export async function analyzeLabelViaAPI(imageBase64: string): Promise<AIAnalysisResult> {
  if (USE_CLOUD_FUNCTIONS) {
    const response = await fetch(getApiUrl('analyzeLabel'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error (${response.status}): ${error}`);
    }

    const result = await response.json();
    const content = result.data?.choices?.[0]?.message?.content;
    return parseAIResponse(content);
  }

  // Development: direct OpenRouter call
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'moonshotai/kimi-k2.6';

  if (!API_KEY) {
    throw new Error('OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  const systemPrompt = `You are a precise nutrition label analyzer. Given an image of a food nutrition label, extract all visible nutrition facts.

Rules:
1. If the product name is clearly visible on the label, use it. If not, infer it from the nutrition profile.
2. Classify into exactly one category: wholeFood, protein, dairy, grain, snack, beverage, frozen, processed, other.
3. Return ONLY a valid JSON object. No markdown, no explanation outside JSON.
4. Use 0 for values not visible on the label.
5. All numeric values should be plain numbers (no units, no % signs).
6. servingSize should include units (e.g., "1 cup (240ml)", "1 slice (28g)").
7. servingsPerContainer: if it says "About 4", use 4. If not visible, use 1.
8. Include a "confidence" field (0.0 to 1.0) estimating how certain you are about the overall extraction.
9. Include a "reasoning" field (1-2 sentences) explaining your food name/category inference if you had to guess.

Required JSON structure:
{
  "productName": string,
  "foodCategory": "wholeFood" | "protein" | "dairy" | "grain" | "snack" | "beverage" | "frozen" | "processed" | "other",
  "servingSize": string,
  "servingsPerContainer": number,
  "calories": number,
  "totalFat": number,
  "saturatedFat": number,
  "transFat": number,
  "cholesterol": number,
  "sodium": number,
  "totalCarbs": number,
  "dietaryFiber": number,
  "totalSugar": number,
  "addedSugar": number,
  "protein": number,
  "vitaminD": number,
  "calcium": number,
  "iron": number,
  "potassium": number,
  "confidence": number,
  "reasoning": string
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://nutrition-help.web.app',
      'X-Title': 'VITAL Nutrition Analyzer',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract all nutrition facts from this food label image.' },
            { type: 'image_url', image_url: { url: imageBase64 } },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return parseAIResponse(content);
}

function parseAIResponse(content: string): AIAnalysisResult {
  if (!content) throw new Error('Empty response from AI');

  let jsonStr = content;
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('AI returned invalid JSON: ' + content.slice(0, 200));
  }

  const validCategories = ['wholeFood', 'protein', 'dairy', 'grain', 'snack', 'beverage', 'frozen', 'processed', 'other'];
  const category = String(parsed.foodCategory || 'other');

  return {
    productName: String(parsed.productName || ''),
    foodCategory: validCategories.includes(category) ? category : 'other',
    servingSize: String(parsed.servingSize || ''),
    servingsPerContainer: Number(parsed.servingsPerContainer) || 1,
    calories: Number(parsed.calories) || 0,
    totalFat: Number(parsed.totalFat) || 0,
    saturatedFat: Number(parsed.saturatedFat) || 0,
    transFat: Number(parsed.transFat) || 0,
    cholesterol: Number(parsed.cholesterol) || 0,
    sodium: Number(parsed.sodium) || 0,
    totalCarbs: Number(parsed.totalCarbs) || 0,
    dietaryFiber: Number(parsed.dietaryFiber) || 0,
    totalSugar: Number(parsed.totalSugar) || 0,
    addedSugar: Number(parsed.addedSugar) || 0,
    protein: Number(parsed.protein) || 0,
    vitaminD: Number(parsed.vitaminD) || 0,
    calcium: Number(parsed.calcium) || 0,
    iron: Number(parsed.iron) || 0,
    potassium: Number(parsed.potassium) || 0,
    confidence: Number(parsed.confidence) || 0.5,
    reasoning: String(parsed.reasoning || ''),
    source: 'ai',
  };
}

/* ------------------------------------------------------------------ */
/*  Chat                                                               */
/* ------------------------------------------------------------------ */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChatViaAPI(
  messages: ChatMessage[],
  userLanguage: 'en' | 'ko' = 'en'
): Promise<string> {
  if (USE_CLOUD_FUNCTIONS) {
    const response = await fetch(getApiUrl('chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language: userLanguage }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error (${response.status}): ${error}`);
    }

    const result = await response.json();
    return result.data?.choices?.[0]?.message?.content || '';
  }

  // Development: direct OpenRouter call
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'moonshotai/kimi-k2.6';

  if (!API_KEY) {
    throw new Error('OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  const systemPrompt = `You are VITAL, a knowledgeable nutrition assistant. You provide evidence-based answers about food, nutrients, diets, and healthy eating.

Guidelines:
- Base answers on established nutrition science (WHO, NIH, Harvard School of Public Health, American Heart Association, Mayo Clinic)
- Be concise but thorough. Use bullet points for lists when appropriate.
- When discussing health claims, distinguish between strong evidence and emerging research
- Never provide medical diagnosis or replace professional medical advice
- If asked about specific medical conditions, remind the user to consult a healthcare provider
- Respond in the same language the user is using (English or Korean)
- You do NOT have access to the user's personal data, profile, or meal history
- Keep responses under 300 words when possible
- If asked about something unrelated to nutrition, food, or health, politely redirect to nutrition topics`;

  const langHint = userLanguage === 'ko'
    ? '사용자가 한국어로 질문했습니다. 한국어로 답변해 주세요.'
    : 'The user is asking in English. Please respond in English.';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://nutrition-help.web.app',
      'X-Title': 'VITAL Nutrition Chat',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: langHint },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Chat API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/* ------------------------------------------------------------------ */
/*  Smart Recommendations                                              */
/* ------------------------------------------------------------------ */

export interface SmartRecommendation {
  title: string;
  description: string;
  category: 'alternative' | 'tip' | 'warning';
  priority: 'high' | 'medium' | 'low';
}

export interface SmartAlternative {
  name: string;
  reason: string;
  approxScore: number;
  scoreDelta: number;
}

export interface SmartAnalysis {
  topConcern: string;
  keyInsight: string;
}

export interface SmartRecommendationsResult {
  recommendations: SmartRecommendation[];
  alternatives: SmartAlternative[];
  analysis: SmartAnalysis;
}

export async function getSmartRecommendations(
  nutrition: Record<string, unknown>,
  score: number,
  grade: string,
  profile: string,
  category: string,
  language: 'en' | 'ko' = 'en'
): Promise<SmartRecommendationsResult> {
  const response = await fetch(getApiUrl('smartRecommendations'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nutrition,
      score,
      grade,
      profile,
      category,
      language,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Smart recommendations error (${response.status}): ${error}`);
  }

  const result = await response.json();
  const content = result.data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from smart recommendations');
  }

  // Extract JSON from response
  let jsonStr = content;
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      recommendations: parsed.recommendations || [],
      alternatives: parsed.alternatives || [],
      analysis: parsed.analysis || { topConcern: '', keyInsight: '' },
    };
  } catch {
    throw new Error('Invalid JSON from smart recommendations: ' + content.slice(0, 200));
  }
}
