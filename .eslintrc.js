module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        curly: 'error',
        '@typescript-eslint/strict-boolean-expressions': [
            'error',
            { allowString: false, allowNumber: false, allowNullableBoolean: true },
        ],
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            { types: { '{}': false }, extendDefaults: true },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
}
