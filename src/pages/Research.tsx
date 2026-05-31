import ResearchSection from '../sections/ResearchSection';
import SEOHead from '@/components/SEOHead';
import { useLocale } from '@/lib/i18n';

export default function Research() {
  const [locale] = useLocale();
  const isKo = locale === 'ko';
  return (
    <>
      <SEOHead
        titleKey="rs.h1"
        descriptionKey="rs.subtitle"
        path="/research"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Key Findings — Evidence-Based Nutrition Research',
          description: 'Summaries of WHO, NIH, Harvard School of Public Health, AHA, and Mayo Clinic research on macros, micronutrients, fiber, omega-3, sugar, sodium, and hydration.',
          keywords: ['fiber', 'omega-3', 'added sugar', 'sodium', 'protein quality', 'hydration', 'healthy plate'],
          isAccessibleForFree: true,
        }}
        dateModified="2026-05-30"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: isKo ? '연구' : 'Research', path: '/research' }]}
      />
      <ResearchSection />
    </>
  );
}
