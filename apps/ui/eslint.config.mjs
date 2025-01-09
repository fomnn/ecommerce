// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default antfu(
  {
    typescript: true,
    stylistic: {
      quotes: "double",
      semi: true,
    },
    react: true,
    rules: {
      "style/jsx-max-props-per-line": ["warn", {maximum: {multi: 1, single: 2}}],
      "node/prefer-global/process": ["off"]
    }
  },
  ...pluginQuery.configs["flat/recommended"],
);
