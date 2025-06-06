import pluginPlaywright from "eslint-plugin-playwright";
import tsEslint from "typescript-eslint";

// eslint-disable-next-line import-x/no-default-export
export default tsEslint.config([
	{
		name: "Playwright",
		files: ["e2e/**/*.{test,spec}.{ts}"],
		extends: [pluginPlaywright.configs["flat/recommended"]],
	},
]);
