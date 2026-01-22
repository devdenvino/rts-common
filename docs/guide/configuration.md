# Configuration

Learn how to configure rts-common for your application's specific needs.

## AppBase Configuration

The `AppBase` component is the main entry point and accepts the following props:

```typescript
interface AppBaseProps {
  mfeId: string;
  oidcConfig: OIDCConfig;
  sidebarProps?: SidebarProps;
  topNavProps?: TopNavProps;
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'system';
  customThemes?: ThemeConfig[];
}
```

### mfeId

A unique identifier for your micro-frontend application:

```typescript
<AppBase mfeId="dashboard-app">
```

### oidcConfig

Configuration for OIDC authentication:

```typescript
<AppBase
  oidcConfig={{
    authority: 'https://auth.example.com',
    client_id: 'your-client-id',
    redirect_uri: window.location.origin,
    post_logout_redirect_uri: window.location.origin,
    scope: 'openid profile email',
    automaticSilentRenew: true,
    loadUserInfo: true,
  }}
>
```

**Required Fields:**
- `authority`: Your OIDC provider URL
- `client_id`: Your application's client ID
- `redirect_uri`: Where to redirect after authentication

**Optional Fields:**
- `post_logout_redirect_uri`: Where to redirect after logout
- `scope`: OAuth scopes to request
- `automaticSilentRenew`: Auto-refresh tokens (default: true)
- `loadUserInfo`: Load user profile information (default: true)

### sidebarProps

Configure the sidebar navigation:

```typescript
<AppBase
  sidebarProps={{
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
      },
      {
        label: 'Users',
        href: '/users',
        icon: 'Users',
        children: [
          { label: 'All Users', href: '/users/all' },
          { label: 'Add User', href: '/users/add' },
        ],
      },
      {
        type: 'separator',
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: 'Settings',
      },
    ],
    collapsible: true,
    defaultOpen: true,
    variant: 'sidebar',
  }}
>
```

**Item Properties:**
- `label`: Display text
- `href`: Navigation link
- `icon`: Icon name (Lucide icon string)
- `children`: Nested menu items
- `type`: 'item' | 'separator' | 'group'
- `badge`: Optional badge text/number

**Sidebar Properties:**
- `collapsible`: Allow sidebar to collapse
- `defaultOpen`: Initial collapsed state
- `variant`: 'sidebar' | 'floating' | 'inset'

### topNavProps

Configure the top navigation bar:

```typescript
<AppBase
  topNavProps={{
    brand: {
      name: 'My App',
      logo: '/logo.svg',
      href: '/',
    },
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ],
    showUserMenu: true,
    showThemeToggle: true,
    showSearch: true,
  }}
>
```

### theme

Set the default theme:

```typescript
<AppBase theme="dark">
  {/* Will use dark theme by default */}
</AppBase>
```

Options: `'light'` | `'dark'` | `'system'`

### customThemes

Add custom theme configurations:

```typescript
<AppBase
  customThemes={[
    {
      name: 'ocean',
      displayName: 'Ocean',
      cssVars: {
        light: {
          primary: '210 100% 50%',
          secondary: '190 100% 40%',
          // ... other variables
        },
        dark: {
          primary: '210 100% 60%',
          secondary: '190 100% 50%',
          // ... other variables
        },
      },
    },
  ]}
>
```

## Tailwind Configuration

### Basic Setup

```javascript
// tailwind.config.js
import rtsCommonConfig from '@devdenvino/rts-common/tailwind.config';

export default {
  presets: [rtsCommonConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devdenvino/rts-common/dist/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Customization

Override or extend the preset:

```javascript
export default {
  presets: [rtsCommonConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devdenvino/rts-common/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          // ... your custom colors
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

## CSS Variables

You can customize the theme using CSS variables:

```css
/* src/styles/custom.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark theme variables */
}
```

## Environment-Specific Configuration

### Development

```typescript
// config.dev.ts
export const config = {
  oidc: {
    authority: 'https://dev-auth.example.com',
    client_id: 'dev-client-id',
  },
  api: {
    baseUrl: 'https://dev-api.example.com',
  },
};
```

### Production

```typescript
// config.prod.ts
export const config = {
  oidc: {
    authority: 'https://auth.example.com',
    client_id: 'prod-client-id',
  },
  api: {
    baseUrl: 'https://api.example.com',
  },
};
```

### Using Configuration

```typescript
import { config } from './config';

<AppBase
  mfeId="my-app"
  oidcConfig={{
    authority: config.oidc.authority,
    client_id: config.oidc.client_id,
    redirect_uri: window.location.origin,
  }}
>
```

## TypeScript Configuration

Ensure proper type checking:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "@devdenvino/rts-common"],
    "paths": {
      "@/*": ["./src/*"],
      "@devdenvino/rts-common": ["./node_modules/@devdenvino/rts-common/dist/index.d.ts"]
    }
  }
}
```

## Next Steps

- [Authentication Guide](/guide/authentication) - Set up authentication
- [Theming Guide](/guide/theming) - Customize appearance
- [Layout System](/guide/layouts) - Configure layouts
