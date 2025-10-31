import { defineConfig } from "vitest/config";
import "dotenv/config";

export default defineConfig({
  test: {
    exclude: ["**/*.spec.js", "node_modules/**", "dist/**"],
    pool: "threads",
    hookTimeout: 180000,
    testTimeout: 180000,
    globalSetup:
      process.env.RUN_INTEGRATION_TESTS === "true" ? ["./test/setup.ts"] : [],
    setupFiles: [],
    projects: [
      {
        extends: true,
        test: {
          include: ["**/*.browser.*.ts"],
          name: "browser",
          environment: "jsdom",
        },
      },
      {
        extends: true,
        test: {
          include: ["**/*.node.*.ts"],
          name: "node",
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          exclude: ["**/*.browser.*.ts", "**/*.node.*.ts"],
          name: "default",
          environment: "node",
        },
      },
    ],
  },
});
