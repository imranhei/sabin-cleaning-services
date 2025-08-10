import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode, command, ssrBuild }) => {
  const isProduction = mode === "production";
  const isSSR = ssrBuild === true;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // server: {
    //   middlewareMode: true,
    //   // Add this for verbose logging
    //   hmr: {
    //     overlay: true,
    //   },
    // },
    // clearScreen: false,
    // logLevel: "info",
    build: {
      outDir: isSSR ? "dist/server" : "dist/client",
      emptyOutDir: !isSSR,
      ssr: isSSR ? "./src/entry-server.jsx" : undefined,
      rollupOptions: isSSR
        ? {
            input: "./src/entry-server.jsx",
            external: [
              "react",
              "react-dom",
              "react-router-dom",
              "react-router",
              "react-helmet",
              "jodit-react",
            ],
          }
        : undefined,
      sourcemap: !isProduction,
      target: "esnext",
    },
    ssr: {
      noExternal: [],
      jsx: "react-jsx",
    },
    define: isProduction
      ? {
          "process.env.NODE_ENV": JSON.stringify("production"),
        }
      : {},
  };
});
