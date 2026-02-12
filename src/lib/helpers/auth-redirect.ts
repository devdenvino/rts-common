/**
 * Authentication redirect preservation utilities
 * Preserves the original URL (including query parameters and hash) during OIDC authentication flow
 *
 * @module lib/helpers/auth-redirect
 */

const REDIRECT_KEY = "rts_auth_redirect_url";

/**
 * Store the current URL before authentication
 * This should be called before initiating the OIDC login flow
 */
export function storeRedirectUrl(): void {
  const currentUrl =
    window.location.pathname + window.location.search + window.location.hash;

  // Only store if it's not the root path and not already an OIDC callback
  const urlParams = new URLSearchParams(window.location.search);
  const isOidcCallback =
    urlParams.has("code") ||
    urlParams.has("state") ||
    urlParams.has("session_state");

  if (!isOidcCallback && currentUrl !== "/") {
    sessionStorage.setItem(REDIRECT_KEY, currentUrl);
  }
}

/**
 * Get the stored redirect URL without clearing it
 * @returns The stored URL or null if none exists
 */
export function getRedirectUrl(): string | null {
  return sessionStorage.getItem(REDIRECT_KEY);
}

/**
 * Clear the stored redirect URL
 */
export function clearRedirectUrl(): void {
  sessionStorage.removeItem(REDIRECT_KEY);
}

/**
 * Restore the user to their original URL after authentication
 * This retrieves and clears the stored URL
 * @returns The URL to redirect to, or null if none stored
 */
export function restoreRedirectUrl(): string | null {
  const redirectUrl = getRedirectUrl();
  if (redirectUrl) {
    clearRedirectUrl();
    return redirectUrl;
  }
  return null;
}

/**
 * Check if the current URL contains OIDC callback parameters
 * @returns true if this appears to be an OIDC callback
 */
export function isOidcCallback(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  return (
    urlParams.has("code") ||
    urlParams.has("state") ||
    urlParams.has("session_state")
  );
}

/**
 * Get the base redirect URI without query parameters
 * This is used for the OIDC redirect_uri configuration
 * @returns The base URL without query parameters
 */
export function getBaseRedirectUri(): string {
  return window.location.origin + window.location.pathname;
}

/**
 * Build the complete redirect URI preserving specific query parameters
 * Excludes OIDC-specific parameters
 * @param excludeParams - Additional parameters to exclude
 * @returns The redirect URI with preserved query parameters
 */
export function buildRedirectUri(excludeParams: string[] = []): string {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  // Default OIDC parameters to exclude
  const defaultExclude = ["code", "state", "session_state", "iss"];
  const allExclude = [...defaultExclude, ...excludeParams];

  // Remove excluded parameters
  allExclude.forEach((param) => params.delete(param));

  const queryString = params.toString();
  const baseUri = getBaseRedirectUri();

  return queryString ? `${baseUri}?${queryString}` : baseUri;
}
