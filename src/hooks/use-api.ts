import { getAppConfig } from '@/lib/helpers/functions';
import { useRouteContext } from '@tanstack/react-router';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import { toast } from 'sonner';

/**
 * Extended error type with API response details
 */
interface ApiError extends Error {
  status?: number;
  statusText?: string;
  errorType?: string;
  data?: any;
  traceback?: string;
  code?: string;
  originalError?: any;
}

/**
 * Custom hook to create an API client with authentication
 * Combines route context (baseUrl, mfeId) with OIDC authentication
 * @returns Configured axios instance with auth interceptors
 */
export function useApiClient(): AxiosInstance {
  const { mfeId, baseUrl } = useRouteContext({ from: '__root__' });
  const auth = useAuth();

  const apiClient = useMemo(() => {
    const appConfig = getAppConfig(mfeId);
    const instance = axios.create({
      baseURL: baseUrl || appConfig?.apiBase || `/${mfeId}-api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add bearer token
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (auth.isAuthenticated && auth.user?.access_token) {
          config.headers.Authorization = `Bearer ${auth.user.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling and token refresh
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized - attempt token refresh once
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          auth.isAuthenticated
        ) {
          originalRequest._retry = true;

          try {
            await auth.signinSilent();

            // Retry request with refreshed token
            if (auth.user?.access_token) {
              originalRequest.headers.Authorization = `Bearer ${auth.user.access_token}`;
              return instance(originalRequest);
            }

            // No token after refresh - throw error to let error boundary handle it
            throw createApiError(
              'Session expired. Please sign in again.',
              401,
              'authentication_required'
            );
          } catch (refreshError) {
            // Throw error to let error boundary handle it
            throw createApiError(
              'Authentication failed. Please sign in again.',
              401,
              'authentication_failed',
              refreshError
            );
          }
        }

        // Enrich and throw error
        throw enrichApiError(error);
      }
    );

    return instance;
  }, [baseUrl, mfeId, auth]);

  return apiClient;
}

/**
 * Creates a structured API error
 */
function createApiError(
  message: string,
  status?: number,
  errorType?: string,
  originalError?: any
): ApiError {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.errorType = errorType;
  error.originalError = originalError;
  return error;
}

/**
 * Enriches axios errors with additional context for error boundaries
 */
function enrichApiError(error: AxiosError): ApiError {
  // Network or request setup error
  if (!error.response) {
    const networkError = createApiError(
      error.message || 'Network error occurred',
      0,
      'network_error'
    );
    networkError.code = error.code;
    networkError.originalError = error;

    // Show toast for network errors
    toast.error('Network error. Please check your connection.');

    return networkError;
  }

  // API response error
  const responseData = error.response.data as any;
  const message =
    responseData?.error_message ||
    responseData?.message ||
    error.message ||
    'An unexpected error occurred';

  const enrichedError = createApiError(
    message,
    error.response.status,
    responseData?.error_type
  ) as ApiError;

  enrichedError.statusText = error.response.statusText;
  enrichedError.data = responseData;
  enrichedError.code = error.code;
  enrichedError.originalError = error;

  // Include traceback if available (useful for debugging)
  if (responseData?.traceback) {
    enrichedError.traceback = responseData.traceback;
  }

  // Show toast for client/server errors, but skip for auth errors (401, 403)
  // Error boundary should handle display for those
  const shouldShowToast = 
    error.response.status !== 401 && 
    error.response.status !== 403 &&
    error.response.status >= 400;
  
  if (shouldShowToast) {
    toast.error(message);
  }

  return enrichedError;
}
