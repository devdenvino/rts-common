# All UI Components

Complete reference of all UI components available in rts-common.

## Form Components

### Button
Primary action component with multiple variants.
[View Button Docs](/components/ui/button)

### Input
Text input field with validation support.

### Textarea
Multi-line text input.

### Select
Dropdown selection component.

### Checkbox
Checkable input component.

### Radio Group
Group of radio button options.

### Switch
Toggle switch component.

### Slider
Range slider input.

### Calendar
Date picker calendar.

## Layout Components

### Card
Content container with header, content, and footer sections.
[View Card Docs](/components/ui/card)

### Separator
Visual divider between content.

### Scroll Area
Scrollable container with custom scrollbars.

### Resizable
Resizable panel layout.

### Collapsible
Collapsible content section.

### Accordion
Expandable/collapsible sections.

### Aspect Ratio
Container that maintains aspect ratio.

## Navigation

### Tabs
Tabbed interface component.

### Breadcrumb
Breadcrumb navigation trail.

### Pagination
Page navigation controls.

### Navigation Menu
Main navigation menu.

### Menubar
Menu bar component.

### Dropdown Menu
Contextual dropdown menu.

### Context Menu
Right-click context menu.

### Command
Command palette / search.

## Overlay

### Dialog
Modal dialog component.
[View Dialog Docs](/components/ui/dialog)

### Alert Dialog
Confirmation dialog.

### Drawer
Side drawer overlay.

### Sheet
Side sheet overlay.

### Popover
Popover overlay.

### Tooltip
Tooltip overlay.

### Hover Card
Card shown on hover.

## Feedback

### Alert
Alert message component.

### Toast
Toast notification (using Sonner).

### Progress
Progress bar indicator.

### Spinner
Loading spinner.

### Skeleton
Loading skeleton placeholder.

## Messaging

### Attachment
File attachment card with icon/image media, progress states (`idle`, `uploading`, `processing`, `error`, `done`), and action buttons.
[View Attachment Docs](/components/ui/attachment)

### Bubble
Chat bubble with 7 visual variants (`default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, `destructive`) and start/end alignment. Includes `BubbleGroup`, `BubbleContent`, and `BubbleReactions`.
[View Bubble Docs](/components/ui/bubble)

### Marker
Inline metadata label for timestamps, date separators, and status text. Variants: `default`, `separator`, `border`.
[View Marker Docs](/components/ui/marker)

### Message
Structural layout for chat messages — avatar, content, header, footer. Supports start/end alignment. Includes `MessageGroup`, `MessageAvatar`, `MessageContent`, `MessageHeader`, `MessageFooter`.
[View Message Docs](/components/ui/message)

### MessageScroller
Auto-scrolling chat viewport with a floating scroll-to-end button. Powered by `@shadcn/react/message-scroller`. Exposes `useMessageScroller`, `useMessageScrollerScrollable`, and `useMessageScrollerVisibility` hooks.
[View MessageScroller Docs](/components/ui/message-scroller)

## Data Display

### Table
Data table component.
[View Table Docs](/components/ui/table)

### Badge
Status badge.

### Avatar
User avatar image.

### Empty
Empty state placeholder.

### Kbd
Keyboard key display.

## Import Examples

```typescript
import {
  Button,
  Card,
  Input,
  Dialog,
  Table,
  // ... all other components
} from '@devdenvino/rts-common/components/ui';
```

## Next Steps

- [Component Overview](/components/overview)
- [API Reference](/api/overview)
