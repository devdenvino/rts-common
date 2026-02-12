import { AuthProvider, useAutoSignin } from "react-oidc-context";
import type { AuthProviderProps } from "react-oidc-context";
import { getAppConfig } from "@/lib/helpers/functions";
import { ThemeProvider } from "@/components/shared/theme";
import "@/styles/themes.css";
import { AppLayout, type AppLayoutProps } from "../layout/app-layout";
import { AppNavProvider } from "@/lib/contexts/navigation-context";
import { Loading } from "../status-routes/loading";
import { ErrorBoundary } from "../status-routes/error-boundary";
import { SearchProvider } from "@/lib/contexts/search-context";
import { GlobalDialogProvider } from "../dialog";
import {
  storeRedirectUrl,
  restoreRedirectUrl,
  isOidcCallback,
  getBaseRedirectUri,
} from "@/lib/helpers/auth-redirect";
import { useEffect } from "react";

function App({
  children,
  ...appLayoutProps
}: { children: React.ReactNode } & AppLayoutProps) {
  const { isLoading, isAuthenticated, error } = useAutoSignin({
    signinMethod: "signinRedirect",
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
} & AuthProviderProps &
  AppLayoutProps;

export default function AppBase({ children, ...appLayoutProps }: AppBaseProps) {
  const config = getAppConfig("hub");

  const oidcConfig: AuthProviderProps = {
    authority: config?.oidcConfig?.authority || "",
    client_id: config?.oidcConfig?.clientId || "",
    // Use base redirect URI without query params (OIDC spec compliant)
    redirect_uri: getBaseRedirectUri(),
    loadUserInfo: true, // Fetch additional user details from userinfo endpoint
    extraQueryParams: {
      kc_idp_hint: config?.oidcConfig?.kcIdpHint || "",
    },
    onSigninCallback: () => {
      // Restore the original URL with query parameters
      const originalUrl = restoreRedirectUrl();

      if (originalUrl) {
        // Navigate to the original URL
        window.history.replaceState({}, document.title, originalUrl);
      } else {
        // Fallback: Remove OIDC query params but keep the hash
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.hash,
        );
      }
    },
  };

  return (
    <ThemeProvider defaultTheme="light">
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
