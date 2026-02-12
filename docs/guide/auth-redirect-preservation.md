# Authentication Redirect Preservation

## Overview

The `rts-common` package now includes built-in support for preserving the original URL (including query parameters and hash fragments) during OIDC authentication flows. This ensures users return to the exact page they were trying to access after completing authentication.

## How It Works

When a user visits a protected route while unauthenticated, the system automatically preserves their intended destination:

```
User visits: /dashboard?tab=analytics&period=7d
    ↓
URL stored in sessionStorage
    ↓
Redirected to OIDC login
    ↓
After authentication: /dashboard?tab=analytics&period=7d ✅
```

## Implementation

### Automatic Behavior (No Configuration Required)

The `AppBase` component now automatically:

1. **Stores the URL** before authentication redirect
2. **Restores the URL** after successful authentication
3. **Preserves** query parameters, hash fragments, and path

### How It Works

#### 1. URL Storage (Before Authentication)

When a user visits a protected route while unauthenticated:

```tsx
// In AppBase component
useEffect(() => {
  if (!isAuthenticated && !isLoading && !isOidcCallback()) {
    storeRedirectUrl(); // Stores current URL to sessionStorage
  }
}, [isAuthenticated, isLoading]);
```

#### 2. OIDC Configuration

The redirect URI is set to the base URL (OIDC spec compliant):

```tsx
const oidcConfig: AuthProviderProps = {
  authority: config?.oidcConfig?.authority || '',
  client_id: config?.oidcConfig?.clientId || '',
  redirect_uri: getBaseRedirectUri(), // e.g., https://app.com/
  // ... other config
};
```

#### 3. URL Restoration (After Authentication)

After successful authentication callback:

```tsx
onSigninCallback: () => {
  const originalUrl = restoreRedirectUrl();
  
  if (originalUrl) {
    // Navigate to original URL with query params
    window.history.replaceState({}, document.title, originalUrl);
  } else {
    // Fallback: clean up OIDC params
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
```

## API Reference

### Exported Utilities

The package exports the following utilities for advanced use cases:

#### `storeRedirectUrl()`
Stores the current URL in sessionStorage.

```tsx
import { storeRedirectUrl } from '@devdenvino/rts-common';

// Manually store URL before custom redirect
storeRedirectUrl();
```

#### `restoreRedirectUrl()`
Retrieves and clears the stored URL.

```tsx
import { restoreRedirectUrl } from '@devdenvino/rts-common';

const originalUrl = restoreRedirectUrl();
if (originalUrl) {
  router.navigate({ to: originalUrl });
}
```

#### `getRedirectUrl()`
Gets the stored URL without clearing it.

```tsx
import { getRedirectUrl } from '@devdenvino/rts-common';

const storedUrl = getRedirectUrl();
console.log('User was trying to access:', storedUrl);
```

#### `clearRedirectUrl()`
Clears the stored URL.

```tsx
import { clearRedirectUrl } from '@devdenvino/rts-common';

clearRedirectUrl();
```

#### `isOidcCallback()`
Checks if the current URL contains OIDC callback parameters.

```tsx
import { isOidcCallback } from '@devdenvino/rts-common';

if (isOidcCallback()) {
  console.log('This is an OIDC callback');
}
```

#### `getBaseRedirectUri()`
Gets the base redirect URI (origin + pathname).

```tsx
import { getBaseRedirectUri } from '@devdenvino/rts-common';

const baseUri = getBaseRedirectUri();
// Returns: https://app.com/path (without query params)
```

#### `buildRedirectUri(excludeParams?)`
Builds a redirect URI with preserved query parameters.

```tsx
import { buildRedirectUri } from '@devdenvino/rts-common';

// Exclude specific params
const uri = buildRedirectUri(['temp', 'debug']);
// Returns: https://app.com/path?keep=this (excludes 'temp' and 'debug')
```

## Usage Examples

### Example 1: Basic Usage (Automatic)

No code changes required! Just use `AppBase`:

```tsx
import { AppBase } from '@devdenvino/rts-common';

function App() {
  return (
    <AppBase>
      <YourApp />
    </AppBase>
  );
}
```

Query parameters are automatically preserved! ✅

