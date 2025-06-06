import pluginVitest from "@vitest/eslint-plugin";
import tsEslint from "typescript-eslint";

export const esLintVitestConfig = tsEslint.config([
	{
		name: "Vitest",
		files: ["src/**/__tests__/*"],
		extends: [pluginVitest.configs.recommended],
	},
]);
