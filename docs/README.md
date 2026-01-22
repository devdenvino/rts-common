# rts-common Documentation

This directory contains the VitePress documentation for rts-common.

## Development

Start the documentation development server:

```bash
pnpm docs:dev
```

Visit http://localhost:5173 to view the docs.

## Building

Build the documentation for production:

```bash
pnpm docs:build
```

## Preview

Preview the built documentation:

```bash
pnpm docs:preview
```

## Structure

```
docs/
├── .vitepress/
│   └── config.ts          # VitePress configuration
├── public/
│   └── logo.svg           # Static assets
├── guide/
│   ├── introduction.md    # Getting started guide
│   ├── authentication.md  # Auth guide
│   └── ...               # Other guides
├── components/
│   ├── overview.md       # Component docs
│   └── ...
├── api/
│   ├── overview.md       # API reference
│   └── ...
└── index.md              # Homepage
```

## Writing Documentation

### Markdown Features

VitePress supports:
- GitHub Flavored Markdown
- Frontmatter
- Code syntax highlighting
- Custom containers
- Component embedding

### Code Blocks

\`\`\`typescript
import { Button } from '@devdenvino/rts-common/components/ui';

function MyComponent() {
  return <Button>Click me</Button>;
}
\`\`\`

### Links

Use relative paths for internal links:

```markdown
[Authentication Guide](/guide/authentication)
```

## Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

The deployment workflow is defined in `.github/workflows/deploy-docs.yml`.
