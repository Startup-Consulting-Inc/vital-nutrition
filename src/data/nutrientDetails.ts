/** Dietary tags surfaced as visual badges across all food lists. */
export type DietaryTag = 'V' | 'VG' | 'GF' | 'K' | 'NF' | 'DF';

export const DIETARY_TAG_META: Record<DietaryTag, { label: string; color: string; long: string }> = {
  V: { label: 'V', color: '#4a7c59', long: 'Vegetarian' },
  VG: { label: 'VG', color: '#2f6244', long: 'Vegan' },
  GF: { label: 'GF', color: '#c9a96e', long: 'Gluten-Free' },
  K: { label: 'K', color: '#d95c39', long: 'Keto-friendly' },
  NF: { label: 'NF', color: '#6b7d76', long: 'Nut-Free' },
  DF: { label: 'DF', color: '#4a90a4', long: 'Dairy-Free' },
};

export interface FoodItem {
  name: string;
  serving: string;
  /** Quantity of THIS nutrient in the serving (always in the page's primary unit). */
  amount: string;
  calories: number;
  keyBenefit: string;
  dailyValue?: string;
  category: 'excellent' | 'good' | 'moderate';
  /** Visual tags ([V] [GF] [K] etc.) shown in food lists. */
  dietaryTags?: DietaryTag[];
}

export interface FatTypeDetail {
  name: string;
  tone: 'good' | 'caution' | 'avoid';
  toneLabel: string;
  oneLiner: string;
  whatItIs: string;
  healthImpact: string;
  recommendedIntake: string;
  recommendedIntakeSource: string;
  topFoods: string[];
  practicalAdvice: string;
}

/** "Eat Most / Limit / Avoid" three-bucket framing applied across nutrients. */
export interface IntakeBucket {
  label: 'Eat Most' | 'Eat Some' | 'Limit' | 'Avoid';
  tone: 'good' | 'neutral' | 'caution' | 'avoid';
  examples: string[];
  why: string;
}

/** Tolerable Upper Intake Level — for the vitamins / minerals safety section. */
export interface UpperLimit {
  nutrient: string;
  ulValue: string;
  source: string;
  symptoms: string;
}

export interface NutrientDetail {
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  icon: string;
  color: string;
  bgLight: string;
  description: string;
  dailyNeed: string;
  dailyNeedSource: string;
  mainFunction: string;
  functions: string[];
  deficiencySigns: string[];
  foodItems: FoodItem[];
  tips: string[];
  warning?: string;
  fatTypes?: FatTypeDetail[];
  /** Generic Eat-Most/Limit/Avoid framing for non-fat macronutrients. */
  intakeBuckets?: IntakeBucket[];
  /** Tolerable upper intake levels (used on Vitamins + Minerals pages). */
  upperLimits?: UpperLimit[];
}

/** Explanatory rubric for the "Best / Good / Moderate" food rating column. */
export const FOOD_RATING_RUBRIC = {
  excellent: {
    label: 'Best',
    description:
      'Highest nutrient density per calorie, strong bioavailability, and few harmful co-nutrients (low added sugar, low saturated/trans fat, low sodium relative to category).',
  },
  good: {
    label: 'Good',
    description:
      'Solid nutrient contribution but slightly lower density per calorie OR contains a co-nutrient worth watching (e.g. natural sugars in fruit, sodium in canned fish).',
  },
  moderate: {
    label: 'Moderate',
    description:
      'Real nutrients, but the calorie or saturated-fat cost is meaningful — appropriate as an occasional rather than daily choice.',
  },
} as const;

