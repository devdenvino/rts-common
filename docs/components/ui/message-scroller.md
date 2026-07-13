# MessageScroller Component

Auto-scrolling chat viewport that keeps the latest messages in view. Provides a scroll-to-end button that appears when the user scrolls up.

## Import

```typescript
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from '@devdenvino/rts-common/components/ui';
```

> **Peer dependency**: `@shadcn/react` (^0.2.1) must be installed. The primitive is sourced from `@shadcn/react/message-scroller`.

## Usage

```tsx
<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((msg) => (
          <MessageScrollerItem key={msg.id} scrollAnchor={isLast(msg)}>
            <Message>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>{msg.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

## Components

### MessageScrollerProvider

Context provider. Wrap the scroller and any components that use the hooks.

### MessageScroller

Root container. Fill-size (`size-full`) flex column.

### MessageScrollerViewport

The scrollable area. Automatically hides the scrollbar while auto-scrolling is active.

### MessageScrollerContent

Inner flex column with `gap-6` spacing between items.

### MessageScrollerItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollAnchor` | `boolean` | `false` | Marks this item as the scroll anchor. Set on the last item to trigger auto-scroll when new messages arrive. |
| `className` | `string` | — | Additional CSS classes |

### MessageScrollerButton

A floating button that appears when the user scrolls away from the end.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'start' \| 'end'` | `'end'` | Scroll to start or end |
| `variant` | `ButtonVariant` | `'secondary'` | Button visual variant |
| `size` | `ButtonSize` | `'icon-sm'` | Button size |
| `render` | `React.ReactElement` | `<Button>` | Custom render element |
| `children` | `ReactNode` | Arrow icon | Custom button content |

## Hooks

### useMessageScroller

Access the scroller context — position, auto-scroll state, scroll methods.

### useMessageScrollerScrollable

Returns `true` when the viewport is scrollable (content overflows).

### useMessageScrollerVisibility

Returns `true` when the scroll-to-end button should be visible.

## Examples

### Basic Chat Window

```tsx
function ChatWindow({ messages }: { messages: { id: string; text: string }[] }) {
  return (
    <div className="h-96 w-full max-w-lg border rounded-lg overflow-hidden">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {messages.map((msg, i) => (
                <MessageScrollerItem
                  key={msg.id}
                  scrollAnchor={i === messages.length - 1}
                >
                  <Message>
                    <MessageContent>
                      <Bubble variant="muted">
                        <BubbleContent>{msg.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}
```

### Custom Scroll Button

```tsx
<MessageScrollerButton
  variant="outline"
  size="sm"
>
  ↓ New messages
</MessageScrollerButton>
```

### Scroll to Start Button

```tsx
<MessageScrollerButton direction="start" />
```
