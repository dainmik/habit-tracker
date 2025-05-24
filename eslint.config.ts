import { globalIgnores } from "eslint/config";
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import pluginPlaywright from "eslint-plugin-playwright";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import checkFile from "eslint-plugin-check-file";

export default defineConfigWithVueTs(
	{
		name: "app/files-to-lint",
		files: ["**/*.{ts,mts,tsx,vue}"],
	},

	globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

	pluginVue.configs["flat/essential"],
	vueTsConfigs.recommended,

	{
		...pluginPlaywright.configs["flat/recommended"],
		files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
	},
	skipFormatting,

	{
		name: "check-file",
		files: ["src/**/*.*"],
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
					"src/**/!(__tests__)": "KEBAB_CASE",
				},
			],
		},
	},
);
