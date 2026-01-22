# Theme Management

Learn how to customize and manage themes in rts-common.

## Overview

rts-common provides a powerful theming system built on CSS variables and next-themes, supporting:
- Light and dark modes
- Custom color schemes
- Per-component customization
- System preference detection

## Basic Usage

### Default Theme

The AppBase component includes theme support by default:

```typescript
<AppBase
  mfeId="my-app"
  oidcConfig={/* ... */}
  theme="system" // 'light' | 'dark' | 'system'
>
  <YourApp />
</AppBase>
```

### Using the Theme Hook

```typescript
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## Theme Configuration

### CSS Variables

Themes are defined using CSS custom properties:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  
  /* ... other dark theme variables */
}
```

### HSL Color Format

Colors use HSL (Hue, Saturation, Lightness) format without the `hsl()` wrapper:

```css
/* Format: hue saturation% lightness% */
--primary: 210 100% 50%;  /* Blue */
--secondary: 120 100% 50%; /* Green */
```

This allows Tailwind to apply opacity:

```typescript
<div className="bg-primary/50"> {/* 50% opacity */}
```

## Custom Themes

### Create Custom Theme

```typescript
const customTheme = {
  name: 'ocean',
  displayName: 'Ocean',
  cssVars: {
    light: {
      primary: '210 100% 50%',
      secondary: '190 100% 40%',
      background: '210 100% 97%',
      foreground: '210 100% 10%',
      // ... other variables
    },
    dark: {
      primary: '210 100% 60%',
      secondary: '190 100% 50%',
      background: '210 100% 5%',
      foreground: '210 100% 95%',
      // ... other variables
    },
  },
};
```

### Apply Custom Theme

```typescript
<AppBase
  customThemes={[customTheme]}
  theme="ocean"
>
```

### Multiple Custom Themes

```typescript
const themes = [
  {
    name: 'ocean',
    displayName: 'Ocean',
    cssVars: { /* ... */ },
  },
  {
    name: 'forest',
    displayName: 'Forest',
    cssVars: { /* ... */ },
  },
  {
    name: 'sunset',
    displayName: 'Sunset',
    cssVars: { /* ... */ },
  },
];

<AppBase customThemes={themes}>
```

## Theme Switcher

### Simple Toggle

```typescript
import { useTheme } from 'next-themes';
import { Button } from '@devdenvino/rts-common/components/ui';
import { Moon, Sun } from '@devdenvino/rts-common/lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

### Dropdown Selector

```typescript
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from '@devdenvino/rts-common/components/ui';

function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Theme: {theme}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
            {t}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Animated Toggle

Use the built-in animated theme toggler:

```typescript
import { AnimatedThemeToggler } from '@devdenvino/rts-common/components/magicui';

<AnimatedThemeToggler />
```

## Customizing Components

### Using CSS Variables

```typescript
<Button 
  style={{
    '--button-bg': 'var(--primary)',
    '--button-fg': 'var(--primary-foreground)',
  } as React.CSSProperties}
>
  Custom Button
</Button>
```

### Tailwind Classes

```typescript
<Card className="bg-primary text-primary-foreground">
  Primary colored card
</Card>
```

### Component Variants

```typescript
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

## System Preference

### Auto-detect System Theme

```typescript
<AppBase theme="system">
  {/* Automatically matches OS theme */}
</AppBase>
```

### Listen for Changes

```typescript
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

function ThemeWatcher() {
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    console.log('Current theme:', resolvedTheme);
    // Update external services, analytics, etc.
  }, [resolvedTheme]);
  
  return null;
}
```

## Per-Page Themes

### Force Theme for Specific Pages

```typescript
function MarketingPage() {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    setTheme('light');
    return () => setTheme('system');
  }, []);
  
  return <div>Marketing content...</div>;
}
```

## Tailwind Configuration

### Extend Theme Colors

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... your brand colors
          900: '#0c4a6e',
        },
      },
    },
  },
};
```

### Use in Components

```typescript
<div className="bg-brand-500 text-white">
  Brand colored element
</div>
```

## Dark Mode Images

### Show Different Images

```typescript
function Logo() {
  const { resolvedTheme } = useTheme();
  
  return (
    <img 
      src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
      alt="Logo"
    />
  );
}
```

### Using CSS

```css
.logo-light {
  display: block;
}

.logo-dark {
  display: none;
}

.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}
```

## Best Practices

### 1. Use Semantic Colors

```typescript
// ✅ Good - Semantic
<Button variant="destructive">Delete</Button>

// ❌ Avoid - Literal colors
<Button className="bg-red-500">Delete</Button>
```

### 2. Test Both Themes

Always test your UI in both light and dark modes.

### 3. Respect User Preference

Default to `theme="system"` to respect user's OS preference.

### 4. Provide Theme Toggle

Make it easy for users to change themes:

```typescript
<TopNav showThemeToggle={true} />
```

### 5. Smooth Transitions

```css
* {
  transition: background-color 0.3s, color 0.3s;
}
```

## Troubleshooting

### Flash of Unstyled Content

Add theme script to prevent FOUC:

```html
<script>
  const theme = localStorage.getItem('theme') || 'system';
  document.documentElement.classList.add(theme);
</script>
```

### Colors Not Applying

Ensure CSS variables are defined:

```typescript
// Check if variable exists
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');
```

## Next Steps

- [Styling Guide](/guide/styling)
- [Best Practices](/guide/best-practices)
- [Component Customization](/components/overview)
