---
layout: home

hero:
  name: "rts-common"
  text: "Shared Component Library"
  tagline: A comprehensive library for building modern micro-frontend applications
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/devdenvino/rts-common
  image:
    src: /logo.svg
    alt: rts-common

features:
  - icon: 🎨
    title: Beautiful UI Components
    details: Built on shadcn/ui and Radix UI with full Tailwind CSS support. Accessible, customizable, and production-ready.
  - icon: 🔐
    title: Authentication Built-in
    details: Integrated OIDC authentication with react-oidc-context. Secure by default with easy configuration.
  - icon: 🎯
    title: Micro-Frontend Ready
    details: Designed for distributed teams and modular architectures. Share components across multiple applications.
  - icon: 🌓
    title: Theme Management
    details: Sophisticated theme system with dark mode, custom themes, and CSS variables for easy customization.
  - icon: 📱
    title: Responsive Layout
    details: Flexible sidebar and navigation components that adapt to any screen size with mobile-first design.
  - icon: ⚡
    title: Developer Experience
    details: TypeScript-first with complete type definitions, excellent IDE support, and comprehensive documentation.
---

## Quick Example

```typescript
import { AppBase, useAuth } from '@devdenvino/rts-common';
import '@devdenvino/rts-common/style.css';

function App() {
  return (
    <AppBase
      mfeId="my-app"
      oidcConfig={{
        authority: 'https://auth.example.com',
        client_id: 'my-client-id',
        redirect_uri: window.location.origin,
      }}
      sidebarProps={{
        items: [
          { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
          { label: 'Settings', href: '/settings', icon: 'Settings' }
        ]
      }}
    >
      <YourAppContent />
    </AppBase>
  );
}
```

## Installation

::: code-group

```bash [pnpm]
pnpm add @devdenvino/rts-common
```

```bash [npm]
npm install @devdenvino/rts-common
```

```bash [yarn]
yarn add @devdenvino/rts-common
```

:::

## Why rts-common?

**Consistency Across Applications** - Ensure a unified user experience across all your micro-frontend applications with shared components and patterns.

**Accelerated Development** - Leverage pre-built, tested components to build features faster without sacrificing quality.

**Enterprise Ready** - Built with security, accessibility, and scalability in mind. Production-tested and battle-proven.

**Fully Typed** - Complete TypeScript support with excellent IntelliSense for a superior developer experience.
