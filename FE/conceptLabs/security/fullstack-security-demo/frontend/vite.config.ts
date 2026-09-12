import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    coverage: {
      exclude: [
        "src/handson/BasicRerender.tsx",
        "src/handson/product.ts",
        "src/App.tsx",
        "src/App.css",
        "src/main.tsx",
      ],
    },
  },
});
