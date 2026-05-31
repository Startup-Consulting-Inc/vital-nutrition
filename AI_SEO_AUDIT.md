# AI SEO Audit — VITAL Nutrition Intelligence
**Date:** 2026-05-30  
**Site:** https://vital.nutrition  
**Auditor:** Kimi (ai-seo skill)  

---

## Executive Summary

| Pillar | Score | Verdict |
|--------|:-----:|---------|
| **Structure** (extractability) | 6/10 | Good schema + tables, but missing FAQ blocks, definition-first pattern, and HowTo on key pages |
| **Authority** (citation-worthiness) | 6/10 | Strong research citations, but no author attribution, no dates on content, no expert bios |
| **Presence** (third-party / robots) | 9/10 | Excellent robots.txt, llms.txt is a major asset; weak third-party presence |
| **Overall AI Readiness** | **7/10** | Solid foundation with high-impact gaps to close |

**Highest-impact fixes (do these first):**
1. Add `HowTo` schema to `/analyzer`
2. Add "Last updated" + author bio to `/research` and nutrient pages
3. Add inline FAQ blocks to `/nutrients/*` and `/compare`
4. Add `Product` + `Review` schema to the app
5. Promote `llms.txt` in `robots.txt` and site footer

---

## 1. AI Bot Access — PASS ✅

**`public/robots.txt`**

| Bot | Status |
|-----|--------|
| GPTBot | ✅ Allowed |
| ChatGPT-User | ✅ Allowed |
| PerplexityBot | ✅ Allowed |
| ClaudeBot | ✅ Allowed |
| anthropic-ai | ✅ Allowed |
| Google-Extended | ✅ Allowed |
| Applebot-Extended | ✅ Allowed |
| CCBot | ✅ Allowed |

**Verdict:** Perfect. Every major AI crawler is explicitly allowed. This is better than 90% of sites.

**One tweak:** Add a link to `llms.txt` in `robots.txt` so crawlers that support it (GPTBot, PerplexityBot) can discover the machine-readable summary immediately.

```
# AI-readable site summary
# See https://vital.nutrition/llms.txt
```

---

## 2. Schema Markup — PARTIAL ✅/⚠️

### What you have (good)

| Page | Schema | Notes |
|------|--------|-------|
| All pages | `WebSite`, `Organization` | Baseline on every route — excellent |
| `/` | `WebApplication` | Good for tool discovery |
| `/nutrients` | `CollectionPage` | Good for indexing child pages |
| `/nutrients/:slug` | `Article`, `ItemList`, `Food`, `NutritionInformation` | Strong for food/nutrition queries |
| `/methodology` | `FAQPage`, `HowTo` | Best-in-class for this page |
| `/research` | `Article` | Basic but present |

### What's missing (high impact)

| Missing Schema | Where It Belongs | Why It Matters |
|----------------|------------------|----------------|
| `HowTo` | `/analyzer` | The analyzer is a step-by-step process. AI assistants answer "How do I scan a nutrition label?" constantly. |
| `Product` | `/analyzer`, `/compare`, `/log` | Tells AI this is a usable tool, not just content. Enables price=0 and featureList extraction. |
| `Review` / `AggregateRating` | Home or `/analyzer` | Trust signal. Even a self-assessment or user testimonial structured as Review helps. |
| `FAQPage` | `/nutrients/*`, `/compare`, `/research` | Nutrient pages get "What is X?" / "How much X per day?" queries. FAQ schema captures these directly. |
| `BreadcrumbList` | All pages | Helps AI understand site hierarchy. |

### Quick wins

**A. Add HowTo to `/analyzer`**
The analyzer has 4 clear steps: capture → confirm OCR → pick profile → score. Wrap these in `HowTo` schema exactly like you did on `/methodology`.

**B. Add FAQPage to each `/nutrients/:slug`**
Every nutrient page should have a small FAQ block at the bottom with 3–4 questions:
- "What is [nutrient]?"
- "How much [nutrient] do I need per day?"
- "What foods are highest in [nutrient]?"
- "What happens if I don't get enough [nutrient]?"

