# @devdenvino/rts-common

Shared component library and utilities for micro-frontend applications.

## Overview

`rts-common` is a comprehensive shared library that provides:
- UI components (shadcn/ui, MagicUI)
- Layout components (Sidebar, TopNav)
- Authentication utilities (react-oidc-context)
- Hooks and utilities
- Theme management
- Type definitions

## Installation

```bash
pnpm add @devdenvino/rts-common
```

## Quick Start

```typescript
import { AppBase, useAuth } from '@devdenvino/rts-common';
import '@devdenvino/rts-common/style.css';

function App() {
  return (
    <AppBase
      mfeId="my-app"
      oidcConfig={{
        authority: 'https://auth.example.com',
        client_id: 'my-client-id',
        redirect_uri: window.location.origin,
      }}
      sidebarProps={{ /* ... */ }}
    >
      <YourAppContent />
    </AppBase>
  );
}
```

## Available Exports

### Main Export (`@devdenvino/rts-common`)

- Components: `AppBase`, `ErrorBoundary`, `NotFound`, `Loading`, etc.
- Hooks: `useAuth`, `useApiClient`, `useIsMobile`
- Utilities: `cn`, helper functions
- Context providers: `AppNavProvider`, `SearchProvider`
- Types: `AppConfig`, `NavMenu`, etc.

### Component Exports

- `@devdenvino/rts-common/components/ui` - shadcn/ui components
- `@devdenvino/rts-common/components/ui/custom` - Custom components (DataTable, etc.)
- `@devdenvino/rts-common/components/magicui` - MagicUI components

### Auth Exports

- `@devdenvino/rts-common/hooks/use-auth` - Authentication utilities

See [AUTH_EXPORTS.md](./docs/AUTH_EXPORTS.md) for detailed authentication documentation.

### Icon Exports

- `@devdenvino/rts-common/lucide-react` - Lucide icons
- `@devdenvino/rts-common/tabler-icons-react` - Tabler icons

### Other Exports

- `@devdenvino/rts-common/tanstack-react-table` - TanStack Table
- `@devdenvino/rts-common/motion` - Motion animations
- `@devdenvino/rts-common/style.css` - Compiled styles
- `@devdenvino/rts-common/styles/source` - Source CSS (for Tailwind config)
- `@devdenvino/rts-common/tailwind.config` - Tailwind configuration

## Documentation

- [Authentication Guide](./docs/AUTH_EXPORTS.md) - Complete guide to using authentication
- [TSUP Migration](./TSUP-MIGRATION.md) - Build system documentation

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Build JavaScript only
pnpm build:js

# Build CSS only
pnpm build:css

# Development mode
pnpm dev
```

## Usage Examples

### Using Authentication

```typescript
import { useAuth } from '@devdenvino/rts-common';

function MyComponent() {
  const auth = useAuth();
  
  if (auth.isLoading) return <div>Loading...</div>;
  if (!auth.isAuthenticated) return <button onClick={() => auth.signinRedirect()}>Login</button>;
  
  return <div>Welcome, {auth.user?.profile.name}</div>;
}
```

### Using API Client

```typescript
import { useApiClient } from '@devdenvino/rts-common';

function DataComponent() {
  const apiClient = useApiClient();
  
  const fetchData = async () => {
    // Automatically includes auth token
    const response = await apiClient.get('/api/data');
    return response.data;
  };
  
  // ...
}
```

### Using UI Components

```typescript
import { Button } from '@devdenvino/rts-common/components/ui';

function MyComponent() {
  return <Button variant="default">Click me</Button>;
}
```

## Best Practices

1. **Always import styles**: `import '@devdenvino/rts-common/style.css'`
2. **Use tree-shakeable exports**: Import from specific paths when possible
3. **Leverage AppBase**: Use it to set up authentication and layout automatically
4. **Use useApiClient**: For authenticated API calls
5. **Check documentation**: Refer to docs/ folder for detailed guides

## Peer Dependencies

This package requires the following peer dependencies to be installed in your project:

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## Support

For issues and questions:
- GitHub Issues: https://github.com/devdenvino/rts-common/issues
- Documentation: See the docs/ folder

## License

MIT License - see [LICENSE](LICENSE) file for details
