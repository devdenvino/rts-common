# Type Definitions

TypeScript type definitions and interfaces.

## Common Types

### AppConfig

```typescript
interface AppConfig {
  mfeId: string;
  name: string;
  version: string;
}
```

### NavMenu

```typescript
interface NavMenu {
  label: string;
  href?: string;
  icon?: string;
  children?: NavMenu[];
}
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}
```

## Import

```typescript
import type { AppConfig, NavMenu, User } from '@devdenvino/rts-common';
```

## Usage

```typescript
const config: AppConfig = {
  mfeId: 'my-app',
  name: 'My Application',
  version: '1.0.0',
};
```
