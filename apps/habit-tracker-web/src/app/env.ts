import { createEnv } from "@repo/env";
import { viteHabitTrackerAPIEnvSchema } from "@repo/env/schema/habit-tracker-api";

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		...viteHabitTrackerAPIEnvSchema,
	},
	runtimeEnv: import.meta.env,
});
