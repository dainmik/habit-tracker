/** @type {import('stylelint').Config} */
export default {
	overrides: [
		{
			files: ["src/**/*.css"],
			extends: ["stylelint-config-recommended"],
		},
		{
			files: ["src/**/*.vue"],
			extends: ["stylelint-config-recommended-vue"],
		},
	],
	rules: {
		"at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
		"at-rule-no-unknown": [
			true,
			{ ignoreAtRules: ["custom-variant", "theme", "utility"] },
		],
	},
};
