import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { BlogSection, SectionBlock } from '@/data/blogArticles';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith('/')) {
      parts.push(
        <Link key={`${match.index}-${label}`} to={href} className="text-terracotta hover:underline">
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`${match.index}-${label}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terracotta hover:underline"
        >
          {label}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

/** Tyrosine → L-DOPA → dopamine style pathway diagram. */
function FlowBlock({ steps, caption }: Extract<SectionBlock, { kind: 'flow' }>) {
  return (
    <figure className="my-7">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <div className="flex-1 rounded-xl bg-white border border-deep/10 px-4 py-3 text-center shadow-sm">
              <div className="font-semibold text-deep text-[15px]">{step.label}</div>
              {step.note && <div className="text-xs text-deep/50 mt-0.5">{step.note}</div>}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center text-terracotta font-bold px-2 py-1 select-none">
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {caption && <figcaption className="text-xs text-deep/50 mt-3 text-center">{caption}</figcaption>}
    </figure>
  );
}

function TableBlock({ headers, rows, caption }: Extract<SectionBlock, { kind: 'table' }>) {
  return (
    <figure className="my-7">
      <div className="overflow-x-auto rounded-xl border border-deep/10 bg-white">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="bg-deep/[0.04]">
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2.5 font-semibold text-deep border-b border-deep/10 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-deep/[0.06] last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2.5 align-top text-deep/75 leading-relaxed">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="text-xs text-deep/50 mt-3">{caption}</figcaption>}
    </figure>
  );
}

const CALLOUT_STYLES: Record<
  Extract<SectionBlock, { kind: 'callout' }>['tone'],
  { wrap: string; label: string; icon: string }
> = {
  key: { wrap: 'border-terracotta bg-terracotta/[0.06]', label: 'text-terracotta', icon: '★' },
  tip: { wrap: 'border-emerald-600/40 bg-emerald-50/60', label: 'text-emerald-700', icon: '💡' },
  caution: { wrap: 'border-amber-500/50 bg-amber-50/70', label: 'text-amber-700', icon: '⚠' },
};

function CalloutBlock({ tone, title, body }: Extract<SectionBlock, { kind: 'callout' }>) {
  const s = CALLOUT_STYLES[tone];
  return (
    <aside className={`my-7 rounded-r-xl border-l-4 px-5 py-4 ${s.wrap}`}>
      {title && (
        <p className={`text-sm font-semibold mb-1.5 flex items-center gap-2 ${s.label}`}>
          <span aria-hidden>{s.icon}</span>
          {title}
        </p>
      )}
      <div className="space-y-2 text-[14px] text-deep/80 leading-relaxed">
        {body.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
      </div>
    </aside>
  );
}

function StatsBlock({ items }: Extract<SectionBlock, { kind: 'stats' }>) {
  return (
    <div className={`my-7 grid gap-3 ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl bg-white border border-deep/10 px-4 py-5 text-center shadow-sm">
          <div className="text-2xl sm:text-[28px] text-terracotta leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
            {item.value}
          </div>
          <div className="text-xs text-deep/55 mt-2 leading-snug">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: SectionBlock, i: number) {
  switch (block.kind) {
    case 'flow':
      return <FlowBlock key={i} {...block} />;
    case 'table':
      return <TableBlock key={i} {...block} />;
    case 'callout':
      return <CalloutBlock key={i} {...block} />;
    case 'stats':
      return <StatsBlock key={i} {...block} />;
  }
}

export default function BlogArticleBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map(section => (
        <section key={section.heading}>
          <h2
            className="text-xl sm:text-2xl text-deep mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {section.heading}
          </h2>
          <div className="space-y-4 text-deep/75 leading-relaxed text-[15px] sm:text-base">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-2">
                {section.bullets.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ul>
            )}
          </div>
          {section.blocks && section.blocks.length > 0 && (
            <div>{section.blocks.map(renderBlock)}</div>
          )}
        </section>
      ))}
    </div>
  );
}
