import { createRequire } from 'node:module';
import fs from 'node:fs';

const localCachePath = 'C:/Users/lb/adwood_cache/package.json';
const useLocalCache = fs.existsSync(localCachePath);

let defineConfig, react;

if (useLocalCache) {
  const req = createRequire(localCachePath);
  ({ defineConfig } = req('vite'));
  react = req('@vitejs/plugin-react');
} else {
  const req = createRequire(import.meta.url);
  ({ defineConfig } = req('vite'));
  react = req('@vitejs/plugin-react');
}

export default defineConfig({
  plugins: [react()],
  resolve: useLocalCache ? {
    alias: {
      'react': 'C:/Users/lb/adwood_cache/node_modules/react',
      'react-dom': 'C:/Users/lb/adwood_cache/node_modules/react-dom',
      'three': 'C:/Users/lb/adwood_cache/node_modules/three',
      '@react-three/fiber': 'C:/Users/lb/adwood_cache/node_modules/@react-three/fiber',
      '@react-three/drei': 'C:/Users/lb/adwood_cache/node_modules/@react-three/drei',
      'lucide-react': 'C:/Users/lb/adwood_cache/node_modules/lucide-react'
    }
  } : undefined,
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  }
});
