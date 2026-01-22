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

function App({
  children,
  ...appLayoutProps
}: { children: React.ReactNode } & AppLayoutProps) {
  const { isLoading, isAuthenticated, error } = useAutoSignin({
    signinMethod: 'signinRedirect',
  });

  if (isLoading) {
    return <Loading message='Authenticating...' />;
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!isAuthenticated) {
    return <Loading message='Redirecting to sign in...' />;
  }

  return <AppLayout {...appLayoutProps}>{children}</AppLayout>;
}

export type AppBaseProps = {
  children: React.ReactNode;
} & AuthProviderProps &
  AppLayoutProps;

export default function AppBase({ children, ...appLayoutProps }: AppBaseProps) {
  const config = getAppConfig('hub');

  const oidcConfig: AuthProviderProps = {
    authority: config?.oidcConfig?.authority || '',
    client_id: config?.oidcConfig?.clientId || '',
    redirect_uri: window.location.href.split('?')[0], // Or your specific redirect URI
    loadUserInfo: true, // Fetch additional user details from userinfo endpoint
    extraQueryParams: {
      kc_idp_hint: config?.oidcConfig?.kcIdpHint || '',
    },
    onSigninCallback: () => {
      // Remove the query params from the URL, but keep the hash for routing
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + window.location.hash
      );
    },
  };

  return (
    <ThemeProvider defaultTheme='light'>
      <GlobalDialogProvider />
      <AuthProvider {...oidcConfig}>
        <AppNavProvider>
          <SearchProvider>
            <App {...appLayoutProps}>{children}</App>
          </SearchProvider>
        </AppNavProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
