import { z } from "zod";

export const habitTrackerDataEnvSchema = {
	HABIT_TRACKER_DATA_DATABASE_URL: z.string(),
};
