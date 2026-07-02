import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Flips the `.dark` class on <html> and persists to localStorage under the same
 * key the Layout init script reads, so the choice survives full page navigations
 * between Astro islands. Used on the public vitrin and all panels; the brand
 * default is the light (white editorial) theme, dark is opt-in.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Init from the DOM class the inline Layout script already set, so the icon
  // is correct on first paint instead of flashing the wrong glyph.
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    try {
      localStorage.setItem('luxe-theme', next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
      className={className}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
