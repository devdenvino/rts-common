# useIsMobile

Hook for detecting mobile devices.

## Import

```typescript
import { useIsMobile } from '@devdenvino/rts-common';
```

## Usage

```typescript
function ResponsiveComponent() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

## Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if viewport width is below mobile breakpoint (768px)
