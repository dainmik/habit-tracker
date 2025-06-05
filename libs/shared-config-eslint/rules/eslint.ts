import { type Rules } from "./types.ts";

export const eslintRules = {
	rules: {
		// https://eslint.org/docs/latest/rules/arrow-body-style
		"arrow-body-style": [
			"error",
			"as-needed",
			{
				requireReturnForObjectLiteral: true,
			},
		],

		// https://eslint.org/docs/latest/rules/camelcase
		camelcase: "error",

		// https://eslint.org/docs/latest/rules/no-object-constructor
		"no-object-constructor": "error",

		// https://eslint.org/docs/latest/rules/no-useless-computed-key
		"no-useless-computed-key": "error",

		// https://eslint.org/docs/latest/rules/no-useless-constructor
		"no-useless-constructor": "error",

		// https://eslint.org/docs/latest/rules/no-useless-rename
		"no-useless-rename": "error",

		// https://eslint.org/docs/latest/rules/no-var
		"no-var": "error",

		// https://eslint.org/docs/latest/rules/object-shorthand
		"object-shorthand": [
			"error",
			"always",
			{
				ignoreConstructors: false,
				avoidQuotes: true,
			},
		],

		// https://eslint.org/docs/latest/rules/prefer-arrow-callback
		"prefer-arrow-callback": "error",

		// https://eslint.org/docs/latest/rules/prefer-const
		"prefer-const": [
			"error",
			{
				ignoreReadBeforeAssign: true,
			},
		],

		// https://eslint.org/docs/latest/rules/prefer-numeric-literals
		"prefer-numeric-literals": "error",

		// https://eslint.org/docs/latest/rules/prefer-rest-params
		"prefer-rest-params": "error",

		// https://eslint.org/docs/latest/rules/prefer-spread
		"prefer-spread": "error",

		// https://eslint.org/docs/latest/rules/prefer-template
		"prefer-template": "error",

		// https://eslint.org/docs/latest/rules/symbol-description
		"symbol-description": "error",
	} as Rules,
};
