# Installation

This guide covers different ways to install and configure rts-common for your project.

## Package Managers

### pnpm (Recommended)

```bash
pnpm add @devdenvino/rts-common
```

pnpm is the recommended package manager for projects using rts-common, as it provides:
- Faster installation times
- Disk space efficiency
- Strict dependency resolution

### npm

```bash
npm install @devdenvino/rts-common
```

### yarn

```bash
yarn add @devdenvino/rts-common
```

## Peer Dependencies

rts-common has several peer dependencies that must be installed in your project:

```bash
pnpm add react react-dom
pnpm add @tanstack/react-router
pnpm add framer-motion
pnpm add tailwindcss
```

Most of these are likely already in your project if you're building a React application.

## CSS Setup

### Option 1: Use Compiled CSS (Recommended)

Import the pre-compiled CSS file:

```typescript
import '@devdenvino/rts-common/style.css';
```

This includes all styles bundled and minified, ready for production.

### Option 2: Use Source CSS

If you want to process the CSS yourself or customize it:

```typescript
import '@devdenvino/rts-common/styles/index.css';
```

Then configure your Tailwind:

```javascript
// tailwind.config.js
import rtsCommonConfig from '@devdenvino/rts-common/tailwind.config';

export default {
  presets: [rtsCommonConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devdenvino/rts-common/dist/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Option 3: Individual CSS Files

Import only what you need:

```typescript
import '@devdenvino/rts-common/styles/base.css';
import '@devdenvino/rts-common/styles/themes.css';
import '@devdenvino/rts-common/styles/custom.css';
```

## TypeScript Configuration

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

## Vite Configuration

For Vite projects, add to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@devdenvino/rts-common',
      'react',
      'react-dom',
      'framer-motion',
    ],
  },
});
```

## Webpack Configuration

For Webpack projects:

```javascript
// webpack.config.js
module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
```

## PostCSS Configuration

Create a `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Environment Variables

If using authentication, you may want to set up environment variables:

```bash
# .env
VITE_OIDC_AUTHORITY=https://your-auth-server.com
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:5173
VITE_OIDC_SCOPE=openid profile email
```

Then use them in your app:

```typescript
<AppBase
  mfeId="my-app"
  oidcConfig={{
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    scope: import.meta.env.VITE_OIDC_SCOPE,
  }}
>
  {/* ... */}
</AppBase>
```

## Verification

After installation, verify everything is working:

```typescript
// src/App.tsx
import { Button } from '@devdenvino/rts-common/components/ui';
import '@devdenvino/rts-common/style.css';

function App() {
  return (
    <div className="p-4">
      <Button>Hello rts-common!</Button>
    </div>
  );
}

export default App;
```

Run your dev server and you should see a styled button.

## Next Steps

- [Configuration Guide](/guide/configuration) - Configure rts-common for your needs
- [Quick Start](/guide/getting-started) - Build your first app
- [Components](/components/overview) - Explore available components
