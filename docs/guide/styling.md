# Styling Guide

Learn how to style components in rts-common.

## Overview

rts-common uses Tailwind CSS for styling, providing:
- Utility-first styling
- Responsive design
- Dark mode support
- Customizable design system

## Using Tailwind Classes

Apply utility classes directly:

```typescript
<div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900">
  <Button className="w-full">Full Width Button</Button>
</div>
```

## Merging Classes

Use the `cn` utility to merge classes:

```typescript
import { cn } from '@devdenvino/rts-common';

<Button className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)} />
```

## Component Variants

Most components support variants:

```typescript
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## Responsive Design

Use responsive prefixes:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## Custom Styles

Override with Tailwind:

```typescript
<Card className="border-2 border-primary shadow-lg">
  Custom styled card
</Card>
```

## Next Steps

- [Theme Management](/guide/theming)
- [Best Practices](/guide/best-practices)
