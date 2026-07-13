# Marker Component

Inline metadata label for messaging interfaces — timestamps, status text, date separators, and similar contextual markers.

## Import

```typescript
import {
  Marker,
  MarkerIcon,
  MarkerContent,
  markerVariants,
} from '@devdenvino/rts-common/components/ui';
```

## Usage

```tsx
<Marker>
  <MarkerContent>Today</MarkerContent>
</Marker>
```

## Marker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'separator' \| 'border'` | `'default'` | Visual style |
| `asChild` | `boolean` | `false` | Render as a different element via `Slot` |
| `className` | `string` | — | Additional CSS classes |

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Plain text label, no decoration |
| `separator` | Horizontal lines on both sides of the content (section divider) |
| `border` | Bottom border below the label |

## Sub-Components

### MarkerIcon

Wraps an icon inside a marker, hidden from accessibility tree (`aria-hidden`).

```tsx
<Marker>
  <MarkerIcon><ClockIcon /></MarkerIcon>
  <MarkerContent>Delivered 2:34 PM</MarkerContent>
</Marker>
```

### MarkerContent

Wraps the text content of the marker. In `separator` variant the text is centered between the lines.

## Examples

### Date Separator

```tsx
<Marker variant="separator">
  <MarkerContent>Monday, July 14</MarkerContent>
</Marker>
```

### Timestamp with Icon

```tsx
import { CheckCheckIcon } from 'lucide-react';

<Marker>
  <MarkerIcon><CheckCheckIcon /></MarkerIcon>
  <MarkerContent>Read 3:15 PM</MarkerContent>
</Marker>
```

### Section Header with Border

```tsx
<Marker variant="border">
  <MarkerContent>Unread messages</MarkerContent>
</Marker>
```

### Inside a Message Thread

```tsx
import { Message, MessageContent, Bubble, BubbleContent, Marker, MarkerContent } from '@devdenvino/rts-common/components/ui';

<div className="flex flex-col gap-2">
  <Message>
    <MessageContent>
      <Bubble variant="muted"><BubbleContent>Good morning!</BubbleContent></Bubble>
    </MessageContent>
  </Message>

  <Marker variant="separator">
    <MarkerContent>Yesterday</MarkerContent>
  </Marker>

  <Message align="end">
    <MessageContent>
      <Bubble><BubbleContent>See you tomorrow.</BubbleContent></Bubble>
    </MessageContent>
  </Message>
</div>
```
