import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-oidc-context',
      'oidc-client-ts',
      '@tanstack/react-router',
      '@tanstack/react-query',
      '@tanstack/react-query-devtools',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      'clsx',
      'tailwind-merge',
    ],
    entries: ['./src/main.tsx', './src/**/*.tsx'],
  },
  server: {
    warmup: {
      clientFiles: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/ui/index': resolve(__dirname, 'src/components/ui/index.ts'),
        'components/ui/custom/index': resolve(
          __dirname,
          'src/components/ui/custom/index.ts'
        ),
        'components/magicui/index': resolve(
          __dirname,
          'src/components/magicui/index.ts'
        ),
        'lucide-react': resolve(__dirname, 'src/lucide-react.ts'),
        'tabler-icons-react': resolve(__dirname, 'src/tabler-icons-react.ts'),
        'tanstack-react-table': resolve(__dirname, 'src/tanstack-react-table.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => {
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      // Externalize ALL dependencies including transitive ones
      external: (id) => {
        // Externalize everything from node_modules
        return (
          id.startsWith('react') ||
          id.startsWith('lucide-react') ||
          id.startsWith('@tabler/icons-react') ||
          id.startsWith('@radix-ui/') ||
          id.startsWith('class-variance-authority') ||
          id.startsWith('clsx') ||
          id.startsWith('tailwind-merge') ||
          id.startsWith('@tanstack/') ||
          id.startsWith('recharts') ||
          id.startsWith('embla-carousel') ||
          id.startsWith('vaul') ||
          id.startsWith('date-fns') ||
          id.startsWith('react-day-picker') ||
          id.startsWith('input-otp') ||
          id.startsWith('cmdk') ||
          id.startsWith('sonner') ||
          id.startsWith('react-resizable-panels') ||
          id.startsWith('next-themes') ||
          id.startsWith('@emotion/') ||
          id.startsWith('framer-motion') ||
          id.startsWith('motion') ||
          id.startsWith('motion-dom') ||
          id.startsWith('motion-utils') ||
          // External node modules that might not be listed
          /node_modules/.test(id)
        );
      },
      output: {
        preserveModules: false,
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          // Rename CSS file to style.css
          if (assetInfo.names?.[0]?.endsWith('.css')) return 'style.css';
          return '[name].[ext]';
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
