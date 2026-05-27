import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HealthyPlateDiagram from '@/components/HealthyPlateDiagram';
import { useT, useLocale } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Korean translations (override English when locale === 'ko')        */
/* ------------------------------------------------------------------ */
const chaptersKo: Record<string, { title: string; content: string; highlight: string }> = {
  'macro-micro': {
    title: '다량영양소 vs 미량영양소',
    content: '탄수화물·단백질·지방은 그램 단위로 매일 필요한 다량영양소입니다. 에너지원이자 신체 구성 요소 역할을 합니다. 비타민과 미네랄은 미량영양소로 mg·μg 단위지만 효소 보조 인자, 항산화제, 생리 조절자로서 똑같이 중요합니다. 탄수화물 1g당 4kcal, 단백질 1g당 4kcal, 지방 1g당 9kcal의 에너지를 제공합니다.',
    highlight: '신체는 단백질을 만들기 위해 20가지 아미노산이 필요하며, 그중 9가지는 "필수"라 식품으로 반드시 섭취해야 합니다.',
  },
  fiber: {
    title: '식이섬유: 소화 건강의 핵심',
    content: '평균 미국인은 하루 약 15g의 식이섬유만 섭취 — 권장량 25–38g의 절반 수준입니다. 67건의 무작위 대조 임상 메타분석에서 수용성 식이섬유가 총·LDL 콜레스테롤을 유의하게 감소시켰고, 곡물 식이섬유 고섭취는 제2형 당뇨 위험을 20–30% 낮춥니다. 불용성 섬유는 장 운동을 촉진하고 수용성 섬유는 혈당 스파이크를 완화합니다. 콩류, 견과류, 베리류, 귀리, 현미가 특히 풍부합니다.',
    highlight: '수용성 식이섬유는 장에서 콜레스테롤과 결합해 흡수를 막아 LDL을 낮춥니다 — 심혈관 예방의 핵심 기전.',
  },
  omega3: {
    title: '오메가-3 지방산',
    content: 'EPA·DHA는 중성지방·혈압·혈소판 응집·염증을 낮추고 심박을 안정화합니다. 노년의 혈중 오메가-3 농도가 높을수록 모든 원인 사망률이 낮아지며, DHA는 뇌·망막의 핵심 구조 성분입니다. ALA(아마씨, 호두)는 체 내에서 EPA·DHA로 전환되는데, 전환율은 5–10%에 불과해 직접 섭취가 권장됩니다.',
    highlight: '미국심장학회는 심혈관 건강을 위해 등푸른 생선을 주 2회 이상 섭취할 것을 권장합니다.',
  },
  sugar: {
    title: '첨가당의 숨은 비용',
    content: '미국 성인의 평균 첨가당 섭취는 하루 약 17티스푼(71g)으로 권장량을 크게 초과합니다. 110,000명 이상을 본 2023년 연구에서 첨가당 섭취가 많을수록 심혈관·뇌졸중 위험이 증가했고, 가당 음료를 정기적으로 섭취한 사람들은 제2형 당뇨 위험이 26% 높았습니다. 첨가당은 비알코올성 지방간(NAFLD), 치아 우식, 비만의 주요 원인이기도 합니다. WHO는 성인의 첨가당 섭취를 총 열량의 10% 이하, 이상적으로는 5% 이하로 제한할 것을 권장합니다.',
    highlight: '가당 음료를 맹물로 바꾸는 것만으로도 가장 효과적인 식이 변화를 만들 수 있습니다.',
  },
  sodium: {
    title: '나트륨: 조용한 위험',
    content: '미국 평균 일일 나트륨 섭취는 약 3,400mg으로 권장 한도 2,300mg을 약 50% 초과합니다. 5g/일 소금 감량은 뇌졸중 23%, 심혈관질환 17% 감소와 관련되며, 전 세계가 30%만 줄여도 25년간 약 4천만 명을 살릴 수 있다고 추산됩니다. 고혈압 환자는 1,500mg 이하를 목표로 하며, DASH 식단은 나트륨 제한과 함께 칼륨·마그네슘·칼슘이 풍부한 식품을 강조합니다.',
    highlight: '대부분의 과잉 나트륨은 소금통이 아니라 가공식품·외식에서 옵니다.',
  },
  protein: {
    title: '단백질의 질과 분배',
    content: '권장량 0.83 g/kg/일은 결핍 예방 기준일 뿐 최적값이 아닙니다. 활동량이 많거나 노년이라면 1.0–1.6 g/kg가 근육 유지·낙상 예방에 유리하며, 한 번에 0.3 g/kg을 3–4끼에 분배해야 단백질 합성이 극대화됩니다. 단백질의 "질"은 소화율과 아미노산 구성으로 평가되며, 계란, 우유, 생선, 고기가 가장 높은 PDCAAS(단백질 소화율 보정 아미노산 점수)를 가집니다.',
    highlight: '아침 단백질이 가장 부족합니다 — 아침 식사에 20–30g의 단백질을 더하면 근감소가 늦춰집니다.',
  },
  hydration: {
    title: '물: 잊혀진 영양소',
    content: '체수분이 약 1–2%만 감소하도 인지·기분·철력이 저하됩니다. 일일 권장 총 수분(음식+음료)은 여성 약 2.7L, 남성 약 3.7L. 갈증은 이미 탈수 후반의 신호이므로 의식적인 섭취가 필요합니다. 운 동 시에는 30–60분마다 150–250mL를 보충하고, 1시간 이상의 격렬한 운 동 후에는 전해질 함유 음료가 도움이 됩니다. 커피와 차의 이뇨 작용은 일시적이며, 습관적인 섭취자에게는 수분 균형에 큰 영향을 주지 않습니다.',
    highlight: '아침 한 잔의 물은 야간 탈수를 회복시키는 가장 효율적인 방법입니다.',
  },
  'vitamins-minerals': {
    title: '비타민 & 미네랄: 보이지 않는 방패',
    content: '비타민 D는 뼈 건강과 면역 기능의 핵심으로, 전 세계 인구의 약 50%가 부족 상태입니다. 철분 결핍은 전 세계에서 가장 흔한 영양 결핍으로, 피로와 인지 저하를 유발합니다. 칼슘과 마그네슘은 뼈·근육·신경 기능에 필수이며, 칼륨은 나트륨과 균형을 이루어 혈압을 조절합니다. 비타민 B12는 식물성 식단을 하는 사람들에게 특히 주의가 필요합니다.',
    highlight: '다양한 색의 채소와 과일을 매일 섭취하면 서로 다른 항산화 물질과 미량영양소를 동시에 확보할 수 있습니다.',
  },
  'gut-microbiome': {
    title: '장내 미생물: 제2의 뇌',
    content: '인체 장내에는 약 39조 개의 미생물이 살고 있으며, 이들은 소화·면역·심지어 정신 건강에도 영향을 줍니다. 다양한 식이섬유를 섭취하면 프로바이오틱스(유산균)의 먹이가 되는 프리바이오틱스가 생성되어 장내 다양성을 증가시킵니다. 발효 식품(김치, 요거트, 케피어, 사우어크라우트)은 유익균을 직접 공급합니다. 장내 미생물 다양성이 높을수록 비만·염증성 장질환·우울증 위험이 낮아집니다.',
    highlight: '하루에 30가지 이상의 다른 식물성 식품을 섭취하면 장내 미생물 다양성이 크게 향상됩니다.',
  },
  'ultra-processed': {
    title: '초가공식품(UPF): 영양의 적',
    content: 'NOVA 분류에 따르면 초가공식품은 산업 공정으로 만든 식품으로, 에너지 밀도가 높고 영양 밀도는 낮습니다. 영국 성인의 에너지 섭취의 56%가 UPF에서 옵니다. UPF 소비가 높을수록 비만, 제2형 당뇨, 심혈관질환, 일부 암의 위험이 증가합니다. 이는 단순히 "나쁜 성분" 때문이 아니라 식품의 물리적 구조, 포만감 신호 교란, 첨가물의 독립적 효과 등 복합적인 이유 때문입니다.',
    highlight: '식품 라벨에 익숙하지 않은 성분이 5개 이상이라면, 그것은 아마도 초가공식품입니다.',
  },
  'sleep-nutrition': {
    title: '수면과 영양: 서로를 돕는 관계',
    content: '수면 부족은 그렐린(식욕 호르몬)을 증가시키고 렙틴(포만감 호르몬)을 감소시켜 과식을 유발합니다. 하루 6시간 이하 수면은 비만 위험을 55% 높입니다. 반대로 식단도 수면에 영향을 줍니다: 트립토판(칠면조, 우유, 견과류)은 멜라토닌 전구체이고, 마그네슘은 GABA 수용체를 활성화해 이완을 촉진합니다. 카페인의 반감기는 5–6시간이므로 오후 2시 이후 섭취는 수면에 방해가 될 수 있습니다.',
    highlight: '규칙적인 수면 시간과 저녁 식사를 수면 3시간 전에 마치는 것만으로도 수면의 질과 체중 관리가 동시에 개선됩니다.',
  },
  plate: {
    title: '하버드 헬시 플레이트',
    content: '2/3는 채소·과일, 1/4는 통곡물, 1/4는 양질의 단백질로 채우고, 건강한 기름은 적당히 사용하며, 음료는 물·차·커피로 하고 우유와 가당 음료는 줄이는 것이 핵심입니다. 이 모델은 특정 칼로리를 계산하지 않고도 균형 잡힌 식사를 구성할 수 있게 해줍니다.',
    highlight: '복잡한 칼로리 계산 대신 접시 비율로 식사를 구성하면 이행률이 크게 올라갑니다.',
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Citation {
  ref: string;
  link?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  content: string;
  highlight: string;
  citations: Citation[];
}

/* ------------------------------------------------------------------ */
/*  English chapter data                                               */
/* ------------------------------------------------------------------ */
const chapters: Chapter[] = [
  {
    id: 'macro-micro',
    number: '01',
    title: 'Macronutrients vs. Micronutrients',
    content:
      'Carbohydrates, proteins, and fats are macronutrients required in gram quantities daily. They serve as primary energy sources and structural components. Carbohydrates provide 4 kcal/g and are the brain\'s preferred fuel. Protein provides 4 kcal/g and is essential for tissue repair, enzyme production, and immune function. Fat provides 9 kcal/g and is critical for hormone synthesis, cell membrane integrity, and fat-soluble vitamin absorption. Vitamins and minerals are micronutrients needed in milligram or microgram amounts but are equally critical as enzyme cofactors, antioxidants, and physiological regulators.',
    highlight:
      'The body requires 20 different amino acids to construct proteins — nine are "essential" and must come from dietary sources.',
    citations: [
      { ref: 'IOM Dietary Reference Intakes (DRI) — Energy, Carbohydrate, Fiber, Fat, Protein and Amino Acids (2005).' },
      { ref: 'WHO/FAO. Protein and Amino Acid Requirements in Human Nutrition. WHO Technical Report Series 935 (2007).' },
      { ref: 'Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. National Academies Press (2005).' },
    ],
  },
  {
    id: 'fiber',
    number: '02',
    title: 'Fiber: The Digestive Champion',
    content:
      'The average American consumes only about 15 grams of fiber per day — roughly half the recommended 25–38 grams. A meta-analysis of 67 controlled trials found that increased soluble fiber intake significantly reduced total and LDL cholesterol. High cereal fiber intake is associated with a 20–30% lower risk of developing type 2 diabetes. Insoluble fiber (found in whole grains, nuts, vegetables) adds bulk to stool and speeds transit time, reducing constipation and diverticular disease risk. Soluble fiber (oats, beans, apples, citrus) forms a gel that slows gastric emptying, blunts blood sugar spikes, and binds bile acids. The gut microbiome ferments certain fibers into short-chain fatty acids (SCFAs) like butyrate, which nourishes colon cells and reduces inflammation.',
    highlight:
      'Soluble fiber binds to cholesterol in the gut, preventing absorption and lowering LDL levels — a key mechanism for heart disease prevention.',
    citations: [
      { ref: 'Brown L, Rosner B, Willett WW, Sacks FM. Cholesterol-lowering effects of dietary fiber: a meta-analysis. Am J Clin Nutr 1999;69(1):30-42.' },
      { ref: 'Reynolds A, et al. Carbohydrate quality and human health: a series of systematic reviews and meta-analyses. Lancet 2019;393(10170):434-445.' },
      { ref: 'InterAct Consortium. Dietary fibre and incidence of type 2 diabetes in eight European countries. Diabetologia 2015;58:1394-1408.' },
      { ref: 'Makki K, et al. The Impact of Dietary Fiber on Gut Microbiota in Host Health and Disease. Cell Host Microbe 2018;23(6):705-715.' },
    ],
  },
  {
    id: 'omega3',
    number: '03',
    title: 'Omega-3 Fatty Acids',
    content:
      'EPA and DHA omega-3 fatty acids lower triglyceride levels, reduce blood pressure, decrease platelet aggregation, reduce inflammation, and stabilize heart rhythm. Higher blood levels of omega-3 fats are associated with lower risk of premature death from all causes among older adults. DHA is a major structural component of the brain and retina, comprising about 40% of polyunsaturated fatty acids in the brain. ALA (alpha-linolenic acid) from flaxseeds, chia seeds, and walnuts can convert to EPA and DHA in the body, but the conversion rate is only 5–10%, making direct sources more reliable. For those who do not eat fish, algae-based DHA supplements are a viable plant-based alternative.',
    highlight:
      'The American Heart Association recommends eating at least two servings of fatty fish per week for cardiovascular benefits.',
    citations: [
      { ref: 'Mozaffarian D, Lemaitre RN, et al. Plasma phospholipid long-chain omega-3 fatty acids and total and cause-specific mortality in older adults. Ann Intern Med 2013;158(7):515-525.' },
      { ref: 'Rimm EB, et al. Seafood Long-Chain n-3 Polyunsaturated Fatty Acids and Cardiovascular Disease: A Science Advisory From the AHA. Circulation 2018;138(1):e35-e47.' },
      { ref: 'Swanson D, et al. Omega-3 fatty acids EPA and DHA: health benefits throughout life. Adv Nutr 2012;3(1):1-7.' },
    ],
  },
  {
    id: 'sugar',
    number: '04',
    title: 'The Hidden Cost of Added Sugars',
    content:
      'On average, U.S. adults consume approximately 17 teaspoons (71 grams) of added sugar per day — far exceeding recommended limits. A 2023 study of 110,000+ people found higher added sugar intake was associated with increased risks of heart disease and stroke. Individuals consuming sugar-sweetened beverages regularly have a 26% greater risk of developing type 2 diabetes. Added sugars contribute to non-alcoholic fatty liver disease (NAFLD) by overwhelming the liver\'s capacity to metabolize fructose, converting it to fat. They also promote dental caries, dyslipidemia, and weight gain through liquid calories that do not trigger satiety signals. The WHO recommends limiting added sugars to less than 10% of total daily energy intake, with an ideal target below 5%.',
    highlight:
      'Replacing sugary beverages with plain water is one of the simplest and most effective dietary changes for improving health.',
    citations: [
      { ref: 'Yang Q, et al. Added sugar intake and cardiovascular diseases mortality among US adults. JAMA Intern Med 2014;174(4):516-524.' },
      { ref: 'Malik VS, et al. Sugar-sweetened beverages and risk of metabolic syndrome and type 2 diabetes: a meta-analysis. Diabetes Care 2010;33(11):2477-2483.' },
      { ref: 'WHO. Guideline: Sugars Intake for Adults and Children (2015).' },
      { ref: 'Softic S, et al. Role of Dietary Fructose and Hepatic De Novo Lipogenesis in Fatty Liver Disease. Gastroenterology 2020;158(4):880-882.' },
    ],
  },
  {
    id: 'sodium',
    number: '05',
    title: 'Sodium: A Silent Threat',
    content:
      'The average American consumes approximately 3,400 mg of sodium daily — nearly 50% higher than the 2,300 mg recommended limit. A 5-gram reduction in daily salt intake is associated with a 23% lower risk of stroke and 17% lower risk of cardiovascular disease. Reducing sodium intake by 30% could prevent approximately 40 million deaths worldwide over 25 years. For individuals with hypertension, the optimal target is 1,500 mg/day. The DASH (Dietary Approaches to Stop Hypertension) diet emphasizes not just sodium reduction but also increasing potassium, magnesium, and calcium through fruits, vegetables, whole grains, and low-fat dairy. Potassium-rich foods (bananas, potatoes, beans, leafy greens) help counteract sodium\'s blood pressure-raising effects.',
    highlight:
      'Most excess sodium comes not from the salt shaker, but from processed and restaurant foods.',
    citations: [
      { ref: 'Aburto NJ, et al. Effect of lower sodium intake on health: systematic review and meta-analyses. BMJ 2013;346:f1326.' },
      { ref: 'AHA. Sodium and Salt — 2021 Dietary Guidance to Improve Cardiovascular Health.' },
      { ref: 'Mozaffarian D, et al. Global sodium consumption and death from cardiovascular causes. NEJM 2014;371(7):624-634.' },
      { ref: 'Appel LJ, et al. A Clinical Trial of the Effects of Dietary Patterns on Blood Pressure. NEJM 1997;336(16):1117-1124.' },
    ],
  },
  {
    id: 'protein',
    number: '06',
    title: 'Protein Quality & Distribution',
    content:
      'The RDA of 0.83 g/kg/day is the minimum to prevent deficiency, not the optimal amount for health. Active individuals and older adults benefit from 1.0–1.6 g/kg to preserve muscle mass, prevent sarcopenia, and reduce fall risk. Distributing protein intake across meals — approximately 0.3 g/kg per meal, 3–4 times daily — maximizes muscle protein synthesis more effectively than skewing intake toward dinner. Protein "quality" is determined by digestibility and amino acid composition; eggs, dairy, fish, and meat have the highest PDCAAS (Protein Digestibility-Corrected Amino Acid Score) of 1.0. Plant proteins can be combined across the day (grains + legumes, nuts + seeds) to achieve complete amino acid profiles. Leucine, at 2.5–3g per meal, is the key trigger for initiating muscle protein synthesis.',
    highlight:
      'Breakfast is typically the most protein-deficient meal — adding 20–30g of protein in the morning can significantly delay muscle loss with aging.',
    citations: [
      { ref: 'Deutz NEP, et al. Protein intake and exercise for optimal muscle function with aging. Clin Nutr 2014;33(6):929-936.' },
      { ref: 'Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? J Int Soc Sports Nutr 2018;15:10.' },
      { ref: 'WHO/FAO. Protein Quality Evaluation: Report of the Joint FAO/WHO Expert Consultation. FAO Food and Nutrition Paper 51 (1991).' },
      { ref: 'Layman DK, et al. Dietary Protein: Amounts, Sources, and Distribution for Optimal Health. Nutr Today 2021;56(6):249-257.' },
    ],
  },
  {
    id: 'hydration',
    number: '07',
    title: 'Water: The Forgotten Nutrient',
    content:
      'A mere 1–2% decrease in body water impairs cognition, mood, and physical performance. The recommended total daily water intake (from food + beverages) is approximately 2.7 liters for women and 3.7 liters for men. Thirst is already a late signal of dehydration, making conscious intake essential. During exercise, consume 150–250 mL every 15–20 minutes; for exercise lasting over an hour, electrolyte-containing beverages help replace sodium lost through sweat. Water-rich foods (cucumbers, watermelon, strawberries, lettuce, soups) contribute 20–30% of daily water intake. Caffeine\'s diuretic effect is transient and minimal in habitual consumers. Older adults have a blunted thirst response and are at higher risk of dehydration, making scheduled drinking particularly important.',
    highlight:
      'A glass of water upon waking is the most efficient way to recover from overnight dehydration.',
    citations: [
      { ref: 'Institute of Medicine. Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate (2005).' },
      { ref: 'Armstrong LE, et al. Mild dehydration affects mood in healthy young women. J Nutr 2012;142(2):382-388.' },
      { ref: 'Sawka MN, et al. American College of Sports Medicine position stand: Exercise and fluid replacement. Med Sci Sports Exerc 2007;39(2):377-390.' },
    ],
  },
  {
    id: 'vitamins-minerals',
    number: '08',
    title: 'Vitamins & Minerals: The Invisible Shield',
    content:
      'Vitamin D is critical for bone health and immune function, yet approximately 50% of the global population is deficient. Iron deficiency is the most common nutritional deficiency worldwide, causing fatigue, impaired cognition, and weakened immunity — particularly affecting menstruating women and young children. Calcium and magnesium are essential for bone density, muscle contraction, and nerve signaling. Potassium works in balance with sodium to regulate blood pressure; most adults consume only half the recommended 3,500–4,700 mg/day. Vitamin B12 requires attention for those on plant-based diets, as it is found almost exclusively in animal products. Folate is crucial during pregnancy to prevent neural tube defects. Zinc supports wound healing and immune response. A "rainbow plate" approach — consuming vegetables and fruits of diverse colors — ensures a broad spectrum of antioxidants and phytonutrients.',
    highlight:
      'Eating a variety of colorful vegetables and fruits daily ensures you capture a wide spectrum of antioxidants and micronutrients.',
    citations: [
      { ref: 'Holick MF. Vitamin D deficiency. NEJM 2007;357(3):266-281.' },
      { ref: 'WHO. Worldwide prevalence of anaemia 1993–2005: WHO Global Database on Anaemia (2008).' },
      { ref: 'Weaver CM, et al. Calcium and Vitamin D Supplementation and Bone Health. Nutr Today 2021;56(6):272-280.' },
      { ref: 'Rizzo G, et al. Vitamin B12 among Vegetarians: Status, Assessment and Supplementation. Nutrients 2016;8(12):767.' },
    ],
  },
  {
    id: 'gut-microbiome',
    number: '09',
    title: 'The Gut Microbiome: Your Second Brain',
    content:
      'The human gut harbors approximately 39 trillion microorganisms that influence digestion, immunity, and even mental health through the gut-brain axis. Diverse dietary fiber intake feeds beneficial bacteria, producing prebiotics that increase microbial diversity. Fermented foods (kimchi, yogurt, kefir, sauerkraut, miso) deliver probiotics — live beneficial bacteria — directly to the gut. Higher gut microbiome diversity is associated with lower risks of obesity, inflammatory bowel disease, type 2 diabetes, and depression. Short-chain fatty acids (SCFAs) produced by fiber fermentation strengthen the intestinal barrier, reduce systemic inflammation, and regulate appetite hormones. Antibiotic use, chronic stress, and low-fiber diets reduce microbial diversity. Emerging research suggests that artificial sweeteners may negatively alter gut bacterial composition.',
    highlight:
      'Consuming 30+ different plant-based foods per week significantly improves gut microbiome diversity.',
    citations: [
      { ref: 'Sender R, Fuchs S, Milo R. Revised Estimates for the Number of Human and Bacteria Cells in the Body. PLoS Biol 2016;14(8):e1002533.' },
      { ref: 'McDonald D, et al. American Gut: an Open Platform for Citizen Science Microbiome Research. mSystems 2018;3(3):e00031-18.' },
      { ref: 'Zhernakova A, et al. Population-based metagenomics analysis reveals markers for gut microbiome composition and diversity. Science 2016;352(6285):565-569.' },
      { ref: 'Marchesi JR, et al. The gut microbiota and host health: a new clinical frontier. Gut 2016;65(2):330-339.' },
    ],
  },
  {
    id: 'ultra-processed',
    number: '10',
    title: 'Ultra-Processed Foods: The Nutrition Enemy',
    content:
      'Under the NOVA classification, ultra-processed foods (UPFs) are industrial formulations typically high in energy density and low in nutritional value. In the UK, UPFs account for 56% of total energy intake among adults. Higher UPF consumption is linked to increased risks of obesity, type 2 diabetes, cardiovascular disease, and certain cancers. This is not merely due to "bad ingredients" — the physical structure of UPFs (soft, hyper-palatable, rapidly absorbed) disrupts satiety signals. Additives like emulsifiers and artificial sweeteners may independently alter gut microbiota and promote inflammation. UPFs are engineered to be hyper-palatable through precise combinations of fat, sugar, salt, and flavor enhancers, making moderation difficult. Reducing UPF intake by even 10% and replacing with minimally processed alternatives has measurable health benefits.',
    highlight:
      'If a food label contains more than 5 ingredients you don\'t recognize, it is likely ultra-processed.',
    citations: [
      { ref: 'Monteiro CA, et al. Ultra-processed foods: what they are and how to identify them. Public Health Nutr 2019;22(5):936-941.' },
      { ref: 'Rauber F, et al. Ultra-processed food consumption and risk of obesity. Curr Obes Rep 2020;9(3):245-256.' },
      { ref: 'Srour B, et al. Ultra-processed food intake and risk of cardiovascular disease. BMJ 2019;365:l1451.' },
      { ref: 'Fardet A. Minimally processed foods are more satiating and less hyperglycemic than ultra-processed foods. World Rev Nutr Diet 2016;115:142-147.' },
    ],
  },
  {
    id: 'sleep-nutrition',
    number: '11',
    title: 'Sleep & Nutrition: A Bidirectional Relationship',
    content:
      'Sleep deprivation increases ghrelin (the hunger hormone) and decreases leptin (the satiety hormone), promoting overeating. Sleeping fewer than 6 hours per night is associated with a 55% higher risk of obesity. Conversely, diet profoundly affects sleep quality: tryptophan (found in turkey, milk, nuts, seeds) is a melatonin precursor; magnesium activates GABA receptors, promoting relaxation; and tart cherry juice naturally contains melatonin. Caffeine has a half-life of 5–6 hours, meaning afternoon consumption can disrupt sleep architecture. Alcohol may help initiate sleep but fragments REM sleep and worsens sleep quality. Large meals close to bedtime trigger acid reflux and thermogenesis, interfering with the body\'s natural cooling process needed for sleep onset.',
    highlight:
      'A consistent sleep schedule and finishing dinner 3 hours before bed improves both sleep quality and weight management simultaneously.',
    citations: [
      { ref: 'Taheri S, et al. Short sleep duration is associated with reduced leptin, elevated ghrelin, and increased body mass index. PLoS Med 2004;1(3):e62.' },
      { ref: 'Cappuccio FP, et al. Meta-analysis of short sleep duration and obesity in children and adults. Sleep 2008;31(5):619-626.' },
      { ref: 'St-Onge MP, et al. Fiber and Saturated Fat Are Associated with Sleep Arousals and Slow Wave Sleep. J Clin Sleep Med 2016;12(1):19-24.' },
      { ref: 'Drake C, et al. Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. J Clin Sleep Med 2013;9(11):1195-1200.' },
    ],
  },
  {
    id: 'plate',
    number: '12',
    title: 'The Harvard Healthy Plate',
    content:
      'The Harvard Healthy Eating Plate model recommends filling half your plate with vegetables and fruits (emphasizing variety and color), one-quarter with whole grains (brown rice, quinoa, whole wheat), and one-quarter with healthy protein (fish, poultry, beans, nuts). Healthy oils (olive, canola) should be used in moderation. Water, tea, and coffee are the preferred beverages, while milk and sugary drinks should be minimized. This model eliminates the need for calorie counting while ensuring balanced nutrition. Unlike the USDA MyPlate, the Harvard model explicitly recommends healthy oils, warns against refined grains, and discourages dairy as a required food group.',
    highlight:
      'Using plate proportions instead of complex calorie calculations dramatically improves adherence to healthy eating patterns.',
    citations: [
      { ref: 'Harvard T.H. Chan School of Public Health. The Nutrition Source — Healthy Eating Plate (2011, updated 2020).' },
      { ref: 'Willett WC, Stampfer MJ. Current evidence on healthy eating. Annu Rev Public Health 2013;34:77-95.' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Calorie data                                                       */
/* ------------------------------------------------------------------ */
const calorieData = [
  { gender: 'Female', age: '19-30', sedentary: '2,000', moderate: '2,000-2,200', active: '2,400' },
  { gender: 'Female', age: '31-50', sedentary: '1,800', moderate: '2,000', active: '2,200' },
  { gender: 'Female', age: '51+', sedentary: '1,600', moderate: '1,800', active: '2,000-2,200' },
  { gender: 'Male', age: '19-30', sedentary: '2,400', moderate: '2,600-2,800', active: '3,000' },
  { gender: 'Male', age: '31-50', sedentary: '2,200', moderate: '2,400-2,600', active: '2,800-3,000' },
  { gender: 'Male', age: '51+', sedentary: '2,000', moderate: '2,200-2,400', active: '2,400-2,800' },
];

/* ------------------------------------------------------------------ */
/*  Key takeaway data                                                  */
/* ------------------------------------------------------------------ */
const keyTakeaways = [
  { id: 'fiber', label: 'Fiber', value: '25–38g', sub: 'per day' },
  { id: 'sugar', label: 'Added Sugar', value: '<10%', sub: 'of calories' },
  { id: 'sodium', label: 'Sodium', value: '<2,300mg', sub: 'per day' },
  { id: 'omega3', label: 'Omega-3', value: '2+', sub: 'fish servings/wk' },
  { id: 'protein', label: 'Protein', value: '0.8–1.6g', sub: 'per kg body weight' },
  { id: 'water', label: 'Water', value: '2.7–3.7L', sub: 'total daily intake' },
];

/* ------------------------------------------------------------------ */
/*  Chapter card component                                             */
/* ------------------------------------------------------------------ */
function ChapterCard({
  chapter,
  isExpanded,
  onToggle,
}: {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const t = useT();
  const [locale] = useLocale();
  const ko = locale === 'ko' ? chaptersKo[chapter.id] : undefined;
  const title = ko?.title ?? chapter.title;
  const content = ko?.content ?? chapter.content;
  const highlight = ko?.highlight ?? chapter.highlight;

  return (
    <div
      className={`border-b border-deep/10 transition-all duration-500 ${
        isExpanded ? 'pb-8' : 'pb-4'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-6 text-left group py-4"
      >
        <span className="text-caption text-terracotta flex-shrink-0 mt-1">
          {chapter.number}
        </span>
        <div className="flex-1">
          <h3
            className="text-xl md:text-2xl text-deep group-hover:text-terracotta transition-colors duration-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-deep/40 flex-shrink-0 mt-2 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-12 md:pl-16 pr-4">
          <p className="text-base text-deep/70 leading-relaxed mb-4">{content}</p>
          <div className="p-4 rounded-xl bg-terracotta/5 border-l-4 border-terracotta mb-4">
            <p className="text-sm text-deep/80 italic leading-relaxed">
              "{highlight}"
            </p>
          </div>
          {chapter.citations && chapter.citations.length > 0 && (
            <div className="pt-3 border-t border-deep/10">
              <p className="text-[10px] uppercase tracking-wider text-deep/40 mb-2">
                {t('rs.references')}
              </p>
              <ol className="space-y-1.5">
                {chapter.citations.map((c, i) => (
                  <li
                    key={i}
                    className="text-xs text-deep/60 leading-relaxed flex gap-2"
                  >
                    <span className="text-deep/40 flex-shrink-0">[{i + 1}]</span>
                    <span>{c.ref}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
export default function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedChapter, setExpandedChapter] = useState<string>('macro-micro');
  const t = useT();
  const [locale] = useLocale();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.chapter-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="guidelines"
      ref={sectionRef}
      className="w-full py-32 px-6"
      style={{ backgroundColor: '#f6f5f1' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <header className="text-center mb-16">
          <p className="text-caption text-terracotta mb-4">{t('rs.eyebrow')}</p>
          <h2
            className="text-display text-deep mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            {t('rs.h1')}
          </h2>
          <p className="text-lg text-deep/60 max-w-3xl mx-auto">
            {t('rs.subtitle')}
          </p>
        </header>

        {/* Key Takeaways Bar */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyTakeaways.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-deep/5 text-center hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-[10px] uppercase tracking-wider text-deep/40 mb-1">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-deep">{item.value}</p>
                <p className="text-[10px] text-deep/50">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="chapter-item">
                  <ChapterCard
                    chapter={chapter}
                    isExpanded={expandedChapter === chapter.id}
                    onToggle={() =>
                      setExpandedChapter(
                        expandedChapter === chapter.id ? '' : chapter.id
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="p-8 rounded-2xl bg-deep text-inverse">
                <p className="text-caption text-inverse/40 mb-4">
                  {t('rs.calorieTable')}
                </p>
                <h3
                  className="text-2xl mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {t('rs.calorieTitle')}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-inverse/10">
                        <th className="text-left py-2 pr-3 text-caption text-inverse/40">
                          {locale === 'ko' ? '성별' : 'Gender'}
                        </th>
                        <th className="text-left py-2 pr-3 text-caption text-inverse/40">
                          {locale === 'ko' ? '연령' : 'Age'}
                        </th>
                        <th className="text-right py-2 pr-3 text-caption text-inverse/40">
                          {locale === 'ko' ? '저활동' : 'Sedentary'}
                        </th>
                        <th className="text-right py-2 text-caption text-inverse/40">
                          {locale === 'ko' ? '활발함' : 'Active'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calorieData.map((row, i) => (
                        <tr key={i} className="border-b border-inverse/5">
                          <td className="py-2 pr-3 text-inverse/80">
                            {locale === 'ko'
                              ? row.gender === 'Female'
                                ? '여성'
                                : '남성'
                              : row.gender}
                          </td>
                          <td className="py-2 pr-3 text-inverse/60">{row.age}</td>
                          <td className="py-2 pr-3 text-right text-inverse/70">
                            {row.sedentary}
                          </td>
                          <td className="py-2 text-right font-medium text-terracotta">
                            {row.active}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <HealthyPlateDiagram />

              <div className="p-6 rounded-2xl bg-[#374640]/5 border border-[#374640]/10">
                <p className="text-sm text-deep/70 leading-relaxed">
                  <span className="font-semibold text-deep">
                    {t('common.source')}:
                  </span>{' '}
                  {locale === 'ko'
                    ? '건강한 영양 — 종합 가이드. WHO, NIH, 클리블랜드 클리닉, 하버드 헬스, 메이요 클리닉, 미국심장학회, 국립노화연구소(NIA) 자료를 바탕으로 정리.'
                    : 'Healthy Nutrition: A Comprehensive Guide to Eating Well. Research compiled from WHO, NIH, Cleveland Clinic, Harvard Health, Mayo Clinic, American Heart Association, and National Institute on Aging.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
