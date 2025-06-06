import tsEslint from "typescript-eslint";

export const eslintRules = tsEslint.config({
	rules: {
		// https://eslint.org/docs/latest/rules/arrow-body-style
		"arrow-body-style": [
			"error",
			"as-needed",
			{
				requireReturnForObjectLiteral: true,
			},
		],

		// https://eslint.org/docs/latest/rules/array-callback-return
		"array-callback-return": "error",

		// https://eslint.org/docs/latest/rules/default-param-last
		"default-param-last": "error",

		// https://eslint.org/docs/latest/rules/eqeqeq
		eqeqeq: ["error", "smart"],

		// https://eslint.org/docs/latest/rules/func-names
		"func-names": ["warn", "as-needed"],

		// https://eslint.org/docs/latest/rules/func-style
		"func-style": ["error", "expression"],

		// https://eslint.org/docs/latest/rules/camelcase
		camelcase: "error",

		// https://eslint.org/docs/latest/rules/new-cap
		"new-cap": "error",

		// https://eslint.org/docs/latest/rules/no-array-constructor
		"no-array-constructor": "error",

		// https://eslint.org/docs/latest/rules/no-else-return
		"no-else-return": ["error", { allowElseIf: false }],

		// https://eslint.org/docs/latest/rules/no-eval
		"no-eval": "error",

		// https://eslint.org/docs/latest/rules/no-loop-func
		"no-loop-func": "error",

		// https://eslint.org/docs/latest/rules/no-multi-assign
		"no-multi-assign": "error",

		// https://eslint.org/docs/latest/rules/no-nested-ternary
		"no-nested-ternary": "error",

		// https://eslint.org/docs/latest/rules/no-new-func
		"no-new-func": "error",

		// https://eslint.org/docs/latest/rules/no-new-wrappers
		"no-new-wrappers": "error",

		// https://eslint.org/docs/latest/rules/no-object-constructor
		"no-object-constructor": "error",

		// https://eslint.org/docs/latest/rules/no-unneeded-ternary
		"no-unneeded-ternary": "error",

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

		// https://eslint.org/docs/latest/rules/one-var
		"one-var": ["error", "never"],

		// https://eslint.org/docs/latest/rules/prefer-arrow-callback
		"prefer-arrow-callback": "error",

		// https://eslint.org/docs/latest/rules/prefer-const
		"prefer-const": [
			"error",
			{
				ignoreReadBeforeAssign: true,
			},
		],

		// https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
		"prefer-exponentiation-operator": "error",

		// https://eslint.org/docs/latest/rules/prefer-numeric-literals
		"prefer-numeric-literals": "error",

		// https://eslint.org/docs/latest/rules/prefer-object-spread
		"prefer-object-spread": "error",

		// https://eslint.org/docs/latest/rules/prefer-rest-params
		"prefer-rest-params": "error",

		// https://eslint.org/docs/latest/rules/prefer-spread
		"prefer-spread": "error",

		// https://eslint.org/docs/latest/rules/prefer-template
		"prefer-template": "error",

		// https://eslint.org/docs/latest/rules/radix
		radix: "error",

		// https://eslint.org/docs/latest/rules/symbol-description
		"symbol-description": "error",
	},
})[0].rules;
