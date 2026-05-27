import { Link } from 'react-router-dom';
import { useT } from '@/lib/i18n';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/analyzer', label: 'Label Analyzer' },
  { path: '/log', label: 'Daily Meal Log' },
  { path: '/compare', label: 'Compare Foods' },
  { path: '/nutrients', label: 'Nutrients' },
  { path: '/amino-acids', label: 'Amino Acids' },
  { path: '/special-populations', label: 'Special Populations' },
  { path: '/methodology', label: 'Scoring Methodology' },
  { path: '/research', label: 'Research' },
];

export default function FooterSection() {
  const t = useT();
  return (
    <footer className="w-full py-10 px-6" style={{ backgroundColor: '#202a26' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* VITAL + tagline */}
          <div className="md:col-span-2">
            <h2
              className="text-2xl mb-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#f6f5f1' }}
            >
              VITAL
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(246,245,241,0.5)' }}>
              {t('footer.tagline')}
            </p>
            <p className="text-xs" style={{ color: 'rgba(246,245,241,0.25)' }}>
              {t('footer.sources')}
            </p>
          </div>

          {/* Pages */}
          <div>
            <p
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: 'rgba(246,245,241,0.3)' }}
            >
              {t('footer.pages')}
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(246,245,241,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: 'rgba(246,245,241,0.08)' }}
        >
          <p className="text-xs max-w-md" style={{ color: 'rgba(246,245,241,0.4)' }}>
            {t('footer.disclaimer')}
          </p>
          <p className="text-xs" style={{ color: 'rgba(246,245,241,0.25)' }}>
            {t('footer.privacy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
