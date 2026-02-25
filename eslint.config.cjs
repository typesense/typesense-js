const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "lib/**",
      "doc/**",
      "test/**",
      "webpack.config.js",
      "eslint.config.cjs",
    ],
  },
  ...compat.config({
    overrides: [
      {
        files: ["src/**/*.ts"],
        extends: ["plugin:@typescript-eslint/recommended", "prettier"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaVersion: 2018,
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: "module",
        },
        env: {
          es6: true,
          node: true,
          mocha: true,
        },
        plugins: [
          "import",
          "node",
          "promise",
          "standard",
          "@typescript-eslint",
          "prettier",
        ],
        globals: {
          document: false,
          navigator: false,
          window: false,
        },
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  }),
];
