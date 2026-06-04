import type { BlogArticle } from './types';

export const sugarArticles: BlogArticle[] = [
  {
    slug: 'sugar-guide',
    seriesId: 'sugar',
    episode: 1,
    title: {
      en: 'Sugar: why sweetness matters, and what “healthy” actually means',
      ko: '당: 단맛이 왜 중요한지, “건강하게”의 뜻',
    },
    thesis: {
      en: 'Sugar is not one villain. Added sugars in drinks and ultra-processed snacks are the weakest case; whole fruit and balanced meals are a different conversation—and artificial sweeteners sit in between.',
      ko: '당은 악당 하나가 아니에요. 음료·초가공 스낵의 첨가당이 가장 약하고, 통과일·균형 끼니는 다른 이야기예요. 인공감미료는 그 사이에 있어요.',
    },
    description: {
      en: 'A hub on types of sugar, the eight-part series map, and links to carbs and dopamine primers.',
      ko: '당 종류, 8편 지도, 탄수·도파민 입문 링크.',
    },
    readMinutes: 9,
    datePublished: '2026-07-23',
    relatedSlugs: ['sugar-why-we-crave', 'sugar-healthy-approach', 'carbohydrates-added-sugar', 'dopamine-stimulants'],
    en: [
      {
        heading: 'Three buckets of “sugar”',
        paragraphs: [
          'Starch breaks into glucose over time. Table sugar is sucrose (glucose + fructose). Labels also list “added sugars” separate from lactose in plain milk or fructose in whole fruit.',
          'The [carbohydrates encyclopedia](/nutrients/carbohydrates) ranks sugar-sweetened beverages and pastries in the Avoid bucket. The carb series [added sugar](/blog/carbohydrates-added-sugar) piece is a quick primer; this series goes deeper on craving, sweeteners, and a sane everyday approach.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: 'The one line to keep',
            body: [
              'Target liquid and added sugar first. Fruit, festivals, and one dessert are not the same problem as a daily soda habit.',
            ],
          },
        ],
      },
      {
        heading: 'Why this series exists',
        paragraphs: [
          'People talk about sugar for four reasons at once: pleasure, weight, diabetes fear, and “zero sugar” marketing. Splitting those threads stops you from banning apples because you fear Coke.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Where to go next',
            headers: ['Part', 'Topic'],
            rows: [
              ['Part 2', '[Why we crave sweetness](/blog/sugar-why-we-crave)'],
              ['Part 3', '[Sugar and health](/blog/sugar-and-health)'],
              ['Part 4', '[Added vs fruit & juice](/blog/sugar-added-natural-fruit)'],
              ['Part 5', '[Artificial sweeteners](/blog/sugar-artificial-sweeteners)'],
              ['Part 8', '[Everyday drinks: US patterns](/blog/sugar-everyday-drinks)'],
              ['Dopamine', '[Stimulants & reward](/blog/dopamine-stimulants)'],
            ],
          },
        ],
      },
    ],
    ko: [
      {
        heading: '“당” 세 바구니',
        paragraphs: [
          '전분은 시간을 두고 포도당으로 풀려요. 설탕은 자당+과당(자당). 라벨은 우유 유당·과일 과당과 “첨가당”을 나눠 적어요.',
          '[탄수화물 백과](/nutrients/carbohydrates)는 당음료·과자를 피하기에 넣었어요. 탄수 [첨가당](/blog/carbohydrates-added-sugar) 편이 짧은 입문이고, 여기서는 당김·감미료·일상 절충을 더 깊게 다뤄요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'key',
            title: '한 줄만 기억한다면',
            body: [
              '액체·첨가당을 먼저 줄이세요. 과일·명절·디저트 한 번은 매일 소다 습관과 같지 않아요.',
            ],
          },
        ],
      },
      {
        heading: '왜 이 시리즈가 있는지',
        paragraphs: [
          '단맛 이야기는 쾌락·체중·당뇨 공포·“제로” 마케팅이 한꺼번에 섞여요. 실을 나누면 콜라 때문에 사과까지 끊지 않게 돼요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '다음 글',
            headers: ['편', '주제'],
            rows: [
              ['2편', '[왜 단맛에 끌리나](/blog/sugar-why-we-crave)'],
              ['3편', '[당과 건강](/blog/sugar-and-health)'],
              ['4편', '[첨가당·과일·주스](/blog/sugar-added-natural-fruit)'],
              ['5편', '[인공감미료](/blog/sugar-artificial-sweeteners)'],
              ['8편', '[한국 음료 패턴](/blog/sugar-everyday-drinks)'],
              ['도파민', '[자극제·보상](/blog/dopamine-stimulants)'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'sugar-why-we-crave',
    seriesId: 'sugar',
    episode: 2,
    title: {
      en: 'Why humans love sugar—and why willpower is the wrong tool',
      ko: '사람은 왜 단맛을 좋아할까—의지력만으로는 안 되는 이유',
    },
    thesis: {
      en: 'Sweet taste signaled safe calories for most of human history. Modern ultra-processed foods hijack that signal with sugar + fat + salt combos that train craving faster than fruit ever did.',
      ko: '오랫동안 단맛은 안전한 칼로리 신호였어요. 지금은 설탕+지방+소금 초가공이 과일보다 빨리 당김을 가르쳐요.',
    },
    description: {
      en: 'Evolution, brain reward, dopamine overlap, and culture—not moral failure.',
      ko: '진화·뇌 보상·도파민·문화—도덕 문제가 아님.',
    },
    readMinutes: 8,
    datePublished: '2026-07-24',
    relatedSlugs: ['sugar-guide', 'dopamine-stimulants', 'sugar-healthy-approach', 'sugar-zero-labels'],
    en: [
      {
        heading: 'Biology in one minute',
        paragraphs: [
          'Sweet receptors fire; the brain tags the experience as rewarding. Breast milk is slightly sweet—sweetness meant survival, not weakness.',
          'The spike-crash-crave loop from soda is behavioral chemistry: fast glucose in, insulin up, crash, search for the next hit. That story is detailed in [dopamine stimulants](/blog/dopamine-stimulants); here we focus on why the loop sticks.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Ultra-processed combo',
            steps: [
              { label: 'Sugar', note: 'fast reward signal' },
              { label: 'Fat + salt', note: 'learned “hyperpalatable” mix' },
              { label: 'Repeat', note: 'environment beats willpower' },
            ],
          },
        ],
      },
      {
        heading: 'Culture and timing',
        paragraphs: [
          'Sleep debt, stress, and skipping protein at lunch all make 4 p.m. cookies more likely—not because you “lack discipline.”',
          'Holidays and birthdays are social sugar. The goal is a default low-liquid-sugar week, not zero joy.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Swap the cue',
            body: [
              'Same time, different reward: sparkling water with citrus, yogurt with berries, or a walk before the vending machine.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Name your top three sugar sources (often drinks). Fix one before banning dessert forever.',
          'Next: [everyday drinks](/blog/sugar-everyday-drinks).',
        ],
      },
    ],
    ko: [
      {
        heading: '생물학 1분',
        paragraphs: [
          '단맛 수용체가 켜지고 뇌는 보상으로 기록해요. 모유도 약간 달아요—단맛은 나약함이 아니라 생존 신호였어요.',
          '소다의 올랐다-추락-당김 루프는 [도파민 자극제](/blog/dopamine-stimulants)에서 자세히, 여기선 왜 고착되는지만 볼게요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '초가공 조합',
            steps: [
              { label: '설탕', note: '빠른 보상' },
              { label: '지방+소금', note: '과자·라면 맛' },
              { label: '반복', note: '환경이 의지 이김' },
            ],
          },
        ],
      },
      {
        heading: '문화·타이밍',
        paragraphs: [
          '잠 부족·스트레스·점심 단백질 스킵이 오후 과자를 부르죠—의지 부족이 아니에요.',
          '명절·생일은 사회적 단맛. 목표는 평소 액체당 낮추기지 기쁨 0이 아니에요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '신호 바꾸기',
            body: [
              '같은 시간, 다른 보상: 탄산수+레몬, 요거트+베리, 자판기 전에 5분 걷기.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '당 소스 TOP3(보통 음료) 적어 보세요. 디저트 영구 금지 전에 하나만.',
          '다음: [일상 음료](/blog/sugar-everyday-drinks).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-and-health',
    seriesId: 'sugar',
    episode: 3,
    title: {
      en: 'Sugar and health: heart, liver, teeth, and the 10% line',
      ko: '당과 건강: 심장·간·치아·10% 선',
    },
    thesis: {
      en: 'High added-sugar patterns raise risk for weight gain, fatty liver, cavities, and type 2 diabetes over years—not from one slice of cake. WHO suggests under 10% of calories from added sugar, with 5% as a better target.',
      ko: '첨가당 패턴이 몇 년에 걸쳐 체중·지방간·충치·제2형 당뇨 위험을 올려요—케이크 한 조각이 아니에요. WHO는 첨가당 칼로리 10% 미만, 5%가 더 낫다고 해요.',
    },
    description: {
      en: 'Metabolic and dental impacts without fear-mongering fruit.',
      ko: '대사·치아, 과일 공포 없이.',
    },
    readMinutes: 8,
    datePublished: '2026-07-25',
    relatedSlugs: ['sugar-guide', 'carbohydrates-added-sugar', 'sugar-added-natural-fruit', 'carbohydrates-blood-sugar-pairs'],
    en: [
      {
        heading: 'What the evidence actually targets',
        paragraphs: [
          'Large reviews link sugar-sweetened beverages to higher type 2 diabetes and cardiovascular risk. The signal is strongest for liquid sugar and frequent ultra-processed snacks—not occasional homemade dessert.',
          'Diabetes management is individual: medication, activity, and total carb quality matter. This blog does not replace your care team.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<10%', label: 'WHO added sugar calories' },
              { value: '~50 g', label: '10% on 2,000 kcal' },
              { value: '~25 g', label: '5% “better” target' },
            ],
          },
        ],
      },
      {
        heading: 'Liver, teeth, and weight',
        paragraphs: [
          'Fructose from added sugar (not whole fruit context) can contribute to liver fat when calories are surplus. Cavities track frequency of sticky sweets and sipping sweet drinks.',
          'Pairing sweets with meals and brushing beats grazing candy all afternoon.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Risk scales with pattern',
            headers: ['Pattern', 'Risk level', 'Fix direction'],
            rows: [
              ['Daily soda', 'High', 'Default to water'],
              ['Weekly dessert', 'Context', 'Portion + protein/fiber meal'],
              ['Whole fruit', 'Different bucket', 'See Part 4'],
              ['Sports drink sedentary', 'Misplaced', 'Water unless intense exercise'],
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Log seven days in the [Analyzer](/analyzer). Cut one drink before overhauling every recipe.',
          'Next: [added vs fruit](/blog/sugar-added-natural-fruit).',
        ],
      },
    ],
    ko: [
      {
        heading: '근거가 겨냥하는 것',
        paragraphs: [
          '당음료는 제2형 당뇨·심혈관 위험과 강하게 연결돼요. 신호는 액체당·잦은 초가공이지 가끔 만든 디저트가 아니에요.',
          '당뇨 관리는 개인별이에요—약·활동·탄수 질. 이 블로그는 진료 대체가 아니에요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '<10%', label: 'WHO 첨가당 칼로리' },
              { value: '~50g', label: '2,000kcal의 10%' },
              { value: '~25g', label: '5% “더 낫다”' },
            ],
          },
        ],
      },
      {
        heading: '간·치아·체중',
        paragraphs: [
          '첨가 과당(과일 맥락 아님)은 칼로리 잉여일 때 지방간에 기여할 수 있어요. 충치는 끈적 단 간식·달콤 음료 자주 마시기와 연결돼요.',
          '단 것은 끼니와 함께, 양치—오후 내내 사탕 깨물기보다 나아요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '패턴이 위험을 키움',
            headers: ['패턴', '위험', '방향'],
            rows: [
              ['매일 소다', '높음', '물 기본값'],
              ['주간 디저트', '맥락', '양+단백·섬유 끼니'],
              ['통과일', '다른 바구니', '4편'],
              ['앉아서 스포츠음료', '엇갈림', '강한 운동만'],
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '[분석기](/analyzer)에 7일. 레시피 전부 바꾸기 전 음료 하나.',
          '다음: [첨가·과일](/blog/sugar-added-natural-fruit).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-added-natural-fruit',
    seriesId: 'sugar',
    episode: 4,
    title: {
      en: 'Added sugar vs fruit, honey, and why juice is not a virtue',
      ko: '첨가당 vs 과일·꿀—주스가 과일 대용이 아닌 이유',
    },
    thesis: {
      en: 'Whole fruit delivers fiber and water with fructose; juice and syrup concentrate the sugar and drop the brake. Honey is still added sugar on labels—even when “natural.”',
      ko: '통과일은 섬유·수분과 과당, 주스·시럽은 브레이크 없이 당만 촘촘해요. 꿀도 라벨엔 첨가당이에요—“천연”이어도.',
    },
    description: {
      en: 'Label reading, juice traps, and the fruit-fear myth.',
      ko: '라벨, 주스 함정, 과일 공포.',
    },
    readMinutes: 8,
    datePublished: '2026-07-26',
    relatedSlugs: ['sugar-guide', 'fiber-myths-faq', 'carbohydrates-added-sugar', 'sugar-and-health'],
    en: [
      {
        heading: 'Whole fruit is not soda',
        paragraphs: [
          'An apple’s ~4 g fiber slows absorption; polyphenols ride along. Apple juice removes fiber and is easy to over-drink.',
          'If you fear fruit but drink sweet coffee, fix the drink first. More in [fiber myths](/blog/fiber-myths-faq).',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Same word, different food',
            headers: ['Source', 'Fiber', 'Typical problem'],
            rows: [
              ['Whole orange', 'Yes', 'Portion still matters'],
              ['Orange juice', 'Stripped', 'Large glass = many oranges'],
              ['Smoothie shop', 'Maybe', 'Often juice + syrup'],
              ['Candy', 'No', 'Pure added sugar'],
            ],
          },
        ],
      },
      {
        heading: 'Honey, agave, coconut sugar',
        paragraphs: [
          'They are still sugars on the Added Sugars line. Trace minerals do not erase the gram count.',
          'Lactose in plain milk is not “added”—flavored milk with syrup is.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '“No refined sugar” cookies',
            body: [
              'Coconut sugar or date syrup can still pile 20+ g per serving. Read grams, not adjectives.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Default fruit: whole, with meals. Treat juice like dessert portions.',
          'Next: [artificial sweeteners](/blog/sugar-artificial-sweeteners).',
        ],
      },
    ],
    ko: [
      {
        heading: '통과일≠소다',
        paragraphs: [
          '사과 섬유 ~4g이 흡수를 늦추고 폴리페놀도 와요. 주스는 섬유가 빠지고 많이 마시기 쉬워요.',
          '과일은 피하고 달콤 커피만 마시면 음료부터. [섬유 오해](/blog/fiber-myths-faq)도 참고.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '같은 당, 다른 음식',
            headers: ['출처', '섬유', '문제'],
            rows: [
              ['귤 통째', '있음', '양은 여전히'],
              ['귤 주스', '없음', '한 잔=여러 개'],
              ['스무디', '가끔', '시럽+주스'],
              ['사탕', '없음', '첨가당만'],
            ],
          },
        ],
      },
      {
        heading: '꿀·애사비·코코넛슈가',
        paragraphs: [
          '라벨 “첨가당”에 들어가요. 미량 미네랄이 g을 없애진 않아요.',
          '플레인 우유 유당은 첨가가 아니에요—시럽 넣은 우유는 첨가.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '“정제설탕 무첨가” 쿠키',
            body: [
              '코코넛슈가·대추시럽도 한 번에 20g+일 수 있어요. 형용사 말고 g을 보세요.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '과일은 통째, 끼니와 함께. 주스는 디저트 양으로.',
          '다음: [인공감미료](/blog/sugar-artificial-sweeteners).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-artificial-sweeteners',
    seriesId: 'sugar',
    episode: 5,
    title: {
      en: 'Artificial sweeteners: aspartame, stevia, and the “safe enough” frame',
      ko: '인공감미료: 아스파탐·스테비아—“안전하다”의 올바른 말',
    },
    thesis: {
      en: 'FDA- and EFSA-approved sweeteners are safe at approved intakes for most people, but “unlimited diet soda” is not a health strategy—gut, appetite, and sweet-habit research are still evolving.',
      ko: '승인 감미료는 허용 섭취량 안에서 대부분 안전하지만, 다이어트 소다 무한은 건강 전략이 아니에요—장·식욕·단맛 습관 연구는 진행 중이에요.',
    },
    description: {
      en: 'Aspartame, sucralose, stevia, allulose—benefits and limits without panic or hype.',
      ko: '아스파탐·수크랄로스·스테비아·알룰로스—공포·과장 없이.',
    },
    readMinutes: 9,
    datePublished: '2026-07-27',
    relatedSlugs: ['sugar-zero-labels', 'sugar-guide', 'sugar-healthy-approach', 'fiber-supplements-labels'],
    en: [
      {
        heading: 'What regulators actually say',
        paragraphs: [
          'Aspartame, sucralose, acesulfame-K, saccharin, and stevia extracts have acceptable daily intake limits set by FDA/EFSA. Headlines that call them “toxic” usually ignore dose.',
          'That does not mean they improve diet quality automatically—only that they replace sugar calories in the product.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Common sweeteners',
            headers: ['Sweetener', 'Used in', 'Note'],
            rows: [
              ['Aspartame', 'Diet soda, gum', 'Breaks down with heat—baking poor fit'],
              ['Sucralose', 'Zero drinks, yogurt', 'Heat-stable'],
              ['Stevia / reb A', '“Natural” drinks', 'Aftertaste for some'],
              ['Allulose', 'Keto bars', 'Low calories, still sweet habit'],
            ],
          },
        ],
      },
      {
        heading: 'Open questions (honest)',
        paragraphs: [
          'Some studies suggest heavy diet-soda use may correlate with metabolic issues—confounding is huge (people who switch often already have weight concerns). Gut microbiome shifts are being studied; not a reason to panic, not proof of harmlessness at any dose.',
          'Sweet taste without calories may keep “dessert brain” active for some people. If zero drinks lead to bigger late-night snacks, the swap failed.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Practical hierarchy',
            body: [
              'Water > unsweet tea > diet drink for habit break > sweet drink. Use sweeteners as a bridge, not a forever identity.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'If you drink 40 oz soda daily, diet soda for a month can be a step down—then sparkling water.',
          'Next: [zero labels](/blog/sugar-zero-labels).',
        ],
      },
    ],
    ko: [
      {
        heading: '규제가 말하는 것',
        paragraphs: [
          '아스파탐·수크랄로스·아세설팜·사크린·스테비아 추출물은 FDA/EFSA 일일 허용량이 있어요. “독” 헤드라인은 용량을 빼는 경우가 많아요.',
          '그래서 식단 질이 자동으로 좋아지진 않아요—제품 속 설탕 칼로리만 바꿀 뿐이에요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '흔한 감미료',
            headers: ['감미료', '쓰임', '메모'],
            rows: [
              ['아스파탐', '다이어트 소다, 껌', '가열 불안정'],
              ['수크랄로스', '제로 음료', '가열 OK'],
              ['스테비아', '내추럴 음료', '뒷맛 호불호'],
              ['알룰로스', '케토 바', '칼로리↓, 단맛 습관은 유지'],
            ],
          },
        ],
      },
      {
        heading: '열린 질문(솔직히)',
        paragraphs: [
          '다이어트 소다 많이 마시는 사람과 대사 문제 상관 연구는 있지만—이미 체중 걱정 있는 사람이 바꾸는 경우가 많아 혼란 변수가 커요. 장내 미생물 변화는 연구 중, 공포·무한 안전 둘 다 과장 금지.',
          '칼로리 없는 단맛이 “디저트 뇌”를 켜 두면, 밤에 더 큰 간식으로 이어질 수 있어요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '실전 순서',
            body: [
              '물 > 무가당 차 > 다이어트 음료(임시) > 단 음료. 감미료는 다리, 평생 정체성 아님.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '소다 하루 1.2L면 한 달 다이어트 소다→그다음 탄산수도 괜찮은 단계예요.',
          '다음: [제로 라벨](/blog/sugar-zero-labels).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-zero-labels',
    seriesId: 'sugar',
    episode: 6,
    title: {
      en: 'Zero sugar, no added sugar, and sugar alcohol bars',
      ko: '제로·무첨가당·당알코올 바 라벨 읽기',
    },
    thesis: {
      en: '“Zero sugar” often means sweeteners plus sugar alcohols—not virtue. “No added sugar” can still be concentrated date paste. Net-carb math does not erase gut effects.',
      ko: '“제로”는 감미료+당알코올인 경우가 많아요. “무첨가”도 대추즙 농축일 수 있어요. 순탄수 계산이 장 반응을 없애진 않아요.',
    },
    description: {
      en: 'Marketing phrases decoded for US-style labels.',
      ko: '마케팅 문구 해독.',
    },
    readMinutes: 8,
    datePublished: '2026-07-28',
    relatedSlugs: ['sugar-artificial-sweeteners', 'fiber-supplements-labels', 'protein-labels-processed', 'sugar-guide'],
    en: [
      {
        heading: 'Phrase decoder',
        paragraphs: [
          'Sugar-free: less than 0.5 g sugar per serving (US)—may still have sugar alcohols. No added sugar: no sucrose/h syrup; fruit juice concentrate may still count as added in spirit.',
          'Keto net carbs subtract fiber and sugar alcohols; erythritol bothers fewer guts than maltitol, which can spike glucose in some people.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'Label vs reality',
            headers: ['Claim', 'Often means', 'Check'],
            rows: [
              ['Zero sugar', 'Sweeteners + polyols', 'Total carbs, sugar alcohol line'],
              ['No added sugar', 'Date paste, juice concentrate', 'Grams per bar'],
              ['Keto cookie', 'Almond flour + erythritol', 'Portion = 2 cookies?'],
              ['Protein bar 20g', '15g sugar alcohol', 'Bloating risk'],
            ],
          },
        ],
      },
      {
        heading: 'Overlap with protein and fiber marketing',
        paragraphs: [
          'High-protein, high-fiber bars can still train dessert eating. See [protein labels](/blog/protein-labels-processed) and [fiber supplements](/blog/fiber-supplements-labels).',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Sugar alcohol warning',
            body: [
              'Maltitol syrup in “sugar-free” chocolate can cause gas and raise blood sugar in sensitive people—read the specific polyol.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'One rule: if the product tastes like dessert, treat the portion like dessert—even with zero on the front.',
          'Next: [healthy approach](/blog/sugar-healthy-approach).',
        ],
      },
    ],
    ko: [
      {
        heading: '문구 해독',
        paragraphs: [
          '무설탕: 1회 제공당 설탕 0.5g 미만(미국)—당알코올은 있을 수 있어요. 무첨가당: 설탕/물엿 없음, 과일 농축액은 실질 첨가당에 가깝게 봐요.',
          '케토 순탄수는 섬유·당알코올을 뺌. 에리스리톨은 말티톨보다 배 덜 아픈 편, 말티톨은 혈당 오르는 사람도 있어요.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '라벨 vs 현실',
            headers: ['표시', '실제', '확인'],
            rows: [
              ['제로', '감미료+폴리올', '총 탄수·당알코올'],
              ['무첨가', '대추·과즙 농축', '한 봉 g'],
              ['케토 쿠키', '아몬드+에리스리톨', '1회=2개?'],
              ['단백 20g', '당알코올 15g', '복부 팽만'],
            ],
          },
        ],
      },
      {
        heading: '단백·섬유 마케팅과 겹침',
        paragraphs: [
          '고단백·고섬유 바도 디저트 습관을 가르쳐요. [단백 라벨](/blog/protein-labels-processed), [섬유 보충](/blog/fiber-supplements-labels) 참고.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: '당알코올 주의',
            body: [
              '“무설탕” 초콜릿의 말티톨 시럽은 가스·혈당 반응—어떤 폴리올인지 확인.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '맛이 디저트면 앞면 제로여도 디저트 양으로.',
          '다음: [건강한 접근](/blog/sugar-healthy-approach).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-healthy-approach',
    seriesId: 'sugar',
    episode: 7,
    title: {
      en: 'A healthy relationship with sugar: defaults, exceptions, and pairing',
      ko: '당과 건강한 관계: 기본값·예외·짝짓기',
    },
    thesis: {
      en: 'Health is not zero sugar forever. It is a clear default (unsweet drinks, mostly whole food) with room for birthdays—and meals that pair sweets with protein, fat, and fiber so crashes do not drive the next craving.',
      ko: '건강은 영원한 무설탕이 아니에요. 무가당 음료·통째 식품이 기본이고 생일은 남기되, 단 것은 단백·지방·섬유와 짝지어 추락 당김을 줄이는 거예요.',
    },
    description: {
      en: '80/20 framing, one-drink rules, Analyzer habit, and holiday reality.',
      ko: '80/20, 음료 한 규칙, 분석기, 명절 현실.',
    },
    readMinutes: 9,
    datePublished: '2026-07-29',
    relatedSlugs: ['sugar-guide', 'carbohydrates-blood-sugar-pairs', 'fiber-how-much', 'sugar-everyday-drinks'],
    en: [
      {
        heading: 'Defaults beat declarations',
        paragraphs: [
          'Declare “no sugar ever” and you may last ten days, then binge. Declare “no sweet drinks by default” and you can keep Thanksgiving pie.',
          'The [blood-sugar pairing](/blog/carbohydrates-blood-sugar-pairs) carb article is the mechanical how-to; this is the mindset.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: 'Weekly default stack',
            steps: [
              { label: 'Drinks', note: 'water / unsweet tea / coffee' },
              { label: 'Snacks', note: 'fruit, nuts, yogurt—not vending machine' },
              { label: 'Meals', note: 'half plate plants + protein' },
              { label: 'Exceptions', note: 'planned, portioned, enjoyed' },
            ],
          },
        ],
      },
      {
        heading: 'One habit that moves most people',
        paragraphs: [
          'Replace the largest liquid sugar source first—soda, sweet coffee, energy drinks. That alone often clears 30–80 g/day.',
          'Log before and after in the [Analyzer](/analyzer). Pair remaining sweets with [fiber](/blog/fiber-how-much) and protein so the spike-softening is real, not symbolic.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '1', label: 'drink swap to start' },
              { value: '7 days', label: 'log before big rules' },
              { value: '80/20', label: 'whole week > one perfect day' },
            ],
          },
        ],
      },
      {
        heading: 'Series close',
        paragraphs: [
          'Start at [sugar guide](/blog/sugar-guide) if you want the map. Craving science: [why we crave](/blog/sugar-why-we-crave).',
          'Encyclopedia: [carbohydrates](/nutrients/carbohydrates).',
        ],
      },
    ],
    ko: [
      {
        heading: '선언보다 기본값',
        paragraphs: [
          '“설탕 영원히 끊기”는 10일 버티고 폭식으로 가기 쉬워요. “달콤 음료는 기본 무가당”은 추석 떡은 남길 수 있어요.',
          '기계적 짝짓기는 [혈당 짝](/blog/carbohydrates-blood-sugar-pairs), 여기선 마음가짐이에요.',
        ],
        blocks: [
          {
            kind: 'flow',
            caption: '주간 기본 스택',
            steps: [
              { label: '음료', note: '물·무가당 차·커피' },
              { label: '간식', note: '과일·견과·요거트' },
              { label: '끼니', note: '채소 반+단백' },
              { label: '예외', note: '계획·양·즐기기' },
            ],
          },
        ],
      },
      {
        heading: '가장 효과 큰 습관 하나',
        paragraphs: [
          '액체당이 제일 큰 소스부터—탄산, 달콤 커피, 에너지음료. 하루 30–80g이 빠지는 경우가 많아요.',
          '전후 [분석기](/analyzer). 남는 단 것은 [섬유](/blog/fiber-how-much)·단백과 짝지어 추락을 줄이세요.',
        ],
        blocks: [
          {
            kind: 'stats',
            items: [
              { value: '1개', label: '먼저 바꿀 음료' },
              { value: '7일', label: '큰 규칙 전 기록' },
              { value: '80/20', label: '완벽 하루 < 꾸준한 주' },
            ],
          },
        ],
      },
      {
        heading: '마무리',
        paragraphs: [
          '지도는 [당 허브](/blog/sugar-guide). 당김 과학은 [왜 끌리나](/blog/sugar-why-we-crave).',
          '백과: [탄수화물](/nutrients/carbohydrates).',
        ],
      },
    ],
  },
  {
    slug: 'sugar-everyday-drinks',
    seriesId: 'sugar',
    episode: 8,
    title: {
      en: 'Everyday sweet drinks: soda, coffee shop traps, and sports drinks',
      ko: '일상 달콤 음료: 탄산·카페·에너지·커피믹스',
    },
    thesis: {
      en: 'Liquid sugar is the highest-leverage cut in the US: soda, sweet coffee, and “hydration” drinks that are really candy. Swaps are boring and work.',
      ko: '한국에서도 액체당이 레버가 큼: 탄산·시럽 커피·에너지음료·커피믹스. 바꾸기는 재미없고 잘 먹혀요.',
    },
    description: {
      en: 'US drink map and gram traps.',
      ko: '한국 음료 지도와 g 함정.',
    },
    readMinutes: 9,
    datePublished: '2026-07-30',
    relatedSlugs: ['sugar-guide', 'carbohydrates-added-sugar', 'sugar-healthy-approach', 'sugar-zero-labels'],
    en: [
      {
        heading: 'US drink patterns that stack sugar',
        paragraphs: [
          'A 12 oz soda is ~39 g sugar. Large sweet coffee drinks can exceed 50 g before lunch. Sedentary days do not need sports drinks.',
          'Diet drinks can be a downgrade step—see [artificial sweeteners](/blog/sugar-artificial-sweeteners)—but water is the endgame default.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: 'US swaps',
            headers: ['Drink', 'Sugar hit', 'Swap'],
            rows: [
              ['Soda (12 oz)', '~39 g', 'Sparkling water + lime'],
              ['Sweet latte (large)', '30–60 g', 'Milk + espresso, no syrup'],
              ['Sweet tea (16 oz)', '20–40 g', 'Unsweet + lemon'],
              ['Sports drink (sedentary)', '14–34 g', 'Water'],
            ],
          },
        ],
      },
      {
        heading: 'Coffee shop math',
        paragraphs: [
          'Syrups are measured in pumps—not visible like a candy bar. One pump can be 5–10 g sugar; four pumps in a large cup is a dessert.',
          'The [Analyzer](/analyzer) catches “I only had coffee” weeks that are secretly 200 g added sugar.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: 'Order script',
            body: [
              '“One pump” or “unsweet, add cinnamon.” Half sweet is still sweet.',
            ],
          },
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Pick one drink to change for 14 days. Notice sleep and afternoon cravings.',
          'Back to [healthy approach](/blog/sugar-healthy-approach).',
        ],
      },
    ],
    ko: [
      {
        heading: '한국에서 쌓이는 음료당',
        paragraphs: [
          '탄산·에너지음료는 캔당 30–40g+가 흔해요. 밀크티·시럽 커피는 양이 안 보여요. 앉아 있는 날 스포츠음료는 필요 없어요.',
          '제로 음료는 단계적 하향—[인공감미료](/blog/sugar-artificial-sweeteners)—물이 최종 기본값.',
        ],
        blocks: [
          {
            kind: 'table',
            caption: '한국 스왑',
            headers: ['음료', '당', '바꾸기'],
            rows: [
              ['탄산 355ml', '30–40g+', '탄산수·무가당차'],
              ['카페 시럽 음료', '30–50g', '라떼·시럽 0'],
              ['커피믹스 2잔', '10–20g', '블랙·우유 소량'],
              ['에너지음료', '높음', '물·커피 소량'],
            ],
          },
        ],
      },
      {
        heading: '카페·편의점 함정',
        paragraphs: [
          '편의점 커피·스무디는 라벨 g을 봐야 해요. “덜 달게”도 여전히 달아요.',
          '[분석기](/analyzer)에 “커피만” 일주일이 숨은 첨가당 200g을 잡아내기도 해요.',
        ],
        blocks: [
          {
            kind: 'callout',
            tone: 'tip',
            title: '주문 한 줄',
            body: [
              '“시럽 빼 주세요” “무가당, 시나몬 추가.” 반달달도 달달.',
            ],
          },
        ],
      },
      {
        heading: '실천',
        paragraphs: [
          '14일 동안 바꿀 음료 하나만. 잠·오후 당김 변화를 보세요.',
          '[건강한 접근](/blog/sugar-healthy-approach)으로.',
        ],
      },
    ],
  },
];
