import js from '@eslint/js'
import globals from 'globals'
import eslintParser from '@babel/eslint-parser'
import react from 'eslint-plugin-react'
import require from 'eslint-plugin-require'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**/*', 'old/**/*'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: eslintParser,
      parserOptions: {
        babelrc: false,
        configFile: false,
        // your babel options
        presets: ['@babel/preset-env']
      }
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      require,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false
        }
      ],
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  eslintConfigPrettier
]
