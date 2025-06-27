import { createEnv as _createEnv } from "@t3-oss/env-core";

export const createEnv: typeof _createEnv = (opts) =>
	_createEnv({
		...opts,
		/**
		 * By default, @t3-oss/env-core will feed the environment variables directly
		 * to the Zod validator.
		 *
		 * This means that if you have an empty string for a value that is supposed
		 * to be a number (e.g. `PORT=` in a ".env" file), Zod will flag it as a type
		 * mismatch violation. Additionally, if you have an empty string for a value
		 * that is supposed to be a string with a default value (e.g.
		 * `DOMAIN=` in an ".env" file), the default value will never be applied.
		 *
		 * Setting `emptyStringAsUndefined: true` prevents this behavior.
		 */
		emptyStringAsUndefined: true,
	});
