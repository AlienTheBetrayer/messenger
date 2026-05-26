import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	// ─── Ignores ────────────────────────────────────────────────────────────────
	globalIgnores([
		'**/node_modules/**',
		'**/dist/**',
		'**/.next/**',
		'**/build/**',
		'**/coverage/**',
		'**/*.generated.ts',
		'next-env.d.ts',
	]),

	// ─── JS base ────────────────────────────────────────────────────────────────
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.es2022 },
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'prefer-const': 'error',
			'no-var': 'error',

			'object-shorthand': 'error',
			'prefer-template': 'error',
			'no-nested-ternary': 'error',
			'no-return-assign': 'error',
			'no-param-reassign': ['error', { props: true }],
			'no-shadow': 'off', // use TS version
			'no-throw-literal': 'off', // use TS version
		},
	},

	// ─── TypeScript strict ───────────────────────────────────────────────────────
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		files: ['**/*.{ts,mts,cts,tsx}'],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'recommended', fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { attributes: false } },
			],
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/promise-function-async': 'error',
			'@typescript-eslint/only-throw-error': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/naming-convention': [
				'error',
				{ selector: 'interface', format: ['PascalCase'] },
				{ selector: 'typeAlias', format: ['PascalCase'] },
				{ selector: 'enum', format: ['PascalCase'] },
				{ selector: 'enumMember', format: ['UPPER_CASE'] },
				{
					selector: 'classProperty',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow',
				},
			],
		},
	},

	// ─── React (jsx-runtime = no React import needed) ───────────────────────────
	pluginReact.configs.flat['jsx-runtime'],
	{
		files: ['**/*.{jsx,tsx}'],
		plugins: {
			'react-hooks': pluginReactHooks as any,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',

			'react/display-name': 'error',
			'react/no-danger': 'error',
			'react/no-array-index-key': 'warn',
			'react/no-unstable-nested-components': ['error', { allowAsProps: false }],
			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
			'react/jsx-curly-brace-presence': [
				'error',
				{ props: 'never', children: 'never' },
			],
			'react/self-closing-comp': 'error',
			'react/jsx-boolean-value': ['error', 'never'],
		},
	},

	// ─── Imports ─────────────────────────────────────────────────────────────────
	{
		plugins: { import: pluginImport },
		rules: {
			'import/no-duplicates': ['error', { 'prefer-inline': true }],
			'import/no-cycle': 'error',
			'import/no-self-import': 'error',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'type',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},

	// ─── NestJS ──────────────────────────────────────────────────────────────────
	{
		files: ['apps/api/**/*.ts', 'apps/server/**/*.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-call': 'warn', // decorators
			'@typescript-eslint/no-unsafe-assignment': 'warn', // injection tokens
			'no-console': 'error', // use NestJS Logger
			'no-param-reassign': 'off', // DI constructor params
			'no-empty-function': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: false },
			],
		},
	},

	// ─── Server components / route handlers ──────────────────────────────────────
	{
		files: [
			'**/app/**/page.tsx',
			'**/app/**/layout.tsx',
			'**/app/**/error.tsx',
			'**/app/**/loading.tsx',
			'**/app/**/not-found.tsx',
			'**/app/**/route.ts',
		],
		rules: {
			'@typescript-eslint/require-await': 'off',
		},
	},

	// ─── Config files ─────────────────────────────────────────────────────────────
	{
		files: ['*.config.{ts,js,mjs}', 'next.config.*'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},

	// ─── Tests ───────────────────────────────────────────────────────────────────
	{
		files: ['**/*.{test,spec}.{ts,tsx}', '**/*.e2e-spec.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'no-console': 'off',
		},
	},

	// ─── Migrations ──────────────────────────────────────────────────────────────
	{
		files: ['**/migrations/**/*.ts', '**/seeds/**/*.ts'],
		rules: {
			'no-console': 'off',
			'@typescript-eslint/require-await': 'off',
		},
	},
]);
