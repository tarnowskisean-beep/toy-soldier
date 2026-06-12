// vite.config.js — build settings.
// `base: './'` makes all asset URLs relative, so the production build works no
// matter where it's hosted (a domain root, a GitHub Pages subpath, a file path).
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
  // Stamped into the page so a cached old build can never masquerade as new.
  define: {
    __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')),
  },
});
