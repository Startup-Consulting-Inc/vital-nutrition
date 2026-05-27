import { Link } from 'react-router-dom';
import { nutrients } from '@/data/nutrientDetails';
import { nutrientsKo } from '@/data/nutrientDetails.ko';
import { useLocale, useT } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import { useMemo } from 'react';

export default function Nutrients() {
  const [locale] = useLocale();
  const t = useT();

  const localized = useMemo(
    () =>
      nutrients.map(n => {
        if (locale !== 'ko') return n;
        const ko = nutrientsKo[n.slug];
        return ko ? { ...n, name: ko.name ?? n.name, subtitle: ko.subtitle ?? n.subtitle } : n;
      }),
    [locale],
  );

  return (
    <>
      <SEOHead
        titleKey="nutrients.h1"
        descriptionKey="nutrients.subtitle"
        path="/nutrients"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: t('nutrients.h1'),
          description: t('nutrients.subtitle'),
          inLanguage: locale,
          hasPart: nutrients.map(n => ({
            '@type': 'CreativeWork',
            name: n.name,
            url: `/nutrients/${n.slug}`,
            about: n.subtitle,
          })),
        }}
      />
      <section className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
        <div className="max-w-[1100px] mx-auto">
          <header className="text-center mb-16">
            <p className="text-caption text-terracotta mb-4">{t('nutrients.eyebrow')}</p>
            <h1
              className="text-deep mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('nutrients.h1')}
            </h1>
            <p className="text-lg text-deep/60 max-w-2xl mx-auto">
              {t('nutrients.subtitle')}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localized.map((n) => (
              <Link
                key={n.slug}
                to={`/nutrients/${n.slug}`}
                className="group block p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(32, 42, 38, 0.06)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: n.bgLight, color: n.color }}
                  >
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-lg text-deep mb-1 transition-colors group-hover:text-terracotta"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {n.name}
                    </h2>
                    <p className="text-sm text-deep/50 mb-3">{n.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: n.bgLight, color: n.color }}>
                        {n.foodItems.length} {t('nutrients.foodSources')}
                      </span>
                      <span className="text-xs text-deep/30 group-hover:text-terracotta transition-colors flex items-center gap-1">
                        {t('nutrients.explore')}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <aside className="mt-16 p-8 rounded-2xl bg-deep text-white">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('nutrients.whyAll')}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
              {t('nutrients.whyBody')}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
