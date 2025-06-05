import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";

// eslint-disable-next-line import-x/no-default-export
export default defineConfigWithVueTs([
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
	skipFormatting,
]);
