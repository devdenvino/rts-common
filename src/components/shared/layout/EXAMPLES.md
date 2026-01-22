# AppLayout Component - Usage Examples

## Example 1: Basic Usage

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function Dashboard() {
  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <p>Your content goes here</p>
    </AppLayout>
  )
}
```

## Example 2: With Breadcrumbs

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function UserSettings() {
  return (
    <AppLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings" },
        { label: "User Profile", isCurrentPage: true },
      ]}
    >
      <h1>User Profile Settings</h1>
      <p>Configure your user profile here</p>
    </AppLayout>
  )
}
```

## Example 3: Without Breadcrumbs

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function SimplePage() {
  return (
    <AppLayout showBreadcrumbs={false}>
      <h1>Simple Page</h1>
      <p>This page doesn't show breadcrumbs</p>
    </AppLayout>
  )
}
```

## Example 4: With Custom Styling

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function CustomPage() {
  return (
    <AppLayout
      className="bg-gray-50"
      headerClassName="border-b"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Custom Page", isCurrentPage: true },
      ]}
    >
      <div className="container mx-auto">
        <h1>Custom Styled Page</h1>
        <p>Main content with custom styling</p>
      </div>
    </AppLayout>
  )
}
```

## Example 5: Full Dashboard Example

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function FullDashboard() {
  return (
    <AppLayout
      breadcrumbs={[
        { label: "Building Your Application", href: "#" },
        { label: "Data Fetching", isCurrentPage: true },
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

## Example 6: Integration with React Router

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'
import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const location = useLocation()
  
  // Generate breadcrumbs based on current route
  const breadcrumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: index < arr.length - 1 ? `/${arr.slice(0, index + 1).join('/')}` : undefined,
      isCurrentPage: index === arr.length - 1,
    }))

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Outlet />
    </AppLayout>
  )
}
```

## Example 7: Without Sidebar Trigger

```tsx
import { AppLayout } from '@devdenvino/rts-common'
import '@devdenvino/rts-common/style.css'

export default function NoTogglePage() {
  return (
    <AppLayout 
      showSidebarTrigger={false}
      breadcrumbs={[
        { label: "Always Visible Sidebar", isCurrentPage: true },
      ]}
    >
      <h1>Page without sidebar toggle</h1>
      <p>The sidebar cannot be collapsed on this page</p>
    </AppLayout>
  )
}
```

## TypeScript Props Reference

```tsx
interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: Array<{
    label: string
    href?: string
    isCurrentPage?: boolean
  }>
  showBreadcrumbs?: boolean // default: true
  showSidebarTrigger?: boolean // default: true
  className?: string
  headerClassName?: string
}
```
