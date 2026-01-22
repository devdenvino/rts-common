# Authentication

rts-common provides built-in OIDC authentication using [react-oidc-context](https://github.com/authts/react-oidc-context). This guide covers how to set up and use authentication in your application.

## Quick Start

```typescript
import { AppBase, useAuth } from '@devdenvino/rts-common';
import '@devdenvino/rts-common/style.css';

function App() {
  return (
    <AppBase
      mfeId="my-app"
      oidcConfig={{
        authority: 'https://your-oidc-provider.com',
        client_id: 'your-client-id',
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      }}
    >
      <AuthenticatedContent />
    </AppBase>
  );
}

function AuthenticatedContent() {
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

## OIDC Configuration

### Required Properties

```typescript
interface OIDCConfig {
  authority: string;        // Your OIDC provider URL
  client_id: string;        // Your application's client ID
  redirect_uri: string;     // Where to redirect after login
}
```

### Optional Properties

```typescript
interface OIDCConfig {
  // ... required props
  
  post_logout_redirect_uri?: string;  // Where to redirect after logout
  scope?: string;                     // OAuth scopes (default: 'openid profile email')
  response_type?: string;             // Response type (default: 'code')
  
  // Token Management
  automaticSilentRenew?: boolean;     // Auto-refresh tokens (default: true)
  silent_redirect_uri?: string;       // URI for silent token renewal
  accessTokenExpiringNotificationTimeInSeconds?: number;
  
  // User Info
  loadUserInfo?: boolean;             // Load user profile (default: true)
  
  // PKCE
  code_challenge_method?: string;     // PKCE method (default: 'S256')
  
  // Additional
  metadata?: {
    issuer?: string;
    authorization_endpoint?: string;
    token_endpoint?: string;
    userinfo_endpoint?: string;
    end_session_endpoint?: string;
  };
}
```

### Full Example

```typescript
<AppBase
  mfeId="my-app"
  oidcConfig={{
    authority: 'https://auth.example.com',
    client_id: 'my-client-id',
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: window.location.origin,
    scope: 'openid profile email roles',
    response_type: 'code',
    automaticSilentRenew: true,
    silent_redirect_uri: `${window.location.origin}/auth/silent-callback`,
    loadUserInfo: true,
    accessTokenExpiringNotificationTimeInSeconds: 60,
  }}
>
```

## Using the useAuth Hook

The `useAuth` hook provides access to authentication state and methods:

```typescript
import { useAuth } from '@devdenvino/rts-common/hooks/use-auth';

function MyComponent() {
  const {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Methods
    signIn,
    signOut,
    removeUser,
    
    // Token Management
    signinSilent,
    
    // User Info
    getUserProfile,
  } = useAuth();
}
```

### Authentication State

```typescript
// Check if user is authenticated
if (isAuthenticated) {
  console.log('User is logged in');
}

// Access user information
console.log(user?.profile?.name);
console.log(user?.profile?.email);
console.log(user?.access_token);

// Check loading state
if (isLoading) {
  return <div>Loading...</div>;
}

// Handle errors
if (error) {
  console.error('Auth error:', error);
}
```

### Sign In

```typescript
function LoginButton() {
  const { signIn } = useAuth();
  
  return (
    <button onClick={() => signIn()}>
      Sign In
    </button>
  );
}

// With custom redirect
function LoginWithRedirect() {
  const { signIn } = useAuth();
  
  return (
    <button onClick={() => signIn({ redirect_uri: '/dashboard' })}>
      Sign In
    </button>
  );
}
```

### Sign Out

```typescript
function LogoutButton() {
  const { signOut } = useAuth();
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

### Access User Profile

```typescript
function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div>
      <h2>{user.profile.name}</h2>
      <p>{user.profile.email}</p>
      {user.profile.picture && (
        <img src={user.profile.picture} alt={user.profile.name} />
      )}
    </div>
  );
}
```

## Protected Routes

Create a protected route component:

```typescript
import { useAuth } from '@devdenvino/rts-common/hooks/use-auth';
import { Navigate } from '@tanstack/react-router';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

// Usage
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

## Access Tokens

### Get Access Token

```typescript
function ApiCall() {
  const { user } = useAuth();
  
  async function fetchData() {
    const token = user?.access_token;
    
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  }
  
  return <button onClick={fetchData}>Fetch Data</button>;
}
```

### Using with API Client

```typescript
import { useApiClient } from '@devdenvino/rts-common';

function MyComponent() {
  const api = useApiClient({
    baseURL: 'https://api.example.com',
  });
  
  async function fetchUsers() {
    // Token is automatically included
    const response = await api.get('/users');
    return response.data;
  }
}
```

## Token Refresh

Tokens are automatically refreshed when `automaticSilentRenew` is enabled:

```typescript
<AppBase
  oidcConfig={{
    authority: 'https://auth.example.com',
    client_id: 'my-client-id',
    redirect_uri: window.location.origin,
    automaticSilentRenew: true,  // Enable auto-refresh
    silent_redirect_uri: `${window.location.origin}/auth/silent-callback`,
  }}
>
```

Create a silent callback page:

```html
<!-- public/auth/silent-callback.html -->
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/oidc-client/dist/oidc-client.min.js"></script>
  </head>
  <body>
    <script>
      new Oidc.UserManager().signinSilentCallback();
    </script>
  </body>
</html>
```

## Role-Based Access Control

```typescript
function AdminPanel() {
  const { user } = useAuth();
  
  const hasRole = (role: string) => {
    return user?.profile?.roles?.includes(role);
  };
  
  if (!hasRole('admin')) {
    return <div>Access Denied</div>;
  }
  
  return <div>Admin Panel Content</div>;
}
```

## Error Handling

```typescript
function AuthErrorHandler() {
  const { error, removeUser } = useAuth();
  
  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
      
      if (error.message.includes('login_required')) {
        // Redirect to login
        signIn();
      } else if (error.message.includes('access_denied')) {
        // Handle access denied
        removeUser();
      }
    }
  }, [error]);
  
  return null;
}
```

## Testing

### Mock Authentication

```typescript
// test-utils.tsx
import { AuthProvider } from '@devdenvino/rts-common';

