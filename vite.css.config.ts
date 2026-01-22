import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// Separate Vite config just for CSS bundling
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        style: resolve(__dirname, 'src/index.css'),
        themes: resolve(__dirname, 'src/styles/themes.css'),
        custom: resolve(__dirname, 'src/styles/custom.css'),
        tailwind: resolve(__dirname, 'src/styles/tailwind.css'),
      },
      output: {
        assetFileNames: ({ names }) => {
          if (names.includes('style')) return 'style.css';
          if (names.includes('themes')) return 'themes.css';
          if (names.includes('custom')) return 'custom.css';
          if (names.includes('tailwind')) return 'tailwind.css';
          return '[name][extname]';
        },
      },
    },
    emptyOutDir: false, // Don't empty since tsup runs first
  },
});
