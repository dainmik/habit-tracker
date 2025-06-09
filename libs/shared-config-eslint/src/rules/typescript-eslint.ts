import { defineRuleEntries } from "#utils/define-rule-entries.ts";

export const typescriptEslintRules = defineRuleEntries({
	"@typescript-eslint/restrict-template-expressions": [
		"error",
		{
			// We allow for number and boolean to avoid having to call String constructor or toString method inside template literals because their string representations are reasonably well defined and generally purposeful, unlike other types such as object, undefined, null.
			allowNumber: true,
			allowBoolean: true,
		},
	],

	// https://typescript-eslint.io/rules/no-unnecessary-condition/
	"@typescript-eslint/no-unnecessary-condition": [
		"error",
		{ allowConstantLoopConditions: "always" },
	],
});
