import { createEnv } from "@repo/env";
import { habitTrackerWebEnvSchema } from "@repo/env/schema/habit-tracker-web";
import { nodeEnvSchema } from "@repo/env/schema/node";

export const env = createEnv({
	server: {
		...nodeEnvSchema,
		...habitTrackerWebEnvSchema,
	},
	runtimeEnv: process.env,
});
