import Tesseract from 'tesseract.js';

export interface ExtractedNutrients {
  productName?: string;
  servingSize?: string;
  servingsPerContainer?: number;
  calories?: number;
  totalFat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  totalCarbs?: number;
  dietaryFiber?: number;
  totalSugar?: number;
  addedSugar?: number;
  protein?: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
  vitaminDPercent?: number;
  calciumPercent?: number;
  ironPercent?: number;
  potassiumPercent?: number;
  rawText?: string;
  /** Fields populated by Atwater back-calculation rather than read directly. */
  estimatedFields?: ExtractedNutrientField[];
  /** Calorie reconciliation result. */
  atwater?: AtwaterResult;
  debug?: { line: string; matched: string; value: number }[];
}

export type ExtractedNutrientField =
  | 'totalFat'
  | 'saturatedFat'
  | 'transFat'
  | 'cholesterol'
  | 'sodium'
  | 'totalCarbs'
  | 'dietaryFiber'
  | 'totalSugar'
  | 'addedSugar'
  | 'protein';

export interface AtwaterResult {
  labelCalories: number;
  computedCalories: number;
  diffPercent: number;
  status: 'match' | 'soft-mismatch' | 'hard-mismatch';
}

type NutrientField = ExtractedNutrientField | 'vitaminD' | 'calcium' | 'iron' | 'potassium';

type PercentDvField = Extract<
  keyof ExtractedNutrients,
  'vitaminDPercent' | 'calciumPercent' | 'ironPercent' | 'potassiumPercent'
>;

type NutrientUnit = 'g' | 'mg' | 'mcg';

interface NutrientDefinition {
  field: NutrientField;
  displayName: string;
  unit: NutrientUnit;
  aliases: RegExp[];
  percentDvField?: PercentDvField;
  amountCanAppearBeforeAlias?: boolean;
}

interface TextSegment {
  text: string;
  raw: string;
}

const NUTRIENT_DEFINITIONS: NutrientDefinition[] = [
  {
    field: 'totalFat',
    displayName: 'totalFat',
    unit: 'g',
    aliases: [/\btotal\s+fat\b/i, /\btotal\s+fats\b/i, /\bli?pides?\b/i],
  },
  {
    field: 'saturatedFat',
    displayName: 'saturatedFat',
    unit: 'g',
    aliases: [/\bsat(?:urated|uree|urees)?\.?\s+fat\b/i, /\bsaturates\b/i, /\bsat(?:\.|urated)\s+fat\b/i],
  },
  {
    field: 'transFat',
    displayName: 'transFat',
    unit: 'g',
    aliases: [/\btrans\.?\s*fat\b/i, /\btrans\b/i],
  },
  {
    field: 'cholesterol',
    displayName: 'cholesterol',
    unit: 'mg',
    aliases: [/\bcholesterol\b/i, /\bcholest(?:erol|\.)?\b/i],
  },
  {
    field: 'sodium',
    displayName: 'sodium',
    unit: 'mg',
    aliases: [/\bsodium\b/i, /\bsod(?:ium|lum|lurn|iurn|um|un|iom|jum)\b/i, /\bsel\b/i],
  },
  {
    field: 'totalCarbs',
    displayName: 'totalCarbs',
    unit: 'g',
    aliases: [/\btotal\s+(?:carbohydrate|carbohydrates|carbs?|carb)\b/i, /\bglucides?\b/i, /\bcarbohydrates?\b/i],
  },
  {
    field: 'dietaryFiber',
    displayName: 'dietaryFiber',
    unit: 'g',
    aliases: [/\bdietary\s+fib(?:er|re)\b/i, /\bfib(?:er|re|res)\b/i],
  },
  {
    field: 'totalSugar',
    displayName: 'totalSugar',
    unit: 'g',
    aliases: [/\btotal\s+sugars?\b/i, /\bsugars?\b/i, /\bsucres?\b/i],
  },
  {
    field: 'addedSugar',
    displayName: 'addedSugar',
    unit: 'g',
    aliases: [/\badded\s+sugars?\b/i, /\bincludes?\b/i, /\bsucres?\s+ajout/i],
    amountCanAppearBeforeAlias: true,
  },
  {
    field: 'protein',
    displayName: 'protein',
    unit: 'g',
    // Token-tolerant: catches "Prot", "Protein", "Protéines", "Proteins", "Protein/Protéines"
    aliases: [
      /\bprotein(?:s|es)?\b/i,
      /\bprot[eé]i?nes?\b/i,
      /\bprot\.?\b/i,
    ],
  },
  {
    field: 'vitaminD',
    displayName: 'vitaminD',
    unit: 'mcg',
    aliases: [/\bvitamin\s+d\b/i, /\bvit\.?\s*d\b/i],
    percentDvField: 'vitaminDPercent',
  },
  {
    field: 'calcium',
    displayName: 'calcium',
    unit: 'mg',
    aliases: [/\bcalcium\b/i, /\bcalc(?:ium)?\b/i],
    percentDvField: 'calciumPercent',
  },
  {
    field: 'iron',
    displayName: 'iron',
    unit: 'mg',
    aliases: [/\biron\b/i, /\bfer\b/i],
    percentDvField: 'ironPercent',
  },
  {
    field: 'potassium',
    displayName: 'potassium',
    unit: 'mg',
    aliases: [/\bpotassium\b/i, /\bpotass(?:ium)?\b/i],
    percentDvField: 'potassiumPercent',
  },
];

