import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite configuration for development and Hostinger production builds
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600
  }
});
