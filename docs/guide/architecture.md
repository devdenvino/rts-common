# Architecture

Understanding the architecture of rts-common and how it fits into your application ecosystem.

## Overview

rts-common follows a modular architecture designed for micro-frontend applications. It provides shared components, utilities, and services that can be consumed by multiple applications while maintaining independence.

## Core Architecture

```
┌─────────────────────────────────────────┐
│         Your Application (MFE)          │
├─────────────────────────────────────────┤
│         rts-common (Shared Lib)         │
├───────────┬──────────┬─────────┬────────┤
│ Components│  Hooks   │  Utils  │ Types  │
├───────────┼──────────┼─────────┼────────┤
│  UI Lib   │   Auth   │  Theme  │  API   │
└───────────┴──────────┴─────────┴────────┘
        ↓          ↓         ↓         ↓
┌─────────────────────────────────────────┐
│      React, Radix UI, Tailwind CSS      │
└─────────────────────────────────────────┘
```

## Layer Structure

### Presentation Layer

**Components** provide the UI building blocks:
- shadcn/ui components (buttons, inputs, dialogs)
- Layout components (sidebar, navigation)
- MagicUI animated components

### Logic Layer

**Hooks and Utilities** handle business logic:
- `useAuth` for authentication
- `useApiClient` for API calls
- State management with Jotai
- Form handling with react-hook-form

### Integration Layer

**Context Providers** coordinate features:
- AuthProvider for OIDC authentication
- ThemeProvider for theme management
- NavigationProvider for app coordination
- SearchProvider for global search

### Data Layer

**Type Definitions and Models** ensure type safety:
- TypeScript interfaces
- Zod schemas for validation
- Shared data models

## Micro-Frontend Pattern

### Application Independence

Each micro-frontend (MFE) application:
- Is independently deployable
- Has its own routing and state
- Shares only the common UI library
- Can be developed by separate teams

### Shared Resources

rts-common provides:
- Consistent UI components
- Shared authentication
- Common utilities
- Type definitions
- Theme system

### Communication

Applications can communicate via:
- Shared navigation context
- URL-based routing
- Event bus (custom implementation)
- Shared state atoms (Jotai)

## Component Architecture

### Atomic Design

Components follow atomic design principles:

```
Atoms (Button, Input, Badge)
    ↓
Molecules (InputGroup, ButtonGroup)
    ↓
Organisms (Form, DataTable, Card)
    ↓
Templates (Sidebar, TopNav)
    ↓
Pages (Your Application)
```

### Composition Pattern

Components use composition for flexibility:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## State Management

### Local State

Use React hooks for component-local state:

```typescript
const [value, setValue] = useState('');
```

### Shared State

Use Jotai atoms for shared state:

```typescript
import { atom, useAtom } from 'jotai';

const userAtom = atom(null);

function Component() {
  const [user, setUser] = useAtom(userAtom);
}
```

### Server State

Use TanStack Query for server state:

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

## Authentication Flow

```
1. User accesses app
   ↓
2. AppBase checks auth status
   ↓
3. If not authenticated → Redirect to OIDC provider
   ↓
4. User logs in at provider
   ↓
5. Redirect back with auth code
   ↓
6. Exchange code for tokens
   ↓
7. Store tokens and user info
   ↓
8. Render authenticated app
```

## Theme System

### CSS Variables

Themes use CSS custom properties:

```css
:root {
  --primary: 210 100% 50%;
  --background: 0 0% 100%;
}

.dark {
  --primary: 210 100% 60%;
  --background: 240 10% 4%;
}
```

### Theme Context

React context manages theme state:

```typescript
const { theme, setTheme } = useTheme();
```

## Build System

### Library Build

- **tsup**: Bundles TypeScript → JavaScript
- **Vite**: Processes CSS with Tailwind
- **TypeScript**: Generates .d.ts files

### Output Structure

```
dist/
  ├── index.js          # Main entry
  ├── index.d.ts        # Type definitions
  ├── style.css         # Compiled styles
  └── components/       # Component modules
```

## Performance Considerations

### Code Splitting

Import only what you need:

```typescript
// ✅ Good - Tree-shakeable
import { Button } from '@devdenvino/rts-common/components/ui';

// ❌ Avoid - Imports everything
import { Button } from '@devdenvino/rts-common';
```

### Lazy Loading

Use React.lazy for routes:

```typescript
const Dashboard = lazy(() => import('./Dashboard'));
```

### Memoization

Memoize expensive computations:

```typescript
const result = useMemo(() => expensiveCalculation(data), [data]);
```

## Security Architecture

### Authentication

- OIDC/OAuth 2.0 with PKCE
- Token refresh mechanism
- Secure token storage
- XSS protection

### Authorization

- Role-based access control
- Route protection
- API authorization headers

## Deployment

### Package Publishing

1. Build library: `pnpm build`
2. Publish to npm: `pnpm publish`
3. Applications install and use

### Version Management

- Semantic versioning (semver)
- Peer dependencies for React
- Lock files for deterministic builds

## Next Steps

- [Micro-Frontend Guide](/guide/micro-frontends)
- [Best Practices](/guide/best-practices)
- [Component Overview](/components/overview)
