# Navigation Context

Context provider for managing navigation state across micro-frontends.

## Import

```typescript
import { AppNavProvider, useAppNav } from '@devdenvino/rts-common';
```

## Usage

```typescript
function App() {
  return (
    <AppNavProvider>
      <YourApp />
    </AppNavProvider>
  );
}

function Component() {
  const { navigate, currentRoute } = useAppNav();

  return (
    <button onClick={() => navigate('/path')}>
      Navigate
    </button>
  );
}
```

## API

Provides navigation coordination for micro-frontend applications.
