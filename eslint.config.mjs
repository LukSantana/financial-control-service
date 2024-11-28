import eslintAll from "@eslint/js/src/configs/eslint-all.js";
import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

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
            "src/**/*.js",
            "database/**/*.js",
            "config/**/*.js",
        ],
        languageOptions: { sourceType: "commonjs" },
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    {
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...rules,
            ...airbnbBase.rules,
            ...prettierConfig.rules,
            "max-lines": "off",
            "max-lines-per-function": "off",
            "max-nested-callbacks": "off",
            "max-params": "off",
            "max-statements": "off",
            "max-statements-per-line": "off",
            "no-console": "off",
            "no-inline-comments": "off",
            "no-magic-numbers": "off",
            "no-negated-condition": "off",
            "no-ternary": "off",
            "no-undef": "off",
            "no-undefined": "off",
            "one-var": "off",
            "require-atomic-updates": "off",
            "sort-keys": "off",
            "sort-vars": "off",
            "strict": "off",
        }
    },
    {
        files: ["tests/**/*.js"],
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