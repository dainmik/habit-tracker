import { createEnv as _createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";

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

interface LoadEnvOptions {
	path?: string;
}

/**
 * Load environment variables tofrom file to `process.env`
 *
 * This is a utility function that should only be used when there
 * is no option to pass environment variables via CLI as part of
 * running the app (e.g., Playwright VSCode extension).
 *
 * TODO: Add this functionality as part of `createEnv` API.
 */
export const __loadEnvFromFileInDevelopment = ({ path }: LoadEnvOptions) => {
	const result = config({ path: path ?? "./" });

	if (result.error || !result.parsed) {
		// We don't want to interfer with non-development environments, so
		// we don't throw an error.
		return;
	}

	return result.parsed;
};
