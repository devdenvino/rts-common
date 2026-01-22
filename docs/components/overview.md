# Components Overview

rts-common provides a comprehensive set of components organized into several categories.

## Component Categories

### UI Components

Built on [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/), these components provide the building blocks for your application:

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Data Display**: Table, Card, Badge, Avatar, Skeleton
- **Feedback**: Alert, Dialog, Toast, Progress, Spinner
- **Navigation**: Tabs, Breadcrumb, Pagination, Dropdown Menu
- **Layout**: Separator, Scroll Area, Resizable, Collapsible
- **Overlay**: Popover, Tooltip, Context Menu, Sheet, Drawer

[Browse all UI Components →](/components/ui/all)

### Layout Components

High-level components for application structure:

- **AppBase**: Main application wrapper with auth and theme
- **Sidebar**: Collapsible sidebar navigation
- **TopNav**: Top navigation bar with branding and user menu

[Learn about Layouts →](/guide/layouts)

### Magic UI

Animated and interactive components:

- **Animated Theme Toggler**: Smooth theme switching
- **Aurora Text**: Animated gradient text
- **Magic Card**: Interactive hover effects
- **Meteors**: Animated meteor shower background
- **Typing Animation**: Typewriter effect

[Explore Magic UI →](/components/magicui/animated-theme-toggler)

### Animate UI

Motion-enhanced components with smooth animations powered by Framer Motion.

## Import Patterns

### Individual Components

```typescript
import { Button, Card, Input } from '@devdenvino/rts-common/components/ui';

function MyForm() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Layout Components

```typescript
import { AppBase } from '@devdenvino/rts-common';

function App() {
  return (
    <AppBase
      mfeId="my-app"
      oidcConfig={/* ... */}
    >
      <YourApp />
    </AppBase>
  );
}
```

### Magic UI Components

```typescript
import {
  AnimatedThemeToggler,
  AuroraText,
  MagicCard
} from '@devdenvino/rts-common/components/magicui';

function Hero() {
  return (
    <MagicCard>
      <AuroraText>Welcome!</AuroraText>
      <AnimatedThemeToggler />
    </MagicCard>
  );
}
```

## Common Patterns

### Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { Button, Input, Label, Form } from '@devdenvino/rts-common/components/ui';

function LoginForm() {
  const form = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...form.register('email', { required: true })}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Data Table

```typescript
import { DataTable } from '@devdenvino/rts-common/components/ui/custom';

function UsersTable() {
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
  ];
  
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    // ...
  ];
  
  return <DataTable columns={columns} data={data} />;
}
```

### Modal Dialog

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@devdenvino/rts-common/components/ui';

function DeleteConfirmation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive">Confirm Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Styling Components

All components support the `className` prop for custom styling:

```typescript
<Button className="w-full mt-4">
  Full Width Button
</Button>
```

### Using CSS Variables

Components use CSS variables for theming:

```css
.my-custom-button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Accessibility

All components follow accessibility best practices:

- ✅ Keyboard navigation support
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance

## TypeScript Support

All components are fully typed with TypeScript:

```typescript
import type { ButtonProps } from '@devdenvino/rts-common/components/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Component API

Each component has detailed API documentation:

- Props and their types
- Default values
- Usage examples
- Accessibility notes
- Styling options

[View API Reference →](/api/overview)

## Next Steps

- [Browse UI Components](/components/ui/all)
- [Layout System Guide](/guide/layouts)
- [Theming Guide](/guide/theming)
- [API Reference](/api/overview)
