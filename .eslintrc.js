module.exports = {
    root: true,
    env: {
        node: true
    },
    overrides: [
        {
            files: '*.vue',
            rules: {
                'max-len': 'off'
            }
        }
    ],
    rules: {
        'arrow-body-style': ['error', 'as-needed', {requireReturnForObjectLiteral: true}],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', {after: true, before: true}],
        'brace-style': ['error', 'allman'],
        camelcase: 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': ['error', 'never'],
        'consistent-return': 'off',
        'global-require': 'off',
        indent: ['error', 4, {SwitchCase: 1}],
        'indent-legacy': 'off',
        'import/extensions': 'off',
        'import/no-dynamic-require': 'off',
        'import/prefer-default-export': 'off',
        'newline-per-chained-call': 'off',
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'linebreak-style': ['error', 'windows'],
        'lines-between-class-members': 'off',
        'max-len': ['error', 120],
        'new-cap': 'off',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-floating-decimal': 'off',
        'no-multi-assign': ['error', {ignoreNonDeclaration: true}],
        'no-multi-spaces': 'off',
        'no-param-reassign': ['error', {props: false}],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-restricted-globals': 'off',
        'no-template-curly-in-string': 'off',
        'no-trailing-spaces': 'off',
        'no-underscore-dangle': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': ['error', 'never'],
        'object-shorthand': ['error', 'always'],
        'prefer-destructuring': 'off',
        'prefer-promise-reject-errors': 'off',
        'quote-props': 'off',
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'never'
        }],
        'vue/experimental-script-setup-vars': 'off',
        'vue/script-indent': ['off', 4, {
            baseIndent: 1
        }]
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
};
