import { useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { THEME } from '../constants/theme';
import type { Theme } from '../types/ui';

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useSettingsStore();

  useEffect(() => {
    const tokens = THEME[theme];
    const root = document.documentElement;

    Object.entries(tokens).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`;
      root.style.setProperty(cssVar, value);
    });

    root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('mailman-theme');
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
