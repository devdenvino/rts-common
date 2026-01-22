# useAuth

Access authentication state and methods provided by react-oidc-context.

## Import

```typescript
import { useAuth } from '@devdenvino/rts-common/hooks/use-auth';
```

## Usage

```typescript
function MyComponent() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut,
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

## Return Value

### State Properties

#### user

- **Type**: `User | null | undefined`
- **Description**: The authenticated user object containing profile and tokens

```typescript
{
  profile: {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
    roles?: string[];
    // ... other claims
  };
  access_token: string;
  token_type: string;
  expires_at?: number;
  // ... other properties
}
```

#### isAuthenticated

- **Type**: `boolean`
- **Description**: Whether the user is currently authenticated

#### isLoading

- **Type**: `boolean`
- **Description**: Whether authentication is currently loading

#### error

- **Type**: `Error | null`
- **Description**: Any authentication error that occurred

#### activeNavigator

- **Type**: `string | undefined`
- **Description**: The type of navigation in progress

### Methods

#### signIn

- **Type**: `(args?: SigninRedirectArgs) => Promise<void>`
- **Description**: Initiates the sign-in process
- **Parameters**:
  - `args` (optional): Additional sign-in options
    - `redirect_uri?: string` - Override redirect URI
    - `state?: string` - Custom state
    - `extraQueryParams?: Record<string, string>` - Additional query parameters

```typescript
// Basic sign in
await signIn();

// With custom redirect
await signIn({ redirect_uri: '/dashboard' });

// With extra parameters
await signIn({
  extraQueryParams: { prompt: 'login' }
});
```

#### signOut

- **Type**: `(args?: SignoutRedirectArgs) => Promise<void>`
- **Description**: Signs out the user
- **Parameters**:
  - `args` (optional): Additional sign-out options
    - `post_logout_redirect_uri?: string` - Where to redirect after logout
    - `state?: string` - Custom state
    - `id_token_hint?: string` - ID token hint

```typescript
// Basic sign out
await signOut();

// With custom redirect
await signOut({
  post_logout_redirect_uri: '/goodbye'
});
```

#### removeUser

- **Type**: `() => Promise<void>`
- **Description**: Removes the user from storage without server logout

```typescript
await removeUser();
```

#### signinSilent

- **Type**: `(args?: SigninSilentArgs) => Promise<User>`
- **Description**: Silently renew the user's token
- **Returns**: Promise resolving to the updated User

```typescript
const user = await signinSilent();
```

#### getUserProfile

- **Type**: `() => User['profile'] | undefined`
- **Description**: Helper to get the user's profile
- **Returns**: The user's profile object or undefined

```typescript
const profile = getUserProfile();
console.log(profile?.name);
console.log(profile?.email);
```

## Examples

### Protected Component

```typescript
function ProtectedComponent() {
  const { isAuthenticated, isLoading, signIn } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>Please sign in to continue</p>
        <button onClick={signIn}>Sign In</button>
      </div>
    );
  }

  return <div>Protected Content</div>;
}
```

### User Profile Display

```typescript
function UserProfile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div>
      {user.profile.picture && (
        <img src={user.profile.picture} alt={user.profile.name} />
      )}
      <h2>{user.profile.name}</h2>
      <p>{user.profile.email}</p>
    </div>
  );
}
```

### Authenticated API Call

```typescript
function DataFetcher() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.example.com/data', {
        headers: {
          'Authorization': `Bearer ${user?.access_token}`,
        },
      });
      const result = await response.json();
      setData(result);
    }

    if (user?.access_token) {
      fetchData();
    }
  }, [user]);

  return <div>{JSON.stringify(data)}</div>;
}
```

### Role-Based Access

```typescript
function AdminPanel() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role: string) => {
    return user?.profile?.roles?.includes(role);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasRole('admin')) {
    return <div>Access Denied</div>;
  }

  return <div>Admin Panel Content</div>;
}
```

### Error Handling

```typescript
function AuthErrorHandler() {
  const { error, signIn, removeUser } = useAuth();

  useEffect(() => {
    if (error) {
      console.error('Auth error:', error);

      if (error.message.includes('login_required')) {
        signIn();
      } else if (error.message.includes('access_denied')) {
        removeUser();
      }
    }
  }, [error, signIn, removeUser]);

  if (error) {
    return (
      <div className="error">
        <p>Authentication Error: {error.message}</p>
        <button onClick={signIn}>Try Again</button>
      </div>
    );
  }

  return null;
}
```

### Logout with Confirmation

```typescript
function LogoutButton() {
  const { signOut } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        Logout
      </button>
      {showConfirm && (
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout?
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
```

## TypeScript

```typescript
import type { User } from 'oidc-client-ts';

// User type is exported from oidc-client-ts
const user: User | null = useAuth().user;

// Profile type
interface UserProfile {
  sub: string;
  name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  preferred_username?: string;
  roles?: string[];
  [key: string]: any;
}
```

## See Also

- [Authentication Guide](/guide/authentication)
- [useApiClient Hook](/api/hooks/use-api)
- [Configuration](/guide/configuration)
