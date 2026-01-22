# Search Context

Context provider for global search functionality.

## Import

```typescript
import { SearchProvider, useSearch } from '@devdenvino/rts-common';
```

## Usage

```typescript
function App() {
  return (
    <SearchProvider>
      <YourApp />
    </SearchProvider>
  );
}

function SearchBar() {
  const { query, setQuery, results } = useSearch();

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

## API

Provides global search state management.
