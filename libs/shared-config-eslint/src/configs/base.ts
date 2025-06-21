import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import turboConfig from "eslint-config-turbo/flat";
import checkFile from "eslint-plugin-check-file";
import { flatConfigs } from "eslint-plugin-import-x";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

import { eslintRules } from "#rules/eslint";
import { typescriptEslintRules } from "#rules/typescript-eslint";
import { getCombinedGitignoreConfig } from "#utils/get-combined-gitignore";
import tsEslint, { configs } from "typescript-eslint";

export const esLintBaseConfig = tsEslint.config([
	getCombinedGitignoreConfig(),

	...turboConfig,
	{
		// https://typescript-eslint.io/packages/parser#configuration
		name: "General TypeScript",
		files: ["**/*.{ts,tsx}"],
		extends: [
			eslint.configs.recommended,
			configs.strictTypeChecked,
			configs.stylisticTypeChecked,
		],
		languageOptions: {
			// https://typescript-eslint.io/getting-started/typed-linting
			parserOptions: {
				projectService: true,
				tsconfigRootDir: "../",
			},
		},
		rules: {
			...eslintRules,
			...typescriptEslintRules,
		},
	},
	{
		name: "General JavaScript",
		files: ["**/*.{ts,tsx,vue}"],
		extends: [
			// https://github.com/sindresorhus/eslint-plugin-unicorn
			eslintPluginUnicorn.configs.recommended,
		],
		rules: {
			/*
			 * Null is semantically different from undefined. Null means 'explicitly set to no value' while undefined means 'the value is implicitly absent'.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
			 */
			"unicorn/no-null": "off",
			/*
			 * Sometimes forEach results in better readability.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
			 */
			"unicorn/no-array-for-each": "off",
			/**
			 * if-else is often more readable in multiline statements.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
			 */
			"unicorn/prefer-ternary": ["error", "only-single-line"],
			/*
			 * The rule does not account for arbitrary abbreviations, and generally very common abbreviations such as 'utils -> utilities', 'e -> event', are generally not confusing among developers.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
			 */
			"unicorn/prevent-abbreviations": "off",
		},
	},
	{
		name: "Import Export",
		files: ["**/*.{ts,tsx,vue}"],
		extends: [flatConfigs.recommended, flatConfigs.typescript],
		rules: {
			"import-x/no-default-export": "error",

			// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md
			"import-x/no-mutable-exports": "error",
		},
	},
	{
		name: "File",
		files: ["**/*.{ts,tsx,vue}"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"**/*.{ts,tsx}": "KEBAB_CASE",
				},
				{
					// Ignore the middle extensions of the filename to support filename like prettier.config.js or my.test.ts
					ignoreMiddleExtensions: true,
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"**/!(__tests__)": "KEBAB_CASE",
				},
			],
		},
	},
	{
		// https://eslint.style/guide/why
		name: "Stylistic ESLint",
		files: ["**/*.{ts,tsx,vue}"],
		// plugins: { "@stylistic": stylistic },
		extends: [stylistic.configs.recommended],
	},
	eslintConfigPrettier,
	// {
	// 	files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
	// 	ignores: ["eslint.config.js"],
	// 	languageOptions: {
	// 		parser: tsParser,
	// 		ecmaVersion: "latest",
	// 		sourceType: "module",
	// 	},
	// },
]);
