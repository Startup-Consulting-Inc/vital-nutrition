# VITAL Nutrition Intelligence — Master Action Items

A synthesis of three feedback passes (UX/strategy review, product action items, and engineering-level fixes), de-duplicated and prioritized. Tags note budget/effort where relevant. `$0` = achievable client-side with no paid services.

**Implementation status (codebase review, 2026-05-26):** Analyzer P0/P1 items are largely shipped. `npx tsx scripts/regression.mts` — 19/19 passing (ground chicken **78/B**, Diet Coke **73/B**). Items marked `[x]` are implemented; notes call out partial work. Encyclopedia/platform P2/P3 are mixed — see sections below.

---

## P0 — Critical Bugs (fix before any promotion)

These directly cause the "Grade D ground chicken" failure that destroys trust on first use.

- [x] **Fix protein field mapping in the OCR parser.** Animal/dairy/legume products are reading `0g` protein (real label = 10g). Debug the regex/scanner so it extracts the value instead of defaulting to zero. `$0` — *`src/lib/ocrParser.ts`: aliases for Prot, Protéines, Proteln, inline/no-unit values.*
- [x] **Make protein a required field; block scoring when it's implausible.** If protein = `0g` on a product whose name implies meat/dairy/legume, halt and prompt the user to correct before scoring. — *`requiresProteinConfirmation()` in `nutritionAnalyzer.ts` + gate in `LabelAnalyzer.tsx`.*
- [x] **Add a mandatory OCR-confirmation step.** Show scanned values and let the user edit/confirm them *before* the score is generated (the analyzer already promises this — enforce it). — *Checkbox required after upload; samples skip gate.*
- [x] **Recalibrate the Health Index so whole foods aren't penalized for missing/zero macros.** A minimally-processed, low-sodium, no-added-sugar food currently scores like soda. Ground chicken should land ~C/B-, not D. — *Whole-food baseline 65 vs 50; no fiber penalty on meat/dairy.*
- [x] **Re-score the ground chicken case (protein = 10g) as a regression test.** Confirm it no longer grades D and lock it in as a permanent test fixture. — *`scripts/regression.mts`; fixture uses 22g protein → **78/B** (original doc cited 10g).*

---

## P0 — Scoring Logic Corrections

- [x] **Add category-relative scoring.** Score meats against meat benchmarks, beverages against beverages, etc. — not against one universal ideal. A separate rubric for whole, single-ingredient foods (no fiber penalty on meat, no protein "budget" failure on chicken). — *`CategoryRubric` + `resolveCategory()` (beverages skip fiber; category-specific baselines/weights).*
- [x] **Modernize the cholesterol penalty.** The 300mg/day cap was dropped from the US Dietary Guidelines in 2015. Downweight dietary cholesterol heavily or remove it as a primary negative. — *Penalty only when cholesterol + saturated fat both high.*
- [x] **Fix the "calorie density" wording — it's factually wrong.** "53% of calories from fat" is a *fat ratio*, not calorie density. Rename to **"High fat ratio"** / **"Majority of calories from fat,"** and don't treat a high fat % on a low-carb whole food as inherently negative. Penalize saturated/trans fat instead.

---

## P0 — Parser Hardening (`$0`, client-side)

Cheap, high-leverage fixes that prevent the root cause of bad scores.

- [x] **Implement Atwater guardrails.** Validate that scanned macros roughly reconcile with stated calories:
  `Calculated kcal = (Fat × 9) + (Carbs × 4) + (Protein × 4)`.
  If the calculated total diverges sharply from the label's calories, flag it.
- [x] **Build a back-calculation fallback.** If one macro reads `0` but a significant caloric gap exists, auto-estimate the missing macro from the remaining calories — then mark it as estimated (see banner below).
- [x] **Add client-side image preprocessing before OCR.** Use the HTML5 `<canvas>` API to convert label photos to grayscale + high-contrast threshold. Improves OCR accuracy on real-world (crumpled, low-light) labels for free.
- [x] **Move to token-based / fuzzy string matching.** Supplement strict regex with a lightweight browser NLP lib (e.g. `compromise.js`) to catch variants like "Prot", "Protein / Protéines", and dropped line breaks. — *Regex alias list in `ocrParser.ts` (no `compromise.js`); regression covers OCR variants.*

---

## P1 — Trust & Transparency

