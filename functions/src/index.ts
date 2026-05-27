import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

admin.initializeApp();

const secrets = new SecretManagerServiceClient();

const PROJECT_ID = process.env.GCLOUD_PROJECT || 'nutrition-help';
const SECRET_PREFIX = `projects/${PROJECT_ID}/secrets`;

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}

/** Retrieve the latest version of a secret from Secret Manager. */
async function getSecret(name: string): Promise<string> {
  const [version] = await secrets.accessSecretVersion({
    name: `${SECRET_PREFIX}/${name}/versions/latest`,
  });
  const payload = version.payload?.data?.toString();
  if (!payload) throw new Error(`Secret ${name} not found or empty`);
  return payload;
}

/** Call OpenRouter API with the given request body. */
async function callOpenRouter(body: OpenRouterRequest): Promise<unknown> {
  const apiKey = await getSecret('openrouter-api-key');

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://nutrition-help.web.app',
      'X-Title': 'VITAL Nutrition',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter error (${response.status}): ${error}`);
  }

  return response.json();
}

/* ------------------------------------------------------------------ */
/*  CORS config — allow your Firebase Hosting domain                   */
/* ------------------------------------------------------------------ */
const corsHandler = (req: functions.https.Request, res: any, next: () => void) => {
  const allowedOrigins = [
    'https://nutrition-help.web.app',
    'https://nutrition-help.firebaseapp.com',
    'http://localhost:3000',
    'http://localhost:5000',
  ];
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Max-Age', '3600');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  next();
};

/* ------------------------------------------------------------------ */
/*  POST /api/analyze-label                                            */
/*  Body: { imageBase64: string }                                      */
/* ------------------------------------------------------------------ */
export const analyzeLabel = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== 'string') {
        res.status(400).json({ error: 'Missing or invalid imageBase64' });
        return;
      }

      const model = await getSecret('openrouter-model').catch(() => 'moonshotai/kimi-k2.6');

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

      const data = await callOpenRouter({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract all nutrition facts from this food label image.' },
              { type: 'image_url', image_url: { url: imageBase64 } },
            ] as unknown as string,
          },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      });

      res.json({ success: true, data });
    } catch (err: any) {
      console.error('analyzeLabel error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });
});

/* ------------------------------------------------------------------ */
/*  POST /api/chat                                                     */
/*  Body: { messages: ChatMessage[], language?: 'en' | 'ko' }          */
/* ------------------------------------------------------------------ */
export const chat = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { messages, language = 'en' } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Missing or invalid messages' });
        return;
      }

      const model = await getSecret('openrouter-model').catch(() => 'moonshotai/kimi-k2.6');

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

      const langHint = language === 'ko'
        ? '사용자가 한국어로 질문했습니다. 한국어로 답변해 주세요.'
        : 'The user is asking in English. Please respond in English.';

      const data = await callOpenRouter({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: langHint },
          ...messages.map((m: OpenRouterMessage) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 2048,
      });

      res.json({ success: true, data });
    } catch (err: any) {
      console.error('chat error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });
});

/* ------------------------------------------------------------------ */
/*  POST /api/smart-recommendations                                    */
/*  Body: {                                                            */
/*    nutrition: NutritionFacts,                                       */
/*    score: number,                                                   */
/*    grade: string,                                                   */
/*    profile: string,                                                 */
/*    category: string,                                                */
/*    language?: 'en' | 'ko'                                           */
/*  }                                                                  */
/* ------------------------------------------------------------------ */
export const smartRecommendations = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { nutrition, score, grade, profile, category, language = 'en' } = req.body;
      if (!nutrition || typeof score !== 'number') {
        res.status(400).json({ error: 'Missing nutrition data or score' });
        return;
      }

      const model = await getSecret('openrouter-model').catch(() => 'moonshotai/kimi-k2.6');

      const systemPrompt = `You are VITAL, an expert nutrition analyst. Given a food's nutrition facts and health score, generate smart, actionable recommendations and better alternatives.

Rules:
1. Analyze the nutrition data critically and identify the top 2-3 health concerns.
2. Generate 3-5 specific, actionable recommendations. Each should have:
   - title: short, specific (max 6 words)
   - description: 1-2 sentences explaining why and how
   - category: "alternative" (swap suggestion), "tip" (eating advice), or "warning" (health concern)
   - priority: "high", "medium", or "low"
3. Generate 1-2 better alternatives that are specific to the food category:
   - name: the specific alternative food
   - reason: why it's better (with specific numbers when possible)
   - approxScore: estimated health score (0-100)
   - scoreDelta: how much the score improves
4. Consider the user's dietary profile when making recommendations.
5. Be evidence-based and reference specific nutrients.
6. Return ONLY valid JSON. No markdown, no explanation outside JSON.

Response format:
{
  "recommendations": [
    {
      "title": string,
      "description": string,
      "category": "alternative" | "tip" | "warning",
      "priority": "high" | "medium" | "low"
    }
  ],
  "alternatives": [
    {
      "name": string,
      "reason": string,
      "approxScore": number,
      "scoreDelta": number
    }
  ],
  "analysis": {
    "topConcern": string,
    "keyInsight": string
  }
}`;

      const userPrompt = `Analyze this food and provide smart recommendations:

Product: ${nutrition.productName || 'Unknown'}
Category: ${category || 'other'}
Health Score: ${score}/100 (Grade ${grade || '?'})
Dietary Profile: ${profile || 'general'}

Nutrition per serving (${nutrition.servingSize || '1 serving'}):
- Calories: ${nutrition.calories}
- Total Fat: ${nutrition.totalFat}g (Saturated: ${nutrition.saturatedFat}g, Trans: ${nutrition.transFat}g)
- Sodium: ${nutrition.sodium}mg
- Total Carbs: ${nutrition.totalCarbs}g (Fiber: ${nutrition.dietaryFiber}g, Total Sugar: ${nutrition.totalSugar}g, Added Sugar: ${nutrition.addedSugar}g)
- Protein: ${nutrition.protein}g
- Cholesterol: ${nutrition.cholesterol}mg
${nutrition.vitaminD ? `- Vitamin D: ${nutrition.vitaminD}mcg` : ''}
${nutrition.calcium ? `- Calcium: ${nutrition.calcium}mg` : ''}
${nutrition.iron ? `- Iron: ${nutrition.iron}mg` : ''}
${nutrition.potassium ? `- Potassium: ${nutrition.potassium}mg` : ''}

${language === 'ko' ? '한국어로 답변해 주세요.' : 'Please respond in English.'}`;

      const data = await callOpenRouter({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 2048,
      });

      res.json({ success: true, data });
    } catch (err: any) {
      console.error('smartRecommendations error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });
});
