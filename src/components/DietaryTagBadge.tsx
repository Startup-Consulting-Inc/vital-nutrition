import { DIETARY_TAG_META, type DietaryTag } from '@/data/nutrientDetails';

interface DietaryTagBadgeProps {
  tags: DietaryTag[] | undefined;
  size?: 'sm' | 'md';
  /** When set, only these tags get full color; others render muted. */
  highlight?: DietaryTag[];
}

/** Compact row of dietary tag badges (V / VG / GF / K / NF / DF). */
export default function DietaryTagBadge({ tags, size = 'sm', highlight }: DietaryTagBadgeProps) {
  if (!tags || tags.length === 0) return null;
  const dim = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(t => {
        const meta = DIETARY_TAG_META[t];
        const dimmed = highlight && !highlight.includes(t);
        return (
          <span
            key={t}
            title={meta.long}
            className={`${dim} rounded-md font-bold tracking-wider`}
            style={{
              backgroundColor: dimmed ? '#e6e4dc' : meta.color + '18',
              color: dimmed ? '#6b7d76' : meta.color,
            }}
          >
            {meta.label}
          </span>
        );
      })}
    </div>
  );
}
