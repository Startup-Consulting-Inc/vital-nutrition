# VITAL — AI-Powered Nutrition Intelligence

A privacy-first web app that turns a packaged **Nutrition Facts** label into an actionable **Health Index** with AI-powered analysis, smart recommendations, and personalized alternatives. Upload a photo, get AI-extracted nutrition data, pick a dietary profile, and receive a transparent score with intelligent, category-specific recommendations.

**Live:** [https://nutrition-help.web.app](https://nutrition-help.web.app)

---

## What it does

1. **Scan a barcode** — Instantly fetch nutrition data from 3M+ products via Open Food Facts
2. **Scan** a nutrition label photo — AI (Kimi K2.6 via OpenRouter) extracts all nutrition facts automatically
3. **Confirm** auto-read values before scoring (AI + OCR fallback for accuracy)
4. **Score** with category-aware rules (beverages, snacks, protein, etc. use different baselines and weights)
5. **Get AI-powered recommendations** — smart alternatives and actionable tips based on your nutrition profile
6. **Save, share, and compare** — Build a shopping shortlist, share analyses, and compare side-by-side
7. **Read evidence-based articles** — Bilingual blog series on carbohydrates, fiber, sugar, protein, vitamins, minerals, fats, and dopamine & nutrition

---

## Features

### AI Food Label Analyzer (`/analyzer`)

- **Barcode scanning** — Scan product barcodes to auto-fill nutrition data from Open Food Facts (3M+ products, offline cache)
- **AI-first label scanning** — Multimodal AI reads nutrition labels from photos, extracts structured data (food name, category, all macros/micros)
- **OCR fallback** — Tesseract.js kicks in if AI confidence is low or unavailable
- **Smart food inference** — AI guesses food name and category from nutrition profile when label text is unclear
- **Client-side preprocessing** — Image upscaling, grayscale, contrast enhancement before analysis
- **Mandatory confirmation gate** — Users verify AI/OCR values before scoring
- **Category-aware scoring** — Different baselines and weights per food category
- **Traffic light verdicts** — `Go` / `Pause` / `Avoid` alongside the 0-100 score for instant scannability
- **Narrative explanations** — Auto-generated plain-language summary of why the score is what it is
- **Inline citations** — WHO, AHA, NIH, and US Dietary Guidelines sources visible on every nutrient and recommendation
- **Dietary profiles:** General · Heart Health · Keto · High Protein · Low Sodium · Diabetic (persisted across sessions)
- **Health goals** — One-time setup for blood sugar, heart health, weight, allergies, etc. with goal-aware nutrient highlighting
- **Serving multiplier** (¼×–4×)
- **AI-powered smart recommendations** — Contextual alternatives and tips based on full nutrition profile
- **Save for Later** — Heart button saves products to a persistent comparison list
- **Share** — One-tap shareable summary (Web Share API or clipboard)
- **Add result to Meal Log**

### AI Nutrition Chat (`/chat`)

- **Bilingual Conversations** — Ask any nutrition question in English or Korean
- **Evidence-Based Grounding** — Grounded in WHO, NIH, Harvard, AHA, Mayo Clinic research
- **Multi-Session Chat History** — Start multiple chats, rename sessions, delete conversations, and switch sessions in a responsive sidebar.
- **Message Interactive Actions** — Copy message text, upvote/downvote feedback (persisted), share natively (or fallback copy), and retry (regenerate) from user prompt.
- **Natural AI Speech Synthesis** — Listen to responses read aloud in premium, online neural voices.
- **Direct Source Links** — View references as clean inline links (Learn More) and access dedicated detail drawers to visit official websites.
- **Persistence** — All sessions and states are saved in `localStorage` across site refreshes.

### Blog (`/blog`)

Educational article series in **English and Korean**, written for general readers (plain language, NIH/WHO/AHA-sourced numbers, links into the [nutrient encyclopedia](/nutrients)). **62 articles** across eight series (hub + spoke format, 6–8 episodes each).

**Series order in the UI:** carbohydrates → fiber → sugar → protein → vitamins → minerals → fats → dopamine.

| Series | Episodes | Topics |
|--------|----------|--------|
| **Carbohydrates & Everyday Meals** | 8 | Brain fuel, daily grams, fiber intro, added sugar, whole vs refined grains, blood-sugar pairing, US/Korean plates, low-carb myths |
| **Fiber & Gut Health** | 8 | Soluble vs insoluble, daily grams, microbiome, cholesterol & glucose, US/Korean plates, supplements & labels, keto/low-carb, myths & FAQ |
| **Sugar & Sweetness** | 8 | Why we crave sugar, health impacts, fruit vs added sugar, artificial sweeteners, zero-sugar labels, healthy approach, US/Korean drinks |
| **Protein & Everyday Meals** | 8 | Protein roles, daily grams, amino acids, animal vs plant, US/Korean plates, timing myths, labels, special cases |
| **Vitamins & Daily Life** | 8 | Vitamins 101, how they work in the body, B vitamins, C & D, fat-soluble A/E/K, Korean plate, supplements & labels |
| **Minerals & Everyday Meals** | 8 | Macro vs trace minerals, iron, calcium & magnesium, sodium & potassium, zinc/iodine/selenium, absorption, US/Korean plates, supplements & labs |
| **Fats & Everyday Meals** | 8 | Fat types, omega-3, saturated & trans fats, cooking oils, fat-soluble vitamins, US/Korean plates, myths & special cases |
| **Dopamine & Nutrition** | 6 | What dopamine does, synthesis pathway, supporting nutrients & foods, stimulants, lifestyle, “dopamine detox” myths |

**Locale-specific articles** (same slug, different body by language): everyday plates — `carbohydrates-everyday-plate`, `fiber-everyday-plate`, `protein-everyday-plate`, `minerals-everyday-plate`, `fats-everyday-plate` (en US / ko Korean meals); drinks — `sugar-everyday-drinks` (en US / ko Korean beverages).

**Blog UX**

- **Two-column layout** on `/blog` — left: collapsible series index (collapsed by default); right: article body
- **Deep links** — `/blog?article={slug}` opens the split view with that article selected
- **Standalone URLs** — `/blog/{slug}` still works for sharing and SEO (full-page article view)
- **Rich content blocks** — flow diagrams, tables, callouts, and stat highlights in articles
- **Site search** (⌘/Ctrl+K) indexes all series and episodes

### Nutrient Encyclopedia (`/nutrients`)

- Six essential nutrients with deep dives
- Personalized daily targets based on your profile (age, weight, activity)
- Best food sources with ratings
- Practical tips and deficiency warnings

### Supporting Tools

| Route | Description |
|-------|-------------|
| `/` | Home — value prop and feature teasers |
| `/analyzer` | AI label analyzer with barcode scanning, scoring, and recommendations |
| `/nutrients` | Six essential nutrients overview |
| `/nutrients/:slug` | Deep dives (carbs, protein, fats, vitamins, minerals, water) |
| `/compare` | Side-by-side food comparison with diff highlighting |
| `/saved` | Saved-for-later comparison list with multi-select diff |
| `/methodology` | Full penalty/credit tables with sources |
| `/research` | Evidence-based guidelines and citations (12 research topics) |
| `/special-populations` | Pregnancy, seniors, athletes, vegan, diabetes, etc. |
| `/chat` | AI nutrition Q&A assistant |
| `/blog` | Article hub — collapsible series index + in-page reader |
| `/blog/:slug` | Single article (shareable URL) |
| `/blog?article=:slug` | Same article in the two-column hub |
| `/amino-acids` | Essential amino acids reference |
| `/log` | Daily meal log (secondary feature, accessible from analyzer) |

### Platform

- **User Authentication** — Anonymous auth by default, optional Email/Google sign-in via Firebase Auth
- **Cloud Sync** — Profile and meal log sync to Firestore when signed in
- **Profile** (navbar): age, weight, height, activity, gender, life stage → personalized daily targets
- **Site search** (⌘/Ctrl+K): pages, nutrients, foods, and all blog articles (series-aware)
- **EN / KO** bilingual support
- **PWA** — `manifest.webmanifest` + service worker for offline shell

---

## Architecture

### Frontend (Vite + React)

```
Browser (Vite App)
  ├── AI Label Scan → Cloud Function or Direct OpenRouter
  ├── AI Chat → Cloud Function or Direct OpenRouter
  ├── Smart Recommendations → Cloud Function (always)
  ├── Auth → Firebase Auth (anonymous + email/google)
  └── Data → Firestore (when signed in) / localStorage (fallback)
```

### Backend (Firebase)

| Service | Purpose |
|---------|---------|
| **Firebase Hosting** | Static site hosting + SPA routing |
| **Firebase Auth** | Anonymous + Email/Password + Google sign-in |
| **Cloud Firestore** | User profiles + meal logs (user-isolated) |
| **Cloud Functions** | Secure AI API proxy + smart recommendations |
| **Secret Manager** | OpenRouter API key + model selection |

### Cloud Functions

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `analyzeLabel` | `POST /analyzeLabel` | AI nutrition label extraction |
| `chat` | `POST /chat` | AI nutrition Q&A |
| `smartRecommendations` | `POST /smartRecommendations` | AI-powered recommendations + alternatives |

---

## Privacy & Security

- **No secrets in frontend** — API keys stored in Google Secret Manager, accessed only by Cloud Functions
- **Images processed securely** — In production, label photos are sent to Cloud Functions (not stored)
- **Data isolation** — Firestore security rules ensure users can only read/write their own data
- **Local-first** — Anonymous users keep all data in browser localStorage
- **Educational tool** — Not medical advice. Consult a healthcare provider for medical conditions.

---

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 7](https://vite.dev/)
- [React Router](https://reactrouter.com/) · [Tailwind CSS](https://tailwindcss.com/) · [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/) — Auth, Firestore, Hosting, Cloud Functions
- [OpenRouter](https://openrouter.ai/) — AI model access (Kimi K2.6, configurable)
- [Open Food Facts](https://world.openfoodfacts.org/) — Barcode product database
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) — Barcode scanner
- [Tesseract.js](https://tesseract.projectnaptha.com/) — OCR fallback
- [GSAP](https://greensock.com/gsap/) — Animations

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- OpenRouter API key (for development mode)

### Installation

```bash
npm install
```

### Environment Variables

Create `.env` in the project root:

```bash
# Development mode — direct OpenRouter calls
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
VITE_OPENROUTER_MODEL=moonshotai/kimi-k2.6

# Optional: switch to Cloud Functions (production mode)
# VITE_USE_CLOUD_FUNCTIONS=true
```

See `.env.example` for all options and model choices.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |
| `npm run deploy` | Build and deploy to Firebase Hosting |

### Firebase Setup (for production features)

1. **Enable Authentication providers** in Firebase Console:
   - Email/Password
   - Google

2. **Enable Firestore** and deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Store secrets in Secret Manager:**
   ```bash
   echo -n "sk-or-v1-your-key" | gcloud secrets create openrouter-api-key --data-file=- --project=nutrition-help
   echo -n "moonshotai/kimi-k2.6" | gcloud secrets create openrouter-model --data-file=- --project=nutrition-help
   ```

4. **Grant function access to secrets:**
   ```bash
   gcloud secrets add-iam-policy-binding openrouter-api-key \
     --project=nutrition-help \
     --member="serviceAccount:YOUR-PROJECT-NUMBER-compute@developer.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

5. **Deploy Cloud Functions:**
   ```bash
   cd functions
   npm run build
   firebase deploy --only functions
   ```

6. **Deploy frontend:**
   ```bash
   echo "VITE_USE_CLOUD_FUNCTIONS=true" > .env.production
   npm run build
   firebase deploy --only hosting
   ```

---

## Project Structure

```
├── src/
│   ├── sections/        # Large page sections (Hero, LabelAnalyzer, Research, …)
│   ├── components/      # Shared UI (Navbar, BlogArticleBody, BlogArticlePanel, …)
│   ├── pages/           # Routes including Blog, BlogArticle
│   ├── lib/
│   │   ├── apiClient.ts         # Unified API client (dev ↔ production)
│   │   ├── nutritionAnalyzer.ts # Health Index scoring engine
│   │   ├── ocrParser.ts         # Label OCR + Atwater checks
│   │   ├── openrouter.ts        # AI analysis wrapper
│   │   ├── openFoodFacts.ts     # Barcode lookup + offline cache
│   │   ├── chatService.ts       # AI chat service
│   │   ├── firebase.ts          # Firebase initialization
│   │   ├── firestore.ts         # Firestore CRUD operations
│   │   ├── foodCatalog.ts       # Compare / search food data
│   │   ├── mealLog.ts           # Daily log (localStorage + Firestore sync)
│   │   ├── savedList.ts         # Saved analyses (localStorage)
│   │   └── i18n.ts              # EN/KO strings
│   ├── hooks/           # useAuth, useUserProfile, usePersistentProfile, useHealthGoals
│   └── data/
│       ├── blog/              # Blog series content (carbohydrate, fiber, sugar, protein, vitamin, mineral, fat, dopamine articles)
│       ├── blogArticles.ts    # Types, series metadata, helpers
│       └── nutrientDetails.ts # Nutrient encyclopedia content
├── functions/           # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts     # analyzeLabel, chat, smartRecommendations
│   └── package.json
├── scripts/
│   └── regression.mts   # Scoring + OCR regression tests
├── public/
│   ├── sitemap.xml      # Includes blog article URLs
│   ├── sw.js            # Service worker
│   └── manifest.webmanifest
├── firebase.json        # Hosting + Firestore + Functions config
├── firestore.rules      # Security rules
└── .env.example         # Environment variable template
```

---

## Scoring Engine

- **Baselines** vary by category (whole food **65**, beverage **60**, default packaged **50**)
- **Credits and penalties** for trans fat, added sugar, sodium, saturated fat, fiber, protein, etc.
- **Profile re-weighting** for Heart / Keto / Diabetic / High Protein / Low Sodium goals
- **AI-enhanced recommendations** — After rule-based scoring, AI analyzes the full nutrition profile to generate contextual alternatives and actionable tips

See [`/methodology`](https://nutrition-help.web.app/methodology) for the full rule set.

---

## AI Search Optimization (AEO / GEO)

VITAL is optimized for AI-powered search engines and LLM citation:

| Optimization | Implementation |
|--------------|----------------|
| **Schema.org** | `Article`, `HowTo`, `FAQPage`, `BreadcrumbList`, `ItemList`, `Food`, `NutritionInformation`, `WebApplication`, `CollectionPage` on every route |
| **robots.txt** | Explicitly allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended, and all major AI crawlers |
| **llms.txt** | Machine-readable site summary with FAQs, citations, and source links for LLM consumption |
| **FAQ blocks** | Every nutrient page (`/nutrients/:slug`) includes visible FAQs + `FAQPage` JSON-LD |
| **Freshness signals** | `dateModified` in Article schema + visible "Last updated" on all content pages |
| **Breadcrumbs** | `BreadcrumbList` schema on every route |
| **HowTo** | Step-by-step `HowTo` schema on `/analyzer` and `/methodology` |
| **Canonical + hreflang** | Canonical URLs + `en` / `ko` alternate links on every page |

See [`AI_SEO_AUDIT.md`](AI_SEO_AUDIT.md) for the full audit and action items.

---

## Deployment

Configured for Firebase project `nutrition-help`:

```bash
# Deploy everything
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
```

Requires Firebase CLI and project access.

---

## Security Notes

- **Never commit `.env` files** — They are listed in `.gitignore`
- **API keys live in Secret Manager only** — No hardcoded keys in source
- **Firestore rules enforce user isolation** — Users can only access their own data
- **CORS restricted** — Cloud Functions only accept requests from allowed origins

---

## Documentation

- Product/engineering backlog: `docs/VITAL_master_action_items.md` (local; `docs/` is gitignored)
- Blog editorial plans (local): `docs/carbohydrate_series.md`, `docs/fiber_series.md`, `docs/sugar_series.md`, `docs/protein_series.md`, `docs/vitamin_series.md`, `docs/mineral_series.md`, `docs/fat_series.md`, `docs/dopamine_series.md`

## License

Private project (`package.json` → `"private": true`). All rights reserved unless otherwise specified.
