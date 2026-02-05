import type { Preview } from '@storybook/react-vite'
import React from 'react';
import '../src/index.css'
import { ThemeProvider } from '../src/components/shared/theme/provider';

// A wrapper component to bridge Storybook globals/addons with our ThemeProvider
const ThemeWrapper = ({ children, context }: { children: React.ReactNode; context: any }) => {
  const { theme, darkMode } = context.globals;

  // Custom dark mode logic reading from globalType
  // Default to light if not set
  const isDark = darkMode === 'dark';
  const themeColor = theme || 'theme-blue';

  React.useEffect(() => {
    const root = document.documentElement;
    // Force color scheme for scrollbars and system preference
    root.style.colorScheme = isDark ? 'dark' : 'light';

    // Apply theme to body to ensure full page coverage, especially when content is short
    // We rely on CSS variables which are set by the 'dark' class on :root (managed by ThemeProvider)
    document.body.style.backgroundColor = 'var(--background)';
    document.body.style.color = 'var(--foreground)';
    document.body.style.overflowY = 'auto'; // Allow scrolling

    // Clear styles when unmounting/changing to avoid pollution
    return () => {
      root.style.colorScheme = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [isDark]);


  return (
    <ThemeProvider
      defaultTheme={isDark ? 'dark' : 'light'}
      defaultThemeColor={themeColor.replace('theme-', '') as any}
      themeStorageKey="storybook-theme" // Use a separate key to avoid conflicting with the main app's local storage
    >
      {/* Wrapper to apply the theme class to the immediate container of the story */}
      <div
        className={`w-full p-4 bg-background text-foreground ${isDark ? 'dark' : ''} ${themeColor}`}
      >
        {children}
        <SyncTheme isDark={isDark} themeColor={themeColor} />
      </div>
    </ThemeProvider>
  );
};

// Helper to sync props to the Provider, since Provider takes default* props which are only read on mount.
// This component sits *inside* the Provider so it can use the context setters.
import { useTheme, useThemeColor } from '../src/components/shared/theme/provider';

const SyncTheme = ({ isDark, themeColor }: { isDark: boolean, themeColor: string }) => {
  const { setTheme } = useTheme();
  const { setThemeColor } = useThemeColor();

  React.useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
  }, [isDark, setTheme]);

  React.useEffect(() => {
    const colorName = themeColor.replace('theme-', '');
    setThemeColor(colorName as any);
  }, [themeColor, setThemeColor]);

  return null;
}


const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'theme-blue',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'theme-default', title: 'Default' },
          { value: 'theme-blue', title: 'Blue' },
          { value: 'theme-green', title: 'Green' },
          { value: 'theme-amber', title: 'Amber' },
          { value: 'theme-rose', title: 'Rose' },
          { value: 'theme-purple', title: 'Purple' },
          { value: 'theme-orange', title: 'Orange' },
          { value: 'theme-teal', title: 'Teal' },
          { value: 'theme-mono', title: 'Mono' },
          { value: 'theme-red', title: 'Red' },
          { value: 'theme-yellow', title: 'Yellow' },
          { value: 'theme-violet', title: 'Violet' },
        ],
      },
    },
    darkMode: {
      name: 'Dark Mode',
      description: 'Global dark mode switch',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story, context) => (
      <ThemeWrapper context={context}>
        <Story />
      </ThemeWrapper>
    ),
  ],
};

export default preview;