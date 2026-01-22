# Select Component

Dropdown selection component.

## Usage

```typescript
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@devdenvino/rts-common/components/ui';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Controlled

```typescript
const [value, setValue] = useState('');

<Select value={value} onValueChange={setValue}>
  {/* ... */}
</Select>
```
