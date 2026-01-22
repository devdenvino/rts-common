# Getting Started

This guide will help you get up and running with rts-common in just a few minutes.

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **React**: Version 18.0.0 or higher
- **TypeScript**: Version 5.0.0 or higher (optional but recommended)

## Installation

::: code-group

```bash [pnpm]
pnpm add @devdenvino/rts-common
```

```bash [npm]
npm install @devdenvino/rts-common
```

```bash [yarn]
yarn add @devdenvino/rts-common
```

:::

## Basic Setup

### 1. Import Styles

Import the compiled CSS file in your application entry point:

```typescript
import '@devdenvino/rts-common/style.css';
```

### 2. Configure Tailwind CSS

If you're using Tailwind CSS in your application, extend your configuration:

```javascript
// tailwind.config.js
import rtsCommonConfig from '@devdenvino/rts-common/tailwind.config';

export default {
  presets: [rtsCommonConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devdenvino/rts-common/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // Your custom configuration
};
```

### 3. Basic Application Setup

Here's a minimal example to get started:

```typescript
import { AppBase } from '@devdenvino/rts-common';
import '@devdenvino/rts-common/style.css';

function App() {
  return (
    <AppBase
      mfeId="my-app"
      oidcConfig={{
        authority: 'https://your-auth-server.com',
        client_id: 'your-client-id',
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      }}
      sidebarProps={{
        items: [
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: 'LayoutDashboard',
          },
          {
            label: 'Settings',
            href: '/settings',
            icon: 'Settings',
          },
        ],
      }}
    >
      <main>
        <h1>Welcome to My App</h1>
      </main>
    </AppBase>
  );
}

export default App;
```

## Using Individual Components

You can also import and use components individually:

```typescript
import { Button, Card, Input } from '@devdenvino/rts-common/components/ui';

function MyComponent() {
  return (
    <Card>
      <h2>Login</h2>
      <Input placeholder="Username" />
      <Button>Sign In</Button>
    </Card>
  );
}
```

## Using Hooks

rts-common provides useful hooks for common patterns:

```typescript
import { useAuth } from '@devdenvino/rts-common/hooks/use-auth';

function UserProfile() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={signIn}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.profile?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Next Steps

Now that you have rts-common installed and running, explore:

- **[Configuration](/guide/configuration)** - Learn about all configuration options
- **[Authentication](/guide/authentication)** - Set up OIDC authentication
- **[Components](/components/overview)** - Browse available components
- **[Theming](/guide/theming)** - Customize the look and feel
- **[API Reference](/api/overview)** - Detailed API documentation

## Common Issues

### Styles Not Loading

Make sure you've imported the CSS file:

```typescript
import '@devdenvino/rts-common/style.css';
```

### TypeScript Errors

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "types": ["vite/client"]
  }
}
```

### Module Resolution Errors

If you encounter module resolution errors, check your package.json:

```json
{
  "type": "module"
}
```

## Getting Help

- [GitHub Issues](https://github.com/devdenvino/rts-common/issues)
- [Contributing Guide](https://github.com/devdenvino/rts-common/blob/main/CONTRIBUTING.md)
- [Security Policy](https://github.com/devdenvino/rts-common/blob/main/SECURITY.md)