/**
 * Clean up common OCR artifacts in text.
 */
function cleanOCRLine(line: string): string {
  return line
    .replace(/[|[\]{}]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize OCR text: fix common misreadings.
 */
function normalizeLine(line: string): string {
  let normalized = line;
  const fixes: [RegExp, string][] = [
    [/totai/gi, 'total'],
    [/tota1/gi, 'total'],
    [/fai\b/gi, 'fat'],
    [/saiurared/gi, 'saturated'],
    [/saturaled/gi, 'saturated'],
    [/saluraled/gi, 'saturated'],
    [/\bsai\b/gi, 'sat'],
    [/frans/gi, 'trans'],
    [/choiesteroi/gi, 'cholesterol'],
    [/cholesteroi/gi, 'cholesterol'],
    [/choiesleroi/gi, 'cholesterol'],
    [/cholestero!/gi, 'cholesterol'],
    [/carbohydraie/gi, 'carbohydrate'],
    [/carbohydate/gi, 'carbohydrate'],
    [/carbohydrale/gi, 'carbohydrate'],
    // Heavy protein-spelling variants — root cause of "Grade D ground chicken"
    [/proiein/gi, 'protein'],
    [/prote1n/gi, 'protein'],
    [/proteln/gi, 'protein'],
    [/proteim/gi, 'protein'],
    [/protien/gi, 'protein'],
    [/proteine?s?/gi, 'protein'],
    [/protélnes?/gi, 'protein'],
    [/protéines?/gi, 'protein'],
    [/proieln/gi, 'protein'],
    [/proieins?/gi, 'protein'],
    [/proteln/gi, 'protein'],
    [/calciun/gi, 'calcium'],
    [/caicium/gi, 'calcium'],
    [/potaissium/gi, 'potassium'],
    [/potassiurn/gi, 'potassium'],
    [/sugai/gi, 'sugar'],
    [/sugars?/gi, 'sugars'],
    [/sodiuum/gi, 'sodium'],
    [/sodlum/gi, 'sodium'],
    [/sodlurn/gi, 'sodium'],
    [/sodiurn/gi, 'sodium'],
    [/sodum/gi, 'sodium'],
    [/sodiun/gi, 'sodium'],
    [/sodiom/gi, 'sodium'],
    [/fibre/gi, 'fiber'],
    [/calorles/gi, 'calories'],
    [/calorics/gi, 'calories'],
    [/inciuoes/gi, 'includes'],
    [/inciudes/gi, 'includes'],
    [/inciuded/gi, 'included'],
    [/daiiy/gi, 'daily'],
    [/vaivpe/gi, 'value'],
    // 'O' read as zero next to digits
    [/(\d)O(?=g\b|mg\b|mcg\b)/g, '$10'],
    [/O(?=\dg\b|\dmg\b|\dmcg\b)/g, '0'],
  ];
  for (const [pattern, replacement] of fixes) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized;
}

function normalizeTextForSearch(text: string): string {
  return normalizeLine(cleanOCRLine(text))
    .replace(/\b[sS][oO]\s*(?:m\s*[gq]|r\s*n?\s*g)\b/g, '50mg')
    .replace(/\b[sS](?=\s*(?:m\s*[gq]|r\s*n?\s*g)\b)/g, '5')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*(m\s*[gq]|r\s*n?\s*g|r\s*g|n\s*g)\b/gi, '$1mg')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*(m\s*c\s*g)\b/gi, '$1mcg')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*(g)\b/gi, '$1g')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSegments(rawLines: string[], lines: string[]): TextSegment[] {
  const segments: TextSegment[] = [];
  const seen = new Set<string>();

  const addSegment = (text: string, raw: string) => {
    const normalized = normalizeTextForSearch(text);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    segments.push({ text: normalized, raw: raw.trim() || normalized });
  };

  for (let i = 0; i < lines.length; i++) {
    addSegment(lines[i], rawLines[i] || lines[i]);
    if (i + 1 < lines.length) {
      addSegment(`${lines[i]} ${lines[i + 1]}`, `${rawLines[i] || lines[i]} ${rawLines[i + 1] || lines[i + 1]}`);
    }
    if (i + 2 < lines.length) {
      addSegment(
        `${lines[i]} ${lines[i + 1]} ${lines[i + 2]}`,
        `${rawLines[i] || lines[i]} ${rawLines[i + 1] || lines[i + 1]} ${rawLines[i + 2] || lines[i + 2]}`,
      );
    }
  }

  addSegment(lines.join(' '), rawLines.join(' '));
  return segments;
}

