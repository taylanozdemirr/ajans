import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Flips the `.dark` class on <html> and persists to localStorage under the same
 * key the Layout init script reads, so the choice survives full page navigations
 * between Astro islands. Used on panels; the public vitrin stays forced-dark.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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
