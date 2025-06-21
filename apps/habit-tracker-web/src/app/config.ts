import { createTRPClient } from "@repo/habit-tracker-data/client";

export const APP_CONFIG = {
	name: "Habit Tracker",
} as const;

export const trpc = createTRPClient({
	url: `${import.meta.env.VITE_API_SCHEMA}${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE_PATH}`,
});
