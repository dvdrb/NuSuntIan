import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // Se não estiver executando testes com Vitest, adicionar o plugin checker
    !process.env.VITEST
      ? checker({
          typescript: false,
          eslint: false,
          stylelint: false,
        })
      : undefined,
    svgr(),
  ],
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 4200,
    open: true,
  },
  build: {
    sourcemap: false,
    outDir: "build",
  },
  resolve: {
    alias: {
      "~": path.resolve("./", "./src"),
    },
    extensions: [".js", ".ts", ".tsx", ".scss"],
  },
});
