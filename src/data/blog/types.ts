/** Visual blocks rendered inside an article section. */
export type SectionBlock =
  | { kind: 'flow'; caption?: string; steps: { label: string; note?: string }[] }
  | { kind: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { kind: 'callout'; tone: 'key' | 'tip' | 'caution'; title?: string; body: string[] }
  | { kind: 'stats'; items: { value: string; label: string }[] };

export interface BlogSection {
  heading: string;
  /** Paragraphs may include inline links: [label](/path) */
  paragraphs: string[];
  bullets?: string[];
  /** Visual elements rendered after the paragraphs and bullets. */
  blocks?: SectionBlock[];
}

export interface BlogArticle {
  slug: string;
  seriesId: 'dopamine' | 'vitamins';
  episode: number;
  /** When set, shown instead of episode number (e.g. merged 2+4). */
  episodeLabel?: { en: string; ko: string };
  title: { en: string; ko: string };
  thesis: { en: string; ko: string };
  description: { en: string; ko: string };
  readMinutes: number;
  datePublished: string;
  relatedSlugs: string[];
  en: BlogSection[];
  ko: BlogSection[];
}
