import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in development or production
  base: './',

  // Configure server options
  server: {
    open: true, // Auto-open browser on server start
  },

  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
