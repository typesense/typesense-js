import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/*.spec.js", "node_modules/**", "dist/**"],
    environment: "node",
    environmentMatchGlobs: [
      ["**/*.browser.spec.ts", "jsdom"],
      ["**/*.node.spec.ts", "node"],
    ],
    hookTimeout: 180000,
    testTimeout: 180000,
  },
});
