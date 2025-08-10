console.log("🚀 Server starting in development mode.");
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url"; // Add pathToFileURL
import express from "express";
import compression from "compression";
import sirv from "sirv";
import { createServer as createViteServer } from "vite";
process.env.NODE_ENV = 'production';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();
  let vite;
  
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(sirv(path.resolve(__dirname, "dist/client"), { extensions: [] }));
  }

  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template;
      let render;
      
      if (!isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        ({ render } = await vite.ssrLoadModule("/src/entry-server.jsx"));
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        
        // Fix for Windows: Convert path to file URL
        const serverEntryPath = path.resolve(__dirname, "dist/server/entry-server.js");
        const serverEntryUrl = pathToFileURL(serverEntryPath).href;
        ({ render } = await import(serverEntryUrl));
      }
      
      const { html, helmet, preloadedState } = await render(url);
      let finalHtml = template
        .replace("<!--helmet-placeholder-->", helmet || "")
        .replace("<!--app-html-->", html || "")
        .replace(
          "<!--preloaded-state-->",
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, "\\u003c")}</script>`
        );
      
      res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
    } catch (e) {
      if (!isProduction && vite) vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();