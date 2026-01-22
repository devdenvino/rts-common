# Layout System

Learn about the layout components provided by rts-common.

## Overview

rts-common provides layout components that help structure your application:

- **AppBase**: Main application wrapper
- **Sidebar**: Collapsible sidebar navigation
- **TopNav**: Top navigation bar

## AppBase

The main application wrapper that provides:
- OIDC authentication
- Theme management
- Layout structure
- Global providers

### Basic Usage

```typescript
import { AppBase } from '@devdenvino/rts-common';

<AppBase
  mfeId="my-app"
  oidcConfig={{
    authority: 'https://auth.example.com',
    client_id: 'my-client-id',
    redirect_uri: window.location.origin,
  }}
>
  <YourApp />
</AppBase>
```

### With Sidebar

```typescript
<AppBase
  mfeId="my-app"
  oidcConfig={/* ... */}
  sidebarProps={{
    items: [
      { label: 'Dashboard', href: '/', icon: 'Home' },
      { label: 'Settings', href: '/settings', icon: 'Settings' },
    ],
  }}
>
  <YourApp />
</AppBase>
```

## Sidebar

Collapsible sidebar navigation component.

### Props

```typescript
interface SidebarProps {
  items: SidebarItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
  variant?: 'sidebar' | 'floating' | 'inset';
}

interface SidebarItem {
  label: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
  type?: 'item' | 'separator' | 'group';
  badge?: string | number;
}
```

### Example

```typescript
const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    type: 'separator',
  },
  {
    label: 'Management',
    type: 'group',
    children: [
      { label: 'Users', href: '/users', icon: 'Users' },
      { label: 'Roles', href: '/roles', icon: 'Shield' },
    ],
  },
];

<Sidebar items={sidebarItems} collapsible defaultOpen />
```

## TopNav

Top navigation bar with branding and user menu.

### Props

```typescript
interface TopNavProps {
  brand?: {
    name: string;
    logo?: string;
    href?: string;
  };
  items?: NavItem[];
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  showSearch?: boolean;
}
```

### Example

```typescript
<TopNav
  brand={{
    name: 'My App',
    logo: '/logo.svg',
    href: '/',
  }}
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  showUserMenu
  showThemeToggle
  showSearch
/>
```

## Layout Patterns

### Classic Layout

```typescript
<AppBase
  sidebarProps={/* ... */}
  topNavProps={/* ... */}
>
  <main className="container mx-auto p-6">
    {children}
  </main>
</AppBase>
```

### Full Width Layout

```typescript
<AppBase>
  <div className="flex flex-col h-screen">
    <TopNav />
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  </div>
</AppBase>
```

## Next Steps

- [Configuration Guide](/guide/configuration)
- [Best Practices](/guide/best-practices)
