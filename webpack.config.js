/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: "./src/Typesense.ts",
    target: "web",
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: `typesense${
        argv && argv.mode === "production" ? ".min" : ""
      }.js`,
      path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
  };
};
