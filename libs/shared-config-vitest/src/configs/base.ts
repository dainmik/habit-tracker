import { configDefaults, defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
	test: {
		coverage: {
			provider: "istanbul",
			reporter: [
				"html",
				[
					"json",
					{
						file: `../coverage.json`,
					},
				],
				"text",
			],
		},
		exclude: [...configDefaults.exclude],
	},
});
