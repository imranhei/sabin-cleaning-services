// api/server.js
import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Determine if we're in development or production
const isProduction = process.env.NODE_ENV === 'production';

// Create Vite server in development mode
let vite;
if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
}

// Handle all routes
app.use('*', async (req, res) => {
  const url = req.originalUrl;
  
  try {
    let template, render;
    
    if (isProduction) {
      // In production, read the built files
      const clientIndexPath = path.resolve(__dirname, '../dist/client/index.html');
      const serverEntryPath = path.resolve(__dirname, '../dist/server/entry-server.js');
      
      if (!fs.existsSync(clientIndexPath)) {
        throw new Error(`Client build not found at ${clientIndexPath}`);
      }
      
      if (!fs.existsSync(serverEntryPath)) {
        throw new Error(`Server build not found at ${serverEntryPath}`);
      }
      
      template = fs.readFileSync(clientIndexPath, 'utf-8');
      
      // Import the server entry
      const serverEntry = await import(serverEntryPath);
      render = serverEntry.render;
    } else {
      // In development, use Vite
      template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, template);
      
      // Load the server entry from your client-side structure
      const { render: devRender } = await vite.ssrLoadModule('/src/entry-server.jsx');
      render = devRender;
    }
    
    // Render the app
    const { html, helmet } = await render(url);
    
    // Inject the rendered app and helmet into the template
    const htmlResponse = template
      .replace('<!--app-html-->', html)
      .replace('<!--helmet-placeholder-->', helmet);
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlResponse);
  } catch (e) {
    if (!isProduction && vite) {
      vite.ssrFixStacktrace(e);
    }
    console.error(e);
    res.status(500).end(e.message);
  }
});

export default app;