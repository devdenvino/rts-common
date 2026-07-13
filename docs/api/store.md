# App Store

Lightweight global state store for theme, color scheme, and layout mode. Built on `@tanstack/react-store` with automatic `localStorage` persistence and cross-tab synchronisation via `BroadcastChannel`.

## Import

```typescript
import {
  appStore,
  useAppStore,
  setTheme,
  setColorScheme,
  setLayoutMode,
  type AppState,
  type Theme,
  type ColorScheme,
  type LayoutMode,
} from '@devdenvino/rts-common';
```

> The store and its exports are currently used internally by `ThemeProvider` and `ColorSchemePicker`. Direct imports are available for advanced use cases.

## Types

### AppState

```typescript
interface AppState {
  theme: Theme;
  colorScheme: ColorScheme;
  layoutMode: LayoutMode;
}
```

### Theme

```typescript
type Theme = 'dark' | 'light' | 'system';
```

### ColorScheme

```typescript
type ColorScheme =
  | 'neutral'
  | 'amber' | 'blue' | 'cyan' | 'emerald' | 'fuchsia' | 'green'
  | 'indigo' | 'lime' | 'orange' | 'pink' | 'purple' | 'red'
  | 'rose' | 'sky' | 'teal' | 'violet' | 'yellow';
```

### LayoutMode

```typescript
type LayoutMode = 'sidebar' | 'topnav';
```

## `useAppStore`

Reactive selector hook. Returns the selected slice of the store and re-renders the component when that slice changes.

```typescript
function useAppStore<T>(selector: (state: AppState) => T): T
```

### Example

```typescript
import { useAppStore } from '@devdenvino/rts-common';

function ThemeLabel() {
  const theme = useAppStore((s) => s.theme);
  return <span>Current theme: {theme}</span>;
}
```

## Actions

### setTheme

```typescript
function setTheme(theme: Theme): void
```

Updates the active theme and persists to `localStorage`.

```typescript
import { setTheme } from '@devdenvino/rts-common';

setTheme('dark');
setTheme('light');
setTheme('system'); // follows OS preference
```

### setColorScheme

```typescript
function setColorScheme(colorScheme: ColorScheme): void
```

Updates the active color scheme and persists to `localStorage`.

```typescript
import { setColorScheme } from '@devdenvino/rts-common';

setColorScheme('blue');
setColorScheme('neutral');
```

### setLayoutMode

```typescript
function setLayoutMode(layoutMode: LayoutMode): void
```

Switches between sidebar and top navigation layouts.

```typescript
import { setLayoutMode } from '@devdenvino/rts-common';

setLayoutMode('topnav');
setLayoutMode('sidebar');
```

## `appStore`

The raw `@tanstack/react-store` `Store<AppState>` instance. Use for imperative reads outside React or for subscribing to changes.

```typescript
import { appStore } from '@devdenvino/rts-common';

// Read current state
const { theme, colorScheme } = appStore.state;

// Subscribe to changes
const unsubscribe = appStore.subscribe(() => {
  console.log('State changed:', appStore.state);
});
```

## Cross-Tab Sync

The store automatically synchronises state across browser tabs using:

1. **`BroadcastChannel`** (`rts:app-state`) — instant sync for same-origin tabs
2. **`localStorage` storage event** — fallback for cross-origin iframes

Both persistence and sync are enabled only in browser environments (`typeof window !== 'undefined'`).

## Storage Key

State is persisted under the key `rts:app-state` in `localStorage`.

## Related

- [`ColorSchemePicker`](/components/ui/color-scheme-picker) — UI component that calls `setColorScheme`
- [`ThemeProvider`](/components/overview#layout-components) — reads `theme` and `colorScheme` to apply CSS classes
