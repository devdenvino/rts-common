# Table Component

Data table component for displaying tabular data.

## Usage

```typescript
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@devdenvino/rts-common/components/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## With TanStack Table

```typescript
import { DataTable } from '@devdenvino/rts-common/components/ui/custom';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

<DataTable columns={columns} data={data} />
```
