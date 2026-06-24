import { cn } from '@/lib/utils';

type BrandSize = 'sm' | 'md' | 'lg';

interface BrandProps {
  /** Optional context chip rendered after the wordmark, e.g. "Yönetim". */
  tag?: string;
  size?: BrandSize;
  className?: string;
  href?: string;
}

const SIZES: Record<BrandSize, { luxe: string; agency: string; rule: string; gap: string }> = {
  sm: { luxe: 'text-lg', agency: 'text-[0.5rem]', rule: 'h-5', gap: 'gap-2.5' },
  md: { luxe: 'text-2xl', agency: 'text-[0.58rem]', rule: 'h-7', gap: 'gap-3' },
  lg: { luxe: 'text-4xl sm:text-5xl', agency: 'text-[0.7rem]', rule: 'h-12', gap: 'gap-4' },
};

/**
 * LUXE AGENCY wordmark — the single canonical brand lockup. Bodoni display caps
 * paired with a letter-spaced grotesque sub-label and a hairline gold rule.
 */
export function Brand({ tag, size = 'md', className, href }: BrandProps) {
  const s = SIZES[size];

  const inner = (
    <>
      <span
        aria-hidden
        className={cn('w-px shrink-0 bg-primary/70 transition-colors group-hover:bg-primary', s.rule)}
      />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display font-medium tracking-[0.16em] text-foreground', s.luxe)}>
          LUXE
        </span>
        <span
          className={cn(
            'font-sans font-semibold uppercase tracking-[0.34em] text-muted-foreground',
            s.agency,
          )}
        >
          Agency
        </span>
      </span>
      {tag && (
        <span className="ml-1 self-start rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {tag}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn('group inline-flex items-center', s.gap, className)}>
        {inner}
      </a>
    );
  }

  return <div className={cn('inline-flex items-center', s.gap, className)}>{inner}</div>;
}
