module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks', 'jsx-a11y'],
  rules: {
    camelcase: 'off',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'consistent-return': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-useless-concat': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
