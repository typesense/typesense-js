import { defineConfig } from "tsup";
import type { Options } from "tsup";
import browserList from "browserslist-to-esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

const baseOptions: Options = {
  target: browserList(["defaults"]) as Options["target"],
  entry: {
    typesense: "src/browser.ts",
  },
  clean: true,
  format: ["cjs", "esm"],
  outDir: "dist",
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
};

export default defineConfig([
  {
    ...baseOptions,
    minify: true,
    sourcemap: true,
    dts: true,
  },
  {
    ...baseOptions,
    minify: false,
    sourcemap: false,
    dts: false,
    outExtension({ format }) {
      return {
        js: `.${format === "cjs" ? "js" : "mjs"}`,
      };
    },
  },
]);
