import { createRequire } from 'node:module';

const require = createRequire('C:/Users/lb/adwood_cache/package.json');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': 'C:/Users/lb/adwood_cache/node_modules/react',
      'react-dom': 'C:/Users/lb/adwood_cache/node_modules/react-dom',
      'three': 'C:/Users/lb/adwood_cache/node_modules/three',
      '@react-three/fiber': 'C:/Users/lb/adwood_cache/node_modules/@react-three/fiber',
      '@react-three/drei': 'C:/Users/lb/adwood_cache/node_modules/@react-three/drei',
      'lucide-react': 'C:/Users/lb/adwood_cache/node_modules/lucide-react'
    }
  },
  server: {
    port: 5173,
    host: 'localhost',
    fs: {
      allow: [
        'g:/My Drive/AG/ADWOOD',
        'C:/Users/lb/adwood_cache'
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
