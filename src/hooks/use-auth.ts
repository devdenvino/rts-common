/**
 * Authentication hooks and utilities
 * Re-exports from react-oidc-context for centralized auth management
 *
 * @module hooks/use-auth
 */

// Re-export the primary authentication hook
export { useAuth } from 'react-oidc-context';

// Re-export other useful hooks from react-oidc-context
export { hasAuthParams, useAutoSignin } from 'react-oidc-context';

// Re-export types for better TypeScript support
export type { AuthContextProps, AuthProviderProps } from 'react-oidc-context';

// Re-export the AuthProvider component
export { AuthProvider } from 'react-oidc-context';

export { TanStackAuthStore } from '../lib/tanstack-auth-store';
