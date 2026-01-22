import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points matching vite.config.ts
  entry: {
    index: 'src/index.ts',
    'components/ui/index': 'src/components/ui/index.ts',
    'components/ui/custom/index': 'src/components/ui/custom/index.ts',
    'components/magicui/index': 'src/components/magicui/index.ts',
    'components/animate-ui/index': 'src/components/animate-ui/index.ts',
    'hooks/use-auth': 'src/hooks/use-auth.ts',
    'lib/polyfills/index': 'src/lib/polyfills/index.ts',
    'lucide-react': 'src/lib/vendor/lucide-react.ts',
    'motion': 'src/lib/vendor/motion.ts',
    'tabler-icons-react': 'src/lib/vendor/tabler-icons-react.ts',
    'tanstack-react-table': 'src/lib/vendor/tanstack-react-table.ts',
  },

  // Output format - ESM only to match current setup
  format: ['esm'],

  // Generate TypeScript declarations with custom tsconfig
  dts: {
    resolve: true,
    compilerOptions: {
      jsx: 'react-jsx',
      moduleResolution: 'bundler',
      module: 'ESNext',
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
  },

  // Clean output directory before build
  clean: true,

  // Generate sourcemaps
  sourcemap: false,

  // Enable code splitting for better tree-shaking
  splitting: true,

  // Enable tree-shaking to remove unused code
  treeshake: true,

  // External dependencies - all dependencies and peerDependencies are auto-excluded
  // But we explicitly list them to match vite config behavior
  external: [
    /^react/,
    /^lucide-react/,
    /^@tabler\/icons-react/,
    /^@radix-ui\//,
    /^class-variance-authority/,
    /^clsx/,
    /^tailwind-merge/,
    /^@tanstack\//,
    /^recharts/,
    /^embla-carousel/,
    /^vaul/,
    /^date-fns/,
    /^react-day-picker/,
    /^input-otp/,
    /^cmdk/,
    /^sonner/,
    /^react-resizable-panels/,
    /^next-themes/,
    /^@emotion\//,
    /^@hookform/,
    /^@novu/,
    /^axios/,
    /^jotai/,
    /^jwt-decode/,
    /^react-hook-form/,
    /^react-oidc-context/,
    /^zod/,
    /^tw-animate-css/,
  ],

  // Target environment
  target: 'esnext',

  // Output file name format
  outExtension({ format }) {
    return {
      js: `.js`,
    };
  },

  // Don't inject style - CSS will be imported separately
  injectStyle: false,

  // Exclude CSS from bundle - handle it separately with Vite
  noExternal: ['motion', 'framer-motion'],

  // esbuild options for additional configuration
  esbuildOptions(options) {
    // Ensure proper module resolution
    options.conditions = ['import', 'module', 'default'];
    
    // Resolve path aliases for esbuild
    options.alias = {
      '@': './src',
    };

    // Configure JSX for React 17+ automatic runtime
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
  },

  // Skip CSS imports by treating them as external
  loader: {
    '.css': 'empty',
  },

  // Post-build hook to handle CSS separately
  async onSuccess() {
    console.log('✓ Build completed successfully');
    console.log('ℹ CSS should be built separately using Vite or imported directly from source');
  },
});
