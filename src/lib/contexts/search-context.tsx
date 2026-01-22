/// <reference types="vite/client" />
import { createContext, useContext, useCallback, useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface SearchResultItem {
  href: string;
  title: string;
  icon?: ReactNode;
  element?: ReactNode;
}

export interface SearchHandler {
  mfeId?: string;
  search: (query: string) => Promise<SearchResultItem[]> | SearchResultItem[];
  priority?: number; // For ordering results
  namespace?: string; // Identify source
}

interface SearchContextType {
  registerSearchHandler: (handler: SearchHandler) => void;
  unregisterSearchHandler: (handler: SearchHandler) => void;
  clearAllHandlers: () => void;
  executeSearch: (query: string) => Promise<SearchResultItem[]>;
  hasHandlers: () => boolean;
  handlerCount: number;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const handlersRef = useRef<Set<SearchHandler>>(new Set());
  const [handlerCount, setHandlerCount] = useState(0);

  const registerSearchHandler = useCallback((handler: SearchHandler) => {
    handlersRef.current.add(handler);
    setHandlerCount(handlersRef.current.size);
  }, []);

  const unregisterSearchHandler = useCallback((handler: SearchHandler) => {
    handlersRef.current.delete(handler);
    setHandlerCount(handlersRef.current.size);
  }, []);

  const clearAllHandlers = useCallback(() => {
    handlersRef.current.clear();
    setHandlerCount(0);
  }, []);

  const hasHandlers = useCallback(() => {
    return handlersRef.current.size > 0;
  }, []);

  const executeSearch = useCallback(async (query: string) => {
    const handlers = Array.from(handlersRef.current);
    
    const results = await Promise.all(
      handlers.map(async (handler) => {
        try {
          const items = await handler.search(query);
          return items.map(item => ({
            ...item,
            namespace: handler.namespace || 'default',
            priority: handler.priority || 0
          }));
        } catch (error) {
          // Log search errors in development
          if (import.meta.env.DEV) {
            console.error(`[Search Context] Search error in ${handler.namespace}:`, error);
          }
          return [];
        }
      })
    );

    const flatResults = results.flat();
    const sortedResults = flatResults.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    return sortedResults;
  }, []);

  return (
    <SearchContext.Provider value={{ registerSearchHandler, unregisterSearchHandler, clearAllHandlers, hasHandlers, handlerCount, executeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
}

export function useRegisterSearch(handler: SearchHandler) {
  const { registerSearchHandler, unregisterSearchHandler } = useSearchContext();
  const handlerRef = useRef(handler);

  // Update ref when handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const stableHandler: SearchHandler = {
      search: (query: string) => handlerRef.current.search(query),
      priority: handler.priority,
      namespace: handler.namespace,
    };
    
    registerSearchHandler(stableHandler);
    return () => unregisterSearchHandler(stableHandler);
  }, [registerSearchHandler, unregisterSearchHandler, handler.priority, handler.namespace]);
}

// Hook to clear all search handlers (useful when switching MFEs)
export function useClearSearchHandlers() {
  const { clearAllHandlers } = useSearchContext();
  return clearAllHandlers;
}

// Hook for MFE lifecycle - clears all handlers when MFE unmounts
export function useMFESearchLifecycle(mfeId?: string) {
  const { clearAllHandlers } = useSearchContext();

  useEffect(() => {
    return () => {
      clearAllHandlers();
    };
  }, [mfeId, clearAllHandlers]);
}

// Hook to check if search is available (has handlers)
export function useHasSearchHandlers() {
  const { handlerCount } = useSearchContext();
  return handlerCount > 0;
}
