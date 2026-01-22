# Button Component

Clickable button component with multiple variants and sizes.

## Usage

```typescript
import { Button } from '@devdenvino/rts-common/components/ui';

<Button>Click me</Button>
```

## Variants

```typescript
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## Sizes

```typescript
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## Props

```typescript
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

## Examples

### With Icon

```typescript
import { Home } from '@devdenvino/rts-common/lucide-react';

<Button>
  <Home className="mr-2 h-4 w-4" />
  Home
</Button>
```

### Loading State

```typescript
<Button disabled>
  <Spinner className="mr-2 h-4 w-4" />
  Loading...
</Button>
```
