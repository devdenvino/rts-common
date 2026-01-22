# Input Component

Text input field with validation support.

## Usage

```typescript
import { Input } from '@devdenvino/rts-common/components/ui';

<Input placeholder="Enter text..." />
```

## With Label

```typescript
import { Label } from '@devdenvino/rts-common/components/ui';

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

## Types

```typescript
<Input type="text" />
<Input type="email" />
<Input type="password" />
<Input type="number" />
```
