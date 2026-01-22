# Sidebar Layout Component (sidebar-07)

This directory contains the shadcn sidebar-07 component adapted for the rts-common shared component library.

## Components

The sidebar layout consists of the following components:

- **AppSidebar**: The main sidebar component with team switcher, navigation, projects, and user menu
- **NavMain**: Collapsible navigation menu with icons and sub-items
- **NavProjects**: Projects list with dropdown actions
- **NavUser**: User profile dropdown in the footer
- **TeamSwitcher**: Organization/team switcher in the header

## Installation

The sidebar and its dependencies are already installed in this package. When consuming this package in your apps, make sure to install the peer dependencies:

```bash
npm install react react-dom
# or
pnpm add react react-dom
```

## Usage

### Basic Setup - Using AppLayout (Recommended)

The easiest way to use the sidebar is with the `AppLayout` component:

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function Page() {
  return (
    <AppLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", isCurrentPage: true },
      ]}
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </AppLayout>
  )
}
```

#### AppLayout Props

- `children` (required): The content to render in the main area
- `breadcrumbs` (optional): Array of breadcrumb items with `label`, `href`, and `isCurrentPage`
- `showBreadcrumbs` (optional): Show/hide breadcrumb navigation (default: `true`)
- `showSidebarTrigger` (optional): Show/hide sidebar toggle button (default: `true`)
- `className` (optional): Additional CSS class for the main content area
- `headerClassName` (optional): Additional CSS class for the header

### Manual Setup

If you need more control, you can use the individual components:

```tsx
import {
  AppSidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@devdenvino/rts-common'

// Also import the stylesheet
import '@devdenvino/rts-common/style.css'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/* Your header content */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Customizing the Sidebar

The `AppSidebar` component uses sample data defined internally. To customize it with your own data, you can:

1. **Create a custom version** - Copy the component and modify the data structure
2. **Make it configurable** - Accept props for navigation items, projects, teams, and user data

Example of making it configurable:

```tsx
// In your consuming app
import { AppSidebar, SidebarProvider } from '@devdenvino/rts-common'
import { Home, Settings, Users } from 'lucide-react'

const customNavigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: true,
    items: [
      { title: "Overview", url: "/dashboard/overview" },
      { title: "Analytics", url: "/dashboard/analytics" },
    ],
  },
  // ... more items
]

// Note: Current implementation uses internal data
// Consider creating a wrapper or forking AppSidebar for custom data
```

### Available Components

All UI components used by the sidebar are exported and can be used independently:

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  Collapsible,
  Breadcrumb,
  Separator,
} from '@devdenvino/rts-common'
```

### Features

- ✅ Collapsible sidebar with icon mode
- ✅ Team/organization switcher
- ✅ Nested navigation menus
- ✅ Projects management with dropdown actions
- ✅ User profile menu
- ✅ Mobile responsive
- ✅ Keyboard shortcuts support
- ✅ Accessible (ARIA compliant)
- ✅ Dark mode support

### Customization Tips

#### Changing Colors

The sidebar uses CSS variables for theming. Customize in your app's CSS:

```css
:root {
  --sidebar-background: 0 0% 98%;
  --sidebar-foreground: 240 5.3% 26.1%;
  --sidebar-primary: 240 5.9% 10%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 240 4.8% 95.9%;
  --sidebar-accent-foreground: 240 5.9% 10%;
  --sidebar-border: 220 13% 91%;
  --sidebar-ring: 217.2 91.2% 59.8%;
}
```

#### Icons

The sidebar uses lucide-react icons. You can replace them with your preferred icon library by modifying the component files.

## File Structure

```
src/components/shared/layout/
├── app.tsx              # AppLayout wrapper component (recommended)
├── app-sidebar.tsx      # Main sidebar component
├── nav-main.tsx         # Main navigation menu
├── nav-projects.tsx     # Projects sidebar menu
├── nav-user.tsx         # User dropdown menu
├── team-switcher.tsx    # Team/org switcher
└── index.ts             # Exports
```

## Dependencies

The sidebar requires the following shadcn/ui components (all included):

- `sidebar` - Core sidebar components
- `avatar` - User avatar display
- `dropdown-menu` - Dropdown menus
- `collapsible` - Collapsible navigation items
- `breadcrumb` - Breadcrumb navigation
- `separator` - Visual separators
- `tooltip` - Tooltips for collapsed state
- `sheet` - Mobile sidebar sheet
- `input` - Search input
- `skeleton` - Loading states

## Credits

This sidebar is based on the official [shadcn/ui sidebar-07 block](https://ui.shadcn.com/blocks).
