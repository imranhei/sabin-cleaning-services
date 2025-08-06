// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode, command }) => {
  const isProduction = mode === 'production';
  const isSSR = command === 'build' && process.env.SSR === 'true';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: isSSR ? 'dist/server' : 'dist/client',
      emptyOutDir: true,
      ssr: isSSR,
      rollupOptions: isSSR ? {
        input: './src/entry-server.jsx',
      } : undefined,
    },
    ssr: {
      noExternal: ['react-helmet', 'react-router-dom'],
    },
  };
});