import css from "@eslint/css"
import eslint from "@eslint/js"
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "no-relative-import-paths": noRelativeImportPaths,
      "prefer-arrow-functions": preferArrowFunctions,
      "simple-import-sort": simpleImportSort
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "no-relative-import-paths/no-relative-import-paths": "error",
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false
        }
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  },
  {
    files: ["**/*.css"],
    plugins: {
      css
    },
    language: "css/css",
    rules: {
      "css/no-duplicate-imports": "error",
      "css/require-baseline": [
        "error",
        {
          available: "widely"
        }
      ]
    }
  },
  eslintPluginPrettierRecommended
)
