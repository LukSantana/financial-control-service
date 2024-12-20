import eslintAll from "@eslint/js/src/configs/eslint-all.js";
import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

const { rules } = eslintAll;

export default [
    {
        ignores: [
            'node_modules/**',
            'build/**',
            '.cache/**',
            '.strapi/**',
            'coverage/**',
            'eslint.config.mjs',
            'src/admin/*.js',
            '.github/**/*',
        ],
    },
    {
        files: [
            "src/**/*.ts",
            "database/**/*.ts",
            "config/**/*.ts",
        ],
        languageOptions: {
            parser: typescriptEslintParser,
            sourceType: "module",
            globals: globals.browser
        },
        plugins: {
            "@typescript-eslint": typescriptEslintPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...rules,
            ...airbnbBase.rules,
            ...prettierConfig.rules,
            ...typescriptEslintPlugin.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "class-methods-use-this": "off",
            "max-lines": "off",
            "max-lines-per-function": "off",
            "max-nested-callbacks": "off",
            "max-params": "off",
            "max-statements": "off",
            "max-statements-per-line": "off",
            "new-cap": "off",
            "no-console": "off",
            "no-inline-comments": "off",
            "no-magic-numbers": "off",
            "no-negated-condition": "off",
            "no-ternary": "off",
            "no-undef": "off",
            "no-undefined": "off",
            "one-var": "off",
            "sort-imports": "off",
            "sort-keys": "off",
            "sort-vars": "off",
            "strict": "off",
            "require-await": "off",
            "require-atomic-updates": "off",
        }
    },
    {
        files: ["tests/**/*.ts"],
        languageOptions: {
            globals: {
                afterAll: "readonly",
                beforeAll: "readonly",
                describe: "readonly",
                expect: "readonly",
                it: "readonly",
                jest: "readonly",
                strapi: "readonly"
            }
        }
    }
];