# Card Component

Container component for grouping related content.

## Usage

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@devdenvino/rts-common/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Components

- **Card**: Main container
- **CardHeader**: Header section
- **CardTitle**: Title text
- **CardDescription**: Description text
- **CardContent**: Main content area
- **CardFooter**: Footer section

## Examples

### Simple Card

```typescript
<Card>
  <CardContent>
    <p>Simple card content</p>
  </CardContent>
</Card>
```

### With Actions

```typescript
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Configure your settings</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```
