import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';
import security from 'eslint-plugin-security';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
    // 1. Global ignores
    {
        ignores: ['eslint.config.mjs', 'dist/', 'docker-data/', 'test/'],
    },

    // 2. Base and extended configurations
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    security.configs.recommended,
    unicorn.configs.recommended,

    // 3. Your custom configuration object
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            // Your custom rules from the old config
            'no-unused-vars': 'off', // Required to use the 'unused-imports' rule
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-console': 'error',
            'no-cond-assign': ['error', 'always'],
            'no-invalid-regexp': 'warn',
            'no-irregular-whitespace': 'error',
            'lines-around-comment': 'error',
            'lines-between-class-members': ['error', 'always'],

            // Your TypeScript-specific overrides
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'unicorn/import-style': 'off',
            "@typescript-eslint/no-unsafe-assignment": "off",
            "security/detect-object-injection": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "unicorn/prefer-module": "off"
        },
    },

    // 4. Prettier config must be last
    // This turns off any formatting rules from other plugins that could conflict with Prettier.
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    "semi": true,
                    "singleQuote": true,
                    "trailingComma": "es5",
                    "printWidth": 80,
                    "tabWidth": 2,
                    "useTabs": false,
                    "bracketSpacing": true,
                    "arrowParens": "always"
                },
            ],
        },
    },
);
