import js from "@eslint/js";
import globals from "globals";
import {defineConfig, globalIgnores} from "eslint/config";
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    globalIgnores(['node_modules']),
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: {
            js,
            '@stylistic': stylistic,
        },
        extends: ["js/recommended"],
        languageOptions: {globals: globals.node},
        rules: {
            "object-curly-spacing": ["error", "never"],
            "no-unused-vars": "error",
            "indent": ["error", 4, {"SwitchCase": 1}],
            "no-multiple-empty-lines": ["error", {"max": 1}],
            "space-infix-ops": "error",
            "space-before-function-paren": [
                "error",
                {"anonymous": "never", "named": "never", "asyncArrow": "always"},
            ],
            "space-in-parens": ["error", "never"],
            "comma-spacing": ["error", {"before": false, "after": true}],
            "comma-style": ["error", "last"],
            "comma-dangle": ["error", "always-multiline"],
            "curly": ["error", "multi-line"],
            "arrow-spacing": "error",
            "array-bracket-spacing": ["error", "never"],
            "no-mixed-spaces-and-tabs": "error",
            "no-extra-semi": "error",
            "semi-spacing": ["error", {"before": false, "after": true}],
            "semi-style": ["error", "last"],
            "semi": ["error", "always"],
            "template-curly-spacing": ["error", "never"],
            "no-implied-eval": "off",
            "no-console": ["error", {"allow": ["warn", "error"]}],

            "@stylistic/semi": "error",
            "@stylistic/indent": 'error',
            "@stylistic/eol-last": ["error", "always"],
            "switch-colon-spacing": ["error", {"after": true, "before": false}],
        },
    },
]);
