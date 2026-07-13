/**
 * Authentication hooks and utilities
 * Re-exports from react-oidc-context for centralized auth management
 *
 * @module hooks/use-auth
 */

export {
	useAuth,
	AuthProvider,
	hasAuthParams,
	useAutoSignin,
	withAuth,
} from "react-oidc-context";
export type { AuthContextProps, AuthProviderProps } from "react-oidc-context";
export type { User, UserProfile } from "oidc-client-ts";

export { TanStackAuthStore } from "../lib/tanstack-auth-store";
