import { includeIgnoreFile } from "@eslint/compat";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from "@vue/eslint-config-typescript";
import checkFile from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import-x";
import pluginPlaywright from "eslint-plugin-playwright";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import path from "node:path";
import { cwd } from "node:process";

// eslint-disable-next-line import-x/no-default-export
export default defineConfigWithVueTs([
	includeIgnoreFile(path.resolve(cwd(), ".gitignore")),

	{
		name: "Vue Typescript",
		files: ["**/*.{ts,vue}"],
		extends: [
			pluginVue.configs["flat/recommended"],
			vueTsConfigs.strictTypeChecked,
			vueTsConfigs.stylisticTypeChecked,
		],
		rules: {
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					// We allow for number and boolean to avoid having to call String constructor or toString method inside template literals because their string representations are reasonably well defined and generally purposeful, unlike other types such as object, undefined, null.
					allowNumber: true,
					allowBoolean: true,
				},
			],
			"vue/component-name-in-template-casing": [
				"error",
				"PascalCase",
				{
					ignores: [],
				},
			],
			// Vue docs (https://vuejs.org/guide/components/registration.html#component-name-casing) recommend PascalCase for custom Vue component naming when working with SFCs. We're working exclusively with SFCs and we're not writing Vue templates directly in the DOM, therefore there is no risk of conflicts with the native HTML elements. To enable having components such as <Button /> in favor of <ButtonComponent />, it is safe to disable "vue/multi-word-component-names" rule.
			"vue/multi-word-component-names": "off",
			"vue/no-undef-components": [
				"error",
				{
					ignorePatterns: [],
				},
			],
		},
	},
	{
		name: "Import Export",
		files: ["**/*.{ts,vue}"],
		extends: [
			// eslint-disable-next-line import-x/no-named-as-default-member
			importPlugin.flatConfigs.recommended,
			// eslint-disable-next-line import-x/no-named-as-default-member
			importPlugin.flatConfigs.typescript,
		],
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
		files: ["src/**/*.{ts,vue}"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"src/**/*.{ts,tsx}": "KEBAB_CASE",
				},
				{
					// Ignore the middle extensions of the filename to support filename like prettier.config.js or my.test.ts
					ignoreMiddleExtensions: true,
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"src/**/!(__tests__)": "KEBAB_CASE",
				},
			],
		},
	},
	{
		// https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/
		name: "Accessibility",
		files: ["**/*.vue"],
		extends: [pluginVueA11y.configs["flat/recommended"]],
		rules: {
			"vuejs-accessibility/label-has-for": [
				"error",
				{
					components: ["Label"],
					controlComponents: ["Input"],
					required: "id",
				},
			],
		},
	},
	{
		name: "General JS",
		files: ["**/*.{ts,vue}"],
		extends: [
			// https://github.com/sindresorhus/eslint-plugin-unicorn
			eslintPluginUnicorn.configs.all,
		],
		rules: {
			// It's infrequent to confuse 'new Foo' with 'newFoo'.
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
			"unicorn/no-keyword-prefix": "off",
			// Null is semantically different from undefined. Null means 'explicitly set to no value' while undefined means 'the value is implicitly absent'.
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
			"unicorn/no-null": "off",
			// Sometimes forEach results in better readability.
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
			"unicorn/no-array-for-each": "off",
			// The rule does not account for arbitrary abbreviations, and generally very commoon abbreviations such as 'utils -> utilities', 'e -> event', are generally not confusing among developers.
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
			"unicorn/prevent-abbreviations": "off",
			// This rule cannot distinguish between window.postMessage() and other calls like Worker#postMessage(), MessagePort#postMessage(), Client#postMessage(), and BroadcastChannel#postMessage().
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
			"unicorn/require-post-message-target-origin": "off",
		},
	},
	{
		name: "Playwright",
		files: ["e2e/**/*.{test,spec}.{ts}"],
		extends: [pluginPlaywright.configs["flat/recommended"]],
	},
	skipFormatting,
]);