export const nutrients: NutrientDetail[] = [
  {
    slug: 'carbohydrates',
    name: 'Carbohydrates',
    shortName: 'Carbs',
    subtitle: 'The Body\'s Primary Fuel Source',
    icon: 'C',
    color: '#c9a96e',
    bgLight: '#c9a96e10',
    description: 'Carbohydrates are the body\'s preferred and most efficient source of energy, particularly for the brain and central nervous system, which rely almost exclusively on glucose. The brain alone consumes approximately 120 grams of glucose per day — about 20% of the body\'s total energy expenditure despite representing only 2% of body weight.',
    dailyNeed: '45-65% of daily calories (approx. 225-325g on a 2,000 cal diet)',
    dailyNeedSource: 'American Heart Association',
    mainFunction: 'Provide glucose for energy production, fuel the brain, support muscle function during exercise, and aid digestion through fiber content.',
    functions: [
      'Primary energy source for brain and red blood cells',
      'Fuels muscles during moderate to high-intensity exercise',
      'Dietary fiber promotes digestive health and regularity',
      'Spares protein from being used as energy',
    ],
    deficiencySigns: [
      'Fatigue, weakness, and poor concentration',
      'Headaches and irritability',
      'Difficulty exercising or performing physical tasks',
    ],
    foodItems: [
      { name: 'Brown Rice', serving: '1 cup cooked', amount: '45g carbs', calories: 216, keyBenefit: '3.5g fiber, rich in B vitamins', dailyValue: '16%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Oatmeal', serving: '1 cup cooked', amount: '27g carbs', calories: 154, keyBenefit: '4g fiber, lowers LDL cholesterol', dailyValue: '10%', category: 'excellent', dietaryTags: ['VG', 'V', 'NF', 'DF'] },
      { name: 'Quinoa', serving: '1 cup cooked', amount: '39g carbs', calories: 222, keyBenefit: '5g fiber, 8g protein, complete amino acid profile', dailyValue: '14%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Sweet Potato', serving: '1 medium (150g)', amount: '26g carbs', calories: 103, keyBenefit: '4g fiber, 438% DV vitamin A (beta-carotene)', dailyValue: '9%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Banana', serving: '1 medium (118g)', amount: '27g carbs', calories: 105, keyBenefit: '422mg potassium, quick energy', dailyValue: '10%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Whole Wheat Bread', serving: '1 slice (38g)', amount: '17g carbs', calories: 92, keyBenefit: '2g fiber, more nutrients than white bread', dailyValue: '6%', category: 'good', dietaryTags: ['VG', 'V', 'NF', 'DF'] },
      { name: 'Black Beans', serving: '1/2 cup cooked', amount: '20g carbs', calories: 114, keyBenefit: '7.5g fiber, 7.6g protein', dailyValue: '7%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Chickpeas', serving: '1/2 cup cooked', amount: '22g carbs', calories: 135, keyBenefit: '6.2g fiber, 7.3g protein', dailyValue: '8%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Apple', serving: '1 medium (182g)', amount: '25g carbs', calories: 95, keyBenefit: '4.4g fiber, polyphenol antioxidants', dailyValue: '9%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Lentils', serving: '1 cup cooked', amount: '40g carbs', calories: 230, keyBenefit: '15.6g fiber, 17.9g protein', dailyValue: '15%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
    ],
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['Whole grains (brown rice, oats, quinoa)', 'Legumes (lentils, beans, chickpeas)', 'Whole fruits', 'Starchy vegetables (sweet potato, squash)'],
        why: 'Complex carbs with fiber feed gut bacteria, slow glucose absorption, and keep you full. Linked to lower CVD and type-2 diabetes risk.',
      },
      {
        label: 'Limit',
        tone: 'caution',
        examples: ['White bread, white rice, refined pasta', 'Crackers and pretzels', 'Fruit juice (vs whole fruit)'],
        why: 'Refined carbs spike blood glucose without the fiber and micronutrients of their whole-grain counterparts.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['Sugar-sweetened beverages (soda, sweetened tea)', 'Pastries, cakes, candy', 'Breakfast cereals with >10g added sugar'],
        why: 'Liquid and added sugars are the strongest dietary driver of metabolic disease. WHO recommends < 10% of daily calories from added sugar — 5% is even better.',
      },
    ],
    tips: [
      'Choose complex carbs (whole grains, legumes) over simple/refined carbs',
      'Pair carbs with protein or fat to slow sugar absorption',
      'Aim for at least half your grains to be whole grains',
      'Fiber-rich carbs keep you full longer and support gut health',
    ],
    warning: 'Limit added sugars to less than 10% of daily calories. Avoid sugary beverages and refined grains like white bread and pastries.',
  },
  {
    slug: 'proteins',
    name: 'Proteins',
    shortName: 'Protein',
    subtitle: 'Building Blocks of Life',
    icon: 'P',
    color: '#374640',
    bgLight: '#37464010',
    description: 'Proteins are often described as the "building blocks of life" because they are essential for the construction, repair, and maintenance of virtually every tissue and structure in the body. Every cell contains protein. The body requires 20 different amino acids — nine of which are "essential" and must come from dietary sources.',
    dailyNeed: '0.8g per kg of body weight (56g for average male, 46g for female)',
    dailyNeedSource: 'National Institute on Aging',
    mainFunction: 'Build and repair tissues, produce enzymes and hormones, support immune function, and serve as transport molecules for oxygen and nutrients.',
    functions: [
      'Builds and repairs muscles, bones, skin, and organs',
      'Produces enzymes that catalyze biochemical reactions',
      'Creates antibodies for immune defense',
      'Transports oxygen (hemoglobin) and nutrients in blood',
    ],
    deficiencySigns: [
      'Muscle wasting and weakness',
      'Slow wound healing',
      'Weakened immune response, frequent infections',
      'Hair loss and brittle nails',
    ],
    foodItems: [
      { name: 'Chicken Breast', serving: '3 oz (85g)', amount: '26g protein', calories: 128, keyBenefit: 'Lean, low fat, rich in B vitamins', dailyValue: '52%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Salmon', serving: '3 oz (85g)', amount: '22g protein', calories: 175, keyBenefit: 'Omega-3 fatty acids, heart healthy', dailyValue: '44%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Eggs', serving: '2 large', amount: '12g protein', calories: 143, keyBenefit: 'Complete protein, all 9 essential amino acids', dailyValue: '24%', category: 'excellent', dietaryTags: ['V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Greek Yogurt (Non-Fat)', serving: '1 cup (227g)', amount: '22g protein', calories: 130, keyBenefit: 'Probiotics for gut health, high calcium', dailyValue: '44%', category: 'excellent', dietaryTags: ['V', 'GF', 'K', 'NF'] },
      { name: 'Lentils', serving: '1 cup cooked', amount: '18g protein', calories: 230, keyBenefit: '15.6g fiber, iron, folate', dailyValue: '36%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Tofu', serving: '1/2 cup (126g)', amount: '10g protein', calories: 88, keyBenefit: 'Plant-based complete protein, calcium', dailyValue: '20%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Black Beans', serving: '1 cup cooked', amount: '15g protein', calories: 227, keyBenefit: '15g fiber, folate, magnesium', dailyValue: '30%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Almonds', serving: '1/4 cup (35g)', amount: '8g protein', calories: 207, keyBenefit: 'Healthy fats, vitamin E, magnesium', dailyValue: '16%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'K', 'DF'] },
      { name: 'Tuna (Canned in Water)', serving: '3 oz (85g)', amount: '20g protein', calories: 109, keyBenefit: 'Omega-3s, selenium, low calorie', dailyValue: '40%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Cottage Cheese (Low-Fat)', serving: '1/2 cup (113g)', amount: '14g protein', calories: 90, keyBenefit: 'Casein protein, slow digesting, calcium', dailyValue: '28%', category: 'excellent', dietaryTags: ['V', 'GF', 'K', 'NF'] },
    ],
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['Fish (especially fatty fish)', 'Skinless poultry', 'Eggs', 'Legumes (beans, lentils, chickpeas)', 'Plain Greek yogurt', 'Tofu and tempeh'],
        why: 'Lean and plant proteins provide all the building-block amino acids without the saturated-fat load of red and processed meats.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['Lean cuts of beef and pork', 'Cheese (in moderation)', 'Whole milk dairy'],
        why: 'Real food, real protein — but the saturated-fat content adds up if these are daily staples instead of occasional choices.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['Processed meats (sausage, bacon, hot dogs, deli meats)', 'Fried protein items'],
        why: 'WHO classifies processed meats as Group 1 carcinogens; regular consumption raises colorectal cancer risk and adds significant sodium and saturated fat.',
      },
    ],
    tips: [
      'Include both animal and plant protein sources for variety',
      'Aim for at least 2 servings of fish per week for omega-3s',
      'Plant proteins (beans, lentils) also provide fiber',
      'Space protein intake throughout the day for better absorption',
    ],
    warning: 'Very high protein diets (over 2g/kg body weight) may strain kidneys in susceptible individuals. Choose lean sources to limit saturated fat.',
  },
  {
    slug: 'fats',
    name: 'Fats',
    shortName: 'Fats',
    subtitle: 'Essential for Health and Energy Storage',
    icon: 'F',
    color: '#d95c39',
    bgLight: '#d95c3910',
    description: 'Dietary fats are essential for human health and serve numerous critical functions. Fats are the most energy-dense macronutrient at 9 calories per gram. The type of fat consumed is far more important than the total amount. Unsaturated fats (monounsaturated and polyunsaturated) are beneficial, while trans fats should be avoided completely and saturated fats limited.',
    dailyNeed: '20-35% of daily calories (44-78g on a 2,000 cal diet)',
    dailyNeedSource: 'American Heart Association',
    mainFunction: 'Provide concentrated energy, enable vitamin absorption (A, D, E, K), form cell membranes, and produce essential hormones.',
    functions: [
      'Most concentrated energy source — 9 calories per gram',
      'Essential for absorption of fat-soluble vitamins (A, D, E, K)',
      'Forms cell membranes and supports brain structure',
      'Produces hormones and signaling molecules',
    ],
    deficiencySigns: [
      'Dry skin and hair',
      'Hormone imbalances',
      'Poor absorption of vitamins A, D, E, K',
      'Difficulty maintaining body temperature',
    ],
    foodItems: [
      { name: 'Avocado', serving: '1/2 medium (75g)', amount: '11g fat', calories: 120, keyBenefit: '10g monounsaturated, fiber, potassium', dailyValue: '14%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Olive Oil', serving: '1 tbsp (14g)', amount: '14g fat', calories: 119, keyBenefit: '73% monounsaturated, anti-inflammatory', dailyValue: '18%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Salmon', serving: '3 oz (85g)', amount: '11g fat', calories: 175, keyBenefit: '4g omega-3s EPA/DHA, heart protective', dailyValue: '14%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Walnuts', serving: '1/4 cup (30g)', amount: '20g fat', calories: 196, keyBenefit: '2.5g omega-3 ALA, antioxidants', dailyValue: '26%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'DF'] },
      { name: 'Chia Seeds', serving: '2 tbsp (28g)', amount: '9g fat', calories: 138, keyBenefit: '5g omega-3 ALA, 10g fiber', dailyValue: '12%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Almonds', serving: '1/4 cup (35g)', amount: '18g fat', calories: 207, keyBenefit: '11g monounsaturated, vitamin E', dailyValue: '23%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'DF'] },
      { name: 'Flaxseeds', serving: '2 tbsp (14g)', amount: '6g fat', calories: 75, keyBenefit: '3.8g omega-3 ALA, lignans', dailyValue: '8%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Dark Chocolate (70%)', serving: '1 oz (28g)', amount: '15g fat', calories: 170, keyBenefit: '9g saturated, flavonoid antioxidants', dailyValue: '19%', category: 'moderate', dietaryTags: ['V', 'GF', 'NF'] },
      { name: 'Peanut Butter (Natural)', serving: '2 tbsp (32g)', amount: '16g fat', calories: 190, keyBenefit: '8g monounsaturated, 7g protein', dailyValue: '21%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'K', 'DF'] },
      { name: 'Sardines (Canned)', serving: '3 oz (85g)', amount: '11g fat', calories: 177, keyBenefit: '1.5g omega-3s, calcium, vitamin D', dailyValue: '14%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
    ],
    tips: [
      'Use olive oil as your primary cooking fat',
      'Eat fatty fish (salmon, sardines, mackerel) at least twice a week',
      'Add a handful of nuts or seeds to meals daily',
      'Read labels — avoid products with "partially hydrogenated oils"',
    ],
    warning: 'Trans fats should be avoided completely — they raise LDL (bad) cholesterol AND lower HDL (good) cholesterol. Limit saturated fat to less than 6% of calories.',
    fatTypes: [
      {
        name: 'Unsaturated Fat',
        tone: 'good',
        toneLabel: 'Eat Most',
        oneLiner: 'The heart-protective fats found in plants, nuts, seeds, and fatty fish.',
        whatItIs:
          'Unsaturated fats have one or more double bonds in their fatty acid chains, which keeps them liquid at room temperature. They include monounsaturated fats (MUFA) such as oleic acid in olive oil, and polyunsaturated fats (PUFA) such as omega-3 (ALA, EPA, DHA) and omega-6 (linoleic acid). Omega-3 and omega-6 are essential — your body cannot make them, so they must come from food.',
        healthImpact:
          'Replacing saturated fat with unsaturated fat lowers LDL ("bad") cholesterol and is linked to a lower risk of cardiovascular disease, stroke, and type 2 diabetes. Omega-3s from fatty fish (EPA and DHA) support brain function, vision, and help reduce inflammation. Diets high in unsaturated fats — like the Mediterranean diet — are consistently associated with longer, healthier lives.',
        recommendedIntake:
          'Make unsaturated fats the majority of your daily fat intake — roughly 15–30% of calories. Aim for about 2 servings of fatty fish per week (≥ 250 mg combined EPA + DHA per day). Plant omega-3s (chia, flax, walnuts) should be eaten daily.',
        recommendedIntakeSource: 'American Heart Association; Dietary Guidelines for Americans',
        topFoods: [
          'Olive oil',
          'Avocado',
          'Almonds',
          'Walnuts',
          'Salmon',
          'Sardines',
          'Chia seeds',
          'Flaxseeds',
          'Peanut butter (natural)',
          'Sunflower seeds',
        ],
        practicalAdvice:
          'Swap butter for extra-virgin olive oil. Replace red meat with salmon or sardines at least twice a week. Sprinkle ground flax or chia on yogurt and oats for daily plant omega-3s.',
      },
      {
        name: 'Saturated Fat',
        tone: 'caution',
        toneLabel: 'Limit',
        oneLiner: 'Solid at room temperature — fine in moderation, harmful in excess.',
        whatItIs:
          'Saturated fats have no double bonds in their fatty acid chains, so they pack tightly together and are solid at room temperature. They occur naturally in animal foods (red meat, butter, cheese, cream) and in a few tropical oils (coconut, palm, palm kernel).',
        healthImpact:
          'Diets high in saturated fat raise LDL ("bad") cholesterol, which is linked to higher risk of heart disease and stroke. The strongest health benefit comes from replacing saturated fat with unsaturated fat — not with refined carbohydrates or sugar, which can be just as harmful.',
        recommendedIntake:
          'Keep saturated fat under 10% of daily calories (~22 g on a 2,000-calorie diet). The American Heart Association recommends an even tighter limit of under 6% (~13 g) if you have high cholesterol or heart disease risk.',
        recommendedIntakeSource: 'American Heart Association; USDA Dietary Guidelines',
        topFoods: [
          'Fatty cuts of beef and pork',
          'Butter',
          'Cheese',
          'Heavy cream',
          'Lard',
          'Coconut oil',
          'Palm oil',
          'Processed meats (sausage, bacon)',
          'Whole milk',
          'Cream-based sauces',
        ],
        practicalAdvice:
          'Choose lean cuts of meat and trim visible fat. Treat butter and cheese as flavor accents, not staples. Use plant-based oils (olive, canola, avocado) for cooking. Read labels for "saturated fat" totals when buying packaged snacks and baked goods.',
      },
      {
        name: 'Trans Fat',
        tone: 'avoid',
        toneLabel: 'Avoid',
        oneLiner: 'The most harmful fat — no safe level of consumption.',
        whatItIs:
          'Industrial trans fats are created by partially hydrogenating vegetable oils to make them solid, shelf-stable, and cheap. Tiny amounts also occur naturally in beef and dairy. The FDA banned partially hydrogenated oils in U.S. foods in 2018, but trans fats still appear in some imported, fried, and packaged baked goods.',
        healthImpact:
          'Trans fats raise LDL ("bad") cholesterol AND lower HDL ("good") cholesterol — a uniquely damaging combination not seen in any other fat. The World Health Organization estimates that eliminating industrially produced trans fats globally could prevent more than 500,000 deaths from coronary heart disease each year.',
        recommendedIntake:
          'As close to zero as possible — under 1% of daily calories (under ~2 g). Both the WHO and the AHA recommend eliminating industrial trans fat completely.',
        recommendedIntakeSource: 'World Health Organization; American Heart Association',
        topFoods: [
          'Some commercial fried foods (donuts, fries)',
          'Microwave popcorn (some brands)',
          'Packaged baked goods (cookies, pies, biscuits)',
          'Non-dairy creamers',
          'Stick margarine and shortening',
          'Frozen pizza with shortening',
          'Refrigerated dough products',
          'Some imported snack foods',
        ],
        practicalAdvice:
          'Read the ingredient list — avoid anything containing "partially hydrogenated oil." A label may legally say "0 g trans fat" if a serving contains less than 0.5 g, so the ingredient list is the real source of truth. Reduce ultra-processed snacks and fast-food fried items in general.',
      },
    ],
  },
  {
    slug: 'vitamins',
    name: 'Vitamins',
    shortName: 'Vitamins',
    subtitle: 'Small but Mighty Organic Compounds',
    icon: 'V',
    color: '#6b7d76',
    bgLight: '#6b7d7610',
    description: 'Vitamins are organic compounds that serve as coenzymes, antioxidants, and regulators of gene expression. They are classified as either water-soluble (B-complex and vitamin C) or fat-soluble (A, D, E, K). Water-soluble vitamins are not stored and must be consumed regularly, while fat-soluble vitamins are stored in the liver and fatty tissues.',
    dailyNeed: 'Varies by vitamin — see individual food items below',
    dailyNeedSource: 'National Institutes of Health',
    mainFunction: 'Act as enzyme cofactors, antioxidants, and gene expression regulators. Essential for metabolic processes, immune function, and cellular health.',
    functions: [
      'Vitamin C: collagen synthesis, immune support, antioxidant',
      'Vitamin D: calcium absorption, bone health, immune function',
      'B Vitamins: energy metabolism, DNA synthesis, nerve function',
      'Vitamin A: vision, immune function, cell growth',
      'Vitamin E: antioxidant, cell membrane protection',
      'Vitamin K: blood clotting, bone metabolism',
    ],
    deficiencySigns: [
      'Fatigue and weakness (B vitamins)',
      'Poor wound healing, bleeding gums (vitamin C)',
      'Bone pain, weakened immunity (vitamin D)',
      'Night blindness (vitamin A)',
    ],
    foodItems: [
      { name: 'Citrus Fruits (Orange)', serving: '1 medium', amount: '70mg vitamin C', calories: 62, keyBenefit: '78% DV vitamin C, folate, potassium', dailyValue: '78%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Bell Peppers (Red)', serving: '1 cup chopped', amount: '190mg vitamin C', calories: 39, keyBenefit: '211% DV vitamin C, vitamin A, B6', dailyValue: '211%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Sweet Potato', serving: '1 medium', amount: '961mcg vitamin A (RAE)', calories: 103, keyBenefit: 'Beta-carotene, 4g fiber, vitamin C', dailyValue: '438%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Spinach (Cooked)', serving: '1 cup', amount: '943mcg vitamin K', calories: 41, keyBenefit: '786% DV vitamin K, iron, calcium', dailyValue: '786%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Sunflower Seeds', serving: '1/4 cup', amount: '12mg vitamin E', calories: 207, keyBenefit: '80% DV vitamin E, selenium, magnesium', dailyValue: '80%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Fatty Fish (Salmon)', serving: '3 oz', amount: '11mcg vitamin D', calories: 175, keyBenefit: '55% DV vitamin D, omega-3s, B12', dailyValue: '55%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Broccoli', serving: '1 cup cooked', amount: '101mg vitamin C', calories: 55, keyBenefit: '112% DV vitamin C, vitamin K, folate', dailyValue: '112%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Eggs', serving: '2 large', amount: '1.2mcg vitamin B12', calories: 143, keyBenefit: '50% DV B12, complete protein, choline', dailyValue: '50%', category: 'excellent', dietaryTags: ['V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Fortified Cereals', serving: '1 cup', amount: 'Varies (B vitamins)', calories: 150, keyBenefit: 'Often 100% DV for B vitamins', dailyValue: '100%', category: 'good', dietaryTags: ['VG', 'V', 'NF', 'DF'] },
      { name: 'Kiwi', serving: '1 medium', amount: '64mg vitamin C', calories: 42, keyBenefit: '71% DV vitamin C, vitamin K, fiber', dailyValue: '71%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
    ],
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['Colorful fruits and vegetables (eat the rainbow)', 'Leafy greens (spinach, kale, chard)', 'Citrus + bell peppers for vitamin C', 'Eggs and dairy for B12', 'Fatty fish for vitamin D'],
        why: 'Whole-food vitamin sources also bring fiber, water, and phytochemicals that supplements can\'t replicate.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['Fortified cereals and plant milks (vegans need fortified B12)', 'Multivitamins to plug specific gaps'],
        why: 'Useful for diet-pattern gaps (B12 for vegans, D in winter) but not a substitute for a varied whole-food diet.',
      },
      {
        label: 'Avoid',
        tone: 'avoid',
        examples: ['High-dose fat-soluble vitamin supplements without medical guidance', 'Mega-dose vitamin A or D from supplements'],
        why: 'Fat-soluble vitamins (A, D, E, K) accumulate to toxic levels. See the upper-limits table below before supplementing.',
      },
    ],
    upperLimits: [
      { nutrient: 'Vitamin A (preformed retinol)', ulValue: '3,000 mcg/day (adults)', source: 'NIH Office of Dietary Supplements', symptoms: 'Headache, blurred vision, liver damage, birth defects in pregnancy. Beta-carotene from food is safe.' },
      { nutrient: 'Vitamin D', ulValue: '100 mcg (4,000 IU)/day (adults)', source: 'IOM 2011', symptoms: 'Hypercalcemia, kidney stones, calcification of soft tissues.' },
      { nutrient: 'Vitamin E', ulValue: '1,000 mg/day (adults)', source: 'IOM 2000', symptoms: 'Bleeding risk; interferes with anticoagulant medications.' },
      { nutrient: 'Vitamin K', ulValue: 'No UL set, but caution with anticoagulants', source: 'NIH ODS', symptoms: 'Interferes with warfarin and similar blood thinners.' },
      { nutrient: 'Niacin (B3, supplemental)', ulValue: '35 mg/day (adults)', source: 'NIH ODS', symptoms: 'Flushing, liver toxicity at very high doses.' },
      { nutrient: 'Folate (synthetic)', ulValue: '1,000 mcg/day (adults)', source: 'NIH ODS', symptoms: 'Can mask B12 deficiency, allowing nerve damage to progress.' },
    ],
    tips: [
      'Eat a rainbow of fruits and vegetables for diverse vitamin intake',
      'Vitamin C enhances iron absorption — pair plant iron with citrus',
      'Vitamin D is synthesized by skin in sunlight — many need supplements in winter',
      'B12 is only found naturally in animal products — vegans need fortified foods or supplements',
    ],
    warning: 'Fat-soluble vitamins (A, D, E, K) can accumulate to toxic levels in high doses from supplements. Get vitamins from food first, supplement only when needed.',
  },
  {
    slug: 'minerals',
    name: 'Minerals',
    shortName: 'Minerals',
    subtitle: 'Inorganic Elements for Structure and Function',
    icon: 'M',
    color: '#202a26',
    bgLight: '#202a2610',
    description: 'Minerals are inorganic elements that serve structural, regulatory, and catalytic functions. Macrominerals (calcium, phosphorus, magnesium, sodium, potassium, chloride) are required in amounts greater than 100mg per day. Trace minerals (iron, zinc, copper, selenium, iodine) are needed in smaller amounts but are equally essential.',
    dailyNeed: 'Varies by mineral — Calcium 1,000mg, Iron 8-18mg, Zinc 8-11mg, Magnesium 310-420mg',
    dailyNeedSource: 'National Institutes of Health',
    mainFunction: 'Form bone and tooth structure, maintain fluid balance, enable nerve transmission, support enzyme reactions, and transport oxygen.',
    functions: [
      'Calcium & Phosphorus: bone and teeth structure',
      'Iron: oxygen transport in hemoglobin',
      'Potassium & Sodium: fluid balance and nerve transmission',
      'Zinc: immune function, wound healing, DNA synthesis',
      'Magnesium: 300+ enzymatic reactions, muscle function',
      'Selenium: antioxidant defense, thyroid health',
    ],
    deficiencySigns: [
      'Iron: anemia, fatigue, pale skin',
      'Calcium: osteoporosis, muscle cramps',
      'Zinc: hair loss, weakened immunity, slow healing',
      'Potassium: muscle weakness, irregular heartbeat',
    ],
    foodItems: [
      { name: 'Dairy (Milk)', serving: '1 cup', amount: '300mg calcium', calories: 103, keyBenefit: '23% DV calcium, protein, B12', dailyValue: '23%', category: 'excellent', dietaryTags: ['V', 'GF', 'NF'] },
      { name: 'Kale (Cooked)', serving: '1 cup', amount: '177mg calcium', calories: 36, keyBenefit: '14% DV calcium, vitamin K, C, A', dailyValue: '14%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Red Meat (Beef)', serving: '3 oz', amount: '2.2mg iron', calories: 213, keyBenefit: '12% DV iron (heme), zinc, B12', dailyValue: '12%', category: 'good', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Spinach (Cooked)', serving: '1 cup', amount: '6.4mg iron', calories: 41, keyBenefit: '36% DV iron (non-heme), vitamin A, K', dailyValue: '36%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Pumpkin Seeds', serving: '1/4 cup', amount: '2.9mg zinc', calories: 180, keyBenefit: '26% DV zinc, magnesium, iron', dailyValue: '26%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Oysters', serving: '3 oz (85g)', amount: '74mg zinc', calories: 116, keyBenefit: '673% DV zinc, B12, omega-3s', dailyValue: '673%', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Banana', serving: '1 medium', amount: '422mg potassium', calories: 105, keyBenefit: '9% DV potassium, vitamin B6, C', dailyValue: '9%', category: 'good', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Brazil Nuts', serving: '1 nut (5g)', amount: '96mcg selenium', calories: 33, keyBenefit: '175% DV selenium (1 nut = full day)', dailyValue: '175%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'DF'] },
      { name: 'Lentils', serving: '1 cup cooked', amount: '6.6mg iron', calories: 230, keyBenefit: '37% DV iron, 15.6g fiber, folate', dailyValue: '37%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Tofu (Calcium-set)', serving: '1/2 cup', amount: '434mg calcium', calories: 94, keyBenefit: '33% DV calcium, 10g protein, iron', dailyValue: '33%', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
    ],
    intakeBuckets: [
      {
        label: 'Eat Most',
        tone: 'good',
        examples: ['Leafy greens (spinach, kale)', 'Legumes (lentils, beans)', 'Seeds and nuts (pumpkin, almonds, Brazil)', 'Plain dairy or fortified plant milks', 'Whole grains'],
        why: 'Plant + whole-food mineral sources come with fiber and antioxidants and avoid the saturated-fat tradeoff of red-meat iron.',
      },
      {
        label: 'Eat Some',
        tone: 'neutral',
        examples: ['Lean red meat (best heme-iron source)', 'Shellfish (zinc + B12)', 'Hard cheeses for calcium'],
        why: 'High mineral density; eat for the minerals, not as a daily entrée. Pair plant iron with a vitamin-C source for ~3× absorption.',
      },
      {
        label: 'Limit',
        tone: 'caution',
        examples: ['Salt-cured and processed meats', 'Pickled and brined foods', 'Most fast food'],
        why: 'These deliver minerals you don\'t want (sodium) at the expense of the ones you do.',
      },
    ],
    upperLimits: [
      { nutrient: 'Sodium', ulValue: '2,300 mg/day (adults)', source: 'US Dietary Guidelines 2020–25; AHA ideal 1,500 mg', symptoms: 'Hypertension, increased CVD and stroke risk, kidney strain.' },
      { nutrient: 'Iron (supplemental)', ulValue: '45 mg/day (adults)', source: 'NIH ODS', symptoms: 'GI distress, oxidative stress; iron overload in hereditary hemochromatosis.' },
      { nutrient: 'Calcium', ulValue: '2,500 mg/day (19–50); 2,000 mg/day (51+)', source: 'IOM 2010', symptoms: 'Hypercalcemia, kidney stones, possible CVD risk at very high supplemental doses.' },
      { nutrient: 'Zinc', ulValue: '40 mg/day (adults)', source: 'NIH ODS', symptoms: 'Copper deficiency, impaired immune function, GI symptoms.' },
      { nutrient: 'Selenium', ulValue: '400 mcg/day (adults)', source: 'NIH ODS', symptoms: 'Hair loss, brittle nails, GI distress, neurological issues. Just 4–5 Brazil nuts can exceed this.' },
      { nutrient: 'Magnesium (supplemental)', ulValue: '350 mg/day (from supplements only)', source: 'NIH ODS', symptoms: 'Diarrhea, cramping. Food magnesium has no UL.' },
    ],
    tips: [
      'Pair plant-based iron (non-heme) with vitamin C for better absorption',
      'Leafy greens provide calcium that rivals dairy',
      'Just 1-2 Brazil nuts provide your entire daily selenium needs',
      'Soaking beans and lentils reduces phytates, improving mineral absorption',
    ],
    warning: 'Excess sodium (over 2,300mg/day) is linked to high blood pressure. Most sodium comes from processed foods, not the salt shaker.',
  },
  {
    slug: 'water',
    name: 'Water',
    shortName: 'Water',
    subtitle: 'The Most Essential Nutrient',
    icon: 'H2O',
    color: '#4a90a4',
    bgLight: '#4a90a410',
    description: 'Water is the most abundant substance in the human body, comprising approximately 60% of adult body weight. Every cell, tissue, and organ depends on water to function. It serves as the solvent for biochemical reactions, the medium for nutrient transport, the regulator of body temperature, the lubricant for joints, and the vehicle for waste removal.',
    dailyNeed: '2.7 liters/day for women, 3.7 liters/day for men (from all sources)',
    dailyNeedSource: 'National Academies of Sciences',
    mainFunction: 'Transport nutrients and oxygen, regulate body temperature, remove waste products, lubricate joints, and enable every biochemical reaction in the body.',
    functions: [
      'Transports nutrients and oxygen to cells',
      'Regulates body temperature through sweating',
      'Removes waste through urine, sweat, and bowel movements',
      'Lubricates joints and cushions organs',
      'Enables digestion and nutrient absorption',
    ],
    deficiencySigns: [
      'Thirst, dry mouth, dark urine',
      'Fatigue, headache, dizziness',
      'Constipation, decreased urine output',
      'Dry skin, muscle cramps',
    ],
    foodItems: [
      { name: 'Plain Water', serving: '1 cup (240ml)', amount: '100% water', calories: 0, keyBenefit: 'Zero calories, pure hydration', dailyValue: 'Best source', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Cucumber', serving: '1 cup sliced (104g)', amount: '96% water', calories: 16, keyBenefit: 'Vitamin K, potassium, ultra-hydrating', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Watermelon', serving: '1 cup diced (154g)', amount: '92% water', calories: 46, keyBenefit: 'Lycopene, vitamin C, electrolytes', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Strawberries', serving: '1 cup (152g)', amount: '91% water', calories: 49, keyBenefit: 'Vitamin C, manganese, antioxidants', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Lettuce (Romaine)', serving: '1 cup shredded (47g)', amount: '95% water', calories: 8, keyBenefit: 'Vitamin A, K, virtually calorie-free', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Tomato', serving: '1 medium (123g)', amount: '94% water', calories: 22, keyBenefit: 'Lycopene, vitamin C, potassium', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Coconut Water', serving: '1 cup (240ml)', amount: '95% water', calories: 46, keyBenefit: 'Natural electrolytes (K, Na, Mg)', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
      { name: 'Broth (Low-Sodium)', serving: '1 cup (240ml)', amount: '98% water', calories: 10, keyBenefit: 'Warm, comforting, minerals', dailyValue: 'High', category: 'excellent', dietaryTags: ['GF', 'K', 'NF', 'DF'] },
      { name: 'Zucchini', serving: '1 cup sliced (113g)', amount: '95% water', calories: 19, keyBenefit: 'Vitamin C, potassium, versatile', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'K', 'NF', 'DF'] },
      { name: 'Grapefruit', serving: '1/2 medium', amount: '88% water', calories: 52, keyBenefit: 'Vitamin C, vitamin A, fiber', dailyValue: 'High', category: 'excellent', dietaryTags: ['VG', 'V', 'GF', 'NF', 'DF'] },
    ],
    tips: [
      'Drink a glass of water upon waking to rehydrate after sleep',
      'Carry a reusable water bottle throughout the day',
      'Eat water-rich fruits and vegetables (they count toward daily intake)',
      'Replace sugary beverages with water or infused water (lemon, cucumber)',
    ],
    warning: 'Thirst is a late indicator of dehydration. Drink water regularly throughout the day, especially during exercise and in hot weather. Older adults may have a diminished thirst response.',
  },
];

export function getNutrientBySlug(slug: string): NutrientDetail | undefined {
  return nutrients.find(n => n.slug === slug);
}

/** Flat index of every food in the encyclopedia, with its source nutrient. */
export interface FoodIndexEntry {
  food: FoodItem;
  nutrient: NutrientDetail;
}

export function getAllFoods(): FoodIndexEntry[] {
  const all: FoodIndexEntry[] = [];
  for (const n of nutrients) {
    for (const f of n.foodItems) all.push({ food: f, nutrient: n });
  }
  return all;
}

/**
 * Reverse lookup — given a free-text nutrient query, return foods that mention
 * it in `amount` or `keyBenefit`.
 */
export function findFoodsHighIn(query: string): FoodIndexEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllFoods().filter(({ food }) =>
    food.amount.toLowerCase().includes(q) ||
    food.keyBenefit.toLowerCase().includes(q) ||
    food.name.toLowerCase().includes(q),
  );
}
