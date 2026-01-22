# API Client

Use the authenticated API client for making HTTP requests.

## Overview

The `useApiClient` hook provides an Axios-based HTTP client with automatic authentication token injection.

## Basic Usage

```typescript
import { useApiClient } from '@devdenvino/rts-common';

function MyComponent() {
  const api = useApiClient({
    baseURL: 'https://api.example.com',
  });

  async function fetchUsers() {
    const response = await api.get('/users');
    return response.data;
  }
}
```

## With React Query

```typescript
import { useApiClient } from '@devdenvino/rts-common';
import { useQuery } from '@tanstack/react-query';

function UsersList() {
  const api = useApiClient();

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Methods

```typescript
// GET
await api.get('/users');
await api.get('/users/1');

// POST
await api.post('/users', { name: 'John' });

// PUT
await api.put('/users/1', { name: 'Jane' });

// PATCH
await api.patch('/users/1', { name: 'Jane' });

// DELETE
await api.delete('/users/1');
```

## Error Handling

```typescript
try {
  const response = await api.get('/users');
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error(error.response.status);
    console.error(error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response');
  } else {
    // Error setting up request
    console.error(error.message);
  }
}
```

## Configuration

```typescript
const api = useApiClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## Next Steps

- [Authentication Guide](/guide/authentication)
- [Best Practices](/guide/best-practices)
