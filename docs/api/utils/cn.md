# cn Utility

Utility function for merging Tailwind CSS classes.

## Import

```typescript
import { cn } from '@devdenvino/rts-common';
```

## Usage

```typescript
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## Examples

### Conditional Classes

```typescript
<div className={cn(
  'p-4 rounded',
  isActive && 'bg-primary',
  isDisabled && 'opacity-50'
)}>
```

### Merging Props

```typescript
<Button className={cn('custom-class', props.className)} />
```

### Array of Classes

```typescript
cn(['class1', 'class2', condition && 'class3'])
```

## Implementation

Built with `clsx` and `tailwind-merge` for proper class deduplication.
