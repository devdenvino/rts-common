# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.10] - 2026-07-25

### Added

- **ProfileDropdown — Settings page**: Added `settingsPage` to `AppConfig` type. When `appConfig.settingsPage` is set, a **Settings** menu item (with `Settings2` icon) is rendered in the profile dropdown between the Status and About entries.
- **UI exports**: Exported `attachment`, `bubble`, `combobox`, `direction`, `marker`, `message`, `message-scroller`, and `native-select` components from the package root (`src/components/ui/index.ts`), making them available to consumers without deep imports.

### Changed

- **SidebarNavItems — active-section auto-expand**: The collapsible sidebar section now automatically opens when the current route matches any of its sub-links (direct navigation, deep-link, or browser back/forward). The previous `defaultOpen={item.isActive}` prop was replaced with a controlled `open` / `onOpenChange` pair driven by route state, so the section stays expanded as the user navigates within it.
- **DataTableFacetedFilter — server-side counts**: `DataTableFacetedFilterOption` now accepts an optional `count?: number` field. When provided, this server-supplied total is displayed instead of the client-side `getFacetedUniqueValues()` count, enabling correct badge counts for server-paginated / server-filtered tables.

### Fixed

- **ProfileDropdown**: Removed unused `Bell` icon import that was introduced alongside the Settings entry.
- **SidebarNavItems**: Removed a no-op `useState('') + useEffect` pair (from `SidebarNavItems`) that served only to trigger re-renders on route change — `useRouterState()` already provides reactive state. Also replaced the `useEffect` + `setCollapsibleOpen` anti-pattern in `NavMenuItem` with a derived `effectiveOpen` computation, eliminating synchronous `setState` inside effects.

## [0.1.9] - 2026-07-14

### Changed

- **State management**: Migrated app-level shared state from TanStack Store to Jotai-backed store plumbing in `app-store`, while preserving the exported `appStore` API.
- **Hook stability**: Updated `useAppStore` to subscribe via `useSyncExternalStore`, preventing stale selector-closure reads in long-lived consumers.
- **Auth persistence**: Replaced the previous `@tanstack/db`-backed OIDC store adapter with a localStorage-backed implementation that keeps the same exported class and includes a one-time compatibility migration from legacy `oidc.user` payloads.

### Breaking

- **Dependencies**: `jotai` is now a required `peerDependency` for consumers.

## [0.1.8] - 2026-07-13

### Added

- **Attachment**: New `Attachment`, `AttachmentMedia`, `AttachmentContent`, and `AttachmentAction` components for displaying file/media attachments with `idle`, `uploading`, `processing`, `error`, and `done` states; supports `default`, `sm`, and `xs` sizes with `horizontal`/`vertical` orientations.
- **Bubble**: New `Bubble` component for chat-style message bubbles with sender/receiver variants.
- **Marker**: New `Marker` component for inline status or label indicators.
- **Message / MessageScroller**: New `Message` and `MessageScroller` components for structured chat message layouts with auto-scroll behaviour.
- **Empty**: New `Empty` component for empty-state placeholder UI.
- **Field**: New `Field` component for consistent form field layout with label, control, and helper-text slots.
- **Spinner**: New `Spinner` component for loading indicators.
- **ColorSchemePicker**: New `ColorSchemePicker` component — a popover palette button that lets users switch the active color scheme at runtime; supports 18 built-in schemes matching shadcn/create.
- **Color schemes**: Added `neutral`, `amber`, `cyan`, `emerald`, `fuchsia`, `green`, `indigo`, `lime`, `pink`, `rose`, `sky`, `teal`, and `yellow` color schemes in `themes.css`, in addition to the existing `blue`, `orange`, `purple`, `red`, and `violet` palettes.
- **AppStore**: Added `colorScheme` state and `setColorScheme` action to `app-store` for globally managing the active color scheme.

### Changed

- **themes.css**: Migrated color-scheme CSS from `.theme-*` class selectors to `[data-color-scheme="*"]` attribute selectors; dark variants now use `.dark[data-color-scheme="*"]` flat rules instead of nested `@variant dark {}` blocks for better compatibility.
- **ThemeProvider**: Updated to persist and apply `colorScheme` via the `data-color-scheme` attribute on the document root, in sync with `AppStore`.
- **TopNavLayout / AnonymousHeader**: Added `items-center` to the sticky header flex row for correct vertical alignment.
- **SearchMenu**: Updated keyboard-shortcut search menu layout and styling.
- **UI components**: Minor consistency and accessibility improvements across `AlertDialog`, `Button`, `Calendar`, `Card`, `Carousel`, `Combobox`, `Command`, `Dialog`, `Drawer`, `InputGroup`, `Sheet`, `Sidebar`, and `ToggleGroup`.
- **CI/CD**: Updated `ci.yml`, `deploy-docs.yml`, and `release.yml` GitHub Actions workflows.
- **Build**: Updated `tsup.config.ts`, `tsup.vendor.config.ts`, `vite.config.ts`, and `vite.css.config.ts`.
- **Tailwind**: Updated `tailwind.config.js` for new color-scheme token support.
- **Docs**: Added documentation for all new components (`Attachment`, `Bubble`, `Marker`, `Message`, `MessageScroller`, `ColorSchemePicker`); updated API overview, store, hooks, and components index.

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
