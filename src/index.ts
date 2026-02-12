// Styles are built separately and exported as '@devdenvino/rts-common/style.css'
// Consumers should import the CSS file directly:
// import '@devdenvino/rts-common/style.css'

// Export all your components, hooks, and utilities here

export {
  default as AppBase,
  type AppBaseProps,
} from "@/components/shared/app/app-base";
export * from "@/components/shared/theme";
export * from "@/components/shared/dialog";

// Export error boundary and loading components
export { ErrorBoundary } from "@/components/shared/status-routes/error-boundary";
export { NotFound } from "@/components/shared/status-routes/not-found";
export { Loading, LoadingSpinner, LoadingOverlay } from "@/components/shared/status-routes/loading";

// Export animation utilities
export * from "@/lib/animations";

// Export shadcn/ui components
export {
  RouterBreadcrumb,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/custom/breadcrumb';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export type { AppLayoutProps } from "@/components/shared/layout/app-layout";

// Export utilities
export { cn } from "./lib/utils";

export * from "./lib/helpers/functions";
export * from "./lib/helpers/query";
export * from "./lib/helpers/auth-redirect";

// Export hooks
export { useIsMobile } from "@/hooks/use-mobile";
export { useApiClient } from '@/hooks/use-api';

// Export auth hooks and utilities from react-oidc-context
export {
  useAuth,
  useAutoSignin,
  hasAuthParams,
  AuthProvider,
  type AuthContextProps,
  type AuthProviderProps,
} from '@/hooks/use-auth';

// Export navigation context
export { AppNavProvider, useAppNav } from "@/lib/contexts/navigation-context";

// Export search context
export { SearchProvider, useSearchContext, useRegisterSearch, useClearSearchHandlers, useMFESearchLifecycle, useHasSearchHandlers } from "@/lib/contexts/search-context";
export type { SearchResultItem, SearchHandler } from "@/lib/contexts/search-context";

// Export types
export type {
  AppConfig,
  AppDetail,
  IdName,
  MemberDetail,
  NavMenu,
} from "@/lib/models/types";
