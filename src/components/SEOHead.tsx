import { useEffect } from 'react';
import { useLocale, useT, type Translator } from '@/lib/i18n';

/**
 * Public site URL — used for canonical / OG / sitemap. Override at deploy time
 * via `VITE_SITE_URL`.
 */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL as string) || 'https://vital.nutrition';
export const SITE_NAME = 'VITAL — Nutrition Intelligence';
export const SITE_DESCRIPTION_EN =
  'Upload any food label, get a Health Index score, and find better alternatives. Nutrient encyclopedia, daily meal logger, and side-by-side compare backed by WHO, NIH, AHA, and Harvard research.';
export const SITE_DESCRIPTION_KO =
  '식품 라벨을 업로드하면 건강 점수와 더 나은 대안을 알려드립니다. WHO·NIH·AHA·하버드 연구를 기반으로 한 영양소 백과사전, 하루 식단 기록, 식품 비교 기능을 제공합니다.';

export interface SEOHeadProps {
  /** Pre-formatted strings (used when keys aren't enough — e.g. nutrient name). */
  title?: string;
  description?: string;
  /** i18n keys (preferred for static pages). */
  titleKey?: Parameters<Translator>[0];
  descriptionKey?: Parameters<Translator>[0];
  /** Path relative to the site root, used for canonical + OG URLs. */
  path?: string;
  type?: 'website' | 'article';
  /** Schema.org JSON-LD object (will be injected as a <script> tag). */
  jsonLd?: object | object[];
  /** Optional secondary JSON-LD blocks (FAQ, HowTo, etc.). */
  extraJsonLd?: object[];
  /** ISO 8601 date — injected into Article schemas and displayed as a freshness signal. */
  dateModified?: string;
  /** Breadcrumb trail for BreadcrumbList schema. */
  breadcrumb?: { name: string; path: string }[];
}

/**
 * Sets <title>, meta description, canonical link, OG and Twitter cards, and
 * an arbitrary list of JSON-LD schema blocks for the current route. Pure
 * effect-based — no extra dependency required.
 */
export default function SEOHead({
  title,
  description,
  titleKey,
  descriptionKey,
  path = '/',
  type = 'website',
  jsonLd,
  extraJsonLd,
  dateModified,
  breadcrumb,
}: SEOHeadProps) {
  const t = useT();
  const [locale] = useLocale();

  const finalTitle = (title ?? (titleKey ? t(titleKey) : SITE_NAME)).slice(0, 70);
  const finalDescription = (
    description ?? (descriptionKey ? t(descriptionKey) : locale === 'ko' ? SITE_DESCRIPTION_KO : SITE_DESCRIPTION_EN)
  ).replace(/\s+/g, ' ').slice(0, 240);

  const url = `${SITE_URL.replace(/\/$/, '')}${path}`;

  useEffect(() => {
    const head = document.head;
    document.title = finalTitle === SITE_NAME ? SITE_NAME : `${finalTitle} · VITAL`;
    document.documentElement.lang = locale;

    setMeta('name', 'description', finalDescription);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDescription);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', locale === 'ko' ? 'ko_KR' : 'en_US');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${SITE_URL.replace(/\/$/, '')}/icon-512.svg`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDescription);
    setMeta('name', 'twitter:image', `${SITE_URL.replace(/\/$/, '')}/icon-512.svg`);
    setMeta('name', 'robots', 'index,follow,max-image-preview:large');
    setMeta('name', 'theme-color', '#202a26');

    setLink('canonical', url);
    setLink('alternate', `${SITE_URL.replace(/\/$/, '')}${path}`, { hreflang: 'en' });
    setLink('alternate', `${SITE_URL.replace(/\/$/, '')}${path}`, { hreflang: 'ko' });
    setLink('alternate', `${SITE_URL.replace(/\/$/, '')}${path}`, { hreflang: 'x-default' });

    // JSON-LD
    const all: object[] = [];
    if (jsonLd) all.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    if (extraJsonLd) all.push(...extraJsonLd);

    // Inject dateModified into any existing Article schema
    if (dateModified) {
      for (const obj of all) {
        const record = obj as Record<string, unknown>;
        const t = record['@type'];
        const isArticle = t === 'Article' || (Array.isArray(t) && (t as string[]).includes('Article'));
        if (isArticle) {
          (record as Record<string, string>).dateModified = dateModified;
          if (!(record as Record<string, string>).datePublished) {
            (record as Record<string, string>).datePublished = dateModified;
          }
        }
      }
      // If type is article but no Article schema exists, add a minimal one
      if (type === 'article' && !all.some(obj => {
        const record = obj as Record<string, unknown>;
        const t = record['@type'];
        return t === 'Article' || (Array.isArray(t) && (t as string[]).includes('Article'));
      })) {
        all.push({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: finalTitle,
          description: finalDescription,
          url,
          datePublished: dateModified,
          dateModified,
          isAccessibleForFree: true,
        });
      }
    }

    // BreadcrumbList schema
    if (breadcrumb && breadcrumb.length > 0) {
      all.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: `${SITE_URL.replace(/\/$/, '')}${crumb.path}`,
        })),
      });
    }

    // Add a baseline WebSite + Organization on every page so AI crawlers
    // and rich-result tests find the brand context immediately.
    all.unshift({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: locale,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
    all.unshift({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VITAL',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.svg`,
      description: SITE_DESCRIPTION_EN,
    });

    // Replace previous JSON-LD blocks (if any).
    head.querySelectorAll('script[data-vital-jsonld]').forEach(s => s.remove());
    for (const obj of all) {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.dataset.vitalJsonld = '1';
      tag.text = JSON.stringify(obj);
      head.appendChild(tag);
    }

    return () => {
      head.querySelectorAll('script[data-vital-jsonld]').forEach(s => s.remove());
    };
  }, [finalTitle, finalDescription, type, url, locale, JSON.stringify(jsonLd), JSON.stringify(extraJsonLd)]);

  return null;
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  // hreflang variants need unique selectors
  const hreflangSel = attrs.hreflang ? `[hreflang="${attrs.hreflang}"]` : ':not([hreflang])';
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${hreflangSel}`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}
