// This file provides global type declarations
// Import and re-export types from types.ts for global usage
import type { AppConfig } from './types';

declare global {
  interface Window {
    _env: AppConfig;
  }
}

export {};

