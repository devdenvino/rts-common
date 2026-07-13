# Attachment Component

File attachment display component with support for icons, images, progress states, and actions.

## Import

```typescript
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from '@devdenvino/rts-common/components/ui';
```

## Usage

```tsx
import { FileIcon } from 'lucide-react';
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from '@devdenvino/rts-common/components/ui';

<Attachment>
  <AttachmentMedia>
    <FileIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>document.pdf</AttachmentTitle>
    <AttachmentDescription>2.4 MB · PDF</AttachmentDescription>
  </AttachmentContent>
</Attachment>
```

## Attachment Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `'idle' \| 'uploading' \| 'processing' \| 'error' \| 'done'` | `'done'` | Upload/processing state |
| `size` | `'default' \| 'sm' \| 'xs'` | `'default'` | Size variant |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `className` | `string` | — | Additional CSS classes |

## Sub-Components

### AttachmentGroup

Wraps multiple attachment items in a flex column layout.

```tsx
<AttachmentGroup>
  <Attachment>…</Attachment>
  <Attachment>…</Attachment>
</AttachmentGroup>
```

### AttachmentMedia

Container for the file icon or image thumbnail. Adjust appearance with `variant`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'icon' \| 'image'` | `'icon'` | Icon or image display mode |

### AttachmentContent

Wrapper for title and description text. Fills remaining space.

### AttachmentTitle

Truncated file name or title. Shows shimmer animation during `uploading` / `processing` states.

### AttachmentDescription

Truncated file metadata (size, type, etc.). Shows red tint in `error` state.

### AttachmentActions

Container for action buttons (remove, download, etc.).

### AttachmentAction

A pre-styled `Button` sized for attachment context.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `ButtonVariant` | `'ghost'` |
| `size` | `ButtonSize` | `'icon-xs'` |

### AttachmentTrigger

Full-overlay clickable area (`<button>` or `asChild`) that makes the whole card interactive.

## Examples

### With Remove Action

```tsx
import { XIcon, FileTextIcon } from 'lucide-react';

<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>report.docx</AttachmentTitle>
    <AttachmentDescription>1.2 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction onClick={() => removeFile()}>
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>
```

### Uploading State

```tsx
import { Spinner } from '@devdenvino/rts-common/components/ui';

<Attachment state="uploading">
  <AttachmentMedia>
    <Spinner />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>uploading.zip</AttachmentTitle>
    <AttachmentDescription>Uploading…</AttachmentDescription>
  </AttachmentContent>
</Attachment>
```

### Error State

```tsx
<Attachment state="error">
  <AttachmentMedia>
    <AlertCircleIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>failed-upload.pdf</AttachmentTitle>
    <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
  </AttachmentContent>
</Attachment>
```

### Image Thumbnail (Vertical)

```tsx
<Attachment orientation="vertical">
  <AttachmentMedia variant="image">
    <img src="/thumbnail.jpg" alt="Preview" />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>photo.jpg</AttachmentTitle>
  </AttachmentContent>
</Attachment>
```

### Clickable Attachment

```tsx
<Attachment>
  <AttachmentTrigger onClick={() => openFile()} aria-label="Open file" />
  <AttachmentMedia>
    <FileIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>contract.pdf</AttachmentTitle>
    <AttachmentDescription>Click to preview</AttachmentDescription>
  </AttachmentContent>
</Attachment>
```

### Multiple Attachments

```tsx
<AttachmentGroup>
  {files.map((file) => (
    <Attachment key={file.id}>
      <AttachmentMedia><FileIcon /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{file.name}</AttachmentTitle>
        <AttachmentDescription>{file.size}</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ))}
</AttachmentGroup>
```
