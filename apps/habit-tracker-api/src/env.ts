import { createEnv } from "@repo/env";
import { habitTrackerAPIEnvSchema } from "@repo/env/schema/habit-tracker-api";
import { habitTrackerDataEnvSchema } from "@repo/env/schema/habit-tracker-data";

export const env = createEnv({
	server: {
		...habitTrackerAPIEnvSchema,
		...habitTrackerDataEnvSchema,
	},
	runtimeEnv: process.env,
});
