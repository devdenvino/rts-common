# Sidebar Component

Collapsible sidebar navigation.

## Usage

```typescript
import { Sidebar } from '@devdenvino/rts-common';

<Sidebar
  items={[
    { label: 'Dashboard', href: '/', icon: 'Home' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ]}
  collapsible
  defaultOpen
/>
```

## See Also

- [Layout System](/guide/layouts)
