import pluginPlaywright from "eslint-plugin-playwright";
import tsEslint from "typescript-eslint";

export const esLintPlaywrightConfig = tsEslint.config([
	{
		name: "Playwright",
		files: ["src/**/*.{test,spec}.{ts}"],
		extends: [pluginPlaywright.configs["flat/recommended"]],
	},
]);