function findAlias(text: string, aliases: RegExp[]): { index: number; length: number } | undefined {
  let best: { index: number; length: number } | undefined;

  for (const alias of aliases) {
    const match = text.match(alias);
    if (match?.index !== undefined && (best === undefined || match.index < best.index)) {
      best = { index: match.index, length: match[0].length };
    }
  }

  return best;
}

function nextNutrientAliasIndex(text: string, startIndex: number, current: NutrientDefinition): number | undefined {
  let closest: number | undefined;
  const afterCurrent = text.slice(startIndex);

  for (const definition of NUTRIENT_DEFINITIONS) {
    if (definition.field === current.field) continue;
    const alias = findAlias(afterCurrent, definition.aliases);
    if (alias && alias.index > 0) {
      const absoluteIndex = startIndex + alias.index;
      if (closest === undefined || absoluteIndex < closest) {
        closest = absoluteIndex;
      }
    }
  }

  return closest;
}

function canonicalUnit(unit: string): NutrientUnit | undefined {
  const normalized = unit.toLowerCase().replace(/\s+/g, '');
  if (normalized === 'g') return 'g';
  if (normalized === 'mg') return 'mg';
  if (normalized === 'mcg' || normalized === 'ug') return 'mcg';
  return undefined;
}

function convertToExpectedUnit(value: number, fromUnit: NutrientUnit, expectedUnit: NutrientUnit): number | undefined {
  if (fromUnit === expectedUnit) return value;
  if (fromUnit === 'g' && expectedUnit === 'mg') return value * 1000;
  if (fromUnit === 'mg' && expectedUnit === 'g') return value / 1000;
  if (fromUnit === 'mg' && expectedUnit === 'mcg') return value * 1000;
  if (fromUnit === 'mcg' && expectedUnit === 'mg') return value / 1000;
  return undefined;
}

function extractUnitAmount(text: string, expectedUnit: NutrientUnit): number | undefined {
  const matches = [...text.matchAll(/(?:<\s*)?(\d+(?:[.,]\d+)?)\s*(mcg|ug|mg|g)\b/gi)];
  for (const match of matches) {
    const amount = parseFloat(match[1].replace(',', '.'));
    const unit = canonicalUnit(match[2]);
    if (!unit || Number.isNaN(amount)) continue;

    const converted = convertToExpectedUnit(amount, unit, expectedUnit);
    if (converted !== undefined) {
      return Math.round(converted * 10) / 10;
    }
  }
  return undefined;
}

