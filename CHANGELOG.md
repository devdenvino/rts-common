# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.7] - 2026-05-16

### Added

- **Combobox**: New `Combobox` component built on `@base-ui/react` with support for chips, multi-select, clear button, groups, separators, and custom anchoring.
- **NativeSelect**: New lightweight `NativeSelect` component wrapping the native `<select>` element with consistent styling.
- **DirectionProvider**: New `DirectionProvider` and `useDirection` hook for RTL/LTR layout support via Radix `Direction`.
- **Tabs**: Added `variant` prop (`default` | `line`) to `TabsList` and `orientation` prop (`horizontal` | `vertical`) to `Tabs` for flexible tab layouts.
- **Switch**: Added `size` prop (`sm` | `default`) for compact switch variants.
- **ToggleGroup**: Added `orientation` prop (`horizontal` | `vertical`) for vertical toggle group layouts.
- **Calendar**: Added `locale` prop for full internationalisation of date formatting and day button labels.
- **Chart**: Added `initialDimension` prop to `ChartContainer` for SSR-friendly responsive charts.
- **Sonner**: Added `cn-toast` class name to toast options for custom styling hooks.
- **Styles**: Added global `cursor: pointer` for non-disabled buttons and `font-sans` on `<html>`.
- **AppBase**: Wrapped app tree with `TooltipProvider` at the root level.

### Changed

- **Radix UI**: Migrated all components from individual `@radix-ui/react-*` packages to the unified `radix-ui` package.
- **Tailwind CSS**: Upgraded from v4.1 to v4.2; adopted new data-attribute shorthand classes (`data-checked`, `data-disabled`, `data-active`, etc.) replacing `data-[state=*]` selectors throughout all components.
- **shadcn/ui**: Integrated `shadcn/tailwind.css` import and added `shadcn` v4 as a dependency.
- **ThemeProvider**: Rewritten with `useCallback`/`useMemo` optimisations, cross-tab sync via `storage` events, smooth theme transitions with temporary transition disabling, and system theme media query listener.
- **Build (tsup)**: Split into two configs — main (components/hooks with vendor deps external) and vendor (re-exports bundled for Vite `@fs` compatibility).
- **Dependencies**: Updated `lucide-react` to v1.14 (major), `react-day-picker` to v10 (major), `react-resizable-panels` to v4 (major), `recharts` to v3.8 (major), `tailwind-merge` to v3.5, `@tailwindcss/vite` to v4.2.
- **DevDependencies**: Added `prettier` and `prettier-plugin-tailwindcss`; updated `eslint`, `vite`, `typescript-eslint`, `@vitejs/plugin-react`, and `@types/node`.
- **Icons**: Replaced deprecated `Twitter` icon with `X` from lucide-react v1.
- **Chart**: Improved null-safety with nullish coalescing (`??`) replacing logical OR (`||`); added proper type handling for tooltip values.
- **Tooltip**: Removed auto-wrapping `TooltipProvider` from individual `Tooltip` components (now provided at app root).
- **Storage Keys**: Renamed `vite-ui-theme` → `theme` and `vite-ui-theme-color` → `theme-color` for cleaner localStorage keys.

### Fixed

- **ThemeProvider**: Fixed `useThemeColor` error message to correctly reference `useThemeColor` instead of `useTheme`.
- **Sidebar**: Fixed `SidebarMenuSkeleton` using `useMemo` for random width (replaced with `useState` to avoid hydration mismatches).
- **Combobox**: Fixed Tailwind spacing function syntax in class names for proper CSS calc expressions.

## [0.1.6] - 2026-04-09

### Added

- **Config**: Added `.prettierrc.yaml` with `singleQuote: true` for consistent code formatting.
- **DataTable**: Added new `dense` density option for tighter row layout; renamed previous `compact` settings to use `compact` with relaxed padding.
- **DataTableToolbar**: Replaced plain `Input` search field with `InputGroup` + `InputGroupAddon` + search icon for improved visual styling.

### Changed

- **SidebarLayout**: Removed default `p-4` padding from the content area, giving consumers full layout control.
- **TopNavLayout**: Removed default `p-4` padding from the content wrapper for consistent layout behaviour.
- **SidebarNavItems**: Standardised all nav icons to `size-4` class; added `size-4` to the `ChevronRight` collapse indicator.
- **Notifications**: Normalised JSX attribute quotes to double-quotes (Prettier); standardised Bell/BellDot icons to `size-4`.
- **Loading**: Simplified full-screen loading background — removed animated gradient orbs, replaced with a lightweight `bg-background/50 backdrop-blur-sm` overlay.

## [0.1.5] - 2026-02-15

### Added

- **Components**: Implemented dynamic sidebar navigation with popover support for grouped navigation items.
- **Components**: Enhanced `DataTable` component with improved density controls, virtualization, and column management.
- **Components**: Added comprehensive Storybook stories for `DataTable` component demonstrating various features.

### Changed

- **SidebarNavItems**: Refactored to support dynamic popover positioning and improved collapsed state handling.
- **DataTable**: Enhanced with better TypeScript types, improved accessibility, and refined density settings.
- **Dependencies**: Updated package dependencies including `@tanstack/react-query` and related packages.

## [0.1.4] - 2026-02-12

### Added

- **Auth**: Implemented `TanStackAuthStore` using `@tanstack/db` to synchronize OIDC tokens across browser tabs.
- **Auth**: Added `auth-redirect` utilities to preserve current URL (including query parameters and hash) during authentication.
- **Components**: Added `RouterBreadcrumb` component for automated breadcrumbs with TanStack Router.

### Changed

- **AppBase**: Enhanced authentication flow to automatically store and restore redirect URLs.
- **Sidebar**: Migrated sidebar state management to Jotai atoms.
- **Production**: Removed debug console logs and optimized build output.

## [0.1.0] - 2026-01-14

### Added

- Initial release of rts-common component library
- UI components based on shadcn/ui and Radix UI
- MagicUI components for enhanced animations
- Authentication utilities with react-oidc-context integration
- Layout components (Sidebar, TopNav)
- Theme management with next-themes
- Search functionality with context provider
- Navigation context for micro-frontend coordination
- Type definitions for common data structures
- Vendor exports for lucide-react, tabler-icons-react, tanstack-react-table, and motion

### Changed

- Improved package.json with proper metadata
- Added comprehensive .npmignore for cleaner npm packages
- Replaced debug console.log statements with proper error handling
- Fixed TypeScript any types with proper interfaces
- Updated CSS utility classes for consistency

### Fixed

- ESLint configuration for better code quality
- Build configuration with tsup and Vite
- TypeScript configuration for proper module resolution
