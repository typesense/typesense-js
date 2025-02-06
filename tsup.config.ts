import { defineConfig } from "tsup";
import type { Options } from "tsup";
import browserList from "browserslist-to-esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

export default defineConfig([
  {
    target: browserList(["defaults"]) as Options["target"],
    entry: {
      typesense: "src/browser.ts",
    },
    sourcemap: true,
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    minify: true,
    outExtension({ format }) {
      return {
        js: `.min.${format === "cjs" ? "js" : "mjs"}`,
      };
    },
    splitting: true,
    platform: "browser",
    esbuildOptions(options) {
      options.mainFields = ["browser", "module", "main"];
      options.treeShaking = true;
    },
    esbuildPlugins: [
      nodeModulesPolyfillPlugin({
        modules: {
          crypto: "empty",
          http: "empty",
          https: "empty",
        },
      }),
    ],
  },
]);
