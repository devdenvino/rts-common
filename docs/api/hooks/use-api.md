# useApiClient

Hook for creating an authenticated HTTP client.

## Import

```typescript
import { useApiClient } from '@devdenvino/rts-common';
```

## Usage

```typescript
const api = useApiClient({
  baseURL: 'https://api.example.com',
});

const response = await api.get('/users');
```

## Configuration

```typescript
interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}
```

## Methods

- `get(url, config)` - GET request
- `post(url, data, config)` - POST request
- `put(url, data, config)` - PUT request
- `patch(url, data, config)` - PATCH request
- `delete(url, config)` - DELETE request

## See Also

- [API Client Guide](/guide/api-client)
- [Authentication](/guide/authentication)
