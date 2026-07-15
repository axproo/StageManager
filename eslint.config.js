import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", "dist"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...vue.configs["flat/recommended"],

  prettierConfig,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "warn",
      "vue/multi-word-component-names": "off",
    },
  },
];
