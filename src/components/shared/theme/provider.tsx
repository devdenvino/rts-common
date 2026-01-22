import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';
export type ThemeColor =
  | 'blue'
  | 'green'
  | 'amber'
  | 'rose'
  | 'purple'
  | 'orange'
  | 'teal'
  | 'mono'
  | 'scaled'
  | 'red'
  | 'yellow'
  | 'violet';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultThemeColor?: ThemeColor;
  themeStorageKey?: string;
  themeColorStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  themeName: string;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  themeName: 'light',
  themeColor: 'violet',
  setTheme: () => null,
  setThemeColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  defaultThemeColor = 'violet',
  themeStorageKey: themeStorageKey = 'vite-ui-theme',
  themeColorStorageKey: themeColorStorageKey = 'vite-ui-theme-color',
  ...props
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>(defaultTheme);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(themeStorageKey) as Theme) || defaultTheme
  );

  const [themeColor, setThemeColor] = useState<ThemeColor>(
    () =>
      (localStorage.getItem(themeColorStorageKey) as ThemeColor) ||
      defaultThemeColor
  );

  useEffect(() => {
    const body = window.document.body;
    body.classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        body.classList.remove(className);
      }
    });
    body.classList.add(`theme-${themeColor}`);
  }, [themeColor]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      setThemeName(systemTheme);
      return;
    }

    root.classList.add(theme);
    setThemeName(theme);
  }, [theme]);

  const value = {
    theme,
    themeName,
    themeColor,
    setTheme: (theme: Theme) => {
      localStorage.setItem(themeStorageKey, theme);
      setTheme(theme);
    },
    setThemeColor: (themeColor: ThemeColor) => {
      localStorage.setItem(themeColorStorageKey, themeColor);
      setThemeColor(themeColor);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export const useThemeColor = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
