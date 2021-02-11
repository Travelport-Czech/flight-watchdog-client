module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint', 'cypress'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:react/recommended',
        'plugin:cypress/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        curly: 'error',
        'no-param-reassign': 'error',
    },
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    overrides: [
        {
            files: ['**/*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
            },
            env: {
                node: true,
                es6: true,
            },
            rules: {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
}
