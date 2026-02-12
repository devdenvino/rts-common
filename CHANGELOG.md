# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