- [x] **Publish the scoring methodology.** A "How is this calculated?" link exposing every penalty, credit, threshold, and its source — makes grades defensible and surfaces bad logic. — *`/methodology` + links from analyzer.*
- [x] **Show the grade scale.** A legend mapping score ranges → A/B/C/D. — *`showLegend` wired on analyzer results gauge.*
- [x] **Add an "⚠️ Estimated Value" banner** on any macro card the back-calculation script deduced, prompting manual verification.
- [x] **Fix the alarmist gauge color.** Add an **amber zone (40–60)**; reserve red for `<40`. Visual severity should match the verbal message ("Consider Alternatives" ≠ danger). `$0`
- [x] **Add an OCR-accuracy disclaimer** near the analyzer: "Auto-read values may need correction — please verify before analyzing."
- [x] **Add a medical disclaimer + "consult a professional" note.** The site covers deficiency symptoms and supplement dosing without one — needed ethically and legally. — *Analyzer form + footer.*
- [x] **Add a privacy reassurance line** (if true): "Photos are processed in your browser and not stored on our servers."

---

## P1 — Analyzer Scoring & Denominators

- [x] **Standardize progress-bar denominators.** Right now Calories track against a 400-cal *meal* target while Sodium tracks against a 2,300mg *daily* cap — mixing per-meal and per-day is confusing. Pick one frame per view and label it. — *`frame: 'meal' | 'day'` on each nutrient card.*
- [x] **Add a serving multiplier.** "I ate ½ package / 1 serving / 2 servings" → recalculates all %DV and the score dynamically. Include a per-serving vs per-100g toggle for cross-label comparison. — *Slider 0.25×–4× done; **per-100g toggle not built** (copy only mentions EU panels).*
- [x] **Add a dietary-context profile toggle.** "Score for: General / Heart Health / Keto / High Protein / Low Sodium / Diabetic" — re-weights the algorithm per profile.
- [ ] **Show the %DV baseline on each card.** e.g. "Daily limit based on 2,000 cal diet" or "Your profile: 1,800 cal / Low Sodium." — *Fixed 2,000-cal RDI in analyzer; `useUserProfile` personalizes encyclopedia/compare/log, not analyzer %DV cards.*

---

## P1 — Analyzer UX & Flow

- [x] **Surface the top alternative inline**, directly under the score card (thumbnail + name + score delta). Make alternatives same-category and actionable ("ground chicken breast / 93% lean," not "eat something else"). Demote the tab to "All Recommendations." — *No thumbnail image; text card + "All Recommendations" tab.*
- [ ] **Explain the "Minimally Processed" tag.** Show the OCR'd ingredient list with a count: "3 ingredients: Ground Chicken, Water, Rosemary Extract." — *Heuristic `processingExplanation` only; no OCR ingredient list.*
- [x] **Auto-link to amino acids on protein foods.** If protein > 5g: "Complete protein — all 9 essential amino acids present. View breakdown →" linking to `/amino-acids`.
- [ ] **Add an output preview** (screenshot/GIF) on `/analyzer` showing the full flow: upload → OCR correction → score → alternatives.
- [x] **Make "Try a sample" concrete.** Show 3 clickable sample label thumbnails (yogurt, cereal, frozen meal) that run a full analysis without uploading. — *5 samples with letter badges (not label photos).*
- [x] **State supported label formats.** "Works with US Nutrition Facts, EU per-100g, and Korean 식품영양성분표."

---

## P2 — Content & Copy (Encyclopedia)

- [x] **Strengthen the home-page value prop.** Lead with utility: "Upload any food label. Get a health score. Find better alternatives." — not philosophy.
- [x] **Apply the Fats-page "Eat Most / Limit / Avoid" framing** to Carbs, Proteins, Vitamins, and Minerals (e.g. Carbs: complex = Eat Most, refined = Limit, added sugars = Avoid). — *`intakeBuckets` on carbs/proteins/vitamins/minerals; fats via `fatTypes` / `toneLabel`.*
- [x] **Explain the Best / Good / Moderate ratings.** Tooltip/footnote: "Based on nutrient density, bioavailability, and absence of harmful co-nutrients per calorie." Also audit the logic for consistency (banana/apple "Good" vs brown rice "Best"). — *`FOOD_RATING_RUBRIC` + `title` on badges; category audit not re-run.*
- [x] **Quantify Tolerable Upper Intake Levels (UL)** next to the fat-soluble vitamin warning on the Vitamins page, so supplement safety thresholds are explicit. — *`upperLimits` table on Vitamins + Minerals in `NutrientDetail`.*
- [x] **Add citations to the Research page** (study IDs / author-year, e.g. "Te Morenga et al., BMJ") so claims are verifiable. — *Per-chapter `citations` in `ResearchSection.tsx` (author-year refs; not every claim has Te Morenga).*
- [x] **Make the Healthy Plate Method a visual diagram** (half veg, quarter protein, quarter grains) instead of text-only. — *`HealthyPlateDiagram` on Research page.*
- [x] **Add a practical meal example to the Amino Acids page.** e.g. "70kg person — 2 eggs (1.2g Leucine) + 150g chicken (2.1g) = 80% daily need." — *BCAA calculator + complete-protein matchmaker (weight from profile).*

