// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    typescript: true,
    stylistic: {
      quotes: "double",
      semi: true,
    },
  },
);