# Micro-Frontends Guide

Build micro-frontend applications with rts-common.

## Overview

rts-common is designed for micro-frontend (MFE) architectures where:
- Multiple teams build independent applications
- Applications share common UI components
- Consistent user experience across apps

## MFE Architecture

```
┌─────────────────────────────────────┐
│        Shell Application            │
│  (Navigation, Auth, Theme)          │
├─────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐        │
│  │  MFE 1   │  │  MFE 2   │        │
│  │Dashboard │  │  Admin   │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         rts-common                  │
│   (Shared Components & Utils)       │
└─────────────────────────────────────┘
```

## Setting Up MFEs

### Shared Configuration

```typescript
// shared-config.ts
export const oidcConfig = {
  authority: 'https://auth.example.com',
  client_id: 'shared-client-id',
  redirect_uri: window.location.origin,
};
```

### Individual MFE

```typescript
// apps/dashboard/src/App.tsx
import { AppBase } from '@devdenvino/rts-common';
import { oidcConfig } from '@/shared-config';

<AppBase
  mfeId="dashboard"
  oidcConfig={oidcConfig}
>
  <DashboardApp />
</AppBase>
```

## Communication

### Shared State

Use Jotai atoms for shared state:

```typescript
// shared-atoms.ts
import { atom } from 'jotai';

export const userPreferencesAtom = atom({});
```

### Navigation

Use the navigation context:

```typescript
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();
navigate({ to: '/other-mfe' });
```

## Best Practices

1. **Keep MFEs Independent**: Each should work standalone
2. **Share Only UI**: Don't share business logic
3. **Version Lock**: Use exact versions of rts-common
4. **Test Integration**: Test MFEs together

## Next Steps

- [Architecture Guide](/guide/architecture)
- [Best Practices](/guide/best-practices)
