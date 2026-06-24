import { useEffect, useState } from 'react';
import { Toaster as Sonner } from 'sonner';

/**
 * Theme-aware toaster. The app themes via a `.dark` class on <html> (set by the
 * inline script in Layout.astro), not next-themes — so we observe that class
 * directly and keep sonner in sync.
 */
export function Toaster() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      position="top-right"
      theme={theme}
      className="font-sans"
      toastOptions={{
        style: {
          background: 'oklch(var(--popover))',
          color: 'oklch(var(--popover-foreground))',
          border: '1px solid oklch(var(--border))',
          borderRadius: 'var(--radius)',
          fontFamily: 'inherit',
        },
      }}
    />
  );
}
