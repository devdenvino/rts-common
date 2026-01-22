# useControlledState

Hook for managing controlled component state with optional default value.

## Import

```typescript
import { useControlledState } from '@devdenvino/rts-common';
```

## Usage

```typescript
function ControlledInput({ value: valueProp, onChange }) {
  const [value, setValue] = useControlledState({
    prop: valueProp,
    defaultProp: '',
    onChange,
  });

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Parameters

```typescript
interface UseControlledStateParams<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (value: T) => void;
}
```

## Return Value

Returns `[value, setValue]` tuple similar to `useState`.
