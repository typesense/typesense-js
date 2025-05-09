import { defineConfig } from "tsup";
import type { Options } from "tsup";
import browserList from "browserslist-to-esbuild";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

const baseOptions: Options = {
  target: browserList(["defaults"]) as Options["target"],
  entry: ["src/index.ts"],
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
  treeshake: true,
  tsconfig: "./tsconfig.esm.json",
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
  // minified
  {
    ...baseOptions,
    sourcemap: true,
    minify: true,
    dts: true,
  },
  // un-minified
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
