import { defineConfig } from 'tsup';

const sharedEsbuildOptions = (options: Parameters<NonNullable<import('tsup').Options['esbuildOptions']>>[0]) => {
  options.conditions = ['import', 'module', 'default'];
  options.alias = { '@': './src' };
  options.jsx = 'automatic';
  options.jsxImportSource = 'react';
};

const commonExternal = [
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
];

export default defineConfig([
  // Main config — component and library entries (vendor deps remain external)
  {
    entry: {
      index: 'src/index.ts',
      'components/ui/index': 'src/components/ui/index.ts',
      'components/ui/custom/index': 'src/components/ui/custom/index.ts',
      'components/magicui/index': 'src/components/magicui/index.ts',
      'components/animate-ui/index': 'src/components/animate-ui/index.ts',
      'hooks/use-auth': 'src/hooks/use-auth.ts',
      'lib/polyfills/index': 'src/lib/polyfills/index.ts',
    },
    format: ['esm'],
    dts: {
      resolve: true,
      compilerOptions: {
        jsx: 'react-jsx',
        moduleResolution: 'bundler',
        module: 'ESNext',
        baseUrl: '.',
        paths: { '@/*': ['./src/*'] },
      },
    },
    clean: true,
    sourcemap: false,
    splitting: true,
    treeshake: true,
    external: commonExternal,
    target: 'esnext',
    outExtension() { return { js: '.js' }; },
    injectStyle: false,
    noExternal: ['motion', 'framer-motion'],
    esbuildOptions: sharedEsbuildOptions,
    loader: { '.css': 'empty' },
    async onSuccess() {
      console.log('✓ Build completed successfully');
      console.log('ℹ CSS should be built separately using Vite or imported directly from source');
    },
  },

  // Vendor config — re-export entries are bundled so named exports are resolvable
  // by Vite in consuming apps (bare specifiers like `export * from 'pkg'` break
  // when the file is served via Vite's @fs filesystem path).
  {
    entry: {
      'lucide-react': 'src/lib/vendor/lucide-react.ts',
      motion: 'src/lib/vendor/motion.ts',
      'tabler-icons-react': 'src/lib/vendor/tabler-icons-react.ts',
      'tanstack-react-table': 'src/lib/vendor/tanstack-react-table.ts',
    },
    format: ['esm'],
    dts: {
      resolve: true,
      compilerOptions: {
        jsx: 'react-jsx',
        moduleResolution: 'bundler',
        module: 'ESNext',
        baseUrl: '.',
        paths: { '@/*': ['./src/*'] },
      },
    },
    clean: false,
    sourcemap: false,
    splitting: false,
    treeshake: true,
    // Keep react external, but bundle the vendor libs so named exports are
    // statically resolvable without relying on bare-specifier resolution.
    external: [/^react/],
    noExternal: [
      'lucide-react',
      'motion',
      'framer-motion',
      '@tabler/icons-react',
      '@tanstack/react-table',
    ],
    target: 'esnext',
    outExtension() { return { js: '.js' }; },
    injectStyle: false,
    esbuildOptions: sharedEsbuildOptions,
    loader: { '.css': 'empty' },
  },
]);
