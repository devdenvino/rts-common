# Animated Theme Toggler

Smooth animated toggle for switching between light and dark themes.

## Usage

```typescript
import { AnimatedThemeToggler } from '@devdenvino/rts-common/components/magicui';

<AnimatedThemeToggler />
```

## Features

- Smooth animation transitions
- Supports light/dark/system themes
- Customizable appearance

## Example

```typescript
function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <AnimatedThemeToggler />
    </header>
  );
}
```

## See Also

- [Theme Management](/guide/theming)
