import LabelAnalyzer from '../sections/LabelAnalyzer';
import SEOHead from '@/components/SEOHead';

export default function Analyzer() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to score a nutrition label with VITAL Analyzer',
    description: 'Upload a photo of any Nutrition Facts panel, choose a dietary profile, and receive a Health Index score plus better alternatives.',
    totalTime: 'PT1M',
    step: [
      { '@type': 'HowToStep', name: 'Upload or photograph the label', text: 'PNG/JPG up to 10 MB. Image is processed entirely in your browser.' },
      { '@type': 'HowToStep', name: 'Confirm OCR-detected values', text: 'Review and correct any flagged numbers before scoring.' },
      { '@type': 'HowToStep', name: 'Pick your dietary profile', text: 'Select General, Heart, Keto, High-Protein, Low-Sodium, or Diabetic to reweight the rules.' },
      { '@type': 'HowToStep', name: 'Read the Health Index, breakdown, and alternatives', text: 'See exactly which credits and penalties were applied and switch to a better option.' },
    ],
  };
  return (
    <>
      <SEOHead titleKey="an.h1" descriptionKey="an.subtitle" path="/analyzer" type="article" jsonLd={howToJsonLd} />
      <LabelAnalyzer />
    </>
  );
}
