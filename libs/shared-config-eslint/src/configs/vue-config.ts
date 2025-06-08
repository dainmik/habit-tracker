import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";

export const esLintVueConfig = defineConfigWithVueTs([
	{
		name: "Vue Typescript",
		files: ["**/*.{ts,vue}"],
		extends: [
			pluginVue.configs["flat/recommended"],
			vueTsConfigs.strictTypeChecked,
			vueTsConfigs.stylisticTypeChecked,
		],
		rules: {
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
	skipFormatting,
]);
