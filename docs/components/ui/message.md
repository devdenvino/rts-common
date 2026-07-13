# Message Component

Structural components for building chat message layouts with support for avatars, content, headers, and footers.

## Import

```typescript
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from '@devdenvino/rts-common/components/ui';
```

## Usage

```tsx
<Message>
  <MessageAvatar>
    <img src="/avatar.png" alt="User" />
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Alice · 2:30 PM</MessageHeader>
    <Bubble variant="muted">
      <BubbleContent>Hello!</BubbleContent>
    </Bubble>
    <MessageFooter>Delivered</MessageFooter>
  </MessageContent>
</Message>
```

## Message Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'end'` | `'start'` | Align message to left (received) or right (sent) |
| `className` | `string` | — | Additional CSS classes |

## Sub-Components

### MessageGroup

Stacks multiple `Message` items with tighter spacing (gap-1.5 vs gap-6 for scroller items).

```tsx
<MessageGroup>
  <Message>…</Message>
  <Message>…</Message>
</MessageGroup>
```

### MessageAvatar

Circular avatar pinned to the bottom of the message. Shifts up when a `MessageFooter` is present.

### MessageContent

Flex column container that holds the header, bubble(s), and footer. Supports both start and end alignment.

### MessageHeader

Small metadata row shown above the bubble(s). Contains sender name, timestamp, etc.

### MessageFooter

Small metadata row shown below the bubble(s). Useful for delivery receipts and timestamps.

## Examples

### Received Message

```tsx
<Message>
  <MessageAvatar>
    <img src="/alice.png" alt="Alice" className="size-8 rounded-full" />
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Alice · 2:30 PM</MessageHeader>
    <Bubble variant="muted">
      <BubbleContent>Hey! Are you coming today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

### Sent Message

```tsx
<Message align="end">
  <MessageContent>
    <Bubble variant="default" align="end">
      <BubbleContent>Yes, I'll be there at 3pm!</BubbleContent>
    </Bubble>
    <MessageFooter>Read · 3:15 PM</MessageFooter>
  </MessageContent>
</Message>
```

### Message Thread

```tsx
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
  Bubble,
  BubbleContent,
  BubbleGroup,
  Marker,
  MarkerContent,
} from '@devdenvino/rts-common/components/ui';

<div className="flex flex-col gap-6 p-4">
  <Marker variant="separator">
    <MarkerContent>Today</MarkerContent>
  </Marker>

  <MessageGroup>
    <Message>
      <MessageAvatar>
        <img src="/alice.png" alt="Alice" className="size-8 rounded-full" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Alice</MessageHeader>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Hey there!</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>How are you?</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
  </MessageGroup>

  <MessageGroup>
    <Message align="end">
      <MessageContent>
        <BubbleGroup>
          <Bubble align="end">
            <BubbleContent>Doing great, thanks!</BubbleContent>
          </Bubble>
        </BubbleGroup>
        <MessageFooter>Delivered</MessageFooter>
      </MessageContent>
    </Message>
  </MessageGroup>
</div>
```

### Message Without Avatar

```tsx
<Message>
  <MessageContent>
    <Bubble variant="secondary">
      <BubbleContent>A message without an avatar</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```
