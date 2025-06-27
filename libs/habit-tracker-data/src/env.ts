import { createEnv } from "@repo/env";
import { habitTrackerDataEnvSchema } from "@repo/env/schema/habit-tracker-data";
import { nodeEnvSchema } from "@repo/env/schema/node";

export const env = createEnv({
	server: {
		...nodeEnvSchema,
		...habitTrackerDataEnvSchema,
	},
	runtimeEnv: process.env,
});
