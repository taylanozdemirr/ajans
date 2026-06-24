import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Brand } from '@/components/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export interface PanelNavItem {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

interface PanelLayoutProps {
  /** Brand context chip, e.g. "Yönetim" / "Ajans". */
  tag?: string;
  nav: PanelNavItem[];
  user: { name: string; email?: string; role?: string };
  onLogout: () => void;
  children: ReactNode;
}

/** Shared chrome for the admin and company panels: one definition, no drift. */
export function PanelLayout({ tag, nav, user, onLogout, children }: PanelLayoutProps) {
  const initial = (user.name || user.email || 'L').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-6 py-[1.35rem]">
          <Brand tag={tag} size="sm" href="/" />
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  item.active
                    ? 'bg-secondary font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="flex-1 text-left">{item.label}</span>
                {item.active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-3 flex items-center gap-3 px-1">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 font-display text-sm font-medium text-primary ring-1 ring-primary/20">
              {initial}
            </div>
            <div className="min-w-0 text-sm">
              <p className="truncate font-medium">{user.name}</p>
              {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1 justify-start gap-2" onClick={onLogout}>
              <LogOut className="h-4 w-4" /> Çıkış Yap
            </Button>
            <ThemeToggle className="border border-border" />
          </div>
        </div>
      </aside>

      {/* Mobile topbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur md:hidden">
        <Brand tag={tag} size="sm" href="/" />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Çıkış Yap">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="md:pl-64">
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-10 md:py-12">{children}</main>
      </div>
    </div>
  );
}
