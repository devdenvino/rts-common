import { defineConfig } from 'tsup';

const sharedEsbuildOptions = (options: Parameters<NonNullable<import('tsup').Options['esbuildOptions']>>[0]) => {
  options.conditions = ['import', 'module', 'default'];
  options.alias = { '@': './src' };
  options.jsx = 'automatic';
  options.jsxImportSource = 'react';
};

export default defineConfig({
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
});
