
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This allows the build to work correctly on GitHub Pages sub-paths
  base: './',
});