### Example 2: Custom Authentication Flow

If you have a custom authentication flow:

```tsx
import { storeRedirectUrl, restoreRedirectUrl } from '@devdenvino/rts-common';

function CustomAuthButton() {
  const handleLogin = () => {
    // Store URL before custom redirect
    storeRedirectUrl();
    
    // Your custom login logic
    window.location.href = '/custom-login';
  };
  
  return <button onClick={handleLogin}>Login</button>;
}

// After authentication
function AuthCallback() {
  useEffect(() => {
    const originalUrl = restoreRedirectUrl();
    if (originalUrl) {
      router.navigate({ to: originalUrl });
    }
  }, []);
  
  return <div>Processing...</div>;
}
```

### Example 3: Conditional Redirect Preservation

```tsx
import { storeRedirectUrl, getRedirectUrl } from '@devdenvino/rts-common';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Only store specific routes
      if (location.pathname.startsWith('/dashboard')) {
        storeRedirectUrl();
      }
    }
  }, [isAuthenticated, location]);
  
  // ... rest of component
}
```

## Testing

### Test Scenario 1: Query Parameters
1. Log out
2. Visit: `http://localhost:3000/dashboard?tab=analytics`
3. Authenticate
4. **Expected**: Return to `/dashboard?tab=analytics` ✅

### Test Scenario 2: Hash Fragments
1. Log out
2. Visit: `http://localhost:3000/docs#section-3`
3. Authenticate
4. **Expected**: Return to `/docs#section-3` ✅

### Test Scenario 3: Complex URL
1. Log out
2. Visit: `http://localhost:3000/search?q=test&filter=active#results`
3. Authenticate
4. **Expected**: Return to `/search?q=test&filter=active#results` ✅

### Debugging

Check browser console for logs:
```
[RTS Auth] Stored redirect URL: /dashboard?tab=analytics
[RTS Auth] Signin callback triggered
[RTS Auth] Restoring to original URL: /dashboard?tab=analytics
```

Check sessionStorage:
```javascript
// In browser console
sessionStorage.getItem('rts_auth_redirect_url')
```

## Technical Details

### Storage Mechanism
- Uses `sessionStorage` (cleared when tab closes)
- Key: `rts_auth_redirect_url`
- Stores: Full path + query + hash

### OIDC Compliance
- `redirect_uri` set to base URL (no query params)
- Complies with OAuth 2.0 / OIDC specifications
- Works with all standard OIDC providers

### Security Considerations
- URLs stored in `sessionStorage` (not `localStorage`)
- Automatically cleared after use
- OIDC params (`code`, `state`, `session_state`) excluded
- No sensitive data should be in query parameters

### Browser Compatibility
- All modern browsers (Chrome 49+, Firefox 44+, Safari 10+, Edge 14+)
- Uses standard Web APIs (sessionStorage, URLSearchParams)
- No polyfills required

## Troubleshooting

### Query Parameters Still Lost

**Check:**
1. Verify you're using the latest version of `rts-common`
2. Check browser console for `[RTS Auth]` logs
3. Inspect sessionStorage for `rts_auth_redirect_url`

**Solution:**
```bash
# Update rts-common
pnpm update @devdenvino/rts-common
```

### Infinite Redirect Loop

**Cause:** OIDC callback detection failing

**Solution:**
```javascript
// Clear sessionStorage
sessionStorage.clear();

// Or manually clear the redirect URL
import { clearRedirectUrl } from '@devdenvino/rts-common';
clearRedirectUrl();
```

### URL Not Restored

**Check:**
1. Ensure `AppBase` is wrapping your app
2. Verify OIDC callback is triggering
3. Check that URL was stored before redirect

**Debug:**
```tsx
import { getRedirectUrl } from '@devdenvino/rts-common';

console.log('Stored URL:', getRedirectUrl());
```

## Features

- ✅ Automatic redirect preservation
- ✅ Exported auth-redirect utilities
- ✅ Integrated with AppBase component
- ✅ OIDC spec compliant redirect_uri
- ✅ Comprehensive logging for debugging

## Support

For issues or questions:
1. Check the [troubleshooting guide](#troubleshooting)
2. Review browser console logs
3. Open an issue in the rts-common repository
