import { Link } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import EditorialSection from '../sections/EditorialSection';
import SEOHead from '@/components/SEOHead';
import { useT, useLocale } from '@/lib/i18n';

interface Teaser {
  titleEn: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
  link: string;
  image: string;
  color: string;
}

const pageTeasers: Teaser[] = [
  {
    titleEn: 'The Big Six Nutrients',
    titleKo: '6대 필수 영양소',
    descriptionEn: 'Explore carbohydrates, proteins, fats, vitamins, minerals, and water. Understand their functions, sources, and daily requirements.',
    descriptionKo: '탄수화물·단백질·지방·비타민·미네랄·물 — 기능, 공급원, 권장 섭취량을 한눈에 살펴보세요.',
    link: '/nutrients',
    image: '/images/nutrient-salmon.jpg',
    color: '#4a7c59',
  },
  {
    titleEn: 'Food Label Analyzer',
    titleKo: '영양 라벨 분석기',
    descriptionEn: 'Upload a nutrition label, take a photo, or enter values manually. Get an instant health score, analysis, and healthier alternatives.',
    descriptionKo: '라벨을 업로드하거나 사진을 찍거나 직접 입력하세요. 즉시 건강 점수, 분석, 더 나은 대안을 보여드립니다.',
    link: '/analyzer',
    image: '/images/editorial-avocado.jpg',
    color: '#d95c39',
  },
  {
    titleEn: 'Research & Guidelines',
    titleKo: '연구와 가이드라인',
    descriptionEn: 'Evidence-based findings from WHO, NIH, and Harvard. Daily calorie tables, the Healthy Plate Method, and key nutrition chapters.',
    descriptionKo: 'WHO·NIH·하버드의 근거 기반 자료. 칼로리 표, 헬시 플레이트, 핵심 영양 주제를 정리했습니다.',
    link: '/research',
    image: '/images/editorial-greens.jpg',
    color: '#374640',
  },
  {
    titleEn: 'Good vs Harmful',
    titleKo: '좋은 음식 vs 해로운 음식',
    descriptionEn: 'Compare beneficial nutrients against harmful ones. See fiber benefits, and understand which foods to prioritize or avoid.',
    descriptionKo: '식품 두 개를 나란히 비교하세요. 식이섬유의 효능과 어떤 음식을 우선·회피해야 할지 알 수 있습니다.',
    link: '/compare',
    image: '/images/nutrient-fruits.jpg',
    color: '#c9a96e',
  },
];

export default function Home() {
  const t = useT();
  const [locale] = useLocale();
  const isKo = locale === 'ko';
  return (
    <div>
      <SEOHead
        path="/"
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'VITAL — Nutrition Intelligence',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
          featureList: [
            'AI-assisted nutrition label scoring',
            'Personalized RDA targets',
            'Daily meal logger',
            'Side-by-side food comparison',
            'Nutrient encyclopedia (carbs, protein, fat, vitamins, minerals, water)',
            'Amino acid reference and BCAA calculator',
            'Special-population guidance (pregnancy, lactation, seniors, athletes, vegan)',
          ],
        }}
      />
      <HeroSection />
      <EditorialSection />

      {/* Page Teasers */}
      <section className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
        <div className="max-w-[1400px] mx-auto">
          <header className="text-center mb-16">
            <p className="text-caption text-terracotta mb-4">{isKo ? '둘러보기' : 'Explore'}</p>
            <h2
              className="text-deep mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              {isKo ? '무엇을 먼저 살펴볼까요?' : 'What would you like to learn?'}
            </h2>
            <p className="text-lg text-deep/60 max-w-2xl mx-auto">
              {isKo
                ? '아래 섹션에서 관심 있는 주제로 바로 이동할 수 있습니다. 상단 메뉴에서 언제든 다시 돌아올 수 있어요.'
                : 'Click any section below to dive into a specific topic. Come back anytime through the navigation menu.'}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageTeasers.map((teaser) => {
              const title = isKo ? teaser.titleKo : teaser.titleEn;
              const description = isKo ? teaser.descriptionKo : teaser.descriptionEn;
              return (
                <Link
                  key={teaser.link}
                  to={teaser.link}
                  className="group relative rounded-2xl overflow-hidden border border-deep/5 hover:shadow-xl transition-all duration-500"
                  style={{ backgroundColor: '#fff' }}
                >
                  <article className="flex flex-col sm:flex-row h-full">
                    <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                      <img
                        src={teaser.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to right, ${teaser.color}30, transparent)` }}
                      />
                    </div>
                    <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teaser.color }} />
                        <span className="text-caption text-deep/40">{isKo ? '더 보기' : 'Read More'}</span>
                      </div>
                      <h3
                        className="text-xl text-deep mb-3 group-hover:text-terracotta transition-colors"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm text-deep/60 leading-relaxed mb-4">
                        {description}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
                        style={{ color: teaser.color }}
                      >
                        {t('nutrients.explore')}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
