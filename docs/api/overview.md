# API Reference

Complete API documentation for rts-common hooks, utilities, and types.

## Hooks

### Authentication

- **[useAuth](/api/hooks/use-auth)** - Access authentication state and methods
- **[useApiClient](/api/hooks/use-api)** - Create authenticated API client

### UI

- **[useIsMobile](/api/hooks/use-mobile)** - Detect mobile devices
- **[useControlledState](/api/hooks/use-controlled-state)** - Manage controlled component state

## Utilities

### Styling

- **[cn](/api/utils/cn)** - Merge Tailwind classes
- **[Animations](/api/utils/animations)** - Animation utilities

### Constants

- **[Constants](/api/utils/constants)** - Application constants

## Context Providers

### Navigation

- **[AppNavProvider](/api/context/navigation)** - Navigation context provider
- **[SearchProvider](/api/context/search)** - Search context provider

## Type Definitions

View all [TypeScript types and interfaces](/api/types).

## Component APIs

For component-specific API documentation, see the [Component Index](/components/index).

## Quick Reference

### Common Imports

```typescript
// Hooks
import { useAuth } from '@devdenvino/rts-common/hooks/use-auth';
import { useApiClient } from '@devdenvino/rts-common';

// Utilities
import { cn } from '@devdenvino/rts-common';

// Components
import { Button, Card } from '@devdenvino/rts-common/components/ui';

// Icons
import { Home } from '@devdenvino/rts-common/lucide-react';

// Types
import type { AppConfig, NavMenu } from '@devdenvino/rts-common';
```

## Next Steps

- [Hooks Reference](/api/hooks/use-auth)
- [Utilities Reference](/api/utils/cn)
- [Type Definitions](/api/types)
