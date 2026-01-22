# TopNav Component

Top navigation bar component.

## Usage

```typescript
import { TopNav } from '@devdenvino/rts-common';

<TopNav
  brand={{
    name: 'My App',
    logo: '/logo.svg',
  }}
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  showUserMenu
  showThemeToggle
/>
```

## See Also

- [Layout System](/guide/layouts)
