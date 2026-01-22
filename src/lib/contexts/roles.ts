import { useAuth } from 'react-oidc-context';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';

interface Claims {
  roles?: string[];
  role?: string;
  groups?: string[];
  permissions?: string[];
  'cognito:groups'?: string[];
  scp?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [clientId: string]: {
      roles: string[];
    };
  };
  [key: string]: unknown;
}

export function useRoles(options?: {
  keycloakClientId?: string;
  auth0RolesNamespace?: string;
}) {
  const { user } = useAuth();
  const roles: string[] = [];

  // 1) From ID token (already decoded)
  const profile = user?.profile as Claims | undefined;
  if (profile) {
    if (Array.isArray(profile.roles)) roles.push(...profile.roles);
    if (profile.role && !Array.isArray(profile.roles))
      roles.push(String(profile.role));
    if (Array.isArray(profile.groups)) roles.push(...profile.groups);
  }

  // 2) From Access Token (JWT)
  if (user?.access_token) {
    const at = jwtDecode<Claims>(user.access_token);

    // Generic
    if (Array.isArray(at.roles)) roles.push(...at.roles);
    if (Array.isArray(at.permissions)) roles.push(...at.permissions);
    if (Array.isArray(at['cognito:groups']))
      roles.push(...at['cognito:groups']);
    if (Array.isArray(at.groups)) roles.push(...at.groups);

    // Azure AD
    if (Array.isArray(at.roles)) roles.push(...at.roles); // app roles
    // at.scp exists but represents scopes, not roles

    // Auth0 (namespaced claim)
    if (options?.auth0RolesNamespace) {
      const auth0Roles = at[options.auth0RolesNamespace];
      if (Array.isArray(auth0Roles)) {
        roles.push(...auth0Roles);
      }
    }

    // Keycloak
    if (at.realm_access?.roles) roles.push(...at.realm_access.roles);
    const kcClient = options?.keycloakClientId;
    if (kcClient && at.resource_access?.[kcClient]?.roles) {
      roles.push(...at.resource_access[kcClient].roles);
    }
  }

  // Normalize
  return Array.from(new Set(roles.map(String)));
}

type ResourceAccess = {
  [clientId: string]: {
    roles: string[];
  };
};

export const useResourceAccess = (): ResourceAccess | null => {
  const { user } = useAuth();
  const accessToken = user?.access_token;

  // Memoize the result to avoid creating new object references on every render
  return useMemo(() => {
    if (!accessToken) return null;

    try {
      const decoded = jwtDecode<{ resource_access?: ResourceAccess }>(
        accessToken
      );
      return decoded.resource_access ?? null;
    } catch (error) {
      console.error('Failed to decode access token:', error);
      return null;
    }
  }, [accessToken]);
};
