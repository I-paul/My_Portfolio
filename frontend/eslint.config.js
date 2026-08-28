import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Variables starting with uppercase OR named 'motion' are exempt from unused-var check.
      // 'motion' is used as a JSX namespace (motion.div etc.) — eslint-plugin-react would
      // handle this automatically, but we avoid adding a dep just for this.
      'no-unused-vars': ['error', { varsIgnorePattern: '^([A-Z_]|motion)' }],
    },
  },
])