/**
 * For protein-style fields where the unit may be missed by OCR (e.g. "Protein 10"
 * read with the trailing "g" lost), extract the first plausible bare number after
 * the alias as a gram value. Used as fallback only.
 */
function extractBareGrams(text: string): number | undefined {
  const match = text.match(/(?:<\s*)?(\d+(?:[.,]\d+)?)(?!\s*%)/);
  if (!match) return undefined;
  const parsed = parseFloat(match[1].replace(',', '.'));
  if (Number.isNaN(parsed)) return undefined;
  if (parsed > 250) return undefined;
  return Math.round(parsed * 10) / 10;
}

function extractNumberAfterKeyword(text: string, keyword: RegExp): number | undefined {
  const match = text.match(keyword);
  if (!match || match.index === undefined) return undefined;

  const afterKeyword = text.slice(match.index + match[0].length);
  const number = afterKeyword.match(/(?:<\s*)?(\d+(?:[.,]\d+)?)(?!\s*%)/);
  if (!number) return undefined;

  const parsed = parseFloat(number[1].replace(',', '.'));
  return Number.isNaN(parsed) ? undefined : parsed;
}

function getBoundedWindow(segment: string, alias: { index: number; length: number }, definition: NutrientDefinition): string {
  const start = alias.index + alias.length;
  const nextAliasIndex = nextNutrientAliasIndex(segment, start, definition);
  const end = nextAliasIndex ?? Math.min(segment.length, start + 48);
  return segment.slice(start, end);
}

function readNutrientFromSegment(segment: string, definition: NutrientDefinition): number | undefined {
  const alias = findAlias(segment, definition.aliases);
  if (!alias) return undefined;

  const boundedAfterAlias = getBoundedWindow(segment, alias, definition);
  const amountAfterAlias = extractUnitAmount(boundedAfterAlias, definition.unit);
  if (amountAfterAlias !== undefined) return amountAfterAlias;

  // For grams-only fields where the unit was dropped by OCR, fall back to the
  // first plausible bare number. Critical for protein (e.g. "Protein 10" → 10g).
  if (definition.unit === 'g') {
    const bare = extractBareGrams(boundedAfterAlias);
    if (bare !== undefined) return bare;
  }

  if (definition.field === 'sodium') {
    const sodiumWithoutUnit = boundedAfterAlias.match(/(?:<\s*)?(\d+(?:[.,]\d+)?)(?!\s*%)/);
    if (sodiumWithoutUnit) {
      const parsed = parseFloat(sodiumWithoutUnit[1].replace(',', '.'));
      if (!Number.isNaN(parsed)) return parsed;
    }
  }

  if (definition.amountCanAppearBeforeAlias) {
    const start = Math.max(0, alias.index - 32);
    const end = Math.min(segment.length, alias.index + alias.length + 32);
    return extractUnitAmount(segment.slice(start, end), definition.unit);
  }

  return undefined;
}

function readPercentDvFromSegment(segment: string, definition: NutrientDefinition): number | undefined {
  const alias = findAlias(segment, definition.aliases);
  if (!alias) return undefined;

  const boundedAfterAlias = getBoundedWindow(segment, alias, definition);
  const percentMatch = boundedAfterAlias.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (!percentMatch) return undefined;

  const value = parseFloat(percentMatch[1].replace(',', '.'));
  return Number.isNaN(value) ? undefined : value;
}

function readCalories(segments: TextSegment[]): { value: number; segment: TextSegment } | undefined {
  for (const segment of segments) {
    const lower = segment.text.toLowerCase();
    if (!/\bcalories\b(?!\s+from\s+fat)/.test(lower)) continue;

    const value = extractNumberAfterKeyword(segment.text, /\bcalories\b(?!\s+from\s+fat)/i);
    if (value !== undefined) {
      return { value: Math.round(value), segment };
    }
  }

  return undefined;
}

