import { type Rules } from "./types.ts";

export const eslintStylisticRules = {
	rules: {
		// https://eslint.style/rules/no-confusing-arrow
		"no-confusing-arrow": [
			"error",
			{
				allowParens: true,
			},
		],
	} as Rules,
};