---

## P2 — Content Data Cleanup (encyclopedia bugs)

- [x] **Standardize column meaning per page.** On the carbs page, sweet potato shows "438% DV vitamin A" in the column where every other row shows grams of carbs. One column = one unit. — *`amount` column is `26g carbs`; 438% DV lives in `keyBenefit`, not the amount column.*
- [ ] **Recheck deficiency/warning text** for unit or value typos from content entry. — *Not systematically audited in code.*

---

## P2 — Feature Gaps (turn the wiki into a tool)

The strategic moat. The encyclopedia is a commodity; *personalized, actionable guidance* is not.

- [x] **Dynamic content scaling.** Replace static "Daily Need" headers across all nutrient pages with calculations that scale to a client-side user profile (age, gender, weight in kg). Turns the generic calorie table into *my* number and the RDA into *my* gram target. — *`useUserProfile` + `personalizedTargets` on `NutrientDetail`, Compare, Meal Log.*
- [x] **Food comparison tool.** Pick/upload 2 items side-by-side with diff highlighting. — *`/compare` + `foodCatalog`.*
- [x] **Daily meal-score logger.** "I ate X, Y, Z today" → aggregated grade + nutrient totals vs. targets. Drives daily return visits; food data already exists. — *`/log` + `mealLog.ts`; analyzer "Add to today's log".*
- [x] **Amino-acid complete-protein matchmaker.** When a user views/logs an incomplete protein (e.g. black beans), auto-suggest a complement (brown rice) to complete the essential amino acid profile. — *`AminoAcids.tsx` matchmaker section.*
- [x] **Dietary tagging overlays on all food lists.** Visual badges — [V] Vegan, [GF] Gluten-Free, [K] Keto, nut-free, dairy-free — for skimmability. Add matching filters. — *`DietaryTagBadge` + filter on `NutrientDetail`.*
- [x] **Special-population guidance** — pregnancy, seniors, athletes, vegan, and conditions (diabetes, hypertension, kidney). — *`/special-populations`.*
- [x] **Site search**, including reverse lookup ("what foods are high in X?"). — *`SiteSearch.tsx` (Cmd/Ctrl+K).*

---

## P3 — Platform & Reach

- [x] **Multi-language toggle (Korean `ko`)** for UI and labels, given the Brunch/Korean audience. — *`src/lib/i18n.ts` + locale toggle; nav/hero/analyzer partially translated; analyzer disclaimers/tabs still mostly English.*
- [x] **PWA / offline support.** Make the analyzer work in grocery stores with poor signal; cache the nutrient DB locally. — *`manifest.webmanifest`, `public/sw.js`, SW register in `main.tsx` (prod).*

---

## Quick Wins — shippable this week (`$0`, low effort)

All eight shipped except grade-scale legend on the live gauge (see P1 Trust).

1. [x] Fix the protein `0g` validation bug + mandatory OCR confirmation.
2. [x] Rename "calorie density" → "fat ratio."
3. [x] Add the amber zone (40–60) to the score gauge.
4. [x] Add Atwater calorie-reconciliation check (catches bad scans automatically).
5. [x] Surface the top recommendation inline on the result card.
6. [x] Add 3 clickable sample labels to `/analyzer`. *(5 samples; badge icons, not photos.)*
7. [x] Add the dietary-profile toggle (General / Heart / Keto / High Protein).
8. [x] Add the OCR-accuracy disclaimer + medical disclaimer.

---

### Strategic note
The encyclopedia competes with Google, Wikipedia, and ChatGPT — all free. The **analyzer + personalization** is the defensible value: *"tell me what to do with this food, for my body, toward my goal."* Lead with that; treat the reference pages as the supporting library. Most of the highest-impact fixes (parser hardening, Atwater guardrails, image preprocessing) are `$0` and client-side — credibility before features.

### Remaining analyzer polish (short list)
- Profile-aware %DV on analyzer cards.
- Per-100g vs per-serving toggle; OCR ingredient list for processing tag.
- Output preview (GIF/screenshot); full Korean strings on analyzer surface.
