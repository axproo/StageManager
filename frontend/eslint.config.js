import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist", "node_modules", "vite.config.ts", "**/*.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  ...pluginVue.configs["flat/recommended"],

  {
    files: ["**/*.{ts,tsx,js,jsx,vue}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "unused-imports": unusedImports,
    },

    rules: {
      "vue/html-indent": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,
          multiline: {
            max: 1,
          },
        },
      ],
      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",
      "vue/singleline-html-element-content-newline": "off",

      // Warn on unused variables
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Disable default unused vars rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      // Vue
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "error",
      "vue/no-unused-components": "warn",
      "vue/no-unused-vars": "warn",
      "vue/require-default-prop": "off",
    },
  },
];