function readServingsPerContainer(segments: TextSegment[]): number | undefined {
  for (const segment of segments) {
    const lower = segment.text.toLowerCase();
    if (!/\bservings?\s+per\b/.test(lower) && !/\bservings?\s+about\b/.test(lower)) continue;

    const afterValue = lower.match(/\bservings?\s+per\s+\w+\s*(?:about\s*)?(\d+(?:[.,]\d+)?)/i);
    const beforeValue = lower.match(/(?:about\s*)?(\d+(?:[.,]\d+)?)\s+servings?\s+per\b/i);
    const value = afterValue?.[1] ?? beforeValue?.[1];
    if (value) {
      const parsed = parseFloat(value.replace(',', '.'));
      if (!Number.isNaN(parsed)) return Math.round(parsed);
    }
  }

  return undefined;
}

function readServingSize(rawLines: string[], lines: string[]): string | undefined {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();
    if (!lower.includes('serving size')) continue;

    const rawLine = rawLines[i] || line;
    const servingMatch = rawLine.match(/serving\s+size\s*:?\s*(.+)$/i);
    const value = servingMatch?.[1]?.trim();

    if (value && !/amount\s+per|calories|daily\s+value/i.test(value)) {
      return value;
    }

    const nextLine = rawLines[i + 1] || lines[i + 1];
    if (nextLine && !/serving|amount\s+per|calories|daily\s+value/i.test(nextLine)) {
      return nextLine.trim();
    }
  }

  return undefined;
}

function readProductName(rawLines: string[], lines: string[]): string | undefined {
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    const lower = line.toLowerCase();
    if (
      line.length > 3 &&
      !lower.includes('nutrition') &&
      !lower.includes('serving') &&
      !lower.includes('amount') &&
      !lower.includes('calories') &&
      !lower.includes('daily') &&
      !lower.includes('total') &&
      !lower.includes('fat') &&
      !lower.includes('%') &&
      line.length < 80
    ) {
      return rawLines[i] || line;
    }
  }

  return undefined;
}

/**
 * Atwater check: validate that label calories ≈ 9·F + 4·C + 4·P.
 * Tolerance: 15% soft, 30% hard — labels round, fiber affects net carbs, and OCR is noisy.
 */
function reconcileAtwater(extracted: ExtractedNutrients): AtwaterResult | undefined {
  if (extracted.calories === undefined) return undefined;
  if (extracted.totalFat === undefined && extracted.totalCarbs === undefined && extracted.protein === undefined) {
    return undefined;
  }

  const fat = extracted.totalFat ?? 0;
  const carbs = extracted.totalCarbs ?? 0;
  const protein = extracted.protein ?? 0;
  const computed = fat * 9 + carbs * 4 + protein * 4;

  if (extracted.calories <= 0 || computed <= 0) return undefined;

  const diff = Math.abs(computed - extracted.calories);
  const diffPercent = (diff / extracted.calories) * 100;

  let status: AtwaterResult['status'];
  if (diffPercent <= 15) status = 'match';
  else if (diffPercent <= 30) status = 'soft-mismatch';
  else status = 'hard-mismatch';

  return {
    labelCalories: extracted.calories,
    computedCalories: Math.round(computed),
    diffPercent: Math.round(diffPercent * 10) / 10,
    status,
  };
}

/**
 * Back-calculate a missing macro using Atwater factors. Runs only when:
 *   - Exactly one macro was not extracted (undefined — distinct from declared 0g).
 *   - The remaining calorie gap is meaningful (≥30 cal).
 * Marks the field as estimated for the UI banner.
 *
 * Distinguishing "undefined" from "0" matters: meat legitimately has 0g carbs;
 * we should not silently overwrite a real declared zero.
 */
