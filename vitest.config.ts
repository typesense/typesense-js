import { defineConfig } from "vitest/config";
import "dotenv/config";

export default defineConfig({
  test: {
    exclude: ["**/*.spec.js", "node_modules/**", "dist/**"],
    environment: "node",
    environmentMatchGlobs: [
      ["**/*.browser.*.ts", "jsdom"],
      ["**/*.node.*.ts", "node"],
    ],
    hookTimeout: 180000,
    testTimeout: 180000,
    globalSetup:
      process.env.RUN_INTEGRATION_TESTS === "true" ? ["./test/setup.ts"] : [],
    setupFiles: [],
  },
});
