import { Link } from 'react-router-dom';
import { useT, useLocale } from '@/lib/i18n';

const serviceLinks = [
  { href: 'https://www.clearlyreqs.com', label: 'Clearly', external: true },
  { href: 'https://www.ai-biz.app/', label: 'AX: Transforming business', external: true },
  { href: 'https://vitamin.ai-biz.app/', label: 'Vitamin Guide', external: true },
];

const legalLinks = [
  { path: '/privacy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms of Service' },
];

const aboutLinks = [
  { href: 'https://jsong.ai-biz.app/', label: 'About Me', external: true },
  { href: 'mailto:jsong@koreatous.com', label: 'Contact', external: true },
];

function FooterLinkColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-wider mb-3"
        style={{ color: 'rgba(246,245,241,0.3)' }}
      >
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function InternalLink({ path, label }: { path: string; label: string }) {
  return (
    <li>
      <Link
        to={path}
        className="text-sm transition-colors duration-200 hover:text-white"
        style={{ color: 'rgba(246,245,241,0.5)' }}
      >
        {label}
      </Link>
    </li>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm transition-colors duration-200 hover:text-white"
        style={{ color: 'rgba(246,245,241,0.5)' }}
      >
        {label}
      </a>
    </li>
  );
}

export default function FooterSection() {
  const t = useT();
  const [locale] = useLocale();
  return (
    <footer className="w-full py-10 px-6" style={{ backgroundColor: '#202a26' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* VITAL + tagline */}
          <div className="md:col-span-3 lg:col-span-2">
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

          {/* Services */}
          <FooterLinkColumn title="Services">
            {serviceLinks.map((link) => (
              <ExternalLink key={link.label} href={link.href} label={link.label} />
            ))}
            <ExternalLink
              href={locale === 'ko' ? 'https://ai-dev-ko.clearlyreqs.com/' : 'https://ai-dev.clearlyreqs.com/'}
              label="AI Development Guide book"
            />
            <ExternalLink
              href={`https://buildwithai.clearlyreqs.com/${locale === 'ko' ? 'ko' : 'en'}/`}
              label="Build with AI"
            />
          </FooterLinkColumn>

          {/* Legal */}
          <FooterLinkColumn title="Legal">
            {legalLinks.map((link) => (
              <InternalLink key={link.path} path={link.path} label={link.label} />
            ))}
          </FooterLinkColumn>

          {/* About */}
          <FooterLinkColumn title="About">
            {aboutLinks.map((link) => (
              <ExternalLink key={link.label} href={link.href} label={link.label} />
            ))}
          </FooterLinkColumn>
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
