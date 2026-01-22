# Best Practices

Guidelines and best practices for using rts-common effectively.

## General Principles

### 1. Import Efficiently

Import only what you need for better tree-shaking:

```typescript
// ✅ Good - Specific imports
import { Button, Card } from '@devdenvino/rts-common/components/ui';

// ❌ Avoid - Importing everything
import * as UI from '@devdenvino/rts-common';
```

### 2. Use TypeScript

Leverage TypeScript for type safety:

```typescript
import type { ButtonProps } from '@devdenvino/rts-common/components/ui';

const MyButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};
```

### 3. Follow Component Composition

Build complex UIs by composing simple components:

```typescript
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

## Authentication

### Secure Token Storage

Never expose tokens in logs or error messages:

```typescript
// ✅ Good
console.log('User authenticated');

// ❌ Bad
console.log('Token:', user.access_token);
```

### Token Validation

Always validate tokens on the backend:

```typescript
// Backend (example)
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, publicKey);
```

### Handle Auth Errors

Gracefully handle authentication errors:

```typescript
const { error, signIn } = useAuth();

useEffect(() => {
  if (error) {
    if (error.message.includes('login_required')) {
      signIn();
    } else {
      // Show user-friendly error
      toast.error('Authentication failed. Please try again.');
    }
  }
}, [error]);
```

## Styling

### Use Tailwind Classes

Prefer Tailwind utilities over custom CSS:

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-4">

// ❌ Avoid custom CSS when Tailwind can do it
<div className="custom-flex-container">
```

### Combine Classes with cn

Use the `cn` utility to merge classes:

```typescript
import { cn } from '@devdenvino/rts-common';

<Button className={cn(
  'base-styles',
  isActive && 'active-styles',
  className
)}>
```

### Override Component Styles

Use className prop to customize components:

```typescript
<Button className="bg-brand-500 hover:bg-brand-600">
  Custom Colored Button
</Button>
```

## Performance

### Memoize Expensive Computations

```typescript
const filteredData = useMemo(() => {
  return data.filter(item => item.status === 'active');
}, [data]);
```

### Lazy Load Routes

```typescript
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

### Debounce Input Handlers

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback(
  (value) => {
    performSearch(value);
  },
  300
);
```

## Forms

### Use Form Library

Use react-hook-form for better performance:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: '',
    password: '',
  },
});
```

### Validate with Zod

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
});
```

### Show Validation Errors

```typescript
<Input
  {...form.register('email')}
  error={form.formState.errors.email?.message}
/>
```

## API Calls

### Use API Client Hook

```typescript
const api = useApiClient();

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.get('/users'),
});
```

### Handle Loading States

```typescript
if (isLoading) return <Skeleton />;
if (error) return <Alert variant="destructive">{error.message}</Alert>;
```

### Implement Retry Logic

```typescript
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

## Accessibility

### Semantic HTML

Use semantic HTML elements:

```typescript
// ✅ Good
<button onClick={handleClick}>Click</button>

// ❌ Avoid
<div onClick={handleClick}>Click</div>
```

### Keyboard Navigation

Ensure keyboard accessibility:

```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

### ARIA Labels

Provide descriptive labels:

```typescript
<Button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" />
</Button>
```

## State Management

### Keep State Close to Usage

Don't lift state unnecessarily:

```typescript
// ✅ Good - Local state
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Use Atoms for Shared State

```typescript
import { atom, useAtom } from 'jotai';

const themeAtom = atom<'light' | 'dark'>('light');

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  // ...
}
```

## Error Handling

### Use Error Boundaries

```typescript
import { ErrorBoundary } from '@devdenvino/rts-common';

<ErrorBoundary fallback={<ErrorPage />}>
  <YourApp />
</ErrorBoundary>
```

### Handle Async Errors

```typescript
async function loadData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    toast.error('Failed to load data');
    throw error;
  }
}
```

## Testing

### Test User Interactions

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('button click works', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Mock Authentication

```typescript
import { MockAuthProvider } from './test-utils';

test('shows user name when authenticated', () => {
  render(
    <MockAuthProvider user={{ profile: { name: 'John' } }}>
      <UserProfile />
    </MockAuthProvider>
  );
  
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

## Security

### Sanitize User Input

```typescript
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(userInput);
```

### Use Environment Variables

```typescript
// ✅ Good
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Never hardcode secrets
const apiKey = 'sk-1234567890abcdef';
```

### Implement CSP

Configure Content Security Policy headers in production.

## Code Organization

### Group by Feature

```
src/
  features/
    auth/
      components/
      hooks/
      api/
    dashboard/
      components/
      hooks/
```

### Use Barrel Exports

```typescript
// components/index.ts
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
```

## Version Control

### Keep Dependencies Updated

```bash
pnpm update @devdenvino/rts-common
```

### Lock Versions for Stability

```json
{
  "dependencies": {
    "@devdenvino/rts-common": "0.1.0"
  }
}
```

## Next Steps

- [Architecture Guide](/guide/architecture)
- [Authentication Guide](/guide/authentication)
- [API Reference](/api/overview)
