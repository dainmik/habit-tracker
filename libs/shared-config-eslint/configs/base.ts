import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import turboConfig from "eslint-config-turbo/flat";
import checkFile from "eslint-plugin-check-file";
import { flatConfigs } from "eslint-plugin-import-x";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsEslint, { configs } from "typescript-eslint";

import path from "node:path";
import { cwd } from "node:process";
import { eslintStylisticRules } from "../rules/eslint-stylistic.ts";
import { eslintRules } from "../rules/eslint.ts";

// eslint-disable-next-line import-x/no-default-export
export default tsEslint.config([
	includeIgnoreFile(path.resolve(cwd(), ".gitignore")),

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
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			...eslintRules.rules,
			...eslintStylisticRules.rules,
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					// We allow for number and boolean to avoid having to call String constructor or toString method inside template literals, because their string representations are reasonably well defined and generally purposeful, unlike other types such as object, undefined, or null, etc.
					allowNumber: true,
					allowBoolean: true,
				},
			],
		},
	},
	{
		name: "General JavaScript",
		files: ["**/*.{ts,vue}"],
		extends: [
			// https://github.com/sindresorhus/eslint-plugin-unicorn
			eslintPluginUnicorn.configs.all,
		],
		rules: {
			/*
			 * It's infrequent to confuse 'new Foo' with 'newFoo'.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
			 */
			"unicorn/no-keyword-prefix": "off",
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
			/*
			 * The rule does not account for arbitrary abbreviations, and generally very commoon abbreviations such as 'utils -> utilities', 'e -> event', are generally not confusing among developers.
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
			 */
			"unicorn/prevent-abbreviations": "off",
			/*
			 * This rule cannot distinguish between window.postMessage() and other calls like Worker#postMessage(), MessagePort#postMessage(), Client#postMessage(), and BroadcastChannel#postMessage().
			 * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
			 */
			"unicorn/require-post-message-target-origin": "off",
		},
	},
	{
		// https://eslint.style/guide/why
		name: "Stylistic ESLint",
		files: ["**/*.{ts,vue}"],
		// plugins: { "@stylistic": stylistic },
		extends: [stylistic.configs.recommended],
	},
	{
		name: "Import Export",
		files: ["**/*.{ts,vue}"],
		extends: [flatConfigs.recommended, flatConfigs.typescript],
		rules: {
			"import-x/no-default-export": "error",
			// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
			"import-x/no-restricted-paths": [
				"error",
				{
					zones: [
						{
							from: "./src/app",
							target: "./src/features",
						},
						{
							from: ["./src/app", "./src/features"],
							target: [
								"./src/adapters",
								"./src/assets",
								"./src/components",
								"./src/lib",
								"./src/model",
							],
						},
					],
				},
			],
		},
	},
	{
		name: "File",
		files: ["**/*.{ts,vue}"],
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
