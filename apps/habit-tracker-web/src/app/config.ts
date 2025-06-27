import { env } from "@/app/env";
import { createTRPClient } from "@repo/habit-tracker-data/client";

export const APP_CONFIG = {
	name: "Habit Tracker",
} as const;

export const trpc = createTRPClient({
	url: `${env.VITE_HABIT_TRACKER_API_SCHEMA}${env.VITE_HABIT_TRACKER_API_HOST}:${env.VITE_HABIT_TRACKER_API_PORT}${env.VITE_HABIT_TRACKER_API_BASE_PATH}`,
});
