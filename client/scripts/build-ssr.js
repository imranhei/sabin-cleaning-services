import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildSSR() {
  await build({
    build: {
      outDir: path.resolve(__dirname, '../dist/server'),
      emptyOutDir: true,
      ssr: true,
      rollupOptions: {
        input: path.resolve(__dirname, '../src/entry-server.jsx'),
      },
    },
  });
  console.log('Server build completed');
}

buildSSR().catch(console.error);