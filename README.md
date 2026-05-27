# VITAL — AI-Powered Nutrition Intelligence

A privacy-first web app that turns a packaged **Nutrition Facts** label into an actionable **Health Index** with AI-powered analysis, smart recommendations, and personalized alternatives. Upload a photo, get AI-extracted nutrition data, pick a dietary profile, and receive a transparent score with intelligent, category-specific recommendations.

**Live:** [https://nutrition-help.web.app](https://nutrition-help.web.app)

---

## What it does

1. **Scan** a nutrition label photo — AI (Kimi K2.6 via OpenRouter) extracts all nutrition facts automatically
2. **Confirm** auto-read values before scoring (AI + OCR fallback for accuracy)
3. **Score** with category-aware rules (beverages, snacks, protein, etc. use different baselines and weights)
4. **Get AI-powered recommendations** — smart alternatives and actionable tips based on your nutrition profile
5. **Compare** foods, log meals, chat with an AI nutrition assistant, and explore evidence-based nutrient encyclopedia content

---

## Features

### AI Food Label Analyzer (`/analyzer`)

- **AI-first label scanning** — Multimodal AI reads nutrition labels from photos, extracts structured data (food name, category, all macros/micros)
- **OCR fallback** — Tesseract.js kicks in if AI confidence is low or unavailable
- **Smart food inference** — AI guesses food name and category from nutrition profile when label text is unclear
- **Client-side preprocessing** — Image upscaling, grayscale, contrast enhancement before analysis
- **Mandatory confirmation gate** — Users verify AI/OCR values before scoring
- **Category-aware scoring** — Different baselines and weights per food category
- **Dietary profiles:** General · Heart Health · Keto · High Protein · Low Sodium · Diabetic
- **Serving multiplier** (¼×–4×)
- **AI-powered smart recommendations** — Contextual alternatives and tips based on full nutrition profile
- **Add result to Meal Log**

### AI Nutrition Chat (`/chat`)

- Ask any nutrition question in English or Korean
- Evidence-based answers grounded in WHO, NIH, Harvard, AHA, Mayo Clinic research
- Rate-limited to prevent abuse
- Conversation history stored locally

### Nutrient Encyclopedia (`/nutrients`)

- Six essential nutrients with deep dives
- Personalized daily targets based on your profile (age, weight, activity)
- Best food sources with ratings
- Practical tips and deficiency warnings

### Supporting Tools

| Route | Description |
|-------|-------------|
| `/` | Home — value prop and feature teasers |
| `/nutrients` | Six essential nutrients overview |
| `/nutrients/:slug` | Deep dives (carbs, protein, fats, vitamins, minerals, water) |
| `/amino-acids` | Essential amino acids + BCAA calculator + complete-protein matchmaker |
| `/compare` | Side-by-side food comparison with diff highlighting |
| `/log` | Daily meal log with aggregated grade and totals |
| `/methodology` | Full penalty/credit tables with sources |
| `/research` | Evidence-based guidelines and citations (12 research topics) |
| `/special-populations` | Pregnancy, seniors, athletes, vegan, diabetes, etc. |
| `/chat` | AI nutrition Q&A assistant |

### Platform

- **User Authentication** — Anonymous auth by default, optional Email/Google sign-in via Firebase Auth
- **Cloud Sync** — Profile and meal log sync to Firestore when signed in
- **Profile** (navbar): age, weight, height, activity, gender, life stage → personalized daily targets
- **Site search** (⌘/Ctrl+K): pages, nutrients, foods
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
│   ├── pages/           # Route-level screens
│   ├── sections/        # Large page sections (Hero, LabelAnalyzer, Research, …)
│   ├── components/      # Shared UI (Navbar, HealthScoreGauge, AuthModal, …)
│   ├── lib/
│   │   ├── apiClient.ts         # Unified API client (dev ↔ production)
│   │   ├── nutritionAnalyzer.ts # Health Index scoring engine
│   │   ├── ocrParser.ts         # Label OCR + Atwater checks
│   │   ├── openrouter.ts        # AI analysis wrapper
│   │   ├── chatService.ts       # AI chat service
│   │   ├── firebase.ts          # Firebase initialization
│   │   ├── firestore.ts         # Firestore CRUD operations
│   │   ├── foodCatalog.ts       # Compare / search food data
│   │   ├── mealLog.ts           # Daily log (localStorage + Firestore sync)
│   │   └── i18n.ts              # EN/KO strings
│   ├── hooks/           # useAuth, useUserProfile
│   └── data/            # Nutrient encyclopedia content
├── functions/           # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts     # analyzeLabel, chat, smartRecommendations
│   └── package.json
├── scripts/
│   └── regression.mts   # Scoring + OCR regression tests
├── docs/
│   └── VITAL_master_action_items.md
├── public/
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

- [docs/VITAL_master_action_items.md](docs/VITAL_master_action_items.md) — Product/engineering backlog

## License

Private project (`package.json` → `"private": true`). All rights reserved unless otherwise specified.
