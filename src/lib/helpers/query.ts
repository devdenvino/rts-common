import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // Throw errors to be caught by TanStack Router error boundaries
      throwOnError: true,
    },
    mutations: {
      retry: 0,
      // Throw errors to be caught by TanStack Router error boundaries
      throwOnError: true,
    },
  },
});
