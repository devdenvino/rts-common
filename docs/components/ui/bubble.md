# Bubble Component

Chat bubble component for messaging interfaces. Supports multiple visual variants, alignments, and optional emoji reactions.

## Import

```typescript
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
} from '@devdenvino/rts-common/components/ui';
```

## Usage

```tsx
<Bubble>
  <BubbleContent>Hello, how are you?</BubbleContent>
</Bubble>
```

## Bubble Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'muted' \| 'tinted' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | Visual style |
| `align` | `'start' \| 'end'` | `'start'` | Bubble alignment (left/right) |
| `className` | `string` | — | Additional CSS classes |

## Sub-Components

### BubbleGroup

Stacks multiple `Bubble` items vertically with consistent spacing.

```tsx
<BubbleGroup>
  <Bubble><BubbleContent>Message 1</BubbleContent></Bubble>
  <Bubble><BubbleContent>Message 2</BubbleContent></Bubble>
</BubbleGroup>
```

### BubbleContent

The inner content container. Renders as `<div>` by default; use `asChild` to wrap a `<button>` or `<a>`.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |

### BubbleReactions

Emoji reaction overlay anchored to the bubble corner.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'bottom'` | `'bottom'` | Vertical position |
| `align` | `'start' \| 'end'` | `'end'` | Horizontal position |

## Examples

### Sent and Received Messages

```tsx
{/* Received */}
<Bubble variant="muted">
  <BubbleContent>Hey! Are you coming today?</BubbleContent>
</Bubble>

{/* Sent */}
<Bubble variant="default" align="end">
  <BubbleContent>Yes, I'll be there at 3pm!</BubbleContent>
</Bubble>
```

### With Reactions

```tsx
<Bubble variant="tinted">
  <BubbleContent>Great news everyone!</BubbleContent>
  <BubbleReactions>
    <span>👍</span>
    <span>3</span>
  </BubbleReactions>
</Bubble>
```

### Outline Variant

```tsx
<Bubble variant="outline">
  <BubbleContent>System notification</BubbleContent>
</Bubble>
```

### Interactive Bubble (Button)

```tsx
<Bubble>
  <BubbleContent asChild>
    <button onClick={() => console.log('Bubble clicked')}>
      Click to expand
    </button>
  </BubbleContent>
</Bubble>
```

### Conversation Thread

```tsx
import { Bubble, BubbleContent, Message, MessageContent, MessageGroup } from '@devdenvino/rts-common/components/ui';

<MessageGroup>
  <Message>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>Hello!</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageContent>
      <Bubble variant="default" align="end">
        <BubbleContent>Hi there!</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</MessageGroup>
```
