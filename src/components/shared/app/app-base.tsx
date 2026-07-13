import { useMemo, useEffect } from 'react';
import { AuthProvider, useAutoSignin } from 'react-oidc-context';
import type { AuthProviderProps } from 'react-oidc-context';
import { getAppConfig } from '@/lib/helpers/functions';
import { ThemeProvider } from '@/components/shared/theme';
import '@/styles/themes.css';
import { AppLayout, type AppLayoutProps } from '../layout/app-layout';
import { AppNavProvider } from '@/lib/contexts/navigation-context';
import { Loading } from '../status-routes/loading';
import { ErrorBoundary } from '../status-routes/error-boundary';
import { SearchProvider } from '@/lib/contexts/search-context';
import { GlobalDialogProvider } from '../dialog';
import {
  storeRedirectUrl,
  restoreRedirectUrl,
  isOidcCallback,
  getBaseRedirectUri,
} from '@/lib/helpers/auth-redirect';
import { TooltipProvider } from '@/components/ui';

function App({
  children,
  ...appLayoutProps
}: { children: React.ReactNode } & AppLayoutProps) {
  const { isLoading, isAuthenticated, error } = useAutoSignin({
    signinMethod: 'signinRedirect',
  });

  // Store the current URL before authentication redirect
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isOidcCallback()) {
      storeRedirectUrl();
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loading message="Authenticating..." />;
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!isAuthenticated) {
    return <Loading message="Redirecting to sign in..." />;
  }

  return <AppLayout {...appLayoutProps}>{children}</AppLayout>;
}

export type AppBaseProps = {
  children: React.ReactNode;
} & AppLayoutProps;

export default function AppBase({ children, ...appLayoutProps }: AppBaseProps) {
  const oidcConfig = useMemo((): AuthProviderProps => {
    const config = getAppConfig('hub');
    const authority = config?.oidcConfig?.authority ?? '';
    const client_id = config?.oidcConfig?.clientId ?? '';

    if (!authority || !client_id) {
      throw new Error(
        '[rts-common] OIDC config is missing. Ensure window._env contains oidcConfig.authority and oidcConfig.clientId.',
      );
    }

    return {
      authority,
      client_id,
      // Use base redirect URI without query params (OIDC spec compliant)
      redirect_uri: getBaseRedirectUri(),
      post_logout_redirect_uri: `${window.location.origin}/`,
      loadUserInfo: true,
      // Only include kc_idp_hint when explicitly configured — sending an empty
      // string can cause some IDPs to reject or misroute the login request.
      ...(config.oidcConfig.kcIdpHint && {
        extraQueryParams: { kc_idp_hint: config.oidcConfig.kcIdpHint },
      }),
      onSigninCallback: () => {
        // Restore the original URL the user was on before the auth redirect.
        const originalUrl = restoreRedirectUrl();
        window.history.replaceState(
          {},
          document.title,
          originalUrl ?? (window.location.pathname + window.location.hash),
        );
      },
    };
  // window._env is loaded once before the app mounts and is never mutated.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <GlobalDialogProvider />
        <AuthProvider {...oidcConfig}>
          <AppNavProvider>
            <SearchProvider>
              <App {...appLayoutProps}>{children}</App>
            </SearchProvider>
          </AppNavProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
