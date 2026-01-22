# Component Index

A complete reference of all available components in rts-common.

## Layout Components

| Component | Description | Import |
|-----------|-------------|--------|
| AppBase | Main application wrapper with authentication and theming | `@devdenvino/rts-common` |
| Sidebar | Collapsible sidebar navigation | `@devdenvino/rts-common/components/shared` |
| TopNav | Top navigation bar | `@devdenvino/rts-common/components/shared` |

## Form Components

| Component | Description | Import |
|-----------|-------------|--------|
| Button | Clickable button with variants | `@devdenvino/rts-common/components/ui` |
| Input | Text input field | `@devdenvino/rts-common/components/ui` |
| Textarea | Multi-line text input | `@devdenvino/rts-common/components/ui` |
| Select | Dropdown select menu | `@devdenvino/rts-common/components/ui` |
| Checkbox | Checkable input | `@devdenvino/rts-common/components/ui` |
| Radio Group | Radio button group | `@devdenvino/rts-common/components/ui` |
| Switch | Toggle switch | `@devdenvino/rts-common/components/ui` |
| Slider | Range slider | `@devdenvino/rts-common/components/ui` |
| Calendar | Date picker calendar | `@devdenvino/rts-common/components/ui` |
| Form | Form wrapper with context | `@devdenvino/rts-common/components/ui` |
| Label | Form label | `@devdenvino/rts-common/components/ui` |
| Field | Form field wrapper | `@devdenvino/rts-common/components/ui` |

## Data Display

| Component | Description | Import |
|-----------|-------------|--------|
| Table | Data table | `@devdenvino/rts-common/components/ui` |
| Card | Content container | `@devdenvino/rts-common/components/ui` |
| Badge | Status badge | `@devdenvino/rts-common/components/ui` |
| Avatar | User avatar | `@devdenvino/rts-common/components/ui` |
| Skeleton | Loading placeholder | `@devdenvino/rts-common/components/ui` |
| Empty | Empty state | `@devdenvino/rts-common/components/ui` |
| Kbd | Keyboard key | `@devdenvino/rts-common/components/ui` |
| Separator | Visual divider | `@devdenvino/rts-common/components/ui` |

## Feedback

| Component | Description | Import |
|-----------|-------------|--------|
| Alert | Alert message | `@devdenvino/rts-common/components/ui` |
| Alert Dialog | Modal confirmation | `@devdenvino/rts-common/components/ui` |
| Dialog | Modal dialog | `@devdenvino/rts-common/components/ui` |
| Drawer | Side drawer | `@devdenvino/rts-common/components/ui` |
| Toast (Sonner) | Toast notification | `@devdenvino/rts-common/components/ui` |
| Progress | Progress bar | `@devdenvino/rts-common/components/ui` |
| Spinner | Loading spinner | `@devdenvino/rts-common/components/ui` |

## Navigation

| Component | Description | Import |
|-----------|-------------|--------|
| Tabs | Tabbed interface | `@devdenvino/rts-common/components/ui` |
| Breadcrumb | Breadcrumb navigation | `@devdenvino/rts-common/components/ui` |
| Pagination | Page navigation | `@devdenvino/rts-common/components/ui` |
| Navigation Menu | Navigation menu | `@devdenvino/rts-common/components/ui` |
| Menubar | Menu bar | `@devdenvino/rts-common/components/ui` |
| Dropdown Menu | Dropdown menu | `@devdenvino/rts-common/components/ui` |
| Context Menu | Right-click menu | `@devdenvino/rts-common/components/ui` |
| Command | Command palette | `@devdenvino/rts-common/components/ui` |

## Overlay

| Component | Description | Import |
|-----------|-------------|--------|
| Popover | Popover overlay | `@devdenvino/rts-common/components/ui` |
| Tooltip | Tooltip overlay | `@devdenvino/rts-common/components/ui` |
| Hover Card | Hover card | `@devdenvino/rts-common/components/ui` |
| Sheet | Side sheet | `@devdenvino/rts-common/components/ui` |

## Layout Utilities

| Component | Description | Import |
|-----------|-------------|--------|
| Aspect Ratio | Aspect ratio container | `@devdenvino/rts-common/components/ui` |
| Scroll Area | Scrollable area | `@devdenvino/rts-common/components/ui` |
| Resizable | Resizable panels | `@devdenvino/rts-common/components/ui` |
| Collapsible | Collapsible section | `@devdenvino/rts-common/components/ui` |
| Accordion | Accordion | `@devdenvino/rts-common/components/ui` |

## Magic UI Components

| Component | Description | Import |
|-----------|-------------|--------|
| Animated Theme Toggler | Animated theme switch | `@devdenvino/rts-common/components/magicui` |
| Aurora Text | Gradient animated text | `@devdenvino/rts-common/components/magicui` |
| Magic Card | Interactive card | `@devdenvino/rts-common/components/magicui` |
| Meteors | Meteor animation | `@devdenvino/rts-common/components/magicui` |
| Typing Animation | Typewriter effect | `@devdenvino/rts-common/components/magicui` |

## Custom Components

| Component | Description | Import |
|-----------|-------------|--------|
| DataTable | Advanced data table | `@devdenvino/rts-common/components/ui/custom` |
| Button Group | Button group | `@devdenvino/rts-common/components/ui` |
| Input Group | Input with addons | `@devdenvino/rts-common/components/ui` |
| Input OTP | OTP input | `@devdenvino/rts-common/components/ui` |
| Toggle | Toggle button | `@devdenvino/rts-common/components/ui` |
| Toggle Group | Toggle button group | `@devdenvino/rts-common/components/ui` |
| Carousel | Image carousel | `@devdenvino/rts-common/components/ui` |
| Chart | Chart component | `@devdenvino/rts-common/components/ui` |

## Usage Example

```typescript
// Import multiple components
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@devdenvino/rts-common/components/ui';

// Use in your component
function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Icon Libraries

rts-common also exports icon libraries:

```typescript
// Lucide Icons
import { Home, Settings, User } from '@devdenvino/rts-common/lucide-react';

// Tabler Icons
import { IconHome, IconSettings } from '@devdenvino/rts-common/tabler-icons-react';
```

## Next Steps

- [UI Components Guide](/components/ui/all) - Detailed component documentation
- [Magic UI Components](/components/magicui/animated-theme-toggler) - Animated components
- [API Reference](/api/overview) - Complete API documentation