export function MockAuthProvider({ children, user = null }) {
  const mockAuth = {
    user: user || {
      profile: {
        sub: '123',
        name: 'Test User',
        email: 'test@example.com',
      },
      access_token: 'mock-token',
    },
    isAuthenticated: !!user,
    isLoading: false,
    error: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
  
  return (
    <AuthProvider value={mockAuth}>
      {children}
    </AuthProvider>
  );
}
```

## Common Providers

### Azure AD / Entra ID

```typescript
<AppBase
  oidcConfig={{
    authority: 'https://login.microsoftonline.com/{tenant-id}/v2.0',
    client_id: 'your-client-id',
    redirect_uri: window.location.origin,
    scope: 'openid profile email User.Read',
  }}
>
```

### Auth0

```typescript
<AppBase
  oidcConfig={{
    authority: 'https://your-domain.auth0.com',
    client_id: 'your-client-id',
    redirect_uri: window.location.origin,
    scope: 'openid profile email',
  }}
>
```

### Keycloak

```typescript
<AppBase
  oidcConfig={{
    authority: 'https://keycloak.example.com/auth/realms/your-realm',
    client_id: 'your-client-id',
    redirect_uri: window.location.origin,
    scope: 'openid profile email',
  }}
>
```

## Best Practices

1. **Use Environment Variables** for sensitive configuration
2. **Enable Silent Renewal** for better UX
3. **Handle Errors** gracefully
4. **Implement Token Validation** on the backend
5. **Use HTTPS** in production
6. **Set Appropriate Scopes** based on your needs
7. **Implement Proper Logout** including token revocation

## Next Steps

- [API Client Guide](/guide/api-client) - Using authenticated API calls
- [Layouts](/guide/layouts) - User menus and navigation
- [Best Practices](/guide/best-practices) - Security and performance tips
