# Contributing to @devdenvino/rts-common

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

Be respectful and professional in all interactions. We aim to foster an inclusive and welcoming community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/rts-common.git
   cd rts-common
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Building

```bash
# Build JavaScript
pnpm run build:js

# Build CSS
pnpm run build:css

# Build both
pnpm run build
```

### Development Mode

```bash
pnpm run dev
```

This starts the development server with hot reloading.

### Linting

```bash
pnpm run lint
```

Fix linting issues before committing.

## Making Changes

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Component Guidelines

When adding or modifying components:

1. **Type Safety**: Ensure all props are properly typed
2. **Accessibility**: Follow WCAG guidelines
3. **Documentation**: Add JSDoc comments for exported components
4. **Exports**: Update `index.ts` files appropriately

### File Organization

```
src/
├── components/      # React components
│   ├── ui/         # Basic UI components
│   ├── shared/     # Shared complex components
│   ├── magicui/    # MagicUI components
│   └── animate-ui/ # Animation components
├── hooks/          # Custom React hooks
├── lib/            # Utilities and helpers
│   ├── contexts/   # React contexts
│   ├── helpers/    # Helper functions
│   ├── models/     # TypeScript types
│   └── vendor/     # Third-party re-exports
└── styles/         # CSS files
```

## Testing

While we don't have automated tests yet, please manually test:

1. Build succeeds without errors
2. Components render correctly
3. No TypeScript errors
4. No console errors in browser
5. Works in target browsers

## Commit Guidelines

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI configuration changes

### Examples

```bash
git commit -m "feat(ui): add new DatePicker component"
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "docs: update README with new examples"
```

## Submitting Changes

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

2. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Explain what changes were made and why

3. **Wait for review**:
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Once approved, it will be merged

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows the project's code style
- [ ] No linting errors
- [ ] Build succeeds (`pnpm run build:js && pnpm run build:css`)
- [ ] No TypeScript errors
- [ ] All new code is properly typed
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional commits
- [ ] Branch is up to date with main

## Adding New Dependencies

When adding dependencies:

1. Consider bundle size impact
2. Check license compatibility
3. Add to appropriate section in `package.json`:
   - `dependencies`: Runtime dependencies
   - `devDependencies`: Build/dev-only dependencies
   - `peerDependencies`: Required by consumers

Use pnpm:
```bash
pnpm add package-name           # Runtime dependency
pnpm add -D package-name        # Dev dependency
pnpm add -P package-name        # Peer dependency
```

## Reporting Issues

When reporting issues, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: 
   - OS and version
   - Node.js version
   - Package version
   - Browser (if applicable)
6. **Screenshots**: If relevant

## Questions?

If you have questions:
- Open a GitHub Discussion
- Check existing issues
- Review documentation

Thank you for contributing! 🎉
