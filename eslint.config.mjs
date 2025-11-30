import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
      'unused-imports': pluginUnusedImports,
      '@tanstack/query': pluginTanstackQuery,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: [
      'node_modules',
      '.pnp',
      '.pnp.js',
      '.next',
      'out',
      'build',
      '.DS_Store',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.vercel',
      '.git',
      '.gitignore',
      'Dockerfile',
      'docker-compose.yml',
      '.dockerignore',
    ],
  },
];

export default eslintConfig;
