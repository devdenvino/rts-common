# ColorSchemePicker Component

A popover button that lets users pick from 18 color schemes at runtime. Integrates with the `appStore` to persist the selection across tabs.

## Import

```typescript
import { ColorSchemePicker } from '@devdenvino/rts-common';
```

## Usage

```tsx
import { ColorSchemePicker } from '@devdenvino/rts-common';

// Place in a top bar or toolbar
<ColorSchemePicker />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'ghost'` | Trigger button variant |
| `size` | `ButtonSize` | `'icon'` | Trigger button size |
| `align` | `PopoverAlign` | `'end'` | Popover horizontal alignment |
| `side` | `PopoverSide` | — | Popover side (top/bottom/left/right) |
| `className` | `string` | — | Additional CSS classes for the trigger |

All other `Button` props (except `onClick`) are forwarded to the trigger.

## Available Color Schemes

`neutral`, `amber`, `blue`, `cyan`, `emerald`, `fuchsia`, `green`, `indigo`, `lime`, `orange`, `pink`, `purple`, `red`, `rose`, `sky`, `teal`, `violet`, `yellow`

## Behaviour

- Opens a swatch popover with 18 color circles (6-column grid)
- Clicking a swatch calls `setColorScheme(value)` from the `appStore`
- The active swatch is highlighted with a ring
- Tooltips show the color name on hover
- Selection is persisted to `localStorage` and synced across tabs via `BroadcastChannel`

## Examples

### In a Top Navigation Bar

```tsx
import { ThemeToggle } from '@devdenvino/rts-common';
import { ColorSchemePicker } from '@devdenvino/rts-common';

function TopNav() {
  return (
    <header className="flex items-center justify-end gap-2 px-4 py-2 border-b">
      <ColorSchemePicker />
      <ThemeToggle />
    </header>
  );
}
```

### Aligned to Start

```tsx
<ColorSchemePicker align="start" />
```

### Above the Trigger

```tsx
<ColorSchemePicker side="top" />
```

## Related

- [`setColorScheme`](/api/store#setcolorscheme) — programmatic action
- [`useAppStore`](/api/store#useappstore) — reactive state selector
- [`ThemeProvider`](/components/overview#layout-components) — applies the active color scheme CSS class
