import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileSheet from './ProfileSheet';
import SiteSearch from './SiteSearch';
import UserMenu from './UserMenu';
import { useT, useLocale, type Locale } from '@/lib/i18n';

const navLinkKeys = [
  { path: '/analyzer',    key: 'nav.analyzer' as const },
  { path: '/nutrients',   key: 'nav.nutrients' as const },
  { path: '/amino-acids', key: 'nav.amino' as const },
  { path: '/log',         key: 'nav.log' as const },
  { path: '/chat',        key: 'nav.chat' as const },
  { path: '/methodology', key: 'nav.methodology' as const },
  { path: '/research',    key: 'nav.research' as const },
  { path: '/compare',     key: 'nav.compare' as const },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locale, setLocale] = useLocale();
  const t = useT();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'rgba(246, 245, 241, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(32, 42, 38, 0.08)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wider text-deep"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              VITAL
            </Link>

            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navLinkKeys.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-deep text-inverse'
                        : 'text-deep/60 hover:text-deep hover:bg-deep/5'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-deep/10 hover:border-terracotta/40 hover:bg-terracotta/5 transition-all text-deep/60"
                title="Search (⌘K)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <span className="text-xs">{t('nav.search')}</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-deep/5 text-deep/40">⌘K</kbd>
              </button>

              <div className="flex items-center rounded-lg border border-deep/10 overflow-hidden text-[11px]">
                {(['en', 'ko'] as Locale[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-2 py-1.5 transition-colors ${locale === l ? 'bg-deep text-inverse' : 'text-deep/60 hover:bg-deep/5'}`}
                    aria-pressed={locale === l}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <UserMenu />
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-deep/60 hover:text-deep hover:bg-deep/5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t px-6 py-3 space-y-1" style={{ borderColor: 'rgba(32, 42, 38, 0.08)' }}>
            {navLinkKeys.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-deep text-inverse'
                      : 'text-deep/60 hover:text-deep hover:bg-deep/5'
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <Link
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/chat'
                  ? 'bg-deep text-inverse'
                  : 'text-deep/60 hover:text-deep hover:bg-deep/5'
              }`}
            >
              {t('nav.chat')}
            </Link>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-xs text-deep/40">{t('language.label')}:</span>
              {(['en', 'ko'] as Locale[]).map(l => (
                <button key={l} onClick={() => setLocale(l)} className={`text-xs px-2 py-1 rounded ${locale === l ? 'bg-deep text-inverse' : 'bg-deep/5 text-deep/60'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <ProfileSheet open={profileOpen} onClose={() => setProfileOpen(false)} />
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