Map these to `FAQPage` JSON-LD.

**C. Add BreadcrumbList to all routes**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Nutrients", "item": "https://vital.nutrition/nutrients" },
    { "@type": "ListItem", "position": 2, "name": "Proteins", "item": "https://vital.nutrition/nutrients/proteins" }
  ]
}
```

---

## 3. Content Extractability — MIXED ⚠️

### What's working

| Pattern | Example | AI Citation Potential |
|---------|---------|----------------------|
| Comparison tables | `/compare` diff table | High — AI loves structured comparisons |
| Food source lists | `/nutrients/:slug` ranked food items | High — "Top foods for X" queries |
| Scoring rubric tables | `/methodology` credits/penalties | High — quotable, specific numbers |
| Definition blocks | Nutrient detail "Overview" sections | Medium — good but could be tighter |
| Step-by-step (UI) | Label analyzer workflow | Medium — not yet exposed as text/schema |

### What's missing or weak

**A. No "definition first" on nutrient pages**

Current pattern: icon + name + subtitle → Overview paragraph.

AI-optimized pattern: A 40–60 word self-contained definition in the first paragraph, ideally in a dedicated block.

Example fix for `/nutrients/proteins`:
```
Protein is a macronutrient made of amino acids that builds and repairs 
tissue, produces enzymes and hormones, and supports immune function. 
The WHO recommends 0.83 g per kg of body weight daily for adults, with 
1.0–1.6 g/kg for older adults and active individuals.
```
This one paragraph answers "What is protein?" and "How much protein per day?" — the two most common AI queries.

**B. No FAQ sections on nutrient pages**

The `/methodology` FAQ is excellent. Replicate this pattern on every `/nutrients/:slug` page. Even 3 Q&A pairs in the page body + `FAQPage` JSON-LD would dramatically improve extractability.

**C. No "Last updated" on research/nutrient content**

The only dated content is Terms of Service and Privacy Policy. AI systems weight recency heavily. Add a visible "Last updated: [date]" on:
- `/research`
- `/nutrients/*`
- `/methodology` (already has a note, but make it a structured date)

**D. Statistics are present but not always cited inline**

The research section and compare page cite studies (Brown et al., Sacks et al., etc.), but nutrient detail pages list numbers without source links.

Example: the daily need values on nutrient pages should show a clickable source or at minimum a "Source: [organization] [year]" line.

---

## 4. Authority Signals — WEAK ⚠️

### Citations and statistics

| Content | Has Stats | Has Source Links | Has Dates |
|---------|:---------:|:----------------:|:---------:|
| `/methodology` | ✅ | ✅ | ⚠️ (some) |
| `/compare` | ✅ | ✅ | ✅ |
| `/research` | ✅ | ⚠️ (text only) | ⚠️ (some) |
| `/nutrients/*` | ✅ | ❌ | ❌ |

**The Princeton GEO study found citations boost AI visibility by +40% and statistics by +37%.**

### Missing: Author attribution

- No author names on `/research` articles
- No expert bios
- No "Reviewed by [credential]" lines

**Fix:** Add an author line to `/research` and `/methodology`:
```
Reviewed by VITAL Research Team. Last updated: May 2026.
Sources: WHO, NIH Office of Dietary Supplements, Harvard T.H. Chan School of Public Health.
```
Even a lightweight attribution helps. For maximum impact, add a full author bio with credentials.

### Missing: Freshness signals

- No "Updated [date]" badges on content pages
- No `dateModified` in Article schema (only `headline`, `description`)

**Fix:** Add `datePublished` and `dateModified` to all `Article` schemas. Display the date visibly on the page.

---

## 5. Third-Party Presence — UNKNOWN / WEAK ⚠️

AI systems cite third-party sources 6.5x more often than brand domains.

| Source | VITAL Presence | Action |
|--------|---------------|--------|
| Wikipedia | Unknown | Check if "VITAL Nutrition Intelligence" has a mention. If not, not urgent for a small tool. |
| Reddit | Unknown | Authentic participation in r/nutrition, r/loseit, r/fitness with the tool |
| Review sites (G2, Capterra) | N/A (consumer tool) | Not relevant unless B2B |
| YouTube | Unknown | A 60-second "How to scan a nutrition label" video would get cited heavily |
| Industry roundups | Unknown | Reach out to nutrition bloggers for "best nutrition apps" lists |
| Quora | Unknown | Answer "How do I know if a food is healthy?" with the methodology |

**Immediate action:** Create a short YouTube video demonstrating the label analyzer. Google AI Overviews cite YouTube frequently for how-to queries.

---

## 6. llms.txt — MAJOR ASSET ✅

You have `public/llms.txt` — this is a **huge advantage** that most sites lack.

**What's good:**
- Machine-readable summary of the entire product
- FAQ section with direct answers
- Citation-friendly format with source links
- Core nutrients summary

**What's missing in llms.txt:**
- No `Last updated` timestamp
- No explicit "For more details, see [URL]" cross-links for each nutrient
- No author / organization contact info

**Quick improvements to llms.txt:**
```markdown
## Last updated
2026-05-30

## Contact
- Site: https://vital.nutrition
- Sitemap: https://vital.nutrition/sitemap.xml
```

---

## 7. Monitoring — NOT SET UP ❌

You have no AI visibility tracking.

**DIY monthly check (free):**

| Query | Google AI Overview | ChatGPT | Perplexity |
|-------|:------------------:|:-------:|:----------:|
| "How to analyze a nutrition label" | ? | ? | ? |
| "What is the healthiest food for fiber" | ? | ? | ? |
| "Daily protein requirement" | ? | ? | ? |
| "How much water should I drink a day" | ? | ? | ? |
| "Nutrition label scanner app" | ? | ? | ? |

**Action:** Run these 5 queries today. Record whether VITAL is cited. Re-check monthly.

**Tool option:** If budget allows, `Peec AI` or `ZipTie` can automate this tracking.

---

## Priority Action List

### 🔴 High Impact (do this week)

1. **Add `HowTo` schema to `/analyzer`** — copy the pattern from `/methodology`
2. **Add FAQ blocks + `FAQPage` schema to all `/nutrients/:slug`** — 3–4 questions each
3. **Add `dateModified` to all `Article` schemas** and display "Last updated" on page
4. **Add `BreadcrumbList` schema** to all routes
5. **Promote `llms.txt`** — add reference in `robots.txt` and site footer

### 🟡 Medium Impact (do this month)

6. **Add author attribution** to `/research` and `/methodology`
7. **Add inline source citations** to daily-need values on nutrient pages
8. **Add `Product` schema** to home + analyzer
9. **Create a YouTube video** demonstrating the analyzer (60–90 seconds)
10. **Add "What is X?" definition blocks** as the first paragraph of each nutrient page

### 🟢 Low Impact (nice to have)

11. **Add `Review` / `AggregateRating`** schema
12. **Wikipedia / Quora presence**
13. **Automated AI visibility monitoring** (Peec AI, ZipTie)
14. **Multilingual `llms.txt`** (Korean version)

---

## Appendix: Per-Page Audit Checklist

| Page | Definition First | FAQ | HowTo | Last Updated | Author | Citation Links |
|------|:----------------:|:---:|:-----:|:------------:|:------:|:--------------:|
| `/` | N/A | ❌ | ❌ | ❌ | ❌ | N/A |
| `/analyzer` | N/A | ❌ | ❌ | ❌ | ❌ | N/A |
| `/nutrients` | N/A | ❌ | ❌ | ❌ | ❌ | N/A |
| `/nutrients/*` | ⚠️ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| `/compare` | N/A | ❌ | ❌ | ❌ | ❌ | ✅ |
| `/research` | N/A | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| `/methodology` | N/A | ✅ | ✅ | ⚠️ | ❌ | ✅ |
| `/special-populations` | N/A | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| `/amino-acids` | N/A | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| `/log` | N/A | ❌ | ❌ | ❌ | ❌ | N/A |

---

*End of audit.*
