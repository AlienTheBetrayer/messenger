import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	// ─────────────────────────────────────────────────────────────
	// IGNORES
	// ─────────────────────────────────────────────────────────────
	globalIgnores([
		"**/node_modules/**",
		"**/dist/**",
		"**/.next/**",
		"**/coverage/**",
		"**/generated/**",
	]),

	// ─────────────────────────────────────────────────────────────
	// BASE JS
	// ─────────────────────────────────────────────────────────────
	js.configs.recommended,

	{
		files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
		},
		rules: {
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"no-debugger": "error",
			"prefer-const": "error",
			"no-var": "error",
			eqeqeq: ["error", "always", { null: "ignore" }],
		},
	},

	// ─────────────────────────────────────────────────────────────
	// TYPESCRIPT (STRICT BUT NOT ANNOYING)
	// ─────────────────────────────────────────────────────────────

	...tseslint.configs.strictTypeChecked,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			// core safety
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-unsafe-assignment": "error",
			"@typescript-eslint/no-unsafe-call": "error",

			// ✅ IMPORTANT: removes your “6 is annoying” problem
			"@typescript-eslint/no-inferrable-types": "off",

			// ✅ avoids template literal pain
			"@typescript-eslint/restrict-template-expressions": "off",

			// practical unused vars
			"@typescript-eslint/no-unused-vars": ["off"],
		},
	},

	// ─────────────────────────────────────────────────────────────
	// REACT
	// ─────────────────────────────────────────────────────────────
	pluginReact.configs.flat["jsx-runtime"],

	{
		files: ["**/*.{jsx,tsx}"],
		plugins: {
			"react-hooks": pluginReactHooks as any,
		},
		settings: {
			react: { version: "detect" },
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",

			"react/no-array-index-key": "warn",
			"react/no-unstable-nested-components": "error",
			"react/jsx-no-useless-fragment": "error",
			"react/self-closing-comp": "error",
		},
	},

	// ─────────────────────────────────────────────────────────────
	// IMPORTS (CLEAN + STABLE)
	// ─────────────────────────────────────────────────────────────
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},

	// ─────────────────────────────────────────────────────────────
	// NESTJS OVERRIDES
	// ─────────────────────────────────────────────────────────────
	{
		files: ["apps/api/**/*.ts"],
		rules: {
			"no-console": "off",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-extraneous-class": "off",
			"no-empty-function": "off",
		},
	},

	// ─────────────────────────────────────────────────────────────
	// TESTS
	// ─────────────────────────────────────────────────────────────
	{
		files: ["**/*.{test,spec}.{ts,tsx}"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"no-console": "off",
		},
	},
]);