function backCalculateMacros(extracted: ExtractedNutrients): void {
  if (extracted.calories === undefined || extracted.calories <= 0) return;

  const macros: { field: ExtractedNutrientField; factor: number }[] = [
    { field: 'totalFat', factor: 9 },
    { field: 'totalCarbs', factor: 4 },
    { field: 'protein', factor: 4 },
  ];

  const declared = macros.filter(m => typeof extracted[m.field] === 'number');
  const missing = macros.filter(m => extracted[m.field] === undefined);

  if (missing.length !== 1) return;

  const knownCalories = declared.reduce(
    (sum, m) => sum + (extracted[m.field] as number) * m.factor,
    0,
  );
  const gap = extracted.calories - knownCalories;
  if (gap < 30) return;

  const target = missing[0];
  const estimatedGrams = Math.max(0, Math.round((gap / target.factor) * 10) / 10);
  if (estimatedGrams <= 0) return;

  extracted[target.field] = estimatedGrams;
  extracted.estimatedFields = [...(extracted.estimatedFields || []), target.field];
}

export function parseNutritionText(rawText: string): ExtractedNutrients {
  const rawLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const lines = rawLines.map(normalizeTextForSearch);
  const segments = buildSegments(rawLines, lines);
  const extracted: ExtractedNutrients = { rawText };
  const debug: { line: string; matched: string; value: number }[] = [];

  extracted.productName = readProductName(rawLines, lines);
  extracted.servingSize = readServingSize(rawLines, lines);
  extracted.servingsPerContainer = readServingsPerContainer(segments);

  const calories = readCalories(segments);
  if (calories) {
    extracted.calories = calories.value;
    debug.push({ line: calories.segment.raw, matched: 'calories', value: calories.value });
  }

  for (const definition of NUTRIENT_DEFINITIONS) {
    for (const segment of segments) {
      const value = readNutrientFromSegment(segment.text, definition);
      if (value !== undefined) {
        extracted[definition.field] = value;
        debug.push({ line: segment.raw, matched: definition.displayName, value });
        break;
      }
    }

    if (definition.percentDvField) {
      for (const segment of segments) {
        const percent = readPercentDvFromSegment(segment.text, definition);
        if (percent !== undefined) {
          extracted[definition.percentDvField] = percent;
          debug.push({ line: segment.raw, matched: `${definition.displayName} %DV`, value: percent });
          break;
        }
      }
    }
  }

  if (extracted.addedSugar !== undefined && extracted.totalSugar === undefined) {
    extracted.totalSugar = extracted.addedSugar;
  }

  // Atwater reconciliation + back-calculation
  backCalculateMacros(extracted);
  extracted.atwater = reconcileAtwater(extracted);

  extracted.debug = debug;
  return extracted;
}

/**
 * Client-side image preprocessing: upscale + grayscale + adaptive contrast.
 * Improves OCR accuracy on real-world (crumpled, low-light) labels.
 */
async function preprocessImageForOCR(imageUrl: string): Promise<string> {
  if (typeof document === 'undefined') return imageUrl;

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load nutrition label image'));
    img.src = imageUrl;
  });

  const scale = Math.min(4, Math.max(1.5, 1800 / Math.max(image.width, image.height)));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);

  const context = canvas.getContext('2d');
  if (!context) return imageUrl;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Pass 1: convert to grayscale and compute a quick luminance histogram for
  // adaptive thresholding.
  const histogram = new Uint32Array(256);
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
    histogram[gray]++;
  }

  // Use the histogram median as a soft threshold pivot — better than fixed 128
  // for backlit / shadowed photos.
  let total = 0;
  const totalPixels = data.length / 4;
  let median = 128;
  for (let g = 0; g < 256; g++) {
    total += histogram[g];
    if (total >= totalPixels / 2) {
      median = g;
      break;
    }
  }

  const pivot = Math.max(96, Math.min(180, median));
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i];
    const contrast = Math.max(0, Math.min(255, (gray - pivot) * 1.55 + 128));
    data[i] = contrast;
    data[i + 1] = contrast;
    data[i + 2] = contrast;
  }

  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

export async function extractNutritionFromImage(imageUrl: string): Promise<ExtractedNutrients> {
  const preparedImage = await preprocessImageForOCR(imageUrl);
  const result = await Tesseract.recognize(preparedImage, 'eng', {
    logger: () => {},
    preserve_interword_spaces: '1',
    tessedit_pageseg_mode: '6',
  } as Partial<Tesseract.WorkerOptions>);

  return parseNutritionText(result.data.text);
}
